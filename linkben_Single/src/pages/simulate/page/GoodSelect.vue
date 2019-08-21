<template>
  <div class="good-select">
    <Matting class="top-bar" v-if="screenWidth>=688"></Matting>
    <el-tabs>
      <el-tab-pane label="插件列表">
        <div class="flex-c box" v-if="screenWidth>=688">
          <h4 class="title flex-item"> 添加你的物件 </h4>
          <h5> 全部删除 </h5>
        </div>
        <!-- 商品列表 -->
        <div class="good_list  scrollbar">
          <div class="row">
            <article class="col-lg-6 col-xs-3">
              <upload @imgList='setImgList'></upload>
            </article>
            <article class="col-lg-6 col-xs-3" v-for="(item,index) in goodsList" v-on:click="selectGood(index)">
              <div class="upload_warp_img_div " :class="item.checked?'bg_yellow':''">
                <i class="el-icon-circle-close upload_warp_img_div_del" @click="fileDel(index)"></i>
                <good-img :url="item.url
                " :noStock="item.number==0?true:false" :key="item.id"></good-img>
              </div>
            </article>
          </div>
        </div>
        <!-- 商品列表 -->
      </el-tab-pane>
      <el-tab-pane label="配置管理">
        <div class="good_list">

        </div>
      </el-tab-pane>
    </el-tabs>
    <button class="btn bottom-bar" v-if="screenWidth>=688">保存 </button>
  </div>
</template>

