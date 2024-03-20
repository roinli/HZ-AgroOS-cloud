package cn.lookout.base.bean;

import java.util.List;

public class JsTreeNodeBean {
	private int id;
	private String text;
	private List<JsTreeChildBean> children;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public List<JsTreeChildBean> getChildren() {
		return children;
	}
	public void setChildren(List<JsTreeChildBean> children) {
		this.children = children;
	}
	
	
}
