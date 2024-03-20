<template>
  <div style="margin-top:20px;margin-left:20px;">
    <div>
      <div class="row" v-for="(row ,i) in bacthData">
        <div style="width: 30%;">
            <canvas width="200px" height="100px"   :id="row.barcode+'br'" class="imgC"></canvas >
        </div>
        <div style="width: 30%;">
          <div  :id="row.barcode+'qr'" class="imgC" ></div>
        </div>
        <div style="width: 20%;">
            <p class="row-p">是否审核：{{row.isReview == 1 ?'已通过' : '未通过'}}</p>
            <p class="row-p">是否上架：{{row.isShelve == 1 ?'已上架' : '已下架'}}</p>
            <p class="row-p">上市时间：{{row.listedTime}}</p>
        </div>
        <div style="width: 20%;display: flex">
          <div style="margin-left: 5px;">
            <p class="row-p"><el-button size="mini" icon="el-icon-date" type="primary" @click="tjqxbb(row)" title="曲线报表">曲线报表</el-button></p>
            <p class="row-p"><el-button size="mini" icon="el-icon-date" type="primary" @click="getScanArea(row)" title="曲线报表">区域分布</el-button></p>
          </div>
        </div>
      </div>
    </div>
    <!-- 曲线报表 -->
    <el-dialog :visible.sync="scanAreaDialog" :modal="false" class="scanAreaDialog800" width="800" height="500" title="曲线报表">
      <el-date-picker style="margin-bottom: 10px;"
        v-model="datePicker"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd hh:mm:ss"
      ></el-date-picker>
      <el-button style="margin-left:10px;" @click="tjqxbb" type="primary">查询</el-button>
      <div id="container1" style="width: 750px;height: 400px;"></div>
    </el-dialog>
    <el-dialog :visible.sync="scanAreaDialog2" :modal="false" class="scanAreaDialog800" width="800" height="500" title="区域分布图">
      <div id="container2" style="width: 750px;height: 400px;"></div>
    </el-dialog>
  </div>
</template>

<script>
import china from 'echarts/map/json/china.json'
import { parseTime } from '@/utils/index.js'
import { queryList } from '@/api/user'
import MyStorage from '@/utils/cache'
import QRCode from 'qrcodejs2';
import JsBarcode from 'jsbarcode';
import Canvas from 'canvas';
import {
  getSourceList,
  getSourceCount,
  addProduct,
  delProduct,
  getBatchByList,
  updateArchiveFinish,
  addBatch,
  updateBatch,
  delBatch,
  updateShelves,
  getScanCount,
  getScanArea
} from '@/api/source'

