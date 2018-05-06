<template>
  <v-card height="100%">
    <v-card-title class="headline">
      <v-badge color="grey darken-4" v-model="showNumberExemptionsBadge">
        <span slot="badge">{{ exemptionHistory.length }}</span>
        Exemptions
      </v-badge>
    </v-card-title>
    <v-card-text>
      <p v-if="exemptionHistory.length === 0">No exemptions</p>
      <v-list two-line v-else>
        <template v-for="(exemption, i) in exemptionHistory">
          <v-list-tile :key="i">
            <v-list-tile-content>
              <v-list-tile-title>{{ formatDate(exemption.startDate) }} - {{ formatDate(exemption.endDate) }}</v-list-tile-title>
              <v-list-tile-sub-title>Granted by: {{ adminUserName(exemption.adminMembershipId) }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action v-if="isCurrentExemption(exemption)">
              <v-icon>explicit</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="exemptionHistory.length - 1 !== i" :key="(i+1) * 100"></v-divider>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import moment from 'moment-timezone'
export default {
  name: 'exemptions',
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
      const currentMemberExemption = this.exemptions[this.$route.params.membershipId]
      return currentMemberExemption ? currentMemberExemption.history : []
    },
    showNumberExemptionsBadge() {
      return this.exemptionHistory.length > 0
    }
  },
  methods: {
    formatDate(date) {
      return moment.utc(date).format('MM/DD/YYYY')
    },
    adminUserName(adminMembershipId) {
      return this.clanMembers.find(m => m.bungieNetMembershipId === adminMembershipId).bungieNetUserName
    },
    isCurrentExemption(exemption) {
      const endDate = exemption.endDate
      const today = moment.utc().format()

      return today <= endDate
    }
  }
}
</script>
