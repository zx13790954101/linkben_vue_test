import Vue from 'vue'
import * as types from './mutation-types'
//通用模块状态控制
const imgState = {
    state: {
      //要设置的全局访问的state对象
      selectColor:"rgba(255,255,255)",
      //设置全局的照片的状态判断
      mainImgState:{
          type:false,
          url:"",
          defaultUrl:"",
          newUrl:"",
          selectColor:"rgba(255,255,255)",
          startColorBg:false,
      },
    },
    //激发事件改变state 改变store中的数据使用mutations
    mutations: {
      [types.setSelectColor] (state,data) {
        state.selectColor = data
      },
      [types.setMainImgState](state, data){
        state.mainImgState = data;
      }
    },
    actions: {
     
    },
    //频繁通用计算 
    getters: {
      selectColor: state => state.selectColor,
      mainImgState: state => state.mainImgState
    }
}

export default imgState;