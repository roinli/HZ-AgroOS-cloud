package cn.lookout.base.service.impl;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import cn.lookout.base.bean.DeviceRelationBean;
import cn.lookout.base.bean.Inventory;
import cn.lookout.base.bean.MenuBean;
import cn.lookout.base.bean.MenuChildBean;
import cn.lookout.base.bean.Response;
import cn.lookout.base.bean.WarehouseGroundFishpond;
import cn.lookout.base.bean.inventory.InventoryType;
import cn.lookout.base.dao.IBaseDao;
import cn.lookout.base.service.IWarehouseService;
import cn.lookout.common.RedisUtils;
import cn.lookout.common.StringUtil;

public class WarehouseServiceImpl implements IWarehouseService {
	
	private IBaseDao baseDao;

	public IBaseDao getBaseDao() {
		return baseDao;
	}

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}

	
	/**
	 * 获取用户菜单(根据用户角色查询)
	 */
	@Override
	public Response getMenuByUser(Map requestMap) {
		Response response = new Response();
		String userType = (String) requestMap.get("userType");
		if(StringUtil.isEmpty(userType)){
			response.setStatusCode(-400);
			response.setMessage("未传入用户权限");
			return response;
		}
		String menuJson = (String) RedisUtils.getMap("SYSTEM_MENU",userType);
		List<MenuBean> parents = new ArrayList<>();
		if(!StringUtil.isEmpty(menuJson)){
			try {
				parents = JSONArray.parseArray(menuJson , MenuBean.class);
			} catch (Exception e) {
				e.printStackTrace();
				parents = new ArrayList<>();
			}
		}
		if(parents == null || parents.size() == 0){
			parents = (List<MenuBean>) baseDao.queryForList("getParentMenuByUserId", requestMap);
			List<MenuChildBean> childs = (List<MenuChildBean>) baseDao.queryForList("getChildMenuByUserId", requestMap);
			for (MenuBean parent : parents) {
				List<MenuChildBean> ch = new ArrayList<>();
				for (MenuChildBean child : childs) {
					if(parent.getMenuFlag().equals(child.getParent())){
						ch.add(child);
					}
				}
				parent.setChildList(ch);
			}
			if(parents != null && parents.size() > 0){
				RedisUtils.setMapKeyValue("SYSTEM_MENU",userType, JSONObject.toJSONString(parents));
			}
		}
		
		response.setStatusCode(1);
		response.setMessage("获取成功");
		response.setResult(parents);
		return response;
	}

	
	
	/**
	 * <p>Title: getWareHouseManage</p>
	 * @Description 仓库管理list
	 * @param requestMap：companyId  type
	 * @return 
	 */
	public Response getWareHouseManage(Map requestMap) {
		Response response = new Response();
		List<WarehouseGroundFishpond> wgfList = (List<WarehouseGroundFishpond>) baseDao.queryForList("warehouse.getWareHouseManage",requestMap);
		response.setStatusCode(1);
		response.setMessage("仓库获取成功");
		response.setResult(wgfList);
		return response;
	}

	/**
	 * <p>Title: getWareHouseManageCount</p>
	 * @Description 仓库管理count
	 * @param requestMap：companyId  type
	 * @return 
	 */
	public Response getWareHouseManageCount(Map requestMap) {
		Response response = new Response();
		String wgfCount = (String) baseDao.queryForObject("warehouse.getWareHouseManageCount", requestMap);
		response.setStatusCode(1);
		response.setMessage("仓库Count获取成功");
		response.setResult(wgfCount);
		return response;
	}

	/**
	 * <p>Title: wareHouseAdd</p>
	 * @Description 仓库管理add
	 * @param requestMap
	 * @return
	 */
	@Override
	public Response insertWareHouseAdd(Map map) {
		Response response = new Response();
		String num = (String) map.get("number");
		// 判断是否已经存在 公司ID&组织ID
		String cgfnCount = (String) baseDao.queryForObject("permission.queryWareHouseByCgfn", map);
		// 如果不存在 公司ID&组织ID 
		if(Integer.parseInt(cgfnCount) == 0){
			String userType = "3";// 仓库默认就是3
			baseDao.insert("permission.saveCKGroundFishpond", map);
			String companyId = (String) map.get("companyId");
			
			//保存非园区的设备关联（每个组织下都有着不同的设备，所以需要双层循环）
			map.put("parkDevice", "0");
			List<String> deviceIds = (List<String>) baseDao.queryForList("permission.getDeviceIds", map);
			List<DeviceRelationBean> drList = new ArrayList<>();
			for (String deviceId : deviceIds) {
				String gftNum = num;
				String flag = companyId+"&"+gftNum+"&"+deviceId;
				DeviceRelationBean bean = new DeviceRelationBean();
				bean.setCompanyId(companyId+"");
				bean.setDeivceId(deviceId);
				bean.setNum(gftNum +"");
				bean.setFlag(flag);
				bean.setDeviceType(userType);
				drList.add(bean);
			}
			//保存园区的设备关联（因为园区只有一个，所以仅循环园区设备列表即可）
			map.put("parkDevice", "1");
			List<String> parkDeviceIds = (List<String>) baseDao.queryForList("permission.getDeviceIds", map);
			for (String parkDeviceId : parkDeviceIds) {
				String flag = companyId+"&"+0+"&"+parkDeviceId;
				DeviceRelationBean bean = new DeviceRelationBean();
				bean.setCompanyId(companyId+"");
				bean.setDeivceId(parkDeviceId);
				bean.setNum("0");
				bean.setFlag(flag);
				bean.setDeviceType(userType);
				drList.add(bean);
			}
			map.put("list",drList);
			//保存账号与设备的关联关系
			baseDao.insert("permission.saveDeviceRelation", map);
			response.setStatusCode(1);
			response.setMessage("仓库添加成功");
			return response;
		}else{
			response.setStatusCode(2);
			response.setMessage("编号是"+num+"仓库已存在");
			return response;
		}
	}

	
	/**
	 * 仓库管理delete
	 */
	@Override
	public Response deleteWareHouse(Map map) {
		Response response = new Response();
		baseDao.update("warehouse.delCkDeviceRelation", map);
		baseDao.update("warehouse.delCkInfo", map);
		response.setStatusCode(1);
		response.setMessage("仓库删除成功");
		return response;
	}

	/**
	 * <p>Title: queryWareHouseById</p>
	 * @Description 查下仓库管理详情ByID
	 * @param requestMap
	 * @return
	 */
	@Override
	public Response queryWareHouseById(Map requestMap) {
		Response response = new Response();
		WarehouseGroundFishpond wgf = (WarehouseGroundFishpond) baseDao.queryForObject("warehouse.queryWareHouseById", requestMap);
		response.setResult(wgf);
		response.setStatusCode(1);
		response.setMessage("仓库管理查询成功");
		return response;
	}

	/**
	 * <p>Title: updateWareHouse</p>
	 * @Description 仓库更新
	 * @param requestMap
	 * @return
	 */
	@Override
	public Response updateWareHouse(Map requestMap) {
		Response response = new Response();
		baseDao.update("warehouse.updateWareHouse", requestMap);
		response.setStatusCode(1);
		response.setMessage("仓库管理更新成功");
		return response;
	}

	

	
	
	/***==============前端==============**/ 
	/**
	 * <p>Title: frontWareHouseList</p>
	 * @Description 查下仓库下拉框
	 * @param requestMap
	 * @return
	 */
	@Override
	public Response frontWareHouseList(Map requestMap) {
		Response response = new Response();
		List<WarehouseGroundFishpond> whgfList = (List<WarehouseGroundFishpond>) baseDao.queryForList("warehouse.queryWareHouseByCompanyId", requestMap); 
		response.setResult(whgfList);
		response.setStatusCode(1);
		response.setMessage("查询仓库下拉框");
		return response;
	}

	/**
	 * <p>Title: getInventoryManage</p>
	 * @Description 
	 * @param requestMap
	 * @return 库存列表
	 */
	@Override
	public Response getInventoryManage(Map requestMap) {
		Response response = new Response();
		List<Inventory> wgfList = (List<Inventory>) baseDao.queryForList("warehouse.getInventoryManage",requestMap);
		response.setStatusCode(1);
		response.setMessage("库存列表获取成功");
		response.setResult(wgfList);
		return response;
	}

	/**
	 * <p>Title: getInventoryManageCount</p>
	 * @Description 库存列表Count
	 * @param requestMap
	 * @return
	 */
	@Override
	public Response getInventoryCount(Map requestMap) {
		Response response = new Response();
		String wgfCount = (String) baseDao.queryForObject("warehouse.getInventoryManageCount", requestMap);
		response.setStatusCode(1);
		response.setMessage("库存Count获取成功");
		response.setResult(wgfCount);
		return response;
	}

	
	/**
	 * <p>Title: insertWarehousing</p>
	 * @Description 入库
	 * @param requestMap
	 * @return
	 */
	@Override
	public Response insertWarehousing(Map requestMap) {
		Response response = new Response();
		String warehouseId = (String) requestMap.get("warehouseId");
//		Inventory inventory= (Inventory) baseDao.queryForObject("warehouse.getInventoryBywarehouseId", warehouseId);
//		if(inventory!=null){
			baseDao.insert("warehouse.insertWarehousing", requestMap);
			response.setStatusCode(1);
			response.setMessage("入库信息成功");
			return response;
//		}else{
//			response.setStatusCode(2);
//			response.setMessage("仓库不存在");
//			return response;
//		}
	}
	
	/**
	 * <p>Title: getInventoryType</p>
	 * @Description 获取仓库种类
	 * @param requestMap
	 * @return
	 */
	@Override
	public Response getInventoryType(Map requestMap) {
		Response response = new Response();
		String warehouseId = (String) requestMap.get("warehouseId");
//		Inventory inventory= (Inventory) baseDao.queryForObject("warehouse.getInventoryBywarehouseId", warehouseId);
//		if(inventory!=null){
			List<InventoryType> inventoryTypeList= (List<InventoryType>) baseDao.queryForList("warehouse.getInventoryType", warehouseId);
			response.setResult(inventoryTypeList);
			response.setStatusCode(1);
			response.setMessage("获取仓库种类列表成功");
//		}else{
//			response.setStatusCode(2);
//			response.setMessage("入库信息不存在");
//			return response;
//		}
		return response;
	}

	
	/**
	 * <p>Title: updatePlacing</p>
	 * @Description 出库
	 * @param requestMap
	 * @return
	 */
	@Override
	public Response updatePlacing(Map requestMap) {
		Response response = new Response();
		int outSize =  Integer.parseInt((String) requestMap.get("size"));
		// 判断是否有入库信息
		Inventory inventory= (Inventory) baseDao.queryForObject("warehouse.getInventoryById", requestMap);
		
		
		
		if(inventory!=null){
			int inSize = Integer.parseInt(inventory.getSize());
			// 入库减去出库
			if(inSize > outSize){// 如果入库大于出库则可以进行出库，否则不能出库
				int stock = inSize-outSize;
				requestMap.put("stock", stock);
				baseDao.update("warehouse.updateStockByProId", requestMap);// 更新库存
				// 保存出库信息
				requestMap.put("warehouseId", inventory.getWarehouse_id());
				baseDao.insert("warehouse.insertWarehousing", requestMap);
				response.setStatusCode(1);
				response.setMessage("出库信息保存成功");
				return response;
			}else{
				// 如果出库数量小于入库数量，不能出库
				response.setStatusCode(3);
				response.setMessage("库存："+inSize+"  如果出库数量小于入库数量，不能出库");
				return response;
			}
		}else{
			response.setStatusCode(2);	
			response.setMessage("入库信息不存在,不能出库");
			return response;
		}
	}

	
	/**
	 * <p>Title: getViewProInfo</p>
	 * @Description 14.查看-产品信息
	 * @param requestMap
	 * @return
	 */
	@Override
	public Response getViewProInfo(Map requestMap) {
		Response response = new Response();
		Inventory inventory= (Inventory) baseDao.queryForObject("warehouse.getInventoryById", requestMap);
		if(inventory!=null){
			response.setResult(inventory);
			response.setStatusCode(1);	
			response.setMessage("产品信息查看成功");
		}else{
			response.setResult(inventory);
			response.setStatusCode(2);	
			response.setMessage("产品信息不存在");
		}
		return response;
	}

	/**
	 * <p>Title: getViewOutgoingRecords</p>
	 * @Description 15.查看-出库记录
	 * @param requestMap
	 * @return
	 */
	@Override
	public Response getViewOutgoingRecords(Map requestMap) {
		Response response = new Response();
		List<Inventory> inventoryList= (List<Inventory>) baseDao.queryForList("warehouse.getInventoryListById", requestMap);
		response.setResult(inventoryList);
		response.setStatusCode(1);	
		response.setMessage("出库记录查询成功");
		return response;
	}
	
	
	
	
	
	/**
	 * @Description 入库列表
	 * @param requestMap
	 * @return
	 * @author  liwenhui
	 * @Date    2018-8-23  下午3:45:19
	 */
	public Response insertWarehousesList(Map requestMap) {
		Response response = new Response();
		List<Inventory> inventoryList= (List<Inventory>) baseDao.queryForList("warehouse.insertWarehousesList", requestMap);
		response.setResult(inventoryList);
		response.setStatusCode(1);	
		response.setMessage("入库列表查询成功");
		return response;
	}

	@Override
	public Response insertWarehousesCount(Map requestMap) {
		Response response = new Response();
		int count = (int) baseDao.queryForObject("warehouse.insertWarehousesCount", requestMap);
		response.setStatusCode(1);	
		response.setMessage("出入库条数获取成功");
		response.setResult(count);
		return response;
	}
	
	

}
