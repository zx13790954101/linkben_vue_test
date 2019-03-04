<template>
  <div class="img-control" :style="{'z-index':boxZindex}">
    <div class="img_box" ref="elememt2" id="img_box" :style="[moving?styleObj:styleObjFinal,{zIndex:zIndex}]">
      <div class="main-box">
        <img :src="url" alt="" :style="{filter:'brightness('+brightness+'%)',transform:'rotate('+angle+'deg) scaleY('+filpY+') scaleX('+filp+')'}"
          @mousewheel="zoom" @DOMMouseScroll="zoom" @mousemove.prevent="mouseMove" @touchmove.prevent="mouseMove"
          @mousedown.prevent="mouseDown" @touchstart.prevent="mouseDown" @mouseup.prevent="mouseUp" @touchend.prevent="mouseUp"
          @mouseout.prevent="mouseOut">
        <ul class="border-box" v-if="borderType" :style="{'z-index':borderBoxStats}">
          <li class="top" @click="formState(top)"> <span></span></li>
          <li class="bottom" @click="formState(bottom)"> <span></span></li>
          <li class="left" @click="formState(left)"><span></span></li>
          <li class="right" @mousedown.prevent="downState" @mousemove.prevent="moveState" @click="clickState($event)"
            @mouseup.prevent="upState"><span></span></li>
        </ul>
      </div>
      <transition name="el-fade-in">
        <div class="control_plane" v-if="planeShow && screenWidth>=768">
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
          <div class="block">
            <span class="demonstration">大小</span>
            <el-slider v-model="width" :format-tooltip="formatWidth" :min="300" :max="1000"></el-slider>
          </div>
        </div>
      </transition>


    </div>
    <div class="control_plane control_plane_1" :style="planeStyle" v-if="planeShow && screenWidth<=768">
      <div class="block button-array flex-c" v-if="active==0||active==1">
        <button v-for="(item,index) in tabNavList" @click="selectNav($event,item.name,index)" class="center h5 flex-item">
          <i :class="item.icon"></i>
          <h6>{{item.name}}</h6>
        </button>
      </div>


      <div class="block tab-item " v-if="active==2">
        <h6 class="demonstration">大小</h6>
        <el-slider v-model="width" :format-tooltip="formatWidth" :min="300" :max="1000"></el-slider>
        <!-- <h5 class="demonstration">角度</h5>
        <el-slider v-model="angle" :format-tooltip="formatAngle" :min="0" :max="360"></el-slider> -->
        <h6 class="demonstration">曝光</h6>
        <el-slider v-model="brightness" :format-tooltip="formatBrightness" :min="50" :max="150"></el-slider>

      </div>
      <div class="block tab-item white" v-if="active==3">
        <settingPosition></settingPosition>
      </div>
      <div class="block tab-item white" v-if="active==4">
        <h1>替换</h1>
      </div>
      <div class="flex-c tab-item" v-if="active==2||active==3||active==4">
        <i class="iconfont icon-dacha center h3" title="关闭" @click="active=0"></i>
        <h5 class="center flex-item h5">{{ tabNavList[active].name }}</h5>
        <i class="iconfont icon-dagou center h3" title="保存"></i>
      </div>
    </div>
    <dealWithImg :tabNavActive="active" v-if="active==1"></dealWithImg>
  </div>
