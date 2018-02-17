<template>
  <v-card>
    <v-card-title>
      <p class="title">Activity by date</p>
    </v-card-title>
    <v-card-text>
      <line-chart :data="chartData" :library="chartOptions" :colors="chartColor" v-if="Object.keys(chartData).length > 0 && !isLoading"></line-chart>
      <div class="loader" v-else-if="isLoading">
        <p class="sr-only">Loading</p>
        <v-progress-circular color="yellow" :size="100" indeterminate></v-progress-circular>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import colors from 'vuetify/es5/util/colors'
export default {
  name: 'activity-by-date-chart',
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
      isLoading: false
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
        this.isLoading = true
        this.getRecentActivityByDate({ membershipId: this.membershipId, characterId: nextCharacterId })
          .then(data => {
            this.isLoading = false
            this.chartData = data
          })
          .catch(error => {
            this.isLoading = false
            console.error(error)
          })
      }
    }
  },
  methods: {
    ...mapActions(['getRecentActivityByDate'])
  }
}
</script>

<style scoped>
.sr-only {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  width: 1px;
  word-wrap: normal !important;
}

.loader {
  display: flex;
  justify-content: center;
  height: 100%;
}
</style>
