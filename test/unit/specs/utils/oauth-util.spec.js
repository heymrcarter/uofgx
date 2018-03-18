import * as subject from '@/utils/oauth-util'

describe('oauth util', () => {
  describe('checkOAuthState', () => {
    beforeEach(() => {
      process.env.OAUTH_SECRET = 'oauth-secret'
    })

    afterEach(() => {
      delete process.env.OAUTH_SECRET
    })

    it('returns true when the state matches the environment secret', () => {
      expect(subject.checkOAuthState(btoa(process.env.OAUTH_SECRET))).toBe(true)
    })
  })
})
