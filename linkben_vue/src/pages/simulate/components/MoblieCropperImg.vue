<template>
  <div class="moblieCropperImg">
      <ul class=" scrollY" >
          <li class="col-lg-2"   v-for="(item,index) in dataList"  >
              <span v-if="index==0" class="flex-c flex-c-y"  @click="selectSize(item.num,index)" >
                  <i class="iconfont icon-shouji-copy  h2" :style="{'color':(active==0?'#F44336':''),'font-size':'4rem'}"></i>
              </span>
              <span v-if="index!=0" :class="{active:index==active}" class="item-box flex-c flex-c-y" 
              :style="{'width':item.width,'height':item.height}"
                @click="selectSize(item.num,index)" >
                    {{item.content}}
              </span>
            </li>
        </ul>
        <div class="buuton-array row">
          <button class="left">重置</button>
          <button class="right">保存</button>
        </div>
  </div>
</template>
<script>
  export default {
    name: 'moblieCropperImg',
    data() {
      return {
        title: 'cropper的移动端的截图',
        active:null,
        dataList:[
            { 
              content:'',  height:'', width:'', num:'', 
            },
            {
              content:'1:1',height:'32px',width:'32px', num:1,
            },
            { content:'2:3', height:'', width:'21.33px',  num:2/3,
            },
            { content:'3:2', height:'21.33px', width:'', num:3/2,
            },
            {
              content:'3:4',height:'', width:'24px',num:3/4,
            },
            {
              content:'4:3', height:'24px', width:'', num:4/3,
            },
            {
              content:'9:16',height:'', width:'18px', num:9/16,
            },
            {
              content:'16:9', height:'18px',width:'', num:16/9,
            }
        ],
        //cropper第一次截图的状态
        cropperDefaultStatus:{
          croppedData:"",
          canvasData:"",
          cropBoxData:"",
        },
        croppable: false,
      }
    },
    props: {},
    created() {
    },
    methods: {
      //选择截取的图片的大小
      selectSize(num,num2) {
        const that=this;
        that.active=parseInt(num2);
        console.log("num",parseFloat(num));
      },
      //初始化截图工具
      initCropper(num){
        let number=1;
        if(num) number=num;
        const that=this;
        var image = document.getElementById("main-img");//首页的图片的对象结构
        that.cropper=new Cropper(image,{
          aspectRatio: number,  //设置截图的比例
          scalable:true,
          viewMode: 1,
          background: false,
          zoomable: true,
          ready: function() {
            self.croppable = true;
            if (this.croppedData) {
                  //获取原来的截图的位置
                  this.cropper
                    .crop()
                    .setData(this.cropperDefaultStatus.croppedData)
                    .setCanvasData(this.cropperDefaultStatus.canvasData)
                    .setCropBoxData(this.cropperDefaultStatus.cropBoxData);
                  this.cropperDefaultStatus.croppedData = null;
                  this.cropperDefaultStatus.canvasData = null;
                  this.cropperDefaultStatus.cropBoxData = null;
            }
          },
          zoomOnTouch:true, 
        })
      },
    },
    mounted() {

    },
    computed: {

    },

  }
</script>
<style scoped lang="less">
  .moblieCropperImg{
    .buuton-array { margin: 10px 0px; }
    li {padding: 0px 5px; }
    .item-box {
      width: 32px;
      height: 32px;
      border: 1px solid #9eabb3;
      border-radius: 4px;
    }

    .scrollY {
      overflow-y: hidden;
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      display: -webkit-box;
      vertical-align: middle;
    }
    .scrollY li{
        float: none;
        height: 38px;
        line-height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .active{
      color:#F44336;
      border: 1px solid #F44336;
    }
  }
</style>
