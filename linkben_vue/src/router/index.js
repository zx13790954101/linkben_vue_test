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
      path: '/Simulate',//首页加载方式，空间工具
      name: 'Simulate',
      component:  resolve => require(['@/pages/simulate/simulate'], resolve),//懒加载
    },
    {
      path: '/CarQuery',
      name: 'CarQuery',
      component:  resolve => require(['@/pages/views/CarQuery'], resolve),//懒加载
  
    },
    {
      path: '/CropperInit',
      name: 'CropperInit',
      component:  resolve => require(['@/pages/cropper/CropperInit'], resolve),//懒加载
  
    },
    //截取子的图片
    {
      path: '/CropperImg',
      name: 'CropperImg',
      component:  resolve => require(['@/pages/cropper/CropperImg'], resolve),//懒加载
  
    },
    {
      path: '/HomePopup',
      name: 'HomePopup',
      component:  resolve => require(['@/pages/simulate/mobile/HomePopup'], resolve),//懒加载
  
    }
  ]
})

