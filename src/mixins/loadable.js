export default {
  data() {
    return {
      isLoading: false,
      loadAction: undefined,
      loadError: false,
      errorMessage: undefined,
      loadParams: undefined,
      loadResult: undefined
    }
  },
  methods: {
    loadMethod() {
      if (this.loadAction) {
        this.isLoading = true
        this.loadError = false
        this.$store
          .dispatch(this.loadAction, this.loadParams)
          .then(result => {
            this.isLoading = false
            this.loadResult = result
          })
          .catch(error => {
            console.error(error)
            this.isLoading = false
            this.loadError = true
            this.errorMessage = error.message
          })
      }
    },
    reload() {
      this.loadMethod()
    }
  },
  mounted() {
    this.loadMethod()
  }
}
