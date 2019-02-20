<template>
  <div class="topNav"  :style="{'z-index':(dialogTableVisible===true?'inherit':'11')}">
    <ul class="head-tab">
      <li class=" flex-c" @click="dialogTableVisible = true"  v-if="homeImageType">
        <i class="iconfont icon-baocun1"></i>
        <p>背景</p>
      </li>
      <li class="flex-c" @click="">
        <i class="iconfont icon-lishijilu-copy"></i>
        <p>历史记录</p>
      </li>
      <li class="flex-c" @click="">
        <i class="iconfont icon-qingchu1"></i>
        <p>清除</p>
      </li>
      <li class="flex-c" @click="">
        <i class="iconfont icon-wenhao_huabanfuben"></i>
        <p>文档</p>
      </li>
      <li class="flex-c" @click="">
        <i class="iconfont icon-fenxiang2"></i>
        <p>分享</p>
      </li>
      <li class="flex-c col-xs-0" @click="fullScreen">
        <i class="iconfont icon-quanping1"></i>
        <p>全屏</p>
      </li>
    </ul>
    <el-dialog title="" width="80%" :visible.sync="dialogTableVisible">
        <colorPicker></colorPicker>
    </el-dialog>
  </div>

</template>

<script>
  import axios from 'axios'
  import colorPicker from './ColorPicker'
  export default {
    name: 'topNav',
    components: {colorPicker},
    data() {
      return {
        title: '头部的nav',
        dialogTableVisible: false,
        selectColor: '#409EFF',
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
      //全屏
      fullScreen() {
        var that=this;
        debugger;
        var docElm = document.documentElement; 
        if (docElm.requestFullscreen) {  
            docElm.requestFullscreen();  
            if(  document.requestFullscreen==undefined ){
              document.exitFullscreen(); 
            }
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();  
            if(  docElm.mozRequestFullScreen()==undefined){
              document.mozCancelFullScreen(); 
            }
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();  
            if(  docElm.webkitRequestFullScreen()==undefined){
              document.webkitCancelFullScreen(); 
            }
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
            if(  docElm.msRequestFullscreen()==undefined){
              document.msExitFullscreen(); 
            }
        }
        if(that.fullScreen !=false){
          return true;
        }else{
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
.topNav .el-dialog__wrapper{

}
 .topNav .el-dialog--small {
    width: 75%;
  }
.topNav .el-dialog__header{
  display: flex;
  align-items: center;
  padding: 0px;
}
.topNav .el-dialog__header .el-dialog__title{
   flex: 1;
}
 .topNav .el-dialog__body{
      padding: 10px 15px;
      padding-top: 0px;
    }
    .topNav    .el-dialog__headerbtn .el-dialog__close{
      padding: 1rem;
    }
    .topNav .el-dialog__headerbtn{
      position: absolute;
    right: 0px;
    top: 0px;
    width: auto;
    min-width: inherit;
    }
</style>
<style scoped>
  .topNav{

  }
  .head-tab {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    background: #202026;
    background: #505056;
    background: rgba(255, 255, 255, 0.3);
    background: linear-gradient(to left,rgb(42,42,42), rgb(60,60,60));
    padding: 0px 5%;
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
      margin: 0 5px;
    }

  }
</style>
