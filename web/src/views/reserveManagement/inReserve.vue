<template>
  <div>
    <div class="inventory-header-div">
      <el-select style="padding-right: 10px;"
        v-model="inReserveValue"
        placeholder="请选择仓库"
        class="el-option-title"
        @change="inReserveChange"
      >
        <el-option
          v-for="item in inReserveOptions"
          :key="item.id"
          :label="item.display_name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-input v-model="sensor_txt" class="el-option-title" placeholder="请输入要搜索的产品名称" />
      <el-button type="primary" style="margin-left:10px;" @click="search">搜索</el-button>
    </div>
    <div style="margin:0px 20px">
      <el-table v-loading="loading" :data="inReserveTableData" style="width: 100%">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="type" label="产品种类"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="size" label="入库量"></el-table-column>
        <el-table-column prop="qualified" label="入库合格率"></el-table-column>
        <el-table-column prop="displayName" label="仓库名称"></el-table-column>
        <el-table-column prop="create_time" label="入库时间"></el-table-column>
        <el-table-column prop="operator" label="操作员"></el-table-column>
      </el-table>
    </div>
    <div class="page" v-show="total > 5">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
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
      // 入库表格数据
      inReserveTableData: [],
      //下拉仓库列表

      inReserveOptions: [],
      // 仓库id
      inReserveValue: '',
      // 页数
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // // 总条数
      total: 0,
      sensor_txt: '',
      loading: true
    }
  },
  mounted() {
    this._getWarehouseList()
  },
  methods: {
    search() {
      this.currentPage = 1
      this._insertWarehousesCount()
      this._insertWarehousesList()
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val
      this._insertWarehousesList()
      this._insertWarehousesCount()
    },

    //获取仓库列表（下拉框）
    _getWarehouseList() {
      var data = {
        companyId: this.companyId
      }
      getWarehouseList(data).then(res => {
        this.inReserveOptions = res.result
        if (this.inReserveOptions.length > 0) {
          this.inReserveValue = this.inReserveOptions[0].id
        }
        this._insertWarehousesList()
        this._insertWarehousesCount()
      })
    },
    // 仓库切换
    inReserveChange() {
      this.sensor_txt = ''
      this._insertWarehousesList()
      this._insertWarehousesCount()
    },
    // 获取入库列表
    _insertWarehousesList() {
      this.loading = true
      var data = {
        companyId: this.companyId,
        warehouseId: this.inReserveValue,
        ioType: 1,
        name: this.sensor_txt,
        type: '',
        page: this.currentPage,
        pageSize: this.pageSize
      }
      insertWarehousesList(data).then(res => {
        if (res.statusCode === 1) {
          this.inReserveTableData.length = 0
          this.inReserveTableData = [...res.result]
          this.loading = false
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    // 入库列表数量
    _insertWarehousesCount() {
      var data = {
        companyId: this.companyId,
        warehouseId: this.inReserveValue,
        ioType: 1,
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
