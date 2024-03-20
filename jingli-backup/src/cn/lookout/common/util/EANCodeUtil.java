package cn.lookout.common.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.OutputStream;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.LuminanceSource;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.Result;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;

import cn.lookout.common.QiNiuUtil;

/**
 * 生成条形码
 * 
 * @author lxl
 *
 */
public class EANCodeUtil {

	public static void encode(String contents, int width, int height) {    
        int codeWidth = 3 + // start guard    
                (7 * 6) + // left bars    
                5 + // middle guard    
                (7 * 6) + // right bars    
                3; // end guard    
        codeWidth = Math.max(codeWidth, width);   
        
        try {    
            BitMatrix bitMatrix = new MultiFormatWriter().encode(contents,    
                    BarcodeFormat.CODE_128, codeWidth, height, null);    
//            Path path = new File("D://3.png").toPath();  
//            MatrixToImageWriter.writeToPath(bitMatrix, "png",path); 
            OutputStream os = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "png", os);
            ByteArrayOutputStream   baos=new   ByteArrayOutputStream();
            baos=(ByteArrayOutputStream) os;
            ByteArrayInputStream swapStream = new ByteArrayInputStream(baos.toByteArray());
            QiNiuUtil.getInstance().uploadFile(swapStream, "br_" + contents+".png");
    
        } catch (Exception e) {    
            e.printStackTrace();    
        }    
    }    
	
	
	
      
    public static String decode(String imgPath) {    
        BufferedImage image = null;    
        Result result = null;    
        try {    
            image = ImageIO.read(new File(imgPath));    
            if (image == null) {    
                System.out.println("the decode image may be not exit.");    
            }    
            LuminanceSource source = new BufferedImageLuminanceSource(image);    
            BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));    
    
            result = new MultiFormatReader().decode(bitmap, null);    
            return result.getText();    
        } catch (Exception e) {    
            e.printStackTrace();    
        }    
        return null;    
    }  
      
    /**  
     * @param args  
     */    
    public static void main(String[] args) {  
          
//    	String c = "2017122210205738";
//    	encode(c, 0, 40);  
//        String imgPath = "d:/123.jpg";    
//        String contents = "2017122109291111";    
//        int width = 200, height = 40;
//        encode(contents, width, height, null);  
          
//        String imgPath2 = "d:/123.jpg";    
//        String decodeContent = decode(imgPath2);    
//        System.out.println("解码内容如下：");    
//        System.out.println(decodeContent);    
    }  
}
