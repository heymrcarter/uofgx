<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
    <v-card>
      <v-toolbar card>
        <v-btn icon @click.native="closeDialog"><v-icon>close</v-icon></v-btn>
        <v-toolbar-title>Online members</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn @click="getClanMembers" flat icon><v-icon>refresh</v-icon></v-btn>
      </v-toolbar>

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
    }
  }
}
</script>
