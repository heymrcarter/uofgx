import * as mutations from './mutations'
import * as actions from './actions'

export default {
  state: {
    characters: {}
  },
  getters: {
    characters: state => state.characters
  },
  actions,
  mutations
}
