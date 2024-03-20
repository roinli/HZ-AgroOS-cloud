package cn.lookout.base.bean;


public class Response {
	private Integer statusCode;
	private String message;
	private Object result;
	private String token;
	
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Response() {
	}
	
	public Response(Integer statusCode, String message) {
		this.statusCode = statusCode;
		this.message = message;
	}
	
	public Integer getStatusCode() {
		return this.statusCode;
	}
	
	public void setStatusCode(Integer statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
	}
	
}