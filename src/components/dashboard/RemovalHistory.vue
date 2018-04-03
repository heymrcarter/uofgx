<template>
  <div class="full-height">
    <v-card height="100%">
      <v-card-title class="headline">Recent removal history</v-card-title>
      <v-card-text>
        <loadable-indicator v-if="isLoading"></loadable-indicator>
        <loadable-failure
          v-else-if="loadError"
          :message="`Couldn't load history.`"
          :retryable="true"
          @retry="reload"></loadable-failure>

        <p v-else-if="(!isLoading && !loadError) && removalHistory && removalHistory.length === 0">No history</p>

        <v-list two-line v-else>
          <template v-for="(history, i) in recentRemovals">
            <v-list-tile :key="history.id">
              <v-list-tile-content>
                <v-list-tile-title>{{ history.removedGamertag }}</v-list-tile-title>
                <v-list-tile-sub-title>Removed by {{ adminUserName(history.adminMembershipId) }} on {{ formatDate(history.removalDate) }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="i !== recentRemovals.length - 1" :key="i"></v-divider>
          </template>
        </v-list>
      </v-card-text>

      <v-card-actions v-if="(!isLoading && !loadError) && removalHistory">
        <v-btn flat @click="showFullHistory = true">View full history</v-btn>
      </v-card-actions>
    </v-card>

    <full-removal-history :active="showFullHistory" @close="closeDialog"></full-removal-history>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dateFormatter from '@/mixins/date-formatter'
import sort from 'fast-sort'
import FullRemovalHistory from './FullRemovalHistory'
import loadable from '@/mixins/loadable'
import LoadableIndicator from '@/components/LoadableIndicator'
import LoadableFailure from '@/components/LoadableFailure'
export default {
  name: 'removal-history',
  mixins: [dateFormatter, loadable],
  components: {
    FullRemovalHistory,
    LoadableIndicator,
    LoadableFailure
  },
  data() {
    return {
      loadAction: 'getRemovalHistory',
      showFullHistory: false
    }
  },
  computed: {
    ...mapGetters('members', ['clanMembers']),
    ...mapGetters(['removalHistory']),
    recentRemovals() {
      if (this.removalHistory) {
        const copy = JSON.parse(JSON.stringify(this.removalHistory))
        return sort(copy)
          .desc(h => h.removalDate)
          .slice(0, 4)
      }
    }
  },
  methods: {
    adminUserName(adminMembershipId) {
      if (this.clanMembers) {
        return this.clanMembers.find(m => m.bungieNetMembershipId === adminMembershipId).bungieNetUserName
      }
    },
    closeDialog() {
      this.showFullHistory = false
    }
  }
}
</script>

<style scoped lang="scss">
.full-height {
  height: 100%;

  .card {
    display: flex;
    flex-direction: column;

    .card__text {
      flex: 1;
    }
  }
}
</style>
