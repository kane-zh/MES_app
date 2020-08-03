<template>
    <div class="productStock">
       <!-- 列表页显示-->
      <div  class="list">
        <div class="title">
          <span>产品库存</span>
          <div class="button" >
            <button @click="goback" v-show="showSearchView===false">
              <img  height=100% src="../../../../../static/icon/undo.png"/>
            </button>
            <button @click="showSearchView=true" v-show="showSearchView===false">
              <img  height=100% src="../../../../../static/icon/search.png"/>
            </button>
            <button @click="showSearchView=false" v-show="showSearchView===true">
              <img  height=100% src="../../../../../static/icon/undo.png"/>
            </button>
          </div>
      </div>
      <div class="search" v-show="showSearchView===true">
        <div>仓库:
          <select v-model="selectItem.warehouse">
            <option selected hidden disabled value="">请选择仓库</option>
            <option v-for="item in warehouse" :value="item.code" :key="item.code">{{item.name}}</option>
          </select>
        </div>
        <div>产品类型：
          <select v-model="selectItem.productType">
            <option selected hidden disabled value="">请选择产品类型</option>
            <option v-for="item in productType" :value="item.code" :key="item.code">{{item.name}}</option>
          </select>
        </div>
        <div>排序:
            <select v-model="ordering">
              <option selected hidden disabled value="">请选择排序方式</option>
              <option value="id">添加时间正序</option>
              <option value="-id">添加时间倒序</option>
              <option value="update_time">更新时间正序</option>
              <option value="-update_time">更新时间倒序</option>
            </select>
          </div>
        <div>关键字:
          <input v-model="selectItem.searchValue" type="text" placeholder="  请输入要搜索的信息...">
        </div>
        <div style="border: none">

        </div>
        <div style="border: none">
          <button  @click="clear" style="background: #1EBC85 100%">清除</button>
          <button  @click="select" style="background: #2E7DFF 100%">确定</button>
        </div>
      </div>
        <div class="table" id="listScroll"  v-show="showSearchView===false">
          <ul>
            <li v-for="item in list" :key="item.id" @click="showDetailView(item.id)">
              <div class="heard">
                <span class="name">{{"【"+item.warehouse_name+"】"}}</span>
                <span class="code">{{item.warehouse_code}}</span>
              </div>
              <div class="content">
                <span class="goodsType_name">产品类型：{{"【"+item.productType_name+"】"}}</span>
                <span class="goodsType_code">{{item.productType_code}}</span>
                <span class="goods_name">产品{{"【"+item.product_name+"】"}}</span>
                <span class="goods_code">{{item.product_code}}</span>
                <span class="batch">批次:{{item.batch}}</span>
                <span class="sum">数量:{{item.sum}}</span>
                <span class="dataTime">更新时间:{{item.update_time}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'productStock',
  components: {},
  data () {
    return {
      /* 列表页数据 */
      showSearchView: false,
      list: [],
      listCount: 0,
      listNextUrl: '',
      listScroll: null,
      /* 列表查询参数 */
      selectItem: {
        warehouse: '',
        productType: '',
        searchValue: ''
      },
      /* 列表页数据排序 */
      ordering: '-id',
      /* 创建页表单项数据 */
      formItem: {
        id: '',
        state: '',
        alter: []
      },
      warehouse: [],
      productType: [],
      /* 具有审核权限的账号信息: */
      userinfor: []
    }
  },
  methods: {
    /* 显示列表视图 */
    showListView: function () {
      this.list = [] // 清空列表数据
      this.listCount = 0
      this.listNextUrl = ''
      for (let key in this.selectItem) {
        this.selectItem[key] = ''
      }
      var self = this
      this.$axios.get('warehouse/productStockInfor/?ordering=' + self.ordering).then(function (response) {
        self.list = response.data.results
        self.listCount = response.data.count
        if (response.data.next !== null) {
          self.listNextUrl = response.data.next.replace(self.$axios.defaults.baseURL, '')
        }
        self.showViewid = 'list'
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    /* 列表查询数据 */
    select () {
      this.list = [] // 清空列表数据
      this.listCount = 0
      this.listNextUrl = ''
      this.showSearchView = false
      var self = this
      this.$axios.get('warehouse/productStockInfor/?warehouse_code=' + self.selectItem.warehouse +
                '&productType_code=' + self.selectItem.productType +
                '&search=' + self.selectItem.searchValue +
                '&ordering=' + self.ordering).then(function (response) {
        self.list = response.data.results
        self.listCount = response.data.count
        if (response.data.next !== null) {
          self.listNextUrl = response.data.next.replace(self.$axios.defaults.baseURL, '')
        }
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    clear () {
      this.searchItem.warehouse = ''
      this.searchItem.productType = ''
      this.searchItem.searchValue = ''
      this.select()
    },
    goback () {
      this.$router.replace({name: 'Home'})
    },
    scrollEvent () {
      if (this.listScroll.scrollTop + this.listScroll.clientHeight === this.listScroll.scrollHeight) {
        this.listNext()
      }
    },

    listNext () {
      var self = this
      if (this.listNextUrl === '') {
        return
      }
      this.$axios.get(this.listNextUrl).then(function (response) {
        self.listNextUrl = ''
        response.data.results.forEach(function (value, i) {
          self.list.push(value)
        })
        if (response.data.next !== null) {
          self.listNextUrl = response.data.next.replace(self.$axios.defaults.baseURL, '')
        }
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    }
  },
  mounted () {
    this.listScroll = document.getElementById('listScroll')
    window.addEventListener('scroll', this.scrollEvent, true)
  },
  computed: {
    username () {
      return this.$store.getters.getuserInfor.name
    },
    is_superuser () {
      return this.$store.getters.getuserInfor.is_superuser
    },
    permissions () {
      return this.$store.getters.getuserInfor.permissions
    }
  },
  created () {
    var self = this
    this.$axios.get('warehouse/warehouse/?page_size=99999&ordering=-id&type=产品库&state=使用中').then(function (response) {
      self.warehouse = response.data.results
      self.$axios.get('process/productType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
        self.productType = response.data.results
        self.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
          self.userInfor = response.data.results
          self.showListView()
        }).catch(function (err) {
          if (err.request) {
            alert(err.request.response)
          } else {
            console.log('Error', err.message)
          }
        })
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    }).catch(function (err) {
      if (err.request) {
        alert(err.request.response)
      } else {
        console.log('Error', err.message)
      }
    })
  }
}
</script>
<style scoped>
  .productStock{
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .list{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .list .title{
    position: absolute;
    top: 0;
    width: 100%;
    height: 5%;
    font-family: PingFangSC-Semibold;
    font-size: 0.6em;
    line-height: 2em;
    color: #151515;
    text-align: center;
  }
  .list .title .button{
    position: absolute;
    top: 0;
    right: 0;
    width: 30%;
    height: 100%;
  }
  .list .title .button button{
    position: relative;
    top: 20%;
    width: 30%;
    height: 60%;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
    margin-right: 10%;
    float: right;
  }
  .list .title #add{
    position: absolute;
    top: 20%;
    left: 3%;
    width: 9%;
    height: 60%;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .list .search{
    position: absolute;
    top: 7%;
    width: 96%;
    height: 90%;
    margin-left: 2%;
    margin-right: 2%;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;
    line-height: 2em;
    color: #000000;
  }
  .list .search div{
    position: relative;
    width: 100%;
    height: 7%;
    line-height: 2.5em;
    border-bottom:2px dashed rgba(100, 100, 100, 0.5);
  }
  .list .search select{
    position: absolute;
    top: 20%;
    right: 0;
    width: 60%;
    height: 60%;
    font-size: 0.8em;
    border: 1px solid #015afe;
    background: #ffffff;
    border-radius: 1em;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background: #ffffff;
    border: none;
  }
  .list .search input{
    position: absolute;
    top: 20%;
    right: 0;
    width: 60%;
    height: 60%;
    font-size: 0.8em;
    background: #ffffff;
    border: none;
  }
  .list .search button{
    position: relative;
    margin-left: 7%;
    width: 40%;
    height: 90%;
    font-size: 0.8em;
    border: 1px solid #015afe;
    border-radius: 1em;
    float: left;
  }  .list .table{
    position: relative;
    top: 5%;
    width: 100%;
    height: 95%;
    overflow: auto;
    overflow-x: hidden;
  }
  .list .table ul{
    position: absolute;
    top: 0;
    width: 96%;
    height: 100%;
    padding-right: 2%;
    padding-left:2%;
    font-family: PingFangSC-Regular;
    font-size: 0.4em;
    line-height: 2em;
    color: #151515;
  }
  .list .table li{
    position: relative;
    top: 0;
    height: 20%;
    border-bottom:15px solid #F1F1F1;
  }
  .list .table li .heard{
    position: absolute;
    top: 0;
    height: 25%;
    width: 100%;
    font-family: PingFangSC-Medium;
    font-size: 1em;
    line-height: 2em;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    display: inline-block;
    border-bottom:2px dashed rgba(100, 100, 100, 0.5);
    border-left:15px solid #2E7DFF;
  }
  .list .table .heard .name{
    position: absolute;
    top:0;
    left: 0%;
    width: 45%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .heard .code{
    position: absolute;
    top:0;
    left: 50%;
    width: 50%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table li .content{
    position: absolute;
    bottom: 0;
    height: 75%;
    width: 100%;
    font-family: PingFangSC-Medium;
    font-size: 0.8em;
    line-height: 2em;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    display: inline-block;
  }
  .list .table .content .goodsType_name{
    position: absolute;
    top:0;
    left: 1%;
    width: 60%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .goodsType_code{
    position: absolute;
    top: 0;
    left: 60%;
    width: 40%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .goods_name{
    position: absolute;
    top:25%;
    left: 1%;
    width: 60%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .goods_code{
    position: absolute;
    top: 25%;
    left: 60%;
    width: 40%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .sum{
    position: absolute;
    top: 50%;
    left: 1%;
    width: 60%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .batch{
    position: absolute;
    top: 50%;
    left: 60%;
    width: 40%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .dataTime{
    position: absolute;
    top: 75%;
    left: 1%;
    width: 100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
</style>
