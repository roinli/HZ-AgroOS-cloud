/*
 *  Copyright (c) 2013 The CCP project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a Beijing Speedtong Information Technology Co.,Ltd license
 *  that can be found in the LICENSE file in the root of the web site.
 *
 *   http://www.cloopen.com
 *
 *  An additional intellectual property rights grant can be found
 *  in the file PATENTS.  All contributing project authors may
 *  be found in the AUTHORS file in the root of the source tree.
 */
package cn.lookout.common.sms.sdk.utils;
import java.util.Properties;

public class PropertiesUtil {
	
	
	public static Properties getPropertie(int level) {
			String loggerLever="all";
			if(level==1){
				loggerLever="info";
			}else if(level==2){
				loggerLever="warn";
			}else if(level==3){
				loggerLever="error";
			}else if(level==4){
				loggerLever="fatal";
			}
			Properties props = new Properties();
			
			props.setProperty("log4j.rootLogger", loggerLever+",A,R");
			props.setProperty("log4j.appender.A", "org.apache.log4j.ConsoleAppender");
			props.setProperty("log4j.appender.A.layout", "org.apache.log4j.PatternLayout");
			props.setProperty("log4j.appender.R", "org.apache.log4j.RollingFileAppender");
			props.setProperty("log4j.appender.R.File", "log.txt");
			props.setProperty("log4j.appender.R.MaxFileSize", "100KB");
			props.setProperty("log4j.appender.R.MaxBackupIndex", "1");
			props.setProperty("log4j.appender.R.layout", "org.apache.log4j.PatternLayout");
			props.setProperty("log4j.appender.R.layout.ConversionPattern", "%p %t %c - %m%n");
			
			return props;
	}
	
}
