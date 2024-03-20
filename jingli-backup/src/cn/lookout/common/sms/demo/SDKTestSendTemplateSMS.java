package cn.lookout.common.sms.demo;

import java.util.HashMap;
import java.util.Set;

import cn.lookout.common.sms.CCPRestSDK;

public class SDKTestSendTemplateSMS {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
//		SMS("15801448911","9869");
		String[] parameter = new String[]{"1234","5"};
		sendSMS(SMS_SEND_VERIFICATION_CODE, "17615159906", parameter);
	}
	
	public static final String SMS_SEND_VERIFICATION_CODE = "220096";
	public static final String SMS_SEND_DEVICE_EXCEPTION = "348700";

	/**
	 * 容联云发送短信
	 * @param smsCode	模板编号
	 * @param mobile	发送的手机号
	 * @param parameter	发送的参数【数组格式】
	 */
	public static void sendSMS(final String smsCode, final String mobile, final String[] parameter) {
		HashMap<String, Object> result;
		CCPRestSDK restAPI = new CCPRestSDK();
		restAPI.init("app.cloopen.com", "8883");// 初始化服务器地址和端口，格式如下，服务器地址不需要写https://
		restAPI.setAccount("8aaf07085f5c54cf015f8f690d8c10e5", "184d050e86bf45cfa0ba7669eb160a3f");// 初始化主帐号和主帐号TOKEN
		restAPI.setAppId("8aaf07085f5c54cf015f8f690f1610ec");// 初始化应用ID
		result = restAPI.sendTemplateSMS(mobile,smsCode ,parameter);

		System.out.println("SDKTestSendTemplateSMS result=" + result);
		
		if("000000".equals(result.get("statusCode"))){
			//正常返回输出data包体信息（map）
			HashMap<String,Object> data = (HashMap<String, Object>) result.get("data");
			Set<String> keySet = data.keySet();
			for(String key:keySet){
				Object object = data.get(key);
				System.out.println(key +" = "+object);
			}
		}else{
			//异常返回输出错误码和错误信息
			System.out.println("错误码=" + result.get("statusCode") +" 错误信息= "+result.get("statusMsg"));
		}
	}
	
	

}
