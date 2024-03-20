package cn.lookout.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.Method;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.google.gson.Gson;

import cn.lookout.base.bean.Response;
import cn.lookout.base.service.ILoginService;

public class LoginServlet extends HttpServlet {

	private final static Log log = LogFactory.getLog(LoginServlet.class);

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
		
//		PrintWriter pw = response.getWriter();
		ApplicationContext app = WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());
		ILoginService loginService = (ILoginService) app.getBean("loginService");
		String method = request.getParameter("method");// 获取请求类型
		Response responseObj = null;
		Gson gson = new Gson();
		try {
			Map requestMap = new HashMap();
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
			
			log.info("********************************************************");
			log.info("请求参数:" + gson.toJson(requestMap));
			log.info("********************************************************");
			
			Method methodClass = null;
			methodClass = loginService.getClass().getMethod(method, Map.class);
			responseObj = (Response) methodClass.invoke(loginService , requestMap);
			if(responseObj != null && responseObj.getStatusCode() == 200){
				request.getRequestDispatcher(responseObj.getMessage()).forward(request,response);
				log.info("==========================================================");
				log.info("跳转到:" + responseObj.getMessage());
				log.info("==========================================================");
				return;
			}else{
				String returnStr = gson.toJson(responseObj);
				log.info("==========================================================");
				log.info("返回参数:" + returnStr);
				log.info("==========================================================");
				PrintWriter pw = response.getWriter();
				response.setCharacterEncoding("UTF-8");
				pw.write(returnStr);
				pw.flush();
				pw.close();
			}
		}catch (Exception e) {// 抛出异常时才会进入这个方法
			StringWriter sw = new StringWriter();
            PrintWriter pwt = new PrintWriter(sw, true);
            e.printStackTrace(pwt);   
            pwt.flush();   
            sw.flush();   
	        log.error(sw.toString());
			responseObj.setStatusCode(-1);
			responseObj.setMessage("系统繁忙，请稍后再试！");
		}
		finally{
			//pw.flush();
			//pw.close();
		}
	}
}
		
