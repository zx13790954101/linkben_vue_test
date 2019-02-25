//我们组装模块并导出 store 的地方
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import actions from './actions';
import mutations from './mutations';
import imgState from './modules/imgState'
const state={
      selectColor:"rgba(255,255,255)",
      mainImgState:{
         type:false,
         url:"",
         defaultUrl:"",
         newUrl:"",
         selectColor:"rgba(255,255,255)",
         startColorBg:false,
      },
}
const store = new Vuex.Store({
  state,
 // modules: {imgState},
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
});
if (module.hot) {
  // 使 actions 和 mutations 成为可热重载模块
  module.hot.accept([
    './modules/imgState',
  ], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
    // 加载新模块 
    store.hotUpdate({
      modules: {
        imgState: require('./modules/imgState').default,
      }
    })
  })
}

export default store;