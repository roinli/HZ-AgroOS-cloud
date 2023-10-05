var video = function ($) {
    // var EventMap = (function () {
    //     return {
    //         /* 人脸抓拍时*/
    //         __14: function () {
    //             video.isHaveSpace = false;
    //             video.noSpaceReport();
    //         }
    //     }
    // })();
    var EventMap = (function(){
        var closure = {
            formatExceotionCode: function(u32ExceptionCode){
                u32ExceptionCode = u32ExceptionCode.split(',');
                return parseInt(u32ExceptionCode, 10);
            },
            formatTaskNo: function(u32Task_No){
                u32Task_No = u32Task_No.split(',');
                return parseInt(u32Task_No, 10);
            }
        };
        return {
            /* 告警事件上报 */
            __200:function(strAlarmInfo){
                //alert(strAlarmInfo);
            }
        };
    })();
    var mainClass = Class.extend({
        sdk_viewer: null,
        init: function () {

        },
        initOcx: function () {
            var cfg = {
                id: "player",                    //加载的activex控件id
                container: "playerContainer",    //控件/插件的父节点
                name: "video.sdk_viewer",              //实例对象的名称，用于设置napi上报事件的入参
                events: EventMap,                //控件事件map
                stPortInfo: {                    //端口信息
                    szDeviceIp: "",
                    szLocalIp: "",
                },
                stUserInfo: {                    //用户登录信息
                    User: "",
                    Password: ""
                },
                maxWnd: 64,                       //控件动态创建窗格的个数，不小于最大通道路数,默认64路 (可选)
                focusColor: 'ffcc00',             //窗格获得焦点时的边框颜色，注意：参数形如'xxxxxx'，为颜色的16进制，以b g r 顺序，而不是r g b (可选)
                unfocusColor: '747d7d',           //窗格未获得焦点时的边框颜色，注意：参数形如'xxxxxx'，为颜色的16进制，以b g r 顺序，而不是r g b (可选)
                backgColor: '000000'              //控件背景色，注意：参数形如'xxxxxx'，为颜色的16进制，以b g r 顺序，而不是r g b (可选)
            };
            this.sdk_viewer = new Player(cfg);
            top.sdk_viewer = this.sdk_viewer;
        },
        // 人脸抓拍磁盘空间不足的上报
        noSpaceReport: function () {
            var msg = $.lang.tip["tipCaptureDiskSpaceUnderThreshold"];
            MSG.msgbox.show(msg,TIPS_TYPE.CONFIRM,2000,61);
        }
    });
    return new mainClass();
}(jQuery);
