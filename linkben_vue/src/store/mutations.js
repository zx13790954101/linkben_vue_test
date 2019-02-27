//根级别的 mutation
import * as types from './modules/mutation-types'
export default {
  [types.setSelectColor] (state,data) {
    state.selectColor = data
  },
  [types.setMainImgState](state, data){
    state.mainImgState = data;
  },
  [types.screenWidth](state){
    return state.screenWidth;
  }
}