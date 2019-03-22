<template>
    <div class="container">
      <div class="player">
        <video-player  class="video-player vjs-custom-skin"
                       ref="videoPlayer"
                       :playsinline="true"
                       :options="playerOptions"
                       @play="onPlayerPlay($event)"
                       @pause="onPlayerPause($event)"
                       @loadeddata="onPlayerLoadeddata($event)"
                       @timeupdate="onPlayerTimeupdate($event)"

        >
        </video-player>


        <button @click="volume">play</button>

        <h1>
          {{videoTime}}
        </h1>
        <h1>
          {{thisTime}}
        </h1>
      </div>
    </div>
  </template>
   
  <script>
  import { videoPlayer } from 'vue-video-player';
  export default {
    name: 'videoPlayer2',
    data () {
      return {
        playerOptions: {
  //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",
            src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //你的视频地址（必填）
          }],
          volume:'0.2',
          poster: "poster.jpg", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          //bar的控制
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
            remainingTimeDisplay: false,//倒计时的时间
            currentTimeDisplay: false,
            volumePanel:true,
            fullscreenToggle: false  //全屏按钮
          }
        },
        videoTime:0,
        thisTime:0
      }
    },
    components: {
      videoPlayer
    },
    mounted() { 
      
         console.log("player",this.$refs.videoPlayer.player.volume())
    },
    methods: {
      volume(){
         this.$refs.videoPlayer.player.volume(0.5);
         console.log("player",this.$refs.videoPlayer.player.volume())
      },
      play(){
        this.playerOptions.autoplay=true
      },
      //更新时间
      onPlayerTimeupdate(player){
        // this.videoTime=player.cache.duration
        var time=player.cache_.currentTime;
        this.videoTime=(player.cache_.duration-player.cache_.currentTime);
        this.countTime(this.videoTime);
        console.log("update", this.videoTime);
      },
      onPlayerLoadeddata(player){
         this.videoTime=player.cache_.duration
         this.countTime(this.videoTime);
      },
      onPlayerPlay(player) {
      },
      onPlayerPause(player){
      },
      countTime(time){
       
           if(time>60.5){
              const num=parseInt(time/60);
              var  data2=Math.round(time%60)
              if(data2<10) data2="0"+data2;
              if(num<10){
                 this.thisTime='0'+num+':'+data2;
              }else{
                 this.thisTime=num+':'+data2;
              }
            }else{
                var data2=Math.round(time);
                if(data2<10) data2="0"+data2;
                if(time>=59.6){
                  this.thisTime='01'+':00'
                }else{
                  this.thisTime='00'+':'+data2;
                }
            }

      },
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    }
  }
  </script>
   
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style type="text/css" scoped>
    .container {
      background-color: #efefef;
      min-height: 100%;
    }
  </style>