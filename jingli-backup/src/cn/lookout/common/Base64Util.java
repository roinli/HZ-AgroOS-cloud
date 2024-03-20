package cn.lookout.common;

import java.io.UnsupportedEncodingException;

import cn.lookout.common.sms.sdk.utils.encoder.BASE64Decoder;
import cn.lookout.common.sms.sdk.utils.encoder.BASE64Encoder;

public class Base64Util {

	// 加密  
    public static String getBase64(String str) {  
        byte[] b = null;  
        String s = null;  
        try {  
            b = str.getBytes("utf-8");  
        } catch (UnsupportedEncodingException e) {  
            e.printStackTrace();  
        }  
        if (b != null) {  
            s = new BASE64Encoder().encode(b);  
        }  
        return s;  
    }  
  
    // 解密  
    public static byte[] getFromBase64(String s) {  
        byte[] b = null;  
        if (s != null) {  
            BASE64Decoder decoder = new BASE64Decoder();  
            try {  
                b = decoder.decodeBuffer(s);  
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
        }  
        return b;  
    }  
    
}
