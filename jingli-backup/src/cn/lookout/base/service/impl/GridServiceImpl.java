package cn.lookout.base.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;

import cn.lookout.base.bean.GridDataBean;
import cn.lookout.base.bean.Response;
import cn.lookout.base.constant.Cnst;
import cn.lookout.base.dao.IBaseDao;
import cn.lookout.base.service.IGridService;
import cn.lookout.common.StringUtil;

public class GridServiceImpl implements IGridService {

	public static final Logger logger = Logger.getLogger(GridServiceImpl.class);

	private IBaseDao baseDao;

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Response dateByDeviceNum(Map map) {
		logger.debug(">>>start:报表查询" + JSON.toJSONString(map));
		Response res = new Response();
		String areaNum = MapUtils.getString(map, "areaNum"); // 大棚/鱼塘编号
		String deviceNum = MapUtils.getString(map, "deviceNum"); // 设备类型
		String startTime = MapUtils.getString(map, "startTime"); // 时间范围，开始,yyyy-MM-dd
		String endTime = MapUtils.getString(map, "endTime"); // 时间范围，结束,yyyy-MM-dd
		String strategy = MapUtils.getString(map, "strategy"); // 分配策略，max最高，avg平均，min最低,now实时
		String userType = MapUtils.getString(map , "userType") ;	//权限类型
		String companyId = MapUtils.getString(map , "companyId") ;//公司id
		String isWarehouse =  MapUtils.getString(map , "isWarehouse") ;//是否查询的是仓库0否 1是
		if(StringUtil.isEmpty(companyId)){
			res.setStatusCode(-400);
			res.setMessage("公司id不能为空");
			logger.debug("<<<END:报表查询" + JSON.toJSONString(res));
			return res;
		}else if(StringUtil.isEmpty(userType) 
				|| Cnst.USER_TYPE_ADMIN.equals(userType) 
				|| Cnst.USER_TYPE_SUPER.equals(userType)){
			res.setStatusCode(-400);
			res.setMessage("公司类型错误");
			logger.debug("<<<END:报表查询" + JSON.toJSONString(res));
		}
		Map<String, Object> resMap = new HashMap<String, Object>();
		// 此处可能要加一些参数非空判断
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date startDate = sdf.parse(startTime); // 开始时间
			Date endDate = sdf.parse(endTime); // 结束时间
			// 把时间转换成yyyyMMdd格式，方便数据库对比
			SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMdd");
			String startTime2 = sdf2.format(startDate);
			String endTime2 = sdf2.format(endDate);
			int startTime2Int = Integer.parseInt(startTime2);
			int endTime2Int = Integer.parseInt(endTime2);
			// 把int格式日期重新放入map
			map.put("startTime", startTime2Int);
			map.put("endTime", endTime2Int);
			if (startTime2Int > endTime2Int) {
				res.setMessage("开始时间不能比结束时间大");
				res.setStatusCode(-2);
				logger.debug("<<<END:报表查询" + JSON.toJSONString(res));
				return res;
			}

			List<Map<String, Object>> list = null; // sql查询结果

			//查看实时数据
			if(Cnst.NOW.equals(strategy)){
				List<GridDataBean> allDataList = new ArrayList<GridDataBean>();
				
				if("1".equals(isWarehouse)){
					allDataList = (List<GridDataBean>) baseDao.queryForList("gridData.getGridDataNowCk", map);
				}else{
					allDataList = (List<GridDataBean>) baseDao.queryForList("gridData.getGridDataNow", map);
				}
				
				String[] x = new String[allDataList.size()];
				Double[] y = new Double[allDataList.size()];
				for (int i = 0; i < allDataList.size(); i++) {
					try {
						x[i] = allDataList.get(i).getTime();
						y[i] = Double.parseDouble(allDataList.get(i).getData());
					} catch (Exception e) {
					}
				}
				resMap.put("x", x);
				resMap.put("y", y);
				res.setStatusCode(1);
				res.setMessage("获取成功");
				res.setResult(resMap);
				logger.debug("<<<END:报表查询" + JSON.toJSONString(res));
				return res;
			}
			// 按小时统计
			if (startTime.equals(endTime)) {
				String[] x = null;
				if(startTime.equals(sdf.format(new Date()))){
					SimpleDateFormat sdf3 = new SimpleDateFormat("HH");
					int hours = Integer.parseInt(sdf3.format(new Date()))+1;
					x = new String[hours];
					for (int i = 0; i < hours; i++) {
						if(i < 10){
							x[i] = "0"+i+":00";
						}else{
							x[i] = i+":00";
						}
					}
				}else{
					x = new String[] { "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
							"08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
							"18:00", "19:00", "20:00", "21:00", "22:00", "23:00" };
				}
				if("1".equals(isWarehouse)){
					list = (List<Map<String, Object>>) baseDao.queryForList("gridData.getGridDataTodayCk", map);
				}else{
					list = (List<Map<String, Object>>) baseDao.queryForList("gridData.getGridDataToday", map);
				}
				Double[] y = new Double[x.length];
				// 初始化变量
				for (int i = 0; i < y.length; i++) {
					y[i] = (double) 0;
				}

				if (list != null) {

					int xPosition = 0; // 位置游标

					for (Map<String, Object> row : list) {

						String data = MapUtils.getString(row, "data");
						String yearDateHour = MapUtils.getString(row, "yearDateHour");
						String hour = yearDateHour.substring(8);

						for (int i = xPosition; i < x.length; i++) {

							if (x[i].startsWith(hour)) {

								xPosition = i; // 此操作为了节省循环，毕竟前面的循环一次了，没必要循环第二次

								y[xPosition] = Double.parseDouble(data); // 将y轴的值对应上
								break;
							}
						}

						xPosition++; // 执行一次循环，游标移动一次
					}

				} else {
					logger.error("结果集为空");
				}

				resMap.put("x", x);
				resMap.put("y", y);
				
				res.setStatusCode(1);
				res.setMessage("获取成功");
				res.setResult(resMap);
				logger.debug("<<<END:报表查询" + JSON.toJSONString(res));

			} else { // 按天统计

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
				
				logger.debug("xLength:"+xLength);
				
				// x轴的值
				String[] x = new String[xLength + 1]; // 要加上边界

				String[] xFull = new String[xLength + 1]; // 把年月日都记录下来，方便后续y轴数据的处理
				
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
				String startTime1 = startTime.replace("-", "");
				String endTime1 = endTime.replace("-", "");
				map.put("startTime",startTime1);
				map.put("endTime",endTime1);
				
				if("1".equals(isWarehouse)){
					list = (List<Map<String, Object>>) baseDao.queryForList("gridData.getGridDataDayCk", map);
				}else{
					list = (List<Map<String, Object>>) baseDao.queryForList("gridData.getGridDataDay", map);
				}
				
				Double[] y = new Double[x.length];

				// 初始化变量
				for (int i = 0; i < y.length; i++) {
					y[i] = (double) 0;
				}

				if (list != null) {

					int xPosition = 0; // 位置游标

					for (Map<String, Object> row : list) {

						String data = MapUtils.getString(row, "data");
						String yearDate = MapUtils.getString(row, "yearDate"); // 字段跟上面按小时的不一样

						for (int i = xPosition; i < xFull.length; i++) {

							if (xFull[i].equals(yearDate)) {

								xPosition = i; // 此操作为了节省循环，毕竟前面的循环一次了，没必要循环第二次

								y[xPosition] = Double.parseDouble(data); // 将y轴的值对应上
								break;
							}
						}

						xPosition++; // 执行一次循环，游标移动一次
					}

				} else {
					logger.error("结果集为空");
				}

				resMap.put("x", x);
				resMap.put("y", y);
				
				res.setStatusCode(1);
				res.setMessage("获取成功");
				res.setResult(resMap);
				logger.debug("<<<END:报表查询" + JSON.toJSONString(res));
			}

		} catch (ParseException e) {
			logger.error(e.getMessage());
		}

		return res;
	}

}
