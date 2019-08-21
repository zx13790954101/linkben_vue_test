<template>
  <div class="lzsLoading wrapper" v-if="lsLoading">
      <div class="img-r">
        <img class="" src="../../../static/loading2.gif">
      </div>
  </div>
</template>

<script>
  export default {
    name: 'lzsLoading',
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadingState()
    })
  },
  methods: {
    loadingState() {
      var that = this;
      if (document.readyState === 'complete') {
        that.isLoading = false;
        return;    
      }
      document.onreadystatechange = () => {
        const _readyState = document.readyState
        if (_readyState === 'complete' || _readyState === 'loaded') {
          that.isLoading = false
        }
      }
    }
  }
  }
</script>

<style scoped lang="less">
  .lzsLoading{
    position:fixed;
    height: 100vh;
    width: 100vw;
    z-index: 999;
    top: 0px;
    left: 0px;
    background-color: white;
    .img-r{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200px;
      height: auto;
      transform: translate(-50%, -50%);
    }

  }
</style>
