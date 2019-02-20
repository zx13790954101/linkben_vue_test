<template>
    <div>
        <Header :title='title'></Header>

    </div>
</template>

 <script>
import Vue from 'vue'
import Header from '../components/Header'

export default {
  name: 'Discover',
  components: {
      Header,
  },
  data () {
    return {
        title:'发现'
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
    this.$store.commit('SELECT_TAB', 'discover')
  }
}
</script>

<style>
</style>
