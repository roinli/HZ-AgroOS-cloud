package cn.lookout.base.bean;

import java.util.List;

public class MenuBean {
	
	private int id;
	private String menuName;
	private String menuUrl;
	private String menuFlag;
	private String img;
	private List<MenuChildBean> childList;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public String getMenuUrl() {
		return menuUrl;
	}
	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}
	public String getMenuFlag() {
		return menuFlag;
	}
	public void setMenuFlag(String menuFlag) {
		this.menuFlag = menuFlag;
	}
	public List<MenuChildBean> getChildList() {
		return childList;
	}
	public void setChildList(List<MenuChildBean> childList) {
		this.childList = childList;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	
	
}
