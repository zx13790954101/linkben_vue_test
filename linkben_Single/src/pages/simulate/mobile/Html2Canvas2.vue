<template>
    <div class="html2canvas2">
        <h4>需要注意的是内容是默认不居中的</h4>
        <div class="content">
          <div class="canvasImg img-r">
            <img :src="endImg">
          </div>
        </div>
        <div class="button-array flex-c">
          <button class=""  @click="html2canvasType=false">取消</button>
          <button class=""  >点击下载 </button>
          <a class="down button" id="down3"  href="" download="downImg" >点击下载</a>
        </div>
    </div>
  </template>
  
  <script>
    import html2canvas from 'html2canvas'
    export default {
      name: 'html2canvas2',
      data() {

        r
        return {
          dataURL:"",
          endImg:"",
        }
      },
      created() {
  
      },
      mounted() {
        this.downFun();
      },
      methods: {
        downFun(){
          debugger;
        const that=this;
        var dom = document.querySelector('#main-view');
        // if (this.$parent.$parent.mainBgStatus.type) dom = document.querySelector('#main-view');
        // var canvas2 = document.createElement("canvas");
        // var w = parseInt(window.getComputedStyle(dom).width);
        // var h = parseInt(window.getComputedStyle(dom).height);
        // canvas2.width = w * 2;
        // canvas2.height = h * 2;
        // canvas2.style.width = w + "px";
        // canvas2.style.height = h + "px";
       // dom=$("#main-view")
        html2canvas(dom, {
          allowTanit: true,
          tainTest: true,
          // height: dom.height(),
          // width:dom.width(),
          useCORS: true,
          foreignObjectRendering: true
        //  / canvas:canvas2
        }).then(function (canvas) {
          //document.body.appendChild(canvas);
          //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
        
            setTimeout(function(){
              let dataURL = canvas.toDataURL("image/jpeg");
              that.endImg = dataURL;
              document.querySelector('#down3').setAttribute('href', canvas.toDataURL())
            },100)
         
       
        
        });
        }
      },
      watch: {},
  
    }
  </script>
<style scoped lang="less">

</style>