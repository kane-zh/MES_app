<template>
  <div class="home" >
    <div class="item" v-show="showMenus===false">
      <router-view></router-view>
    </div>
    <div class="menu" v-show="showMenus===true">
      <div class="main" v-show="showViewid==='main'">
        <div class="title">
          <span>智能工厂MES系统</span>
        </div>
        <div class="content">
            <div class="bandan" :style ="{'background-image': 'url('+require('../../../static/icon/bandan.jpg')+')'}">
            </div>
            <button  @click="onItemClick('materialManage')">
              <img  height=50% src="../../../static/icon/wlgl.png"/>
              <span>物料管理</span>
            </button>
            <button  @click="onItemClick('semifinishedManage')">
              <span>半成品管理</span>
              <img  height=50% src="../../../static/icon/bcpgl.png"/>
            </button>
            <button  @click="onItemClick('productManage')">
              <img  height=50% src="../../../static/icon/cpgl.png"/>
              <span>产品管理</span>
            </button>
            <button  @click="onItemClick('equipmentManage')">
              <img  height=50% src="../../../static/icon/sbgl.png"/>
              <span>设备管理</span>
            </button>
            <button  @click="onItemClick('partsManage')">
              <img  height=50% src="../../../static/icon/bpgl.png"/>
              <span>备品管理</span>
            </button>
            <button  @click="onItemClick('inspectionReport')">
              <img  height=50% src="../../../static/icon/jyjl.png"/>
              <span>检验汇报</span>
            </button>
            <button  @click="onItemClick('maintainRecord')">
              <img  height=50% src="../../../static/icon/wxjl.png"/>
              <span>维护记录</span>
            </button>
            <button  @click="onItemClick('partsUseRecord')">
              <img  height=50% src="../../../static/icon/bpxh.png"/>
              <span>备品消耗</span>
            </button>
            <button  @click="onItemClick('salesOrderCreate')">
              <img  height=50% src="../../../static/icon/ssdd.png"/>
              <span>销售订单</span>
            </button>
            <button  @click="onItemClick('productTaskCreate')">
              <img  height=50% src="../../../static/icon/cprw.png"/>
              <span>产品任务</span>
            </button>
            <button  @click="onItemClick('seminishedTaskCreate')">
              <img  height=50% src="../../../static/icon/bcprw.png"/>
              <span>半成品任务</span>
            </button>
            <button  @click="onItemClick('personnelInfor')">
              <img  height=50% src="../../../static/icon/ryxx.png"/>
              <span>人员信息</span>
            </button>
            <button  @click="onItemClick('assessmentRecord')">
              <img  height=50% src="../../../static/icon/khjl.png"/>
              <span>考核记录</span>
            </button>
            <button  @click="onItemClick('semifinishedDailyReport')">
              <img  height=50% src="../../../static/icon/bcprb.png"/>
              <span>半成品日报</span>
            </button>
            <button  @click="onItemClick('productDailyReport')">
              <img  height=50% src="../../../static/icon/cprb.png"/>
              <span>产品日报</span>
            </button>
          </div>
        </div>
      <div class="report" v-show="showViewid==='report'">
        <div class="title">
          <span>报表</span>
        </div>
        <div class="content">
          <button  @click="onItemClick('equipmentState')">
            <img  height=50% src="../../../static/icon/sbzt.png"/>
            <span>设备状态</span>
          </button>
        </div>
      </div>
      <div class="feature" v-show="showViewid==='feature'">
        <div class="title">
          <span>智能工厂MES系统</span>
        </div>
        <div class="content">
            <div class="bandan" :style ="{'background-image': 'url('+require('../../../static/icon/bandan.jpg')+')'}"></div>
            <span style="display: block;font-size: 1.2em">工艺模块：</span>
            <button  @click="onItemClick('materialInfor')">
              <img  height=50%  src="../../../static/icon/wlxx.png"/>
              <span>物料信息</span>
            </button>
            <button  @click="onItemClick('semifinishedInfor')">
              <img  height=50% src="../../../static/icon/bcpxx.png"/>
              <span>半成品信息</span>
            </button>
            <button  @click="onItemClick('productInfor')">
              <img  height=50% src="../../../static/icon/cpxx.png"/>
              <span>产品信息</span>
            </button>
            <button  @click="onItemClick('productRouteInfor')">
              <img  height=50% src="../../../static/icon/scxl.png"/>
              <span>生产路线</span>
            </button>
            <span style="display: block;font-size: 1.2em">仓库模块：</span>
            <button  @click="onItemClick('materialStockInfor')">
              <img  height=50% src="../../../static/icon/wlkc.png"/>
              <span>物料库存</span>
            </button>
            <button  @click="onItemClick('materialStockDetail')">
              <img  height=50% src="../../../static/icon/wlmx.png"/>
              <span>物料明细</span>
            </button>
            <button  @click="onItemClick('semifinishedStockInfor')">
              <img  height=50% src="../../../static/icon/bcpkc.png"/>
              <span>半成品库存</span>
            </button>
            <button  @click="onItemClick('semifinishedStockDetail')">
              <img  height=50% src="../../../static/icon/bcpmx.png"/>
              <span>半成品明细</span>
            </button>
            <button  @click="onItemClick('productStockInfor')">
              <img  height=50% src="../../../static/icon/cpkc.png"/>
              <span>产品库存</span>
            </button>
            <button  @click="onItemClick('productStockDetail')">
              <img  height=50% src="../../../static/icon/cpmx.png"/>
              <span>产品明细</span>
            </button>
            <button  @click="onItemClick('equipmentStockInfor')">
              <img  height=50% src="../../../static/icon/sbkc.png"/>
              <span>设备库存</span>
            </button>
            <button  @click="onItemClick('equipmentStockDetail')">
              <img  height=50% src="../../../static/icon/sbmx.png"/>
              <span>设备明细</span>
            </button>
            <button  @click="onItemClick('partsStockInfor')">
              <img  height=50% src="../../../static/icon/bpkc.png"/>
              <span>备品库存</span>
            </button>
            <button  @click="onItemClick('partsStockDetail')">
              <img  height=50% src="../../../static/icon/bpmx.png"/>
              <span>备品明细</span>
            </button>
            <button  @click="onItemClick('positionInfor')">
              <img  height=50% src="../../../static/icon/cwxx.png"/>
              <span>仓位信息</span>
            </button>
            <span style="display: block;font-size: 1.2em">品质模块：</span>
            <button  @click="onItemClick('defectInfor')">
              <img  height=50% src="../../../static/icon/qxxx.png"/>
              <span>缺陷信息</span>
            </button>
            <button  @click="onItemClick('inspectionStandard')">
              <img  height=50% src="../../../static/icon/jybz.png"/>
              <span>检验标准</span>
            </button>
            <span style="display: block;font-size: 1.2em">设备模块：</span>
            <button  @click="onItemClick('equipmentVendor')">
              <img  height=50% src="../../../static/icon/sbcs.png"/>
              <span>设备厂商</span>
            </button>
            <button  @click="onItemClick('partsInfor')">
              <img  height=50% src="../../../static/icon/bpxx.png"/>
              <span>备品信息</span>
            </button>
            <button  @click="onItemClick('equipmentInfor')">
              <img  height=50% src="../../../static/icon/sbtz.png"/>
              <span>设备台账</span>
            </button>
            <span style="display: block;font-size: 1.2em">计划模块：</span>
            <button  @click="onItemClick('clientInfor')">
              <img  height=50% src="../../../static/icon/khxx.png"/>
              <span>客户信息</span>
            </button>
            <button  @click="onItemClick('vendorInfor')">
              <img  height=50% src="../../../static/icon/gysxx.png"/>
              <span>供应商信息</span>
            </button>
            <button  @click="onItemClick('purchaseRequire')">
              <span>物料需求</span>
              <img  height=50% src="../../../static/icon/wlxq.png"/>
            </button>
            <button  @click="onItemClick('materialManagePlan')">
              <img  height=50% src="../../../static/icon/wlgl.png"/>
              <span>物料管理</span>
            </button>
            <button  @click="onItemClick('semifinishedManagePlan')">
              <img  height=50% src="../../../static/icon/bcpgl.png"/>
              <span>半成品管理</span>
            </button>
            <button  @click="onItemClick('productManagePlan')">
              <img  height=50% src="../../../static/icon/cpgl.png"/>
              <span>产品管理</span>
            </button>
            <button  @click="onItemClick('equipmentMaintainPlan')">
              <img  height=50% src="../../../static/icon/sbgl.png"/>
              <span>设备保养</span>
            </button>
            <span style="display: block;font-size: 1.2em">生产模块：</span>
            <button  @click="onItemClick('teamInfor')">
              <img  height=50% src="../../../static/icon/bzxx.png"/>
              <span>班组信息</span>
            </button>
            <button  @click="onItemClick('skillInfor')">
              <img  height=50% src="../../../static/icon/jxxx.png"/>
              <span>技能信息</span>
            </button>
          </div>
      </div>
      <div class="setup" v-show="showViewid==='setup'">
        <div class="title">
          <span>个人中心</span>
        </div>
        <div class="content">
          <div class="heard">
            <span style="display: block;font-size: 1.2em">{{username}}</span>
          </div>
          <div>
            <button  @click="onItemClick('userInfor')">
