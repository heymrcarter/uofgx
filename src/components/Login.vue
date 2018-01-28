<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex xs12>
        <v-card>
          <v-card-media
            class="white--text"
            height="400px"
            src="https://bungie.net/img/Themes/Group_Titan1/struct_images/group_top_banner.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox class="welcome-box">
                  <div class="welcome">
                    <h1 class="headline mb-3">Unity of Guardians clan administration</h1>
                    <div class="mb-3 instructions">To view the roster and run reports you need to sign in with your Bungie.net account</div>
                    <div><v-btn :href="bungieNetAuthorizeEndpoint">Sign in with your Bungie.net account</v-btn></div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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

<style scoped>
.headline {
  display: block;
  font-size: 30px !important;
}

.welcome {
  text-shadow: #000 1px 1px 5px;
  background-color: rgba(0, 0, 0, 0.38);
  position: absolute;
  bottom: 15px;
  padding: 15px;
  width: auto;
}

.welcome .btn {
  margin-left: 0;
}

.instructions {
  font-size: 18px;
}

@media only screen and (max-width: 736px) {
  .container {
    padding: 0;
  }

  .welcome {
    bottom: 0;
    width: 100%;
  }

  .headline {
    font-size: 24px !important;
  }

  .instructions {
    font-size: 16px;
  }

  .btn {
    height: 44px;
    font-size: 16px;
  }
}
</style>
