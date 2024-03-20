package cn.lookout.base.service.impl;

import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;

import cn.lookout.base.bean.Response;
import cn.lookout.base.bean.UserBean;
import cn.lookout.base.constant.Cnst;
import cn.lookout.base.constant.TokenUtil;
import cn.lookout.base.dao.IBaseDao;
import cn.lookout.base.service.ILoginService;
import cn.lookout.common.StringUtil;
import cn.lookout.common.sms.demo.SDKTestSendTemplateSMS;
import cn.lookout.common.util.CommonUtil;
import cn.lookout.common.util.RegexUtil;
import cn.lookout.common.util.VerifCodeUtil;

/**
 * 登陆service
 * @author 
 *
 */
public class LoginServiceImpl implements ILoginService{

	public static Logger logger = Logger.getLogger(LoginServiceImpl.class);
	
	private IBaseDao baseDao;

	public IBaseDao getBaseDao() {
		return baseDao;
	}

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}
	
	
	/**
	 * 发送验证码
	 */
	@Override
	public Response sendValidCode(Map map) {
		logger.debug(">>>start:发送验证码" + JSON.toJSONString(map));
		Response res = new Response();
		String phone = MapUtils.getString(map, "phone"); // 手机号
		String source = MapUtils.getString(map, "loginType"); //登录来源 0web 1apk
		
		// 判断手机号码参数是否为空
		if(StringUtil.isEmpty(phone)) {
			res.setStatusCode(-2);
			res.setMessage("请输入手机号");
			res.setResult(null);
			return res;
		}
		
		// 判断手机号格式
		if(!RegexUtil.isMobile(phone)) {
			res.setStatusCode(-3);
			res.setMessage("请输入正确的手机号");
			res.setResult(null);
			return res;
		}
		
		UserBean userBean = (UserBean) baseDao.queryForObject("userInfo.getUserInfoByPhone", map);
		
		if(userBean == null){
			res.setStatusCode(-4);
			res.setMessage("当前账号不存在");
			return res;
		}
		map.put("id", userBean.getId());
		String userTypes = (String) baseDao.queryForObject("userInfo.getUserTypesById", map);
		if(StringUtil.isEmpty(userTypes)){
			res.setStatusCode(-4);
			res.setMessage("当前账号类型不存在");
			return res;
		}
		if(Cnst.LOGIN_TYPE_MOBILE.equals(source) 
				&& (Cnst.USER_TYPE_SUPER.equals(userTypes) || Cnst.USER_TYPE_ADMIN.equals(userTypes))){
			//管理员、超级管理员不支持使用手机端登录
			res.setStatusCode(-4);
			res.setMessage("当前账号不存在");
			return res;
		}else if("0".equals(userBean.getState())){
			res.setStatusCode(-5);
			res.setMessage("当前账号已被禁用");
			return res;
		}
		// 生成验证码
		String verifCode = CommonUtil.random6();
		
		// 存入redis
		VerifCodeUtil.setex(phone, verifCode);
		
		res.setStatusCode(1);
		res.setMessage("发送成功");
		res.setResult(verifCode);
		
		logger.info("生成验证码 ---> phone:"+phone+",verifCode:"+verifCode);
		
//		发送短信
		String[] parameter = new String[]{verifCode,"5"};
		SDKTestSendTemplateSMS.sendSMS(SDKTestSendTemplateSMS.SMS_SEND_VERIFICATION_CODE
				, phone, parameter);
		logger.debug("<<<END:发送验证码" + JSON.toJSONString(res));
		return res;
	}

	/**
	 * 用户登录
	 */
	@Override
	public Response userLogin(Map map) {
		logger.debug(">>>start:用户登录" + JSON.toJSONString(map));
		Response res = new Response();
		String phone = MapUtils.getString(map, "phone"); // 手机号
		String verifCode = MapUtils.getString(map, "verifCode"); // 验证码
		String source = MapUtils.getString(map, "loginType"); //登录来源 0web 1apk
		// 判断手机号码参数是否为空
		if(StringUtil.isEmpty(phone)) {
			res.setStatusCode(-1);
			res.setMessage("请输入手机号");
			res.setResult(null);
			logger.debug("<<<END:用户登录" + JSON.toJSONString(res));
			return res;
		}
//		// 判断验证码参数是否为空
		if(StringUtil.isEmpty(verifCode)) {
			res.setStatusCode(-2);
			res.setMessage("请输入验证码");
			res.setResult(null);
			logger.debug("<<<END:用户登录" + JSON.toJSONString(res));
			return res;
		}
		
		UserBean userBean = (UserBean) baseDao.queryForObject("userInfo.getUserInfoByPhone", map);
		if(userBean == null){
			res.setStatusCode(-5);
			res.setMessage("用户不存在");
			logger.debug("<<<END:用户登录" + JSON.toJSONString(res));
			return res;
		}else{
			String id = userBean.getId();
			map.put("id",id);
			String userTypes = (String) baseDao.queryForObject("userInfo.getUserTypesById", map);
			userBean.setType(userTypes);
		}
		if(Cnst.LOGIN_TYPE_MOBILE.equals(source) 
				&& (Cnst.USER_TYPE_ADMIN.equals(userBean.getType()) || Cnst.USER_TYPE_SUPER.equals(userBean.getType()))){
			//管理员、超级管理员不支持使用手机端登录
			res.setStatusCode(-5);
			res.setMessage("用户不存在");
			logger.debug("<<<END:用户登录" + JSON.toJSONString(res));
			return res;
		} else if("0".equals(userBean.getState())){
			res.setStatusCode(-6);
			res.setMessage("当前账号已被禁用");
			logger.debug("<<<END:用户登录" + JSON.toJSONString(res));
			return res;
		}else if(userBean !=null && verifCode.equals(userBean.getPwd())){
			//固定密码登录
			res.setStatusCode(1);
			res.setMessage("登录成功");
			res.setResult(userBean);
			logger.debug("<<<END:用户登录" + JSON.toJSONString(res));
			return res;
		}
		String jsonStr = VerifCodeUtil.get(phone); // json格式的验证码参数
		// 判断验证码是否超时
		if (StringUtil.isEmpty(jsonStr)) {
			logger.error("验证码超时或者未发送,phone:" + phone);
			res.setStatusCode(-3);
			res.setMessage("验证码已超时，请重新发送");
			res.setResult(null);
			logger.debug("<<<END:用户登录" + JSON.toJSONString(res));
			return res;
		}
		// 判断验证码是否正确
		boolean isTrue = VerifCodeUtil.contrast(phone, verifCode, jsonStr);
		if (!isTrue) {
			res.setStatusCode(-4);
			res.setMessage("验证码错误，请重新输入");
			res.setResult(null);
			logger.debug("<<<END:用户登录" + JSON.toJSONString(res));
			return res;
		}else{
			res.setStatusCode(1);
			res.setMessage("登录成功");
			res.setResult(userBean);
			logger.debug("<<<END:用户登录" + JSON.toJSONString(res));
			return res;
		}
	}

	/**
	 * 用户通过id登录(app登录专用)
	 */
	@Override
	public Response userLoginById(Map map) {
		logger.debug(">>>start:用户通过id登录" + JSON.toJSONString(map));
		Response res = new Response();
		UserBean userBean = (UserBean) baseDao.queryForObject("userInfo.getUserInfoById", map);
		String source = MapUtils.getString(map, "loginType"); //登录来源 0web 1apk
		if(userBean == null){
			res.setStatusCode(-2);
			res.setMessage("用户不存在");
			return res;
		}else{
			String id = userBean.getId();
			map.put("id",id);
			String userTypes = (String) baseDao.queryForObject("userInfo.getUserTypesById", map);
			userBean.setType(userTypes);
		}
		if(Cnst.LOGIN_TYPE_MOBILE.equals(source) 
				&& (Cnst.USER_TYPE_ADMIN.equals(userBean.getType()) || Cnst.USER_TYPE_SUPER.equals(userBean.getType()))){
			res.setStatusCode(-5);
			res.setMessage("用户不存在");
			return res;
		}else if("0".equals(userBean.getState())){
			res.setStatusCode(-6);
			res.setMessage("当前账号已被禁用");
			return res;
		}
		res.setStatusCode(1);
		res.setMessage("登录成功");
//		String token = TokenUtil.createToken(userBean.getId() , userBean.getType());
//		res.setToken(token);
		res.setResult(userBean);
		logger.debug("<<<END:用户通过id登录" + JSON.toJSONString(res));
		return res;
	}

	@Override
	public Response getToken(Map map) {
		Response res = new Response();
		String companyId = MapUtils.getString(map, "companyId"); // 手机号
		String userType = MapUtils.getString(map, "userType"); //登录来源 0web 1apk
		// 判断手机号码参数是否为空
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(userType)) {
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			res.setResult(null);
			return res;
		}
		String token = TokenUtil.createToken(companyId , userType);
		res.setStatusCode(1);
		res.setMessage("获取成功");
		res.setToken(token);
		return res;
	}
	

}
