package cn.lookout.base.constant;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

import com.google.gson.Gson;

import cn.lookout.base.bean.DeviceMapBean;
import cn.lookout.common.RedisUtils;

/**
 * 设备相关常量
 */
public class DeviceConstant {

	/** 设备状态-正常运行*/
	public final static String DEVICE_STATE_RUNING = "0";
	/** 设备状态-预警*/
	public final static String DEVICE_STATE_WARNING = "1";
	/** 设备状态-断线*/
	public final static String DEVICE_STATE_OFFLINE = "2";
	
	/** 动态设备-关闭状态*/
	public final static String CONTROLLER_DEVICE_STATE_CLOSE = "0";
	/** 动态设备-开启状态*/
	public final static String CONTROLLER_DEVICE_STATE_OPEN = "1";
	/** 动态设备-停止（断线）状态*/
	public final static String CONTROLLER_DEVICE_STATE_STOP = "2";
	
	/** 包类型-农业*/
	public final static int PACKAGE_TYPE_NY = 0;
	/** 包类型-渔业*/
	public final static int PACKAGE_TYPE_YY = 1;
	/** 包类型-大田*/
	public final static int PACKAGE_TYPE_DT = 2;
	/** 包类型-仓库*/
	public final static int PACKAGE_TYPE_CK = 3;
	
	/** 设备类型-动态设备*/
	public final static int DEVICE_TYPE_DT = 0;
	/** 设备类型-静态设备*/
	public final static int DEVICE_TYPE_JT = 1;
	
	/** 设备类型-非园区设备*/
	public final static int DEVICE_TYPE_NPARK = 0;
	/** 设备类型-园区设备*/
	public final static int DEVICE_TYPE_PARK = 1;
	
	/**	超出范围预警*/
	public final static String WARNING_TYPE_OUT = "0";
	/**	断线预警*/
	public final static String WARNING_TYPE_OFFLINE = "1";
	
