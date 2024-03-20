package cn.lookout.base.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.collections.MapUtils;

import cn.lookout.base.bean.DeviceRelationBean;
import cn.lookout.base.bean.DtDeviceSwitchBean;
import cn.lookout.base.bean.FuncRoleBean;
import cn.lookout.base.bean.FunctionBean;
import cn.lookout.base.bean.JsTreeChildBean;
import cn.lookout.base.bean.JsTreeNodeBean;
import cn.lookout.base.bean.JsTreeState;
import cn.lookout.base.bean.MenuBean;
import cn.lookout.base.bean.MenuChildBean;
import cn.lookout.base.bean.MenuRoleBean;
import cn.lookout.base.bean.Response;
import cn.lookout.base.bean.RoleBean;
import cn.lookout.base.bean.SaveUserGFTBean;
import cn.lookout.base.bean.UserBean;
import cn.lookout.base.bean.UserGfFishInfoBean;
import cn.lookout.base.bean.UserGfFishListBean;
import cn.lookout.base.bean.UserRoleBean;
import cn.lookout.base.constant.Cnst;
import cn.lookout.base.dao.IBaseDao;
import cn.lookout.base.service.IDeviceService;
import cn.lookout.base.service.IPermissionService;
import cn.lookout.common.RedisUtils;
import cn.lookout.common.StringUtil;
import cn.lookout.common.util.CommonUtil;

public class PermissionServiceImpl implements IPermissionService{

	private IBaseDao baseDao;
	
	@Resource
	private IDeviceService deviceService;
	
