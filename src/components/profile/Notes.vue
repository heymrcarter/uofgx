<template>
  <v-card>
    <v-card-title class="headline">Notes</v-card-title>

    <v-card-text>
      <loadable-indicator v-if="isLoading"></loadable-indicator>
      <loadable-failure
        v-else-if="loadError"
        :message="`Couldn't load notes.`"
        :retryable="true"
        @retry="reload"></loadable-failure>

      <v-list two-line v-else-if="memberNotes && memberNotes.length > 0">
        <template v-for="(note, i) in memberNotes">
          <v-list-tile :key="note.id">
            <v-list-tile-content>
              <v-list-tile-title>{{ note.note }}</v-list-tile-title>
              <v-list-tile-sub-title>- {{ adminUserName(note.adminMembershipId) }} on {{ formatDate(note.date) }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="i !== memberNotes.length - 1" :key="i"></v-divider>
        </template>
      </v-list>

      <p v-else>
        No notes
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import loadable from '@/mixins/loadable'
import LoadableIndicator from '@/components/LoadableIndicator'
import LoadableFailure from '@/components/LoadableFailure'
import dateFormatter from '@/mixins/date-formatter'
export default {
  name: 'notes',
  mixins: [loadable, dateFormatter],
  props: {
    membershipId: String
  },
  data() {
    return {
      loadAction: 'notes/getNotes',
      loadParams: this.membershipId
    }
  },
  computed: {
    ...mapGetters('members', ['clanMembers']),
    ...mapState({
      memberNotes(state) {
        return state.notes.notes[this.membershipId]
      }
    })
  },
  methods: {
    adminUserName(adminMembershipId) {
      if (this.clanMembers) {
        return this.clanMembers.find(m => m.bungieNetMembershipId === adminMembershipId).bungieNetUserName
      }
    }
  },
  components: {
    LoadableIndicator,
    LoadableFailure
  }
}
</script>

<style scoped>

</style>