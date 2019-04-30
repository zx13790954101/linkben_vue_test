<template>
  <div class0="Aliplayer2">

      <ali-player :source="视频url" :vid="视频vid" :playauth="播放鉴权" ref="player"></ali-player>
      <button @click="play">播放</button>
      <button @click="pause">暂停</button>
      <button @click="replay">重播</button>
      <button @click="reload">重载</button>
  </div>
</template>


<script>
  import VueAliplayer from 'vue-aliplayer'
  export default {
    name: 'Aliplayer2',
    data() {
      return {
        headerImage: "",
        urlImg: require('../../../static/to/1.jpg'),
      };
    },
    components: {
    'ali-player': VueAliplayer
     },
    mounted() {

    },
    methods: {
      play: function(){
        const player = this.$refs.player.instance
        player && player.play()
      },
      pause: function() {
        const player = this.$refs.player.instance
        player && player.pause()
      },
      replay: function() {
        const player = this.$refs.player.instance
        player && player.replay()
      },
      reload: function() {
        // 修改source地址后
        const player = this.$refs.player
        player && player.reloadPlayer()
      }
    }
  };
</script>

<style lang="less">

  .Aliplayer2{

  }
</style>