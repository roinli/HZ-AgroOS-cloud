package cn.lookout.base.bean;

/**
 * 扫码统计
 * @author lxl
 *
 */
public class ScanCountBean {

	private String name;
	private int[] data;
	
	public ScanCountBean() {
		
	}
	
	public ScanCountBean(String name,int[] data) {
		this.name = name;
		this.data = data;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int[] getData() {
		return data;
	}
	public void setData(int[] data) {
		this.data = data;
	}
	
}
