<template>
  <div class="wrapper">
    <p>sssss</p>
    <h1>sss</h1>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Home',
    data() {
      return {}
    },
    mounted() {
      axios.get('/zhihu/api/4/news/before/20190106')
        .then(function (res) {
          console.log("sss", res);
        });
    },

  }
</script>
<style>
  .wrapper{
      overflow: hidden;
      width:100%;
      height:0;
      padding-bottom: 31.25%;
      background: #eee;
  }
  .swiper-img{
      width:100%;
  }
  .swiper-pagination-bullet-active{
      background: #fff!important;
  }
</style>
