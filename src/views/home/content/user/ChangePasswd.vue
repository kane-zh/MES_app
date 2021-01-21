<template>
  <div class="changePasswd">
    <!--    /密码更改页显示*/-->
    <div class="change" >
      <div class="title">
        <span>密码更改</span>
        <div class="button" >
          <button @click="goback" >
            <img  height=100% src="../../../../../static/icon/undo.png"/>
          </button>
        </div>
      </div>
      <form>
          <div>请输入新密码:
            <input v-model="password.firstinput" type="password"  placeholder="请输入新密码...">
          </div>
          <div>请确认新密码:
            <input v-model="password.secondinput" type="password"   placeholder="请确认新密码...">
          </div>
          <div class="button1">
            <button type="button" @click="changePassword"  style="background: #1EBC85 100%">更改密码</button>
          </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'changePasswd',
  data () {
    return {
      /* 创建表单项数据 */
      formItem: {
        'id': '',
        'password': ''
      },
      password: {
        firstinput: '',
        secondinput: ''
      }
    }
  },
  methods: {
    /* 改变密码函数 */
    changePassword () {
      var self = this
      if (this.password.firstinput === '') {
        alert('请输入新密码')
        return
      }
      if (this.password.firstinput !== this.password.secondinput) {
        alert('两次密码不一致')
        this.password.firstinput = ''
        this.password.secondinput = ''
        return
      }
      this.$axios.patch(`user/userInfor/` + self.detail.id + '/', {
        password: self.password.firstinput
      }).then(function (response
      ) {
        alert('修改密码成功')
        this.$router.push({name: 'login'})
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    goback () {
      this.$router.replace({name: 'Home'})
    }
  },
  created () {
    this.password.firstinput = ''
    this.password.secondinput = ''
  },
  watch: {
  }
}
</script>
<style scoped lang="scss" >
  .changePasswd{
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .change{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .change .title{
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
  .change .title .button{
    position: absolute;
    top: 0;
    right: 2%;
    width: 30%;
    height:100%;
    padding: 0;
  }
  .change .title .button button{
    position: absolute;
    top: 20%;
    right: 0;
    width: 30%;
    height: 60%;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .change form{
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
  .change form div{
    position: relative;
    width: 100%;
    height: 8%;
  }
  .change form div select,.change form div input,.change form div textarea{
    position: absolute;
    width: 10em;
    right: 1em;
    font-size: 0.8em;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .change .button1{
    position: absolute;
    top: 92%;
    width: 96%;
    height: 8%;
    padding-left: 2%;
    padding-right: 2%;
  }
  .change .button1 button{
    position: absolute;
    width: 40%;
    left: 30%;
    height: 50%;
    font-size: 0.5em;
    border: 1px solid #015afe;
    border-radius: 1em;
  }
</style>
