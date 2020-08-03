<template>
  <div class="userInfor">
    <!--   /*详情页显示*/-->
    <div class="detail" v-show="showViewIndex==='detail'">
      <div class="title">
        <span>信息详情</span>
        <div class="button" >
          <button @click="goback" >
            <img  height=100% src="../../../../../static/icon/undo.png"/>
          </button>
        </div>
      </div>
      <div class="content">
          <div >
            <span class="name">账号名:</span>
            <span class="code">{{detail.username}}</span>
          </div>
          <div >
            <span class="name">名字:</span>
            <span class="code">{{detail.first_name}}</span>
          </div>
          <div >
            <span class="name">姓氏:</span>
            <span class="code">{{detail.last_name}}</span>
          </div>
          <div >
            <span class="name">超级用户:</span>
            <span class="code">{{detail.is_superuser}}</span>
          </div>
          <div >
            <span class="name">邮箱地址:</span>
            <span class="code">{{detail.email}}</span>
          </div>
          <div >
            <span class="name">创建时间:</span>
            <span class="code">{{detail.create_time}}</span>
          </div>
          <div >
            <span class="name">工号:</span>
            <span class="code">{{detail.job_number}}</span>
          </div>
          <div >
            <span class="name">职位:</span>
            <span class="code">{{detail.post}}</span>
          </div>
          <div >
            <span class="name">微信:</span>
            <span class="code">{{detail.wechat}}</span>
          </div>
          <div >
            <span class="name">创建时间:</span>
            <span class="code">{{detail.create_time}}</span>
          </div>
          <div >
            <span class="name">手机:</span>
            <span class="code">{{detail.mobile}}</span>
          </div>
          <div >
            <span class="name">备注:</span>
            <span class="code">{{detail.desc}}</span>
          </div>
          <div >
            <span class="name">授权账号:</span>
            <span class="code">{{detail.auditor}}</span>
          </div>
          <div >
            <span class="name">上次更新时间:</span>
            <span class="code">{{detail.update_time}}</span>
          </div>
          <div >
            <span class="name">最近登录时间:</span>
            <span class="code">{{detail.last_login}}</span>
          </div>
          <dl>
            <dt>照片:</dt>
            <dd>
              <img :src="detail.image">
            </dd>
        </dl>
        <dl>
          <dt>用户组:</dt>
          <dd v-for="(value,index) in details.groups" v-bind:key="index" >
            {{value.name}}
          </dd>
        </dl>
        <dl>
          <dt>用户权限:</dt>
            <dd v-for="(value,index) in details.user_permissions" v-bind:key="index" >
              {{value.name}}
            </dd>
        </dl>
      </div>
      <div class="button1">
        <button type="button" @click="showUpdateView" style="background: #1EBC85 100%">信息更改</button>
      </div>
    </div>
    <!--    /*更新页显示*/-->
    <div class="update" v-show="showViewIndex==='update'">
      <div class="title">
        <span>信息更改</span>
        <div class="button" >
          <button @click="showDetailView" >
            <img  height=100% src="../../../../../static/icon/undo.png"/>
          </button>
        </div>
      </div>
      <form   ref="createForm" >
          <div>名字:
            <input v-model="formItem.first_name"  placeholder="请输账号的用户名字...">
          </div>
          <div>姓氏:
            <input v-model="formItem.last_name"  placeholder="请输入账号的用户姓氏...">
          </div>
          <div>电话:
            <input v-model="formItem.mobile"  placeholder="请输入账号用户电话...">
          </div>
          <div>微信:
            <input v-model="formItem.wechat"  placeholder="请输入账号的用户微信...">
          </div>
          <div>邮箱：
            <input v-model="formItem.email"  placeholder="请输入账号的用户邮箱...">
          </div>
          <div>工号：
            <input v-model="formItem.job_number"  placeholder="请输入账号的用户工号...">
          </div>
          <div>职位：
            <input v-model="formItem.post"  placeholder="请输入账号的用户职位...">
          </div>
          <div>说明：
            <input v-model="formItem.desc"  placeholder="请输入用户的其他说明信息:...">
          </div>
          <div>照片：
            <input type="file"  @change="imageBeforeUpload"/>
          </div>
          <div>
            <img :src="formItem.image" width="150px">
          </div>
      </form>
      <div class="button1">
          <button type="button" @click="update" style="background: #1EBC85 100%">更新</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'userInfor',
  data () {
    return {
      /* 视图显示控制 */
      showViewIndex: 'list',
      /* 详情页数据 */
      detail: [],
      details: {
        'groups': [],
        'user_permissions': []
      },
      /* 创建表单项数据 */
      formItem: {
        'id': '',
        'password': '',
        'first_name': '',
        'last_name': '',
        'email': '',
        'job_number': '',
        'post': '',
        'wechat': '',
        'mobile': '',
        'image': null,
        'desc': ''
      },
      password: {
        firstinput: '',
        secondinput: ''
      },
      /* 具有审核权限的账号信息: */
      userInfor: [],
      image: ''
    }
  },
  methods: {
    /* 显示详情视图 */
    showDetailView () {
      this.Detail = [] // 清空详情数据
      var self = this
      var index = this.$store.getters.getuserInfor.id
      this.$axios.get(`user/userInfor/` + index).then(function (response) {
        self.detail = response.data
        self.showViewIndex = 'detail'
      }).catch(function (err) {
        console.log(err)
      })
    },
    /* 显示更新视图 */
    showUpdateView () {
      /* 清空更新数据 */
      for (let key in this.formItem) {
        this.formItem[key] = ''
      }
      this.image = ''
      var self = this
      var index = this.$store.getters.getuserInfor.id
      this.$axios.get(`user/userInfor/` + index).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.password = ''
        self.formItem.first_name = response.data.first_name
        self.formItem.last_name = response.data.last_name
        self.formItem.email = response.data.email
        self.formItem.job_number = response.data.job_number
        self.formItem.post = response.data.post
        self.formItem.wechat = response.data.wechat
        self.formItem.mobile = response.data.mobile
        self.formItem.image = response.data.image
        self.formItem.desc = response.data.desc
        self.showViewIndex = 'update'
      }).catch(function (err) {
        console.log(err)
      })
    },
    imageBeforeUpload (event) {
      this.image = event.target.files[0]
    },
    /* 更新表单数据 */
    update () {
      let formData = new FormData()
      // 下面是表单绑定的data 数据
      formData.append('first_name', this.formItem.first_name)
      formData.append('last_name', this.formItem.last_name)
      formData.append('email', this.formItem.email)
      formData.append('job_number', this.formItem.job_number)
      formData.append('post', this.formItem.post)
      formData.append('wechat', this.formItem.wechat)
      formData.append('mobile', this.formItem.mobile)
      if (this.image !== '') {
        formData.append('image', this.image)
      }
      formData.append('desc', this.formItem.desc)
      var self = this
      this.$axios.put(`user/userInfor/` + self.formItem.id + '/', formData,
        {headers: {'Content-Type': 'multipart/form-data'}}
      ).then(function (response) {
        self.formItem.image = response.data.image
        alert('数据提交成功')
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    goback () {
      this.$router.replace({name: 'Home'})
    }
  },
  created () {
    this.showDetailView(1)
  },
  watch: {
    detail () {
      var self = this
      self.details.groups = self.detail.groups
      self.details.user_permissions = self.detail.user_permissions
    }
  }
}
</script>
<style scoped>
  .userInfor{
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
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
    right: 2%;
    width: 30%;
    height:100%;
    padding: 0;
  }
  .detail .title .button button{
    position: absolute;
    top: 20%;
    right: 0;
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
    height: 100%;
    top: 0;
    left: 0;
    font-family: PingFangSC-Regular;
    font-size: 0.6em;
    line-height: 1em;
    color: #151515;
  }
  .detail .content dl dd{
    position: relative;
    right: 0;
    height: 100%;
    width: 100%;
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
  .detail .content dl img{
    position: absolute;
    right: 0;
    height: auto;
    width: auto;
    max-width: 60%;
  }
  .detail .button1{
    position: absolute;
    top: 92%;
    width: 96%;
    height: 8%;
    padding-left: 2%;
    padding-right: 2%;
  }
  .detail .button1 button{
    position: absolute;
    width: 40%;
    left: 30%;
    height: 50%;
    font-size: 0.5em;
    border: 1px solid #015afe;
    border-radius: 1em;
  }
  .detail .content::-webkit-scrollbar {
    display: none;
  }
  .update{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .update .title{
    position: absolute;
    top: 0;
    width: 96%;
    height: 5%;
    padding-right: 2%;
    padding-left: 2%;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;
    line-height: 2em;
    color: #151515;
    letter-spacing: -0.45px;
    text-align: center;
  }
  .update .title .button{
    position: absolute;
    top: 0;
    right: 2%;
    width: 30%;
    height:100%;
    padding: 0;
  }
  .update .title .button button{
    position: absolute;
    top: 20%;
    right: 0;
    width: 30%;
    height: 60%;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .update form{
    position: absolute;
    top: 10%;
    width: 96%;
    height: 80%;
    padding-left: 2%;
    padding-right: 2%;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;
    color: #151515;
    letter-spacing: -0.45px;
    overflow: auto;
    overflow-x: hidden;
  }
  .update form div{
    position: relative;
    width: 100%;
    height: 8%;
  }
  .update form div select,.update form div input,.update form div textarea{
    position: absolute;
    width: 10em;
    right: 1em;
    font-size: 0.8em;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .update .button1{
    position: absolute;
    top: 92%;
    width: 96%;
    height: 8%;
    padding-left: 2%;
    padding-right: 2%;
  }
  .update .button1 button{
    position: absolute;
    width: 40%;
    left: 30%;
    height: 50%;
    font-size: 0.5em;
    border: 1px solid #015afe;
    border-radius: 1em;
  }
</style>
