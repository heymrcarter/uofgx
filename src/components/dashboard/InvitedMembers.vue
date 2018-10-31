<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
    <v-card tile>
      <v-toolbar card>
        <v-btn icon @click.native="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title>Invited members</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-tooltip left>
          <v-btn slot="activator" icon @click="reload"><v-icon>refresh</v-icon></v-btn>
          <span>Reload</span>
        </v-tooltip>
      </v-toolbar>

      <v-progress-linear
        v-if="isLoading"
        indeterminate
        color="accent"
        height="5"></v-progress-linear>

      <v-card-text>
        <v-list three-line>
          <template v-for="(member, i) in invitedMembers">
            <v-list-tile :key="member.destinyUserInfo.membershipId">
              <v-list-tile-content>
                <v-list-tile-title>{{ member.destinyUserInfo.displayName }}</v-list-tile-title>
                <v-list-tile-sub-title v-if="member.bungieNetUserInfo">Bungie.net {{ member.bungieNetUserInfo.displayName }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ resolveState(member.resolveState) }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn v-if="member.resolveState === 0" :disabled="disableButton" @click="cancelInvite(member.destinyUserInfo.membershipId)">Cancel</v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="i !== invitedMembers.length - 1" :key="i"></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>

    <v-snackbar color="black" v-model="showSnackbar">{{ snackbarText }}</v-snackbar>
  </v-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import analytics from '@/mixins/analytics'
const { mapGetters, mapActions } = createNamespacedHelpers('members/invited')
export default {
  name: 'invited-members',
  props: {
    active: Boolean
  },
  mixins: [analytics],
  data() {
    return {
      disableButton: false,
      snackbarText: '',
      showSnackbar: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['invitedMembers'])
  },
  methods: {
    ...mapActions(['rescindMembershipInvitation', 'getInvitedMembers']),
    closeDialog() {
      this.$emit('close')
    },
    resolveState(state) {
      switch (state) {
        case 0:
          return 'Pending'
        case 1:
          return 'Accepted'
        case 2:
          return 'Denied'
        case 3:
          return 'Canceled'
      }
    },
    cancelInvite(membershipId) {
      this.recordEvent('Dashboard', 'Cancel', 'Cancel Invitation')
      this.disableButton = true
      this.rescindMembershipInvitation(membershipId)
        .then(() => this.handleActionResult('Invitation canceled'))
        .catch(error => this.handleActionResult(`An error occurred: ${error.message}`))
    },
    handleActionResult(message) {
      this.disableButton = false
      this.snackbarText = message
      this.showSnackbar = true
    },
    reload() {
      this.isLoading = true
      this.getInvitedMembers().finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
