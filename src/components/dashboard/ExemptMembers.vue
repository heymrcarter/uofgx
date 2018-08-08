<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
    <v-card tile>
      <v-toolbar card>
        <v-btn icon @click.native="close">
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title>Exempt members</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-tooltip left>
          <v-btn slot="activator" icon @click="reload"><v-icon>refresh</v-icon></v-btn>
          <span>Reload</span>
        </v-tooltip>
      </v-toolbar>

      <v-progress-linear
        v-if="isLoading"
        indeterminate
        color="yellow"
        height="5"></v-progress-linear>

      <v-card-text>
        <v-list three-line>
          <template v-for="(member, i) in currentExemptMembers">
            <v-list-tile :key="member.membershipId" @click="goToProfile(member.membershipId)">
              <v-list-tile-content>
                <v-list-tile-title>{{ getGamertag(member.membershipId) }}</v-list-tile-title>
                <v-list-tile-sub-title>Ends {{ member.endDate | formatDate }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Granted by {{ getAdminGamertag(member.grantedBy) }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="i !== currentExemptMembers.length - 1" :key="i"></v-divider>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import dateFormatter from '@/mixins/date-formatter'
export default {
  name: 'exempt-members',
  mixins: [dateFormatter],
  props: {
    active: Boolean
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState('members', {
      members(state) {
        return state.list
      }
    }),
    ...mapGetters(['currentExemptMembers'])
  },
  methods: {
    ...mapActions(['getExemptions']),
    ...mapActions('members/active', { setActiveMember: 'set' }),
    reload() {
      this.isLoading = true
      this.getExemptions().finally(() => {
        this.isLoading = false
      })
    },
    close() {
      this.$emit('close')
    },
    getGamertag(membershipId) {
      if (this.members) {
        const member = this.members.find(m => m.xboxMembershipId === membershipId)

        if (member) {
          return member.xboxUserName
        }
      }
    },
    getAdminGamertag(membershipId) {
      if (this.members) {
        const member = this.members.find(m => m.bungieNetMembershipId === membershipId)

        if (member) {
          return member.xboxUserName
        }
      }
    },
    goToProfile(membershipId) {
      this.setActiveMember({ membershipId })
      this.$router.push({
        name: 'Profile',
        params: { membershipId }
      })
    }
  }
}
</script>

<style scoped>
</style>
