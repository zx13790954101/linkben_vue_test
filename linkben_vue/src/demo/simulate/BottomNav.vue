<template>
  <div class="bottom-nav">
    <ul class="satellite ">
        <li class="" v-if="active===1">
            <el-slider v-model="lightNum"  :min="0" :max="360"></el-slider>
        </li>
        <li class="" v-else-if="active===2">

        </li>
        <li class="" v-else-if="active===3">
            <el-slider v-model="rotateNum" :format-tooltip="plusRotate"  :step="45" :min="-180" :max="180"></el-slider>
          </li>
          <li class="" v-else="active===4">
              <el-slider v-model="addNum" :format-tooltip="formatAdd" :min="0" :max="100"></el-slider>
        </li>
    </ul>
    <ul class="bottom-tab flex-c">
      <li class=" flex-item " @click="active=1" :style="{'color':(active==1?'rgb(255, 219, 5)':'')}">
        <i class="iconfont icon-dengpao"></i>
      </li>
      <li class=" flex-item " @click="active=2" :style="{'color':(active==2?'rgb(255, 219, 5)':'')}">
        <i class="iconfont icon-jingxiang" @click="plusMinus2('mirror')"></i>
      </li>
      <li class=" flex-item "  @click="active=3" :style="{'color':(active==3?'rgb(255, 219, 5)':'')}">
        <i class="iconfont icon-youxuanzhuan" ></i>
      </li>
      <li class=" flex-item   flex-c flex-c-y add-minus " @click="active=4" :style="{'background-color':(active==4?'rgb(255, 219, 5)':''),'color':(active==4?'white':'')}">
        <i class="iconfont icon-jia1" @click="plusminus($event,1)" id="big"></i>
        <i class="iconfont icon-jian" @click="plusminus($event,2)" id="small"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  // import 'viewerjs/dist/viewer.css';
  // import axios from 'axios';
  // import Viewer from 'viewerjs';
  // import Hammer from "hammerjs"
  import bus from '../../assets/bus';

  export default {
    name: 'bottomNav',
    components: {},
    data() {
      return {
        title: '底部的nav',
        timer: "",
        active:1,
        lightNum:0,
        addNum:50,
        rotateNum:0,
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
          console.log("da", 1)
        }.bind(this), 1000);
      },
      clearLoop(e) {
        clearTimeout(this.Loop);
      },
      setTime(data, type) {
        var that=this;
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
      formatAdd(){
         var that = this;
          that.$parent.imgSatus.scale=(that.addNum/20);
      },
       //旋转的功能
      plusRotate() {
        var that = this;
        if( that.$parent.imgSatus.rotate>=180){

        }
      //  that.$parent.imgSatus.rotate =  that.$parent.imgSatus.rotate + 45;
        that.$parent.imgSatus.rotate =that.rotateNum;
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
  .satellite  .el-slider__button {
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
  
    bottom: 0px;
   
 
    .el-slider {
      width: 120px;
      margin: 0px 10px;
    }
    .satellite  .el-slider{
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
      margin: 5px 17px;
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
    @media (max-width:768px) {
      background-color: white;
      width: 100%;
      padding: 5px 1.5rem;
      z-index: 9;
      left: 0px;
    transform: translateX(0%);

   }
    
  }
 
</style>
