import * as clanService from '@/services/ClanService'

export function addNote({ commit, rootState }, payload) {
  return new Promise((resolve, reject) => {
    const note = {
      membershipId: payload.membershipId,
      note: payload.note,
      adminMembershipId: rootState.session.membershipId,
      adminMembershipType: 'bungienet'
    }
    clanService
      .addNoteForMember(rootState.clanId, note)
      .then(createdNote => {
        commit('ADD_NOTE_FOR_MEMBER', createdNote)
        resolve()
      })
      .catch(error => reject(error))
  })
}

export function getNotes({ commit, rootState }, membershipId) {
  return new Promise((resolve, reject) => {
    clanService.getNotesForMember(rootState.clanId, membershipId).then(notes => {
      commit('SET_NOTES_FOR_MEMBER', { membershipId, notes })
      resolve()
    })
  })
}
