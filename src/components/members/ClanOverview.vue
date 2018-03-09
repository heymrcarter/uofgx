<template>
  <v-card height="100%">
    <v-card-title class="headline">Clan overview</v-card-title>

    <v-card-text>
      <v-list>
        <v-list-tile v-if="clanMembers">
          <v-list-tile-avatar>
            <v-icon>group</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ numberOfMembers }} members total</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-list-tile v-if="pendingMembers">
          <v-list-tile-avatar>
            <v-icon>group_add</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ pendingMembersText }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn flat @click="shouldRenderPendingMembers = true">View</v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-list-tile v-if="invitedMembers">
          <v-list-tile-avatar>
            <v-icon>group_add</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ invitedMembersText }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn flat @click="shouldRenderInvitedMembers = true">View</v-btn>
          </v-list-tile-action>
        </v-list-tile>
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
export default {
  name: 'clan-overview',
  components: {
    PendingMembers,
    InvitedMembers
  },
  data() {
    return {
      shouldRenderPendingMembers: false,
      shouldRenderInvitedMembers: false
    }
  },
  computed: {
    ...mapGetters(['clanMembers', 'pendingMembers', 'invitedMembers']),
    numberOfMembers() {
      return this.clanMembers ? this.clanMembers.length : 0
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
    ...mapActions(['getPendingMembers', 'getInvitedMembers', 'getClanMembers']),
    onDialogClose(dialog) {
      this.getClanMembers()
      this[dialog] = false
    }
  },
  mounted() {
    if (!this.pendingMembers) {
      this.getPendingMembers()
    }

    if (!this.invitedMembers) {
      this.getInvitedMembers()
    }
  }
}
</script>

<style scoped>

</style>
