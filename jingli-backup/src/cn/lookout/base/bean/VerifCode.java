package cn.lookout.base.bean;

/**
 * 验证码bean
 * @author lixiaolong
 *
 */
public class VerifCode {

	private String phone; // 手机号
	private String verifCode; // 验证码
	private long createTime; // 生成时间
	
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getVerifCode() {
		return verifCode;
	}
	public void setVerifCode(String verifCode) {
		this.verifCode = verifCode;
	}
	public long getCreateTime() {
		return createTime;
	}
	public void setCreateTime(long createTime) {
		this.createTime = createTime;
	}
	
}
