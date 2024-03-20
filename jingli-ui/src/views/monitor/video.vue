<template>
  <el-container class="video">
    <el-container class="video-bottom">
      <el-aside class="video-aside" height="100%" width="120px">
        <div
          v-for="(item,index) in cameraList"
          :key="index"
          @click="changeCamera(item,index)"
          class="video-item"
          :class="{'active':sel==index}"
        >
          <div>
            <div>{{item.deviceName}}</div>
            <div>通道号:{{item.nPort}}</div>
          </div>
        </div>
      </el-aside>
      <el-main style="padding: 0">
        <div class="video-viedo">
          <div class="video-data" id="divPlugin" ><iframe v-show="iframeState" style="width: 100%;height: calc(100vh - 70px)" id="show-iframe"  frameborder=0 name="showHere" scrolling=auto :src="iframeSrc"></iframe></div>
        </div>
      </el-main>

    </el-container>
  </el-container>
</template>
<script>
import MyStorage from '@/utils/cache'
import { getAllArea, getCameraList } from '@/api/camera'
import video_HK from '@/utils/video-hk'
export default {
  data() {
    return {
      iframeState:true,
      iframeSrc:'',
      sel: 0,
      id: '',
      areaId: this.$route.query.areaId,
      allArea: [],
      cameraList: [],
      device: {}
    }
  },
  computed: {
    companyId() {
      return MyStorage.getItem('companyId')
    }
  },
  created() {
    var data = {
      companyId: this.companyId
    }
    getAllArea(data).then(res => {
      this.allArea.lenght = 0
      this.allArea = [...res.result]
      this.getCameraList()
    })
  },
  methods: {
    getCameraList() {
      const loading = this.$loading({
        lock: true,
        text: '正在加载...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var data = {
        companyId: this.companyId,
        areaId: this.areaId
      }
      getCameraList(data).then(res => {
        this.cameraList.length = 0
        this.cameraList = [...res.result]
        if (res.result.length > 0) {
          this.device = Object.assign({}, res.result[0]);
          var param = 'url='+this.device.url+'&webPort='+this.device.webPort+'&userName='+this.device.userName+'&userPwd='+this.device.userPwd;
          if(this.device.cameraType=='0'){//海康
             this.iframeSrc='index_hk.html?'+param;
//              if(video_HK.checkPlugin(this)){
//                video_HK.clickStopRealPlay().clickLogout();
//                video_HK.initVideoHK(this,this.device.url,this.device.webPort,this.device.userName,this.device.userPwd).Login();
//              }
          }
          if(this.device.cameraType=='1'){
            this.iframeSrc='index_ys.html?'+param;
          }
        } else {
          this.device = Object.assign({}, {})
          this.$message({ message: '没有查询到摄像头信息', type: 'warning' })
        }
        loading.close()
      })
    },
    changeCamera(item, index) {
      this.sel = index;
      video_HK.clickStopRealPlay().clickLogout();
      this.device = Object.assign({}, item);
      var param = 'url='+this.device.url+'&webPort='+this.device.webPort+'&userName='+this.device.userName+'&userPwd='+this.device.userPwd;
      if(this.device.cameraType=='0'){
        this.iframeSrc='index_hk.html?'+param;
//        if(video_HK.checkPlugin(this)){
//          video_HK.initVideoHK(this,this.device.url,this.device.webPort,this.device.userName,this.device.userPwd).Login();
//        }
      }
      if(this.device.cameraType=='1'){
        this.iframeSrc='index_ys.html?'+param;
      }
    },
    changeArea() {
      this.getCameraList()
    }
  }
}
</script>
<style lang="scss" scoped>
/*.video {*/
  /*margin-top: 10px;*/
  /*border-bottom: 1px solid #0d1435;*/
  /*min-width: 800px;*/
/*}*/
/*.video-bottom {*/
  /*border-top: 1px solid #0d1435;*/
/*}*/
.video-aside {
  min-height: calc(100vh - 65px);
  background: #0d1435;
  .video-item {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #0d1435;
    cursor: pointer;
    align-items: center;
    font-size: 12px;
    div {
      padding: 4px 8px;
    }
  }
  .active {
    background: #ffffff;
    color: #20a0ff;
  }
}

.video-data {
  min-height: calc(100vh - 105px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dbdbdb;
}
.video-msg {
  font-size: 12px;
  div {
    padding: 5px;
  }
  .name {
    font-size: 14px;
  }
}
</style>
