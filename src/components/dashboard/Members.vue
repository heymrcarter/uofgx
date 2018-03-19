<template>
  <v-card>
    <v-card-title class="headline">Clan members</v-card-title>
    <v-card-text>
      <loadable-indicator v-if="isLoadingMembers"></loadable-indicator>
      <loadable-failure
        v-else-if="loadMembersError"
        :message="`Couldn't load members.`"
        :retryable="true"
        @retry="fetchMembers"></loadable-failure>
      <member-list v-else></member-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import LoadableIndicator from '@/components/LoadableIndicator'
import LoadableFailure from '@/components/LoadableFailure'
import MemberList from '@/components/dashboard/MemberList'
const { mapActions, mapGetters } = createNamespacedHelpers('members')
export default {
  name: 'members',
  components: {
    LoadableIndicator,
    LoadableFailure,
    MemberList
  },
  computed: {
    ...mapGetters(['clanMembers', 'isLoadingMembers', 'didLoadMembers', 'loadMembersError'])
  },
  methods: {
    ...mapActions(['getClanMembers']),
    fetchMembers() {
      this.getClanMembers().catch(error => {
        console.error(error)
      })
    }
  },
  mounted() {
    if (!this.isLoadingMembers && !this.didLoadMembers) {
      this.fetchMembers()
    }
  }
}
</script>
