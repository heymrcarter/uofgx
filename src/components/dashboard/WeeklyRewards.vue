<template>
  <v-card height="100%">
    <v-card-title class="headline">Weekly rewards</v-card-title>
    <v-card-text>
      <loadable-indicator v-if="isLoadingWeeklyMilestones"></loadable-indicator>
      <loadable-failure
        v-else-if="weeklyMilestonesLoadError"
        :message="`Couldn't load weekly rewards.`"
        :retryable="true"
        @retry="fetchWeeklyRewards"></loadable-failure>

      <v-list v-else-if="weeklyMilestones">
        <v-subheader>{{ weeklyMilestones.startDate | formatDate }} - {{ weeklyMilestones.endDate | formatDate }}</v-subheader>
        <template v-for="(milestone, i) in weeklyMilestones.milestones">
          <v-list-tile :key="i">
            <v-list-tile-content>
              <v-list-tile-title>
                <v-icon v-if="milestone.earned">check_box</v-icon>
                <v-icon v-else>check_box_outline_blank</v-icon>
                {{ milestone.name }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LoadableIndicator from '@/components/LoadableIndicator'
import LoadableFailure from '@/components/LoadableFailure'
import dateFormatter from '@/mixins/date-formatter'
export default {
  name: 'weekly-rewards',
  mixins: [dateFormatter],
  computed: {
    ...mapState(['isLoadingWeeklyMilestones', 'didLoadWeeklyMilestones', 'weeklyMilestonesLoadError', 'weeklyMilestones'])
  },
  methods: {
    ...mapActions(['getWeeklyMilestones']),
    fetchWeeklyRewards() {
      this.getWeeklyMilestones().catch(error => {
        console.error(error)
      })
    }
  },
  components: {
    LoadableIndicator,
    LoadableFailure
  },
  watch: {
    isLoadingWeeklyMilestones(nextValue) {
      if (nextValue) {
        this.fetchWeeklyRewards()
      }
    }
  },
  mounted() {
    this.fetchWeeklyRewards()
  }
}
</script>
