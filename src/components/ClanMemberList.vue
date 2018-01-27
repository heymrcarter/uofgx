<template>
  <v-container fluid>
    <v-list dark three-line>
      <template v-for="(member, i) in clanMembers">
        <v-list-tile avatar :key="member.xboxMembershipId" @click="showMemberDetail(member)">
          <v-list-tile-avatar v-if="member.bungieNetAvatar">
            <img :src="member.bungieNetAvatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{member.xboxUserName}}</v-list-tile-title>
            <v-list-tile-sub-title>BNet: {{member.bungieNetUserName}}</v-list-tile-sub-title>
            <v-list-tile-sub-title>Joined {{formatJoinDate(member.joinDate)}}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-chip :text-color="member.memberType > 3 ? 'black' : 'white'" :color="getChipColor(member.memberType)">{{getMemberType(member.memberType)}}</v-chip>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider inset :key="i"></v-divider>
      </template>
    </v-list>

    <v-layout row justify-center v-if="activeMember !== undefined">
      <v-dialog v-model="shouldRenderMemberDetailDialog" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">{{activeMember.gamertag}}</v-card-title>
          <v-card-text>
            <v-container fluid v-bind="{ [`grid-list-sm`]: true }">
              <v-layout row wrap>
                <v-flex xs4 v-for="(character, i) in activeMember.characters" :key="i">
                  <v-card flat tile>
                    <v-card-media :src="`https://bungie.net${character.emblem}`"></v-card-media>
                      <div class="character-details">
                        <span class="class">{{character.class}}</span>
                        <span class="lastPlayed">Last played {{formatDate(character.lastPlayed)}} for {{character.minutesPlayedThisSession}}</span>
                        <span class="light">{{character.light}}</span>
                        <span class="level">{{character.level}}</span>
                      </div>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
              <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn>
            </v-card-actions> -->
          </v-card>
        </v-dialog>
      </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'clan-member-list',
  data() {
    return { shouldRenderMemberDetailDialog: false }
  },
  computed: {
    ...mapGetters(['clanMembers', 'activeMember'])
  },
  methods: {
    ...mapActions(['getClanMembers', 'getCharactersForMember', 'resetActiveCharacter']),
    getMemberType(memberType) {
      switch (memberType) {
        case 0:
          return 'None'
        case 1:
          return 'Beginner'
        case 2:
          return 'Member'
        case 3:
          return 'Admin'
        case 4:
          return 'Actiong Founder'
        case 5:
          return 'Founder'
      }
    },
    formatJoinDate(joinDate) {
      return moment.utc(joinDate).format('MM/DD/YYYY')
    },
    getChipColor(memberType) {
      switch (memberType) {
        case 0:
          return 'None'
        case 1:
          return 'Beginner'
        case 2:
          return 'grey'
        case 3:
          return 'blue'
        case 4:
          return 'yellow'
        case 5:
          return 'yellow'
      }
    },
    showMemberDetail(member) {
      this.shouldRenderMemberDetailDialog = true
      this.getCharactersForMember({ xboxUserName: member.xboxUserName, xboxMembershipId: member.xboxMembershipId })
    }
  },
  mounted() {
    if (!this.clanMembers) {
      this.getClanMembers()
    }
  }
}
</script>

<style scoped>

</style>
