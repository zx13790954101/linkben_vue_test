<template>
    <div>
        <home-header></home-header>
        <home-swiper :list="swiperList"></home-swiper>
    </div>
    <div class="wrapper">
    
    </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
      HomeHeader,
      HomeSwiper,
  },
  data () {
    return {
     swiperList:[]
    }
  },
  methods : {
   getHomeInfo () {
       axios.get('/api/index.json')
        .then(this.getHomeInfoSucc)
   },
   getHomeInfoSucc(res) {
        res = res.data;
       if(res.ret && res.data){
           const data = res.data;
           this.swiperList = data.swiperList;
       }
   }
  },
  mounted () {
   this.getHomeInfo();
  },
  computed: {
    
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  mounted () {
    axios.get('/zhihu/api/4/news/before/20190106')
        .then(function(res){

        });
  },
  computed: {
    
  }
  },
  methods : {
   }

}
</script>

<style>
</style>
</script>

