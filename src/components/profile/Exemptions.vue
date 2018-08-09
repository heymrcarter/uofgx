<template>
  <v-dialog v-model="active" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
  <v-card height="100%">
    <v-toolbar card>
      <v-btn icon @click.native="closeDialog">
        <v-icon>close</v-icon>
      </v-btn>

      <v-toolbar-title>Exemptions</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="!isCurrentlyExempt && currentSubView === 'exemption-list'" @click="currentSubView = 'grant-exemption'">Grant exemption</v-btn>
      <v-btn v-if="currentSubView === 'grant-exemption'" @click="currentSubView = 'exemption-list'">Cancel</v-btn>
    </v-toolbar>

    <v-progress-linear v-if="isLoading" indeterminate height="5" color="yellow"></v-progress-linear>

    <v-card-text>
      <v-flex v-if="currentSubView === 'exemption-list'">
        <div class="no-exemptions" v-if="exemptionHistory.length === 0">
          <v-icon>explicit</v-icon>
          <p class="title">No exemptions</p>
        </div>
        <v-list two-line v-else>
          <template v-for="(exemption, i) in exemptionHistory">
            <v-list-tile :key="i">
              <v-list-tile-content>
                <v-list-tile-title>{{ exemption.startDate | formatDate }} - {{ exemption.endDate | formatDate }}</v-list-tile-title>
                <v-list-tile-sub-title>Granted by: {{ adminUserName(exemption.adminMembershipId) }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action v-if="isCurrentExemption(exemption)">
                <v-btn @click="liftExemption">Lift</v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider :key="(i+1) * 100"></v-divider>
          </template>
        </v-list>
      </v-flex>

      <v-flex v-else>
        <h3 class="title mb-3">Grant exemption</h3>
        <div class="exemption-range mb-3">
          <v-flex class="exemption-start ml-3">
            <p class="subheading">Start</p>
            <v-date-picker class="elevation-2" v-model="today" readonly width="300"></v-date-picker>
          </v-flex>

          <v-flex class="exemption-end">
            <p class="subheading">End</p>
            <v-date-picker class="elevation-2" v-model="exemptionEndDatePickerValue" show-current="yellow" :min="today" width="300"></v-date-picker>
          </v-flex>
          </div>
          <v-btn @click="makeExempt">Grant exemption</v-btn>
      </v-flex>
    </v-card-text>
  </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import dateFormatter from '@/mixins/date-formatter'
import sort from 'fast-sort'
import moment from 'moment-timezone'
import analytics from '@/mixins/analytics'
export default {
  name: 'exemptions',
  mixins: [dateFormatter, analytics],
  props: {
    active: Boolean
  },
  data() {
    return {
      loadError: false,
      isLoading: false,
      currentSubView: 'exemption-list',
      exemptionEndDatePickerValue: moment
        .utc()
        .add(1, 'month')
        .tz('America/New_York')
        .format('YYYY-MM-DD')
    }
  },
  computed: {
    ...mapGetters('members', ['clanMembers']),
    ...mapGetters(['currentExemptMembers']),
    ...mapState({
      exemptions(state) {
        return state.exemptions.exemptions
      }
    }),
    today() {
      return moment
        .utc()
        .tz('America/New_York')
        .format('YYYY-MM-DD')
    },
    membershipId() {
      return this.$route.params.membershipId
    },
    isCurrentlyExempt() {
      return this.currentExemptMembers.find(m => m.membershipId === this.membershipId) !== undefined
    },
    exemptionHistory() {
      if (!this.exemptions[this.membershipId]) {
        return []
      }
      const currentMemberExemption = JSON.parse(JSON.stringify(this.exemptions[this.$route.params.membershipId]))
      return sort(currentMemberExemption.history).desc(e => e.endDate)
    }
  },
  methods: {
    ...mapActions(['grantExemption', 'editExemption']),
    adminUserName(adminMembershipId) {
      return this.clanMembers.find(m => m.bungieNetMembershipId === adminMembershipId).bungieNetUserName
    },
    isCurrentExemption(exemption) {
      const endDate = exemption.endDate
      const today = moment.utc().format()

      return today <= endDate
    },
    closeDialog() {
      this.$emit('close')
    },
    makeExempt() {
      this.recordEvent('Member Profile', 'Grant', 'Exemption')
      const startDate = moment.utc(this.today).format()
      const endDate = moment.utc(this.exemptionEndDatePickerValue).format()
      const exemption = {
        membershipId: this.membershipId,
        startDate,
        endDate,
        adminMembershipId: ''
      }

      this.isLoading = true
      this.grantExemption(exemption).finally(() => {
        this.isLoading = false
        this.currentSubView = 'exemption-list'
      })
    },
    liftExemption() {
      this.recordEvent('Member Profile', 'Lift', 'Exemption')

      const memberHistory = sort(JSON.parse(JSON.stringify(this.exemptions[this.membershipId].history))).asc(h => h.startDate)
      const index = memberHistory.length - 1
      const currentExemption = memberHistory[index]

      currentExemption.endDate = moment.utc(this.today).format()

      this.isLoading = true
      this.editExemption(currentExemption).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.no-exemptions {
  display: block;

  i {
    display: block;
    text-align: center;
    font-size: 72px;
  }

  p {
    text-align: center;
  }
}

.exemption-range {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  align-items: baseline;
}

@media screen and (max-width: 675px) {
  .exemption-range {
    flex-direction: column;
    width: 300px;

    .exemption-start {
      margin-bottom: 40px;
    }
  }
}
</style>
