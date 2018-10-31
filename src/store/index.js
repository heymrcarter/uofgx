import Vue from 'vue'
import Vuex from 'vuex'
import exemptions from './modules/exemptions'
import removalHistory from './modules/removal-history'
import activityReport from './modules/activity-report'
import cache from './modules/cache'
import members from './modules/members'
import activity from './modules/activity'
import session from './modules/session'
import * as actions from './actions'
import * as mutations from './mutations'
import notes from './modules/notes'
import roadmap from './modules/roadmap'
import characters from './modules/characters'

Vue.use(Vuex)

// const vuexLocalStorage = new VuexPersist({
//   key: `dcm-${process.env.NODE_ENV}`,
//   storage: window.localStorage,
//   reducer: state => ({
//     session: state.session,
//     clanId: state.clanId,
//     clanName: state.clanName
//   })
// })

export default new Vuex.Store({
  // plugins: [vuexLocalStorage.plugin],
  state: {
    clanId: undefined,
    clanName: undefined,
    membershipType: undefined,
    weeklyMilestones: undefined,
    isLoadingWeeklyMilestones: false,
    didLoadWeeklyMilestones: false,
    weeklyMilestonesLoadError: false
  },
  actions,
  mutations,
  modules: {
    exemptions,
    removalHistory,
    activityReport,
    cache,
    members,
    activity,
    session,
    notes,
    roadmap,
    characters
  }
})
