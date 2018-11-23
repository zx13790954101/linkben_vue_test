<template>
    <div class="loginContainer">
        <Header :title='title' :isShow='true'></Header>
        <!-- <form> -->
            <div class="page-part" style="margin-top:20px;">
                <mt-field placeholder="账号" type="username" v-model="loginForm.account"></mt-field>
                <mt-field placeholder="密码" type="password" v-model="loginForm.password"></mt-field>
            </div> 
            <div class="m-l-r-auto">
                <mt-button  type="primary" size="large" @click.native="onSubmit">登录</mt-button>
            </div>
            <div class="forgetPaw">
                重置密码?
            </div>
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
        title:'用户登录',
        loginForm: {
            account: '',
            password: '',
        }
    }
  },
  methods : {
     //点击登录
    onSubmit() {
        if(this.loginForm.account === ''){
            this.$toast("请输入账号");
            return false;
        }
        if(this.loginForm.password === ''){
             this.$toast("请输入密码");
            return false;
        }
        this.$router.push({path: '/index'})
    }
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
