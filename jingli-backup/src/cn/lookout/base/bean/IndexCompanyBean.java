package cn.lookout.base.bean;

public class IndexCompanyBean {
	
	private Integer id;//公司id
	private String name;//公司名称
	private int maxCnt;//下属组织
	private int type;//类型0农业  1渔业
	private int deviceCnt;//设备数量
	private int offlineCnt;//断线数
	private int waringCnt;//预警数
	private int runingCnt;//正在运行数
	private String crop;//作物(多个|分隔)
	private ParkDeviceInfo parkDeviceInfo;//园区设备信息
	private int deviceCanUpdate;//是否有设备可以修改（防止设备传感器数值有误，判断哪些设备可以改）
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getMaxCnt() {
		return maxCnt;
	}
	public void setMaxCnt(int maxCnt) {
		this.maxCnt = maxCnt;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getDeviceCnt() {
		return deviceCnt;
	}
	public void setDeviceCnt(int deviceCnt) {
		this.deviceCnt = deviceCnt;
	}
	public int getOfflineCnt() {
		return offlineCnt;
	}
	public void setOfflineCnt(int offlineCnt) {
		this.offlineCnt = offlineCnt;
	}
	public int getWaringCnt() {
		return waringCnt;
	}
	public void setWaringCnt(int waringCnt) {
		this.waringCnt = waringCnt;
	}
	public int getRuningCnt() {
		return runingCnt;
	}
	public void setRuningCnt(int runingCnt) {
		this.runingCnt = runingCnt;
	}
	public String getCrop() {
		return crop;
	}
	public void setCrop(String crop) {
		this.crop = crop;
	}
	public ParkDeviceInfo getParkDeviceInfo() {
		return parkDeviceInfo;
	}
	public void setParkDeviceInfo(ParkDeviceInfo parkDeviceInfo) {
		this.parkDeviceInfo = parkDeviceInfo;
	}
	public int getDeviceCanUpdate() {
		return deviceCanUpdate;
	}
	public void setDeviceCanUpdate(int deviceCanUpdate) {
		this.deviceCanUpdate = deviceCanUpdate;
	}
	
}
