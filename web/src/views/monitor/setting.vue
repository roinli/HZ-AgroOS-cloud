<template>
  <div style="margin-top:20px;margin-left:20px;">
    <el-button @click="addHandler" type="primary">新增设置</el-button>
    <div style="margin-top:20px">
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="closeDevice" label="智能控制关闭设备ID"></el-table-column>
        <el-table-column prop="closeDeviceName" label="智能控制关闭设备名称"></el-table-column>
        <el-table-column prop="closeType" :formatter="closeTypeFrom" label="关闭设备条件"></el-table-column>
        <el-table-column prop="closeVal" label="关闭条件数值"></el-table-column>
        <el-table-column prop="controlType" label="控制类型" :formatter="controlTypefrom"></el-table-column>
        <el-table-column prop="durationTime" label="持续时间(分钟)"></el-table-column>
        <el-table-column prop="endTime" label="结束时间"></el-table-column>
        <el-table-column prop="intervalTime" label="间隔(分钟)"></el-table-column>
        <el-table-column prop="loopCnt" label="循环次数"></el-table-column>
        <el-table-column prop="loopType" label="循环结束类型" :formatter="loopType"></el-table-column>
        <el-table-column prop="loopWeek" label="循环周期"></el-table-column>
        <el-table-column prop="openDevice" label="智能控制打开设备ID"></el-table-column>
        <el-table-column prop="openDeviceName" label="智能控制打开设备名称"></el-table-column>
        <el-table-column prop="openType" label="打开设备条件" :formatter="openType"></el-table-column>
        <el-table-column prop="openVal" label="打开条件数值"></el-table-column>
        <el-table-column prop="startTime" label="开启时间"></el-table-column>
        <el-table-column prop="useState" label="状态" :formatter="useState"></el-table-column>
        <el-table-column prop="closeDevice" label="智能控制关闭设备ID"></el-table-column>
        <el-table-column label="操作" min-width="150px">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-edit" @click="editControlSet(scope.row)"></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteControlSet(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="修改控制器"
      :visible.sync="dialogEditVisController"
      class="controller-edit-wra"
      width="40%"
    >
      <el-form ref="form" :model="controllerEditForm" label-width="200px">
          <el-form-item label="控制类型">
            <el-select v-model="controllerEditForm.controlType">
              <el-option label="定时" value="0"></el-option>
              <el-option label="循环" value="1"></el-option>
              <el-option label="智能" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="item-con-spe" label="智能控制打开设备" v-show="controllerEditForm.controlType=='2'">
            <el-select v-model="controllerEditForm.openDevice" placeholder="请选择">
              <el-option
                v-for="(item, index) in AutoSensorList"
                :key="index"
                :value="item.id"
                :label="item.deviceName"
              ></el-option>
            </el-select>
          </el-form-item>


          <el-form-item class="item-con-spe" label="智能控制关闭设备" v-show="controllerEditForm.controlType=='2'">
            <el-select v-model="controllerEditForm.closeDevice" placeholder="请选择">
              <el-option
                v-for="(item, index) in AutoSensorList"
                :key="index"
                :value="item.id"
                :label="item.deviceName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="controllerEditForm.controlType == 2"
            class="item-con-spe"
            label="打开设备条件"
          >
            <el-select v-model="controllerEditForm.openType" placeholder="请选择" v-show="controllerEditForm.controlType=='2'">
              <el-option value="0" label="大于"></el-option>
              <el-option value="1" label="小于"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item
            v-if="controllerEditForm.controlType == 2"
            class="item-con-spe"
            label="关闭设备条件"
          >
            <el-select v-model="controllerEditForm.closeType" placeholder="请选择" v-show="controllerEditForm.controlType=='2'">
              <el-option value="0" label="大于"></el-option>
              <el-option value="1" label="小于"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="item-con-spe" label="循环结束类型" v-if="controllerEditForm.controlType == 1">
            <el-select
              v-model="controllerEditForm.loopType"
              placeholder="请选择"
            >
              <el-option value="0" label="时间"></el-option>
              <el-option value="1" label="次数"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item
            v-if="controllerEditForm.controlType == 0||controllerEditForm.controlType == 1||controllerEditForm.controlType == 2"
            class="item-con-spe"
            label="开启时间"
          >
            <el-date-picker
              v-model="controllerEditForm.startTime"
              type="datetime"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择开启时间"
              align="right"
            />
          </el-form-item>
          <el-form-item
            v-if="controllerEditForm.controlType == 0||controllerEditForm.controlType == 1||controllerEditForm.controlType == 2"
            class="item-con-spe"
            label="关闭时间"
          >
            <el-date-picker
              v-model="controllerEditForm.endTime"
              type="datetime"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择关闭时间"
              align="right"
            />
          </el-form-item>

          <el-form-item class="item-con-spe" label="打开条件数值 " v-show="controllerEditForm.controlType == 2">
            <el-input v-model="controllerEditForm.openVal" type="number" placeholder="请输入" maxlength="10" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item class="item-con-spe" label="关闭条件数值" v-show="controllerEditForm.controlType == 2">
            <el-input v-model="controllerEditForm.closeVal" type="number" placeholder="请输入" maxlength="10" style="width: 220px;"></el-input>
          </el-form-item>

          <el-form-item class="item-con-spe" label="循环次数" v-show="controllerEditForm.controlType != 2">
            <el-input v-model="controllerEditForm.loopCnt" type="number" placeholder="请输入" maxlength="10" style="width: 220px;"></el-input>
          </el-form-item>

          <el-form-item
            v-if="controllerEditForm.controlType == 1"
            class="item-con-spe"
            label="持续时间（分钟）"
          >
            <el-input v-model="controllerEditForm.durationTime" type="number" placeholder="请输入" maxlength="10" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item
            v-if="controllerEditForm.controlType == 1"
            class="item-con-spe"
            label="间隔（分钟）"
          >
            <el-input v-model="controllerEditForm.intervalTime" type="number" placeholder="请输入" maxlength="10" style="width: 220px;"></el-input>
          </el-form-item>

          <el-form-item class="item-con-spe" label="状态">
            <el-select v-model="controllerEditForm.useState" placeholder="请选择">
              <el-option value="0" label="禁用"></el-option>
              <el-option value="1" label="开启"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item class="item-con-spe" label="循环周期" v-show="controllerEditForm.controlType != 2">
          <el-select v-model="controllerEditForm.loopWeek" placeholder="请选择">
            <el-option v-for="i in 7" :key="i" :value="i" :label="i"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisController = false">取 消</el-button>
        <el-button type="primary" @click="EditVisControlleConfim">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getControlSetList,
  getDeviceInfoList,
  updateControlSet,
  saveControlSet,
  deleteControlSet
} from '@/api/deviceInfo'
export default {
  data() {
    return {
      dialogEditVisController: false,
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
      AutoSensorList: [],
      loading: true,
      tableData: [],
      deviceId: this.$route.query.deviceId,
      companyId: this.$route.query.companyId,
      areaId: this.$route.query.areaId,
      isAdd: false
    }
  },
  created() {
    this.getControlSetList()
    this.getDeviceInfoList()
  },
  methods: {
    editControlSet(row) {
      this.isAdd = false
      this.controllerEditForm = row
      this.controllerEditForm.id = row.id
      this.dialogEditVisController = true
    },
    deleteControlSet(row) {
      var para = {
        id: row.id
      }
      deleteControlSet(para).then(res => {
        if (res.statusCode === 1) {
          this.getControlSetList()
          this.dialogEditVisController = false
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    addHandler() {
      this.isAdd = true
      this.controllerEditForm.controlType = ''
      this.controllerEditForm.openDevice = ''
      this.controllerEditForm.closeDevice = ''
      this.controllerEditForm.openType = ''
      this.controllerEditForm.closeType = ''
      this.controllerEditForm.openVal = ''
      this.controllerEditForm.closeVal = ''
      this.controllerEditForm.startTime = ''
      this.controllerEditForm.loopType = ''
      this.controllerEditForm.loopCnt = ''
      this.controllerEditForm.durationTime = ''
      this.controllerEditForm.intervalTime = ''
      this.controllerEditForm.useState = ''
      this.controllerEditForm.loopWeek = ''
      this.dialogEditVisController = true
    },
    EditVisControlleConfim() {
      if (this.isAdd) {
        this.controllerEditForm.companyId = this.companyId
        this.controllerEditForm.areaId = this.areaId
        this.controllerEditForm.deviceId = this.deviceId
        saveControlSet(this.controllerEditForm).then(res => {
          if (res.statusCode === 1) {
            this.getControlSetList()
            this.dialogEditVisController = false
            this.$message({ message: res.message, type: 'success' })
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        })
      } else {
        updateControlSet(this.controllerEditForm).then(res => {
          if (res.statusCode === 1) {
            this.dialogEditVisController = false
            this.$message({ message: res.message, type: 'success' })
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        })
      }
    },
    getDeviceInfoList() {
      var para = {
        deviceType: 1,
        page: 1,
        pageSize: 999,
        companyId: this.$route.query.companyId,
        areaId: this.$route.query.areaId
      }
      getDeviceInfoList(para).then(res => {
        this.AutoSensorList = res.result
      })
    },

    getControlSetList() {
      var para = {
        deviceId: this.$route.query.deviceId,
        companyId: this.$route.query.companyId,
        areaId: this.$route.query.areaId
      }
      getControlSetList(para).then(res => {
        this.tableData = [...res.result]
        this.loading = false
      })
    },
    useState(row) {
      if (row.useState == 0) {
        return '禁用'
      } else {
        return '开启'
      }
    },
    openType(row) {
      if (row.openType == 0) {
        return '大于'
      } else {
        return '小于'
      }
    },
    loopType(row) {
      if (row.loopType == 0) {
        return '时间'
      } else {
        return '次数'
      }
    },
    controlTypefrom(row) {
      if (row.controlType == 0) {
        return '定时'
      } else if (row.controlType == 1) {
        return '循环'
      } else {
        return '智能'
      }
    },
    closeTypeFrom(row) {
      if (row.closeType == 0) {
        return '大于'
      } else {
        return '小于'
      }
    }
  }
}
</script>
