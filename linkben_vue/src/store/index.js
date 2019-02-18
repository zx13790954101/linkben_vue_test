//我们组装模块并导出 store 的地方
import Vue from 'vue';
import Vuex from 'vuex';
import {mapState} from 'vuex';
Vue.use(Vuex);
import common from './modules/common';
import actions from './actions';
import mutations from './mutations';

const state={
     //要设置的全局访问的state对象
      selectColor:"rgba(255,255,255)"
}
const store = new Vuex.Store({
    state,
    computed:mapState({
      selectColor:state=>state.selectColor //理解为传入state对象，修改state.count属性
    }),
    modules: {
      common,
    },
    actions,
    mutations:{
      selectColor(state,name){
        state.selectColor=name;
      }
    },
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