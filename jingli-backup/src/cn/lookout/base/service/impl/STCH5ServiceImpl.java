package cn.lookout.base.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.log4j.Logger;

import cn.lookout.base.bean.Response;
import cn.lookout.base.constant.Cnst;
import cn.lookout.base.constant.DeviceConstant;
import cn.lookout.base.dao.IBaseDao;
import cn.lookout.base.service.ISTCH5Service;
import cn.lookout.common.StringUtil;
import cn.lookout.common.SystemConfig;

public class STCH5ServiceImpl implements ISTCH5Service {
	
	public static final Logger logger = Logger.getLogger(STCH5ServiceImpl.class);

	private IBaseDao baseDao;

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Response showArchive(Map map) {
		
		Response res = new Response();
		String barcode = MapUtils.getString(map, "barcode"); // 条形码
		if(StringUtil.isEmpty(barcode)) {
			res.setStatusCode(-3);
			res.setMessage("条形码不能为空");
			return res;
		}
		
		//先根据条形码查询产品类型（农业，渔业）
		String barcodeType = (String) baseDao.queryForObject("source.STC_h5_queryTypeByBarcode", map);
		
		if(StringUtil.isEmpty(barcodeType)) {
			logger.error("条形码不存在，barcode:"+barcode);
			res.setStatusCode(-2);
			res.setMessage("条形码不存在");
			return res;
		}
		
		Map<String, Object> result = null;
		
		if (Cnst.USER_TYPE_NY.equals(barcodeType)) {
			// 农业档案
			result = (Map<String, Object>) baseDao.queryForObject("source.STC_h5_showArchive_g", map);
		} else if (Cnst.USER_TYPE_YY.equals(barcodeType)) {
			// 渔业档案
			result = (Map<String, Object>) baseDao.queryForObject("source.STC_h5_showArchive_f", map);
		} else if (Cnst.USER_TYPE_DT.equals(barcodeType)){
			//大田档案
			result = (Map<String, Object>) baseDao.queryForObject("source.STC_h5_showArchive_t", map);
		}
		
		if(result != null) {
			String saler = MapUtils.getString(result, "saler");
			
			if(!StringUtil.isEmpty(saler)) {
				map.put("ids", saler);
				
				List<Map<String, Object>> list = (List<Map<String, Object>>) baseDao.queryForList("source.STC_h5_queryEmployee", map);
				
				String salerStr = "";
				
				if(list != null) {
				
					for(Map<String, Object> m : list) {
						String name = MapUtils.getString(m, "name");
						String mobile = MapUtils.getString(m, "mobile");
						
						salerStr += ";" + name + "," + mobile;
					}
				}
				
				if(!StringUtil.isEmpty(salerStr)) {
					salerStr = salerStr.substring(1);
				}
				
				result.put("saler", salerStr);
			}
		}
		
		res.setStatusCode(1);
		res.setResult(result);
		
		return res;
	}


