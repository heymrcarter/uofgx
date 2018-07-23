<template>
  <v-card height="100%" v-if="playTime">
    <v-card-title class="title">All time activity breakdown</v-card-title>
    <v-card-text>
      <p class="subheading">Activity play time as measured in hours</p>
      <pie-chart :data="playTime" :colors="chartColors" :library="chartOptions"></pie-chart>
    </v-card-text>
  </v-card>
</template>

<script>
import colors from 'vuetify/es5/util/colors'
export default {
  name: 'activity-play-time-chart',
  props: {
    playTime: Array
  },
  data() {
    return {
      chartColors: [colors.red.darken4, colors.yellow.base, colors.blue.base, colors.amber.base, colors.green.base],
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
      }
    }
  }
}
</script>
