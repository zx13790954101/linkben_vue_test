<template>
  <div class="colorBgSize">
    <ul class=" scrollY">
      <li class="col-lg-2" v-for="(item,index) in dataList">
        <span :class="{active:index==active}" class="item-box flex-c flex-c-y" :style="{'width':item.width,'height':item.height}"
          @click="selectSize(item.num,index)">
          {{item.content}}
        </span>
      </li>
    </ul>
    <div class="tab-nav flex-c">
      <i class="iconfont icon-dacha center col-lg-2" @click="back"></i>
      <h5 class="flex-item center">调整尺寸</h5>
      <i class="iconfont icon-dagou center col-lg-2"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'colorBgSize',
    data() {
      return {
        title: '移动端的底部的颜色背景截取',
        active: 1, //判断是tab的选择事件
        dataList: [{
            content: '一寸',
            height: '32px',
            width: '22.85px',
            num: 2.5/3.5,
          },
          {
            content: '二寸',
            height: '32px',
            width: '22.85px',
            num: 3.5 / 4.9,
          },
          {
            content: '大1寸',
            height: '32px',
            width: '22.00px',
            num: 3.3 / 4.8,
          },
          {
            content: '五寸',
            height: 'x32px',
            width: '45.66px',
            num: 12.7 / 8.9,
          },
          {
            content: '六寸',
            height: '32px',
            width: '47.68px',
            num: 15.2 / 10.2,
          },
          {
            content: '七寸',
            height: '32px',
            width: '44.85px',
            num: 17.8 / 12.7,
          },
          {
            content: '八寸',
            height: '32px',
            width: '42.66px',
            num: 8 / 6,
          },
          {
            content: '十寸',
            height: '32px',
            width: '40px',
            num: 10 / 8,
          },
          {
            content: '十二寸',
            height: '32px',
            width: '26.66px',
            num: 10 / 12,
          }
        ],
      }
    },
    props: {},
    created() {

    },
    methods: {
      //关闭上面的按钮
      back() {
        var that = this;
        that.$emit("cutOutRotateEmit", 0);
      },
      selectSize(num, index) {
        var dom = $(document.querySelector('#main-bg'))
        var that = this;
        if (num >= 1) {
          that.$parent.$parent.$parent.mainBgStatus.width = "100%";
          setTimeout(function(){
            var num2 = parseInt(dom.width());
            that.$parent.$parent.$parent.mainBgStatus.height = num2 / num + 'px';
          },100)
        
        } else {
          that.$parent.$parent.$parent.mainBgStatus.height = "80%";
          setTimeout(function(){
            debugger;
          var num2 = parseInt(dom.height());
          that.$parent.$parent.$parent.mainBgStatus.width = num2 * num + 'px';
        },100)
        }


      },
    },
    mounted() {

    },
    computed: {

    },

  }
</script>
<style scoped lang="less">
  .colorBgSize {
    color: white;

    article.item {
      min-height: 84px;
      height: auto;
      -webkit-transition: all .4s ease-out 0s;
      transition: all .4s ease-out 0s;
    }

    .tab-nav {
      background-color: #272727;
      height: 40px;
      line-height: 40px;
      margin: 0px;
    }

    .tab-nav .flex-item {
      cursor: default;
    }

    li {
      padding: 0px 5px;
    }

    .item-box {
      width: 32px;
      height: 32px;
      border: 1px solid white;
      color: white;
      /* border-radius: 4px; */
    }

    .scrollY {
      overflow-y: hidden;
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      display: -webkit-box;
      vertical-align: middle;
      margin: 5px 0px;
    }

    .scrollY li {
      float: none;
      min-height: 32px;
      line-height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

  }
</style>
