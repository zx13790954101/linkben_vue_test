import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
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
  base: "/dist/",
  // base:getAbsolutePath () ,
    base:'/dist',
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
    {
      path: '/Matting',
      name: 'Matting',
      component: Matting

    }
  ]
})

