<template>
  <div class="cropperImg">
    <div class="tab-nav flex-c ">
      <i class="iconfont icon-dacha center" @click="back"></i>
      <h4 class="flex-item center">截取图片</h4>
      <i class="iconfont icon-dagou center " @click="toHome"></i>
    </div>
    <div class="content2">
      <img :src="url" id="itemImg">
    </div>
    <div class="bottom-nav flex-c ">
      <ul class=" scrollY">
        <li class="col-lg-2" v-for="(item,index) in dataList">
          <span v-if="index==0" class="flex-c flex-c-y" @click="selectSize(item.num,index)">
            <i class="iconfont icon-shouji-copy  h2" :style="{'color':(active==0?'#F44336':''),'font-size':'2.5rem'}"></i>
          </span>
          <span v-if="index!=0" :class="{active:index==active}" class="item-box flex-c flex-c-y" :style="{'width':item.width,'height':item.height}"
            @click="selectSize(item.num,index)">
            {{item.content}}
          </span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import Cropper from "cropperjs";
  export default {
    name: 'cropperImg',
    data() {
      return {
        title: '截取',
        url: "",
        //记住页面的初始化的状态的图片
        cropper: null,
        canvasData: null,
        cropBoxData: null,
        croppedData: null,
        active: 0,
        number: 1,
        restoreStatus: false,
        croppable: false,
        imageStatus: {
          width: "",
          height: "",
        },
        dataList: [{
            content: '',
            height: '',
            width: '',
            num: '',
          },
          {
            content: '1:1',
            height: '32px',
            width: '32px',
            num: 1,
          },
          {
            content: '2:3',
            height: '',
            width: '21.33px',
            num: 2 / 3,
          },
          {
            content: '3:2',
            height: '21.33px',
            width: '',
            num: 3 / 2,
          },
          {
            content: '3:4',
            height: '',
            width: '24px',
            num: 3 / 4,
          },
          {
            content: '4:3',
            height: '24px',
            width: '',
            num: 4 / 3,
          },
          {
            content: '9:16',
            height: '',
            width: '18px',
            num: 9 / 16,
          },
          {
            content: '16:9',
            height: '18px',
            width: '',
            num: 16 / 9,
          }
        ],
        //cropper第一次截图的状态
        cropperStatus: {
          restore: false,
          aspectRatio: 1,
          oldUrl: "",
          thisUrl: "", //当前的URL是
          newUrl: "",
        },
      }
    },
    created() {

    },
    mounted() {
      var that = this;
      that.start();
      var url2 = localStorage.getItem("cropperimgsrc");
      if (url2) {
        if (url2.indexOf('./') != -1) {
          url2 = url2.replace('./', '/');
        }
        that.url = url2;
        this.cropper.replace(this.url); //重新替换cropper
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      toHome() {
        this.$confirm('是否确认保存这次的截图', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.commit();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //选择截取的图片的大小
      selectSize(num, index) {
        const that = this;
        that.active = parseInt(index);
        that.cropperStatus.aspectRatio = parseFloat(num);
        if (that.cropperStatus.updateType) {
          var image = document.getElementById("itemImg"); //首页的图片的对象结构
          image.src = that.cropperStatus.oldUrl;
          var loadImage = new Image();
          loadImage.src = that.cropperStatus.oldUrl;
          loadImage.onload = function () {
            that.start();
          };

          return;
        }
        that.cropper.setAspectRatio(parseFloat(num)); //修改截取框的比例

      },
      //开始加载
      start() {
        //初始化这个裁剪框
        var that = this;
        var image = document.getElementById("itemImg");
        that.cropper = new Cropper(image, {
          aspectRatio: that.number, //设置截图的比例
          scalable: true,
          viewMode: 1,
          background: false,
          zoomable: true,
          autoCropArea: 1, //设置图片的截取框的占比，默认值为0.8
          restore: this.restoreStatus, //在调整窗口大小后恢复裁剪的区域
          ready: function (e) {
            that.croppable = true;
            if (that.croppedData) {
              that.cropper
                .crop()
                .setData(that.croppedData)
                .setCanvasData(that.canvasData)
                .setCropBoxData(that.cropBoxData);
              that.croppedData = null;
              that.canvasData = null;
              that.cropBoxData = null;
            }
          },
          crop: function (e) {

          },
          zoomOnTouch: true,
        });
      },
      //取消上传
      cancel() {
        this.panel = false;
        var obj = document.getElementById('change');
        obj.outerHTML = obj.outerHTML;
      },
      //创建url路径
      getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
          // basic
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      //input框change事件，获取到上传的文件
      change(e) {
        var that = this;
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        let type = files[0].type; //文件的类型，判断是否是图片
        let size = files[0].size; //文件的大小，判断图片的大小
        if (this.imgCropperData.accept.indexOf(type) == -1) {
          alert("请选择我们支持的图片格式！");
          return false;
        }
        if (size > 5242880) {
          alert("请选择5M以内的图片！");
          return false;
        }
        this.picValue = files[0];
        this.url = this.getObjectURL(this.picValue);

        if (that.url != '') {

          const imageUrl = new Image();
          imageUrl.src = this.url;
          imageUrl.onload = function (e) {
            that.imageStatus.width = imageUrl.width;
            that.imageStatus.height = imageUrl.height;
            //console.log("imageurl",that.imageStatus.width,that.imageStatus.height);
            let aspectRatio = parseFloat(that.imageStatus.width / that.imageStatus.height)
            that.cropper.setAspectRatio(aspectRatio); //修改截取框的比例
          };


        }
        //每次替换图片要重新得到新的url
        if (this.cropper) {
          this.cropper.replace(this.url); //重新替换cropper
        }


        this.panel = true;
      },
      //确定提交
      commit() {
        var that=this;
        this.panel = false;
        var croppedCanvas;
        var roundedCanvas;
        if (!that.croppable) return;
        croppedCanvas = this.cropper.getCroppedCanvas();
        // Round
        // roundedCanvas = this.getRoundedCanvas(croppedCanvas);
        roundedCanvas = croppedCanvas;
        this.headerImage = roundedCanvas.toDataURL();
        this.croppedData = this.cropper.getData();
        this.canvasData = this.cropper.getCanvasData();
        this.cropBoxData = this.cropper.getCropBoxData();
        that.cropperStatus.oldUrl = this.cropperStatus.thisUrl;
        debugger;
        this.cropperStatus.thisUrl = roundedCanvas.toDataURL();
        var image = document.getElementById("itemImg"); //首页的图片的对象结构
        image.src = this.cropperStatus.thisUrl;
        if (this.cropper) {
            
          sessionStorage.setItem("updateCropperImg",image.src)
          image.src=this.cropperStatus.thisUrl;
          this.cropper.destroy();
          this.cropper = null;
          that.cropperStatus.updateType = true;
          this.$message({
            message: '截取成功',
            type: 'success'
          });
          this.$store.commit('itemCropperType', true);
           this.$router.go(-1);
        }
     

      },
      //canvas画图
      getRoundedCanvas(sourceCanvas) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = "destination-in";
        context.beginPath();
        context.arc(
          width / 2,
          height / 2,
          Math.min(width, height) / 2,
          0,
          2 * Math.PI,
          true
        );
        context.fill();

        return canvas;
      },
      //重新选择
      restore(num) {
        // 对象数据的替换
        var that = this;
        that.panel = true;
        that.number = num;
        that.cropper.setAspectRatio(num); //修改截取框的比例
        //  that.cropper.reset();
        //  that.cropper.canvasData.aspectRatio=num
        //  that.cropper.replace(that.url);
        //     that.start();
        // var data={
        //   panel:true
        // }
        // Object.assign(this.data, data);

      },

    },
    watch: {},

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


  .restore {
    height: 50px;
    margin-top: 20px;
    background-color: blueviolet;
  }
</style>
<style scoped lang="less">
  .cropperImg {
    background: rgba(0, 0, 0, 1);
    height: 100vh;
    width: 100%;

    padding-top: 50px;
    padding-bottom: 60px;
  }

  .content2 {
    height: 100%;
    margin: 0 auto;
    width: 90vw;
  }

  #itemImg {}

  .tab-nav i {
    font-size: 2rem;
  }

  .tab-nav {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 50px;
    margin: 0px;
    padding: 0px 20px;
  }

  .bottom-nav {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 60px;
    margin: 0px;
    background-color: white;
  }

  .scrollY {
    overflow-y: hidden;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    display: -webkit-box;
    vertical-align: middle;
    /* margin: 5px 0px; */
  }

  .item-box {
    width: 32px;
    height: 32px;
    border: 1px solid #333;
    color: #333;
    border-radius: 4px;
  }

  .scrollY li {
    float: none;
    height: 38px;
    line-height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .active {
    color: #F44336;
    border: 1px solid #F44336;
  }
</style>