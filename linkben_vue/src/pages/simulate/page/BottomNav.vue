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
    
    <monlieBottomNav v-if="screenWidth<=688"></monlieBottomNav>
  </div>
</template>

<script>
  import bus from '../../../assets/bus';
  import monlieBottomNav from '../mobile/MoblieBottomNav.vue'
  export default {
    name: 'bottomNav',
    components: {monlieBottomNav},
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
        tabActive1: 1,
      }
    },
    props: {
      imgSatus: {}
    },
    created() {
    },
    methods: {
      showDeleteButton(e) {
        clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
        this.Loop = setTimeout(function () {
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
    background-color: white;
  }
</style>

<style scoped lang="less">
  .bottom-nav {
    position: relative;
     z-index: 9;
     padding: 10px 15px;
     background-color: white;

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

  }
</style>
