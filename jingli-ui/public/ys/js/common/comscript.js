//提示信息对一个的图标
var TIPS_TYPE = {
    CONFIRM: 0,
    SUCCEED: 1,
    FAIL: 2,
    LOADING: 3
};

//流播放类型
var videostreamtype = {
    live: 0,  //实况流
    playback: 1 //回放流
};

//流类型
var StreamType = {
    LIVE: 0,    //实况流
    PICTRUE: 1, //抓拍流（jpeg）
    MJPEG: 2,    //照片流
    IMAGE_TYPE_PLATE: 3, //过车图片流
    PIC_VIEW: 4 //图片查看
};
//流帧率
var LiveStream = {
    LIVE_STREAM_INDEX_MAIN: 0,   // 主流
    LIVE_STREAM_INDEX_AUX: 1,   // 辅流
    LIVE_STREAM_INDEX_THIRD: 2    // 第三流
};

//云台相关
var PtzCmd = {
    TILTUP: 0x0402,         // 向上
    TILTDOWN: 0x0404,       // 向下
    PANRIGHT: 0x0502,       // 向右
    PANLEFT: 0x0504,        // 向左
    LEFTUP: 0x0702,         // 左上
    LEFTDOWN: 0x0704,       // 左下
    RIGHTUP: 0x0802,        // 右上
    RIGHTDOWN: 0x0804,      // 右下
    ALLSTOP: 0x0901         // 全停命令字
};

var PresetCmd = {
    SET_PRESET:           0,            // 设置预置位
    CLE_PRESET:           1,            // 清除预置位
    GOTO_PRESET:          2             // 转到预置位
};

var Protocal = {
    TRANSPROTOCAL_RTPTCP:      1,         //TCP
    TRANSPROTOCAL_RTPUDP:      2          // UDP
};

var pluginInterfce = {
    //局域网登录控件接口
    NETDEV_Login: "NETDEV_Login_V30",  //登录
    NETDEV_QueryVideoChl: "NETDEV_QueryVideoChlDetailListEx",  //通道接口查询
    //宇视云平台登录控件接口
    NETDEV_LoginCloud: "NETDEV_LoginCloud",   //云端账号登录
    NETDEV_CloudlDevlist: "NETDEV_GetCloudDevList",  //云端设备列表获取
    NETDEV_CloudDevLogin: "NETDEV_LoginCloudDevice_V30",   //云端账号设备登录
    //日志控件接口
    NETDEV_SetWriteLog: "NETDEV_SetWriteLogFlag"
};

var PlayControl ={
    NETDEV_PLAY_CTRL_PLAY:             0,           /* 开始播放  Play */
    NETDEV_PLAY_CTRL_PAUSE:            1,           /* 暂停播放  Pause */
    NETDEV_PLAY_CTRL_RESUME:           2,           /* 恢复播放  Resume */
    NETDEV_PLAY_CTRL_GETPLAYTIME:      3,           /* 获取播放进度  Obtain playing time */
    NETDEV_PLAY_CTRL_SETPLAYTIME:      4,           /* 设置播放进度  Configure playing time */
    NETDEV_PLAY_CTRL_GETPLAYSPEED:     5,           /* 获取播放速度  Obtain playing speed */
    NETDEV_PLAY_CTRL_SETPLAYSPEED:     6,           /* 设置播放速度  Configure playing speed */
    NETDEV_PLAY_CTRL_SINGLE_FRAME:     7            /* 设置单帧播放  Configure single frame playing speed */
}

//查询所需事件存储类型
var EventType = {
    ALL: 0,                    // 所有的存储
    MOTIONDETECTION: 4,        // 运动检测事件存储
    DIGITALINPUT: 5,           // 数字输入事件存储
    VIDEOLOSS: 7,              // 视频丢失事件存储
    INVALID: 0xFF              // 无效值
};


var deviceTypestr = {
    EVMS: 501, //一体机
    NVR: 101,  //NVR
    IPC: 1     //IPC
};

//视频存储类型
var MediaFileFormat = {
    MEDIA_FILE_MP4:            0,           // mp4格式的媒体文件
    MEDIA_FILE_TS:             1            // TS格式的媒体文件  TS media file */
};

//截图图片类型
var PictureFormat = {
    PICTURE_BMP: 0,                  // 图片格式为bmp格式
    PICTURE_JPG: 1                   // 图片格式为jpg格式
};


