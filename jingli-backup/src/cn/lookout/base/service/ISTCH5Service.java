package cn.lookout.base.service;

import java.util.Map;

import javax.servlet.http.HttpSession;

import cn.lookout.base.bean.Response;

/**
 * 静态资源类：h5页面相关
 * @author lxl
 *
 */
public interface ISTCH5Service {

	/**
	 * 查看档案
	 */
	public Response showArchive(Map map);
	
	/**
	 * 上传地理位置
	 */
	public Response updateArea(Map map);	
	
	/**
	 * 查询环境数据
	 */
	public Response queryEnvData(Map map);
	
	/**
	 * 查询条码存在
	 */
	public Response queryBarcode(Map map);
	
}
