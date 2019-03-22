<template>
  <div class="defaultVideo">
    <h1 @click="paly">defaultVideo</h1>
    <h1 @click="pause">paused</h1>
    <div class="video-box">
        <video id="my-video"  class="video-js vjs-default-skin" controls preload="auto"  data-setup="{}">
            <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
              <source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm">
              <source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg">
                <p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to a web browser that
                   <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a> </p>
          </video>
    </div>
 
  </div>
</template>


<script>
  import 'video.js/dist/video-js.css'
  import videojs from 'video.js'
  import 'videojs-contrib-hls'
  export default {
    name: 'defaultVideo',
    data() {
      return {
         video:"",
      };
    },
    mounted() { 
      this.initVideo();
    },
    methods: {
      paly(){
        this.video.play()
      },
      pause(){
      
        this.video.pause()
      },
     initVideo(){
             this.video=videojs('my-video', {
                bigPlayButton: false,
                textTrackDisplay: false,
                posterImage: true,
                errorDisplay: false,
                controlBar: true
            }, function () {
                this.play()
              
            })
          }


    }
  };
</script>
<style scoped  lang="less">
.video-js .vjs-tech{
  height: 100%;
    width: auto;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%); 
}


.video-box{
	width: 100%;
	height:auto;
	margin-left: auto;
	margin-right: auto;
	position:relative;
}
.video-js .vjs-play-progress:before{
	display:none;
}
.video-js .vjs-progress-holder{
	height:4px;
}
.video-js .vjs-play-progress{
	height:4px;
background:rgba(255,102,140,1);
}
#my-video{
	width:100%;
  height: 300px;
}
.video-js .vjs-control-bar{
	    background-color: rgba(43,51,63,0);
}
.video-js .vjs-fullscreen-control{
	display:none;
}
.video-js .vjs-volume-panel{
		      position: absolute;
    right: 20px;
    bottom: 72px;
    height: 30px;
}
.video-js .vjs-fullscreen-control{
	display:none;
}
.video-js .vjs-time-control{
	    margin-top: -36px;
    position: absolute;
    right: 20px;
}

.vjs-big-play-button{
	top:50% !important;
	left:50%  !important;
transform: translate(-50%,-50%);
}
.video-js .vjs-progress-control .vjs-progress-holder{
	margin:0px 0px;
}
.video-js .vjs-play-control{

}
.vjs-paused.vjs-button>.vjs-icon-placeholder:before{
	    font-size: 5.8em;
 }   
 .video-js .vjs-playing {
	 display:none;
 }
.video-js .vjs-paused {
   position: absolute;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%,-250px);
}
.video-js .vjs-control-bar{
	height:auto
}

</style>

<!-- <style scoped lang="less">
  
</style> -->