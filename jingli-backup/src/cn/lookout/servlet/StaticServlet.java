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

import cn.lookout.base.bean.Response;

/**
 * 静态资源请求的入口
 * @author lxl
 *
 */
public class StaticServlet extends HttpServlet {
	
	public static final Logger logger = Logger.getLogger(StaticServlet.class);
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doPost(request, response);
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
		
		PrintWriter pw = response.getWriter();
		
		ApplicationContext app = WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());
		
		Response responseObj = null;
		
		try {
			Map<String,Object> requestMap = new HashMap<String,Object>();
			// 包含文件
				
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
			
			String actionName = (String) requestMap.get("actionName"); // 获取请求名称
			String method = (String) requestMap.get("method");// 获取请求类型
			
			/**
			 * 下面4行很重要，当post提交的时候，url包含参数时，用getParameter方法获取参数
			 */
			if(StringUtils.isEmpty(actionName)) {
				actionName = request.getParameter("actionName");
				requestMap.put("actionName",actionName);
			}
			if(StringUtils.isEmpty(method)) {
				method =  request.getParameter("method");
				requestMap.put("method",method);
			}
			
			logger.info("********************************************************");
			logger.info("请求参数:" + JSONObject.toJSONString(requestMap));
			logger.info("********************************************************");

			// 权限检查
//			if(this.checkAuth(requestMap)) {
//				
//			} else {
//				responseObj = new Response();
//				responseObj.setStatusCode(-1);
//				responseObj.setMessage("非法请求");
//				String returnStr = JSONObject.toJSONString(responseObj);
//				pw.write(returnStr);
//				logger.error("请求不合法，actionName："+actionName);
//				return ;
//			}
			
			// 统一处理分页
			this.buildPage(requestMap);
			
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
				}else{
					String returnStr = JSONObject.toJSONString(responseObj);
					pw.write(returnStr);
					logger.info("==========================================================");
					logger.info("返回参数:" + returnStr);
					logger.info("==========================================================");
				}
			} else {
				logger.error("response为空或者statusCode不正确，response:"+JSONObject.toJSONString(responseObj));
			}
			
		} catch (Exception e) {// 抛出异常时才会进入这个方法
			e.printStackTrace();   
            responseObj = new Response();
			responseObj.setStatusCode(-1);
			responseObj.setMessage("系统繁忙，请稍后再试！");
			String returnStr = JSONObject.toJSONString(responseObj);
			pw.write(returnStr);
			
		} finally{
			pw.flush();
			pw.close();
		}
	}
	
	/**
	 * 权限检查
	 * @param map
	 */
	public boolean checkAuth(Map<String,Object> map) {
		
		/**
		 * 本来应该是规定某些url可以被访问
		 * 这里为了方便，约定STC(static)开头的整个service都能被访问
		 */
		String actionName = MapUtils.getString(map, "actionName"); // 获取请求名称
		
		if(!StringUtils.isEmpty(actionName) && actionName.startsWith("STC")) {
			return true;
		}
		
		return false;
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
