<template>
  <v-card>
    <v-card-title>
      <p class="title">Activity breakdown</p>
    </v-card-title>
    <v-card-text>
      <loadable-indicator v-if="isLoading"></loadable-indicator>
      <loadable-failure
        v-else-if="loadError"
        :message="`Couldn't load activity breakdown`"
        :retryable="true"
        @retry="fetch(characterId)"></loadable-failure>

      <pie-chart :data="chartData" :colors="chartColors" :library="chartOptions" v-if="!isLoading && !loadError && chartData.length > 0"></pie-chart>
    </v-card-text>
  </v-card>
</template>

<script>
import LoadableIndicator from '@/components/LoadableIndicator'
import LoadableFailure from '@/components/LoadableFailure'
import { mapActions } from 'vuex'
import colors from 'vuetify/es5/util/colors'
export default {
  name: 'activity-breakdown-chart',
  components: {
    LoadableIndicator,
    LoadableFailure
  },
  props: {
    membershipId: {
      required: true,
      type: String
    },
    characterId: {
      required: false,
      type: String
    }
  },
  data() {
    return {
      isLoading: false,
      loadError: false,
      chartColors: [colors.red.darken4, colors.blue.base, colors.indigo.base, colors.green.base, colors.yellow.base, colors.amber.base, colors.deepOrange.base, colors.pink.base],
      chartOptions: {
        segmentStrokeWidth: 20,
        segmentStrokeColor: 'rgba(255, 255, 255, 0.4)',
        legend: {
          position: 'bottom',
          labels: {
            fontColor: 'white',
            fontSize: 14
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        }
      },
      chartData: []
    }
  },
  watch: {
    characterId(nextCharacterId) {
      if (nextCharacterId) {
        this.fetch(nextCharacterId)
      }
    }
  },
  methods: {
    ...mapActions(['getRecentActivityBreakdown']),
    fetch(characterId) {
      this.isLoading = true
      this.loadError = false
      this.getRecentActivityBreakdown({ membershipId: this.membershipId, characterId })
        .then(recentActivityBreakdown => {
          this.chartData = recentActivityBreakdown
          this.isLoading = false
        })
        .catch(error => {
          this.isLoading = false
          this.loadError = true
          console.error(error)
        })
    }
  }
}
</script>
