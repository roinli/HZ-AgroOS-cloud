package cn.lookout.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

public class FileUtil {

	public static byte[] getBytesFromFile(File file) throws IOException {
		InputStream is = new FileInputStream(file); // 获得文件尺寸
		long length = file.length(); // 不能使用类型为long的数组
		// 需要为int型
		// 在转换成一个int型前必须确保文件尺寸大于 Integer.MAX_VALUE.
		if (length > Integer.MAX_VALUE) { // 文件尺寸若太大
			// 创建字节数组保存数据
		}
		byte[] bytes = new byte[(int) length]; // 读取字节
		int offset = 0;
		int numRead = 0;
		while (offset < bytes.length
				&& (numRead = is.read(bytes, offset, bytes.length - offset)) >= 0) {
			offset += numRead;
		}
		// 确保所有字节被读取
		if (offset < bytes.length) {
			throw new IOException("Could not completely read file "
					+ file.getName());
		} // 关闭输入流，返回字节
		is.close();
		return bytes;
	}
	
	public static byte[] getBytesFromInputStream(InputStream is) throws IOException {
		long length = is.available(); // 不能使用类型为long的数组
		// 需要为int型
		// 在转换成一个int型前必须确保文件尺寸大于 Integer.MAX_VALUE.
		if (length > Integer.MAX_VALUE) { // 文件尺寸若太大
			// 创建字节数组保存数据
		}
		byte[] bytes = new byte[(int) length]; // 读取字节
		int offset = 0;
		int numRead = 0;
		while (offset < bytes.length
				&& (numRead = is.read(bytes, offset, bytes.length - offset)) >= 0) {
			offset += numRead;
		}
		// 确保所有字节被读取
		if (offset < bytes.length) {
			throw new IOException();
		} // 关闭输入流，返回字节
		is.close();
		return bytes;
	}

	
	public static String getRandomFileName(String fileExt){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		String time = sdf.format(new Date());
		if(StringUtil.isEmpty(fileExt)){
			return "";
		}
		String randomStr = time+"_"+StringUtil.getRandomStr(8)+"."+fileExt.replace(".", "");
		return randomStr;
	}
	
	public static String uploadBase64Img(String icon){
		String iconUrl = "";
		String suffix = ".png";
		if(!StringUtil.isEmpty(icon)){
			if(icon.startsWith("http")){
				iconUrl = icon.replace(SystemConfig.qiniu_url + "/", "");
			}else{
				if(icon.startsWith("data:image/png;base64,")){
					icon = icon.replace("data:image/png;base64,", "").trim();
					suffix = ".png";
				}else if(icon.startsWith("data:image/jpeg;base64,")){
					icon = icon.replace("data:image/jpeg;base64,", "").trim();
					suffix = ".jpeg";
				}else if(icon.startsWith("data:image/jpg;base64,")){
					icon = icon.replace("data:image/jpg;base64,", "").trim();
					suffix = ".jpg";
				}
				byte[] b =  Base64Util.getFromBase64(icon);
				iconUrl = FileUtil.getRandomFileName(suffix); // 七牛云fileName
				QiNiuUtil.getInstance().uploadFile(b, iconUrl); // 上传图片
				String downUrl = SystemConfig.qiniu_url + "/" + iconUrl; // 下载图片的地址 
				System.out.println(downUrl);
			}
		}
		return iconUrl;
	}
}
