import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { createMockStore, createMockModule } from 'vuex-test-helpers'

describe('OAuthHandler', () => {
  let wrapper, subject, store, router, route, OAuthHandler, getAccessToken, getUserGroups

  beforeEach(() => {
    const oauthUtil = td.replace('@/utils/oauth-util')
    td.when(oauthUtil.checkOAuthState('state')).thenReturn(true)

    const localVue = createLocalVue()
    localVue.use(Vuex)

    const sessionModule = createMockModule('session', { namespaced: true }).withActions(['getAccessToken', 'getUserGroups'])
    getAccessToken = sessionModule.module.actions.getAccessToken
    getUserGroups = sessionModule.module.actions.getUserGroups

    store = createMockStore().withModule(sessionModule.name, sessionModule.module).store

    router = {
      replace: td.function()
    }

    route = {
      query: {
        code: 'the-code',
        state: 'state'
      }
    }

    OAuthHandler = require('@/components/OAuthHandler')
    wrapper = shallow(OAuthHandler, {
      localVue,
      store: new Vuex.Store(store),
      mocks: {
        $route: route,
        $router: router
      }
    })
    subject = wrapper.vm
  })

  describe('on mount', () => {
    describe('when a session is established', () => {
      beforeEach(() => {
        td.when(getAccessToken(td.matchers.isA(Object), 'the-code', undefined)).thenResolve('the-session')
      })

      describe('when the user has access', () => {
        beforeEach(() => {
          jest.spyOn(subject, 'recordEvent')
          const groups = [
            {
              platformUserInfo: { membershipType: 1 }
            }
          ]
          td.when(getUserGroups(td.matchers.isA(Object), 'the-session', undefined)).thenResolve(groups)
          subject.$mount()
        })

        it('emits an analytics event', () => {
          expect(subject.recordEvent).toBeCalledWith('App', 'Login', undefined, 'Xbox')
        })

        it('redirects the user to the dashboard', () => {
          td.verify(router.replace('/dashboard'))
        })
      })
    })
  })
})
