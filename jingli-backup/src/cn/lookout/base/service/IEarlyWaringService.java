package cn.lookout.base.service;

import java.util.Map;

import javax.servlet.http.HttpSession;

import cn.lookout.base.bean.Response;

/**
 * 预警信息
 * @author lxl
 *
 */
public interface IEarlyWaringService {

	/**
	 * 查询，分页
	 * @param map
	 * @param session
	 * @return
	 */
	public Response queryList(Map map);
	
	/**
	 * 查询总记录数
	 * @param map
	 * @param session
	 * @return
	 */
	public Response queryListCount(Map map);
	
	/**
	 * 查询未读信息个数
	 * @param map
	 * @param session
	 * @return
	 */
	public Response queryNotReadCount(Map map);
	
	/**
	 * 修改推送开关
	 * @param map
	 * @param session
	 * @return
	 */
	public Response updatePushState(Map map);
	
}
