import * as actions from './actions'
import * as mutations from './mutations'

export default {
  namespaced: true,
  state: {
    accessToken: undefined,
    expiresIn: undefined,
    hasAccess: false,
    membershipId: undefined,
    tokenType: undefined,
    showExpiredDialog: false
  },
  getters: {
    session: state => {
      return {
        access_token: state.accessToken,
        expires_in: state.expiresIn,
        hasAccess: state.hasAccess,
        membership_id: state.membershipId,
        token_type: state.tokenType
      }
    },
    showSessionExpirationDialog: state => state.showExpiredDialog
  },
  actions,
  mutations
}
