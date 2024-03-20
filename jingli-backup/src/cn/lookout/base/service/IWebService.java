package cn.lookout.base.service;

import java.util.Map;

import javax.servlet.http.HttpSession;

import cn.lookout.base.bean.Response;

public interface IWebService {
	
	//获取菜单
	public Response getMenuByUser(Map requestMap);
	//获取权限
	public Response checkPermissionByUser(Map requestMap);
	//获取个人信息
	public Response getUserInfo(Map requestMap);
	//获取主页面公司信息个数
	public Response getIndexCompanyCnt(Map requestMap);
	//获取主页面公司信息
	public Response getIndexCompanyInfo(Map requestMap);
	//根据企业id获取大棚/鱼塘个数
	public Response getGroundFishpondCntById(Map requestMap);
	//根据企业id获取大棚/鱼塘列表
	public Response getGroundFishpondListById(Map requestMap);
	//获取大棚/鱼塘列表(下拉选项)
	public Response getGroundFishpondList(Map requestMap);
	//获取所有设备(下拉选项)
	public Response getDeviceListTj(Map requestMap);
	//修改组织名称
	public Response updateDisplayName(Map requestMap);
	
}

