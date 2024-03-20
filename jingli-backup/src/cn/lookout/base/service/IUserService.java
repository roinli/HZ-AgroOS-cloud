package cn.lookout.base.service;

import java.util.Map;

import javax.servlet.http.HttpSession;

import cn.lookout.base.bean.Response;

public interface IUserService {

	/**
	 * 根据ID查询公司简介
	 * @param map
	 * @param session
	 * @return
	 */
	public Response queryDescribe(Map map);
	
	/**
	 * 根据ID更新公司简介
	 * @param map
	 * @param session
	 * @return
	 */
	public Response updateDescribe(Map map);
	
	/**
	 * 修改公司信息（APP）
	 * @param map
	 * @param session
	 * @return
	 */
	public Response updateUserInfo(Map map);
	
	
	
}
