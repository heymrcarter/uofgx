<template>
  <v-card>
    <v-card-title>
      <p class="title">Activity by date</p>
    </v-card-title>
    <v-card-text>
      <loadable-indicator v-if="isLoading"></loadable-indicator>
      <loadable-failure
        v-else-if="loadError"
        :message="`Couldn't load activity breakdown`"
        :retryable="true"
        @retry="fetch(characterId)"></loadable-failure>

      <line-chart :data="chartData" :library="chartOptions" :colors="chartColor" v-if="Object.keys(chartData).length > 0 && !isLoading && !loadError"></line-chart>
    </v-card-text>
  </v-card>
</template>

<script>
import LoadableIndicator from '@/components/LoadableIndicator'
import LoadableFailure from '@/components/LoadableFailure'
import { mapActions } from 'vuex'
import colors from 'vuetify/es5/util/colors'
export default {
  name: 'activity-by-date-chart',
  components: {
    LoadableIndicator,
    LoadableFailure
  },
  data() {
    return {
      chartColor: [colors.yellow.base],
      chartOptions: {
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: 'white',
                fontSize: 14
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'white'
              }
            }
          ]
        }
      },
      chartData: {},
      isLoading: false,
      loadError: false
    }
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
  watch: {
    characterId(nextCharacterId) {
      if (nextCharacterId) {
        this.fetch(nextCharacterId)
      }
    }
  },
  methods: {
    ...mapActions(['getRecentActivityByDate']),
    fetch(characterId) {
      this.isLoading = true
      this.loadError = false
      this.getRecentActivityByDate({ membershipId: this.membershipId, characterId })
        .then(data => {
          this.isLoading = false
          this.chartData = data
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
