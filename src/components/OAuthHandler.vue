<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex'
import { checkOAuthState } from '@/utils/oauth-util'
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
    ...mapActions('session', ['getAccessToken', 'getUserGroups'])
  },
  mounted() {
    const self = this
    const state = this.$route.query.state
    const code = decodeURIComponent(this.$route.query.code)

    if (!checkOAuthState(state)) {
      this.$router.replace('/')
      return
    }
    this.getAccessToken(code)
      .then(session => {
        this.getUserGroups(session)
          .then(groups => {
            if (groups && groups.length > 0) {
              this.$router.replace('/dashboard')
            }
          })
          .catch(error => {
            console.error(error)
            self.$router.replace('/')
          })
      })
      .catch(error => {
        console.error(error)
        self.$router.replace('/')
      })
  }
}
</script>
