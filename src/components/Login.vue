<template>
  <div class="content">
    <header>
      <img class="logo" src="../../static/dcm-logo.png" alt="Destiny Clan Manager logo">
      <h2 class="headline brand">
        <span class="kerned">Destiny</span><strong>Clan Manager</strong></h2>
    </header>

    <section class="welcome">
      <div class="row">
        <h1 class="display-3 mr-4">Clan admin?</h1>
        <v-btn :href="bungieNetAuthorizeEndpoint" large>Sign in</v-btn>
      </div>

      <div class="row mt-3">
        <p class="title">Sign in with your Bungie.net account to manage your clan</p>
      </div>
    </section>

    <section class="about">
      <section class="intro">
        <img src="../../static/dashboard.png" alt="">

        <div class="row">
          <h2 class="display-2 mt-4 mb-4" v-responsive.xs>Manage your clan like<br> never before</h2>
          <h2 class="display-2 mt-4 mb-4" v-responsive.sm.md.lg.xl>Manage your clan<br> like never before</h2>

          <p class="title pl-3 pr-3">With Destiny Clan Manager the pulse of your clan is right at your fingertips!</p>

          <p class="title pl-3 pr-3">Find out everything you want to know about your clan, including who's inactive, and who you want on your next Iron Banner or Raid team</p>
        </div>
      </section>
    </section>

    <section class="stripe">
      <div class="wrapper">
        <section class="features pb-0">
          <div class="sixty">
            <h2 class="display-1">Features</h2>

            <div class="feature elevation-2">
              <h3 class="headline">Find inactive members</h3>
              <p class="subheading">See who's playing and who's not</p>
              <ul>
                <li>Find out how long its been since a member logged in and played</li>
                <li>Get a report of all members that haven't played in 30 days or longer</li>
              </ul>
            </div>

            <div class="feature elevation-2">
              <h3 class="headline">Manage roster</h3>
              <p class="subheading">Grow and prune</p>
              <ul>
                <li>Approve or reject prospective members</li>
                <li>Manage clan invitations</li>
                <li>Remove members that have moved on to other games</li>
              </ul>
            </div>

            <div class="feature elevation-2">
              <h3 class="headline">Coordinate with other admins</h3>
              <p class="subheading">Get everyone on the same page</p>
              <ul>
                <li>Grant members exemptions when they're away</li>
                <li>Keep notes about members</li>
              </ul>
            </div>

            <div class="feature elevation-2">
              <h3 class="headline">Heading</h3>
              <p class="subheading">Find the perfect fireteam members</p>
              <ul>
                <li>View player stats for each member in all the game types</li>
              </ul>
            </div>
          </div>

          <div class="fourty">
            <img src="../../static/features.gif" alt="">
          </div>
        </section>
      </div>
    </section>
  </div>
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
@import '../scss/colors';

img {
  max-width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  flex: 1;

  > * {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    padding-bottom: 44px;
  }
}

header {
  padding-top: 44px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .logo,
  .brand {
    margin: 0 auto;
  }

  .brand {
    margin-top: 44px;
    text-shadow: #000 0px 0px 25px;
    text-align: center;

    .kerned {
      text-transform: uppercase;
      letter-spacing: 15px;
      font-weight: 100;
      display: block;
      margin-bottom: 7px;
      text-align: center;
    }

    strong {
      text-transform: uppercase;
      display: block;
      letter-spacing: 5px;
    }
  }
}

.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-shadow: #000 1px 1px 5px;

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  h1 {
    letter-spacing: 1px !important;
  }
}

.about {
  img {
    max-width: 100%;
  }

  .intro {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 100px;

    h2 {
      margin: 0 auto;
      text-align: center;
      line-height: 56px !important;
    }

    p {
      text-align: center;
      text-shadow: #000 1px 1px 5px;
      line-height: 28px !important;
    }
  }
}

.features {
  padding: 44px 0;
  display: flex;
  flex-direction: row;

  h2 {
    font-weight: bold;
  }

  .feature {
    margin: 22px 0 44px;
    padding-right: 22px;
    background-color: white;
    padding: 22px;
    border-radius: 4px;

    h3 {
      margin-bottom: 11px;
    }

    p {
      color: black;
      font-weight: 500;
    }

    ul {
      padding-left: 20px;

      li {
        color: black;
        margin-bottom: 11px;
        font-size: 16px;
      }
    }
  }

  .sixty {
    width: 60%;
    margin-right: 44px;
  }

  .fourty {
    width: 40%;
  }
}

.stripe {
  display: block;
  margin: unset;
  background-color: #e9edf5;
  color: #2b4f9c;

  .wrapper {
    max-width: 1280px;
    margin: 0 auto;
    min-height: unset;
  }
}

@media screen and (max-width: 1323px) {
  .stripe {
    .wrapper {
      padding: 0 22px;
    }
  }
}

@media screen and (max-width: 590px) {
  .welcome {
    padding: 0 22px;
    text-align: center;

    > .row {
      flex-direction: column;
      width: 100%;
    }

    h1 {
      margin-bottom: 12px;
      margin-right: 0px !important;
    }
  }

  .about {
    img {
      display: none;
    }

    .intro {
      padding: 0 22px;
    }
  }

  .features {
    .sixty {
      width: 100%;
      margin-right: 0;
    }

    .fourty {
      display: none;
    }
  }
}

@media screen and (max-width: 401px) {
  .welcome {
    h1 {
      font-size: 52px !important;
    }
  }
}
</style>
