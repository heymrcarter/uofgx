<template>
  <div>
    <v-btn block @click="shouldRenderNoteDialog = true" class="add-note mb-3">Add note</v-btn>

    <v-dialog class="new-note" v-model="shouldRenderNoteDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Add note</v-card-title>
        <v-card-text>
          <div>
            <v-text-field class="note" textarea v-model="note" placeholder="Note"></v-text-field>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn class="submit-note" @click="submitNote">Add</v-btn>
          <v-btn flat @click="shouldRenderNoteDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import analytics from '@/mixins/analytics'
export default {
  name: 'add-note-action',
  mixins: [analytics],
  data() {
    return {
      shouldRenderNoteDialog: false,
      note: ''
    }
  },
  props: ['membershipId'],
  methods: {
    ...mapActions('notes', ['addNote']),
    submitNote() {
      this.recordEvent('Member Profile', 'Add', 'Note')
      const payload = {
        membershipId: this.membershipId,
        note: this.note
      }
      this.addNote(payload).then(() => {
        this.shouldRenderNoteDialog = false
      })
    }
  }
}
</script>
