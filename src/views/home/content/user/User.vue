<template>
  <div class="user">
    <div class="topheard">
      <div class="titleList" >
        <button  @click="onItemClick('userConfig')">账号设置</button>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style scoped>
  .user{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .topheard{
    position: absolute;
    top: 0;
    height: 5%;
    width: 100%;
    box-sizing: border-box;
    overflow: scroll;
    white-space: nowrap;
  }
  .topheard::-webkit-scrollbar {
    display: none;
  }
  .titleList{
    display: inline-block;
  }
  .titleList button{
    width: 10%;
    font-family: PingFangSC-Regular;
    font-size: 2em;
    color: #0B000B;
    letter-spacing: 0.1em;
    text-align: center;
    line-height: 200%;
    border: 1px solid #363E42;
    border-radius: 13px;
    background: #dddddd;
  }
  .content{
    position: absolute;
    top: 5%;
    width: 100%;
    height: 95%;
  }
</style>
