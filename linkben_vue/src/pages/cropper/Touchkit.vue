<template>
  <div id="app">
      
      <div class="div2">
          <div :class="[className,'div1' ] "  ref="element"></div>
      </div>
  </div>
</template>

<script>
  //import  {initMtouch} from "../../assets/touch/extendMtouch"
  import MTouch from "Mtouch"
  export default {
    name: 'touchkit',
    data: function () {
      return {
        bigPic: '',
        isShowBigpic: false,
        modalWidth: 0,
        modalHeight: 0,
        baseLeft: 0,
        baseTop: 0,
        bodyWidth: document.body.clientWidth,
        ele: null, // 不能在这里设置， dom还没有生成
        dragTrans : {
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0
          },
          freeze :false,
          className:"div3",

      }
    },
    created() {
      var date=new Date()
      date="a"+(date.getTime())+""
      this.className=date;
    },
    mounted() {
    //  this.className="div4";
      window.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      }();
      var that=this;
      var $drag =$(('.'+that.className));
      console.log("ss",$drag,that.className)
      var $drags = $drag ;
      var wrap =document.querySelector('body');
      var wrapRect = wrap.getBoundingClientRect();
      var elRect = $drag[0].getBoundingClientRect();

      let mt = new MTouch(('.'+that.className))
      mt.on('drag', function(ev) {
          if (!that.freeze) {
            that.dragTrans.x += ev.delta.deltaX;
            that.dragTrans.y += ev.delta.deltaY;
            that.set($drag, that.limit(wrap, $drag[0], that.dragTrans));
          }
      });
      mt.on('pinch singlePinch', function (ev) {
        if (!that.freeze) {
          that.dragTrans.scale *= ev.delta.scale;
            that.set($drag, that.dragTrans);
        }
      });
      mt.on('rotate singleRotate', function (ev) {
          if (!that.freeze) {
            that.dragTrans.rotate += ev.delta.rotate;
              that.set($drag, that.dragTrans);
          }
      });
   
      // if($drag.innerHTML){
      //   $drag.append('<div class="mtouch-singleButton" data-singlebutton="true"></div>');
      // }else{
        $drag.html('<div class="mtouch-singleButton" data-singlebutton="true"></div>');
      // }
    

    },
    methods: {
       set:function($el, transform) {
          window.requestAnimFrame(function() {
            $el.css('transform', 'translate3d(' + transform.x + 'px,' + transform.y +
              'px,0px) rotate(' + transform.rotate + 'deg) scale(' + transform.scale + ')');
          });
        },

         limit:function(wrap, el, trans) {
          var $drag = $(('.'+this.className))
          var wrap = document.querySelector("body");
           var wrapRect = wrap.getBoundingClientRect();
           var elRect = $drag[0].getBoundingClientRect();
          var bounce = 40;
          var minX = -el.offsetLeft - bounce;
          var maxX = wrapRect.width - el.offsetLeft - elRect.width + bounce;
          var minY = -el.offsetTop - bounce;
          var maxY = wrapRect.height - el.offsetTop - elRect.height + bounce;
          trans.x = trans.x < minX ? minX : trans.x;
          trans.x = trans.x > maxX ? maxX : trans.x;
          trans.y = trans.y < minY ? minY : trans.y;
          trans.y = trans.y > maxY ? maxY : trans.y;
          return trans;
        }
    }
  }
</script>
<style lang="less" scoped>
  .div1 {
    width: 200px;
    height: 200px;
    background-color: red;
    /* position: absolute;
    top: 50%;
				left: 50%;
				margin-top: -100px;
				margin-left: -100px; */


  }

  .div2 {
    width: 100%;
    height:80vh;
    overflow: hidden;
    background-color: black;
    position: relative;

  }
  .title{
            color: rgb(46,104,170);
            text-align: center;
            line-height: 50px;
            margin-top: 30px;
        }
        .wrap{
            width: 100%;
            display: flex;
            flex-direction:column;
            align-items:center;
            color:rgb(46,104,170);
        }
        .area{
            position: relative;
            width: 90%;
            height: 300px;
            border: 2px solid rgb(46,104,170);
            margin-bottom: 30px;
            overflow: hidden;
            text-align: center;
            line-height: 50px;
            font-size: 30px;
        }
        .el{
            position: absolute;
            width: 100px;
            height: 100px;
            background: rgb(241,124,103);
            left: 50%;
            top: 50%;
            margin: -50px 0 0 -50px;
        }
        .el.active{
            outline: 2px solid black;
            z-index: 99;
        }
        .el.active .mtouch-singleButton{
            display: inline-block;
        }
        .js-drag-el .mtouch-singleButton{
            display: none;
        }
        .subtitle{
            color: rgb(241,124,103);
            text-align: center;
            margin-bottom: 10px;
        }
        .mask{
            width: 100%;
            height: 100%;
            background: white;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 9999;
            color: #996699;
            font-size: 24px;
            text-align:center;
            padding-top: 100px;
            box-sizing: border-box;
            display: none;
        }
</style>