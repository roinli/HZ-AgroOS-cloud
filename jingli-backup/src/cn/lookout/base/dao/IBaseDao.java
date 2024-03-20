package cn.lookout.base.dao;


import java.util.List;

public interface IBaseDao {

	public Object insert(String key,Object parameterObject);
	
	public int delete(String key,Object parameterObject);
	
	public int update(String key,Object parameterObject);
	
	public List<?> queryForList(String key,Object parameterObject);
	
	public Object queryForObject(String key,Object parameterObject);
	
}
