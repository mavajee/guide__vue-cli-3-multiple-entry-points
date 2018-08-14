import Vue from 'vue'
import Router from 'vue-router'
import Posts from './views/Posts.vue'
import Users from './views/Users.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: 'manage',

  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'posts'
    },
    {
      path: '/posts',
      name: 'posts',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Posts.vue')
    },
    {
      path: '/users',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Users.vue')
    }
  ]
})
