<template>
  <div class="topNav" :style="{'z-index':( (dialogTableVisible===true||html2canvasType==true)
  ?'inherit':'11')}">
    <ul class="head-tab">
      <li class=" flex-c" @click="dialogTableVisible = true" v-if="homeImageType">
        <i class="iconfont icon-buoumaotubiao47"></i>
        <h5>背景</h5>
      </li>
      <li class="flex-c" v-if="screenWidth>=688" @click="">
        <i class="iconfont icon-lishijilu-copy"></i>
        <h5>历史记录</h5>
      </li>
      <li class="flex-c" @click="">
        <i class="iconfont icon-qingchu1"></i>
        <h5>清除</h5>
      </li>
      <li class="flex-c " @click="">
        <el-dropdown>
          <span class="el-dropdown-link flex-c">
            <i class="iconfont icon-wenhao_huabanfuben "></i>
            <h5 class="">帮助</h5>

            <i class="el-icon-arrow-down el-icon--right "></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>在线客服</el-dropdown-item>
            <el-dropdown-item>文档</el-dropdown-item>
            <el-dropdown-item class="flex-c">
              <i class="iconfont icon-fenxiang2"></i>
              <h5>分享</h5>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>

      <li class="flex-c" @click="downView(false)">

        <i class="iconfont icon-fenxiang2"></i>
        <h5>保存</h5>
      
      </li>

      <li class="flex-c " @click="fullScreen" v-if="screenWidth>=688">
        <i class="iconfont icon-quanping1"></i>
        <h5>全屏</h5>
      </li>
    </ul>
    <el-dialog title="" width="80%" :visible.sync="dialogTableVisible">
      <colorPicker></colorPicker>
    </el-dialog>
    <el-dialog title="" :visible.sync="html2canvasType" width="80%" >
      <h4 class="margin-10">是否要下载这张图片</h4>
      <div class="content">
        <div class="canvasImg img-r">
          <img :src="endImg">
        </div>
      </div>
      <div class="button-array flex-r margin-15">
        <button class=""  @click="html2canvasType=false">取消</button>
        <!-- <button class=""   @click="downView(true)">点击下载 </button> -->
        <a class="down button" id="down3"  href="" download="下载">点击下载</a>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  import colorPicker from './ColorPicker'
  import html2canvas from 'html2canvas'
  export default {
    name: 'topNav',
    components: {
      colorPicker
    },
    data() {
      return {
        title: '头部的nav',
        dialogTableVisible: false,
        selectColor: '#409EFF',
        screenWidth: document.documentElement.clientWidth,
        html2canvasType: false,
        endImg: "",
      }
    },
    props: {
      homeImageType: Boolean
    },
    methods: {
      goLogin(index) {
        this.$router.push(index);
      },
      goRegister(index) {
        this.$router.push(index);
      },
      fileClick() {
        document.getElementById('upload_file2').click()
      },
      //下载功能
      downView(type) {
        debugger;
        const that=this;
        var dom = document.querySelector('#main-view');
        if (this.$parent.mainBgStatus.type) dom = document.querySelector('#main-view');
        // var canvas2 = document.createElement("canvas");
        // var w = parseInt(window.getComputedStyle(dom).width);
        // var h = parseInt(window.getComputedStyle(dom).height);
        // canvas2.width = w * 2;
        // canvas2.height = h * 2;
        // canvas2.style.width = w + "px";
        // canvas2.style.height = h + "px";
       // dom=$("#main-view")
        html2canvas(dom, {
          allowTanit: true,
          tainTest: true,
          // height: dom.height(),
          // width:dom.width(),
          useCORS: true,
          foreignObjectRendering: true//设置因为浮动，或者定位不能截取完全的图片
        //  / canvas:canvas2
        }).then(function (canvas) {
          //document.body.appendChild(canvas);
          //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
          if(type){
            document.querySelector('#down3').setAttribute('href', canvas.toDataURL())
            that.html2canvasType=false;
          }else{
          
      
              let dataURL = canvas.toDataURL("image/jpeg");
              that.endImg = dataURL;
          //    document.querySelector('#down3').setAttribute('href', canvas.toDataURL())
              that.html2canvasType=true;
              setTimeout(function(){
                  document.querySelector('#down3').setAttribute('href', canvas.toDataURL())
              },100)
         
       
            // 
          }
        
        });
      },
      //全屏
      fullScreen() {
        var that = this;
        debugger;
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
          if (document.requestFullscreen == undefined) {
            document.exitFullscreen();
          }
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
          if (docElm.mozRequestFullScreen() == undefined) {
            document.mozCancelFullScreen();
          }
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
          if (docElm.webkitRequestFullScreen() == undefined) {
            document.webkitCancelFullScreen();
          }
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
          if (docElm.msRequestFullscreen() == undefined) {
            document.msExitFullscreen();
          }
        }
        if (that.fullScreen != false) {
          return true;
        } else {
          return false;
        }

      }
    },
    mounted() {},
    computed: {

    },
    created() {}
  }
</script>
<style>
  .topNav .el-dialog__wrapper {}

  .topNav .el-dialog--small {
    width: 75%;
  }

  .topNav .el-dialog__header {
    display: flex;
    align-items: center;
    padding: 0px;
  }

  .topNav .el-dialog__header .el-dialog__title {
    flex: 1;
  }

  .topNav .el-dialog__body {
    padding: 10px 15px;
    padding-top: 0px;
  }

  .topNav .el-dialog__headerbtn .el-dialog__close {
    padding: 1rem;
  }

  .topNav .el-dialog__headerbtn {
    position: absolute;
    right: 0px;
    top: 0px;
    width: auto;
    min-width: inherit;
  }
</style>
<style scoped lang="less">
  .topNav {
    i {
      color: #dadada;
    }

    h5 {
      line-height: inherit;
      color: #dadada;
    }
    .img-r img{
      width: 100%;
      height: auto;
    }
    .head-tab {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      margin: 0 auto;
      background: #202026;
      background: #505056;
      background: rgba(255, 255, 255, 0.3);
      background: linear-gradient(to left, rgb(42, 42, 42), rgb(60, 60, 60));
      padding: 0px 10px;
      box-sizing: border-box;
      border-radius: 20px;
      z-index: 11;
    }

    .head-tab li {
      color: #dadada;
      cursor: pointer;
      padding: 0px;
      display: inline;
      margin: 0px 10px;
      float: left;
    }

    .head-tab li i {
      margin-right: 5px;
    }

    @media (max-width:768px) {
      .head-tab li {
        margin: 0px 2px;
        padding: 0 10px;
      }

    }
  }
</style>
