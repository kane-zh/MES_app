<template>
  <div class="assessmentRecord">
    <!-- 列表页显示-->
    <div  class="list"  v-show="showViewid==='list'">
      <div class="title">
        <span>考核记录</span>
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
            </div>
            <div class="content">
              <span class="typename">类型：{{"【"+item.type.name+"】"}}</span>
              <span class="typecode">{{item.type.code}}</span>
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
        <span>考核记录详情</span>
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
            <span class="name">考核时间:</span>
            <span class="code">{{detail.dataTime}}</span>
          </div>
          <div >
            <span class="name">人员名称:</span>
            <span class="code">{{personnel.name}}</span>
          </div>
          <div >
            <span class="name">人员编码:</span>
            <span class="code">{{personnel.code}}</span>
          </div>
          <div >
            <span class="name">等级名称:</span>
            <span class="code">{{level.name}}</span>
          </div>
          <div >
            <span class="name">等级编码:</span>
            <span class="code">{{level.code}}</span>
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
            <dt>文件:</dt>
            <template v-for="(value,id) in detail.file">
              <a target='_black' v-bind:key="id" :href="value.file">{{value.file_name}}</a>
            </template>
          </dl>

      </div>

       <div class="button">
        <button type="button" @click="changeState('审核中')" v-show="showSubmitBt===true">提交数据</button>
        <button type="button" @click="changeState('完成')" v-show="showApprovedBt===true" >通过审核</button>
        <button type="button" @click="changeState('新建')" v-show="showReturnBt===true">驳回信息:</button>
        <button type="button" @click="changeState('作废')" v-show="showDeleteBt===true">删除数据</button>

      </div>
    </div>
    <!--    /*创建页显示*/-->
    <div  class="create"  v-show="showViewid==='create'">
      <div class="title">
        <span>添加考核记录</span>
        <div class="button" >
          <button @click="showViewid='list'" >
            <img  height=100% src="../../../../../static/icon/undo.png"/>
          </button>
        </div>
      </div>
      <form   ref="createForm" >
        <div>考核记录名称:
          <input v-model="formItem.name"  placeholder="请输入考核记录名称:...">
        </div>
        <div>考核记录编码:
          <input v-model="formItem.code"  placeholder="请输入考核记录编码:...">
        </div>
        <div>类型：
          <select v-model="formItem.type"   placeholder="请选择类型：">
            <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>人员:
          <select v-model="formItem.personnel"   placeholder="请选择人员">
            <option v-for="item in personnelInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>等级:
          <select v-model="formItem.level"   placeholder="请选择等级">
            <option v-for="item in levelInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>考核时间:
          <input v-model="formItem.dataTime"  type="datetime-local" placeholder="选择日期和时间">
        </div>
        <div v-show="attribute_title.attribute1!==''">{{attribute_title.attribute1}}
          <input v-model="formItem.attribute1"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute2!==''">{{attribute_title.attribute2}}
          <input v-model="formItem.attribute2"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute3!==''">{{attribute_title.attribute3}}
          <input v-model="formItem.attribute3"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute4!==''">{{attribute_title.attribute4}}
          <input v-model="formItem.attribute4"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute5!==''">{{attribute_title.attribute5}}
          <input v-model="formItem.attribute5"  placeholder="...">
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
      <form   ref="updateForm"  >
        <div>考核记录名称:
          <input v-model="formItem.name"  placeholder="请输入考核记录名称:...">
        </div>
        <div>考核记录编码:
          <input v-model="formItem.code"  placeholder="请输入考核记录编码:...">
        </div>
        <div>类型：
          <select v-model="formItem.type"   placeholder="请选择类型：">
            <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>人员:
          <select v-model="formItem.personnel"   placeholder="请选择人员">
            <option v-for="item in personnelInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>等级:
          <select v-model="formItem.level"   placeholder="请选择等级">
            <option v-for="item in levelInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>考核时间:
          <input v-model="formItem.dataTime"  type="datetime-local" placeholder="选择日期和时间">
        </div>
        <div v-show="attribute_title.attribute1!==''">{{attribute_title.attribute1}}
          <input v-model="formItem.attribute1"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute2!==''">{{attribute_title.attribute2}}
          <input v-model="formItem.attribute2"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute3!==''">{{attribute_title.attribute3}}
          <input v-model="formItem.attribute3"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute4!==''">{{attribute_title.attribute4}}
          <input v-model="formItem.attribute4"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute5!==''">{{attribute_title.attribute5}}
          <input v-model="formItem.attribute5"  placeholder="...">
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
  name: 'assessmentRecord',
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
        ordering: '',
        start_time: '',
        stop_time: ''
      },

      /* 详情页数据 */
      detail: [],
      type: {},
      personnel: {},
      level: {},
      /* 详情页按钮显示控制 */
      showSubmitBt: false,
      showReturnBt: false,
      showApprovedBt: false,
      showDeleteBt: false,
      /* 创建页表单项数据 */
      formItem: {
        id: '',
        name: '',
        code: '',
        state: '',
        type: null,
        personnel: null,
        level: null,
        dataTime: '',
        file: [],
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: '',
        desc: '',
        auditor: ''
      },
      /* 创建页文件项表单 */
      fileItem: {
        file: null,
        fileName: '',
        desc: '',
        uri: 'assessmentRecord'
      },
      fileData: [],
      /* 考核记录类型信息 */
      typeInfor: [],
      /* 考核人员信息: */
      personnelInfor: [],
      /* 考核等级信息: */
      levelInfor: [],
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
      this.showSearchView = false
      for (let key in this.selectItem) {
        this.selectItem[key] = ''
      }
      var self = this
      this.$axios.get('production/assessmentRecord/?ordering=' + self.selectItem.ordering).then(function (response) {
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
      this.$axios.get('production/assessmentRecord/?state=' + self.selectItem.state +
              '&auditor=' + self.selectItem.auditor +
              '&create_user=' + self.selectItem.create_user +
              '&type=' + self.selectItem.type +
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
      this.personnel = {}
      this.level = {}
      var self = this
      this.$axios.get(`production/assessmentRecord/` + id).then(function (response) {
        self.detail = response.data
        self.type = self.detail.type
        self.personnel = self.detail.personnel
        self.level = self.detail.level
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
      this.$axios.patch(`production/assessmentRecord/` + self.detail.id + '/', {
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
      this.$axios.get(`production/assessmentRecord/` + id).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.name = response.data.name
        self.formItem.state = response.data.state
        self.formItem.code = response.data.code
        self.formItem.dataTime = response.data.dataTime
        self.formItem.attribute1 = response.data.attribute1
        self.formItem.attribute2 = response.data.attribute2
        self.formItem.attribute3 = response.data.attribute3
        self.formItem.attribute4 = response.data.attribute4
        self.formItem.attribute5 = response.data.attribute5
        self.formItem.desc = response.data.desc
        self.formItem.auditor = response.data.auditor
        if (response.data.type !== null) {
          self.formItem.type = response.data.type.id
        } else { self.formItem.type = response.data.type }
        if (response.data.personnel !== null) {
          self.formItem.personnel = response.data.personnel.id
        } else { self.formItem.personnel = response.data.personnel }
        if (response.data.level !== null) {
          self.formItem.level = response.data.level.id
        } else { self.formItem.level = response.data.level }
        response.data.file.forEach(function (value, i) {
          var obj = {'id': value.id, 'fileName': value.file_name, 'fileUrl': value.file, 'desc': value.desc, 'uri': value.uri}
          self.formItem.file.push(value.id)
          self.fileData.push(obj)
        })
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
      this.$axios.post(`production/file/`, formData,
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
      this.$axios.post(`production/assessmentRecord/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        personnel: self.formItem.personnel,
        level: self.formItem.level,
        dataTime: self.formItem.dataTime,
        file: self.formItem.file,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
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
      this.$axios.put(`production/assessmentRecord/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        personnel: self.formItem.personnel,
        level: self.formItem.level,
        dataTime: self.formItem.dataTime,
        file: self.formItem.file,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
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
      this.$axios.post(`production/assessmentRecord/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        personnel: self.formItem.personnel,
        level: self.formItem.level,
        dataTime: self.formItem.dataTime,
        file: self.formItem.file,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.$axios.patch(`production/assessmentRecord/` + response.data.id + '/', {
          state: '审核中'
        }).then(function (response
        ) {
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
      this.$axios.put(`production/assessmentRecord/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        personnel: self.formItem.personnel,
        level: self.formItem.level,
        dataTime: self.formItem.dataTime,
        file: self.formItem.file,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.$axios.patch(`production/assessmentRecord/` + response.data.id + '/', {
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
    this.levelInfor = []
    this.personnelInfor = []
    this.typeInfor = []
    var self = this
    this.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
      self.userInfor = response.data.results
      self.$axios.get('production/assessmentType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
        self.typeInfor = response.data.results
        self.$axios.get('production/personnelInfor/?page_size=99999&ordering=-id').then(function (response) {
          self.personnelInfor = response.data.results
          self.$axios.get('production/assessmentLevel/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
            self.levelInfor = response.data.results
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
      return 'production.add_assessmentrecordmodel' in this.permissions
    },
    canRead () {
      return 'production.read_assessmentrecordmodel' in this.permissions
    }

  },
  watch: {

    /* 监控用户选择的类别变化时,更新附加属性标题 */
    'formItem.type': function (newval, oldval) {
      var self = this
      for (let key in self.attribute_title) {
        self.attribute_title[key] = ''
      }
      if (newval === undefined) {
        return
      }
      this.$axios.get(`production/assessmentType/` + newval).then(function (response) {
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
  .assessmentRecord{
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
  .list .table .content .typename{
    position: absolute;
    top:0;
    left: 0;
    width: 50%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .typecode{
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .handler{
    position: absolute;
    top: 25%;
    left: 0;
    width: 50%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .dataTime{
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .create{
    position: absolute;
    top:75%;
    left: 0;
    width: 50%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .auditor{
    position: absolute;
    top:75%;
    left: 50%;
    width: 50%;
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
