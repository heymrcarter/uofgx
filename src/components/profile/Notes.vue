<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
    <v-card>
      <v-toolbar card>
        <v-btn icon @click.native="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title>Notes</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-tooltip left v-if="currentSubView === 'note-list'">
          <v-btn icon slot="activator" @click="currentSubView = 'add-note'"><v-icon>add</v-icon></v-btn>
          <span>Add note</span>
        </v-tooltip>

        <v-btn v-else @click="currentSubView = 'note-list'">Cancel</v-btn>
      </v-toolbar>

      <v-progress-linear indeterminate v-if="isLoading" color="accent" height="5"></v-progress-linear>

      <v-card-text>
        <v-flex transition="v-slide-x-reverse-transition" v-if="currentSubView === 'note-list'">
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

          <div class="no-notes" v-else>
            <v-icon>notes</v-icon>
            <p class="title">No notes</p>
          </div>
        </v-flex>

        <v-flex transition="v-slide-x-transition" v-if="currentSubView === 'add-note'">
          <h3 class="title mb-3">Add note</h3>
          <v-textarea autofocus outline color="accent" v-model="newNoteText"></v-textarea>
          <v-btn @click="submitNote">Save</v-btn>
        </v-flex>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import dateFormatter from '@/mixins/date-formatter'
import analytics from '@/mixins/analytics'
export default {
  name: 'notes',
  mixins: [dateFormatter, analytics],
  props: {
    active: Boolean
  },
  data() {
    return {
      currentSubView: 'note-list',
      newNoteText: '',
      isLoading: false
    }
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
    ...mapActions('notes', ['addNote']),
    adminUserName(adminMembershipId) {
      if (this.clanMembers) {
        return this.clanMembers.find(m => m.bungieNetMembershipId === adminMembershipId).bungieNetUserName
      }
    },
    closeDialog() {
      this.$emit('close')
    },
    submitNote() {
      this.recordEvent('Member Profile', 'Add', 'Note')
      const payload = {
        membershipId: this.membershipId,
        note: this.newNoteText
      }
      this.isLoading = true
      this.addNote(payload)
        .then(() => {
          this.newNoteText = ''
        })
        .finally(() => {
          this.isLoading = false
          this.currentSubView = 'note-list'
        })
    }
  }
}
</script>

<style scoped lang="scss">
.no-notes {
  display: block;

  i {
    display: block;
    text-align: center;
    font-size: 72px;
  }

  p {
    text-align: center;
  }
}
</style>
