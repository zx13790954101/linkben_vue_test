<template>
  <div class="simulate">
    <!-- 左菜单 -->
    <div class="left_bar flex-c">
        <div class="head-radio">
        <el-radio-group v-model="isCollapse">
          <el-radio-button :label="false" v-if="isCollapse">
                <i class="iconfont icon-dingzhi-copy active" > </i>
           </el-radio-button>
          <el-radio-button :label="true"  v-if="!isCollapse">
              <div class="flex-c">
                 <a href="https://linkben.com"><h4 class="flex-item">LinkBen</h4></a>
                  <i class="iconfont icon-dingzhi-copy-copy" ></i>
              </div>
            </el-radio-button>
        </el-radio-group>
        </div>
    <div class="flex-r flex-item">
        <ul class="menu_bar">
            <li class="bar_item flex-c" v-for="(item,index) in leftBarList" @click="menuBar(index,$event)">
              <i :class="['iconfont',item.icon]"></i>
              <p v-if="index!=3">{{item.text}}</p>
              <a v-if="index==3" class="down" id="down" download>{{item.text}}</a>
            </li>
          </ul>
    </div>
     

    </div>
    <!-- 场景功能 -->
    <!--:class="[onload?'onload':'','cover']"-->
    <transition name="animate-transition" enter-active-class="animated fadeIn" leave-active-class="animated slideOutLeft" :duration="200">
      <div class="cover" v-if="barShow">
        <div class="cover_btn" @click="hideCover"></div>
        <div class="barControl" :style="{marginTop:brightnessTop+'px'}">
          <div class="block">
            <div class="select_scence">
              <el-button type="primary" @click="chooseImg">选择本机图片</el-button>
              <el-button type="primary" @click="showSelect=true">选择场景库图片</el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 背景滤镜滑条 -->
    <transition name="animate-transition" enter-active-class="animated fadeIn" leave-active-class="animated slideOutLeft" :duration="200">
      <div class="cover" v-if="brightnessShow">
        <div class="cover_btn" @click="hideCover"></div>
        <div class="bgBrightnessControl" :style="{marginTop:brightnessTop+'px'}">
          <div class="block">
            <el-slider v-model="bgBrightness" :format-tooltip="formatTooltip" :min="50" :max="150" :step="5"></el-slider>
          </div>
        </div>
      </div>
    </transition>
    <section class="flex simulate-section">
      <!-- 右商品清单 -->

      <div class="right_goods" :style="{width:(isCollapse==false?'30%':'0%')}">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">

          <good-select @curGoodList="setCurGoodList" :deleteUrl="deleteUrl" :oldList="oldList"></good-select>

        </el-menu>
      </div>
      <!-- 背景轮换 -->
      <div class="swiper_box  content-r">
        <div class="upload_warp  position-a-center" v-show="!homeImageType">
          <div class="upload_warp_left" @click="fileClick">
            <i class="iconfont icon-buoumaotubiao47 position-a-center"></i>
          </div>
          <input @change="fileChange($event)" type="file" id="upload_file2" multiple style="display: none" />
        </div>

        <!-- 主的照片的div-->
        <div class="homeImage flex-c-y" v-show="homeImageType" v-for="(item,index) in mainImg">
          <p class="cut" @click="fileClick" v-if="homeImageType">
            切换
          </p>
          <div class=" flex-r main-img" id="main-img">
            <div class="img-r">
              <img :src="item.file.url">
            </div>
            <img-control v-for="(item,index) in curGoodList" :url="item.mainImage" :key="item.id" @deleteUrl="setDeleteUrl" @setCurGood="setCurGood(index)"></img-control>

          </div>
          <div class="position-a-r plusminus">
              <button class="add">+</button>
              <button class="minus">-</button>
         </div>
        </div>

        <div class="user_img" v-if="userImg!=''" :class="[box.width/box.height-userImgWidth/userImgHeight>0?'bgSizeReset':'',box.isFlip?'flipx':'']" :style="{backgroundImage:'url('+userImg+')',filter:'brightness('+bgBrightness+'%)'}">
        </div>

      </div>
    </section>

    <!-- <pic-upload @url="setUrl"></pic-upload>
    <pic-upload-less @url="setShareInfo"></pic-upload-less> -->
    <!-- 对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" :modal="false" size="tiny">
      <span>选择场景截图并分享，若无截图，请截图保存后再分享。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadShareImg">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 对话框表单 -->
    <el-dialog title="分享设置" :visible.sync="dialogFormVisible" :modal="false">
      <el-form :model="share">
        <div class="my_row">
          <img class="share_img" :src="'http://orbi0d8g8.bkt.clouddn.com/'+shareImg" alt="">
        </div>
        <div class="my_row">
          <input type="title" v-model="share.title" class="form-control" placeholder="请填入标题">
        </div>
        <div class="my_row">
          <textarea name="" id="" v-model="share.reason" rows="5" style="resize: none" class="form-control" placeholder="请填入内容"></textarea>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="shareSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择分享渠道 -->
    <share :url="shareUrl" :title="share.title" :img="'http://orbi0d8g8.bkt.clouddn.com/'+shareImg"></share>
    <!-- 商品详情 -->
    <transition name="animate-transition" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
      <good-detail-copy v-if="showDetail" @close="showDetail=false"></good-detail-copy>
    </transition>
    <!-- 选择配灯场景 -->
    <transition name="animate-transition" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
      <scence-select v-if="showSelect" @closeSelect="showSelect=false" @bgListChange="bgListChange"></scence-select>
    </transition>
    <!--返回时候等待过长，添加loading动画-->
    <div class="my_loading_box" v-if="backLoading">
      <div class="my_loading">
        <img src="static/images/extra/loading.svg" alt="">
      </div>
    </div>
  </div>

