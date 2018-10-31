<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
    <v-card>
      <v-toolbar card>
        <v-btn icon @click.native="closeDialog"><v-icon>close</v-icon></v-btn>
        <v-toolbar-title>Members</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="fetchMembers"><v-icon>refresh</v-icon></v-btn>
      </v-toolbar>

      <v-progress-linear v-if="isLoadingMembers" color="accent" height="25" indeterminate></v-progress-linear>

      <v-card-text>
        <member-list :members="clanMembers"></member-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import LoadableIndicator from '@/components/LoadableIndicator'
import LoadableFailure from '@/components/LoadableFailure'
import MemberList from '@/components/dashboard/MemberList'
const { mapActions, mapGetters } = createNamespacedHelpers('members')
export default {
  name: 'clan-members',
  props: {
    active: Boolean
  },
  components: {
    LoadableIndicator,
    LoadableFailure,
    MemberList
  },
  computed: {
    ...mapGetters(['clanMembers', 'isLoadingMembers', 'didLoadMembers', 'loadMembersError'])
  },
  methods: {
    ...mapActions(['getClanMembers']),
    fetchMembers() {
      this.getClanMembers().catch(error => {
        console.error(error)
      })
    },
    closeDialog() {
      this.$emit('close')
    }
  },
  mounted() {
    if (!this.isLoadingMembers && !this.didLoadMembers) {
      this.fetchMembers()
    }
  }
}
</script>
