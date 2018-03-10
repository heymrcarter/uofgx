import * as mutations from './mutations'

export default {
  state: {
    characters: {}
  },
  getters: {
    characters: state => state.characters
  },
  mutations
}
