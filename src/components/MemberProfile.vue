<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 md5>
        <characters :membershipId="currentMembershipId"></characters>
      </v-flex>

      <v-flex xs12 md4>
        <exemptions></exemptions>
      </v-flex>

      <v-flex xs12 md3>
        <profile-actions></profile-actions>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <character-selector @characterChanged="characterChange"></character-selector>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 md6 fill-height>
        <activity-breakdown-chart :characterId="selectedCharacter" :membershipId="currentMembershipId"></activity-breakdown-chart>
      </v-flex>

      <v-flex xs12 md6>
        <activity-by-date-chart :characterId="selectedCharacter" :membershipId="currentMembershipId"></activity-by-date-chart>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <recent-activity-table :characterId="selectedCharacter" :membershipId="currentMembershipId"></recent-activity-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Characters from './profile/Characters'
import Exemptions from './profile/Exemptions'
import CharacterSelector from './profile/CharacterSelector'
import ActivityBreakdownChart from './profile/ActivityBreakdownChart'
import ActivityByDateChart from './profile/ActivityByDateChart'
import RecentActivityTable from './profile/RecentActivityTable'
import ProfileActions from './profile/ProfileActions'

export default {
  name: 'member-profile',
  components: {
    Characters,
    Exemptions,
    CharacterSelector,
    ActivityBreakdownChart,
    ActivityByDateChart,
    RecentActivityTable,
    ProfileActions
  },
  data() {
    return {
      selectedCharacter: undefined
    }
  },
  computed: {
    currentMembershipId() {
      return this.$route.params.membershipId
    }
  },
  methods: {
    characterChange(nextCharacterId) {
      this.selectedCharacter = nextCharacterId
    }
  }
}
</script>

<style scoped>

</style>
