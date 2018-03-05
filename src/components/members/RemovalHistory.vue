<template>
  <div>
    <v-card>
      <v-card-title class="headline">Recent removal history</v-card-title>
      <v-card-text>
        <div class="loader" v-if="isLoading">
          <p class="sr-only">Loading</p>
          <v-progress-circular color="yellow" :size="100" indeterminate></v-progress-circular>
        </div>

        <p v-else-if="!isLoading && removalHistory && removalHistory.length === 0">No history</p>

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

      <v-card-actions v-if="!isLoading && removalHistory">
        <v-btn flat @click="showFullHistory = true">View full history</v-btn>
      </v-card-actions>
    </v-card>

    <full-removal-history :active="showFullHistory" @close="closeDialog"></full-removal-history>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dateFormatter from '@/mixins/date-formatter'
import sort from 'fast-sort'
import FullRemovalHistory from './FullRemovalHistory'
export default {
  name: 'removal-history',
  mixins: [dateFormatter],
  components: {
    FullRemovalHistory
  },
  data() {
    return {
      isLoading: false,
      showFullHistory: false
    }
  },
  computed: {
    ...mapGetters(['removalHistory', 'clanMembers']),
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
    ...mapActions(['getRemovalHistory']),
    adminUserName(adminMembershipId) {
      if (this.clanMembers) {
        return this.clanMembers.find(m => m.bungieNetMembershipId === adminMembershipId).bungieNetUserName
      }
    },
    closeDialog() {
      this.showFullHistory = false
    }
  },
  mounted() {
    this.isLoading = true
    this.getRemovalHistory().then(() => {
      this.isLoading = false
    })
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
