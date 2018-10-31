<template>
  <v-card class="activity-card">
    <v-card-title>
      <p class="title">Recent activities</p>
    </v-card-title>

    <v-card-text>
      <loadable-indicator v-if="isLoadingCharacterActivity"></loadable-indicator>
      <loadable-failure
        v-else-if="loadError"
        :message="`Couldn't load recent activity`"
        :retryable="true"
        @retry="fetch(characterId)"></loadable-failure>

      <v-data-table
        v-else
        hide-actions
        color="accent"
        class="elevation-1"
        item-key="date"
        disable-initial-sort
        :headers="activityTableHeaders"
        :items="activityTableData">

        <template slot="items" slot-scope="props">
          <tr @click="expandActivity(props)">
            <td>{{ formatDate(props.item.date) }}</td>
            <td>{{ props.item.activity }}</td>
            <td>{{ props.item.completed }}</td>
            <td>{{ props.item.timePlayed }}</td>
            <td>{{ props.item.kills }}</td>
            <td>{{ props.item.deaths }}</td>
          </tr>
        </template>

        <template slot="expand" slot-scope="props">
          <activity-detail-table :loading="isLoadingDetails" :data="activityDetails"></activity-detail-table>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import LoadableFailure from '@/components/LoadableFailure'
import LoadableIndicator from '@/components/LoadableIndicator'
import activityContent from '@/content/activity'
import dateFormatter from '@/mixins/date-formatter'
import { activityModeToName } from '@/mappers/activity-name-mapper'
import { mapActions, mapGetters } from 'vuex'
import sort from 'fast-sort'
import ActivityDetailTable from './ActivityDetailTable'
import analytics from '@/mixins/analytics'
export default {
  name: 'recent-activity-table',
  mixins: [dateFormatter, analytics],
  components: {
    ActivityDetailTable,
    LoadableFailure,
    LoadableIndicator
  },
  data() {
    return {
      activityTableData: [],
      isLoadingCharacterActivity: false,
      isLoadingDetails: false,
      activityDetails: [],
      loadError: false
    }
  },
  props: {
    membershipId: {
      required: true,
      type: String
    },
    characterId: {
      required: false,
      type: String
    }
  },
  watch: {
    characterId(nextCharacterId) {
      if (nextCharacterId) {
        this.fetch(nextCharacterId)
      }
    }
  },
  computed: {
    ...mapGetters('members', ['clanMembers']),
    activityTableHeaders() {
      return activityContent.tableHeaders
    }
  },
  methods: {
    ...mapActions(['getCharacterActivity', 'getActivityDetails']),
    expandActivity(props) {
      this.recordEvent('Member Profile', 'View', 'Activity Details')
      this.isLoadingDetails = true
      props.expanded = !props.expanded
      this.activityDetails = []
      this.getActivityDetails(props.item.activityId)
        .then(details => {
          this.activityDetails = details.entries.map(entry => {
            return {
              icon: this.isClanMember(entry.player.destinyUserInfo.displayName) ? 'group' : '',
              player: entry.player.destinyUserInfo.displayName,
              class: entry.player.characterClass,
              power: entry.player.lightLevel,
              kills: entry.values.kills.basic.value,
              deaths: entry.values.deaths.basic.value
            }
          })
          this.isLoadingDetails = false
        })
        .catch(error => {
          console.error(error)
        })
    },
    isClanMember(gamertag) {
      return this.clanMembers.find(m => m.xboxUserName === gamertag) !== undefined
    },
    fetch(characterId) {
      this.isLoadingCharacterActivity = true
      this.loadError = false
      this.getCharacterActivity({ membershipId: this.membershipId, characterId })
        .then(activities => {
          this.isLoadingCharacterActivity = false
          this.activityTableData = sort(
            activities.map(activityObject => {
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
        })
        .catch(error => {
          console.error(error)
          this.loadError = true
          this.isLoadingCharacterActivity = false
        })
    }
  }
}
</script>
