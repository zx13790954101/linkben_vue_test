<template>
    <div class="upload">
      <div class="upload_warp">
        <div class="upload_warp_left" @click="fileClick">
            <!-- <img src="../../../static/images/upload/upload.png"> -->
            <i class="iconfont icon-buoumaotubiao47 position-a-center"></i>
        </div>
        <!-- <div class="upload_warp_right" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
          或者将文件拖到此处
        </div> -->
      </div>
      <!-- <div class="upload_warp_text">
        选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}
      </div> -->
      <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
      <!-- <div class="upload_warp_img" v-show="imgList.length!=0">
        <div class="upload_warp_img_div" v-for="(item,index) of imgList">
          <div class="upload_warp_img_div_top">
            <div class="upload_warp_img_div_text">
              {{item.file.name}}
            </div>
            <img src="../../../static/images/upload/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
          </div>
          <img :src="item.file.src">
        </div>
      </div> -->
    </div>
</template>

<script>

export default {
  name: 'upload',
  data () {
    return {
        imgList:[],
        imgArray:[],
        size: 0
    }
  },
  methods : {
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
              var that=this;
              //总大小
              this.size = this.size + file.size;
              //判断是否为图片文件
              if (file.type.indexOf('image') == -1) {
                  file.src = 'wenjian.png';
                    file.src = this.result;
                    file.thumbImage=file.src;
                    file.url=file.src;
                    file.number=file.size;
                    file.mainImage=file.src;
                    file.checked = false;
                    file.needNum = 1;
                  this.imgList.push({
                      file
                  });
                  that.imgArray.push(file);
                  that.$emit('imgList',that.imgArray);
              } else {
               
                  let reader = new FileReader();
                  reader.vue = this;
                  reader.readAsDataURL(file);
                  reader.onload = function () {
                       debugger;
                      file.src = this.result;
                      file.thumbImage=file.src;
                      file.url=file.src;
                      file.number=file.size;
                      file.mainImage=file.src;
                      file.checked = false;
                      file.needNum = 1;
                      this.vue.imgList.push({
                          file
                      });
                      that.imgArray.push(file);
                      that.$emit('imgList',that.imgArray);
                  }
              }
          },
          fileDel(index) {
              this.size = this.size - this.imgList[index].file.size;//总大小
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
  mounted () {
  },
  computed: {
    
  }
}
</script>
 .upload_warp_img_div_del {
      position: absolute;
      top: 6px;
      width: 16px;
      right: 4px;
    }

    .upload_warp_img_div_top {
      position: absolute;
      top: 0;
      width: 100%;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.4);
      line-height: 30px;
      text-align: left;
      color: #fff;
      font-size: 12px;
      text-indent: 4px;
    }

    .upload_warp_img_div_text {
      white-space: nowrap;
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .upload_warp_img_div img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }

    .upload_warp_img_div {
      position: relative;
      height: 100px;
      width: 120px;
      border: 1px solid #ccc;
      margin: 0px 30px 10px 0px;
      float: left;
      line-height: 100px;
      display: table-cell;
      text-align: center;
      background-color: #eee;
      cursor: pointer;
    }

    .upload_warp_img {
      border-top: 1px solid #D2D2D2;
      padding: 14px 0 0 14px;
      overflow: hidden
    }

    .upload_warp_text {
      text-align: left;
      margin-bottom: 10px;
      padding-top: 10px;
      text-indent: 14px;
      border-top: 1px solid #ccc;
      font-size: 14px;
    }

 
    .upload_warp_left i {
       font-size: 50px;
    }

    .upload_warp_left {
      width: 100%;
      height: 100%;
      border: 1px dashed #999;
      cursor: pointer;
      position: relative;
    }

    .upload_warp {
       height: 100px;
    }

    .upload {
      background-color: #fff;
      width: auto;
      box-sizing: border-box;
      border-radius: 4px;
    }
</style>
