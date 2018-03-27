import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { createMockStore, createMockModule } from 'vuex-test-helpers'
import AddNoteAction from '@/components/profile/AddNoteAction'
import Vuetify from 'vuetify'

describe('AddNoteAction', () => {
  let wrapper, subject, notesModule

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(Vuetify)

    notesModule = createMockModule('notes', { namespaced: true }).withActions(['addNote'])
    const { store } = createMockStore().withModule(notesModule.name, notesModule.module)

    wrapper = mount(AddNoteAction, {
      localVue,
      store: new Vuex.Store(store),
      propsData: {
        membershipId: 'membership-id'
      }
    })

    subject = wrapper.vm
  })

  describe('button', () => {
    let button

    beforeEach(() => {
      button = wrapper.find('.add-note')
    })

    it('renders the Add note button', () => {
      expect(button.exists()).toBe(true)
    })

    describe('when the button is clicked', () => {
      beforeEach(async() => {
        button.trigger('click')
        await subject.$nextTick()
      })

      it('opens the add note dialog', () => {
        expect(wrapper.find('.new-note').exists()).toBe(true)
      })

      describe('submitting a new note', () => {
        let payload

        beforeEach(async() => {
          payload = {
            membershipId: 'membership-id',
            note: 'the note'
          }
          td.when(notesModule.module.actions.addNote(td.matchers.anything(), payload, undefined)).thenResolve()
          wrapper.setData({ note: 'the note' })
          wrapper.find('.submit-note').trigger('click')
          await subject.$nextTick()
        })

        it('saves the note and dismisses the dialog', () => {
          td.verify(notesModule.module.actions.addNote(td.matchers.anything(), payload, undefined))
          expect(subject.shouldRenderNoteDialog).toBe(false)
        })
      })
    })
  })
})
