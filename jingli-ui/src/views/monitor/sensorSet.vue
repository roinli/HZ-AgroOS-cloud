<template>
  <div style="margin-top:20px;margin-left:20px;">
    <el-button @click="addHandler" type="primary">新增设置</el-button>
    <div style="margin-top:20px">
      <el-table v-loading="loading" :data="tableData" style="width: 100%">

        <el-table-column prop="startTime" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" label="结束时间"></el-table-column>
        <el-table-column prop="smallVal" label="小于报警值"></el-table-column>
        <el-table-column prop="bigVal" label="大于报警值 "></el-table-column>
        <el-table-column prop="state" label="状态" :formatter="state"></el-table-column>
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
      width="50%"
    >
      <el-form ref="form" :model="controllerEditForm" label-width="100px">
        <div class="double-line">
          <el-form-item class="item-con-spe" label="开始时间">
            <el-time-select
              v-model="controllerEditForm.startTime"
              :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:59'
            }"
              value-format="hh:mm"
              placeholder="选择开始时间"
              align="right"
            />
          </el-form-item>
          <el-form-item class="item-con-spe" label="结束时间">
            <el-time-select
              v-model="controllerEditForm.endTime"
              :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:59'
            }"
              value-format="hh:mm"
              placeholder="选择结束时间"
              align="right"
            />
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item class="item-con-spe" label="小于报警值">
            <el-input v-model="controllerEditForm.smallVal" type="number" placeholder="请输入" maxlength="10" style="width: 220px;"></el-input>
          </el-form-item>

          <el-form-item class="item-con-spe" label="大于报警值">
            <el-input v-model="controllerEditForm.bigVal" type="number" placeholder="请输入" maxlength="10" style="width: 220px;"></el-input>
          </el-form-item>
        </div>

        <el-form-item class="item-con-spe" label="状态">
          <el-select v-model="controllerEditForm.state" placeholder="请选择">
            <el-option value="0" label="禁用"></el-option>
            <el-option value="1" label="开启"></el-option>
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
  getDeviceSensorSet,
  saveDeviceSensorSet,
  getAutoSensorList,
  updateDeviceSensorSet,
  deleteSensorSet
} from '@/api/deviceInfo'
export default {
  data() {
    return {
      dialogEditVisController: false,
      controllerEditForm: {
        companyId: '',
        areaId: '',
        deviceId: '',
        startTime: '',
        endTime: '',
        state: '',
        smallVal: '',
        bigVal: ''
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
    this.getDeviceSensorSet()
    // this.getAutoSensorList()
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
      deleteSensorSet(para).then(res => {
        if (res.statusCode === 1) {
          this.getDeviceSensorSet()
          this.dialogEditVisController = false
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    addHandler() {
      this.isAdd = true
      this.controllerEditForm.startTime = ''
      this.controllerEditForm.endTime = ''
      this.controllerEditForm.state = ''
      this.controllerEditForm.smallVal = ''
      this.controllerEditForm.bigVal = ''
      this.dialogEditVisController = true
    },
    EditVisControlleConfim() {
      if (this.isAdd) {
        this.controllerEditForm.companyId = this.companyId
        this.controllerEditForm.areaId = this.areaId
        this.controllerEditForm.deviceId = this.deviceId
        saveDeviceSensorSet(this.controllerEditForm).then(res => {
          if (res.statusCode === 1) {
            this.getDeviceSensorSet()
            this.dialogEditVisController = false
            this.$message({ message: res.message, type: 'success' })
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        })
      } else {
        updateDeviceSensorSet(this.controllerEditForm).then(res => {
          if (res.statusCode === 1) {
            this.dialogEditVisController = false
            this.$message({ message: res.message, type: 'success' })
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        })
      }
    },
    getAutoSensorList() {
      var para = {
        deviceId: this.deviceId
      }
      getAutoSensorList(para).then(res => {
        this.AutoSensorList = res.result
      })
    },

    getDeviceSensorSet() {
      this.loading = true
      var para = {
        deviceId: this.$route.query.deviceId,
        companyId: this.$route.query.companyId,
        areaId: this.$route.query.areaId
      }
      getDeviceSensorSet(para).then(res => {
        this.tableData = [...res.result]
        this.loading = false
      })
    },
    state(row) {
      if (row.state == 0) {
        return '禁用'
      } else {
        return '开启'
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
