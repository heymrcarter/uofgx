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
            <v-subheader>A month or more</v-subheader>
            <template v-for="(profile, i) in greaterThan30Days">
              <div :key="i">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ profile.gamertag }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ formatDate(profile.dateLastPlayed) }} ({{ profile.daysSinceLastPlayed }} days ago)</v-list-tile-sub-title>
                    <v-list-tile-sub-title>Lastest expansion: {{ latestExpansion(profile.expansions) }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
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
            <v-subheader>A week or more</v-subheader>
            <template v-for="(profile, i) in weekOrMore">
              <div :key="i">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ profile.gamertag }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ formatDate(profile.dateLastPlayed) }} ({{ profile.daysSinceLastPlayed }} days ago)</v-list-tile-sub-title>
                    <v-list-tile-sub-title>Lastest expansion: {{ latestExpansion(profile.expansions) }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
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
import moment from 'moment-timezone'

export default {
  name: 'inactive-players',
  data() {
    return {
      showWarning: true,
      isRunningReport: false
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
    ...mapActions(['getActivityReport']),
    formatDate(date) {
      // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
      return moment
        .utc(date)
        .tz('America/New_York')
        .format('MM/DD/YYYY')
    },
    latestExpansion(expansions) {
      return expansions[expansions.length - 1]
    },
    generateReport() {
      const self = this
      this.isRunningReport = true

      this.getActivityReport().then(() => {
        self.isRunningReport = false
      })
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
