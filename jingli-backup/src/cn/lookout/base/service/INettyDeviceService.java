package cn.lookout.base.service;

public interface INettyDeviceService {
	
	//设备离线
	public void updateDeviceOffline(String msg);
	//设备定时
	public void saveDeviceTimeSchedule();
	//设备定时下发
	public void sendDeviceTimeTask();
	//接收设备消息
	public void getDevicePushMsg();
	//获取天气状况
	public void getWeather();
	
}
