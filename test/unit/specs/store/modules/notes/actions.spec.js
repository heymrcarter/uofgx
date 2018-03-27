describe('notes actions', () => {
  let subject, clanService, commit

  beforeEach(() => {
    clanService = td.replace('@/services/ClanService')
    subject = require('@/store/modules/notes/actions')
    commit = td.function()
  })

  describe('addNote', () => {
    beforeEach(done => {
      const rootState = {
        clanId: 'clan-id',
        session: {
          membershipId: 'admin-membership-id'
        }
      }
      const payload = {
        membershipId: 'membership-id',
        note: 'the note',
        adminMembershipId: 'admin-membership-id',
        adminMembershipType: 'bungienet'
      }
      td.when(clanService.addNoteForMember('clan-id', payload)).thenResolve('the-created-note')
      subject.addNote({ commit, rootState }, { membershipId: 'membership-id', note: 'the note' }).finally(done)
    })

    it('sends the note to the backend and commits the created note', () => {
      td.verify(commit('ADD_NOTE_FOR_MEMBER', 'the-created-note'))
    })
  })

  describe('getNotes', () => {
    beforeEach(async() => {
      const rootState = { clanId: 'clan-id' }
      td.when(clanService.getNotesForMember('clan-id', 'membership-id')).thenResolve('the notes')
      await subject.getNotes({ commit, rootState }, 'membership-id')
    })

    it('commits the notes to the store', () => {
      td.verify(commit('SET_NOTES_FOR_MEMBER', { membershipId: 'membership-id', notes: 'the notes' }))
    })
  })
})
