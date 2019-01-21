<template>
  <div class="plusminus">
    <ul class="bottom-tab flex-c" v-if="false">
      <li class=" flex-item ">
        <i class="iconfont icon-dengpao"></i>
      </li>
      <li class=" flex-item ">
        <i class="iconfont icon-jingxiang"></i>
      </li>
      <li class=" flex-item ">
        <i class="iconfont icon-youxuanzhuan"></i>
      </li>
      <li class=" flex-item flex-c add-minus">
        <i class="iconfont icon-jia1" @click="plusminus(1)"></i>
        <i class="iconfont icon-jian" @click="plusminus(2)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  import 'viewerjs/dist/viewer.css';
  import axios from 'axios';
  import Viewer from 'viewerjs';
  export default {
    name: 'bottomNav',
    components: {},
    data() {
      return {
        title: '底部的nav',
      }
    },
    props: {
      sliderValue: 0
    },
    methods: {
      plusminus: function (data) {
        var that = this;
        if (data == 1) {
          if (that.sliderValue === 100) return;
          that.sliderValue = that.sliderValue + 20
        } else {
          if (that.sliderValue === 0) return;
          that.sliderValue = that.sliderValue - 20
        }
      },
      viewerInit() {
        if( $(".viewer-container").html() ){
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
          show: function (){
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
      var that = this;
      //that.viewerInit();
    },
    computed: {

    },
    created() {

    }
  }
</script>
<style>
  修改viewer .viewer-toolbar ul li {
    height: 30px;
    width: 30px;
  }

  .viewer-zoom-in::before,
  .viewer-zoom-out::before,
  .viewer-one-to-one::before,
  .viewer-reset::before,
  .viewer-prev::before,
  .viewer-play::before,
  .viewer-next::before,
  .viewer-rotate-left::before,
  .viewer-rotate-right::before,
  .viewer-flip-horizontal::before,
  .viewer-flip-vertical::before,
  .viewer-fullscreen::before,
  .viewer-fullscreen-exit::before,
  .viewer-close::before {
    transform: scale(1.4);
  }
</style>
<style scoped>
  .plusminus .el-slider {
    width: 120px;
    margin: 0px 10px;
  }

  .plusminus {
    position: absolute;
    left: 50%;
    z-index: 999;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 1%;

  }

  .plusminus button {
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
    font-size: 1.6rem;
    font-weight: 600;
  }

  .bottom-tab li {
    /* border-right: 2px solid #b8b8b8; */
    color: #dadada;
    cursor: pointer;
    margin: 0px 17px;
    box-sizing: border-box;
  }

  .add-minus {
    border-radius: 15px;
    height: 35px;
    line-height: 35px;
    background: #202026;
    padding: 0px 22px;
  }

  .add-minus i:nth-of-type(1) {
    margin-right: 25px;
  }
</style>
