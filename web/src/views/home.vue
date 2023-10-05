<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <div class="home-nav">
      <!--<img class="navbar-bg" src="../assets/tit-bg.png"  />-->
      <div class="home-nav-l">
        <!--<img src="../assets/logo-long2.png">--><span style="position: absolute;margin-top: 9px;margin-left: 10px;font-size: 1.5em;font-weight: bold;color: #8edafb;">{{companyName}}</span>
      </div>
      <div class="home-nav-m">
        <div class="navbar-tit">
          <img  src="../assets/tit-font-bg1.png"  />
          <p>物联网云平台</p>
        </div>

        <ul>
          <li v-for="(m,i) in menu" v-if="i<=4" v-bind:class="{ cur : i==0 }">
            <a :href="'#'+m.url" :title="m.name">
                <svg  aria-hidden="true" class="svg-icon" style="width: 1em;height: 1em;vertical-align: middle"><use  xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#icon-'+m.img"></use></svg>
              {{m.name}}
              <img src="../assets/tit-sub.png" width="100%"/></a>
          </li>
        </ul>
      </div>
      <div class="home-nav-r">
        <ul>
          <div> <router-link  :to="{path:'/warningMsgManagement/warningMsg'}" >
            <svg  aria-hidden="true" class="svg-icon" style="width: 2em;height: 2em;margin-right: 10px;margin-top: 5px;">
              <use  xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-xiaoxi"></use>
            </svg>
          </router-link>
          </div>
          <div @click="logout"><svg  aria-hidden="true" class="svg-icon" style="width: 2em;height: 2em;margin-right: 10px;margin-top: 5px;"><use  xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-exit"></use></svg></div>
          <!--<div class="right-menu">-->
            <!--<el-dropdown class="avatar-container" trigger="click">-->
              <!--<div class="avatar-wrapper" style="margin-right: 20px;">-->
                <!--&lt;!&ndash;<img style="width: 40px;" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="user-avatar" />&ndash;&gt;-->
                <!--<svg  aria-hidden="true" class="svg-icon" style="width: 2em;height: 2em;margin-right: 10px;margin-top: 5px;"><use  xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-xiaoxi" class="user-avatar"></use></svg>-->
              <!--</div>-->
              <!--<el-dropdown-menu slot="dropdown" class="user-dropdown">-->
                <!--<el-dropdown-item divided>-->
                  <!--<span style="display:block;" @click="logout">退出登录</span>-->
                <!--</el-dropdown-item>-->
              <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->
          <!--</div>-->

        </ul>
      </div>

    </div>
    <div class="home">
      <div class="home-left">
        <div class="home-left-1">
          <div class="home-left-1-yubao">
            <div style="padding: 15px 20px 20px 20px;height: 255px;">
              <iframe scrolling="no" src="https://tianqiapi.com/api.php?style=tr&skin=peach" frameborder="0" style="width: 100%;height: 100%" allowtransparency="true"></iframe>
              <!--<iframe id=""  frameborder=0 src="weather.html" style="width: 100%;height: 100%"></iframe>-->
            </div>
        </div>
        </div>
        <div class="home-left-3">
          <div class="home-left-2-yubao">
            <div class="home-left-2-yubao-top">
              <div class="img"></div>
              <div style="font-size:12px;" class="text">设备状态</div>
            </div>
            <ul>
              <li style="width: 25%">
                <div style="height:170px;width:85%;">
                  <canvas id="chartjs-1"></canvas>
                  <div class="donut-inner">
                    <h5>共{{deviceInfo.deviceCount}}件</h5>
                  </div>
                </div>
              </li>
              <li style="width: 25%">
                <div style="height:170px;width:85%;">
                  <canvas id="chartjs-2"></canvas>
                  <div class="donut-inner">
                    <h5>共{{deviceInfo.runningCount}}件</h5>
                  </div>
                </div>
              </li>
              <li style="width: 25%">
                <div style="height:170px;width:85%;">
                  <canvas id="chartjs-3"></canvas>
                  <div class="donut-inner">
                    <h5>共{{deviceInfo.offlineCount}}件</h5>
                  </div>
                </div>
              </li>
              <li style="width: 25%">
                <div style="height:170px;width:85%;">
                  <canvas id="chartjs-4"></canvas>
                  <div class="donut-inner">
                    <h5>共{{deviceInfo.errorCount}}件</h5>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="home-left-2">
          <div class="home-left-2-yubao">
            <div class="home-left-2-yubao-top">
              <div class="img"></div>
              <div style="font-size:12px;" class="text">生产单元</div>
              <div class="search">
                 <input type="text" v-model="AreaListKeys" style="width: calc(100% - 46px);">
                <a href="javascript:void(0);" title="搜索">搜索</a>
              </div>
            </div>
            <ul style="height: 180px;overflow: auto;padding-right: 3px;width: calc(100% - 14px)">
              <li v-for="(item, i) in AreaList" :key="item.id" v-bind:class="{'active-li':item.id==areaId}" style="line-height: 20px;height: 28px;border-radius: 5px;" v-show="!item.display" @mouseenter="changeDevice(item.id)">
                <div>{{item.displayName}}</div>
                <a @click="todetial(item.id)">详情</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="home-mid">
        <div class="home-left-2" >
          <div class="home-left-2-yubao">
            <div class="home-left-2-yubao-top" style="position: relative">
              <!--<div  class="text" style="font-size: 12px;">-->
                <!--<el-select v-model="channel" placeholder="请选择">-->
                  <!--<el-option-->
                    <!--v-for="(item, index) in chooseList"-->
                    <!--:key="index"-->
                    <!--:label="item.text+'-'+item.id+'通道'"-->
                    <!--:value="index">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</div>-->
              <div class="img"></div>
              <div style="font-size:12px;" class="text">视频监控</div>
              <div style="transform: rotate(180deg);" class="img"></div>
              <a style="position: absolute;right: 10px;font-size: 12px;color: #88f9a2;top:5px;" @click="showVideo()" title="单机全屏显示">全屏</a>
            </div>

            <ul>
              <li >
                  <div class="video-data" style="height: 80px;padding: 0 10px" :title="channelObj.vide.displayName+channelObj.vide.deviceName" v-if="channelObj.vide && channelObj.vide.cameraType=='0' && !videoShow">
                    <iframe v-if="channelObj.op=='show'"  style="width: 100%;height: 100%" frameborder=0 name="showHere" scrolling=auto :src="'index_hk.html?url='+channelObj.vide.url+'&webPort='+channelObj.vide.webPort+'&userName='+channelObj.vide.userName+'&userPwd='+channelObj.vide.userPwd+'&channel='+channelObj.id+'&menu=false'"></iframe>
                    <img v-if="channelObj.op!='show'" :title="'单机播放'+channelObj.vide.displayName+channelObj.vide.deviceName+'-'+channelObj.id+'通道'" style="height: 100%;width: initial;cursor: pointer;" src="@/assets/video2.png" @click="play(channelObj)">
                  </div>
                  <div class="video-data" style="height: 80px;padding: 0 10px" :title="channelObj.vide.displayName+channelObj.vide.deviceName" v-if="channelObj.vide && channelObj.vide.cameraType=='1' && !videoShow">
                    <iframe v-if="channelObj.op=='show'" style="width: 100%;height: 100%" frameborder=0 name="showHere" scrolling=auto :src="'index_ys.html?url='+channelObj.vide.url+'&webPort='+channelObj.vide.webPort+'&userName='+channelObj.vide.userName+'&userPwd='+channelObj.vide.userPwd+'&channel='+channelObj.id+'&menu=false'"></iframe>
                    <img v-if="channelObj.vide.op!='show'" :title="'单机播放'+channelObj.vide.displayName+channelObj.vide.deviceName+'-'+channelObj.id+'通道'" style="height: 100%;width: initial;cursor: pointer;" src="@/assets/video2.png"  @click="play(channelObj)">
                  </div>
              </li>
              <!--<li v-for="(item ,i) in videoList">-->
                  <!--<div class="video-data" style="height: 80px;padding: 0 10px" :title="item.displayName+item.deviceName" v-if="item.cameraType=='0' && !videoShow">-->
                    <!--<iframe v-if="item.op=='show'"  style="width: 100%;height: 100%" frameborder=0 name="showHere" scrolling=auto :src="'index_hk.html?url='+item.url+'&webPort='+item.webPort+'&userName='+item.userName+'&userPwd='+item.userPwd+'&menu=false'"></iframe>-->
                    <!--<img v-if="item.op!='show'" :title="'单机播放'+item.displayName+item.deviceName" style="height: 100%;width: initial;cursor: pointer;" src="@/assets/video2.png" @click="play(item)">-->
                  <!--</div>-->
                  <!--<div class="video-data" style="height: 80px;padding: 0 10px" :title="item.displayName+item.deviceName" v-if="item.cameraType=='1' && !videoShow">-->
                    <!--<iframe v-if="item.op=='show'" style="width: 100%;height: 100%" frameborder=0 name="showHere" scrolling=auto :src="'index_ys.html?url='+item.url+'&webPort='+item.webPort+'&userName='+item.userName+'&userPwd='+item.userPwd+'&menu=false'"></iframe>-->
                    <!--<img v-if="item.op!='show'" :title="'单机播放'+item.displayName+item.deviceName" style="height: 100%;width: initial;cursor: pointer;" src="@/assets/video2.png"  @click="play(item)">-->
                  <!--</div>-->
              <!--</li>-->
            </ul>
          </div>
        </div>
        <div class="home-left-2">
          <div class="home-left-2-yubao">
            <div class="home-left-2-yubao-top">
              <div class="img"></div>
              <div style="font-size:12px;" class="text">地图导航</div>
              <div style="transform: rotate(180deg);" class="img"></div>
            </div>
            <div class="daohang"  @click="showMap()">
              <baidu-map style="width: 100%;height: 100%" :center="{lng: lng, lat: lat}" :zoom="13" >
                <bm-marker :position="{lng: lng, lat: lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                  <bm-label :content="companyName" style="color:red;font-size: 14px;"  :offset="{width: 30, height: -10}"/>
                </bm-marker>
              </baidu-map>
            </div>
          </div>
        </div>
        <div class="home-mid-2">
          <div class="home-left-2-yubao">
            <div class="home-left-2-yubao-top">
              <div class="img"></div>
              <div style="font-size:12px;" class="text">控制开关</div>
              <div class="change-nav">
                <span><i class="change-icon"></i>开</span>
                <span><i class="change-icon"></i>关</span>
              </div>
            </div>

            <ul style="height: 188px;overflow: auto;padding-right: 3px;width: calc(100% - 14px)"><!-- guan -->
              <li v-for="item in switchList" :key="item.id" v-bind:class="{'kai':item.value == 1,'guan':item.value != 1}" >
                  <p :title="item.deviceName">{{item.deviceName}}</p>
                  <span @click="areaMonitorP(item,index)"><i class="change-icon"></i></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="home-right">
        <div
          class="home-right-top"
          style="margin-bottom: 20px;
            background-image: url(static/img/1.17c12974.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            width:100%;
            height:240px;
            margin:0 0 20px 20px"
          >
         <!-- <div style="display: flex;
    align-items: center;padding: 5px;">
            <img style="width: 15px;height:15px;" src="@/assets/警报.png" alt />
            <span style="color:#DB692A;font-size:12px;">异常警报</span>
            <div class="search">
              <input type="text"><a href="javascript:void(0);" title="搜索">搜索</a>
            </div>
          </div>-->

          <div  class="home-right-toptit">
            <div class="img"></div>
            <div  class="text" style="font-size: 12px;">异常警报</div>
            <div class="search">
              <input  type="text" v-model="warningMessageKeys">
              <a  href="javascript:void(0);"  title="搜索">搜索</a>
            </div>
          </div>
          <ul style="height: 180px;overflow-y: auto;">
            <li   v-for="(item,index) in warningMessage"   :class="{ 'wei': item.deal_flag=='0' }" v-show="!item.display">
              <div><i></i><span>{{item.deviceName}}-{{item.warningInfo}}</span><a href="javascript:void(0)" title="" style="width: 30px;height: 28px;overflow: hidden">{{item.displayName}}</a></div>
              <span>{{item.deal_flag=='0'?'未解除':'已解除'}}</span>
            </li>
          </ul>
        </div>

        <div
          class="home-right-middle"
          style="margin-bottom: 20px;
              background-image: url(static/img/1.17c12974.png);
              background-size: 100% 100%;
              background-repeat: no-repeat;
              width:100%;
              height:265px;
              margin:0 0 20px 20px"
          >
          <!--<div style="display: flex;
    align-items: center;padding: 5px;">
            <img style="width: 15px;height:15px;" src="@/assets/参数.png" alt />
            <span style="color:#88F9A2;font-size:12px;padding: 5px;">传感参数</span>
          </div>-->
          <div  class="home-right-toptit">
            <div class="img"></div>
            <div  class="text" style="font-size: 12px;">传感参数</div>
            <div class="search">
              <input  type="text" v-model="SensorDeviceKeys">
              <a  href="javascript:void(0);" title="搜索">搜索</a>
            </div>
          </div>
          <ul class="chuanganqi" style="height: 145px;overflow: auto;padding-right: 3px;width: calc(100% - 40px)">
            <li v-for="(item ,index) in SensorDevice"  style="line-height: 28px;height: 28px;border-radius: 5px;padding-left: 5px;" v-bind:class="{'active-li':item.id==deviceId}" v-show="!item.display" @click="_getAllDataList(item.id)">
              <span style="height: 34px;overflow: hidden;font-size: 14px;">{{item.deviceName}}</span>
              <span style="margin-left:20px;font-size: 14px;">{{item.value}}</span>
            </li>
          </ul>
        </div>

        <div
          class="home-right-bottom"
          style="margin-bottom: 20px;
                background-image: url(static/img/1.17c12974.png);
                padding: 10px;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                width:100%;
                height:250px;
                margin:0 0 20px 20px"
          >
          <div style="display: flex;
    align-items: center;padding: 5px 10px;">
            <img style="width: 15px;height:15px;" src="@/assets/tb8.png" alt />
            <span style="color:#88F9A2;font-size:12px;padding: 5px;">实时曲线</span>
          </div>
          <div style="width:100%;height:300px">
            <VxEcharts v-if="VxEchartsShow" :XData="XData" height="200px" :YData="YData"></VxEcharts>
          </div>
        </div>
      </div>
    </div>
    <!--公司信息-->
    <p style="text-align: center;padding: 10px 0">邮箱：liangliang@nxptdn.com 750001 &nbsp;&nbsp;&nbsp; 电话： 0951-8305007 15378972980&nbsp;&nbsp;&nbsp; 传真： 0951-8305007&nbsp;&nbsp;&nbsp; 版权所有：宁夏普天动能信息技术有限公司</p>
    <el-dialog :visible.sync="mapShow" class="scanAreaDialog800" width="800" height="500" title="地图导航" >
      <div class="daohang">
        <baidu-map style="width: 760px;height: 450px" :center="{lng: lng, lat: lat}" :zoom="13" >
          <bm-marker :position="{lng: lng, lat: lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
            <bm-label :content="companyName" style="color:red;font-size: 14px;"  :offset="{width: 30, height: -10}"/>
          </bm-marker>
        </baidu-map>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="videoShow"  class="scanAreaDialog100" width="100%" height="100%" style="height: 100%;">
      <div class="home-mid" style="width: 100%;height: 100%;margin-left: 0">
        <div class="home-left-2 h100">
          <div class="home-left-2-yubao">
            <div class="home-left-2-yubao-top">
              <div class="img"></div>
              <div style="font-size:12px;" class="text">视频监控</div>
              <div style="transform: rotate(180deg);" class="img"></div>
            </div>
            <ul>
              <li v-for="(item ,i) in videoList" class="b-li">
                <div class="video-data" :title="item.displayName+item.deviceName" v-if="channelObj.vide && item.cameraType=='0' && videoShow">
                  <iframe v-if="item.op=='show'" style="width: 100%;height: 100%" frameborder=0 name="showHere" scrolling=auto :src="'index_hk.html?url='+item.url+'&webPort='+item.webPort+'&userName='+item.userName+'&userPwd='+item.userPwd+'&menu=false'"></iframe>
                  <img  v-if="item.op!='show'" :title="'单机播放'+item.displayName+item.deviceName" style="height: 100%;width: initial;cursor: pointer;" src="@/assets/video2.png" @click="play(item)">
                </div>
                <div class="video-data" :title="item.displayName+item.deviceName" v-if="channelObj.vide && item.cameraType=='1' && videoShow">
                  <iframe v-if="item.op=='show'" style="width: 100%;height: 100%" frameborder=0 name="showHere" scrolling=auto :src="'index_ys.html?url='+item.url+'&webPort='+item.webPort+'&userName='+item.userName+'&userPwd='+item.userPwd+'&menu=false'"></iframe>
                  <img v-if="item.op!='show'" :title="'单机播放'+item.displayName+item.deviceName"  style="height: 100%;width: initial;cursor: pointer;" src="@/assets/video2.png" @click="play(item)">
                </div>

                <!--<router-link class="w-100" v-if="item.stype=='大棚'" :to="{path:'/myGreenhouse/greenhouseVideo',query: {areaId: item.areaId,type: 1}}"> <img :title="item.displayName+item.deviceName" src="@/assets/video2.png"></router-link>-->
                <!--<router-link class="w-100" v-if="item.stype=='仓库'" :to="{path:'/myWarehouse/warehouseVideo',query: {areaId: item.areaId,type: 1}}"> <img :title="item.displayName+item.deviceName" src="@/assets/video2.png"></router-link>-->
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>

</template>
<script>
  import VueCharts from 'vue-chartjs'
  import { Bar, Line } from 'vue-chartjs'
  import { parseTime } from '@/utils/index.js'
  import MyStorage from '@/utils/cache'
  import { getUserMenu } from '@/api/user'
  import VxEcharts from './monitor/vxEcharts'
  import { getDeviceInfoList,updateControlDeviceState} from '@/api/deviceInfo'
  import { getMyWarehouseList } from '@/api/warehouse'
  import { getAllDataList} from '@/api/report'
  import { getAllCamera} from '@/api/home'
  import {
    getWeatherInfo,
    getAllArea,
    getDeviceStateStatistics,
    getWarningMessage,
    getAllControlDevice,
    getAllSensorDevice,
    getDeviceData
    } from '@/api/home.js'
  export default {
    components: {
      VxEcharts
    },
    data() {
    return {
      VxEchartsShow:false,
      Interval:{},
      Interval2:{},
      deviceId:'',
      mapShow:false,
      videoShow:false,
      warningMessageKeys:'',
      SensorDeviceKeys:'',
      AreaListKeys:'',
      menu: [],
      XData: [],
      YData: [],
      time: [parseTime(new Date()).substring(0,10)+' 00:00:00', parseTime(new Date()).substring(0,10)+' 23:59:59'],
      switchList: [],
      warningMessage: [],
      weatherInfo: {
        now: {},
        location: {}
      },
      AreaList: [],
      currentRate1: 50,
      currentRate2: 68,
      currentRate3: 73,
      currentRate4: 88,
      areaId: '',
      deviceInfo: {},
      SensorDevice: [],
      videoList:[],
      chooseList:[],
      channel:'',
      channelObj:{}
    }
  },
  created() {
    var para = {
      companyId: this.companyId
    }
    getUserMenu(para).then(res => {
      this.menu = res.result;
    this.menu.unshift({id: "0",img:'sjfx', name: "数据分析", menuFlag: null, url: ""});
  })
  },
  computed: {
    companyId() {
      return MyStorage.getItem('companyId')
    }
    ,
    companyName() {
      return MyStorage.getItem('companyName')
    },
    lng() {
      return MyStorage.getItem('lng')
    },
    lat() {
      return MyStorage.getItem('lat')
    }
  },

  mounted() {
    this.getWeatherInfo()
    this.getAllArea()
    this.getWarningMessage()
    this.getVideoList()

    setTimeout(()=>{
      this.VxEchartsShow=true;
    },500);

  },
  watch: {
    channel: {
      deep: true,
      handler(val) {
          console.log(val)
        this.channelObj = this.chooseList[val];
      }
    },
    areaId: {
      deep: true,
        handler(val) {
        this.getAllSensorDevice(val)
        this.getAllControlDevice(val)
      }
    },
    warningMessageKeys: {
      handler(val) {
          this.warningMessage.forEach((v,i)=>{
            if(v.warningInfo.indexOf(val)==-1){
              v.display = true;
            }else{
              v.display = false;
            }
          })
      }
    },
    SensorDeviceKeys: {
      handler(val) {
        this.SensorDevice.forEach((v,i)=>{
          if(v.deviceName.indexOf(val)==-1){
            v.display = true;
          }else{
            v.display = false;
          }
        })
      }
    },
    AreaListKeys: {
      handler(val) {
        this.AreaList.forEach((v,i)=>{
          if(v.displayName.indexOf(val)==-1){
            v.display = true;
          }else{
            v.display = false;
          }
        })
      }
    }
  },
  methods: {
    play(item){
      item.op='show';
    },
    initPic(){
      this.doughnutCtx("#83ccd2 ","chartjs-1","设备总量",this.deviceInfo.deviceCount,100,['设备总量','总共']);//id,title,x,y
      this.doughnutCtx("#c3d825 ","chartjs-2","运行设备",this.deviceInfo.runningCount,this.deviceInfo.deviceCount,['运行设备','设备总量']);//id,title,x,y
      this.doughnutCtx("#f08300","chartjs-3","断线设备",this.deviceInfo.offlineCount,this.deviceInfo.deviceCount,['断线设备','设备总量']);//id,title,x,y
      this.doughnutCtx("#d7003a","chartjs-4","故障设备",this.deviceInfo.errorCount,this.deviceInfo.deviceCount,['故障设备','设备总量']);//id,title,x,y
    },
    doughnutCtx(c,id,title,x,y,cc){
      var chartColors ={
          red: 'rgb(255, 255, 255)',
          orange: 'rgb(25, 137, 250)'
      };
      var doughnutConfig = {
        animateScale: true,
        type: 'doughnut',
        data: {
          datasets: [{
            data: [
              x, y
            ],
            backgroundColor: [
              chartColors.red,
              c
            ],
            borderWidth:1,
            borderColor:'rgb(255, 255, 255)'
          }],
          labels: cc
        },
        options: {
          cutoutPercentage: 80,
          tension:0.1,
          responsive: true,
          maintainAspectRatio: false,
          legend: false,
          title: {
            display: true,
            fontColor:'#88f9a2',
            text: title
          },
          animation:{
            duration:3000
          },
          graphic:{       //图形中间文字
            type:"text",
            left:"center",
            top:"center",
            style:{
              text:"66",
              textAlign:"center",
              fill:"#fff",
              fontSize:60
            }
          }
        }
      };
      var doughnutCtx = document.getElementById(id).getContext("2d");
      new Chart(doughnutCtx, doughnutConfig);

    },
    showMap(){
      this.mapShow = true
    },
    showVideo(){
      this.videoShow = true
    },
    _getAllDataList(deviceId) {
      this.deviceId = deviceId;
      var data = {
        companyId: this.companyId,
        areaId: this.areaId,
        deviceId: deviceId,
        strategy: 0,
        startTime: this.time[0],
        endTime: this.time[1]
      }
      getAllDataList(data).then(res => {
        this.XData = res.result.x
        this.YData =res.result.y
      })
      window.clearInterval(this.Interval);
      this.Interval = setInterval(()=>{
        getDeviceData(data).then(res => {
          console.log("getDeviceData success----->deviceId："+deviceId);
          this.XData = res.result.x
          this.YData = res.result.y
        })
      },2000);
    },
    areaMonitorP(item,index){
      this.AreaList.forEach((v,i)=>{
        if(v.id==item.areaId){
          var param = {
            companyId: this.companyId,
            areaId: item.areaId,
            deviceId: item.id,
            state: 1^item.value
          }

          updateControlDeviceState(param).then(res => {
            if (res.statusCode === 1) {
              this.$message({ message: res.message, type: 'success' });
              setTimeout(()=>{
                this.getAllControlDevice()
              },1000);
            } else {
              this.$message({ message: res.message, type: 'warning' })
            }
          })
//          item.index = 1;
//          item.id = item.areaId;
//          item.displayName=v.displayName;
//          item.type=1;
//          this.$router.push({ name: 'ementManage', query: item })
        }
      })
    },
    getVideoList(){
      var para = {
        companyId: this.companyId
      }
      getAllArea(para).then(res => {
        var para = {
        companyId: this.companyId,
        deviceType: '2',
        areaId: '',
        page: '1',
        pageSize: '99'
        };
        let areaList = res.result.map((v,i,a)=>{
          v.stype='单元';
          return v;
        });
        getMyWarehouseList(para).then(res => {
          if (res.statusCode === 1) {
            res.result.map((house,index,array)=>{
              house.stype='仓库';
              areaList.push(house);
            });
            areaList.map((value,index,array)=>{
              var p = {
                companyId: this.companyId,
                deviceType: '2',
                stype: value.stype,
                areaId: value.id,
                displayName: value.displayName || value.display_name ,
                page: '1',
                pageSize: '99'
              };
              //this.getDeviceInfoList(p);
              this.getAllCamera(p);
            });
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        });
      })
    },
    getDeviceInfoList(para){
          getDeviceInfoList(para).then(res => {
              res.result.map((vide,index,array)=>{
                vide.displayName=para.displayName;
                vide.areaId=para.areaId;
                vide.stype=para.stype;

                this.videoList.push(vide)
              })
          })
    },
    getAllCamera(para){
      getAllCamera(para).then(res => {
              res.result.map((vide,index,array)=>{
                vide.displayName=para.displayName;
                vide.areaId=para.areaId;
                vide.stype=para.stype;

                this.videoList.push(vide)
                if(vide.channel){
                  vide.channel.split(",").forEach((item)=>{
                    this.chooseList.push({id:item,text:vide.deviceName,vide:vide})
                  })
                }
              })
              if(this.chooseList.length>0){
                this.channel = 0
                this.channelObj = this.chooseList[0]
              }
          })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      localStorage.removeItem("password");
      localStorage.removeItem("username");
      await this.$store.dispatch('user/logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    areaMonitor() {
      let item = {
        index: 1,
        companyId: this.companyId,
        id: this.areaId,
        displayName: '单元'
      }
      this.$router.push({ name: 'ementManage', query: item })
    },
    getDeviceData(deviceId) {
      console.log("getDeviceData----->deviceId："+deviceId)
      this._getAllDataList(deviceId);
  },
  getAllSensorDevice() {
    var para = {
      companyId: this.companyId,
      areaId: this.areaId,
      pageSize:99
    }
    getAllSensorDevice(para).then(res => {
      this.SensorDevice = res.result;
      this.getDeviceData(this.SensorDevice[0].id);
    });
    window.clearInterval(this.Interval2);
    this.Interval2 = setInterval(()=>{
      getAllSensorDevice(para).then(res => {
        this.SensorDevice = res.result;
        console.log("getAllSensorDevice----->");
      });
    },6000);


  },
  getAllControlDevice() {
    var para = {
      companyId: this.companyId,
      areaId: this.areaId
    }
    getAllControlDevice(para).then(res => {
      this.switchList = res.result
      this.switchList.forEach((v,i)=>{
        v.areaId = para.areaId;
        v.companyId = para.companyId;
      })
  })
  },
  getWarningMessage() {
    var para = {
      companyId: this.companyId
    }
    getWarningMessage(para).then(res => {
      this.warningMessage = res.result//.slice(0, 4)
  })
  },
  changeDevice(id) {
    this.areaId = id
    this.getDeviceStateStatistics()
  },
  todetial(id) {
    this.$router.push({ path: 'myGreenhouse/ementManage', query: {id:id} })
  },
  getDeviceStateStatistics() {
    var para = {
      areaId: this.areaId,
      companyId: this.companyId
    }
    getDeviceStateStatistics(para).then(res => {
      this.deviceInfo = res.result
      this.initPic();
  })
  },
  getWeatherInfo() {
    var param = {
      lng: this.lng,
      lat: this.lat
    }
    getWeatherInfo(param).then(res => {
      const data = JSON.parse(res.result)
      this.weatherInfo = Object.assign({}, data.results[0])
  })
  },
  getAllArea() {
    var para = {
      companyId: this.companyId
    }
    getAllArea(para).then(res => {
      this.AreaList = res.result//.slice(0, 6)

    this.areaId = this.AreaList[0].id
    this.getDeviceStateStatistics()
//    this.getAllControlDevice()
//    this.getAllSensorDevice()
//    this.getDeviceData()
  })
  },
  getPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          let latitude = position.coords.latitude
          let longitude = position.coords.longitude
          var data = {
            latitude: latitude,
            longitude: longitude
          }
          resolve(data)
        },
        function() {
          reject(arguments)
        }
      )
    } else {
      reject('你的浏览器不支持当前地理位置信息获取')
    }
  })
  }
  }
  }
