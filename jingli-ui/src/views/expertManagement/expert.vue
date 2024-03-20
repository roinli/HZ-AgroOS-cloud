<template>
  <main>
  <div class="ghouse_manage" style="padding: 20px 0px 10px 20px;">
    <div class="header">
      <el-input v-model="name" class="search" placeholder="请输入要搜索的专家名称" />
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button type="primary" @click="add">新增</el-button>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%;margin-top:10px;">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="专家头像">
        <template slot-scope="scope">
          <img style="width:50px;height:50px;" :src="scope.row.icon" alt />
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <span v-if="scope.row.sex == 1">男</span>
          <span v-if="scope.row.sex == 0">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机"></el-table-column>
      <el-table-column prop="industry" label="专家行业"></el-table-column>
      <el-table-column prop="major" label="专长"></el-table-column>
      <el-table-column prop="wechat" label="微信"></el-table-column>
      <el-table-column prop="qq" label="qq"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" min-width="180"></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            @click="deleteHandler(scope.row)"
            icon="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>

    <el-dialog title="添加专家" :visible.sync="dialogVisible" width="50%">
      <el-form
        label-width="80px"
        :model="param"
        ref="AddForm"
        :rules="rulesAddForm"
        class="nav-form"
      >
        <div class="double-line">
          <el-form-item class="nav-form-item" label="姓名" prop="name">
            <el-input v-model="param.name" style="width:200px;" placeholder="请输入姓名" clearable maxlength="50" />
          </el-form-item>
          <el-form-item class="nav-form-item" label="专家性别" prop="name">
            <el-select v-model="param.sex">
              <el-option value="1" label="男"></el-option>
              <el-option value="0" label="女"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item class="nav-form-item" label="专家行业" prop="name">
            <el-input v-model="param.industry" style="width:200px;" placeholder="请输入专家行业" clearable maxlength="50" />
          </el-form-item>
          <el-form-item class="nav-form-item" label="专长" prop="name">
            <el-input v-model="param.major" style="width:200px;" placeholder="请输入专家专长" clearable maxlength="50"/>
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item class="nav-form-item" label="微信">
            <el-input v-model="param.wechat" style="width:200px;" placeholder="请输入专家微信" clearable maxlength="50"/>
          </el-form-item>
          <el-form-item class="nav-form-item" label="qq">
            <el-input v-model="param.qq" style="width:200px;" placeholder="请输入专家qq" clearable maxlength="50"/>
          </el-form-item>
        </div>
        <el-form-item class="nav-form-item" label="手机" prop="name">
          <el-input v-model="param.mobile" style="width:200px;" placeholder="请输入手机" clearable maxlength="50"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  </main>
</template>
<script>
import {
  deleteExpert,
  queryList,
  queryListCount,
  saveExpert
} from '@/api/expert'
export default {
  data() {
    return {
      name: '',
      tableData: [],
      page: 1,
      pageSize: 10,
      total: null,
      loading: true,
      dialogVisible: false,
      param: {},
      rulesAddForm: {
        name: [{ required: true, message: '请输入必填项', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.queryListCount()
    this.queryList()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.queryListCount()
      this.queryList()
    },
    queryListCount() {
      var data = {
        name: this.name
      }
      queryListCount(data).then(res => {
        this.total = res.result
        this.queryList()
      })
    },
    queryList() {
      this.loading = true
      var data = {
        name: this.name,
        page: this.page,
        pageSize: this.pageSize
      }
      queryList(data).then(res => {
        this.tableData.length = 0
        this.tableData = [...res.result]
        this.loading = false
      })
    },
    search() {
      this.queryListCount()
      this.queryList()
    },
    save() {
      this.$refs.AddForm.validate(valid => {
        if (valid) {
          this.saveExpert()
        }
      })
    },
    saveExpert() {
      saveExpert(this.param).then(res => {
        if (res.statusCode === 1) {
          this.total = res.result
          this.search()
          this.dialogVisible = false
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    add() {
      this.param = {}
      this.dialogVisible = true
    },
    deleteHandler(row) {
      this.$confirm('确定要删除吗?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO
        this.loading = true
        var data = {
          ids: row.id
        }
        deleteExpert(data).then(res => {
          if (res.statusCode === 1) {
            this.$message({ message: res.message, type: 'success' })
            this.search()
            this.dialogVisible = false
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        })
      })
    }
  }
}
</script>
<style lang="scss">
.search {
  width: 200px;
}
/*.ghouse_manage {*/
  /*padding:0;*/
  /*margin-left: 20px;*/
  /*margin-top: 20px;*/
  /*min-width: 500px;*/
/*}*/
</style>
