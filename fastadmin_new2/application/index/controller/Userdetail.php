<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use addons\cms\model\Channel;
use think\Config;
use think\Cookie;
use think\Hook;
use think\Session;
use think\Validate;
use think\Db;
use think\db\Query;
/**
 * 会员中心
 */
class Userdetail extends Frontend
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
     * 会员登录
     */
    public function login()
    {
        $url = $this->request->request('url');
        if ($this->auth->id)
            $this->success(__('You\'ve logged in, do not login again'), $url);
        if ($this->request->isPost()) {
            $account = $this->request->post('account');
            $password = $this->request->post('password');
            $keeplogin = (int)$this->request->post('keeplogin');
            $token = $this->request->post('__token__');
            $rule = [
                'account'   => 'require|length:3,50',
                'password'  => 'require|length:6,30',
                '__token__' => 'token',
            ];

            $msg = [
                'account.require'  => 'Account can not be empty',
                'account.length'   => 'Account must be 3 to 50 characters',
                'password.require' => 'Password can not be empty',
                'password.length'  => 'Password must be 6 to 30 characters',
            ];
            $data = [
                'account'   => $account,
                'password'  => $password,
                '__token__' => $token,
            ];
            $validate = new Validate($rule, $msg);
            $result = $validate->check($data);
            if (!$result) {
                $this->error(__($validate->getError()), null, ['token' => $this->request->token()]);
                return FALSE;
            }
            if ($this->auth->login($account, $password)) {
                $synchtml = '';
                ////////////////同步到Ucenter////////////////
                if (defined('UC_STATUS') && UC_STATUS) {
                    $uc = new \addons\ucenter\library\client\Client();
                    $synchtml = $uc->uc_user_synlogin($this->auth->id);
                }
                $this->success(__('Logged in successful') . $synchtml, $url ? $url : url('user/index'));
            } else {
                $this->error($this->auth->getError(), null, ['token' => $this->request->token()]);
            }
        }
        //判断来源
        $referer = $this->request->server('HTTP_REFERER');
        if (!$url && (strtolower(parse_url($referer, PHP_URL_HOST)) == strtolower($this->request->host()))
            && !preg_match("/(user\/login|user\/register)/i", $referer)) {
            $url = $referer;
        }
        $this->view->assign('url', $url);
        $this->view->assign('title', __('Login'));
        return $this->view->fetch();
    }

    /**
     * 会员中心
     */
    public function index()
    {
         //获取d'h'l导航栏
         $list =  Channel::where('status', 'normal')->select();
         $this->assign('list',$list);
        $this->view->assign('title', __('User center'));
        return $this->view->fetch();
    }

    /**
     * 会员中心
     */
    public function edit()
    {
        if ($this->request->isPost()) {
            // $content = $this->request->post("row[content]");
            // $token = $this->request->post('__token__');
            try {
                $params = $this->request->post();
                CommentModel::postComment($params);
            } catch (Exception $e) {
                $this->error($e->getMessage(), null, ['token' => $this->request->token()]);
            }
            $this->success(__('评论成功'), null, ['token' => $this->request->token()]);
         }    

        $this->view->assign('title', __('User center'));
        return $this->view->fetch();
    }
      /**
     * 会员中心
     */
     public function add()
     {
      //  $addonnews = M('addonnews');
        $content = $this->request->post("row[content]");
            // $token = $this->request->post('__token__');
        if ($this->request->isPost()) {
            try {
                $data2 = ['content' =>  $content];
                //$shopGoods =Db::name('cms_text')->insert($data2) ;

                $data = $User->save(array(
                    'username' => $content
                )); 
                $this->success('返回成功', ['shopgoods' =>$data ]);
 
            } catch (Exception $e) {
                $this->error($e->getMessage(), null, ['token' => $this->request->token()]);
            }
            $this->success(__('评论成功'), null, ['token' => $this->request->token()]);
        
        }
         $this->view->assign('title', __('User center'));
         return $this->view->fetch();
     }
}
