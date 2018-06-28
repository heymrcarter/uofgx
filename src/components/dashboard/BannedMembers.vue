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
                <v-list-tile-title>{{ member.destinyUserInfo.displayName }}</v-list-tile-title>
                <v-list-tile-sub-title v-if="member.bungieNetUserInfo">Bungie.net {{ member.bungieNetUserInfo.displayName }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Issued by: {{ member.lastModifiedBy.displayName }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="i !== bannedMembers.length - 1" :key="i"></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('members')
export default {
  name: 'banned-members',
  props: {
    active: Boolean
  },
  computed: {
    ...mapState(['bannedMembers'])
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    }
  }
}
</script>
