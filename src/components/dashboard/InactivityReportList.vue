<template>
  <v-list three-line subheader>
    <v-subheader>
      <div>{{ title }} ({{ items.length }})</div>
      <v-spacer></v-spacer>
      <v-btn v-if="allowRemove" flat @click="removeAllMembers">Remove all</v-btn>
    </v-subheader>
    <template v-for="(profile, i) in items">
      <div :key="i">
        <inactivity-report-row
          :profile="profile"
          :isCurrentlyExempt="isCurrentlyExempt(profile.membershipId)"
          :numberExemptions="getNumberOfExemptions(profile.membershipId)"
          @click="showMemberDetail(profile)"></inactivity-report-row>
        <v-divider v-if="i !== items.length - 1"></v-divider>
      </div>
    </template>

    <v-dialog v-model="shouldRenderRemoveAllConfirmation" width="500">
      <v-card>
        <v-card-title class="title">Remove all {{ nonExemptMembers.length }} members?</v-card-title>
        <v-card-text>
          <p><strong>Warning!</strong> This action cannot be undone!</p>
          <p>All members excluding any members on exemption will be removed from the clan.</p>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="confirmRemoveAllMembers">Confirm</v-btn>
          <v-btn flat @click="cancelRemoveAllMembers">Cancel</v-btn>
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
      shouldRenderRemoveAllConfirmation: false
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
    removeAllMembers() {
      this.recordEvent('Dashboard', 'Start', 'Remove All Inactive Members')
      this.shouldRenderRemoveAllConfirmation = true
    },
    confirmRemoveAllMembers() {
      this.recordEvent('Dashboard', 'Confirm', 'Remove All Inactive Members')
      this.shouldRenderRemoveAllConfirmation = false
      this.$emit('loading', true)
      this.removeMembers(this.nonExemptMembers).finally(() => {
        this.$emit('loading', false)
      })
    },
    cancelRemoveAllMembers() {
      this.recordEvent('Dashboard', 'Cancel', 'Remove All Inactive Members')
      this.shouldRenderRemoveAllConfirmation = false
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
