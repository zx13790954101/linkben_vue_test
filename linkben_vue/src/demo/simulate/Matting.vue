<template>
    <div class="matting-box">
        <el-button type="text" @click="dialogTableVisible = true">抠图</el-button>
        <!-- 弹出框的div -->
        <el-dialog title="图片处理"  width="100%" :visible.sync="dialogTableVisible" >
            <div class="matting-dialog">
                  <iframe src='http://www.aigei.com/bgremover/'></iframe>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name:"matting",
//   data: {
//     details: {},
//     url: '',
//     urlsrc: 'https://www.gaoding.com/clip?id=19256635',
//   },
  data (){
    return {
        dialogTableVisible: false,
        dialogFormVisible: false,
    }
  },
  created() {
    // this.getURL(urlsrc)
  },
  methods: {
    getURL(url) {
    //   let http = window.location.protocol === 'http:' ? 'http:' : 'https:'
    //   let realurl = http + '//cors-anywhere.herokuapp.com/' + url
    //   let that = this
    //   $.ajax({
    //     type: 'get',
    //     url: realurl,
    //     success: function(res) {
    //       if (res) {
    //         let data = res
    //         data = data.replace(/data-src/g, 'src')
    //         let htmlSrc = 'data:text/html;charset=utf-8,' + data // 解析码解决乱码
    //         that.url = htmlSrc
    //       }
    //     },
    //     error: function(err) {
    //       console.log(err)
    //       Toast('好像出错了...')
    //     }
    //   })
      //            axios.get(realurl).then(res=>{
      //                console.log(res);
      //            },rej=>{
      //                let data = rej.data;
      //                data=data.replace(/data-src/g, "src");
      //                let html_src = 'data:text/html;charset=utf-8,' + data; //解析码解决乱码
      //                this.url = html_src;
      //            })
    }
  }
}
</script>
<style>
.matting-box .el-button--text span{
    color: white;
}
.matting-box .el-dialog--small{
    width: 90%;
}
 iframe html{
    overflow: hidden;
}

</style>

<style scoped>
.matting-box{
    position: relative;
    text-align: center;
    bottom: 0px;
    color: white;
        background-color: #20a0ff;
    border-color: #20a0ff;
    -webkit-box-shadow: -1px 0 0 0 #20a0ff;
    box-shadow: -1px 0 0 0 #20a0ff;
    width: 100%;
}
.matting-dialog{
    width:100%;
    height: 60vh;
}
 iframe html{
    overflow: hidden;
}

</style>