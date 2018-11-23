import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import  Index from '@/demo/index'
import  Order from '@/demo/pages/Order'
import  Discover from '@/demo/pages/Discover'
import  My from '@/demo/pages/My'
import  Login from '@/demo/pages/Login'
import  Register from '@/demo/pages/Register'
import Simulate from '@/demo/simulate'
import Matting from '@/demo/simulate/Matting'
import CarQuery from '@/demo/pages/CarQuery'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Simulate',
      component: Simulate
    },
    {
      path: '/CarQuery',
      name: 'CarQuery',
      component: CarQuery
    },
    {
      path: '/Matting',
      name: 'Matting',
      component: Matting
    },
    // {
    //   path: '/',
    //   name: 'index',
    //   component: Index
    // },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/discover',
      component: Discover
    },
    {
      path: '/my',
      component: My
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
})
