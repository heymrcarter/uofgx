<template>
  <v-list-tile avatar :key="member.xboxMembershipId">
    <v-list-tile-avatar v-if="member.bungieNetAvatar">
      <img :src="member.bungieNetAvatar">
    </v-list-tile-avatar>

    <v-list-tile-content @click="click" class="clickable">
      <v-list-tile-title>{{member.xboxUserName}} <v-icon color="accent" v-if="member.isOnline">rss_feed</v-icon></v-list-tile-title>
      <v-list-tile-sub-title>BNet: {{member.bungieNetUserName}}</v-list-tile-sub-title>
      <v-list-tile-sub-title>Joined {{formatDate(member.joinDate)}}</v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-layout row justify-end align-center>
        <v-badge v-if="exemptions && exemptions[member.xboxMembershipId] && isCurrentlyExempt(member.xboxMembershipId)" right color="black" overlap class="exemption-badge">
          <v-icon large>explicit</v-icon>
          <span slot="badge" v-if="exemptions && exemptions[member.xboxMembershipId].numberExemptions > 1">{{ exemptions[member.xboxMembershipId].numberExemptions }}</span>
        </v-badge>

        <v-chip
          class="member-chip"
          :text-color="member.memberType > 3 ? 'black' : 'white'"
          :color="getChipColor(member.memberType)">{{getMemberType(member.memberType)}}</v-chip>
      </v-layout>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import { mapGetters } from 'vuex'
import dateFormatter from '@/mixins/date-formatter'
import moment from 'moment-timezone'
import sort from 'fast-sort'

export default {
  name: 'member-row',
  mixins: [dateFormatter],
  props: ['member'],
  computed: {
    ...mapGetters(['exemptions'])
  },
  methods: {
    click(e) {
      this.$emit('click', e)
    },
    isCurrentlyExempt(membershipId) {
      if (this.exemptions) {
        if (!this.exemptions[membershipId]) {
          return false
        }

        const memberHistory = sort(JSON.parse(JSON.stringify(this.exemptions[membershipId].history))).asc(h => h.startDate)
        const endDate = memberHistory[memberHistory.length - 1].endDate
        const today = moment.utc().format()

        return today <= endDate
      }
    },
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
          return 'Acting Founder'
        case 5:
          return 'Founder'
      }
    },
    getChipColor(memberType) {
      switch (memberType) {
        case 0:
          return 'None'
        case 1:
          return 'grey'
        case 2:
          return 'grey'
        case 3:
          return 'blue'
        case 4:
          return 'yellow'
        case 5:
          return 'yellow'
      }
    }
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}

.member-chip {
  width: 76px;
  justify-content: center;
}

.member-chip .chip__content {
  width: 100%;
}

.exemption-badge {
  margin-right: 20px;
}
</style>
