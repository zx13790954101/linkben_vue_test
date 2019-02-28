<template>
    <div class="settingPosition">
    </div>
  </template>
  
  <script>
    export default {
      name: 'settingPosition',
      data() {
        return {
          title: '位置调整',
          active:1,
          dialogTableVisible:false
        }
      },
      props: {
        tabNavActive:0
      },
      created() {
       
      },
      methods: {
        //返回值
        back(){
          this.$parent.active=0;
        },
      },
      watch: {
        tabNavActive:function(){
           var that=this;
           if(that.tabNavActive==1){
            that.dialogTableVisible=true;
           }
        }
      },
  
    }
  </script>
  <style scoped lang="less">
      .dealWithImg{
      
      }
  </style>
  