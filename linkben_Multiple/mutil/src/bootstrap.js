// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入自适应设计的观察者程序
import storeMod from './store'
Vue.config.productionTip = false
import LvFetch from './lib/API/fetch'
Vue.prototype.LvFetch = LvFetch

// 全局公用组件
import * as Components from '@/components'


const Bootstrap = ({ Router, routerConfig, store }) => {
  // 注册全局组件
  Object.values(Components).forEach(component => {
    Vue.component(component.name, component)
  })
  // 实例化路由
  const router = Router({ routerConfig });
  const stores = store ? store : storeMod;
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render: h => h(App),
    store: stores,
    router,
  })
};
export default Bootstrap;
