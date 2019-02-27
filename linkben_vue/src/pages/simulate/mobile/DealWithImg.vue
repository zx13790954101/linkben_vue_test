<template>
    <div class="dealWithImg">
          <div class="content  row">
            <i class="iconfont"></i>
              <div class="col-lg-6  ">
                <div class="item flex-c">
                    <i class="iconfont icon-ic_sq_zjz"></i>
                </div>
              </div>
              <div class="col-lg-6 ">
                  <div class="item flex-c">
                  <i class="iconfont icon-beijing"></i>
                </div>
              </div>
          </div>
    </div>
  </template>
  
  <script>
    export default {
      name: 'dealWithImg',
      data() {
        return {
          title: '截取和抠图',
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
        position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.5);
    margin: 0px;
    padding: 0px;
    top: 0%;
    left: 0px;

        .content{
          width: 80vw;
          padding:5% 10%;
          top:50%;
          height: auto;
          transform: translateY(-50%);
          background-color:white;
          margin-left:10vw;
        }

        .item{
          text-align: center;
          min-height:250px;
          .iconfont{
            font-size: 6rem;
            margin:0 auto;
            color: white;
          }
        }
        .col-lg-6{
          padding: 0px 0px;
        }
        .col-lg-6:nth-of-type(1) .item{
          background: linear-gradient(to left, #CDDC39, #FFEB3B);
        }
        .col-lg-6:nth-of-type(2) .item{
          background: linear-gradient(to left, #03A9F4, #00BCD4);
        }
      }
  </style>
  