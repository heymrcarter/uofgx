<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <member-overview></member-overview>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <v-tabs v-model="activeTab" slider-color="accent">
          <v-tab>Activity Overview</v-tab>
          <v-tab>Character activity</v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <v-tab-item class="profile-tab mt-3">
            <activity-overview></activity-overview>
          </v-tab-item>

          <v-tab-item class="profile-tab mt-3">
            <character-activity></character-activity>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ActivityOverview from "./profile/ActivityOverview";
import CharacterActivity from "./profile/CharacterActivity";
import MemberOverview from "./profile/MemberOverview";

export default {
  name: "member-profile",
  components: {
    ActivityOverview,
    CharacterActivity,
    MemberOverview
  },
  data() {
    return {
      activeTab: null
    };
  },
  computed: {
    currentMembershipId() {
      return this.$route.params.membershipId;
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
}

.profile-tab {
  .container {
    padding: unset;
  }
}
</style>
