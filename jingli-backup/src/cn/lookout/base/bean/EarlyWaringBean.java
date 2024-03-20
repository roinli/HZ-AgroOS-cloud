package cn.lookout.base.bean;

/**
 * 预警信息
 * @author lxl
 *
 */
public class EarlyWaringBean {

	private int id;
	private int companyId; // 公司id
	private int groundFishpondNum; // 大棚鱼塘id
	private int deviceId; // 设备id
	private String waringInfo; // 预警信息
	private String createTime; // 预警时间
	private String deviceName;	//报警的设备名称
	private String sourceType;		//来源类型（0农业  1渔业  3大田  4仓库）
	private String displayName;//显示组织名称(例：XX型号鱼池)
	private String warningType;//预警类型（0预警 1断线 2...）
	
	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	public String getWarningType() {
		return warningType;
	}
	public void setWarningType(String warningType) {
		this.warningType = warningType;
	}
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
	public int getGroundFishpondNum() {
		return groundFishpondNum;
	}
	public void setGroundFishpondNum(int groundFishpondNum) {
		this.groundFishpondNum = groundFishpondNum;
	}
	public int getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(int deviceId) {
		this.deviceId = deviceId;
	}
	public String getWaringInfo() {
		return waringInfo;
	}
	public void setWaringInfo(String waringInfo) {
		this.waringInfo = waringInfo;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}
	public String getSourceType() {
		return sourceType;
	}
	public void setSourceType(String sourceType) {
		this.sourceType = sourceType;
	}
	
}
