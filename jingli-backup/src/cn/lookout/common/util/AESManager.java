package cn.lookout.common.util;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class AESManager {

	public static String encryptData(String sSrc) {
		return encrypt(sSrc, DATA_KEY);
	}

	public static String decryptData(String password) {
		return decrypt(password, DATA_KEY);
	}

	// 加密
	private static String encrypt(String sSrc, String sKey) {
		byte[] encrypted = null;
		try {
			if (sKey == null) {
				System.out.print("Key为空null");
				return null;
			}
			// 判断Key是否为16位
			if (sKey.length() != 16) {
				System.out.print("Key长度不是16位");
				return null;
			}
			byte[] raw = sKey.getBytes();
			SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");// "算法/模式/补码方式"
			IvParameterSpec iv = new IvParameterSpec(PARAMS);// 使用CBC模式，需要一个向量iv，可增加加密算法的强度
			cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);
			encrypted = cipher.doFinal(sSrc.getBytes());
		} catch (Exception ex) {
			System.out.println(ex.toString());
			return null;
		}
		return new String(Base64.encode(encrypted));// 此处使用BAES64做转码功能，同时能起到2次加密的作用。
	}

	// 解密
	private static String decrypt(String sSrc, String sKey) {
		try {
			// 判断Key是否正确
			if (sKey == null) {
				System.out.print("Key为空null");
				return null;
			}
			// 判断Key是否为16位
			if (sKey.length() != 16) {
				System.out.print("Key长度不是16位");
				return null;
			}
			byte[] raw = sKey.getBytes("ASCII");
			SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			IvParameterSpec iv = new IvParameterSpec(PARAMS);
			cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);
			byte[] encrypted1 = Base64.decode(sSrc);// 先用bAES64解密
			try {
				byte[] original = cipher.doFinal(encrypted1);
				String originalString = new String(original, "UTF-8");
				return originalString;
			} catch (Exception e) {
				System.out.println(e.toString());
				return null;
			}
		} catch (Exception ex) {
			System.out.println(ex.toString());
			return null;
		}
	}

	private final static String DATA_KEY = "78@afog2d1x@#89o";
	private final static byte[] PARAMS = "0102030405060708".getBytes();

	public static void main(String[] args) {
		String s = "hello,你好";
		System.out.println(s);
		String en = AESManager.encryptData(s);
		System.out.println(en);
		String de = AESManager.decryptData(en);
		System.out.println(de);

	}

}
