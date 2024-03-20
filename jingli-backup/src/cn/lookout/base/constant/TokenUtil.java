package cn.lookout.base.constant;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import cn.lookout.base.bean.TokenBean;
import cn.lookout.common.StringUtil;
import cn.lookout.common.util.AESManager;

public class TokenUtil {

	private static final Logger logger = Logger.getLogger(TokenUtil.class);
	
	/**
	 * 创建token
	 * @param userId	用户id
	 * @param userType	用户类型
	 * @return
	 */
	public static String createToken(String userId , String userType){
		
		String tokenStr = null;
		try {
			if(StringUtil.isEmpty(userId) || StringUtil.isEmpty(userType)){
				return null;
			}
			String str = userId + "&" + userType + "&" + System.currentTimeMillis();
			tokenStr = AESManager.encryptData(str);
		} catch (Exception e) {
			logger.debug("===创建token失败");
		}
		
		return tokenStr;
	}
	
	/**
	 * 验证token
	 * @param token
	 * @return	用户id 用户类型
	 */
	public static TokenBean validToken(String token){
		
		TokenBean tokenBean = new TokenBean();
		try {
			if(StringUtil.isEmpty(token)){
				tokenBean.setCode(-10);
				tokenBean.setMessage("token不能为空");
				return tokenBean;
			}
			String decodeStr = AESManager.decryptData(token);
			String[] beans = decodeStr.split("&");
			String userId = beans[0];
			String userType = beans[1];
			String time = beans[2];
			if(System.currentTimeMillis() - Long.parseLong(time) > 1000 * 60 * 60 * 2){
				tokenBean.setCode(-11);
				tokenBean.setMessage("token超时，请重新登录");
				return tokenBean;
			}
			tokenBean.setCode(1);
			tokenBean.setMessage("验证成功");
			tokenBean.setUserId(userId);
			tokenBean.setUserType(userType);
		} catch (NumberFormatException e) {
			tokenBean.setCode(-12);
			tokenBean.setMessage("token验证异常");
		}
		return tokenBean;
	}
	
	/**
	 * 重新生成token
	 * @param oldToken	原始旧token
	 * @return
	 */
	public static String createToken(String oldToken){
		String tokenStr = null;
		try {
			if(StringUtil.isEmpty(oldToken)){
				return null;
			}
			String decodeStr = AESManager.decryptData(oldToken);
			String[] beans = decodeStr.split("&");
			String userId = beans[0];
			String userType = beans[1];
			tokenStr = createToken(userId,userType);
		} catch (Exception e) {
			logger.debug("===创建token失败");
		}
		return tokenStr;
	}
	
	public static void main(String[] args) {
		String decodeStr = AESManager.encryptData("你好");
		System.out.println(decodeStr);
		GsonBuilder gb =new GsonBuilder();
		gb.disableHtmlEscaping();
		String s = gb.create().toJson(decodeStr);
		System.out.println(s);
	}
	
}
