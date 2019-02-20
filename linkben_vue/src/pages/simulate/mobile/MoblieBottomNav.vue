<template>
    <div class="wrapper">
      <ul class="satellite " v-if="screenWidth<=688 && active>0">
        <li class="" v-if="active===1">
          <div class="tab-box">
            <article class="item" v-if="tabActive1==1">
              <ul class="scrollbar scrollY">
                <li class="col-lg-2">
                  <span class="flex-c flex-c-y">
                    <i class="iconfont icon-shouji-copy  h2" :style="{'font-size':'4rem'}"></i>
                  </span>
                </li>
                <li class="col-lg-2">
                  <span class="item-box flex-c flex-c-y">
                    <p>1:1</p>
                  </span>
                </li>
                <li class="col-lg-2">
                  <span class="item-box flex-c flex-c-y" :style="{'width':'21.33px'}">
                    <p>2:3</p>
                  </span>
                </li>
                <li class="col-lg-2">
                  <span class="item-box flex-c flex-c-y"  :style="{'height':'21.33px'}">
                    <p>3:2</p>
                  </span>
                </li>
                <li class="col-lg-2">
                  <span class="item-box flex-c flex-c-y"  :style="{'width':'24px'}">
                    <p>3:4</p>
                  </span>
                </li>
                <li class="col-lg-2">
                  <span class="item-box flex-c flex-c-y"  :style="{'height':'24px'}">
                    <p>4:3</p>
                  </span>
                </li>
                <li class="col-lg-2">
                  <span class="item-box flex-c flex-c-y"  :style="{'width':'18px'}">
                    <p>9:16</p>
                  </span>
                </li>
                <li class="col-lg-2">
                  <span class="item-box flex-c flex-c-y"  :style="{'height':'18px'}">
                    <p>16:9</p>
                  </span>
                </li>
              </ul>
  
              
              <div class="buuton-array row">
                <button class="left">重置</button>
                <button class="right">保存</button>
              </div>
            </article>
            <article class="item" v-if="tabActive1==2">
              <el-slider v-model="lightNum" :min="0" :max="360"></el-slider>
              <div class="flex-c center" :style="{'margin':'10px auto'}">
                <span class="flex-item">
                  <button>重置</button>
                </span>
                <span class="flex-item">
                  <i class="iconfont icon-shunshizhenxuanzhuan"></i>
                </span>
                <span class="flex-item">
                  <i class="iconfont icon-nishizhenxuanzhuan"></i>
                </span>
                <div class="flex-item">
                  <i class="iconfont  icon-suofang-copy" ></i>
                </div>
                <span class="flex-item">
                  <i class=" iconfont icon-suofang-copy-copy"></i>
                </span>
              </div>
            </article>
            <div class="tab-nav flex-c">
              <i class="iconfont icon-dacha center col-lg-2" @click="active=0"></i>
              <div class=" h4 col-lg-8 flex-c " :style="{'text-align':'center'}">
                <span class="flex-item" @click="tabActive1=1" :style="{'color':(tabActive1==1?'rgb(255, 219, 5)':'')}">截取</span>
                <span class="flex-item" @click="tabActive1=2" :style="{'color':(tabActive1==2?'rgb(255, 219, 5)':'')}">旋转</span>
              </div>
              <i class="iconfont icon-dagou center col-lg-2"></i>
            </div>
          </div>
  
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
    export default {
      name: 'monlieBottomNav',
      components: {},
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
        imgSatus: {}
      },
      created() {
      },
      methods: {
        formatAdd() {
          var that = this;
          that.$parent.imgSatus.scale = (that.addNum / 20);
        },
        //旋转的功能
        plusRotate() {
          var that = this;
          if (that.$parent.imgSatus.rotate >= 180) {
  
          }
          //  that.$parent.imgSatus.rotate =  that.$parent.imgSatus.rotate + 45;
          that.$parent.imgSatus.rotate = that.rotateNum;
          // that.rotateNum=that.$parent.imgSatus.rotate;
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
        font-size: 2.0rem;
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
  
  
      .satellite .tab-box li {
        padding: 0px 5px;
      }
      .satellite .tab-box .buuton-array {
        margin: 10px 0px;
      }
  
      .satellite .tab-box .item-box {
        width: 32px;
        height: 32px;
        border: 1px solid #9eabb3;
        border-radius: 4px;
      }
  
      .satellite article.item {
        min-height: 84px;
        height: auto;
      }
  
      .scrollY {
        overflow-y: hidden;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        display: -webkit-box;
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
  
  
  </style>
  