<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
    <v-card>
      <v-toolbar card>
        <v-btn icon @click.native="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title>Notes</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-list two-line v-if="memberNotes && memberNotes.length > 0">
          <template v-for="(note, i) in memberNotes">
            <v-list-tile :key="note.id">
              <v-list-tile-content>
                <v-list-tile-title>{{ note.note }}</v-list-tile-title>
                <v-list-tile-sub-title>- {{ adminUserName(note.adminMembershipId) }} on {{ note.date | formatDate }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="i"></v-divider>
          </template>
        </v-list>

        <p v-else>
          No notes
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import dateFormatter from '@/mixins/date-formatter'
export default {
  name: 'notes',
  mixins: [dateFormatter],
  props: {
    active: Boolean
  },
  computed: {
    ...mapGetters('members', ['clanMembers']),
    ...mapState('notes', {
      memberNotes(state) {
        return state.notes[this.membershipId]
      }
    }),
    membershipId() {
      return this.$route.params.membershipId
    }
  },
  methods: {
    adminUserName(adminMembershipId) {
      if (this.clanMembers) {
        return this.clanMembers.find(m => m.bungieNetMembershipId === adminMembershipId).bungieNetUserName
      }
    },
    closeDialog() {
      this.$emit('close')
    }
  }
}
</script>
