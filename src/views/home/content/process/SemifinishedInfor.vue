<template>
  <div class="semifinishedInfor">
    <!-- 列表页显示-->
    <div  class="list"  v-show="showViewid==='list'">
      <div class="title">
        <span>半成品信息</span>
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
           <div>创建账号:
            <select v-model="selectItem.create_user">
              <option selected hidden disabled value="">请选择创建账号</option>
              <option v-for="item in userInfor" :value="item.username" :key="item.username">{{item.username}}</option>
            </select>
          </div>
          <div>审核账号:
            <select v-model="selectItem.auditor">
              <option selected hidden disabled value="">请选择审核账号</option>
              <option v-for="item in userInfor" :value="item.username" :key="item.username">{{item.username}}</option>
            </select>
          </div>
          <div>类型:
            <select v-model="selectItem.type">
              <option selected hidden disabled value="">请选择类型</option>
              <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
            </select>
          </div>
          <div>状态:
            <select v-model="selectItem.state" >
              <option selected hidden disabled value="">请选择状态</option>
              <option value="新建">新建</option>
              <option value="审核中">审核中</option>
              <option value="使用中">使用中</option>
            </select>
          </div>
          <div>排序:
            <select v-model="selectItem.ordering"  >
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
             <button  @click="showListView" style="background: #1EBC85 100%">清除</button>
             <button  @click="select" style="background: #2E7DFF 100%">确定</button>
          </div>
      </div>
      <div class="table" id="listScroll"  v-show="showSearchView===false">
        <ul>
          <li v-for="item in list" :key="item.id" @click="showDetailView(item.id)">
            <div class="heard">
              <span class="state" v-show="item.state==='新建'" style="background: #FEC847;">新</span>
              <span class="state" v-show="item.state==='审核中'" style="background: #FE4747;">审</span>
              <span class="state" v-show="item.state==='使用中'" style="background-color: #61c255">启用</span>
              <span class="name">{{"【"+item.name+"】"}}</span>
              <span class="code">{{item.code}}</span>
            </div>
            <div class="content">
              <image class="image"></image>
              <span class="typename">类型：{{"【"+item.type.name+"】"}}</span>
              <span class="typecode">{{item.type.code}}</span>
              <span class="create">创建账号:{{item.create_user}}</span>
              <span class="auditor">审核账号:{{item.auditor}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--   /*详情页显示*/-->
    <div  class="detail"  v-show="showViewid==='detail'">
      <div class="title">
        <span>半成品信息详情</span>
        <div class="button" >
          <button @click="showViewid='list'" >
            <img  height=100% src="../../../../../static/icon/undo.png"/>
          </button>
        </div>
      </div>
      <div class="content">
          <div >
            <span class="name">信息名称:</span>
            <span class="code">{{detail.name}}</span>
          </div>
          <div >
            <span class="name">信息编码:</span>
            <span class="code">{{detail.code}}</span>
          </div>
          <div >
            <span class="name">状态:</span>
            <span class="code">{{detail.state}}</span>
          </div>
          <div >
            <span class="name">类型名称:</span>
            <span class="code">{{type.name}}</span>
          </div>
          <div >
            <span class="name">类型编码:</span>
            <span class="code">{{type.code}}</span>
          </div>
          <div >
            <span class="name">单位名称:</span>
            <span class="code">{{unit.name}}</span>
          </div>
          <div >
            <span class="name">单位编码:</span>
            <span class="code">{{unit.code}}</span>
          </div>
          <div >
            <span class="name">单位状态:</span>
            <span class="code">{{unit.state}}</span>
          </div>
          <div >
            <span class="name">生产线路类型名称:</span>
            <span class="code">{{detail.routeType_name}}</span>
          </div>
          <div >
            <span class="name">生产线路类型编码:</span>
            <span class="code">{{detail.routeType_code}}</span>
          </div>
          <div >
            <span class="name">生产线路名称:</span>
            <span class="code">{{detail.route_name}}</span>
          </div>
          <div >
            <span class="name">生产线路编码:</span>
            <span class="code">{{detail.route_code}}</span>
          </div>
          <div v-show="attribute_title.attribute1!==''">
            <span class="name">{{attribute_title.attribute1 +":"}}</span>
            <span class="code">{{detail.attribute1}}</span>
          </div>
                   <div v-show="attribute_title.attribute2!==''">
            <span class="name">{{attribute_title.attribute2 +":"}}</span>
            <span class="code">{{detail.attribute2}}</span>
          </div>
          <div v-show="attribute_title.attribute3!==''">
            <span class="name">{{attribute_title.attribute3 +":"}}</span>
            <span class="code">{{detail.attribute3}}</span>
          </div>
          <div v-show="attribute_title.attribute4!==''">
            <span class="name">{{attribute_title.attribute4 +":"}}</span>
            <span class="code">{{detail.attribute4}}</span>
          </div>
          <div v-show="attribute_title.attribute5!==''">
            <span class="name">{{attribute_title.attribute5 +":"}}</span>
            <span class="code">{{detail.attribute5}}</span>
          </div>
          <div v-show="attribute_title.attribute6!==''">
            <span class="name">{{attribute_title.attribute6 +":"}}</span>
            <span class="code">{{detail.attribute6}}</span>
          </div>
          <div v-show="attribute_title.attribute7!==''">
            <span class="name">{{attribute_title.attribute7 +":"}}</span>
            <span class="code">{{detail.attribute7}}</span>
          </div>
          <div v-show="attribute_title.attribute8!==''">
            <span class="name">{{attribute_title.attribute8 +":"}}</span>
            <span class="code">{{detail.attribute8}}</span>
          </div>
          <div v-show="attribute_title.attribute9!==''">
            <span class="name">{{attribute_title.attribute9 +":"}}</span>
            <span class="code">{{detail.attribute9}}</span>
          </div>
          <div v-show="attribute_title.attribute10!==''">
            <span class="name">{{attribute_title.attribute10 +":"}}</span>
            <span class="code">{{detail.attribute10}}</span>
          </div>
          <div >
            <span class="name">创建账号:</span>
            <span class="code">{{detail.create_user}}</span>
          </div>
          <div >
            <span class="name">审核账号:</span>
            <span class="code">{{detail.auditor}}</span>
          </div>
          <div >
            <span class="name">创建时间:</span>
            <span class="code">{{detail.create_time}}</span>
          </div>
          <div >
            <span class="name">更新时间:</span>
            <span class="code">{{detail.update_time}}</span>
          </div>
          <div >
            <span class="name">备注信息:</span>
            <span class="code">{{detail.desc}}</span>
          </div>
          <dl>
            <dt>图片:</dt>
            <template v-for="(value,id) in detail.image">
              <a target='_black' v-bind:key="id" :href="value.image" ><img :src="value.image"></a>
            </template>
          </dl>
          <dl>
            <dt>文件:</dt>
            <template v-for="(value,id) in detail.file">
              <a target='_black' v-bind:key="id" :href="value.file">{{value.file_name}}</a>
            </template>
          </dl>

      </div>

       <div class="button">
        <button type="button" @click="changeState('审核中')" v-show="showSubmitBt===true">提交数据</button>
        <button type="button" @click="changeState('使用中')" v-show="showApprovedBt===true" >通过审核</button>
        <button type="button" @click="changeState('新建')" v-show="showReturnBt===true">驳回信息:</button>
        <button type="button" @click="changeState('作废')" v-show="showDeleteBt===true">删除数据</button>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'semifinishedInfor',
  components: {
  },
  data () {
    return {
      /* 视图显示控制 */
      showViewid: 'list',
      showSearchView: false,
      /* 列表页数据 */
      list: [],
      listCount: 0,
      listNextUrl: '',
      listScroll: '',
      /* 列表页查询参数 */
      selectItem: {
        state: '',
        create_user: '',
        auditor: '',
        type: '',
        searchValue: '',
        ordering: ''
      },

      /* 创建页表单项数据 */
      formItem: {
        id: '',
        state: ''
      },
      /* 详情页数据 */
      detail: [],
      type: {},
      unit: {},
      productRoute: {},
      /* 详情页按钮显示控制 */
      showSubmitBt: false,
      showReturnBt: false,
      showApprovedBt: false,
      showDeleteBt: false,
      /* 半成品类型信息 */
      typeInfor: [],
      /* 计量单位类型信息 */
      unitType: [],
      /* 计量单位信息: */
      unitInfor: [],
      /* 生产线路类型信息 */
      productRouteType: [],
      /* 生产线路信息: */
      productRouteInfor: [],
      /* 具有审核权限的账号信息: */
      userInfor: [],
      /* 附加属性标题 */
      attribute_title: {
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: '',
        attribute6: '',
        attribute7: '',
        attribute8: '',
        attribute9: '',
        attribute10: ''
      }

    }
  },
  methods: {
    /* 显示列表视图 */
    showListView: function () {
      this.list = [] // 清空列表数据
      this.listCount = 0
      this.listNextUrl = ''
      this.showSearchView = false
      for (let key in this.selectItem) {
        this.selectItem[key] = ''
      }
      var self = this
      this.$axios.get('process/semifinishedInfor/?ordering=' + self.selectItem.ordering).then(function (response) {
        self.list = response.data.results
        self.listCount = response.data.count
        if (response.data.next !== null) {
          self.listNextUrl = response.data.next.replace(self.$axios.defaults.baseURL, '')
        }
        self.showViewid = 'list'
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 列表查询数据 */
    select () {
      this.list = [] // 清空列表数据
      this.listCount = 0
      this.listNextUrl = ''
      this.showSearchView = false
      var self = this
      this.$axios.get('process/semifinishedInfor/?state=' + self.selectItem.state +
              '&auditor=' + self.selectItem.auditor +
              '&create_user=' + self.selectItem.create_user +
              '&type=' + self.selectItem.type +
              '&search=' + self.selectItem.searchValue +
              '&ordering=' + self.selectItem.ordering).then(function (response) {
        self.list = response.data.results
        self.listCount = response.data.count
        if (response.data.next !== null) {
          self.listNextUrl = response.data.next.replace(self.$axios.defaults.baseURL, '')
        }
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
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
        // 错误提示
        console.log(err)
      })
    },
    /* 显示详情视图 */
    showDetailView (id) {
      this.detail = [] // 清空详情数据
      this.type = {}
      var self = this
      this.$axios.get(`process/semifinishedInfor/` + id).then(function (response) {
        self.detail = response.data
        self.type = self.detail.type
        self.unit = self.detail.unit
        self.productRoute = self.detail.productRoute
        self.formItem.type = self.detail.type.id
        self.showViewid = 'detail'
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 改变数据项状态 */
    changeState (state) {
      var self = this
      if (!confirm('确认提交??')) {
        return
      }
      this.formItem.state = state
      this.$axios.patch(`process/semifinishedInfor/` + self.detail.id + '/', {
        state: self.formItem.state

      }).then(function (response
      ) {
        self.detail.state = self.formItem.state
        self.formItem.state = ''

        if (self.detail.state === '作废') {
          self.showListView()
        }
        alert('数据提交成功')
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    }
  },
  created () {
    this.userInfor = []
    this.typeInfor = []
    this.unitType = []
    this.unitInfor = []
    this.productRouteType = []
    this.productRouteInfor = []
    var self = this
    this.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
      self.userInfor = response.data.results
      self.$axios.get('process/semifinishedType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
        self.typeInfor = response.data.results
        self.$axios.get('process/unitType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
          self.unitType = response.data.results
          self.$axios.get('process/productRouteType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
            self.productRouteType = response.data.results
            self.showListView()
          }).catch(function (err) {
            // 错误提示
            console.log(err)
          })
        }).catch(function (err) {
          // 错误提示
          console.log(err)
        })
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    }).catch(function (err) {
      if (err.request) {
        alert(err.request.response)
      } else {
        console.log('Error', err.message)
      }
    })
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
    },
    canCreate () {
      return 'process.add_semifinishedinfordefinitionmodel' in this.permissions
    },
    canRead () {
      return 'process.read_semifinishedinfordefinitionmodel' in this.permissions
    }

  },
  watch: {
    'type': function (newval, oldval) {
      var self = this
      for (let key in self.attribute_title) {
        self.attribute_title[key] = ''
      }
      if (newval.id === undefined) {
        return
      }
      this.$axios.get(`process/semifinishedType/` + newval.id).then(function (response) {
        if (response.data.attach_attribute !== null) {
          var result = response.data.attach_attribute.split(';')
          if (result.length > 0) {
            result.forEach(function (value, i) {
              var data = value.split(':')
              if (data.length === 2) {
                self.attribute_title[data[0]] = data[1]
              }
            })
          }
        }
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 监控状态信息变化,控制操作按钮的显示 */
    'detail.state': function (newval, oldval) {
      var self = this
      self.showSubmitBt = false
      self.showDeleteBt = false
      self.showReturnBt = false
      self.showApprovedBt = false
      if (self.detail.state === '审核中' && ((self.detail.auditor === self.username) || (self.is_superuser === true))) {
        self.showApprovedBt = true
        self.showReturnBt = true
      }
      if (self.detail.state === '新建' && ((self.detail.create_user === self.username) || (self.is_superuser === true))) {
        self.showSubmitBt = true
        self.showDeleteBt = true
      }
    }
  }
}
</script>
<style scoped lang="scss" >
  .semifinishedInfor{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    .list{
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      .title{
        position: absolute;
        top: 0;
        width: 100%;
        height: 5%;
        font-family: PingFangSC-Semibold;
        font-size: 0.6em;
        line-height: 2em;
        color: #151515;
        text-align: center;
        .button{
          position: absolute;
          top: 0;
          right: 0;
          width: 30%;
          height: 100%;
          button{
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
        }
        #add{
          position: absolute;
          top: 20%;
          left: 3%;
          width: 9%;
          height: 60%;
          background: #ffffff;
          border: 1px solid #363E42;
          border-radius: 13px;
        }
      }
      .search{
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
        div{
          position: relative;
          width: 100%;
          height: 7%;
          line-height: 2.5em;
          border-bottom:2px dashed rgba(100, 100, 100, 0.5);
          select{
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
          input{
            position: absolute;
            top: 20%;
            right: 0;
            width: 60%;
            height: 60%;
            font-size: 0.8em;
            background: #ffffff;
            border: none;
          }
          button{
            position: relative;
            margin-left: 7%;
            width: 40%;
            height: 90%;
            font-size: 0.8em;
            border: 1px solid #015afe;
            border-radius: 1em;
            float: left;
          }
        }
      }
      .table{
        position: relative;
        top: 5%;
        width: 100%;
        height: 95%;
        overflow: auto;
        overflow-x: hidden;
        ul{
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
          li{
            position: relative;
            top: 0;
            height: 15%;
            border-bottom:15px solid #F1F1F1;
            .heard{
              position: absolute;
              top: 0;
              height: 33%;
              width: 100%;
              font-family: PingFangSC-Medium;
              font-size: 1em;
              line-height: 2em;
              text-shadow: 0 2px 4px rgba(0,0,0,0.20);
              display: inline-block;
              border-bottom:2px dashed rgba(100, 100, 100, 0.5);
              border-left:15px solid #2E7DFF;
              .name{
                position: absolute;
                top:0;
                left: 0%;
                width: 45%;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
              }
              .code{
                position: absolute;
                top:0;
                left: 45%;
                width: 45%;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
              }
              .state{
                position: absolute;
                top:0;
                right: 0;
                width: 10%;
              }
            }
            .content{
              position: absolute;
              bottom: 0;
              height: 65%;
              width: 100%;
              font-family: PingFangSC-Medium;
              font-size: 0.8em;
              line-height: 2em;
              text-shadow: 0 2px 4px rgba(0,0,0,0.20);
              display: inline-block;
              .image{
                position: relative;
                top:0;
                left: 0;
                width: 10%;
                height: 60%;
              }
              .typename{
                position: absolute;
                top:0;
                left: 20%;
                width: 45%;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
              }
              .typecode{
                position: absolute;
                top: 0;
                left: 65%;
                width: 35%;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
              }
              .create{
                position: absolute;
                top:50%;
                left: 20%;
                width: 45%;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
              }
              .auditor{
                position: absolute;
                top:50%;
                left: 65%;
                width: 35%;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
              }
            }
          }
        }
      }
      .table::-webkit-scrollbar {
        display: none;
      }
    }
    .detail{
      position: relative;
      top: 0;
      width: 100%;
      height: 100%;
      .title{
        position: absolute;
        top: 0;
        width: 100%;
        height: 5%;
        font-family: PingFangSC-Regular;
        font-size: 0.6em;
        line-height: 2em;
        color: #151515;
        text-align: center;
        .button{
          position: absolute;
          top: 0;
          right: 0;
          width: 30%;
          height:100%;
          button{
            position: absolute;
            top: 20%;
            margin-right: 10%;
            width: 30%;
            height: 60%;
            background: #ffffff;
            border: 1px solid #363E42;
            border-radius: 13px;
          }
        }
      }
      .content{
        position: absolute;
        top: 5%;
        width: 96%;
        height: 80%;
        padding-left: 2%;
        padding-right: 2%;
        overflow: auto;
        overflow-x: hidden;
        div{
          position: relative;
          top: 0;
          height: 8%;
          width: 100%;
          text-shadow: 0 2px 4px rgba(0,0,0,0.20);
          border-bottom:2px dashed rgba(100, 100, 100, 0.3);
          .name{
            position: absolute;
            left: 0;
            width: 30%;
            height: 100%;
            font-family: PingFangSC-Medium;
            font-size: 0.6em;
            line-height: 2em;
            color: #151515;
            overflow-x: auto;
          }
          .code{
            position: absolute;
            right: 0;
            width: 70%;
            height: 100%;
            font-family: PingFangSC-Regular;
            font-size: 0.5em;
            line-height: 2.5em;
            color: #151515;
            overflow-x: auto;
            text-align: right;
          }
          dl{
            position: relative;
            top: 0;
            height: 15%;
            width: 100%;
            text-shadow: 0 2px 4px rgba(0,0,0,0.20);
            border-bottom:2px dashed rgba(100, 100, 100, 0.5);
            overflow-x: auto;
            dt{
              position: absolute;
              left: 0;
              font-family: PingFangSC-Regular;
              font-size: 0.6em;
              line-height: 1em;
              color: #151515;
              dd{
                position: relative;
                right: 0;
                font-family: PingFangSC-Regular;
                font-size: 0.5em;
                line-height: 2em;
                color: #151515;
              }
            }
            a{
              height: 100%;
              font-family: PingFangSC-Regular;
              font-size: 0.5em;
              line-height: 2em;
              float: right;
              margin-left: 5%;
              img{
                height: auto;
                width: auto;
                max-height: 95%;
              }

            }
          }
        }
      }
      .button{
        position: absolute;
        top: 92%;
        width: 96%;
        height: 8%;
        padding-left: 2%;
        padding-right: 2%;
        button{
          position: relative;
          margin-left: 7%;
          width: 40%;
          height: 50%;
          font-size: 0.5em;
          border: 1px solid #015afe;
          border-radius: 1em;
          float: left;
        }
      }
      .content::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>
