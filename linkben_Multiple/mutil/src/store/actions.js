import LvFetch from 'API/fetch'

const actions = {
  test({ commit }, data) {
    commit('TEST', data)
  },

  /**
   * @desc 保存授权参数
   */
  saveSessToken({ commit }, data) {
    commit('SAVE_SESS_TOKEN_OPTIONS', data)
  },

  /**
   * @desc 获取sess_token 
   */
  async getSessToken({ commit, state }, data) {
    let wechatAuth = window.localStorage.getItem('unionid')
    wechatAuth = JSON.parse(wechatAuth)
    wechatAuth['openid'] = wechatAuth['owner']

    const { sess_token } = await LvFetch({
      url: 'https://api.hxsapp.com/account/UserAccount/getUserInfoByWeChatUnionId',
      data: wechatAuth
    })

    commit('SAVE_SESS_TOKEN', sess_token)
  }

}

export default actions
