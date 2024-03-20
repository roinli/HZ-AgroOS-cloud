package cn.lookout.base.service.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpSession;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.collections.set.SynchronizedSet;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import cn.lookout.base.bean.Response;
import cn.lookout.base.bean.ScanCountBean;
import cn.lookout.base.constant.Cnst;
import cn.lookout.base.constant.DeviceConstant;
import cn.lookout.base.dao.IBaseDao;
import cn.lookout.base.service.ISourceService;
import cn.lookout.common.FileUtil;
import cn.lookout.common.StringUtil;
import cn.lookout.common.SystemConfig;
import cn.lookout.common.util.EANCodeUtil;
import cn.lookout.common.util.QRCodeUtil;

public class SourceServiceImpl implements ISourceService {

	public static final Logger logger = Logger.getLogger(SourceServiceImpl.class);

	private IBaseDao baseDao;

	public void setBaseDao(IBaseDao baseDao) {
		this.baseDao = baseDao;
	}
	
	@Override
	public Response groundTree(Map map) {
		Response res = new Response();
		String companyId = MapUtils.getString(map, "companyId"); // 公司id
		List<Map<String, Object>> list = (List<Map<String, Object>>) baseDao.queryForList("source.source_groundTree", map);
		res.setStatusCode(1);
		res.setResult(list);
		return res;
	}

	@Override
	public Response queryProducts(Map map) {
		Response res = new Response();
		String companyId = MapUtils.getString(map, "companyId");
		String userType = MapUtils.getString(map, "userType");
		String areaNum = MapUtils.getString(map, "areaNum"); // 大棚/鱼塘/大田编号
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(userType)){
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		List<Map<String, Object>> list = null;
		list = (List<Map<String, Object>>) baseDao.queryForList("source.source_products", map);
		res.setResult(list);
		res.setStatusCode(1);
		res.setMessage("获取成功");
		return res;
	}

	@Override
	public Response queryProductsCount(Map map) {
		Response res = new Response();
		String companyId = MapUtils.getString(map, "companyId");
		String userType = MapUtils.getString(map, "userType");
		String areaNum = MapUtils.getString(map, "areaNum"); // 大棚/鱼塘编号
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(userType)){
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		Integer result = (Integer) baseDao.queryForObject("source.source_products_count", map);
		res.setResult(result);
		res.setStatusCode(1);
		res.setMessage("获取成功");
		return res;
	}

