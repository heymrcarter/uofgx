import Vue from 'vue'
import Router from 'vue-router'
import ClanMemberList from '@/components/ClanMemberList'
import InactivePlayers from '@/components/InactivePlayers'
import Login from '@/components/Login'
import OAuthHandler from '@/components/OAuthHandler'
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
      path: '/member-list',
      name: 'MemberList',
      component: ClanMemberList,
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
    }
  ],
  mode: 'history'
})

configureRouter(router)

export default router
