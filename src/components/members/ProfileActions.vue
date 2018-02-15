<template>
  <div>
    <v-tooltip bottom color="black">
      <v-btn icon flat slot="activator" @click="makeExempt(membershipId)" :disabled="isCurrentlyExempt(membershipId)">
        <v-icon>snooze</v-icon>
      </v-btn>

      <span>Grant exemption</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment-timezone'
import sort from 'fast-sort'
export default {
  name: 'profile-actions',
  computed: {
    ...mapGetters(['exemptions']),
    membershipId() {
      return this.$route.params.membershipId
    }
  },
  methods: {
    ...mapActions(['grantExemption']),
    isCurrentlyExempt(membershipId) {
      if (!this.exemptions[membershipId]) {
        return false
      }

      const memberHistory = sort(JSON.parse(JSON.stringify(this.exemptions[membershipId].history))).asc(h => h.startDate)
      const endDate = memberHistory[memberHistory.length - 1].endDate
      const today = moment.utc().format()

      return today <= endDate
    },
    makeExempt(membershipId) {
      const exemption = {
        membershipId,
        startDate: moment.utc(),
        endDate: moment.utc().add(1, 'month'),
        adminMembershipId: ''
      }

      this.grantExemption(exemption)
    }
  }
}
</script>
