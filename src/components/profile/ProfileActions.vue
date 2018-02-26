<template>
  <v-card>
    <v-card-title class="headline">Actions</v-card-title>
    <v-card-actions>
      <v-btn block v-if="!isCurrentlyExempt" @click="makeExempt" :disabled="isLoading">
        <span class="mr-3">Grant exemption</span><v-progress-circular v-if="isLoading" indeterminate color="yellow" :size="20"></v-progress-circular>
      </v-btn>
      <v-btn block v-else @click="liftExemption" :disabled="isLoading">
        <span class="mr-3">Lift exemption</span><v-progress-circular v-if="isLoading" indeterminate color="yellow" :size="20"></v-progress-circular>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment-timezone'
import sort from 'fast-sort'
export default {
  name: 'profile-actions',
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState(['exemptions']),
    membershipId() {
      return this.$route.params.membershipId
    },
    isCurrentlyExempt() {
      if (!this.exemptions[this.membershipId]) {
        return false
      }

      const memberHistory = sort(JSON.parse(JSON.stringify(this.exemptions[this.membershipId].history))).asc(h => h.startDate)
      const endDate = memberHistory[memberHistory.length - 1].endDate
      const today = moment.utc().format()

      return today <= endDate
    }
  },
  methods: {
    ...mapActions(['grantExemption', 'editExemption']),
    makeExempt() {
      const exemption = {
        membershipId: this.membershipId,
        startDate: moment.utc(),
        endDate: moment.utc().add(1, 'month'),
        adminMembershipId: ''
      }

      this.isLoading = true
      this.grantExemption(exemption)
        .then(() => {
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    liftExemption() {
      const memberHistory = sort(JSON.parse(JSON.stringify(this.exemptions[this.membershipId].history))).asc(h => h.startDate)
      const currentExemption = memberHistory[memberHistory.length - 1]

      currentExemption.endDate = moment.utc()

      this.isLoading = true
      this.editExemption(currentExemption)
        .then(() => {
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
