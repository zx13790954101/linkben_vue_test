<template>
    <div id="app">

      <!-- <defaultVideo></defaultVideo> -->
        <dragdiv></dragdiv>
    </div>
  </template>
  
  <script>
    import touchkit from "./Touchkit.vue"
    import test1 from "./Test1.vue"
    import videoPlayer2 from "./videoPlayer2.vue"
    import defaultVideo from "./DefaultVideo.vue"
    import dragdiv from "./dragdiv.vue"
    export default {
      name: 'home',
      components: {
        touchkit,test1,videoPlayer2,defaultVideo,dragdiv
      },
      data: function () {
        return {
  
        }
      },
    }
  </script>
  <style lang="less">


  </style>