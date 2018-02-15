<template>
  <v-container fluid v-if="clanMembers && clanMembers.length > 0">
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
    <loading-indicator :is-loading="isLoading" context="global"></loading-indicator>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingIndicator from './LoadingIndicator'
import MemberRow from './members/MemberRow'

export default {
  name: 'clan-member-list',
  components: {
    LoadingIndicator,
    MemberRow
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
      return this.filter !== null ? this.clanMembers.filter(m => m.bungieNetUserName.toLowerCase().includes(this.filter) || m.xboxUserName.toLowerCase().includes(this.filter)) : this.clanMembers
    }
  },
  methods: {
    ...mapActions(['getClanMembers', 'getCharactersForMember', 'getExemptions']),
    showMemberDetail(member) {
      this.isLoadingCharacters = true
      this.getCharactersForMember({ xboxUserName: member.xboxUserName, xboxMembershipId: member.xboxMembershipId }).then(() => {
        this.isLoadingCharacters = false
        this.$router.push({ name: 'Profile', params: { membershipId: member.xboxMembershipId } })
      })
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
