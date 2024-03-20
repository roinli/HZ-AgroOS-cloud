package cn.lookout.base.bean;

public class UserBean {
	
	private String id;
	
	private String mobile; // 手机号
	
	private String name; //企业名称
	
	private String type; // 99:管理员 0:农业 1:渔业 2:大田(多个权限逗号分割)
	
	private String icon; // 企业照片
	private String maxCnt; // 大棚/鱼塘数
	private String describe; // 企业简介
	private String positionLng; // 经度位置
	private String positionLat; // 纬度位置
	private String contacts; // 联系人
	private String address;//地址
	private String cameraUrl;//摄像头IP地址
	private String cameraUname;//摄像头登录名
	private String cameraPwd;//摄像头密码
	private String cameraPort;//端口
	private String phonePort;//手机摄像头所用端口
	private String lng;
	private String lat;
	private String searchName;
	private String state;
	private String contactsUser;//联系人
	private String pushState;//是否开启推送
	private String pwd;//默认密码
	private String haveCk;//
	private String exceptionMobile;//报警电话
	
	public String getExceptionMobile() {
		return exceptionMobile;
	}

	public void setExceptionMobile(String exceptionMobile) {
		this.exceptionMobile = exceptionMobile;
	}

	public String getSearchName() {
		return searchName;
	}

	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
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

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getMaxCnt() {
		return maxCnt;
	}

	public void setMaxCnt(String maxCnt) {
		this.maxCnt = maxCnt;
	}

	public String getDescribe() {
		return describe;
	}

	public void setDescribe(String describe) {
		this.describe = describe;
	}

	public String getPositionLng() {
		return positionLng;
	}

	public void setPositionLng(String positionLng) {
		this.positionLng = positionLng;
	}

	public String getPositionLat() {
		return positionLat;
	}

	public void setPositionLat(String positionLat) {
		this.positionLat = positionLat;
	}

	public String getContacts() {
		return contacts;
	}

	public void setContacts(String contacts) {
		this.contacts = contacts;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	

	public String getCameraUrl() {
		return cameraUrl;
	}

	public void setCameraUrl(String cameraUrl) {
		this.cameraUrl = cameraUrl;
	}

	public String getCameraUname() {
		return cameraUname;
	}

	public void setCameraUname(String cameraUname) {
		this.cameraUname = cameraUname;
	}

	public String getCameraPwd() {
		return cameraPwd;
	}

	public void setCameraPwd(String cameraPwd) {
		this.cameraPwd = cameraPwd;
	}

	public String getCameraPort() {
		return cameraPort;
	}

	public void setCameraPort(String cameraPort) {
		this.cameraPort = cameraPort;
	}

	public String getPhonePort() {
		return phonePort;
	}

	public void setPhonePort(String phonePort) {
		this.phonePort = phonePort;
	}

	public String getLng() {
		return lng;
	}

	public void setLng(String lng) {
		this.lng = lng;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	@Override
	public String toString() {
		return "UserBean [id=" + id + ", mobile=" + mobile + ", name=" + name + ", type=" + type + ", icon=" + icon
				+ ", maxCnt=" + maxCnt + ", describe=" + describe + ", positionLng=" + positionLng + ", positionLat="
				+ positionLat + ", contacts=" + contacts + "]";
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getContactsUser() {
		return contactsUser;
	}

	public void setContactsUser(String contactsUser) {
		this.contactsUser = contactsUser;
	}

	public String getPushState() {
		return pushState;
	}

	public void setPushState(String pushState) {
		this.pushState = pushState;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getHaveCk() {
		return haveCk;
	}

	public void setHaveCk(String haveCk) {
		this.haveCk = haveCk;
	}
	
}
