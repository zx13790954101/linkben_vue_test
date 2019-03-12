<template>
  <div class="simulate flex " >
    <!-- 侧边栏的功能 -->
    <div class="left-slide" v-if="screenWidth>=688" :style="(screenWidth>=688?{'margin-left':(isCollapse==true?'0':'-320px')} :
      {'bottom':(isCollapse==false?'90px':'90px'),'height':(isCollapse==false?'100%':'0%')} )">
      <span class="head-title" v-if="screenWidth>=688" :style="{width:(isCollapse==true?'320px':'0px')}">
        <a href="linkben.com" class="flex-l  col-xs-0">LinkBen</a>
      </span>
      <good-select @curGoodList="setCurGoodList" :deleteUrl="deleteUrl" :oldList="oldList" :style="(screenWidth>=688?{} :{'height':(isCollapse==true?'100%':'0%')} )"></good-select>
      <i :class="(!isCollapse?'el-icon-arrow-right cut-button':'el-icon-arrow-left cut-button')" @click="isCollapse=!isCollapse"></i>
    </div>
    <!-- 背景轮换 -->
    <div class="swiper_box  content-r flex-item">
      <!-- 幕布的功能 -->
      <div class="img-control-box" v-if="imgControlType&&screenWidth<=688"></div>
      <!-- 右菜单 -->
      <div class="head-bar  flex-c flex-c-y" :style="(screenWidth>=688?{} :{'background-color':'#000000'} )">
        <topNav :homeImageType='homeImageType' class="flex-item"></topNav>
      </div>

      <div class="upload_warp  position-a-center" v-show="!homeImageType">
        <div class="upload_warp_left" @click="fileClick">
          <i class="iconfont icon-buoumaotubiao47 position-a-center"></i>
        </div>
        <input @change="fileChange($event)" ref="uploadRef" type="file" id="upload_file2" multiple style="display: none" />
      </div>

      <!-- 主的照片的div-->
      <div class="homeImage flex-c-y" v-if="homeImageType" v-for="(item,index) in mainImg">
       
          <div class="main-img "  :style="{'height':(mainImgSize===true? 'auto' :'100%')}">
            <div class="bootom "  id="main-view" :style="{'width':(mainImgSize===true?'100%':'auto'),'height':(mainImgSize===true? '':'100%')}">
              <img id="main-img" title="主的图片" :src="item.file.src"
               :style="{ 'z-index':imgStyleStatus.zIndex,'width':(mainImgSize===true?'100%':'auto'), 'height': (mainImgSize==true?'auto':'100%'),'opacity': 1,
                'transform':'translate(-50%, -50%)  scale('+imgStyleStatus.scale+') scaleX('+imgStyleStatus.scalex+') rotate('+imgStyleStatus.rotate+'deg)'}" 
              v-show="!(mainBgStatus.type)">
              <div id="main-bg"  rel="mainColorBg" title="纯色的背景" class="main-bg" v-show="mainBgStatus.type" :style="{'background-color':mainBgStatus.color,'z-index':imgStyleStatus.zIndex
              ,'width':mainBgStatus.width,'height':mainBgStatus.height}"></div>
            </div>

            <img-control  v-if="screenWidth>=688" v-for="(item,index) in curGoodList" :url="item.url" :key="item.id" @deleteUrl="setDeleteUrl"
              @setCurGood="setCurGood(index)" ></img-control>

              <mobileImgControl  v-if="screenWidth<=688" v-for="(item,index) in curGoodList" :url="item.url" :key="item.id" @deleteUrl="setDeleteUrl"
              @setCurGood="setCurGood(index)" ></mobileImgControl>

              


          </div>


        <div class="bottom-box">
          <!-- 侧边栏的功能 -->
          <div class="left-slide" v-if="screenWidth<=688" :style="{'margin-bottom':(isCollapse==false?'-120px':'0px')}">
            <good-select @curGoodList="setCurGoodList" :deleteUrl="deleteUrl" :oldList="oldList"></good-select>
            <i :class="(isCollapse?'el-icon-arrow-right cut-button':'el-icon-arrow-left cut-button')" @click="isCollapse=!isCollapse"></i>
          </div>
          <bottomNav ref="ref1" id="bottom-nav"></bottomNav>
        </div>
      </div>
      <div class="user_img" v-if="userImg!=''" :class="[box.width/box.height-userImgWidth/userImgHeight>0?'bgSizeReset':'',box.isFlip?'flipx':'']"
        :style="{backgroundImage:'url('+userImg+')',filter:'brightness('+bgBrightness+'%)'}">
      </div>

    </div>


    <!-- 选择分享渠道 -->
    <!-- <share :url="shareUrl" :title="share.title" :img="'http://orbi0d8g8.bkt.clouddn.com/'+shareImg"></share> -->

    <!-- 选择配灯场景 -->
    <!-- <transition name="animate-transition" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
      <scence-select v-if="showSelect" @closeSelect="showSelect=false" @bgListChange="bgListChange"></scence-select>
    </transition> -->

  </div>

