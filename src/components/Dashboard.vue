<template>
  <v-container grid-list-lg fluid class="mt-2">
    <v-layout row wrap>
      <v-flex xs12 md6>
        <clan-overview></clan-overview>
      </v-flex>

      <v-flex xs12 md6>
        <removal-history></removal-history>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <members></members>
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

export default {
  name: 'dashboard',
  components: {
    MemberRow,
    RemovalHistory,
    ClanOverview,
    Members
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
