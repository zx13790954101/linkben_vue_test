//我们组装模块并导出 store 的地方
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import common from './modules/common';
import actions from './actions';
import mutations from './mutations';

const store = new Vuex.Store({
    modules: {
      common,
    },
    actions,
    mutations,
    strict: process.env.NODE_ENV !== 'production'
  });
  // console.log(process)
if (module.hot) {
    // 使 actions 和 mutations 成为可热重载模块
    module.hot.accept([
      './modules/common', 
      ], () => {
      // 获取更新后的模块
      // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
      // 加载新模块 
      store.hotUpdate({
        modules: {
          common: require('./modules/common').default,
        }
      })
    })
  }
  
  export default store;