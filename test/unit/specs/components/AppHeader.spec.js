import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { createMockStore, createMockModule } from 'vuex-test-helpers'
import AppHeader from '@/components/AppHeader'
import Vuetify from 'vuetify'

describe('AppHeader', () => {
  let wrapper, store
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(Vuetify)

    const activeMembersModule = createMockModule('active', { namespaced: true }).withGetters(['activeMember'])
    const membersModule = createMockModule('members', { namespaced: true }).withModule(activeMembersModule.name, activeMembersModule.module)
    const roadmapModule = createMockModule('roadmap')
      .withState({ roadmap: 'roadmap' })
      .withActions(['getRoadmap'])

    store = createMockStore()
      .withState({ clanName: 'Group name' })
      .withModule(membersModule.name, membersModule.module)
      .withModule(roadmapModule.name, roadmapModule.module).store

    wrapper = mount(AppHeader, {
      localVue,
      store: new Vuex.Store(store),
      mocks: {
        $route: {
          name: 'Dashboard'
        }
      }
    })
  })

  it('renders the clan name in the title', () => {
    expect(wrapper.find('.clan-name').text()).toContain('Group name')
  })
})
