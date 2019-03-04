<template>
  <div class="funSelectPopup">
    <h3 class="center title">LinkBen</h3>
    <swiper :options="swiperOption" ref="mySwiper" v-if="homeSwiper">
      <swiper-slide class="flex flex-c  center" v-for="(item,index) of imgArray" :style="{'background-color':(item.color)}" :key="item.id">


          <div class="item img-r l-img" v-if="index>0&&(index/2)!=1">
              <img v-lazy="item.src">
            </div>
    
        <div class="flex-item content text-left" :style="{'text-align':(index>0&&(index/2)!=1)?'right':''}">
          <h3 class="block ">{{item.title}}</h3>
          <h3>{{item.title2}}</h3>
          <span class="margin-10 block">{{item.content}}</span>
          <router-link :to="item.link" v-if="index==0">
              <button class="tolink h6" :style="{'float':(index>0&&(index/2)!=1)?'right':''}">点击使用</button>
          </router-link>
        </div>

        <div class="item img-r l-img" v-if="(index/2)==1||(index/2)==0">
          <img v-lazy="item.src">
        </div>

      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  export default {
    name: 'funSelectPopup',
    data() {
      return {
        title: '首页的功能选择',
        swiperOption: {
          // effect: 'coverflow',
          // grabCursor: true,
          // centeredSlides: false,//居中显示,true 的时候定置最边上这边
          // coverflowEffect: {
          //   rotate: 50,
          //   stretch: 0,
          //   depth: 100,
          //   modifier: 1,
          //   slideShadows: true,
          // },
          grabCursor: true,
          slidesPerView: 3 ,
          direction: 'vertical',
          autoplayDisableOnInteraction: false,
          mousewheelControl: true,
          autoHeight: true,
          paginationClickable: true,

          longSwipesRatio: 0.3,
          touchRatio: 1,
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
        },
        homeSwiper: true,
        screenWidth: document.documentElement.clientWidth,
        active: 0,
        dialogVisible: true,
        imgArray: [
          {
            src: require("../../../../static/img/head/tu1.gif"),
            title:"制作证件照",
            content:"来自于linkben",
            link:"Simulate",
            title2:"随机搭配",
            color:"#FFF",
          },
          {
            src: require("../../../../static/img/home/1.png"),
            title:"室内空间制作",
            content:"来自于linkben",
            link:"Simulate",
            title2:"随机搭配",
            color:"#bed6e8",
          },
          {
            src: require("../../../../static/img/head/1.png"),
            title:"制作证件照",
            content:"来自于linkben",
            link:"Simulate",
            title2:"随机搭配",
            color:"#f0d4cf",
          },
        ],
      }
    },
    props: {
      imgStyleStatus: {}
    },
    created() { },
    methods: {

    },
    mounted() {

    },
    computed: {

    },

  }
</script>
<style scoped lang="less">
  .funSelectPopup {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(#3da6dd, #8192c8, #ea74a9);
.swiper-container{
  height: 80vh;
  width: 100%;
}
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 100%;
      height: 200px;
      background-color: white;
    }
    .title{
      background-color: white;
      height: 60px;
      line-height: 60px;
      position:absolute;
      top: 0px;
      width: 100%;
    }
    .swiper-container {
      width: 100%;
      height: 100vh;
      padding-top: 60px;
    }
    .tolink{
      background-color: #fd7d94;
      border: 0px;
      color: white;
      border-radius: 30px;
    }
    .content {
      height: auto;
      width: 100%;
    }
    .swiper-slide.flex{
      -webkit-flex-wrap: wrap; 
       flex-wrap: wrap; 
       padding: 20px 38px;
    }
    .l-img {
      height: 200px;
      width: auto;
    }

    .item {
      text-align: center;
      height: 120px; 
      width: auto;
      .iconfont {
        font-size: 6rem;
        margin: 0 auto;
        color: white;
      }
    }

    .col-lg-6 {
      padding: 0px 0px;
    }

    .col-lg-6:nth-of-type(1) .item {
      background: linear-gradient(to left, #CDDC39, #FFEB3B);
    }

    .col-lg-6:nth-of-type(2) .item {
      background: linear-gradient(to left, #03A9F4, #00BCD4);
    }

  }
</style>