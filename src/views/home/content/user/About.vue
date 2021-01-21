<template>
  <div class="about">
    <!--   /*详情页显示*/-->
    <div class="detail" >
      <div class="title">
        <span>关于我们</span>
        <div class="button" >
          <button @click="goback" >
            <img  height=100% src="../../../../../static/icon/undo.png"/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'about',
  data () {
    return {
    }
  },
  methods: {
    goback () {
      this.$router.replace({name: 'Home'})
    }
  },
  created () {
  },
  watch: {
  }
}
</script>
<style scoped lang="scss" >
  .about{
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
</style>
