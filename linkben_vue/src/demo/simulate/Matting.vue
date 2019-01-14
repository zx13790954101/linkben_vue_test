<template>
  <div class="matting-box">
    <div type="text" @click="dialogTableVisible = true" class="flex-y-c wrap">
      <i class="iconfont icon-762bianjiqi_jietu"></i>
      <h5>抠图与剪截</h5>
    </div>
    <!-- 弹出框的div -->
    <el-dialog title="图片处理" width="100%" :visible.sync="dialogTableVisible">
      <div class="matting-dialog">
        <iframe src='http://www.aigei.com/bgremover/'></iframe>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "matting",
    data() {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
      }
    },
    created() {
      // this.getURL(urlsrc)
    },
    methods: {
      getURL(url) {}
    }
  }

</script>
<style>
  .matting-box .el-button--text span {
    color: white;
  }

  .matting-box .el-dialog--small {
    width: 90%;
  }

  iframe html {
    overflow: hidden;
  }

</style>

<style scoped>
  .matting-box {
    position: relative;
    text-align: center;
    bottom: 0px;
    color: white;

  }

  .matting-box .wrap {
    width: 100%;
    padding: 20px 0px;
    min-width: auto;
    line-height: 3rem;
    background-color: #5f5f5f;
  }

  .matting-box .wrap i {
    font-size: 3rem;
    padding-bottom: 15px;
    margin-bottom: 15px;
  }

  .matting-dialog {
    width: 100%;
    height: 60vh;
  }

  iframe html {
    overflow: hidden;
  }

</style>
