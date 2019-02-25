<template>
  <div class="colorPicker">
    <div class="head-box flex-c">
      <h5 class="flex-item item active">纯色背景</h5>
      <h5 class="flex-item item" @click="fileClick()">图片背景</h5>
    </div>
    <div class="main-box">
      <div class="head  ">
        <el-color-picker v-model="selectColor" ></el-color-picker>
        <h5 v-model="selectColor">{{selectColor}}</h5>
      </div>
      <div class="bottom-box  scrollbar">
        <h5 class=" title">标准颜色</h5>
        <ul>
          <li class="col-lg-1 col-xs-3" v-for="(item,index) in standColor">
            <span class="item" :style="{'background-color':item}" @click="selectColor=item"></span>
          </li>
        </ul>
        <h5 class="title">主题颜色</h5>
        <ul v-for="(itemlist,index) in themeColor" class="col-lg-1 col-xs-3">
          <li v-for="(item,index2) in itemlist">
            <span class="item" :style="{'background-color':item}" @click="selectColor=item"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from '../../../assets/bus';
  export default {
    name: 'colorPicker',
    components: {},
    data() {
      return {
        selectColor: '#409EFF',
        standColor: [
          "rgb(0, 0, 0)",
          "rgb(255, 255, 255)",
          "rgb(194, 20, 1)",
          "rgb(255, 30, 2)",
          "rgb(255, 193, 42)",
          "rgb(255, 255, 58)",
          "rgb(144, 207, 91)",
          "rgb(0, 175, 87)",
          "rgb(0, 175, 238)",
          "rgb(0, 113, 190)",
          "rgb(0, 33, 95)",
          "rgb(114, 52, 157)",
        ],
        themeColor: [
          [
            "rgb(242, 242, 242)",
            "rgb(219, 219, 219)",
            "rgb(196, 196, 196)",
            "rgb(173, 173, 173)",
            "rgb(150, 150, 150)",
          ],
          [
            "rgb(128, 128, 128)",
            "rgb(105, 105, 105)",
            "rgb(82, 82, 82)",
            "rgb(59, 59, 59)",
            "rgb(36, 36, 36)",
          ],
          [
            "rgb(221, 216, 195)",
            "rgb(182, 178, 159)",
            "rgb(143, 140, 123)",
            "rgb(105, 102, 87)",
            "rgb(66, 64, 51)",
          ],
          [
            "rgb(198, 217, 240)",
            "rgb(161, 180, 204)",
            "rgb(124, 144, 168)",
            "rgb(87, 108, 132)",
            "rgb(50, 72, 96)",
          ],
          [
            "rgb(218, 229, 240)",
            "rgb(181, 195, 210)",
            "rgb(144, 162, 181)",
            "rgb(108, 129, 152)",
            "rgb(71, 96, 123)",
          ],
          [
            "rgb(242, 219, 219)",
            "rgb(213, 182, 182)",
            "rgb(184, 146, 145)",
            "rgb(156, 110, 108)",
            "rgb(127, 74, 71)",
          ],
          [
            "rgb(234, 241, 222)",
            "rgb(202, 212, 186)",
            "rgb(171, 183, 150)",
            "rgb(139, 154, 115)",
            "rgb(108, 125, 79)",
          ],
          [
            "rgb(230, 224, 236)",
            "rgb(196, 189, 204)",
            "rgb(163, 154, 173)",
            "rgb(129, 119, 142)",
            "rgb(96, 84, 111)",
          ],
          [
            "rgb(217, 238, 243)",
            "rgb(179, 208, 215)",
            "rgb(142, 178, 187)",
            "rgb(104, 148, 159)",
            "rgb(67, 118, 131)",
          ],

          [
            "rgb(254, 233, 218)",
            "rgb(233, 201, 177)",
            "rgb(213, 169, 136)",
            "rgb(193, 137, 96)",
            "rgb(173, 105, 55)",
          ],
        ],
        mainBgStatus:{
          color:"",
          type:false,
        }
      }
    },
    props: {},
    created() {

    },
    methods: {
      fileClick() {
        document.getElementById('upload_file2').click();
        
      },
    },
    mounted() {

    },
    computed: { },
    watch:{
      selectColor:function(){
        var that=this;
        //  this.$emit("selectColor",this.selectColor);
        // that.$store.state.selectColor=that.selectColor;
        // const data={
        //   type:false,
        //   url:"",
        //   defaultUrl:"",
        //   newUrl:"",
        //   selectColor:that.selectColor,
        // }
        // that.$store.commit('setMainImgState',data)

        that.mainBgStatus={
          color:that.selectColor,
          type:true
        }
        that.$parent.$parent.$parent.mainBgStatus=that.mainBgStatus
        //提供吧东西变成字符串再变成对象可以暂时解决深拷贝的问题
        var data3={
          selectColor:that.selectColor,
        }
        var object2=Object.assign(
          JSON.parse( JSON.stringify(this.$store.state.mainImgState) ),data3);
        that.$store.commit('setMainImgState',object2);
 
      }
    }

  }
</script>
<style>
.colorPicker .el-color-picker{
height: auto;
width: 100%
}
.colorPicker .el-color-picker__trigger{
 width: 100%
}
.colorPicker .el-color-picker__trigger{
    border-radius: 0px;
    border: 0px;
    height: 100px;
    box-sizing: border-box;
}
.colorPicker .el-color-picker__icon{
  top: -28px;
}
.colorPicker .el-color-picker__color{
  border: 0px;
  height: 100%;
  
}

</style>
<style scoped lang="less">
  .main-box li {
    padding: 0px 0rem;
  }
  .main-box ul{
    padding: 0px 0rem;
  }
  .main-box .item {
    height: 50px;
    width: 50px;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    position: relative;
  }
.main-box .head{
  margin: 10px 0rem;
  //border: 1px solid #bfcbd9;
    padding-right: 10px;
}
.head-box .active{
   color: #333;
   font-weight: 600;
}
.head-box  .item{
  padding: 10px 0rem;
  cursor: pointer;
}
  .main-box .item:hover {
    -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, .4);
    box-shadow: 0 0 5px rgba(0, 0, 0, .4);
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }
  .main-box .bottom-box  .title{
    text-align: left;
    margin-bottom: 10px;
  }
  .main-box .bottom-box {
    max-height: 320px;
  }
</style>