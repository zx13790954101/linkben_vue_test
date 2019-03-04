<template>
  <div class="dealWithImg">
    <div class="content  row">
      
      <header class="head flex-c">
        <h3 class="flex-item">选择你的功能</h3>
        <i class="el-icon-close  back" @click="back"></i>
      </header>
      <div class="col-lg-6  " @click="toCropperImg">
        <router-link class="item flex-c" :to="{path:'CropperImg',query:param}" >
          <i class="iconfont icon-ic_sq_zjz"></i>
          <h4 class="center">截取</h4>
        </router-link>
        
      </div>
      <div class="col-lg-6 center">
        <div class="item flex-c">
          <i class="iconfont icon-beijing"></i>
          <h4 class="center">抠图</h4>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dealWithImg',
    data() {
      return {
        title: '截取和抠图',
        active: 1,
        dialogTableVisible: false,
        param: {}
      }
    },
    props: {
      tabNavActive: 0
    },
    created() {
      console.log("url1", this.$parent.url);
    },
    mounted() {
      console.log("url2", this.$parent.url);
    },
    methods: {
      //返回值
      back() {
        this.$parent.active = 0;
      },
      toCropperImg() {
        localStorage.setItem("cropperimgsrc", this.$parent.url);
      },
    },
    watch: {
      tabNavActive: function () {
        var that = this;
        if (that.tabNavActive == 1) {
          that.dialogTableVisible = true;
        }
      },
      //监听路由的变化
      '$route' () {
         if(this.$store.state.itemCropperType){
          this.$store.commit("itemCropperType",false);
         }
       } 

    },

  }
</script>
<style scoped lang="less">
  .dealWithImg {
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.5);
    margin: 0px;
    padding: 0px;
    top: 0%;
    left: 0px;

    .content {
      width: 74vw;
      top: 50%;
      height: auto;
      transform: translateY(-50%);
      background-color: white;
      margin-left: 13vw;
      border-radius: 8px;
      padding:0px 10px;
      padding-bottom:20px;
    }

    .head {
      padding: 15px 15px;
      text-align: left;
      /* background-color: #1caff6; */
      border-bottom:2px solid #272727;
    }

    .item {
      padding: 20px 5px;
      text-align: center;
      min-height: 80px;
      margin: 20px;

      .iconfont {
        font-size: 4rem;
        margin: 0 auto;
        /* color: white; */
      }
    }

    .flex-c {
      -webkit-flex-wrap: wrap;
      flex-wrap: wrap;

    }
    h4{
      width: 100%;
    }
 
    button{
      width: 80%;
      /* background-color: #ff9d00; */
      /* color: white; */
      border:0px;
    }
    .back {
      font-size: 1.5rem;
      /* color: white; */
    }

    .col-lg-6 {
      padding: 0px 0px;
    }

    .col-lg-6:nth-of-type(1) .item {
      background: linear-gradient(to left, #CDDC39, #FFEB3B);
      color: #272727;
      /* border:1px solid #d7d7da; */
      border-radius: 8px;
    }

    .col-lg-6:nth-of-type(2) .item {
      background: linear-gradient(to left, #03A9F4, #00BCD4);
      color: #272727;
      /* border:1px solid #d7d7da; */
      border-radius: 8px;
    }
  }
</style>