package cn.lookout.base.bean;

import java.util.List;

public class UserGfFishListBean {

	private String companyId;
	
	private String type;
	
	private List<UserGfFishInfoBean> list;

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<UserGfFishInfoBean> getList() {
		return list;
	}

	public void setList(List<UserGfFishInfoBean> list) {
		this.list = list;
	}
	
}
