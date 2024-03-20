package cn.lookout.common;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import org.apache.commons.codec.language.RefinedSoundex;
import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;

import com.google.gson.Gson;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;


public class RedisUtils
{
	/**
     * 链接
     */
    private static Jedis jedis;
    /**
     * 默认127.0.0.1
     */
    private static String url;
    /**
     * 默认6379端口
     */
    private static int port;
    /**
     * redis认证密码
     */
    private static String password;
//    private static String password = null;
    /**
     * 是否为使用redisPool
     */
    private static boolean isPool = true;
    /**
     * 设置默认的超时时间10s
     */
    private static int timeout = 1000;
    /**
     * redis池
     */
    private static JedisPool jedisPool;

    private static GenericObjectPoolConfig poolConfig = new GenericObjectPoolConfig();

    static {
        //初始化redis
        initRedis();
    }

    /**
     * 获取Jedis 实例
     *
     * @return
     */
    public static Jedis getJedis() {
        try {
			if (isPool){
			    if (jedisPool==null){
			        jedisPool=new JedisPool(poolConfig,url,port,timeout,password);
			    }
			    return jedisPool.getResource();
			}else {
			    if (jedis == null) {
			        jedis = new Jedis(url, port);
			    }
			    return jedis;
			}
		} catch (Exception e) {
			e.printStackTrace();
	        System.out.println("连接jedisPool失败!");
	        return null;
		}
    }