var host=location.protocol+"//"+location.hostname+":"+location.port;
export default {
  data() {
    return {
      datePicker: [],
      distributeDialog: false,
      scanAreaDialog: false,
      scanAreaDialog2: false,
      distributeForm: {
        time: '',
        loc: '',
        user: ''
      },
      machiningFrom: {
        time: '',
        content: '',
        user: ''
      },

      machiningDialog: false,
      testDetailDialog: false,
      loading: true,
      testDetail: {
        type: '',
        value: ''
      },
      addDialogVisible: false,
      testingRecDialogVisible: false,
      bacthData: [],
      testForm: {
        time: '',
        project: '',
        Detail: []
      },
      batchForm: {
        batchId: '',
        productId: '',
        companyId: '',
        listedTime: '',
        quotaDesc: '',
        testingRec: [],
        machiningRec: [],
        distributeRec: []
      },
      batchFormRule: {
        listedTime: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        quotaDesc: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ]
      },
      testFormRule: {
        time: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        project: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ]
      },
      machiningFromRule: {
        time: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        user: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ]
      },
      distributeFormRule: {
        time: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        user: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        loc: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ]
      },
      formRule: {
        productName: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ]
      },
      userList: [],
      isAdd: true
    }
  },
  computed: {
    companyId() {
      return MyStorage.getItem('companyId')
    }
  },
  created() {
    this.getDataList()
    this.queryList()
    this.initDatePicker()
  },
  methods: {
    bandBr:function(text){
      $("#"+text+"br").JsBarcode(text);
    },
    bindQRCode:  (text)=> {
      if($("#"+text+"qr").find("img").length<=0){
        new QRCode(text+'qr', {
          text: host+'/sy/index.html?code='+text,
          width: 400,
          height: 400,
          colorDark: "#333333", //二维码颜色
          colorLight: "#ffffff", //二维码背景色
          correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
        })
      }
    },
    initDatePicker(){
      var st = new Date();
      st.setMonth(st.getMonth()-6);
      st = parseTime(st).substring(0,10)+' 00:00:00';
      var et = parseTime(new Date()).substring(0,10)+' 23:59:59'
      this.datePicker.push(st);
      this.datePicker.push(et);
    },
    tjqxbb:function(){
      if(!this.datePicker){
        this.datePicker = [];
        this.initDatePicker()
      }
      this.scanAreaDialog = true;
      setTimeout(()=>{
        var myChart =  this.$echarts.init(document.getElementById("container1"),"dark");
        myChart.clear();
        myChart.showLoading({
          text: '正在努力的读取数据中...',    //loading话术
        });
        var para = {
          companyId: this.companyId,
          productId: this.$route.query.productId,
          startTime:this.datePicker[0],
          endTime:this.datePicker[1]
        };
        getScanCount(para).then(res => {
          if (res.statusCode === 1) {
            myChart.hideLoading();
            var listss=[];
            var listName=[];
            var listDateCope=[];
            //值
            var list = res.result.y;
            var listData = res.result.x;
            for(var i=0;i<list.length;i++){
              var listObj={};
              listName.push(list[i].name)
              listObj.name=list[i].name;
              listObj.type="line";
              listObj.data=list[i].data;
              listss.push(listObj);
            }
            //日期
            for(var j=0;j<listData.length;j++){
              listDateCope.push(listData[j]);
            }

            var option = {
//              title : {
//                text: '扫码统计',
//                subtext: '',
//                x:'center'
//              },
              tooltip : {
                trigger: 'axis'
              },
              legend: {
                orient: 'horizontal',
                x:'center',
                y:'bottom',
                data:listName
              },
              calculable : true,
              xAxis : [
                {
                  type : 'category',
                  boundaryGap : false,
                  data :listDateCope
                }
              ],
              yAxis : [
                {
                  type : 'value'
                }
              ],
              series : listss
            };
            myChart.setOption(option);
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        })
      },200);
    },
    getScanArea:function(){
      this.scanAreaDialog2 = true;
      setTimeout(()=>{
        var para = {
          companyId: this.companyId,
          productId: this.$route.query.productId,
        }
        this.$echarts.registerMap('china', china); // 注册地图
        var mapChart = this.$echarts.init(document.getElementById('container2'));
        mapChart.clear();
        mapChart.showLoading({
          text: '正在努力的读取数据中...',    //loading话术
        });
        var option = {
          backgroundColor: '#021926',  		// 图表背景色
          geo: {
            map: 'china',
            itemStyle: {					// 定义样式
              normal: {					// 普通状态下的样式
                areaColor: 'transparent',
                borderColor: '#3fdaff',
                borderWidth: 2,
                shadowColor: 'rgba(63, 218, 255, 0.5)',
                shadowBlur: 30
              },
              emphasis: {					// 高亮状态下的样式
                areaColor: '#2B91B7',
              }
            }
          },
          title : {
            text: '区域统计',
            textStyle:{
              color:'#FFFFFF',
            },
            subtext: '',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: function(data){
              return data.name+ data.seriesName + "扫码:"+data.data.value[2]+"次";
            }
          },
          legend: {
            orient: 'vertical',
            x:'right',
            y:'bottom',
            data:[],
            textStyle:{
              color:'#FFFFFF',
            }
          },
          toolbox: {
            show: true,
            orient : 'horizontal',
            x: 'left',
            y: 'bottom',
            feature : {
              mark : {show: false},
              dataView : {
                show: true,
                readOnly: true,
                backgroundColor:"#323c48",
                textareaColor:"#323c48",
                textColor:"#FFFFFF",
                buttonColor:"#CCCCCC",
                iconStyle:{
                  normal:{
                    color:"#ffffff"
                  }
                },
                optionToContent: function(opt) {
                  var optArr=[];
                  var series = opt.series;
                  var table='<table style="width:95%;text-align:center;margin:0 auto;"><tbody><tr style="min-height:25px;line-height:25px;border:1px solid #fff;border-bottom:none;">'
                    + '<td style="color:#fff;">名称</td>'
                    + '<td style="color:#fff;">扫码区域</td>'
                    +'<td style="color:#fff;">扫码次数</td>'
                    + '</tr>';
                  for(var i=0;i<series.length;i++){
                    table+='<tr style="min-height:25px;line-height:25px;border:1px solid #fff;"><td style="color:#fff">' + series[i].name + '</td>';
                    var a=series[i].data;
                    table+='<td>';
                    for(var j=0;j<series[i].data.length;j++){
                      table+='<div style="color:#fff">'+series[i].data[j].name+'</div>';
                    }
                    table+='</td><td>';
                    for(var k=0;k<series[i].data.length;k++){
                      table+='<div style="color:#fff">'+series[i].data[k].value[2]+'</div>';
                    }
                    table+='</td><tr>';
                  }
                  table += '</tbody></table>';
                  return table;
                }
              },
              restore : {show: false},
              saveAsImage : {show: false}
            }
          },
          series: []

        }

        mapChart.setOption(option);
        getScanArea(para).then(res => {
          if (res.statusCode === 1) {
            mapChart.hideLoading();
            for (var i = 0; i < res.result.length; i++) {
              option.series.push({
                roam: false,
                name: res.result[i].name,
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(res.result[i].data),
                symbolSize: function(val) {
                  if(val < 50){
                    return 10;
                  }else if(val >= 50 && val < 200){
                    return 12;
                  }else{
                    return 15;
                  }
                },
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false,
                    textStyle: {
                      color: '#fff',
                      fontSize: 20,

                    }
                  },
                  emphasis: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    opacity: 1
                  }
                },
                animationDelay: function(idx) {
                  return idx * 10;
                }

              });
              option.legend.data.push(res.result[i].name)
            }
            mapChart.setOption(option);
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        })
      })
    },
    Shelve(id, shelve) {
      var para = {
        batchIds: id,
        shelves: shelve
      }
      updateShelves(para).then(res => {
        if (res.statusCode === 1) {
          this.getDataList()
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    del(row) {
      var para = {
        productId: this.$route.query.productId,
        batchIds: row.id
      }
      delBatch(para).then(res => {
        if (res.statusCode === 1) {
          this.getDataList()
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },

    edit(row) {
      this.isAdd = false
      this.batchForm = row
      this.batchForm.batchId = row.id
      if (this.batchForm.testingRec.length>0) {
        if(row.testingRec.constructor==Array){
          this.batchForm.testingRec = row.testingRec;
        }else{
          this.batchForm.testingRec = row.testingRec.split('#')
        }
        this.batchForm.testingRec.forEach((item, index) => {
          if(this.batchForm.testingRec[index].constructor==String){
            this.batchForm.testingRec[index] = JSON.parse(this.batchForm.testingRec[index])
          }
        })
      }else{
        this.batchForm.testingRec=[];
      }

      if (this.batchForm.machiningRec.length>0) {
        if(row.machiningRec.constructor==Array){
          this.batchForm.machiningRec = row.machiningRec;
        }else{
          this.batchForm.machiningRec = row.machiningRec.split('#')
        }
        this.batchForm.machiningRec.forEach((item, index) => {
          if(this.batchForm.machiningRec[index].constructor==String){
            this.batchForm.machiningRec[index] = JSON.parse(this.batchForm.machiningRec[index])
          }
        })
      }else{
        this.batchForm.machiningRec=[];
      }
      if (this.batchForm.distributeRec.length>0) {

        if(row.distributeRec.constructor==Array){
          this.batchForm.distributeRec = row.distributeRec;
        }else{
          this.batchForm.distributeRec = row.distributeRec.split('#')
        }

        this.batchForm.distributeRec.forEach((item, index) => {
          if(this.batchForm.distributeRec[index].constructor==String){
            this.batchForm.distributeRec[index] = JSON.parse(this.batchForm.distributeRec[index])
          }
        })
      }else{
        this.batchForm.distributeRec=[];
      }
      this.addDialogVisible = true
    },
    Confim() {
      this.$refs.form.validate(valid =>{
        if (valid) {
          this.batchForm.productId = this.$route.query.productId
          this.batchForm.companyId = this.companyId
//          if(this.batchForm.testingRec.length<=0){
//            this.$message({ message:'检测记录不能为空', type: 'success' });
//            return false;
//          }
          this.batchForm.testingRec.forEach((item, index) => {
            this.batchForm.testingRec[index] = JSON.stringify(
            this.batchForm.testingRec[index]
          )
        })
//          if(this.batchForm.machiningRec.length<=0){
//            this.$message({ message:'加工记录不能为空', type: 'success' });
//            return false;
//          }
          this.batchForm.machiningRec.forEach((item, index) => {
            this.batchForm.machiningRec[index] = JSON.stringify(
            this.batchForm.machiningRec[index]
          )
        })
          this.batchForm.distributeRec.forEach((item, index) => {
            this.batchForm.distributeRec[index] = JSON.stringify(
            this.batchForm.distributeRec[index]
          )
        })
          this.batchForm.testingRec = this.batchForm.testingRec.join('#')

          this.batchForm.machiningRec = this.batchForm.machiningRec.join('#')

          this.batchForm.distributeRec = this.batchForm.distributeRec.join('#')

          if (this.isAdd) {
            addBatch(this.batchForm).then(res => {
              if (res.statusCode === 1) {
              this.getDataList()
              this.addDialogVisible = false
              this.$message({ message: res.message, type: 'success' })
            } else {
              this.$message({ message: res.message, type: 'warning' })
            }
          })
          } else {
            updateBatch(this.batchForm).then(res => {
              if (res.statusCode === 1) {
              this.getDataList()
              this.addDialogVisible = false
              this.$message({ message: res.message, type: 'success' })
            } else {
              this.$message({ message: res.message, type: 'warning' })
            }
          })
          }
        }
      });
    },
    deleteDistribute(index) {
      this.batchForm.distributeRec.splice(index, 1)
    },
    deleteMachining(index) {
      this.batchForm.machiningRec.splice(index, 1)
    },
    distributeConfim() {
      this.$refs.distributeForm.validate(valid => {
        if (valid) {
          this.batchForm.distributeRec.push({
            time: this.distributeForm.time,
            loc: this.distributeForm.loc,
            user: this.distributeForm.user
          })
          this.distributeDialog = false
        }})
    },
    Adddistribute() {
      this.distributeForm.time = ''
      this.distributeForm.loc = ''
      this.distributeForm.user = ''
      this.distributeDialog = true
    },
    machConfim() {
      this.$refs.machiningFrom.validate(valid => {
        if (valid) {
          this.batchForm.machiningRec.push({
            time: this.machiningFrom.time,
            content: this.machiningFrom.content,
            user: this.machiningFrom.user
          })
          this.machiningDialog = false
        }})
    },

    AddMachiningRec() {
      this.machiningFrom.time = ''
      this.machiningFrom.content = ''
      this.machiningFrom.user = ''
      this.machiningDialog = true
    },
    deleteTest(index) {
      this.batchForm.testingRec.splice(index, 1)
    },
    testConfim() {
      this.$refs.testForm.validate(valid => {
        if (valid) {
          this.batchForm.testingRec.push({
            time: this.testForm.time,
            project: this.testForm.project,
            Detail: this.testForm.Detail
          })
          this.testingRecDialogVisible = false
        }
      });
    },
    deleteDetail(index) {
      this.testForm.Detail.splice(index, 1)
    },
    detailConfim() {
      this.testDetailDialog = false
      this.testForm.Detail.push({
        type: this.testDetail.type,
        value: this.testDetail.value
      })
    },
    addTestDetail() {
      this.testDetail.type = ''
      this.testDetail.value = ''
      this.testDetailDialog = true
    },
    addTest() {
      this.testForm.Detail = []
      this.testingRecDialogVisible = true
    },
    isReviewFrom(row) {
      if (row.isReview == 1) {
        return '通过'
      } else {
        return '不通过'
      }
    },
    isShelveFrom(row) {
      if (row.isReview == 1) {
        return '上架'
      } else {
        return '下架'
      }
    },
    add() {
      this.isAdd = true
      this.batchForm.productId = this.$route.query.id
      this.batchForm.companyId = this.companyId
      this.batchForm.listedTime = ''
      this.batchForm.quotaDesc = ''
      this.batchForm.testingRec = []
      this.batchForm.machiningRec = []
      this.batchForm.distributeRec = []
      this.addDialogVisible = true
    },
    getDataList() {
      this.loading = true
      var para = {
        productId: this.$route.query.productId
      }
      getBatchByList(para).then(res => {
        this.bacthData = res.result
        this.loading = false
        setTimeout(()=>{
          this.bacthData.forEach((v,i)=>{
            this.bindQRCode(v.barcode);
            this.bandBr(v.barcode);
          });
        },100);
      })
    },
    queryList() {
      var para = {
        page: 1,
        pageSize: 1000,
        companyId: this.companyId
      }
      queryList(para).then(res => {
        this.userList = res.result
      })
    }
  }
}
function convertData (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};
</script>
<style>
  .scanAreaDialog800>.el-dialog{
    width: 800px!important;
    height: 550px!important;
  }
  .el-range-separator{color: #C0C4CC !important;}
  .row{display: flex; background-color: #061E31;padding: 20px;margin-top: 10px;  }
  .row-p{line-height: 34px;}
  .imgC>img{
    width: 100px;
  }
  canvas{
    width: 200px;height: 100px;
  }
</style>
