package cn.lookout.base.bean;

/**
 * 员工信息bean
 * @author lxl
 *
 */
public class EmployeeBean {

	private String id;
	private String companyId; // 公司id
	private String name;
	private String sex;
	private String icon; // 头像
	private String mobile; // 手机号
	private String position; // 职务
	private String age; 
	private String certificates; // 资格证
	private String certificatesValid; // 资格证有效期
	private String healthyState; // 健康状态
	private String address; // 户籍地
	private String createTime; // 创建时间
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getCertificates() {
		return certificates;
	}
	public void setCertificates(String certificates) {
		this.certificates = certificates;
	}
	public String getCertificatesValid() {
		return certificatesValid;
	}
	public void setCertificatesValid(String certificatesValid) {
		this.certificatesValid = certificatesValid;
	}
	public String getHealthyState() {
		return healthyState;
	}
	public void setHealthyState(String healthyState) {
		this.healthyState = healthyState;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	
	@Override
	public String toString() {
		return "EmployeeBean [id=" + id + ", companyId=" + companyId + ", name=" + name + ", sex=" + sex + ", icon="
				+ icon + ", mobile=" + mobile + ", position=" + position + ", age=" + age + ", certificates="
				+ certificates + ", certificatesValid=" + certificatesValid + ", healthyState=" + healthyState
				+ ", address=" + address + ", createTime=" + createTime + "]";
	}
	
	
}
