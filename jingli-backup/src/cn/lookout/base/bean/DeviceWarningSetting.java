package cn.lookout.base.bean;

public class DeviceWarningSetting {
	
	private int id;
	private int companyId;
	private int gfNum;
	private int deviceId;
	private String startTime;//开启时间
	private String endTime;//结束时间
	private String leftRange;//左临界值
	private String rightRange;//右临界值
	private int useState;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCompanyId() {
		return companyId;
	}
	public void setCompanyId(int companyId) {
		this.companyId = companyId;
	}
	public int getGfNum() {
		return gfNum;
	}
	public void setGfNum(int gfNum) {
		this.gfNum = gfNum;
	}
	public int getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(int deviceId) {
		this.deviceId = deviceId;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getLeftRange() {
		return leftRange;
	}
	public void setLeftRange(String leftRange) {
		this.leftRange = leftRange;
	}
	public String getRightRange() {
		return rightRange;
	}
	public void setRightRange(String rightRange) {
		this.rightRange = rightRange;
	}
	public int getUseState() {
		return useState;
	}
	public void setUseState(int useState) {
		this.useState = useState;
	}
	
	
	
}
