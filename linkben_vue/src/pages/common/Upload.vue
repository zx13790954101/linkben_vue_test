<template>
  <div class="upload">
    <div class="upload-warp center" @click="fileClick">
       <i class="iconfont icon-buoumaotubiao47 position-a-center"></i>
       <h4 class="white position-a-bottom">添加图片</h4>
    </div>
    <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none" />
  </div>
</template>

<script>
  export default {
    name: 'upload',
    data() {
      return {
        imgList: [],
        imgArray: [],
        size: 0
      }
    },
    methods: {
      fileClick() {
        document.getElementById('upload_file').click()
      },
      fileChange(el) {
        if (!el.target.files[0].size) return;
        this.fileList(el.target);
        el.target.value = ''
      },
      fileList(fileList) {
        let files = fileList.files;

        for (let i = 0; i < files.length; i++) {
          //判断是否为文件夹
          if (files[i].type != '') {

            this.fileAdd(files[i]);
          } else {
            //文件夹处理
            this.folders(fileList.items[i]);
          }
        }
      },
      //文件夹处理
      folders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry();
        }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.foldersAdd(file[i]);
            } else {
              _this.folders(file[i]);
            }
          }
        })
      },
      foldersAdd(entry) {
        let _this = this;
        entry.file(function (file) {
          _this.fileAdd(file)
        })
      },
      fileAdd(file) {
        var that = this;
        //总大小
        this.size = this.size + file.size;
        //判断是否为图片文件
        if (file.type.indexOf('image') == -1) {
          file.src = 'wenjian.png';
          file.src = this.result;
          file.thumbImage = file.src;
          file.url = file.src;
          file.number = file.size;
          file.mainImage = file.src;
          file.checked = false;
          file.needNum = 1;
          this.imgList.push({
            file
          });
          that.imgArray.push(file);
          that.$emit('imgList', that.imgArray);
        } else {

          let reader = new FileReader();
          reader.vue = this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            debugger;
            file.src = this.result;
            file.thumbImage = file.src;
            file.url = file.src;
            file.number = file.size;
            file.mainImage = file.src;
            file.checked = false;
            file.needNum = 1;
            this.vue.imgList.push({
              file
            });
            that.imgArray.push(file);
            that.$emit('imgList', that.imgArray);
          }
        }
      },
      fileDel(index) {
        this.size = this.size - this.imgList[index].file.size; //总大小
        this.imgList.splice(index, 1);
        this.imgArray.splice(index, 1);
        this.$emit('imgList', this.imgArray);
        console.log("sss");
      },
      bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1000, // or 1024
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      dragenter(el) {
        el.stopPropagation();
        el.preventDefault();
      },
      dragover(el) {
        el.stopPropagation();
        el.preventDefault();
      },
      drop(el) {
        el.stopPropagation();
        el.preventDefault();
        this.fileList(el.dataTransfer);
      }
    },
    mounted() {},
    computed: {

    }
  }

</script>
<style>


  .upload-warp i {
    font-size: 50px;
    color: white;
  }

  .upload-warp {
    width: 100%;
    height: 110px;
    background: linear-gradient(to left,#3b9eff 0,#19c3ff 100%);
    min-height: 110px;
    cursor: pointer;
    border-radius: 4px;
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }


  .upload {
    width: auto;
    box-sizing: border-box;
    border-radius: 4px;
  }

</style>
