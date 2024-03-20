package cn.lookout.common.util;

import java.io.UnsupportedEncodingException;
import java.util.Random;

/**
 * @Title: CommonUtil.java
 * @Package cn.lookout.ctais.util
 * @Description: TODO
 * @author YangFei
 * @date 2012-6-7 上午10:02:37
 * @version V1.0
 */
public class CommonUtil {

	public static String converCharset2UTF8(String data, String oldCharSet,
			String newCharSet) {
		String target = null;
		try {
			if (data != null) {
				byte[] bs = data.getBytes(oldCharSet);
				target = new String(bs, newCharSet);
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return target;
	}
	
	/**
	 * 产生n位随机数
	 * @return
	 */
	public static String random(int len) {
		
		Random rd = new Random();
		
		String n = "";
		
		for(int i=0; i<len; i++) {
			int nInt = rd.nextInt(10); // 生成0-9的随机数
			
			n += nInt;
		}
		
		return n;
	}
	
	/**
	 * 默认生成6位随机数
	 * @return
	 */
	public static String random6() {
		return random(6);
	}
		
	
}
