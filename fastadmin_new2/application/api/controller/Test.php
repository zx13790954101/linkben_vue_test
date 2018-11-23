<?php

namespace app\api\controller;

use app\common\controller\Api;
use app\admin\model\User;
use app\admin\model\Test as TestModel;
use think\Db;

class Test extends Api {

    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    public function _initialize()
    {
        parent::_initialize();
    }
    /**
     * 首页
     * 
     */
    public function index() {

    }

    /**
     *
     */
    public function add() {
        // $id = $this->request->param('id', 0);

        // if ($id == 0) {
        //     $this->error('错误的ID');
        // }
        //$this->request->filter(['strip_tags']);
        //$content = $this->request->post('content');//自动删除特殊字符的接受返回值
        $content=$_POST['content'];
        if(!empty($content)){
            $this->error('请输入内容');
        }

        $data = [];
        $data['content'] = $content;
        $code = 200;
        try {
            Db::startTrans();

            if (!empty($data)) {

              //  $data['msg'] = '提交成功';
                $carM = new \app\admin\model\Test();
                $carM->data($data);
                $carM->save();
            }
            Db::commit();
            $this->success('提交成功', '', $code);
        } catch (Exception $ex) {
            Db::rollback();
            $this->error('网络错误,请稍后重试');
        }
    }

}
