package cn.lookout.base.bean;

/**
 * 主页 大棚/鱼塘列表
 * @author Administrator
 *
 */
public class GroundFishpondBean {

	private Integer id;
	private Integer companyId;//企业id
	private String number;//大棚编号
	private Integer type;//类型0大棚 1鱼塘
	private Integer cropCnt;//下属组织
	private String crop;//作物
	private Integer deviceCnt;//设备数量
	private Integer runingCnt;//运行数量
	private Integer warningCnt;//预警数量
	private Integer offlineCnt;//断线数量
	private String temperature;//今年年度积温
	private String temperaturePre;//去年年度积温
	private String light;//今年年度光照
	private String lightPre;//去年年度光照
	private String displayName;//组织自定义名称
	
	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getCompanyId() {
		return companyId;
	}
	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Integer getCropCnt() {
		return cropCnt;
	}
	public void setCropCnt(Integer cropCnt) {
		this.cropCnt = cropCnt;
	}
	public String getCrop() {
		return crop;
	}
	public void setCrop(String crop) {
		this.crop = crop;
	}
	public Integer getDeviceCnt() {
		return deviceCnt;
	}
	public void setDeviceCnt(Integer deviceCnt) {
		this.deviceCnt = deviceCnt;
	}
	public Integer getRuningCnt() {
		return runingCnt;
	}
	public void setRuningCnt(Integer runingCnt) {
		this.runingCnt = runingCnt;
	}
	public Integer getWarningCnt() {
		return warningCnt;
	}
	public void setWarningCnt(Integer warningCnt) {
		this.warningCnt = warningCnt;
	}
	public Integer getOfflineCnt() {
		return offlineCnt;
	}
	public void setOfflineCnt(Integer offlineCnt) {
		this.offlineCnt = offlineCnt;
	}
	public String getTemperature() {
		return temperature;
	}
	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}
	public String getTemperaturePre() {
		return temperaturePre;
	}
	public void setTemperaturePre(String temperaturePre) {
		this.temperaturePre = temperaturePre;
	}
	public String getLight() {
		return light;
	}
	public void setLight(String light) {
		this.light = light;
	}
	public String getLightPre() {
		return lightPre;
	}
	public void setLightPre(String lightPre) {
		this.lightPre = lightPre;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	
	
}
