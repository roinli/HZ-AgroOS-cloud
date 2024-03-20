package cn.lookout.base.service.impl;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;

import cn.lookout.base.bean.EmployeeBean;
import cn.lookout.base.bean.Response;
import cn.lookout.base.dao.IBaseDao;
import cn.lookout.base.service.IEmployeeService;
import cn.lookout.common.FileUtil;
import cn.lookout.common.QiNiuUtil;
import cn.lookout.common.SystemConfig;

/**
 * 员工相关
 * @author lxl
 *
 */
public class EmployeeServiceImpl implements IEmployeeService {

	private static final Logger logger = Logger.getLogger(EmployeeServiceImpl.class);
	
	private IBaseDao baseDao;

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}
	
	/**
	 * 新增员工
	 */
	@SuppressWarnings("unchecked")
	@Override
	public Response add(Map map) {
		logger.debug(">>>start:新增员工信息" + JSON.toJSONString(map));
		Response res = new Response();
		
		String companyId = MapUtils.getString(map, "companyId"); // 企业id
		String name = MapUtils.getString(map, "name"); // 姓名
		String sex = MapUtils.getString(map, "sex"); // 性别 0女 1男
		String mobile = MapUtils.getString(map, "mobile"); // 手机号
		String position = MapUtils.getString(map, "position"); // 职位
		String age = MapUtils.getString(map, "age"); // 年龄
		String healthyState = MapUtils.getString(map, "healthyState"); // 健康状态
		String address = MapUtils.getString(map, "address"); // 户籍地
		
		String icon = MapUtils.getString(map, "icon");
		String iconUrl = FileUtil.uploadBase64Img(icon);
		map.put("icon", iconUrl);
		
		String certificates = MapUtils.getString(map, "certificates"); 
		String certificatesUrl = FileUtil.uploadBase64Img(certificates);
		map.put("certificates", certificatesUrl);
		
		int result = baseDao.update("employee.addEmployee", map);
		res.setStatusCode(1);
		res.setMessage("新增成功");
		res.setStatusCode(result);
		logger.debug("<<<END:新增员工信息" + JSON.toJSONString(res));
		return res;
	}

	/**
	 * 批量删除员工
	 */
	@Override
	public Response delete(Map map) {
		logger.debug(">>>start:删除员工" + JSON.toJSONString(map));
		Response res = new Response();
		baseDao.delete("employee.delEmployee", map);
		res.setStatusCode(1);
		res.setMessage("删除成功");
		logger.debug("<<<END:删除员工" + JSON.toJSONString(res));
		return res;
	}

	/**
	 * 修改员工信息
	 */
	@SuppressWarnings("unchecked")
	@Override
	public Response update(Map map) {
		logger.debug(">>>start:修改员工信息" + JSON.toJSONString(map));
		Response res = new Response();
		String id = MapUtils.getString(map, "id"); // 员工id
		// id 不能为空
		if(StringUtils.isEmpty(id)) {
			res.setResult(-2);
			res.setMessage("id不能为空");
			return res;
		}
		String companyId = MapUtils.getString(map, "companyId"); // 企业id
		String name = MapUtils.getString(map, "name"); // 姓名
		String sex = MapUtils.getString(map, "sex"); // 性别 0女 1男
		String mobile = MapUtils.getString(map, "mobile"); // 手机号
		String position = MapUtils.getString(map, "position"); // 职位
		String age = MapUtils.getString(map, "age"); // 年龄
		String healthyState = MapUtils.getString(map, "healthyState"); // 健康状态
		String address = MapUtils.getString(map, "address"); // 户籍地
		InputStream isIcon = (InputStream) MapUtils.getObject(map, "icon"); // 头像
		InputStream isCertificates = (InputStream) MapUtils.getObject(map, "certificates"); // 资格证
		String certificatesValid = MapUtils.getString(map, "certificatesValid"); // 资格证有效期
		String qiniuIdIcon = companyId+"_"+"emp_icon" + "_" + id; // 七牛云fileName,头像
		QiNiuUtil.getInstance().uploadFile(isIcon, qiniuIdIcon); // 上传图片
		String downUrlIcon = SystemConfig.qiniu_url + "/" + qiniuIdIcon; // 下载头像的地址 
		String qiniuIdCert = companyId+"_"+"emp_cert" + "_" + id; // 七牛云fileName,资格证
		QiNiuUtil.getInstance().uploadFile(isCertificates, qiniuIdCert); // 上传图片
		String downUrlCert = SystemConfig.qiniu_url + "/" + qiniuIdCert; // 下载资格证图片的地址 
		logger.info("downUrlIcon:"+downUrlIcon);
		logger.info("downUrlCert:"+downUrlCert);
		map.put("icon", downUrlIcon);
		map.put("certificates", downUrlCert);
		baseDao.update("employee.updtEmployee", map);
		res.setStatusCode(1);
		res.setMessage("修改成功");
		logger.debug("<<<END:修改员工信息" + JSON.toJSONString(res));
		return res;
	}

	/**
	 * 根据id查询单个员工信息
	 */
	@Override
	public Response query(Map map) {
		logger.debug(">>>start:查询某员工信息" + JSON.toJSONString(map));
		Response res = new Response();
		String id = MapUtils.getString(map, "id");
		EmployeeBean bean = (EmployeeBean) baseDao.queryForObject("employee.queryEmployee",id);
		logger.debug(bean);
		res.setStatusCode(1);
		res.setMessage("获取成功");
		res.setResult(bean);
		logger.debug("<<<END:查询某员工信息" + JSON.toJSONString(res));
		return res;
	}

	@Override
	public Response queryList(Map map) {
		logger.debug(">>>start:查询员工列表" + JSON.toJSONString(map));
		Response res = new Response();
		List list = baseDao.queryForList("employee.queryEmployees", map);
		res.setStatusCode(1);
		res.setMessage("获取成功");
		res.setResult(list);
		logger.debug("<<<END:查询员工列表 "+ JSON.toJSONString(res));
		return res;
	}

	@Override
	public Response queryListCount(Map map) {
		logger.debug(">>>start:查询员工总数" + JSON.toJSONString(map));
		Response res = new Response();
		int count = (Integer) baseDao.queryForObject("employee.queryEmployeesCount", map);
		res.setStatusCode(1);
		res.setMessage("获取成功");
		res.setResult(count);
		logger.debug("<<<END:查询员工总数" + JSON.toJSONString(res));
		return res;
	}

}
