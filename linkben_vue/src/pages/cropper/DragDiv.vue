<template>
    <div class0="touchkit">
      <h1>dragdiv</h1>
      <div id="resizable" class="ui-widget-content resizable">
          <h3 class="ui-widget-header">保持纵横比</h3>
        </div>

        <div id="resizable" class="ui-widget-content resizable1">
            <h3 class="ui-widget-header">保持纵横比</h3>
          </div>


          <button id="target">
            长按
          </button>
    </div>
  </template>
  
  
  <script>
    // jquery-ui 说明文档   https://segmentfault.com/a/1190000017261136
  import 'jquery-ui/ui/widgets/draggable'
  import 'jquery-ui/ui/widgets/droppable'
  import 'jquery-ui/ui/widgets/resizable'
  import '../../assets/jquery/jquery.ui.touch-punch.min.js'
    export default {
      name: 'dragdiv',
      data() {
        return {
          headerImage: "",
          urlImg: require('../../../static/to/1.jpg'),
        };
      },
      mounted() {
          $(".resizable").resizable({
            aspectRatio: 16 / 9//规定大小 ，比例
          });
          //拖动
          $( ".resizable" ).draggable();
          var timeOutEvent=null;
          $("#target").on({  
                  touchstart: function(e) { 
                      // 长按事件触发  
                      timeOutEvent = setTimeout(function() {  
                          timeOutEvent = 0;  
                          alert('你长按了');  
                      }, 900);  
                      //长按400毫秒   
                      // e.preventDefault();    
                  },  
                  touchmove: function() {  
                      clearTimeout(timeOutEvent);  
                      timeOutEvent = 0;  
                  },  
                  touchend: function() {  
                      clearTimeout(timeOutEvent);  
                      if (timeOutEvent != 0) {  
                          // 点击事件  
                          // location.href = '/a/live-rooms.html';  
                          alert('你点击了');  
                      }  
                      return false;  
                  }  
            });
      },
      methods: {}
    };
  </script>
  
  <style scoped lang="less">
    #resizable { width: 160px; height: 90px; padding: 0.5em; }
  #resizable h3 { text-align: center; margin: 0; }
  </style>