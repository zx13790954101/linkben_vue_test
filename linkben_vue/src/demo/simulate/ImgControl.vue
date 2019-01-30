<template>
  <div class="img-control">
    <div class="img_box" id="img_box" :style="[moving?styleObj:styleObjFinal,{zIndex:zIndex}]">
      <div class="main-box" @click="imgSelect($event)">
        <img :src="url" alt="" :style="{filter:'brightness('+brightness+'%)',transform:'rotate('+angle+'deg) scaleX('+filp+')'}"
          @mousewheel="zoom" @DOMMouseScroll="zoom" @mousemove.prevent="mouseMove" @touchmove.prevent="mouseMove"
          @mousedown.prevent="mouseDown" @touchstart.prevent="mouseDown" @mouseup.prevent="mouseUp" @touchend.prevent="mouseUp"
          @mouseout.prevent="mouseOut" @contextmenu.prevent="planeShow=!planeShow">
        <ul class="border-box" v-if="borderType" :style="{'z-index':borderBoxStats}">
          <li class="top" @click="formState(top)"> <span></span></li>
          <li class="bottom" @click="formState(bottom)"> <span></span></li>
          <li class="left" @click="formState(left)"><span></span></li>
          <li class="right" @mousedown.prevent="downState" @mousemove.prevent="moveState" @click="clickState($event)"
            @mouseup.prevent="upState"><span></span></li>
        </ul>
      </div>
      <transition name="animate-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
        :duration="200">
        <div class="control_plane" v-if="planeShow">
          <div class="block">
            <div class="action">
              <el-button type="primary" @click="toDetail">详情</el-button>
              <el-button type="primary" @click="filp=-filp">镜像</el-button>
              <el-button type="primary" @click="deleteGood">删除</el-button>
            </div>
          </div>
          <div class="block">
            <span class="demonstration">角度</span>
            <el-slider v-model="angle" :format-tooltip="formatAngle" :min="0" :max="360"></el-slider>
          </div>
          <div class="block">
            <span class="demonstration">曝光</span>
            <el-slider v-model="brightness" :format-tooltip="formatBrightness" :min="50" :max="150"></el-slider>
          </div>
          <!--<div class="block">
            <span class="demonstration">大小</span>
            <el-slider v-model="width" :format-tooltip="formatWidth" :min="300" :max="1000"></el-slider>
          </div>-->
        </div>
        <div class="control_plane" v-if="touchShow">
          <div class="block">
            <div class="action">
              <el-button type="primary" @click="toDetail">详情</el-button>
              <el-button type="primary" @click="filp=-filp">镜像</el-button>
              <el-button type="primary" @click="deleteGood">删除</el-button>
            </div>
          </div>
          <div class="block">
            <div class="action">
              <el-button type="default" @click="angleChange(10)">-</el-button>
              <span class="plane_word"><i class="iconfont icon-weibiaoti-"></i>角度</span>
              <el-button type="default" @click="angleChange(-10)">+</el-button>
            </div>
          </div>
          <div class="block">
            <div class="action">
              <el-button type="default" @click="brightnessChange(10)">-</el-button>
              <span class="plane_word"><i class="iconfont icon-puguang"></i>曝光</span>
              <el-button type="default" @click="brightnessChange(-10)">+</el-button>
            </div>
          </div>
          <div class="block">
            <div class="action">
              <el-button type="default" @click="zoomChange(20)">-</el-button>
              <span class="plane_word"><i class="iconfont icon-suofang"></i>缩放</span>
              <el-button type="default" @click="zoomChange(-20)">+</el-button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<!-- //首页的添加得  -->