</template>
<!-- //首页的添加得  -->
<script>
  import dealWithImg from "../mobile/DealWithImg.vue"
  import settingPosition from "../mobile/SettingPosition.vue"
  export default {
    name: 'img-control',
    components: {
      dealWithImg,
      settingPosition
    },
    props: ['url'],
    data() {
      return {
        filp: 1,
        filpY: 1,
        screenWidth: document.documentElement.clientWidth,
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
        height: null,
        finalLeft: ($(window).width() * 0.7 - 400) / 2,
        finalTop: ($(window).height()) / 5,
        /*finalTop: ($(window).height()-400)/2*/
        timer: null,
        tapNum: 0,
        touchLength: 0,
        borderType: false, //边框的状态的判断
        borderBoxStats: 11 //边框的显示的层级
          ,
        stateMoving: false, //判断是不是在边框上面
        stateData: null,
        boxZindex: 1, //当前的this
        active: 0,
        tabName: "截取",
        planeStyle: {
          'margin-top': '-120px',
          'margin-left': '3vw',
          'width': '84vw'
        },
        tabNavList: [{
            name: '返回',
            icon: "iconfont icon-fanhui11"
          },
          {
            name: '截取',
            icon: "iconfont icon-762bianjiqi_jietu"
          },
          {
            name: '大小',
            icon: "iconfont icon-icon_rotate"
          },
          {
            name: '位置',
            icon: "iconfont icon-lvjing"
          },
          {
            name: '替换',
            icon: "iconfont icon-zhaopian"
          },
          {
            name: '删除',
            icon: "iconfont icon-qingchu1"
          }
        ]

      }
    },
    mounted() {

    },
    methods: {
      selectNav(event, name, index) {
        // this.height=this.$refs.element.offsetHeight; 
        let that = this;
        this.$nextTick(function () {
          let height = $(that.$refs.elememt2).height();
          that.height = height; //计算高度;
          // console.log("height2", that.height, that.width)
        });

        if (index == 0) {
          this.planeShow = false
        } else if (index == 5) {
          this.deleteGood();
        } else {
          this.active = index;
        }
      },
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
        var that = this;
        this.stateData = event;
      },
      downState(data) {
        var that = this;
        that.stateMoving = true;
        switch ($(data.currentTarget)[0].className) {
          case "right":
            that.borderBoxStats = 1;
            that.mouseStart.x = data.clientX || (data.changedTouches)[0].clientX;
            that.mouseStart.y = data.clientY || (data.changedTouches)[0].clientY;
            that.stateData = data.currentTarget;
            break;
        }
      },
      moveState(data) {
        var that = this;
        if (!that.stateMoving) return;
        var thatX = data.clientX || (data.changedTouches)[0].clientX;
        var thatY = data.clientY || (data.changedTouches)[0].clientY;
        //判断是不是在边框里面
        if (!$(that.stateData).is(data.target) && $(that.stateData).has(data.target).length === 0) {
          that.borderType = false;
          that.stateMoving = false;
          return;
        }

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
        this.touchShow = !this.touchShow;
      },
      toDetail() {
        this.$emit('setCurGood', true);
      },
      zoom: function (data) {
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
        if (data.changedTouches) {
          this.timer = setTimeout(function () {
            that.longTouch();
          }, 500);
        }
        that.planeShow = !that.planeShow;

        this.moving = true;
        this.zIndex = 2;
        this.mouseStart.x = data.clientX || (data.changedTouches)[0].clientX;
        this.mouseStart.y = data.clientY || (data.changedTouches)[0].clientY;
        this.mouseEnd.x = data.clientX || (data.changedTouches)[0].clientX;
        this.mouseEnd.y = data.clientY || (data.changedTouches)[0].clientY;

      },
      mouseMove: function (data) {
        if (!this.moving) return;
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
    watch: {
      //监听
      planeShow: function (newData, oldData) {
        if (this.screenWidth >= 768) return;
        if (this.planeShow) {
          this.boxZindex = 13;
        } else {
          this.boxZindex = 1;
        }
        this.$parent.imgControlType = this.planeShow;
      },
      active: function (newData, oldData) {
        if (newData == oldData) this.active = 0;
        if (this.active == 1) {
          this.planeStyle['margin-left'] = '3vw';
          this.planeStyle['margin-top'] = '-120px';
          this.planeStyle['width'] = '84vw';
          return;
        } else if (this.active != 0) {
          this.planeStyle['margin-left'] = '-5vw';
          this.planeStyle['margin-top'] = '-222px';
          this.planeStyle['width'] = '100vw';
        } else {
          this.planeStyle['margin-left'] = '3vw';
          this.planeStyle['margin-top'] = '-120px';
          this.planeStyle['width'] = '84vw';
        }
      }
    },
  }
</script>
<style lang="less">
  .img-control span {
    color: white;
  }
</style>
<style scoped lang="less">
  .img-control {
    position: absolute;
    left: 0;
    top: 0;

    span {
      color: white;
    }

    .main-box {
      position: relative;
      padding: 16%;
    }

    .main-box img {
      z-index: 2;
      position: relative;
    }

    .border-box {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 84%;
      z-index: 1;
      width: 84%;
      border: 2px dashed #9e9e9e;
      transform: translate(-50%, -50%);
    }

    .border-box li {
      position: absolute;
      z-index: 12;
    }

    .border-box li:hover {
      cursor: pointer;
    }

    .border-box span {
      position: absolute;
      width: 25px;
      height: 25px;
      background-color: #fff;
      border: 6px solid #35383f;
      opacity: 0.8;
      border-radius: 50%;
      z-index: 13;
      outline: 10px solid #f5f5dc00;
    }

    .border-box li:nth-of-type(1) span {
      top: 35%;
      left: 35%;
    }

    .border-box li:nth-of-type(2) span {
      top: 35%;
      right: 35%;
    }

    .border-box li:nth-of-type(3) span {
      bottom: 35%;
      left: 35%;
    }

    .border-box li:nth-of-type(4) span {
      bottom: 35%;
      right: 35%;
    }

    .border-box li:nth-of-type(1):active,
    .border-box li:nth-of-type(1):focus {
      cursor: se-resize;
    }

    .border-box li:nth-of-type(2):active,
    .border-box li:nth-of-type(2):focus {
      cursor: ne-resize;
    }

    .border-box li:nth-of-type(3):active,
    .border-box li:nth-of-type(3):focus {
      cursor: ne-resize;
    }

    .border-box li:nth-of-type(4):active,
    .border-box li:nth-of-type(4):focus {
      cursor: se-resize;
    }

    .border-box li:nth-of-type(1) {
      top: 0px;
      left: 0px;
      width: 40%;
      margin-left: -20%;
      height: 40%;
      margin-top: -20%;
    }


    .border-box li:nth-of-type(2) {
      top: 0px;
      right: 0px;
      width: 40%;
      margin-right: -20%;
      height: 40%;
      margin-top: -20%;
    }

    .border-box li:nth-of-type(3) {
      bottom: 0px;
      left: 0px;
      width: 40%;
      margin-left: -20%;
      height: 40%;
      margin-bottom: -20%;
    }

    .border-box li:nth-of-type(4) {
      bottom: 0px;
      right: 0px;
      width: 40%;
      margin-right: -20%;
      height: 40%;
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
      width: 270px;
      -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.42);
      -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.42);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.42);
    }

    .control_plane .tab-item {
      background-color: white;
      padding: 10px 15px;
      font-weight: 600;
      min-height: 50px;
    }

    .action {
      display: inline-block;
      padding-left: 0;
      text-align: center;
      padding: 8px 10px;
      margin: 0px;
      margin-left: 0;
      border-radius: 3px;
      cursor: pointer;
      color: #272727
    }

    .button-array i {
      font-size: 1.67rem
    }

    .button-array button {
      display: inline-block;
      min-width: auto;
      line-height: inherit;
      height: auto;
    }

    .button-array button h6 {
      font-size: 0.9rem;
      padding-top: 2px;
    }

    .plane_word {
      padding: 5px;
    }

    .control_plane_1, .control_plane_2 {
      top: 100vh;
      margin-top: -120px;
      left: 0px;
      right: 0px;
      transform: translateY(0%);
      width: 84vw;
      margin-left: 3vw;
      padding: 0px;
      z-index: 98;
      box-shadow: 0px 0px 0px;
      background-color: rgba(0, 0, 0, 0);

    }

    .control_plane_1 .button-array {
      background-color: #dededc;
      border-radius: 12px;
      padding: 7px 8px;
      text-align: center;
    }
  }
</style>
