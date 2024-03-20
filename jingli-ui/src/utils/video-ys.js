/**
 * GrainRain 宇视摄像头
 */
// var video_YS = {
//   initVideoYS : (_vue,_url,_port,_username,_password)=>{
//     video_YS.url = _url || 'http://ezcloud.uniview.com';
//     video_YS.port = _port || '80';
//     video_YS.username = _username || 'j00504';
//     video_YS.password = _password || 'j00504';
//     return video_YS;
//   },
//   checkPlugin : (_vue)=>{
//
//     return true;
//   }
// };
// export default video_YS;
var Index = function ($) {
  var mainClass = Class.extend({
    recordlivename: 0,
    videotypejsonMap: [],      //视频类型对象数组
    livevideojsonMap: [],      //实况流对象数组
    playbackvideojsonMap: [],  //回放流对象数组
    initOcxWindownum: 4,       //控件默认开启窗口个数
    ocxHeight: "400px",        //控件默认高度
    islocallogin: false,       //是否本地登录标志位
    iscloudlogin: false,       //是否云端登录标志位
    EVMSjsonMap: [],           //一体机下加载的所有设备集合
    cloudEVMSjsonMap: [],      //云端一体机下加载的所有设备集合
    CLOUDjsonMap: [],          //云端所有设备
    queryjsonMap: [],          //查询结果集合
    ip: null,
    port: null,
    username: null,
    password: null,
    protocol: null,
    devicetype: null,
    clouddevicetype: null,
    channelList: null,
    localchalisttable: null,     //局域网通道表格对象
    localquerytable: null,       //查询视频录像表格对象
    clouddevlisttable: null,     //云账号登录设备列表表格对象
    clouddevchllisttable: null,  //云账号登录设备通道列表表格对象
    DeviceHandle: null,          //登录设备的凭证ID
    cloudDeviceHadle: null,      //云账号设备handle
    CloudHandle: null,           //云登录账号凭证ID
    queryHandle: null,           //查询所需凭证ID
    PlayBackBeginTime: null,     //回放开始时间标志位
    PlayBackEndTime: null,       //回放结束时间标志位
    DownLoadHandle: null,        //文件下载时间标志位
    init: function () {
      this.destory_activex();
      this.initPage();
      this.initData();
      this.initEvent();
    },
    initPage: function () {
      debugger;
      video.initOcx();
      var msg, icon;
      var retcode = top.sdk_viewer.execFunction("NetSDKSetPlayWndNum", this.initOcxWindownum);
      if (0 != retcode) {
        msg = $.lang.tip["tipinitOcxfail"];
        icon = TIPS_TYPE.FAIL;
      } else {
        msg = $.lang.tip["tipinitOcxsuc"];
        icon = TIPS_TYPE.SUCCEED;
      }
      this.initPagebtn();
      this.msgtipshow(msg, icon);
    },

    initPagebtn: function () {
      debugger;
      // 本地登录按钮
      $("#locallogin").attr("disabled", false);
      $("#localloginout").attr("disabled", true);
      $("#getlocallist").attr("disabled", true);
      //云端登录按钮
      $("#getclouddevlist").attr("disabled", true);
      $("#cloudDevLogin").attr("disabled", true);
      $("#cloudDevLoginout").attr("disabled", true);
      $("#cloudloginout").attr("disabled", true);
      $("#getdevcloudlist").attr("disabled", true);

      //FUN相关按钮
      $("#funBtn input[type='button']").attr("disabled", true);

      //preset相关按钮
      $("#presetBtn input[type='button']").attr("disabled", true);

      //QUERY相关按钮
      $("#queryBtn input[type='button']").attr("disabled", true);
      //日志按钮
      $("#openLog").attr("disabled", true);
      $("#closeLog").attr("disabled", true);

    },

    initloginoutbtn: function () {
      //FUN相关按钮
      $("#funBtn input[type='button']").attr("disabled", true);

      //preset相关按钮
      $("#presetBtn input[type='button']").attr("disabled", true);

      //QUERY相关按钮
      $("#queryBtn input[type='button']").attr("disabled", true);
      //日志按钮
      $("#openLog").attr("disabled", true);
      $("#closeLog").attr("disabled", true);
    },

    initData: function () {
      debugger;
      // 默认关闭日志
      top.sdk_viewer.execFunction(pluginInterfce["NETDEV_SetWriteLog"], 0);
      $("#downloadpathurldiv").addClass("hidden");
    },

    initEvent: function () {
      var _this = this;
      //局域网登录
      $("#locallogin").on("click", function () {
        _this.ip = $("#cameraIp").val();
        _this.port = Number($("#port").val());
        _this.username = $("#localusername").val();
        _this.password = $("#localpassword").val();
        _this.protocol = Number($("#localprotocol").val());
        _this.devicetype = $("#localdeviceType").val();
        var loginJsonMap = {
          "szIPAddr": _this.ip,
          "dwPort": _this.port,
          "szUserName": _this.username,
          "szPassword": _this.password,
          "dwLoginProto": _this.protocol,
        };
        var loginJsonstring = JSON.stringify(loginJsonMap);
        _this.login(loginJsonstring);
      });

      $("#getlocallist").on("click", function () {
        _this.getChannellist();
      });

      $("#localloginout").on("click", function () {
        _this.loginOut()
      });

      /***********************云平台相关*********************/
      $("#cloudLogin").on("click", function () {
        var url = $("#cloudUrl").val();
        var cloudUsername = $("#cloudUsername").val();
        var cloudPwd = $("#cloudPwd").val();
        _this.cloudlogin(url, cloudUsername, cloudPwd);
      });

      $("#cloudloginout").on("click", function () {
        _this.cloudloginout();
      });

      $("#getclouddevlist").on("click", function () {
        _this.GetCloudDevList();
      });

      $("#cloudDevLogin").on("click", function () {
        _this.cloudDevLogin();
      });

      $("#cloudDevLoginout").on("click", function () {
        _this.cloudDevLoginout();
      });

      $("#getdevcloudlist").on("click", function () {
        _this.getcloudChannellist()
      });

      /*******************视频相关事件*********************/
      $("#startvideo").on("click", function () {
        _this.startVideo();
      });

      $("#closevideo").on("click", function () {
        _this.stopVideo();
        //滚动条滑动，避免视频存留一帧
        _this.bodyScroll();
      });

      $("#startRecord").on("click", function () {
        _this.startRecord();
      });

      $("#stopRecord").on("click", function () {
        _this.stopRecord();
      });

      $("#opensound").on("click", function () {
        _this.opensound();
      });

      $("#closesound").on("click", function () {
        _this.closesound();
      });

      $("#getsound").on("click", function () {
        _this.getsound();
      });

      $("#setsound").on("click", function () {
        _this.setsound();
      });

      $("#snapshot").on("click", function () {
        _this.snapshot();
      });
      /*******************云台操作*********************/
      $("#presetul").bind("click", function (e) {
        var id = e.target.id;
        _this.presetOperation(id);
      });

      $("#getPreset").on("click", function () {
        _this.PTZ_GetPreset();
      });

      $("#setpreset").on("click", function () {
        _this.PTZ_SetPreset();
      });

      $("#gotpreset").on("click", function () {
        _this.PTZ_GotoPreset();
      });

      $("#deletepreset").on("click", function () {
        _this.PTZ_DeletePreset();
      });
      /********************查询************************/
      $("#commonquery").on("click", function () {
        _this.commonQuery();
      });

      $("#FindAll").on("click", function () {
        _this.queryjsonMap = [];
        _this.findall();
      });

      $("#findNextfile").on("click", function () {
        _this.findNextfile();
      });

      $("#closefind").on("click", function () {
        _this.closefind();
      });

      $("#byTime").on("click", function () {
        _this.playbackbytime();
      });

      $("#stopbytime").on("click", function () {
        debugger;
        _this.stopplayback();
        _this.bodyScroll();
      });

      $("#downloadbytime").on("click", function () {
        _this.downloadbytime();
      });

      $("#stopdownload").on("click", function () {
        _this.stopdownload();
      });

      $("#getprogress").on("click", function () {
        _this.GetProgress();
      });

      $("#setprogress").on("click", function () {
        _this.SetProgress();
      });

      $("#resumeprogress").on("click", function () {
        _this.resumeProgress();
      });

      $("#pauseprogress").on("click", function () {
        _this.Pauseprogress();
      });

      /********************日志************************/

      $("#setlogpath").on("click", function () {
        debugger;
        _this.setlogpath();

      });
      $("#closeLog").on("click", function () {
        _this.CloseLog();
      });
      $("#openLog").on("click", function () {
        _this.OpenLog();
      });
    },

    /*************************************** 本地登录 相关 **********************************/
    // 局域网登录
    login: function (data) {
      debugger;
      var SDKRet = top.sdk_viewer.execFunction(pluginInterfce["NETDEV_Login"], data);
      var msg;
      var icon;
      if (-1 == SDKRet) {
        msg = $.lang.tip["tiploginfail"];
        icon = TIPS_TYPE.FAIL;
      } else {
        var result = JSON.parse(SDKRet);
        this.DeviceHandle = result.UserID;
        msg = $.lang.tip["tiploginsuc"];
        icon = TIPS_TYPE.SUCCEED;
        $("#playerContainer").css("height", this.ocxHeight);
        //成功页面展现逻辑
        this.locallognsucPage();
        //屏蔽云登录
        $("#cloudLogin").attr("disabled", true);
      }
      this.msgtipshow(msg, icon);
    },

    locallognsucPage: function () {
      $("#locallogin").attr("disabled", true);
      $("#localloginout").attr("disabled", false);
      $("#getlocallist").attr("disabled", false);
    },

    funprequebtnInit: function () {
      //FUN相关按钮
      $("#funBtn input[type='button']").attr("disabled", false);
      // $("#startvideo").attr("disabled", false);

      //preset相关按钮
      $("#presetBtn input[type='button']").attr("disabled", false);

      //QUERY相关按钮
      $("#queryBtn input[type='button']").attr("disabled", false);
    },

    //获取通道列表
    getChannellist: function () {
      debugger;
      var SDKRet;
      if (this.devicetype == deviceTypestr.IPC || this.devicetype == deviceTypestr.NVR) {
        SDKRet = top.sdk_viewer.execFunction(pluginInterfce["NETDEV_QueryVideoChl"], this.DeviceHandle);
        if (SDKRet == -1) {
          this.msgtipshow($.lang.tip["getlocallistfail"], TIPS_TYPE.FAIL);
          return;
        }
      } else if (this.devicetype == deviceTypestr.EVMS) {
        SDKRet = top.sdk_viewer.execFunction("NETDEV_FindDevChnList", this.DeviceHandle, 0, 0);
        if (SDKRet == -1) {
          this.msgtipshow($.lang.tip["getlocallistfail"], TIPS_TYPE.FAIL);
          return;
        } else {
          this.EVMSjsonMap = [];
          this.getevmsdevicelist(SDKRet);
        }
      }
      var msg, icon;
      var tableHeight;
      if (SDKRet) {
        var str = '<table id="girdTable"></table>';
        $("#girdtableDiv").html(str);
        var jsonMap = JSON.parse(SDKRet);
        var dataMap = Utils.objectClone(jsonMap);
        for (var i = 0; i < dataMap["VideoChlList"]; i++) {
          // for (var key in dataMap["VideoChlList"][i]) {
          //     if (key == "bPtzSupported") {
          //
          //     }
          // }
        }
        var tableDatas;
        var gridSetting;
        var colmodelwidth = "80px";
        if (this.devicetype == deviceTypestr.IPC || this.devicetype == deviceTypestr.NVR) {
          tableDatas = jsonMap["VideoChlList"];
          if (this.devicetype == deviceTypestr.IPC) {
            tableHeight = 300;
          } else if (this.devicetype == deviceTypestr.NVR) {
            tableHeight = 300;
          }
          gridSetting = {
            datatype: "local",
            width: 1200,
            height: tableHeight,
            colNames: [
              "是否支持云台",
              "通道ID",
              "设备类型",
              "端口号",
              "流个数",
              // "IP地址类型",
              // "通道类型",
              "通道状态",
              // "视频输入制式",
              "通道名称",
              "设备型号",
              "IP地址"
            ],
            colModel: [
              {name: "bPtzSupported", align: "center", width: colmodelwidth, sortable: false},
              {name: "dwChannelID", align: "center", width: colmodelwidth, sortable: false},
              {name: "dwDeviceType", align: "center", width: colmodelwidth, sortable: false},
              {name: "dwPort", align: "center", width: colmodelwidth, sortable: false},
              {name: "dwStreamNum", align: "center", width: colmodelwidth, sortable: false},
              // {name: "enAddressType", align: "center", width: colmodelwidth, sortable: false},
              // {name: "enChannelType", align: "center", width: colmodelwidth, sortable: false},
              {name: "enStatus", align: "center", width: colmodelwidth, sortable: false},
              // {name: "enVideoFormat", align: "center", width: colmodelwidth, sortable: false},
              {name: "szChnName", align: "center", sortable: false},
              {name: "szDeviceModel", align: "center", sortable: false},
              {name: "szIPAddr", align: "center", sortable: false}
            ]
          };
        } else {
          tableDatas = this.EVMSjsonMap;
          gridSetting = {
            datatype: "local",
            width: 1200,
            height: 300,
            colNames: [
              "通道名称",
              "是否支持云台",
              "支持最大流个数",
              "通道ID",
              "通道状态"
            ],
            colModel: [
              {name: "szChnName", align: "center", width: colmodelwidth, sortable: false},
              {name: "bSupportPTZ", align: "center", width: colmodelwidth, sortable: false},
              {name: "dwMaxStream", align: "center", width: colmodelwidth, sortable: false},
              {name: "dwChannelID", align: "center", width: colmodelwidth, sortable: false},
              {name: "dwChnStatus", align: "center", width: colmodelwidth, sortable: false}
            ]
          };
        }
        msg = $.lang.tip["getlocallistsuc"];
        icon = TIPS_TYPE.SUCCEED;
      } else {
        msg = $.lang.tip["getlocallistfail"];
        icon = TIPS_TYPE.FAIL;
      }
      if (!tableDatas) {
        return;
      }
      this.createTable(gridSetting, tableDatas, "girdTable");
      this.msgtipshow(msg, icon);
      //获取设备列表成功，按钮启用
      this.funprequebtnInit();
    },

    //一体机循环调用
    getevmsdevicelist: function (FindHandle) {
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_FindNextDevChn", FindHandle);
      var overFlag;
      var msg;
      var icon;
      if (SDKRet != -1) {
        SDKRet = JSON.parse(SDKRet);
        var oneData = Utils.objectClone(SDKRet);
        oneData["szChnName"] = SDKRet["stChnBaseInfo"]["szChnName"];
        oneData["dwChannelID"] = SDKRet["stChnBaseInfo"]["dwChannelID"];
        oneData["dwChnType"] = SDKRet["stChnBaseInfo"]["dwChnType"];
        oneData["dwChnStatus"] = SDKRet["stChnBaseInfo"]["dwChnStatus"];
        this.EVMSjsonMap.push(oneData);
        this.getevmsdevicelist(FindHandle);
      } else {
        overFlag = top.sdk_viewer.execFunction("NETDEV_FindCloseDevChn", FindHandle);
        if (overFlag == 0) {
          msg = $.lang.tip["getlocallistsuc"];
          icon = TIPS_TYPE.SUCCEED;
        } else {
          msg = $.lang.tip["getlocallistfail"];
          icon = TIPS_TYPE.FAIL;
        }
        this.msgtipshow(msg, icon);
      }
    },

    //创建表格
    createTable: function (gridSetting, data, girdid) {
      var $grid = $("#" + girdid);
      if (girdid == "girdTable") {
        this.localchalisttable = $grid;
      }
      if (girdid == "querytable") {
        this.localquerytable = $grid;
      }
      if (girdid == "clouddevgirdTable") {
        this.clouddevlisttable = $grid;
      }

      if (girdid == "clouddevchllisttable") {
        this.clouddevchllisttable = $grid;
      }

      $grid.jqGrid(gridSetting);
      $grid.jqGrid(gridSetting);
      $grid.jqGrid("clearGridData");
      for (var i = 0; i < data.length; i++) {
        $grid.jqGrid('addRowData', i + 1, data[i]);
      }
    },

    loginOut: function () {
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_Logout", this.DeviceHandle);
      if (SDKRet == -1) {
        this.msgtipshow($.lang.tip["userlogoutFail"], TIPS_TYPE.FAIL);
        return;
      } else {
        this.DeviceHandle = -1;
        this.msgtipshow($.lang.tip["userlogoutSuc"], TIPS_TYPE.SUCCEED);
        //放开云登录限制
        $("#cloudLogin").attr("disabled", false);
        this.initloginoutbtn();
        if (this.localchalisttable) {
          this.destoryTable("girdTable");
        }
        if (this.localquerytable) {
          this.destoryTable("querytable");
        }
        this.loginoutbtnstyle();
        //退出之后登录操作input输入框值为空
        $("#cameraIp").val("");
        $("#port").val("");
        $("#localusername").val("");
        $("#localpassword").val("");

        //时间选择器输入框清空
        $("#startQuerytime").val("");
        $("#endQuerytime").val("");
        $("#getprogresstime").val("");
        $("#setprogresstime").val("");

        //录像、截图、下载回放路径隐藏
        $("#recordfiledispaly").addClass("hidden");
        $("#snapshoturldiv").addClass("hidden");
        $("#downloadpathurldiv").addClass("hidden");
        this.loginoutstopvideo();
      }
    },

    loginoutstopvideo: function () {
      for (var i = 0; i < this.videotypejsonMap.length; i++) {
        if (this.videotypejsonMap[i] == null) {
          continue;
        } else {
          if (this.videotypejsonMap[i]["streamtype"] == videostreamtype["live"]) {
            this.livevideojsonMap.push(this.videotypejsonMap[i]["screenNum"]);
          }
          if (this.videotypejsonMap[i]["streamtype"] == videostreamtype["playback"]) {
            this.playbackvideojsonMap.push(this.videotypejsonMap[i]["screenNum"]);
          }
        }
      }
      if (this.livevideojsonMap.length != 0) {
        for (var j = 0; j < this.livevideojsonMap.length; j++) {
          this.stoponevideo(this.livevideojsonMap[j]);
        }
      }

      if (this.playbackvideojsonMap.length != 0) {
        for (var k = 0; k < this.playbackvideojsonMap.length; k++) {
          this.stoponeplaybackvideo(this.playbackvideojsonMap[k]);
        }
      }

    },
    loginoutbtnstyle: function () {
      $("#getlocallist").attr("disabled", true);
      $("#locallogin").attr("disabled", false);
      $("#localloginout").attr("disabled", true);
    },

    /********************************** 本地登录 End ************************************/

    /********************************** 云账号相关 Begin ************************************/
    // 宇视云登录
    cloudlogin: function (cloudUrl, cloudUser, cloudPwd) {
      debugger;
      var msg, icon;
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_LoginCloud", cloudUrl, cloudUser, cloudPwd);
      if (-1 == SDKRet) {
        msg = $.lang.tip["tipcloudloginfail"];
        icon = TIPS_TYPE.FAIL;
      } else {
        this.CloudHandle = SDKRet;
        msg = $.lang.tip["tipcloudloginsuc"];
        icon = TIPS_TYPE.SUCCEED;
        $("#playerContainer").css("height", "400px");
        //云登录页面样式更改
        this.cloudloginbtn();
        //屏蔽本地登录按钮
        $("#locallogin").attr("disabled", true);
      }
      this.msgtipshow(msg, icon);
    },

    cloudloginout: function () {
      debugger;
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_Logout", this.CloudHandle);
      if (SDKRet == -1) {
        this.msgtipshow($.lang.tip["userlogoutFail"], TIPS_TYPE.FAIL);
        return;
      } else {
        this.CloudHandle = -1;
        this.DeviceHandle = -1;
        //恢复本地登录状态
        $("#locallogin").attr("disabled", false);
        //登出后按钮状态更改
        this.cloudloginoutbtnstyle();
        this.msgtipshow($.lang.tip["userlogoutSuc"], TIPS_TYPE.SUCCEED);
        this.initloginoutbtn();

        //时间选择器输入框清空
        $("#startQuerytime").val("");
        $("#endQuerytime").val("");
        $("#getprogresstime").val("");
        $("#setprogresstime").val("");

        // //清空设备登录信息
        // $("#cloudUrl").val("");
        // $("#cloudUsername").val("");
        // $("#cloudPwd").val("");

        $("#cloudDevName").val("");
        $("#cloudDevPwd").val("");

        //录像、截图、下载回放路径隐藏
        $("#recordfiledispaly").addClass("hidden");
        $("#snapshoturldiv").addClass("hidden");
        $("#downloadpathurldiv").addClass("hidden");
        this.loginoutstopvideo();
        //删除已创建表格
        if (this.clouddevlisttable) {
          this.destoryTable("clouddevgirdTable");
        }
        if (this.clouddevchllisttable) {
          this.destoryTable("clouddevchllisttable");
        }
        if (this.localquerytable) {
          this.destoryTable("querytable");
        }
      }
    },

    cloudloginoutbtnstyle: function () {
      $("#cloudLogin").attr("disabled", false);
      $("#cloudloginout").attr("disabled", true);
      $("#getclouddevlist").attr("disabled", true);
      $("#cloudDevLogin").attr("disabled", true);
      $("#cloudDevLoginout").attr("disabled", true);
      $("#getdevcloudlist").attr("disabled", true);
    },

    cloudloginbtn: function () {
      $("#cloudLogin").attr("disabled", true);
      $("#getclouddevlist").attr("disabled", false);
      $("#cloudloginout").attr("disabled", false);
    },

    //获取云登陆列表
    GetCloudDevList: function () {
      debugger;
      this.CLOUDjsonMap = [];
      var colmodelwidth = "80px";
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_FindCloudDevListEx", this.CloudHandle);
      if (-1 == SDKRet) {
        this.msgtipshow($.lang.tip["tipcloudloginfail"], TIPS_TYPE.FAIL);
        return;
      } else {
        this.msgtipshow($.lang.tip["tipcloudlistsuc"], TIPS_TYPE.SUCCEED);
        this.getcloudlists(SDKRet);
      }
      var str = '<table id="clouddevgirdTable"></table>';
      $("#clouddevgirdTablediv").html(str);
      //创建云账号表格
      var cloudgridSetting = {
        datatype: "local",
        width: 1200,
        height: 300,
        colNames: [
          "设备名称",
          "设备用户名",
          "设备型号",
          "序列号",
          "IP地址"
        ],
        colModel: [
          {name: "szDevName", align: "center", width: colmodelwidth, sortable: false},
          {name: "szDevUserName", align: "center", width: colmodelwidth, sortable: false},
          {name: "szDevModel", align: "center", width: colmodelwidth, sortable: false},
          {name: "szDevSerialNum", align: "center", width: colmodelwidth, sortable: false},
          {name: "szIPAddr", align: "center", width: colmodelwidth, sortable: false}
        ]
      };
      this.createTable(cloudgridSetting, this.CLOUDjsonMap, "clouddevgirdTable");
      this.cloudDevsucpage();
    },

    cloudDevsucpage: function () {
      $("#cloudDevLogin").attr("disabled", false);
    },

    // 获取云端设备列表
    getcloudlists: function (Findle) {
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_FindNextCloudDevInfoEx", Findle);
      var oneData = JSON.parse(SDKRet);
      if (SDKRet != -1) {
        this.CLOUDjsonMap.push(oneData);
        this.getcloudlists(Findle);
      } else {
        var overFlag = top.sdk_viewer.execFunction("NETDEV_FindCloseCloudDevListEx", Findle);
        if (overFlag == 0) {
          msg = $.lang.tip["getlocallistsuc"];
          icon = TIPS_TYPE.SUCCEED;
        } else {
          msg = $.lang.tip["getlocallistfail"];
          icon = TIPS_TYPE.FAIL;
        }
        this.msgtipshow(msg, icon);
      }
    },

    cloudDevLogin: function () {
      debugger;
      var devName = $("#cloudDevName").val();
      this.clouddevicetype = $("#cloudDevType").val();
      var protocol = Number($("#cloudprotocol").val());
      var password = $("#cloudDevPwd").val();
      var dataMap = {
        szDeviceName: devName,
        szDevicePassword: password,
        dwLoginProto: protocol,
        dwT2UTimeout: 0
      };
      var jsonStr = JSON.stringify(dataMap);
      var cloudSDKRet = top.sdk_viewer.execFunction("NETDEV_LoginCloudDevice_V30", this.CloudHandle, jsonStr);
      cloudSDKRet = JSON.parse(cloudSDKRet);
      this.cloudDeviceHadle = cloudSDKRet["UserID"];
      this.DeviceHandle = cloudSDKRet["UserID"];
      if (-1 == cloudSDKRet) {
        this.msgtipshow($.lang.tip["tiploginfail"], TIPS_TYPE.FAIL);
        return;
      } else {
        //页面样式更改
        $("#cloudDevLoginout").attr("disabled", false);
        $("#cloudDevLogin").attr("disabled", true);
        $("#getdevcloudlist").attr("disabled", false);
        this.msgtipshow($.lang.tip["tiploginsuc"], TIPS_TYPE.SUCCEED);
      }
    },


    cloudDevLoginout: function () {
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_Logout", this.DeviceHandle);
      if (SDKRet == -1) {
        this.msgtipshow($.lang.tip["userlogoutFail"], TIPS_TYPE.FAIL);
        return;
      } else {
        this.DeviceHandle = -1;
        this.msgtipshow($.lang.tip["userlogoutSuc"], TIPS_TYPE.SUCCEED);
        $("#cloudDevLogin").attr("disabled", false);
        $("#cloudDevLoginout").attr("disabled", true);
        $("#getdevcloudlist").attr("disabled", true);
        if (this.clouddevchllisttable) {
          this.destoryTable("clouddevchllisttable");
        }
        if (this.localquerytable) {
          this.destoryTable("querytable");
        }
      }

    },

    getcloudevmsdevicelist: function (FindHandle) {
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_FindNextDevChn", FindHandle);
      var overFlag;
      var msg;
      var icon;
      if (SDKRet != -1) {
        SDKRet = JSON.parse(SDKRet);
        var oneData = Utils.objectClone(SDKRet);
        oneData["szChnName"] = SDKRet["stChnBaseInfo"]["szChnName"];
        oneData["dwChannelID"] = SDKRet["stChnBaseInfo"]["dwChannelID"];
        oneData["dwChnType"] = SDKRet["stChnBaseInfo"]["dwChnType"];
        oneData["dwChnStatus"] = SDKRet["stChnBaseInfo"]["dwChnStatus"];
        this.cloudEVMSjsonMap.push(oneData);
        this.getcloudevmsdevicelist(FindHandle);
      } else {
        overFlag = top.sdk_viewer.execFunction("NETDEV_FindCloseDevChn", FindHandle);
        if (overFlag == 0) {
          msg = $.lang.tip["getlocallistsuc"];
          icon = TIPS_TYPE.SUCCEED;
        } else {
          msg = $.lang.tip["getlocallistfail"];
          icon = TIPS_TYPE.FAIL;
        }
        this.msgtipshow(msg, icon);
      }
    },

    getcloudChannellist: function () {
      debugger;
      var SDKRet;
      if (this.clouddevicetype == deviceTypestr.IPC || this.clouddevicetype == deviceTypestr.NVR) {
        SDKRet = top.sdk_viewer.execFunction(pluginInterfce["NETDEV_QueryVideoChl"], this.cloudDeviceHadle);
        if (SDKRet == -1) {
          this.msgtipshow($.lang.tip["getlocallistfail"], TIPS_TYPE.FAIL);
          return;
        }
      } else if (this.clouddevicetype == deviceTypestr.EVMS) {
        SDKRet = top.sdk_viewer.execFunction("NETDEV_FindDevChnList", this.cloudDeviceHadle, 0, 0);
        if (SDKRet == -1) {
          this.msgtipshow($.lang.tip["getlocallistfail"], TIPS_TYPE.FAIL);
          return;
        } else {
          this.cloudEVMSjsonMap = [];
          this.getcloudevmsdevicelist(SDKRet);
        }
      }
      this.funprequebtnInit();
      var msg, icon;
      var tableHeight;
      if (SDKRet) {
        var str = '<table id="clouddevchllisttable"></table>';
        $("#clouddevlisttableDiv").html(str);
        var jsonMap = JSON.parse(SDKRet);
        var tableDatas;
        var gridSetting;
        var colmodelwidth = "80px";
        if (this.clouddevicetype == deviceTypestr.IPC || this.clouddevicetype == deviceTypestr.NVR) {
          tableDatas = jsonMap["VideoChlList"];
          if (this.clouddevicetype == deviceTypestr.IPC) {
            tableHeight = 300;
          } else if (this.clouddevicetype == deviceTypestr.NVR) {
            tableHeight = 300;
          }
          gridSetting = {
            datatype: "local",
            width: 1200,
            height: tableHeight,
            colNames: [
              "是否支持云台",
              "通道ID",
              "设备类型",
              "端口号",
              "流个数",
              // "IP地址类型",
              // "通道类型",
              "通道状态",
              // "视频输入制式",
              "通道名称",
              "设备型号",
              "IP地址"
            ],
            colModel: [
              {name: "bPtzSupported", align: "center", width: colmodelwidth, sortable: false},
              {name: "dwChannelID", align: "center", width: colmodelwidth, sortable: false},
              {name: "dwDeviceType", align: "center", width: colmodelwidth, sortable: false},
              {name: "dwPort", align: "center", width: colmodelwidth, sortable: false},
              {name: "dwStreamNum", align: "center", width: colmodelwidth, sortable: false},
              // {name: "enAddressType", align: "center", width: colmodelwidth, sortable: false},
              // {name: "enChannelType", align: "center", width: colmodelwidth, sortable: false},
              {name: "enStatus", align: "center", width: colmodelwidth, sortable: false},
              // {name: "enVideoFormat", align: "center", width: colmodelwidth, sortable: false},
              {name: "szChnName", align: "center", sortable: false},
              {name: "szDeviceModel", align: "center", sortable: false},
              {name: "szIPAddr", align: "center", sortable: false}
            ]
          };
        } else {
          tableDatas = this.cloudEVMSjsonMap;
          gridSetting = {
            datatype: "local",
            width: 1200,
            height: 300,
            colNames: [
              "通道名称",
              "是否支持云台",
              "支持最大流个数",
              "通道ID",
              "通道状态"
            ],
            colModel: [
              {name: "szChnName", align: "center", width: colmodelwidth, sortable: false},
              {name: "bSupportPTZ", align: "center", width: colmodelwidth, sortable: false},
              {name: "dwMaxStream", align: "center", width: colmodelwidth, sortable: false},
              {name: "dwChannelID", align: "center", width: colmodelwidth, sortable: false},
              {name: "dwChnStatus", align: "center", width: colmodelwidth, sortable: false}
            ]
          };
        }
        msg = $.lang.tip["getlocallistsuc"];
        icon = TIPS_TYPE.SUCCEED;
      } else {
        msg = $.lang.tip["getlocallistfail"];
        icon = TIPS_TYPE.FAIL;
      }
      if (!tableDatas) {
        return;
      }
      this.createTable(gridSetting, tableDatas, "clouddevchllisttable");
      this.msgtipshow(msg, icon);
      //获取设备列表成功，按钮启用
      this.funprequebtnInit();
    },
    /********************************** 云账号相关 end ************************************/
    //提示信息
    msgtipshow: function (msg, icon) {
      MSG.msgbox.show(msg, icon, 3000, 61, "errormsg");
    },

    /*************************************** 实况相关 Begin **********************************/
    //播放视频
    startVideo: function () {
      debugger;
      var msg;
      var icon;
      var channelValue = Number($("#DevchannelID").val());
      if (channelValue == "") {

      }
      var dataMap = {
        dwChannelID: channelValue,
        dwStreamType: LiveStream.LIVE_STREAM_INDEX_MAIN,
        dwLinkMode: Protocal.TRANSPROTOCAL_RTPTCP,
        dwFluency: 0
      };
      var jsonStr = JSON.stringify(dataMap);
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      //将窗口与流保存下来
      var obj = {
        streamtype: videostreamtype.live,
        screenNum: ResourceId
      };

      this.videotypejsonMap[ResourceId] = obj;

      top.sdk_viewer.execFunction("NETDEV_StopRealPlay", parseInt(ResourceId));
      var openretcode = top.sdk_viewer.execFunction("NETDEV_RealPlay", parseInt(ResourceId), this.DeviceHandle, jsonStr);
      if (0 != openretcode) {
        msg = $.lang.tip["tipstartvideofail"];
        icon = TIPS_TYPE.FAIL;
      } else {
        msg = $.lang.tip["tipstartvideosuc"];
        icon = TIPS_TYPE.SUCCEED;
      }
      this.msgtipshow(msg, icon);
    },

    // startvideofunbtn: function () {
    //     $("#closevideo").attr("disabled", false);
    //     $("#startRecord").attr("disabled", false);
    //     $("#stopRecord").attr("disabled", false);
    //     $("#opensound").attr("disabled", false);
    //     $("#closesound").attr("disabled", false);
    //     $("#getsound").attr("disabled", false);
    //     $("#setsound").attr("disabled", false);
    //     $("#snapshot").attr("disabled", false);
    // },

    //关闭视频
    stopVideo: function () {
      var msg;
      var icon;
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      this.videotypejsonMap[ResourceId] = null;
      var retcode = top.sdk_viewer.execFunction("NETDEV_StopRealPlay", parseInt(ResourceId));
      if (0 != retcode) {
        msg = $.lang.tip["tipstopvideofail"];
        icon = TIPS_TYPE.FAIL;
      } else {
        msg = $.lang.tip ["tipstopvideosuc"];
        icon = TIPS_TYPE.SUCCEED;
      }
      this.msgtipshow(msg, icon);
    },

    /******************************* 实况相关 END ***************************/

    /*************************************录像相关********************************/
    //开启本地录像
    startRecord: function () {
      var msg, icon;
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var retcode = top.sdk_viewer.execFunction("NETDEV_SaveRealData", parseInt(ResourceId), "C:\\NETDEV\\Record\\netDev" + this.recordlivename, MediaFileFormat.MEDIA_FILE_MP4);
      if (0 != retcode) {
        // 失败
        msg = $.lang.tip["tipstartRecordfail"];
        icon = TIPS_TYPE.FAIL;
      } else {
        msg = $.lang.tip["tipstartRecordsuc"];
        icon = TIPS_TYPE.SUCCEED;
      }
      this.msgtipshow(msg, icon);
    },

    //关闭本地录像
    stopRecord: function () {
      var msg, icon;
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var retcode = top.sdk_viewer.execFunction("NETDEV_StopSavaRealData", parseInt(ResourceId));
      if (0 != retcode) {
        msg = $.lang.tip["tipstopRecordfail"];
        icon = TIPS_TYPE.FAIL;
      } else {
        msg = $.lang.tip["tipstopRecordsuc"];
        icon = TIPS_TYPE.SUCCEED;
        $("#recordfiledispaly").removeClass("hidden");
        $("#recordfileurl").html("C:\\NETDEV\\Record");
        this.recordlivename++;
      }
      this.msgtipshow(msg, icon);
    },
    /**************************音频相关******************************************/
    //开启音频
    opensound: function () {
      var msg, icon;
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var retcode = top.sdk_viewer.execFunction("NETDEV_OpenSound", parseInt(ResourceId));//打开声音
      if (0 != retcode) {
        msg = $.lang.tip["tipstartsoundfail"];
        icon = TIPS_TYPE.FAIL;
      } else {
        msg = $.lang.tip["tipstartsoundsuc"];
        icon = TIPS_TYPE.SUCCEED;
      }
      this.msgtipshow(msg, icon);
    },

    //关闭音频
    closesound: function () {
      var msg, icon;
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var retcode = top.sdk_viewer.execFunction("NETDEV_CloseSound", parseInt(ResourceId));   //停止声音
      if (0 != retcode) {
        msg = $.lang.tip["tipstopsoundfail"];
        icon = TIPS_TYPE.FAIL;
      } else {
        msg = $.lang.tip["tipstopsoundsuc"];
        icon = TIPS_TYPE.SUCCEED;
      }
      this.msgtipshow(msg, icon);
    },

    //获取音频大小
    getsound: function () {
      var msg, icon;
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var retcode = top.sdk_viewer.execFunction("NETDEV_GetSoundVolume", parseInt(ResourceId));   //停止声音
      if (-1 == retcode) {
        msg = $.lang.tip["tipstartsoundfail"];
        icon = TIPS_TYPE.FAIL;
      } else {
        msg = $.lang.tip["tipgetsoundsuc"];
        icon = TIPS_TYPE.SUCCEED;
        $("#soundvalue").val(retcode);
      }
      this.msgtipshow(msg, icon);
    },

    //设置音频大小
    setsound: function () {
      var msg, icon;
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var soundValue = $("#soundvalue").val();
      var retcode = top.sdk_viewer.execFunction("NETDEV_SetSoundVolume", parseInt(ResourceId), soundValue);   //停止声音
      if (0 != retcode) {
        msg = $.lang.tip["tipsetsoundfail"];
        icon = TIPS_TYPE.FAIL;
      } else {
        msg = $.lang.tip["tipsetsoundsuc"];
        icon = TIPS_TYPE.SUCCEED;
      }
      this.msgtipshow(msg, icon);
    },
    /********************************截图相关********************************/
    snapshot: function () {
      var msg, icon;
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var retcode = top.sdk_viewer.execFunction("NETDEV_CapturePicture", parseInt(ResourceId), "C:\\NETDEV\\Pic\\netDev", PictureFormat.PICTURE_JPG);
      var snapshoturl = "C:\\NETDEV\\Pic\\netDev";
      if (0 != retcode) {
        msg = $.lang.tip["tipsnapshotfail"];
        icon = TIPS_TYPE.FAIL;
      } else {
        $("#snapshoturldiv").removeClass("hidden");
        msg = $.lang.tip["tipsnapshotsuc"];
        icon = TIPS_TYPE.SUCCEED;
        $("#snapshoturl").html(snapshoturl);
      }
      this.msgtipshow(msg, icon);
    },

    /*********************************云台相关********************************/
    presetOperation: function (id) {
      var ptzcontrolcmd;
      switch (id) {
        case "turnNW":
          ptzcontrolcmd = PtzCmd.LEFTUP;
          break;
        case "turnUP":
          ptzcontrolcmd = PtzCmd.TILTUP;
          break;
        case "turnNE":
          ptzcontrolcmd = PtzCmd.RIGHTUP;
          break;
        case "turnL":
          ptzcontrolcmd = PtzCmd.PANLEFT;
          break;
        case "turnSTOP":
          ptzcontrolcmd = PtzCmd.ALLSTOP;
          break;
        case "turnR":
          ptzcontrolcmd = PtzCmd.PANRIGHT;
          break;
        case "turnSW":
          ptzcontrolcmd = PtzCmd.LEFTDOWN;
          break;
        case "turnDN":
          ptzcontrolcmd = PtzCmd.TILTDOWN;
          break;
        case "turnSE":
          ptzcontrolcmd = PtzCmd.RIGHTDOWN;
          break;
      }
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var retcode = top.sdk_viewer.execFunction("NETDEV_PTZControl", parseInt(ResourceId), ptzcontrolcmd, 5);
      if (0 != retcode) {
        var msg = $.lang.tip["tippresetturnfail"];
        var icon = TIPS_TYPE.FAIL;
        this.msgtipshow(msg, icon);
      }
    },

    PTZ_GetPreset: function () {
      var msg, icon;
      var channelID = Number($("#DevchannelID").val());
      var presetList = top.sdk_viewer.execFunction("NETDEV_GetPTZPresetList", this.DeviceHandle, channelID);
      if (-1 == presetList) {
        $('#presetlistcontent').html("");
        msg = $.lang.tip["tipgetpresetfail"];
        icon = TIPS_TYPE.FAIL;
      } else {
        var presetIDSelect = $('#presetlistcontent');
        var dwPresetID;
        var szPresetName;
        var optionStr = "";
        var result = JSON.parse(presetList);
        for (var i = 0; i < result["dwSize"]; i++) {
          dwPresetID = result["stPresetList"][i]["dwPresetID"];
          szPresetName = result["stPresetList"][i]["szPresetName"];
          optionStr += '<option value="' + dwPresetID + ',' + szPresetName + '">' + dwPresetID + '【' + szPresetName + '】</option>';
        }
        presetIDSelect.html(optionStr);
        msg = $.lang.tip["tipgetpresetsuc"];
        icon = TIPS_TYPE.SUCCEED;
      }
      this.msgtipshow(msg, icon);
    },

    PTZ_SetPreset: function () {
      debugger;
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var msg, icon;
      var presetID = $("#presetID").val();
      var presetName = $("#presetName").val();
      if (presetID < 1 || isNaN(presetID) || presetID > 255) {
        this.msgtipshow("presetID error", TIPS_TYPE.FAIL);
        return;
      }
      var retcode = top.sdk_viewer.execFunction("NETDEV_PTZPreset", parseInt(ResourceId), PresetCmd.SET_PRESET, presetName, presetID);
      if (0 != retcode) {
        msg = $.lang.tip["tipsetpresetfail"];
        icon = TIPS_TYPE.FAIL;
      } else {
        msg = $.lang.tip["tipsetpresetsuc"];
        icon = TIPS_TYPE.SUCCEED;
        this.PTZ_GetPreset();
      }
      this.msgtipshow(msg, icon);
    },

    PTZ_GotoPreset: function () {
      var presetInfo = $("#presetlistcontent").val();
      if (!presetInfo) {
        this.msgtipshow("select presetID", TIPS_TYPE.CONFIRM);
        return;
      }
      var presetMap = presetInfo.split(",");
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var presetID = presetMap[0];
      var presetName = presetMap[1];
      var retcode = top.sdk_viewer.execFunction("NETDEV_PTZPreset", parseInt(ResourceId), PresetCmd.GOTO_PRESET, presetName, presetID);
      if (0 != retcode) {
        this.msgtipshow("Preset control fail", TIPS_TYPE.FAIL);
      }
    },

    PTZ_DeletePreset: function () {
      var presetInfo = $("#presetlistcontent").val();
      if (!presetInfo) {
        this.msgtipshow("select presetID", TIPS_TYPE.CONFIRM);
        return;
      }
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var presetMap = presetInfo.split(",");
      var presetID = presetMap[0];
      var presetName = presetMap[1];
      var retcode = top.sdk_viewer.execFunction("NETDEV_PTZPreset", parseInt(ResourceId), PresetCmd.CLE_PRESET, presetName, presetID);
      if (0 != retcode) {
        this.msgtipshow("Preset control fail", TIPS_TYPE.FAIL);
      } else {
        this.PTZ_GetPreset();
      }
    },

    /******************************* 查询相关 *********************************/
    queryclick: function () {
      WdatePicker({
        dateFmt: 'yyyy-MM-dd HH:mm:ss'
      })
    },

    commonQuery: function () {
      var BeginTime = $("#startQuerytime").val();
      var EndTime = $("#endQuerytime").val();
      if (BeginTime == "" || EndTime == "") {
        this.msgtipshow($.lang.tip["tipinputsearchtime"], TIPS_TYPE.CONFIRM);
        return;
      }
      BeginTime = BeginTime.replace(/-/g, "/");
      EndTime = EndTime.replace(/-/g, "/");
      var vBeginTime = (new Date(BeginTime).getTime()) / 1000;
      var vEndTime = (new Date(EndTime).getTime()) / 1000;
      var channelID = $("#DevchannelID").val();
      var dataMap = {
        szFileName: 0,
        dwChannelID: channelID,
        dwFileType: EventType.ALL,
        tBeginTime: vBeginTime,
        tEndTime: vEndTime
      };
      var jsonStr = JSON.stringify(dataMap);
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_FindFile", this.DeviceHandle, jsonStr);
      if (-1 != SDKRet) {
        this.queryHandle = SDKRet;
        this.msgtipshow("Find OK!Please Click 'Find All' button to Get File", TIPS_TYPE.SUCCEED);
      }
      else {
        this.msgtipshow("Not find", TIPS_TYPE.CONFIRM);
      }
    },

    findall: function () {
      var result;
      var tBeginTime;
      var tEndTime;
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_FindNextFile", this.queryHandle);
      if (-1 != SDKRet) {
        result = JSON.parse(SDKRet);
        tBeginTime = this.changeMStoDate(result["tBeginTime"] * 1000);
        tEndTime = this.changeMStoDate(result["tEndTime"] * 1000);
        var dateobj = {
          tBeginTime: tBeginTime,
          tEndTime: tEndTime
        };
        this.queryjsonMap.push(dateobj);
        this.findall();
      } else {
        if (this.queryjsonMap.length == 0) {
          this.msgtipshow("Not find", TIPS_TYPE.CONFIRM);
        } else {
          this.createQuerytable();
          this.closefind();
        }
      }
    },

    createQuerytable: function () {
      var str = '<table id="querytable" class="querytable"></table>';
      $("#querytablediv").html(str);
      var width = Number($("#queryBtn").width());
      //创建查询结果表格
      var querygridSetting = {
        datatype: "local",
        width: width,
        height: 100,
        colNames: [
          "开始时间",
          "结束时间"
        ],
        colModel: [
          {name: "tBeginTime", align: "center", width: 80, sortable: false},
          {name: "tEndTime", align: "center", width: 80, sortable: false},
        ]
      };
      this.createTable(querygridSetting, this.queryjsonMap, "querytable");
    },

    changeMStoDate: function (ms) {
      var datedata = new Date(ms);
      // return datedata;
      return datedata.toLocaleString();
    },

    findNextfile: function () {
      debugger;
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_FindNextFile", this.queryHandle);
      if (-1 != SDKRet) {
        var result = JSON.parse(SDKRet);
        this.PlayBackBeginTime = result.tBeginTime;
        this.PlayBackEndTime = result.tEndTime;
        var dataMap = {
          BeginTime: this.getLocalTime(this.PlayBackBeginTime),
          EndTime: this.getLocalTime(this.PlayBackEndTime)
        };
        var jsonStr = JSON.stringify(dataMap);
        alert(jsonStr);
      }
      else {
        this.msgtipshow("Not find", TIPS_TYPE.CONFIRM);
      }
    },

    getLocalTime: function (nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 17)
    },

    closefind: function () {
      var msg, icon;
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_FindClose", this.queryHandle);
      if (-1 != SDKRet) {
        msg = "Find Success";
        icon = TIPS_TYPE.SUCCEED;
      } else {
        msg = "Find Fail";
        icon = TIPS_TYPE.FAIL;

      }
      this.msgtipshow(msg, icon);
    },

    playbackbytime: function () {
      debugger;
      var BeginTime = $("#startQuerytime").val();
      var EndTime = $("#endQuerytime").val();
      if (BeginTime == "" || EndTime == "") {
        this.msgtipshow($.lang.tip["tipinputsearchtime"], TIPS_TYPE.CONFIRM);
        return;
      }
      BeginTime = BeginTime.replace(/-/g, "/");
      EndTime = EndTime.replace(/-/g, "/");
      var vBeginTime = (new Date(BeginTime).getTime()) / 1000;
      var vEndTime = (new Date(EndTime).getTime()) / 1000;
      var channelID = $("#DevchannelID").val();
      var dataMap = {
        dwChannelID: channelID,
        tBeginTime: vBeginTime,
        tEndTime: vEndTime,
        dwLinkMode: Protocal.TRANSPROTOCAL_RTPTCP,
        dwFileType: EventType.ALL,
        dwPlaySpeed: 9
      };
      var jsonStr = JSON.stringify(dataMap);
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var obj = {
        streamtype: videostreamtype.playback,
        screenNum: ResourceId
      };
      this.videotypejsonMap[ResourceId] = obj;
      top.sdk_viewer.execFunction("NETDEV_StopPlayback", ResourceId);
      var retcode = top.sdk_viewer.execFunction("NETDEV_PlayBack", parseInt(ResourceId), this.DeviceHandle, jsonStr);
      if (-1 == retcode) {
        this.msgtipshow("playback fail", TIPS_TYPE.FAIL);
      }
    },

    stopplayback: function () {
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      this.videotypejsonMap[ResourceId] = null;
      var retcode = top.sdk_viewer.execFunction("NETDEV_StopPlayback", ResourceId);
      if (0 != retcode) {
        this.msgtipshow("stop fail", TIPS_TYPE.FAIL);
      }
    },

    downloadbytime: function () {
      debugger;
      var BeginTime = $("#startQuerytime").val();
      var EndTime = $("#endQuerytime").val();
      if (BeginTime == "" || EndTime == "") {
        this.msgtipshow($.lang.tip["tipinputsearchtime"], TIPS_TYPE.CONFIRM);
        return;
      }
      BeginTime = BeginTime.replace(/-/g, "/");
      EndTime = EndTime.replace(/-/g, "/");
      var vBeginTime = (new Date(BeginTime).getTime()) / 1000;
      var vEndTime = (new Date(EndTime).getTime()) / 1000;
      var channelID = Number($("#DevchannelID").val());
      var dataMap = {
        dwChannelID: channelID,
        tBeginTime: vBeginTime,
        tEndTime: vEndTime,
        dwLinkMode: Protocal.TRANSPROTOCAL_RTPTCP,
        dwFileType: EventType.ALL,
        dwDownloadSpeed: 3
      };
      var jsonStr = JSON.stringify(dataMap);
      var retcode = top.sdk_viewer.execFunction("NETDEV_GetFileByTime", this.DeviceHandle, jsonStr, "C:\\NETDEV_\\DownLoad\\netDev", MediaFileFormat.MEDIA_FILE_MP4);
      if (-1 == retcode) {
        this.msgtipshow("Download fail", TIPS_TYPE.FAIL);
      } else {
        this.msgtipshow("Downloading ... Please click 'stop download'button to save file", TIPS_TYPE.SUCCEED);
      }
      this.DownLoadHandle = retcode;
    },
    stopdownload: function () {
      var retcode = top.sdk_viewer.execFunction("NETDEV_StopDownload", this.DownLoadHandle);
      if (0 != retcode) {
        this.msgtipshow("stop fail", TIPS_TYPE.FAIL);
      } else {
        this.msgtipshow("Download succeed!", TIPS_TYPE.SUCCEED);
        $("#downloadpathurl").html("C:\\NETDEV_\\DownLoad\\netDev");
        $("#downloadpathurldiv").removeClass("hidden");
      }
    },
    GetProgress: function () {
      debugger;
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var dataMap = {
        pulTime: 0,
        pulSpeed: 0
      };
      var jsonStr = JSON.stringify(dataMap);
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_PlayBackControl", parseInt(ResourceId), PlayControl.NETDEV_PLAY_CTRL_GETPLAYTIME, jsonStr);
      if (-1 != SDKRet) {
        var result = JSON.parse(SDKRet);
        var PlayTime = result.PlayTime;
        var showplaytime = this.changeMStoDate(PlayTime * 1000);
        $("#getprogresstime").val(showplaytime);
      }
      else {
        this.msgtipshow("Not find", TIPS_TYPE.FAIL);
      }
    },

    SetProgress: function () {
      debugger;
      var setprogresstime = $("#setprogresstime").val();
      if (setprogresstime == "") {
        this.msgtipshow($.lang.tip["tipinputsearchtime"], TIPS_TYPE.CONFIRM);
        return;
      }
      setprogresstime = setprogresstime.replace(/-/g, "/");
      var pullTime = parseInt((new Date(setprogresstime).getTime()) / 1000);
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var dataMap = {
        pulTime: pullTime,
        pulSpeed: 20
      };
      var jsonStr = JSON.stringify(dataMap);
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_PlayBackControl", parseInt(ResourceId), PlayControl.NETDEV_PLAY_CTRL_SETPLAYTIME, jsonStr);
      if (-1 == SDKRet) {
        this.msgtipshow("Set Play Time Fail", TIPS_TYPE.FAIL);
      } else {
        this.msgtipshow("Set play Time Success", TIPS_TYPE.SUCCEED);
      }
    },
    resumeProgress: function () {
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var dataMap = {
        pulTime: 0,
        pulSpeed: 0
      };
      var jsonStr = JSON.stringify(dataMap);
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_PlayBackControl", parseInt(ResourceId), PlayControl.NETDEV_PLAY_CTRL_RESUME, jsonStr);
      if (-1 == SDKRet) {
        this.msgtipshow("Resume Fail", TIPS_TYPE.FAIL);
      }
    },

    Pauseprogress: function () {
      var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
      var dataMap = {
        pulTime: 0,
        pulSpeed: 0
      };
      var jsonStr = JSON.stringify(dataMap);
      var SDKRet = top.sdk_viewer.execFunction("NETDEV_PlayBackControl", parseInt(ResourceId), PlayControl.NETDEV_PLAY_CTRL_PAUSE, jsonStr);
      if (-1 == SDKRet) {
        this.msgtipshow("Pause fail", TIPS_TYPE.FAIL);
      }
    },
    /**************************停止所有播放流********************/
    stoponevideo: function (id) {
      top.sdk_viewer.execFunction("NETDEV_StopRealPlay", id);
    },

    /**************************停止播放单路回放流*******************/

    stoponeplaybackvideo: function (id) {
      top.sdk_viewer.execFunction("NETDEV_StopPlayback", id);
    },
    /**************************清理SDK并关闭线程********************/
    destory_activex: function () {
      if (top.sdk_viewer) {
        var ResourceId = top.sdk_viewer.execFunction("NetSDKGetFocusWnd");
        top.sdk_viewer.execFunction("NETDEV_CloseSound", parseInt(ResourceId));
        top.sdk_viewer.execFunction("NETDEV_StopRealPlay", parseInt(ResourceId));
        top.sdk_viewer.execFunction("NETDEV_Cleanup");
        delete top.sdk_viewer;
      }
    },

    /******************************* 日志相关 BEGIN ***************************/
    /**
     * 开启日志
     * @constructor
     */
    OpenLog: function () {
      var SDKRet = top.sdk_viewer.execFunction(pluginInterfce["NETDEV_SetWriteLog"], 1);
      var msg;
      var icon;
      if (-1 != SDKRet) {
        msg = $.lang.tip["tiplogOpensuc"];
        icon = TIPS_TYPE.SUCCEED;
      } else {
        msg = $.lang.tip["tiplogOpenfail"];
        icon = TIPS_TYPE.FAIL;
      }
      this.msgtipshow(msg, icon);
    },
    /**
     * 关闭日志
     * @constructor
     */
    CloseLog: function () {
      var SDKRet = top.sdk_viewer.execFunction(pluginInterfce["NETDEV_SetWriteLog"], 0);
      var msg;
      var icon;
      if (-1 != SDKRet) {
        msg = $.lang.tip["tiplogClosesuc"];
        icon = TIPS_TYPE.SUCCEED;
      } else {
        msg = $.lang.tip["tiplogClosefail"];
        icon = TIPS_TYPE.FAIL;
      }
      this.msgtipshow(msg, icon);
    },

    setlogpath: function () {
      var pathurl = $("#logpath").val();
      var msg;
      var icon;
      if (pathurl == "") {
        this.msgtipshow($.lang.tip["tipsetlogpath"], TIPS_TYPE.CONFIRM);
      } else {
        var SDKRet = top.sdk_viewer.execFunction("NETDEV_SetLogPath", pathurl);
        if (SDKRet != -1) {
          msg = $.lang.tip["tiplogClosesuc"];
          icon = TIPS_TYPE.SUCCEED;
          $("#openLog").attr("disabled", false);
          $("#closeLog").attr("disabled", false);
        } else {
          msg = $.lang.tip["tiplogClosefail"];
          icon = TIPS_TYPE.FAIL;
        }
        this.msgtipshow(msg, icon);
      }
    },
    /******************************* 日志相关 END ***************************/

    /*************************** 公用方法 Begin ****************************/
    //滚动调滑动一小步，为解决关闭视频最后一帧画面问题
    bodyScroll: function () {
      var t = $(window).scrollTop();
      $('body,html').animate({'scrollTop': t - 10}, 100);
      $('body,html').animate({'scrollTop': t + 10}, 100);
    },
    //清除表格
    destoryTable: function (id) {
      $.jgrid.gridDestroy("#" + id);
    }
  });
  return new mainClass();
}(jQuery);
export default Index(d);

