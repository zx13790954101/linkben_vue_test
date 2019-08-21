import state from './state'
import * as type from './type.js'

const matutaions = {
  [type.TEST](state, data) {
    state.teststate = data
  },
  [type.SAVE_SESS_TOKEN_OPTIONS](state, data) {
    state.sess_token_options = data
  },
  // 保存接口的sess_token
  [type.SAVE_SESS_TOKEN](state, data) {
    state.sess_token = data
  },

  // 缓存状态
  [type.INIT_SESS_TOKEN](state, data) {
    state.initSessToken = data
  }
}

export default matutaions
