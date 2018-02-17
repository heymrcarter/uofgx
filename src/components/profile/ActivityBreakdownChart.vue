<template>
  <v-card>
    <v-card-title>
      <p class="title">Activity breakdown</p>
    </v-card-title>
    <v-card-text>
      <pie-chart :data="chartData" :colors="chartColors" :library="chartOptions" v-if="chartData.length > 0 && !isLoading"></pie-chart>
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
  name: 'activity-breakdown-chart',
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
        this.isLoading = true
        this.getRecentActivityBreakdown({ membershipId: this.membershipId, characterId: nextCharacterId })
          .then(recentActivityBreakdown => {
            this.chartData = recentActivityBreakdown
            this.isLoading = false
          })
          .catch(error => {
            this.isLoading = false
            console.error(error)
          })
      }
    }
  },
  methods: {
    ...mapActions(['getRecentActivityBreakdown'])
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
