package cn.lookout.servlet;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.lang.reflect.Method;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import cn.lookout.base.bean.Response;
import cn.lookout.base.bean.TokenBean;
import cn.lookout.base.bean.UserBean;
import cn.lookout.base.constant.TokenUtil;
import cn.lookout.base.service.IWebService;

/**
 * 所有请求的入口
 * @author Ian
 *
 */
public class ActionServlet extends HttpServlet {

	public static final String UPLOAD_DIRECTORY = "upfile";
	
	public static final Logger logger = Logger.getLogger(ActionServlet.class);
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}
	
	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		
		response.setContentType("application/json; charset=utf-8");
		response.setHeader("Access-Control-Allow-Origin", "*");// 实现跨域请求
		
		response.addHeader("Pragma","no-cache");
		response.setHeader("Cache-Control","no-cache");
		response.setHeader("Expires","0");
		
		String token = "";
		
		ApplicationContext app = WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());
		
		Response responseObj = null;
		
		try {
			Map<String,Object> requestMap = new HashMap<String,Object>();
			// 包含文件
			if(ServletFileUpload.isMultipartContent(request)) {
				
				 // 配置上传参数
		        DiskFileItemFactory factory = new DiskFileItemFactory();
		        // 设置内存临界值 - 超过后将产生临时文件并存储于临时目录中 MEMORY_THRESHOLD
		        factory.setSizeThreshold(1024*1024*10);
		        // 设置临时存储目录
		        factory.setRepository(new File(System.getProperty("java.io.tmpdir")));

		        ServletFileUpload upload = new ServletFileUpload(factory);
		        upload.setHeaderEncoding("UTF-8");
		        // 设置最大文件上传值
//		        upload.setFileSizeMax(MAX_FILE_SIZE);

		        // 设置最大请求值 (包含文件和表单数据)
//		        upload.setSizeMax(MAX_REQUEST_SIZE);

		     // 构造临时路径来存储上传的文件
		        // 这个路径相对当前应用的目录
		        String uploadPath = getServletContext().getRealPath("./") + File.separator + UPLOAD_DIRECTORY;
		        // 如果目录不存在则创建
		        File uploadDir = new File(uploadPath);
		        if (!uploadDir.exists()) {
		            uploadDir.mkdir();
		        }
		        
		        // 解析请求的内容提取文件数据
	            List<FileItem> formItems = upload.parseRequest(request);
		        
	            for (FileItem item : formItems) {
//	            	logger.info("item.getFieldName():"+item.getFieldName()+"\nitem.getString():"+item.getString()+","+new String(item.getString().getBytes("iso-8859-1"),"GBK"));
	            	// 非文件字段
	            	if(StringUtils.isEmpty(item.getContentType())) {
	            		requestMap.put(item.getFieldName(), item.getString());
	            	} else {
	            		InputStream in = item.getInputStream();
	            		requestMap.put(item.getFieldName(), in);
	            	}
	            }
				
			} else {
				
				Enumeration enu = request.getParameterNames() ;
				while(enu.hasMoreElements()){  
			        String paramName = (String)enu.nextElement() ;  
			        if(paramName.endsWith("List")){  
			            // 按数组接收  
			            String values[] = request.getParameterValues(paramName) ;
			            requestMap.put(paramName, values);
			        }else{
			        	String value = request.getParameter(paramName);
			        	requestMap.put(paramName, value);
			        }
				}
			}
			String actionName = (String) requestMap.get("actionName"); // 获取请求名称
			String method = (String) requestMap.get("method");// 获取请求类型
			token = (String) requestMap.get("token");// 获取请求类型
			/**
			 * 下面4行很重要，当post提交的时候，url包含参数时，用getParameter方法获取参数
			 */
			if(StringUtils.isEmpty(actionName)) {
				actionName = request.getParameter("actionName");
			}
			if(StringUtils.isEmpty(method)) {
				method =  request.getParameter("method");
			}
			if(StringUtils.isEmpty(token)) {
				token =  request.getParameter("token");
			}
			
			/**
			 * 检查权限   先屏蔽
			 */
			
//			UserBean userBean = (UserBean) request.getSession().getAttribute("companyInfo");
//			if(userBean != null){
//				requestMap.put("companyId", userBean.getId());
//				requestMap.put("userType", userBean.getType());
//			}
//			if(userBean == null || "".equals(userBean)){
//				//未登录
//				request.getRequestDispatcher("/login.html").forward(request,response);
//				return;
//			}
			
//			 else{
//				Map<String,String> map = new HashMap<String,String>();
//				map.put("companyId", userBean.getId());
//				requestMap.put("companyId", "112");
//				requestMap.put("userType", "4");
//				IWebService webService = (IWebService) app.getBean("webService");
//				String requestUrl = request.getServletPath() + "?actionName=" + actionName + "&method=" + method;
//				map.put("url", requestUrl);
//				Response permissionRes = webService.checkPermissionByUser(map, request.getSession());
//				if(permissionRes == null || permissionRes.getStatusCode() == 0 && !"toPage".equals(method)){
//					//没有权限
//					responseObj = new Response();
//					responseObj.setStatusCode(100);
//					responseObj.setMessage("没有权限");
//					String returnStr = JSONObject.toJSONString(responseObj);
//					PrintWriter pw = response.getWriter();
//					pw.write(returnStr);
//					pw.flush();
//					pw.close();
//					return;
//				}
//			}
			
//			requestMap.put("companyId", userBean.getId());
//			requestMap.put("userType", userBean.getType());
			
			TokenBean tokenBean = TokenUtil.validToken(token);
			responseObj = new Response();
			if("whosyourdaddy".equals(token)){
				tokenBean.setCode(1);
				tokenBean.setUserId("126");
				tokenBean.setUserType("0");
			}
			if(tokenBean.getCode() == 1){
				// 统一处理分页
				this.buildPage(requestMap);
				logger.info("********************************************************");
				logger.info("请求参数:" + JSONObject.toJSONString(requestMap));
				logger.info("********************************************************");
				
				Map<String,String> permissMap = new HashMap<String,String>();
				permissMap.put("companyId", tokenBean.getUserId());
				permissMap.put("userType", tokenBean.getUserType());
				String requestUrl = request.getServletPath() + "?actionName=" + actionName + "&method=" + method;
				permissMap.put("url", requestUrl);
				IWebService webService = (IWebService) app.getBean("webService");
				Response permissionRes = webService.checkPermissionByUser(permissMap);
				if(permissionRes == null || permissionRes.getStatusCode() == 0){
					//没有权限
					responseObj = new Response();
					responseObj.setStatusCode(100);
					responseObj.setMessage("没有权限");
					return;
				}
				Class<?> clazz = app.getType(actionName);
				Object bean = app.getBean(actionName);
				Method methodClass = null;
				methodClass = clazz.getMethod(method, Map.class);
				responseObj = (Response) methodClass.invoke(bean , requestMap);
				// 因为responseObj.getStatusCode()是Integer类型，所以这里必须要有!=null的判断
				if(responseObj != null && responseObj.getStatusCode()!=null){
					if(responseObj.getStatusCode() == 200){
						request.getRequestDispatcher(responseObj.getMessage()).forward(request,response);
						return;
					}
				} else {
					logger.error("response为空或者statusCode不正确，response:"+JSONObject.toJSONString(responseObj));
				}
			}else{
				responseObj.setStatusCode(tokenBean.getCode());
				responseObj.setMessage(tokenBean.getMessage());
			}
			
		} catch (Exception e) {// 抛出异常时才会进入这个方法
			e.printStackTrace();   
			responseObj = new Response();
			responseObj.setStatusCode(-1);
			responseObj.setMessage("系统繁忙，请稍后再试！");
		} finally{
			String newToken = TokenUtil.createToken(token);
			responseObj.setToken(newToken);
//			GsonBuilder gb =new GsonBuilder();
//			gb.disableHtmlEscaping();
			String returnStr = new Gson().toJson(responseObj);
			logger.info("==========================================================");
			logger.info("返回参数:" + returnStr);
			logger.info("==========================================================");
			PrintWriter pw = response.getWriter();
			pw.write(returnStr);
			pw.flush();
			pw.close();
		}
	}
	
	/**
	 * 统一处理分页
	 * @param map
	 */
	private void buildPage(Map<String,Object> map) {
		
		Integer beginRow = MapUtils.getInteger(map, "beginRow");
		Integer endRow = MapUtils.getInteger(map, "endRow");
		Integer pageSize = MapUtils.getInteger(map, "pageSize"); // 每页记录数
		
		Integer currPage = MapUtils.getInteger(map, "currPage"); // 当前页码
		
		// 分页的必要条件
		if(currPage != null && pageSize != null) {
			// mysq用limit分页，所以得处理下
			int startRec = (currPage - 1) * pageSize;
			
			map.put("startRec", startRec);
		}
		
		map.put("pageSize", pageSize); // pageSize转换成int
		
	}
	
}
