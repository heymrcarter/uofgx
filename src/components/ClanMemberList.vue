<template>
  <v-container grid-list-lg fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <clan-overview></clan-overview>
      </v-flex>

      <v-flex xs12 sm6>
        <removal-history></removal-history>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-form>
            <div>
              <v-text-field solo dark placeholder="Filter" v-model="filter" clearable></v-text-field>
            </div>
          </v-form>
          <v-list dark three-line>
            <v-list-tile v-if="presentedList.length === 0">
              <v-list-tile-content>
                No members
              </v-list-tile-content>
            </v-list-tile>
            <template v-for="(member, i) in presentedList" v-if="presentedList.length > 0">
              <member-row :key="member.xboxMembershipId" :member="member" @click="showMemberDetail(member)"></member-row>
              <v-divider inset :key="i" v-if="i !== presentedList.length"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

    <loading-indicator :is-loading="isLoading" context="global"></loading-indicator>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingIndicator from './LoadingIndicator'
import MemberRow from './members/MemberRow'
import RemovalHistory from './members/RemovalHistory'
import ClanOverview from './members/ClanOverview'

export default {
  name: 'clan-member-list',
  components: {
    LoadingIndicator,
    MemberRow,
    RemovalHistory,
    ClanOverview
  },
  data() {
    return {
      isLoading: false,
      isLoadingCharacters: false,
      filter: null
    }
  },
  computed: {
    ...mapGetters(['clanMembers', 'activeMember', 'exemptions']),
    presentedList() {
      if (!this.clanMembers) {
        return []
      }

      return this.filter !== null ? this.clanMembers.filter(m => m.bungieNetUserName.toLowerCase().includes(this.filter) || m.xboxUserName.toLowerCase().includes(this.filter)) : this.clanMembers
    }
  },
  methods: {
    ...mapActions(['getClanMembers', 'getCharactersForMember', 'getExemptions']),
    showMemberDetail(member) {
      this.$router.push({ name: 'Profile', params: { membershipId: member.xboxMembershipId } })
    }
  },
  mounted() {
    if (!this.clanMembers) {
      this.isLoading = true
      this.getClanMembers().then(() => {
        this.isLoading = false
      })
    }

    this.getExemptions()
  }
}
</script>
