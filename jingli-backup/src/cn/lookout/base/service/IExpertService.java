package cn.lookout.base.service;

import java.util.Map;

import cn.lookout.base.bean.Response;

/**
 * 专家相关
 * @author lxl
 *
 */
public interface IExpertService {

	/**
	 * 专家查询，分页，搜索
	 * @param map
	 * @param session
	 * @return
	 */
	public Response queryList(Map map);
	
	/**
	 * 专家查询，查询总数，分页，搜索
	 * @param map
	 * @param session
	 * @return
	 */
	public Response queryListCount(Map map);
	
	/**
	 * 新增专家
	 * @param map
	 * @param session
	 * @return
	 */
	public Response saveExpert(Map map);
	
	/**
	 * 删除专家
	 */
	public Response deleteExpert(Map map);
	
}
