package cn.lookout.common;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class SystemConfig  implements ServletContextListener{

	private final static Log log = LogFactory.getLog(SystemConfig.class);

	/**七牛*/
	public static String qiniu_access_key;
	public static String qiniu_secret_key;
	public static String qiniu_bucket;
	public static String qiniu_url;

	//	/**控制端Url*/
//	public static String app_url;
	//h5地址
	public static String h5_page_url;
	public static String h5_fish_url;
	public static String h5_datian_url;

	/**
	 * 极光推送
	 */
	public static String push_master_secret;
	public static String push_app_key;

	/** 断线检测频率（单位：毫秒）*/
	public static Long INTERVAL_OFFLINE;
	/** 发送设备任务检测频率（单位：毫秒）*/
	public static Long INTERVAL_SEND_TASK;
	/** 接收设备数据频率（单位：毫秒）*/
	public static Long INTERVAL_SAVE_DATA;
	/** 设备多长时间判断为断线（单位：毫秒）*/
	public static Long DEVICE_OFFLINE_TIME;
	/** 心知天气 */
	public static String WEATHER_URL;

	static {

		Properties properties = new Properties();

		try {
			InputStream inputStream =SystemConfig.class.getResourceAsStream("/resources.properties");
			properties.load(inputStream);

			//七牛
			qiniu_access_key = properties.getProperty("qiniu_access_key");
			qiniu_secret_key = properties.getProperty("qiniu_secret_key");
			qiniu_bucket = properties.getProperty("qiniu_bucket");
			qiniu_url = properties.getProperty("qiniu_url");

//			app_url = properties.getProperty("app_url");
			h5_page_url = properties.getProperty("h5_page_url");
			h5_fish_url = properties.getProperty("h5_fish_url");
			h5_datian_url = properties.getProperty("h5_datian_url");

			//极光推送
			push_master_secret = properties.getProperty("push_master_secret");
			push_app_key = properties.getProperty("push_app_key");

			//心知天气
			WEATHER_URL = properties.getProperty("weather_url");

			try{
				INTERVAL_OFFLINE = Long.parseLong(properties.getProperty("interval_offline"));
				INTERVAL_SEND_TASK = Long.parseLong(properties.getProperty("interval_send_task"));
				INTERVAL_SAVE_DATA = Long.parseLong(properties.getProperty("interval_save_data"));
				DEVICE_OFFLINE_TIME = Long.parseLong(properties.getProperty("device_offline_time"));
			} catch (Exception e) {
				INTERVAL_OFFLINE = 5000L;
				INTERVAL_SEND_TASK = 1000L;
				INTERVAL_SAVE_DATA = 1000L;
				DEVICE_OFFLINE_TIME = 3600000L;
			}
		} catch (IOException e) {
			log.error("初始化系统参数错误:" + e.getMessage());
			log.error(SystemConfig.class, e);
		}
	}
	public void contextDestroyed(ServletContextEvent sce) {
		// TODO Auto-generated method stub

	}
	public void contextInitialized(ServletContextEvent sce) {

	}
}
