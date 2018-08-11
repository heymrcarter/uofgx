<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
    <v-card tile>
      <v-toolbar card>
        <v-btn icon @click="close">
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title>Inactive members</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-tooltip left>
          <v-btn slot="activator" icon @click="reload"><v-icon>refresh</v-icon></v-btn>
          <span>Reload</span>
        </v-tooltip>
      </v-toolbar>

      <v-progress-linear
        v-if="isLoading"
        indeterminate
        color="yellow"
        height="5"></v-progress-linear>

      <v-card-text>
        <inactivity-report-list
          title="A month or more"
          :items="greaterThan30Days"
          :allowRemove="true"
          @loading="onLoad"></inactivity-report-list>
        <inactivity-report-list title="A week or more" :items="weekOrMore"></inactivity-report-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InactivityReportList from './InactivityReportList'

export default {
  name: 'inactive-players',
  components: {
    InactivityReportList
  },
  props: {
    active: Boolean
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['activityReport']),
    greaterThan30Days() {
      if (this.activityReport) {
        return this.activityReport.filter(p => p.daysSinceLastPlayed >= 30)
      }

      return []
    },
    weekOrMore() {
      if (this.activityReport) {
        return this.activityReport.filter(p => p.daysSinceLastPlayed >= 7 && p.daysSinceLastPlayed < 30)
      }

      return []
    }
  },
  methods: {
    ...mapActions(['getActivityReport']),
    reload() {
      this.isLoading = true
      this.getActivityReport().finally(() => {
        this.isLoading = false
      })
    },
    close() {
      this.$emit('close')
    },
    onLoad(isCurrentlyLoading) {
      this.isLoading = isCurrentlyLoading
    }
  }
}
</script>
