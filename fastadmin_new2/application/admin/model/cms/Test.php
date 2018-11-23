<?php

namespace app\admin\model\cms;

use think\Model;

class Test extends Model
{
    // 表名
    protected $name = 'cms_test';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    
    // 追加属性
    protected $append = [
        'area_text'
    ];
    

    
    public function getAreaList()
    {
        return ['domestic' => __('Domestic'),'overseas' => __('Overseas'),'local' => __('Local')];
    }     


    public function getAreaTextAttr($value, $data)
    {        
        $value = $value ? $value : (isset($data['area']) ? $data['area'] : '');
        $list = $this->getAreaList();
        return isset($list[$value]) ? $list[$value] : '';
    }




}