<script>
  import GoodImg from '../components/GoodImg.vue'
  import MyHeader from '../components/MyHeader.vue'
  import TypeSelect from '../components/TypeSelect.vue'
  import Upload from '../../common/Upload.vue'
  import Matting from './Matting.vue'
  import bus from '../../../assets/bus'
  export default {
    name: 'good-select',
    components: {
      Matting,
      GoodImg,
      MyHeader,
      TypeSelect,
      Upload
    },
    props: ['deleteUrl', 'oldList'],
    data() {
      return {
        screenWidth: document.documentElement.clientWidth,
        fileList: [],
        searchValue: '',
        loading: false,
        showLoading: true,
        goodsList: [],
        selectList: [],
        searchData: {
          userId: sessionStorage.userId || 0,
          pageIndex: 0,
          pageSize: 48,
          catId: '',
          name: '',
          area: '',
          style: '',
          mainji: '',
          selectType: ''
        },
        defaultImg:[
          {
            src:require('../../../../static/images/img1.jpg')
          }
        ]
      }
    },
    mounted: function () {
      //初始化选中商品
      if (this.oldList) {
        this.selectList = this.oldList
      }

      if (sessionStorage.curGoodsList) {
        this.goodsList = JSON.parse(sessionStorage.curGoodsList)
        sessionStorage.removeItem('curGoodsList')
        this.showLoading = false
      } else {
        this.getGoodsList()
      }
      var that = this
      //滚动看到加载图案是请求数据
      $('.good_list').scroll(function (e) {
        if (!that.showLoading) return
        if (that.loading) return
        if (!$('.good-select .loader')) return
        var loadTop = $('.good-select .loader').offset().top || 0
        //console.log(loadTop,$(window).scrollTop() + $(window).height());
        if (loadTop) {
          if ($(window).scrollTop() + $(window).height() - loadTop > 0) {
            that.loading = true
            that.getGoodsList()
          }
        }
      })
      //请求商品类型
      //  that.GetGoodCategorys();
      //商品区域类型
      //   that.GetGoodAreas();
      //商品风格类型
      //  that.GetGoodStyles();
      //请求商品面积类型
      //    that.GetGoodMianJis();
      var that = this
      bus.$on('c  learGoodList', function (flag) {
        if (flag) {
          $(that.goodsList).each(function (index, element) {
            element.checked = false
          })
        }
      });

      var file = {};
      file.src = this.defaultImg[0].src;
      file.url =  this.defaultImg[0].src;
      file.number = 12333;
      file.defaultImg =  this.defaultImg[0].src;
      file.checked = false;
      file.needNum = 1;

      that.goodsList.push(file);
    },
    methods: {
      fileDel(index) {
        var that = this
        this.goodsList.splice(index, 1)
      },
      setImgList(data) {
    
        var that = this;
        that.goodsList = data
        //   ( that.goodsList).concat(data);

      },
      submitUpload() {
        this.$refs.upload.submit()
        
      },
      handleRemove(file, fileList) {
        console.log('remove', file, fileList)
      },
      handlePreview(file) {
        console.log('preview', file)
      },
      checkSelect() {
        //判断商品列表商品是否选中
        var that = this
        
        $(that.goodsList).each(function (index2, ele2) {
          var isSame = false
          
          $(that.selectList).each(function (index, ele) {
     
            if (ele2.id == ele.id) isSame = true
          })
          if (isSame) {
            ele2.checked = true
          } else {
            ele2.checked = false
          }
        })
      },
      selectGood(index) {
      
        this.goodsList[index].checked = !this.goodsList[index].checked;

        if (this.goodsList[index].checked) {
          this.addGood(this.goodsList[index])
        //  this.selectList.push(this.goodsList[index]);
        } else {
          this.reduceGood(this.goodsList[index])
          //if(this.selectList[index].id==this.)
          /*$(this.selectList).each(function (index,ele) {
                  if(ele.id==this.goodsList[index].id){
                      this.selectList.splice(index,1);
                  }
                });*/
        }
      },
      addGood(val) {
        console.log('allGood', val)
        var add = true
        $(this.selectList).each(function (index, ele) {
          if (ele.id == val.id) {
            add = false
            return false
          }
        })

        if (add) this.selectList.push(val)
      },
      reduceGood(val) {
        var reduce = false
        var deleteIndex = 0
        $(this.selectList).each(function (index, ele) {
          if (ele.id == val.id) {
            reduce = true
            deleteIndex = index
            return false
          }
        })
        if (reduce) this.selectList.splice(deleteIndex, 1)
      },
      handleIconClick() {
        this.searchReset()
        this.getGoodsList()
      },
      setSearchCarId: function (data) {
        if (data) {
          this.searchData.catId = '(' + data + ')'
        } else {
          this.searchData.catId = ''
        }

        this.searchReset()
        this.getGoodsList()
      },
      setSearchStyle: function (data) {
        this.searchData.style = data

        this.searchReset()
        this.getGoodsList()
      },
      setSearchArea: function (data) {
        this.searchData.area = data

        this.searchReset()
        this.getGoodsList()
      },
      setSearchMianJis: function (data) {
        this.searchData.mainji = data

        this.searchReset()
        this.getGoodsList()
      },
      setSearchSelectType: function (data) {
        this.searchData.selectType = data

        this.searchReset()
        this.getGoodsList()
      },
      GetGoodMianJis: function () {
        var that = this
        that.$http
          .get(globalPath + '/GetGoodMianJis', {
            params: {
              userId: sessionStorage.userId || 0
            }
          })
          .then(function (res) {
            if (typeof res.body != 'object') {
              that.$message.error('没有请求到数据')
            }
            $(res.body).each(function (index, element) {
              that.goodMianJisList.push({
                id: element.id,
                count: element.count,
                name: element.mianji
              })
            })
          })
      },
      GetGoodStyles: function () {
        var that = this
        that.$http
          .get(globalPath + '/GetGoodStyles', {
            params: {
              userId: sessionStorage.userId || 0
            }
          })
          .then(function (res) {
            if (typeof res.body != 'object') {
              that.$message.error('没有请求到数据')
            }
            $(res.body).each(function (index, element) {
              that.goodStylesList.push({
                id: element.id,
                count: element.count,
                name: element.styleName
              })
            })
          })
      },
      GetGoodAreas: function () {
        var that = this
        that.$http
          .get(globalPath + '/GetGoodAreas', {
            params: {
              userId: sessionStorage.userId || 0
            }
          })
          .then(function (res) {
            if (typeof res.body != 'object') {
              that.$message.error('没有请求到数据')
              return
            }
            $(res.body).each(function (index, element) {
              that.goodAreasList.push({
                id: element.id,
                count: element.count,
                name: element.area
              })
            })
          })
      },
      GetGoodCategorys: function () {
        var that = this
        that.$http
          .get(globalPath + '/GetGoodCategorys', {
            params: {
              userId: sessionStorage.userId || 0
            }
          })
          .then(function (res) {
            if (typeof res.body != 'object') {
              that.$message.error('没有请求到数据')
              return
            }
            $(res.body).each(function (index, element) {
              that.goodCategorysList.push({
                id: element.catId,
                count: element.count,
                name: element.name
              })
            })
          })
      },
      searchReset: function () {
        this.searchData.pageIndex = 0
        this.goodsList = []
        this.showLoading = true
      },
      /*setCurGood: function (index) {
  
          this.goodsList[index].checked = true;
  
        },*/
      answer: function () {},
      getGoodsList: function () {
        var that = this

        var res = ''
        if (typeof res != 'object') {
          //that.$message.error('没有请求到数据');
          that.showLoading = false
          that.loading = false
          return
        }
        if (res.length < that.searchData.pageSize || res == 0) {
          this.showLoading = false
        }

        $(res).each(function (index, element) {
          element.checked = false
          element.needNum = 1
          element.defaultImg = decodeURIComponent(element.defaultImg)
        })

        that.goodsList.push(...res)
        that.searchData.pageIndex++
        that.loading = false

        that.checkSelect()
      }
    },
    computed: {},
    watch: {
      selectList: function (val) {
        this.checkSelect()
       
        this.$emit('curGoodList', val)
      },
      deleteUrl: function (url) {
        var reduce = false
        var deleteIndex = 0
        $(this.selectList).each(function (index, ele) {
          if (ele.defaultImg == url) {
            reduce = true
            deleteIndex = index
            return false
          }
        })
        if (reduce) this.selectList.splice(deleteIndex, 1)
      },
      oldList(val) {
        this.selectList = val
      }
    }
  }
