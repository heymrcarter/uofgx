describe('notes mutations', () => {
  let subject

  beforeEach(() => {
    subject = require('@/store/modules/notes/mutations')
  })

  describe('ADD_NOTE_FOR_MEMBER', () => {
    let state

    beforeEach(() => {
      state = {
        notes: {}
      }

      const note = {
        membershipId: 'membership-id',
        otherProps: true
      }
      subject.ADD_NOTE_FOR_MEMBER(state, note)
    })

    it('adds the note to the members history', () => {
      expect(state.notes['membership-id']).toEqual([
        {
          membershipId: 'membership-id',
          otherProps: true
        }
      ])
    })
  })

  describe('SET_NOTES_FOR_MEMBER', () => {
    let state

    beforeEach(() => {
      state = {
        notes: {}
      }

      subject.SET_NOTES_FOR_MEMBER(state, { membershipId: 'membership-id', notes: 'the-notes' })
    })

    it('adds the notes to the store for the given member', () => {
      expect(state.notes['membership-id']).toEqual('the-notes')
    })
  })
})
