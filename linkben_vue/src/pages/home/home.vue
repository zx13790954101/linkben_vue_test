<template>
    <div class="wrapper">
    
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
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
  }

}
</script>

<style>
</style>