<template>
  <v-container fluid grid-list-lg>
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
import CharacterSelector from './CharacterSelector'
import ActivityBreakdownChart from './ActivityBreakdownChart'
import ActivityByDateChart from './ActivityByDateChart'
import RecentActivityTable from './RecentActivityTable'
export default {
  name: 'character-activity',
  data() {
    return {
      selectedCharacter: undefined
    }
  },
  methods: {
    characterChange(nextCharacterId) {
      this.selectedCharacter = nextCharacterId
    }
  },
  computed: {
    currentMembershipId() {
      return this.$route.params.membershipId
    }
  },
  components: {
    CharacterSelector,
    ActivityBreakdownChart,
    ActivityByDateChart,
    RecentActivityTable
  }
}
</script>
