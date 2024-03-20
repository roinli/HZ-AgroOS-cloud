package cn.lookout.base.bean;

public class UserGfFishInfoBean {
	
	private String id;
	
	private String gfNum;
	
	private String type;
	
	private String createTime;
	
	private String displayName;//显示名称
	
	private String passNum;//通道号
	
	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getPassNum() {
		return passNum;
	}

	public void setPassNum(String passNum) {
		this.passNum = passNum;
	}

	public String getGfNum() {
		return gfNum;
	}

	public void setGfNum(String gfNum) {
		this.gfNum = gfNum;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

}
