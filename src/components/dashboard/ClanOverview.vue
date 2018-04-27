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
          v-if="!isLoadingPendingMembers && !pendingMembersLoadError && pendingMembers && pendingMembers.length == 0"
          icon="group_add"
          actionText="Reload"
          :text="pendingMembersText"
          @action="fetchPendingMembers(true)"></clan-overview-item>
        <clan-overview-item
          v-if="!isLoadingPendingMembers && !pendingMembersLoadError && pendingMembers && pendingMembers.length > 0"
          icon="group_add"
          actionText="View"
          :text="pendingMembersText"
          @action="viewPendingMembers"></clan-overview-item>

        <v-divider inset v-if="!isLoadingPendingMembers"></v-divider>

        <clan-overview-item
          v-if="invitedMembersLoadError"
          icon="warning"
          :text="`Couldn't load invited members`"
          actionText="Retry"
          @action="fetchInvitedMembers"></clan-overview-item>
        <clan-overview-item
          v-if="!isLoadingInvitedMembers && !invitedMembersLoadError && invitedMembers && invitedMembers.length == 0"
          icon="group_add"
          actionText="Reload"
          :text="invitedMembersText"
          @action="fetchInvitedMembers(true)"></clan-overview-item>
        <clan-overview-item
          v-if="!isLoadingInvitedMembers && !invitedMembersLoadError && invitedMembers && invitedMembers.length > 0"
          icon="group_add"
          actionText="View"
          :text="invitedMembersText"
          @action="viewInvitedMembers"></clan-overview-item>

        <v-divider inset v-if="!isLoadingPendingMembers"></v-divider>

        <clan-overview-item
          v-if="activityReportLoadError"
          icon="warning"
          :text="`Couldn't load inactive members`"
          actionText="Retry"
          @action="fetchInactiveMembers"></clan-overview-item>
        <clan-overview-item
          v-if="!isLoadingActivityReport && !activityReportLoadError && inactiveMembers && inactiveMembers.length === 0"
          icon="local_hotel"
          actionText="Reload"
          :text="inactiveMembersText"
          @action="fetchInactiveMembers(true)"></clan-overview-item>
        <clan-overview-item
          v-if="!isLoadingActivityReport && !activityReportLoadError && inactiveMembers && inactiveMembers.length > 0"
          icon="local_hotel"
          actionText="View"
          :text="inactiveMembersText"
          @action="$router.push('/inactive-players')"></clan-overview-item>
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
import analytics from '@/mixins/analytics'
export default {
  name: 'clan-overview',
  components: {
    PendingMembers,
    InvitedMembers,
    LoadableIndicator,
    ClanOverviewItem
  },
  mixins: [analytics],
  data() {
    return {
      shouldRenderPendingMembers: false,
      shouldRenderInvitedMembers: false
    }
  },
  computed: {
    ...mapGetters('members/pending', ['pendingMembers', 'isLoadingPendingMembers', 'didLoadPendingMembers', 'pendingMembersLoadError']),
    ...mapGetters('members/invited', ['invitedMembers', 'isLoadingInvitedMembers', 'didLoadInvitedMembers', 'invitedMembersLoadError']),
    ...mapGetters('members', ['clanMembers', 'isLoadingMembers', 'didLoadMembers', 'loadMembersError']),
    ...mapGetters(['activityReport', 'activityReportLoadError', 'isLoadingActivityReport', 'didLoadActivityReport']),
    isLoading() {
      return this.isLoadingMembers || this.isLoadingPendingMembers || this.isLoadingInvitedMembers || this.isLoadingInactiveMembers
    },
    inactiveMembers() {
      if (!this.activityReport) {
        return []
      }

      return this.activityReport.filter(p => p.isInactive)
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
    },
    inactiveMembersText() {
      if (this.inactiveMembers) {
        if (this.inactiveMembers.length === 0) {
          return 'No inactive members'
        } else if (this.inactiveMembers === 1) {
          return '1 inactive member'
        } else {
          return `${this.inactiveMembers.length} inactive members`
        }
      }
    }
  },
  methods: {
    ...mapActions('members/pending', ['getPendingMembers']),
    ...mapActions('members/invited', ['getInvitedMembers']),
    ...mapActions('members', ['getClanMembers']),
    ...mapActions(['getActivityReport']),
    onDialogClose(dialog) {
      this.getClanMembers()
      this[dialog] = false
    },
    fetchAll() {
      this.fetchClanMembers()
      this.fetchPendingMembers()
      this.fetchInvitedMembers()
      this.fetchInactiveMembers()
    },
    fetchClanMembers() {
      if (!this.didLoadMembers && !this.isLoadingMembers) {
        this.getClanMembers().catch(error => {
          console.error(error)
        })
      }
    },
    fetchPendingMembers(bypass = false) {
      if (bypass) {
        this.recordEvent('Dashboard', 'Reload', 'Pending Members')
        this.getPendingMembers().catch(error => {
          console.error(error)
        })
      } else {
        if (!this.didLoadPendingMembers && !this.isLoadingPendingMembers) {
          this.getPendingMembers().catch(error => {
            console.error(error)
          })
        }
      }
    },
    fetchInvitedMembers(bypass = false) {
      if (bypass) {
        this.recordEvent('Dashboard', 'Reload', 'Invited Members')
        this.getInvitedMembers().catch(error => {
          console.error(error)
        })
      } else {
        if (!this.didLoadInvitedMembers && !this.isLoadingInvitedMembers) {
          this.getInvitedMembers().catch(error => {
            console.error(error)
          })
        }
      }
    },
    fetchInactiveMembers(bypass = false) {
      if (bypass) {
        this.recordEvent('Dashboard', 'Reload', 'Inactive Members')
        this.getActivityReport().catch(error => {
          console.error(error)
        })
      } else {
        if (!this.didLoadActivityReport && !this.isLoadingActivityReport) {
          this.getActivityReport().catch(error => {
            console.error(error)
          })
        }
      }
    },
    viewPendingMembers() {
      this.recordEvent('Dashboard', 'View', 'Pending Members')
      this.shouldRenderPendingMembers = true
    },
    viewInvitedMembers() {
      this.recordEvent('Dashboard', 'View', 'Invited Members')
      this.shouldRenderInvitedMembers = true
    }
  },
  mounted() {
    this.fetchAll()
  }
}
</script>
