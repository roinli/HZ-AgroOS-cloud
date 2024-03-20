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

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import cn.lookout.common.sms.sdk.utils.encoder.BASE64Decoder;
import cn.lookout.common.sms.sdk.utils.encoder.BASE64Encoder;


public class EncryptUtil
{
  private static final String UTF8 = "utf-8";

  public String md5Digest(String src) throws NoSuchAlgorithmException, UnsupportedEncodingException
  {
    MessageDigest md = MessageDigest.getInstance("MD5");
    byte[] b = md.digest(src.getBytes("utf-8"));
    return byte2HexStr(b);
  }

  public String base64Encoder(String src) throws UnsupportedEncodingException
  {
    BASE64Encoder encoder = new BASE64Encoder();
    return encoder.encode(src.getBytes("utf-8"));
  }

  public String base64Decoder(String dest)
    throws NoSuchAlgorithmException, IOException
  {
    BASE64Decoder decoder = new BASE64Decoder();
    return new String(decoder.decodeBuffer(dest), "utf-8");
  }

  private String byte2HexStr(byte[] b)
  {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < b.length; ++i) {
      String s = Integer.toHexString(b[i] & 0xFF);
      if (s.length() == 1)
        sb.append("0");

      sb.append(s.toUpperCase());
    }
    return sb.toString();
  }
}