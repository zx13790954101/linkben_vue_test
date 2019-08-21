<template>
    <div class="loginContainer">
        <Header :title='title' :isShow='true'></Header>
        <!-- <form> -->
           
        <!-- </form>   -->

        
    </div>
</template>

 <script>
import Vue from 'vue'
import axios from 'axios'
import Header from '../components/Header'

export default {
  name: 'Login',
  components: {
      Header,
  },
  data () {
    return {
        title:'注册',
        loginForm: {
            account: '',
            password: '',
        },
    }
  },
  methods : {

    
  },
  mounted () {
  },
  computed: {
    
  },
  created(){
    //调用一下方法屏蔽底部的几个选项
    let _footer = this.$store.state.common.footerVisible;
    if (_footer) {
        this.$store.commit('TOGGLE_FOOTER');
    }
  },
}
</script>

<style scoped>
    .loginContainer{
        background: #F5F5F5;
    }
    .m-l-r-auto{
        margin:20px 10px 0px 10px;
    }
    .forgetPaw{
        float:right;margin-top:10px;margin-right:12px;color:#3b95e9;
    }
    .mint-button--primary{
        background-color:#4cd964;
    }
</style>
