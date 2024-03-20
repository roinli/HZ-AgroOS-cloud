package cn.lookout.base.constant;

import java.util.HashMap;
import java.util.Map;

import cn.lookout.base.bean.DeviceMapBean;

/**
 * 存储一些常用的常量
 * @author lixiaolong
 *
 */
public class Cnst {
	
	/**
	 * redis存储的用户登录验证码的前缀,key=前缀+手机号
	 * set  就是普通的已key-value 方式存储数据，可以设置过期时间。
	 * hset 则是以hash 散列表的形式存储。超时时间只能设置在 大 key 上，单个 filed 则不可以设置超时 
	 */
	public final static String REDIS_KEY_VERIFCODE_LOGIN = "VCODE_L_";
	
	/**
	 * 用户类型，超级管理员
	 */
	public final static String USER_TYPE_SUPER = "100";
	
	/**
	 * 用户类型，管理员
	 */
	public final static String USER_TYPE_ADMIN = "99";
	
	/**
	 * 用户类型，农业
	 */
	public final static String USER_TYPE_NY = "0";
	
	/**
	 * 用户类型，渔业
	 */
	public final static String USER_TYPE_YY = "1";
	
	/**
	 * 用户类型，大田
	 */
	public final static String USER_TYPE_DT = "2";
	
	/**
	 * 用户类型，仓库
	 */
	public final static String USER_TYPE_CK = "3";
	
	
	public final static String LOGIN_TYPE_PC = "0";
	public final static String LOGIN_TYPE_MOBILE = "1";
	
	public final static String AVG = "avg";
	public final static String MAX = "max";
	public final static String MIN = "min";
	public final static String NOW = "now";
	
	public final static int RESULT_CODE_PARAM_EMPTY = -400;
	public final static String RESULT_MSG_PARAM_EMPTY = "参数不能为空";
	
	
}
