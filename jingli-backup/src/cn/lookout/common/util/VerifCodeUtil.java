package cn.lookout.common.util;

import org.apache.commons.lang3.StringUtils;

import com.alibaba.fastjson.JSONObject;

import cn.lookout.base.bean.VerifCode;
import cn.lookout.base.constant.Cnst;
import cn.lookout.common.RedisUtils;

/**
 * 验证码帮助类
 * @author lixiaolong
 *
 */
public class VerifCodeUtil {
	
	/**
	 * 发送短信的间隔时间,单位:毫秒
	 * 用户第一次点击“发送短信”，多久后才能点击第二次
	 */
//	public static int INTERVAL_TIME = 2 * 60 * 1000; 
	public static int VALID_TIME = 5 * 60 * 1000; // 验证码的有效时间,单位:毫秒
	
	/**
	 * 构造验证码对象
	 * @param phone 手机号
	 * @param verifCode 验证码
	 * @return
	 */
	public static VerifCode buildVerifCode(String phone,String verifCode) {
		
		VerifCode vc = new VerifCode();
		vc.setPhone(phone);
		vc.setVerifCode(verifCode);
		vc.setCreateTime(System.currentTimeMillis());
		
		return vc;
	}
	
	/**
	 * 把json格式验证码数据放入redis里
	 * @param phone
	 * @param verifCode
	 */
	public static void setex(String phone,String verifCode) {
		
		VerifCode vc = buildVerifCode(phone, verifCode);
		
		String jsonStr = JSONObject.toJSONString(vc);
		
		RedisUtils.setex(Cnst.REDIS_KEY_VERIFCODE_LOGIN + phone, VALID_TIME, jsonStr);
		
	}
	
	/**
	 * 从redis里取出json格式验证码数据
	 * @param phone
	 * @return
	 */
	public static String get(String phone) {
		return RedisUtils.getString(Cnst.REDIS_KEY_VERIFCODE_LOGIN + phone);
	}
	
	/**
	 * 对比验证码，正确返回true
	 * @param phone
	 * @param verifCode
	 * @return 
	 */
	public static boolean contrast(String phone,String verifCode) {
		
		String jsonStr = get(phone);
		
		if(!StringUtils.isEmpty(jsonStr)) {
			
			VerifCode vc = JSONObject.parseObject(jsonStr, VerifCode.class);
			
			if(vc.getVerifCode().equals(verifCode)) {
				return true;
			}
			
		}
		
		return false;
	}
	
	/**
	 * 对比验证码，正确返回true
	 * 为了省一行get(phone)操作
	 * @param phone 此参数未用到
	 * @param verifCode
	 * @param jsonStr json格式的验证码数据
	 * @return 
	 */
	public static boolean contrast(String phone,String verifCode,String jsonStr) {
		
		VerifCode vc = JSONObject.parseObject(jsonStr, VerifCode.class);
		
		if(vc.getVerifCode().equals(verifCode)) {
			return true;
		}
			
		
		return false;
	}
	
	
}
