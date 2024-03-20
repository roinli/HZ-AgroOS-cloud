package cn.lookout.base.service;

import java.util.Map;

import javax.servlet.http.HttpSession;

import cn.lookout.base.bean.Response;

/**
 * 员工相关
 * @author lxl
 *
 */
public interface IEmployeeService {
	
	/**
	 * 添加员工
	 * @param map
	 * @param session
	 * @return
	 */
	public Response add(Map map);
	
	/**
	 * 删除员工，可批量
	 * @param map
	 * @param session
	 * @return
	 */
	public Response delete(Map map);
	
	/**
	 * 修改员工信息
	 * @param map
	 * @param session
	 * @return
	 */
	public Response update(Map map);
	
	/**
	 * 查询某个员工信息
	 * @param map
	 * @param session
	 * @return
	 */
	public Response query(Map map);
	
	/**
	 * 查询员工信息，分页，带条件
	 * @param map
	 * @param session
	 * @return
	 */
	public Response queryList(Map map);
	
	/**
	 * 查询员工信息记录数
	 * @param map
	 * @param session
	 * @return
	 */
	public Response queryListCount(Map map);
	
}
