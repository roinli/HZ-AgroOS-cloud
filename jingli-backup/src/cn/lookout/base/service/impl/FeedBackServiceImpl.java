package cn.lookout.base.service.impl;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;

import cn.lookout.base.bean.Response;
import cn.lookout.base.dao.IBaseDao;
import cn.lookout.base.service.IFeedBackService;
import cn.lookout.common.FileUtil;

public class FeedBackServiceImpl implements IFeedBackService {
	
	private static final Logger logger = Logger.getLogger(FeedBackServiceImpl.class);
	
	private IBaseDao baseDao;

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}

	@Override
	public Response saveFeedBack(Map map) {
		logger.debug(">>>start:用户反馈" + JSON.toJSONString(map));
		Response res = new Response();
		String img = (String) map.get("img");
		if(!StringUtils.isEmpty(img)){
			String imgUrl = FileUtil.uploadBase64Img(img);
			map.put("img", imgUrl);
		}
		baseDao.insert("saveFeedBack", map);
		res.setStatusCode(1);
		res.setMessage("提交成功");
		logger.debug("<<<END:用户反馈" + JSON.toJSONString(res));
		return res;
	}

}
