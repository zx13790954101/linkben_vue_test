import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

function getAbsolutePath () {
  let path = location.pathname;
  return path.substring(0, path.lastIndexOf('/') + 1);

 }
 
export default new Router({
  mode: 'history',
  base: "/dist/",
  //base:getAbsolutePath () ,
  routes: [
    {
      path:"/",
      name:'Home',
      component:  resolve => require(['@/pages/home/home'], resolve),//懒加载
    },
    {
      path:"/Item",
      name:'Item',
      component:  resolve => require(['@/pages/home/pages/Item'], resolve),//懒加载
    },
    {
      path: '/Simulate',
      name: 'Simulate',
      component:  resolve => require(['@/demo/simulate'], resolve),//懒加载
  
    },
    {
      path: '/CarQuery',
      name: 'CarQuery',
      component:  resolve => require(['@/demo/pages/CarQuery'], resolve),//懒加载
  
    },
    {
      path: '/Matting',
      name: 'Matting',
      component:  resolve => require(['@/demo/simulate/Matting'], resolve),//懒加载
  
    },
    {
      path: '/CropperInit',
      name: 'CropperInit',
      component:  resolve => require(['@/pages/CropperInit'], resolve),//懒加载
  
    }
  ]
})

