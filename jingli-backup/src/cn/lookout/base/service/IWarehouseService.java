package cn.lookout.base.service;

import java.util.Map;

import javax.servlet.http.HttpSession;

import cn.lookout.base.bean.Response;

public interface IWarehouseService {
	
	public Response getMenuByUser(Map requestMap);
	
	/**
	 * 仓库管理list
	 */
	public Response getWareHouseManage(Map requestMap);
	/**
	 * 仓库管理count
	 */
	public Response getWareHouseManageCount(Map requestMap);
	
	/**
	 * 仓库管理add
	 */
	public Response insertWareHouseAdd(Map requestMap);
	
	/**
	 * 仓库管理delete
	 */
	public Response deleteWareHouse(Map requestMap);
	/**
	 * 查下仓库管理详情ByID
	 */
	public Response queryWareHouseById(Map requestMap);
	
	
	/**
	 * @Description 仓库更新
	 * @param requestMap
	 * @return
	 * @author  liwenhui
	 * @Date    2018-8-9  下午4:51:43
	 */
	public Response updateWareHouse(Map requestMap);
	
	
	// ==============前端==============
	/**
	 * @Description 查下仓库下拉框
	 * @param requestMap
	 * @return
	 * @author  liwenhui
	 * @Date    2018-8-9  下午4:51:43
	 */
	public Response frontWareHouseList(Map requestMap);
	
	/**
	 * 库存管理list
	 */
	public Response getInventoryManage(Map requestMap);
	/**
	 * 库存管理count
	 */
	public Response getInventoryCount(Map requestMap);
	/**
	 * 入库insertWarehousing
	 */
	public Response insertWarehousing(Map requestMap);
	
	/**
	 * @Description 获取仓库类型
	 * @param requestMap
	 * @return 
	 * @author  DELL
	 * @Date    2018-8-13  下午12:32:51
	 */
	public Response getInventoryType(Map requestMap); 
	/**
	 * @Description 出库
	 * @param requestMap
	 * @return
	 * @author  liwenhui
	 * @Date    2018-8-13  下午1:58:38
	 */
	public Response updatePlacing(Map requestMap); 
	
	/**
	 * @Description 14.查看-产品信息
	 * @param requestMap
	 * @return
	 * @author  liwenhui
	 * @Date    2018-8-13  下午5:03:07
	 */
	public Response getViewProInfo(Map requestMap);
	
	/**
	 * @Description 15.查看-出库记录
	 * @param requestMap
	 * @return
	 * @author  liwenhui
	 * @Date    2018-8-13  下午7:35:37
	 */
	public Response getViewOutgoingRecords(Map requestMap);
	
	/**
	 * @Description 入库列表
	 * @param requestMap
	 * @return
	 * @author  liwenhui
	 * @Date    2018-8-23  下午4:56:16
	 */
	public Response insertWarehousesList(Map requestMap);
	
	/**
	 * @Description 出入库列表条数
	 * @param requestMap
	 * @return
	 * @author  chenhewen
	 * @Date    2018-9-6  上午 01:41:10
	 */
	public Response insertWarehousesCount(Map requestMap);
}