<!--              <img  height=50% src="../../../static/icon/物料信息:.png"/>-->
              <span>个人信息</span>
            </button>
            <button  @click="onItemClick('changePasswd')">
<!--              <img  height=50% src="../../../static/icon/半成品信息:.png"/>-->
              <span>密码更改</span>
            </button>
            <button  @click="onItemClick('about')">
<!--              <img  height=50% src="../../../static/icon/关于我们.png"/>-->
              <span>关于我们</span>
            </button>
            <button  @click="logout">
              <span>退出</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="button" v-show="showMenus===true">
      <button @click="showViewid='main'">
        <img  height=50% v-show="showViewid==='main'" src="../../../static/icon/index_hover.png"/>
        <img  height=50% v-show="showViewid!=='main'" src="../../../static/icon/index_normal.png"/>
        <span>首页</span>
      </button>
      <button @click="showViewid='report'">
        <img  height=50% v-show="showViewid==='report'" src="../../../static/icon/bb_hover.png"/>
        <img  height=50% v-show="showViewid!=='report'" src="../../../static/icon/bb_normal.png"/>
        <span>报表</span>
      </button>
      <button @click="showViewid='feature'">
        <img  height=50% v-show="showViewid==='feature'" src="../../../static/icon/bd_hover.png"/>
        <img  height=50% v-show="showViewid!=='feature'" src="../../../static/icon/bd_normal.png"/>
        <span>功能</span>
      </button>
      <button @click="showViewid='setup'">
        <img  height=50% v-show="showViewid==='setup'" src="../../../static/icon/user_hover.png"/>
        <img  height=50% v-show="showViewid!=='setup'" src="../../../static/icon/user_normal.png"/>
        <span>设置</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      isLogin: true,
      showMenus: true,
      showViewid: 'main'
    }
  },
  methods: {
    onItemClick (url) {
      this.$router.push({name: url})
      this.showMenus = false
    },
    logout () {
      localStorage.removeItem('loginInfor')
      var self = this
      var info = {
        IPAddresss: self.$store.getters.getuserInfor.IPAddresss,
        name: self.$store.getters.getuserInfor.name,
        id: '',
        is_superuser: '',
        token: '',
        permissions: ''
      }
      localStorage.setItem('loginInfor', JSON.stringify(info))
      this.$router.push({name: 'login'})
    }
  },
  computed: {
    username () {
      return this.$store.getters.getuserInfor.name
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        if (route.name === 'Home') {
          this.showMenus = true
        }
      }
    }
  }
}
</script>
<style scoped lang="scss" >
  .home{
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
  }
  .item {
    position: absolute;
    top:0;
    width: 100%;
    height: 100%;
  }
  .menu {
    position: absolute;
    top: 0;
    width: 100%;
    height: 92%;
    background: #ffffff;
  }
  .menu .main{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .menu .main .title{
    position: absolute;
    top: 0;
    width: 100%;
    height: 8%;
    font-size: 0.8em;
    line-height: 2em;
    text-align: center;
  }
  .menu .main .content{
    position: absolute;
    top: 8%;
    width: 96%;
    height: 92%;
    margin-right: 2%;
    margin-left: 2%;
    font-size: 0.4em;
    overflow: auto;
    overflow-x: hidden;
  }
  .menu .main .content .bandan{
    position: relative;
    top: 0;
    height: 30%;
    width: 100%;
    background: #ffffff;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border:none;
    padding: 0;
    font-size: 0.8em;
  }
  .menu .main .content button{
    position: relative;
    top: 0;
    height: 15%;
    width: 24%;
    background: #ffffff;
    border:none;
    padding: 0;
    font-size: 0.8em;
  }
  .menu .main .content button span{
    position: absolute;
    bottom: 0;
    margin-right: -0.5em;
    height: 25%;
    width: 100%;
    font-family: PingFangSC-Semibold;
    font-size: 1em;
    color: #1B181B;
    display: block;
    border-top: none;
  }
  .menu .main .content::-webkit-scrollbar {
    display: none;
  }
  .menu .report{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .menu .report .title{
    position: absolute;
    top: 0;
    width: 100%;
    height: 8%;
    font-size: 0.8em;
    line-height: 2em;
    text-align: center;
  }
  .menu .report .content{
    position: absolute;
    top: 8%;
    width: 96%;
    height: 92%;
    margin-right: 2%;
    margin-left: 2%;
    font-size: 0.4em;
    overflow: auto;
    overflow-x: hidden;
  }
  .menu .report .content button{
    position: relative;
    top: 0;
    height: 15%;
    width: 24%;
    background: #ffffff;
    border:none;
    padding: 0;
    font-size: 0.8em;
  }
  .menu .report .content button span{
    position: absolute;
    bottom: 0;
    margin-right: -0.5em;
    height: 25%;
    width: 100%;
    font-family: PingFangSC-Semibold;
    font-size: 1em;
    color: #1B181B;
    display: block;
    border-top: none;
  }
  .menu .report .content::-webkit-scrollbar {
    display: none;
  }
  .menu .feature{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .menu .feature .title{
    top: 0;
    width: 100%;
    height: 8%;
    font-size: 0.8em;
    line-height: 2em;
    text-align: center;
  }
  .menu .feature .content{
    position: absolute;
    top: 8%;
    width: 96%;
    height: 92%;
    margin-right: 2%;
    margin-left: 2%;
    font-size: 0.4em;
    overflow: auto;
    overflow-x: hidden;
  }
  .menu .feature .content .bandan{
    position: relative;
    top: 0;
    height: 30%;
    width: 100%;
    background: #ffffff;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border:none;
    padding: 0;
    font-size: 0.8em;
  }
  .menu .feature .content button{
    position: relative;
    top: 0;
    height: 15%;
    width: 24%;
    background: #ffffff;
    border:none;
    padding: 0;
    font-size: 0.8em;
  }
  .menu .feature .content  span{
    border-top:15px solid rgba(230, 230, 230 , 0.5);
  }
  .menu .feature .content button span{
    position: absolute;
    bottom: 0;
    margin-right: -0.5em;
    height: 25%;
    width: 100%;
    font-family: PingFangSC-Semibold;
    font-size: 1em;
    color: #1B181B;
    display: block;
    border-top: none;
  }
  .menu .feature .content::-webkit-scrollbar {
    display: none;
  }
  .menu .setup{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .menu .setup .title{
    top: 0;
    width: 100%;
    height: 8%;
    font-size: 0.8em;
    line-height: 2em;
    text-align: center;
  }
  .menu .setup .content{
    position: absolute;
    top: 8%;
    width: 96%;
    height: 92%;
    margin-right: 2%;
    margin-left: 2%;
    font-size: 0.4em;
    overflow: auto;
    overflow-x: hidden;
  }
  .menu .setup .content button{
    position: relative;
    top: 0;
    height: 15%;
    width: 24%;
    background: #ffffff;
    border:none;
    padding: 0;
    font-size: 0.8em;
  }
  .menu .setup .content button span{
    position: absolute;
    bottom: 0;
    margin-right: -0.5em;
    height: 25%;
    width: 100%;
    font-family: PingFangSC-Semibold;
    font-size: 1em;
    color: #1B181B;
    display: block;
    border-top: none;
  }
  .menu .setup .content::-webkit-scrollbar {
    display: none;
  }
  .button{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8%;
  }
  .button button{
    position: relative;
    top: 0;
    height: 80%;
    width:22.8%;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
    padding: 0;
    font-size: 0.2em;
  }
  .button button span{
    position: absolute;
    bottom: 0;
    height: 25%;
    width: 100%;
    font-family: PingFangSC-Semibold;
    font-size: 1em;
    color: #1B181B;
    display: block;
    border-top: none;
  }
</style>
