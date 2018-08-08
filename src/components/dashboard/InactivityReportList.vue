<template>
  <v-list three-line subheader>
    <v-subheader>{{ title }} ({{ items.length }})</v-subheader>
    <template v-for="(profile, i) in items">
      <div :key="i">
        <inactivity-report-row
          :profile="profile"
          :isCurrentlyExempt="isCurrentlyExempt(profile.membershipId)"
          :numberExemptions="getNumberOfExemptions(profile.membershipId)"
          @click="showMemberDetail(profile)"></inactivity-report-row>
        <v-divider v-if="i !== items.length - 1"></v-divider>
      </div>
    </template>
  </v-list>
</template>

<script>
import { mapGetters, createNamespacedHelpers } from 'vuex'
import InactivityReportRow from './InactivityReportRow'
import sort from 'fast-sort'
import moment from 'moment-timezone'
const { mapActions } = createNamespacedHelpers('members/active')
export default {
  name: 'inactivity-report-list',
  props: {
    items: Array,
    title: String
  },
  computed: {
    ...mapGetters(['exemptions'])
  },
  components: {
    InactivityReportRow
  },
  methods: {
    ...mapActions({ setActiveMember: 'set' }),
    isCurrentlyExempt(membershipId) {
      if (!this.exemptions[membershipId]) {
        return false
      }

      const memberHistory = sort(JSON.parse(JSON.stringify(this.exemptions[membershipId].history))).asc(h => h.startDate)
      const endDate = memberHistory[memberHistory.length - 1].endDate
      const today = moment.utc().format()

      return today <= endDate
    },
    getNumberOfExemptions(membershipId) {
      if (!this.exemptions[membershipId]) {
        return 0
      }

      return this.exemptions[membershipId].numberOfExemptions
    },
    showMemberDetail(profile) {
      this.setActiveMember({ membershipId: profile.membershipId })
      this.$router.push({ name: 'Profile', params: { membershipId: profile.membershipId } })
    }
  }
}
</script>
