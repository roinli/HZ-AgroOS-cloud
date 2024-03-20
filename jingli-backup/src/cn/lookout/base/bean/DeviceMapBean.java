package cn.lookout.base.bean;

public class DeviceMapBean {

	private int deviceId;	//设备id
	
	private String deviceName;//设备名称
	
	private int deviceType;//设备类型 1表示农业、2表示渔业、3表示大田、4表示仓库
	
	private int dataType;//0动态设备(控制器等)	1静态设备（传感器等）
	
	private String dataFormat;//单位
	
	private int parkDevice;//园区设备
	
	private int canModify;//是否可修改

	
	public int getParkDevice() {
		return parkDevice;
	}

	public void setParkDevice(int parkDevice) {
		this.parkDevice = parkDevice;
	}

	public DeviceMapBean(int deviceId, String deviceName, int deviceType, int dataType, String dataFormat , int parkDevice , int canModify) {
		super();
		this.deviceId = deviceId;
		this.deviceName = deviceName;
		this.deviceType = deviceType;
		this.dataType = dataType;
		this.dataFormat = dataFormat;
		this.parkDevice = parkDevice;
		this.canModify = canModify;
	}

	public int getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(int deviceId) {
		this.deviceId = deviceId;
	}

	public String getDeviceName() {
		return deviceName;
	}

	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}

	public int getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(int deviceType) {
		this.deviceType = deviceType;
	}

	public int getDataType() {
		return dataType;
	}

	public void setDataType(int dataType) {
		this.dataType = dataType;
	}

	public String getDataFormat() {
		return dataFormat;
	}

	public void setDataFormat(String dataFormat) {
		this.dataFormat = dataFormat;
	}
	
	public int getCanModify() {
		return canModify;
	}

	public void setCanModify(int canModify) {
		this.canModify = canModify;
	}
	
}
