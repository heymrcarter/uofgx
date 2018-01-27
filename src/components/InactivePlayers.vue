<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex>
        <v-card dark tile v-if="showWarning">
          <v-card-title primary-title class="card-content">
            <h2 class="headline">Inactive Player Report</h2>
            <div>The report takes a few minutes to run. Sit tight while it finishes up.</div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat dark @click="generateReport">Run report</v-btn>
            <v-btn flat dark @click="showWarning = false">Got it</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-if="inactiveMembers !== undefined" class="inactive-member-table">
      <v-flex>
        <v-data-table :headers="columnHeaders" :items="inactiveMembers" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{props.item.gamertag}}</td>
            <td>{{formatDate(props.item.lastPlayed)}}</td>
            <td>{{props.item.daysSinceLastSession}}</td>
            <td>{{props.item.characterIds.length}}</td>
            <td>{{props.item.expansions.pop()}}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <div class="loading-indicator" v-show="isRunningReport" :class="{active: isRunningReport}">
      <img src="../assets/loading-ghost.png"> <span><strong>ATTENTION</strong> Contacting Destiny 2 Servers</span>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'inactive-players',
  data() {
    return {
      showWarning: true,
      columnHeaders: [
        {
          text: 'Gamertag',
          align: 'left',
          value: 'gamertag'
        },
        {
          text: 'Last played',
          value: 'lastPlayed'
        },
        {
          text: 'Days in last session',
          value: 'daysSinceLastSession'
        },
        {
          text: 'number of characters',
          value: 'numberOfCharacters'
        },
        {
          text: 'Latest expansion',
          value: 'latestExpansion'
        }
      ],
      isRunningReport: false
    }
  },
  computed: {
    ...mapGetters(['inactiveMembers'])
  },
  methods: {
    ...mapActions(['getInactiveMembers']),
    formatDate(date) {
      return moment.utc(date).format('MM/DD/YYYY')
    },
    generateReport() {
      const self = this
      this.isRunningReport = true

      this.getInactiveMembers().then(() => {
        self.inRunningReport = false
      })
    }
  }
}
</script>

<style scoped>
.card-content {
  display: block;
}

h2 {
  margin-bottom: 10px;
}

.loading-indicator {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 0px;
  max-height: 60px;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 10px;
  font-size: 18px;
  transition-property: height;
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.loading-indicator.active {
  height: 60px;
}

.loading-indicator img {
  width: 40px;
  margin-right: 15px;
}

.inactive-member-table {
  margin-top: 20px;
}
</style>
