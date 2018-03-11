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
import MemberRow from './members/MemberRow'
import RemovalHistory from './members/RemovalHistory'
import ClanOverview from './members/ClanOverview'
import Members from './members/Members'

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
