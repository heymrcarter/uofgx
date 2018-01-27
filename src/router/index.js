import Vue from 'vue'
import Router from 'vue-router'
import ClanMemberList from '@/components/ClanMemberList'
import InactivePlayers from '@/components/InactivePlayers'
import Login from '@/components/Login'
import OAuthHandler from '@/components/OAuthHandler'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Unity of Guardians',
      displayName: 'Unity of Guardians',
      component: Login
    },
    {
      path: '/oauth/authorize',
      name: 'Processing login...',
      displayName: 'Processing login...',
      component: OAuthHandler
    },
    {
      path: '/member-list',
      name: 'Unity of Guardians',
      displayName: 'Member list',
      component: ClanMemberList
    },
    {
      path: '/inactive-players',
      name: 'Inactive Players',
      displayName: 'Inactive players',
      component: InactivePlayers
    }
  ],
  mode: 'history'
})
