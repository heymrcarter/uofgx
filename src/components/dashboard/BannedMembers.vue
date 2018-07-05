<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
    <v-card tile>
      <v-toolbar card>
        <v-btn icon @click.native="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title>Banned members</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-list two-line>
          <template v-for="(member, i) in bannedMembers">
            <v-list-tile :key="member.destinyUserInfo.membershipId">
              <v-list-tile-content>
                <v-list-tile-title v-if="member.destinyUserInfo">{{ member.destinyUserInfo.displayName }}</v-list-tile-title>
                <v-list-tile-sub-title v-if="member.bungieNetUserInfo">Bungie.net {{ member.bungieNetUserInfo.displayName }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Issued by: {{ member.lastModifiedBy.displayName }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn @click="unban(member)">Lift ban</v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="i !== bannedMembers.length - 1" :key="i"></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>

    <v-snackbar top v-model="showSnackbar">{{ snackbarText }}</v-snackbar>
  </v-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import analytics from '@/mixins/analytics'
const { mapState, mapActions } = createNamespacedHelpers('members')
export default {
  name: 'banned-members',
  data() {
    return {
      showSnackbar: false,
      snackbarText: undefined
    }
  },
  mixins: [analytics],
  props: {
    active: Boolean
  },
  computed: {
    ...mapState(['bannedMembers'])
  },
  methods: {
    ...mapActions(['unbanMember']),
    closeDialog() {
      this.$emit('close')
    },
    unban(member) {
      this.recordEvent('BannedMembers', 'Unban', 'Member')
      this.unbanMember(member.destinyUserInfo.membershipId)
        .then(() => {
          this.snackbarText = `${member.destinyUserInfo.displayName} unbanned`
          this.showSnackbar = true
        })
        .catch(error => {
          console.error(error)
          this.snackbarText = `Unable to unban ${member.destinyUserInfo.displayName}`
          this.showSnackbar = true
        })
    }
  }
}
</script>