	/**
	 * 检测记录
	 * testingRec:[{
	 * 				 time:"检测时间",
	 * 				 item:"检测项目",
	 * 				 detail:"[{
	 * 						   quota:"检测指标",
	 * 						   value:"检测值",
	 * 					  	   normal:"检测标准"
	 * 						  }]",
	 * 				 organ:"检测机构",
	 * 				 tester:"检测员",
	 * 				 icon:"检测图片"
	 * 				}]
	 * 
	 * 加工记录
	 * machiningRec:[{time:"加工时间",content:"加工内容",operator:"操作员"}]
	 * 
	 * 分配记录
	 * distributeRec:[{time:"配送时间",destination:"配送目的地",distributor:"配送员"}]
	 * 
	 */
	@SuppressWarnings("unchecked")
	@Override
	public Response addBatch(Map map) {
		Response res = new Response();
		String productId = MapUtils.getString(map, "productId"); // 产品id
		String companyId = MapUtils.getString(map, "companyId"); // 公司id
		String userType = MapUtils.getString(map, "userType"); // 
		String listedTime = MapUtils.getString(map, "listedTime"); // 上市时间
		String quotaDesc = MapUtils.getString(map, "quotaDesc"); // 指标描述
		String testingRec = MapUtils.getString(map, "testingRec"); // 检测记录，json
		String machiningRec = MapUtils.getString(map, "machiningRec"); // 加工记录，json
		String distributeRec = MapUtils.getString(map, "distributeRec"); // 分配记录，json
		
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(userType)
				||(StringUtil.isEmpty(productId))){
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		
		
		// TODO 生成条形码
		SimpleDateFormat sdf3 = new SimpleDateFormat("yyyyMMddHHmm");
		String barcode =sdf3.format(new Date()) + StringUtil.getRandomStr(4);
		map.put("barcode",barcode);
		// TODO 生成条形码图片
		EANCodeUtil.encode(barcode, 0, 40);
		String barcodeUrl = "br_" + barcode + ".png";
		map.put("barcodeUrl",barcodeUrl);
		// TODO 生成二维码
		String qrCodeContent = "";
		if(Cnst.USER_TYPE_NY.equals(userType)){
			//农业二维码
			qrCodeContent = SystemConfig.h5_page_url + barcode;
		}else if(Cnst.USER_TYPE_YY.equals(userType)){
			//渔业二维码
			qrCodeContent = SystemConfig.h5_fish_url + barcode;
		}else if(Cnst.USER_TYPE_DT.equals(userType)){
			//大田二维码
			qrCodeContent = SystemConfig.h5_datian_url + barcode;
		}
		QRCodeUtil.encode(qrCodeContent, 300, 300,barcode);
		String qrcodeUrl = "qr_" + barcode + ".png";
		map.put("qrcodeUrl",qrcodeUrl);
		
		if(!StringUtils.isEmpty(testingRec)) {
			try {
				JSONArray jsonArray = JSONObject.parseArray(testingRec);
				
				for(int i=0;i<jsonArray.size();i++) {
					JSONObject jsonObject = jsonArray.getJSONObject(i);
				
					String icon = jsonObject.getString("icon");
					String iconUrl = FileUtil.uploadBase64Img(icon); // 上传到七牛云
					jsonObject.put("icon", iconUrl);
				}
				
				map.put("testingRec",jsonArray.toJSONString());
				
			} catch (Exception e) {
				logger.error("解析testingRec时发生错误:"+e.getMessage());
				
				res.setMessage("修改失败");
				res.setStatusCode(-1);
				
				return res;
			}
		}
		
		int result = baseDao.update("source.source_batch_add", map);
		
		// 添加成功之后，批次数加一 
		if(result != -1) {
			map.put("count", 1);
			baseDao.update("source.source_product_updt_batch", map);
		} else {
			logger.error("执行sql->source_batch_add时失败");
		}
		
		
		res.setMessage("添加成功");
		res.setStatusCode(1);
		
		return res;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Response deleteBatch(Map map) {
		Response res = new Response();
		
		String ids = MapUtils.getString(map, "ids"); // 批次id，逗号隔开
		String productId = MapUtils.getString(map, "productId"); // 产品id
		String userType = MapUtils.getString(map, "userType"); 
		
		if(StringUtil.isEmpty(userType) || StringUtil.isEmpty(ids)){
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		
		int result = baseDao.update("source.source_batch_delate", map);
		
		// 删除成功之后，减少相应的批次 
		if(result != -1) {
			
			int count = 0 - result ;
				
			map.put("count", count);
				
			baseDao.update("source.source_product_updt_batch", map);
			
		} else {
			logger.error("执行sql->source_batch_delate时失败");
		}	
		
		res.setStatusCode(1);
		
		return res;
	}

	/**
	 * 检测记录
	 * testingRec:[{
	 * 				 time:"检测时间",
	 * 				 item:"检测项目",
	 * 				 detail:"[{
	 * 						   quota:"检测指标",
	 * 						   value:"检测值",
	 * 					  	   normal:"检测标准"
	 * 						  }]",
	 * 				 organ:"检测机构",
	 * 				 tester:"检测员",
	 * 				 icon:"检测图片"
	 * 				}]
	 * 
	 * 加工记录
	 * machiningRec:[{time:"加工时间",content:"加工内容",operator:"操作员"}]
	 * 
	 * 分配记录
	 * distributeRec:[{time:"配送时间",destination:"配送目的地",distributor:"配送员"}]
	 * 
	 */
	@Override
	public Response updateBatch(Map map) {
		Response res = new Response();
		
		String productId = MapUtils.getString(map, "productId"); // 产品id
		String companyId = MapUtils.getString(map, "companyId"); // 公司id
		String userType = MapUtils.getString(map, "userType"); // 
		String listedTime = MapUtils.getString(map, "listedTime"); // 上市时间
		String quotaDesc = MapUtils.getString(map, "quotaDesc"); // 指标描述
		
		String testingRec = MapUtils.getString(map, "testingRec"); // 检测记录，json
		String machiningRec = MapUtils.getString(map, "machiningRec"); // 加工记录，json
		String distributeRec = MapUtils.getString(map, "distributeRec"); // 分配记录，json
		
		if(!StringUtils.isEmpty(testingRec)) {
			try {
				JSONArray jsonArray = JSONObject.parseArray(testingRec);
				
				for(int i=0;i<jsonArray.size();i++) {
					JSONObject jsonObject = jsonArray.getJSONObject(i);
				
					String icon = jsonObject.getString("icon");
					String iconUrl = FileUtil.uploadBase64Img(icon); // 上传到七牛云
					jsonObject.put("icon", iconUrl);
				}
				
				map.put("testingRec",jsonArray.toJSONString());
				
			} catch (Exception e) {
				logger.error("解析testingRec时发生错误:"+e.getMessage());
				
				res.setMessage("添加失败");
				res.setStatusCode(-1);
				
				return res;
			}
		}
		
		int result = baseDao.update("source.source_batch_update", map);
		
		res.setMessage("修改成功");
		res.setStatusCode(1);
		
		return res;
	}

	@Override
	public Response queryBatch(Map map) {
		Response res = new Response();
		
		String companyId = MapUtils.getString(map, "companyId"); // 公司id
		String userType = MapUtils.getString(map, "userType"); // 公司id
		String productId = MapUtils.getString(map, "productId"); // 产品id
		
		if(StringUtils.isEmpty(companyId) 
				|| StringUtils.isEmpty(userType)
				|| StringUtils.isEmpty(productId)) {
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		
		List<Map<String, Object>> list = (List<Map<String, Object>>) baseDao.queryForList("source.source_batch_query", map);
		
		res.setStatusCode(1);
		res.setResult(list);
		
		return res;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Response addProduct(Map map) {
		Response res = new Response();
		
		String userType = MapUtils.getString(map, "userType"); // 用户类型
		String companyId = MapUtils.getString(map, "companyId"); // 公司id
		String areaNum = MapUtils.getString(map, "areaNum"); // 大棚/鱼塘编号
		String productName = MapUtils.getString(map, "productName"); // 产品名称
		String plantTime = MapUtils.getString(map, "plantTime"); // 种植时间
		String season = MapUtils.getString(map, "season"); // 种养季次
		String productDetail = MapUtils.getString(map, "productDetail"); // 种植作物
		String productType = MapUtils.getString(map, "productType"); // 品种
		String employeeId = MapUtils.getString(map, "employeeId"); // 负责人
		String remarks = MapUtils.getString(map, "remarks"); // 备注
		String productInformation = MapUtils.getString(map, "productInformation"); // 产品简介
		String productIcon = MapUtils.getString(map, "productIcon"); // 产品图片
		
		if(StringUtils.isEmpty(companyId) || StringUtils.isEmpty(userType)) {
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		if(StringUtils.isEmpty(productIcon)) {
			
			res.setStatusCode(-2);
			res.setMessage("请填写产品名称");
			return res;
		}
		if(StringUtils.isEmpty(productName)) {
			res.setStatusCode(-3);
			res.setMessage("请选择产品图片");
			return res;
		}
		if(StringUtils.isEmpty(plantTime)) {
			res.setStatusCode(-4);
			res.setMessage("请填写种植时间");
			return res;
		}
		if(StringUtils.isEmpty(productDetail)) {
			res.setStatusCode(-5);
			res.setMessage("请填写作物");
			return res;
		}
		if(StringUtils.isEmpty(productType)) {
			res.setStatusCode(-6);
			res.setMessage("请填写品种");
			return res;
		}
		
		//检测当前区域是否未完成的产品
		Integer cnt = (Integer) baseDao.queryForObject("source.get_product_state", map);
		if(cnt != null && cnt > 0){
			res.setStatusCode(-7);
			res.setMessage("当前所选区域有产品尚未归档");
			return res;
		}
		String productIconUrl = FileUtil.uploadBase64Img(productIcon); // 上传到七牛云
		map.put("productIcon", productIconUrl);
		baseDao.update("source.source_product_add", map);
		res.setStatusCode(1);
		return res;
	}

	@Override
	public Response deleteProduct(Map map) {
		Response res = new Response();
		
		String userType = MapUtils.getString(map, "userType"); // 用户类型
		
		String companyId = MapUtils.getString(map, "companyId"); // 公司id
		
		if(StringUtils.isEmpty(companyId) || StringUtils.isEmpty(userType)) {
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		baseDao.update("source.source_product_delete", map);
		res.setStatusCode(1);
		
		return res;
	}
	
	public Response getBatchById(Map map){
		Response res = new Response();
		Map<String, Object> result = (Map<String, Object>) baseDao.queryForObject("source.getBatchById", map);
		res.setStatusCode(1);
		res.setResult(result);
		return res;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Response shelves(Map map) {
		Response res = new Response();
		
		String batchIds =  MapUtils.getString(map, "batchIds"); // 批次id
		
		map.put("isShelve", "1"); // 上架
		
		int result = baseDao.delete("source.source_batch_updateIsShelve", map);
		
		res.setStatusCode(1);
		
		return res;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Response offShelf(Map map) {
		Response res = new Response();
		
		String batchIds =  MapUtils.getString(map, "batchIds"); // 批次id
		
		map.put("isShelve", "0"); // 下架
		
		int result = baseDao.update("source.source_batch_updateIsShelve", map);
		
		res.setStatusCode(1);
		
		return res;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Response archive(Map map) {
		Response res = new Response();
		
		String userType = MapUtils.getString(map, "userType"); // 用户类型
		
		String productId = MapUtils.getString(map, "productId"); // 产品名称
		
		if(StringUtil.isEmpty(userType)){
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		
		map.put("state", "1"); // 归档
		int result = baseDao.update("source.source_product_updtState", map);
		
		if(result < 1) {
			logger.error("归档失败");
			res.setMessage("归档失败");
			res.setStatusCode(-2);
		} else {
			res.setStatusCode(1);
		}
		
		return res;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Response queryProduct(Map map) {
		Response res = new Response();
		
		String userType = MapUtils.getString(map,"userType"); 
		String companyId = MapUtils.getString(map,"companyId"); // 公司id
		String productId = MapUtils.getString(map,"productId"); // 产品id
		
		Map<String,Object> result = null;
		
		if(StringUtil.isEmpty(userType) || StringUtil.isEmpty(productId)){
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		
		if (Cnst.USER_TYPE_NY.equals(userType)) {
			// 农业
			result = (Map<String,Object>) baseDao.queryForObject("source.source_product_query_g", map);
		} else if (Cnst.USER_TYPE_YY.equals(userType)) {
			// 渔业
			result = (Map<String,Object>) baseDao.queryForObject("source.source_product_query_f", map);
		} else if (Cnst.USER_TYPE_DT.equals(userType)) {
			// 大田
			result = (Map<String,Object>) baseDao.queryForObject("source.source_product_query_t", map);
		}
		res.setResult(result);
		res.setStatusCode(1);
		
		return res;
	}

	@Override
	public Response updateArchive(Map map) {
		Response res = new Response();
		
		String userType = MapUtils.getString(map,"userType"); 
		String companyId = MapUtils.getString(map,"companyId"); // 公司id
		String productId = MapUtils.getString(map,"productId"); // 产品id
		
		String productName = MapUtils.getString(map,"productName"); // 产品名称
		String productIcon = MapUtils.getString(map,"productIcon"); // 产品图片
		String productDetail = MapUtils.getString(map,"productDetail"); // 种养产品
		String productType = MapUtils.getString(map,"productType"); // 品种
		String plantTime = MapUtils.getString(map,"plantTime"); // 种养时间
		String batchCount = MapUtils.getString(map,"batchCount"); // 季次
		String employeeId = MapUtils.getString(map,"employeeId"); // 负责人
		String remarks = MapUtils.getString(map,"remarks"); // 备注
		String productInformation = MapUtils.getString(map,"productInformation"); // 产品简介
		
		String growthPic = MapUtils.getString(map,"growthPic"); // 生长期图片
		String fertilizationRec = MapUtils.getString(map,"fertilizationRec"); //施肥记录
		String pesticideRec = MapUtils.getString(map,"pesticideRec"); // 用药记录
		String farmingRec = MapUtils.getString(map,"farmingRec"); // 农事记录
		String authInfo = MapUtils.getString(map,"authInfo"); // 认证信息
		String growingCycles = MapUtils.getString(map,"growingCycles"); // 种植周期
		String seedSource = MapUtils.getString(map,"seedSource"); // 种子来源
		String webLinks = MapUtils.getString(map,"webLinks"); // 网店
		String shopAddress = MapUtils.getString(map,"shopAddress"); // 实体店地址
		String fertilizer = MapUtils.getString(map,"fertilizer"); // 土壤壤情
		String custom = MapUtils.getString(map,"custom"); //自定义模块
		
		if(StringUtil.isEmpty(userType) || StringUtil.isEmpty(companyId)){
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		
		String productIconUrl = FileUtil.uploadBase64Img(productIcon); // 上传到七牛云
		map.put("productIcon", productIconUrl);
		if(!StringUtils.isEmpty(growthPic)) {
			try {
				JSONArray jsonArray = JSONObject.parseArray(growthPic);
				for(int i=0;i<jsonArray.size();i++) {
					JSONObject jsonObject = jsonArray.getJSONObject(i);
					String icon = jsonObject.getString("icon");
					String iconUrl = FileUtil.uploadBase64Img(icon); // 上传到七牛云
					jsonObject.put("icon", iconUrl);
				}
				map.put("growthPic",jsonArray.toJSONString());
			} catch (Exception e) {
				res.setMessage("修改失败");
				res.setStatusCode(-1);
				return res;
			}
		}
		
		if(!StringUtils.isEmpty(authInfo)) {
			try {
				JSONArray jsonArray = JSONObject.parseArray(authInfo);
				for(int i=0;i<jsonArray.size();i++) {
					JSONObject jsonObject = jsonArray.getJSONObject(i);
					String icon = jsonObject.getString("icon");
					String iconUrl = FileUtil.uploadBase64Img(icon); // 上传到七牛云
					jsonObject.put("icon", iconUrl);
				}
				map.put("authInfo",jsonArray.toJSONString());
			} catch (Exception e) {
				res.setMessage("修改失败");
				res.setStatusCode(-1);
				return res;
			}
		}
		
		if(!StringUtils.isEmpty(seedSource)) {
			JSONObject jsonObject = JSONObject.parseObject(seedSource);
			try {
				String hgz = jsonObject.getString("hgz");
				String hgzUrl = FileUtil.uploadBase64Img(hgz); // 上传到七牛云
				jsonObject.put("hgz", hgzUrl);
				
				String sale = jsonObject.getString("sale");
				String saleUrl = FileUtil.uploadBase64Img(sale); // 上传到七牛云
				jsonObject.put("sale", saleUrl);
				
				String zjy = jsonObject.getString("zjy");
				String zjyUrl = FileUtil.uploadBase64Img(zjy); // 上传到七牛云
				jsonObject.put("zjy", zjyUrl);
				
				map.put("seedSource",jsonObject.toJSONString());
			} catch (Exception e) {
				logger.error("解析种源时发生错误:"+e.getMessage());
				res.setMessage("修改失败");
				res.setStatusCode(-1);
				return res;
			}
		}
		
		int result = 0;
		
		if (Cnst.USER_TYPE_NY.equals(userType)) {
			// 农业
			result = baseDao.update("source.source_product_updt_g", map);
		}  else if (Cnst.USER_TYPE_DT.equals(userType)){
			//大田
			result = baseDao.update("source.source_product_updt_t", map);
		}
		
		if(result < 1) {
			logger.error("更新失败");
			res.setMessage("更新失败");
			res.setStatusCode(-1);
		} else {
			res.setStatusCode(1);
		}
		return res;
	}
	
	@Override
	public Response updateFishArchive(Map map) {
		Response res = new Response();
		String companyId = MapUtils.getString(map,"companyId"); // 公司id
		String productId = MapUtils.getString(map,"productId"); // 产品id
		
		String productName = MapUtils.getString(map,"productName"); // 产品名称
		String productIcon = MapUtils.getString(map,"productIcon"); // 产品图片
		String productDetail = MapUtils.getString(map,"productDetail"); // 养殖产品
		String productType = MapUtils.getString(map,"productType"); // 养殖品种
		String plantTime = MapUtils.getString(map,"plantTime"); // 种养时间
		String employeeId = MapUtils.getString(map,"employeeId"); // 负责人
		String remarks = MapUtils.getString(map,"remarks"); // 备注
		String productInformation = MapUtils.getString(map,"productInformation"); // 产品简介
		
		String fishSource = MapUtils.getString(map,"fishSource"); // 鱼苗来源
		String growthPic = MapUtils.getString(map,"growthPic"); // 生长期图片
		String authInfo = MapUtils.getString(map,"authInfo"); // 认证信息
		String growInfo = MapUtils.getString(map,"growInfo"); // 成长记录
		String feedInfo = MapUtils.getString(map,"feedInfo"); // 饲料记录
		String vaccineInfo = MapUtils.getString(map,"vaccineInfo"); // 疫苗记录
		String drugInfo = MapUtils.getString(map,"drugInfo"); // 用药记录
		String webLinks = MapUtils.getString(map,"webLinks"); // 网店
		String shopAddress = MapUtils.getString(map,"shopAddress"); // 实体店地址
		
		
		String productIconUrl = FileUtil.uploadBase64Img(productIcon); // 上传到七牛云
		map.put("productIcon", productIconUrl);
		
		if(!StringUtils.isEmpty(fishSource)) {
			JSONObject jsonObject = JSONObject.parseObject(fishSource);
			try {
				String hgz = jsonObject.getString("hgzIcon");
				String hgzUrl = FileUtil.uploadBase64Img(hgz); // 上传到七牛云
				jsonObject.put("hgzIcon", hgzUrl);
				
				String sale = jsonObject.getString("saleIcon");
				String saleUrl = FileUtil.uploadBase64Img(sale); // 上传到七牛云
				jsonObject.put("saleIcon", saleUrl);
				map.put("fishSource",jsonObject.toJSONString());
			} catch (Exception e) {
				logger.error("解析鱼苗信息时发生错误:"+e.getMessage());
				res.setMessage("修改失败");
				res.setStatusCode(-1);
				return res;
			}
		}
		
		if(!StringUtils.isEmpty(growthPic)) {
			try {
				JSONArray jsonArray = JSONObject.parseArray(growthPic);
				for(int i=0;i<jsonArray.size();i++) {
					JSONObject jsonObject = jsonArray.getJSONObject(i);
					String icon = jsonObject.getString("icon");
					String iconUrl = FileUtil.uploadBase64Img(icon); // 上传到七牛云
					jsonObject.put("icon", iconUrl);
				}
				map.put("growthPic",jsonArray.toJSONString());
			} catch (Exception e) {
				res.setMessage("修改失败");
				res.setStatusCode(-1);
				return res;
			}
		}
		
		if(!StringUtils.isEmpty(authInfo)) {
			try {
				JSONArray jsonArray = JSONObject.parseArray(authInfo);
				for(int i=0;i<jsonArray.size();i++) {
					JSONObject jsonObject = jsonArray.getJSONObject(i);
					String icon = jsonObject.getString("icon");
					String iconUrl = FileUtil.uploadBase64Img(icon); // 上传到七牛云
					jsonObject.put("icon", iconUrl);
				}
				map.put("authInfo",jsonArray.toJSONString());
			} catch (Exception e) {
				res.setMessage("修改失败");
				res.setStatusCode(-1);
				return res;
			}
		}
		
		int result = baseDao.update("source.source_product_updt_f", map);
		
		if(result < 1) {
			logger.error("更新失败");
			res.setMessage("更新失败");
			res.setStatusCode(-1);
		} else {
			res.setStatusCode(1);
		}
		return res;
	}

	@Override
	public Response scanCount(Map map) {
		Response res = new Response();
		
		String companyId = MapUtils.getString(map,"companyId"); // 公司id
		String userType = MapUtils.getString(map,"userType");
		 
		String startTime = MapUtils.getString(map,"startTime");
		String endTime = MapUtils.getString(map,"endTime");
		String productId = MapUtils.getString(map,"productId");
		String productName = MapUtils.getString(map,"productName");
		
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(userType)){
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		
		try {
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");


			Date startDate = sdf.parse(startTime); // 开始时间
			Date endDate = sdf.parse(endTime); // 结束时间
			
			Calendar cl = Calendar.getInstance();

			// 计算两个日期之间的月数
			cl.setTime(startDate); // 开始时间

			int startYear = cl.get(Calendar.YEAR);
			int startMonth = cl.get(Calendar.MONTH); // 当年的第多少月

			cl.setTime(endDate); // 开始时间

			int endYear = cl.get(Calendar.YEAR);
			int endMonth = cl.get(Calendar.MONTH); // 当年的第多少月

			int xLength = 0; // 月数

			if (startYear != endYear) { // 不同年份
				int timeDistance = 0;
				for (int i = startYear; i < endYear; i++) {
					timeDistance += 12;
				}

				xLength = timeDistance + (endMonth - startMonth);
			} else { // 同一年
				xLength = endMonth - startMonth;
			}
			
			logger.debug("xLength:"+xLength);
			
			// x轴的值
			String[] x = new String[xLength + 1]; // 要加上边界
//			String[] xFull = new String[xLength + 1]; // 把年月日都记录下来，方便后续y轴数据的处理
			
			// 给x轴赋值
			for (int i = 0; i < x.length; i++) {

				cl.setTime(startDate);
				cl.add(Calendar.MONTH, i);

				int year = cl.get(Calendar.YEAR);
				int month = cl.get(Calendar.MONTH) + 1;
				String monStr = month + "";
				if(month < 10){
					monStr = "0" + month;
				}
				int day = cl.get(Calendar.DAY_OF_MONTH);
				String dayStr = day + "";
				if(day < 10){
					dayStr = "0" + day;
				}

				x[i] = year + "-" + monStr;
				
				logger.debug("x[i]:"+x[i]);
				
			}
			
			// 获取月份列表之后，循环查询，因为这么做比较简单，并且数据量上来也是OK的
			// 先查询此公司下所有产品
			List<Map<String,Object>> proList = (List<Map<String,Object>>) baseDao.queryForList("source.source_scan_query_pro", map);
			if(proList == null) {
				logger.error("此公司暂无产品，companyId:"+companyId);
				res.setResult(null);
				res.setStatusCode(1);
				return res;
			}
			
			List<ScanCountBean> result = new ArrayList<ScanCountBean>(); // 最终结果
			
			// 初始化数据
			for(Map<String,Object> m : proList) {
				
				String proName = MapUtils.getString(m, "productName");
				
				int[] dataList = new int[x.length];
				
				ScanCountBean resMap = new ScanCountBean(proName, dataList);
				
				result.add(resMap);
			}
			
			// 循环月份，统计某月的数据
			for(int i = 0; i < x.length; i++) {
				
				String month = x[i]; // 月份
				
				map.put("month", month);
				
				List<Map<String,Object>> list = (List<Map<String,Object>>) baseDao.queryForList("source.source_scanCount", map);
				if(list == null || list.size() == 0) {
					
				} else {
					// 有数据
					for(Map<String,Object> monthData : list) {
						String proName = MapUtils.getString(monthData, "productName");
						int scanMonth = MapUtils.getIntValue(monthData, "scanMonth"); // 统计出来的数据
						
						for(int j = 0; j < result.size(); j++) {
							
							ScanCountBean resMap = result.get(j);
							 
							String key = resMap.getName();
							
							if(key.equals(proName)) {
								resMap.getData()[i] = scanMonth; 
							}
							
						}
						
					}
				}
				
			}
			
			Map<String,Object> resultMap = new HashMap<String,Object>();
			resultMap.put("x", x);
			resultMap.put("y", result);
			
			res.setResult(resultMap);
			res.setStatusCode(1);
			
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
		}
		
		
		return res;
	}

	@Override
	public Response scanArea(Map map) {
		Response res = new Response();
		
		String companyId = MapUtils.getString(map,"companyId"); // 公司id
		String userType = MapUtils.getString(map,"userType");
		
		if(StringUtil.isEmpty(companyId) || StringUtil.isEmpty(userType)){
			res.setStatusCode(Cnst.RESULT_CODE_PARAM_EMPTY);
			res.setMessage(Cnst.RESULT_MSG_PARAM_EMPTY);
			return res;
		}
		
		List<Map<String,Object>> proList = (List<Map<String,Object>>) baseDao.queryForList("source.source_scanArea_queryProducts", map);
		
		List<Map<String,Object>> result = new ArrayList<Map<String,Object>>(); // 返回结果
		
		if(proList != null) {
			
			for(Map<String,Object> m : proList) {
				
				String sourceId = MapUtils.getString(m,"id");
				String productName = MapUtils.getString(m,"product_name");
				
				Map<String,Object> paraMap = new HashMap<String,Object>(); // sql语句参数
				paraMap.put("companyId", companyId);
				paraMap.put("sourceId", sourceId);
				
				// 查询统计数据
				List<Map<String,Object>> areaCountList = (List<Map<String,Object>>) baseDao.queryForList("source.source_scanArea", paraMap);
				
				Map<String,Object> resultMap = new HashMap<String,Object>(); 
				resultMap.put("name", productName);
				resultMap.put("data", areaCountList);
				
				result.add(resultMap);
				
			}
			
		} else {
			logger.error("找不到数据,companyId:"+companyId);
		}
		
		res.setStatusCode(1);
		res.setResult(result);
		
		return res;
	}
	
}
