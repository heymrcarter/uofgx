<template>
  <v-card>
    <v-card-title class="headline">Invite member</v-card-title>

    <v-card-text>
      <v-text-field v-model="memberName" id="search" color="yellow"></v-text-field>
      <v-btn @click="searchForMember" id="search-button">Search</v-btn>

      <ul class="platforms" v-if="platforms">
        <li v-for="(platform, i) in platforms" :key="i">
          <button class="platform" @click="invite(platform)"></button>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'invite-member',
  data() {
    return {
      memberName: '',
      platforms: undefined
    }
  },
  methods: {
    ...mapActions('members', ['validateMemberName', 'sendInvitation']),
    searchForMember() {
      this.validateMemberName(this.memberName).then(result => {
        if (!result) return

        if (result.length > 1) {
          this.platforms = result
        } else {
          this.invite(result[0])
        }
      })
    },
    invite(member) {
      this.sendInvitation(member)
    }
  }
}
</script>

<style scoped>

</style>