<template>
  <div>
    <v-menu bottom offset-y :disabled="disableMenu">
      <v-btn slot="activator">Actions
        <v-icon class="ml-2">arrow_drop_down</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="(action, i) in actions" :key="i" @click="triggerAction(action)">
          <v-list-tile-title>{{ action }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-snackbar color="black" v-model="showSnackbar">{{ snackbarText }}</v-snackbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'pending-member-actions',
  props: {
    memberType: {
      type: String,
      default: 'pending',
      validator: val => {
        if (
          val.toLowerCase() !== 'pending' ||
          val.toLowerCase() !== 'invited'
        ) {
          return true
        }

        return false
      }
    },
    membershipId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      actions: ['Approve', 'Deny'],
      disableMenu: false,
      showSnackbar: false,
      snackbarText: ''
    }
  },
  methods: {
    ...mapActions([
      'approvePendingMemberships',
      'rescindInvitation',
      'denyPendingMemberships'
    ]),
    triggerAction(action) {
      action = action.toLowerCase()

      switch (action) {
        case 'approve':
          this.disableMenu = true
          this.approvePendingMemberships([this.membershipId])
            .then(() => this.handleActionResult('Request approved'))
            .catch(error =>
              this.handleActionResult(`An error occurred: ${error.message}`)
            )
          break
        case 'deny':
          this.disableMenu = true
          this.denyPendingMemberships([this.membershipId])
            .then(() => this.handleActionResult('Request denied'))
            .catch(error =>
              this.handleActionResult(`An error occurred: ${error.message}`)
            )
          break
      }
    },
    handleActionResult(message) {
      this.disableMenu = false
      this.snackbarText = message
      this.showSnackbar = true
    }
  }
}
</script>
