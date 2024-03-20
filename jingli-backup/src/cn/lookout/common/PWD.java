package cn.lookout.common;

import java.security.MessageDigest;
import java.security.SecureRandom;

import cn.lookout.common.sms.sdk.utils.encoder.BASE64Decoder;
import cn.lookout.common.sms.sdk.utils.encoder.BASE64Encoder;

/**
 * ctais加密设置工具类,该类提供ctais方式的加密算法
 * @author 王亮
 * @date 2017-05-05
 */
public class PWD {
	/**
	 * 算法名称
	 */
	private static final String ALGORITHM = "MD5";
	/**
	 * 加密后的盐值长度
	 */
	private static final int SALTLENGTH = 16;
	/**
	 * 默认字符集
	 */
	private static final String CHARSET = "UTF-8";
	
	/**
	 * 根据明文以及盐值（一个随机数）生成对应密码的密文形式
	 * 最终返回结果的前16位是随机数的密文形式
	 * @param password
	 * @return
	 */
	public static String createNewPassword(String password){
		 SecureRandom random = new SecureRandom();//加密强随机数生成器 
		 byte[] salt = new byte[12];//用随机字节填充的数组
		 random.nextBytes(salt);//生成12个字节的随机数
		 try {
			MessageDigest md = MessageDigest.getInstance(ALGORITHM);//指定MD5算法的信息摘要,初始化MessageDigest对象
			md.update(salt);//使用指定字节数组更新摘要
			md.update(password.getBytes(CHARSET));//使用指定字节数组更新摘要
			byte[] hashResult = md.digest();//获取哈希值结果，调用此方法后摘要被重置（返回初始化状态）
		   
			//以下进行BASE64加密
		   BASE64Encoder encoder = new  BASE64Encoder();
		   String saltS = encoder.encode(salt);//盐值(随机数)加密，16位
		   String digestS = encoder.encode(hashResult);//目标值加密
			return saltS+digestS;
		 } catch (Exception e) {
			e.printStackTrace();
			return password;
		}
	}
	
	/**
	 * 根据旧密码的盐值，将新密码处理，形成密文
	 * @param password  新的密码
	 * @param dbPassword  旧的密码
	 * @return  新的密码的密文形式，它的盐值取决于旧密码的密文
	 */
	public static String getMD5Code(String password,String dbPassword){
		String salt  = dbPassword.substring(0,SALTLENGTH);//截取前16位（旧密码所用盐值的密文）
		try {
			BASE64Decoder decoder = new BASE64Decoder();
			byte[] salts = decoder.decodeBuffer(salt);//将旧密码的盐值通过BASE64解码
			
			//以下将新密码的明文结合旧密码的盐值处理成密文
			MessageDigest md =  MessageDigest.getInstance(ALGORITHM);
			md.update(salts);
			md.update(password.getBytes(CHARSET));
			byte[] hashResult = md.digest();
			BASE64Encoder encoder = new BASE64Encoder();
			String saltS = encoder.encode(salts);
			String digestS = encoder.encode(hashResult);
			return saltS+digestS;
		} catch (Exception e) {
			e.printStackTrace();
			return password;
		}
	}
	
	public static void main(String[] args){
		String r = PWD.createNewPassword("1111");
		System.out.println(r);
		r = PWD.getMD5Code("1111", r);
		System.out.println(r);
	}
}
