<template>
    <div class="moblie-bottom-nav">
      <ul class="satellite " v-if="screenWidth<=688 && active>0">
        <li class="" v-if="active===1"  >
            <cutOutRotate  v-on:cutOutRotateEmit="cutOutRotateEmit"></cutOutRotate>
        </li>
        <li class="" v-else-if="active===2">
          <el-slider v-model="value2"></el-slider>
        </li>
        <li class="" v-else-if="active===3">
  
        </li>
        <li class="" v-else="active===4">
  
        </li>
      </ul>
      <ul class="bottom-tab " v-if="screenWidth<=688 && active===0" v-show="active===0">
        <li class="col-lg-3">
          <i class="iconfont icon-winfo-icon-jietu" title="截取旋转" @click="active=1"></i>
        </li>
        <li class="col-lg-3">
          <i class="iconfont icon-hesuankemuleixing" title="调节" @click="active=2"></i>
        </li>
        <li class=" col-lg-3">
          <i class="iconfont icon-wenzi" title="文字" @click="active=3"></i>
        </li>
        <li class="col-lg-3" v-if="screenWidth<=688">
          <i class="iconfont icon-zhaopian" title="选择图片" @click="active=4"></i>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
    import bus from '../../../assets/bus';
    import cutOutRotate from "./CutOutRotate.vue"
    export default {
      name: 'monlieBottomNav',
      components: {cutOutRotate},
      data() {
        return {
          title: '移动端的底部的nav',
          screenWidth: document.documentElement.clientWidth,
          active: 0,
          lightNum: 0,
          addNum: 50,
          rotateNum: 0,
          value2: 0,
          tabActive1: 1,
        }
      },
      props: {
        imgStyleStatus: {}
      },
      created() {
      },
      methods: {
        formatAdd() {
          var that = this;
          that.$parent.imgStyleStatus.scale = (that.addNum / 20);
        },
        //旋转的功能
        plusRotate() {
          var that = this;
          if (that.$parent.imgStyleStatus.rotate >= 180) {
  
          }
          //  that.$parent.imgStyleStatus.rotate =  that.$parent.imgStyleStatus.rotate + 45;
          that.$parent.imgStyleStatus.rotate = that.rotateNum;
          // that.rotateNum=that.$parent.imgStyleStatus.rotate;
        },
        //接受第一个插件的传值
        cutOutRotateEmit(cutOutRotateEmit){
           this.active=cutOutRotateEmit;
        },
      },
      mounted() {
  
      },
      computed: {
  
      },
  
    }
  </script>
  <style>
    .satellite .el-slider__button {
      width: 20px;
      height: 20px;
      border: 0.6rem solid #ffdb05;
      background-color: white;
      background-color: white;
    }
  </style>
  
  <style scoped lang="less">

  .moblie-bottom-nav{
      .el-slider {
        width: 120px;
        margin: 0px 10px;
      }
  
      .satellite .el-slider {
        width: 95%;
      }
  
      .button {
        width: 34px;
        height: 34px;
        margin: 0px 5px;
        font-size: 30px;
        line-height: 34px;
        color: #dadada;
        border: aliceblue;
      }
  
      .bottom-tab {
        position: relative;
        overflow: hidden;
        width: 100%;
      }
  
  
      .bottom-tab li i {
        margin-right: 5px;
        font-size: 1.34rem;
        font-weight: 600;
      }
  
      .bottom-tab li {
        /* border-right: 2px solid #b8b8b8; */
        color: #202026;
        cursor: pointer;
        box-sizing: border-box;
        line-height: 34px;
        height: 34px;
        text-align: center;
        margin: 0px 10px;
      }

      @media (max-width:768px) {
        .bottom-tab {
          overflow-y: hidden;
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          display: -webkit-box;
        }
        .bottom-tab li {
          margin: 0px 0px;
        }
      }
  }
  
  </style>
  