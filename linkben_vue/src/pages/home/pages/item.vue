<template>
  <div class="wrapper item-box">
    <div class="img-r head-img">
      <img :src="image">
    </div>
    <div class="content">
      <h4>{{title}}</h4>
      <p v-model="body" v-html="body">
        {{body}}
      </p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Item',
    components: {},
    data() {
      return {
        content: "",
        title: "",
        image: "",
        body: "",
      }
    },
    created() {
      var that = this;
      var url = "/zhihu/api/4/news/" + that.$route.query.id;
      axios.get(url).then(function (res) {
        that.contentDate = res.data.date;
        that.body = res.data.body;
        that.title = res.data.title;
        that.image = res.data.image;
      }).catch(function (error) {
        console.info("data3", error)
      });
    },
    mounted() {

    },

  }

</script>
<style>
img {
    width: 100%;
}
</style>
<style scoped>
  .wrapper {}

  .head-img {
    height: 19rem;
    width: 100%;
  }
.item-box .content{
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  width: 100%;
}
  .head-img img {
    width: 100%;
    height: auto;
  }

</style>
