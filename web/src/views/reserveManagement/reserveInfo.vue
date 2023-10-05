<template>
  <div>
    <div class="inventory-header-div">
      <el-select style="padding-right: 10px;" v-model="value" placeholder="请选择仓库" class="el-option-title" @change="changReserve">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.display_name"
          :value="item.id"
        ></el-option>
      </el-select>
        <el-input v-model="sensor_txt" class="el-option-title" placeholder="请输入要搜索的产品名称" />
        <el-button type="primary" style="margin-left:10px;" @click="search">搜索</el-button>
        <el-button type="primary" @click="dialogVisible = true">新增入库</el-button>
    </div>

    <el-dialog
      title="新增入库"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="showAddinReserve"
    >
      <el-form
        ref="addInReserveForm"
        :model="addInReserveForm"
        :rules="addInreserveRules"
        label-width="80px"
        label-position="right"
      >
        <div class="double-line">
          <el-form-item label="仓库" prop="warehouse">
            <el-select v-model="addInReserveForm.warehouse" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.display_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作员" prop="operator">
          <el-input v-model="addInReserveForm.operator" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item label="产品种类" prop="productIndex">
            <el-select
              v-model="addInReserveForm.productIndex"
              placeholder="请选择"
              style="width:100%;"
              @change="changType"
            >
              <el-option
                v-for="(item, index) in InverntoryTypes"
                :key="item.id"
                :label="item.name"
                :value="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合格率" prop="percentPass">
            <el-input placeholder="请直接输入数值" v-model="addInReserveForm.percentPass">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item label="产品名称" prop="name">
          <el-input
            v-model="addInReserveForm.name"
            type="text"
            max-length="50"
            placeholder="产品名称"
          ></el-input>
        </el-form-item>
        <div class="double-line">
          <el-form-item label="入库量" prop="region">
            <el-input
              v-model="addInReserveForm.region"
              type="number"
              step="10"
              placeholder="默认单位为千克"
              validate-event
            ></el-input>
          </el-form-item>
          <el-form-item label="入库时间" prop="inReserveDate">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="addInReserveForm.inReserveDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </div>

        <el-form-item style="text-align: right">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="_insertWarehousing('addInReserveForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="新增出库"
      :visible.sync="outResverDialog"
      width="40%"
      :before-close="showAddoutReserve"
    >
      <el-form
        ref="addOutReserveForm"
        :model="addOutReserveForm"
        :rules="addOutReserveRules"
        label-width="80px"
        label-position="right"
      >
        <div class="double-line">
          <el-form-item label="仓库">
            <el-input v-model="addOutReserveForm.warehouse" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="操作员">
            <el-input v-model="addOutReserveForm.operator" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item label="产品种类">
            <el-input v-model="addOutReserveForm.productIndex" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="合格率" prop="percentPass">
            <el-input placeholder="请直接输入数值" v-model="addOutReserveForm.percentPass">
              <template slot="append" style="background: #fff">%</template>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item label="产品名称" prop="name">
          <el-input
            v-model="addOutReserveForm.name"
            type="text"
            max-length="50"
            placeholder="产品名称"
          ></el-input>
        </el-form-item>
        <div class="double-line">
          <el-form-item label="出库量" prop="region">
            <el-input
              v-model="addOutReserveForm.region"
              type="number"
              step="10"
              placeholder="默认单位为千克"
            ></el-input>
          </el-form-item>
          <el-form-item label="出库时间" prop="inReserveDate">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="addOutReserveForm.inReserveDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </div>

        <el-form-item style="text-align: right">
          <el-button @click="outResverDialog = false">取 消</el-button>
          <el-button type="primary" @click="_updatePlacing('addOutReserveForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div style="margin:0px 20px">
      <el-table v-loading="loading" :data="tableData" style="width: 100%;">
        <el-table-column type="index" label="编号"></el-table-column>
        <el-table-column prop="displayName" label="仓库名称"></el-table-column>
        <el-table-column prop="type" label="产品种类"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="size" label="入库量"></el-table-column>
        <el-table-column prop="qualified" label="合格率"></el-table-column>
        <el-table-column prop="operator" label="操作员"></el-table-column>
        <el-table-column prop="create_time" label="入库时间" width="160"></el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleLook(scope.row)">查看</el-button>
            <el-button size="mini" type="warning" @click="handleOutReserve(scope.row)">出库</el-button>
            <!-- outResverDialog = true -->
          </template>
        </el-table-column>
      </el-table>
      <div class="page" v-show="total > 5">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10,15,20]"
          :page-size="this.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getWarehouseList,
  getInventoryType,
  getInventoryManage,
  getInventoryCount,
  insertWarehousing,
  updatePlacing
} from '@/api/reserveInfo'
import MyStorage from '@/utils/cache'
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      //下拉仓库列表
      options: [],
      //仓库id
      value: '',
      // 新增入库弹框
      dialogVisible: false,
      // 新增出库弹框
      outResverDialog: false,
      //新增入库表单
      addInReserveForm: {
        warehouse: '',
        operator: MyStorage.getItem('companyName'),
        productIndex: '',
        name: '',
        region: '',
        percentPass: '',
        inReserveDate: ''
      },
      addInreserveRules: {
        warehouse: [{ required: true, message: '请选择仓库', trigger: 'blur' }],
        productIndex: [
          { required: true, message: '请选择产品种类', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请选择产品名称', trigger: 'blur' }
        ],
        region: [{ required: true, message: '请输入入库量', trigger: 'blur' }],
        percentPass: [
          { required: true, message: '请输入合格率', trigger: 'blur' }
        ],
        inReserveDate: [
          { required: true, message: '请输入入库时间', trigger: 'blur' }
        ]
      },
      //新增出库表单
      addOutReserveForm: {
        warehouse: '',
        operator: '',
        productIndex: '',
        region: '',
        percentPass: '',
        inReserveDate: ''
      },
      addOutReserveRules: {
        region: [
          { required: true, message: '请输入入库时间', trigger: 'blur' }
        ],
        percentPass: [
          { required: true, message: '请输入入库时间', trigger: 'blur' }
        ],
        inReserveDate: [
          { required: true, message: '请输入入库时间', trigger: 'blur' }
        ]
      },
      //新增入库表单校验
      InReserveFormRules: [],
      //产品种类
      InverntoryTypes: [],
      sensor_txt: '',
      // 当前页数
      currentPage: 1,
      // 每页显示条目个数
      pageSize: 10,
      // 总条数
      total: 0
    }
  },
  mounted() {
    this._getWarehouseList()
    this._getInventoryType()
    this._getInventoryManage()
    this._getInventoryCount()
  },
  methods: {
    // 查看
    handleLook(row) {
      var data = {
        id: row.id,
        displayName: row.displayName,
        size: row.size,
        qualified: row.qualified,
        create_time: row.create_time,
        operator: row.operator
      }
      this.$router.push({ path: 'reserveDetail', query: data })
    },
    // 出库弹框
    handleOutReserve(row) {
      debugger;
      console.log(row)
      this.addOutReserveForm.id = row.id
      this.addOutReserveForm.warehouse = row.displayName
      this.addOutReserveForm.warehouse_id = row.warehouse_id
      this.addOutReserveForm.operator = row.operator
      this.addOutReserveForm.name = row.name
      this.addOutReserveForm.productIndex = row.type
      this.addOutReserveForm.region = ''
      this.addOutReserveForm.percentPass = ''
      this.addOutReserveForm.inReserveDate = ''
      this.outResverDialog = true
    },
    // 出库
    _updatePlacing(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.outResverDialog = false
          var data = {
            companyId: this.companyId,
            inventoryId: this.addOutReserveForm.id,
            warehouse: this.addOutReserveForm.warehouse,
            warehouse_id: this.addOutReserveForm.warehouse_id,
            name: this.addOutReserveForm.name,
            type: this.addOutReserveForm.productIndex,
            size: this.addOutReserveForm.region,
            qualified: this.addOutReserveForm.percentPass,
            io_time: this.addOutReserveForm.inReserveDate,
            operator: this.companyId,
            io_type: 2
          }
          updatePlacing(data).then(res => {
            if (res.statusCode === 1) {
              this.$message({ message: res.message, type: 'success' })
              this.$refs[formName].resetFields();
              this._getInventoryManage();
            } else {
              this.$message({ message: res.message, type: 'warning' })
            }
          })
        } else {
          return false
        }
      })
    },
    // 产品种类
    changType() {
      this.addInReserveForm.operator = this.InverntoryTypes[
        this.addInReserveForm.productIndex
      ].operator
    },
    search() {
      this.currentPage = 1
      this._getInventoryManage()
      this._getInventoryCount()
    },
    //切换仓库
    changReserve() {
      this.sensor_txt = ''
      this.addInReserveForm.warehouse = this.value
      this._getInventoryManage()
      this._getInventoryCount()
    },
    // 增加入库
    _insertWarehousing(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false
          var data = {
            companyId: this.companyId,
            warehouseId: this.addInReserveForm.warehouse,
            name: this.addInReserveForm.name,
            type: this.InverntoryTypes[this.addInReserveForm.productIndex].name,
            size: this.addInReserveForm.region,
            qualified: this.addInReserveForm.percentPass,
            io_time: this.addInReserveForm.inReserveDate,
            operator: this.companyId,
            io_type: 1
          }
          insertWarehousing(data).then(res => {
            if (res.statusCode === 1) {
              this.$message({ message: res.message, type: 'success' })
              this.$refs[formName].resetFields()
              this._getInventoryManage();
            } else {
              this.$message({ message: res.message, type: 'warning' })
            }
          })
        } else {
          return false
        }
      })
    },
    handleEdit(index, row) {},
    // 新增入库
    showAddinReserve(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 新增出库
    showAddoutReserve(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    //获取仓库列表（下拉框）
    _getWarehouseList() {
      var data = {
        companyId: this.companyId
      }
      getWarehouseList(data).then(res => {
        if (res.statusCode === 1) {
          this.options = res.result
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 获取产品种类
    _getInventoryType() {
      var data = {
        companyId: this.companyId
      }
      getInventoryType(data).then(res => {
        if (res.statusCode === 1) {
          this.InverntoryTypes = res.result
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 获取仓库列表
    _getInventoryManage() {
      this.loading = true
      var data = {
        companyId: this.companyId,
        warehouseId: this.value,
        displayName: this.sensor_txt,
        page: this.currentPage,
        pageSize: this.pageSize
      }
      getInventoryManage(data).then(res => {
        if (res.statusCode === 1) {
          this.tableData = res.result
          this.loading = false
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },

    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.currentPage = val
      this._getInventoryManage()
      this._getInventoryCount()
    },

    // 获取仓库库存数量
    _getInventoryCount() {
      var data = {
        companyId: this.companyId,
        warehouseId: this.value
      }
      getInventoryCount(data).then(res => {
        if (res.statusCode === 1) {
          this.total = res.result
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    }
  },
  computed: {
    companyId() {
      return MyStorage.getItem('companyId')
    },
    companyName() {
      return MyStorage.getItem('companyName')
    },
    warehouseName() {
      return
    }
  }
}
</script>
<style>
.inventory-header-div {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin: 20px 20px 10px 20px!important;
}
.inventory-header-div .title {
  margin-right: 30px;
}
.el-option-title {
  width: 300px;
}
.page {
  padding-top: 10px;
  text-align: center;
}
</style>
