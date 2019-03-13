<template>
    <div id="app">
        <div class="js-area area drag">
         
            <div class="el js-drag-el b active" style="left:30%;top:50%;"></div>
        </div>

        <div class="div1"></div>
    </div>
</template>

<script>
  import myTouch from  '../../assets/touch/myTouch'
export default {
  name: 'app',
  data:function () {
      return{
          bigPic: '',
          isShowBigpic: false,
          modalWidth: 0,
          modalHeight: 0,
          baseLeft : 0,
          baseTop: 0,
          bodyWidth: document.body.clientWidth,
          ele: null, // 不能在这里设置， dom还没有生成
          
      }
  },
  mounted() {
    myTouch.mTouch();
    let mt = new MTouch(document.querySelector(".div1"));
    mt.on('singlePinch', e =>{

} , operator);
  },
  methods:{
    
  }
}
</script>
<style lang="less" scoped>


  .modal{
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    background: rgba(0, 0, 0, 1);
    text-align: center;
    .modal_content{
      position: absolute;
      width: 100%;
      width: 88%;
      top: 50%;
      transform: translate(-50%, -50%);
      margin-left: 0;
      margin-top: 0;
    }
    .close_modal{
      color: #ffffff;
      font-size: 12px;
      font-style: normal;
      background: rgba(0, 0, 0, 0.6);
      height:70rem;
      z-index: 100;
      position: relative;
      text-align: right;
      padding: 0 10px 0 0;
      .close_icon{
        border-radius: 50%;
        width:  40rem;
        padding: 16rem;
      }
    }
  }
  .width80{
    width: 100% !important;
  }
</style>