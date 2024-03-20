package cn.lookout.base.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;

import cn.lookout.base.bean.Response;
import cn.lookout.base.constant.Cnst;
import cn.lookout.base.dao.IBaseDao;
import cn.lookout.base.service.IEarlyWaringService;
import cn.lookout.common.StringUtil;

public class EarlyWaringServiceImpl implements IEarlyWaringService {
	
	private static final Logger logger = Logger.getLogger(EarlyWaringServiceImpl.class);
	
	private IBaseDao baseDao;

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}
	
	/**
	 * 预警页列表查询
	 */
	@Override
	public Response queryList(Map map) {
		logger.debug(">>>start:预警页列表" + JSON.toJSONString(map));
		Response res = new Response();
		String startTime = MapUtils.getString(map, "startTime");
		String endTime = MapUtils.getString(map, "endTime");
		String companyId = MapUtils.getString(map, "companyId");
		String userType = MapUtils.getString(map, "userType");
		if(StringUtil.isEmpty(companyId)){
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		List list = baseDao.queryForList("warning.queryEarlyWaring", map);
		//前端发送已读参数，将数据设置为已读状态
		String isRead = MapUtils.getString(map, "isRead");
		if("1".equals(isRead) && list.size() > 0){
			baseDao.update("warning.updateEarlyWaringRead", map);
		}
		res.setStatusCode(1);
		res.setMessage("获取成功");
		res.setResult(list);
		logger.debug("<<<END:预警页列表" + JSON.toJSONString(res));
		return res;
	}

	/**
	 * 预警页总条数查询
	 */
	@Override
	public Response queryListCount(Map map) {
		logger.debug(">>>start:预警页总条数" + JSON.toJSONString(map));
		Response res = new Response();
		String companyId = MapUtils.getString(map, "companyId");
		if(StringUtil.isEmpty(companyId)){
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		int count = (Integer)baseDao.queryForObject("warning.queryEarlyWaringCount", map);
		res.setStatusCode(1);
		res.setMessage("获取成功");
		res.setResult(count);
		logger.debug("<<<END:预警页总条数" + JSON.toJSONString(res));
		return res;
	}

	/**
	 * 显示未读信息个数
	 */
	@Override
	public Response queryNotReadCount(Map map) {
		logger.debug(">>>start:显示未读信息个数" + JSON.toJSONString(map));
		Response res = new Response();
		String companyId = MapUtils.getString(map, "companyId");
		if(StringUtil.isEmpty(companyId)){
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		Integer count = (Integer)baseDao.queryForObject("warning.queryNotReadCount", map);
		res.setStatusCode(1);
		res.setMessage("获取成功");
		res.setResult(count);
		logger.debug("<<<END:显示未读信息个数" + JSON.toJSONString(res));
		return res;
	}

	/**
	 * 修改用户是否需要接收推送信息（APP接口使用）
	 */
	@Override
	public Response updatePushState(Map map) {
		logger.debug(">>>start:修改用户推送按钮" + JSON.toJSONString(map));
		Response res = new Response();
		baseDao.update("updatePushState", map);
		res.setStatusCode(1);
		res.setMessage("修改成功");
		logger.debug("<<<END:修改用户推送按钮" + JSON.toJSONString(res));
		return res;
	}

}
