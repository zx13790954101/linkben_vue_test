<template>
  <div class="moblieCropperImg">
    <ul class=" scrollY" >
        <li class="col-lg-2"   v-for="(item,index) in dataList"  >
            <span v-if="index==0" class="flex-c flex-c-y"  @click="selectSize(item.num,index)" >
                <i class="iconfont icon-shouji-copy  h2" :style="{'color':(active==0?'#F44336':''),'font-size':'4rem'}"></i>
            </span>
            <span v-if="index!=0" :class="{active:index==active}" class="item-box flex-c flex-c-y" 
            :style="{'width':item.width,'height':item.height}"
              @click="selectSize(item.num,index)" >
                  {{item.content}}
            </span>
          </li>
      </ul>
      <div class="buuton-array row">
        <button class="left">重置</button>
        <button class="right">保存</button>
      </div>
  </div>
</template>
<script>
  import Cropper from 'cropperjs';
  export default {
    name: 'moblieCropperImg',
    data() {
      return {
        title: 'cropper的移动端的截图',
        active:null,
        dataList:[
            { 
              content:'',  height:'', width:'', num:'', 
            },
            {
              content:'1:1',height:'32px',width:'32px', num:1,
            },
            { content:'2:3', height:'', width:'21.33px',  num:2/3,
            },
            { content:'3:2', height:'21.33px', width:'', num:3/2,
            },
            {
              content:'3:4',height:'', width:'24px',num:3/4,
            },
            {
              content:'4:3', height:'24px', width:'', num:4/3,
            },
            {
              content:'9:16',height:'', width:'18px', num:9/16,
            },
            {
              content:'16:9', height:'18px',width:'', num:16/9,
            }
        ],
        //cropper第一次截图的状态
        cropperDefaultStatus:{
          croppedData:"",
          canvasData:"",
          cropBoxData:"",
        },
        croppable: false,
      }
    },
    props: {},
    components: { Cropper },
    created() { },
    mounted() {

    },
    methods: {
      //选择截取的图片的大小
      selectSize(num,num2) {
        const that=this;
        that.active=parseInt(num2);
        
        //初始化这个
        that.initCropper(num)
      },
      //初始化截图工具
      initCropper(num){
        debugger;
        let number=1;
        if(num) number=num;
        const that=this;
        var image = document.getElementById("main-img");//首页的图片的对象结构
        that.cropper=new Cropper(image,{
          aspectRatio: number,  //设置截图的比例
          scalable:true,
          viewMode: 1,
          background: false,
          zoomable: true,
          ready: function() {
            self.croppable = true;
            if (this.croppedData) {
                  //获取原来的截图的位置
                  this.cropper
                    .crop()
                    .setData(this.cropperDefaultStatus.croppedData)
                    .setCanvasData(this.cropperDefaultStatus.canvasData)
                    .setCropBoxData(this.cropperDefaultStatus.cropBoxData);
                  this.cropperDefaultStatus.croppedData = null;
                  this.cropperDefaultStatus.canvasData = null;
                  this.cropperDefaultStatus.cropBoxData = null;
            }
          },
          zoomOnTouch:true, 
        })
      },
    },

    computed: {

    },

  }
</script>

