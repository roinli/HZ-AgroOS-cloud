package cn.lookout.base.bean;

/**
 * 专家表
 * @author lxl
 *
 */
public class ExpertBean {

	private String id;
	private String name; // 专家姓名
	private String type; // 0农业 1渔业
	private String sex;
	private String icon; // 头像
	private String industry; // 行业
	private String major; // 专长
	private String wechat; // 微信
	private String qq; // qq
	private String mobile;//手机
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	private String createTime; // 创建时间
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getIndustry() {
		return industry;
	}
	public void setIndustry(String industry) {
		this.industry = industry;
	}
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	}
	public String getWechat() {
		return wechat;
	}
	public void setWechat(String wechat) {
		this.wechat = wechat;
	}
	public String getQq() {
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	
	@Override
	public String toString() {
		return "ExpertBean [id=" + id + ", name=" + name + ", type=" + type + ", sex=" + sex + ", icon=" + icon
				+ ", industry=" + industry + ", major=" + major + ", wechat=" + wechat + ", qq=" + qq + ", createTime="
				+ createTime + "]";
	}
	
	
	
}
