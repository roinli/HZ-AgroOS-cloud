package cn.lookout.base.bean;

/**
 * @Description 仓库bean
 * @author   	liwenhui
 * @date     	2018-8-7 下午4:12:28
 */
public class WarehouseGroundFishpond {
	private String id ;
	private String number ; //int(11) NOT NULL COMMENT '大棚鱼塘编号',
	private String type ; //int(11) NOT NULL COMMENT '0大棚 1鱼塘 2大田 3仓库',
	private String company_id ; //int(11) NOT NULL COMMENT '企业id',
	private String display_name ; //varchar(100) NOT NULL DEFAULT '' COMMENT '显示名称',
	private String camera_pass_num ; //varchar(50) NOT NULL DEFAULT '1' COMMENT '摄像头通道号',
	private String is_del  ;//int(11) //NOT NULL DEFAULT '0' COMMENT '是否删除',
	private String warehouse_name; //(200) DEFAULT NULL COMMENT '仓库名称（只对仓库有用）',
	private String warehouse_num; //varchar(50) DEFAULT NULL COMMENT '仓库数量（只对仓库有用）',
	private String warehouse_location; //varchar(200) DEFAULT NULL COMMENT '仓库位置（只对仓库有用）',
	private String create_time ;//datetime NOT NULL COMMENT '创建时间',
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getCompany_id() {
		return company_id;
	}
	public void setCompany_id(String company_id) {
		this.company_id = company_id;
	}
	public String getDisplay_name() {
		return display_name;
	}
	public void setDisplay_name(String display_name) {
		this.display_name = display_name;
	}
	public String getCamera_pass_num() {
		return camera_pass_num;
	}
	public void setCamera_pass_num(String camera_pass_num) {
		this.camera_pass_num = camera_pass_num;
	}
	public String getIs_del() {
		return is_del;
	}
	public void setIs_del(String is_del) {
		this.is_del = is_del;
	}
	public String getWarehouse_name() {
		return warehouse_name;
	}
	public void setWarehouse_name(String warehouse_name) {
		this.warehouse_name = warehouse_name;
	}
	public String getWarehouse_num() {
		return warehouse_num;
	}
	public void setWarehouse_num(String warehouse_num) {
		this.warehouse_num = warehouse_num;
	}
	public String getWarehouse_location() {
		return warehouse_location;
	}
	public void setWarehouse_location(String warehouse_location) {
		this.warehouse_location = warehouse_location;
	}
	public String getCreate_time() {
		return create_time;
	}
	public void setCreate_time(String create_time) {
		this.create_time = create_time;
	}
	
	
}	
