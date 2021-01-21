<template>
  <div class="equipmentManage">
    <!-- 列表页显示-->
    <div  class="list"  v-show="showViewid==='list'">
      <div class="title">
        <span>设备管理</span>
        <button id="add" @click="showCreatView" v-show="showSearchView===false">
          <img  height=100% src="../../../../../static/icon/add.png"/>
        </button>
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
        <div>仓库:
          <select v-model="selectItem.warehouse">
            <option selected hidden disabled value="">请选择仓库</option>
            <option v-for="item in warehouse" :value="item.code" :key="item.code">{{item.name}}</option>
          </select>
        </div>
        <div>操作类型：
          <select v-model="selectItem.type" >
            <option selected hidden disabled value="">请选择操作类型</option>
            <option value="增加操作">增加操作</option>
            <option value="入库操作">入库操作</option>
            <option value="退库操作">退库操作</option>
            <option value="出库操作">出库操作</option>
            <option value="盘点操作">盘点管理</option>
          </select>
        </div>
          <div>状态:
            <select v-model="selectItem.state" >
              <option selected hidden disabled value="">请选择状态</option>
              <option value="新建">新建</option>
              <option value="审核中">审核中</option>
              <option value="完成">完成</option>
            </select>
          </div>
          <div>开始时间:
            <input v-model="selectItem.start_time"  type="datetime-local" placeholder="选择日期和时间">
          </div>
          <div>结束时间:
            <input v-model="selectItem.stop_time"  type="datetime-local" placeholder="选择日期和时间">
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
              <span class="state" v-show="item.state==='完成'" style="background-color: #61c255">完</span>
              <span class="name">{{"【"+item.name+"】"}}</span>
              <span class="code">{{item.code}}</span>
              <span class="type">{{item.type}}</span>
            </div>
            <div class="content">
              <span class="warehousename">仓库:{{"【"+item.warehouse_name+"】"}}</span>
              <span class="warehousecode">{{item.warehouse_code}}</span>
              <span class="sum">数量:{{item.sum}}</span>
              <span class="positionname">仓位:{{"【"+item.position_name+"】"}}</span>
              <span class="positioncode">{{item.position_code}}</span>
              <span class="goodsname">设备{{"【"+item.equipment_name+"】"}}</span>
              <span class="goodscode">{{item.equipment_code}}</span>
              <span class="handler">操作者:{{item.handler}}</span>
              <span class="dataTime">时间:{{item.dataTime}}</span>
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
        <span>设备管理详情</span>
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
            <span class="name">类型:</span>
            <span class="code">{{detail.type}}</span>
          </div>
          <div >
            <span class="name">仓库名称:</span>
            <span class="code">{{detail.warehouse_name}}</span>
          </div>
          <div >
            <span class="name">仓库编码:</span>
            <span class="code">{{detail.warehouse_code}}</span>
          </div>
          <div >
            <span class="name">仓位名称:</span>
            <span class="code">{{detail.position_name}}</span>
          </div>
          <div >
            <span class="name">仓位编码:</span>
            <span class="code">{{detail.position_code}}</span>
          </div>
          <div >
            <span class="name">设备类型名称:</span>
            <span class="code">{{detail.equipmentType_name}}</span>
          </div>
          <div >
            <span class="name">设备类型编码:</span>
            <span class="code">{{detail.equipmentType_code}}</span>
          </div>
          <div >
            <span class="name">设备名称:</span>
            <span class="code">{{detail.equipment_name}}</span>
          </div>
          <div >
            <span class="name">设备编码:</span>
            <span class="code">{{detail.equipment_code}}</span>
          </div>
          <div >
            <span class="name">操作者:</span>
            <span class="code">{{detail.handler}}</span>
          </div>
          <div >
            <span class="name">数量:</span>
            <span class="code">{{detail.sum}}</span>
          </div>
       <div >
            <span class="name">操作时间:</span>
            <span class="code">{{detail.dataTime}}</span>
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
            <dt>文件:</dt>
            <template v-for="(value,id) in detail.file">
              <a target='_black' v-bind:key="id" :href="value.file">{{value.file_name}}</a>
            </template>
          </dl>

      </div>

      <div class="button">
        <button type="button" @click="changeState('审核中')" v-show="showSubmitBt===true">提交数据</button>
        <button type="button" @click="changeState('新建')" v-show="showReturnBt===true">驳回信息:</button>
        <button type="button" @click="changeState('完成')" v-show="showApprovedBt===true" >通过审核</button>
        <button type="button" @click="changeState('作废')" v-show="showDeleteBt===true">删除数据</button>
      </div>
    </div>
    <!--    /*创建页显示*/-->
    <div  class="create"  v-show="showViewid==='create'">
      <div id="barcode" v-show="showScanView===true">
      </div>
      <div class="title">
        <span>添加设备管理</span>
        <button id="scan" @click="createBarcode">
          <img  height=100% src="../../../../../static/icon/scan.png"/>
        </button>
        <div class="button" >
          <button @click="quit" >
            <img  height=100% src="../../../../../static/icon/undo.png"/>
          </button>
        </div>
      </div>
      <form   ref="createForm" v-show="showScanView===false">
        <div>账单名称:
          <input v-model="formItem.name"  placeholder="请输入设备管理名称:...">
        </div>
        <div>账单编码:
          <input v-model="formItem.code"  placeholder="请输入设备管理编码:...">
        </div>
        <div>操作类型：
          <select v-model="formItem.type"  placeholder="请选择操作类型："   >
            <option value="增加操作">增加操作</option>
            <option value="入库操作">入库操作</option>
            <option value="退库操作">退库操作</option>
            <option value="出库操作">出库操作</option>
            <option value="盘点操作">盘点管理</option>
          </select>
        </div>
        <div>数量:
          <input v-model="formItem.sum" type="number" placeholder="请输入操作数量:..." >
        </div>
        <div>仓库:
          <select v-model="formItem.warehouse"   placeholder="请选择仓库:">
            <option v-for="item in warehouse" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>仓位:
          <select v-model="formItem.position"   placeholder="请选择仓位:">
            <option v-for="item in positionInfor" :value="item.id" :key="item.id" v-show="item.state===showKey">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>设备类型：
          <select v-model="formItem.equipmentType"   placeholder="请选择设备类型："      :disabled="inputDisable">
            <option v-for="item in equipmentType" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>设备
          <select v-model="formItem.equipment"   placeholder="请选择设备"     :disabled="inputDisable">
            <option v-for="item in equipmentInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>操作者:
          <input v-model="formItem.handler"  placeholder="请输入操作者:...">
        </div>
        <div>操作时间:
          <input v-model="formItem.dataTime"  type="datetime-local" placeholder="选择日期和时间">
        </div>
        <div>审核账号:
          <select v-model="formItem.auditor"  placeholder="请选择审核账号:">
            <option v-for="item in userinfor" :value="item.username" :key="item.username">{{item.username}}</option>
          </select>
          </div>
          <div >备注信息:
          <textarea v-model="formItem.desc" placeholder="请输入当前的备注信息:..."></textarea>
        </div>
          <div class="annex">文件附件
          <ul>
            <li v-for="value in fileData" v-bind:key="value.id"  @click="removeFile(value.id)">{{value.fileName}}</li>
          </ul>
          <input type="file"  @change="fileBeforeUpload"/>
          <textarea  v-model="fileItem.desc"  placeholder="请输入当前的备注信息:..."></textarea>
          <button type="button" @click="uploadFile">上传</button>
        </div>
      </form>
      <div class="button">
        <button type="button" @click="save">保存数据</button>
        <button type="button" @click="saveAndSubmit">保存并提交</button>
      </div>
    </div>
    <!--    /*更新页显示*/-->
    <div  class="update"  v-show="showViewid==='update'">
      <div class="title">
        <span>添加设备管理</span>
        <div class="button" >
          <button @click="showViewid='list'" >
            <img  height=100% src="../../../../../static/icon/undo.png"/>
          </button>
        </div>
      </div>
      <form   ref="updateForm"  >
        <div>账单名称:
          <input v-model="formItem.name"  placeholder="请输入设备管理名称:...">
        </div>
        <div>账单编码:
          <input v-model="formItem.code"  placeholder="请输入设备管理编码:...">
        </div>
        <div>操作类型：
          <select v-model="formItem.type"  placeholder="请选择操作类型："   >
            <option value="增加操作">增加操作</option>
            <option value="入库操作">入库操作</option>
            <option value="退库操作">退库操作</option>
            <option value="出库操作">出库操作</option>
            <option value="盘点操作">盘点管理</option>
          </select>
        </div>
        <div>数量:
          <input v-model="formItem.sum" type="number" placeholder="请输入操作数量:..." >
        </div>
        <div>仓库:
          <select v-model="formItem.warehouse"   placeholder="请选择仓库:">
            <option v-for="item in warehouse" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>仓位:
          <select v-model="formItem.position"   placeholder="请选择仓位:">
            <option v-for="item in positionInfor" :value="item.id" :key="item.id" v-show="item.state===showKey">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>设备类型：
          <select v-model="formItem.equipmentType"   placeholder="请选择设备类型："      :aria-disabled="inputDisable">
            <option v-for="item in equipmentType" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>设备
          <select v-model="formItem.equipment"   placeholder="请选择设备"     :aria-disabled="inputDisable">
            <option v-for="item in equipmentInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>操作者:
          <input v-model="formItem.handler"  placeholder="请输入操作者:...">
        </div>
        <div>操作时间:
          <input v-model="formItem.dataTime"  type="datetime-local" placeholder="选择日期和时间">
        </div>
        <div>审核账号:
          <select v-model="formItem.auditor"  placeholder="请选择审核账号:">
            <option v-for="item in userinfor" :value="item.username" :key="item.username">{{item.username}}</option>
          </select>
          </div>
          <div >备注信息:
          <textarea v-model="formItem.desc" placeholder="请输入当前的备注信息:..."></textarea>
        </div>
          <div class="annex">文件附件
          <ul>
            <li v-for="value in fileData" v-bind:key="value.id"  @click="removeFile(value.id)">{{value.fileName}}</li>
          </ul>
          <input type="file"  @change="fileBeforeUpload"/>
          <textarea  v-model="fileItem.desc"  placeholder="请输入当前的备注信息:..."></textarea>
          <button type="button" @click="uploadFile">上传</button>
        </div>

      </form>
      <div class="button">
        <button type="button" @click="update">保存数据</button>
        <button type="button" @click="updateAndSubmit">保存并提交</button>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'equipmentManage',
  components: {
  },
  data () {
    return {
      /* 视图显示控制 */
      showViewid: 'list',
      showSearchView: false,
      showScanView: false,
      inputDisable: false,
      /* 列表页数据 */
      list: [],
      listCount: 0,
      listNextUrl: '',
      listScroll: '',
      /* 列表页查询参数 */
      selectItem: {
        warehouse: '',
        state: '',
        type: '',
        create_user: '',
        auditor: '',
        searchValue: '',
        ordering: '',
        start_time: '',
        stop_time: ''
      },

      /* 详情页数据 */
      detail: [],
      /* 详情页按钮显示控制 */
      showSubmitBt: false,
      showReturnBt: false,
      showApprovedBt: false,
      showDeleteBt: false,
      /* 创建页表单项数据 */
      scan: null,
      formItem: {
        id: '',
        name: '',
        code: '',
        type: '',
        warehouse: null,
        position: null,
        equipmentType: null,
        equipment: null,
        handler: '',
        sum: '',
        dataTime: '',
        state: '',
        file: [],
        desc: '',
        auditor: ''
      },
      /* 创建页文件项表单 */
      fileItem: {
        file: null,
        fileName: '',
        desc: '',
        uri: 'equipmentManage'
      },
      fileData: [],
      /* 仓库:信息: */
      warehouse: [],
      /* 仓位:信息: */
      positionInfor: [],
      /* 设备类型信息 */
      equipmentType: [],
      /* 设备信息: */
      equipmentInfor: [],
      /* 具有审核权限的账号信息: */
      userInfor: [],
      /* 附加属性标题 */
      attribute_title: {
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: ''
      },
      /* 仓位:下拉框显示条件(根据不同的操作) */
      showKey: ''
    }
  },
  methods: {
    // 创建扫描控件
    onmarked: function (type, result, file) {
      switch (type) {
        case window.plus.barcode.QR:
          type = 'QR'
          break
        case window.plus.barcode.EAN13:
          type = 'EAN13'
          break
        case window.plus.barcode.EAN8:
          type = 'EAN8'
          break
        default:
          type = '其它' + type
          break
      }
      result = result.replace(/\n/g, '')
      this.decoding(result)
      this.scan.cancel()
      this.scan.close()
      window.plus.webview.currentWebview().remove(this.scan)
      this.scan = null
    },
    createBarcode () {
      if (!this.scan) {
        this.scan = window.plus.barcode.create('barcode', [window.plus.barcode.QR], {
          top: '5%',
          left: '0',
          width: '100%',
          height: '95%',
          position: 'static'
        })
        this.scan.onmarked = this.onmarked
        window.plus.webview.currentWebview().append(this.scan)
      }
      this.scan.start()
    },
    decoding (value) {
      var self = this
      var jsonObj = JSON.parse(value)
      if (jsonObj) {
        if (jsonObj['type'] === 'equipmentInfor') {
          alert(123)
        } else if (jsonObj['type'] === 'positionInfor') {
          this.$axios.get('/warehouse/position/' + jsonObj['id']
          ).then(function (response) {
            if (response.data.parent.type === '设备库') {
              self.formItem.warehouse = response.data.parent.id
              self.formItem.position = jsonObj['id']
            }
          }).catch(function (err) {
            if (err.request) {
              alert(err.request.response)
            }
          })
        } else {
          alert('二维码信息:错误')
        }
      }
    },
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
      this.$axios.get('warehouse/equipmentManage/?ordering=' + self.selectItem.ordering).then(function (response) {
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
      this.$axios.get('warehouse/equipmentManage/?state=' + self.selectItem.state +
              '&warehouse_code=' + self.selectItem.warehouse +
              '&type=' + self.selectItem.type +
              '&auditor=' + self.selectItem.auditor +
              '&create_user=' + self.selectItem.create_user +
              '&search=' + self.selectItem.searchValue +
              '&start_time=' + self.selectItem.start_time +
              '&stop_time=' + self.selectItem.stop_time +
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
    quit () {
      if (this.scan) {
        this.scan.cancel()
        this.scan.close()
        window.plus.webview.currentWebview().remove(this.scan)
        this.scan = null
      }
      this.showListView()
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
      var self = this
      this.$axios.get(`warehouse/equipmentManage/` + id).then(function (response) {
        self.detail = response.data
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
      this.$axios.patch(`warehouse/equipmentManage/` + self.detail.id + '/', {
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
    },
    /* 显示创建视图 */
    showCreatView () {
      /* 清空表单数据 */
      for (let key in this.formItem) {
        if (Object.prototype.toString.call(this.formItem[key]) === '[object Array]') {
          this.formItem[key] = []
        } else if (Object.prototype.toString.call(this.formItem[key]) === '[object Object]') {
          var obj = this.formItem[key]
          for (let key1 in obj) {
            if (Object.prototype.toString.call(obj[key1]) === '[object Array]') {
              obj[key1] = []
            } else {
              obj[key1] = ''
            }
          }
        } else {
          this.formItem[key] = ''
        }
      }
      this.fileData = []
      this.showViewid = 'create'
    },
    /* 显示更新视图 */
    showUpdateView (id) {
      /* 清空表单数据 */
      for (let key in this.formItem) {
        if (Object.prototype.toString.call(this.formItem[key]) === '[object Array]') {
          this.formItem[key] = []
        } else if (Object.prototype.toString.call(this.formItem[key]) === '[object Object]') {
          var obj = this.formItem[key]
          for (let key1 in obj) {
            if (Object.prototype.toString.call(obj[key1]) === '[object Array]') {
              obj[key1] = []
            } else {
              obj[key1] = ''
            }
          }
        } else {
          this.formItem[key] = ''
        }
      }

      this.fileData = []
      var self = this
      this.$axios.get(`warehouse/equipmentManage/` + id).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.name = response.data.name
        self.formItem.state = response.data.state
        self.formItem.code = response.data.code
        self.formItem.type = response.data.type
        self.formItem.handler = response.data.handler
        self.formItem.sum = response.data.sum
        self.formItem.dataTime = response.data.dataTime
        self.formItem.desc = response.data.desc
        self.formItem.auditor = response.data.auditor
        self.formItem.position = parseInt(response.data.position_id)
        self.formItem.equipment = parseInt(response.data.equipment_id)
        response.data.file.forEach(function (value, i) {
          var obj = {'id': value.id, 'fileName': value.file_name, 'fileUrl': value.file, 'desc': value.desc, 'uri': value.uri}
          self.formItem.file.push(value.id)
          self.fileData.push(obj)
        })
        for (var i = 0; i < self.equipmentType.length; i++) {
          if (self.equipmentType[i].code === response.data.equipmentType_code) {
            self.formItem.equipmentType = self.equipmentType[i].id
            break
          }
        }
        for (var j = 0; j < self.warehouse.length; j++) {
          if (self.warehouse[j].code === response.data.warehouse_code) {
            self.formItem.warehouse = self.warehouse[j].id
            break
          }
        }
        self.showViewid = 'update'
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 提交文件项 */
    uploadFile () {
      if (!confirm('确认提交??')) {
        return
      }
      let formData = new FormData()
      // 下面是表单绑定的data 数据
      formData.append('uri', this.fileItem.uri)
      formData.append('desc', this.fileItem.desc)
      formData.append('file', this.fileItem.file)
      var self = this
      this.$axios.post(`warehouse/file/`, formData,
        {headers: {'Content-Type': 'multipart/form-data'}}
      ).then(function (response) {
        var obj = {'id': response.data.id,
          'fileName': self.fileItem.fileName,
          'fileUrl': response.data.file,
          'desc': response.data.desc,
          'uri': response.data.uri}
        self.fileItem.file = null
        self.fileItem.desc = ''
        self.formItem.file.push(response.data.id)
        self.fileData.push(obj)
        alert(self.fileItem.fileName + '文件提交成功')
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },

    fileBeforeUpload (event) {
      this.fileItem.file = event.target.files[0]
      this.fileItem.fileName = event.target.files[0].name
    },
    removeFile: function (id) {
      var self = this
      if (!confirm('是否要删除当前数据')) {
        // 当用户点击的取消按钮的时候，应该阻断这个方法中的后面代码的继续执行
        return
      }
      for (var i = 0; i < self.formItem.file.length; i++) {
        if (self.formItem.file[i] === id) {
          self.formItem.file.splice(i, 1)
        }
      }
      for (var j = 0; j < self.fileData.length; j++) {
        if (self.fileData[j].id === id) {
          self.fileData.splice(j, 1)
        }
      }
    },
    /* 保存表单数据 */
    save () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.post(`warehouse/equipmentManage/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        handler: self.formItem.handler,
        sum: self.formItem.sum,
        dataTime: self.formItem.dataTime,
        position_id: self.formItem.position,
        equipment_id: self.formItem.equipment,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        for (var i = 0; i < self.positionInfor.length; i++) {
          if (self.positionInfor[i].id === self.formItem.position) {
            self.positionInfor.splice(i, 1)
            break
          }
        }
        alert('数据保存成功')
      }).catch(function (error) {
        if (error.request) {
          alert(error.request.response)
        } else {
          console.log('Error', error.message)
        }
      })
    },
    /* 更新表单数据 */
    update () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.put(`warehouse/equipmentManage/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        handler: self.formItem.handler,
        sum: self.formItem.sum,
        dataTime: self.formItem.dataTime,
        position_id: self.formItem.position,
        equipment_id: self.formItem.equipment,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        alert('数据保存成功')
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 保存并提交表单数据 */
    saveAndSubmit () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.post(`warehouse/equipmentManage/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        handler: self.formItem.handler,
        sum: self.formItem.sum,
        dataTime: self.formItem.dataTime,
        position_id: self.formItem.position,
        equipment_id: self.formItem.equipment,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.$axios.patch(`warehouse/equipmentManage/` + response.data.id + '/', {
          state: '审核中'
        }).then(function (response
        ) {
          for (var i = 0; i < self.positionInfor.length; i++) {
            if (self.positionInfor[i].id === self.formItem.position) {
              self.positionInfor.splice(i, 1)
              break
            }
          }
          alert('数据提交成功')
        }).catch(function (err) {
          // 错误提示
          console.log(err)
        })
      }).catch(function (error) {
        if (error.request) {
          alert(error.request.response)
        } else {
          console.log('Error', error.message)
        }
      })
    },
    /* 更新并提交表单数据 */
    updateAndSubmit () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.put(`warehouse/equipmentManage/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        handler: self.formItem.handler,
        sum: self.formItem.sum,
        dataTime: self.formItem.dataTime,
        position_id: self.formItem.position,
        equipment_id: self.formItem.equipment,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.$axios.patch(`warehouse/equipmentManage/` + response.data.id + '/', {
          state: '审核中'
        }).then(function (response
        ) {
          alert('数据提交成功')
          self.showViewid = 'list'
        }).catch(function (err) {
          // 错误提示
          console.log(err)
        })
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    }
  },
  created () {
    this.userInfor = []
    this.warehouse = []
    this.positionInfor = []
    this.equipmentType = []
    this.equipmentInfor = []
    var self = this
    this.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
      self.userInfor = response.data.results
      self.$axios.get('warehouse/warehouse/?page_size=99999&ordering=-id&type=设备库&state=使用中').then(function (response) {
        self.warehouse = response.data.results
        self.$axios.get('equipment/equipmentType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
          self.equipmentType = response.data.results
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
      return 'warehouse.add_equipmentmanagemodel' in this.permissions
    },
    canRead () {
      return 'warehouse.read_equipmentmanagemodel' in this.permissions
    }
  },
  watch: {

    /* 监控用户选择的仓库:变化时,更新仓位:信息: */
    'formItem.warehouse': function (newval, oldval) {
      var self = this
      this.positionInfor = []
      if (newval === undefined) {
        return
      }
      this.$axios.get(`warehouse/warehouse/` + newval).then(function (response) {
        self.positionInfor = response.data.warehouse_item
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 监控用户选择的设备类型：变化时,更新设备信息: */
    'formItem.equipmentType': function (newval, oldval) {
      if (this.formItem.type !== '入库操作' && this.formItem.type !== '退库操作') {
        return
      }
      var self = this
      this.equipmentInfor = []
      if (newval === undefined) {
        return
      }
      this.$axios.get(`equipment/equipmentType/` + newval).then(function (response) {
        self.equipmentInfor = response.data.equipmentType_item
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 监控用户选择的操作类型：变化时,更新仓位:下拉框显示条件 */
    'formItem.type': function (newval, oldval) {
      if ((newval === '入库操作') || (newval === '退库操作')) {
        this.showKey = '闲置'
        this.inputDisable = false
        this.equipmentInfor = []
        this.formItem.equipment = ''
        this.formItem.equipmentType = ''
      } else if ((newval === '增加操作') || (newval === '出库操作') || (newval === '盘点操作')) {
        this.showKey = '使用中'
        this.inputDisable = true
        var self = this
        this.$axios.get('equipment/equipmentAccount/?page_size=99999&ordering=-id').then(function (response) {
          self.equipmentInfor = response.data.results
        }).catch(function (err) {
          // 错误提示
          console.log(err)
        })
      } else {
        this.showKey = ''
        this.inputDisable = true
      }
    },
    /* 监控用户选择的操作类型：变化时,更新仓位:下拉框显示条件 */
    'formItem.position': function (newval, oldval) {
      var self = this
      var warehouseCode = ''
      if ((this.formItem.type !== '入库操作') && (this.formItem.type !== '退库操作')) {
        for (var l = 0; l < this.warehouse.length; l++) {
          if (this.warehouse[l].id === this.formItem.warehouse) {
            warehouseCode = this.warehouse[l].code
            break
          }
        }
        this.$axios.get('warehouse/equipmentStockDetail/?warehouse_code=' + warehouseCode +
                   '&page_size=99999&ordering=-id').then(function (response) {
          response.data.results.forEach(function (value, i) {
            if (newval === parseInt(value.position_id) && (value.state === '使用中')) {
              for (var j = 0; j < self.equipmentType.length; j++) {
                if (self.equipmentType[j].code === value.equipmentType_code) {
                  self.formItem.equipmentType = self.equipmentType[j].id
                  self.formItem.equipment = parseInt(value.equipment_id)
                  break
                }
              }
            }
          })
        }).catch(function (err) {
          // 错误提示
          console.log(err)
        })
      }
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
  .equipmentManage{
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
    height: 25%;
    border-bottom:15px solid #F1F1F1;
  }
  .list .table li .heard{
    position: absolute;
    top: 0;
    height: 20%;
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
    width: 35%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .heard .code{
    position: absolute;
    top:0;
    left: 35%;
    width: 35%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .heard .type{
    position: absolute;
    top:0;
    left: 70%;
    width: 20%;
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
    height: 80%;
    width: 100%;
    font-family: PingFangSC-Medium;
    font-size: 0.8em;
    line-height: 2em;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    display: inline-block;
  }
  .list .table .content .warehousename{
    position: absolute;
    top:0;
    left: 1%;
    font-family: PingFangSC-Medium;
    font-size: 0.8em;
    line-height: 2em;
    color: #262426;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    display: inline-block;
  }
  .list .table .content .warehousecode{
    position: absolute;
    top: 0;
    left: 35%;
    font-family: PingFangSC-Medium;
    font-size: 0.8em;
    line-height: 2em;
    color: #262426;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    display: inline-block;
  }
  .list .table .content .sum{
    position: absolute;
    top: 0;
    left: 70%;
    font-family: PingFangSC-Medium;
    font-size: 0.8em;
    line-height: 2em;
    color: #262426;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    display: inline-block;
  }
  .list .table .content .positionname{
    position: absolute;
    top:20%;
    left: 1%;
    font-family: PingFangSC-Medium;
    font-size: 0.8em;
    line-height: 2em;
    color: #262426;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    display: inline-block;
  }
  .list .table .content .positioncode{
    position: absolute;
    top: 20%;
    left: 35%;
    font-family: PingFangSC-Medium;
    font-size: 0.8em;
    line-height: 2em;
    color: #262426;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    display: inline-block;
  }
  .list .table .content .batch{
    position: absolute;
    top: 20%;
    left: 70%;
    font-family: PingFangSC-Medium;
    font-size: 0.8em;
    line-height: 2em;
    color: #262426;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    display: inline-block;
  }
  .list .table .content .goodsname{
    position: absolute;
    top:40%;
    left: 1%;
    font-family: PingFangSC-Medium;
    font-size: 0.8em;
    line-height: 2em;
    color: #262426;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    display: inline-block;
  }
  .list .table .content .goodscode{
    position: absolute;
    top: 40%;
    left: 35%;
    font-family: PingFangSC-Medium;
    font-size: 0.8em;
    line-height: 2em;
    color: #262426;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    display: inline-block;
  }
  .list .table .content .handler{
    position: absolute;
    top: 40%;
    left: 70%;
    font-family: PingFangSC-Medium;
    font-size: 0.8em;
    line-height: 2em;
    color: #262426;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    display: inline-block;
  }
  .list .table .content .dataTime{
    position: absolute;
    top: 60%;
    left: 1%;
    font-family: PingFangSC-Medium;
    font-size: 0.8em;
    line-height: 2em;
    color: #262426;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    display: inline-block;
  }
  .list .table .content .create{
    position: absolute;
    top: 80%;
    left: 1%;
    font-family: PingFangSC-Medium;
    font-size: 0.8em;
    line-height: 2em;
    color: #262426;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
  }
  .list .table .content .auditor{
    position: absolute;
    top:80%;
    left: 50%;
    font-family: PingFangSC-Medium;
    font-size: 0.8em;
    line-height: 2em;
    color: #262426;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    display: inline-block;
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
  .create{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .create .title{
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
  .create .title .button{
    position: absolute;
    top: 10%;
    right: 0;
    width: 30%;
    height: 80%;
  }
  .create .title .button button{
    position: absolute;
    right: 0;
    top: 10%;
    width: 20%;
    height: 80%;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
    margin-right: 5%;
  }
  .create #scan{
    position: relative;
    top: 18%;
    width: 9%;
    height: 64%;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
    margin-right: 5%;
    float: left;
  }
  .create form{
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
  .create form div{
    position: relative;
    width: 100%;
    height: 8%;
  }
  .create form div select,.create form div input,.create form div textarea{
    position: absolute;
    width: 10em;
    right: 1em;
    font-size: 0.8em;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .create .child {
    position: relative;
    width: 100%;
    height: 20%;
    float: left;
    background: #4d5669;
  }
  .create .child form{
    position: absolute;
    width: 100%;
    height: 100%;
    padding-top: 1%;
    overflow: auto;
    overflow-x: hidden;
  }
  .create .child div{
    position: relative;
    width: 50%;
    height: 30%;
    font-size: 1.5em;
    float: left;
  }
  .create .child select,.create .child input,.create .child textarea{
    position: absolute;
    width: 60%;
    height: 80%;
    right: 4em;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .create .annex{
    position: relative;
    width: 100%;
    height: 30%;
    background: #4d5669;
    float: left;
  }
  .create .annex ul{
    position: absolute;
    top: 5%;
    left: 2.5em;
    right: 10%;
    height: 35%;
    margin-left: 2em;
    background: #ffffff;
    overflow: auto;
    overflow-x: hidden;
  }
  .create .annex ul li{
    position: relative;
    width: 80%;
    height: 2em;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1em;
  }
  .create .annex input{
    position: absolute;
    top: 45%;
    left: 10%;
    width: 80%;
    height: 15%;
    margin: 0;
    padding: 0;
    border: none;
    background: #ffffff;
    border-radius: 1em;
  }
  .create .annex textarea {
    position: absolute;
    top: 65%;
    left: 10%;
    width: 80%;
    height: 15%;
    background: #ffffff;
    overflow: auto;
    overflow-x: hidden;
  }
  .create .annex button{
    position: absolute;
    bottom: 0;
    width: 4em;
    font-size: 0.8em;
    line-height: 2em;
    background: #2d59ff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .create table{
    width: 100%;
    table-layout: fixed;
    empty-cells:hide;
  }
  .create  th{
    position: sticky;
    top:0;
    height: 2em;
    font-family: PingFangSC-Regular;
    font-size: 1em;
    color: #ffffff;
    text-align: center;
    letter-spacing: -0.45px;
    background: #191A1E;
  }
  .create  td{
    height: 1em;
    font-family: PingFangSC-Regular;
    font-size: 0.8em;
    color: #191A1E;
    letter-spacing: -0.45px;
    text-align: center;
    background: #ffffff;
    border:1px solid #999;
  }
  .create .button{
    position: absolute;
    top: 90%;
    width: 80%;
    height: 10%;
    padding-right: 10%;
    padding-left: 10%;
    float: left;
  }
  .create .button button{
    position: relative;
    width: 6em;
    font-size: 0.4em;
    line-height: 2em;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
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
    background: rgb(252, 196, 0);
    letter-spacing: -0.45px;
    text-align: center;
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
  .update .child {
    position: relative;
    width: 100%;
    height: 20%;
    float: left;
    background: #4d5669;
  }
  .update .child form{
    position: absolute;
    width: 100%;
    height: 100%;
    padding-top: 1%;
    overflow: auto;
    overflow-x: hidden;
  }
  .update .child div{
    position: relative;
    width: 50%;
    height: 30%;
    font-size: 1.5em;
    float: left;
  }
  .update .child select,.update .child input,.update .child textarea{
    position: absolute;
    width: 60%;
    height: 80%;
    right: 4em;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .update .annex{
    position: relative;
    width: 100%;
    height: 30%;
    background: #4d5669;
    float: left;
  }
  .update .annex ul{
    position: absolute;
    top: 5%;
    left: 2.5em;
    right: 10%;
    height: 35%;
    margin-left: 2em;
    background: #ffffff;
    overflow: auto;
    overflow-x: hidden;
  }
  .update .annex ul li{
    position: relative;
    width: 80%;
    height: 2em;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1em;
  }
  .update .annex input{
    position: absolute;
    top: 45%;
    left: 10%;
    width: 80%;
    height: 15%;
    margin: 0;
    padding: 0;
    border: none;
    background: #ffffff;
    border-radius: 1em;
  }
  .update .annex textarea {
    position: absolute;
    top: 65%;
    left: 10%;
    width: 80%;
    height: 15%;
    background: #ffffff;
    overflow: auto;
    overflow-x: hidden;
  }
  .update .annex button{
    position: absolute;
    bottom: 0;
    width: 4em;
    font-size: 0.8em;
    line-height: 2em;
    background: #2d59ff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .update table{
    width: 100%;
    table-layout: fixed;
    empty-cells:hide;
  }
  .update  th{
    position: sticky;
    top:0;
    height: 2em;
    font-family: PingFangSC-Regular;
    font-size: 1em;
    color: #ffffff;
    text-align: center;
    letter-spacing: -0.45px;
    background: #191A1E;
  }
  .update  td{
    height: 1em;
    font-family: PingFangSC-Regular;
    font-size: 0.8em;
    color: #191A1E;
    letter-spacing: -0.45px;
    text-align: center;
    background: #ffffff;
    border:1px solid #999;
  }
  .update .button{
    position: absolute;
    top: 90%;
    width: 80%;
    height: 10%;
    padding-right: 10%;
    padding-left: 10%;
    float: left;
  }
  .update .button button{
    position: relative;
    width: 6em;
    font-size: 0.4em;
    line-height: 2em;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
</style>
