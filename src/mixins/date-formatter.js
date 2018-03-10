import moment from 'moment-timezone'

export default {
  filters: {
    formatDate(date) {
      return moment
        .utc(date)
        .tz('America/New_York')
        .format('MM/DD/YYYY')
    }
  },
  methods: {
    formatDate(date) {
      return moment
        .utc(date)
        .tz('America/New_York')
        .format('MM/DD/YYYY')
    }
  }
}