</template>

<script>
 // import html2canvas from 'html2canvas'
  import bus from '../../assets/bus'
  import GoodImg from './components/GoodImg.vue'
  import GoodSelect from './page/GoodSelect.vue'
  import MobileImgControl from './mobile/MobileImgControl.vue'
  import ImgControl from './page/ImgControl.vue'
  import Share from './page/Share.vue'
  import GoodDetailCopy from './page/GoodDetailCopy.vue'
  import ScenceSelect from './page/ScenceSelect.vue'
  import TopNav from './page/TopNav.vue'
  import BottomNav from './page/BottomNav.vue'
  export default {
    name: 'simulate',
    components: {
      GoodSelect,
      ImgControl,
      Share,
      GoodDetailCopy,
      ScenceSelect,
      GoodImg,
      TopNav,
      BottomNav,
      MobileImgControl
    },
    data() {
      var data = {
        list: [],
        index: 0
      }
      var bgList =
        '{"index":4,"list":[{"id":998393154,"style":"中式风格","area":"客厅","name":"客厅中式风格031","mainImage":"http://7xo8yg.com1.z0.glb.clouddn.com/kt_zs_031.jpg","thumbImage":"http://7xo8yg.com1.z0.glb.clouddn.com/thumb-kt_zs_031.jpg","text":""},{"id":989541965,"style":"地中海风格","area":"客厅","name":"客厅地中海风格001","mainImage":"http://7xo8yg.com1.z0.glb.clouddn.com/kt_dzh_001.jpg","thumbImage":"http://7xo8yg.com1.z0.glb.clouddn.com/thumb-kt_dzh_001.jpg","text":""},{"id":983460350,"style":"简约风格","area":"客厅","name":"客厅简约风格068","mainImage":"http://7xo8yg.com1.z0.glb.clouddn.com/kt_jy_068.jpg","thumbImage":"http://7xo8yg.com1.z0.glb.clouddn.com/thumb-kt_jy_068.jpg","text":""},{"id":973816065,"style":"欧式风格","area":"客厅","name":"客厅欧式风格015","mainImage":"http://7xo8yg.com1.z0.glb.clouddn.com/kt_os_015.jpg","thumbImage":"http://7xo8yg.com1.z0.glb.clouddn.com/thumb-kt_os_015.jpg","text":""},{"id":971604356,"style":"中式风格","area":"客厅","name":"客厅中式风格059","mainImage":"http://7xo8yg.com1.z0.glb.clouddn.com/kt_zs_059.jpg","thumbImage":"http://7xo8yg.com1.z0.glb.clouddn.com/thumb-kt_zs_059.jpg","text":""},{"id":970170892,"style":"地中海风格","area":"客厅","name":"客厅地中海风格003","mainImage":"http://7xo8yg.com1.z0.glb.clouddn.com/kt_dzh_003.jpg","thumbImage":"http://7xo8yg.com1.z0.glb.clouddn.com/thumb-kt_dzh_003.jpg","text":""},{"id":969625968,"style":"简约风格","area":"客厅","name":"客厅简约风格070","mainImage":"http://7xo8yg.com1.z0.glb.clouddn.com/kt_jy_070.jpg","thumbImage":"http://7xo8yg.com1.z0.glb.clouddn.com/thumb-kt_jy_070.jpg","text":""},{"id":966885496,"style":"地中海风格","area":"客厅","name":"客厅地中海风格033","mainImage":"http://7xo8yg.com1.z0.glb.clouddn.com/kt_dzh_033.jpg","thumbImage":"http://7xo8yg.com1.z0.glb.clouddn.com/thumb-kt_dzh_033.jpg","text":""},{"id":965119002,"style":"美式风格","area":"客厅","name":"客厅美式风格037","mainImage":"http://7xo8yg.com1.z0.glb.clouddn.com/kt_ms_037.jpg","thumbImage":"http://7xo8yg.com1.z0.glb.clouddn.com/thumb-kt_ms_037.jpg","text":""}]}'
      data.list = JSON.parse(bgList).list
      data.index = JSON.parse(bgList).index
      var simulateRe = ''
      if (sessionStorage.simulateRe) {
        simulateRe = JSON.parse(sessionStorage.simulateRe)
        data.list.push({
          defaultImg: simulateRe.bg
        })
      }
      var url = ''
      var curGood = sessionStorage.curGood || ''
      var array = []
      if (curGood) {
        //url=(JSON.parse(curGood)).mainImage;
        array.push(JSON.parse(curGood))
      }
      var that = this
      return {
        screenWidth: document.documentElement.clientWidth,
        bottomNavBottom: $(".bottom-nav").height(),
        leftSlideBottom: '90px',
        imgControlType:false,//子图片或者插入图片的遮罩层的判断条件，imgcontrol的
        mainImgWidth: "auto",
        mainImgHeight: 'auto',
        sliderValue: 0,
        canvasContent: null,
        //主的界面的状态
        homeImageType: false,
        //主的照片
        mainImg: [],
        mainImgSize: true,
        imgStyleStatus: { scale: 1, rotate: 0, scalex: 1,zIndex:1 },
        imgStyle: {   
          'z-index':1,
          'width':'100%',
          'height':'auto' ,
          'opacity': 1,
          'transform':null
      
        },//初始化主的图片的样式
				imgStatus: {},//初始化的图片的信息
        defaultImgStatus:{},//初始化的图片的内容
        mainBgStatus:{
          type:false,//判断是否使用图片背景
          color:"",//颜色的
          width:'',
          height:'',
        },//主的背景状态
        isCollapse: false,
        oldList: array,
        backLoading: false,
        sessionGoodUrl: url,
        bgList: data.list,
        showSelect: false,
        shareUrl: '',
        share: {
          title: '',
          reason: ''
        },
        dialogFormVisible: false,
        deleteUrl: '',
        shareImg: '',
        swiperIndex: data.index,
        userImg: '',
        userImgWidth: 0,
        userImgHeight: 0,
        brightnessTop: 0,
        onload: false,
        curGoodList: [],
        mainStaus: {

        },
        box: {
          width: $('.swiper_box').width(),
          height: $('.swiper_box').height(),
          isFlip: false
        },
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          // direction : 'vertical',
          grabCursor: true,
          setWrapperSize: true,
          initialSlide: data.index,
          // autoHeight: true,
          // paginationType:"bullets",
          mousewheelControl: false,
          observeParents: true,
          observer: true,
          onTransitionStart(swiper) {
            that.setCurIndex(swiper.activeIndex)
          }
        },
        defaultImg: require("../../assets/img/img4.jpg")
      }
    },
    methods: {
      plusminus: function (data) {
        var that = this;
        if (data == 1) {
          if (that.sliderValue === 100) return;
          that.sliderValue = that.sliderValue + 20
        } else {
          if (that.sliderValue === 0) return;
          that.sliderValue = that.sliderValue - 20
        }
      },
      fileClick() {
        document.getElementById('upload_file2').click()
      },
      //点击主的图片的上传的，传的图片和这个input的对象值
      fileChange(el) {
        console.log("上传的时候图片的信息el",el);
        var that = this;
        if (!el.target.files[0].size) return;
        that.fileList(el.target);
        el.target.value = '';
        //this.$refs.ref1[0].viewerInit(); //初始化viewer 的功能实现照片的变形
      },
      //添加到对象组里面去
      fileList(fileList) {
        let files = fileList.files
        for (let i = 0; i < files.length; i++) {
          //判断是否为文件夹
          if (files[i].type != '') {
            this.fileAdd(files[i])
          } else {
            //文件夹处理
            this.folders(fileList.items[i])
          }
        }
      },
      //文件夹处理
      folders(files) {
        let _this = this
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry()
        }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.foldersAdd(file[i])
            } else {
              _this.folders(file[i])
            }
          }
        })
      },
      foldersAdd(entry) {
        let _this = this
        entry.file(function (file) {
          _this.fileAdd(file)
        })
      },
      fileAdd(file) {
        var that = this
        //总大小
        this.size = this.size + file.size;
      
        //判断是否为图片文件
        if (file.type.indexOf('image') == -1) {
          file.src=this.result;
          file.url = file.src
          file.number = file.size
          file.checked = false
          file.needNum = 1
          if (that.mainImg.length > 0) {
            that.mainImg.splice(0, 1)
          }
          const image = new Image();
          image.src = file.src;
          if (image.width > (parseInt(image.height) + 50)) {
            that.mainImgSize = true;
          } else {
            that.mainImgSize = false;
          }
          this.mainImg.push({
            file
          })
          that.homeImageType = true;
          setTimeout(function () {
            html2canvas(document.querySelector('#main-img')).then(function (canvas) {
              //document.body.appendChild(canvas);
              //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
              document.querySelector('#down').setAttribute('href', canvas.toDataURL())
            })
          }, 1000)
        } else {
          let reader = new FileReader()
          reader.vue = this
          reader.readAsDataURL(file)
          reader.onload = function () {
            file.src=this.result;
            file.url = file.src;
            file.number = file.size;
            file.defaultImg = file.src;
            file.checked = false;
            file.needNum = 1;
            if (that.mainImg.length > 0) {
              that.mainImg.splice(0, 1)
            }
            const image = new Image();
            image.src = file.src;
            image.onload = function(){
              if (image.width > image.height) {
              that.mainImgSize = true;
              } else {
                that.mainImgSize = false;
              }
            }
          
            debugger;
            this.vue.mainImg.push({
              file
            })
            that.homeImageType = true;
            //下载的功能
            setTimeout(function () {
              html2canvas(document.querySelector('#main-img')).then(function (canvas) {
                //document.body.appendChild(canvas);
                //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载setAttribute
                
             //   document.querySelector('#down').setAttribute('href', canvas.toDataURL())
              })
            }, 1000);
          }
        }
      },
      fileDel(index) {
        this.size = this.size - this.mainImg[index].file.size //总大小
        this.mainImg.splice(index, 1)
        this.homeImageType = false
      },
      login: function () {},
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      bgListChange(data) {
        this.userImg = ''
        var that = this
        this.showSelect = false

        this.bgList = data.list
        setTimeout(function () {
          that.swiper.slideTo(data.index, 300, false)
        }, 250)
      },
      setShareInfo(url) {
        this.shareImg = url
        this.dialogFormVisible = true
      },
      shareSubmit() {
        function randomString(len) {
          len = len || 32
          var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
          /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
          var maxPos = $chars.length
          var pwd = ''
          for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
          }
          return pwd
        }

        this.dialogFormVisible = false
        var data = {}
        data.userId = sessionStorage.userId
        data.sceneId = new Date().getTime() + randomString(10)
        data.title = encodeURIComponent(this.share.title)
        data.mainPic = this.shareImg
        var goodIds = ''
        $(this.curGoodList).each(function (index, ele) {
          goodIds += ele.id + '%7C1,'
        })
        data.goodIds = goodIds
        data.reason = encodeURIComponent(this.share.reason)

        var that = this
        that.shareUrl = ''
        this.$http.post(globalPath + '/ShareScene', data, {
          emulateJSON: true
        }).then(function (res) {
          if (res.body == 1000) {
            that.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            that.$message({
              message: '保存失败',
              type: 'error'
            })
            return
          }
          that.shareUrl = sharePath + '/shareTemplate/scene_' + data.sceneId + '.html'
        })
      },
      uploadShareImg() {
        if (this.curGoodList.length == 0) {
          this.$message({
            message: '请先添加商品',
            type: 'error'
          })
          return false
        }
        $('#uploadImgLess').click()
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      setCurIndex(index) {
        this.swiperIndex = index
      },
      setUrl(val) {
        var that = this
        this.userImg = val
        var img = new Image()
        img.src = val
        img.onload = function () {
          that.userImgWidth = img.width
          that.userImgHeight = img.height
        }
      },
      setCurGoodList(data) {
        this.curGoodList = data
      },
      formatTooltip(val) {
        return val + '%'
      },
      hideCover: function () {
        this.brightnessShow = false
      },
      toBack: function () {
        this.backLoading = true
        var that = this
        setTimeout(function () {
          that.$emit('toBack', 'main')
        }, 150)
      },
      setDeleteUrl(url) {
        var that = this
        var deleteIndex = ''
        $(this.curGoodList).each(function (index, ele) {
          if (url == ele.defaultImg) {
            that.curGoodList.splice(index, 1)
            return
          }
        })
        this.deleteUrl = url
      },
      chooseImg() {
        $('#uploadImg').val('')
        $('#uploadImg').click()
      },
      menuBar: function (index, event) {
        var that = this
        switch (index) {
          case 0:
            var top = $('.iconfont.icon-tupian').offset().top
            $('.barControl').css('marginTop', top + 5)
            that.barShow = true
            that.brightnessTop = top
            break
          case 1:
            var top = $('.iconfont.icon-shape23').offset().top
            $('.bgBrightnessControl').css('marginTop', top + 5)
            that.brightnessShow = true
            that.brightnessTop = top
            break

          case 2:
            that.box.isFlip = !that.box.isFlip
            break
          case 3:
            //截图工具
            //直接选择要截图的dom，就能截图，但是因为canvas的原因，生成的图片模糊
            //html2canvas(document.querySelector('div')).then(function(canvas) {
            //    document.body.appendChild(canvas);
            //});
            //创建一个新的canvas

            // var canvas2 = document.createElement('canvas')
            // let _canvas = document.querySelector('#main-img')
            // var w = parseInt(window.getComputedStyle(_canvas).width)
            // var h = parseInt(window.getComputedStyle(_canvas).height)
            // canvas2.width = w * 2
            // canvas2.height = h * 2
            // canvas2.style.width = w + 'px'
            // canvas2.style.height = h + 'px'
            // var context = canvas2.getContext('2d')
            // context.scale(2, 2)

            //  setTimeout(function(){
            //   html2canvas(document.querySelector('#main-img')).then(function(canvas) {
            //     document.body.appendChild(canvas);
            //     //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载

            //     document.querySelector('#down').setAttribute('href', canvas.toDataURL())

            //   })
            //   },1000)


            // that.$message({
            //   message: '请使用截图工具截图再保存！'
            // })

            break
          case 4:
            that.dialogVisible = true
            break
          case 5:
            that.curGoodList = []
            bus.$emit('clearGoodList', true)
            break
          case 6:
            var data = {}
            data.goodList = that.curGoodList
            if (that.userImg) {
              data.bg = that.userImg
            } else {
              data.bg = that.bgList[that.swiperIndex].defaultImg
            }
            sessionStorage.setItem('curSimulate', JSON.stringify(data))
            bus.$emit('curPage', 'remark-add')
            break
        }
      }
    },
    mounted: function () {
      var that=this;
      sessionStorage.removeItem('curRemark');
      var that = this
      var file = {};
      file.src = that.defaultImg;
      file.url = that.defaultImg;
      file.defaultUrl = that.defaultImg;
      file.number = 500;
      file.checked = false;
      file.needNum = 1;
      that.mainImg.push({
        file
      });
      var image = new Image();
      image.src = that.defaultImg;
      image.onload = function(){
        if (parseInt(image.width) > parseInt(image.height)) {
          that.mainImgSize = true;
        } else {
          that.mainImgSize = false;
        }
    
        that.homeImageType = true;
      };
 
      //页面加载的时候滑块控件必须要可见，否则会初始化错误，故在页面加载完成之后再display：none
      //$('.cover').css({'z-index':21,'display':'none'});
      $(window).resize(function () {
        /* that.win.width = $(window).width();
           that.win.height = $(window).height();*/
        that.box.width = $('.swiper_box').width()
        that.box.height = $('.swiper_box').height()
      })
      this.$message.closeAll()
      this.$message({
        showClose: true,
        message: '鼠标左键拖动，滚轮缩放，右键功能面板',
        duration: 3000
      })

      $(window).trigger('resize');
      this.login();

    },
    created() {
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper

      }
    },

    
    watch: {
      mainImg: function () {
        // this.mainImgWidth = $(".main-img .bootom img").width() + 'px';
      },
      bootom: function () {
        // this.mainImgWidth = $(".main-img .bootom img").width() + 'px';
        // $(".main-img .bootom").width(this.mainImgWidth);
      },
      bottomNavBottom: function () {
        console.log($(".bottom-nav").height());
      },
      //监听小图片的点击事件
      imgControlType:function(){
        var that=this;
        if(that.screenWidth>=768) return;
        if(that.imgControlType){
          that.imgStyleStatus.zIndex=13;

        }else{
          that.imgStyleStatus.zIndex=1;
        }
    
      }
    },
    updated: function () {

      setTimeout(function () {
        // this.mainImgWidth = $(".main-img .bootom img").width() + 'px';
        // this.mainImgHeight = $("#sub_mainImg").height() + 'px';
        // $(".main-img .bootom").width(this.mainImgWidth);
      }, 100)

    }
  }
