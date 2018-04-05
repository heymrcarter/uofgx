export default {
  methods: {
    recordEvent(catalog, action, label, value) {
      if (process.env.ANALYTICS_ENABLED) {
        this.$ga.event(catalog, action, label, value)
      } else {
        console.log('<SEND ANALYTICS EVENT HERE>')
        console.log(...arguments)
      }
    }
  }
}
