package cn.lookout.base.service.impl;


import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.collections.MapUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import cn.lookout.base.bean.DeviceInfo;
import cn.lookout.base.bean.GroundFishpondBean;
import cn.lookout.base.bean.IndexCompanyBean;
import cn.lookout.base.bean.MenuBean;
import cn.lookout.base.bean.MenuChildBean;
import cn.lookout.base.bean.ParkDeviceInfo;
import cn.lookout.base.bean.Response;
import cn.lookout.base.bean.UserBean;
import cn.lookout.base.constant.Cnst;
import cn.lookout.base.dao.IBaseDao;
import cn.lookout.base.service.IWebService;
import cn.lookout.common.RedisUtils;
import cn.lookout.common.StringUtil;

public class WebServiceImpl implements IWebService {
	
	private static final Logger logger = Logger.getLogger(NettyDeviceServiceImpl.class);
	
	private IBaseDao baseDao;

	public IBaseDao getBaseDao() {
		return baseDao;
	}

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}

	/**
	 * 获取用户菜单(根据用户角色查询)
	 */
	@Override
	public Response getMenuByUser(Map requestMap) {
		Response response = new Response();
		String userType = (String) requestMap.get("userType");
		if(StringUtil.isEmpty(userType)){
			response.setStatusCode(-400);
			response.setMessage("未传入用户权限");
			return response;
		}
		String menuJson = (String) RedisUtils.getMap("SYSTEM_MENU",userType);
		List<MenuBean> parents = new ArrayList<>();
		if(!StringUtil.isEmpty(menuJson)){
			try {
				parents = JSONArray.parseArray(menuJson , MenuBean.class);
			} catch (Exception e) {
				e.printStackTrace();
				parents = new ArrayList<>();
			}
		}
		if(parents == null || parents.size() == 0){
			parents = (List<MenuBean>) baseDao.queryForList("getParentMenuByUserId", requestMap);
			List<MenuChildBean> childs = (List<MenuChildBean>) baseDao.queryForList("getChildMenuByUserId", requestMap);
			for (MenuBean parent : parents) {
				List<MenuChildBean> ch = new ArrayList<>();
				for (MenuChildBean child : childs) {
					if(parent.getMenuFlag().equals(child.getParent())){
						ch.add(child);
					}
				}
				parent.setChildList(ch);
			}
			if(parents != null && parents.size() > 0){
				RedisUtils.setMapKeyValue("SYSTEM_MENU",userType, JSONObject.toJSONString(parents));
			}
		}
		
		response.setStatusCode(1);
		response.setMessage("获取成功");
		response.setResult(parents);
		return response;
	}
	
	/**
	 * 检查用户权限
	 */
	@Override
	public Response checkPermissionByUser(Map requestMap){
		Response response = new Response();
		String userType = (String) requestMap.get("userType");
		if(StringUtil.isEmpty(userType)){
			response.setStatusCode(-400);
			response.setMessage("未传入用户权限");
			return response;
		}
		String permissionJson = (String) RedisUtils.getMap("SYSTEM_QX",userType);
		List<String> userPermission = new ArrayList<>();
		if(!StringUtil.isEmpty(permissionJson)){
			try {
				userPermission = JSONArray.parseArray(permissionJson , String.class);
			} catch (Exception e) {
				e.printStackTrace();
				userPermission = new ArrayList<>();
			}
		}
		if(userPermission == null || userPermission.size()==0){
			userPermission = (List<String>) baseDao.queryForList("getPermissionByUser", requestMap);
			if(userPermission != null && userPermission.size() > 0){
				RedisUtils.setMapKeyValue("SYSTEM_QX",userType, JSONObject.toJSONString(userPermission));
			}
		}
		String requestUrl = (String) requestMap.get("url");
		response.setStatusCode(0);
		for (String func : userPermission) {
			if(func.equalsIgnoreCase(requestUrl)){
				response.setStatusCode(1);
				return response;
			}
		}
		return response;
	}

	/**
	 * 通过id获取用户信息
	 */
	@Override
	public Response getUserInfo(Map requestMap) {
		logger.debug(">>>start:获取用户信息" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String companyId = (String) requestMap.get("companyId");
		if(StringUtil.isEmpty(companyId)){
			response.setStatusCode(-400);
			response.setMessage("公司id不能为空");
			logger.debug("<<<END:获取用户信息" + JSON.toJSONString(response));
			return response;
		}
		UserBean userBean = (UserBean) baseDao.queryForObject("userInfo.getUserInfoById", requestMap);
		response.setStatusCode(1);
		response.setResult(userBean);
		logger.debug("<<<END:获取用户信息" + JSON.toJSONString(response));
		return response;
	}

	/**
	 * 获取公司个数（管理员使用）
	 */
	@Override
	public Response getIndexCompanyCnt(Map requestMap) {
		logger.debug(">>>start:获取公司个数（管理员使用）" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String userType = (String) requestMap.get("userType");
		int count = 0;
		if(Cnst.USER_TYPE_ADMIN.equals(userType)){
			count = (int) baseDao.queryForObject("getIndexCompanyCnt", requestMap);
		}
		response.setStatusCode(1);
		response.setMessage("success");
		response.setResult(count);
		logger.debug("<<<END:获取公司个数（管理员使用）" + JSON.toJSONString(response));
		return response;
	}
	
	/**
	 * 获取首页公司信息+园区信息（管理员显示列表）
	 */
	@Override
	public Response getIndexCompanyInfo(Map requestMap) {
		logger.debug(">>>start:获取首页公司信息" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String companyId = (String) requestMap.get("companyId");
		String userType = (String) requestMap.get("userType");
		if(StringUtil.isEmpty(companyId)){
			response.setStatusCode(-400);
			response.setMessage("公司id不能为空");
			logger.debug("<<<END:获取首页公司信息" + JSON.toJSONString(response));
			return response;
		}
		if(StringUtil.isEmpty(userType)){
			response.setStatusCode(-400);
			response.setMessage("权限类型不能为空");
			logger.debug("<<<END:获取首页公司信息" + JSON.toJSONString(response));
			return response;
		}
		List<IndexCompanyBean> allUsers = new ArrayList<>();
		if(Cnst.USER_TYPE_ADMIN.equals(userType)){
			allUsers = (List<IndexCompanyBean>) baseDao.queryForList("getAllUserLimit", requestMap);
			Map<String,String> paramMap = new HashMap<String,String>();
			for (IndexCompanyBean indexCompanyBean : allUsers) {
				String cId = indexCompanyBean.getId()+"";
				String cType = indexCompanyBean.getType()+"";
				String name = indexCompanyBean.getName();
				if(Cnst.USER_TYPE_NY.equals(cType)){
					name = name + "（农业）";
				}else if(Cnst.USER_TYPE_YY.equals(cType)){
					name = name + "（渔业）";
				}else if(Cnst.USER_TYPE_DT.equals(cType)){
					name = name + "（大田）";
				}
				indexCompanyBean.setName(name);
				paramMap.put("companyId", cId);
				paramMap.put("userType", cType);
				IndexCompanyBean bean = (IndexCompanyBean) baseDao.queryForObject("getUserIndexInfoById", paramMap);
				if(bean != null){
					indexCompanyBean.setMaxCnt(bean.getMaxCnt());
					indexCompanyBean.setCrop(bean.getCrop());
					indexCompanyBean.setDeviceCnt(bean.getDeviceCnt());
					indexCompanyBean.setRuningCnt(bean.getRuningCnt());
					indexCompanyBean.setWaringCnt(bean.getWaringCnt());
					indexCompanyBean.setOfflineCnt(bean.getOfflineCnt());
					ParkDeviceInfo parkDeviceInfo = new ParkDeviceInfo();
					parkDeviceInfo = getIndexParkInfo(cId, cType);
					if(parkDeviceInfo != null){
						indexCompanyBean.setParkDeviceInfo(parkDeviceInfo);
					}else{
						continue;
					}
				}
			}
			logger.debug("<<<END:获取首页公司信息" + JSON.toJSONString(response));
			response.setStatusCode(1);
			response.setMessage("success");
			response.setResult(allUsers);
			return response;
		}
		
		IndexCompanyBean companyIndexInfo = (IndexCompanyBean) baseDao.queryForObject("getIndexCompanyInfoByIdAndType", requestMap);
		if(companyIndexInfo == null){
			response.setStatusCode(500);
			response.setMessage("查询失败");
			logger.debug("<<<END:获取首页公司信息" + JSON.toJSONString(response));
			return response;
		}
		ParkDeviceInfo parkDeviceInfo = new ParkDeviceInfo();
		parkDeviceInfo = getIndexParkInfo(companyId, userType);
		Integer deviceCanUpdate = (Integer) baseDao.queryForObject("device.getDeviceCanUpdateByType", requestMap);
		companyIndexInfo.setDeviceCanUpdate(deviceCanUpdate);
		if(parkDeviceInfo != null){
			response.setStatusCode(1);
			response.setMessage("获取成功");
			companyIndexInfo.setParkDeviceInfo(parkDeviceInfo);
			allUsers.add(companyIndexInfo);
			response.setResult(allUsers);
		}else{
			response.setStatusCode(2);//数据为空
			response.setMessage("获取园区数据失败");
			logger.debug("<<<END:获取首页公司信息" + JSON.toJSONString(response));
			return response;
		}
		logger.debug("<<<END:获取首页公司信息" + JSON.toJSONString(response));
		response.setStatusCode(1);
		response.setMessage("success");
		return response;
	}
	
	/**
	 * 通过公司Id和类型，获取大棚、鱼塘、大田个数
	 */
	@Override
	public Response getGroundFishpondCntById(Map requestMap){
		logger.debug(">>>start:获取公司组织个数" + JSON.toJSONString(requestMap));
		Response response = new Response();
		response.setStatusCode(1);
		response.setMessage("获取成功");
		String companyId = (String) requestMap.get("companyId");
		String userType = (String) requestMap.get("userType");
		if(StringUtil.isEmpty(companyId)){
			response.setStatusCode(-400);
			response.setMessage("公司id不能为空");
			return response;
		}
		if(StringUtil.isEmpty(userType)){
			response.setStatusCode(-400);
			response.setMessage("权限类型不能为空");
			return response;
		}
		String count = (String) baseDao.queryForObject("getGroundFishpondCntById", requestMap);
		response.setResult(count);
		logger.debug("<<<END:获取公司组织个数" + JSON.toJSONString(response));
		return response;
	}
	
	/**
	 * 通过公司Id和类型，获取大棚、鱼塘、大田列表
	 */
	@Override
	public Response getGroundFishpondListById(Map requestMap){
		logger.debug(">>>start:获取公司组织列表" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String companyId = (String) requestMap.get("companyId");
		String userType = (String) requestMap.get("userType");
		if(StringUtil.isEmpty(companyId)){
			response.setStatusCode(-400);
			response.setMessage("公司id不能为空");
			logger.debug("<<<END:获取公司组织列表" + JSON.toJSONString(response));
			return response;
		}
		if(StringUtil.isEmpty(userType)){
			response.setStatusCode(-400);
			response.setMessage("权限类型不能为空");
			logger.debug("<<<END:获取公司组织列表" + JSON.toJSONString(response));
			return response;
		}
		//获取大棚、鱼塘、大田信息
		List<GroundFishpondBean> list = (List<GroundFishpondBean>) baseDao.queryForList("getGFTListById", requestMap);
		//年度光照 = 光照总值/大棚数
		if(list != null && list.size() > 0){
			BigDecimal bdGfCnt = new BigDecimal(list.size());
			for (GroundFishpondBean groundFishpondBean : list) {
				BigDecimal bdLight = new BigDecimal(groundFishpondBean.getLight());
				BigDecimal bdLightPre = new BigDecimal(groundFishpondBean.getLightPre());
				groundFishpondBean.setLight(bdLight.divide(bdGfCnt, 2, RoundingMode.HALF_UP).toString());
				groundFishpondBean.setLightPre(bdLightPre.divide(bdGfCnt, 2, RoundingMode.HALF_UP).toString());
			}
		}
		response.setStatusCode(1);
		response.setMessage("获取成功");
		response.setResult(list);
		logger.debug("<<<END:获取公司组织列表" + JSON.toJSONString(response));
		return response;
	}

	
	/**
	 * 获取下拉选项的大棚、鱼塘
	 * @param requestMap
	 * @return
	 */
	@Override
	public Response getGroundFishpondList(Map requestMap){
		Response response = new Response();
		response.setStatusCode(1);
		String companyId = (String) requestMap.get("companyId");
		String userType = (String) requestMap.get("userType");
		if(StringUtil.isEmpty(companyId)){
			response.setStatusCode(-400);
			response.setMessage("公司id不能为空");
			return response;
		}
		if(StringUtil.isEmpty(userType)){
			response.setStatusCode(-400);
			response.setMessage("权限类型不能为空");
			return response;
		}
		List<GroundFishpondBean> list = (List<GroundFishpondBean>) baseDao.queryForList("getGroundFishpondList", requestMap);
		response.setResult(list);
		return response;
	}
	
	/**
	 * 报表页下拉列表设备数据（仅展示需统计的）
	 * @param requestMap
	 * @return
	 */
	@Override
	public Response getDeviceListTj(Map requestMap){
		Response response = new Response();
		String userType = MapUtils.getString(requestMap, "userType");
		if(StringUtil.isEmpty(userType)){
			response.setStatusCode(-400);
			response.setMessage("权限类型不能为空");
			return response;
		}
		List<DeviceInfo> list = (List<DeviceInfo>) baseDao.queryForList("getDeviceListTj", requestMap);
		response.setStatusCode(1);
		response.setResult(list);
		return response;
	}
	
	/**
	 * 重命名组织号显示名称
	 */
	@Override
	public Response updateDisplayName(Map requestMap){
		Response response = new Response();
		String id = (String) requestMap.get("id");
		String displayName = (String) requestMap.get("displayName");
		if(StringUtil.isEmpty(id) || StringUtil.isEmpty(displayName) ){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return response;
		}
		baseDao.update("updateDisplayName", requestMap);
		response.setStatusCode(1);
		response.setMessage("修改成功");
		return response;
	}
	
	public ParkDeviceInfo getIndexParkInfo(String companyId , String userType){
		ParkDeviceInfo parkDeviceInfo = new ParkDeviceInfo();
		Map parkInfoMap = (Map) RedisUtils.getMap("DD&" + companyId+"&0&"+userType,null);
		if(parkInfoMap != null){
			Map parkInfoMaps = new HashMap();
			Iterator it = parkInfoMap.entrySet().iterator();
			while(it.hasNext()){
		      Entry entry = (Entry)it.next();
		      String key = (String) entry.getKey();
		      String value = (String) entry.getValue();
		      parkInfoMaps.put(key, value);//园区数据
			}
			String temperature="0";//温度
			String humidity="0";//湿度
			String windSpeed="0";//风速
			String rain="0";//降雨量
			String evaporation="0";//蒸发量
			String altitude="0";//海拔高度
			String windDirection="0";//风向
			String airPressure="0";//大气压
			String lightRadiation="0";//光合辐射
			//农业
			if(Cnst.USER_TYPE_NY.equals(userType)){
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("13")))
					temperature = (String)parkInfoMaps.get("13");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("14")))
					humidity = (String)parkInfoMaps.get("14");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("10")))
					windSpeed = (String)parkInfoMaps.get("10");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("9")))
					rain = (String)parkInfoMaps.get("9");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("15")))
					evaporation = (String)parkInfoMaps.get("15");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("16")))
					altitude = (String)parkInfoMaps.get("16");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("11")))
					windDirection = (String)parkInfoMaps.get("11");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("8")))
					airPressure = (String)parkInfoMaps.get("8");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("12")))
					lightRadiation = (String)parkInfoMaps.get("12");
			}
			//渔业
			if(Cnst.USER_TYPE_YY.equals(userType)){
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("45")))
					temperature = (String)parkInfoMaps.get("45");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("46")))
					humidity = (String)parkInfoMaps.get("46");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("42")))
					windSpeed = (String)parkInfoMaps.get("42");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("41")))
					rain = (String)parkInfoMaps.get("41");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("47")))
					evaporation = (String)parkInfoMaps.get("47");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("48")))
					altitude = (String)parkInfoMaps.get("48");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("43")))
					windDirection = (String)parkInfoMaps.get("43");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("40")))
					airPressure = (String)parkInfoMaps.get("40");
				if(!StringUtil.isEmpty((String)parkInfoMaps.get("44")))
					lightRadiation = (String)parkInfoMaps.get("44");
			}
			parkDeviceInfo.setTemperature(temperature);//温度
			parkDeviceInfo.setHumidity(humidity);//湿度
			parkDeviceInfo.setWindSpeed(windSpeed);//风速
			parkDeviceInfo.setRain(rain);//降雨量
			parkDeviceInfo.setEvaporation(evaporation);//蒸发量
			parkDeviceInfo.setAltitude(altitude);//海拔
			parkDeviceInfo.setWindDirection(windDirection);//风向
			parkDeviceInfo.setAirPressure(airPressure);//大气压
			parkDeviceInfo.setLightRadiation(lightRadiation);//光合辐射
			return parkDeviceInfo;
		}else{
			return null;
		}
	}
	
	

}