</script>
<style>
  .active-li{
    background-color: #7701ff!important;
  }
  .b-li{
    height: calc(40vh)!important;
  }
  .video-data{
    width: 100%;
    padding: 15px;
  }
  .w-100{
    width: 95% !important;
  }
  .scanAreaDialog100>.el-dialog{
    margin: 0 !important;
    height: 100%;
  }
  .scanAreaDialog100>.el-dialog>.el-dialog__body{
    padding: 0 !important;
  }
  .h100{
    height: calc(100vh - 70px)!important;
    background-image: url('../assets/video_bg_2.png')!important;
  }
  .donut-inner {
    margin-top: -75px;
    text-align: center;
    color: #88f9a2;
    font-size: 14px;
  }
    .van-circle__text{color: #ffffff!important;}
</style>
<style lang="scss" soced>
  .scanAreaDialog800>.el-dialog{
    width: 800px!important;
    height: 550px!important;
  }
  .home {
    display: flex;
    flex-direction: row;
  //   height: 80vw;
    min-width: 1000px;
    margin: 20px 20px 0px 20px;
    /*background-image: url('../assets/-s-beijing.png');*/
    background-size: 100% 100%;
  .home-left {
    display: flex;
    flex-direction: column;
    width: 450px;
  .home-left-1 {
    display: flex;
    flex-direction: row;
    width: 450px;
    margin-bottom: 20px;
  .home-left-1-yubao-con {
    padding:15px 14px;
  ul:first-child {
    height: 11px;
  }
  ul {
    display: flex;
    /* justify-content : space-between;*/
    flex-flow:wrap;
  li {
    font-size: 12px;
    display: block;
    width: 33.3%;
    text-align: center;
  img {
    margin: 10px 0;
  }
  }
  }

  }
  .home-left-1-yubao:last-child {
    margin-right: 0;
  }
  .home-left-1-yubao {
    background-image: url('../assets/video_bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 245px;
    width: 450px;
    margin-right: 10px;
  .home-left-1-yubao-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 6px 14px;
  .img {
    width: 20px;
    height: 20px;
    background-image: url('../assets/tb1.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .img1 {
    width: 20px;
    height: 20px;
    background-image: url('../assets/tb2.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .text {
    color: #88f9a2;
    font-size: 16px;
    line-height: 30px;
  }
  }
  .data {
    width: 100%;
    text-align: center;
    padding: 10px;
    font-size: 16px;
  }
  }
  }
  .home-left-2 {
    margin-bottom: 20px;
    background-image: url('../assets/1.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    align-items: center;
    height:250px;
  .home-left-2-yubao-top {
    position: relative;
    display: flex;
    flex-direction: row;
  // justify-content: space-between;
    padding: 15px 14px;
  .search {
    position: absolute;
    top: 18px;
    right: 20px;
    width: 26%;
    height: 29px;
    border-radius: 5px;
    background-color: rgba(28,68,120,.5);
  input {
    width: calc(100% - 40px);
    height: 100%;
    margin-right: 10px;
    border: none;
    background-color: transparent;
    text-indent: 5px;
    vertical-align: middle;
  }
  a {
    font-size: 12px;
    color: #e79b37;
  }
  }
  .img {
    width: 15px;
    height: 15px;
    background-image: url('../assets/tb4.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 2px 0 0 10px;
  }
  .text {
    margin-left: 10px;
    color: #88f9a2;
    font-size: 16px;
    line-height: 20px;
  }
  }
  ul {
    padding: 0 20px;
    margin-bottom: 20px;
  li {
    background-color: #122f5b;
    margin-bottom: 10px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  div {
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  a {
    color: #88f9a2;
  }
  }
  }
  }
  .home-left-3 {
    margin-bottom: 20px;
    background-image: url('../assets/1.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height:255px;
  .home-left-2-yubao-top {
    display: flex;
    flex-direction: row;
  // justify-content: space-between;
    padding: 15px 14px;
  .img {
    width: 15px;
    height: 15px;
    background-image: url('../assets/tb3.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 2px 0 0 10px;
  }
  .text {
    margin-left: 10px;
    color: #88f9a2;
    font-size: 16px;
    line-height: 20px;
  }
  }
  ul {
    display: flex;
    justify-content : space-around;
    padding: 16px 20px;
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  .num {
    margin-top: 10px;
  }
  }
  }
  }
  }
  }
  .home-mid {
    width: 350px;
    margin-left: 20px;
  .daohang {
    width: 100%;
    height: 184px;
    margin-bottom: 20px;
  img {
    /*width: 100%;*/
    height: 100%;
  }
  }
  .home-left-2:nth-child(2) {
    height: 255px;
    padding: 14px 23px;
  }
  .home-left-2 {
    margin-bottom: 20px;
    background-image: url('../assets/video_bg.png');
    padding: 14px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height:245px;
  .home-left-2-yubao-top {
    display: flex;
    flex-direction: row;
  // justify-content: space-between;
    padding:0 15px 14px;
    justify-content: center;
    align-items: center;
  .img {
    width: 40px;
    height: 10px;
    background-image: url('../assets/图层 20@2x.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-left: 10px;
    margin: 2px 0 0 10px;
  }
  .text {
    margin-left: 10px;
    color: #88f9a2;
    font-size: 16px;
    line-height: 20px;
  }
  }
  ul {
    display: flex;
    /*flex-direction: row;*/
    justify-content : flex-start;
    flex-wrap: wrap;
    margin-bottom: 10px;
  /* li:first-child,
   li:nth-child(4n) {
     margin-left: 0;
   }*/
  li {
    margin-bottom: 10px;
    width: 33.3%;
    height: 80px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  img {
    width: 100%;
    border-radius: 5px;
  }
  a {
    display: block;
    width: 120px;
    margin: 0 auto;
    color: #88f9a2;
  }
  }
  }
  }
  .home-mid-2 {
    position: relative;
    margin-bottom: 20px;
    background-image: url('../assets/1.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height:250px;
  .home-left-2-yubao-top {
    display: flex;
    flex-direction: row;
  // justify-content: space-between;
    padding: 15px 14px;
    align-items: center;

  .search {
    position: absolute;
    top: 18px;
    right: 20px;
    width: 40px;
    height: 29px;
    line-height: 29px;
    text-align: center;
    border-radius: 5px;
    background-color: rgba(28, 68, 120, .5);


  a {
    font-size: 12px;
    color: #88f9a2;
  }

  }
  .img {
    width: 15px;
    height: 15px;
    background-image: url('../assets/tb5.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 2px 0 0 10px;
  }
  .text {
    margin-left: 10px;
    color: #88f9a2;
    font-size: 16px;
    line-height: 20px;
  }
  }
  .change-nav {
    /*padding: 0 14px;
    color:#fff;
   margin-left:5px;*/
    position: absolute;
    top: 18px;
    right: 24px;
  span:last-child {
    margin-left: 10px;
    .change-icon {
      background-color: rgba(255,128,0,1);
    }
  }
  }
  .change-icon {
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: rgba(0,255,255,1);
    margin-right: 5px;
    vertical-align: middle;
  }
  ul {
    /*display: flex;
    justify-content : flex-start;
    flex-wrap: wrap;*/

    padding: 0 14px;
  li.kai {
  .change-icon {
    right:0;
    margin-right: 0;
  }
  }
  li.guan {
  .change-icon {
    left:0;
    margin-right: 0;
    background-color: rgba(255,128,0,1);
  }
  }

    li {
      float: left;
      width:calc(33.3% - 10px);
      height: 37px;
      display: block;
      background-color: rgba(28,68,120,0.5);
      margin:0 5px 10px 5px;
      padding: 12px 15px;
      border-radius: 5px;
      p {
        font-size: 14px;
        width: calc(100% - 50px);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        float: left;
        vertical-align: middle;
        margin-right: 10px;
      }
      span {
        display: inline-block;
        position: relative;
        background-color: #fff;
        border-radius: 15px;
        width: 40px;
        height: 15px;
        cursor:pointer;
      .change-icon {
        position: absolute;
        top:-1px;
      }
      }
    }
   /*li {
     width:33.3%;
     height: 55px;
     display: block;
     margin-bottom:10px;

  > div {
      position: relative;
      text-align: center;
      border: 1px solid #5e68cb;
      color: #5e68cb;
      padding:6px 6px 6px 26px;
      align-items : center;
      width: 98px;
      height: 55px;
      margin: 0 auto ;
    border-radius:5px;
  div:first-child {
    position: absolute;
    top: 4px;
    left: 4px;
  }
  div:nth-child(2) {
    width: 100%;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 18px;
  }
  span:last-child {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
  span {
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
    padding: 3px;
    background-color: #5e68cb;
  }
  }
  a {
    color: #88f9a2;
  }
  }

  }*/
  }
  }
  }
  .chuanganqi {
    display: block;
    /*flex-wrap: wrap;*/
    margin:0 20px 14px 20px;

  li {
    float: left;
    width:calc(50% - 20px);
    margin-bottom:10px ;
    list-style: disc;
    margin-left:20px;
    background: rgba(18,47,91,0.3);
    span {
      color: #87f9a1;
    }
    span:hover {
      color: #fff;
      cursor:pointer;
    }
  }

  }
  /*首页右侧宽度修改*/
  .home {
  .home-left {
    width: 33.3%;
  .home-left-1 {
    width: 100%;
  .home-left-1-yubao {
    width: 100%;
  }
  }
  }
  .home-mid,
  .home-right{
    width:calc(33.3% - 20px);

  }
  .home-right {
  .home-right-top {
  ul {
    margin: 2px 20px 14px 20px;
  li.wei {
  span:last-child {
    color:#eb3348;
  }
  }
  li {
    width:100%;
    border-radius:4px;
    margin-bottom:10px;
    height:28px;
    line-height: 28px;
  span:last-child {
    display: inline-block;
    width: 60px;
    text-align: center;
    float: left;
    font-size: 14px;
    color: #88f9a2;
  }
  div{
    width: calc(100% - 60px);
    color: #fff;
    font-size: 14px;
    float: left;
    background:rgba(18,47,91,.3);
    border-radius: 5px;
  span {
    display: inline-block;
    width: calc(100% - 100px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: bottom;
  }
  }
  a {
    font-size: 14px;
    float: right;
    margin-right: 10px;
  }
  i {
    width: 8px;
    height: 7px;
    background: rgba(80, 76, 123, 0);
    border: 1px solid rgb(219, 105, 42);
    border-radius: 50%;
    color: rgb(219, 105, 42);
    display: inline-block;
    margin: 0 10px;
  }
  }
  }
  }
  .home-right-middle {
  .home-right-toptit {
  .img {
    width: 15px;
    height: 15px;
    background-image: url("../assets/tb7.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .text {
    color: rgb(136, 249, 162);
  }
  }
  }
  .home-right-toptit {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 15px 14px;
  .img {
    width: 15px;
    height: 15px;
    background-image: url("../assets/tb6.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 2px 0 0 10px;
  }
  .text {
    margin-left: 10px;
    color: #88f9a2;
    font-size: 16px;
    line-height: 20px;

  }
  .search {
    position: absolute;
    top: 18px;
    right: 20px;
    width: 26%;
    height: 29px;
    border-radius: 5px;
    background-color: rgba(28,68,120,0.5);
  input {
    width: calc(100% - 50px);
    height: 100%;
    margin-right: 12px;
    border: none;
    background-color: transparent;
    text-indent: 5px;
    vertical-align: middle;

  }
  a {
    font-size: 12px;
    color: #e79b37;
  }
  }
  }
  }
  .home-mid {
  .daohang {
    width: 100%;
  }
  }

  }
  /*首页头部导航修改*/
  .home-nav:after {
    position: absolute;
    bottom:0;
    left: 0;
    height: 3px;
    width: 100%;
    content: "";
    background-image: linear-gradient(to right, rgba(0,0,0,0) ,rgba(13,96,112,1) , rgba(0,0,0,0) );
  }
  .home-nav {
    position: relative;
    background-image: linear-gradient(rgba(42,42,42,.5),rgba(42,42,42,.3), rgba(54,113,150,.5));
    display: block;
    min-width: 1000px;
    width: 100%;
    height: 99px;
    z-index: 2;
    padding: 0 20px;
  .home-nav-l,
  .home-nav-m,
  .home-nav-r {
    position: absolute;
    z-index: 5;

  }
  .home-nav-l {
    width: 23%;
    top: 40px;
  img {
    /*width: calc(100% - 40px);
    margin-left: 10px;*/
  }
  }
  .home-nav-m {
    top: 0;
    left:50%;
    margin-left: -24%;

    width:48%;
  .navbar-tit {
    position: relative;
    left: 50%;
    display: block;
    width: 100%;
    height: 66px;
    margin-left: -50%;
    margin-bottom: 5px;
  img {
    display: block;
    width: 100%;
    height: 66px;
    position: relative;
  }
  p {
    position: absolute;
    width: 100%;
    top: 30%;
    left: 50%;
    margin-left: -50%;
    letter-spacing: 12px;
    font-size: 1.5em;
    font-weight: bold;
    color: #8edafb;
    text-align: center;
  }
  }
  li {
    position: relative;
    display: block;
    width: 20%;
    padding: 0 8px;
    float: left;
    text-align: center;
    font-size: 14px;
    line-height: 18px;
  img {
    display: none;
  }
  }
  li:after,
  li:first-child:before {
    position: absolute;
    top: 0;
    width: 1px;
    height: 100%;
    content: "";
    background-image: url('../assets/tit-line.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  li:after {
    right: 0;
  }
  li:first-child:before {
    left: 0;
  }
  li:hover,
  li:hover svg,
  li.cur,
  li.cur svg {
    color:#82cfd6;
  img {
    display: block;
  }
  }
  }
  .home-nav-r {
    top: 40px;
    width: 23%;
    right: 20px;
  ul {
    display: flex;
    justify-content : flex-end;
  li {
    margin-right:20px;
  img {
    width: 40px;
    height: 40px;
  }
  }
  }


  }
  }
</style>
