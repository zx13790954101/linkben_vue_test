
<template>
  <div class="good-select">
    <Matting></Matting>
    <!-- 商品列表 -->
    <div class="good_list ">
      <div class="row">
        <div class="col-lg-6">
          <upload @imgList='setImgList' ></upload>
        </div>
        <div class="col-lg-6" v-for="(item,index) in goodsList" v-on:click="selectGood(index)">
          <div class="upload_warp_img_div " :class="item.checked?'bg_yellow':''">
            <div class="upload_warp_img_div_top">
              <div class="upload_warp_img_div_text">
                {{item.name}}
              </div>
              <img src="../../../static/images/upload/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
            </div>
            <good-img :url="item.url" :noStock="item.number==0?true:false" :key="item.id"></good-img>
          </div>
        </div>

      </div>

      <!-- loading动画 -->
      <div class="loader" v-show="showLoading">
        <div class="loader-inner line-scale-pulse-out">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

    </div>
    
  </div>
</template>

<script>
import GoodImg from './components/GoodImg.vue'
import MyHeader from './components/MyHeader.vue'
import TypeSelect from './components/TypeSelect.vue'
import Upload from '../../pages/common/Upload.vue'
import Matting from './Matting.vue'
import bus from '../../assets/bus'
export default {
  name: 'good-select',
  components: { Matting,GoodImg, MyHeader, TypeSelect, Upload },
  props: ['deleteUrl', 'oldList'],
  data() {
    return {
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
      }
    }
  },
  mounted: function() {
    //console.log(sessionStorage.curGoodsList);
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
    $('.good_list').scroll(function(e) {
      // console.log('sroll');
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
    console.log('sss', that.goodsList)
    //请求商品类型
    //  that.GetGoodCategorys();
    //商品区域类型
    //   that.GetGoodAreas();
    //商品风格类型
    //  that.GetGoodStyles();
    //请求商品面积类型
    //    that.GetGoodMianJis();
    var that = this
    bus.$on('clearGoodList', function(flag) {
      if (flag) {
        $(that.goodsList).each(function(index, element) {
          element.checked = false
        })
      }
    })
  },
  methods: {
    fileDel(index) {
      var that = this
      this.goodsList.splice(index, 1)
    },
    setImgList(data) {
      var that = this
      that.goodsList = data
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
      $(this.goodsList).each(function(index2, ele2) {
        var isSame = false
        $(that.selectList).each(function(index, ele) {
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
      this.goodsList[index].checked = !this.goodsList[index].checked
      if (this.goodsList[index].checked) {
        this.addGood(this.goodsList[index])
        //this.selectList.push(this.goodsList[index]);
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
      $(this.selectList).each(function(index, ele) {
        if (ele.id == val.id) {
          add = false
          return false
        }
      })

      if (add) this.selectList.push(val)
    },
    reduceGood(val) {
      console.log('reduceGood', val)
      var reduce = false
      var deleteIndex = 0
      $(this.selectList).each(function(index, ele) {
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
    setSearchCarId: function(data) {
      if (data) {
        this.searchData.catId = '(' + data + ')'
      } else {
        this.searchData.catId = ''
      }

      //console.log(this.searchData);

      this.searchReset()
      this.getGoodsList()
    },
    setSearchStyle: function(data) {
      this.searchData.style = data
      //console.log(this.searchData);

      this.searchReset()
      this.getGoodsList()
    },
    setSearchArea: function(data) {
      this.searchData.area = data
      //console.log(this.searchData);

      this.searchReset()
      this.getGoodsList()
    },
    setSearchMianJis: function(data) {
      this.searchData.mainji = data
      //console.log(this.searchData);

      this.searchReset()
      this.getGoodsList()
    },
    setSearchSelectType: function(data) {
      this.searchData.selectType = data
      //console.log(this.searchData);

      this.searchReset()
      this.getGoodsList()
    },
    GetGoodMianJis: function() {
      var that = this
      that.$http
        .get(globalPath + '/GetGoodMianJis', {
          params: {
            userId: sessionStorage.userId || 0
          }
        })
        .then(function(res) {
          //console.log(res);
          if (typeof res.body != 'object') {
            that.$message.error('没有请求到数据')
          }
          $(res.body).each(function(index, element) {
            //console.log(element)
            that.goodMianJisList.push({
              id: element.id,
              count: element.count,
              name: element.mianji
            })
          })
        })
    },
    GetGoodStyles: function() {
      var that = this
      that.$http
        .get(globalPath + '/GetGoodStyles', {
          params: {
            userId: sessionStorage.userId || 0
          }
        })
        .then(function(res) {
          //console.log(res);
          if (typeof res.body != 'object') {
            that.$message.error('没有请求到数据')
          }
          $(res.body).each(function(index, element) {
            //console.log(element)
            that.goodStylesList.push({
              id: element.id,
              count: element.count,
              name: element.styleName
            })
          })
        })
    },
    GetGoodAreas: function() {
      var that = this
      that.$http
        .get(globalPath + '/GetGoodAreas', {
          params: {
            userId: sessionStorage.userId || 0
          }
        })
        .then(function(res) {
          //console.log(res);
          if (typeof res.body != 'object') {
            that.$message.error('没有请求到数据')
            return
          }
          $(res.body).each(function(index, element) {
            //console.log(element)
            that.goodAreasList.push({
              id: element.id,
              count: element.count,
              name: element.area
            })
          })
        })
    },
    GetGoodCategorys: function() {
      var that = this
      that.$http
        .get(globalPath + '/GetGoodCategorys', {
          params: {
            userId: sessionStorage.userId || 0
          }
        })
        .then(function(res) {
          //console.log(res);
          if (typeof res.body != 'object') {
            that.$message.error('没有请求到数据')
            return
          }
          $(res.body).each(function(index, element) {
            //console.log(element)
            that.goodCategorysList.push({
              id: element.catId,
              count: element.count,
              name: element.name
            })
          })
        })
    },
    searchReset: function() {
      this.searchData.pageIndex = 0
      this.goodsList = []
      this.showLoading = true
    },
    /*setCurGood: function (index) {

        this.goodsList[index].checked = true;

      },*/
    answer: function() {},
    getGoodsList: function() {
      var that = this
      // var res=JSON.parse('[{"id":220170900001877,"typeName":"null%2C0%2C228160600000007",
      // "styleName":"%E5%B9%B3%E6%9D%BF%E9%93%9D%E6%9D%90%E7%81%AF",
      // "areaName":"%E5%AE%A2%E5%8E%85%3B+%E4%B9%A6%E6%88%BF",
      // "mianjiName":"25-35%E3%8E%A1",
      // "goodName":"%E5%B9%B3%E6%9D%BF%E9%93%9D%E6%9D%90%E7%81%AF%E5%AE%A2%E5%8E%85%3B+%E4%B9%A6%E6%88%BF%E5%90%B8%E9%A1%B6%E7%81%AF80001812"
      // ,"goodCode":"80001812","code":"JKX1181%2F1117",
      // "goodMoney":954.25,
      // "offMoney":0.0,"number":352,"weight":0.0,
      // "shopMoney":0.0,"mainImage":"http%3A%2F%2Forbi0d8g8.bkt.clouddn.com%2F220170900001877-e8aekejtug.png"
      // ,"thumbImage":"http%3A%2F%2Forbi0d8g8.bkt.clouddn.com%2Fthumb-220170900001877-omgmvfvzip.png",
      // "productImage":"http%3A%2F%2Forbi0d8g8.bkt.clouddn.com%2F220170900001877-dxz9qql1wd.png",
      // "isNew":"Y","isHot":"Y","isCheap":"Y",
      // "textPropertyList":[{"key":"%E4%B8%BB%E4%BD%93%E9%A2%9C%E8%89%B2",
      // "value":"%E5%93%91%E7%99%BD%2B%E5%9C%9F%E8%B1%AA%E9%87%91"},
      // {"key":"%E6%9D%90%E8%B4%A8","value":"%E9%93%9D%E6%9D%90%2BPV%E6%9D%BF"},
      // {"key":"%E5%85%89%E6%BA%90%2F%E5%8A%9F%E7%8E%87","value":"LED+240W+3000K%2B6800K"},
      // {"key":"%E7%89%B9%E7%82%B9","value":""},{"key":"%E8%A3%85%E7%AE%B1%E6%95%B0%E9%87%8F","value":"1"},
      // {"key":"%E5%B0%BA%E5%AF%B8","value":"1117*697*125%2F%E5%8F%8C%E8%89%B2%E5%85%89%E6%BA%90"}]
      // ,"planNum":0,"isValid":"Y","order":0}]');

      var res = ''
      //console.log(res);
      if (typeof res != 'object') {
        //that.$message.error('没有请求到数据');
        that.showLoading = false
        that.loading = false
        return
      }
      if (res.length < that.searchData.pageSize || res == 0) {
        this.showLoading = false
      }

      $(res).each(function(index, element) {
        element.checked = false
        element.needNum = 1
        element.thumbImage = decodeURIComponent(element.thumbImage)
        element.mainImage = decodeURIComponent(element.mainImage)
      })

      console.log(res)
      that.goodsList.push(...res)
      that.searchData.pageIndex++
      that.loading = false

      that.checkSelect()
    }
  },
  computed: {
    /*curGoodList: function () {
        var array = [];
        if(this.goodsList.length!=0){
          $(this.goodsList).each(function (index, element) {
            if (element.checked) {
              array.push(element);
            }
          });
        }
        console.log('computed',array);
        this.$emit('curGoodList', array);
        return array;
      }*/
  },
  watch: {
    selectList: function(val) {
      this.checkSelect()
      this.$emit('curGoodList', val)
    },
    deleteUrl: function(url) {
      var reduce = false
      var deleteIndex = 0
      $(this.selectList).each(function(index, ele) {
        if (ele.mainImage == url) {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-upload__input {
  display: none !important;
}
.el-menu {
  height: 100%;
}
</style>

<style scoped>
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
  height: 100px;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    line-height: 100px;
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

.good_list>.row>div{
   margin-top:15px;
}
.col_reset {
  padding: 0px;
}

.loader {
  width: 100%;
  text-align: center;
  padding: 20px;
}

.loader-inner > div {
  background: #ffa538;
}

.menu_item {
  display: inline-block;
  padding: 0 10px 10px;
}

.select_type_bar {
}

.search_bar {
  padding: 10px;
}
.bg_yellow {
  background: #999;
}
</style>
