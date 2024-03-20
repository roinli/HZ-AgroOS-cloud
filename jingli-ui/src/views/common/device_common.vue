<template lang="html">
  <div class="device_common">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <div class="device-state">
        <ul>
          <li :class="{'active':state==4}" @click="changeState(4)">全部</li>
          <li :class="{'active':state==0}" @click="changeState(0)"><div class="state-0"></div>连接正常</li>
          <li :class="{'active':state==1}" @click="changeState(1)"><div class="state-1"></div>传感报警</li>
          <li :class="{'active':state==2}" @click="changeState(2)"><div class="state-2"></div>正在运行</li>
          <!--<li :class="{'active':state==3}" @click="changeState(3)"><div class="state-3"></div>设备断开</li>-->
      </ul>
      </div>
      <el-tab-pane label="传感器" name="sensor">
        <div class="sensor">
          <div class="sensor-head">
            <el-input v-model="sensor_txt" class="search" placeholder="请输入要搜索的传感器名称" />
            <el-button type="primary" @click="sensorSearch">搜索</el-button>
          </div>
          <el-table
            :data="sensorData"
            v-loading="loading"

            style="width: 100%">
            <el-table-column width="80" label="状态">
              <template slot-scope="scope">
                <div :class="'state-'+scope.row.state"></div>
                <!--{{scope.row.state}}-->
              </template>
            </el-table-column>
            <!--<el-table-column
              label="使用中1"
              width="80">
              <template slot-scope="scope">
  <div class>
    <el-checkbox v-model="scope.row.use" @change="selec(scope)"></el-checkbox>
  </div>
</template>
            </el-table-column>-->
            <el-table-column
              prop="id"
              label="设备ID">
            </el-table-column>
            <el-table-column label="图标">
              <template slot-scope="scope">
  <img style="width:50px;height:50px" :src="scope.row.icon" />
  <!-- {{scope}} -->
</template>
            </el-table-column>
            <el-table-column
              prop="deviceName"
              label="传感器名称">
            </el-table-column>
            <!-- 报表查看暂不做 隐藏 -->
            <!-- <el-table-column
              prop="report"
              label="查看报表">
              <template slot-scope="scope">
                <el-radio v-model="scope.row.report" label="1">否</el-radio>
                <el-radio v-model="scope.row.report" label="2">是</el-radio>
                <el-button type="primary" size="mini">查看</el-button>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="value"
              label="数值">
            </el-table-column>
            <el-table-column
              min-width="250"
              label="操作">
              <template slot-scope="scope">
  <el-button type="primary" size="small" @click="sensorEdit(scope.row)">设置</el-button>
  <el-button type="primary" size="small" @click="sensorDel(scope.row)">查看报表</el-button>
  <el-button type="primary" size="small" @click="rename(0,scope.row)">重命名</el-button>
</template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="控制器" name="controller">
        <div class="controller">
          <div class="controller-head">
            <el-input v-model="controller_txt" class="search" placeholder="请输入要搜索的控制器名称" />
            <el-button type="primary" @click="controllerSearch">搜索</el-button>
          </div>
          <el-table
            :data="controllerData"
            v-loading="loading"

            style="width: 100%">
            <el-table-column width="80" label="状态">
              <template slot-scope="scope">
  <div :class="'state-'+scope.row.state"></div>
                <!--{{scope.row.state}}-->
</template>
            </el-table-column>
            <!--<el-table-column
              label="使用中"
              width="80">
              <template slot-scope="scope">
  <div class>
    <el-checkbox v-model="scope.row.use" @change="selec(scope)"></el-checkbox>
  </div>
</template>
            </el-table-column>-->
            <el-table-column
              prop="id"
              label="设备ID">
            </el-table-column>
                        <el-table-column label="图标">
              <template slot-scope="scope">
  <img style="width:50px;height:50px" :src="scope.row.icon" />
  <!-- {{scope}} -->
</template>
            </el-table-column>
            <el-table-column
              prop="deviceName"
              label="控制器名称">
            </el-table-column>
            <el-table-column
              prop="value"
              label="数值">
            </el-table-column>
            <el-table-column prop="value" label="控制器状态">
                <template slot-scope="scope">
  <el-switch
    :disabled="scope.row.disabled"
    v-model="scope.row.value"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-value="1"
    @change="changeStateHandler($event,scope.row)"
    inactive-value="0"
  ></el-switch>
