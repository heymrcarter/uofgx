<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
  <v-card height="100%">
    <v-toolbar card>
        <v-btn icon @click.native="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title>Exemptions</v-toolbar-title>
      </v-toolbar>
    <v-card-text>
      <p v-if="exemptionHistory.length === 0">No exemptions</p>
      <v-list two-line v-else>
        <template v-for="(exemption, i) in exemptionHistory">
          <v-list-tile :key="i">
            <v-list-tile-content>
              <v-list-tile-title>{{ exemption.startDate | formatDate }} - {{ exemption.endDate | formatDate }}</v-list-tile-title>
              <v-list-tile-sub-title>Granted by: {{ adminUserName(exemption.adminMembershipId) }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action v-if="isCurrentExemption(exemption)">
              <v-icon large>explicit</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider :key="(i+1) * 100"></v-divider>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import dateFormatter from '@/mixins/date-formatter'
import sort from 'fast-sort'
import moment from 'moment-timezone'
export default {
  name: 'exemptions',
  mixins: [dateFormatter],
  props: {
    active: Boolean
  },
  data() {
    return {
      loadError: false
    }
  },
  computed: {
    ...mapGetters('members', ['clanMembers']),
    ...mapState({
      exemptions(state) {
        return state.exemptions.exemptions
      }
    }),
    exemptionHistory() {
      if (!this.exemptions[this.$route.params.membershipId]) {
        return []
      }
      const currentMemberExemption = JSON.parse(JSON.stringify(this.exemptions[this.$route.params.membershipId]))
      return sort(currentMemberExemption.history).desc(e => e.endDate)
    }
  },
  methods: {
    adminUserName(adminMembershipId) {
      return this.clanMembers.find(m => m.bungieNetMembershipId === adminMembershipId).bungieNetUserName
    },
    isCurrentExemption(exemption) {
      const endDate = exemption.endDate
      const today = moment.utc().format()

      return today <= endDate
    },
    closeDialog() {
      this.$emit('close')
    }
  }
}
</script>
