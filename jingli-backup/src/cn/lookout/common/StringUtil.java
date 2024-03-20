package cn.lookout.common;

import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.Random;

public class StringUtil {
	
	public static boolean isEmpty(String str){
		boolean isEmpty = false;
		if(str == null){
			isEmpty = true;
		}else if("".equals(str)){
			isEmpty = true;
		}
		return isEmpty;
	}
	
	public static String getRandomStr(int count){
		StringBuffer sbf = new StringBuffer();
		Random random = new Random();
		for (int i = 0; i < count; i++) {
			int num = random.nextInt(10);
			sbf.append(num);
		}
		return sbf.toString();
	}
	
	public static String getCharAndNumr(int length) {
		String val = "";
		Random random = new Random();
		for (int i = 0; i < length; i++) {
			String charOrNum = random.nextInt(2) % 2 == 0 ? "char" : "num"; // 输出字母还是数字

			if ("char".equalsIgnoreCase(charOrNum)) // 字符串
			{
				int choice = random.nextInt(2) % 2 == 0 ? 65 : 97; // 取得大写字母还是小写字母
				val += (char) (choice + random.nextInt(26));
			} else if ("num".equalsIgnoreCase(charOrNum)) // 数字
			{
				val += String.valueOf(random.nextInt(10));
			}
		}

		return val.toUpperCase();
	}
	
	public static String getTodayWeek(){
		Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if(w == 0){
        	w=7;
        }
		return String.valueOf(w);
	}
	
}
