<template>
    <div id="app">

      <!-- <defaultVideo></defaultVideo> -->
        <videoPlayer2></videoPlayer2>
    </div>
  </template>
  
  <script>
    import touchkit from "./Touchkit.vue"
    import test1 from "./Test1.vue"
    import videoPlayer2 from "./videoPlayer2.vue"
    import defaultVideo from "./DefaultVideo.vue"
    
    export default {
      name: 'home',
      components: {
        touchkit,test1,videoPlayer2,defaultVideo
      },
      data: function () {
        return {
  
        }
      },
    }
  </script>
  <style lang="less" scoped>
  </style>