<template>
  <div>
    <v-dialog color="error" icon="warning" :value="error !== undefined">
      {{this.error}} <v-btn flat exact to="/">Back to login</v-btn>
    </v-dialog>

    <v-snackbar :timeout="6000" bottom v-model="errorToast">
      {{ errorToastText }}
      <v-btn flat to="/">Back</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'oauth-handler',
  data() {
    return {
      error: undefined,
      errorToast: false,
      errorToastText: ''
    }
  },
  methods: {
    ...mapActions(['getAccessToken', 'checkAccessForMember'])
  },
  mounted() {
    const self = this
    const state = this.$route.query.state
    const code = decodeURIComponent(this.$route.query.code)

    if (atob(state) !== process.env.OAUTH_SECRET) {
      this.error = 'Your login attempt may have been tampered with! Try logging in again.'
    }

    this.getAccessToken(code)
      .then(session => {
        this.checkAccessForMember(session)
          .then(hasAccess => {
            if (hasAccess) {
              this.$router.replace('/member-list')
            } else {
              this.error = 'Unauthorized! The account you logged in with does not have access to administer Unity of Guardians. Log in with a valid admin account.'
            }
          })
          .catch(error => {
            if (error.response) {
              self.$router.replace('/')
            }
          })
      })
      .catch(error => {
        console.error(error)
        self.$router.replace('/')
      })
  }
}
</script>

<style scoped>

</style>
