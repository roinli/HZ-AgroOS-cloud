package cn.lookout.base.service;

import java.util.Map;

import cn.lookout.base.bean.Response;

public interface ILoginService {

	//发送短信
	public Response sendValidCode(Map map);
	
	//用户登录
	public Response userLogin(Map map);
	
	//手机登录
	public Response userLoginById(Map map);
	
	//获取token
	public Response getToken(Map map);
	
}
