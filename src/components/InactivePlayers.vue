<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex>
        <v-card dark tile v-if="showWarning">
          <v-card-title primary-title class="card-content">
            <h2 class="headline">Inactive Player Report</h2>
            <div>The report takes a few minutes to run. Sit tight while it finishes up.</div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat dark @click="generateReport" v-if="activityReport === undefined">Run report</v-btn>
            <v-btn flat dark @click="showWarning = false">Got it</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-if="activityReport !== undefined" class="inactive-member-table">
      <v-flex>
        <v-card>
          <v-list three-line subheader>
            <v-subheader>A month or more ({{ greaterThan30Days.length }})</v-subheader>
            <template v-for="(profile, i) in greaterThan30Days">
              <div :key="i">
                <inactivity-report-row
                  :profile="profile"
                  :isCurrentlyExempt="isCurrentlyExempt(profile.membershipId)"
                  :numberExemptions="getNumberOfExemptions(profile.membershipId)"
                  @click="showMemberDetail(profile)"></inactivity-report-row>
                <v-divider v-if="i !== greaterThan30Days.length - 1"></v-divider>
              </div>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-if="activityReport !== undefined" class="inactive-member-table">
      <v-flex>
        <v-card>
          <v-list three-line subheader>
            <v-subheader>A week or more ({{ weekOrMore.length }})</v-subheader>
            <template v-for="(profile, i) in weekOrMore">
              <div :key="i">
                <inactivity-report-row
                  :profile="profile"
                  :isCurrentlyExempt="isCurrentlyExempt(profile.membershipId)"
                  :numberExemptions="getNumberOfExemptions(profile.membershipId)"
                  @click="showMemberDetail(profile)"></inactivity-report-row>
                <v-divider v-if="i !== weekOrMore.length - 1"></v-divider>
              </div>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

    <div class="loading-indicator" v-show="isRunningReport" :class="{active: isRunningReport}">
      <img src="../assets/loading-ghost.png"> <span><strong>ATTENTION</strong> Contacting Destiny 2 Servers</span>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import sort from 'fast-sort'
import moment from 'moment-timezone'
import InactivityReportRow from './inactive-players/InactivityReportRow'

export default {
  name: 'inactive-players',
  components: {
    InactivityReportRow
  },
  data() {
    return {
      showWarning: true,
      isRunningReport: false,
      isLoadingCharacters: false
    }
  },
  computed: {
    ...mapGetters(['activityReport', 'exemptions']),
    greaterThan30Days() {
      return this.activityReport.filter(p => p.daysSinceLastPlayed >= 30)
    },
    weekOrMore() {
      return this.activityReport.filter(p => p.daysSinceLastPlayed >= 7 && p.daysSinceLastPlayed < 30)
    }
  },
  methods: {
    ...mapActions(['getActivityReport', 'getCharactersForMember']),
    showMemberDetail(profile) {
      console.log(profile)
      this.isLoadingCharacters = true
      this.getCharactersForMember({ xboxUserName: profile.gamertag, xboxMembershipId: profile.membershipId }).then(() => {
        this.isLoadingCharacters = false
        this.$router.push({ name: 'Profile', params: { membershipId: profile.membershipId } })
      })
    },
    generateReport() {
      const self = this
      this.isRunningReport = true

      this.getActivityReport().then(() => {
        self.isRunningReport = false
      })
    },
    isCurrentlyExempt(membershipId) {
      if (!this.exemptions[membershipId]) {
        return false
      }

      const memberHistory = sort(JSON.parse(JSON.stringify(this.exemptions[membershipId].history))).asc(h => h.startDate)
      const endDate = memberHistory[memberHistory.length - 1].endDate
      const today = moment.utc().format()

      return today <= endDate
    },
    getNumberOfExemptions(membershipId) {
      if (!this.exemptions[membershipId]) {
        return 0
      }

      return this.exemptions[membershipId].numberOfExemptions
    }
  }
}
</script>

<style scoped>
.card-content {
  display: block;
}

h2 {
  margin-bottom: 10px;
}

.loading-indicator {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 0px;
  max-height: 60px;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 10px;
  font-size: 18px;
  transition-property: height;
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.loading-indicator.active {
  height: 60px;
}

.loading-indicator img {
  width: 40px;
  margin-right: 15px;
}

.inactive-member-table {
  margin-top: 20px;
}
</style>
