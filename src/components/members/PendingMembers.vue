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
              </v-list-tile-content>
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
export default {
  name: 'pending-members',
  props: {
    active: Boolean
  },
  computed: {
    ...mapGetters(['pendingMembers'])
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    }
  }
}
</script>
