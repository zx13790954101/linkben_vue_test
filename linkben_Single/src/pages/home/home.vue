<template>
  <div class="wrapper">
    <homeList></homeList>
  </div>
</template>

<script>
  import axios from 'axios'
  import HomeList from './components/HomeList.vue'
  export default {
    name: 'Home',
    components: {
      HomeList,
    },
    data() {
      return {}
    },
    mounted() {

    },

  }
</script>
<style scoped>
</style>