<script>
  export default {
    name: 'img-control',
    props: ['url'],
    data() {
      return {
        filp: 1,
        planeShow: false,
        touchShow: false,
        brightness: 100,
        angle: 0,
        mouseStart: {
          x: 0,
          y: 0
        },
        mouseEnd: {
          x: 0,
          y: 0
        },
        moving: false,
        zoomNum: 1,
        zIndex: 1,
        width: 200,
        finalLeft: ($(window).width() * 0.7 - 400) / 2,
        finalTop: ($(window).height()) / 5,
        /*finalTop: ($(window).height()-400)/2*/
        timer: null,
        tapNum: 0,
        touchLength: 0,
        borderType: false, //边框的状态的判断
        borderBoxStats: 10 //边框的显示的层级
          ,
        stateMoving: false, //判断是不是在边框上面
        stateData: null, //当前的this
      }
    },
    mounted() {

    },
    methods: {
      //照片的点击事件的使用
      imgSelect(event) {
        var that = this;
        var imgEvent = $(event.currentTarget);
        //设置点击外面的点击的按钮德
        that.borderType = true;
        //阻止冒泡
        imgEvent || (imgEvent = window.event);
        imgEvent.stopPropagation ? event.stopPropagation() : (imgEvent.cancelBubble = true);
        //因为点击的原因导致其他点击失败
        $(document).click(function (e) {
          e.stopPropagation();
          if (!imgEvent.is(e.target) && imgEvent.has(e.target).length === 0) {
            that.borderType = false;
            that.stateMoving = false;
          }
        });
      },
      clickState(event) {
        debugger;
        var that = this;
        this.stateData = event;
        console.log("$event2111", that.stateData);
      },
      downState(data) {
        var that = this;
        that.stateMoving = true;
        switch ($(data.currentTarget)[0].className) {
          case "right":
            that.borderBoxStats = 10;
            that.mouseStart.x = data.clientX || (data.changedTouches)[0].clientX;
            that.mouseStart.y = data.clientY || (data.changedTouches)[0].clientY;
            break;
        }
      },
      moveState(data) {
        var that = this;
        if (!that.stateMoving) return;
        var thatX = data.clientX || (data.changedTouches)[0].clientX;
        var thatY = data.clientY || (data.changedTouches)[0].clientY;

        if (that.mouseStart.y < thatY) {
          that.width += 2;
        } else {
          that.width -= 2;
        }
        if (that.width < 100) {
          that.width = 100;
          that.$message({
            message: '不能再小了',
            type: 'warning',
            showClose: true
          })
        } else if (that.width > 1000) {
          that.width = 1000;
          that.$message({
            message: '不能再大了',
            type: 'warning',
            showClose: true
          })
        }

      },
      upState(data) {
        debugger;
        var that = this;
        if (!that.stateMoving) return;
        that.stateMoving = false;

      },
      zoomChange(num) {
        this.width -= num;
        if (this.width > 1000) {
          this.width = 1000;
        } else if (this.width < 100) {
          this.width = 100
        }
      },
      brightnessChange(num) {
        this.brightness -= num;
        if (this.brightness > 150) {
          this.brightness = 150;
        } else if (this.brightness < 50) {
          this.brightness = 50
        }
      },
      angleChange(angle) {
        this.angle -= angle;
        if (this.angle < 0) {
          this.angle += 360;
        } else if (this.angle > 360) {
          this.angle -= 360;
        }
      },
      longTouch() {
        //console.log('longTouch');
        this.touchShow = !this.touchShow;
      },
      toDetail() {
        this.$emit('setCurGood', true);
      },
      zoom: function (data) {
        //console.log(data);
        //console.log(data.deltaY);
        if (data.wheelDelta > 1 || data.detail < 0) { //data.detail为火狐浏览器滚动事件的属性
          this.width += 20;
        } else {
          this.width -= 20;
        }
        if (this.width < 100) {
          this.width = 100;
          this.$message({
            message: '不能再小了',
            type: 'warning',
            showClose: true
          })
        } else if (this.width > 1000) {
          this.width = 1000;
          this.$message({
            message: '不能再大了',
            type: 'warning',
            showClose: true
          })
        }
      },
      mouseDown: function (data) {
        //this.tapNum++;
        /*if(this.tapNum==2){
         this.planeShow = !this.planeShow
         this.tapNum=0;
         }*/
        var that = this;
        //console.log(data);
        if (data.changedTouches) {
          this.timer = setTimeout(function () {
            that.longTouch();
          }, 500);
        }
        this.moving = true;
        this.zIndex = 2;
        this.mouseStart.x = data.clientX || (data.changedTouches)[0].clientX;
        this.mouseStart.y = data.clientY || (data.changedTouches)[0].clientY;
        this.mouseEnd.x = data.clientX || (data.changedTouches)[0].clientX;
        this.mouseEnd.y = data.clientY || (data.changedTouches)[0].clientY;

      },
      mouseMove: function (data) {
        if (!this.moving) return;
        //console.log('mousemove');
        this.mouseEnd.x = data.clientX || (data.changedTouches)[0].clientX;
        this.mouseEnd.y = data.clientY || (data.changedTouches)[0].clientY;

        //触屏缩放
        var width = this.width;
        if (data.changedTouches && (data.changedTouches).length > 1) {
          if (this.touchLength == 0) {
            this.touchLength = Math.abs((data.changedTouches)[0].clientX - (data.changedTouches)[1].clientX).toFixed(
              2);
          } else {
            this.width = width * ((Math.abs(((data.changedTouches)[0].clientX - (data.changedTouches)[1].clientX).toFixed(
              2)) / this.touchLength - 1) * 0.1 + 1)
          }
        }

        if ((this.mouseStart.x - this.mouseEnd.x < 10) && (this.mouseStart.y - this.mouseEnd.y < 10)) { //移动距离小于10判断为没移动

        } else {
          //this.tapNum=0;
          clearTimeout(this.timer);
          //alert(data.changedTouches.length)
        }

      },
      mouseUp: function (data) {
        this.touchLength = 0;
        clearTimeout(this.timer);
        //console.log('mouseUp');
        if (!this.moving) return;
        this.zIndex = 1;
        this.moving = false;
        this.mouseEnd.x = data.clientX || (data.changedTouches)[0].clientX;
        this.mouseEnd.y = data.clientY || (data.changedTouches)[0].clientY;
        this.finalLeft += this.mouseEnd.x - this.mouseStart.x;
        this.finalTop += this.mouseEnd.y - this.mouseStart.y;
      },
      mouseOut: function (data) {
        if (!this.moving) return;
        this.zIndex = 1;
        this.moving = false;
        this.mouseEnd.x = data.clientX;
        this.mouseEnd.y = data.clientY;
        this.finalLeft += this.mouseEnd.x - this.mouseStart.x;
        this.finalTop += this.mouseEnd.y - this.mouseStart.y;
      },
      deleteGood() {
        this.$emit('deleteUrl', this.url);
      },
      formatWidth(val) {
        return val + 'px';
      },
      formatBrightness(val) {
        return val + '%';
      },
      formatAngle(val) {
        return val + '度';
      }
    },
    computed: {
      styleObj: function () {
        return {
          //transform: 'scale(' + this.zoomNum + ') translate(' + (this.finalLeft + this.mouseEnd.x - this.mouseStart.x) + 'px,' + (this.finalTop + this.mouseEnd.y - this.mouseStart.y) + 'px)'
          transform: 'translate(' + (this.finalLeft + this.mouseEnd.x - this.mouseStart.x) + 'px,' + (this.finalTop +
            this.mouseEnd.y - this.mouseStart.y) + 'px)',
          width: this.width + 'px'
        }
      },
      styleObjFinal: function () {
        return {
          //transform: 'scale(' + this.zoomNum + ') translate(' + (this.finalLeft) + 'px,' + (this.finalTop) + 'px)'
          transform: 'translate(' + (this.finalLeft) + 'px,' + (this.finalTop) + 'px)',
          width: this.width + 'px'
        }
      }
    },
  }

