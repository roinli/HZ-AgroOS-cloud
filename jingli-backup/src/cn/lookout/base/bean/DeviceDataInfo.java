package cn.lookout.base.bean;

public class DeviceDataInfo {
	
	private String data;//当前数据
	
	private String state;//设备状态0正常1预警2断线

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
}
