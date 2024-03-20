package cn.lookout.common;

import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import cn.lookout.base.service.INettyDeviceService;

public class WebStartUtil implements ServletContextListener {

	public static INettyDeviceService nettyDeviceService;
	
	public static final Logger logger = Logger.getLogger(WebStartUtil.class);	
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		WebApplicationContext springContext = WebApplicationContextUtils.getWebApplicationContext(arg0.getServletContext());
		if(springContext != null){
			nettyDeviceService = (INettyDeviceService) springContext.getBean("nettyDeviceService");
		}else{
			return;
		}
		
		threadRefreshTaskListEveryDay();//每日定时刷新当天任务
		threadGetWeatherEveryDay();//每日定时获取天气情况
		threadOfflineCheck();//检测断线设备线程
		threadSendTask();//检测设备任务线程
		threadSaveData();//检测设备数据线程
	}
	
	public static void threadRefreshTaskListEveryDay() {
        Calendar calendar = Calendar.getInstance();  
        calendar.set(Calendar.HOUR_OF_DAY, 0); // 控制时  
        calendar.set(Calendar.MINUTE, 0);       // 控制分  
        calendar.set(Calendar.SECOND, 0);       // 控制秒  
  
        Date time = calendar.getTime();         // 得出执行任务的时间,此处为今天的12：00：00  
        if (time.before(new Date())) {
        	time = addDay(time, 1);
        }
        Timer timer = new Timer();  
        timer.scheduleAtFixedRate(new TimerTask() {
            public void run() {  
            	try {
            		logger.info("============定时刷新任务============");
            		nettyDeviceService.saveDeviceTimeSchedule();
				} catch (Exception e) {
					e.printStackTrace();
				}
            }  
        }, time, 1000 * 60 * 60 * 24);// 这里设定将延时每天固定执行  
    }  
	
	public static void threadGetWeatherEveryDay() {
        Calendar calendar = Calendar.getInstance();  
        calendar.set(Calendar.HOUR_OF_DAY, 7); // 控制时  
        calendar.set(Calendar.MINUTE, 0);       // 控制分  
        calendar.set(Calendar.SECOND, 0);       // 控制秒  
  
        Date time = calendar.getTime(); 
        
        if (time.before(new Date())) {
        	time = addDay(time, 1);
        }
  
        Timer timer = new Timer();  
        timer.scheduleAtFixedRate(new TimerTask() {  
            public void run() {  
            	try {
            		logger.info("============定时获取天气状况============");
            		nettyDeviceService.getWeather();
				} catch (Exception e) {
					e.printStackTrace();
				}
            }  
        }, time, 1000 * 60 * 60 * 24);// 这里设定将延时每天固定执行  
    }  
	
	
	/**
	 * 线程：断线检测
	 */
	public static void threadOfflineCheck(){
		new Thread(new Runnable() {
			@Override
			public void run() {
				while(true){
					try {
						Set<String> redisKeys = RedisUtils.getKeys("DH&");
						if(redisKeys != null){
							for (String redisKey : redisKeys) {
								Map map = RedisUtils.getMap(redisKey);
								Iterator it = map.entrySet().iterator();
								while(it.hasNext()){
							      Entry entry = (Entry)it.next();
							      String key = (String) entry.getKey();
							      String value = (String) entry.getValue();
							      if(value!=null && !"".equals(value)){
							    	  String values[] = value.split("&");
							    	  if(values.length == 2 && !"2".equals(values[0])){
							    		  Long time = Long.parseLong(values[1]);
							    		  if(System.currentTimeMillis() - time 
							    				  > SystemConfig.DEVICE_OFFLINE_TIME){
							    			  //一小时未接收到数据
							    			  String msg = "OOF&" + redisKey + "&" + key;
							    			  nettyDeviceService.updateDeviceOffline(msg);
//							    			  RedisUtils.addList("NETTY_NOTICE", msg);
							    		  }
							    	  }
							      }
							      
								}
							}
						}
						Thread.sleep(SystemConfig.INTERVAL_OFFLINE);
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
		}).start();
	}
	
	public static void threadSendTask() {  
		//任务发送
		new Thread(new Runnable() {
			@Override
			public void run() {
				// TODO Auto-generated method stub
				while(true){
					try {
						nettyDeviceService.sendDeviceTimeTask();
						Thread.sleep(SystemConfig.INTERVAL_SEND_TASK);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}).start();
	}
	
	public static void threadSaveData() {  
		//保存数据
		new Thread(new Runnable() {
			@Override
			public void run() {
				// TODO Auto-generated method stub
				while(true){
					try {
						nettyDeviceService.getDevicePushMsg();
						Thread.sleep(SystemConfig.INTERVAL_SAVE_DATA);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}).start();
	}
	
	// 增加或减少天数
	public static Date addDay(Date date, int num) {
		Calendar startDT = Calendar.getInstance();
		startDT.setTime(date);
		startDT.add(Calendar.DAY_OF_MONTH, num);
		return startDT.getTime();
	}

}
