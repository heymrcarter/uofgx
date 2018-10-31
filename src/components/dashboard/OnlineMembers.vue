<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
    <v-card>
      <v-toolbar card>
        <v-btn icon @click.native="closeDialog"><v-icon>close</v-icon></v-btn>
        <v-toolbar-title>Online members</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn @click="reload" flat icon><v-icon>refresh</v-icon></v-btn>
      </v-toolbar>

      <v-progress-linear indeterminate v-if="isLoading" color="accent" height="5"></v-progress-linear>

      <v-card-text>
        <member-list :members="onlineMembers"></member-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MemberList from './MemberList'
export default {
  name: 'online-members',
  props: {
    active: Boolean
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('members', ['onlineMembers'])
  },
  components: {
    MemberList
  },
  methods: {
    ...mapActions('members', ['getClanMembers']),
    closeDialog() {
      this.$emit('close')
    },
    reload() {
      this.isLoading = true
      this.getClanMembers().finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
