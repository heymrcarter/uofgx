<template>
  <v-card height="100%">
    <v-card-title class="headline">Clan overview</v-card-title>

    <v-card-text>
      <v-list>
        <v-list-tile v-if="clanMembers">
          <v-list-tile-avatar>
            <v-icon>group</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-title>{{ numberOfMembers }} members total</v-list-tile-title>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-list-tile v-if="pendingMembers">
          <v-list-tile-avatar>
            <v-icon>group_add</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-title>{{ pendingMembersText }}</v-list-tile-title>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-list-tile v-if="invitedMembers">
          <v-list-tile-avatar>
            <v-icon>group_add</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-title>{{ invitedMembersText }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'clan-overview',
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
    ...mapActions(['getPendingMembers', 'getInvitedMembers'])
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
