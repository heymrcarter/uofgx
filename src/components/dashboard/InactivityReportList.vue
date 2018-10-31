<template>
  <v-list three-line subheader>
    <v-subheader>
      <v-tooltip v-if="allowRemove" right>
        <v-checkbox slot="activator" v-model="hasSelectedAll" @change="selectAll" color="accent"></v-checkbox>
        <span>Select all</span>
      </v-tooltip>
      <div :class="{ 'ml-4': allowRemove }">{{ title }} ({{ items.length }})</div>
      <v-spacer></v-spacer>
      <v-btn
        v-responsive.sm.md.lg.xl
        v-if="allowRemove"
        flat
        :disabled="selectedMembers.length === 0"
        @click="startRemoveMembers('selected')">Remove selected</v-btn>
      <v-btn
        v-responsive.sm.md.lg.xl
        v-if="allowRemove"
        flat
        @click="startRemoveMembers('all')">Remove all</v-btn>

      <v-menu bottom left v-responsive.xs v-if="allowRemove">
        <v-btn slot="activator" dark icon>
          <v-icon>delete</v-icon>
        </v-btn>

        <v-list>
          <v-list-tile @click="startRemoveMembers('selected')" :disabled="selectedMembers.length === 0">
            <v-list-tile-title>Remove selected</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="startRemoveMembers('all')">
            <v-list-tile-title>Remove all</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-subheader>
    <v-divider></v-divider>
    <template v-for="(profile, i) in items">
      <div :key="i">
        <inactivity-report-row
          :profile="profile"
          :isCurrentlyExempt="isCurrentlyExempt(profile.membershipId)"
          :numberExemptions="getNumberOfExemptions(profile.membershipId)"
          :selectable="allowRemove"
          :selected="selectedMembers.includes(profile)"
          @click="showMemberDetail(profile)"
          @select="memberSelected(profile, $event)"></inactivity-report-row>
        <v-divider v-if="i !== items.length - 1"></v-divider>
      </div>
    </template>

    <v-dialog v-model="shouldRenderRemoveConfirmation" width="500">
      <v-card>
        <v-card-title class="title">{{ confirmationDialogTitle }}</v-card-title>
        <v-card-text>
          <p><strong>Warning!</strong> This action cannot be undone!</p>
          <p>{{ confirmationDialogText }}</p>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="confirmRemoveMembers">Confirm</v-btn>
          <v-btn flat @click="cancelRemoveMembers">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InactivityReportRow from './InactivityReportRow'
import sort from 'fast-sort'
import moment from 'moment-timezone'
import analytics from '@/mixins/analytics'
export default {
  name: 'inactivity-report-list',
  mixins: [analytics],
  props: {
    items: Array,
    title: String,
    allowRemove: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      shouldRenderRemoveConfirmation: false,
      selectedMembers: [],
      hasSelectedAll: false,
      confirmationDialogTitle: '',
      confirmationDialogText: '',
      removalType: undefined
    }
  },
  computed: {
    ...mapGetters(['exemptions']),
    nonExemptMembers() {
      return this.items.filter(m => !this.isCurrentlyExempt(m.membershipId))
    }
  },
  components: {
    InactivityReportRow
  },
  methods: {
    ...mapActions('members/active', { setActiveMember: 'set' }),
    ...mapActions(['removeMembers']),
    isCurrentlyExempt(membershipId) {
      if (!this.exemptions || !this.exemptions[membershipId]) {
        return false
      }

      const memberHistory = sort(JSON.parse(JSON.stringify(this.exemptions[membershipId].history))).asc(h => h.startDate)
      const endDate = memberHistory[memberHistory.length - 1].endDate
      const today = moment.utc().format()

      return today <= endDate
    },
    getNumberOfExemptions(membershipId) {
      if (!this.exemptions || !this.exemptions[membershipId]) {
        return 0
      }

      return this.exemptions[membershipId].numberOfExemptions
    },
    showMemberDetail(profile) {
      this.setActiveMember({ membershipId: profile.membershipId })
      this.$router.push({ name: 'Profile', params: { membershipId: profile.membershipId } })
    },
    startRemoveMembers(removalType) {
      this.removalType = removalType
      if (removalType === 'all') {
        this.recordEvent('Dashboard', 'Start', 'Remove All Inactive Members')
        this.confirmationDialogTitle = `Remove all ${this.nonExemptMembers.length} members?`
        this.confirmationDialogText = 'All members excluding any members on exemption will be removed from the clan.'
      } else {
        this.recordEvent('Dashboard', 'Start', 'Remove Selected Inactive Members')
        this.confirmationDialogTitle = `Remove ${this.selectedMembers.length} selected members?`
        this.confirmationDialogText = 'All selected members excluding any members on exemption will be removed from the clan.'
      }
      this.shouldRenderRemoveConfirmation = true
    },
    confirmRemoveMembers() {
      if (this.removalType === 'all') {
        this.recordEvent('Dashboard', 'Confirm', 'Remove All Inactive Members')
        this.shouldRenderRemoveConfirmation = false
        this.$emit('loading', true)
        this.removeMembers(this.nonExemptMembers).finally(() => {
          this.$emit('loading', false)
        })
      } else {
        this.recordEvent('Dashboard', 'Confirm', 'Remove Selected Inactive Members')
        this.shouldRenderRemoveConfirmation = false
        this.$emit('loading', true)
        this.removeMembers(this.selectedMembers).finally(() => {
          this.$emit('loading', false)
        })
      }
    },
    cancelRemoveMembers() {
      this.recordEvent('Dashboard', 'Cancel', 'Remove Inactive Members')
      this.shouldRenderRemoveConfirmation = false
    },
    selectAll(nextValue) {
      this.selectedMembers = nextValue ? this.nonExemptMembers : []
    },
    memberSelected(profile, nextValue) {
      if (nextValue) {
        this.selectedMembers.push(profile)
        this.hasSelectedAll = this.selectedMembers.length === this.nonExemptMembers.length
      } else {
        const index = this.selectedMembers.findIndex(p => p.membershipId === profile.membershipId)
        this.selectedMembers.splice(index, 1)
        this.hasSelectedAll = false
      }
    }
  }
}
</script>

<style scoped>
.v-subheader {
  display: flex;
  flex-direction: row;
}
</style>
