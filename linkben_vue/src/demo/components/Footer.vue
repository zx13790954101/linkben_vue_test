<template>
    <div>
        <mt-tabbar v-model="selected" fixed v-show="isShow">
        <mt-tab-item id="index">
          <router-link  tag="div" to="/index">
           <div class="mint-tab-item-icon">
             <span class="iconfont i-f-size">&#xe600;</span>
           </div>
            首页
          </router-link>
        </mt-tab-item>
        <mt-tab-item id="order">
          <router-link  tag="div" to="/order">
            <div class="mint-tab-item-icon">
             <span class="iconfont i-f-size">&#xe6bd;</span>
           </div>
            订单
          </router-link>
        </mt-tab-item>
        <mt-tab-item id="discover">
          <router-link  tag="div" to="/discover"> 
            <div class="mint-tab-item-icon">
             <span class="iconfont i-f-size">&#xe627;</span>
           </div>
            发现
          </router-link>
        </mt-tab-item>
        <mt-tab-item id="my">
          <router-link  tag="div"  to="/my">
            <div class="mint-tab-item-icon">
             <span class="iconfont i-f-size">&#xe607;</span>
           </div>
            我的
          </router-link>
        </mt-tab-item>
        </mt-tabbar>
      </div>
</template>

 <script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Footer',
  components: {
  },
  data () {
    return {
        //selected:this.$store.state.common.selectedTab,
    }
  },
  watch: {
    //  'selected':  {
    //    handler(){
    //       if (this.selected == "index") {  
    //         this.$router.push('/index');
    //       } 
    //       if (this.selected == "order") {  
    //         this.$router.push('/Order');
    //       }
    //       if (this.selected == "discover") {  
    //         this.$router.push('/Discover');
    //       }
    //       if (this.selected == "my") {  
    //          this.$router.push('/My');
    //       }
    //    }
    // }
  },
  methods : {
    
  },
  mounted () {
      
  },
  computed: {
    ...mapState({
        isShow: state => state.common.footerVisible,
    }),
    selected: {
      get: function () {
        return this.$store.state.common.selectedTab
      },
      set: function () {}
    }
  }
}
</script>

<style>
.i-f-size{
  font-size:24px!important;
}
.router-link-exact-active{
  display: block;
}
</style>
