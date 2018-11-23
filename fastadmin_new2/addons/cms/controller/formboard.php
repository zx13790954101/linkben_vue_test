<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use think\Config;
use think\Cookie;
use think\Hook;
use think\Session;
use think\Validate;

class formboard extends Frontend
{

    protected $layout = 'default';//模板的主页面
    protected $noNeedLogin = ['login', 'register', 'third'];
    protected $noNeedRight = ['*'];

    public function _initialize()
    {
        parent::_initialize();
        $auth = $this->auth;

        if (!Config::get('fastadmin.usercenter')) {
            $this->error(__('User center already closed'));
        }

        $ucenter = get_addon_info('ucenter');
        if ($ucenter && $ucenter['state']) {
            include ADDON_PATH . 'ucenter' . DS . 'uc.php';
        }

        //监听注册登录注销的事件
        Hook::add('user_login_successed', function ($user) use ($auth) {
            $expire = input('post.keeplogin') ? 30 * 86400 : 0;
            Cookie::set('uid', $user->id, $expire);
            Cookie::set('token', $auth->getToken(), $expire);
        });
        Hook::add('user_register_successed', function ($user) use ($auth) {
            Cookie::set('uid', $user->id);
            Cookie::set('token', $auth->getToken());
        });
        Hook::add('user_delete_successed', function ($user) use ($auth) {
            Cookie::delete('uid');
            Cookie::delete('token');
        });
        Hook::add('user_logout_successed', function ($user) use ($auth) {
            Cookie::delete('uid');
            Cookie::delete('token');
        });
    }

    /**
     * 会员中心
     */
    public function form()
    {
        $this->view->assign('title', __('User center'));
        return $this->view->fetch();
    }


}
