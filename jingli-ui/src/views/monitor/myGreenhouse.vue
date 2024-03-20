<template lang="html">
  <div class="ghouse_manage" style="padding: 20px 0 20px 20px">
    <div class="header">
      <el-input v-model="search_txt" style="margin-right: 10px;" class="search" placeholder="请输入要搜索的单元名称" />
      <el-button type="primary"  @click="search">搜索</el-button>
    </div>
<div  @click="areaMonitor(item)" v-for="item in ghouseData" class="ghouse-list">
  <div class="ghouse-top">
    <div>单元名称：{{item.displayName}}<div @click.stop="menuEdit(item)">重命名</div></div>
    <div><i class="el-icon-arrow-right"></i></div>
  </div>
  <div class="ghouse-pro">
    <div class="ghouse-field">
      <ul>
        <li><div>编号</div><div class="field-value">{{item.id}}</div></li>
        <li><div>公司编号</div><div class="field-value">{{item.companyId}}</div></li>
        <li><div>下属主控ID</div><div class="field-value">{{item.number}}</div></li>
      </ul>
    </div>
    <div class="ghouse-field" style="border-right:none">
      <ul>
        <li><div>设备总数</div><div class="field-value">{{item.deviceCnt||0}}</div></li>
        <li><div>运行设备</div><div class="field-value">{{item.runingCnt||0}}</div></li>
        <li><div>断线设备</div><div class="field-value">{{item.offlineCnt||0}}</div></li>
      </ul>
    </div>
  </div>
</div>
    <div class="content">

    </div>
    <div v-show="total > 3" class="page" style="width: 100%;overflow: auto;">
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
    <el-dialog
      title="新增单元"
      :visible.sync="dialogAddVis"
      width="30%">
      <el-form ref="AddForm" :rules="rulesAddForm" :model="addForm" label-width="80px" @submit.native.prevent>
        <el-form-item label="单元名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入单元名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVis = false">取 消</el-button>
        <el-button type="primary" @click="addSaveBusi">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改单元 -->
    <el-dialog
      title="修改单元"
      :visible.sync="dialogEditVis"
      width="30%">
      <el-form ref="form" :model="EditForm" label-width="80px">
        <el-form-item label="单元名称">
          <el-input v-model="EditForm.name" placeholder="请输入单元名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVis = false">取 消</el-button>
        <el-button type="primary" @click="_updateArea">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MyStorage from '@/utils/cache'
import {
  getMyAreaCount,
  getMyAreaList,
  updateDisplayName
} from '@/api/myAreaManage'
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
      pageSize: 9,
      // 总条数
      total: 1,
      // 表格数据
      ghouseData: [],
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
    // 修改弹窗显示
    menuEdit(item) {
      this.EditForm.name = item.displayName
      this.EditForm.areaId = item.id
      this.dialogEditVis = true
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
        this.linkTo('/business_management/ghouse_manage_index/control_admin')
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
    // 删除
    menuDel(item) {
      this.$confirm('确定删除该单元吗?', '删除该单元', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._deleteArea(item.id)
      })
    },
    // table头部样式
    tableheaderClassName({ row, rowIndex }) {
      return 'table-head-th'
    },
    // 确认添加单元
    addSaveBusi() {
      this.$refs.AddForm.validate(valid => {
        if (valid) {
          this._addArea()
        }
      })
    },
    /**
     * 接口调用
     */
    // 获取单元列表
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
      getMyAreaList(data).then(res => {
        if (res.statusCode === 1) {
          this.ghouseData.length = 0
          this.ghouseData = [...res.result]
          loading.close()
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 获取单元数量
    _getAreaCount() {
      var data = {
        companyId: this.companyId,
        name: this.search_txt
      }
      getMyAreaCount(data).then(res => {
        if (res.statusCode === 1) {
          this.total = res.result
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },

    // },
    // 修改单元
    _updateArea() {
      updateDisplayName(this.EditForm).then(res => {
        if (res.statusCode === 1) {
          this.dialogEditVis = false
          this.$message({ message: `单元修改成功`, type: 'success' })
          this._getAreaCount()
          this._getAreaList()
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    areaMonitor(item) {
      item.index = 1
      this.$router.push({ name: 'ementManage', query: item })
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
  .app-main {
    min-height: calc(100vh - 65px);
  }
.ghouse_manage {
  padding: 30px;
  min-width: 1000px;
  .ghouse-list {
    display: flex;
    width: 45%;
    float: left;
    margin-right: 5%;
    flex-direction: column;
    border: 1px solid #d0cfcf;
    margin-bottom: 30px;
    .ghouse-top {
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
    .ghouse-pro {
      display: flex;
      flex-direction: row;
      height: 100px;

      .ghouse-field {
        width: 250px;
        min-width: 250px;
        color: #fff;
        border-right: 1px solid #eaeaea;
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
