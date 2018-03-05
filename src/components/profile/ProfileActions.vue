<template>
  <v-card>
    <v-card-title class="headline">Actions</v-card-title>
    <v-card-text>
      <v-btn block v-if="!isCurrentlyExempt" @click="makeExempt" :disabled="isLoading" class="mb-3">
        <span :class="{'mr-3': isLoading}">Grant exemption</span><v-progress-circular v-if="isLoading" indeterminate color="yellow" :size="20"></v-progress-circular>
      </v-btn>
      <v-btn block v-else @click="liftExemption" :disabled="isLoading" class="mb-3">
        <span :class="{'mr-3': isLoading}">Lift exemption</span><v-progress-circular v-if="isLoading" indeterminate color="yellow" :size="20"></v-progress-circular>
      </v-btn>

      <v-btn color="red" block @click="openConfirmationDialog" :disabled="isLoading">
        <span :class="{'mr-3': isLoading}">Remove member</span><v-progress-circular v-if="isLoading" indeterminate color="yellow" :size="20"></v-progress-circular>
      </v-btn>
    </v-card-text>

    <v-dialog v-model="showConfirmationDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm removal</v-card-title>
        <v-card-text>
          <p>Type the member's gamertag below to confirm removal</p>
          <div><v-text-field ref="confirmation" v-model="gamertagConfirmation" @keyup.enter="kick" placeholder="Gamertag" color="red"></v-text-field></div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" @click="kick" :disabled="this.gamertag !== this.gamertagConfirmation">Confirm</v-btn>
          <v-btn flat @click="closeConfirmationDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment-timezone'
import sort from 'fast-sort'
export default {
  name: 'profile-actions',
  data() {
    return {
      isLoading: false,
      showConfirmationDialog: false,
      gamertagConfirmation: ''
    }
  },
  computed: {
    ...mapState(['exemptions', 'activeMember']),
    membershipId() {
      return this.$route.params.membershipId
    },
    gamertag() {
      return this.activeMember.gamertag
    },
    isCurrentlyExempt() {
      if (!this.exemptions[this.membershipId]) {
        return false
      }

      const memberHistory = sort(JSON.parse(JSON.stringify(this.exemptions[this.membershipId].history))).asc(h => h.startDate)
      const endDate = memberHistory[memberHistory.length - 1].endDate
      const today = moment.utc().format()

      return today <= endDate
    }
  },
  methods: {
    ...mapActions(['grantExemption', 'editExemption', 'removeMember']),
    makeExempt() {
      const exemption = {
        membershipId: this.membershipId,
        startDate: moment.utc(),
        endDate: moment.utc().add(1, 'month'),
        adminMembershipId: ''
      }

      this.isLoading = true
      this.grantExemption(exemption)
        .then(() => {
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    liftExemption() {
      const memberHistory = sort(JSON.parse(JSON.stringify(this.exemptions[this.membershipId].history))).asc(h => h.startDate)
      const currentExemption = memberHistory[memberHistory.length - 1]

      currentExemption.endDate = moment.utc()

      this.isLoading = true
      this.editExemption(currentExemption)
        .then(() => {
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    kick() {
      if (this.gamertag === this.gamertagConfirmation) {
        this.removeMember({
          removedMembershipId: this.membershipId,
          removedGamertag: this.activeMember.gamertag,
          removalDate: moment.utc()
        }).then(() => {
          this.$router.push('/member-list')
        })
      }
    },
    openConfirmationDialog() {
      this.showConfirmationDialog = true
      this.$nextTick(() => {
        this.$refs.confirmation.focus()
      })
    },
    closeConfirmationDialog() {
      this.showConfirmationDialog = false
      this.gamertagConfirmation = ''
    }
  }
}
</script>