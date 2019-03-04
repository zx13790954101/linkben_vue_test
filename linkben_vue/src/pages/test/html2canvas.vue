<template>
    <div class="html2canvas">
       <div class="img-r"  id="img1">
         <img src="../../../static/images/img3.jpg" >
       </div>
       <!-- 关键的地方是加了downimg -->
       <a class="down2 button" id="down2" href=""  download="downImg">
       下载
       </a>
       <button class="" @click="downFun">下载</button>
       <div class="img-r" >
          <img :src="dataURL" id="img2" >
        </div>
    </div>
  </template>
  
  <script>
    import html2canvas from 'html2canvas'
    export default {
      name: 'html2canvas',
      data() {
        return {
          dataURL:"",
        }
      },
      created() {
  
      },
      mounted() {
      },
      methods: {
        downFun(){
          debugger;
          var that=this;
        var dom=document.querySelector('#img1');
        var canvas2 = document.createElement("canvas");
        var w = parseInt(window.getComputedStyle(dom).width);
        var h = parseInt(window.getComputedStyle(dom).height);
        //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
        canvas2.width = w * 2;
        canvas2.height = h * 2;
        canvas2.style.width = w + "px";
        canvas2.style.height = h + "px";
        html2canvas(dom,{ 
           allowTanit:true,
           tainTest:true,
           useCORS:true
         }).then(function (canvas) {
          //document.body.appendChild(canvas);
          //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
          let dataURL = canvas.toDataURL();
          that.dataURL = dataURL;
          document.querySelector('#down2').setAttribute('href', canvas.toDataURL())
        });
        }
      },
      watch: {},
  
    }
  </script>
<style scoped lang="less">

  </style>