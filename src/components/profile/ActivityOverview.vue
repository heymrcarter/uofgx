<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title class="headline">
            Activity overview
            <v-btn flat icon @click="getActivityOverview($route.params.membershipId)"><v-icon>refresh</v-icon></v-btn>
          </v-card-title>
          <v-card-text v-if="isLoading">
            <loadable-indicator></loadable-indicator>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <activity-play-time-chart :play-time="activityPlayTime"></activity-play-time-chart>
      </v-flex>

      <v-flex xs12 md6>
        <weapon-utilization-chart :weapon-utilization="weaponUtilization"></weapon-utilization-chart>
      </v-flex>

      <template v-for="(activity, i) in activityStats">
        <v-flex xs12 md4 :key="i">
          <v-card height="100%">
            <v-card-title class="title">{{ activity.name | initialCap }}</v-card-title>
            <v-card-text>
              <v-list>
                <template v-for="(stat, j) in activity.stats">
                  <v-list-tile :key="stat.name">
                    <v-list-tile-title>{{ stat.name }}</v-list-tile-title>
                    <v-list-tile-action>{{ stat.value | groupDigitsWithComma }}</v-list-tile-action>
                  </v-list-tile>

                  <v-divider :key="j" v-if="j !== activity.stats.length - 1"></v-divider>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadableIndicator from '../LoadableIndicator'
import LoadableFailure from '../LoadableFailure'
import ActivityPlayTimeChart from './ActivityPlayTimeChart'
import WeaponUtilizationChart from './WeaponUtilizationChart'
export default {
  name: 'activity-overview',
  components: {
    LoadableIndicator,
    LoadableFailure,
    ActivityPlayTimeChart,
    WeaponUtilizationChart
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['activityOverview']),
    activityStats() {
      if (this.activityOverview) {
        return this.activityOverview.activityStats
      }
    },
    activityPlayTime() {
      if (this.activityOverview) {
        return this.activityOverview.activityPlayTime
      }
    },
    weaponUtilization() {
      if (this.activityOverview) {
        return this.activityOverview.weaponUtilization
      }
    }
  },
  methods: {
    ...mapActions(['getActivityOverview'])
  },
  filters: {
    initialCap(value) {
      let replacementValue = value.substring(0, 1).toUpperCase() + value.substring(1)
      return replacementValue
    },
    groupDigitsWithComma(value) {
      if (value.match(/[a-z]/i)) {
        return value
      }

      if (value.includes('.')) {
        return parseFloat(value).toLocaleString('en')
      } else {
        return parseInt(value).toLocaleString('en')
      }
    }
  },
  mounted() {
    this.isLoading = true
    this.getActivityOverview(this.$route.params.membershipId).finally(() => {
      this.isLoading = false
    })
  }
}
</script>

<style scoped>
</style>
