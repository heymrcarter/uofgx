  <template>
  <section class="mt-2">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="activity-card">
          <v-card-title>
            <v-flex xs12 md9>
              <p class="headline">Character activity <span v-if="selectedCharacter !== undefined">for {{selectedCharacterClass}} ({{ selectedCharacterLight }})</span></p>
            </v-flex>

            <v-flex xs12 md3>
              <v-select color="yellow" label="Select character" :items="characterDropdownOptions" v-model="selectedCharacter"></v-select>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 md6 fill-height>
        <activity-breakdown-chart :characterId="selectedCharacter" :membershipId="currentMembershipId"></activity-breakdown-chart>
      </v-flex>

      <v-flex xs12 md6>
        <activity-by-date-chart :characterId="selectedCharacter" :membershipId="currentMembershipId"></activity-by-date-chart>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <recent-activity-table :membershipId="currentMembershipId" :characterId="selectedCharacter"></recent-activity-table>
      </v-flex>

    </v-layout>

    <loading-indicator :is-loading="isLoadingCharacterActivity" context="global"></loading-indicator>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import sort from 'fast-sort'
import LoadingIndicator from '@/components/LoadingIndicator'
import ActivityBreakdownChart from './ActivityBreakdownChart'
import ActivityByDateChart from './ActivityByDateChart'
import RecentActivityTable from './RecentActivityTable'
import dateFormatter from '@/mixins/date-formatter'

export default {
  name: 'activity-history',
  mixins: [dateFormatter],
  components: {
    LoadingIndicator,
    ActivityBreakdownChart,
    ActivityByDateChart,
    RecentActivityTable
  },
  data() {
    return {
      selectedCharacter: undefined,
      isLoadingCharacterActivity: false,
      isLoasdingActivityDetails: false,
      detailTableRows: undefined
    }
  },
  watch: {
    selectedCharacter(characterId) {
      this.isLoadingCharacterActivity = true
      this.getCharacterActivity({ membershipId: this.currentMembershipId, characterId })
        .then(() => {
          this.isLoadingCharacterActivity = false
        })
        .catch(error => console.error(error))
    }
  },
  computed: {
    ...mapGetters(['activeMember', 'activeMemberCharacterActivity', 'clanMembers']),
    characterDropdownOptions() {
      return this.activeMember.characters.map((character, i) => {
        return {
          text: `${character.class} (${character.light})`,
          value: character.characterId
        }
      })
    },
    activityTableHeaders() {
      return activityContent.tableHeaders
    },
    activityRows() {
      return sort(
        this.activeMemberCharacterActivity.map(activityObject => {
          const supportingCompletionText = activityObject.values.standing !== undefined ? activityObject.values.standing.basic.displayValue : activityObject.values.completionReason.basic.displayValue

          return {
            value: false,
            activity: activityModeToName(activityObject.activityDetails.mode),
            date: activityObject.period,
            kills: activityObject.values.kills.basic.value,
            completed: `${activityObject.values.completed.basic.displayValue} - ${supportingCompletionText}`,
            deaths: activityObject.values.deaths.basic.value,
            timePlayed: activityObject.values.timePlayedSeconds.basic.displayValue,
            activityId: activityObject.activityDetails.instanceId
          }
        })
      ).desc(a => a.date)
    },
    currentMembershipId() {
      return this.$route.params.membershipId
    },
    selectedCharacterClass() {
      return this.activeMember.characters.find(c => c.characterId === this.selectedCharacter).class
    },
    selectedCharacterLight() {
      return this.activeMember.characters.find(c => c.characterId === this.selectedCharacter).light
    },
    activityDetailTableHeaders() {
      return activityContent.detailTableHeaders
    }
  },
  methods: {
    ...mapActions(['getCharacterActivity', 'getActivityDetails']),
    expandActivity(props) {
      this.isLoadingActivityDetails = true
      props.expanded = !props.expanded
      this.detailTableRows = undefined
      this.getActivityDetails(props.item.activityId).then(details => {
        this.detailTableRows = details.entries.map(entry => {
          return {
            icon: this.isClanMember(entry.player.destinyUserInfo.displayName) ? 'group' : '',
            player: entry.player.destinyUserInfo.displayName,
            class: entry.player.characterClass,
            power: entry.player.lightLevel,
            kills: entry.values.kills.basic.value,
            deaths: entry.values.deaths.basic.value
          }
        })
        this.isLoadingActivityDetails = false
      })
    },
    isClanMember(gamertag) {
      return this.clanMembers.find(m => m.xboxUserName === gamertag) !== undefined
    }
  }
}
</script>
