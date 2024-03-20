package cn.lookout.base.service;

import java.util.Map;

import javax.servlet.http.HttpSession;

import cn.lookout.base.bean.Response;

/**
 * 一些统计数据，报表什么的
 * @author Ian
 *
 */
public interface IGridService {
	
	/**
	 * 根据设备类型查询大棚/鱼塘数据
	 * @param map
	 * @param session
	 * @return
	 */
	public Response dateByDeviceNum(Map map);

	
}
