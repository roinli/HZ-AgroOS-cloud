package cn.lookout.base.service.impl;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.collections.MapUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;

import cn.lookout.base.bean.Response;
import cn.lookout.base.dao.IBaseDao;
import cn.lookout.base.service.IExpertService;
import cn.lookout.common.FileUtil;
import cn.lookout.common.StringUtil;

public class ExpertServiceImpl implements IExpertService {

	private static final Logger logger = Logger.getLogger(ExpertServiceImpl.class);
	
	private IBaseDao baseDao;

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}
	
	@Override
	public Response queryList(Map map) {
		logger.debug(">>>start:查询专家列表" + JSON.toJSONString(map));
		Response res = new Response();
		String name = MapUtils.getString(map, "name"); // 名字关键字
		List list = baseDao.queryForList("expert.queryExperts", map);
		res.setResult(list);
		res.setMessage("获取成功");
		res.setStatusCode(1);
		logger.debug("<<<END:查询专家列表" + JSON.toJSONString(res));
		return res;
	}

	@Override
	public Response queryListCount(Map map) {
		logger.debug(">>>start:查询专家总数" + JSON.toJSONString(map));
		Response res = new Response();
		String name = MapUtils.getString(map, "name"); // 名字关键字
		int count = ((Integer) baseDao.queryForObject("expert.queryExpertsCount", map)).intValue();
		res.setResult(count);
		res.setMessage("获取成功");
		res.setStatusCode(1);
		logger.debug("<<<END:查询专家总数" + JSON.toJSONString(res));
		return res;
	}

	@Override
	public Response saveExpert(Map map) {
		logger.debug(">>>start:新增专家信息" + JSON.toJSONString(map));
		Response res = new Response();
		String name = MapUtils.getString(map, "name");
		String mobile = MapUtils.getString(map, "mobile");
		String industry = MapUtils.getString(map, "industry");
		String major = MapUtils.getString(map, "major");
		if(StringUtil.isEmpty(name)){
			res.setStatusCode(-2);
			res.setMessage("专家姓名不能为空");
			logger.debug("<<<END:新增专家信息" + JSON.toJSONString(res));
			return res;
		}
		if(StringUtil.isEmpty(mobile)){
			res.setStatusCode(-3);
			res.setMessage("专家手机号不能为空");
			logger.debug("<<<END:新增专家信息" + JSON.toJSONString(res));
			return res;
		}
		if(StringUtil.isEmpty(industry)){
			res.setStatusCode(-4);
			res.setMessage("专家行业不能为空");
			logger.debug("<<<END:新增专家信息" + JSON.toJSONString(res));
			return res;
		}
		if(StringUtil.isEmpty(major)){
			res.setStatusCode(-5);
			res.setMessage("专家专长不能为空");
			logger.debug("<<<END:新增专家信息" + JSON.toJSONString(res));
			return res;
		}
		String icon = MapUtils.getString(map, "icon");
		String iconUrl = FileUtil.uploadBase64Img(icon);
		map.put("icon", iconUrl);
		baseDao.insert("expert.saveExpert", map);
		res.setStatusCode(1);
		res.setMessage("保存成功");
		logger.debug("<<<END:新增专家信息" + JSON.toJSONString(res));
		return res;
	}

	@Override
	public Response deleteExpert(Map map) {
		logger.debug(">>>start:删除专家" + JSON.toJSONString(map));
		Response res = new Response();
		baseDao.delete("expert.deleteExpert", map);
		res.setStatusCode(1);
		res.setMessage("删除成功");
		logger.debug("<<<END:删除专家" + JSON.toJSONString(res));
		return res;
	}

}
