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
import java.util.Set;
import java.util.TimeZone;

import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;

import cn.lookout.base.bean.DeviceMapBean;
import cn.lookout.base.bean.DeviceTimeSchedule;
import cn.lookout.base.bean.WeatherBean;
import cn.lookout.base.bean.WebSocketBean;
import cn.lookout.base.constant.DeviceConstant;
import cn.lookout.base.dao.IBaseDao;
import cn.lookout.base.service.INettyDeviceService;
import cn.lookout.common.HtmlUtils;
import cn.lookout.common.JgPushUtil;
import cn.lookout.common.RedisUtils;
import cn.lookout.common.StringUtil;
import cn.lookout.common.SystemConfig;
import cn.lookout.common.sms.demo.SDKTestLandingCall;
import cn.lookout.common.sms.demo.SDKTestSendTemplateSMS;
import cn.lookout.ws.WebSocketAction;

public class NettyDeviceServiceImpl implements INettyDeviceService{

	private static final Logger logger = Logger.getLogger(NettyDeviceServiceImpl.class);
	
	private IBaseDao baseDao;
	
	private final static SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm");

	public IBaseDao getBaseDao() {
		return baseDao;
	}

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}
	
	@Override
	public void updateDeviceOffline(String msg) {
		logger.debug("通知设备断线>>>" + msg);
		String requestArr[] = msg.split("&");
		if(requestArr != null && requestArr.length == 6){
			String companyId = requestArr[2];
			String gfNum = requestArr[3];
			String packageType = requestArr[4];
			String deviceId = requestArr[5];
			Map<String,String> map = new HashMap<>();
			map.put("companyId", companyId);
			map.put("gfNum", gfNum);
			map.put("deviceId", deviceId);
			map.put("deviceFlag", companyId + "&" + gfNum + "&" + deviceId);
			String dhRedisKey = "DH&" + companyId+"&"+gfNum+"&" + packageType;
			String ddRedisKey = "DD&" + companyId+"&"+gfNum+"&" + packageType;
			String deviceName = "";
			int deviceType = 0;
			DeviceMapBean deviceDetails = DeviceConstant.getDeviceInfo(deviceId);
			if(deviceDetails != null){
				deviceName = deviceDetails.getDeviceName();
				deviceType = deviceDetails.getDeviceType();
			}
			map.put("packageType",packageType);
			String displayName = (String) baseDao.queryForObject("nettyDevice.getDisplayName", map);
			String warningMsg = "设备" + deviceName + "断开连接";
			map.put("warningInfo", warningMsg);
			map.put("warningType", DeviceConstant.WARNING_TYPE_OFFLINE);
			//保存断线预警信息
			baseDao.insert("nettyDevice.saveDeviceWarning", map);	
			JgPushUtil.jiguangPush(companyId, displayName + warningMsg);
			map.put("deviceState", DeviceConstant.DEVICE_STATE_OFFLINE);
			baseDao.update("nettyDevice.updateDeviceState", map);//修改设备状态
			RedisUtils.setMapKeyValue(dhRedisKey, deviceId 
					, DeviceConstant.DEVICE_STATE_OFFLINE + "&"+System.currentTimeMillis());
			//设备断线推送
			String offMsg = "DF,PTDN,"+ companyId + "," 
				+ gfNum + "," + packageType + "," + deviceType + "," 
				+ deviceId + ",?,END";
			RedisUtils.addList("NETTY_NOTICE", offMsg);
			
			if(DeviceConstant.DEVICE_TYPE_DT == deviceType){
				//动态设备（控制器）
				//因为断线，所以要将redis中所有这个设备的开关变成断线状态（71-1   71-2）
				Map<String, String> allDevice = RedisUtils.getMap(ddRedisKey);
				Iterator it = allDevice.entrySet().iterator();
				while(it.hasNext()){
			      Entry entry = (Entry)it.next();
			      String key = (String) entry.getKey();
			      if(!StringUtil.isEmpty(key) && key.indexOf("-") != -1){
			    	  if(deviceId.equals(key.split("-")[0])){
			    		  RedisUtils.setMapKeyValue(ddRedisKey, key 
									, DeviceConstant.CONTROLLER_DEVICE_STATE_STOP);//讲控制器设置为停止状态 
			    	  }
			      }
				}
			}
			sendNoticeToWeb(companyId,gfNum,deviceId,"2",warningMsg,deviceType+"","","0",packageType);
		}
	}

	/**
	 * 每天0点定时将当天任务保存到redis队列中
	 */
	@Override
	public void saveDeviceTimeSchedule() {
		Map<String,String> map = new HashMap<String,String>();
		String week = StringUtil.getTodayWeek();
		map.put("week", week);
		List<DeviceTimeSchedule> list = (List<DeviceTimeSchedule>) baseDao.queryForList("nettyDevice.getDeviceTimeSchedule", map);
		RedisUtils.delKeys("DTS&");
		dateFormat.setTimeZone(TimeZone.getTimeZone("GMT+00:00"));
		for (DeviceTimeSchedule bean : list) {
			List<String> reidsList = new ArrayList<>();
			String companyId = bean.getCompanyId();
			String gfNum = bean.getGfNum();
			String deviceId = bean.getDeviceNum();
			String switchNum = bean.getSwitchNum();
			int packageType = 0;
			DeviceMapBean deviceDetails = DeviceConstant.getDeviceInfo(deviceId);
			if(deviceDetails != null){
				packageType = deviceDetails.getDeviceType();
			}else{
				logger.debug(">>>未找到对应的设备信息，放弃任务");
				continue;
			}
			bean.setPackageType(packageType);
			String redisKey = "DTS&"+companyId+"&"+ gfNum +"&"+deviceId+"&"+switchNum;
			if("0".equals(bean.getControlType())){
				//单次定时
				try {
					long startTime = dateFormat.parse(bean.getStartTime()).getTime();
					long endTime = dateFormat.parse(bean.getEndTime()).getTime();
					//每条任务生成8位随机字符串,用于回传
					String taskRandomStr = StringUtil.getCharAndNumr(8);
					String controlOpenMsg = "TCD,PTDN,"+ companyId + "," + gfNum
							+ "," + packageType + "," + DeviceConstant.DEVICE_TYPE_DT 
							+ "," + deviceId + "-" + switchNum + ",1,"+taskRandomStr+",0,END,0";
					taskRandomStr = StringUtil.getCharAndNumr(8);
					String controlCloseMsg = "TCD,PTDN,"+ companyId + "," + gfNum
							+ "," + packageType + "," + DeviceConstant.DEVICE_TYPE_DT 
							+ "," + deviceId + "-" + switchNum + ",0,"+taskRandomStr+",0,END,0";
					reidsList.add(startTime + "&" + controlOpenMsg);
					reidsList.add(endTime + "&" + controlCloseMsg);
				} catch (ParseException e) {
					
				}
				
			}else{
				//循环定时
				if(bean.getDurationTime() == null || bean.getIntervalTime() == null){
					continue;
				} 
				try {
					reidsList = getControlList(bean);
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			RedisUtils.setList(redisKey, reidsList , false,false);
		}
	}
	
	/**
	 * 格式化循环定时
	 * @param bean
	 * @return
	 * @throws ParseException
	 */
	public static List<String> getControlList(DeviceTimeSchedule bean) throws ParseException{
		
		List<String> list = new ArrayList<>();
		dateFormat.setTimeZone(TimeZone.getTimeZone("GMT+00:00"));
		long startTime = dateFormat.parse(bean.getStartTime()).getTime();//开始时间
		
		String companyId = bean.getCompanyId();
		String gfNum = bean.getGfNum();
		String deviceId = bean.getDeviceNum();
		int packageType = bean.getPackageType();
		String switchNum = bean.getSwitchNum();
		
		String controlOpenMsg = "TCD,PTDN,"+ companyId + "," + gfNum
				+ "," + packageType + "," + DeviceConstant.DEVICE_TYPE_DT 
				+ "," + deviceId + "-" + switchNum + ",1,#TASK_RANDOM_STR#,0,END,0";
		String controlCloseMsg = "TCD,PTDN,"+ companyId + "," + gfNum
				+ "," + packageType + "," + DeviceConstant.DEVICE_TYPE_DT 
				+ "," + deviceId + "-" + switchNum + ",0,#TASK_RANDOM_STR#,0,END,0";
		
		long duration = bean.getDurationTime()*60000;// duration_time 持续时长
		long interval = bean.getIntervalTime()*60000;// interval_time 间隔时长
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		long today = sdf.parse(sdf.format(new Date())).getTime();
		long nowTime = System.currentTimeMillis() - today;
		
		if(bean.getLoopType() != null && bean.getLoopType() == 0 && duration > 0 && interval > 0){
			//指定时间停止循环
			long endTime = dateFormat.parse(bean.getEndTime()).getTime();// 结束时间
			while(endTime > startTime){
				if(startTime > nowTime){
					//每条任务生成8位随机字符
					String taskRandomStr = StringUtil.getCharAndNumr(8);
					list.add(startTime + "&" + controlOpenMsg.replace("#TASK_RANDOM_STR#", taskRandomStr));//开启指令
				}
				startTime+=duration;
				if(startTime > nowTime){
					//每条任务生成8位随机字符
					String taskRandomStr = StringUtil.getCharAndNumr(8);
					list.add(startTime + "&" + controlCloseMsg.replace("#TASK_RANDOM_STR#", taskRandomStr));//关闭指令
				}
				startTime+=interval;
				if(startTime >= endTime){
					break;
				}
			}
		}else if(bean.getLoopType() != null && bean.getLoopType() == 1 && duration > 0 && interval > 0){
			//指定次数停止循环
			for (int i = 0; i < bean.getLoopCnt(); i++) {
				if(startTime > nowTime){
					//每条任务生成8位随机字符
					String taskRandomStr = StringUtil.getCharAndNumr(8);
					list.add(startTime + "&" + controlOpenMsg.replace("#TASK_RANDOM_STR#", taskRandomStr));//开启指令
				}
				startTime+=duration;
				if(startTime > nowTime){
					String taskRandomStr = StringUtil.getCharAndNumr(8);
					list.add(startTime + "&" + controlCloseMsg.replace("#TASK_RANDOM_STR#", taskRandomStr));//关闭指令
				}
				startTime+=interval;
			}
		}
		
		return list;
	}

	/**
	 * 下发任务
	 */
	@Override
	public void sendDeviceTimeTask() {
		Set<String> redisKeys = RedisUtils.getKeys("DTS&");
		long nowTime = 0;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			long today = sdf.parse(sdf.format(new Date())).getTime();
			nowTime = System.currentTimeMillis() - today;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		if(redisKeys == null){
			return;
		}
		for (String redisKey : redisKeys) {
			List<String> redisVal = RedisUtils.getList(redisKey, 0, -1);
			for (int i = 0; i < redisVal.size(); i++) {
				String val = redisVal.get(i);
				String[] vals = val.split("&");
				if(vals!=null && vals.length == 2){
					Long sTime = Long.parseLong(vals[0]);
					if(nowTime >= sTime){
						//执行控制指令
						logger.debug(redisKey + "设备执行" + vals[1]);
						RedisUtils.updateList(redisKey, i, "del");
						RedisUtils.addList("NETTY_NOTICE", vals[1]);
					}
				}
			}
			//删除reids中存储的任务
			RedisUtils.deleteList(redisKey);
		}
	}

	@Override
	public void getDevicePushMsg() {
		List<String> list = RedisUtils.getList("WEB_NOTICE");
		if(list == null){
			return;
		}
		for (int j = 0; j < list.size(); j++) {
			RedisUtils.updateList("WEB_NOTICE", j, "del");
		}
		RedisUtils.deleteList("WEB_NOTICE");
		for (String msg : list) {
			logger.debug(">>>WEB接受到消息：" + msg);
			if(msg != null){
	    		if(msg.startsWith("OFF")){
	        		updateDeviceOffline(msg);
	        	}else if(msg.startsWith("DH")){
	        		//设备心跳
	        		updateDeviceHeart(msg);
	        	}else if(msg.startsWith("DD")){
	        		saveRecvDataByDevice(msg);
	        	}else if(msg.startsWith("DE")){
	        		//收到设备非正常状态通知，发送短信
	        		deviceException(msg);
	        	}
	    	}
		}
	}
	
	
	/**
	 * 修改设备心跳时间与状态
	 * @param msg
	 */
	public void updateDeviceHeart(String msg) {
		String requestArr[] = msg.split("&");
		if(requestArr != null && requestArr.length == 6){
			//心跳格式（DH&公司ID&组织ID&包类型&设备类型&设备ID）
			String companyId = requestArr[1];
			String gfNum = requestArr[2];
			String packageType = requestArr[3];
			String deviceType = requestArr[4];
			String deviceIdStr = requestArr[5];
			String deviceId = deviceIdStr;
			String switchNum = "1";
			if(!StringUtil.isEmpty(deviceIdStr) && deviceIdStr.indexOf("-") != -1 ){
				deviceId = deviceIdStr.split("-")[0];
				switchNum = deviceIdStr.split("-")[1];
			}
			String dhRedisKey = "DH&" + companyId+"&"+gfNum+"&" + packageType;
			String ddRedisKey = "DD&" + companyId+"&"+gfNum+"&" + packageType;
			String redisVal = (String) RedisUtils.getMap(dhRedisKey , deviceId);
			Map<String,String> map = new HashMap<>();
			map.put("deviceFlag", companyId + "&" + gfNum + "&" + deviceId);// 设备号是唯一的
			String state = "0";//初始化设备状态为正常
			if(!StringUtil.isEmpty(redisVal)){
				String redisVals[] = redisVal.split("&");
				//若value已存在，并且设备状态不是断线的情况，该数据保持原有状态（正常依旧正常，预警依旧预警）
				if(redisVals != null && redisVals.length == 2 
						&&	!DeviceConstant.DEVICE_STATE_OFFLINE.equals(redisVals[0])){
					state = redisVals[0];
				}
			}
			map.put("deviceState", state);
			baseDao.update("nettyDevice.updateDeviceState", map);//修改设备状态为正常
			RedisUtils.setMapKeyValue(dhRedisKey,deviceId , state+"&"+System.currentTimeMillis());//设备状态为正常
			
			// 控制设备默认
			if(String.valueOf(DeviceConstant.DEVICE_TYPE_DT).equals(deviceType)){
				//当前为动态设备心跳，将DD数据断线的设备更新成关闭
				
				String switchNumCount = (String) baseDao.queryForObject("nettyDevice.getDeviceSwtichCount", map);
				if(!StringUtil.isEmpty(switchNumCount) ){
					Integer switchNumCountI = Integer.parseInt(switchNumCount);
					for (int i = 1; i <= switchNumCountI; i++) {
						String deviceKey = deviceId+"-"+i;
						String conState = (String) RedisUtils.getMap(ddRedisKey, deviceKey);
						if(StringUtil.isEmpty(conState) 
								|| String.valueOf(DeviceConstant.CONTROLLER_DEVICE_STATE_STOP).equals(conState)){
							RedisUtils.setMapKeyValue(ddRedisKey, deviceKey , DeviceConstant.CONTROLLER_DEVICE_STATE_CLOSE);
						}
					}
				}
				
				
				
			}
		}
		
	}
	
	
	/**
	 * 将设备上传的数据保存入库、并判断是否预警与智能控制
	 * reids格式说明：
	 * 	(key:DD&公司id&大棚号&包类型  value:<设备编号,数据&时间戳>)
	 */
	public void saveRecvDataByDevice(String msg) {
		System.out.println("收到采集数据:" + msg);
		String requestArr[] = msg.split("&");
		if (requestArr != null && requestArr.length == 7) {
			// 数据格式（DD&公司ID&组织ID&包类型&设备类型&设备ID&数值）
			String companyId = requestArr[1];
			String gfNum = requestArr[2];
			String packageType = requestArr[3];
			String deviceType = requestArr[4];
			String deviceIdStr = requestArr[5];
			String deviceId = deviceIdStr;
			String switchNum = "1";
			if (!StringUtil.isEmpty(deviceIdStr) && deviceIdStr.indexOf("-") != -1) {
				deviceId = deviceIdStr.split("-")[0];
				switchNum = deviceIdStr.split("-")[1];
			}
			String data = requestArr[6];
			DeviceMapBean deviceDetails = DeviceConstant.getDeviceInfo(deviceId);
			if (deviceDetails == null || "ok".equals(data)) {
				return;
			}
			int parkDevice = deviceDetails.getParkDevice();
			String deviceName = deviceDetails.getDeviceName();
			String dhRedisKey = "DH&" + companyId + "&" + gfNum + "&" + packageType;
			String ddRedisKey = "DD&" + companyId + "&" + gfNum + "&" + packageType;
			Map<String, String> map = new HashMap<String, String>();
			map.put("deviceFlag", companyId + "&" + gfNum + "&" + deviceId);
			map.put("companyId", companyId);
			map.put("gfNum", gfNum);
			map.put("deviceId", deviceId);
			map.put("data", data);
			
			DeviceMapBean deviceInfo = DeviceConstant.getDeviceInfo(deviceId);
			if(deviceInfo == null){
				return;
			}

			// 静态设备（采集器、园区）逻辑
			if (String.valueOf(DeviceConstant.DEVICE_TYPE_JT).equals(deviceType)
					&& String.valueOf(DeviceConstant.DEVICE_TYPE_JT).equals(deviceInfo.getDataType())) {
				Integer deviceCurrentState = 0;// 当前设备状态
				String redisVal = (String) RedisUtils.getMap(dhRedisKey, deviceId);
				// 如果redis有数据则将数据赋予给设备，显示设备的状态
				if (!StringUtil.isEmpty(redisVal) && redisVal.split(",").length == 2) {
					deviceCurrentState = Integer.parseInt(redisVal.split(",")[0]);
				}
				String modifyVal = (String) baseDao.queryForObject("nettyDevice.getDeviceModifyVal", map);
				if(!StringUtil.isEmpty(modifyVal)){
					data = modifyVal;
					map.put("data", data);
				}
				// 当前数据存入redis中 DD(保存数值)
				RedisUtils.setMapKeyValue(ddRedisKey, deviceId, data);
				// 保存redis DH数据（更新心跳）
				RedisUtils.setMapKeyValue(dhRedisKey, deviceId, DeviceConstant.DEVICE_STATE_RUNING + "&" + System.currentTimeMillis());

				// ----------->若设备为非园区设备，则开始判断是否超出预警范围
				if (parkDevice == DeviceConstant.DEVICE_TYPE_NPARK) {
					Integer dataOutOfRange = (Integer) baseDao.queryForObject("nettyDevice.getDeviceIsOutOfRange", map);
					if (dataOutOfRange != null) {
						String warningInfo = "";
						map.put("packageType", packageType);
						String displayName = (String) baseDao.queryForObject("nettyDevice.getDisplayName", map);
						if (dataOutOfRange > 0 && DeviceConstant.DEVICE_STATE_RUNING.equals(String.valueOf(deviceCurrentState))) {
							// 运行正常的设备 数据超出范围
							if (dataOutOfRange == 1) {
								warningInfo = deviceName + "设备低于正常值(" + data + ")";
							} else {
								warningInfo = deviceName + "设备高于正常值(" + data + ")";
							}
							// 保存预警信息
							map.put("warningInfo", warningInfo);
							map.put("warningType", DeviceConstant.WARNING_TYPE_OUT);
							baseDao.insert("nettyDevice.saveDeviceWarning", map);
							// 修改设备运行状态为预警
							map.put("deviceState", "1");
							baseDao.update("nettyDevice.updateDeviceState", map);
							// 保存redis数据，状态为1（预警状态）
							RedisUtils.setMapKeyValue(dhRedisKey, deviceId, DeviceConstant.DEVICE_STATE_WARNING + "&" + System.currentTimeMillis());
							JgPushUtil.jiguangPush(companyId, displayName + warningInfo);
							sendNoticeToWeb(companyId, gfNum, deviceId, "1", warningInfo, DeviceConstant.DEVICE_TYPE_JT+"", data, "",packageType);
						} else if (dataOutOfRange == 0 && !DeviceConstant.DEVICE_STATE_RUNING.equals(String.valueOf(deviceCurrentState))) {
							// 预警或断线的设备 恢复正常
							warningInfo = deviceName + "恢复正常范围";
							map.put("deviceState", "0");
							baseDao.update("nettyDevice.updateDeviceState", map);// 修改设备状态
							RedisUtils.setMapKeyValue(dhRedisKey, deviceId, DeviceConstant.DEVICE_STATE_RUNING + "&" + System.currentTimeMillis());
							sendNoticeToWeb(companyId, gfNum, deviceId, "0", warningInfo, DeviceConstant.DEVICE_TYPE_JT+"", data, "",packageType);
						} else {
							sendNoticeToWeb(companyId, gfNum, deviceId, "0", "", DeviceConstant.DEVICE_TYPE_JT+"", data, "",packageType);
						}
					}else{
						sendNoticeToWeb(companyId, gfNum, deviceId, "0", "", DeviceConstant.DEVICE_TYPE_JT+"", data, "",packageType);
					}
					// --------->智能控制
					String week = StringUtil.getTodayWeek();
					map.put("week", week);
					List<String> autoList = (List<String>) baseDao.queryForList("nettyDevice.getDeviceAutoControl", map);
					String warningMsg = "WCD,PTDN," + companyId + "," + gfNum + "," + packageType + ",0,#device_num#,END";
					for (String bean : autoList) {
						RedisUtils.addList("NETTY_NOTICE", warningMsg.replace("#device_num#", bean));
					}
					// ----------智能控制结束
				}
				// <---------预警判断结束

				// ----------->保存数据开始
				if (String.valueOf(DeviceConstant.PACKAGE_TYPE_NY).equals(packageType)) {
					// 农业静态设备
					baseDao.insert("nettyDevice.saveGroundDeviceData", map);
				} else if (String.valueOf(DeviceConstant.PACKAGE_TYPE_YY).equals(packageType)) {
					// 渔业静态设备
					baseDao.insert("nettyDevice.saveFishpondDeviceData", map);
				} else if (String.valueOf(DeviceConstant.PACKAGE_TYPE_DT).equals(packageType)) {
					// 大田静态设备
					baseDao.insert("nettyDevice.saveDaTianDeviceData", map);
				} else if (String.valueOf(DeviceConstant.PACKAGE_TYPE_CK).equals(packageType)) {
					// TODO:仓库静态设备待编写
					baseDao.insert("nettyDevice.saveCangKuDeviceData", map);
				}
				try {
					if(DeviceConstant.DEVICE_SUM_DATA.contains(deviceId)){
						Integer result = baseDao.update("nettyDevice.updateDataSum", map);
						if(result == null || result == 0){
							baseDao.insert("nettyDevice.saveDataSum", map);
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
					logger.info("=====error:计算总值失败");
				}
				// <---------保存数据结束
				// <-----------静态数据处理完成
			} else if (String.valueOf(DeviceConstant.DEVICE_TYPE_DT).equals(deviceType)
					&& String.valueOf(DeviceConstant.DEVICE_TYPE_DT).equals(deviceInfo.getDataType())) {
				// 动态设备
				// 当前控制器开关状态
				String conState = (String) RedisUtils.getMap(ddRedisKey, deviceId + "-" + switchNum);
				if (!data.equals(conState)) {
					// 如果当前状态与数据状态不同，说明状态被修改，发送通知
					if (DeviceConstant.CONTROLLER_DEVICE_STATE_CLOSE.equals(data)) {
						// 通知WEB，控制器关闭
						sendNoticeToWeb(companyId, gfNum, deviceId, "0", deviceName + "关闭", DeviceConstant.DEVICE_TYPE_DT+"", "", switchNum,packageType);// 控制器的1标识关闭
					} else {
						// 通知WEB，控制器开启
						sendNoticeToWeb(companyId, gfNum, deviceId, "1", deviceName + "开启", DeviceConstant.DEVICE_TYPE_DT+"", "", switchNum,packageType);// 控制器的0标识开启
					}
				}
				// 当前数据存入redis中 DD(保存数值)
				RedisUtils.setMapKeyValue(ddRedisKey, deviceId + "-" + switchNum, data);
				// 保存redis DH数据（更新心跳）
				RedisUtils.setMapKeyValue(dhRedisKey, deviceId, DeviceConstant.DEVICE_STATE_RUNING + "&" + System.currentTimeMillis());
				map.put("deviceState", DeviceConstant.DEVICE_STATE_RUNING);
				baseDao.update("nettyDevice.updateDeviceState", map);// 修改设备运行状态为正常
				return;

			}
		}
	}
	
	
	
	/**
	 * 
	 * @param companyId	公司id
	 * @param gfNum	组织号
	 * @param deviceId	设备id
	 * @param state  设备状态
	 * @param warningMsg	预警信息
	 * @param type   设备类型
	 * @param val	数值
	 * @Param switchNum	动态设备开关(71-1后边的1)
	 * @Param deviceType设备类型0农1渔2田3仓
	 */
	public void sendNoticeToWeb(String companyId , String gfNum
			,String deviceId,String state,String warningMsg
			,String type,String val,String switchNum,String deviceType){
		//推送给页面
		WebSocketBean webSocketBean = new WebSocketBean(companyId,gfNum,deviceId,state,warningMsg,type,val,switchNum,deviceType);
		Gson gson = new Gson();
		logger.info("push to user:" + companyId);
		logger.info("push content:" + gson.toJson(webSocketBean));
		WebSocketAction.sendString(gson.toJson(webSocketBean), companyId);
	}

	@Override
	public void getWeather() {
		
		List<WeatherBean> list = (List<WeatherBean>) baseDao.queryForList("nettyDevice.getAllCompanyGps", null);
		for (WeatherBean weatherBean : list) {
			try {
				String companyId = weatherBean.getCompanyId();
				String gps = weatherBean.getGps();
				String weatherUrl = SystemConfig.WEATHER_URL.replace("#LOCATION#", gps);
				String weatherInfo = HtmlUtils.getHtmlByUrl(weatherUrl, "utf-8");
				JSONObject jsObj = JSONObject.parseObject(weatherInfo);
				JSONArray jsArr = jsObj.getJSONArray("results");
				JSONObject jsonObj = jsArr.getJSONObject(0);
				JSONObject nowObj = jsonObj.getJSONObject("now");
				String text = nowObj.getString("text");
				String temperature = nowObj.getString("temperature");
				weatherBean.setWeatherText(text);
				weatherBean.setTemperature(temperature);
				JgPushUtil.jiguangPush(companyId, "温度：" + temperature + "℃" + "\r\n天气状况：" + text);
			} catch (Exception e) {
				e.printStackTrace();
				continue;
			}
		}
	}
	
	/**
	 * 收到设备不正常工作的异常通知信息
	 */
	public void deviceException(String msg){
		//TODO:设备异常报警相关
		String requestArr[] = msg.split("&");
		if(requestArr != null && requestArr.length == 7){
			//心跳格式（DH&公司ID&组织ID&包类型&设备类型&设备ID）
			String companyId = requestArr[1];
			String gfNum = requestArr[2];
			String packageType = requestArr[3];
			String deviceType = requestArr[4];
			String deviceIdStr = requestArr[5];
			Map map = new HashMap<>();
			map.put("companyId", companyId);
			String companyPhone = (String) baseDao.queryForObject("nettyDevice.getPhoneById", map);
			if(StringUtil.isEmpty(companyPhone) 
					|| StringUtil.isEmpty(gfNum) 
					|| StringUtil.isEmpty(deviceIdStr) 
					|| StringUtil.isEmpty(packageType)){
				return;
			}
			if(deviceIdStr.indexOf("-") != -1){
				deviceIdStr = deviceIdStr.split("-")[0];
			}
			String companyType = "";
			if(String.valueOf(DeviceConstant.PACKAGE_TYPE_NY).equals(packageType)){
				companyType= "大棚";
			}else if(String.valueOf(DeviceConstant.PACKAGE_TYPE_YY).equals(packageType)){
				companyType= "鱼池";
			}else if(String.valueOf(DeviceConstant.PACKAGE_TYPE_CK).equals(packageType)){
				companyType= "仓库";
			}else if(String.valueOf(DeviceConstant.PACKAGE_TYPE_DT).equals(packageType)){
				companyType= "大田";
			}
			DeviceMapBean deviceInfo = DeviceConstant.getDeviceInfo(deviceIdStr);
			if(deviceInfo == null){
				return;
			}
			String deviceName = deviceInfo.getDeviceName();
			String[] parameter= {gfNum,companyType,deviceName};
			SDKTestSendTemplateSMS.sendSMS(SDKTestSendTemplateSMS.SMS_SEND_DEVICE_EXCEPTION
					, companyPhone, parameter);
			if("CO2控制器".equals(deviceName)){
				deviceName = "二氧化碳控制器";
			}
			String warningText = "您好，您园区的"+gfNum+"号"+companyType+"的"+deviceName+"设备存在不正常工作状态，请您留意。";
			SDKTestLandingCall.sendVoiceNotice(companyPhone,warningText,"3");
			map.put("gfNum", gfNum);
			map.put("deviceId", deviceIdStr);
			map.put("waringInfo", warningText);
			map.put("packageType", packageType);
			baseDao.insert("nettyDevice.saveDeviceExceptionData", map);
		}
		
	}
	
	public static void main(String[] args) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		long today = sdf.parse(sdf.format(new Date())).getTime();
		long nowTime = System.currentTimeMillis() - today;
		System.out.println(nowTime);
		long time = nowTime;
		long hour = time / (3600 * 1000);
		long minute = (time - (hour * 3600 * 1000))/(60 * 1000) ;
		System.out.println(hour + ":" + minute);
	}
	
	
}
