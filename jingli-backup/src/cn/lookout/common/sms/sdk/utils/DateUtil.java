/*
 *  Copyright (c) 2014 The CCP project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a Beijing Speedtong Information Technology Co.,Ltd license
 *  that can be found in the LICENSE file in the root of the web site.
 *
 *   http://www.yuntongxun.com
 *
 *  An additional intellectual property rights grant can be found
 *  in the file PATENTS.  All contributing project authors may
 *  be found in the AUTHORS file in the root of the source tree.
 */
package cn.lookout.common.sms.sdk.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil
{
  public static final int DEFAULT = 0;
  public static final int YM = 1;
  public static final int YMR_SLASH = 11;
  public static final int NO_SLASH = 2;
  public static final int YM_NO_SLASH = 3;
  public static final int DATE_TIME = 4;
  public static final int DATE_TIME_NO_SLASH = 5;
  public static final int DATE_HM = 6;
  public static final int TIME = 7;
  public static final int HM = 8;
  public static final int LONG_TIME = 9;
  public static final int SHORT_TIME = 10;
  public static final int DATE_TIME_LINE = 12;

  public static String dateToStr(Date date, String pattern)
  {
    if ((date == null) || (date.equals("")))
      return null;
    SimpleDateFormat formatter = new SimpleDateFormat(pattern);
    return formatter.format(date);
  }

  public static String dateToStr(Date date) {
    return dateToStr(date, "yyyy/MM/dd");
  }

  public static String dateToStr(Date date, int type) {
    switch (type)
    {
    case 0:
      return dateToStr(date);
    case 1:
      return dateToStr(date, "yyyy/MM");
    case 2:
      return dateToStr(date, "yyyyMMdd");
    case 11:
      return dateToStr(date, "yyyy-MM-dd");
    case 3:
      return dateToStr(date, "yyyyMM");
    case 4:
      return dateToStr(date, "yyyy/MM/dd HH:mm:ss");
    case 5:
      return dateToStr(date, "yyyyMMddHHmmss");
    case 6:
      return dateToStr(date, "yyyy/MM/dd HH:mm");
    case 7:
      return dateToStr(date, "HH:mm:ss");
    case 8:
      return dateToStr(date, "HH:mm");
    case 9:
      return dateToStr(date, "HHmmss");
    case 10:
      return dateToStr(date, "HHmm");
    case 12:
      return dateToStr(date, "yyyy-MM-dd HH:mm:ss");
    }
    throw new IllegalArgumentException("Type undefined : " + type);
  }
}