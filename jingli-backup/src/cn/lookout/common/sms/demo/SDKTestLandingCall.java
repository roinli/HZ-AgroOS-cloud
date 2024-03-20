package cn.lookout.common.sms.demo;

import java.util.HashMap;
import java.util.Set;

import cn.lookout.common.sms.CCPRestSDK;

public class SDKTestLandingCall {

	/**
	 * @param args
	 */
	
	/**
	 * 发送语音通知接口
	 * @param mobile	手机号
	 * @param textContext	播放文本
	 * @param loopCnt	循环次数
	 * @return
	 */
	public static int sendVoiceNotice(final String mobile,final String textContext,final String loopCnt){
		HashMap<String, Object> result = null;

		CCPRestSDK restAPI = new CCPRestSDK();
		restAPI.init("app.cloopen.com", "8883");// 初始化服务器地址和端口，格式如下，服务器地址不需要写https://
		restAPI.setAccount("8aaf07085f5c54cf015f8f690d8c10e5", "184d050e86bf45cfa0ba7669eb160a3f");// 初始化主帐号和主帐号TOKEN
		restAPI.setAppId("8aaf07085f5c54cf015f8f690f1610ec");// 初始化应用ID
		//type=1，则播放默认语音文件,0是自定义语音文件 
		String toPhone = "17615159906";
		String mediaFileName = null;
		String fromPhone = null;
		String url = null;
		String privateData = null;
		
		result = restAPI.landingCall(mobile
				, mediaFileName, textContext, fromPhone
				, loopCnt, url, privateData, null, null, null, null, null);

		System.out.println("SDKTestLandingCall result=" + result);
		
		if("000000".equals(result.get("statusCode"))){
			//正常返回输出data包体信息（map）
			HashMap<String,Object> data = (HashMap<String, Object>) result.get("data");
			Set<String> keySet = data.keySet();
			for(String key:keySet){
				Object object = data.get(key);
				System.out.println(key +" = "+object);
			}
			return 1;
		}else{
			//异常返回输出错误码和错误信息
			System.out.println("错误码=" + result.get("statusCode") +" 错误信息= "+result.get("statusMsg"));
		}
		return 0;
	}
	
	public static void main(String[] args) {
		String mobile = "17615159906";
		String content = "您好，您园区的1号大棚的温度传感器设备存在不正常工作状态，请您留意。";
		sendVoiceNotice(mobile,content,"3");
	}

}
