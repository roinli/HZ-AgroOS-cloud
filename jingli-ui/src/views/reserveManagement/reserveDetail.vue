<template>
  <div class="margin-left: 20px;">

    <div class="product-detail" style="margin-top: 20px; margin-bottom: 10px; ">产品信息</div>
    <div style="margin:0px 20px">
      <el-table :data="tableDataProduct" style="width: 100%">
        <el-table-column prop="companyName" label="企业名称"></el-table-column>
        <el-table-column prop="id" label="产品编号"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="type" label="产品种类"></el-table-column>
        <el-table-column prop="displayName" label="仓库名称"></el-table-column>
        <el-table-column prop="size" label="库存"></el-table-column>
      </el-table>
    </div>

    <div class="product-detail" style="margin-top: 20px; margin-bottom: 10px; ">入库记录</div>
    <div style="margin:0px 20px">
      <el-table :data="tableDataIn" style="width: 100%">
        <el-table-column type="index" label="编号" width="220px" align="center"></el-table-column>
        <el-table-column prop="size" label="入库量"></el-table-column>
        <el-table-column prop="qualified" label="入库合格率"></el-table-column>
        <el-table-column prop="displayName" label="仓库名称"></el-table-column>
        <el-table-column prop="create_time" label="入库时间"></el-table-column>
        <el-table-column prop="operator" label="操作员"></el-table-column>
      </el-table>
    </div>

    <div class="product-detail" style="margin-top: 20px;">出库记录</div>

    <div style="margin:0px 20px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="编号" width="220px" align="center"></el-table-column>
        <el-table-column prop="size" label="出库量"></el-table-column>
        <el-table-column prop="qualified" label="出库合格率"></el-table-column>
        <el-table-column prop="displayName" label="仓库名称"></el-table-column>
        <el-table-column prop="create_time" label="出库时间"></el-table-column>
        <el-table-column prop="operator" label="操作员"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getViewProInfo, getViewOutgoingRecords } from '@/api/reserveInfo'
import MyStorage from '@/utils/cache'
export default {
  data() {
    return {
      tableDataProduct: [],
      tableDataIn: [],
      tableData: [],
      ViewProInfo: [],
    }
  },
  created() {
    this.tableDataIn.push({
      index:'1',
      size:this.$route.query.size,
      qualified:this.$route.query.qualified,
      displayName:this.$route.query.displayName,
      create_time:this.$route.query.create_time,
      operator:this.$route.query.operator
    });
    this._getViewProInfo()
    this._getViewOutgoingRecords()
  },
  computed: {
    companyId() {
      return MyStorage.getItem('companyId')
    },
    companyName() {
      return MyStorage.getItem('companyName')
    }
  },
  methods: {
    _getViewProInfo() {
      var data = {
        inventoryId: this.$route.query.id
      }
      getViewProInfo(data).then(res => {
        if (res.statusCode === 1) {
          this.ViewProInfo = res.result;
          this.tableDataProduct.push({
            id:this.ViewProInfo.id,
            name:this.ViewProInfo.name,
            type:this.ViewProInfo.type,
            size:this.ViewProInfo.size,
            displayName:this.$route.query.displayName,
            companyName:this.companyName
          })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    _getViewOutgoingRecords() {
      var data = {
        inventoryId: this.$route.query.id
      }
      getViewOutgoingRecords(data).then(res => {
        if (res.statusCode === 1) {
          this.tableData = res.result
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    }
  }
}
</script>

<style>
.reserve-detail {
  margin-left: 30px;
  margin-top: 20px;
  height: 20px;
  padding-left: 10px;
  line-height: 20px;
  border-left: 2px solid #ddd;
}
.reserve-company {
  height: 50px;
  margin-left: 30px;
  line-height: 50px;
  font-size: 14px;
}
.product-detail {
  margin-left: 30px;
  height: 20px;
  line-height: 20px;
  border-left: 2px solid #ddd;
  padding-left: 5px;
  font-size: 14px;
  margin-bottom: 10px;
}
.product-div {
  margin-left: 30px;
  font-size: 14px;
}
.product-div > div {
  margin: 5px 0px;
}
</style>
