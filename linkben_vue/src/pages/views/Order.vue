<template>
    <div>
        <Header :title='title'></Header>
        
         <div class="page-navbar">
            <mt-navbar class="page-part" v-model="selected">
                <mt-tab-item id="1">全部订单</mt-tab-item>
                <mt-tab-item id="2">已完成</mt-tab-item>
                <mt-tab-item id="3">未完成</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <mt-cell v-for="n in 10" :title="'订单' + n" :key="n"/>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <mt-cell v-for="n in 4" :title="'已完成订单 ' + n" :key="n"/>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <mt-cell v-for="n in 6" :title="'未完成订单' + n" :key="n"/>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>

    </div>
</template>

 <script>
import Vue from 'vue'
import Header from '../components/Header'

export default {
  name: 'My',
  components: {
      Header,
  },
  data () {
    return {
        title:'订单',
        selected:'1'
    }
  },
  methods : {
     
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
    this.$store.commit('SELECT_TAB', 'order')
  }
}
</script>

<style>
</style>
