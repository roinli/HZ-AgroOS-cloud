package cn.lookout.base.bean;

public class DeviceSettingInfo {

	private String id;
	private String compayId;
	private String gfNum;
	private String deviceNum;
	private String controlType;//控制类型 0定时 1循环 2智能
	private String openDevice;//智能控制打开设备
	private String closeDevice;//智能控制关闭设备
	private String openType;//打开条件0大于 1小于
	private String closeType;//关闭条件0大于 1小于
	private String openVal;//打开条件数值
	private String closeVal;//关闭条件数值
	private String startTime;//开启时间
	private String endTime;//结束时间
	private String loopType;//循环结束类型 0时间 1次数
	private String loopCnt;//循环次数
	private String durationTime;//持续时间(分钟)
	private String intervalTime;//间隔(分钟)
	private int useState;//0禁用 1开启
	private String loopWeek;//循环周期1-7
	private String switchNum;//控制器设备开关编号(71-1  71-2等)
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCompayId() {
		return compayId;
	}
	public void setCompayId(String compayId) {
		this.compayId = compayId;
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
	public String getControlType() {
		return controlType;
	}
	public void setControlType(String controlType) {
		this.controlType = controlType;
	}
	public String getOpenDevice() {
		return openDevice;
	}
	public void setOpenDevice(String openDevice) {
		this.openDevice = openDevice;
	}
	public String getCloseDevice() {
		return closeDevice;
	}
	public void setCloseDevice(String closeDevice) {
		this.closeDevice = closeDevice;
	}
	public String getOpenType() {
		return openType;
	}
	public void setOpenType(String openType) {
		this.openType = openType;
	}
	public String getCloseType() {
		return closeType;
	}
	public void setCloseType(String closeType) {
		this.closeType = closeType;
	}
	public String getOpenVal() {
		return openVal;
	}
	public void setOpenVal(String openVal) {
		this.openVal = openVal;
	}
	public String getCloseVal() {
		return closeVal;
	}
	public void setCloseVal(String closeVal) {
		this.closeVal = closeVal;
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
	public String getLoopType() {
		return loopType;
	}
	public void setLoopType(String loopType) {
		this.loopType = loopType;
	}
	public String getLoopCnt() {
		return loopCnt;
	}
	public void setLoopCnt(String loopCnt) {
		this.loopCnt = loopCnt;
	}
	public String getDurationTime() {
		return durationTime;
	}
	public void setDurationTime(String durationTime) {
		this.durationTime = durationTime;
	}
	public String getIntervalTime() {
		return intervalTime;
	}
	public void setIntervalTime(String intervalTime) {
		this.intervalTime = intervalTime;
	}
	public int getUseState() {
		return useState;
	}
	public void setUseState(int useState) {
		this.useState = useState;
	}
	public String getLoopWeek() {
		return loopWeek;
	}
	public void setLoopWeek(String loopWeek) {
		this.loopWeek = loopWeek;
	}
	public String getSwitchNum() {
		return switchNum;
	}
	public void setSwitchNum(String switchNum) {
		this.switchNum = switchNum;
	}
	
	
}
