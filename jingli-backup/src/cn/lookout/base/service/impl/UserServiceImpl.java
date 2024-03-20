package cn.lookout.base.service.impl;

import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.log4j.Logger;

import cn.lookout.base.bean.Response;
import cn.lookout.base.bean.UserBean;
import cn.lookout.base.dao.IBaseDao;
import cn.lookout.base.service.IUserService;
import cn.lookout.common.FileUtil;
import cn.lookout.common.StringUtil;

/**
 * 用户相关
 * @author lxl
 *
 */
public class UserServiceImpl implements IUserService {

	public static Logger logger = Logger.getLogger(UserServiceImpl.class);
	
	private IBaseDao baseDao;

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}
	
	/**
	 * 根据ID查询公司简介
	 */
	@Override
	public Response queryDescribe(Map map) {
		Response res = new Response();
		UserBean userBean = (UserBean) baseDao.queryForObject("userInfo.queryDescribe", map);
		logger.info(userBean);
		res.setStatusCode(1);
		res.setResult(userBean);
		return res;
	}

	/**
	 * 修改公司信息
	 */
	@Override
	public Response updateDescribe(Map map) {
		
		Response res = new Response();
		String icon = MapUtils.getString(map, "icon");
		String iconUrl = FileUtil.uploadBase64Img(icon);
		String position = (String) map.get("position");
		if(!StringUtil.isEmpty(position)){
			String[] pos = position.split(",");
			map.put("lng",pos[0]);
			map.put("lat",pos[1]);
		}
		map.put("icon", iconUrl);
		//修改用户信息
		baseDao.update("userInfo.updateDescribe", map);
		//查询新的用户信息
		UserBean userBean = (UserBean) baseDao.queryForObject("userInfo.getUserInfoById", map);
		String id = userBean.getId();
		map.put("id",id);
		String userTypes = (String) baseDao.queryForObject("userInfo.getUserTypesById", map);
		userBean.setType(userTypes);
		res.setStatusCode(1);
		res.setResult(userBean);
		return res;
	}

	/**
	 * 修改用户基础信息
	 */
	@Override
	public Response updateUserInfo(Map map) {
		Response res = new Response();
		String companyId = MapUtils.getString(map, "companyId");
		if(StringUtil.isEmpty(companyId)){
			res.setResult(-400);
			res.setMessage("公司id不能为空");
			return res;
		}
		String icon = MapUtils.getString(map, "icon");
		String iconUrl = FileUtil.uploadBase64Img(icon);
		map.put("icon", iconUrl);
		baseDao.update("userInfo.updateUserInfo", map);
		UserBean userBean = (UserBean) baseDao.queryForObject("userInfo.getUserInfoById", map);
		String id = userBean.getId();
		map.put("id",id);
		String userTypes = (String) baseDao.queryForObject("userInfo.getUserTypesById", map);
		userBean.setType(userTypes);
		res.setStatusCode(1);
		res.setMessage("修改成功");
		res.setResult(userBean);
		return res;
	}


}
