<template>
  <v-card height="100%">
    <v-card-title class="headline">Actions</v-card-title>
    <v-card-text>
      <add-note-action :membershipId="membershipId"></add-note-action>

      <v-btn block v-if="!isCurrentlyExempt" @click="showExemptionDialog = true" :disabled="isLoadingExemption" class="mb-3">
        <span :class="{'mr-3': isLoading}">Grant exemption</span>
        <v-progress-circular v-if="isLoading" indeterminate color="yellow" :size="20"></v-progress-circular>
      </v-btn>
      <v-btn block v-else @click="liftExemption" :disabled="isLoadingExemption" class="mb-3">
        <span :class="{'mr-3': isLoading}">Lift exemption</span>
        <v-progress-circular v-if="isLoading" indeterminate color="yellow" :size="20"></v-progress-circular>
      </v-btn>

      <v-btn color="red" block @click="openConfirmationDialog" :disabled="isLoading">
        <span :class="{'mr-3': isLoading}">Remove member</span>
        <v-progress-circular v-if="isLoading" indeterminate color="yellow" :size="20"></v-progress-circular>
      </v-btn>
    </v-card-text>

    <v-dialog v-model="showConfirmationDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Remove {{ gamertag }}?</v-card-title>
        <v-card-text>
          <p>Are you sure you want to remove <strong class="subheading bold">{{ gamertag }}</strong> from the clan?</p>
          <p>This action cannot be undone!</p>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="kick">Confirm</v-btn>
          <v-btn flat @click="closeConfirmationDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showExemptionDialog" max-width="700">
      <v-card>
        <v-card-title class="headline">Grant exemption</v-card-title>
        <v-card-text>
          <div class="exemption-range">
            <v-flex class="exemption-start">
              <p class="title">Start</p>
              <v-date-picker class="elevation-2" v-model="today" readonly width="300"></v-date-picker>
            </v-flex>

            <v-flex class="exemption-end">
              <p class="title">End</p>
              <v-date-picker class="elevation-2" v-model="exemptionEndDatePickerValue" show-current="yellow" :min="today" width="300"></v-date-picker>
            </v-flex>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn flat @click="showExemptionDialog = false">Cancel</v-btn>
          <v-btn @click="makeExempt">Grant</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment-timezone'
import sort from 'fast-sort'
import AddNoteAction from './AddNoteAction'
import analytics from '@/mixins/analytics'
import dateFormatter from '@/mixins/date-formatter'
export default {
  name: 'profile-actions',
  components: {
    AddNoteAction
  },
  mixins: [analytics, dateFormatter],
  data() {
    return {
      isLoading: false,
      isLoadingExemption: false,
      showConfirmationDialog: false,
      showExemptionDialog: false,
      exemptionEndDatePickerValue: moment
        .utc()
        .add(1, 'month')
        .tz('America/New_York')
        .format('YYYY-MM-DD')
    }
  },
  computed: {
    ...mapState(['exemptions']),
    ...mapState('members/active', {
      gamertag(state) {
        return state.gamertag
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
      if (!this.exemptions.exemptions[this.membershipId]) {
        return false
      }

      const memberHistory = sort(JSON.parse(JSON.stringify(this.exemptions.exemptions[this.membershipId].history))).asc(h => h.startDate)
      const endDate = memberHistory[memberHistory.length - 1].endDate
      const today = moment.utc().format()

      return today <= endDate
    }
  },
  methods: {
    ...mapActions(['grantExemption', 'editExemption', 'removeMember']),
    makeExempt() {
      this.recordEvent('Member Profile', 'Grant', 'Exemption')
      const endDate = moment.utc(this.exemptionEndDatePickerValue).format()
      console.log('-->', endDate)
      const exemption = {
        membershipId: this.membershipId,
        startDate: this.today,
        endDate,
        adminMembershipId: ''
      }

      this.isLoadingExemption = true
      this.showExemptionDialog = false
      this.grantExemption(exemption)
        .then(() => {
          this.isLoadingExemption = false
        })
        .catch(() => {
          this.isLoadingExemption = false
        })
    },
    liftExemption() {
      this.recordEvent('Member Profile', 'Lift', 'Exemption')

      const memberHistory = sort(JSON.parse(JSON.stringify(this.exemptions.exemptions[this.membershipId].history))).asc(h => h.startDate)
      const currentExemption = memberHistory[memberHistory.length - 1]

      currentExemption.endDate = this.today

      this.isLoadingExemption = true
      this.editExemption(currentExemption)
        .then(() => {
          this.isLoadingExemption = false
        })
        .catch(() => {
          this.isLoadingExemption = false
        })
    },
    kick() {
      this.recordEvent('Member Profile', 'Remove', 'Member')
      this.removeMember({
        removedMembershipId: this.membershipId,
        removedGamertag: this.gamertag,
        removalDate: moment.utc()
      }).then(() => {
        this.$router.push('/dashboard')
      })
    },
    openConfirmationDialog() {
      this.recordEvent('Member Profile', 'Start', 'Remove Member')
      this.showConfirmationDialog = true
    },
    closeConfirmationDialog() {
      this.recordEvent('Member Profile', 'Cancel', 'Remove Member')
      this.showConfirmationDialog = false
    }
  }
}
</script>

<style scoped lang="scss">
.bold {
  font-weight: bold;
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
