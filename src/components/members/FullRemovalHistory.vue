<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
    <v-card tile>
      <v-toolbar card>
        <v-btn icon @click.native="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title>Removal history</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-list two-line>
          <template v-for="(removal, i) in orderedHistory">
            <v-list-tile :key="removal.id">
              <v-list-tile-content>
                <v-list-tile-title>{{ removal.removedGamertag }}</v-list-tile-title>
                <v-list-tile-sub-title>Removed by {{ adminUserName(removal.adminMembershipId) }} on {{ formatDate(removal.removalDate) }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="i !== orderedHistory.length - 1" :key="i"></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import dateFormatter from '@/mixins/date-formatter'
import sort from 'fast-sort'
export default {
  name: 'full-removal-history',
  mixins: [dateFormatter],
  props: {
    active: Boolean
  },
  computed: {
    ...mapGetters(['removalHistory', 'clanMembers']),
    orderedHistory() {
      if (this.removalHistory) {
        return sort(JSON.parse(JSON.stringify(this.removalHistory))).desc(h => h.removalDate)
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    adminUserName(adminMembershipId) {
      if (this.clanMembers) {
        return this.clanMembers.find(m => m.bungieNetMembershipId === adminMembershipId).bungieNetUserName
      }
    }
  }
}
</script>
