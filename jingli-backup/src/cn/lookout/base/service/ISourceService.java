package cn.lookout.base.service;

import java.util.Map;

import javax.servlet.http.HttpSession;

import cn.lookout.base.bean.Response;

/**
 * 溯源相关
 * @author lxl
 *
 */
public interface ISourceService {

	/**
	 * 查询某公司下所有大棚/鱼塘
	 * @param map
	 * @param session
	 * @return
	 */
	public Response groundTree(Map map);
	
	/**
	 * 增加产品
	 * @param map
	 * @param session
	 * @return
	 */
	public Response addProduct(Map map);
	
	/**
	 * 删除某个产品
	 * @param map
	 * @param session
	 * @return
	 */
	public Response deleteProduct(Map map);
	
	/**
	 * 查询某公司下所有产品
	 * @param map
	 * @param session
	 * @return
	 */
	public Response queryProducts(Map map);
	
	/**
	 * 查询某公司下所有产品，总记录数
	 * @param map
	 * @param session
	 * @return
	 */
	public Response queryProductsCount(Map map);
	
	/**
	 * 增加批次
	 * @param map
	 * @param session
	 * @return
	 */
	public Response addBatch(Map map);
	
	/**
	 * 删除批次
	 * @param map
	 * @param session
	 * @return
	 */
	public Response deleteBatch(Map map);
	
	/**
	 * 修改批次
	 * @param map
	 * @param session
	 * @return
	 */
	public Response updateBatch(Map map);
	
	/**
	 * 查询批次
	 * @param map
	 * @param session
	 * @return
	 */
	public Response queryBatch(Map map);
	
	/**
	 * 查询单个批次信息
	 */
	public Response getBatchById(Map map);
	
	/**
	 * 上架
	 * @param map
	 * @param session
	 * @return
	 */
	public Response shelves(Map map);
	
	/**
	 * 上架
	 * @param map
	 * @param session
	 * @return
	 */
	public Response offShelf(Map map);
	
	/**
	 * 归档
	 * @param map
	 * @param session
	 * @return
	 */
	public Response archive(Map map);
	
	/**
	 * 根据id查询某个产品
	 * @param map
	 * @param session
	 * @return
	 */
	public Response queryProduct(Map map);
	
	/**
	 * 维护档案
	 * @param map
	 * @param session
	 * @return
	 */
	public Response updateArchive(Map map);
	
	/**
	 * 渔业维护档案
	 */
	public Response updateFishArchive(Map map);
	
	/**
	 * 扫码统计
	 */
	public Response scanCount(Map map );
	
	/**
	 * 扫码区域
	 */
	public Response scanArea(Map map);
	
	
}
