<?php

namespace app\api\controller;

use app\common\controller\Api;
use app\common\model\Addonnews as AddonnewsModel;
use think\Db;
use think\Validate;

/**
 * 示例接口
 */
class Shop extends Api
{ 

    //如果$noNeedLogin为空表示所有接口都需要登录才能请求
    //如果$noNeedRight为空表示所有接口都需要验证权限才能请求
    //如果接口已经设置无需登录,那也就无需鉴权了
    //
    // 无需登录的接口,*表示全部
 //   protected $noNeedLogin = ['test1'];
    // 无需鉴权的接口,*表示全部
 //   protected $noNeedRight = ['test2'];

    protected $noNeedLogin = ['login', 'mobilelogin', 'register', 'resetpwd', 'changeemail', 'changemobile', 'third'];
    protected $noNeedRight = '*';
        /**
     * 获取全部的商品的列表
     */
     public function add()
     {

         if($this->auth->nickname!=null){
             $content2 = $this->request->post("row[content]");
            //需要引用
             $data2 = ['content' =>  $content2];
             $shopGoods =Db::name('cms_text')->insert($data2) ;
            // 和用法 $User = new \Think\Model('User'); 等效
            // 执行其他的数据操作
            $this->success('返回成功', ['shopgoods' =>$shopGoods ]);
         }else{
            $this->success('返回成功', ['shopgoods' => $this->auth->nickname ]);
         }
        
     }
          /**
     * 获取全部的商品的列表
     */
    public function edit()
    {

        if($this->auth->nickname!=null){
           $content = $this->request->post("row[content]");
           $token = $this->request->post('__token__');

           $user = ['content'=> $content];
           $shopGoods=Db::name('cms_addonnews')->insert($user);
           $this->success('返回成功', ['shopgoods' => $shopGoods ]);
        }else{
           $this->success('返回成功', ['shopgoods' => $this->auth->nickname ]);
        }
       
    }
    /**
     * 无需登录的接口
     * 
     */
    public function test1()
    {
        $this->success('返回成功', ['action' => '我是林泽森']);
    }

    /**
     * 需要登录的接口
     * 
     */
    public function test2()
    {
        $this->success('返回成功', ['action' => 'test2']);
    }

    /**
     * 需要登录且需要验证有相应组的权限
     * 
     */
    public function test3()
    {
        $this->success('返回成功', ['action' => 'test3']);
    }

}