</template>
            </el-table-column>

            <el-table-column
              min-width="250"
              label="操作">
              <template slot-scope="scope">
  <el-button type="primary" size="small" @click="controllerEdit(scope.row)">设置</el-button>
  <el-button type="primary" size="small" @click="rename(1,scope.row)">重命名</el-button>
  <!-- <el-button type="danger" size="small" @click="sensorDel(scope.row)">查看报表</el-button> -->
</template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="摄像头" name="camera">
        <div class="camera">
          <div class="camera-head">
            <el-input v-model="camera_txt" class="search" placeholder="请输入要搜索的摄像头名称" />
            <el-button type="primary" @click="cameraSearch">搜索</el-button>
          </div>
          <el-table
            :data="cameraData"
            v-loading="loading"

            style="width: 100%">
            <el-table-column width="80" label="状态">
              <template slot-scope="scope">
                <div :class="'state-'+scope.row.state"></div>
              </template>
            </el-table-column>
            <!--<el-table-column-->
              <!--label="使用中"-->
              <!--width="80">-->
              <!--<template slot-scope="scope">-->
  <!--<div class>-->
    <!--<el-checkbox v-model="scope.row.use" @change="selec(scope)"></el-checkbox>-->
  <!--</div>-->
<!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
              prop="id"
              label="设备ID">
            </el-table-column>
                        <el-table-column label="图标">
              <template slot-scope="scope">
  <img style="width:50px;height:50px" :src="scope.row.icon" />
  <!-- {{scope}} -->
</template>
            </el-table-column>
            <el-table-column
              prop="deviceName"
              label="摄像头名称">
            </el-table-column>
            <el-table-column
              prop="cameraUrl"
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
              min-width="250"
              label="操作">
              <template slot-scope="scope">
  <!-- <el-button type="primary" size="small" @click="cameraEdit(scope.row)">设置</el-button> -->
  <el-button type="primary" size="small" @click="rename(2,scope.row)">重命名</el-button>
  <el-button type="primary" size="small" @click="viewVideo(scope.row)">视频查看</el-button>
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
      title="修改传感器"
      :visible.sync="dialogEditVisSensor"
      width="50%">
      <el-form ref="form" :model="sensorEditForm" label-width="100px">

        <el-form-item label="传感器名称">
          <el-input v-model="sensorEditForm.deviceName" placeholder="请输入传感器名称"></el-input>
        </el-form-item>

        <el-form-item label="是否启用">
          <el-radio v-model="sensorEditForm.state" label="1">启用</el-radio>
          <el-radio v-model="sensorEditForm.state" label="0">禁用</el-radio>
        </el-form-item>

        <el-form-item label="开始时间">
             <el-date-picker
                v-model="sensorEditForm.startTime"
                type="datetime"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="选择开始时间"
                align="right" />
        </el-form-item>
        <el-form-item label="结束时间">
             <el-date-picker
                v-model="sensorEditForm.endTime"
                type="datetime"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="选择结束时间"
                align="right" />
        </el-form-item>
        <el-form-item label="数值小于">
          <el-input-number v-model="sensorEditForm.smallVal" controls-position="right" :min="1" :max="10"></el-input-number>
        </el-form-item>

        <el-form-item label="数值大于">
          <el-input-number v-model="sensorEditForm.bigVal" controls-position="right" :min="1" :max="10"></el-input-number>
        </el-form-item>
      </el-form>



      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisSensor = false">取 消</el-button>
        <el-button type="primary" @click="EditVisSensorHandler">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改控制器 -->

    <!-- 修改摄像头 -->
    <el-dialog
      title="修改摄像头"
      :visible.sync="dialogEditVisCamera"
      width="30%">
      <el-form ref="form" :model="cameraEditForm" label-width="110px">
        <el-form-item label="摄像头名称">
          <el-input v-model="cameraEditForm.key1" placeholder="请输入摄像头名称"></el-input>
        </el-form-item>
        <el-form-item label="摄像头IP">
          <el-input v-model="cameraEditForm.key2" placeholder="请输入摄像头IP"></el-input>
        </el-form-item>
        <el-form-item label="摄像头端口号">
          <el-input v-model="cameraEditForm.key3" placeholder="请输入摄像头端口号"></el-input>
        </el-form-item>
        <el-form-item label="手机访问端口号">
          <el-input v-model="cameraEditForm.key4" placeholder="手机访问端口号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisCamera = false">取 消</el-button>
        <el-button type="primary" @click="dialogEditVisCamera = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="重命名"
      :visible.sync="renameDialog"
      width="30%">
      <el-form ref="form" :model="renameForm" label-width="110px">
        <el-form-item label="新名称">
          <el-input v-model="renameForm.deviceName" placeholder="请输入新名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="renameDialog = false">取 消</el-button>
        <el-button type="primary" @click="confimRename">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script type="application/javascript">
