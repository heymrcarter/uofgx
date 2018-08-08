<template>
  <div class="content"></div>
</template>

<script>
import { mapActions } from 'vuex'
import { checkOAuthState } from '@/utils/oauth-util'
import analytics from '@/mixins/analytics'
export default {
  name: 'oauth-handler',
  mixins: [analytics],
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
              let platform
              switch (groups[0].platformUserInfo.membershipType) {
                case 1:
                  platform = 'Xbox'
                  break
                case 2:
                  platform = 'PlayStation'
                  break
                case 3:
                  platform = 'PC'
                  break
              }
              this.recordEvent('App', 'Login', undefined, platform)
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

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