</script>
<style>
  .good-select .el-upload__input {
    display: none !important;
  }

  .good-select .el-menu {
    height: 100%;
  }

  .good-select .el-tabs__header {
    background-color: #2b2b2b;
    margin: 0px;
  }

  .good-select .el-tabs__item.is-active {
    color: #fdfdfd;
  }

  .good-select .el-tabs__item {
    width: 50%;
    text-align: center;
  }

  .good-select .el-tabs__active-bar {
    width: 40% !important;
    margin-left: 5%;
    /* background: -webkit-gradient(linear,right top, left top,color-stop(0, #3b9eff),to(#19c3ff)); */
    /* background: linear-gradient(to left,#3b9eff 0,#19c3ff 100%); */
    background-color: #ffffff;
  }

  .good-select .el-tabs__nav {
    width: 100%;
    background-color: inherit;
  }
  .el-slider__bar{
    background-color: #ffdb05;
  }
  @media (max-width:768px) {
    .good-select .el-tabs__nav {
      width: 100%;
      background-color:#272727;
      color: #ffff;
    }

    .good-select .el-tabs__active-bar {
     /* background: linear-gradient(to left, #3b9eff 0, #19c3ff 100%); */
     background-color: #272727;
    }

    .el-tabs__header {
      margin-bottom: 0rem;
    }

    .good-select .el-tabs__item {
      height: 2.6rem;
      line-height: 2.6rem;
      font-size: 1.17rem;
      letter-spacing: 1px;
      color: #dadada;
    }

    .good-select .el-tabs__item.is-active {
      /* color: #000000; */
      color: white;
    font-weight: 600;
    }
  }
</style>

<style scoped>
  .title {
    color: white;
    font-weight: 600;
    letter-spacing: 2px;
  }

  .box {
    padding: 15px
  }

  .upload_warp_img_div_del {
    position: absolute;
    top: 5px;
    width: 16px;
    right: 10px;
    font-size: 20px;
    z-index: 9;
    color: white;
  }

  .upload_warp_img_div_del:hover {
    color: #293036;
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
    height: 110px;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    line-height: 110px;
    cursor: pointer;
    border-radius: 4px;
    position: relative;
  }

  .select_type_bar {
    position: absolute;
    left: 0;
    top: 0;
    background: #42423c;
    z-index: 19;
    width: 100%;
  }

  .good_list {
    position: relative;
    padding: 0px 15px;
  
  }

  .good_list>.row>div {
    margin-top: 15px;
  }

  .col_reset {
    padding: 0px;
  }

  .loader {
    width: 100%;
    text-align: center;
    padding: 20px;
  }

  .loader-inner>div {
    background: #ffa538;
  }

  .menu_item {
    display: inline-block;
    padding: 0 10px 10px;
  }

  .search_bar {
    padding: 10px;
  }

  .bg_yellow {
    background: #999;
  }

  .top-bar {
    position: relative;
    width: 100%;
    background-color: #2b2b2b;
    padding: 15px;
  }

  .bottom-bar {
    position: absolute;
    bottom: 0px;
    width: 100%;

    width: 100%;
    border: 0px;
    background: linear-gradient(to left, #3b9eff 0, #19c3ff 100%);
    color: white;
    font-size: 1.5rem;
    height: 46px;
    padding: 0px 15px;
    line-height: 46px;
  }

  @media (max-width:768px) {
    .good_list .row {
      overflow-y: hidden;
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      display: -webkit-box;
      margin: 0 auto;
    }

    .good-select {
      background-color: inherit;
      overflow: hidden;
      -webkit-transition: all .2s ease-out 0s;
      transition: all .2s ease-out 0s;
      height: auto;
      margin: 0px;
      padding: 0px;
      min-height: 120px;
    }

    .good_list {
      /* background-color: #f7f7f7; */
      background-color: #272727; 
      padding: 5px 15px;
      height: auto;
      box-sizing: border-box;
    }

    .good_list .row article {
      float: none;
      padding: 0px 5px;
      margin-bottom: 0px;
    

    }

    .upload_warp_img_div {
      height: 80px;
      line-height: 80px;
      border-radius: 0px;
    }
  }
</style>
