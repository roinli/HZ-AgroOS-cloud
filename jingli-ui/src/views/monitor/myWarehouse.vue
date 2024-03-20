<template lang="html">
  <div class="warehouse_manage" style="padding: 20px 0 20px 20px">
    <div class="header">
      <el-input v-model="search_txt" style="margin-right: 10px;" class="search" placeholder="请输入要搜索的单元名称" />
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
<div  @click="areaMonitor(item)" v-for="item in warehouseData" class="warehouse-list">
  <div class="warehouse-top">
    <div>仓库名称：{{item.display_name}}
      <!-- <div @click="menuEdit(item)">重命名</div> -->
    </div>
    <div><i class="el-icon-arrow-right"></i></div>
  </div>
  <div class="warehouse-pro">
    <div class="warehouse-field">
      <ul>
        <li><div>编号</div><div class="field-value">{{item.id}}</div></li>
        <li><div>公司编号</div><div class="field-value">{{item.company_id}}</div></li>
        <!-- <li><div>名称</div><div class="field-value">1</div></li> -->
        <li><div>建立时间</div><div class="field-value">{{item.create_time}}</div></li>
        <!-- <li><div>id</div><div class="field-value">1</div></li>
        <li><div>id</div><div class="field-value">1</div></li> -->
        <li><div>建立时间</div><div class="field-value">{{item.create_time}}</div></li>
      </ul>
    </div>
    <div></div>
  </div>
</div>
    <div class="content">

    </div>
    <div v-show="total > 3" class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
    <!-- 新增大棚 -->
    <!-- <el-dialog
      title="新增大棚"
      :visible.sync="dialogAddVis"
      width="30%">
      <el-form ref="AddForm" :rules="rulesAddForm" :model="addForm" label-width="80px" @submit.native.prevent>
        <el-form-item label="大棚名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入大棚名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVis = false">取 消</el-button>
        <el-button type="primary" @click="addSaveBusi">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- 修改大棚 -->
    <!-- <el-dialog
      title="修改大棚"
      :visible.sync="dialogEditVis"
      width="30%">
      <el-form ref="form" :model="EditForm" label-width="80px">
        <el-form-item label="大棚名称">
          <el-input v-model="EditForm.name" placeholder="请输入大棚名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVis = false">取 消</el-button>
        <el-button type="primary" @click="_updateArea">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import MyStorage from '@/utils/cache'

import { getMyWarehouseCount, getMyWarehouseList } from '@/api/warehouse'
export default {
  data() {
    return {
      // 表格数据loading
      loading: false,

      // 搜索关键字
      search_txt: '',
      // 页数
      currentPage: 1,
      // 每页条数
      pageSize: 3,
      // 总条数
      total: 1,
      // 表格数据
      warehouseData: [],
      // 新增弹窗 隐藏
      dialogAddVis: false,
      // 新增数据
      addForm: {
        name: ''
      },
      rulesAddForm: {
        name: [{ required: true, message: '请输入单元名称', trigger: 'blur' }]
      },
      // 复制弹窗 隐藏
      dialogCopyVis: false,
      // 复制数据
      CopyForm: {
        name: ''
      },
      // 修改弹窗 隐藏
      dialogEditVis: false,
      // 修改数据
      EditForm: {
        name: ''
      }
    }
  },
  methods: {
    // 搜索
    search() {
      this.currentPage = 1
      this._getAreaCount()
      this._getAreaList()
    },
    // 新增弹窗显示
    showAdd() {
      this.addForm.name = ''
      this.dialogAddVis = true
    },

    // 跳转
    linkTo(path) {
      this.$router.push({ path })
    },
    // 跳转至 ID 空值
    linkControlAdmin(item, index) {
      var info = {
        index,
        id: item.id,
        name: item.displayName
      }
      this.$store.dispatch('info/saveControlInfo', info).then(() => {
        this.linkTo('/business_management/warehouse_manage_index/control_admin')
      })
    },
    // 每页数量改变
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this._getAreaList()
      this._getAreaCount()
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val
      this._getAreaList()
      this._getAreaCount()
    },

    tableheaderClassName({ row, rowIndex }) {
      return 'table-head-th'
    },

    // 获取大棚列表
    _getAreaList() {
      const loading = this.$loading({
        lock: true,
        text: '正在加载...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var data = {
        companyId: this.companyId,
        name: this.search_txt,
        page: this.currentPage,
        pageSize: this.pageSize
      }

      getMyWarehouseList(data).then(res => {

        if (res.statusCode === 1) {
          this.warehouseData.length = 0
          this.warehouseData = [...res.result]
          loading.close()
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 获取大棚数量
    _getAreaCount() {
      var data = {
        companyId: this.companyId,
        name: this.search_txt
      }
      getMyWarehouseCount(data).then(res => {
        if (res.statusCode === 1) {
          this.total = res.result
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    areaMonitor(item) {
      item.index = 2
      this.$router.push({ name: 'wareEmentManage', query: item })
    }
  },
  mounted() {
    this._getAreaList()
    this._getAreaCount()
  },

  computed: {
    companyId() {
      return MyStorage.getItem('companyId')
    },
    companyName() {
      return MyStorage.getItem('companyName')
    }
  }
}
</script>

<style lang="scss">
.warehouse_manage {
  padding: 30px;
  min-width: 1000px;
  .warehouse-list {
    display: flex;

    flex-direction: column;
    border: 1px solid #d0cfcf;
    margin-bottom: 30px;
    .warehouse-top {
      display: flex;
      flex-direction: row;
      padding: 0 10px;
      justify-content: space-between;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #eaeaea;
      div {
        display: flex;
        flex-direction: row;
        cursor: pointer;
        align-items: center;
        div {
          font-size: 12px;
          display: flex;
          width: 60px;
          justify-content: center;
          color: #4d9dff;
        }
      }
    }
    .warehouse-pro {
      display: flex;
      flex-direction: row;
      height: 150px;

      .warehouse-field {
        border-right: 1px solid #eaeaea;
        width: 350px;
        min-width: 250px;
        ul {
          padding: 10px;
          li {
            display: flex;
            flex-direction: row;
            padding: 6px 20px;
            justify-content: space-between;
            font-size: 14px;
            .field-value {
              padding: 0 20px;
            }
          }
        }
      }
    }
  }
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
    width: 100%;
    .link {
      color: #4d9dff;
      &:hover {
        text-decoration: underline;
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
</style>