</script>
<style>
  .img-control span {
    color: white;
  }

</style>
<style scoped>
  .img-control {
    position: absolute;
    left: 0;
    top: 0;
  }

  .main-box {
    position: relative;
    padding: 20px;
  }

  .main-box img {
    z-index: 11;
    position: relative;
  }

  .border-box {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 92%;
    z-index: 1;
    width: 92%;
    border: 2px dashed #9e9e9e;
    transform: translate(-50%, -50%);
  }

  .border-box li {
    position: absolute;
  }

  .border-box span {
    position: absolute;
    width: 17px;
    height: 17px;
    background-color: #fff;
    border: 4px solid #35383f;
    opacity: 0.8;
    border-radius: 50%;
    z-index: 9;
    outline: 10px solid #f5f5dc00;
  }

  .border-box li:nth-of-type(1) span {
    top: 21%;
    left: 21%;
  }

  .border-box li:nth-of-type(2) span {
    top: 21%;
    right: 21%;
  }

  .border-box li:nth-of-type(3) span {
    bottom: 21%;
    left: 21%;
  }

  .border-box li:nth-of-type(4) span {
    bottom: 21%;
    right: 21%;
  }

  .border-box li:nth-of-type(1) {
    top: 0px;
    left: 0px;
    cursor: se-resize;
    width: 70%;
    margin-left: -20%;
    height: 70%;
    margin-top: -20%;
  }


  .border-box li:nth-of-type(2) {
    top: 0px;
    right: 0px;
    cursor: ne-resize;
    width: 70%;
    margin-right: -20%;
    height: 70%;
    margin-top: -20%;
  }

  .border-box li:nth-of-type(3) {
    bottom: 0px;
    left: 0px;
    cursor: ne-resize;
    width: 70%;
    margin-left: -20%;
    height: 70%;
    margin-bottom: -20%;
  }

  .border-box li:nth-of-type(4) {
    bottom: 0px;
    right: 0px;
    cursor: se-resize;
    width: 70%;
    margin-right: -20%;
    height: 70%;
    margin-bottom: -20%;
  }

  .img_box {
    position: absolute;
    left: 0;
    top: 0;
    width: 600px;
    z-index: 1;
  }

  img {
    width: 100%;
    cursor: move;
    display: block;
    z-index: 1;
  }

  .flipx {
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
  }

  .control_plane {
    position: absolute;
    right: 100%;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    background: #0000003b;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 10px;
    width: 250px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.42);
    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.42);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.42);
  }

  .action {
    display: inline-block;
    padding-left: 0;
    text-align: center;
    margin: 5px;
    margin-left: 0;
    border-radius: 3px;
    cursor: pointer;
  }

  .plane_word {
    padding: 5px;
  }

  /*.action .iconfont{
    color: #0c6eff;
    text-decoration: none;
  }*/

</style>
