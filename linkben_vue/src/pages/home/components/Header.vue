<template>
    <div class="header">
       <div class="header-left">
           <div class="iconfont back-icon">&#xe624;</div>
       </div>
       <div class="header-input">
            <span class="iconfont">&#xe632;</span>
            输入城市景点/游玩主题
        </div>
       <div class="header-right">{{city}}<span class="iconfont arrow-icon">&#xe64a;</span></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeHeader',
  data () {
    return {
     
    }
  },
  methods : {
   
  },
  mounted () {
   
  },
  computed: {
    ...mapState({
       city :  state => state.common.city
     })
  },
  components: {

  },
}
</script>

<style scoped>
    .header{
        display: flex;
        line-height: .86rem;
        background: #00bcd4;
        color:#fff;
    }
    .header-left{
        width:.64rem;
        float:left;
    }
     .back-icon{
        text-align: center;
        font-size: .4rem;
    }
    .header-input{
        flex: 1;
        background: #fff;
        border-radius: .1rem;
        height: .64rem;
        line-height: .64rem;
        margin-top: .12rem;
        margin-left: .2rem;
        padding-left: .2rem;
        color:#ccc;
    }
   
    .header-right{
        min-width:1.04rem;
        padding: 0 .1rem;
        float:right;
        text-align:center;
        color:#fff;
    }
    .arrow-icon{
        margin-left: .08rem;
        font-size: .24rem;
    }
</style>
