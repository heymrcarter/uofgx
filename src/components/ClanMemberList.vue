<template>
  <v-container fluid v-if="clanMembers && clanMembers.length > 0">
    <v-card>
      <v-form>
        <div>
          <v-text-field solo dark placeholder="Filter" v-model="filter" clearable></v-text-field>
        </div>
      </v-form>
      <v-list dark three-line>
        <v-list-tile v-if="presentedList.length === 0">
          <v-list-tile-content>
            No members
          </v-list-tile-content>
        </v-list-tile>
        <template v-for="(member, i) in presentedList" v-if="presentedList.length > 0">
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
          <v-divider inset :key="i" v-if="i !== presentedList.length"></v-divider>
        </template>
      </v-list>
    </v-card>

    <v-layout row justify-center v-if="activeMember !== undefined">
      <v-dialog v-model="shouldRenderMemberDetailDialog" persistent max-width="550px">
        <v-card>
          <div v-if="!isLoadingCharacters">
            <v-card-title class="headline">{{activeMember.gamertag}}</v-card-title>
            <v-card-text>
              <ul class="characters">
                <li
                  v-for="(character, i) in activeMember.characters"
                  :key="i"
                  class="character">
                  <div class="character-emblem"><img :src="`https://bungie.net/${character.emblem}`"></div>
                  <div class="character-details">
                    <span class="class">{{character.class}}</span>
                    <div class="last-played">
                      <span class="last-played-date">Last played {{formatDate(character.lastPlayed)}}</span>
                      <span class="last-played-duration">{{character.minutesPlayedThisSession}} minutes</span>
                    </div>
                    <span class="light">{{character.light}}</span>
                    <span class="level">{{character.level}}</span>
                  </div>
                </li>
              </ul>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click.native="shouldRenderMemberDetailDialog = false">Dismiss</v-btn>
              </v-card-actions>
            </div>
          </v-card>

          <loading-indicator :is-loading="isLoadingCharacters" context="global"></loading-indicator>
        </v-dialog>
      </v-layout>

      <loading-indicator :is-loading="isLoading" context="global"></loading-indicator>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import LoadingIndicator from './LoadingIndicator'

export default {
  name: 'clan-member-list',
  components: {
    LoadingIndicator
  },
  data() {
    return { shouldRenderMemberDetailDialog: false, isLoading: false, isLoadingCharacters: false, filter: null }
  },
  computed: {
    ...mapGetters(['clanMembers', 'activeMember']),
    presentedList() {
      return this.filter !== null ? this.clanMembers.filter(m => m.bungieNetUserName.toLowerCase().includes(this.filter) || m.xboxUserName.toLowerCase().includes(this.filter)) : this.clanMembers
    }
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
    formatDate(date) {
      return moment.utc(date).format('MM/DD/YYYY')
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
      this.isLoadingCharacters = true
      this.getCharactersForMember({ xboxUserName: member.xboxUserName, xboxMembershipId: member.xboxMembershipId }).then(() => {
        this.isLoadingCharacters = false
      })
    },
    characterEmblemBackground(url) {
      return {
        backgroundImage: `url(https://bungie.net/${url});`
      }
    }
  },
  mounted() {
    if (!this.clanMembers) {
      this.getClanMembers().then(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>
.characters {
  list-style: none;
  margin: 0 auto;
  width: 476px;
}

.characters .character {
  display: block;
  width: 474px;
  height: 96px;
  position: relative;
  margin-bottom: 20px;
}

.characters .character .character-emblem {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9000;
}

.characters .character .character-emblem img {
  z-index: 9000;
}

.characters .character .character-details {
  z-index: 9999;
  color: white;
  position: relative;
  top: 0;
  left: 0;
  display: block;
  width: 474px;
  height: 96px;
  text-shadow: #000 1px 1px 5px;
}

.characters .character .character-details .class {
  position: absolute;
  top: 7px;
  left: 100px;
  font-size: 24px;
  font-weight: bold;
}

.characters .character .character-details .last-played {
  position: absolute;
  top: 40px;
  left: 100px;
  font-size: 16px;
}

.characters .character .character-details .last-played span {
  display: block;
}

.characters .character .character-details .light {
  position: absolute;
  top: 7px;
  right: 20px;
  font-size: 24px;
  font-weight: bold;
}

.characters .character .character-details .level {
  position: absolute;
  top: 40px;
  right: 20px;
  font-size: 20px;
}
</style>
