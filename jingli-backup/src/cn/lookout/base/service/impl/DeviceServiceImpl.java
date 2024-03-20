package cn.lookout.base.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TimeZone;

//import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;

import cn.lookout.base.bean.CameraInfo;
import cn.lookout.base.bean.DeviceInfo;
import cn.lookout.base.bean.DeviceMapBean;
import cn.lookout.base.bean.DeviceModifyVal;
import cn.lookout.base.bean.DeviceSettingInfo;
import cn.lookout.base.bean.DeviceSwtichStateBean;
import cn.lookout.base.bean.DeviceTimeSchedule;
import cn.lookout.base.bean.DeviceWarningSetting;
import cn.lookout.base.bean.DevicesInfoWebBean;
import cn.lookout.base.bean.Response;
import cn.lookout.base.constant.Cnst;
import cn.lookout.base.constant.DeviceConstant;
import cn.lookout.base.dao.IBaseDao;
import cn.lookout.base.service.IDeviceService;
import cn.lookout.common.RedisUtils;
import cn.lookout.common.StringUtil;

public class DeviceServiceImpl implements IDeviceService{

	private final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm");
	private static final Logger logger = Logger.getLogger(NettyDeviceServiceImpl.class);
	
	private IBaseDao baseDao;
	
	public IBaseDao getBaseDao() {
		return baseDao;
	}

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}
	
	/**
	 * 通过组织号获取传感器、控制器的设备数据等信息
	 */
	@Override
	public Response getDeviceInfoByGfNum(Map requestMap){
		logger.debug(">>>start:获取设备数据状态信息" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String companyId = (String) requestMap.get("companyId");
		String gfNum = (String) requestMap.get("gfNum");
		String source = (String) requestMap.get("source");
		String userType = (String) requestMap.get("userType");//公司类型
		
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(gfNum) || StringUtil.isEmpty(userType)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:获取设备数据状态信息" + JSON.toJSONString(response));
			return response;
		}
		
		Map<String,String> deviceAll = (Map) RedisUtils.getMap("DD&" + companyId+"&"+gfNum + "&" +userType, null);
		
		Iterator it = deviceAll.entrySet().iterator();
		
		Map<String, String> resMap = new HashMap<String, String>();
		while(it.hasNext()){
	      Entry entry = (Entry)it.next();
	      String key = (String) entry.getKey();
	      String deviceId = key;
//	      String switchNum = "1";
	      String value = (String) entry.getValue();
	      String state = DeviceConstant.DEVICE_STATE_OFFLINE;//默认断线状态(如果redis中此时该设备无数据上传，则应视为断线状态);
	      if(!StringUtil.isEmpty(key) && key.indexOf("-") != -1){
	    	  deviceId = key.split("-")[0];
//	    	  switchNum = key.split("-")[1];
	      }
	      String deviceStates = (String) RedisUtils.getMap("DH&" + companyId+"&"+gfNum+"&"+userType, deviceId);
	      if(!StringUtil.isEmpty(deviceStates)){
	    	  String deviceState[] = deviceStates.split("&");
	    	  if(deviceState!=null && deviceState.length == 2){
	    		  state = deviceState[0];
	    	  }
	      }
	      resMap.put("device"+deviceId,  value+","+state );//value:采集数据&设备状态（在线，预警，断开）
		}
		response.setStatusCode(1);
		response.setMessage("获取成功");
		response.setResult(resMap);
		logger.debug("<<<END:获取设备数据状态信息" + JSON.toJSONString(response));
		return response;
	}
	
	/**
	 * 获取采集器设备-设置-预警左侧列表
	 * @param requestMap
	 * @return
	 */
	@Override
	public Response getCjDeviceLeftSetting(Map requestMap) {
		logger.debug(">>>start:获取静态设备预警列表" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String companyId = (String) requestMap.get("companyId");
		String gfNum = (String) requestMap.get("gfNum");
		String deviceNum = (String) requestMap.get("deviceNum");
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(gfNum) || StringUtil.isEmpty(deviceNum)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:获取静态设备预警列表" + JSON.toJSONString(response));
			return response;
		}
		List<DeviceWarningSetting> list = (List<DeviceWarningSetting>) baseDao.queryForList("device.getCjDeviceLeftSetting", requestMap);
		response.setStatusCode(1);
		response.setMessage("获取成功");
		response.setResult(list);
		logger.debug("<<<END:获取静态设备预警列表" + JSON.toJSONString(response));
		return response;
	}
	
	/**
	 * 获取采集器设备-设置-预警页面的详细信息
	 */
	@Override
	public Response getCjDeviceSettingInfo(Map requestMap) {
		logger.debug(">>>start:获取静态设备预警详细" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String id = (String) requestMap.get("id");
		if(StringUtil.isEmpty(id)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:获取静态设备预警详细" + JSON.toJSONString(response));
			return response;
		}
		DeviceWarningSetting bean = (DeviceWarningSetting) baseDao.queryForObject("device.getCjDeviceSettingInfo", requestMap);
		response.setStatusCode(1);
		response.setMessage("获取成功");
		response.setResult(bean);
		logger.debug("<<<END:获取静态设备预警详细" + JSON.toJSONString(response));
		return response;
	}

	/**
	 * 新增采集器设备-设置-预警页面
	 */
	@Override
	public Response saveCjDeviceSetting(Map requestMap) {
		logger.debug(">>>start:新增静态设备预警" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String companyId = (String) requestMap.get("companyId");
		String gfNum = (String) requestMap.get("gfNum");
		String leftRange = (String) requestMap.get("leftRange");
		String rightRange = (String) requestMap.get("rightRange");
		String deviceNum = (String) requestMap.get("deviceNum");
		String startTime = (String) requestMap.get("startTime");
		String endTime = (String) requestMap.get("endTime");
		String useState = (String) requestMap.get("useState");//启用禁用
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(gfNum)
				|| StringUtil.isEmpty(deviceNum) || StringUtil.isEmpty(startTime)
				|| StringUtil.isEmpty(endTime) || StringUtil.isEmpty(useState)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:新增静态设备预警详细" + JSON.toJSONString(response));
			return response;
		}
		if(StringUtil.isEmpty(leftRange)){
			requestMap.put("leftRange","null");
		}
		if(StringUtil.isEmpty(rightRange)){
			requestMap.put("rightRange","null");
		}
		Integer checkCnt = (Integer) baseDao.queryForObject("device.checkCjDeviceSetting", requestMap);
		if(checkCnt != null && checkCnt > 0){
			response.setStatusCode(-2);
			response.setMessage("所选时间与其他预警时间冲突");
			logger.debug("<<<END:新增静态设备预警详细" + JSON.toJSONString(response));
			return response;
		}
		baseDao.insert("device.saveCjDeviceSetting", requestMap);
		response.setStatusCode(1);
		response.setMessage("保存成功");
		logger.debug("<<<END:新增静态设备预警" + JSON.toJSONString(response));
		return response;
	}

	/**
	 * 修改采集器设备-设置-预警页面
	 */
	@Override
	public Response updateCjDeviceSetting(Map requestMap) { 
		logger.debug(">>>start:修改静态设备预警" + JSON.toJSONString(requestMap));
		Response response = new Response();
		
		String companyId = (String) requestMap.get("companyId");
		String gfNum = (String) requestMap.get("gfNum");
		String leftRange = (String) requestMap.get("leftRange");
		String rightRange = (String) requestMap.get("rightRange");
		String deviceNum = (String) requestMap.get("deviceNum");
		String startTime = (String) requestMap.get("startTime");
		String endTime = (String) requestMap.get("endTime");
		String useState = (String) requestMap.get("useState");//启用禁用
		String id = (String) requestMap.get("id");//设置id
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(gfNum)
				|| StringUtil.isEmpty(deviceNum) || StringUtil.isEmpty(startTime)
				|| StringUtil.isEmpty(endTime) || StringUtil.isEmpty(useState) 
				|| StringUtil.isEmpty(id)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:修改静态设备预警详细" + JSON.toJSONString(response));
			return response;
		}
		
		if(StringUtil.isEmpty(leftRange)){
			requestMap.put("leftRange","null");
		}
		if(StringUtil.isEmpty(rightRange)){
			requestMap.put("rightRange","null");
		}
		Integer checkCnt = (Integer) baseDao.queryForObject("device.checkCjDeviceSetting", requestMap);
		if(checkCnt != null && checkCnt > 0){
			response.setStatusCode(-2);
			response.setMessage("所选时间与其他预警时间冲突");
			logger.debug("<<<END:修改静态设备预警详细" + JSON.toJSONString(response));
			return response;
		}
		baseDao.update("device.updateCjDeviceSetting", requestMap);
		response.setStatusCode(1);
		response.setMessage("修改成功");
		logger.debug("<<<END:修改静态设备预警" + JSON.toJSONString(response));
		return response;
	}
	
	/**
	 * 删除采集器设备-设置-预警页面
	 */
	@Override
	public Response deleteCjDeviceSetting(Map requestMap){
		logger.debug(">>>start:删除静态设备预警" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String id = (String) requestMap.get("id");//设置id
		if(StringUtil.isEmpty(id)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:删除动态设备设置详细" + JSON.toJSONString(response));
			return response;
		}
		baseDao.delete("device.deleteCjDeviceSetting", requestMap);
		response.setStatusCode(1);
		response.setMessage("删除成功");
		logger.debug("<<<END:删除静态设备预警" + JSON.toJSONString(response));
		return response;
	}

	/**
	 * 获取控制器-设置-左侧列表
	 */
	@Override
	public Response getControlDeviceLeftSetting(Map requestMap) {
		logger.debug(">>>start:获取动态设备设置列表" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String companyId = (String) requestMap.get("companyId");
		String gfNum = (String) requestMap.get("gfNum");
		String deviceNum = (String) requestMap.get("deviceNum");
		String switchNum = (String) requestMap.get("switchNum");
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(gfNum) 
				|| StringUtil.isEmpty(deviceNum) || StringUtil.isEmpty(switchNum)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:获取动态设备设置列表" + JSON.toJSONString(response));
			return response;
		}
		List<DeviceSettingInfo> list = (List<DeviceSettingInfo>) baseDao.queryForList("device.getControlDeviceLeftSetting", requestMap);
		response.setStatusCode(1);
		response.setMessage("获取成功");
		response.setResult(list);
		logger.debug("<<<END:获取动态设备设置列表" + JSON.toJSONString(response));
		return response;
	}
	
	/**
	 * 获取控制器-设置-左侧列表-单条详细信息
	 */
	@Override
	public Response getControlDeviceSettingInfo(Map requestMap) {
		logger.debug(">>>start:获取动态设备设置详细" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String id = (String) requestMap.get("id");
		if(StringUtil.isEmpty(id)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:获取动态设备设置详细" + JSON.toJSONString(response));
			return response;
		}
		DeviceSettingInfo bean = (DeviceSettingInfo)baseDao.queryForObject("device.getControlDeviceSettingInfo", requestMap);
		response.setStatusCode(1);
		response.setMessage("获取成功");
		response.setResult(bean);
		logger.debug("<<<END:获取动态设备设置详细" + JSON.toJSONString(response));
		return response;
	}
	
	/**
	 * 保存控制器-设置-新增控制器设置信息
	 */
	@Override
	public Response saveControlDeviceSetting(Map requestMap){
		logger.debug(">>>start:新增动态设备设置" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String companyId = (String) requestMap.get("companyId");
		String gfNum = (String) requestMap.get("gfNum");
		String deviceNum = (String) requestMap.get("deviceNum");
		String controlType = (String) requestMap.get("controlType");
		String switchNum = (String) requestMap.get("switchNum"); 
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(gfNum) 
				|| StringUtil.isEmpty(deviceNum) || StringUtil.isEmpty(controlType)
				|| StringUtil.isEmpty(switchNum)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:新增动态设备设置" + JSON.toJSONString(response));
			return response;
		}
		baseDao.insert("device.saveControlDeviceSetting", requestMap);
		response.setStatusCode(1);
		response.setMessage("保存成功");
		//修改刷新当前设备的定时任务
		updateDeviceTimeSchedule(companyId, gfNum, deviceNum,switchNum);
		logger.debug("<<<END:新增动态设备设置" + JSON.toJSONString(response));
		return response;
	}

	/**
	 * 修改控制器-设置-修改控制器设置信息
	 */
	@Override
	public Response updateControlDeviceSetting(Map requestMap) {
		logger.debug(">>>start:修改动态设备设置" + JSON.toJSONString(requestMap));
		Response response = new Response();
		
		String controlType = (String) requestMap.get("controlType");
		String id = (String) requestMap.get("id");
		if(StringUtil.isEmpty(controlType) || StringUtil.isEmpty(id)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:修改动态设备设置" + JSON.toJSONString(requestMap));
			return response;
		}
		if("0".equals(controlType)){
			//单次
			baseDao.update("device.updateControlDeviceDsSetting", requestMap);
		}else if("1".equals(controlType)){
			//循环
			baseDao.update("device.updateControlDeviceLoopSetting", requestMap);
		}else if("2".equals(controlType)){
			//智能
			baseDao.update("device.updateControlDeviceZnSetting", requestMap);
		}
		DeviceSettingInfo info = (DeviceSettingInfo) baseDao.queryForObject("device.getControlDeviceSettingInfo", requestMap);
		if(info == null){
			response.setStatusCode(-2);
			response.setMessage("操作失败");
			response.setResult(null);
			logger.debug("<<<END:修改动态设备设置" + JSON.toJSONString(requestMap));
			return response;
		}
		String companyId = info.getCompayId();//公司Id
		String gfNum = info.getGfNum();//组织Id
		String deviceId = info.getDeviceNum();//设备编号
		String switchNum = info.getSwitchNum();//设备开关
		//修改刷新当前设备的定时任务
		updateDeviceTimeSchedule(companyId, gfNum, deviceId,switchNum);
		response.setStatusCode(1);
		response.setMessage("修改成功");
		logger.debug("<<<END:修改动态设备设置" + JSON.toJSONString(requestMap));
		return response;
	}

	/**
	 * 删除控制器-设置-删除控制器设置信息
	 */
	@Override
	public Response deleteControlDeviceSetting(Map requestMap) {
		logger.debug(">>>start:删除动态设备设置" + JSON.toJSONString(requestMap));
		Response response = new Response();
		
		String id = (String) requestMap.get("id");
		if(StringUtil.isEmpty(id)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:删除动态设备设置" + JSON.toJSONString(requestMap));
			return response;
		}
		DeviceSettingInfo info = (DeviceSettingInfo) baseDao.queryForObject("device.getControlDeviceSettingInfo", requestMap);
		if(info == null){
			response.setStatusCode(-2);
			response.setMessage("操作失败");
			response.setResult(null);
			logger.debug("<<<END:删除动态设备设置" + JSON.toJSONString(requestMap));
			return response;
		}
		String companyId = info.getCompayId();//公司Id
		String gfNum = info.getGfNum();//组织Id
		String deviceId = info.getDeviceNum();//设备编号
		String switchNum = info.getSwitchNum();//设备开关
		baseDao.delete("device.deleteControlDeviceSetting", requestMap);
		response.setStatusCode(1);
		response.setMessage("删除成功");
		//修改刷新当前设备的定时任务
		updateDeviceTimeSchedule(companyId, gfNum, deviceId,switchNum);
		logger.debug("<<<END:删除动态设备设置" + JSON.toJSONString(requestMap));
		return response;
	}
	
	/**
	 * 控制器-修改控制器开关按钮
	 */
	@Override
	public Response updateControlDeviceState(Map requestMap){
		logger.debug(">>>start:操作动态设备开关按钮" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String state = (String) requestMap.get("state");
		String companyId = (String) requestMap.get("companyId");
		String gfNum = (String) requestMap.get("gfNum");
		String deviceId = (String) requestMap.get("deviceId");
		String switchNum = (String) requestMap.get("switchNum");
		
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(gfNum) 
				|| StringUtil.isEmpty(deviceId) || StringUtil.isEmpty(state)
				|| StringUtil.isEmpty(switchNum)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:操作动态设备开关按钮" + JSON.toJSONString(requestMap));
			return response;
		}
		updateDeviceControl(companyId,gfNum , deviceId , state , switchNum);
		response.setStatusCode(1);
		logger.debug("<<<END:操作动态设备开关按钮" + JSON.toJSONString(requestMap));
		return response;
	}
	
	/**
	 * 获取当前组织内的摄像头信息
	 */
	@Override
	public Response getCameraInfo(Map requestMap) {
		logger.debug(">>>start:获取摄像头信息" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String companyId = (String) requestMap.get("companyId");
		String gfNum = (String) requestMap.get("gfNum");
		String userType = (String) requestMap.get("userType");
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(gfNum) 
				|| StringUtil.isEmpty(userType)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:获取摄像头信息" + JSON.toJSONString(requestMap));
			return response;
		}
		CameraInfo cameraInfo = (CameraInfo) baseDao.queryForObject("device.getCameraInfo", requestMap);
		response.setStatusCode(1);
		response.setMessage("获取成功");
		response.setResult(cameraInfo);
		logger.debug("<<<END:获取摄像头信息" + JSON.toJSONString(requestMap));
		return response;
	}

//	
//	@Override
//	public Response updateCameraSetting(Map requestMap, HttpSession session) {
//		Response response = new Response();
//		String companyId = (String) session.getAttribute("search_company_id");
//		requestMap.put("companyId", companyId);
//		baseDao.update("device.updateCameraSetting", requestMap);
//		response.setStatusCode(1);
//		return response;
//	}

//	@Override
//	public Response showReport(Map requestMap, HttpSession session) {
//		Response response = new Response();
//		String gfNum = (String) requestMap.get("gfNum");
//		session.setAttribute("search_gf_num" , gfNum);
//		String deviceNum = (String) requestMap.get("device");
//		session.setAttribute("search_device" , deviceNum);
//		response.setStatusCode(1);
//		return response;
//		
//	}

	/**
	 * 修改控制器启用、禁用功能
	 */
	@Override
	public Response updateControlDeviceUse(Map requestMap) {
		logger.debug(">>>start:修改动态设备启禁用设置" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String id = (String) requestMap.get("id");
		if(StringUtil.isEmpty(id)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:修改动态设备启禁用设置" + JSON.toJSONString(requestMap));
			return response;
		}
		DeviceSettingInfo info = (DeviceSettingInfo) baseDao.queryForObject("device.getControlDeviceSettingInfo", requestMap);
		if(info == null){
			response.setStatusCode(-2);
			response.setMessage("操作失败");
			response.setResult(null);
			logger.debug("<<<END:修改动态设备启禁用设置" + JSON.toJSONString(requestMap));
			return response;
		}
		String companyId = info.getCompayId();//公司Id
		String gfNum = info.getGfNum();//组织Id
		String deviceId = info.getDeviceNum();//设备编号
		String switchNum = info.getSwitchNum();//设备开关
		baseDao.update("device.updateControlDeviceUse", requestMap);
		updateDeviceTimeSchedule(companyId, gfNum, deviceId, switchNum);
		response.setStatusCode(1);
		response.setMessage("修改成功");
		logger.debug("<<<END:修改动态设备启禁用设置" + JSON.toJSONString(requestMap));
		return response;
	}

	/**
	 * 获取控制器状态(开启，关闭，断开)
	 */
	@Override
	public Response getControlState(Map requestMap) {
		logger.debug(">>>start:获取控制器开关停状态" + JSON.toJSONString(requestMap));
		Response response = new Response();
		
		String companyId = (String) requestMap.get("companyId");
		String gfNum = (String) requestMap.get("gfNum");
		String deviceNum = (String) requestMap.get("deviceNum");
		String switchNum = (String) requestMap.get("switchNum");
		int packageType = 0;
		DeviceMapBean deviceDetails = DeviceConstant.getDeviceInfo(deviceNum);
		if(deviceDetails != null){
			packageType = deviceDetails.getDeviceType();
		}else{
			response.setResult(-1);
			response.setMessage("未找到对应的设备信息，获取失败");
			logger.debug("<<<END:获取控制器开关停状态" + JSON.toJSONString(requestMap));
			return response;
		}
		String deviceState = (String) RedisUtils.getMap("DD&" + companyId+"&"+gfNum+"&"+packageType , deviceNum+"-"+switchNum);
		response.setStatusCode(1);
		if(StringUtil.isEmpty(deviceState)){
			response.setResult(DeviceConstant.CONTROLLER_DEVICE_STATE_STOP);//断线
			logger.debug("<<<END:获取控制器开关停状态" + JSON.toJSONString(requestMap));
			return response;
		}else{
			response.setResult(deviceState);
		}
		response.setStatusCode(1);
		response.setMessage("获取成功");
		logger.debug("<<<END:获取控制器开关停状态" + JSON.toJSONString(requestMap));
		return response;
	}
	
	
	/**
	 * 修改单个设备定时任务（当新增、修改、删除设备设置功能时会调用此方法）
	 * @param companyId	公司id
	 * @param gfNum	组织id
	 * @param deviceNum	组织id
	 * @param switchNum	开关编号
	 */
	@Override
	public void updateDeviceTimeSchedule(String companyId , String gfNum , String deviceId , String switchNum) {
		
		String redisKey = "DTS&"+companyId+"&"+gfNum+"&"+deviceId+"&"+switchNum;
		RedisUtils.delKeys(redisKey);//清空当前设备所有任务
		Map<String,String> map = new HashMap<String,String>();
		map.put("companyId", companyId);
		map.put("gfNum", gfNum);
		map.put("deviceId", deviceId);
		String week = StringUtil.getTodayWeek();
		map.put("week", week);
		map.put("switchNum", switchNum);
		List<DeviceTimeSchedule> list = (List<DeviceTimeSchedule>) baseDao.queryForList("device.getOneDeviceTimeSchedule", map);
		dateFormat.setTimeZone(TimeZone.getTimeZone("GMT+0"));
		for (DeviceTimeSchedule bean : list) {
			List<String> reidsList = new ArrayList<>();
			if(bean != null){
				System.out.println("bean========" + JSON.toJSONString(bean));
				int packageType = 0;
				DeviceMapBean deviceDetails = DeviceConstant.getDeviceInfo(deviceId);
				if(deviceDetails != null){
					packageType = deviceDetails.getDeviceType();
				}else{
					logger.debug(">>>未找到对应的设备信息，放弃任务");
					continue;
				}
				bean.setPackageType(packageType);
				bean.setSwitchNum(switchNum);
				if("0".equals(bean.getControlType())){
					//单次定时
					try {
						long startTime = dateFormat.parse(bean.getStartTime()).getTime();
						long endTime = dateFormat.parse(bean.getEndTime()).getTime();
						
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
						long today = sdf.parse(sdf.format(new Date())).getTime();
						long nowTime = System.currentTimeMillis() - today;
						
						String controlOpenMsg = "TCD,PTDN,"+ companyId + "," + gfNum
								+ "," + packageType + "," + DeviceConstant.DEVICE_TYPE_DT 
								+ "," + deviceId +"-"+ switchNum + ",1,#TASK_RANDOM_STR#,0,END,0";
						String controlCloseMsg = "TCD,PTDN,"+ companyId + "," + gfNum
								+ "," + packageType + "," + DeviceConstant.DEVICE_TYPE_DT 
								+ "," + deviceId +"-"+ switchNum + ",0,#TASK_RANDOM_STR#,0,END,0";
						if(startTime > nowTime){
							//每条任务生成8位随机字符
							String taskRandomStr = StringUtil.getCharAndNumr(8);
							reidsList.add(startTime + "&" + controlOpenMsg.replace("#TASK_RANDOM_STR#", taskRandomStr));
						}
						if(endTime > nowTime){
							//每条任务生成8位随机字符
							String taskRandomStr = StringUtil.getCharAndNumr(8);
							reidsList.add(endTime + "&" + controlCloseMsg.replace("#TASK_RANDOM_STR#", taskRandomStr));
						}
					} catch (ParseException e) {
						logger.debug(">>>修改任务异常：" + e.getMessage());
					}
					
				}else{
					//循环定时
					if(bean.getDurationTime() == null || bean.getIntervalTime() == null){
						continue;
					} 
					try {
						reidsList = NettyDeviceServiceImpl.getControlList(bean);
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
			}
			System.out.println(redisKey + "======" + JSON.toJSONString(reidsList));
			RedisUtils.setList(redisKey, reidsList , false,false);
		}
	}
	
	/**
	 * 修改设备控制开关
	 * @param companyId	公司id
	 * @param gfNum	组织号
	 * @param deviceId	设备Id
	 * @param state	操作状态0关  1开
	 * @param switchNum	设备开关编号（例：71-1后边的-1）
	 * @return
	 */
	public Response updateDeviceControl(String companyId , String gfNum , String deviceId , String state , String switchNum) {
		Response response = new Response();
		int packageType = 0;
		DeviceMapBean deviceDetails = DeviceConstant.getDeviceInfo(deviceId);
		if(deviceDetails != null){
			packageType = deviceDetails.getDeviceType();
		}else{
			logger.debug(">>>未找到对应的设备信息，下发失败");
			response.setResult(-1);
			response.setMessage("未找到对应的设备信息，下发失败");
			return response;
		}
		String controlMsg = "WCD,PTDN,"+ companyId + "," + gfNum 
				+ "," + packageType + "," + DeviceConstant.DEVICE_TYPE_DT 
				+ "," + deviceId + "-" + switchNum + ","+state+",END";
		RedisUtils.addList("NETTY_NOTICE", controlMsg);
		response.setStatusCode(1);
		return response;
	}

	/**
	 * 获取某控制器开关状态
	 */
	@Override
	public Response getControlDeviceSwitchList(Map requestMap) {
		logger.debug(">>>start:获取某控制器开关状态" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String companyId = (String) requestMap.get("companyId");
		String gfNum = (String) requestMap.get("gfNum");
		String deviceId = (String) requestMap.get("deviceId");
		String userType = (String) requestMap.get("userType");//公司类型
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(gfNum) 
				|| StringUtil.isEmpty(userType) || StringUtil.isEmpty(deviceId) ){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:获取某控制器开关状态" + JSON.toJSONString(response));
			return response;
		}
		Integer switchNum = (Integer) baseDao.queryForObject("device.getControlDeviceSwitchInfo", requestMap);
		List<DeviceSwtichStateBean> list = new ArrayList<>();
		if(switchNum != null && switchNum > 0){
			for (int i = 1; i <= switchNum; i++) {
				DeviceSwtichStateBean bean = new DeviceSwtichStateBean();
				String key = deviceId + "-" + i;
				String deviceState = (String) RedisUtils.getMap("DD&" + companyId+"&"+gfNum + "&" +userType, key);
				bean.setNum(i+"");
				if(StringUtil.isEmpty(deviceState)){
					bean.setState(DeviceConstant.CONTROLLER_DEVICE_STATE_STOP);
				}else{
					bean.setState(deviceState);
				}
				list.add(bean);
			}
			response.setStatusCode(1);
			response.setMessage("获取成功");
			response.setResult(list);
		}else{
			response.setStatusCode(-2);
			response.setMessage("查询失败");
			response.setResult(null);
		}
		logger.debug("<<<END:获取某控制器开关状态" + JSON.toJSONString(response));
		return response;
	}
	
	
	/**
	 * （web专用）通过组织号获取传感器、控制器的设备数据等信息
	 */
	@Override
	public Response getDeviceInfoByGfNumWeb(Map requestMap){
		logger.debug(">>>start:获取设备数据状态信息" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String companyId = (String) requestMap.get("companyId");
		String gfNum = (String) requestMap.get("gfNum");
		String userType = (String) requestMap.get("userType");//公司类型
		String runType = (String) requestMap.get("runType");//运行状态
		
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(gfNum) 
				|| StringUtil.isEmpty(userType)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:获取设备数据状态信息" + JSON.toJSONString(response));
			return response;
		}
		
		List<DevicesInfoWebBean> devices = (List<DevicesInfoWebBean>) baseDao.queryForList("device.getDeviceInfoByGfNumWeb", requestMap);
		List<DevicesInfoWebBean> deviceRes = new ArrayList<>();
		for (DevicesInfoWebBean deviceBean : devices) {
			String deviceId = deviceBean.getId();
			String deviceType = deviceBean.getDeviceType();
			if(String.valueOf(DeviceConstant.DEVICE_TYPE_JT).equals(deviceType)){
				String value = (String) RedisUtils.getMap("DD&" + companyId+"&"+gfNum+"&"+userType, deviceId);
				deviceBean.setVal(value);
			}
			String deviceStates = (String) RedisUtils.getMap("DH&" + companyId+"&"+gfNum+"&"+userType, deviceId);
			String state = DeviceConstant.DEVICE_STATE_OFFLINE;//默认断线状态(如果redis中此时该设备无数据上传，则应视为断线状态);
			if(!StringUtil.isEmpty(deviceStates)){
				String deviceState[] = deviceStates.split("&");
		    	if(deviceState!=null && deviceState.length == 2){
		    		state = deviceState[0];
		    	}
		    }
			deviceBean.setState(state);
//			Integer deId = Integer.parseInt(deviceId);
			DeviceMapBean dInfo = DeviceConstant.getDeviceInfo(deviceId);
			if(dInfo != null){
				String unit = dInfo.getDataFormat();
				deviceBean.setUnit(unit);
			}
			if(StringUtil.isEmpty(runType)){
				deviceRes.add(deviceBean);
			}else if("0".equals(runType) 
					&& DeviceConstant.DEVICE_STATE_RUNING.equals(state)){
				//选中-连接正常的设备（预警的不算连接正常）
				deviceRes.add(deviceBean);
			}else if("1".equals(runType) 
					&& DeviceConstant.DEVICE_STATE_WARNING.equals(state)){
				//选中-预警中的设备
				deviceRes.add(deviceBean);
			}else if("2".equals(runType) 
					&& !DeviceConstant.DEVICE_STATE_OFFLINE.equals(state)){
				//选中-正在运行的设备（正常+预警的都是正在运行的状态）
				deviceRes.add(deviceBean);
			}else if("3".equals(runType) 
					&& DeviceConstant.DEVICE_STATE_OFFLINE.equals(state)){
				//选中-断开连接的设备
				deviceRes.add(deviceBean);
			}
		}
		response.setStatusCode(1);
		response.setMessage("获取成功");
		response.setResult(deviceRes);
		logger.debug("<<<END:获取设备数据状态信息" + JSON.toJSONString(response));
		return response;
	}

	/**
	 * 投食机推送指令
	 */
	@Override
	public Response pushFeedMachine(Map requestMap) {
		logger.debug(">>>start:投食机推送指令" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String companyId = (String) requestMap.get("companyId");
		String gfNum = (String) requestMap.get("gfNum");
		String userType = (String) requestMap.get("userType");//公司类型
		String switchNum = (String) requestMap.get("switchNum");//开关编号
		String workTime = (String) requestMap.get("workTime");//工作时长
		String stopTime = (String) requestMap.get("stopTime");//停止时长
		
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(gfNum) 
				|| StringUtil.isEmpty(userType) || StringUtil.isEmpty(switchNum)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:投食机推送指令" + JSON.toJSONString(response));
			return response;
		}
		String command1 = "WCD,PTDN,"+ companyId + "," + gfNum 
				+ "," + DeviceConstant.PACKAGE_TYPE_YY + "," + DeviceConstant.DEVICE_TYPE_DT 
				+ ",73-" + switchNum + ",W"+workTime+",END";
		String command2 = "WCD,PTDN,"+ companyId + "," + gfNum 
				+ "," + DeviceConstant.PACKAGE_TYPE_YY + "," + DeviceConstant.DEVICE_TYPE_DT 
				+ ",73-" + switchNum + ",S"+stopTime+",END";
		RedisUtils.addList("NETTY_NOTICE", command1);
		RedisUtils.addList("NETTY_NOTICE", command2);
		response.setStatusCode(1);
		response.setMessage("推送成功");
		logger.debug("<<<END:投食机推送指令" + JSON.toJSONString(response));
		return response;
	}

	@Override
	public Response getCanModifyDevice(Map requestMap) {
		logger.debug(">>>start:获取可修改的设备列表（解决传感器数值不准）" + JSON.toJSONString(requestMap));
		Response response = new Response();
		List<DeviceInfo> deviceList = (List<DeviceInfo>) baseDao.queryForList("device.getCanModifyDevice", null);
		response.setStatusCode(1);
		response.setMessage("获取成功");
		response.setResult(deviceList);
		logger.debug("<<<END:获取可修改的设备列表（解决传感器数值不准）" + JSON.toJSONString(response));
		return response;
	}

	@Override
	public Response getDeviceModifyVal(Map requestMap) {
		logger.debug(">>>start:获取设备修改的状态、数值（解决传感器数值不准）" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String companyId = (String) requestMap.get("companyId");
		String gfNum = (String) requestMap.get("gfNum");
		String deviceId = (String) requestMap.get("deviceId");//设备id
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(gfNum) 
				|| StringUtil.isEmpty(deviceId)){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:获取设备修改的状态、数值（解决传感器数值不准）" + JSON.toJSONString(response));
			return response;
		}
		String flag = companyId + "&" + gfNum + "&" + deviceId;
		requestMap.put("deviceFlag", flag);
		DeviceModifyVal deviceModifyVal = (DeviceModifyVal) baseDao.queryForObject("device.getDeviceModifyVal", requestMap);
		response.setStatusCode(1);
		response.setMessage("获取成功");
		response.setResult(deviceModifyVal);
		logger.debug("<<<END:获取设备修改的状态、数值（解决传感器数值不准）" + JSON.toJSONString(response));
		return response;
	}

	@Override
	public Response updateDeviceModifyVal(Map requestMap) {
		logger.debug(">>>start:修改设备接收改为手动修改，固定数值（解决传感器数值不准）" + JSON.toJSONString(requestMap));
		Response response = new Response();
		String id = (String) requestMap.get("id");
		String state = (String) requestMap.get("state");
		String val = (String) requestMap.get("val");
		if(StringUtil.isEmpty(id) || StringUtil.isEmpty(state) 
				|| ("1".equals(state) && StringUtil.isEmpty(val))){
			response.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			response.setResult(null);
			logger.debug("<<<END:修改设备接收改为手动修改，固定数值（解决传感器数值不准）" + JSON.toJSONString(response));
			return response;
		}
		if("0".equals(state)){
			requestMap.put("val","");
		}
		baseDao.update("device.updateDeviceModifyVal", requestMap);
		response.setStatusCode(1);
		response.setMessage("修改成功");
		logger.debug("<<<END:修改设备接收改为手动修改，固定数值（解决传感器数值不准）" + JSON.toJSONString(response));
		return response;
	}

}
