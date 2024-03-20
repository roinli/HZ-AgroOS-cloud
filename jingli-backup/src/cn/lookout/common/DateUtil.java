package cn.lookout.common;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

/**
 * @Title: DateUtil.java
 * @Package com.yf.test
 * @Description: TODO
 * @author YangFei
 * @date 2012-6-5 03:58:17
 * @version V1.0
 */
public class DateUtil {
	public static void main(String[] a) {
		getFfffMmDdhms(new Date());
	}

	/**
	 * 格式化时间为 yyyy-MM-dd HH:mm:ss
	 * 
	 * @param date
	 * @return
	 */
	public static String getFfffMmDdhms(Date date) {
		SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		fmt.setTimeZone(TimeZone.getTimeZone("GMT+8"));
		if(date==null){
			return "";
		}
		return fmt.format(date);
	}
	/**
	 * 格式化时间为 yyyy-MM-dd
	 * 
	 * @param date
	 * @return
	 */
	public static String getFFFFMMDD(Date date) {
		SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
		if(date==null){
			return "";
		}
		return fmt.format(date);
	}
	/**
	 * 格式化时间为 yyyy年MM月dd日
	 * 
	 * @param date
	 * @return
	 */
	public static String getFfffMmDd(Date date) {
		SimpleDateFormat fmt = new SimpleDateFormat("yyyy年MM月dd日");
		if(date==null){
			return "";
		}
		return fmt.format(date);
	}
	/**
	 * 获取某日期年份
	 * 
	 * @return
	 */
	public static int getYear(Date date) {
		java.util.Calendar c = java.util.Calendar.getInstance();
        c.setTime(date);
        return c.get(java.util.Calendar.YEAR);
	}
	/**
	 * 获取某日期月份
	 * 
	 * @return
	 */
	public static int getMonth(Date date) {
		java.util.Calendar c = java.util.Calendar.getInstance();
        c.setTime(date);
        return c.get(java.util.Calendar.MONTH)+1;
	}
	/**
	 * 获取某日期日份
	 * 
	 * @return
	 */
	public static int getDay(Date date) {
		java.util.Calendar c = java.util.Calendar.getInstance();
        c.setTime(date);
        return c.get(java.util.Calendar.DATE);
	}
	public  String getRandomString(int length) { //length表示生成字符串的长度
		 int num = 1;
         double random = Math.random();
         if (random < 0.1) {
              random = random + 0.1;
         } for (int i = 0; i < length; i++) {
              num = num * 10;
         }
         return (int) ((random * num))+"";
	 }   	
	
}
