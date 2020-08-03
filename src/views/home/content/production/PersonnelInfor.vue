<template>
  <div class="personnelInfor">
    <!-- 列表页显示-->
    <div  class="list"  v-show="showViewid==='list'">
      <div class="title">
        <span>人员信息</span>
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
              <span class="workshopname">车间{{"【"+item.workshop_name+"】"}}</span>
              <span class="workshopcode">{{item.workshop_code}}</span>
              <span class="teamname">班组:{{"【"+item.team.name+"】"}}</span>
              <span class="teamcode">{{item.team.code}}</span>
              <span class="job_number">工号{{item.job_number}}</span>
              <span class="post">职位{{item.post}}</span>
              <span class="mobile">电话{{item.mobile}}</span>
              <span class="wechat">微信{{item.wechat}}</span>
              <span class="create">创建账号:{{item.create_user}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--   /*详情页显示*/-->
    <div  class="detail"  v-show="showViewid==='detail'">
      <div class="title">
        <span>人员信息详情</span>
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
            <span class="name">班组名称:</span>
            <span class="code">{{team.name}}</span>
          </div>
          <div >
            <span class="name">班组编码:</span>
            <span class="code">{{team.code}}</span>
          </div>
          <div >
            <span class="name">人员工号:</span>
            <span class="code">{{detail.job_number}}</span>
          </div>
          <div >
            <span class="name">人员职位:</span>
            <span class="code">{{detail.post}}</span>
          </div>
          <div >
            <span class="name">人员微信:</span>
            <span class="code">{{detail.wechat}}</span>
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
        <div >
          <span class="name">技能:</span>
        </div>
        <dl class="childItem">
          <li v-for="item in detail.skill" :key="item.id">
            <span class="name">名称:{{"【"+item.name+"】"}}</span>
            <span class="code">{{item.code}}</span>
            <span class="state">状态:{{item.state}}</span>
          </li>
        </dl>
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

      </div>
    </div>
    <!--    /*创建页显示*/-->
    <div  class="create"  v-show="showViewid==='create'">
      <div class="title">
        <span>添加人员信息</span>
        <div class="button" >
          <button @click="showViewid='list'" >
            <img  height=100% src="../../../../../static/icon/undo.png"/>
          </button>
        </div>
      </div>
      <form   ref="createForm" >
        <div>人员名称:
          <input v-model="formItem.name"  placeholder="请输入人员名称:...">
        </div>
        <div>人员编码:
          <input v-model="formItem.code"  placeholder="请输入人员编码:...">
        </div>
        <div>人员工号
          <input v-model="formItem.job_number"  placeholder="请输入人员工号...">
        </div>
        <div>人员职位
          <input v-model="formItem.post"  placeholder="请输入人员职位...">
        </div>
        <div>人员微信
          <input v-model="formItem.wechat"  placeholder="请输入人员微信...">
        </div>
        <div>班组
          <select v-model="formItem.team"   placeholder="请选择班组">
            <option v-for="item in teamInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>技能
          <select v-model="formItem.skill"  placeholder="请选择技能"  multiple="true">
            <option v-for="item in skillInfor" :value="item.id" :key="item.id">{{"("+item.type.name+item.type.code+")"+item.name+"("+item.code+")"}}</option>
          </select>
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
        <div class="annex">图片附件
          <ul>
            <li v-for="value in imageData" v-bind:key="value.id"  @click="removeImage(value.id)">
              <img :src="value.imageUrl" width="50px">
            </li>
          </ul>
          <input type="file"  @change="imageBeforeUpload"/>
          <textarea  v-model="imageItem.desc"  placeholder="请输入当前的备注信息:..."></textarea>
          <button type="button" @click="uploadImage">上传</button>
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

      </div>
    </div>
    <!--    /*更新页显示*/-->
    <div  class="update"  v-show="showViewid==='update'">
      <form   ref="updateForm"  >
        <div>人员名称:
          <input v-model="formItem.name"  placeholder="请输入人员名称:...">
        </div>
        <div>人员编码:
          <input v-model="formItem.code"  placeholder="请输入人员编码:...">
        </div>
        <div>人员工号
          <input v-model="formItem.job_number"  placeholder="请输入人员工号...">
        </div>
        <div>人员职位
          <input v-model="formItem.post"  placeholder="请输入人员职位...">
        </div>
        <div>人员微信
          <input v-model="formItem.wechat"  placeholder="请输入人员微信...">
        </div>
        <div>班组
          <select v-model="formItem.team"   placeholder="请选择班组">
            <option v-for="item in teamInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>技能
          <select v-model="formItem.skill"  placeholder="请选择技能"  multiple="true">
            <option v-for="item in skillInfor" :value="item.id" :key="item.id">{{"("+item.type.name+item.type.code+")"+item.name+"("+item.code+")"}}</option>
          </select>
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
        <div class="annex">图片附件
          <ul>
            <li v-for="value in imageData" v-bind:key="value.id"  @click="removeImage(value.id)">
              <img :src="value.imageUrl" width="50px">
            </li>
          </ul>
          <input type="file"  @change="imageBeforeUpload"/>
          <textarea  v-model="imageItem.desc"  placeholder="请输入当前的备注信息:..."></textarea>
          <button type="button" @click="uploadImage">上传</button>
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

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personnelInfor',
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
        create_user: '',
        searchValue: ''
      },
      /* 列表页数据排序 */
      ordering: '-id',
      /* 详情页数据 */
      detail: [],
      team: {},
      /* 创建页表单项数据 */
      formItem: {
        id: '',
        name: '',
        code: '',
        team: null,
        skill: [],
        job_number: '',
        post: '',
        wechat: '',
        image: [],
        file: [],
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: '',
        desc: ''
      },
      /* 图片项表单 */
      imageItem: {
        image: null,
        imageName: '',
        desc: '',
        uri: 'personnelInfor'
      },
      imageData: [],
      /* 创建页文件项表单 */
      fileItem: {
        file: null,
        fileName: '',
        desc: '',
        uri: 'personnelInfor'
      },
      fileData: [],
      /* 技能班组信息: */
      teamInfor: [],
      /* 技能信息: */
      skillInfor: [],
      userInfor: [],
      /* 附加属性标题 */
      attribute_title: {
        attribute1: '电话',
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
      this.$axios.get('production/personnelInfor/?ordering=' + self.ordering).then(function (response) {
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
      this.$axios.get('production/personnelInfor/?create_user' + self.selectItem.create_user +
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
      this.selectItem.create_user = ''
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
      this.team = {}
      var self = this
      this.$axios.get(`production/personnelInfor/` + id).then(function (response) {
        self.detail = response.data
        self.team = self.detail.team
        self.showViewid = 'detail'
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
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
      this.imageData = []
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
      this.imageData = []
      var self = this
      this.$axios.get(`production/personnelInfor/` + id).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.name = response.data.name
        self.formItem.code = response.data.code
        self.formItem.job_number = response.data.job_number
        self.formItem.post = response.data.post
        self.formItem.wechat = response.data.wechat
        self.formItem.attribute1 = response.data.attribute1
        self.formItem.attribute2 = response.data.attribute2
        self.formItem.attribute3 = response.data.attribute3
        self.formItem.attribute4 = response.data.attribute4
        self.formItem.attribute5 = response.data.attribute5
        self.formItem.desc = response.data.desc
        if (response.data.team !== null) {
          self.formItem.team = response.data.team.id
        } else { self.formItem.team = response.data.team }
        response.data.skill.forEach(function (value, i) {
          self.formItem.skill.push(value.id)
        })
        response.data.file.forEach(function (value, i) {
          var obj = {'id': value.id, 'fileName': value.file_name, 'fileUrl': value.file, 'desc': value.desc, 'uri': value.uri}
          self.formItem.file.push(value.id)
          self.fileData.push(obj)
        })
        response.data.image.forEach(function (value, i) {
          var obj1 = {'id': value.id, 'imageName': value.image_name, 'imageUrl': value.image, 'desc': value.desc, 'uri': value.uri}
          self.formItem.image.push(value.id)
          self.imageData.push(obj1)
        })
        self.showViewid = 'update'
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    /* 提交图片项 */
    uploadImage () {
      if (!confirm('确认提交??')) {
        return
      }
      let formData = new FormData()
      // 下面是表单绑定的data 数据
      formData.append('uri', this.imageItem.uri)
      formData.append('desc', this.imageItem.desc)
      formData.append('image', this.imageItem.image)
      var self = this
      this.$axios.post(`production/image/`, formData,
        {headers: {'Content-Type': 'multipart/form-data'}}
      ).then(function (response) {
        var obj = {'id': response.data.id,
          'imageName': self.imageItem.imageName,
          'imageUrl': response.data.image,
          'desc': response.data.desc,
          'uri': response.data.uri}
        self.imageItem.image = null
        self.imageItem.desc = ''
        self.formItem.image.push(response.data.id)
        self.imageData.push(obj)
        alert(self.imageItem.imageName + '图片提交成功')
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },

    imageBeforeUpload (event) {
      this.imageItem.image = event.target.files[0]
      this.imageItem.imageName = event.target.files[0].name
    },
    removeImage: function (id) {
      var self = this
      if (!confirm('是否要删除当前数据' + id)) {
        // 当用户点击的取消按钮的时候，应该阻断这个方法中的后面代码的继续执行
        return
      }
      for (var i = 0; i < self.formItem.image.length; i++) {
        if (self.formItem.image[i] === id) {
          self.formItem.image.splice(i, 1)
        }
      }
      for (var j = 0; j < self.imageData.length; j++) {
        if (self.imageData[j].id === id) {
          self.imageData.splice(j, 1)
        }
      }
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
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
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
      this.$axios.post(`production/personnelInfor/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        team: self.formItem.team,
        skill: self.formItem.skill,
        job_number: self.formItem.job_number,
        post: self.formItem.post,
        wechat: self.formItem.swechatkill,
        file: self.formItem.file,
        image: self.formItem.image,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
        desc: self.formItem.desc
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.formItem.image = []
        self.imageData = []
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
      this.$axios.put(`production/personnelInfor/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        team: self.formItem.team,
        skill: self.formItem.skill,
        job_number: self.formItem.job_number,
        post: self.formItem.post,
        wechat: self.formItem.wechat,
        file: self.formItem.file,
        image: self.formItem.image,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
        desc: self.formItem.desc
      }).then(function (response) {
        alert('数据保存成功')
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
    this.teamInfor = []
    var self = this
    this.$axios.get('production/teamInfor/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
      self.teamInfor = response.data.results
      self.$axios.get('production/skillInfor/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
        self.skillInfor = response.data.results
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
      return 'production.add_personnelinfordefinitionmodel' in this.permissions
    },
    canRead () {
      return 'production.read_personnelinfordefinitionmodel' in this.permissions
    }

  },
  watch: {
  }
}
</script>
<style scoped>
  .personnelInfor{
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
  }
  .list .table{
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
  .list .table .content .workshopname{
    position: absolute;
    top:0;
    left: 20%;
    width: 45%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .workshopcode{
    position: absolute;
    top: 0;
    left: 65%;
    width: 35%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .list .table .content .teamname{
    position: absolute;
    top:20%;
    left: 20%;
    width: 45%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .teamcode{
    position: absolute;
    top: 20%;
    left: 65%;
    width: 35%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .job_number{
    position: absolute;
    top:40%;
    left: 20%;
    width: 45%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .post{
    position: absolute;
    top: 40%;
    left: 65%;
    width: 35%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .mobile{
    position: absolute;
    top:60%;
    left: 20%;
    width: 45%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .wechat{
    position: absolute;
    top: 60%;
    left: 65%;
    width: 35%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .create{
    position: absolute;
    top: 80%;
    left: 20%;
    width: 80%;
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
  .detail .content .childItem{
    position: relative;
    top: 0;
    height: 20%;
    width: 100%;
    text-shadow: 0 2px 4px rgba(0,0,0,0.20);
    overflow-x: auto;

  }
  .detail .content .childItem li{
    position: relative;
    left: 10%;
    height: 70%;
    width: 90%;
    font-family: PingFangSC-Regular;
    font-size: 0.4em;
    line-height: 2em;
    background: rgba(100, 100, 100, 0.1);
    border-bottom:15px solid rgba(100, 100, 100 , 1);
    list-style-type:none;
  }
  .detail .content .childItem  li .name{
    position: absolute;
    top:0;
    left: 0;
    width: 60%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .detail .content .childItem  li .code{
    position: absolute;
    top:0;
    left: 60%;
    width: 40%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .detail .content .childItem  li .state{
    position: absolute;
    top:50%;
    left: 0;
    width: 100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
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