<style>
  .cropper-view-box,
  /* 设置头像为圆 */
  /* .cropper-face {
    border-radius: 50%;
  } */
  
  
  /*! 
   * Cropper.js v1.0.0-rc 
   * https://github.com/fengyuanchen/cropperjs 
   * 
   * Copyright (c) 2017 Fengyuan Chen 
   * Released under the MIT license 
   * 
   * Date: 2017-03-25T12:02:21.062Z 
   */
  
  .cropper-container {
    font-size: 0;
    line-height: 0;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    direction: ltr;
    -ms-touch-action: none;
    touch-action: none;
  }
  .cropper-container img {
    display: block;
    min-width: 0 !important;
    max-width: none !important;
    min-height: 0 !important;
    max-height: none !important;
    width: 100%;
    height: 100%;
    image-orientation: 0deg;
  }
  .cropper-wrap-box,
  .cropper-canvas,
  .cropper-drag-box,
  .cropper-crop-box,
  .cropper-modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .cropper-wrap-box {
    overflow: hidden;
  }
  .cropper-drag-box {
    opacity: 0;
    background-color: #fff;
  }
  .cropper-modal {
    opacity: 0.5;
    background-color: #000;
  }
  .cropper-view-box {
    display: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
    outline: 1px solid #39f;
    outline-color: rgba(51, 153, 255, 0.75);
  }
  .cropper-dashed {
    position: absolute;
    display: block;
    opacity: 0.5;
    border: 0 dashed #eee;
  }
  .cropper-dashed.dashed-h {
    top: 33.33333%;
    left: 0;
    width: 100%;
    height: 33.33333%;
    border-top-width: 1px;
    border-bottom-width: 1px;
  }
  .cropper-dashed.dashed-v {
    top: 0;
    left: 33.33333%;
    width: 33.33333%;
    height: 100%;
    border-right-width: 1px;
    border-left-width: 1px;
  }
  .cropper-center {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0;
    height: 0;
    opacity: 0.75;
  }
  .cropper-center:before,
  .cropper-center:after {
    position: absolute;
    display: block;
    content: " ";
    background-color: #eee;
  }
  .cropper-center:before {
    top: 0;
    left: -3px;
    width: 7px;
    height: 1px;
  }
  .cropper-center:after {
    top: -3px;
    left: 0;
    width: 1px;
    height: 7px;
  }
  .cropper-face,
  .cropper-line,
  .cropper-point {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0.1;
  }
  .cropper-face {
    top: 0;
    left: 0;
    background-color: #fff;
  }
  .cropper-line {
    background-color: #39f;
  }
  .cropper-line.line-e {
    top: 0;
    right: -3px;
    width: 5px;
    cursor: e-resize;
  }
  .cropper-line.line-n {
    top: -3px;
    left: 0;
    height: 5px;
    cursor: n-resize;
  }
  .cropper-line.line-w {
    top: 0;
    left: -3px;
    width: 5px;
    cursor: w-resize;
  }
  .cropper-line.line-s {
    bottom: -3px;
    left: 0;
    height: 5px;
    cursor: s-resize;
  }
  .cropper-point {
    width: 5px;
    height: 5px;
    opacity: 0.75;
    background-color: #39f;
  }
  .cropper-point.point-e {
    top: 50%;
    right: -3px;
    margin-top: -3px;
    cursor: e-resize;
  }
  .cropper-point.point-n {
    top: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: n-resize;
  }
  .cropper-point.point-w {
    top: 50%;
    left: -3px;
    margin-top: -3px;
    cursor: w-resize;
  }
  .cropper-point.point-s {
    bottom: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: s-resize;
  }
  .cropper-point.point-ne {
    top: -3px;
    right: -3px;
    cursor: ne-resize;
  }
  .cropper-point.point-nw {
    top: -3px;
    left: -3px;
    cursor: nw-resize;
  }
  .cropper-point.point-sw {
    bottom: -3px;
    left: -3px;
    cursor: sw-resize;
  }
  .cropper-point.point-se {
    right: -3px;
    bottom: -3px;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    opacity: 1;
  }
  @media (min-width: 768px) {
    .cropper-point.point-se {
      width: 15px;
      height: 15px;
    }
  }
  @media (min-width: 992px) {
    .cropper-point.point-se {
      width: 10px;
      height: 10px;
    }
  }
  @media (min-width: 1200px) {
    .cropper-point.point-se {
      width: 5px;
      height: 5px;
      opacity: 0.75;
    }
  }
  .cropper-point.point-se:before {
    position: absolute;
    right: -50%;
    bottom: -50%;
    display: block;
    width: 200%;
    height: 200%;
    content: " ";
    opacity: 0;
    background-color: #39f;
  }
  .cropper-invisible {
    opacity: 0;
  }
  .cropper-bg {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
  }
  .cropper-hide {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
  }
  .cropper-hidden {
    display: none !important;
  }
  .cropper-move {
    cursor: move;
  }
  .cropper-crop {
    cursor: crosshair;
  }
  .cropper-disabled .cropper-drag-box,
  .cropper-disabled .cropper-face,
  .cropper-disabled .cropper-line,
  .cropper-disabled .cropper-point {
    cursor: not-allowed;
  }
</style>
<style scoped lang="less">
  .moblieCropperImg{
    .buuton-array { margin: 10px 0px; }
    li {padding: 0px 5px; }
    .item-box {
      width: 32px;
      height: 32px;
      border: 1px solid #9eabb3;
      border-radius: 4px;
    }

    .scrollY {
      overflow-y: hidden;
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      display: -webkit-box;
      vertical-align: middle;
    }
    .scrollY li{
        float: none;
        height: 38px;
        line-height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .active{
      color:#F44336;
      border: 1px solid #F44336;
    }
  }
</style>
