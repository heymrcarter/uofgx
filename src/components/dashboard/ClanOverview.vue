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
          @action="fetchClanMembers(true)"></clan-overview-item>
        <clan-overview-item
          v-if="!isLoadingMembers && !loadMembersError && clanMembers"
          icon="group"
          :text="numberOfMembersText"
          actionText="View"
          @action="viewMembers"></clan-overview-item>

        <v-divider inset v-if="!isLoadingMembers"></v-divider>

        <clan-overview-item
          v-if="loadMembersError"
          icon="warning"
          :text="`Couldn't load online members`"
          actionText="Retry"
          @action="fetchClanMembers(true)"></clan-overview-item>
        <clan-overview-item
          v-if="!isLoadingMembers && !loadMembersError && clanMembers"
          icon="wifi"
          :text="numberOfOnlineMembersText"
          actionText="View"
          @action="viewOnlineMembers"></clan-overview-item>

        <v-divider inset v-if="!isLoadingMembers"></v-divider>

        <clan-overview-item
          v-if="pendingMembersLoadError"
          icon="warning"
          :text="`Couldn't load pending members`"
          actionText="Retry"
          @action="fetchPendingMembers(true)"></clan-overview-item>
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
          @action="fetchInvitedMembers(true)"></clan-overview-item>
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
          @action="fetchInactiveMembers(true)"></clan-overview-item>
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
          @action="viewInactiveMembers"></clan-overview-item>

        <v-divider inset v-if="!isLoadingExemptMembers"></v-divider>

        <clan-overview-item
          v-if="exemptMembersLoadError"
          icon="warning"
          :text="`Couldn't load exempt members`"
          actionText="Retry"
          @action="fetchExemptMembers(true)"></clan-overview-item>
        <clan-overview-item
          v-if="!isLoadingExemptMembers && !exemptMembersLoadError && numberOfCurrentExemptions === 0"
          icon="explicit"
          actionText="Reload"
          :text="exemptMembersText"
          @action="fetchExemptMembers(true)"></clan-overview-item>
        <clan-overview-item
          v-if="!isLoadingExemptMembers && !exemptMembersLoadError && numberOfCurrentExemptions > 0"
          icon="explicit"
          :text="exemptMembersText"
          actionText="View"
          @action="viewExemptMembers"></clan-overview-item>

        <v-divider inset v-if="!isLoadingBannedMembers"></v-divider>

        <clan-overview-item
          v-if="bannedMembersLoadError"
          icon="warning"
          :text="`Couldn't load banned members`"
          actionText="Retry"
          @action="fetchBannedMembers(true)"></clan-overview-item>
        <clan-overview-item
          v-if="!isLoadingBannedMembers && !bannedMembersLoadError && bannedMembers && bannedMembers.length === 0"
          icon="remove_circle_outline"
          actionText="Reload"
          :text="bannedMembersText"
          @action="fetchBannedMembers(true)"></clan-overview-item>
        <clan-overview-item
          v-if="!isLoadingBannedMembers && !bannedMembersLoadError && bannedMembers && bannedMembers.length > 0"
          icon="remove_circle_outline"
          actionText="View"
          :text="bannedMembersText"
          @action="viewBannedMembers"></clan-overview-item>
      </v-list>
    </v-card-text>

    <pending-members :active="shouldRenderPendingMembers" @close="onDialogClose('shouldRenderPendingMembers')"></pending-members>
    <invited-members :active="shouldRenderInvitedMembers" @close="onDialogClose('shouldRenderInvitedMembers')"></invited-members>
    <banned-members :active="shouldRenderBannedMembers" @close="onDialogClose('shouldRenderBannedMembers')"></banned-members>
    <clan-members :active="shouldRenderMembers" @close="onDialogClose('shouldRenderMembers')"></clan-members>
    <online-members :active="shouldRenderOnlineMembers" @close="onDialogClose('shouldRenderOnlineMembers')"></online-members>
    <inactive-players :active="shouldRenderInactiveMembers" @close="onDialogClose('shouldRenderInactiveMembers')"></inactive-players>
    <exempt-members :active="shouldRenderExemptMembers" @close="onDialogClose('shouldRenderExemptMembers')"></exempt-members>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import PendingMembers from './PendingMembers'
