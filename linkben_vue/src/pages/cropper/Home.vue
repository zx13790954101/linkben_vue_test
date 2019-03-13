<template>
    <div id="app">
        <touchkit></touchkit>
        <touchkit></touchkit>
    </div>
  </template>
  
  <script>
    import touchkit from "./Touchkit.vue"
    export default {
      name: 'home',
      components: {
        touchkit,
      },
      data: function () {
        return {
  
        }
      },
    }
  </script>
  <style lang="less" scoped>
  </style>