import {
  deleteDeviceRelation,
  getDeviceUseCount,
  getDeviceUseList,
  saveDeviceRelation
} from '@/api/device_manage'
import {
  getDeviceInfoList,
  getDeviceInfoCount,
  updateDeviceSensorSet,
  getDeviceSensorSet,
  updateDeviceName,
  updateControlDeviceState,
  updateControlSet,
  getAutoSensorList
} from '@/api/deviceInfo'
export default {
  name: 'deviceCommon',
  props: {
    companyId: {
      type: String,
      default: null
    },
    detailInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      AutoSensorList: [],
      renameForm: {
        deviceName: '',
        deviceType: '',
        deviceId: ''
      },
      renameDialog: false,
      // 数据加载状态
      loading: false,

      // 页数
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      state: 4,
      // 总条数
      total: 1,
      // tab 选中
      activeName: 'sensor',
      // 设备类型
      deviceType: 0,
      // 搜索关键字
      deviceSearchTxt: '',
      // 传感器搜索关键字
      sensor_txt: '',
      // 传感器表格集合
      sensorData: [],
      // 传感器修改 弹窗显示
      dialogEditVisSensor: false,
      // 传感器数据  - 修改
      sensorEditForm: {
        deviceName: '',
        state: null,
        smallVal: '',
        bigVal: ''
      },
      // 控制器搜索关键字
      controller_txt: '',
      // 控制器表格集合
      controllerData: [],
      // 控制器修改 弹窗显示
      dialogEditVisController: false,
      // 控制器数据  - 修改
      controllerEditForm: {
        id: '',
        controlType: '',
        openDevice: '',
        closeDevice: '',
        openType: '',
        closeType: '',
        openVal: '',
        closeVal: '',
        startTime: 1,
        loopType: '',
        loopCnt: '',
        durationTime: '',
        intervalTime: '',
        useState: '',
        loopWeek: ''
      },
      // 下属层级 弹层显示
      dialogEditVisControllerHub: false,
      // 下属层级 数据
      controllerHubEditForm: {
        firstNum: 1,
        numnum: 2
      },
      // 摄像头搜索关键字
      camera_txt: '',
      // 摄像头表格集合
      cameraData: [],
      // 摄像头修改 弹窗
      dialogEditVisCamera: false,
      // 摄像头数据  - 修改
      cameraEditForm: {
        key1: '',
        key2: '',
        key3: '',
        key4: '',
        key5: '',
        key6: ''
      },
      path : 'ws://47.98.131.132:12005/websocket/'+this.companyId+'/'+this.detailInfo.id,
      socket:{}
    }
  },
  mounted() {
    if (Number(this.$route.query.type) === 1) {
      this.deviceType = Number(this.$route.query.type)
      this.activeName = 'controller'
    } else if (Number(this.$route.query.type) === 2) {
      this.deviceType = Number(this.$route.query.type)
      this.activeName = 'camera'
    }
    this._getDeviceUseList()
    this._getDeviceUseCount()
  },
  methods: {
    init(){
      if(typeof(WebSocket) === "undefined"){
        alert("您的浏览器不支持socket")
      }else{
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open: function () {
      console.log("socket连接成功:"+this.path)
    },
    error: function () {
      console.log("连接错误")
    },
    getMessage: function (msg) {
      console.log(msg.data);
      if(msg.data){
        var msg = JSON.parse(msg.data)
        if(msg.socketType==0){//超出预警范围
            if(msg.deviceType==0){//传感器
              this.sensorData.map((item)=>{
                if(item.id == msg.deviceId){
                  item.state = 1
                  console.log('传感器' + item.id+'超出预警范围--->' + item.state );
                }
              });
            }
            if(msg.deviceType==1){//控制器
              this.controllerData.map((item)=>{
                if(item.id == msg.deviceId){
                  item.state = 1
                  console.log('控制器' + item.id+'超出预警范围--->' + item.state );
                }
              });
            }
        }
        if(msg.socketType==1){//预警设备恢复正常
          if(msg.deviceType==0){//传感器
            this.sensorData.map((item)=>{
              if(item.id == msg.deviceId){
                item.state = 0
                console.log('传感器' + item.id+'预警设备恢复正常--->' + item.state );
              }
            });
          }
          if(msg.deviceType==1){//控制器
            this.controllerData.map((item)=>{
              if(item.id == msg.deviceId){
                item.state = 0
                console.log('控制器' + item.id+'预警设备恢复正常--->' + item.state );
              }
            });
          }
        }
        if(msg.socketType==2){//设备断开连接
          if(msg.deviceType==0){//传感器
            this.sensorData.map((item)=>{
              if(item.id == msg.deviceId){
                item.state = 3
                console.log('传感器' + item.id+'设备断开连接--->' + item.state );
              }
            });
          }
          if(msg.deviceType==1){//控制器
            this.controllerData.map((item)=>{
              if(item.id == msg.deviceId){
                item.state = 3
                console.log('控制器' + item.id+'设备断开连接--->' + item.state );
              }
            });
          }
        }
        if(msg.socketType==3){//传感器设备数值变化
          if(msg.deviceType==0){//传感器
            this.sensorData.map((item)=>{
              if(item.id == msg.deviceId){
                item.value = msg.data
                console.log('传感器' + item.id+'数值更新--->' + item.value );
              }
            });
          }
          if(msg.deviceType==1){//控制器
            this.controllerData.map((item)=>{
              if(item.id == msg.deviceId){
                item.value = msg.data
                console.log('控制器' + item.id+'数值更新--->' + item.value );
              }
            });
          }
        }
        if(msg.socketType==4){//控制器控制开关变化
          if(msg.deviceType==1){//控制器
            this.controllerData.map((item)=>{
              if(item.id == msg.deviceId){
                item.state = msg.data
                console.log('控制器' + item.id+'开关更新--->' + item.state );
              }
            });
          }
        }
      }
    },
    send: function (params) {
      this.socket.send(params)
      console.log("send:"+params);
    },
    close: function () {
      console.log("socket已经关闭")
    },
    changeStateHandler($event, row) {
      row.disabled = true;

      var param = {
        companyId: this.companyId,
        areaId: this.detailInfo.id,
        deviceId: row.id,
        state: $event
      }
      updateControlDeviceState(param).then(res => {
        if (res.statusCode === 1) {
          this.$message({ message: res.message, type: 'success' });
          setTimeout(()=>{
            this._getDeviceUseList()
          this._getDeviceUseCount()
        },1000);
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    rename(deviceType, row) {
      this.renameForm.deviceName = ''
      this.renameForm.deviceType = deviceType
      this.renameForm.deviceId = row.id
      this.renameDialog = true
    },
    confimRename() {
      var param = {
        companyId: this.companyId,
        areaId: this.detailInfo.id,
        deviceType: this.renameForm.deviceType,
        deviceId: this.renameForm.deviceId,
        deviceName: this.renameForm.deviceName
      }
      updateDeviceName(param).then(res => {
        if (res.statusCode === 1) {
          this.renameDialog = false
          this._getDeviceUseList()
          this._getDeviceUseCount()
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 使用中 选中
    selec(item) {
      if (this.activeName === 'sensor') {
        // this.sensorData[item.$index].use = !this.sensorData[item.$index].use
        this.$set(this.sensorData[item.$index], 'use', item.row.use)
        this.sensorData.push({})
        this.sensorData.pop()
      } else if (this.activeName === 'controller') {
        this.$set(this.controllerData[item.$index], 'use', item.row.use)
        this.controllerData.push({})
        this.controllerData.pop()
        this.deviceSearchTxt = this.controller_txt
      } else if (this.activeName === 'camera') {
        this.$set(this.cameraData[item.$index], 'use', item.row.use)
        this.cameraData.push({})
        this.cameraData.pop()
      }
      if (item.row.use) {
        this._saveDeviceRelation(item.row.deviceId)
      } else {
        this._deleteDeviceRelation(item.row.relationId)
      }
    },
    // tab 选项更改
    handleClick() {
      this.currentPage = 1
      this.pageSize = 10
      this.total = 0
      if (this.activeName === 'sensor') {
        this.deviceType = 0
        this.deviceSearchTxt = this.sensor_txt
      } else if (this.activeName === 'controller') {
        this.deviceType = 1
        this.deviceSearchTxt = this.controller_txt
      } else if (this.activeName === 'camera') {
        this.deviceType = 2
        this.deviceSearchTxt = this.camera_txt
      }
      this._getDeviceUseList()
      this._getDeviceUseCount()
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
    // 传感器搜索
    sensorSearch() {
      this.deviceSearchTxt = this.sensor_txt
      this.currentPage = 1
      this._getDeviceUseList()
      this._getDeviceUseCount()
    },
    // 控制器搜索
    controllerSearch() {
      this.deviceSearchTxt = this.controller_txt
      this.currentPage = 1
      this._getDeviceUseList()
      this._getDeviceUseCount()
    },
    // 摄像头搜索
    cameraSearch() {
      this.deviceSearchTxt = this.camera_txt
      this.currentPage = 1
      this._getDeviceUseList()
      this._getDeviceUseCount()
    },
    // TODO: 以下功能暂时不做
    // 传感器修改
    sensorEdit(row) {
      this.$router.push({
        path: 'sensorSet',
        query: {
          deviceId: row.id,
          companyId: this.companyId,
          areaId: this.detailInfo.id
        }
      })
      // this.sensorEditForm.deviceName = row.deviceName
      // this.sensorEditForm.state = row.state
      // this.sensorEditForm.smallVal = row.smallVal
      // this.sensorEditForm.bigVal = row.bigVal
      // this.sensorEditForm.deviceId = row.id
      // this.sensorEditForm.id = row.id
      // this.dialogEditVisSensor = true
    },
    // 控制器修改
    controllerEdit(item) {
      // TODO: controllerEditForm
      this.$router.push({
        path: 'setting',
        query: {
          deviceId: item.id,
          companyId: this.companyId,
          areaId: this.detailInfo.id
        }
      })
      // var para = {
      //   deviceId: item.id
      // }
      // getAutoSensorList(para).then(res => {
      //   this.AutoSensorList = res.result
      // })
      // this.controllerEditForm = item
      // this.controllerEditForm.deviceId = item.id

      // this.dialogEditVisController = true
    },
    // 设置下属层级
    hubHier() {
      this.dialogEditVisController = false
      this.dialogEditVisControllerHub = true
    },
    // 摄像头修改
    cameraEdit(item) {
      // TODO: cameraEditForm

      this.dialogEditVisCamera = true
    },
    // 传感器删除
    sensorDel(row) {
      var data = row
      //areaId: this.detailInfo.id,
      data.areaId = this.detailInfo.id

      if (this.detailInfo.index == 1) {
        data.displayName = this.detailInfo.displayName
        data.type = 0
        this.$router.push({
          name: 'greenhouseReport',
          query: data
        })
      } else {
        data.displayName = this.detailInfo.display_name
        data.type = 3
        this.$router.push({
          name: 'warehouseReport',
          query: data
        })
      }
    },
    // TODO: 以上功能暂时不做
    // table头部样式
    tableheaderClassName({ row, rowIndex }) {
      return 'table-head-th'
    },
    /**
     * 接口调用
     */
    // 获取列表
    _getDeviceUseList() {
      this.loading = true

      var data = {
        companyId: this.companyId,
        areaId: this.detailInfo.id,
        deviceType: this.deviceType,
        name: this.deviceSearchTxt,
        page: this.currentPage,
        state: this.state,
        pageSize: this.pageSize
      }
      if (this.state === 4) {
        data.state = ''
      }
     getDeviceInfoList(data).then(res => {
        this.loading = false
        if (res.statusCode === 1) {
          if (this.deviceType === 0) {
            this.sensorData.length = 0
            this.sensorData = [...res.result]
            this.sensorData.map(item => {
              if (item.useState === '0') item.use = false
              if (item.useState === '1') item.use = true
              return item
            })
          } else if (this.deviceType === 1) {
            this.controllerData.length = 0
            this.controllerData = [...res.result]
            this.controllerData.map(item => {
              item.disabled = false;
              if (item.useState === '0') item.use = false
              if (item.useState === '1') item.use = true
              return item
            })
          } else if (this.deviceType === 2) {
            this.cameraData.length = 0
            this.cameraData = [...res.result]
            this.cameraData.map(item => {
              if (item.useState === '0') item.use = false
              if (item.useState === '1') item.use = true
              return item
            })
          }

          this.init();

        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 获取总数量
    _getDeviceUseCount() {
      var data = {
        companyId: this.companyId,
        areaId: this.detailInfo.id,
        deviceType: this.deviceType,
        name: this.deviceSearchTxt,
        state: this.state
      }
      getDeviceInfoCount(data).then(res => {
        if (res.statusCode === 1) {
          this.total = res.result
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 新增关联设备
    _saveDeviceRelation(id) {
      var data = {
        companyId: this.companyId,
        areaId: this.detailInfo.id,
        mainControlId: this.detailInfo.controlId,
        deviceId: id,
        deviceType: this.deviceType
      }
      saveDeviceRelation(data).then(res => {
        if (res.statusCode === 1) {
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    _deleteDeviceRelation(id) {
      // var data = {
      //   companyId: this.companyId,
      //   areaId: this.detailInfo.id,
      //   mainControlId: this.detailInfo.controlId,
      //   deviceId: id,
      //   deviceType: this.deviceType
      // }
      var data = {
        relationId: id
      }
      deleteDeviceRelation(data).then(res => {
        if (res.statusCode === 1) {
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    changeState(state) {
      this.state = state

      this._getDeviceUseList()
      this._getDeviceUseCount()
    },
    EditVisSensorHandler() {
      this.sensorEditForm.companyId = this.companyId
      this.sensorEditForm.areaId = this.detailInfo.id
      updateDeviceSensorSet(this.sensorEditForm).then(res => {
        if (res.statusCode === 1) {
          this.dialogEditVisSensor = false
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    viewVideo(row) {
      var data = {
        areaId: this.detailInfo.id
      }
      if (this.detailInfo.index == 1) {
        data.type = 1
        this.$router.push({
          name: 'greenhouseVideo',
          query: data
        })
      } else {
        data.type = 0
        this.$router.push({
          name: 'warehouseVideo',
          query: data
        })
      }
    }
  },
  destroyed () {
    // 销毁监听
    this.socket.onclose = this.close
  }
}
</script>

<style lang="scss">
.device_common {
  .sensor,
  .controller,
  .camera {
    width: 100%;
    .sensor-head,
    .controller-head,
    .camera-head {
      padding-bottom: 20px;
      .search {
        display: inline-block;
        width: 300px;
      }
    }
  }
  .table-head-th {
    background: #f1f8ff;
    font-weight: 600;
    font-size: 14px;
    color: #4a4a4a;
  }
  .page {
    padding-top: 10px;
    text-align: right;
  }
}
.controller-edit-wra,
.controller-edit-wra-spe {
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
}
.device-state {
  margin-bottom: 10px;
  ul {
    display: flex;
    flex-direction: row;
    li {
      padding: 10px 20px;
      font-size: 12px;
      border: 1px solid #409eff;
      margin-left: 5px;
      color: #409eff;
      background: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      // div {
      //   width: 10px;
      //   height: 10px;
      //   margin-right: 5px;
      //   border-radius: 10px;
      // }
    }
    li:hover {
      background: #409eff;
      color: #fff;
    }
    .active {
      background: #409eff;
      color: #fff;
    }
  }
}
.state-0 {
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 10px;
  background: #3ff306;
}
.state-1 {
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 10px;
  background: #e98226;
}
.state-2 {
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 10px;
  background: #409eff;
}
.state-3 {
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 10px;
  background: #f30806;
}
  .el-tabs__item,.el-input__inner{color: #ffffff;}
</style>
