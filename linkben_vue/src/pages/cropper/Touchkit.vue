<template>
  <div class0="touchkit">
    <h1>Touchkit</h1>
    <div class="wrap js-wrap">
      <div class="item sticker">
        <div class="parent js-par"></div>
        <div class="tips">
          Tips:<br />you can select any widget to operate it and tap the background to move the background-image!
        </div>
      </div>
    </div>
    <div class="export js-export Button">exportImage</div>
    <div class="addCropBox js-cropBox Button">add cropBox</div>
    <div class="result js-result">
      <div class="result-wrap">
        <h2>This is already a image!<br />you can save this image by longTap!</h2>
        <img style="width:300px;" src="" alt="">
      </div>
    </div>

  </div>
</template>


<script>
  import Touchkit from "Touchkit"
  export default {
    name: 'Touchkit',
    data() {
      return {
        headerImage: "",
        urlImg: require('../../../static/to/1.jpg'),
      };
    },
    mounted() {
      var divbox = document.querySelector(".js-par");
      let Tk = new Touchkit({
        el: divbox,
        limit: {
          x: 0.5,
          y: 0.5,
          maxScale: 3,
          minScale: 0.4,
        },
      });
      Tk.background({
        image: '../../../static/to/p3.jpg',
        type: 'contain',
        // top:150,
        // static:true,
        success() {},
      }).add({
        image: `../../../static/to/ear.png`,
        width: '100px',
        use: 'all',
        limit: true,
        pos: {
          x: 116,
          y: 45,
          scale: 1.25,
          rotate: 2.63,
        },
        close: true,
        success() {},
      }).add({
        image: `../../../static/to/neck.png`,
        width: 100,
        use: 'all',
        limit: true,
        pos: {
          x: '0px',
          y: 0,
          scale: 1,
          rotate: 0,
        },
        close: true,
        success() {},
      });
      $('.js-cropBox').on('click',function(){
    Tk.cropBox();
    // Tk.clear();
});

    $('.js-export').on('click',function(){
    Tk.exportImage(b64=>{
        $('.js-result').show();
        $('.js-result img').attr('src',b64);
    });
    });
    $('.js-result').on('click',function(){
    $('.js-result img').attr('src','');
    $(this).hide();
    });
    $('.Button').on('touchstart',function(){
    $(this).addClass('taped');
    });
    $('.Button').on('touchend',function(){
    $(this).removeClass('taped');
    });
    },
    methods: {}
  };
</script>

<style scoped lang="less">
  .wrap {
    width: 100%;
    transition: all .3s;
    -webkit-transition: all .3s;
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }

  .wrap.switch {
    transform: translateX(-16rem);
  }

  .item {
    display: inline-block;
    width: 100%;
    vertical-align: top;
    text-align: center;
  }

  .export {
    width: 120px;
    height: 35px;
    background: #996699;
    position: fixed;
    color: white;
    line-height: 35px;
    text-align: center;
    border-radius: 25px;
    left: 75%;
    margin-left: -75px;
    bottom: 20px;
    font-size: 16px;
  }

  .addCropBox {
    width: 120px;
    height: 35px;
    background: #996699;
    position: fixed;
    color: white;
    line-height: 35px;
    text-align: center;
    border-radius: 25px;
    left: 35%;
    margin-left: -75px;
    bottom: 20px;
    font-size: 16px;
  }

  .Button.taped {
    background: #CC99CC;
  }

  .title {
    text-align: center;
    color: #996699;
    font-size: 40px;
    line-height: 60px;
  }

  .parent {
    display: inline-block;
    width: 300px;
    height: 300px;
    overflow: hidden;
    position: relative;
    border: 1px solid #996699;
  }

  .pic {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
  }

  .el {
    width: 100px;
    height: 100px;
    position: absolute;
    transform-origin: 50% 50%;
    -webkit-transform-origin: 50% 50%;
    /*border: 1px solid transparent;*/
    left: 0;
    top: 0;
  }

  .el-ear {
    height: 40px;
    transform: translate3d(5.38rem, 2.27rem, 0px) scale(1.25416) rotate(2.6359deg);
    -webkit-transform: translate3d(5.38rem, 2.27rem, 0px) scale(1.25416) rotate(2.6359deg);
  }

  .el-nose {
    height: 83px;
    transform: translate3d(5.02rem, 4rem, 0px) scale(0.496975) rotate(2.66493deg);
    -webkit-transform: translate3d(5.02rem, 4rem, 0px) scale(0.496975) rotate(2.66493deg);
  }

  .el-neck {
    height: 93px;
    transform: translate3d(4.22rem, 7.16rem, 0px) scale(0.762083) rotate(1.4128deg);
    -webkit-transform: translate3d(4.22rem, 7.16rem, 0px) scale(0.762083) rotate(1.4128deg);
  }

  .pinch {
    width: 26px;
    height: 26px;
    /* background:url(images/pinch.png) no-repeat 0 0; */
    background-size: 100%;
    position: absolute;
    right: -13px;
    bottom: -13px;
    display: none;
  }


  .active .pinch {
    display: block;
  }

  .sub-title {
    font-size: 14px;
    line-height: 48px;
    color: #FF9999;
    text-align: center;
  }

  .crop-wrap {
    display: inline-block;
    overflow: hidden;
    width: 300px;
    height: 300px;

  }

  .result {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    display: none;
  }

  .result img {
    width: 300px;
  }

  .result-wrap {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }

  .result h2 {
    color: white;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
  }

  .tips {
    display: inline-block;
    color: #996699;
    width: 80%;
    text-align: left;
    font-size: 14px;
  }

  .mask {
    width: 100%;
    height: 100%;
    background: white;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    color: #996699;
    font-size: 24px;
    text-align: center;
    padding-top: 100px;
    box-sizing: border-box;
    display: none;
  }
</style>