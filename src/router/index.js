import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import InactivePlayers from '@/components/InactivePlayers'
import Login from '@/components/Login'
import OAuthHandler from '@/components/OAuthHandler'
import MemberProfile from '@/components/MemberProfile'
import { configureRouter } from './config'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/oauth/authorize',
      name: 'OAuth',
      component: OAuthHandler,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/inactive-players',
      name: 'InactivePlayers',
      component: InactivePlayers,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile/:membershipId',
      name: 'Profile',
      component: MemberProfile,
      meta: {
        requiresAuth: true
      }
    }
  ],
  mode: 'history'
})

configureRouter(router)

export default router
