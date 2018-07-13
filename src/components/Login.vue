<template>
  <section class="wrapper">
    <div class="content">
      <v-jumbotron class="welcome" src="https://bungie.net/img/Themes/Group_Titan1/struct_images/group_top_banner.jpg">
        <v-container fill-height>
          <v-layout align-center>
            <v-flex class="welcome-content">
              <h3 class="display-3">Destiny Clan Manager</h3>
              <v-spacer class="my-3"></v-spacer>
              <div class="title mb-3">Sign in with your Bungie.net account</div>
              <v-btn large class="mx-0" :href="bungieNetAuthorizeEndpoint">Sign in</v-btn>
              <v-btn color="grey" large to="/about">Learn more</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>

      <v-container grid-list-lg fluid>
        <v-layout row wrap justify-center>
          <v-flex xs12 md4>
            <v-card height="100%">
              <v-card-title class="headline">Find inactive members</v-card-title>
              <v-card-text>
                <p class="subheading">See who's playing and who's not</p>
                <p>With Destiny Clan Manager find out how long its been since a member logged on.</p>
                <p>With the inactive members report you can see everyone in the clan who has not played in 30 days or longer.</p>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 md4>
            <v-card height="100%">
              <v-card-title class="headline">Manage roster</v-card-title>
              <v-card-text>
                <p class="subheading">Grow and prune</p>
                <p>With Destiny Clan Manager you can approve or reject new members and cancel pending invitations.</p>
                <p>Prune away members once they move on to something else.</p>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 md4>
            <v-card height="100%">
              <v-card-title class="headline">Coordinate with other admins</v-card-title>
              <v-card-text>
                <p class="subheading">Get everyone on the same page</p>
                <p>With exemptions and notes make sure the entire admin team is up to date with the latest happenings.</p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <v-footer height="60px" class="pa-2">
      <v-layout row align-center>
        <v-flex flex="1">
          &copy; {{ new Date().getFullYear() }} - Tom Carter
        </v-flex>

        <div>
          <v-btn flat icon href="https://twitter.com/destinyclanmgr"><v-icon size="24px">fab fa-twitter</v-icon></v-btn>
        </div>
      </v-layout>
    </v-footer>
  </section>
</template>

<script>
export default {
  name: 'login',
  computed: {
    bungieNetAuthorizeEndpoint() {
      return `${process.env.AUTH_ENDPOINT}?client_id=${[process.env.CLIENT_ID]}&response_type=code&state=${btoa(process.env.OAUTH_SECRET)}`
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content {
    display: flex;
    flex-direction: column;
  }
}

.welcome {
  text-shadow: #000 1px 1px 5px;
}
</style>
