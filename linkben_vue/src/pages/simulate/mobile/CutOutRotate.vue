<template>
  <div class="cutOutRotate">
      <div class="tab-box">
            <article class="item" v-if="active==1">
                <moblieCropperImg></moblieCropperImg>
            </article>
            <article class="item" v-if="active==2">
              <el-slider v-model="lightNum" :min="0" :max="360"></el-slider>
              <div class="flex-c center" :style="{'margin':'10px auto'}">
                <span class="flex-item">
                  <button>重置</button>
                </span>
                <span class="flex-item">
                  <i class="iconfont icon-shunshizhenxuanzhuan"></i>
                </span>
                <span class="flex-item">
                  <i class="iconfont icon-nishizhenxuanzhuan"></i>
                </span>
                <div class="flex-item">
                  <i class="iconfont  icon-suofang-copy" ></i>
                </div>
                <span class="flex-item">
                  <i class=" iconfont icon-suofang-copy-copy"></i>
                </span>
              </div>
            </article>
          <div class="tab-nav flex-c">
            <i class="iconfont icon-dacha center col-lg-2" @click="back"></i>
            <div class=" h5 col-lg-8 flex-c " :style="{'text-align':'center'}">
              <span class="flex-item" @click="active=1" :style="{'color':(active==1?'rgb(255, 219, 5)':'')}">截取</span>
              <span class="flex-item" @click="active=2" :style="{'color':(active==2?'rgb(255, 219, 5)':'')}">旋转</span>
            </div>
            <i class="iconfont icon-dagou center col-lg-2"></i>
          </div>
        </div>
  </div>
</template>

<script>
  import moblieCropperImg from '../components/MoblieCropperImg.vue';
  export default {
    name: 'cutOutRotate',
    components: {moblieCropperImg},
    data() {
      return {
        title: '移动端的底部的旋转与截取',
        active:1,//判断是tab的选择事件
        rotateStatus:{
          num:0
        }
      }
    },
    props: {},
    created() {
     
    },
    methods: {
      //关闭上面的按钮
      back(){
        var that=this;
        that.active=0;
        that.$emit("cutOutRotateEmit",that.active);
      }
    },
    mounted() {

    },
    computed: {

    },

  }
</script>
<style scoped lang="less">
  .cutOutRotate{
       color: white;
       article.item {
        min-height: 84px;
        height: auto;
        -webkit-transition: all .4s ease-out 0s;
         transition: all .4s ease-out 0s;
      }
      .tab-nav{
        background-color: #272727;
      }
      .tab-nav .flex-item{
        cursor: default;
      }

  }
</style>