</template>

<script>
import html2canvas from 'html2canvas'
import bus from '../assets/bus'
import GoodImg from './simulate/components/GoodImg.vue'
import GoodSelect from './simulate/GoodSelect.vue'
import ImgControl from './simulate/ImgControl.vue'
// import PicUpload from './simulate/PicUpload.vue'
// import PicUploadLess from './simulate/PicUploadLess.vue'
import Share from './simulate/Share.vue'
import GoodDetailCopy from './simulate/GoodDetailCopy.vue'
import ScenceSelect from './simulate/ScenceSelect.vue'
export default {
  name: 'simulate',
  components: { GoodSelect, ImgControl, Share, GoodDetailCopy, ScenceSelect, GoodImg },
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
        mainImage: simulateRe.bg
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
      canvasContent: null,
      //主的界面的状态
      homeImageType: false,
      //主的照片
      mainImg: [],
      isCollapse: false,
      oldList: array,
      backLoading: false,
      sessionGoodUrl: url,
      bgList: data.list,
      showSelect: false,
      showDetail: false,
      shareUrl: '',
      share: {
        title: '',
        reason: ''
      },
      dialogFormVisible: false,
      dialogVisible: false,
      deleteUrl: '',
      shareImg: '',
      swiperIndex: data.index,
      userImg: '',
      userImgWidth: 0,
      userImgHeight: 0,
      brightnessTop: 0,
      brightnessShow: false,
      barShow: false,
      onload: false,
      curGoodList: [],
      bgBrightness: 100,
      box: {
        width: $('.swiper_box').width(),
        height: $('.swiper_box').height(),
        isFlip: false
      },
      leftBarList: [
        {
          icon: 'icon-tupian',
          text: '场景'
        },
        {
          icon: 'icon-shape23',
          text: '亮度'
        },
        {
          icon: 'icon-111jingxiang',
          text: '镜像'
        },
        {
          icon: 'icon-baocun',
          text: '保存'
        },
        {
          icon: 'icon-fenxiang11',
          text: '分享'
        },
        {
          icon: 'icon-shanchu-copy',
          text: '清除'
        },

        {
          icon: 'icon-beiwanglu1',
          text: '备忘录'
        }
      ],
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
      }
    }
  },
  methods: {
    fileClick() {
      document.getElementById('upload_file2').click()
    },
    fileChange(el) {
      if (!el.target.files[0].size) return
      this.fileList(el.target)
      el.target.value = ''
    },
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
      files.createReader().readEntries(function(file) {
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
      entry.file(function(file) {
        _this.fileAdd(file)
      })
    },
    fileAdd(file) {
      var that = this
      //总大小
      this.size = this.size + file.size
      //判断是否为图片文件
      if (file.type.indexOf('image') == -1) {
        debugger
        file.src = 'wenjian.png'
        file.src = this.result
        file.thumbImage = file.src
        file.url = file.src
        file.number = file.size
        file.mainImage = file.src
        file.checked = false
        file.needNum = 1
        if (that.mainImg.length > 0) {
          that.mainImg.splice(0, 1)
        }
        this.mainImg.push({
          file
        })
     
       
        that.homeImageType = true;
        
         setTimeout(function(){
            html2canvas(document.querySelector('#main-img')).then(function(canvas) {
              //document.body.appendChild(canvas);
              //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
              document.querySelector('#down').setAttribute('href', canvas.toDataURL())
            })
            },1000)
      } else {
        let reader = new FileReader()
        reader.vue = this
        reader.readAsDataURL(file)
        reader.onload = function() {
          debugger
          file.src = this.result
          file.thumbImage = file.src
          file.url = file.src
          file.number = file.size
          file.mainImage = file.src
          file.checked = false
          file.needNum = 1
          if (that.mainImg.length > 0) {
            that.mainImg.splice(0, 1)
          }
          this.vue.mainImg.push({
            file
          })
          that.homeImageType = true;
          //下载的功能
          setTimeout(function(){
            html2canvas(document.querySelector('#main-img')).then(function(canvas) {
              //document.body.appendChild(canvas);
              //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
              document.querySelector('#down').setAttribute('href', canvas.toDataURL())
            })
          },1000);
        }
      }
    },
    fileDel(index) {
      this.size = this.size - this.mainImg[index].file.size //总大小
      this.mainImg.splice(index, 1)
      this.homeImageType = false
    },
    login: function() {
      console.log('ssss')
    },
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
      console.log(data)

      this.bgList = data.list
      setTimeout(function() {
        that.swiper.slideTo(data.index, 300, false)
      }, 250)
    },
    setShareInfo(url) {
      console.log('setShareInfo')
      console.log(url)
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
      $(this.curGoodList).each(function(index, ele) {
        goodIds += ele.id + '%7C1,'
      })
      data.goodIds = goodIds
      data.reason = encodeURIComponent(this.share.reason)
      console.log(data)

      var that = this
      that.shareUrl = ''
      this.$http.post(globalPath + '/ShareScene', data, { emulateJSON: true }).then(function(res) {
        console.log(res)
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
      console.log('uploadShareImg')
      $('#uploadImgLess').click()
      this.dialogVisible = false
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
      img.onload = function() {
        that.userImgWidth = img.width
        that.userImgHeight = img.height
      }
    },
    setCurGood(index) {
      sessionStorage.setItem('curGood', JSON.stringify(this.curGoodList[index]))
      this.showDetail = true
    },
    setCurGoodList(data) {
      this.curGoodList = data
    },
    formatTooltip(val) {
      return val + '%'
    },
    hideCover: function() {
      this.brightnessShow = false
      this.barShow = false
    },
    toBack: function() {
      this.backLoading = true
      var that = this
      setTimeout(function() {
        that.$emit('toBack', 'main')
      }, 150)
    },
    setDeleteUrl(url) {
      var that = this
      console.log(url)
      var deleteIndex = ''
      $(this.curGoodList).each(function(index, ele) {
        console.log(ele)
        if (url == ele.mainImage) {
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
    menuBar: function(index, event) {
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
            data.bg = that.bgList[that.swiperIndex].mainImage
          }
          console.log(data)
          sessionStorage.setItem('curSimulate', JSON.stringify(data))
          bus.$emit('curPage', 'remark-add')
          break
      }
    }
  },
  mounted: function() {
    sessionStorage.removeItem('curRemark')
    var that = this
    //页面加载的时候滑块控件必须要可见，否则会初始化错误，故在页面加载完成之后再display：none
    //$('.cover').css({'z-index':21,'display':'none'});
    $(window).resize(function() {
      console.log('resize')
      /* that.win.width = $(window).width();
         that.win.height = $(window).height();*/
      that.box.width = $('.swiper_box').width()
      that.box.height = $('.swiper_box').height()
      console.log(that.box.width / that.box.height - that.userImgWidth / that.userImgHeight)
    })
    this.$message.closeAll()
    this.$message({
      showClose: true,
      message: '鼠标左键拖动，滚轮缩放，右键功能面板',
      duration: 3000
    })
    $(window).trigger('resize')
    this.login()
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  }
}
</script>
<style>
  .head-radio .el-radio-button__inner{
    background-color: rgba(0,0,0,0);
    border: 0px !important;
    color: white;
    width: 100%;
    padding: 0px;
  }
  .head-radio .el-radio-group{
    width: 100%;
  }
  .head-radio .el-radio-button{
    width: 100%;
  }
  .head-radio .active{
    background: linear-gradient(to left,#3b9eff 0,#19c3ff 100%);
    float: left;
    height: 50px;
    line-height: 50px;
    width: 50px;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head-radio{
    width: 30%;
    height: 50px;
    line-height: 50px;
  }
.head-radio i{
  font-size: 24px;
  font-weight: 600;
  padding: 0px 10px;
}
.good-select {
  height: 100%;
  background-color: #353f48;
  padding: 0px 0px;
}
.content-r .upload_warp_left {
  width: 100%;
}
.img-r img {
  width: 100%;
  height: auto;
}
.simulate-section {
  height: 100vh;
  margin-top: -50px;
  padding-top: 50px;
  position: relative;
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

.toBack > .iconfont {
  padding-right: 5px;
}

.menu_bar {
  position: relative;
  overflow: hidden;
}

.menu_bar .iconfont {
  margin-right: 5px;
  font-size: 1.6rem;
}

.bar_item {
  float: left;
  cursor: pointer;
  padding: 0px 5px;
  display: inline;
  margin-left: 15px;
}

.bar_item:active {
  color: #ffa538;
}

.left_bar {
  height: 50px;
  background-color: #293036;
  -webkit-app-region: drag;
  color: #dadde5;
  text-align: center;
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.44);
  -moz-box-shadow: 0 0 3px rgba(0, 0, 0, 0.44);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.44);
  position: relative;
  z-index: 11;
}

.swiper_box {
  width: 70%;
  position: relative;
  padding: 3%;
  margin: 0 auto;
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

.right_goods {
  width: 30%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: #fff;
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.44);
  -moz-box-shadow: 0 0 3px rgba(0, 0, 0, 0.44);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.44);
  overflow: hidden;
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

.upload_warp_img_div_top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  line-height: 30px;
  text-align: left;
  color: #fff;
  font-size: 12px;
  text-indent: 4px;
  z-index: 9;
}

.upload_warp_img_div_text {
  white-space: nowrap;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.upload_warp_img_div img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}

.upload_warp_img_div {
  height: auto;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.homeImage {
  width: 100%;
  height: 100%;
  position: relative;
}
.cut {
  width: 50px;
  height: 50px;
  line-height: 50px;
  background-color: #20a0ff;
  text-align: center;
  border-radius: 50%;
  box-shadow: 1px 2px 2px 1px #504d4d85;
  font-weight: 600;
  font-size: 14px;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 9999;
  color: white;
  letter-spacing: 2px;
}
.content-r .upload_warp_left i {
  font-size: 80px;
}
.main-img {
  width: 100%;
}
.content-r {
  overflow: hidden;
}
.plusminus{
  position: absolute;
    bottom: 10px;
    right: 0px;
    z-index: 9999;
}
.plusminus button{
  border-radius: 50%;
    padding: 0px;
    min-width: 36px;
    margin: 0px 5px;
    font-size: 30px;
    line-height: 36px;
    background-color: #20a0ff;
    color: white;
    border: 0px;
    -webkit-box-shadow: 1px 2px 2px 1px #504d4d85;
    box-shadow: 1px 2px 2px 1px #504d4d85;
}
</style>
