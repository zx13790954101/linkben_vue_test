<template>
  <div class="homePopup">


      <el-dialog  title=""  :visible.sync="dialogVisible" width="30%" >
        <div class="content flex-c">
            <div class="flex-item item">
                <div class="img-r act-img">
                   <img >
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
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
        dialogVisible:false
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

<style scoped lang="less">
.homePopup{

}

</style>
