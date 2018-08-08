import * as actions from './actions'
import * as mutations from './mutations'
import sort from 'fast-sort'
import moment from 'moment-timezone'

function isCurrentlyExempt(history) {
  const endDate = history[history.length - 1].endDate
  const today = moment.utc().format()

  return today < endDate
}

function getActiveExemption(history) {
  const endDate = history[history.length - 1].endDate
  const today = moment.utc().format()

  if (today < endDate) {
    return history[history.length - 1]
  }

  return undefined
}

export default {
  state: {
    exemptions: undefined
  },
  getters: {
    exemptions: state => state.exemptions,
    currentExemptMembers(state) {
      if (!state.exemptions) {
        return []
      }

      const currentlyExemptMembers = []
      Object.keys(state.exemptions).forEach(membershipId => {
        const memberHistory = sort(JSON.parse(JSON.stringify(state.exemptions[membershipId].history))).asc(h => h.startDate)

        if (isCurrentlyExempt(memberHistory)) {
          const exemptMember = {
            membershipId,
            numberOfExemptions: state.exemptions[membershipId].numberExemptions
          }

          const activeExemption = getActiveExemption(memberHistory)

          exemptMember.grantedBy = activeExemption.adminMembershipId
          exemptMember.endDate = activeExemption.endDate

          currentlyExemptMembers.push(exemptMember)
        }
      })

      return currentlyExemptMembers
    },
    numberOfCurrentExemptions(state) {
      if (!state.exemptions) {
        return false
      }

      let numberOfExemptions = 0
      Object.keys(state.exemptions).forEach(membershipId => {
        const memberHistory = sort(JSON.parse(JSON.stringify(state.exemptions[membershipId].history))).asc(h => h.startDate)

        if (isCurrentlyExempt(memberHistory)) {
          numberOfExemptions++
        }
      })

      return numberOfExemptions
    }
  },
  actions,
  mutations
}
