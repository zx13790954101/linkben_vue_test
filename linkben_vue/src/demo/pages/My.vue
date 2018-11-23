<template>
    <div>
        <Header :title='title'></Header>
        <div @click="goLogin('/Login')">
          <span>登录</span>
        </div>
        <br/>
        <div @click="goRegister('/Register')">
          <span>注册</span>
        </div>

    </div>
</template>

 <script>
import Vue from 'vue'
import axios from 'axios'
import Header from '../components/Header'

export default {
  name: 'My',
  components: {
      Header,
  },
  data () {
    return {
        title:'我的个人中心'
    }
  },
  methods : {
      goLogin(index){
        this.$router.push(index);
      },
      goRegister(index){
        this.$router.push(index);
      }
  },
  mounted () {
  },
  computed: {
    
  },
  created(){
    let _footer = this.$store.state.common.footerVisible;
    if (!_footer) {
        this.$store.commit('TOGGLE_FOOTER');
    }
    this.$store.commit('SELECT_TAB', 'my')
  }
}
</script>

<style>
</style>
