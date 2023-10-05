/**
 * GrainRain 海康摄像头
 * @type {{initVideoHK: ((p1:*, p2?:*, p3?:*, p4?:*, p5?:*)), checkPlugin: ((p1:*)), Login: (()), getChannelInfo: (()), clickStartRealPlay: (()), clickLogout: (()), clickStopRealPlay: (())}}
 */
var video_HK = {
  initVideoHK : (_vue,_url,_port,_username,_password)=>{
    video_HK.url = _url || '';
    video_HK.port = _port || '';
    video_HK.username = _username || '';
    video_HK.password = _password || '';
    return video_HK;
  },
  checkPlugin : (_vue)=>{
    if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
      _vue.$message({ message: '您还未安装过插件，双击开发包目录里的WebComponents.exe安装！', type: 'warning' });
      return false;
    }
    WebVideoCtrl.I_InitPlugin(window.innerWidth-410, window.innerHeight-95, {iWndowType: 1,
      cbSelWnd: function (xmlDoc) {
        console.log('step1'+xmlDoc);
      }
    });
    WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
    if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
      _vue.$message({ message: '检测到新的插件版本，双击开发包目录里的WebComponents.exe升级！', type: 'warning' });
      return false;
    }
    return true;
  },
  Login : ()=>{
    var iRet = WebVideoCtrl.I_Login(video_HK.url, 1, video_HK.port, video_HK.username, video_HK.password, {
      success: function (xmlDoc) {
        console.log(" 登录成功！");
        video_HK.getChannelInfo();
      },
      error: function () {
        console.log(+ " 登录失败！");
      }
    });
  },
  getChannelInfo:()=>{
    var szIP = video_HK.url,nAnalogChannel = 0;
    if ("" == szIP) {
      return;
    }
    WebVideoCtrl.I_GetAnalogChannelInfo(szIP, {
      async: false,
      success: function (xmlDoc) {
        nAnalogChannel = oChannels.length;
        console.log(szIP + " 获取模拟通道成功！");
      },
      error: function () {
        console.log(szIP + " 获取模拟通道失败！");
      }
    });

    WebVideoCtrl.I_GetDigitalChannelInfo(szIP, {
      async: false,
      success: function (xmlDoc) {
        console.log(szIP + " 获取数字通道成功！");
      },
      error: function () {
        console.log(szIP + " 获取数字通道失败！");
      }
    });
    WebVideoCtrl.I_GetZeroChannelInfo(szIP, {
      async: false,
      success: function (xmlDoc) {
        console.log(szIP + " 获取零通道成功！");
      },
      error: function () {
        console.log(szIP + " 获取零通道失败！");
      }
    });
    video_HK.clickStartRealPlay();
  },
  clickStartRealPlay:()=>{
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(0),
      szIP = video_HK.url,
      iStreamType = 1,
      iChannelID = 1,
      bZeroChannel = false,
      szInfo = "";

    if ("" == szIP) {
      return;
    }

    if (oWndInfo != null) {// 已经在播放了，先停止
      WebVideoCtrl.I_Stop();
    }

    var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
      iStreamType: iStreamType,
      iChannelID: iChannelID,
      bZeroChannel: bZeroChannel
    });

    if (0 == iRet) {
      console.log("开始预览成功！");
    } else {
      console.log("开始预览失败！");
    }
  },
  clickLogout:()=>{
    var szIP = video_HK.url, szInfo = "";
    if (szIP == "") {
      return;
    }
    var iRet = WebVideoCtrl.I_Logout(szIP);
    if (0 == iRet) {
      console.log(szIP + "退出成功！");
    } else {
      console.log(szIP + "退出失败！");
    }
    return video_HK;
  },
  clickStopRealPlay:()=>{
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(0), szInfo = "";
    if (oWndInfo != null) {
      var iRet = WebVideoCtrl.I_Stop();
      if (0 == iRet) {
        console.log("停止预览成功！");
      } else {
        console.log("停止预览失败！");
      }
    }
    return video_HK;
  }
};
export default video_HK;