	@Override
	public Response updateArea(Map map) {
		
		Response res = new Response();
		String userType = MapUtils.getString(map, "userType"); // 条形码
		if(StringUtil.isEmpty(userType)) {
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		baseDao.update("source.STC_h5_updtArea", map);
		res.setStatusCode(1);
		return res;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Response queryEnvData(Map map) {
		Response res = new Response();
		try {
			String batchId = MapUtils.getString(map, "batchId");
			String deviceNum = MapUtils.getString(map, "deviceNum"); // 设备编号
			// 根据批次id查询公司id，公司类型，鱼塘/大棚编号
			Map<String,Object> typeMap = (Map<String,Object>) baseDao.queryForObject("source.STC_h5_queryTypeByBatchId", map);
			if(typeMap != null ) {
				String plantTime = (String) baseDao.queryForObject("source.getPlantTime", typeMap);
				List<Map<String, Object>> listAvg = null;
				List<Map<String, Object>> listMax = null;
				List<Map<String, Object>> listMin = null;
				
				String companyId = MapUtils.getString(typeMap, "company_id");
				String sourceId = MapUtils.getString(typeMap, "product_id");
				String userType = MapUtils.getString(typeMap, "type");
				String listedTime = MapUtils.getString(typeMap, "listedTime"); // 上市时间
				
				String startTime = plantTime.replace("-", "");
				String endTime = listedTime.replace("-", "");
				
				Map<String,Object> paramMap = new HashMap<String,Object>(); 
				paramMap.put("companyId", companyId);
				paramMap.put("sourceId", sourceId);
				paramMap.put("startTime", startTime);
				paramMap.put("endTime", endTime);
				paramMap.put("deviceNum", deviceNum);
				
				if (Cnst.USER_TYPE_NY.equals(userType)) {
					// 农业
					paramMap.put("searchType", "avg");
					listAvg = (List<Map<String, Object>>) baseDao.queryForList("source.STC_h5_env_g", paramMap);
					paramMap.put("searchType", "max");
					listMax = (List<Map<String, Object>>) baseDao.queryForList("source.STC_h5_env_g", paramMap);
					paramMap.put("searchType", "min");
					listMin = (List<Map<String, Object>>) baseDao.queryForList("source.STC_h5_env_g", paramMap);
				} else if (Cnst.USER_TYPE_YY.equals(userType)) {
					// 渔业
					paramMap.put("searchType", "avg");
					listAvg = (List<Map<String, Object>>) baseDao.queryForList("source.STC_h5_env_f", paramMap);
					paramMap.put("searchType", "max");
					listMax = (List<Map<String, Object>>) baseDao.queryForList("source.STC_h5_env_f", paramMap);
					paramMap.put("searchType", "min");
					listMin = (List<Map<String, Object>>) baseDao.queryForList("source.STC_h5_env_f", paramMap);
				} else if (Cnst.USER_TYPE_DT.equals(userType)) {
					// 渔业
					paramMap.put("searchType", "avg");
					listAvg = (List<Map<String, Object>>) baseDao.queryForList("source.STC_h5_env_t", paramMap);
					paramMap.put("searchType", "max");
					listMax = (List<Map<String, Object>>) baseDao.queryForList("source.STC_h5_env_t", paramMap);
					paramMap.put("searchType", "min");
					listMin = (List<Map<String, Object>>) baseDao.queryForList("source.STC_h5_env_f", paramMap);
				}
				
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	
				Date startDate = sdf.parse(plantTime); // 开始时间
				Date endDate = sdf.parse(listedTime); // 结束时间
					
				
				Calendar cl = Calendar.getInstance();
	
				// 计算两个日期之间的天数
				cl.setTime(startDate); // 开始时间
	
				int startYear = cl.get(Calendar.YEAR);
				int startDay = cl.get(Calendar.DAY_OF_YEAR); // 当年的第多少天
	
				cl.setTime(endDate); // 开始时间
	
				int endYear = cl.get(Calendar.YEAR);
				int endDay = cl.get(Calendar.DAY_OF_YEAR); // 当年的第多少天
	
				int xLength = 0; // 天数
	
				if (startYear != endYear) { // 不同年份
					int timeDistance = 0;
					for (int i = startYear; i < endYear; i++) {
						if (i % 4 == 0 && i % 100 != 0 || i % 400 == 0) { // 闰年
							timeDistance += 366;
						} else { // 不是闰年
							timeDistance += 365;
						}
					}
	
					xLength = timeDistance + (endDay - startDay);
				} else { // 同一年
					xLength = endDay - startDay;
				}
				
				if(xLength < 0) {
					logger.error("数据错误：上市时间小于创建时间，createTime:"+plantTime+",listedTime:"+listedTime);
					res.setStatusCode(-1);
					res.setMessage("数据错误");
					return res;
				}
				
				// x轴的值
				String[] x = new String[xLength + 1]; // 要加上边界
	
				String[] xFull = new String[xLength + 1]; // 把年月日都记录下来，方便后续y轴数据的处理
				
				logger.debug("xLength:"+x.length);
				logger.debug("paramMap:"+paramMap);
				
				// 给x轴赋值
				for (int i = 0; i < x.length; i++) {
	
					cl.setTime(startDate);
					cl.add(Calendar.DATE, i);
	
					int year = cl.get(Calendar.YEAR);
					int month = cl.get(Calendar.MONTH) + 1;
					String monStr = month + "";
					if(month < 10){
						monStr="0"+month;
					}
					int day = cl.get(Calendar.DAY_OF_MONTH);
					String dayStr = day + "";
					if(day < 10){
						dayStr="0"+day;
					}
	
					x[i] = monStr + "." + dayStr;
					xFull[i] = "" + year + monStr + dayStr; // yyyyMMdd
				}
				
				Double[] yAvg = new Double[x.length];
				Double[] yMax = new Double[x.length];
				Double[] yMin = new Double[x.length];
	
				// 初始化变量
				for (int i = 0; i < yAvg.length; i++) {
					yAvg[i] = (double) 0;
					yMax[i] = (double) 0;
					yMin[i] = (double) 0;
				}
	
				if (listAvg != null) {
	
					int xPosition = 0; // 位置游标
	
					for(int j = 0; j < listAvg.size(); j++) {
						
						Map<String,Object> rowAvg = listAvg.get(j);
						Map<String,Object> rowMax = listMax.get(j);
						Map<String,Object> rowMin = listMin.get(j);
						
						String dataAvg = MapUtils.getString(rowAvg, "data");
						String dataMax = MapUtils.getString(rowMax, "data");
						String dataMin = MapUtils.getString(rowMin, "data");
						
						String yearDate = MapUtils.getString(rowAvg, "yearDate"); // 字段跟上面按小时的不一样
	
						for (int i = xPosition; i < xFull.length; i++) {
	
							if (xFull[i].equals(yearDate)) {
	
								xPosition = i; // 此操作为了节省循环，毕竟前面的循环一次了，没必要循环第二次
	
								yAvg[xPosition] = Double.parseDouble(dataAvg); // 将y轴的值对应上
								yMax[xPosition] = Double.parseDouble(dataMax); // 将y轴的值对应上
								yMin[xPosition] = Double.parseDouble(dataMin); // 将y轴的值对应上
								break;
							}
						}
	
						xPosition++; // 执行一次循环，游标移动一次
						
					}
	
				} else {
					logger.error("结果集为空");
				}
	
				List<Map<String,Object>> yList = new ArrayList<Map<String,Object>>();
				
				Map<String,Object> mAvg = new HashMap<String,Object>();
				mAvg.put("name", "平均值");
				mAvg.put("data", yAvg);
				
				Map<String,Object> mMax = new HashMap<String,Object>();
				mMax.put("name", "最大值");
				mMax.put("data", yMax);
				
				Map<String,Object> mMin = new HashMap<String,Object>();
				mMin.put("name", "最小值");
				mMin.put("data", yMin);
				
				yList.add(mAvg);
				yList.add(mMax);
				yList.add(mMin);
				
				Map<String, Object> resMap = new HashMap<String, Object>();
	
				resMap.put("x", x);
				resMap.put("y", yList);
	
				res.setStatusCode(1);
				res.setResult(resMap);
				
			} else {
				logger.info("未查询到数据，batchId:"+batchId);
				res.setStatusCode(-1);
				res.setMessage("未查询到数据");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatusCode(-1);
			res.setMessage("服务器忙");
		}
		
		return res;
	}

	@Override
	public Response queryBarcode(Map map) {
		Response res = new Response();
		String barcode = MapUtils.getString(map, "barcode"); // 条形码
		if(StringUtil.isEmpty(barcode)) {
			res.setStatusCode(-3);
			res.setMessage("条形码不能为空");
			return res;
		}
		String barcodeType = (String) baseDao.queryForObject("source.STC_h5_queryTypeByBarcode", map);
		String url = "";
		if(Cnst.USER_TYPE_NY.equals(barcodeType)){
			//农业二维码
			url = SystemConfig.h5_page_url + barcode;
		}else if(Cnst.USER_TYPE_YY.equals(barcodeType)){
			//渔业二维码
			url = SystemConfig.h5_fish_url + barcode;
		}else if(Cnst.USER_TYPE_DT.equals(barcodeType)){
			//大田二维码
			url = SystemConfig.h5_datian_url + barcode;
		}
		if(StringUtil.isEmpty(barcodeType)) {
			logger.error("条形码不存在，barcode:"+barcode);
			res.setStatusCode(-2);
			res.setMessage("条形码不存在");
		}else{
			res.setStatusCode(1);
			res.setMessage("获取成功");
			res.setResult(url);
		}
		return res;
	}

	
}
