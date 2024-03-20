package cn.lookout.base.service;

import java.util.Map;

import cn.lookout.base.bean.Response;

public interface IDeviceService {
	
	//获取设备信息
	public Response getDeviceInfoByGfNum(Map requestMap);
	//获取设备设置左侧列表信息
	public Response getCjDeviceLeftSetting(Map requestMap);
	//获取设备设置信息
	public Response getCjDeviceSettingInfo(Map requestMap);
	//保存采集设备设置
	public Response saveCjDeviceSetting(Map requestMap);
	//修改采集设备设置
	public Response updateCjDeviceSetting(Map requestMap);
	//删除采集设备设置
	public Response deleteCjDeviceSetting(Map requestMap);
	//获取控制器设备设置列表
	public Response getControlDeviceLeftSetting(Map requestMap);
	//获取控制器设备详细设置
	public Response getControlDeviceSettingInfo(Map requestMap);
	//保存控制器设置
	public Response saveControlDeviceSetting(Map requestMap);
	//修改控制器设置
	public Response updateControlDeviceSetting(Map requestMap);
	//删除控制器设置
	public Response deleteControlDeviceSetting(Map requestMap);
	//修改控制器状态
	public Response updateControlDeviceState(Map requestMap);
	//获取账号摄像头
	public Response getCameraInfo(Map requestMap);
	//设置摄像头参数
//	public Response updateCameraSetting(Map requestMap , HttpSession session);
	//设备报表
//	public Response showReport(Map requestMap , HttpSession session);
	//控制器设备启用禁用
	public Response updateControlDeviceUse(Map requestMap);
	//获取控制器状态(开启，关闭，断开)
	public Response getControlState(Map requestMap);
	//获取某控制器开关状态
	public Response getControlDeviceSwitchList(Map requestMap);
	//获取设备信息(WEB接口)
	public Response getDeviceInfoByGfNumWeb(Map requestMap);
	//投食机推送指令
	public Response pushFeedMachine(Map requestMap); 
	//获取可修改的设备列表（解决传感器数值不准）
	public Response getCanModifyDevice(Map requestMap);
	//获取设备修改的状态、数值（解决传感器数值不准）
	public Response getDeviceModifyVal(Map requestMap);
	//修改设备接收改为手动修改，固定数值（解决传感器数值不准）
	public Response updateDeviceModifyVal(Map requestMap);
	//更新设备执行任务列表（通过公司id，大棚号，设备id，开关编号）
	public void updateDeviceTimeSchedule(String companyId, String gfNum, String deviceId, String switchNum);
	
}
