<template>
  <div class="vendorInfor">
    <!-- 列表页显示-->
    <div  class="list"  v-show="showViewid==='list'">
      <div class="title">
        <span>供应商信息</span>
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
          <div>状态:
                   <select v-model="selectItem.state" >
              <option selected hidden disabled value="">请选择状态</option>
              <option value="新建">新建</option>
              <option value="审核中">审核中</option>
              <option value="使用中">使用中</option>
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
              <span class="state" v-show="item.state==='新建'" style="background: #FEC847;">新</span>
              <span class="state" v-show="item.state==='审核中'" style="background: #FE4747;">审</span>
              <span class="state" v-show="item.state==='使用中'" style="background-color: #61c255">启用</span>
              <span class="name">{{"【"+item.name+"】"}}</span>
              <span class="code">{{item.code}}</span>
            </div>
            <div class="content">
              <image class="image"></image>
              <span class="company_name">厂商名{{item.company_name}}</span>
              <span class="address">地址:{{item.address}}</span>
              <span class="mobile">电话:{{item.mobile}}</span>
              <span class="wechat">微信:{{item.wechat}}</span>
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
        <span>供应商详情</span>
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
            <span class="name">地址:</span>
            <span class="code">{{detail.address}}</span>
          </div>
          <div >
            <span class="name">电话:</span>
            <span class="code">{{detail.mobile}}</span>
          </div>
          <div >
            <span class="name">传真:</span>
            <span class="code">{{detail.fax}}</span>
          </div>
          <div >
            <span class="name">微信:</span>
            <span class="code">{{detail.wechat}}</span>
          </div>
          <div >
            <span class="name">公司全称:</span>
            <span class="code">{{detail.company_name}}</span>
          </div>
          <div >
            <span class="name">公司简称:</span>
            <span class="code">{{detail.company_abbre}}</span>
          </div>
          <div >
            <span class="name">资质:</span>
            <span class="code">{{detail.qualification}}</span>
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
          <dl>
            <dt>审核记录:</dt>
            <template v-for="(value,id) in detail.alter">
              <dd v-bind:key="id">
                {{"&#12288;&#12288;&#12288;"+value.desc+"&#12288;" +value.create_user+"&#12288;"+value.create_time}}
              </dd>
            </template>
          </dl>
          <dl>
            <dt>新加记录:</dt>
            <template v-for="(value,id) in alterData">
              <dd v-bind:key="id">
                {{"&#12288;&#12288;&#12288;"+value.desc}}
              </dd>
            </template>
          </dl>
      </div>
      <div class="alter" v-show="detail.state!=='使用中'">
        审核信息:
        <input v-model="alterItem.desc" type="text" placeholder="  请输入当前信息:的审核记录...">
       <!--        <button type="button" @click="uploadAlter">提交记录</button>-->
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
  name: 'vendorInfor',
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
      listScroll: null,
      /* 列表页查询参数 */
      selectItem: {
        state: '',
        create_user: '',
        auditor: '',
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
      /* 详情页数据 */
      detail: [],
      type: {},
      /* 详情页审核记录项表单 */
      alterItem: {
        desc: '',
        uri: 'vendorInfor'
      },
      alterList: [],
      alterData: [],
      /* 详情页按钮显示控制 */
      showSubmitBt: false,
      showReturnBt: false,
      showApprovedBt: false,
      showDeleteBt: false,
      /* 供应商类型信息 */
      typeInfor: [],
      /* 具有审核权限的账号信息: */
      userInfor: [],
      /* 附加属性标题 */
      attribute_title: {
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: ''
      }

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
      this.$axios.get('plan/vendorInfor/?ordering=' + self.ordering).then(function (response) {
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
      this.$axios.get('plan/vendorInfor/?state=' + self.selectItem.state +
              '&auditor=' + self.selectItem.auditor +
              '&create_user=' + self.selectItem.create_user +
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
      this.selectItem.state = ''
      this.selectItem.create_user = ''
      this.selectItem.auditor = ''
      this.selectItem.searchValue = ''
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
    },
    /* 显示详情视图 */
    showDetailView (id) {
      this.detail = [] // 清空详情数据
      this.alterData = []// 清空审核数据
      this.type = {}
      var self = this
      this.$axios.get(`plan/vendorInfor/` + id).then(function (response) {
        self.detail = response.data
        self.type = self.detail.type
        self.showViewid = 'detail'
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    /* 改变数据项状态 */
    changeState (state) {
      var self = this
      if (!confirm('确认提交??')) {
        return
      }
      this.formItem.state = state
      this.$axios.patch(`plan/vendorInfor/` + self.detail.id + '/', {
        state: self.formItem.state,
        alter: self.formItem.alter
      }).then(function (response
      ) {
        self.detail.state = self.formItem.state
        self.formItem.state = ''
        self.formItem.alter = []
        if (self.detail.state === '作废') {
          self.showListView()
        }
        alert('数据提交成功')
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    }
  },
  created () {
    this.userInfor = []
    var self = this
    this.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
      self.userInfor = response.data.results
      self.$axios.get('plan/vendorType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
        self.typeInfor = response.data.results
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
      return 'plan.add_vendorinfordefinitionmodel' in this.permissions
    },
    canRead () {
      return 'plan.read_vendorinfordefinitionmodel' in this.permissions
    }

  },
  watch: {

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
<style scoped>
  .vendorInfor{
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
    height: 15%;
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
    left: 45%;
    width: 45%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .heard .state{
    position: absolute;
    top:0;
    right: 0;
    width: 10%;
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
  .list .table .content .image{
    position: relative;
    top:0;
    left: 0;
    width: 10%;
    height: 60%;
  }
  .list .table .content .company_name{
    position: absolute;
    top:0;
    left: 20%;
    width: 80%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .address{
    position: absolute;
    top: 25%;
    left: 20%;
    width: 80%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .mobile{
    position: absolute;
    top: 50%;
    left: 20%;
    width: 45%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .wechat{
    position: absolute;
    top: 50%;
    left: 65%;
    width: 35%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .create{
    position: absolute;
    top:75%;
    left: 20%;
    width: 45%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .auditor{
    position: absolute;
    top:75%;
    left: 65%;
    width: 35%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table::-webkit-scrollbar {
    display: none;
  }
  .detail{
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .detail .title{
    position: absolute;
    top: 0;
    width: 100%;
    height: 5%;
    font-family: PingFangSC-Regular;
    font-size: 0.6em;
    line-height: 2em;
    color: #151515;
    text-align: center;
  }
  .detail .title .button{
    position: absolute;
    top: 0;
    right: 0;
    width: 30%;
    height:100%;
  }
  .detail .title .button button{
    position: absolute;
    top: 20%;
    margin-right: 10%;
    width: 30%;
    height: 60%;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .detail .content{
    position: absolute;
    top: 5%;
    width: 96%;
    height: 80%;
    padding-left: 2%;
    padding-right: 2%;
    overflow: auto;
    overflow-x: hidden;
  }
  .detail .content div{
    position: relative;
    top: 0;
    height: 8%;
    width: 100%;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
     border-bottom:2px dashed rgba(100, 100, 100, 0.3);
  }
  .detail .content div .name{
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
  .detail .content div .code{
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
  .detail .content dl{
    position: relative;
    top: 0;
    height: 15%;
    width: 100%;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
     border-bottom:2px dashed rgba(100, 100, 100, 0.5);
    overflow-x: auto;
  }
  .detail .content dl dt{
    position: absolute;
    left: 0;
    font-family: PingFangSC-Regular;
    font-size: 0.6em;
    line-height: 1em;
    color: #151515;
  }
  .detail .content dl dd{
    position: relative;
    right: 0;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;
    line-height: 2em;
    color: #151515;
  }
  .detail .content dl a{
    height: 100%;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;
    line-height: 2em;
    float: right;
    margin-left: 5%;
  }
  .detail .content dl a img{
    height: auto;
    width: auto;
    max-height: 95%;
  }
 .detail .alter{
    position: absolute;
    top: 80%;
    width: 100%;
    height: 10%;
    font-family: PingFangSC-Regular;
    font-size: 0.6em;
    line-height: 2em;
    color: #000000;
    letter-spacing: -0.45px;
    background: #dcdcdc;
  }
  .detail .alter input{
    position: absolute;
    right: 25%;
    width: 50%;
    height: 100%;
    font-size: 0.8em;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .detail .alter button{
    position: absolute;
    right: 0;
    top: 25%;
    width: 20%;
    height: 50%;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .detail .button{
    position: absolute;
    top: 92%;
    width: 96%;
    height: 8%;
    padding-left: 2%;
    padding-right: 2%;
  }
  .detail .button button{
    position: relative;
    margin-left: 7%;
    width: 40%;
    height: 50%;
    font-size: 0.5em;
    border: 1px solid #015afe;
    border-radius: 1em;
    float: left;
  }
  .detail .content::-webkit-scrollbar {
    display: none;
  }
</style>
