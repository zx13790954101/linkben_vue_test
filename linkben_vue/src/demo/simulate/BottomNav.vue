<template>
  <div class="bottom-nav">
    <ul class="satellite " v-if="screenWidth>=688">
      <li class="" v-if="active===1">
        <el-slider v-model="lightNum" :min="0" :max="360"></el-slider>
      </li>
      <li class="" v-else-if="active===2">
        <el-slider v-model="value2"></el-slider>
      </li>
      <li class="" v-else-if="active===3">
        <el-slider v-model="rotateNum" :format-tooltip="plusRotate" :step="45" :min="-180" :max="180"></el-slider>
      </li>
      <li class="" v-else="active===4">
        <el-slider v-model="addNum" :format-tooltip="formatAdd" :min="0" :max="100"></el-slider>
      </li>
    </ul>
    <ul class="bottom-tab flex-c" v-if="screenWidth>=688">
      <li class=" flex-item " @click="active=1" :style="{'color':(active==1?'rgb(255, 219, 5)':'')}">
        <i class="iconfont icon-dengpao"></i>
      </li>
      <li class=" flex-item " @click="active=2" :style="{'color':(active==2?'rgb(255, 219, 5)':'')}">
        <i class="iconfont icon-jingxiang" @click="plusMinus2('mirror')"></i>
      </li>
      <li class=" flex-item " @click="active=3" :style="{'color':(active==3?'rgb(255, 219, 5)':'')}">
        <i class="iconfont icon-youxuanzhuan"></i>
      </li>
      <li class=" flex-item   flex-c flex-c-y add-minus " @click="active=4" :style="{'background-color':(active==4?'rgb(255, 219, 5)':''),'color':(active==4?'white':'')}">
        <i class="iconfont icon-jia1" @click="plusminus($event,1)" id="big"></i>
        <i class="iconfont icon-jian" @click="plusminus($event,2)" id="small"></i>
      </li>
    </ul>

    <ul class="satellite " v-if="active>0">
      <li class="" v-if="active===1">
        <div class="tab-box">
          <article class="item" v-if="tabActive1==1">
            <ul class=" scrollY">
              <li class="col-lg-2">
                <span class="flex-c flex-c-y">
                  <i class="iconfont icon-shouji-copy  h2" :style="{'font-size':'4rem'}"></i>
                </span>
              </li>
              <li class="col-lg-2">
                <span class="item-box flex-c flex-c-y">
                  <h6>1:1</h6>
                </span>
              </li>
              <li class="col-lg-2">
                <span class="item-box flex-c flex-c-y" :style="{'width':'21.33px'}">
                  <h6>2:3</h6>
                </span>
              </li>
              <li class="col-lg-2">
                <span class="item-box flex-c flex-c-y"  :style="{'height':'21.33px'}">
                  <h6>3:2</h6>
                </span>
              </li>
              <li class="col-lg-2">
                <span class="item-box flex-c flex-c-y"  :style="{'width':'24px'}">
                  <h6>3:4</h6>
                </span>
              </li>
              <li class="col-lg-2">
                <span class="item-box flex-c flex-c-y"  :style="{'height':'24px'}">
                  <h6>4:3</h6>
                </span>
              </li>
              <li class="col-lg-2">
                <span class="item-box flex-c flex-c-y"  :style="{'width':'18px'}">
                  <h6>9:16</h6>
                </span>
              </li>
              <li class="col-lg-2">
                <span class="item-box flex-c flex-c-y"  :style="{'height':'18px'}">
                  <h6>16:9</h6>
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

                <i class="iconfont icon-jingxiang" :style="{'transform':'rotate(90deg)','display':'inline-block'}"></i>
              </div>
              <span class="flex-item">
                <i class="iconfont icon-jingxiang"></i>
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
    <ul class="bottom-tab " v-if="screenWidth<=688||active===0" v-show="active===0">
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
  import bus from '../../assets/bus';

  export default {
    name: 'bottomNav',
    components: {},
    data() {
      return {
        title: '底部的nav',
        screenWidth: document.documentElement.clientWidth,
        timer: "",
        active: 0,
        lightNum: 0,
        addNum: 50,
        rotateNum: 0,
        value2: 0,
        tabActive1: 0,
      }
    },
    props: {
      imgSatus: {}
    },
    created() {
     console.log(this.screenWidth);
    },
    methods: {
      showDeleteButton(e) {
        clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
        this.Loop = setTimeout(function () {
          console.log("da", 1)
        }.bind(this), 1000);
      },
      clearLoop(e) {
        clearTimeout(this.Loop);
      },
      setTime(data, type) {
        var that = this;
        if (data == 1) {
          that.$parent.imgSatus.scale = that.$parent.imgSatus.scale + 0.01
        } else if (data == 2) {
          that.$parent.imgSatus.scale = that.$parent.imgSatus.scale - 0.01
        }
        if (type == true) {
          this.setTime();
        } else {
          return;
        }
      },
      plusminus: function ($event, data) {
        var that = this;
        var event = $event.currentTarget
        var hammer = new Hammer($event.currentTarget);
        hammer.on("tap  press pressup", function (ev) {
          if (ev.type == "press") {
            // that.timer = setInterval(function () {
            //   ev.preventDefault();
            //   if (data == 1) {
            //       if(that.$parent.imgSatus.scale==2.5){
            //           that.$message({
            //             message: '已经是最大了',
            //             type: 'error'
            //           })
            //           clearInterval( that.timer);
            //           return;
            //       }
            //       that.$parent.imgSatus.scale= that.$parent.imgSatus.scale + 0.01
            //     } else if(data==2){
            //       if(that.$parent.imgSatus.scale==0.5){
            //           that.$message({
            //             message: '已经是最小了',
            //             type: 'error'
            //           })
            //           clearInterval( that.timer);
            //           return;
            //       }
            //       that.$parent.imgSatus.scale= that.$parent.imgSatus.scale - 0.01
            //    }
            // }, 50);
          } else if (ev.type == "pressup") {
            clearInterval(that.timer);
          } else if (ev.type == "tap") {
            clearInterval(that.timer);
            if (data == 1) {
              that.$parent.imgSatus.scale = that.$parent.imgSatus.scale + 0.01
            } else if (data == 2) {
              that.$parent.imgSatus.scale = that.$parent.imgSatus.scale - 0.01
            }
          }

        });

      },
      plusMinus2: function (name) {
        var that = this;
        switch (name) {
          case 'rotate':
            that.plusRotate();
            break;
          case 'mirror':
            that.$parent.imgSatus.scalex = -that.$parent.imgSatus.scalex
            break;
        }

      },
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
      viewerInit() {
        if ($(".viewer-container").html()) {
          //删除功能
          viewer.destroy();
          $(".viewer-container").remove();
        }
        viewer = new Viewer(document.getElementById('mainImg'), {
          inline: true,
          navbar: false,
          viewed() {
            viewer.zoomTo(0.9);
          },
          show: function () {
            viewer.update();
          },
          url: 'data-original',
          toolbar: {
            flipHorizontal: 1,
            flipVertical: 1,
            oneToOne: 0,
            reset: 1,
            prev: 0,
            play: 0,
            next: 0,
            rotateLeft: 1,
            rotateRight: 1,
            zoomIn: 1,
            zoomOut: 1,
          },
        })
      }
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
  }
</style>

<style scoped lang="less">
  .bottom-nav {
    position: absolute;
    left: 50%;
    z-index: 999;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: white;
    bottom: 0px;


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
    }

    .bottom-tab .add-minus {
      border-radius: 20px;
      height: 34px;
      line-height: 34px;
      background: #202026;
      padding: 0px 18px;
      color: #dadada;
    }

    .add-minus i:nth-of-type(1) {
      margin-right: 25px;
    }

    .satellite .tab-box li {
      padding: 0px 5px;
    }

    .satellite .tab-box ul {}

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
      height: 84px;
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
      background-color: white;
      width: 100%;
      padding: 10px 1.5rem;
      z-index: 9;
      left: 0px;
      transform: translateX(0%);

      .bottom-tab {
        overflow-y: hidden;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        display: -webkit-box;
      }

    }

  }
</style>
