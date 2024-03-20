package cn.lookout.common.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.DecodeHintType;
import com.google.zxing.EncodeHintType;
import com.google.zxing.LuminanceSource;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.Result;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import cn.lookout.common.QiNiuUtil;

public class QRCodeUtil {
	
	private static final int BLACK = 0xFF000000;

	private static final int WHITE = 0xFFFFFFFF;
	   
	/**  
     * 编码  
     * @param contents  
     * @param width  
     * @param height  
     * @param imgPath  
     */  
    public static void encode(String contents, int width, int height , String imgName) {    
        Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();    
        // 指定纠错等级    
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);    
        // 指定编码格式    
        hints.put(EncodeHintType.CHARACTER_SET, "utf-8");    
        hints.put(EncodeHintType.MARGIN, "0");    
        try {    
            BitMatrix bitMatrix = new MultiFormatWriter().encode(contents,    
                    BarcodeFormat.QR_CODE, width, height, hints);    
            BufferedImage image = toBufferedImage(bitMatrix);
            ByteArrayOutputStream   baos=new   ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);
            ByteArrayInputStream swapStream = new ByteArrayInputStream(baos.toByteArray());
            QiNiuUtil.getInstance().uploadFile(swapStream, "qr_" + imgName+".png");
        } catch (Exception e) {    
            e.printStackTrace();    
        }  
    }  
    
    public static BufferedImage toBufferedImage(BitMatrix matrix) {

        int width = matrix.getWidth();

        int height = matrix.getHeight();

        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

        for (int x = 0; x < width; x++) {

          for (int y = 0; y < height; y++) {

            image.setRGB(x, y, matrix.get(x, y) ? BLACK : WHITE);

          }

        }

        return image;

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
    
            Map<DecodeHintType, Object> hints = new HashMap<DecodeHintType, Object>();   
            hints.put(DecodeHintType.CHARACTER_SET, "utf-8");    
    
            result = new MultiFormatReader().decode(bitmap, hints);    
            return result.getText();    
        } catch (Exception e) {    
            e.printStackTrace();    
        }    
        return null;    
    }  
      
    /**  O
     * @param args  
     */    
    public static void main(String[] args) {    
//        String imgPath = "d:/michael_zxing.png";    
//        String contents = "http://www.nxptdn.com/staticServlet?actionName=STCH5Service&method=toArchivePage&barcode=2018013019318600";  
//        int width = 300, height = 300;    
//        encode(contents, width, height, "test2");  
//    	encode(contents, 110,110);  
//        String imgPath2 = "d:/1.png";    
//        String decodeContent = decode(imgPath2);    
//        System.out.println("解码内容如下：");    
//        System.out.println(decodeContent);    
    }  
}
