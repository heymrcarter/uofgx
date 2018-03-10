<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
    <v-card tile>
      <v-toolbar card>
        <v-btn icon @click.native="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title>Pending members</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-list two-line>
          <template v-for="(member, i) in pendingMembers">
            <v-list-tile :key="member.destinyUserInfo.membershipId">
              <v-list-tile-content>
                <v-list-tile-title>{{ member.destinyUserInfo.displayName }}</v-list-tile-title>
                <v-list-tile-sub-title>Bungie.net {{ member.bungieNetUserInfo.displayName }}</v-list-tile-sub-title>
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
import { mapGetters } from 'vuex'
import PendingMemberActions from './PendingMemberActions'
export default {
  name: 'pending-members',
  components: {
    PendingMemberActions
  },
  props: {
    active: Boolean
  },
  computed: {
    ...mapGetters('members/pending', ['pendingMembers'])
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
    }
  }
}
</script>
