import active from './modules/active'
import pending from './modules/pending'
import invited from './modules/invited'

export default {
  namespaced: true,
  modules: {
    active,
    pending,
    invited
  }
}
