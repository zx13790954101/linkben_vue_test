<template>
    <div id="app">
        <Header :title='title'></Header>
        <Swipe></Swipe>
        <Icons></Icons>
        <Lazy></Lazy>
        
       
       

       
    </div>
</template>

 <script>
import Vue from 'vue'
import axios from '@/api/factory'
import Header from './components/Header'
import Swipe from './components/Swipe'
import Icons from './components/Icons'
import Lazy from './components/Lazy'

export default {
  name: 'Home',
  components: {
      Header,
      Swipe,
      Icons,
      Lazy,
  },
  data () {
    return {
        title:'首页',
    }
  },
  methods : {
    getIndexInfo () {
      let  params = {title:'title',name:'name'};
      axios.get('/api/index.json',params)
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      console.log(res)
    }
  },
  mounted () {
      this.getIndexInfo();
  },
  computed: {
    
  },
  created(){
    let _footer = this.$store.state.common.footerVisible;
    if (!_footer) {
        this.$store.commit('TOGGLE_FOOTER');
    }
    this.$store.commit('SELECT_TAB', 'index');
  }
}
</script>

<style>
    .mint-popup-2 {
        width: 100%;
        height: 50px;
        text-align: center;
        background-color: rgba(0,0,0,.7);
        backface-visibility: hidden;
      }

      .mint-popup-2 p {
        line-height: 50px;
        color: #fff;
      }
      #app{
          overflow: hidden;
      }
</style>
