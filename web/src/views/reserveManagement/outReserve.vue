<template>
  <div>
    <div class="inventory-header-div">
      <el-select
        style="padding-right: 10px;"
        v-model="outReserveValue"
        placeholder="请选择仓库"
        class="el-option-title"
        @change="outReserveChange"
      >
        <el-option
          v-for="item in outReserveOptions"
          :key="item.id"
          :label="item.display_name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-input v-model="sensor_txt" class="el-option-title" placeholder="请输入要搜索的产品名称" />
      <el-button type="primary" style="margin-left:10px;" @click="search">搜索</el-button>
    </div>
    <div style="margin:0px 20px">
      <el-table v-loading="loading" :data="outReserveTableData" style="width: 100%">
        <el-table-column type="index" label="编号"></el-table-column>
        <el-table-column prop="type" label="产品种类"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="size" label="出库量"></el-table-column>
        <el-table-column prop="qualified" label="出库合格率"></el-table-column>
        <el-table-column prop="displayName" label="仓库名称"></el-table-column>
        <el-table-column prop="create_time" label="出库时间"></el-table-column>
        <el-table-column prop="operator" label="操作员"></el-table-column>
      </el-table>
    </div>
    <div class="page" v-show="total > 5">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getWarehouseList,
  insertWarehousesList,
  insertWarehousesCount
} from '@/api/reserveInfo'
import MyStorage from '@/utils/cache'
import store from '@/store'
export default {
  data() {
    return {
      loading: true,
      // 出库表格数据
      outReserveTableData: [],
      //下拉仓库列表

      outReserveOptions: [],
      // 仓库id
      outReserveValue: '',
      // 页数
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // // 总条数
      total: 0,
      sensor_txt: ''
    }
  },
  mounted() {
    this._getWarehouseList()
    this._insertWarehousesList()
    this._insertWarehousesCount()
  },
  methods: {
    search() {
      this.currentPage = 1
      this._insertWarehousesCount()
      this._insertWarehousesList()
      // this.sensor_txt = ''
    },

    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val
      this._insertWarehousesList()
      this._insertWarehousesCount()
    },
    handleEdit(index, row) {},
    handleDelete(index, row) {},
    //获取仓库列表（下拉框）
    _getWarehouseList() {
      var data = {
        companyId: this.companyId
      }
      getWarehouseList(data).then(res => {
        this.outReserveOptions = res.result
      })
    },
    // 仓库切换
    outReserveChange() {
      this.sensor_txt = ''
      this._insertWarehousesList()
      this._insertWarehousesCount()
    },
    // 获取出库列表
    _insertWarehousesList() {
      this.loading = true
      var data = {
        companyId: this.companyId,
        warehouseId: this.outReserveValue,
        ioType: 2,
        page: this.currentPage,
        pageSize: this.pageSize,
        name: this.sensor_txt
      }
      insertWarehousesList(data).then(res => {
        if (res.statusCode === 1) {
          this.outReserveTableData.length = 0
          this.outReserveTableData = [...res.result]
          this.loading = false
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 出库列表数量
    _insertWarehousesCount() {
      var data = {
        companyId: this.companyId,
        warehouseId: this.outReserveValue,
        ioType: 2,
        name: this.sensor_txt
      }
      insertWarehousesCount(data).then(res => {
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
  /* margin-left: 20px;
  margin-top: 20px; */
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
