<template lang="html">
  <div class="control_list">
    <div class="header">
      <h4 class="title">设备名称: {{deviceName}}</h4>
      <el-input v-model="search_txt" class="search" placeholder="请输入要搜索的主控ID名称" />
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <div class="content">
      <h4 class="title">以下主控ID已使用该设备</h4>
      <el-table
        :data="controlData"
        v-loading="loading"
        :header-cell-class-name="tableheaderClassName"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="mainControlName"
          label="主控ID名称">
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="所属单元">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="所属公司">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="menuEdit(scope.row)">修改</el-button>
            <el-button type="warning" size="small" @click="menuDel(scope.row)">取消使用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <!-- 修改主控ID -->
    <el-dialog
      title="修改主控ID"
      :visible.sync="dialogEditVis"
      width="30%">
      <el-form ref="EditForm" :rules="rulesAddForm" :model="EditForm" label-width="100px">
        <el-form-item label="主控ID名称" prop="name">
          <el-input v-model="EditForm.name" placeholder="请输入主控ID名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVis = false">取 消</el-button>
        <el-button type="primary" @click="_updateMainControl">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUseDeviceMainControlList, getUseDeviceMainControlCount } from '@/api/overview'
import { updateMainControl } from '@/api/control_admin'
import { deleteDeviceRelation } from '@/api/device_manage'

export default {
  data () {
    return {
      deviceName: '',
      deviceId: '',
      loading: false,
      search_txt: '',
      // 页数
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 1,
      controlData: [],
      dialogEditVis: false,
      EditForm: {
        mainControlId: '',
        name: ''
      },
      rulesAddForm: {
        name: [
          { required: true, message: '请输入主控ID名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 搜索
    search () {
      this.currentPage = 1
      this._getUseDeviceMainControlList()
      this._getUseDeviceMainControlCount()
    },
    // 每页数量改变
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this._getUseDeviceMainControlList()
      this._getUseDeviceMainControlCount()
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val
      this._getUseDeviceMainControlList()
      this._getUseDeviceMainControlCount()
    },
    // table头部样式
    tableheaderClassName ({ row, rowIndex }) {
      return 'table-head-th'
    },
    // 修改弹窗显示
    menuEdit (item) {
      this.EditForm.mainControlId = item.mainControlId
      this.EditForm.name = item.mainControlName
      this.dialogEditVis = true
    },
    // 取消使用
    menuDel (item) {
      this.$confirm('确定取消使用该主控ID吗?', '取消使用该主控', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._deleteDeviceRelation(item.id)
      })
    },
    /**
     * 接口调用
     */
    // 获取列表
    _getUseDeviceMainControlList () {
      this.loading = true
      var data = {
        deviceId: this.deviceId,
        name: this.search_txt,
        page: this.currentPage,
        pageSize: this.pageSize
      }
      getUseDeviceMainControlList(data).then(res => {
        this.loading = false
        if (res.statusCode === 1) {
          this.controlData.length = 0
          this.controlData = [...res.result]
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 获取数量
    _getUseDeviceMainControlCount () {
      var data = {
        deviceId: '',
        name: this.search_txt
      }
      getUseDeviceMainControlCount(data).then(res => {
        if (res.statusCode === 1) {
          this.total = res.result
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 修改
    _updateMainControl () {
      this.$refs.EditForm.validate((valid) => {
        if (valid) {
          updateMainControl(this.EditForm).then(res => {
            if (res.statusCode === 1) {
              this.dialogEditVis = false
              this.$message({ message: `主控ID修改成功`, type: 'success' })
              this._getUseDeviceMainControlList()
              this._getUseDeviceMainControlCount()
            } else {
              this.$message({ message: res.message, type: 'warning' })
            }
          })
        }
      })
    },
    // 取消使用
    _deleteDeviceRelation (id) {
      // var data = {
      //   companyId: item.companyId,
      //   areaId: item.areaId,
      //   mainControlId: item.mainControlId,
      //   deviceId: item.id,
      //   deviceType: item.deviceType
      // }
      var data = {
        relationId: id
      }
      deleteDeviceRelation(data).then(res => {
        if (res.statusCode === 1) {
          this.$message({ message: res.message, type: 'success' })
          this.currentPage = 1
          this._getUseDeviceMainControlList()
          this._getUseDeviceMainControlCount()
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    }
  },
  mounted () {
    this.deviceName = this.$route.query.deviceName
    this.deviceId = this.$route.query.id
    this._getUseDeviceMainControlList()
    this._getUseDeviceMainControlCount()
  }
}
</script>

<style lang="scss">
.control_list {
  padding: 30px;
  .header {
    padding-bottom: 20px;
    .title {
      padding-bottom: 10px;
      line-height: 32px;
      font-size: 16px;
      color: #fff;
      font-weight: 600;
    }
    .search {
      width: 300px;
    }
  }
  .content {
    .title {
      line-height: 20px;
      padding-bottom: 10px;
      font-size: 14px;
      color: #fff;
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
</style>
