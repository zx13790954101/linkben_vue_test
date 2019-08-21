<template>
  <div class="homePopup flex-c">
      <!-- <el-dialog  title=""  :visible.sync="dialogVisible" width="90%" > -->
        <div class="content  row">
            <div class="col-lg-6  ">
              <div class="item flex-c">
                  <i class="iconfont icon-ic_sq_zjz"></i>
              </div>
            </div>
            <div class="col-lg-6 ">
                <div class="item flex-c">
                <i class="iconfont icon-beijing"></i>
              </div>
            </div>
        </div>
        <!-- <div slot="footer" class="dialog-footer  center">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog> -->
  </div>
</template>

<script>
  export default {
    name: 'homePopup',
    data() {
      return {
        title: '首页的功能选择',
        screenWidth: document.documentElement.clientWidth,
        active: 0,
        dialogVisible:true
      }
    },
    props: {
      imgStyleStatus: {}
    },
    created() {
    },
    methods: {

    },
    mounted() {

    },
    computed: {

    },

  }
</script>
<style>
.el-dialog__header {
  display: flex;
  align-items: center;
  padding: 0px;
}
.el-dialog__headerbtn{
  right: 5px;
  top:0px;
  min-width: auto;
}
.el-dialog__headerbtn .el-dialog__close{
  font-size: 2rem;
  font-weight: 600;
}
.el-dialog__body{
  padding: 20px;
  padding-bottom: 0px;
}
.el-dialog{

}
</style>
<style scoped lang="less">
.homePopup{
  width: 100vw;
  height: 100vh;
  .content{
    height: auto;
    width: 100%;
  }
  .item{
    text-align: center;
    min-height:250px;
    .iconfont{
      font-size: 6rem;
      margin:0 auto;
      color: white;
    }
  }
  .col-lg-6{
    padding: 0px 0px;
  }
  .col-lg-6:nth-of-type(1) .item{
    background: linear-gradient(to left, #CDDC39, #FFEB3B);
  }
  .col-lg-6:nth-of-type(2) .item{
    background: linear-gradient(to left, #03A9F4, #00BCD4);
  }

}   

</style>
