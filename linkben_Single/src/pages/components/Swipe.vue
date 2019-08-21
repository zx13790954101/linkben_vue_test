<template>
          <mt-swipe @change="handleChange" :auto="5000">
            <mt-swipe-item v-for="(item,index) of imgList" :key="item.id">
              <img class="swiper-img" :src="item.url" />
            </mt-swipe-item>
          </mt-swipe>
        
</template>

 <script>

export default {
  name: 'Swipe',
  components: {
    
  },
  data () {
    return {
      imgList:[
        {
          id:0,
          url:'http://img1.qunarzz.com/piao/fusion/1801/1a/94428c6dea109402.jpg_640x200_2cf590d8.jpg'
        },
        {
          id:1,
          url:'http://img1.qunarzz.com/piao/fusion/1802/42/7c92b9a381e46402.jpg_640x200_1cdce2a4.jpg'
        },
        {
          id:2,
          url:'http://img1.qunarzz.com/piao/fusion/1802/51/e78f936a5b404102.jpg_640x200_c14f0b3a.jpg'
        },
      ]
    }
  },
  watch: {
     
    },
  methods : {
      handleChange(index) {
          
      }
  },
  mounted () {
    
  },
  computed: {
    
  }
}
</script>

<style>
    .mint-swipe {
        width: 100%;
        height: 118px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        overflow: hidden;
      }
      .swiper-img{
          width:100%;
      }
      .is-active{
        opacity: 1!important;
        background: #fff!important;
      }
</style>
