<template>
        <mt-header :title="title">
          <router-link to="/" slot="left" v-show="isShow">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
</template>

 <script>

export default {
  name: 'Header',
  components: {
  },
  props:{
      title:String,
      isShow:{
        type: Boolean,
        default:false
      }
  },
  data () {
    return {
    }
  },
  watch: {
     
    },
  methods : {
      
     
  },
  mounted () {
  },
  computed: {
    
  }
}
</script>

<style>
</style>
