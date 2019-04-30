<template>
    <div class="defaultVideo">
      <div class="video-box">
          <video id="my-video" controls  autoplay="autoplay" class="video-js vjs-default-skin"  preload="auto"  data-setup="{}"  ref="videoPlayer"
    playsinline="true"  
          
          >
              <source :src="src1" type="video/mp4"  id="source1">
            </video>
            <div class="playBtn_box" >
              <img @click="fPlayBtn"  class="playBtn"  >
            </div>
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
           video2:"",
           type2:false,
           imgType:true,
           src1:"http://vjs.zencdn.net/v/oceans.mp4",
           poster:"http://hxsupload.oss-cn-hangzhou.aliyuncs.com/2019-03-25/ce4a2773c1987bf5260cffd76d7a5037.jpg"
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
        fPlayBtn(){
         var that=this;
          this.imgType=false;
        
          this.video.play();
        
          $("#my-video")[0].click()
          $("#my-video_html5_api")[0].click();
        //   var event = new Event('touchstart');
        //   var bot = document.getElementById('my-video');
        //  bot.addEventListener('touchstart', function () {
        //   that.video.play();
        
        //    $("#my-video")[0].click()
        //     $("#my-video_html5_api")[0].click();
        //  });
      
        //  this.creatTouchstartEventAndDispatch(bot);
        },
        creatTouchstartEventAndDispatch (el) {
          var event = document.createEvent('Events');
          event.initEvent('touchstart', true, true);
            el.dispatchEvent(event);
        },
      
       initVideo(){
         var that=this;
            $("#source1").attr("src",this.src1);
              $("#my-video").attr("poster",this.poster);
            
               this.video=videojs('my-video', {
                  bigPlayButton: false,
                  textTrackDisplay: false,
                  posterImage: true,
                  errorDisplay: false,
                  controlBar: true
              }, function () {
                  this.play();
              
                  setTimeout(function(){
                      $("#paly1").click();
                      that.fPlayBtn();
                      $("#my-video_html5_api").click()
                  },2000)
              
              })
          
            }
  
  
      }
    };
  </script>
  <style  >
    .video-js{
      width: 100% !important;
      height: 375px !important;
    }
  
    .vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar{
      opacity: 1 !important;
    }
    .video-js .vjs-progress-control .vjs-progress-holder{
      margin: 0px 0px !important;
    }
  .defaultVideo {
    height: 375px;
  }
  .defaultVideo .playBtn_box{
    position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
      height: 80px;
      height: 100%;
      width: 100%;
      background-color: #0000002e;
  }
  .defaultVideo .playBtn{
    position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      height: 60px;
      width: auto;
  }
  
  
  .defaultVideo .vjs-paused.vjs-button > .vjs-icon-placeholder:before {
    font-size: 5.8em;
    padding-top: 130px;
  }
  .defaultVideo .vjs-custom-skin > .video-js{
  height: 100%;
    /* width: auto; */
  }
  .defaultVideo .vjs-custom-skin > .video-js .vjs-big-play-button{
     display: none;
  }
  .defaultVideo .playBox{
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  width: 70%;
  height: 70%;
  justify-content: center;
  align-items: center;
  z-index: 99;
  
  }
  .video-js .vjs-tech{
  height: auto !important;
    width: 100% !important;
    margin: 0 auto;
    top: 50% !important;
  left: 50% !important;
  transform: translate(-50%,-50%) !important;
  }
  
    .vjs-poster{
  background-size: cover;
  }
  .video-box{
  width: 100%;
  height:auto;
  margin-left: auto;
  margin-right: auto;
  position:relative;
  }
  .defaultVideo .video-js .vjs-play-progress:before{
  display:none;
  }
  .defaultVideo .video-js .vjs-progress-holder{
  height:4px;
  }
  .video-js .vjs-mute-control .vjs-icon-placeholder:before, .vjs-icon-volume-high:before{
    content: "" !important;
  }
  .vjs-custom-skin>.video-js .vjs-play-progress, .vjs-custom-skin>.video-js .vjs-volume-level{
    background:rgba(255,102,140,1);
  }
   .video-js .vjs-play-progress{
  height:4px;
  background:rgba(255,102,140,1) !important;
  }
   .video-player{
  width:100%;
  height: 375px;
  background-color: black;
      display: flex;
      align-items: center;
  }
  .video-js .vjs-control-bar{
      background-color: rgba(43,51,63,0)!important;
  }
  .video-js .vjs-fullscreen-control{
  display:none;
  }
  .video-js .vjs-volume-panel{
  position: absolute !important;
  right: 5px;
  bottom: 45px;
      padding-left: 4px !important;
      height: 30px !important;
  }
   .video-js .vjs-fullscreen-control{
  display:none !important;
  }
  .video-js .vjs-time-control{
    margin-top: -45px !important;
      position: absolute !important;
      right: 15px !important;
   
      overflow: hidden;
      height: 30px !important;
      width: 38px !important;
  }
  .vjs-icon-volume-high:before, .video-js .vjs-mute-control .vjs-icon-placeholder:before{
  content: "";
  }
  .vjs-icon-volume-mute:before, .video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder:before{
  content: "";
  }
   .vjs-vol-1,  .vjs-vol-2,.vjs-vol-3{
    /* background-image: url("../../../src/assets/video/colume2.png") !important; */
  background-position:50% 50%;background-size:cover;background-repeat:no-repeat !important;
  background-size: 60% !important;
  }
   .vjs-vol-0{
    /* background-image: url("../../../src/assets/video/colume1.png") !important; */
   background-position:50% 50%;background-size:cover;background-repeat:no-repeat !important;
   background-size: 60% !important;
  
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
  
     position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%,-375px);
    width: 80%;
    height:220px;
  
    opacity: 0;
  }
  .video-js .vjs-paused {
    position: absolute !important;
    top: -375px;
    left: 50% !important;
    transform: translateX(-50%);
    height: 375px;
    width: 100%;
    background-color: rgba(0,0,0,0.3);
  }
  .video-js .vjs-control-bar{
  height:auto !important;
  }
   .vjs-remaining-time-display{
  margin-left: -5px;
    z-index: 1;
    position: absolute !important;
    font-size: 1.1rem;
    left: 0px;
  }
    
  </style> 