import Vue from 'vue'

export function ADD_NOTE_FOR_MEMBER(state, note) {
  if (Array.isArray(state.notes[note.membershipId])) {
    state.notes[note.membershipId].push(note)
    return
  }

  Vue.set(state.notes, note.membershipId, [note])
}

export function SET_NOTES_FOR_MEMBER(state, { membershipId, notes }) {
  Vue.set(state.notes, membershipId, notes)
}
