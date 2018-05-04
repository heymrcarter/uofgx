describe('roadmap actions', () => {
  let subject, roadmapService

  beforeEach(() => {
    roadmapService = td.replace('@/services/RoadmapService')
    subject = require('@/store/modules/roadmap/actions')
  })

  describe('getRoadmap', () => {
    let commit

    beforeEach(async() => {
      commit = td.function()
      td.when(roadmapService.getRoadmap()).thenResolve('roadmap')
      await subject.getRoadmap({ commit })
    })

    it('fetches the roadmap and saves it to the store', () => {
      td.verify(commit('SET_ROADMAP', 'roadmap'))
    })
  })

  describe('submitSuggestion', () => {
    beforeEach(async() => {
      const rootState = {
        session: {
          membershipId: 'membership-id'
        },
        members: {
          list: [
            {
              bungieNetMembershipId: 'membership-id',
              bungieNetUserName: 'member-name'
            }
          ]
        }
      }

      const suggestion = {
        idea: 'suggestion',
        description: 'suggestion description'
      }

      td.when(roadmapService.submitFeatureRequest(td.matchers.anything())).thenResolve()

      await subject.submitSuggestion({ rootState }, suggestion)
    })

    it('submits the suggestion', () => {
      const featureRequest = {
        name: 'suggestion',
        desc: 'suggestion description\n\nSuggested by: member-name (membership-id)',
        pos: 'bottom'
      }
      td.verify(roadmapService.submitFeatureRequest(featureRequest))
    })
  })
})