	public void setDeviceService(IDeviceService deviceService) {
		this.deviceService = deviceService;
	}

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}
	
	/**
	 * 查询所有权限列表
	 */
	@Override
	public Response getAllRole(Map map) {
		Response response = new Response();
		List<RoleBean> pre = (List) baseDao.queryForList("permission.getAllRole", null);
		response.setStatusCode(1);
		response.setResult(pre);
		return response;
	}

	/**
	 * 新增权限
	 */
	@Override
	public Response saveRole(Map map) {
		Response response = new Response();
		baseDao.insert("permission.saveRole", map);
		response.setStatusCode(1);
		return response;
	}

	/**
	 * 查询所有父级菜单
	 */
	@Override
	public Response getAllParent(Map map) {
		Response response = new Response();
		List<MenuBean> menuBean = (List) baseDao.queryForList("permission.getAllParent", null);
		response.setStatusCode(1);
		response.setResult(menuBean);
		return response;
	}

	/**
	 * 查询所有菜单
	 */
	@Override
	public Response getAllMenu(Map map) {
		Response response = new Response();
		List<MenuChildBean> menuBean = (List) baseDao.queryForList("permission.getAllMenu", map);
		response.setStatusCode(1);
		response.setResult(menuBean);
		return response;
	}

	/**
	 * 新增菜单
	 */
	@Override
	public Response saveMenu(Map map) {
		Response response = new Response();
		baseDao.insert("permission.saveMenu", map);
		response.setStatusCode(1);
		return response;
	}
	
	/**
	 * 修改菜单
	 */
	@Override
	public Response updateMenu(Map map ){
		Response response = new Response();
		baseDao.update("permission.updateMenu", map);
		response.setStatusCode(1);
		return response;
	}
	
	/**
	 * 修改菜单可见
	 */
	public Response updateVisible(Map map ){
		Response response = new Response();
		baseDao.update("permission.updateVisible", map);
		response.setStatusCode(1);
		return response;
	}

	/**
	 * 删除菜单
	 */
	@Override
	public Response deleteMenu(Map map) {
		Response response = new Response();
		baseDao.delete("permission.deleteMenu", map);
		response.setStatusCode(1);
		return response;
	}

	/**
	 * 获取所有方法
	 */
	@Override
	public Response getAllFunc(Map map) {
		Response response = new Response();
		List<FunctionBean> functionBean = (List)baseDao.queryForList("permission.getAllFunc", map);
		response.setStatusCode(1);
		response.setResult(functionBean);
		return response;
	}

	/**
	 * 新增方法
	 */
	@Override
	public Response saveFunc(Map map) {
		Response response = new Response();
		baseDao.insert("permission.saveFunc", map);
		response.setStatusCode(1);
		return response;
	}

	/**
	 * 删除方法
	 */
	@Override
	public Response deleteFunc(Map map) {
		Response response = new Response();
		baseDao.delete("permission.deleteFunc", map);
		response.setStatusCode(1);
		return response;
	}

	/**
	 * 通过权限查询菜单
	 */
	@Override
	public Response getMenuByRole(Map map) {
		Response response = new Response();
		List<MenuRoleBean> list = (List)baseDao.queryForList("permission.getMenuByRole", map);
		List<JsTreeNodeBean> jsList = new ArrayList<>();
		Map positionMap = new HashMap();
		if(list!=null){
			for (int i = 0; i < list.size(); i++) {
				MenuRoleBean bean = list.get(i);
				if(bean.getParent() == 0){
					JsTreeNodeBean jsParent = new JsTreeNodeBean();
					jsParent.setId(bean.getId());
					jsParent.setText(bean.getName());
					positionMap.put(bean.getId(), i);
					jsList.add(jsParent);
				}else{
					int pos = (int) positionMap.get(bean.getParent());
					JsTreeState state = new JsTreeState();
					if(bean.getChecked() == 0){
						state.setSelected(false);
					}else{
						state.setSelected(true);
					}
					JsTreeChildBean jsChild = new JsTreeChildBean();
					jsChild.setId(bean.getId());
					jsChild.setText(bean.getName());
					jsChild.setState(state);
					List<JsTreeChildBean> children = jsList.get(pos).getChildren();
					if(children == null){
						children = new ArrayList<>();
					}
					children.add(jsChild);
					jsList.get(pos).setChildren(children);
				}
			}
			
		}
		response.setStatusCode(1);
		response.setResult(jsList);
		return response;
	}

	
	/**
	 * 修改菜单-权限的关联关系
	 */
	@Override
	public Response updateMenuRole(Map map) {
		Response response = new Response();
		String menuIds = (String) map.get("menuIds");
		baseDao.delete("permission.deleteRoleMenu", map);
		if(menuIds != null && menuIds.length() > 0){
			menuIds = menuIds.substring(0,menuIds.length()-1);
			map.put("menuIds", menuIds);
			baseDao.insert("permission.saveRoleMenu", map);
		}
		RedisUtils.delKeys("SYSTEM_MENU");
		response.setStatusCode(1);
		return response;
	}
	
	/**
	 * 通过权限查询对应方法
	 */
	@Override
	public Response getFuncByRole(Map map ){
		Response response = new Response();
		List<FuncRoleBean> funcRoleBeans = (List<FuncRoleBean>) baseDao.queryForList("permission.getFuncByRole", map);
		response.setResult(funcRoleBeans);
		response.setStatusCode(1);
		return response;
	}
	
	/**
	 * 修改方法-权限对应关系
	 */
	@Override
	public Response updateFuncRole(Map map ){
		Response response = new Response();
		String funcIds = (String) map.get("funcIds");
		baseDao.delete("permission.deleteFuncByRole", map);
		if(funcIds != null && funcIds.length() > 0){
			baseDao.insert("permission.saveFuncRole", map);
		}
		RedisUtils.delKeys("SYSTEM_QX");
		response.setStatusCode(1);
		return response;
	}
	
	/**
	 * 查询所有用户（一个用户多个权限时 显示多条记录）
	 * 例如：1	176XXXXX	农业
	 * 		 2	176XXXXX	渔业
	 */
	@Override
	public Response getAllUser(Map map ){
		Response response = new Response();
		List<UserRoleBean> userRoleBean = (List<UserRoleBean>) baseDao.queryForList("permission.getAllUser", map);
		response.setStatusCode(1);
		response.setResult(userRoleBean);
		return response;
	}
	
	/**
	 * 新增用户
	 * 2.0修改如下：因公司可对应多个权限类型，新增时根据权限类型查询是否存在
	 */
	@Override
	public Response saveUser(Map map){
		Response response = new Response();
		String roleId = MapUtils.getString(map, "roleId");
		String userType = (String) baseDao.queryForObject("permission.getRoleUserTypeById", map);
		//公司下属组织数
		String maxCntStr = (String) map.get("maxCnt");
		
		if(StringUtil.isEmpty(roleId) || StringUtil.isEmpty(userType)
				|| StringUtil.isEmpty(maxCntStr)){
			response.setResult(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return response;
		}
		Integer maxCnt = Integer.parseInt(maxCntStr);
		Integer userId = (Integer) baseDao.queryForObject("permission.getUserIdByMobile", map);
		String defaultPwd = CommonUtil.random6();
		map.put("pwd", defaultPwd);
		if(userId == null){
			//若账号不存在，则创建账号
			userId = (Integer) baseDao.insert("permission.saveUser", map);
			if(userId == null){
				response.setStatusCode(-1);//新增失败
				response.setMessage("新增失败");
				return response;
			}
		}else{
			//若账号存在，判断该账号对应的权限已存在（因为一个账号可以拥有多个权限）
			Integer typeExist = (Integer) baseDao.queryForObject("permission.getUserByMobileRole", map);
			if(typeExist > 0){
				//账号已存在
				response.setStatusCode(-2);
				response.setMessage("账号已存在");
				return response;
			}
		}
		map.put("userId", userId);
		map.put("userType", userType);
		//保存用户权限对应关系
		baseDao.insert("permission.saveUserRole", map);
		
		
		//若创建的是普通用户，需初始化大棚、鱼塘、大田、设备等信息
		if((Cnst.USER_TYPE_NY.equals(userType)) 
				|| (Cnst.USER_TYPE_YY.equals(userType)) 
				|| (Cnst.USER_TYPE_DT.equals(userType)) 
				|| (Cnst.USER_TYPE_CK.equals(userType)) 
				){
			List<SaveUserGFTBean> list = new ArrayList<>();
			//根据传来的公司组织数  创建多少个大棚、鱼塘、大田
			for (int i = 0; i < maxCnt; i++) {
				SaveUserGFTBean bean = new SaveUserGFTBean();
				bean.setNum(i + 1 + "");
				if(Cnst.USER_TYPE_NY.equals(userType)){
					bean.setDisplayName(i+1+"号大棚");
				}else if(Cnst.USER_TYPE_YY.equals(userType)){
					bean.setDisplayName(i+1+"号鱼塘");
				}else if(Cnst.USER_TYPE_DT.equals(userType)){
					bean.setDisplayName(i+1+"号大田");
				}else if(Cnst.USER_TYPE_CK.equals(userType)){
					bean.setDisplayName(i+1+"号仓库");
				}
				list.add(bean);
			}
			map.put("list",list);
			//保存账号与大棚、鱼池、大田、仓库 关联
			baseDao.insert("permission.saveGroundFishpondList", map);
			
			//保存非园区的设备关联（每个组织下都有着不同的设备，所以需要双层循环）
			map.put("parkDevice", "0");
			List<String> deviceIds = (List<String>) baseDao.queryForList("permission.getDeviceIds", map);
			List<DeviceRelationBean> drList = new ArrayList<>();
			for (String deviceId : deviceIds) {
				for (int num = 0; num < maxCnt; num++) {
					int gftNum = num +1 ;
					String flag = userId+"&"+gftNum+"&"+deviceId;
					DeviceRelationBean bean = new DeviceRelationBean();
					bean.setCompanyId(userId+"");
					bean.setDeivceId(deviceId);
					bean.setNum(gftNum +"");
					bean.setFlag(flag);
					bean.setDeviceType(userType);
					drList.add(bean);
				}
			}
			//保存园区的设备关联（因为园区只有一个，所以仅循环园区设备列表即可）
			map.put("parkDevice", "1");
			List<String> parkDeviceIds = (List<String>) baseDao.queryForList("permission.getDeviceIds", map);
			for (String parkDeviceId : parkDeviceIds) {
				String flag = userId+"&"+0+"&"+parkDeviceId;
				DeviceRelationBean bean = new DeviceRelationBean();
				bean.setCompanyId(userId+"");
				bean.setDeivceId(parkDeviceId);
				bean.setNum("0");
				bean.setFlag(flag);
				bean.setDeviceType(userType);
				drList.add(bean);
			}
			map.put("list",drList);
			//保存账号与设备的关联关系
			baseDao.insert("permission.saveDeviceRelation", map);
		}
		response.setStatusCode(1);
		response.setResult(defaultPwd);
		return response;
	}
	
	/**
	 * 修改用户禁用、启用
	 */
	@Override
	public Response updateUserState(Map map ){
		Response response = new Response();
		baseDao.update("permission.updateUserState", map);
		response.setStatusCode(1);
		return response;
	}

	/**
	 * 删除用户
	 */
	@Override
	public Response deleteUser(Map map) {
		Response response = new Response();
		baseDao.update("permission.deleteUser", map);
		response.setStatusCode(1);
		return response;
	}

	/**
	 * 根据公司id获取基本信息
	 */
	@Override
	public Response getUserById(Map map) {
		Response response = new Response();
		UserBean user = (UserBean) baseDao.queryForObject("permission.getUserById", map);
		response.setStatusCode(1);
		response.setResult(user);
		return response;
	}
	/**
	 * 根据公司id修改基本信息
	 */
	@Override
	public Response updateUserInfo(Map map) {
		Response response = new Response();
		baseDao.update("permission.updateUserInfo", map);
		response.setStatusCode(1);
		return response;
	}

	/**
	 * 获取大棚、鱼塘信息列表(需要根据手机号、类型搜索)
	 * @param map
	 * @return
	 */
	@Override
	public Response getGfListInfo(Map map) {
		// TODO Auto-generated method stub
		Response response = new Response();
		String mobile = MapUtils.getString(map, "mobile");
		String roleId = MapUtils.getString(map, "roleId");
		if(StringUtil.isEmpty(mobile) || StringUtil.isEmpty(roleId)){
			response.setResult(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return response;
		}
		UserGfFishListBean bean = (UserGfFishListBean) baseDao.queryForObject("permission.getUserInfoByPhoneAndRoleId", map);
		if(bean == null){
			response.setStatusCode(-2);
			response.setMessage("用户不存在");
			return response;
		}
		map.put("companyId", bean.getCompanyId());
		map.put("type",bean.getType());
		List<UserGfFishInfoBean> list = (List<UserGfFishInfoBean>) baseDao.queryForList("permission.getGfListInfo", map);
		bean.setList(list);
		response.setStatusCode(1);
		response.setMessage("获取成功");
		response.setResult(bean);
		return response;
	}

	/**
	 * 增加、删除公司组织信息
	 * 若id参数为空，则增加
	 * 若id不为空，则删除
	 */
	@Override
	public Response updateGfFishInfo(Map map) {
		// TODO Auto-generated method stub
		Response response = new Response();
		String id = (String) map.get("id");
		String companyId = (String) map.get("companyId");//公司id
		String userType = (String) map.get("userType");//类型
		String num = (String) map.get("num");//编号
		
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(userType)){
			response.setResult(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return response;
		}
		
		if(StringUtil.isEmpty(id)){
			//新增一个组织
			Integer number = null;
			try {
				number = Integer.parseInt(num);
			} catch (NumberFormatException e) {
				response.setStatusCode(-2);
				response.setMessage("请输入正确的数字");
				return response;
			}
			Integer isExist = (Integer) baseDao.queryForObject("permission.getNumberIsExist", map);
			if(isExist > 0){
				response.setStatusCode(-3);
				response.setMessage("您输入的编号已存在，请重新输入");
				return response;
			}else{
				if(Cnst.USER_TYPE_NY.equals(userType)){
					map.put("displayName", num + "号大棚");
				}else if(Cnst.USER_TYPE_YY.equals(userType)){
					map.put("displayName", num + "号鱼塘");
				}else if(Cnst.USER_TYPE_DT.equals(userType)){
					map.put("displayName", num + "号大田");
				}
				baseDao.insert("permission.saveGroundFishpond", map);
			}
			//新增设备绑定关系
			map.put("parkDevice", "0");
			List<String> deviceIds = (List<String>) baseDao.queryForList("permission.getDeviceIds", map);
			List<DeviceRelationBean> list = new ArrayList<>();
			for (String deviceId : deviceIds) {
				String flag = companyId+"&"+num+"&"+deviceId;
				DeviceRelationBean bean = new DeviceRelationBean();
				bean.setCompanyId(companyId);
				bean.setDeivceId(deviceId);
				bean.setNum(num);
				bean.setFlag(flag);
				bean.setDeviceType(userType);
				list.add(bean);
			}
			map.put("list",list);
			baseDao.insert("permission.saveDeviceRelation", map);
		}else{
			//删除
			Integer isExistUploadData = (Integer) baseDao.queryForObject("permission.getUploadDataIsExist", map);
			if(isExistUploadData > 0){
				response.setStatusCode(-4);
				response.setMessage("不能删除已有数据的组织");
				return response;
			}else{
				baseDao.update("permission.delDeviceRelation", map);
				baseDao.update("permission.delGfInfo", map);
			}
		}
		baseDao.update("permission.updateUserMaxCnt", map);
		response.setStatusCode(1);
		response.setMessage("操作成功");
		
		return response;
	}

	/**
	 * 修改摄像头通道号
	 */
	@Override
	public Response updatePassNum(Map map) {
		Response response = new Response();
		String id = (String) map.get("id");
		String passNum = (String) map.get("passNum");
		if(StringUtil.isEmpty(id) || StringUtil.isEmpty(passNum)){
			response.setResult(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return response;
		}
		baseDao.update("permission.updatePassNum", map);
		response.setStatusCode(1);
		response.setMessage("修改成功");
		return response;
	}

	/**
	 * 通过公司手机号、角色类型获取公司的动态设备信息（设备名称，开关数等）
	 */
	@Override
	public Response getCompanyDevicesInfoByPhone(Map map) {
		Response response = new Response();
		String mobile = MapUtils.getString(map, "mobile");
		String roleId = MapUtils.getString(map, "roleId");
		if(StringUtil.isEmpty(mobile) || StringUtil.isEmpty(roleId)){
			response.setResult(Cnst.RESULT_CODE_PARAM_EMPTY);
			response.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return response;
		}
		UserGfFishListBean bean = (UserGfFishListBean) baseDao.queryForObject("permission.getUserInfoByPhoneAndRoleId", map);
		if(bean == null){
			response.setStatusCode(-2);
			response.setMessage("用户不存在");
			return response;
		}
		map.put("companyId", bean.getCompanyId());
		map.put("userType",bean.getType());
		List<DtDeviceSwitchBean> list = (List<DtDeviceSwitchBean>) baseDao.queryForList("permission.getCompanyDevicesInfo", map);
		response.setStatusCode(1);
		response.setMessage("获取成功");
		response.setResult(list);
		return response;
	}
	/**
	 * 修改设备开关数
	 */
	@Override
	public Response updateDeviceSwitchNum(Map map) {
		Response response = new Response();
		String num = MapUtils.getString(map, "num");
		String id = MapUtils.getString(map, "id");
		if(StringUtil.isEmpty(num) || StringUtil.isEmpty(id)){
			response.setResult(-2);
			response.setMessage("参数不能为空");
			return response;
		}
		baseDao.update("permission.updateDeviceSwitchNum", map);
		response.setStatusCode(1);
		response.setMessage("修改成功");
		
		String companyInfo = (String) baseDao.queryForObject("permission.getCompanyIdByDeviceRelation", map);
		if(!StringUtil.isEmpty(companyInfo)){
			String[] companyInfoArr = companyInfo.split("&");
			String companyId = companyInfoArr[0];
			String gfNum = companyInfoArr[1];
			String deviceId = companyInfoArr[2];
			Integer numCnt = Integer.parseInt(num);
			
			map.put("companyId", companyId);
			map.put("gfNum", gfNum);
			map.put("deviceId", deviceId);
			map.put("switchNum", num);
			//删除之前开关的所有设置
			baseDao.delete("permission.deleteDeviceTimeScheduleSetting", map);
			String redisKey = "DTS&"+companyInfo;
			RedisUtils.delKeys(redisKey);//清空当前设备所有开关的所有任务
			for (int i = 1; i <= numCnt; i++) {
				deviceService.updateDeviceTimeSchedule(companyId,gfNum , deviceId , i+"");
			}
		}
		
		return response;
	}
	
	
}