    /**
     * 将String/Map设置到redis中
     *
     * @param key   键
     * @param value 值
     */
	@SuppressWarnings("unchecked")
	public static void set(String key, Object value) {
		
		Jedis j = getJedis();
		
		try {
			if(value instanceof String){
				j.set(key, (String) value);
			} else if(value instanceof Map){
				j.hmset(key, (Map<String, String>) value);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			close(j);
		}
    }
	
	/**
	 * set数据，并设置超时时间
	 * @param key
	 * @param validTime 超时时间，到期自动清除，单位:毫秒
	 * @param value
	 */
	public static void setex(String key,long validTime,String value){
		
		Jedis j = getJedis();
		
		try {
			int seconds = (int)(validTime/1000);
			j.setex(key, seconds, value);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			close(j);
		}
		
		
	}
	
	
	public static void setMapKeyValue(String key,String mapKey,String mapValue){
		Jedis j = getJedis();
		try {
			j.hset(key, mapKey, mapValue);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			close(j); // 关闭
		}
		
	}
    
    /**
     * 设置过期时间
     * @param key
     * @param seconds
     */
    public static void setExpire(String key,int seconds){
    	getJedis().expire(key, seconds);
    }

    /**
     * 通过键获取String
     *
     * @param key 键
     * @return
     */
    public static String getString(String key) {
    	
    	Jedis j = getJedis();
    	
    	String result = "";
		try {
			result = j.get(key);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally{
			close(j);
		}
    	
        return result;
    }
    
    public static List<String> getList(String key){
    	Jedis j = getJedis();
    	List<String> result = null;
		try {
			result = j.lrange(key,0,-1);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally{
			close(j);
		}
    	
        return result;
    }
    
    public static Map<String, String> getMap(String key){
    	
    	Jedis j = getJedis();
    	Map<String, String> map = null;
		try {
			map = j.hgetAll(key);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally{
			close(j); // 关闭连接
		}
    	
    	return map;
    }
    
    public static Object getMap(String key , String field){
    	
    	Jedis j = getJedis();
    	
    	Object result = null;
    	
    	try {
			if(field == null) {
				result = j.hgetAll(key);
			} else {
				result = j.hget(key, field);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally{
			close(j); // 关闭连接
		}
    	
    	return result;
    }

    /**
     * 将List数组存进redis中
     *
     * @param key    键
     * @param list   String的List对象
     * @param isHead 是否每次插入从头部进行插入
     * @param isClean 是否清空
     */
    public static void setList(String key, List<String> list, boolean isHead , boolean isClean) {
    	if(list != null && list.size() > 0){
    		Jedis j = getJedis();
        	try {
    			String[] arr = new String[list.size()];
    			list.toArray(arr);
    			if(isClean){
    				j.del(key);
    			}
    			//判断是不是从头部开始插入
    			if (isHead) {
    			    j.lpush(key, arr);
    			} else {
    			   j.rpush(key, arr);
    			}
    		} catch (Exception e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		} finally{
    			close(j); // 关闭连接
    		}
    	}
    }

    public static void addList(String key, String listStr) {
    	Jedis j = getJedis();
    	try {
			j.rpush(key, listStr);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally{
			close(j); // 关闭连接
		}
    }
    
    /**
     * 获取redis中的数组
     *
     * @param key   键
     * @param start 开始
     * @param end   结束
     * @return
     */
    public static List<String> getList(String key, long start, long end) {
    	Jedis j = getJedis();
    	List<String> list = null;
		try {
			list = j.lrange(key, start, end);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally{
			close(j);
		}
    	
        return list;
    }

    /**
     * redis存储对象
     *
     * @param key 键
     * @param obj 对象
     * @throws IOException
     */
    public static void setObject(String key, Object obj) throws IOException {
    	Jedis j = getJedis();
    	try {
			if (obj != null) {
				Gson gson = new Gson();
			    String value = gson.toJson(obj);
			    j.set(key, value);
			} else {
			    throw new NullPointerException("没有找到该类");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			close(j);
		}
    }
    
    /**
     * 获取所有key
     * @param pattern
     * @return
     */
    public static Set<String> getKeys(String preStr){
    	Set<String> result = null;
    	Jedis j = getJedis();
		try {
			result = j.keys(preStr +"*");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			close(j);
		}
        return result;
    }
    
    /**
     * 删除key 通配符
     */
    public static void delKeys(String preStr){
    	Jedis j = getJedis();
    	 try {
			Set<String> set = j.keys(preStr +"*");  
			 Iterator<String> it = set.iterator();  
			 while(it.hasNext()){  
			     String keyStr = it.next();  
			     j.del(keyStr);  
			 }
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			close(j);
		}
    }
    
    public static void updateList(String key , int index , String value){
    	Jedis j = getJedis();
    	try {
			j.lset(key, index, value);
		} catch (Exception e) {
			//超出长度
		}finally {
			close(j);
		}
    }
    
    public static void deleteList(String key){
    	Jedis j = getJedis();
    	try {
    		j.lrem(key, 0, "del");
		} catch (Exception e) {
			//超出长度
		}finally {
			close(j);
		}
    }

    /**
     * 关闭连接
     * @param jedis 需要关闭的连接
     */
    public static void close(Jedis jedis) {
    	if(jedis != null) {
    		jedis.close();
    	}
    }
    
    
    /**
     * 初始化redis参数操作
     */
    private static void initRedis() {
        Properties properties = new Properties();
        try {
            //设置
            InputStream inputStream = RedisUtils.class.getResourceAsStream("/redis.properties");
            if (inputStream == null) {
            	//使用默认redis配置
                jedis = new Jedis();
            } else {
                properties.load(inputStream);
                //判断是否使用pool 如果不使用则是单例的redis
                String proisPool = properties.getProperty("redis.isPool");
                String proUrl = properties.getProperty("redis.url");
                String proProt = properties.getProperty("redis.port");
                String proPass = properties.getProperty("redis.password").trim();
                //设置全局的配置
                url = proUrl;
                port = Integer.valueOf(proProt);
                password=proPass;
                if (proisPool != null && "true".equals(proisPool.trim())) {
                    //设置全局判断变量为true
                    isPool=true;
//                    log.debug("开始执行pool的创建工作");
                    jedisPool = new JedisPool(poolConfig, url, port, timeout, password);
                    /**
                     * 设置默认的redis
                     */
                    try {
                        jedis = jedisPool.getResource();
                   } catch (Exception e) {
                	   e.printStackTrace();
                       System.out.println("连接jedisPool失败!");
                   }
                } else {
//                    log.debug("开始执行单例redis");
                    if (proUrl != null && proProt != null) {
                        url = proUrl;
                        port = Integer.valueOf(proProt);
                    }
                    jedis = new Jedis(url, port);
                }
            }
        } catch (IOException e) {
            System.err.println("cant find redis.properties file,load default set ---->127.0.0.1->6379");
            e.printStackTrace();
        }
    }

    /**
     * 设置该类不能实例化
     */
    private RedisUtils() {
    }
    
    public static void main(String[] args) throws InterruptedException {
    }
    
}