<?php

namespace app\common\model;

use app\common\model\Config;
use think\Model;

class Addonnews extends Model
{
    // 表名
    protected $name = 'cms_addonnews';
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = 'deletetime';
    // 追加属性
    protected $append = [
        'flag_text',
        'status_text',
        'publishtime_text',
        'url',
    ];

    /**
     * 添加数据
     * @param    array    $data    数据 
     * @return   integer           新增数据的id 
     */
     public function addData($data){
        $id=$this->add($data);
        return $id;
    }
     
    /**
     * 修改数据
     * @param    array    $map    where语句数组形式 
     * @param    array    $data   修改的数据 
     * @return    boolean         操作是否成功
     */
    public function editData($map,$data){
        $result=$this->where($map)->save($data);
        return $result;
    }
     
    /**
     * 删除数据
     * @param    array    $map    where语句数组形式
     * @return   boolean          操作是否成功
     */
    public function deleteData($map){
        $result=$this->where($map)->delete();
        return $result;
    }
 

}