import InvitedMembers from './InvitedMembers'
import BannedMembers from './BannedMembers'
import LoadableIndicator from '@/components/LoadableIndicator'
import ClanOverviewItem from './ClanOverviewItem'
import ClanMembers from './ClanMembers'
import OnlineMembers from './OnlineMembers'
import InactivePlayers from './InactivePlayers'
import analytics from '@/mixins/analytics'
import ExemptMembers from './ExemptMembers'
export default {
  name: 'clan-overview',
  components: {
    PendingMembers,
    InvitedMembers,
    LoadableIndicator,
    ClanOverviewItem,
    BannedMembers,
    ClanMembers,
    OnlineMembers,
    InactivePlayers,
    ExemptMembers
  },
  mixins: [analytics],
  data() {
    return {
      shouldRenderPendingMembers: false,
      shouldRenderInvitedMembers: false,
      shouldRenderBannedMembers: false,
      shouldRenderMembers: false,
      shouldRenderOnlineMembers: false,
      shouldRenderInactiveMembers: false,
      shouldRenderExemptMembers: false,
      exemptMembersLoadError: false
    }
  },
  computed: {
    ...mapGetters(['numberOfCurrentExemptions', 'exemptions']),
    ...mapGetters('members/pending', ['pendingMembers', 'isLoadingPendingMembers', 'didLoadPendingMembers', 'pendingMembersLoadError']),
    ...mapGetters('members/invited', ['invitedMembers', 'isLoadingInvitedMembers', 'didLoadInvitedMembers', 'invitedMembersLoadError']),
    ...mapGetters('members', ['clanMembers', 'isLoadingMembers', 'didLoadMembers', 'loadMembersError', 'onlineMembers']),
    ...mapGetters(['activityReport', 'activityReportLoadError', 'isLoadingActivityReport', 'didLoadActivityReport']),
    ...mapState('members', ['bannedMembers', 'isLoadingBannedMembers', 'didLoadBannedMembers', 'bannedMembersLoadError']),
    isLoading() {
      return this.isLoadingMembers || this.isLoadingPendingMembers || this.isLoadingInvitedMembers || this.isLoadingInactiveMembers || this.isLoadingBannedMembers
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
    numberOfOnlineMembersText() {
      if (this.onlineMembers) {
        if (this.onlineMembers.length === 0) {
          return 'No online members'
        } else if (this.onlineMembers.length === 1) {
          return '1 online member'
        } else {
          return `${this.onlineMembers.length} online members`
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
        } else if (this.inactiveMembers.length === 1) {
          return '1 inactive member'
        } else {
          return `${this.inactiveMembers.length} inactive members`
        }
      }
    },
    bannedMembersText() {
      if (this.bannedMembers) {
        if (this.bannedMembers.length === 0) {
          return 'No banned members'
        } else if (this.bannedMembers.length === 1) {
          return '1 banned member'
        } else {
          return `${this.bannedMembers.length} banned members`
        }
      }
    },
    exemptMembersText() {
      if (this.numberOfCurrentExemptions === 0) {
        return 'No exempt members'
      } else if (this.numberOfCurrentExemptions === 1) {
        return '1 exempt member'
      } else {
        return `${this.numberOfCurrentExemptions} exempt members`
      }
    },
    isLoadingExemptMembers() {
      return this.exemptions === undefined
    },
    didLoadExemptMembers() {
      return this.exemptions !== undefined
    }
  },
  methods: {
    ...mapActions(['getExemptions']),
    ...mapActions('members/pending', ['getPendingMembers']),
    ...mapActions('members/invited', ['getInvitedMembers']),
    ...mapActions('members', ['getClanMembers', 'getBannedMembers']),
    ...mapActions(['getActivityReport']),
    onDialogClose(dialog) {
      this[dialog] = false
    },
    fetchAll() {
      this.fetchClanMembers()
      this.fetchPendingMembers()
      this.fetchInvitedMembers()
      this.fetchInactiveMembers()
      this.fetchBannedMembers()
      this.fetchExemptMembers()
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
    fetchBannedMembers(bypass = false) {
      if (bypass) {
        this.recordEvent('Dashboard', 'Reload', 'Banned Members')
        this.getBannedMembers().catch(error => console.error(error))
      } else {
        if (!this.didLoadBannedMembers && !this.isLoadingBannedMembers) {
          this.getBannedMembers().catch(error => console.error(error))
        }
      }
    },
    fetchExemptMembers(bypass = false) {
      this.exemptMembersLoadError = false
      if (bypass) {
        this.recordEvent('Dashboard', 'Reload', 'Exempt Members')
        this.getExemptions().catch(error => console.error(error))
      } else {
        if (!this.didLoadBannedMembers && !this.isLoadingBannedMembers) {
          this.getExemptions().catch(error => {
            console.error(error)
            this.exemptMembersLoadError = true
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
    },
    viewMembers() {
      this.recordEvent('Dashboard', 'View', 'Members')
      this.shouldRenderMembers = true
    },
    viewOnlineMembers() {
      this.recordEvent('Dashboard', 'View', 'Online Members')
      this.shouldRenderOnlineMembers = true
    },
    viewInactiveMembers() {
      this.recordEvent('Dashboard', 'View', 'Inactive Members')
      this.shouldRenderInactiveMembers = true
    },
    viewExemptMembers() {
      this.recordEvent('Dashboard', 'View', 'Exempt Members')
      this.shouldRenderExemptMembers = true
    },
    viewBannedMembers() {
      this.recordEvent('Dashboard', 'View', 'Banned Members')
      this.shouldRenderBannedMembers = true
    }
  },
  mounted() {
    this.fetchAll()
  }
}
</script>
