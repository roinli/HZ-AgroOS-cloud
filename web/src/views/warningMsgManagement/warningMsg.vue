<template>
  <div class="all">
    <el-input class="search" v-model="content" placeholder="请输入要搜索的关键字"></el-input>
    <el-date-picker
      v-model="time"
      type="daterange"
      align="right"
      value-format="yyyy-MM-dd hh:mm:ss"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
    <el-button type="primary" @click="search">搜索</el-button>
    <el-badge :value="msgNum" class="item">
      <el-button size="small">消息</el-button>
    </el-badge>
    <span class="text">用户是否接收通知</span>
    <el-switch
      v-model="value1"
      active-color="#13ce66"
      @change="changeHandler"
      inactive-color="#ff4949"
    ></el-switch>
    <div style="margin-top:10px;">
      <el-table v-loading="loading" :data="tableData" tooltip-effect="dark" style="width: 100%;">
        <el-table-column prop="warningType" label="类型"   :formatter="warningType" style="width: 25%;"></el-table-column>
        <el-table-column prop="sourceType" label="预警来源"   :formatter="sourceType" style="width: 25%;"></el-table-column>
        <el-table-column prop="displayName" label="地址" style="width: 25%;"></el-table-column>
        <el-table-column prop="deviceName" label="设备名称" style="width: 25%;"></el-table-column>
        <el-table-column prop="warningInfo" label="预警信息" style="width: 25%;"></el-table-column>
        <el-table-column prop="createTime" label="时间" style="width: 25%;"></el-table-column>
      </el-table>
      <div style=" margin-top: 10px;margin-left:10px">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="pageSize"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import MyStorage from '@/utils/cache'
import {
  getWarningCount,
  getWarningList,
  getWarningNoReadCount,
  updatePushState
} from '@/api/warningMsg'
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      content: '',
      total: 0,
      pageSize: 10,
      msgNum: 0,
      page: 1,
      time: [],
      value1: ''
    }
  },
  computed: {
    companyId() {
      return MyStorage.getItem('companyId')
    }
  },
  created() {
    this.getWarningCount()
    this.getWarningList()
    this.getWarningNoReadCount()
  },
  methods: {
    sourceType(val){
      if (val.sourceType=== '0') {
        return '区域'
      }
      if (val.sourceType=== '3') {
        return '仓库'
      }
      return val.sourceType
    },
    warningType(val){//0预警 1断线 2发送定时消息失败
      if (val.warningType=== '0') {
        return '预警'
      }
      if (val.warningType=== '1') {
        return '断线'
      }
      if (val.warningType=== '2') {
        return '发送定时消息失败'
      }
      return val.warningType
    },
    handleCurrentChange(val) {
      this.page = val
    },
    getWarningCount() {
      var data = {
        companyId: this.companyId,
        content: this.content,
        startTime: this.time[0],
        endTime: this.time[1]
      }
      getWarningCount(data).then(res => {
        this.total = res.result
      })
    },
    getWarningList() {
      this.loading = true
      var data = {
        companyId: this.companyId,
        content: this.content,
        startTime: this.time[0],
        endTime: this.time[1],
        page: this.page,
        pageSize: this.pageSize
      }
      getWarningList(data).then(res => {
        this.loading = false
        this.tableData.length = 0
        this.tableData = [...res.result]
      })
    },
    search() {
      this.getWarningCount()
      this.getWarningList()
    },
    changeHandler(val) {
      var pushState = 0
      if (val) {
        pushState = 1
      }
      var data = {
        id: this.companyId,
        pushState: pushState
      }
      updatePushState(data).then(res => {
        if (res.statusCode === 1) {
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    getWarningNoReadCount() {
      var data = {
        companyId: this.companyId
      }
      getWarningNoReadCount(data).then(res => {
        this.msgNum = res.result
      })
    }
  }
}
</script>
<style>
.search {
  width: 200px;
}

.all {
  min-width: 850px;
  margin-top: 20px;
  margin-left: 20px;
}
.text {
  font-size: 14px;
  margin-left: 20px;
}
</style>
