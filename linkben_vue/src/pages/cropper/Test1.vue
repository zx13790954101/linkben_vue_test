
<template>
  <div id="app">
    <div align="left">translateX:{{this.icontranslateX}}</div>
    <div align="left">translateY:{{this.icontranslateY}}</div>
    <div align="left">clientWidth:{{this.clientWidth}}</div>
    <div align="left">clientHeight:{{this.clientHeight}}</div>
    <div class="icon-add-50" :style="iconstyle" @click='click' @touchmove='touchmove' @touchstart='touchstart(this,$event)' @touchend='touchend'></div>
  </div>
</template>
 
<script>
export default {
  name: 'Test1',
  data(){
    return{
      /*--------图标样式变量--------------*/
      iconrotate:45,//旋转deg
      icontranslateX:100,//沿正x轴位移px
      icontranslateY:100,//沿负y轴位移px
      width:50,//元素宽度
      height:50,//元素高度
      /*--------拖动计算变量------------*/
      mouseX:0,//鼠标触发时正x轴位置
      mouseY:0,//鼠标触发时负y轴位置
      objX:0,//元素初始正x轴位置
      objY:0,//元素初始负y轴位置
      isDown:false,
      /*--------设备参数---------*/
      clientWidth:0,//屏幕可视宽度
      clientHeight:0//屏幕可视高度
    }
  },
  mounted:function(){
    this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;//获取设备宽度
    this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//获取设备高度
  },
  methods:{
    click:function(){//图标点击事件
      if (this.iconrotate==0) {//改变样式属性
         this.iconrotate=45;
      }else {
        this.iconrotate=0;
      }
    },
    touchstart:function(obj,e){//finger touch 触发
      this.objX = this.icontranslateX;//记录元素初始x
      this.objY = this.icontranslateY;//记录元素初始y
      this.mouseX = e.touches[0].clientX;//记录触点初始x
      this.mouseY = e.touches[0].clientY;//记录触点初始y
      this.isDowm = true;//运行touchmove和touchend执行
    },
    touchmove:function(e){//finger move 触发
      let x = e.touches[0].clientX;//记录触点初始x
      let y = e.touches[0].clientY;//记录触点初始y
      if (this.isDowm) {//拖拽触发
          this.icontranslateX = parseInt(x) - parseInt(this.mouseX) + parseInt(this.objX);//动态更新元素x
          this.icontranslateX = this.icontranslateX<0?this.icontranslateX=0:this.icontranslateX;//设置元素左边界
          this.icontranslateX = this.icontranslateX>this.clientWidth-this.width?this.clientWidth-this.width:this.icontranslateX;//设置元素右边界
          this.icontranslateY = parseInt(y) - parseInt(this.mouseY) + parseInt(this.objY);//动态更新元素y
          this.icontranslateY = this.icontranslateY<0?this.icontranslateY=0:this.icontranslateY;//设置元素左边界
          this.icontranslateY = this.icontranslateY>this.clientHeight-this.height?this.clientHeight-this.height:this.icontranslateY;//设置元素右边界
      }
    },
    touchend:function(e){//finger from touch to notouch
      if (this.isDowm) {//拖拽触发
          let x = e.touches[0].clientX;//记录触点初始x
          let y = e.touches[0].clientY;//记录触点初始y
          this.icontranslateX = parseInt(x) - parseInt(this.mouseX)+ parseInt(this.objX);//动态更新元素x
          this.icontranslateY = parseInt(y) - parseInt(this.mouseY)+ parseInt(this.objY);//动态更新元素y
          this.isDowm=false;//结束拖拽触发
      }
    }
  },
  computed:{
    iconstyle:function(){//图标动态样式
      let arr = new Array();
      arr.push('background-color:rgba(0,0,0,0);');
      arr.push('width:'+this.width+'px;');//元素宽度
      arr.push('height:'+this.height+'px;');//元素高度
      if(this.icontranslateX>0.5*this.clientWidth){//元素x超过半屏
        arr.push('right:'+(this.clientWidth-this.icontranslateX-this.width)+'px;');//右边距对齐,配合fixed方式
      }else{
        arr.push('left:'+this.icontranslateX+'px;');//左边距对齐,配合fixed方式
      }
      if (this.icontranslateY>0.5*this.clientHeight) {//元素y超过半屏
        arr.push('bottom:'+(this.clientHeight-this.icontranslateY-this.height)+'px;');//下边距对齐,配合fixed方式
      }else{
        arr.push('top:'+this.icontranslateY+'px;');//上边距对齐,配合fixed方式
      }
      arr.push('transform:rotate('+this.iconrotate+'deg) ');//元素旋转
      return arr.join("");
    }
  }
}
</script>
 
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  /*加号*/
.icon-add-50{
    position: fixed;
    z-index:999;
    box-sizing: border-box;
    border: 2px solid gray;
    border-radius: 50%;
    box-shadow:darkgrey 0px 0px 2px 2px;
}
.icon-add-50:before{
    content: '';
    position: absolute;
    width: 30px;
    height: 2px;
    left: 50%;
    top: 50%;
    margin-left: -15px;
    margin-top: -1px;
    background-color: black;
}
.icon-add-50:after{
    content: '';
    position: absolute;
    width: 2px;
    height: 30px;
    left: 50%;
    top: 50%;
    margin-left: -1px;
    margin-top: -15px;
    background-color: black;
}


</style>