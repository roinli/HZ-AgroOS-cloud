<template>
  <section style="margin-left: 20px;padding-top: 10px;">
    <div class="topLine2" >
      <div class="topLineLeft">
        <el-form label-width="80px" ref="AddForm" class="nav-form">
            <el-input v-model="param.name" style="width:300px;" placeholder="请输入姓名查询" clearable />
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary" @click="addUser">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog :title="isAddUser" :visible.sync="dialogAddVis" width="50%">
      <el-form ref="AddForm" :rules="rulesAddForm" :model="addForm" label-width="100px">
        <div class="double-line">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入姓名" style="width: 220px;" clearable maxlength="50"></el-input>
          </el-form-item>

          <el-form-item label="手机" prop="mobile">
            <el-input v-model.number="addForm.mobile" placeholder="请输入手机" style="width: 220px;" clearable maxlength="50"></el-input>
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="addForm.age" placeholder="请输入年龄" style="width: 220px;" clearable maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model.number="addForm.address" placeholder="请输入地址" style="width: 220px;" clearable maxlength="200"></el-input>
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item label="职务" prop="address">
            <el-input v-model.number="addForm.position" placeholder="请输入职务" style="width: 220px;" clearable maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="健康状态" prop="healthyState">
            <el-select v-model="addForm.healthyState" placeholder="请选择">
              <el-option label="优" value="0"></el-option>
              <el-option label="良" value="1"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="addForm.sex" placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVis = false">取 消</el-button>
        <el-button type="primary" @click="confim">确 定</el-button>
      </span>
    </el-dialog>
    <el-table
      v-loading="listLoading"
      :data="userList"
      :lazy="true"
      style="width: 100%;margin-top:10px;"
      @selection-change="selsChange"
    >
      <el-table-column align="center" min-width="50" type="index" />
      <el-table-column label="姓名" prop="name" min-width="80"></el-table-column>
      <el-table-column align="center" prop="mobile" label="手机" min-width="180" />
      <el-table-column align="center" prop="age" label="年龄" min-width="80" />
      <el-table-column align="center" prop="address" label="地址" min-width="80" />
      <el-table-column align="center" prop="sex" :formatter="sex" label="性别" min-width="80" />
      <el-table-column align="center" prop="healthyState" :formatter="healthyState" label="健康状态" min-width="80" />
      <el-table-column align="center" prop="createTime" label="创建时间" min-width="180" />
      <el-table-column align="center" label="操作" min-width="180">
        <template slot-scope="scope">
          <!--<el-button type="primary" size="mini" @click="roleUserEdit(scope.$index, scope.row)">配置角色</el-button>-->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editeUser(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteUser(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        style="float:right;"
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      />
    </el-col>
  </section>
</template>

<script>
  import { getBusiList, getUserCount } from '@/api/business_management'
  import {
    queryList,
    add,
    deleteUser,
    queryListCount,
    update
  } from '@/api/user_management'
</script>
<script>
  import { getBusiList, getUserCount } from '@/api/business_management'

  // import { mapGetters } from 'vuex'
  import MyStorage from '@/utils/cache'
  import {
    queryList,
    add,
    deleteUser,
    queryListCount,
    update
  } from '@/api/user_management'
  export default {
    data() {
      return {
        isAdd: false,
        dialogAddVis: false,
        busiid:  '',
        addForm: {
          address: '',
          age: '',
          healthyState: '',
          id: '',
          mobile: '',
          name: '',
          position: '',
          sex: ''
        },
        isAddUser: '',
        muenList: [], // 类别列表
        userList: [],
        listLoading: true,
        param: {},
        page: 1,
        total: 0,
        sels: [],
        pageSize: 10,
        busiList: [],
        rulesAddForm: {
          address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
          mobile: [{ required: true, message: '请输入手机', trigger: 'blur' }],
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.busiid = this.companyId;
      this.queryList()
      this.getUserCount()
    },
    computed: {
      companyId() {
        return MyStorage.getItem('companyId')
      },
      companyName() {
        return MyStorage.getItem('companyName')
      }
      // ...mapGetters(['busiid', 'businame', 'controlinfo'])
    },
    methods: {
      roleUserEdit(){

      },
      // 选中事件
      selsChange: function(sels) {
        this.sels = sels
      },
      handleCurrentChange(val) {
        this.page = val
        this.queryList()
      },
      //
      queryList() {
        this.listLoading = true
        this.param.page = this.page
        this.param.companyId = this.busiid
        this.param.pageSize = this.pageSize
        queryList(this.param).then(res => {
          this.userList = [...res.result]
          this.listLoading = false
          this.queryListCount()
        })
      },
      queryListCount() {
        this.param.companyId = this.busiid
        queryListCount(this.param).then(res => {
          this.total = res.result
        })
      },
      sex(val) {
        if (val.sex === '0') {
          return '女'
        } else {
          return '男'
        }
      },
      healthyState(val){
        if (val.healthyState === '0') {
          return '优'
        } else {
          return '良'
        }
      },
      indexMethod(index) {
        return index * 2
      },
      changePageSize() {
        this.queryList()
      },
      addUser() {
        this.$refs.AddForm.clearValidate()
        this.isAdd = true
        this.addForm = {}
        this.isAddUser = '新增用户'
        this.dialogAddVis = true
      },
      // 查询
      search() {
        this.queryList()
      },
      // 删除
      deleteUser(index, row) {
        this.$confirm('删除后不可恢复，是否确认删除？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          var data = {
            ids: row.id
          }
          deleteUser(data).then(res => {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this.queryList()
          })
        })
      },
      confim() {
        this.$refs.AddForm.validate(valid => {
          if (valid) {
            if (this.isAdd) {
              this.saveUser()
            } else {
              this.updateUser()
            }
          }
        })
      },
      editeUser(index, row) {
        this.isAdd = false
        this.isAddUser = '修改用户'
        this.addForm.name = row.name
        this.addForm.id = row.id
        this.addForm.sex = row.sex
        this.addForm.mobile = row.mobile
        this.addForm.position = row.position
        this.addForm.age = row.age
        this.addForm.healthyState = row.healthyState
        this.addForm.address = row.address
        this.addForm.address = row.address
        this.addForm.companyId = this.busiid;
        this.$refs.AddForm.clearValidate()
        this.dialogAddVis = true
      },

      updateUser() {
        this.addForm.companyId = this.busiid;
        update(this.addForm).then(res => {
          if (res.statusCode === 1) {
            this.dialogAddVis = false
            this.queryList()
            this.$message({ message: res.message, type: 'success' })
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        })
      },
      saveUser() {
        this.addForm.companyId = this.busiid;
        add(this.addForm).then(res => {
          if (res.statusCode === 1) {
            this.dialogAddVis = false
            this.queryList()
            this.$message({ message: res.message, type: 'success' })
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        })
      },
      getUserCount() {
        getUserCount().then(res => {
          var data = {
            page: 1,
            pageSize: res.result
          }
          getBusiList(data).then(respose => {
            this.busiList = [...respose.result]
          })
        })
      },
      querryUser() {
        this.queryList()
      }
    }
  }
</script>
