<template>
    <div class="icons">
        <div
        class="icon"
        v-for="item of iconList"
        :key="item.id"
        >
        <div class='icon-img'>
            <img class='icon-img-content' :src='item.imgUrl' />
        </div>
        <p class="icon-desc">{{item.desc}}</p>
        </div>
    </div>
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
        iconList:[{
        "id": "0001",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
        "desc": "景点门票"
      }, {
        "id": "0002",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1711/df/86cbcfc533330d02.png",
        "desc": "滑雪季"
      }, {
        "id": "0003",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1710/a6/83f636bd75ae6302.png",
        "desc": "泡温泉"
      }, {
        "id": "0004",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1611/35/2640cab202c41b02.png",
        "desc": "动植园"
      }, {
        "id": "0005",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1611/d0/e09575e66f4aa402.png",
        "desc": "游乐园"
      }, {
        "id": "0006",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1611/59/569d3c096e542502.png",
        "desc": "必游榜单"
      }, {
        "id": "0007",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1611/17/4bd370f3eb1acd02.png",
        "desc": "演出"
      }, {
        "id": "0008",
        "imgUrl": "http://img1.qunarzz.com/piao/fusion/1611/7f/b1ea3c8c7fb6db02.png",
        "desc": "城市观光"
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
    .icons{
        margin-top: .1rem
    }
    .icon{
        position: relative;
        overflow: hidden;
        float: left;
        width: 25%;
        height: 0;
        padding-bottom: 25%;
    }
    .icon-img{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: .44rem;
        box-sizing: border-box;
        padding: .1rem;
    }
     .icon-img-content{
        display: block;
        margin: 0 auto;
        height: 100%;
     }
     .icon-desc{
        position: absolute;
        left: 0;  
        right: 0;
        bottom: 0;
        height: .44rem;
        line-height: .44rem;
        text-align: center;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size:14px;
     }
        
          
        
      
</style>
