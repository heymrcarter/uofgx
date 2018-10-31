<template>
  <div class="member-search">
    <v-autocomplete
      label="Search for members"
      color="accent"
      :items="members"
      v-model="searchTerm"
      clearable
      prepend-icon="search"
      @input="goToMemberProfile">
        <v-slide-x-reverse-transition
          mode="out-in"
          slot="append-outer">
          <v-btn flat @click="goToMemberProfile" v-if="searchTerm">
            Go <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-slide-x-reverse-transition>
      </v-autocomplete>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('members')
const { mapActions } = createNamespacedHelpers('members/active')
export default {
  name: 'member-search-bar',
  data() {
    return {
      searchTerm: ''
    }
  },
  computed: {
    ...mapGetters(['clanMembers']),
    members() {
      if (!this.clanMembers) {
        return []
      }

      return this.clanMembers.map(m => m.xboxUserName)
    }
  },
  methods: {
    ...mapActions({ setActiveMember: 'set' }),
    goToMemberProfile() {
      const member = this.clanMembers.find(m => m.xboxUserName === this.searchTerm)
      if (member) {
        this.setActiveMember({ membershipId: member.xboxMembershipId })
        this.$router.push({
          name: 'Profile',
          params: { membershipId: member.xboxMembershipId }
        })
      }
    }
  }
}
</script>
