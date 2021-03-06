<template>
  <div>
    <v-form>
      <div>
        <v-text-field color="accent" placeholder="Search by Gamertag or Bungie.net username" v-model="filter" append-icon="close" @click:append="clearFilter"></v-text-field>
      </div>
    </v-form>

    <div class="no-members" v-if="presentedList.length === 0">
      <v-icon>group</v-icon>
      <p>No members</p>
    </div>

    <v-list three-line v-else>
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
import analytics from '@/mixins/analytics'
const { mapGetters } = createNamespacedHelpers('members')
const { mapActions } = createNamespacedHelpers('members/active')
export default {
  name: 'member-list',
  mixins: [analytics],
  props: {
    members: Array
  },
  data() {
    return {
      filter: '',
      didRecordEvent: false
    }
  },
  computed: {
    ...mapGetters(['clanMembers']),
    presentedList() {
      if (!this.members) {
        return []
      }

      const filter = this.filter

      if (filter && !this.didRecordEvent) {
        this.recordEvent('Dashboard', 'Filter', 'Member List')
        this.didRecordEvent = true // eslint-disable-line
      } else if (!filter) {
        this.didRecordEvent = false // eslint-disable-line
      }

      function searchByUsername(username) {
        return username.toLowerCase().includes(filter)
      }

      return this.filter !== null ? this.members.filter(m => searchByUsername(m.bungieNetUserName) || searchByUsername(m.xboxUserName)) : this.members
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
    },
    clearFilter() {
      this.filter = ''
      this.didRecordEvent = false
    }
  },
  components: {
    MemberRow
  }
}
</script>

<style lang="scss" scoped>
.no-members {
  display: block;

  i {
    display: block;
    text-align: center;
    font-size: 72px;
  }

  p {
    text-align: center;
  }
}
</style>
