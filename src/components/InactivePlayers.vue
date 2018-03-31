<template>
  <v-container fluid class="mt-3">
    <v-layout row wrap>
      <v-flex>
        <v-card dark tile>
          <v-card-title primary-title class="headline">Inactive Player Report</v-card-title>

          <v-card-text v-if="isRunningReport || loadError" :class="{'pa-0': isRunningReport}">
            <loadable-indicator v-if="isRunningReport"></loadable-indicator>
            <loadable-failure
              v-if="loadError"
              :retryable="true"
              :message="`Couldn't load activity report`"
              @retry="generateReport"></loadable-failure>
          </v-card-text>

          <v-card-actions v-if="!loadError">
            <v-btn flat dark @click="generateReport">Run report</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-if="activityReport !== undefined" class="inactive-member-table">
      <v-flex>
        <inactivity-report-list title="A month or more" :items="greaterThan30Days"></inactivity-report-list>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-if="activityReport !== undefined" class="inactive-member-table">
      <v-flex>
        <inactivity-report-list title="A week or more" :items="weekOrMore"></inactivity-report-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InactivityReportList from './inactive-players/InactivityReportList'
import LoadableIndicator from './LoadableIndicator'
import LoadableFailure from './LoadableFailure'

export default {
  name: 'inactive-players',
  components: {
    InactivityReportList,
    LoadableIndicator,
    LoadableFailure
  },
  data() {
    return {
      isRunningReport: false,
      loadError: false
    }
  },
  computed: {
    ...mapGetters(['activityReport']),
    greaterThan30Days() {
      return this.activityReport.filter(p => p.daysSinceLastPlayed >= 30)
    },
    weekOrMore() {
      return this.activityReport.filter(p => p.daysSinceLastPlayed >= 7 && p.daysSinceLastPlayed < 30)
    }
  },
  methods: {
    ...mapActions(['getActivityReport', 'getCharactersForMember']),
    generateReport() {
      const self = this
      this.isRunningReport = true
      this.loadError = false

      this.getActivityReport()
        .then(() => {
          self.isRunningReport = false
        })
        .catch(error => {
          console.error(error)
          this.loadError = true
        })
    }
  }
}
</script>

<style scoped>
.inactive-member-table {
  margin-top: 20px;
}
</style>
