<template>
  <div class="wrapper  ">
    <ul class="head-tab">
      <li class=" flex-c" @click="fileClick" v-if="homeImageType">
        <i class="iconfont icon-baocun1"></i>
        <p>切换</p>
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
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'topNav',
    components: {},
    data() {
      return {
        title: '头部的nav',
        // homeImageType:this.$parent.homeImageType,
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

<style scoped>
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
