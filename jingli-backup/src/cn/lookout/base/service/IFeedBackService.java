package cn.lookout.base.service;

import java.util.Map;

import javax.servlet.http.HttpSession;

import cn.lookout.base.bean.Response;

public interface IFeedBackService {

	public Response saveFeedBack(Map map);
	
}
