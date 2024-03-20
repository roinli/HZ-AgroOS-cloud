package cn.lookout.base.bean;

public class DeviceTimeSchedule {
	
	private String companyId;
	private String gfNum;
	private String deviceNum;
	private Integer loopType;
	private String startTime;
	private String endTime;
	private Integer loopCnt;
	private Integer durationTime;
	private Integer intervalTime;
	private String controlType;
	private Integer packageType;
	private String switchNum;
	
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
	public Integer getLoopType() {
		return loopType;
	}
	public void setLoopType(Integer loopType) {
		this.loopType = loopType;
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
	public Integer getLoopCnt() {
		return loopCnt;
	}
	public void setLoopCnt(Integer loopCnt) {
		this.loopCnt = loopCnt;
	}
	public Integer getDurationTime() {
		return durationTime;
	}
	public void setDurationTime(Integer durationTime) {
		this.durationTime = durationTime;
	}
	public Integer getIntervalTime() {
		return intervalTime;
	}
	public void setIntervalTime(Integer intervalTime) {
		this.intervalTime = intervalTime;
	}
	public String getControlType() {
		return controlType;
	}
	public void setControlType(String controlType) {
		this.controlType = controlType;
	}
	public Integer getPackageType() {
		return packageType;
	}
	public void setPackageType(Integer packageType) {
		this.packageType = packageType;
	}
	
	
}
