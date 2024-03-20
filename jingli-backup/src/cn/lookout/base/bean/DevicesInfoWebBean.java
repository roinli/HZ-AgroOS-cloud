package cn.lookout.base.bean;

public class DevicesInfoWebBean {
	
	private String id;
	
	private String deviceType;//1传感器器  0控制器
	
	private String val;//设备数值
	
	private String state;//设备状态
	
	private String name;//设备名

	private String unit;//单位
	
	private String img;//设备图片
	
	private String canModify;//是否可以手动修改0否1是
	
	public String getCanModify() {
		return canModify;
	}

	public void setCanModify(String canModify) {
		this.canModify = canModify;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getVal() {
		return val;
	}

	public void setVal(String val) {
		this.val = val;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
	
	
}
