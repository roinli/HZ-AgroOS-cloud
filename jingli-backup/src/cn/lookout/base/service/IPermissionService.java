package cn.lookout.base.service;

import java.util.Map;

import javax.servlet.http.HttpSession;

import cn.lookout.base.bean.Response;

public interface IPermissionService {
	
	public Response getAllRole(Map map);
	
	public Response saveRole(Map map);
	//获取所有父级菜单
	public Response getAllParent(Map map);
	//获取菜单
	public Response getAllMenu(Map map);
	//新增菜单
	public Response saveMenu(Map map);
	//修改菜单
	public Response updateMenu(Map map);
	//菜单显示隐藏
	public Response updateVisible(Map map);
	//删除菜单
	public Response deleteMenu(Map map);
	//获取所有方法
	public Response getAllFunc(Map map);
	//新增方法
	public Response saveFunc(Map map); 
	//删除方法
	public Response deleteFunc(Map map);
	//根据权限获取菜单
	public Response getMenuByRole(Map map);
	//修改权限菜单关联
	public Response updateMenuRole(Map map);
	//根据权限获取方法
	public Response getFuncByRole(Map map);
	//修改权限方法关联
	public Response updateFuncRole(Map map);
	//获取所有用户
	public Response getAllUser(Map map);
	//新增用户
	public Response saveUser(Map map);
	//禁用账号
	public Response updateUserState(Map map);
	//删除账号
	public Response deleteUser(Map map);
	//获取账号信息
	public Response getUserById(Map map);
	//修改账号
	public Response updateUserInfo(Map map);
	//查看大棚/鱼塘信息
	public Response getGfListInfo(Map map);
	//新增/删除鱼塘
	public Response updateGfFishInfo(Map map);
	//修改摄像头通道号
	public Response updatePassNum(Map map);
	//通过手机号获取公司动态设备信息（开关数等）
	public Response getCompanyDevicesInfoByPhone(Map map);
	//修改设备开关数
	public Response updateDeviceSwitchNum(Map map);
	
}

