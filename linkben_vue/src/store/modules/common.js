import Vue from 'vue'
import * as types from './mutation-types'
//通用模块状态控制
const commModule = {
    state: {
      selectedTab: 'index',
      footerVisible: false,
    },

    //激发事件改变state 改变store中的数据使用mutations
    mutations: {
      [types.TOGGLE_FOOTER] (state) {
        state.footerVisible = !state.footerVisible
      },
      [types.SELECT_TAB](state, val){
        state.selectedTab = val;
      }
    },
    actions: {
     
    },
    //频繁通用计算 
    getters: {
        
    }
}

export default commModule;