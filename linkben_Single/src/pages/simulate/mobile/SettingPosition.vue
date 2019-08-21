<template>
  <div class="settingPosition">
    <div class="flex-c center item">
      <span class="" @click="adjustPos('vertical')">
        <i class="iconfont icon-chuizhijuzhongduiqi"></i>
      </span>
      <span class="flex-item" @click="adjustPos('level')">
        <i class="iconfont icon-shuipingjuzhongduiqi"></i>
      </span>
      <div class="pos-box flex-item flex-c" >
        <span class="flex-item" @click="adjustPos('top')">
          <i class="iconfont  icon-web__bitebizuojiantou-copy"></i>
        </span>
        <span class="flex-item" @click="adjustPos('bottom')">
          <i class=" iconfont icon-web__bitebizuojiantou-copy-copy-copy"></i>
        </span>
      </div>
      <div class="pos-box  flex-item flex-c">
        <span class="flex-item" @click="adjustPos('left')">
          <i class="iconfont  icon-web__bitebizuojiantou"></i>
        </span>
        <span class="flex-item" @click="adjustPos('right')">
          <i class=" iconfont icon-web__bitebizuojiantou-copy-copy"></i>
        </span>
      </div>
    </div>
    <div class="flex-c center item">
      <span class="flex-item">
        <button>重置</button>
      </span>
      <span class="flex-item" @click="adjustPos('rotateR')">
        <i class="iconfont icon-shunshizhenxuanzhuan"></i>
      </span>
      <span class="flex-item" @click="adjustPos('rotateL')">
        <i class="iconfont icon-nishizhenxuanzhuan"></i>
      </span>
      <span class="flex-item" @click="adjustPos('miroorL')">
        <i class="iconfont  icon-suofang-copy"></i>
      </span>
      <span class="flex-item" @click="adjustPos('miroorR')">
        <i class=" iconfont icon-suofang-copy-copy"></i>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'settingPosition',
    data() {
      return {
        title: '位置调整',
        active: 1,
        dialogTableVisible: false,
        imgStyle:{
          height:0,
          width:0,

        }
      }
    },
    props: {
      tabNavActive: 0
    },
    mounted() {
      this.imgStyle.height=this.$parent.width;
      this.imgStyle.width=this.$parent.height;
    },
    methods: {
      //返回值
      back() {
        this.$parent.active = 0;
      },
      //选择的功能位置
      adjustPos(name){
        var that=this;
        const clientWidth=document.documentElement.clientWidth;
        const clientHeight=document.documentElement.clientHeight;
        let height=(clientHeight-150)/2;
        let width=(clientWidth-clientWidth/10)/2;
        switch(name){
          case 'vertical':
            //获取元素内联样式值
            that.$parent.mouseEnd.y=0;
            that.$parent.mouseStart.y=0;
            that.$parent.finalTop=height;
          break;
          case 'level':
            that.$parent.mouseEnd.x=0;
            that.$parent.mouseStart.x=0;
            that.$parent.finalLeft=width;
          break;
          case 'top':
          that.$parent.finalTop= (that.$parent.finalTop-20);
          break;
          case 'bottom':
          that.$parent.finalTop= (that.$parent.finalTop+20);
          break;
          case 'left':
           that.$parent.finalLeft= (that.$parent.finalLeft-20);
          break;
          case 'right':
          that.$parent.finalLeft= (that.$parent.finalLeft+20);
          break;
          case 'rotateR':
          if(that.$parent.angle==180) return;
          that.$parent.angle= (that.$parent.angle+90);
          break;
          case 'rotateL':
          if(that.$parent.angle==-180) return;
          that.$parent.angle= (that.$parent.angle-90);
          break;
          case 'miroorL':
          that.$parent.filpY= -(that.$parent.filpY);
          break;
          case 'miroorR':
          that.$parent.filp= -(that.$parent.filp);
          break
        }
      },
    },
    watch: {
      tabNavActive: function () {
        var that = this;
        if (that.tabNavActive == 1) {
          that.dialogTableVisible = true;
        }
      }
    },

  }
</script>
<style scoped lang="less">
  .settingPosition {
    color: #333;

    span {
      color: #333;
      height: 36px;
      line-height:36px;
    }
    .item {
      margin: 0px 0px;
      padding: 7px 0px;
    }
    .iconfont {
      font-size: 1.67rem;
      font-weight: 600;
    }
   .pos-box{
     background-color: #333;
     border-radius: 50px;
     margin-left: 15px;
     .iconfont{
       color: white;
     }
     span{
       line-height: 38px;
     }
   }


   

  }
</style>