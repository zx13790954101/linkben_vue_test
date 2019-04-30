<template>
    <div id="app">

     <aliplayer3></aliplayer3> 
        <!-- <dragdiv></dragdiv> -->
    </div>
  </template>
  
  <script>
    import touchkit from "./Touchkit.vue"
    import test1 from "./Test1.vue"
    import videoPlayer2 from "./videoPlayer2.vue"
    import defaultVideo from "./DefaultVideo.vue"
    import aliplayer3 from "./Aliplayer3.vue"
    import aliplayer1 from "./Aliplayer1.vue"
    import dragdiv from "./dragdiv.vue"
    export default {
      name: 'home',
      components: {
        touchkit,test1,videoPlayer2,defaultVideo,dragdiv,aliplayer3,aliplayer1
      },
      data: function () {
        return {
  
        }
      },
    }
  </script>
  <style lang="less">


  </style>