</script>
<style>
  .plusminus .el-slider {
    width: 120px;
    margin: 0px 10px;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .simulate {
    height: 100vh;
    position: relative;
    background-color: #000000;
  }

  .head-title {
    height: 50px;
    line-height: 50px;
    background-color: #2b2b2b;
  }

  #sub_mainImg {
    display: block;
    width: 100%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .head-title a {
    color: #dadada;
    font-size: 23px;
    padding-left: 20px;
  }

  .head-radio {
    width: 320px;
    height: 50px;
    line-height: 50px;
    position: absolute;
    background-color: #353f48;
    top: 0px;
    left: 0px;
  }

  .head-radio i {
    font-size: 24px;
    font-weight: 600;
    padding: 0px 10px;
  }

  .good-select {
    height: 100%;
    padding: 0px 0px;
    margin-top: -50px;
    padding-top: 50px;
  }

  .content-r .upload_warp_left {
    width: 100%;
  }

  .img-r img {
    width: 100%;
    height: auto;
  }


  .my-swiper {
    background-color: #ffff;
    box-shadow: 0 4px 12px rgba(6, 31, 50, 0.24);
    -webkit-box-shadow: 0 4px 12px rgba(6, 31, 50, 0.24);
    -moz-shadow: 0 4px 12px rgba(6, 31, 50, 0.24);
    -o-shadow: 0 4px 12px rgba(6, 31, 50, 0.24);
  }

  .banner_img {
    width: 100%;
  }

  .el-upload__input {
    display: none !important;
  }

  .swiper-slide {
    height: 100%;
    background-position: 50% 50%;
    background-size: auto 100%;
    background-repeat: no-repeat;
  }

  .bgSizeReset {
    background-size: 100% auto !important;
  }

  .toBack {
    width: 100px;
    cursor: pointer;
    height: 50px;
    display: inline-block;
    background: #fff;
  }

  .toBack:active {
    color: #ffa538;
  }

  .toBack>.iconfont {
    padding-right: 5px;
  }




  .bttom-tab li:last-child {
    border: 0px;
  }

  .head-bar {
    height: 50px;
    -webkit-app-region: drag;
    color: #333333;
    text-align: center;
    /* z-index: 11; */
    width: 100%;
    position: relative;
    /* background-color: #000000; */
    background-color: #f4f4f4;
  }

  .swiper_box {
    position: relative;
    margin: 0 auto;
    height: 100%;
    background-color: #f4f4f4;
    /* will-change: transform; */
  }

  .user_img {
    position: fixed;
    left: 100px;
    right: 30vw;
    top: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: auto 100%;
    z-index: 1;
  }

  .flipx {
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
  }

  .left-slide {
    width: 320px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #171717;
    -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.44);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.44);
    position: relative;
    height: 100%;
    -webkit-transition: all .3s ease-out 0s;
    transition: all .3s ease-out 0s;

  }

  .cut-button {
    border: 0px !important;
    background-color: #171717;
    border-top-right-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
    color: white;
    font-weight: 600;
    -webkit-transition: all .4s ease-out 0s;
    transition: all .4s ease-out 0s;
    font-size: 2rem;
    color: #9eabb3;
    font-weight: 600;
    padding: 1.8rem 0.5rem;
    cursor: pointer;
  }

  .buttom-bar {
    position: absolute;
    bottom: 0%;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    padding: 10px 10px;
    min-width: 80%;


  }

  .buttom-wrap {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  }

  .bg-box {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    -webkit-filter: blur(8px) contrast(0.4) brightness(1.4);
    filter: blur(8px) contrast(0.4) brightness(1.4);
    clip: rect(205px 572px 516px 351px);
    z-index: 50;
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    width: 100%;
    height: 50px;
    border-radius: 10px;
  }

  .bg-box>.bg-filter {
    background-color: #ffffff9e;
    z-index: 9999;
    height: 50px;

  }

  .buttom-bar .bar_item {
    color: #fefefe;
    min-width: 60px;
  }

  .buttom-bar .menu_bar {
    position: absolute;
    top: 5px;
  }

  .left-content {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .cut-button {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    z-index: 9;
    right: -20px;
  }

  .bgBrightnessControl {
    width: 200px;
    background: #fff;
    padding: 0 10px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
    margin-left: 110px;
  }

  .cover {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 21;
  }

  .cover_btn {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }

  .my_row {
    margin: 5px 0;
  }

  .add-minus[data-v-2a2c4c72] {
    border-radius: 15px;
    height: 35px;
    line-height: 35px;
    background: #202026;
    padding: 0px 22px;
  }

  .add-minus i:nth-of-type(1) {
    margin-right: 25px;
  }

  .share_img {
    width: 100%;
    border-radius: 5px;
  }

  p.iconfont {
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .select_scence {
    background: #fff;
    display: inline-block;
    padding: 5px;
    border-radius: 3px;
    box-shadow: 0 1px 1px #5d5d5d;
    margin-left: 115px;
  }

  .upload_warp_img_div_del {
    position: absolute;
    top: 6px;
    width: 16px;
    right: 4px;
  }



  .homeImage {
    width: 100%;
    height: 100%;
    position: relative;
    margin-top: -50px;
    padding-top: 50px;
  }

  .content-r .upload_warp_left i {
    font-size: 80px;
  }

  .main-img {
    width: 100%;
    text-align: center;
    position: relative;
    margin: 0px 5% 0px 5%;
    margin-bottom: 50px;
    box-sizing: border-box;
    padding-bottom: 50px;
   
  }
  .main-img .img-r {
    box-shadow: 0 4px 12px rgba(6, 31, 50, .24);
    -webkit-box-shadow: 0 4px 12px rgba(6, 31, 50, .24);
    -moz-shadow: 0 4px 12px rgba(6, 31, 50, .24);
    -o-shadow: 0 4px 12px rgba(6, 31, 50, .24);
  }

  .main-img .bootom {
    width: auto;
    height: 100%;
    position: relative;
    box-shadow: 0 4px 12px rgba(6, 31, 50, .24);
    -webkit-box-shadow: 0 4px 12px rgba(6, 31, 50, .24);
    -moz-shadow: 0 4px 12px rgba(6, 31, 50, .24);
    -o-shadow: 0 4px 12px rgba(6, 31, 50, .24);
    overflow: hidden;
  }

  .main-img .bootom img {
    width: auto;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

  }

  .content-r {
    overflow: hidden;
  }

  .plusminus {
    position: absolute;
    left: 50%;
    z-index: 999;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 1%;

  }

  .plusminus button {
    width: 34px;
    height: 34px;
    margin: 0px 5px;
    font-size: 30px;
    line-height: 34px;
    color: #dadada;
    border: aliceblue;
  }

  .main-right-bar li {
    float: none;
    color: #dadada;
    margin: 10px 0px;
    padding: 5px 0px;
    padding-left: 15px;
  }

  .bottom-box {
    position: absolute;
    left: 50%;
    z-index: 999;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 0px;
  }
  #main-img{ z-index: 13 }
  #main-bg{
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 0;
    /* padding-bottom: 100%; */
    height: 50vh;
    -webkit-transition: all .4s ease-out 0s;
    transition: all .4s ease-out 0s;
    z-index: 13;
  }
  .img-control-box{
    height: 100vh;
    background-color: rgba(0,0,0,0.8);
    width: 100vw;
    position: absolute;
    z-index: 12;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    background-clip: border-box;
    -webkit-transition: all .4s ease-out 0s;
    transition: all .4s ease-out 0s;
  }
  @media (max-width:768px) {
    .bottom-box {
      width: 100%;
      padding: 0;
      z-index: 9;
      left: 0px;
      transform: translateX(0%);
      /* background-color: white; */
      background-color: #272727;
    }

    .swiper_box {
      background-color: #000000;
    }

    .left-slide {
      position: relative;
      z-index: 8;
      bottom: 0px;
      height: auto;
      background-color: white;
      box-shadow: 0px 0px 0px;
      width: 100%;
      /* max-height: 114px; */
    }

    .cut-button {

      right: 50%;
      top: -55px;
      margin-right: -10px;
      transform: rotate(90deg);
      padding: 40px 0px;
      /* background-color: white; */
      background-color: #272727;
      font-size: 18px;
      border-radius: 0px;
      width: 15px;
      border-top-left-radius: 0.4rem;
      border-bottom-left-radius: 0.4rem;
    }
  }
</style>
