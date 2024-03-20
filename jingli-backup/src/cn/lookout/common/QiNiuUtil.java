package cn.lookout.common;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.BatchStatus;
import com.qiniu.util.Auth;

import cn.lookout.common.SystemConfig;

public class QiNiuUtil {

	private final static String ACCESSKEY = SystemConfig.qiniu_access_key;
	private final static String SECRETKEY = SystemConfig.qiniu_secret_key;
	private final static String BUCKET = SystemConfig.qiniu_bucket;
	
	private QiNiuUtil(){}
	
	private static final QiNiuUtil qiNiuUtil = new QiNiuUtil();
	
	public static QiNiuUtil getInstance(){
		return qiNiuUtil;
	}
	
	
	public int uploadFile(Object obj,String fileName){
		
		//构造一个带指定Zone对象的配置类
		Configuration cfg = new Configuration(Zone.zone0());
		//...其他参数参考类注释
		UploadManager uploadManager = new UploadManager(cfg);
		//...生成上传凭证，然后准备上传
//		String key = UUID.randomUUID().toString()+".png";
		Auth auth = Auth.create(ACCESSKEY, SECRETKEY);
		String upToken = auth.uploadToken(BUCKET);
		try {
			Response response = null;
			if(obj instanceof File){
				response = uploadManager.put((File)obj, fileName, upToken);
			}else if(obj instanceof String){
				response = uploadManager.put((String)obj, fileName, upToken);
			}else if(obj instanceof InputStream){
				InputStream inStream = (InputStream)obj;
				ByteArrayOutputStream swapStream = new ByteArrayOutputStream(); 
				byte[] buff = new byte[100]; //buff用于存放循环读取的临时数据 
				int rc = 0; 
				while ((rc = inStream.read(buff, 0, 100)) > 0) { 
					swapStream.write(buff, 0, rc); 
				} 
				byte[] imgByte = swapStream.toByteArray(); //in_b为转换之后的结果 
				response = uploadManager.put(imgByte, fileName, upToken);
			}else if(obj instanceof byte[]){
				byte[] b = (byte[]) obj;
				response = uploadManager.put(b, fileName, upToken);
			}else{
				return -1;
			}
			
		    //解析上传成功的结果
		    if(response.statusCode == 200){
		    	System.out.println("upload success");
		    	return 1;
		    }else{
		    	System.out.println("upload filed");
		    	return 0;
		    }
		} catch (QiniuException ex) {
		    Response r = ex.response;
		    System.err.println(r.toString());
		    try {
		        System.err.println(r.bodyString());
		    } catch (QiniuException ex2) {
		        //ignore
		    }
		    return 0;
		} catch (Exception e) {
			System.err.println("上传失败");
			return 0;
		}
	}
	
	public void delFiles(String[] fileNames){
		
		//构造一个带指定Zone对象的配置类
		Configuration cfg = new Configuration(Zone.zone0());
		//...其他参数参考类注释
		Auth auth = Auth.create(ACCESSKEY, SECRETKEY);
		BucketManager bucketManager = new BucketManager(auth, cfg);
		try {
		    //单次批量请求的文件数量不得超过1000
		    BucketManager.BatchOperations batchOperations = new BucketManager.BatchOperations();
		    batchOperations.addDeleteOp(BUCKET, fileNames);
		    Response response = bucketManager.batch(batchOperations);
		    BatchStatus[] batchStatusList = response.jsonToObject(BatchStatus[].class);
		    for (int i = 0; i < fileNames.length; i++) {
		        BatchStatus status = batchStatusList[i];
		        String key = fileNames[i];
		        System.out.print(key + "\t");
		        if (status.code == 200) {
		            System.out.println("delete success");
		        } else {
		            System.out.println(status.data.error);
		        }
		    }
		} catch (QiniuException ex) {
		    System.err.println(ex.response.toString());
		}
		
	}
	
	public static void main(String[] args) throws Exception {
		
		File file = new File("D:\\test.png");
		InputStream in = new FileInputStream(file);
		int i = QiNiuUtil.getInstance().uploadFile(in,"123.png");
	}
		
}
