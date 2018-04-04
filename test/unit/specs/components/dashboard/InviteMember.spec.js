import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { createMockStore, createMockModule } from 'vuex-test-helpers'
import InviteMember from '@/components/dashboard/InviteMember'
import Vuetify from 'vuetify'

describe('InviteMember', () => {
  let wrapper, subject, memberModule

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(Vuetify)

    memberModule = createMockModule('members', { namespaced: true }).withActions(['sendInvitation', 'validateMemberName'])
    const { store } = createMockStore().withModule(memberModule.name, memberModule.module)

    wrapper = mount(InviteMember, {
      localVue,
      store: new Vuex.Store(store)
    })
    subject = wrapper.vm
  })

  describe('searching for a member to invite', () => {
    beforeEach(() => {
      const searchField = wrapper.find('#search')
      searchField.element.value = 'member-name'
      searchField.trigger('input')
      wrapper.find('#search-button').trigger('click')
    })

    it('checks to see if the input member name is a valid member', () => {
      const anything = td.matchers.anything
      td.verify(memberModule.module.actions.validateMemberName(anything(), 'member-name', undefined))
    })
  })

  describe('inviting a new member', () => {
    let anything

    beforeEach(() => {
      anything = td.matchers.anything
    })

    describe('when the searched member is valid', () => {
      describe('and is active on one platform', () => {
        beforeEach(() => {
          td.when(memberModule.module.actions.validateMemberName(anything(), 'member-name', undefined)).thenResolve([{ membershipType: 'membership-type', membershipId: 'membership-id' }])

          const searchField = wrapper.find('#search')
          searchField.element.value = 'member-name'
          searchField.trigger('input')
          wrapper.find('#search-button').trigger('click')
        })

        it('sends an invite to the member', () => {
          const expectedPayload = { membershipType: 'membership-type', membershipId: 'membership-id' }
          td.verify(memberModule.module.actions.sendInvitation(anything(), expectedPayload, undefined))
        })
      })

      describe('and is active on more than one platform', () => {
        beforeEach(async() => {
          td.when(memberModule.module.actions.validateMemberName(anything(), 'member-name', undefined)).thenResolve([
            {
              membershipType: 'membership-type-1',
              membershipId: 'membership-id-1'
            },
            {
              membershipType: 'membership-type-2',
              membershipId: 'membership-id-2'
            }
          ])

          const searchField = wrapper.find('#search')
          searchField.element.value = 'member-name'
          searchField.trigger('input')
          wrapper.find('#search-button').trigger('click')
          await subject.$nextTick()
        })

        it('renders the platforms the member is active on to be selected', () => {
          expect(wrapper.find('.platforms').exists()).toBe(true)
        })

        describe('selecting a platform', () => {
          beforeEach(() => {
            wrapper.findAll('.platform').wrappers[1].trigger('click')
          })

          it('sends an invite', () => {
            const expectedPayload = { membershipType: 'membership-type-2', membershipId: 'membership-id-2' }
            td.verify(memberModule.module.actions.sendInvitation(anything(), expectedPayload, undefined))
          })
        })
      })
    })
  })
})
