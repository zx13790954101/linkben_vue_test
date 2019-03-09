// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/store'
import router from '@/router'
//import fastClick from 'fastclick'
//apphxsapp-act-feimport 'babel-polyfill'
//$RECYCLE.BINimport 'styles/iconfont.css'
// 导入css reset
//import 'normalize.css'
//引入mint-ui所有的组件使用下面两行




import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
//引入element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);
//引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper);
// Vue.http.options.emulateJSON = true
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
 // loading: require("../static/loading2.gif"),
  error:require('../static/images/main/Error.png'),
  attempt: 1
})

import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false
//配置是否允许 vue-devtools 检查代码, 生产环境禁用vue-devtools
Vue.config.devtools = process.env.NODE_ENV !== 'production'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //template: '<router-view></router-view>'
  components: { App },
  template: '<App/>'
})
