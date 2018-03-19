<template>
  <div>
    <v-form>
      <div>
        <v-text-field solo placeholder="Search by Gamertag or Bungie.net username" v-model="filter" clearable></v-text-field>
      </div>
    </v-form>

    <v-list three-line class="elevation-1">
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
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import MemberRow from '@/components/dashboard/MemberRow'
const { mapGetters } = createNamespacedHelpers('members')
const { mapActions } = createNamespacedHelpers('members/active')
export default {
  name: 'member-list',
  data() {
    return {
      filter: ''
    }
  },
  computed: {
    ...mapGetters(['clanMembers']),
    presentedList() {
      if (!this.clanMembers) {
        return []
      }

      const filter = this.filter
      function searchByUsername(username) {
        return username.toLowerCase().includes(filter)
      }

      return this.filter !== null ? this.clanMembers.filter(m => searchByUsername(m.bungieNetUserName) || searchByUsername(m.xboxUserName)) : this.clanMembers
    }
  },
  methods: {
    ...mapActions({ setActiveMember: 'set' }),
    showMemberDetail(member) {
      this.setActiveMember({ membershipId: member.xboxMembershipId })
      this.$router.push({
        name: 'Profile',
        params: { membershipId: member.xboxMembershipId }
      })
    }
  },
  components: {
    MemberRow
  }
}
</script>
