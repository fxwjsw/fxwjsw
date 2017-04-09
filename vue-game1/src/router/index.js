import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/components/Game'
import statistics from '@/components/statistics'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Game',
      component: Game
    },
    {
      path: '/Game',
      name: 'Game',
      component: Game
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: statistics
    }
  ]
})
