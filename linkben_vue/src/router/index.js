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
      path: '/',
      name: 'FunSelectPopup',
      component:  resolve => require(['@/pages/simulate/mobile/FunSelectPopup'], resolve),//懒加载
  
    },
    {
      path:"/Home",
      name:'Home',
      component:  resolve => require(['@/pages/home/home'], resolve),//懒加载
    },
    {
      path:"/Item",
      name:'Item',
      component:  resolve => require(['@/pages/home/pages/Item'], resolve),//懒加载
    },
    {
      path: '/diy',//首页加载方式，空间工具
      name: 'diy',
      component:  resolve => require(['@/pages/simulate/diy'], resolve),//懒加载
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
      path: '/Home2',
      name: 'Home2',
      component:  resolve => require(['@/pages/cropper/Home'], resolve),//懒加载
      
    },
    //截取子的图片
    {
      path: '/html2canvas',
      name: 'html2canvas',
      component:  resolve => require(['@/pages/test/html2canvas'], resolve),//懒加载
  
    },

  ]
})

