// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/store'
import router from '@/router'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'babel-polyfill'
import 'styles/iconfont.css'
import 'swiper/dist/css/swiper.css'
// import 'lib-flexible/flexible'


//引入mint-ui所有的组件使用下面两行
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
//引入element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css';
Vue.use(Element);
//引入swiper
// /*import 'vue-awesome-swiper/dist/'*/
// import bus from './assets/bus'
// import './assets/form'
Vue.use(VueAwesomeSwiper);

import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//引入UI组件 按需引入 指定引入Button组件
// import { Button } from 'mint-ui'
// Vue.component(Button.name, Button)

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  //template: '<router-view></router-view>'
  components: { App },
  template: '<App/>'
})
