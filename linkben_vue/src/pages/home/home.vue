<template>
    <div class="wrapper">
    
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  mounted () {
    axios.get('/zhihu/api/4/news/before/20190106')
        .then(function(res){

        });
  },
  computed: {
    
  },
  methods : {
   }

}
</script>