package cn.lookout.base.bean;

public class WebSocketBean {
	
	private String companyId;
	
	private String gfNum;
	
	private String deviceNum;
	
	private String msgInfo;
	
	private String state;//0关闭 1开启
	
	private String type;//0采集器  1控制器
	
	private String val;//采集数值
	
	private String switchNum;//设备开关编号(71-1后边的-1)
	
	private String deviceType;//设备类型0农1渔2田3仓
	
	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}

	public WebSocketBean(String companyId, String gfNum, String deviceNum, String state , String msgInfo,String type,String val,String switchNum,String deviceType) {
		super();
		this.companyId = companyId;
		this.gfNum = gfNum;
		this.deviceNum = deviceNum;
		this.state = state;
		this.msgInfo = msgInfo;
		this.type = type;
		this.val = val;
		this.switchNum = switchNum;
		this.deviceType = deviceType;
	}

	public String getSwitchNum() {
		return switchNum;
	}

	public void setSwitchNum(String switchNum) {
		this.switchNum = switchNum;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getGfNum() {
		return gfNum;
	}

	public void setGfNum(String gfNum) {
		this.gfNum = gfNum;
	}

	public String getDeviceNum() {
		return deviceNum;
	}

	public void setDeviceNum(String deviceNum) {
		this.deviceNum = deviceNum;
	}

	public String getMsgInfo() {
		return msgInfo;
	}

	public void setMsgInfo(String msgInfo) {
		this.msgInfo = msgInfo;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getVal() {
		return val;
	}

	public void setVal(String val) {
		this.val = val;
	}
	
	
	
}
