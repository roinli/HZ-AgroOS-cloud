package cn.lookout.base.bean;

public class CameraInfo {

	private String url;//ip地址
	
	private String loginName;//登录名
	
	private String loginPwd;//密码
	
	private String webPort;//WEB播放端口
	
	private String phonePort;//手机播放端口
	
	private String passNum;//通道号

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getLoginPwd() {
		return loginPwd;
	}

	public void setLoginPwd(String loginPwd) {
		this.loginPwd = loginPwd;
	}

	public String getWebPort() {
		return webPort;
	}

	public void setWebPort(String webPort) {
		this.webPort = webPort;
	}

	public String getPhonePort() {
		return phonePort;
	}

	public void setPhonePort(String phonePort) {
		this.phonePort = phonePort;
	}

	public String getPassNum() {
		return passNum;
	}

	public void setPassNum(String passNum) {
		this.passNum = passNum;
	}
	
	
}
