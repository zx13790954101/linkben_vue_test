<template>
  <div class="car-box">
    <p>火车正晚点的查询</p>
    <div class="flex-c">
      <input type="text" name="" id="" class="content car-name" placeholder="车站的名字" value=""  v-model="carname"/>
    </div>
    <div class="flex-c">
      <input type="text" name="" id="" class="content car-number" placeholder="车的号码" value=""  v-model="carnumber"/>
    </div>
    <div>
        <p v-html="mainContent">{{mainContent}}</p>
    </div>
    <button type="button" @click="queryCarMsg">查询</button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios';
  export default {
    name: 'carQuery',
    components: {},
    data() {
      return {
        title: '首页',
        carname: "",
        carnumber: '',
        mainContent:"",
      }
    },
    methods: {
      queryCarMsg() {
        var that = this;
        var car_name = that.carname
        var car_number = that.carnumber;
        var d = new Date();
        var n = d.getFullYear();
        var m = d.getMonth();
        var r = d.getDate();
        var htmlDate = n + "-" + m + '-' + r;
        var czEn = encodeURI(car_name).replace(/%/g, '-');
        //var czEn = encodeGb2313(car_name).replace(/%/g, '-');

        var html_url = globalPath+'/mapping/kfxt/zwdcx/LCZWD/cx.jsp?' +
          'cz=' + car_name +
          '&cc=' + car_number +
          '&cxlx=0' +
          '&rq=' + htmlDate +
          '&czEn=' + czEn;
          axios.post(html_url).then((response) => {
          console.log(response);
          that.mainContent=response.data;
        }).catch((response) => {
          console.log(response);
        });

      },
    },
    mounted() {

    },
    computed: {

    },
    created() {

    }
  }

</script>

<style>
  .mint-popup-2 {
    width: 100%;
    height: 50px;
    text-align: center;
    background-color: rgba(0, 0, 0, .7);
    backface-visibility: hidden;
  }

  .mint-popup-2 p {
    line-height: 50px;
    color: #fff;
  }

  #app {
    overflow: hidden;
  }

</style>
