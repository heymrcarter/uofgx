import store from '../store'

export function configureRouter(router) {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.state.session === undefined) {
        next({
          path: '/'
        })
      } else {
        if (!store.state.session.hasAccess) {
          next({
            path: '/'
          })
        } else {
          next()
        }
      }
    } else {
      next()
    }
  })
}
