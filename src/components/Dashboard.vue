<template>
  <v-container grid-list-lg fluid class="mt-3">
    <v-layout row wrap>
      <v-flex xs12>
        <member-search></member-search>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 md6 lg4>
        <clan-overview></clan-overview>
      </v-flex>

      <v-flex xs12 md6 lg4>
        <weekly-rewards></weekly-rewards>
      </v-flex>

      <v-flex xs12 md6 lg4>
        <removal-history></removal-history>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MemberRow from './dashboard/MemberRow'
import RemovalHistory from './dashboard/RemovalHistory'
import ClanOverview from './dashboard/ClanOverview'
import Members from './dashboard/Members'
import WeeklyRewards from './dashboard/WeeklyRewards'
import MemberSearch from './dashboard/MemberSearch'

export default {
  name: 'dashboard',
  components: {
    MemberRow,
    RemovalHistory,
    ClanOverview,
    Members,
    WeeklyRewards,
    MemberSearch
  },
  computed: {
    ...mapGetters(['exemptions'])
  },
  methods: {
    ...mapActions(['getExemptions'])
  },
  mounted() {
    this.getExemptions()
  }
}
</script>
