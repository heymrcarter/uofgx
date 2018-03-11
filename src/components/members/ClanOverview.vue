<template>
  <v-card height="100%">
    <v-card-title class="headline">Clan overview</v-card-title>

    <v-card-text>
      <loadable-indicator v-if="isLoading"></loadable-indicator>
      <v-list>
        <clan-overview-item
          v-if="loadMembersError"
          icon="warning"
          :text="`Couldn't load clan members`"
          actionText="Retry"
          @action="fetchClanMembers"></clan-overview-item>
        <clan-overview-item
          v-if="!isLoadingMembers && !loadMembersError && clanMembers"
          icon="group"
          :text="numberOfMembersText"></clan-overview-item>

        <v-divider inset v-if="!isLoadingMembers"></v-divider>

        <clan-overview-item
          v-if="pendingMembersLoadError"
          icon="warning"
          :text="`Couldn't load pending members`"
          actionText="Retry"
          @action="fetchPendingMembers"></clan-overview-item>
        <clan-overview-item
          v-if="!isLoadingPendingMembers && !pendingMembersLoadError && pendingMembers"
          icon="group_add"
          actionText="View"
          :text="pendingMembersText"
          @action="shouldRenderPendingMembers = true"></clan-overview-item>

        <v-divider inset v-if="!isLoadingPendingMembers"></v-divider>

        <clan-overview-item
          v-if="invitedMembersLoadError"
          icon="warning"
          :text="`Couldn't load invited members`"
          actionText="Retry"
          @action="fetchInvitedMembers"></clan-overview-item>
        <clan-overview-item
          v-if="!isLoadingInvitedMembers && !invitedMembersLoadError && invitedMembers"
          icon="group_add"
          actionText="View"
          :text="invitedMembersText"
          @action="shouldRenderInvitedMembers = true"></clan-overview-item>
      </v-list>
    </v-card-text>

    <pending-members :active="shouldRenderPendingMembers" @close="onDialogClose('shouldRenderPendingMembers')"></pending-members>
    <invited-members :active="shouldRenderInvitedMembers" @close="onDialogClose('shouldRenderInvitedMembers')"></invited-members>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PendingMembers from './PendingMembers'
import InvitedMembers from './InvitedMembers'
import LoadableIndicator from '@/components/LoadableIndicator'
import ClanOverviewItem from './ClanOverviewItem'
export default {
  name: 'clan-overview',
  components: {
    PendingMembers,
    InvitedMembers,
    LoadableIndicator,
    ClanOverviewItem
  },
  data() {
    return {
      shouldRenderPendingMembers: false,
      shouldRenderInvitedMembers: false,
      isLoadingPendingMembers: false,
      isLoadingInvitedMembers: false,
      pendingMembersLoadError: false,
      invitedMembersLoadError: false
    }
  },
  computed: {
    ...mapGetters('members/pending', ['pendingMembers']),
    ...mapGetters('members/invited', ['invitedMembers']),
    ...mapGetters('members', ['clanMembers', 'isLoadingMembers', 'didLoadMembers', 'loadMembersError']),
    isLoading() {
      return this.isLoadingMembers || this.isLoadingPendingMembers || this.isLoadingInvitedMembers
    },
    numberOfMembersText() {
      if (this.clanMembers) {
        if (this.clanMembers.length === 0) {
          return 'No Members'
        } else if (this.clanMembers.length === 1) {
          return '1 member'
        } else {
          return `${this.clanMembers.length} members`
        }
      }
    },
    pendingMembersText() {
      if (this.pendingMembers) {
        if (this.pendingMembers.length === 0) {
          return 'No pending members'
        } else if (this.pendingMembers.length === 1) {
          return '1 pending member'
        } else {
          return `${this.pendingMembers.length} pending members`
        }
      }
    },
    invitedMembersText() {
      if (this.invitedMembers) {
        if (this.invitedMembers.length === 0) {
          return 'No invited members'
        } else if (this.invitedMembers.length === 1) {
          return '1 invited member'
        } else {
          return `${this.invitedMembers.length} invited members`
        }
      }
    }
  },
  methods: {
    ...mapActions('members/pending', ['getPendingMembers']),
    ...mapActions('members/invited', ['getInvitedMembers']),
    ...mapActions('members', ['getClanMembers']),
    onDialogClose(dialog) {
      this.getClanMembers()
      this[dialog] = false
    },
    fetchAll() {
      this.fetchClanMembers()
      this.fetchPendingMembers()
      this.fetchInvitedMembers()
    },
    fetchClanMembers() {
      if (!this.didLoadMembers && !this.isLoadingMembers) {
        this.getClanMembers().catch(error => {
          console.error(error)
        })
      }
    },
    fetchPendingMembers() {
      this.isLoadingPendingMembers = true
      this.pendingMembersLoadError = false
      this.getPendingMembers()
        .then(() => {
          this.isLoadingPendingMembers = false
        })
        .catch(error => {
          console.error(error)
          this.pendingMembersLoadError = true
        })
    },
    fetchInvitedMembers() {
      this.isLoadingInvitedMembers = true
      this.invitedMembersLoadError = false
      this.getInvitedMembers()
        .then(() => {
          this.isLoadingInvitedMembers = false
        })
        .catch(error => {
          console.error(error)
          this.isLoadingInvitedMembers = false
          this.invitedMembersLoadError = true
        })
    }
  },
  mounted() {
    this.fetchAll()
  }
}
</script>

<style scoped>

</style>
