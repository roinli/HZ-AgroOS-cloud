<template>
  <div class="report_manage">
    <el-select v-model="greenhouse" @change="changeGreenhouseHandler" placeholder="请选择单元">
      <el-option
        v-for="item in greenhouseList"
        :key="item.areaId"
        :label="item.areaName"
        :value="item.areaId"
      ></el-option>
    </el-select>
    <el-select @change="changedeviceNameHandler" v-model="sensor" placeholder="请选择传感器">
      <el-option
        v-for="item in sensorList"
        :key="item.deviceId"
        :label="item.deviceName"
        :value="item.deviceId"
      ></el-option>
    </el-select>
    <el-divider></el-divider>
    <div v-if="this.$route.query.type==0" class="report-name"  >
      企业名称：{{companyName}}———单元名称：{{displayName}}——传感器名称：{{deviceName}}
    </div>
    <div v-if="this.$route.query.type==3" class="report-name" >
      企业名称：{{companyName}}———仓库名称：{{displayName}}——传感器名称：{{deviceName}}
     <!-- <h2>企业ID：{{companyId}}———区域Id：{{greenhouse}}——传感器ID：{{sensor}}</h2>-->
    </div>
    <div class="report-data">
      <div class="report-date">
        <div @click="changeData(0)" :class="{'active':strategy==0}">实时图</div>
        <div @click="changeData(1)" :class="{'active':strategy==1}">最高值</div>
        <div @click="changeData(2)" :class="{'active':strategy==2}">最低值</div>
        <div @click="changeData(3)" :class="{'active':strategy==3}">平均值</div>
      </div>
      <div class="report-time">
        <el-date-picker
          v-model="time"
          type="datetimerange"
          value-format="yyyy-MM-dd hh:mm:ss"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeTimeHandler"
        ></el-date-picker>
      </div>
      <div class="report-export">
         <el-button type="primary" @click="exportExcelData()">导出excel</el-button>
      </div>
    </div>
    <div class="data">
      <!-- <IEcharts :option="bar" :loading="loading" /> -->
      <VxEcharts :XData="XData" :YData="YData"></VxEcharts>
      <!-- <chart style="width:100%" ref="chart1" :options="bar" :loading="loading" :auto-resize="true"></chart> -->
    </div>
  </div>
</template>
<script>
// import echarts from 'echarts'
import request from '@/utils/request'
import { parseTime } from '@/utils/index.js'
import VxEcharts from './vxEcharts'
import MyStorage from '@/utils/cache'
import { getAreaList, getAllDataList, getReportDeviceList,exportExcelData } from '@/api/report'
export default {
  components: {
    VxEcharts
  },
  data() {
    return {
      XData: [],
      YData: [],
      loading: false,
      greenhouse: this.$route.query.areaId,
      sensor: this.$route.query.id,
      greenhouseList: [],
      sensorList: [],
      displayName: this.$route.query.displayName,
      deviceName: this.$route.query.deviceName,
      strategy: 0,
      time: [parseTime(new Date()).substring(0,10)+' 00:00:00', parseTime(new Date()).substring(0,10)+' 23:59:59'],
      bar: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        title: {
          text: '报表数据'
        },
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: {
          name: 'Sales',
          type: 'line',
          data: []
        }
      }
    }
  },
  computed: {
    companyId() {
      return MyStorage.getItem('companyId')
    },
    companyName() {
      return MyStorage.getItem('companyName')
    }
  },
  mounted() {

    var query = this.$route.query
    var data = {
      companyId: this.companyId,
      type: this.$route.query.type
    }
    getAreaList(data).then(res => {
      if (res.statusCode === 1) {
        this.greenhouseList.lenght = 0
        this.greenhouseList = [...res.result]
        this.getReportDeviceList()
        this.getAllDataList()
      } else {
        this.$message({ message: res.message, type: 'warning' })
      }
    })
  },
  methods: {
    exportExcelData() {
      var data = {
        companyId: this.companyId,
        areaId: this.greenhouse,
        deviceId: this.sensor,
        startTime: this.time[0].substring(0,10),
        endTime: this.time[1].substring(0,10)
      }
      debugger
      if(data.startTime == data.endTime){
        data.endTime = new Date(data.endTime)
        data.endTime.setDate(data.endTime.getDate() + 1);
        data.endTime = data.endTime.getFullYear() + '-' + (data.endTime.getMonth() + 1) + '-' + data.endTime.getDate()
      }
      let p = 'companyId='+data.companyId+'&areaId='+data.areaId +'&deviceId='+ data.deviceId +'&startTime='+data.startTime+'&endTime='+data.endTime
      window.location.href = 'http://111.229.48.239:12005/report/exportExcelData?'+p;
      //exportExcelData(  )
    },
    getReportDeviceList() {
      const loading = this.$loading({
        lock: true,
        text: '正在加载...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var query = this.$route.query
      var para = {
        companyId: this.companyId,
        areaId: this.greenhouse
      }
      getReportDeviceList(para).then(res => {
        if (res.statusCode === 1) {
          this.sensorList.length = 0
          this.sensorList = [...res.result]
          if (this.sensorList.length > 0) {
            this.sensor = this.sensorList[0].deviceId
          }
          this.getAllDataList()
          loading.close()
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    changeGreenhouseHandler(val) {
      var area = this.greenhouseList.find(element => element.areaId == val)
      this.displayName = area.areaName
      this.sensor = ''
      this.getReportDeviceList()
    },
    changedeviceNameHandler(val) {
      var device = this.sensorList.find(element => element.deviceId == val)
      this.deviceName = device.deviceName
      this.getAllDataList()
    },
    getAllDataList() {
      const loading = this.$loading({
        lock: true,
        text: '正在加载数据...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var data = {
        companyId: this.companyId,
        areaId: this.greenhouse,
        deviceId: this.sensor,
        strategy: this.strategy,
        startTime: this.time[0],
        endTime: this.time[1]
      }
      getAllDataList(data).then(res => {
        this.bar.xAxis.data.length = 0
        this.bar.series.data.lenght = 0
        this.XData = [...res.result.x]
        this.YData = [...res.result.y]
        this.bar.xAxis.data = [...res.result.x]
        this.bar.series.data = res.result.y
        loading.close()
      })
    },
    changeData(val) {
      this.strategy = val
      this.getAllDataList()
    },
    changeTimeHandler() {
      this.getAllDataList()
    }
  }
}
</script>
<style lang="scss" scoped>
.report_manage {
  margin-left: 20px;
  margin-top: 10px;
  min-width: 500px;
}
.report-name {
  font-size: 14px;
  min-width: 500px;
}
.report-data {
  height: 50px;
  margin-top: 10px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 100px;
}
.report-date {
  display: flex;
  align-items: center;
  div {
    margin-left: 5px;
    width: 80px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #409eff;
    cursor: pointer;
    color: #409eff;
  }
  div:hover {
    color: #ffffff;
    background: #409eff;
  }
  .active {
    color: #ffffff;
    background: #409eff;
  }
}
.report-time {
  display: flex;
  align-items: center;
}
.report-export {
  display: flex;
  align-items: center;
}
.data {
  margin-top: 20px;
  height: 600px;
}
</style>
