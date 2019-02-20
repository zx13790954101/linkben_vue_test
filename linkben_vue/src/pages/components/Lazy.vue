<template>
        <ul class="lazyList">
            <li v-for="item in imgList" class="page-lazyload-listitem">
                <img class='lazy-img' v-lazy="item.imgUrl">
            </li>
        </ul>
</template>

 <script>

export default {
  name: 'Icons',
  components: {
  },
  props:{

  },
  data () {
    return {
        imgList:[{
        "id": "0001",
        "imgUrl": "http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg"
      },{
        "id": "0002",
        "imgUrl": "http://fuss10.elemecdn.com/3/1e/42634e29812e6594c98a89e922c60jpeg.jpeg"
      },{
        "id": "0003",
        "imgUrl": "http://fuss10.elemecdn.com/7/85/e478e4b26af74f4539c79f31fde80jpeg.jpeg"
      }]
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
    .lazy-img{
        width:100%;
        margin-top:10px;
    }
    .page-lazyload-listitem{
        /* width: 300px; */
        margin: 0 10px;
        margin-bottom: 10px;
    }
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }  
        
      
</style>
