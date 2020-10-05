<template>
  <div class="inspectionReport">
    <!-- 列表页显示-->
    <div  class="list"  v-show="showViewid==='list'">
      <div class="title">
        <span>检验汇报</span>
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
              <span class="state" v-show="item.state==='完成'" style="background-color: #61c255">完</span>
              <span class="name">{{"【"+item.name+"】"}}</span>
              <span class="code">{{item.code}}</span>
            </div>
            <div class="content">
              <span class="typename">类型：{{"【"+item.type.name+"】"}}</span>
              <span class="typecode">{{item.type.code}}</span>
              <span class="handler">操作者:{{item.handler}}</span>
              <span class="result">结果{{item.result}}</span>
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
        <span>检验汇报详情</span>
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
            <span class="name">报检数量:</span>
            <span class="code">{{detail.submit_sum}}</span>
          </div>
          <div >
            <span class="name">抽检数量:</span>
            <span class="code">{{detail.samples_sum}}</span>
          </div>
          <div >
            <span class="name">合格数量:</span>
            <span class="code">{{detail.ok_sum}}</span>
          </div>
          <div >
            <span class="name">不合格数量:</span>
            <span class="code">{{detail.ng_sum}}</span>
          </div>
          <div >
            <span class="name">让步接收数量:</span>
            <span class="code">{{detail.concession_sum}}</span>
          </div>
          <div >
            <span class="name">抽检结果:</span>
            <span class="code">{{detail.result}}</span>
          </div>
          <div >
            <span class="name">抽检人员:</span>
            <span class="code">{{detail.handler}}</span>
          </div>
          <div >
            <span class="name">抽检时间:</span>
            <span class="code">{{detail.dataTime}}</span>
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
        <div >
          <span class="name">子项:</span>
        </div>
        <dl class="childItem">
          <li v-for="item in detail.child" :key="item.id">
            <span class="name">不良信息:{{"【"+item.defect.name+"】"}}</span>
            <span class="code">{{item.defect.code}}</span>
            <span class="ok_sum">合格:{{item.ok_sum}}</span>
            <span class="concession_sum">让步接收:{{item.concession_sum}}</span>
            <span class="ng_sum">不良:{{item.ng_sum}}</span>
          </li>
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
      <div class="alter" v-show="detail.state!=='完成'">
        审核信息:
        <input v-model="alterItem.desc" type="text" placeholder="  请输入当前信息:的审核记录...">
       <!--        <button type="button" @click="uploadAlter">提交记录</button>-->
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
        <span>添加检验汇报</span>
        <div class="button" >
          <button @click="showViewid='list'" >
            <img  height=100% src="../../../../../static/icon/undo.png"/>
          </button>
        </div>
      </div>
      <form   ref="createForm" >
        <div>检验汇报名称:
          <input v-model="formItem.name"  placeholder="请输入检验汇报名称:...">
        </div>
        <div>检验汇报编码:
          <input v-model="formItem.code"  placeholder="请输入检验汇报编码:...">
        </div>
        <div>类型：
          <select v-model="formItem.type"   placeholder="请选择类型：">
            <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>报检数量:
          <input v-model="formItem.submit_sum" type="number" >
        </div>
        <div>抽检数量:
          <input v-model="formItem.samples_sum" type="number" >
        </div>
        <div>合格数量:
          <input v-model="formItem.ok_sum" type="number" >
        </div>
        <div>不合格数量:
          <input v-model="formItem.ng_sum" type="number" >
        </div>
        <div>让步接收数量:
          <input v-model="formItem.concession_sum"  >
        </div>
        <div>检验结果
          <input v-model="formItem.result"  placeholder="请输入检验结果...">
        </div>
        <div>抽检者:
          <input v-model="formItem.handler"  placeholder="请输入操作者:...">
        </div>
        <div>抽检时间:
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
        <div>
          <button type="button" @click="showChildForm='true'" >添加子项</button>
        </div>
        <div v-show="showChildForm==='true'" class="child">
          <form>
            <div>缺陷类型：
              <select v-model="formItem_child.defectType" >
                <option v-for="item in defectType" :value="item.id" :key="item.id">{{item.name +"("+ item.code+")"}}</option>
              </select>
            </div>
            <div>缺陷信息:
              <select v-model="formItem_child.defect" >
                <option v-for="item in defectInfor" :value="item.id" :key="item.id">{{item.name +"("+ item.code+")"}}</option>
              </select>
            </div>
            <div>合格数量:
              <input v-model="formItem_child.ok_sum" type="number">
            </div>
            <div>不合格数量:
              <input v-model="formItem_child.ng_sum" type="number">
            </div>
            <div>让步接收数量:
              <input v-model="formItem_child.concession_sum" type="number">
            </div>
            <div>备注信息:
              <textarea v-model="formItem_child.desc" placeholder="请输入当前物料说明信息:..."></textarea>
            </div>
            <div>
              <button type="button" @click="uploadChild">添加</button>
              <button type="button" @click="showChildForm='false'">取消</button>
            </div>
          </form>
        </div>
        <table v-show="list_child.length>0">
            <caption align="top">已添加子项:</caption>
            <tr align="center"  type="height:2em">
              <th>序号</th>
              <th>不良名称:</th>
              <th>不良编码:</th>
              <th>合格数量:</th>
              <th>不合格数量:</th>
              <th>让步接收数量:</th>
              <th>说明</th>
              <th>操作</th>
            </tr>
            <tr align="center" v-for="(item,index) in list_child" :key="item.id" type="height:1em" >
              <td>{{index}}</td>
              <td>{{item.defectName}}</td>
              <td>{{item.defectCode}}</td>
              <td>{{item.ok_sum}}</td>
              <td>{{item.ng_sum}}</td>
              <td>{{item.concession_sum}}</td>
              <td>{{item.desc}}</td>
              <td>
                <button type="button" @click="removeChild(item.id)">移除</button>
              </td>
            </tr>
            <tr>

            </tr>
          </table>
      </form>
      <div class="button">
        <button type="button" @click="save">保存数据</button>
        <button type="button" @click="saveAndSubmit">保存并提交</button>

      </div>
    </div>
    <!--    /*更新页显示*/-->
    <div  class="update"  v-show="showViewid==='update'">
      <form   ref="updateForm"  >
        <div>检验汇报名称:
          <input v-model="formItem.name"  placeholder="请输入检验汇报名称:...">
        </div>
        <div>检验汇报编码:
          <input v-model="formItem.code"  placeholder="请输入检验汇报编码:...">
        </div>
        <div>类型：
          <select v-model="formItem.type"   placeholder="请选择类型：">
            <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>报检数量:
          <input v-model="formItem.submit_sum" type="number"  >
        </div>
        <div>抽检数量:
          <input v-model="formItem.samples_sum" type="number" >
        </div>
        <div>合格数量:
          <input v-model="formItem.ok_sum" type="number" >
        </div>
        <div>不合格数量:
          <input v-model="formItem.ng_sum" type="number" >
        </div>
        <div>让步接收数量:
          <input v-model="formItem.concession_sum" type="number">
        </div>
        <div>检验结果
          <input v-model="formItem.result"  placeholder="请输入检验结果...">
        </div>
        <div>抽检者:
          <input v-model="formItem.handler"  placeholder="请输入检验汇报编码:...">
        </div>
        <div>抽检时间:
          <input v-model="formItem.dataTime"  type="datetime-local" placeholder="选择日期和时间" >
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
        <div>
          <button type="button" @click="showChildForm='true'" >添加子项</button>
        </div>
        <div v-show="showChildForm==='true'" class="child">
          <form>
            <div>缺陷类型：
              <select v-model="formItem_child.defectType" >
                <option v-for="item in defectType" :value="item.id" :key="item.id">{{item.name +"("+ item.code+")"}}</option>
              </select>
            </div>
            <div>缺陷信息:
              <select v-model="formItem_child.defect" >
                <option v-for="item in defectInfor" :value="item.id" :key="item.id">{{item.name +"("+ item.code+")"}}</option>
              </select>
            </div>
            <div>合格数量:
              <input v-model="formItem_child.ok_sum" type="number">
            </div>
            <div>不合格数量:
              <input v-model="formItem_child.ng_sum" type="number">
            </div>
            <div>让步接收数量:
              <input v-model="formItem_child.concession_sum" type="number">
            </div>
            <div>备注信息:
              <textarea v-model="formItem_child.desc" placeholder="请输入当前物料说明信息:..."></textarea>
            </div>
            <div>
              <button type="button" @click="uploadChild">添加</button>
              <button type="button" @click="showChildForm='false'">取消</button>
            </div>
          </form>
        </div>
        <table v-show="list_child.length>0">
          <caption align="top">已添加子项:</caption>
          <tr align="center"  type="height:2em">
            <th>序号</th>
            <th>不良名称:</th>
            <th>不良编码:</th>
            <th>合格数量:</th>
            <th>不合格数量:</th>
            <th>让步接收数量:</th>
            <th>说明</th>
            <th>操作</th>
          </tr>
          <tr align="center" v-for="(item,index) in list_child" :key="item.id" type="height:1em" >
            <td>{{index}}</td>
            <td>{{item.defectName}}</td>
            <td>{{item.defectCode}}</td>
            <td>{{item.ok_sum}}</td>
            <td>{{item.ng_sum}}</td>
            <td>{{item.concession_sum}}</td>
            <td>{{item.desc}}</td>
            <td>
              <button type="button" @click="removeChild(item.id)">移除</button>
            </td>
          </tr>
          <tr>

          </tr>
        </table>
        <div>历史审核记录:
          <ul>
            <li v-for="value in alterList" v-bind:key="value.id" >
              {{value.desc+value.create_time+value.create_user}}
            </li>
          </ul>
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
  name: 'inspectionReport',
  components: {

  },
  data () {
    return {
      /* 视图显示控制 */
      showViewid: 'list',
      showSearchView: false,
      showChildForm: '',
      /* 列表页数据 */
      list: [],
      listCount: 0,
      listNextUrl: '',
      listScroll: null,
      /* 子项列表数据 */
      list_child: [],
      /* 列表页查询参数 */
      selectItem: {
        state: '',
        create_user: '',
        auditor: '',
        type: '',
        searchValue: '',
        start_time: '',
        stop_time: ''
      },
      /* 列表页数据排序 */
      ordering: '-id',
      /* 详情页数据 */
      detail: [],
      type: {},
      /* 详情页审核记录项表单 */
      alterItem: {
        desc: '',
        uri: 'inspectionReport'
      },
      alterList: [],
      alterData: [],
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
        type: '',
        child: [],
        submit_sum: '',
        samples_sum: '',
        ok_sum: '',
        ng_sum: '',
        concession_sum: '',
        result: '',
        handler: '',
        dataTime: '',
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: '',
        file: [],
        alter: [],
        desc: '',
        auditor: ''
      },
      formItem_child: {
        id: '',
        defect: '',
        defectType: '',
        ok_sum: null,
        ng_sum: '',
        concession_sum: '',
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: '',
        desc: ''
      },
      /* 创建页文件项表单 */
      fileItem: {
        file: null,
        fileName: '',
        desc: '',
        uri: 'inspectionReport'
      },
      fileData: [],
      typeInfor: [],
      /* 具有审核权限的账号信息: */
      userInfor: [],
      /* 缺陷类型信息 */
      defectType: [],
      /* 缺陷信息: */
      defectInfor: [],
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
      this.$axios.get('quality/inspectionReport/?ordering=' + self.ordering).then(function (response) {
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
      this.$axios.get('quality/inspectionReport/?state=' + self.selectItem.state +
              '&auditor=' + self.selectItem.auditor +
              '&create_user=' + self.selectItem.create_user +
              '&type=' + self.selectItem.type +
              '&search=' + self.selectItem.searchValue +
              '&start_time=' + self.selectItem.start_time +
              '&stop_time=' + self.selectItem.stop_time +
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
      this.type = {}
      this.alterData = []// 清空审核数据
      var self = this
      this.$axios.get(`quality/inspectionReport/` + id).then(function (response) {
        self.detail = response.data
        self.type = self.detail.type
        response.data.child.forEach(function (value, i) {
          var obj1 = {'id': value.id,
            'defectName': value.defect.name,
            'defectCode': value.defectCode,
            'ok_sum': value.ok_sum,
            'ng_sum': value.ng_sum,
            'concession_sum': value.concession_sum,
            'attribute1': value.attribute1,
            'attribute2': value.attribute2,
            'attribute3': value.attribute3,
            'attribute4': value.attribute4,
            'attribute5': value.attribute5,
            'desc': value.desc}
          self.formItem.child.push(value.id)
          self.list_child.push(obj1)
        })
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
      this.$axios.patch(`quality/inspectionReport/` + self.detail.id + '/', {
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
      /* 清空子项表单数据 */
      for (let key in this.formItem_child) {
        if (Object.prototype.toString.call(this.formItem_child[key]) === '[object Array]') {
          this.formItem_child[key] = []
        } else if (Object.prototype.toString.call(this.formItem_child[key]) === '[object Object]') {
          var obj2 = this.formItem_child[key]
          for (let key1 in obj2) {
            if (Object.prototype.toString.call(obj2[key1]) === '[object Array]') {
              obj2[key1] = []
            } else {
              obj2[key1] = ''
            }
          }
        } else {
          this.formItem_child[key] = ''
        }
      }
      this.list_child = []
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
      /* 清空子项表单数据 */
      for (let key in this.formItem_child) {
        if (Object.prototype.toString.call(this.formItem_child[key]) === '[object Array]') {
          this.formItem_child[key] = []
        } else if (Object.prototype.toString.call(this.formItem_child[key]) === '[object Object]') {
          var obj2 = this.formItem_child[key]
          for (let key1 in obj2) {
            if (Object.prototype.toString.call(obj2[key1]) === '[object Array]') {
              obj2[key1] = []
            } else {
              obj2[key1] = ''
            }
          }
        } else {
          this.formItem_child[key] = ''
        }
      }
      this.list_child = []
      this.alterList = []
      this.fileData = []
      var self = this
      this.$axios.get(`quality/inspectionReport/` + id).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.name = response.data.name
        self.formItem.state = response.data.state
        self.formItem.code = response.data.code
        self.formItem.submit_sum = response.data.submit_sum
        self.formItem.samples_sum = response.data.samples_sum
        self.formItem.ok_sum = response.data.ok_sum
        self.formItem.ng_sum = response.data.ng_sum
        self.formItem.concession_sum = response.data.concession_sum
        self.formItem.result = response.data.result
        self.formItem.handler = response.data.handler
        self.formItem.dataTime = response.data.dataTime
        self.formItem.attribute1 = response.data.attribute1
        self.formItem.attribute2 = response.data.attribute2
        self.formItem.attribute3 = response.data.attribute3
        self.formItem.attribute4 = response.data.attribute4
        self.formItem.attribute5 = response.data.attribute5
        self.formItem.desc = response.data.desc
        self.formItem.auditor = response.data.auditor
        self.alterList = response.data.alter
        response.data.child.forEach(function (value, i) {
          var obj1 = {'id': value.id,
            'defectName': value.defect.name,
            'defectCode': value.defectCode,
            'ok_sum': value.ok_sum,
            'ng_sum': value.ng_sum,
            'concession_sum': value.concession_sum,
            'attribute1': value.attribute1,
            'attribute2': value.attribute2,
            'attribute3': value.attribute3,
            'attribute4': value.attribute4,
            'attribute5': value.attribute5,
            'desc': value.desc}
          self.formItem.child.push(value.id)
          self.list_child.push(obj1)
        })
        if (response.data.type !== null) {
          self.formItem.type = response.data.type.id
        } else { self.formItem.type = response.data.type }
        response.data.file.forEach(function (value, i) {
          var obj = {'id': value.id, 'fileName': value.file_name, 'fileUrl': value.file, 'desc': value.desc, 'uri': value.uri}
          self.formItem.file.push(value.id)
          self.fileData.push(obj)
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
      this.$axios.post(`quality/file/`, formData,
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
    /* 提交审核记录:项 */
    uploadAlter () {
      var self = this
      if (!confirm('确认提交??')) {
        return
      }
      this.$axios.post(`quality/alterRecord/`, {
        desc: self.alterItem.desc,
        uri: self.alterItem.uri
      }).then(function (response) {
        var obj = {'id': response.data.id,
          'desc': response.data.desc,
          'uri': response.data.uri}
        self.alterItem.desc = ''
        self.formItem.alter.push(response.data.id)
        self.alterData.push(obj)
        alert('审核记录:提交成功')
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    /* 提交子项物料项 */
    uploadChild () {
      var self = this
      this.$axios.post(`quality/inspectionReportItem/`, {
        defect: self.formItem_child.defect,
        ok_sum: self.formItem_child.ok_sum,
        ng_sum: self.formItem_child.ng_sum,
        concession_sum: self.formItem_child.concession_sum,
        attribute1: self.formItem_child.attribute1,
        attribute2: self.formItem_child.attribute2,
        attribute3: self.formItem_child.attribute3,
        attribute4: self.formItem_child.attribute4,
        attribute5: self.formItem_child.attribute5,
        desc: self.formItem_child.desc
      }).then(function (response) {
        self.showChildForm = ''
        var index = 0
        for (var i = 0; i < self.defectInfor.length; i++) {
          if (self.defectInfor[i].id === self.formItem_child.defect) {
            index = i
            break
          }
        }
        var obj = {
          'defectName': self.defectInfor[index].name,
          'defectCode': self.defectInfor[index].code,
          'ok_sum': response.data.ok_sum,
          'ng_sum': response.data.ng_sum,
          'concession_sum': response.data.concession_sum,
          'attribute1': response.data.attribute1,
          'attribute2': response.data.attribute2,
          'attribute3': response.data.attribute3,
          'attribute4': response.data.attribute4,
          'attribute5': response.data.attribute5,
          'desc': response.data.desc
        }
        self.list_child.push(obj)
        self.formItem.child.push(response.data.id)
        self.formItem_child.defect = ''
        self.formItem_child.ok_sum = ''
        self.formItem_child.ng_sum = ''
        self.formItem_child.concession_sum = ''
        self.formItem_child.attribute1 = ''
        self.formItem_child.attribute2 = ''
        self.formItem_child.attribute3 = ''
        self.formItem_child.attribute4 = ''
        self.formItem_child.attribute5 = ''
        self.formItem_child.desc = ''
        alert('记录提交成功')
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    removeChild: function (id) {
      var self = this
      if (!confirm('是否要删除当前数据' + id)) {
        // 当用户点击的取消按钮的时候，应该阻断这个方法中的后面代码的继续执行
        return
      }
      for (var i = 0; i < self.formItem.child.length; i++) {
        if (self.formItem.child[i] === id) {
          self.formItem.child.splice(i, 1)
        }
      }
      for (var j = 0; j < self.list_child.length; j++) {
        if (self.list_child[j].id === id) {
          self.list_child.splice(j, 1)
        }
      }
    },
    /* 保存表单数据 */
    save () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.post(`quality/inspectionReport/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        child: self.formItem.child,
        submit_sum: self.formItem.submit_sum,
        samples_sum: self.formItem.samples_sum,
        ok_sum: self.formItem.ok_sum,
        ng_sum: self.formItem.ng_sum,
        concession_sum: self.formItem.concession_sum,
        result: self.formItem.result,
        handler: self.formItem.handler,
        dataTime: self.formItem.dataTime,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
        file: self.formItem.file,
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
      this.$axios.put(`quality/inspectionReport/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        child: self.formItem.child,
        submit_sum: self.formItem.submit_sum,
        samples_sum: self.formItem.samples_sum,
        ok_sum: self.formItem.ok_sum,
        ng_sum: self.formItem.ng_sum,
        concession_sum: self.formItem.concession_sum,
        result: self.formItem.result,
        handler: self.formItem.handler,
        dataTime: self.formItem.dataTime,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        alert('数据保存成功')
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    /* 保存并提交表单数据 */
    saveAndSubmit () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.post(`quality/inspectionReport/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        child: self.formItem.child,
        submit_sum: self.formItem.submit_sum,
        samples_sum: self.formItem.samples_sum,
        ok_sum: self.formItem.ok_sum,
        ng_sum: self.formItem.ng_sum,
        concession_sum: self.formItem.concession_sum,
        result: self.formItem.result,
        handler: self.formItem.handler,
        dataTime: self.formItem.dataTime,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.$axios.patch(`quality/inspectionReport/` + response.data.id + '/', {
          state: '审核中'
        }).then(function (response
        ) {
          alert('数据提交成功')
        }).catch(function (err) {
          if (err.request) {
            alert(err.request.response)
          } else {
            console.log('Error', err.message)
          }
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
      this.$axios.put(`quality/inspectionReport/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        child: self.formItem.child,
        submit_sum: self.formItem.submit_sum,
        samples_sum: self.formItem.samples_sum,
        ok_sum: self.formItem.ok_sum,
        ng_sum: self.formItem.ng_sum,
        concession_sum: self.formItem.concession_sum,
        result: self.formItem.result,
        handler: self.formItem.handler,
        dataTime: self.formItem.dataTime,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.$axios.patch(`quality/inspectionReport/` + response.data.id + '/', {
          state: '审核中'
        }).then(function (response
        ) {
          alert('数据提交成功')
          self.showViewid = 'list'
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
    }
  },
  created () {
    this.userInfor = []
    var self = this
    this.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
      self.userInfor = response.data.results
      self.$axios.get('quality/defectType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
        self.defectType = response.data.results
        self.$axios.get('quality/inspectionReportType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
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
      return 'quality.add_inspectionreportmodel' in this.permissions
    },
    canRead () {
      return 'quality.read_inspectionreportmodel' in this.permissions
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
    },
    /* 监控用户选择的类别变化时,更新附加属性标题 */
    'formItem.type': function (newval, oldval) {
      var self = this
      for (let key in self.attribute_title) {
        self.attribute_title[key] = ''
      }
      if (newval === undefined) {
        return
      }
      this.$axios.get(`quality/inspectionReportType/` + newval).then(function (response) {
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
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    formItem_child: {
      deep: true
    },
    /* 监控用户选择的类别变化时,更新附加属性标题 */
    'formItem_child.defectType': function (newval, oldval) {
      var self = this
      this.defectInfor = []
      if (newval === undefined) {
        return
      }
      this.$axios.get(`quality/defectType/` + newval).then(function (response) {
        self.defectInfor = response.data.defectType_item
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    }
  }
}
</script>
<style scoped>
  .inspectionReport{
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
  .list .table .content .result{
    position: absolute;
    top: 25%;
    left: 50%;
    width: 50%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list .table .content .dataTime{
    position: absolute;
    top: 50%;
    left: 20%;
    width: 80%;
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
    height: 60%;
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
  .detail .content .childItem  li .ok_sum{
    position: absolute;
    top:50%;
    left: 0;
    width: 33%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .detail .content .childItem  li .concession_sum{
    position: absolute;
    top:50%;
    left: 33%;
    width: 33%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .detail .content .childItem  li .ng_sum{
    position: absolute;
    top:50%;
    left: 66%;
    width: 33%;
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
