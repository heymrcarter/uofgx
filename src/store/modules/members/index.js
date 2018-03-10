import active from './modules/active'
import pending from './modules/pending'
import invited from './modules/invited'
import * as actions from './actions'
import * as mutations from './mutations'

export default {
  namespaced: true,
  state: {
    list: undefined
  },
  getters: {
    clanMembers: state => state.list
  },
  actions,
  mutations,
  modules: {
    active,
    pending,
    invited
  }
}
