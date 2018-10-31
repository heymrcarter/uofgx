<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
    <v-card tile>
      <v-toolbar card>
        <v-btn icon @click.native="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title>Pending members</v-toolbar-title>

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
        <v-list two-line>
          <template v-for="(member, i) in pendingMembers">
            <v-list-tile :key="member.destinyUserInfo.membershipId">
              <v-list-tile-content>
                <v-list-tile-title>{{ member.destinyUserInfo.displayName }}</v-list-tile-title>
                <v-list-tile-sub-title v-if="member.bungieNetUserInfo">Bungie.net {{ member.bungieNetUserInfo.displayName }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ resolveState(member.resolveState) }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <pending-member-actions
                  v-if="member.resolveState === 0"
                  :membershipId="member.destinyUserInfo.membershipId"></pending-member-actions>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="i !== pendingMembers.length - 1" :key="i"></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import PendingMemberActions from './PendingMemberActions'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('members/pending')
export default {
  name: 'pending-members',
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    PendingMemberActions
  },
  props: {
    active: Boolean
  },
  computed: {
    ...mapGetters(['pendingMembers', 'getPendingMembers'])
  },
  methods: {
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
          return 'Rescinded'
      }
    },
    reload() {
      this.isLoading = true
      this.getPendingMembers().finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
