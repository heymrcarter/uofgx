<template>
  <v-card height="100%" v-if="weaponUtilization">
    <v-card-title class="title">All time kill distribution</v-card-title>
    <v-card-text>
      <bar-chart :data="weaponUtilization" :colors="chartColors" :library="chartOptions" height="400px"></bar-chart>
    </v-card-text>
  </v-card>
</template>

<script>
import colors from 'vuetify/es5/util/colors'
export default {
  name: 'weapon-utilization-chart',
  props: {
    weaponUtilization: Array
  },
  data() {
    return {
      chartColors: [colors.yellow.base],
      chartOptions: {
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: 'white',
                fontSize: 15
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'white',
                fontSize: 15
              },
              gridLines: {
                color: 'rgba(255, 255, 255, 0.12)'
              }
            }
          ]
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