	/**
	 * redis中获取设备信息
	 * @param deviceId 设备id
	 * @return
	 */
	public static DeviceMapBean getDeviceInfo(String deviceId){
		try {
			String deviceInfoJson = (String) RedisUtils.getMap("DEVICE_INFO_MAP", deviceId);
			if(deviceInfoJson != null){
				Gson gson = new Gson();
				return gson.fromJson(deviceInfoJson, DeviceMapBean.class);
			}else{
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	
	/**
	 * 数据统计（年度积温，年度光照等）
	 */
	public final static HashSet<String> DEVICE_SUM_DATA = new HashSet<String>() {
		{
			add("1");add("12");//大棚温度、光照
			add("31");add("44");//鱼塘温度、光照
			add("200");add("213");//大田温度、光照
		}
	};
	
	
	public final static Map<Integer, DeviceMapBean> DEVICE_DETAIL_INFO = new HashMap<Integer, DeviceMapBean>() {
	    {
	    	//农业传感器
	    	put(1, 	new DeviceMapBean(1,"空气温度",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"℃",DEVICE_TYPE_NPARK,0));
	    	put(2, 	new DeviceMapBean(2,"空气湿度",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"%",DEVICE_TYPE_NPARK,0));
	    	put(3, 	new DeviceMapBean(3,"CO2浓度",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"%",DEVICE_TYPE_NPARK,0));
	    	put(4, 	new DeviceMapBean(4,"光照强度",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"Lux",DEVICE_TYPE_NPARK,0));
	    	put(5, 	new DeviceMapBean(5,"土壤温度",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"℃",DEVICE_TYPE_NPARK,0));
	    	put(6, 	new DeviceMapBean(6,"土壤湿度",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"%",DEVICE_TYPE_NPARK,0));
	    	put(7, 	new DeviceMapBean(7,"土壤PH",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"PH",DEVICE_TYPE_NPARK,0));
	    	put(17, new DeviceMapBean(17,"叶面温度",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"℃",DEVICE_TYPE_NPARK,0));
	    	put(18, new DeviceMapBean(18,"叶面湿度",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"%",DEVICE_TYPE_NPARK,0));
	    	put(19, new DeviceMapBean(19,"果实尺寸",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"Mm",DEVICE_TYPE_NPARK,0));
	    	put(20, new DeviceMapBean(20,"茎秆尺寸",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"Mm",DEVICE_TYPE_NPARK,0));
	    	put(21, new DeviceMapBean(21,"氮元素含量",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"mg/m2",DEVICE_TYPE_NPARK,0));
	    	put(22, new DeviceMapBean(22,"磷元素含量",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"mg/m2",DEVICE_TYPE_NPARK,0));
	    	put(23, new DeviceMapBean(23,"钾元素含量",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"mg/m2",DEVICE_TYPE_NPARK,0));
	    	put(24, new DeviceMapBean(24,"土壤含盐量",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"Ppm",DEVICE_TYPE_NPARK,0));
	    	put(25, new DeviceMapBean(25,"土壤电导率",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"sam",DEVICE_TYPE_NPARK,0));
	    	//农业气象传感器
	    	put(8, 	new DeviceMapBean(8,"大气压",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"Pa",DEVICE_TYPE_PARK,0));
	    	put(9, 	new DeviceMapBean(9,"降雨量",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"Mm/min",DEVICE_TYPE_PARK,0));
	    	put(10, new DeviceMapBean(10,"风速",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"m/s",DEVICE_TYPE_PARK,0));
	    	put(11, new DeviceMapBean(11,"风向",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"",DEVICE_TYPE_PARK,0));
	    	put(12, new DeviceMapBean(12,"光照辐射",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"Lux",DEVICE_TYPE_PARK,0));
	    	put(13, new DeviceMapBean(13,"空气温度",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"℃",DEVICE_TYPE_PARK,0));
	    	put(14, new DeviceMapBean(14,"空气湿度",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"%",DEVICE_TYPE_PARK,0));
	    	put(15, new DeviceMapBean(15,"蒸发量",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"%",DEVICE_TYPE_PARK,0));
	    	put(16, new DeviceMapBean(16,"海拔高度",PACKAGE_TYPE_NY,DEVICE_TYPE_JT,"Km",DEVICE_TYPE_PARK,0));
	    	//渔业传感器
	    	put(31, new DeviceMapBean(31,"水温度",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"℃",DEVICE_TYPE_NPARK,0));
	    	put(32, new DeviceMapBean(32,"溶解氧",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"Mg/L",DEVICE_TYPE_NPARK,0));
	    	put(33, new DeviceMapBean(33,"水PH",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"PH",DEVICE_TYPE_NPARK,0));
	    	put(34, new DeviceMapBean(34,"氨氮含量",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"Mg/L",DEVICE_TYPE_NPARK,1));
	    	put(35, new DeviceMapBean(35,"蓝藻含量",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"Mg/L",DEVICE_TYPE_NPARK,0));
	    	put(36, new DeviceMapBean(36,"水浊度",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"NUT",DEVICE_TYPE_NPARK,0));
	    	put(37, new DeviceMapBean(37,"亚硝酸盐含量",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"Mg/L",DEVICE_TYPE_NPARK,1));
	    	put(38, new DeviceMapBean(38,"饲料剩余质量",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"Kg",DEVICE_TYPE_NPARK,0));
	    	put(39, new DeviceMapBean(39,"饲料投放量",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"KG",DEVICE_TYPE_NPARK,0));
	    	//渔业气象传感器
	    	put(40, new DeviceMapBean(40,"大气压",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"Pa",DEVICE_TYPE_PARK,0));
	    	put(41, new DeviceMapBean(41,"降雨量",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"Mm/min",DEVICE_TYPE_PARK,0));
	    	put(42, new DeviceMapBean(42,"风速",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"m/s",DEVICE_TYPE_PARK,0));
	    	put(43, new DeviceMapBean(43,"风向",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"",DEVICE_TYPE_PARK,0));
	    	put(44, new DeviceMapBean(44,"光照辐射",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"Lux",DEVICE_TYPE_PARK,0));
	    	put(45, new DeviceMapBean(45,"空气温度",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"℃",DEVICE_TYPE_PARK,0));
	    	put(46, new DeviceMapBean(46,"空气湿度",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"%",DEVICE_TYPE_PARK,0));
	    	put(47, new DeviceMapBean(47,"蒸发量",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"%",DEVICE_TYPE_PARK,0));
	    	put(48, new DeviceMapBean(48,"海拔高度",PACKAGE_TYPE_YY,DEVICE_TYPE_JT,"Km",DEVICE_TYPE_PARK,0));
	    	//仓库传感器
	    	put(100, new DeviceMapBean(100,"空气温度",PACKAGE_TYPE_CK,DEVICE_TYPE_JT,"℃",DEVICE_TYPE_NPARK,0));
	    	put(101, new DeviceMapBean(101,"空气湿度",PACKAGE_TYPE_CK,DEVICE_TYPE_JT,"℃",DEVICE_TYPE_NPARK,0));
	    	put(102, new DeviceMapBean(102,"CO2浓度",PACKAGE_TYPE_CK,DEVICE_TYPE_JT,"PPM",DEVICE_TYPE_NPARK,0));
	    	put(103, new DeviceMapBean(103,"CO浓度",PACKAGE_TYPE_CK,DEVICE_TYPE_JT,"PPM",DEVICE_TYPE_NPARK,0));
	    	//大田传感器
	    	put(200, new DeviceMapBean(200,"土壤温度",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"℃",DEVICE_TYPE_NPARK,0));
	    	put(201, new DeviceMapBean(201,"土壤湿度",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"℃",DEVICE_TYPE_NPARK,0));
	    	put(202, new DeviceMapBean(202,"土壤PH",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"PH",DEVICE_TYPE_NPARK,0));
	    	put(203, new DeviceMapBean(203,"土壤含盐量",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"Ppm",DEVICE_TYPE_NPARK,0));
	    	put(204, new DeviceMapBean(204,"土壤电导率",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"sam",DEVICE_TYPE_NPARK,0));
	    	put(205, new DeviceMapBean(205,"叶面温度",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"℃",DEVICE_TYPE_NPARK,0));
	    	put(206, new DeviceMapBean(206,"叶面湿度",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"%",DEVICE_TYPE_NPARK,0));
	    	put(207, new DeviceMapBean(207,"果实尺寸",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"Mm",DEVICE_TYPE_NPARK,0));
	    	put(208, new DeviceMapBean(208,"茎秆尺寸",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"Mm",DEVICE_TYPE_NPARK,0));
	    	put(218, new DeviceMapBean(218,"氮元素含量",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"mg/m2",DEVICE_TYPE_NPARK,0));
	    	put(219, new DeviceMapBean(218,"磷元素含量",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"mg/m2",DEVICE_TYPE_NPARK,0));
	    	put(220, new DeviceMapBean(218,"钾元素含量",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"mg/m2",DEVICE_TYPE_NPARK,0));
	    	//大田气象传感器
	    	put(209, new DeviceMapBean(209,"大气压",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"Pa",DEVICE_TYPE_PARK,0));
	    	put(210, new DeviceMapBean(210,"降雨量",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"Mm/min",DEVICE_TYPE_PARK,0));
	    	put(211, new DeviceMapBean(211,"风速",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"m/s",DEVICE_TYPE_PARK,0));
	    	put(212, new DeviceMapBean(212,"风向",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"",DEVICE_TYPE_PARK,0));
	    	put(213, new DeviceMapBean(213,"光照辐射",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"Lux",DEVICE_TYPE_PARK,0));
	    	put(214, new DeviceMapBean(214,"空气温度",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"℃",DEVICE_TYPE_PARK,0));
	    	put(215, new DeviceMapBean(215,"空气湿度",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"%",DEVICE_TYPE_PARK,0));
	    	put(216, new DeviceMapBean(216,"蒸发量",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"%",DEVICE_TYPE_PARK,0));
	    	put(217, new DeviceMapBean(217,"海拔高度",PACKAGE_TYPE_DT,DEVICE_TYPE_JT,"Km",DEVICE_TYPE_PARK,0));
	    	//大棚控制器
	    	put(61, new DeviceMapBean(61,"水阀",PACKAGE_TYPE_NY,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	put(62, new DeviceMapBean(62,"天窗",PACKAGE_TYPE_NY,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	put(63, new DeviceMapBean(63,"温度补偿器",PACKAGE_TYPE_NY,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	put(64, new DeviceMapBean(64,"CO2控制器",PACKAGE_TYPE_NY,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	put(65, new DeviceMapBean(65,"光照控制器",PACKAGE_TYPE_NY,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	put(66, new DeviceMapBean(66,"通风控制器",PACKAGE_TYPE_NY,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	//鱼池控制器
	    	put(71, new DeviceMapBean(71,"进口水阀",PACKAGE_TYPE_YY,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	put(72, new DeviceMapBean(72,"出口水阀",PACKAGE_TYPE_YY,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	put(73, new DeviceMapBean(73,"投食机",PACKAGE_TYPE_YY,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	put(74, new DeviceMapBean(74,"增氧机",PACKAGE_TYPE_YY,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	//大田控制器
	    	put(80, new DeviceMapBean(80,"主水阀",PACKAGE_TYPE_DT,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	put(81, new DeviceMapBean(81,"支水阀",PACKAGE_TYPE_DT,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	put(82, new DeviceMapBean(82,"分水阀",PACKAGE_TYPE_DT,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	put(83, new DeviceMapBean(83,"排水阀",PACKAGE_TYPE_DT,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	//仓库控制器
	    	put(84, new DeviceMapBean(84,"温控",PACKAGE_TYPE_CK,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	put(85, new DeviceMapBean(85,"通用1",PACKAGE_TYPE_CK,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	put(86, new DeviceMapBean(86,"通用2",PACKAGE_TYPE_CK,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	put(87, new DeviceMapBean(87,"通用3",PACKAGE_TYPE_CK,DEVICE_TYPE_DT,"",DEVICE_TYPE_NPARK,0));
	    	
	    }
	};
	
	public static void main(String[] args) {
		for (Map.Entry<Integer, DeviceMapBean> entry : DeviceConstant.DEVICE_DETAIL_INFO.entrySet()) { 
			Gson gson = new Gson();
			String str = gson.toJson(entry.getValue());
			RedisUtils.setMapKeyValue("DEVICE_INFO_MAP", entry.getKey()+"", str);
		}
	}
	
	
}
