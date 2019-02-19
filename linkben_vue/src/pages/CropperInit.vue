<template>
    <div class="wrapper">
 
    </div>
  </template>
  <script>
    import Cropper from 'cropperjs';
    export default {
      name: 'cropperInit',
  
      data () {
        return {
          //裁剪组件的基础配置option
          option: {
            img: '', //裁剪图片的地址
            info: true, //裁剪框的大小信息
            outputSize: 1, // 裁剪生成图片的质量
            outputType: 'png', //裁剪生成图片的格式
            canScale: false, // 图片是否允许滚轮缩放
            autoCrop: true, // 是否默认生成截图框
            autoCropWidth: 195, // 默认生成截图框宽度
            autoCropHeight: 10, // 默认生成截图框高度
            fixed: false, //是否开启截图框宽高固定比例
            fixedNumber: [1, 1] //截图框的宽高比例
          },
          isShowCropper: false //是否显示截图框
        }
      },
  
      components: {
        Cropper
      },
  
      methods: {
        getFile (e) {
          let _this = this
          var files = e.target.files[0]
          if (!e || !window.FileReader) return // 看支持不支持FileReader
          let reader = new FileReader()
          reader.readAsDataURL(files)
          reader.onloadend = function () {
            _this.isShowCropper = true
            _this.option.img = this.result
            _this.$refs.file.value = ''
          }
        },
  
        // 确定裁剪图片
        onCubeImg () {
          this.$refs.cropper.getCropData((data) => {
            this.isShowCropper = false
            //console.log("压缩前的图片大小：" + data.length)
            let img = new Image(),
              _this = this
            img.src = data
            img.onload = function() {
              //let _data = _this.compress(img)
              let blob = _this.dataURItoBlob(data)
  
              let formData = new FormData()
              formData.append("icon", blob)
              //console.log("将blob对象转成formData对象：" + formData.get("icon"))
              _this.$emit('cropped', data, formData)
            }
          })
        },
  
        // 压缩图片 
        compress(img) {
          let canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            initSize = img.src.length,
            width = img.width,
            height = img.height;
          canvas.width = width
          canvas.height = height
          // 铺底色 
          ctx.fillStyle = "#fff"
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, width, height)
          //进行压缩 
          let ndata = canvas.toDataURL("image/jpeg", 0.8)
          //console.log("压缩后的图片大小：" + ndata.length)
          return ndata
        }, 
        // base64转成bolb对象 
        dataURItoBlob(base64Data) { 
          let byteString
          if (base64Data.split(",")[0].indexOf("base64") >= 0) 
            byteString = atob(base64Data.split(",")[1])
          else 
            byteString = unescape(base64Data.split(",")[1])
          let mimeString = base64Data .split(",")[0] .split(":")[1] .split(";")[0]; 
          let ia = new Uint8Array(byteString.length); 
          for (let i = 0; i < byteString.length; i++) { 
              ia[i] = byteString.charCodeAt(i); 
          } 
          return new Blob([ia], { type: mimeString })
        },
  
        // 初始化配置文件
        initOptions () {
          this.isShowCropper = false
          if (this.cropperOption) {
            for (let key in this.option) {
              this.option[key] = this.cropperOption[key] || this.option[key]
            }
          }
        }
      },
  
      created () {
        this.initOptions()
      }
    }
  </script>
  <style scoped >
   
  
  </style>