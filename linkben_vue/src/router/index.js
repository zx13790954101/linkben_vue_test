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

function getAbsolutePath () {
  let path = location.pathname;
  return path.substring(0, path.lastIndexOf('/') + 1);

 }

export default new Router({
  mode: 'history',
  base: getAbsolutePath(),
  routes: [
 
    {
      path:"/",
      name:'Home',
      components:Home
    },
    {
      path: '/Simulate',
      name: 'Simulate',
      component: Simulate
    },
    {
      path: '/CarQuery',
      name: 'CarQuery',
      component: CarQuery
    },
  
  ]
})
