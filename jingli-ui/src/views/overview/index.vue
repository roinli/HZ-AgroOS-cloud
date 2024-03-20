<template lang="html">
  <div class="overview">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="传感器" name="sensor">
        <div class="sensor">
          <div class="sensor-head">
            <el-input v-model="sensor_txt" class="search" placeholder="请输入要搜索的传感器名称" />
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary" @click="showAddSensor">新增传感器</el-button>
          </div>
          <el-table
            :data="sensorData"
            v-loading="loading"
            :header-cell-class-name="tableheaderClassName"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="编号"
              width="50">
            </el-table-column>
            <el-table-column
              label="传感器名称">
              <template slot-scope="scope">
                <div class="control-id">
                  <img class="image" :src="scope.row.icon" width="30" height="30" alt="">
                  <a class="name">{{scope.row.deviceName}}</a>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="controlId"
              label="使用该设备的主控ID">
              <template slot-scope="scope">
                <div class="control-id">
                  主控ID
                  <a class="link" @click="linkTo(scope.row)">{{ scope.row.mainControlIdUseCount ? scope.row.mainControlIdUseCount : 0 }}</a>
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="ware"
              label="使用该设备的仓库">
              <template slot-scope="scope">
                <div class="ware-id">
                  仓库
                  <a class="link">{{ scope.row.warehouseUseCount ? scope.row.warehouseUseCount : 0 }}</a>
                </div>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="createTime"
              label="创建时间">
            </el-table-column>
            <el-table-column
              width="150"
              label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="sensorEdit(scope.row)">修改</el-button>
                <el-button type="danger" size="small" @click="sensorDel(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="控制器" name="controller">
        <div class="controller">
          <div class="controller-head">
            <el-input v-model="controller_txt" class="search" placeholder="请输入要搜索的控制器名称" />
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary" @click="showAddController">新增控制器</el-button>
          </div>
          <el-table
            :data="controllerData"
            v-loading="loading"
            :header-cell-class-name="tableheaderClassName"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="编号"
              width="50">
            </el-table-column>
            <el-table-column
              label="控制器名称">
              <template slot-scope="scope">
                <div class="control-id">
                  <img class="image" :src="scope.row.icon" width="30" height="30" alt="">
                  <a class="name">{{scope.row.deviceName}}</a>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间">
            </el-table-column>
            <el-table-column
              width="150"
              label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="controllerEdit(scope.row)">修改</el-button>
                <el-button type="danger" size="small" @click="controllerDel(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="摄像头" name="camera">
        <div class="camera">
          <div class="camera-head">
            <el-input v-model="camera_txt" class="search" placeholder="请输入要搜索的摄像头名称" />
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary" @click="showAddCamera">新增摄像头</el-button>
          </div>
          <el-table
            :data="cameraData"
            v-loading="loading"
            :header-cell-class-name="tableheaderClassName"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="编号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="deviceName"
              label="摄像头名称">
            </el-table-column>
            <el-table-column
              prop="url"
              label="摄像头URL">
            </el-table-column>
            <el-table-column
              prop="channel"
              label="通道">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="userPwd"
              label="密码">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间">
            </el-table-column>
            <el-table-column
              width="150"
              label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="cameraEdit(scope.row)">修改</el-button>
                <el-button type="danger" size="small" @click="cameraDel(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!-- 修改传感器 -->
    <el-dialog
      :title="sensorEditTitle"
      :visible.sync="dialogEditVisSensor"
      width="30%">
      <el-form ref="sensorEditForm" :rules="sensorEditFormRules" :model="sensorEditForm" label-width="100px">
        <el-form-item label="传感器名称" prop="deviceName">
          <el-input v-model="sensorEditForm.deviceName" placeholder="请输入传感器名称"></el-input>
        </el-form-item>
        <el-form-item label="传感器单位" prop="deviceUnit">
          <el-input v-model="sensorEditForm.deviceUnit" placeholder="请输入传感器单位"></el-input>
        </el-form-item>
        <el-form-item label="传感器图标" prop="icon">
          <el-select v-model="sensorEditForm.icon" placeholder="请选择">
            <el-option
              v-for="(item, index) in iconList"
              :key="index"
              :value="item.iconId">
              <img :src="item.iconUrl" width="30" height="30" />
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisSensor = false">取 消</el-button>
        <el-button type="primary" @click="sensorEditSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改控制器 -->
    <el-dialog
      :title="controllerEditTitle"
      :visible.sync="dialogEditVisController"
      class="controller-edit-wra"
      width="30%">
      <el-form ref="controllerEditForm" :rules="controllerEditFormRules" :model="controllerEditForm" label-width="100px">
        <el-form-item label="控制器名称" prop="deviceName">
          <el-input v-model="controllerEditForm.deviceName" placeholder="请输入控制器名称"></el-input>
        </el-form-item>
        <el-form-item class="item-con-spe" label="智联关联设备（非必填）">
          <ul class="item-controller-ass" v-if="!controllerEditstate">
            <li class="ass-item" v-for="(item, index) in controllerEditForm.autoDevice" :key="index">
              <span class="ass-txt">控制器名称：{{item.deviceName}}</span>
              <i class="ass-del el-icon-delete" @click="autoDeviceDel(index)"></i>
            </li>
          </ul>
          <el-select v-model="controllerEditForm.sensorDeviceIds" multiple placeholder="请选择">
            <el-option
              v-for="(item, index) in controllerRelation"
              :key="index"
              :value="item.id">
              {{item.deviceName}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="控制器图标" prop="icon">
          <el-select v-model="controllerEditForm.icon" placeholder="请选择">
            <el-option
              v-for="(item, index) in iconList"
              :key="index"
              :value="item.iconId">
              <img :src="item.iconUrl" width="30" height="30" />
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第1层级级数" v-show="!controllerEditstate">
          <!-- <el-input-number v-model="controllerDeviceChannelNum" :min="0" label="描述文字" @change="controllerDeviceChannelNumAdd"></el-input-number> -->
          <el-input class="controller-device-num" v-model="controllerDeviceChannelNum" :disabled="true"></el-input>
          <el-button type="primary" icon="el-icon-plus" @click="controllerDeviceChannelNumAdd"></el-button>
          <ul class="item-controller-hier" v-show="controllerDeviceChannelList.length > 0">
            <li class="hier-item" v-for="(item, index) in controllerDeviceChannelList">
              <div class="hier-item-conetent">
                <div class="hier-item-left">
                  <!-- <span class="hier-txt">第1层级{{ index + 1 }}</span> -->
                  <span class="hier-txt">第1层级{{item.number}}</span>
                  <i class="hier-del el-icon-delete" @click="controllerDeviceChannelListDel(item, index)"></i>
                </div>
                <div class="hier-item-right">
                  该层级有
                  <el-input class="hier-item-right-val" v-model.number="item.switchNum" @input="_updateControllerChannelSwitch(item)"></el-input>
                  开关
                </div>
              </div>
              <a class="hier-item-set" @click="hubHier(item)">设置下属层级</a>
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisController = false">取 消</el-button>
        <el-button type="primary" @click="controllerEditSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置下属层级 -->
    <el-dialog
      :title="hierarchyInfo.title"
      :visible.sync="dialogEditVisControllerHub"
      class="controller-edit-wra-spe"
      width="30%">
      <el-form ref="form" :model="controllerHubEditForm" label-width="100px">
        <el-form-item :label="hierarchyInfo.tit">
          <!-- <el-input-number v-model="controllerDeviceChannelNumChild" :min="0" label="描述文字" @change="controllerDeviceChannelChildNumAdd"></el-input-number> -->
          <el-input class="controller-device-num" v-model="controllerDeviceChannelNumChild" :disabled="true"></el-input>
          <el-button type="primary" icon="el-icon-plus" @click="controllerDeviceChannelChildNumAdd"></el-button>
          <ul class="item-controller-hier item-controller-hier-spe" v-show="controllerDeviceChannelListChild.length > 0">
            <li class="hier-item" v-for="(item, index) in controllerDeviceChannelListChild" :key="index">
              <div class="hier-item-conetent">
                <div class="hier-item-left">
                  <span class="hier-txt">第{{hierarchyInfo.level}}层级{{item.number}}</span>
                  <i class="hier-del el-icon-delete" @click="controllerDeviceChannelListChildDel(item, index)"></i>
                </div>
                <div class="hier-item-right">
                  该层级有
                  <el-input class="hier-item-right-val" v-model.number="item.switchNum" @input="_updateControllerChannelSwitch(item)"></el-input>
                  开关
                </div>
              </div>
              <a class="hier-item-set" @click="hubHier2(item)">设置下属层级</a>
            </li>
          </ul>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改摄像头 -->
    <el-dialog
      :title="cameraEditTitle"
      :visible.sync="dialogEditVisCamera"
      width="40%">
      <el-form ref="AddForm" :rules="rulesAddForm" :model="cameraEditForm" label-width="110px">
        <el-form-item label="摄像头名称" prop="deviceName">
          <el-input v-model="cameraEditForm.deviceName" placeholder="请输入摄像头名称"></el-input>
        </el-form-item>
        <el-form-item label="摄像头URL" prop="url">
          <el-input v-model="cameraEditForm.url" placeholder="请输入摄像头URL"></el-input>
        </el-form-item>
        <el-form-item label="通道" prop="channel">
          <el-input v-model="cameraEditForm.channel" placeholder="请输入摄像头通道"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="cameraEditForm.userName" placeholder="请输入摄像头用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd">
          <el-input v-model="cameraEditForm.userPwd" placeholder="请输入摄像头密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisCamera = false">取 消</el-button>
        <el-button type="primary" @click="cameraEditSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSensorDeviceList, addSensorDevice, getIconList, updateSensorDevice, deleteDeviceById, getDeviceCount, getControllerDeviceList, addControllerDevice, getCameraDeviceList, addCameraDevice, updateCaneraDevice, getControllerDeviceDetail, updateControllerDevice, addControllerChannel, updateControllerChannelSwitch, deleteControllerChannel, getControllerChannelSwitch } from '@/api/overview'

export default {
  data () {
    return {
      // 数据加载状态
      loading: false,
      // 页数
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 1,
      // tab 选中
      activeName: 'sensor',
      // 设备类型
      deviceType: 0,
      // 传感器搜索关键字
      sensor_txt: '',
      // 传感器表格集合
      sensorData: [],
      // 传感器 新增 / 修改状态
      sensorEditstate: true,
      // 传感器 新增 / 修改 标题
      sensorEditTitle: '新增传感器',
      // 传感器弹窗显示
      dialogEditVisSensor: false,
      // 新增传感器 数据
      sensorEditForm: {
        deviceName: '',
        icon: '',
        deviceUnit: '',
        sumVal: 0,
        reportForm: 1
      },
      // 传感器 数据验证
      sensorEditFormRules: {
        deviceName: [
          { required: true, message: '请输入传感器名称', trigger: 'blur' }
        ],
        deviceUnit: [
          { required: true, message: '请输入传感器单位', trigger: 'blur' }
        ]
      },
      // 控制器搜索关键字
      controller_txt: '',
      // 控制器表格集合
      controllerData: [],
      // 控制器 新增 / 修改状态
      controllerEditstate: true,
      // 控制器 新增 / 修改 标题
      controllerEditTitle: '新增控制器',
      // 控制器弹窗显示
      dialogEditVisController: false,
      // 新增控制器 数据
      controllerEditForm: {
        deviceName: '',
        icon: '',
        sensorDeviceIds: [],
        autoDevice: []
      },
      // 控制器数据验证
      controllerEditFormRules: {
        deviceName: [
          { required: true, message: '请输入控制器名称', trigger: 'blur' }
        ]
      },
      // 智能关联列表
      controllerRelation: [],
      // 摄像头搜索关键字
      camera_txt: '',
      // 摄像头 新增 / 修改状态
      cameraEditstate: true,
      // 摄像头 新增 / 修改 标题
      cameraEditTitle: '新增摄像头',
      // 摄像头弹窗显示
      dialogEditVisCamera: false,
      // 新增 / 修改 数据 摄像头
      cameraEditForm: {
        deviceName: '',
        url: '',
        userName: '',
        userPwd: '',
        channel: ''
      },
      // 摄像头表格集合
      cameraData: [],
      // 摄像头 数据验证
      rulesAddForm: {
        deviceName: [
          { required: true, message: '请输入摄像头名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入摄像头URL', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入摄像头用户名', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入摄像头密码', trigger: 'blur' }
        ],
        channel: [
          { required: true, message: '请输入摄像头通道', trigger: 'blur' }
        ]
      },
      // 图标集合
      iconList: [],
      // 层级数  通道
      controllerDeviceChannelList: [],
      // 第一层级下 的 总数
      controllerDeviceChannelNum: 0,
      // 第一层级下的ID
      controllerDeviceChannelDeviceId: 0,
      // 下个层级信息
      hierarchyInfo: {
        level: 1,
        parentId: '',
        title: '',
        tit: '',
        number: ''
      },
      // 下属层级的显示隐藏
      dialogEditVisControllerHub: false,
      // 下属层级的数据
      controllerHubEditForm: {},
      // 层级数  通道  子层级
      controllerDeviceChannelListChild: [],
      // 第一层级下 的 总数 子层级
      controllerDeviceChannelNumChild: 0,
    }
  },
  methods: {
    // 跳转
    linkTo (item) {
      this.$router.push({
        path: '/overview/control_list',
        query: {
          id: item.id,
          deviceName: item.deviceName
        }
      })
    },
    // tab 选项更改
    handleClick (tab, event) {
      this.currentPage = 1
      this.pageSize = 10
      this.total = 0
      if (this.activeName === 'sensor') {
        this.deviceType = 0
        this._getSensorDeviceList()
        this._getDeviceCount()
      } else if (this.activeName === 'controller') {
        this.deviceType = 1
        this._getControllerDeviceList()
        this._getDeviceCount()
        this._getSensorDeviceList2()
      } else if (this.activeName === 'camera') {
        this.deviceType = 2
        this._getCameraDeviceList()
        this._getDeviceCount()
      }
    },
    // 搜索
    search () {
      this.currentPage = 1
      this.pageSize = 10
      this.total = 0
      if (this.activeName === 'sensor') {
        this._getSensorDeviceList()
        this._getDeviceCount()
      } else if (this.activeName === 'controller') {
        this._getControllerDeviceList()
        this._getDeviceCount()
      } else if (this.activeName === 'camera') {
        this._getCameraDeviceList()
        this._getDeviceCount()
      }
    },
    // 新增 弹窗 显示
    showAddSensor () {
      this.sensorEditstate = true
      this.sensorEditTitle = '新增传感器'
      this.sensorEditForm.id = null
      this.sensorEditForm.deviceName = ''
      this.sensorEditForm.icon = ''
      this.sensorEditForm.deviceUnit = ''
      this.dialogEditVisSensor = true
    },
    // 确认增加
    sensorEditSave () {
      this.$refs.sensorEditForm.validate((valid) => {
        if (valid) {
          if (this.sensorEditstate) {
            this._addSensorDevice()
          } else {
            this._updateSensorDevice()
          }
        }
      })
    },
    // 传感器 修改
    sensorEdit (item) {
      this.sensorEditstate = false
      this.sensorEditTitle = '修改传感器'
      this.sensorEditForm.id = item.id
      this.sensorEditForm.deviceName = item.deviceName
      this.sensorEditForm.deviceUnit = item.deviceUnit
      this.dialogEditVisSensor = true
      this.iconList.forEach(list => {
        if (list.iconUrl === item.icon) this.sensorEditForm.icon = list.iconId
      })
    },
    // 传感器删除
    sensorDel (item) {
      this.$confirm('确定删除该传感器吗?', '删除该传感器', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._deleteDeviceById(item.id)
      })
    },
    // 控制器 的 弹窗显示
    showAddController () {
      this.controllerEditstate = true
      this.controllerEditTitle = '新增控制器'
      this.controllerEditForm.deviceName = ''
      this.controllerEditForm.icon = ''
      this.controllerEditForm.sensorDeviceIds = []
      this.controllerEditForm.autoDevice = []
      this.controllerEditForm.deviceId = null
      this.dialogEditVisController = true
    },
    // 控制器的 新增 / 修改
    controllerEditSave () {
      this.$refs.controllerEditForm.validate((valid) => {
        if (valid) {
          if (this.controllerEditstate) {
            this._addControllerDevice()
          } else {
            this._updateControllerDevice()
          }
        }
      })
    },
    // 控制器修改
    controllerEdit (item) {
      this.controllerEditstate = false
      this.controllerEditTitle = '修改控制器'
      this.controllerEditForm.deviceName = item.deviceName
      this.controllerEditForm.icon = item.icon
      this.controllerEditForm.sensorDeviceIds = []
      this.controllerEditForm.deviceId = item.id
      this.dialogEditVisController = true
      this._getControllerDeviceDetail(item.id)
    },
    // 层级关系删除  --> 通道删除
    controllerDeviceChannelListDel (item, index) {
      this.controllerDeviceChannelList.splice(index, 1)
      this.controllerDeviceChannelNum = this.controllerDeviceChannelList.length
      this._deleteControllerChannel(item.id)
    },
    // 层级关系删除  下属层级  --> 通道删除
    controllerDeviceChannelListChildDel (item, index) {
      this.controllerDeviceChannelListChild.splice(index, 1)
      this.controllerDeviceChannelNumChild = this.controllerDeviceChannelListChild.length
      this._deleteControllerChannel(item.id)
    },
    // 第一层级的添加
    controllerDeviceChannelNumAdd () {
      var data = {
        deviceId: this.controllerDeviceChannelDeviceId,
        parentId: 0,
        // level: this.hierarchyInfo.level,
        level: 1,
        number: this.controllerDeviceChannelNum
      }
      this._addControllerChannel(data, 1)
    },
    // 第二三...层级的添加
    controllerDeviceChannelChildNumAdd () {
      var data = {
        deviceId: this.controllerDeviceChannelDeviceId,
        parentId: this.hierarchyInfo.parentId,
        level: this.hierarchyInfo.level,
        number: this.hierarchyInfo.number
      }
      this._addControllerChannel(data, 2)
    },
    // 设置下属层级
    hubHier (item) {
      // 设置第1层级1的下属层级
      this.hierarchyInfo.level = Number(item.level) + 1
      this.hierarchyInfo.parentId = item.id
      this.hierarchyInfo.number = item.number
      this.hierarchyInfo.title = `设置第${item.level}层级${item.number}的下属层级`
      this.hierarchyInfo.tit = `第${this.hierarchyInfo.level}层级`
      this.dialogEditVisController = false
      this.dialogEditVisControllerHub = true
      // this._getControllerDeviceDetail2(item.id)
      this._getControllerChannelSwitch()
    },
    // 设置下属层级  第2，3，4...
    hubHier2(item) {
      this.hierarchyInfo.level = Number(item.level) + 1
      this.hierarchyInfo.parentId = item.id
      this.hierarchyInfo.number = item.number
      this.hierarchyInfo.title = `设置第${item.level}层级${item.number}的下属层级`
      this._getControllerChannelSwitch()
    },
    // 关联设备删除
    autoDeviceDel (index) {
      this.controllerEditForm.autoDevice.splice(index, 1)
    },
    // 控制器删除
    controllerDel (item) {
      this.$confirm('确定删除该控制器吗?', '删除控制器', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._deleteDeviceById(item.id)
      })
    },
    // 摄像头 新增 弹窗 显示
    showAddCamera () {
      this.cameraEditstate = true
      this.cameraEditTitle = '新增摄像头'
      this.cameraEditForm.id = null
      this.cameraEditForm.deviceName = ''
      this.cameraEditForm.url = ''
      this.cameraEditForm.userName = ''
      this.cameraEditForm.userPwd = ''
      this.cameraEditForm.channel = ''
      this.dialogEditVisCamera = true
    },
    // 摄像头 修改 弹窗 显示
    cameraEdit (item) {
      this.cameraEditstate = false
      this.cameraEditTitle = '修改摄像头'
      this.cameraEditForm.id = item.id
      this.cameraEditForm.deviceName = item.deviceName
      this.cameraEditForm.url = item.url
      this.cameraEditForm.userName = item.userName
      this.cameraEditForm.userPwd = item.userPwd
      this.cameraEditForm.channel = item.channel
      this.dialogEditVisCamera = true
    },
    // 摄像头 删除
    cameraDel (item) {
      this.$confirm('确定删除该摄像头吗?', '删除该摄像头', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._deleteDeviceById(item.id)
      })
    },
    // 摄像头确认添加
    cameraEditSave () {
      this.$refs.AddForm.validate((valid) => {
        if (valid) {
          if (this.cameraEditstate) {
            this._addCameraDevice()
          } else {
            this._updateCaneraDevice()
          }
        }
      })
    },
    // 每页数量改变
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val
    },
    // table头部样式
    tableheaderClassName ({ row, rowIndex }) {
      return 'table-head-th'
    },
    // 获取方法  iconID --> icon URL
    /**
     * 接口调用
     */
    // 获取传感器列表
    _getSensorDeviceList () {
      this.loading = true
      var data = {
        name: this.sensor_txt,
        page: this.currentPage,
        pageSize: this.pageSize
      }
      getSensorDeviceList(data).then(res => {
        this.loading = false
        if (res.statusCode === 1) {
          this.sensorData.length = 0
          this.sensorData = [...res.result]
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    _getSensorDeviceList2 () {
      var data = {
        name: '',
        page: 1,
        pageSize: 99999
      }
      getSensorDeviceList(data).then(res => {
        if (res.statusCode === 1) {
          this.controllerRelation.length = 0
          this.controllerRelation = [...res.result]
        }
      })
    },
    // 获取列表总数量
    _getDeviceCount () {
      var name = ''
      if (this.deviceType === 0) {
        name = this.sensor_txt
      } else if (this.deviceType === 1) {
        name = this.controller_txt
      } else if (this.deviceType === 2) {
        name = this.camera_txt
      }
      var data = {
        type: this.deviceType,
        name
      }
      getDeviceCount(data).then(res => {
        if (res.statusCode === 1) {
          this.total = res.result
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 获取图标集合
    _getIconList () {
      getIconList().then(res => {
        if (res.statusCode === 1) this.iconList = [...res.result]
      })
    },
    // 新增传感器
    _addSensorDevice () {
      addSensorDevice(this.sensorEditForm).then(res => {
        if (res.statusCode === 1) {
          this.dialogEditVisSensor = false
          this.currentPage = 1
          this._getSensorDeviceList()
          this._getDeviceCount()
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 修改传感器
    _updateSensorDevice () {
      updateSensorDevice(this.sensorEditForm).then(res => {
        if (res.statusCode === 1) {
          this.dialogEditVisSensor = false
          this._getSensorDeviceList()
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 删除设备   删除传感器
    _deleteDeviceById (id) {
      var data = {
        id
      }
      deleteDeviceById(data).then(res => {
        if (res.statusCode === 1) {
          this.$message({ message: res.message, type: 'success' })
          if (this.activeName === 'sensor') {
            this._getSensorDeviceList()
            this._getDeviceCount()
          } else if (this.activeName === 'controller') {
            this._getControllerDeviceList()
            this._getDeviceCount()
          } else if (this.activeName === 'camera') {
            this._getCameraDeviceList()
            this._getDeviceCount()
          }
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 获取控制器列表
    _getControllerDeviceList () {
      this.loading = true
      var data = {
        name: this.controller_txt,
        page: this.currentPage,
        pageSize: this.pageSize
      }
      getControllerDeviceList(data).then(res => {
        this.loading = false
        if (res.statusCode === 1) {
          this.controllerData.length = 0
          this.controllerData = [...res.result]
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 新增控制器
    _addControllerDevice () {
      var data = {
        deviceName: this.controllerEditForm.deviceName,
        icon: this.controllerEditForm.icon,
        sensorDeviceIds: this.controllerEditForm.sensorDeviceIds.join(',')
      }
      addControllerDevice(data).then(res => {
        if (res.statusCode === 1) {
          this.dialogEditVisController = false
          this.currentPage = 1
          this._getControllerDeviceList()
          this._getDeviceCount()
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 获取详情
    _getControllerDeviceDetail (controllerDeviceId) {
      var data = {
        controllerDeviceId
      }
      getControllerDeviceDetail(data).then(res => {
        if (res.statusCode === 1) {
          this.controllerEditForm.autoDevice = res.result.autoDevice
          this.controllerDeviceChannelList.length = 0
          this.controllerDeviceChannelList = res.result.controllerDeviceChannelList
          this.controllerDeviceChannelNum = res.result.controllerDeviceChannelList.length
          this.controllerDeviceChannelDeviceId = res.result.id
        }
      })
    },
    // 获取详情  * 废弃 *
    _getControllerDeviceDetail2 (controllerDeviceId) {
      var data = {
        controllerDeviceId
      }
      getControllerDeviceDetail(data).then(res => {
        if (res.statusCode === 1 && res.result) {
          this.controllerDeviceChannelListChild.length = 0
          this.controllerDeviceChannelListChild = res.result.controllerDeviceChannelList
          this.controllerDeviceChannelNumChild = res.result.controllerDeviceChannelList.length
        }
      })
    },
    // 修改控制器
    _updateControllerDevice () {
      var data = {
        deviceName: this.controllerEditForm.deviceName,
        icon: this.controllerEditForm.icon,
        sensorDeviceIds: this.controllerEditForm.sensorDeviceIds.join(','),
        deviceId: this.controllerEditForm.deviceId
      }
      if (!this.controllerEditstate && this.controllerEditForm.autoDevice && this.controllerEditForm.autoDevice.length > 0) {
        var arr_ = []
          this.controllerEditForm.autoDevice.forEach(item => {
            arr_.push(item.id)
          })
          arr_ = [...arr_, ...this.controllerEditForm.sensorDeviceIds]
        var arr2 = [...new Set(arr_)]
          data.sensorDeviceIds = arr2.join(',')
      }
      updateControllerDevice(data).then(res => {
        if (res.statusCode === 1) {
          this.dialogEditVisController = false
          this.currentPage = 1
          this._getControllerDeviceList()
          this._getDeviceCount()
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 新增控制器通道
    _addControllerChannel (data, index) {
      addControllerChannel(data).then(res => {
        if (res.statusCode === 1) {
          this.$message({ message: res.message, type: 'success' })
          if (Number(index) === 1) {
            this._getControllerDeviceDetail(data.deviceId)
          } else {
            this._getControllerChannelSwitch()
          }
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 修改控制器通道开关数
    _updateControllerChannelSwitch(item) {
      var data = {
        channelId: item.id,
        swtichNum: item.switchNum
      }
      updateControllerChannelSwitch(data).then(res => {
        if (res.statusCode === 1) {
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 删除通道
    _deleteControllerChannel (channelId) {
      var data = {
        channelId
      }
      deleteControllerChannel(data).then(res => {
        if (res.statusCode === 1) {
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 获取某层级的通道列表
    _getControllerChannelSwitch () {
      var data = {
        deviceId: this.controllerDeviceChannelDeviceId,
        level: this.hierarchyInfo.level,
        parentId: this.hierarchyInfo.parentId
      }
      getControllerChannelSwitch(data).then(res => {
        if (res.statusCode === 1 && res.result) {
          this.controllerDeviceChannelListChild.length = 0
          this.controllerDeviceChannelListChild = res.result
          this.controllerDeviceChannelNumChild = res.result.length
        }
      })
    },
    // TODO:
    // 获取摄像头列表
    _getCameraDeviceList () {
      this.loading = true
      var data = {
        name: this.camera_txt,
        page: this.currentPage,
        pageSize: this.pageSize
      }
      getCameraDeviceList(data).then(res => {
        this.loading = false
        if (res.statusCode === 1) {
          this.cameraData.length = 0
          this.cameraData = [...res.result]
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 新增摄像头
    _addCameraDevice () {
      this.loading = true
      addCameraDevice(this.cameraEditForm).then(res => {
        this.loading = false
        if (res.statusCode === 1) {
          this.dialogEditVisCamera = false
          this.currentPage = 1
          this._getCameraDeviceList()
          this._getDeviceCount()
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 修改摄像头
    _updateCaneraDevice () {
      updateCaneraDevice(this.cameraEditForm).then(res => {
        if (res.statusCode === 1) {
          this.$message({ message: res.message, type: 'success' })
          this.dialogEditVisCamera = false
          this.currentPage = 1
          this._getCameraDeviceList()
          this._getDeviceCount()
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    }
  },
  mounted () {
    this._getSensorDeviceList()
    this._getIconList()
  }
}
</script>

<style lang="scss">
.overview {
  padding: 30px;
  .sensor, .controller, .camera {
    width: 100%;
    .sensor-head, .controller-head, .camera-head {
      padding-bottom: 20px;
      .search {
        display: inline-block;
        width: 300px;
      }
    }
    .image {
      vertical-align: top;
    }
    .name {
      line-height: 30px;
    }
    .link {
      color: #4d9dff;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .table-head-th {
    background: #F1F8FF;
    font-weight: 600;
    font-size: 14px;
    color: #4A4A4A;
  }
  .page {
    padding-top: 10px;
    text-align: right;
  }
}
.controller-edit-wra, .controller-edit-wra-spe {
  .item-con-spe .el-form-item__label {
    padding-top: 6px;
    line-height: 18px;
  }
  .item-controller-ass {
    width: 100%;
    padding-bottom: 12px;
    .ass-item {
      height: 30px;
      line-height: 30px;
      &:hover {
        background: #f2f2f2;
        .ass-del {
          cursor: pointer;
          opacity: 1;
          color: #409eff;
        }
      }
      .ass-del {
        opacity: 0;
      }
    }
  }
  .item-controller-hier {
    max-height: 300px;
    overflow-y: auto;
    .hier-item {
      padding-top: 6px;
      border-bottom: 1px solid #f2f2f2;
      .hier-item-conetent {
        display: flex;
        .hier-item-left {
          flex: 1;
          &:hover {
            background: #f2f2f2;
            .hier-del {
              cursor: pointer;
              opacity: 1;
              color: #409eff;
            }
          }
          .hier-del {
            opacity: 0;
          }
        }
        .hier-item-right {
          flex: 1;
          .hier-item-right-val {
            width: 40px;
            .el-input__inner {
              height: 30px;
              line-height: 30px;
              padding: 0 6px;
            }
          }
        }
      }
      .hier-item-set {
        display: block;
        line-height: 20px;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
  .item-controller-hier-spe {
    max-height: 600px;
    overflow-y: auto;
  }
  .controller-device-num {
    width: 60px;
  }
}
</style>
