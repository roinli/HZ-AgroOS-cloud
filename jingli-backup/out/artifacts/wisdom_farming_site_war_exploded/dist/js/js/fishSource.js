var employeeList;
//var imgUrl = "http://ozdwirxvt.bkt.clouddn.com/";
var pageSize=5;
var areaList;
var authMap= {"1":"农药残留检测","2":"无公害农产品认证","3":"绿色食品认证","4":"有机食品认证","5":"HACCP认证","6":"土壤检测报告","7":"国家地理认证"
	,"8":"食品安全检测报告","9":"ISO质量管理体系认证","10":"优良种子认证","11":"ISO食品安全管理体系认证","12":"大米检测报告","13":"营养检测报告"
	,"14":"QS食品质量安全认证","15":"食品流通许可证","16":"大米监测报告","17":"其他认证","0":"其他认证"}
var deviceMap= {"31":"鱼池水温","32":"溶氧含量","33":"水PH","34":"氨氮含量","35":"蓝藻含量","36":"水浊度"
	,"37":"亚硝酸盐含量","38":"饲料余量","39":"饲料投放量"};
//获取员工列表
function getEmployeeList(){
	$.ajax({
 		type:"POST",
 		url:"actionServlet",
 		data:{"actionName":"employeeService","method":"queryList","startRec":"0","pageSize":"9999"},
 		dataType:"JSON",
 		success:function(data){
 			if(data.statusCode == 100){
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
 			if(data.statusCode == 1){
 				employeeList = data.result;
 			}
 		}
	});
}
//获取大棚/鱼塘列表
function getGroundFishpondList(){
	$.ajax({
		type:"POST",
	 		url:"actionServlet",
	 		data:{"actionName":"webService","method":"getGroundFishpondList"},
	 		dataType:"JSON",
	 		success:function(data){
	 			if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
	 			if(data.statusCode == 1){
	 				$("#gf_num_list").empty();
	 				$("#gf_num_list").append("<option value='0'>全部</option>")
	 				for (var i = 0; i < data.result.length; i++) {
	 					var name = "";
	 					if(data.result[i].type == '0'){
	 						name = data.result[i].number + "号大棚";
	 					}else if(data.result[i].type == '1'){
	 						name = data.result[i].number + "号鱼塘";
	 					}
						var option = "<option ";
						option+="value='"+data.result[i].number+"'>"+name+"</option>"
						$("#gf_num_list").append(option);
					}
	 				areaList = data.result;
	 				getSourceList(1);
	 			}
	 		}
		});
}

//显示大图
function showBigPic(obj,e){
	var img = $(obj).attr("src");
	$("#big_img_div").css("display","");
	$("#big_img").attr("src",img);
}
//隐藏大图
function hideBigPic(){
	$("#big_img_div").css("display","none");
}
function getSourceList(page){
	var searchGfNum = $("#gf_num_list").val();
	var name = $("#serarch_name").val();
	var startTime = $("#search_start_time").val();
	var endTime = $("#search_end_time").val();
	$.ajax({
		type:"POST",
 		url:"actionServlet",
 		data:{"method":"queryProductsCount","actionName":"sourceService"
 				,"areaNum":searchGfNum,"productName":name,"startTime":startTime,"endTime":endTime},
 		dataType:"JSON",
 		success:function(data){
 			if(data.statusCode == 100){
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
 			var allSize = data.result;
			if(allSize > pageSize){
				$('.M-box1').css('display','');
				$('.M-box1').pagination({
 		            totalData:allSize,
 		            showData:pageSize,
 		            coping:false,
 		           	current:page,
 		            prevContent:'上一页',	//上一页内容
 		        	nextContent:'下一页',	//下一页内容
 		            jumpBtn:"确定",
 		            callback: firstcallbackAjax
 		        });
			}else{
				$('.M-box1').css('display','none');
			}
 		}
	});
	var startRec = (page-1)*pageSize;
	$.ajax({
 		type:"POST",
 		url:"actionServlet",
 		data:{"method":"queryProducts","actionName":"sourceService"
 				,"areaNum":searchGfNum,"productName":name,"startTime":startTime,"endTime":endTime
 				,"startRec":startRec,"pageSize":pageSize},
 		dataType:"JSON",
 		success:function(data){
 			if(data.statusCode == 100){
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
 			if(data.statusCode == 1){
 				var htmlStr = $("#demo_tr").html();
 					
	 				$("#data_table").empty();
	 				$("#data_table").append("<tr id='demo_tr' style='display:none' height='120' >" + htmlStr+ "</tr>");
	 				for(var i=0;i<data.result.length;i++){
	 					var newStr = "<tr height='120'>" + htmlStr+"</tr>";
	 					var re = new RegExp("#source_id#","g");
	 					newStr = newStr.replace(re,data.result[i].productId);
	 					re = new RegExp("#source_img#","g");
	 					newStr = newStr.replace(re,imgUrl + data.result[i].productIcon);
	 					re = new RegExp("#prduct_name#","g");
	 					newStr = newStr.replace(re,data.result[i].productName);
	 					re = new RegExp("#product_date#","g");
	 					newStr = newStr.replace(re,data.result[i].plantTime);
	 					newStr = newStr.replace("#product_crop#",data.result[i].productDetail);
	 					newStr = newStr.replace("#product_varieties#",data.result[i].productType);
	 					newStr = newStr.replace("#product_batch#",data.result[i].batchCount);
	 					var state = data.result[i].state;
	 					if(state == 0){
	 						newStr = newStr.replace("#product_finish#","none");
	 						newStr = newStr.replace("#product_not_finish#","");
	 					}else{
	 						newStr = newStr.replace("#product_finish#","");
	 						newStr = newStr.replace("#product_not_finish#","none");
	 					}
	 					$("#data_table").append(newStr);
	 				}
 				
 	 		}
 	 	}
	});
 }
 		
function firstcallbackAjax(api){
	var current=api.getCurrent();
	getSourceList(current);
}

function initEmployeeSelect(obj,id,def){
	obj.empty();
	if(def != null && def != ""){
		obj.append("<option value='0'>"+def+"</option>");
	}
	for(var i=0;i<employeeList.length;i++){
		var opStr = "<option value='"+employeeList[i].id+"'";
			if(employeeList[i].id==id){
				opStr+=" selected='selected' "
			}
			opStr+="'>"+employeeList[i].name+"</option>";
		obj.append(opStr);
		obj.chosen({disable_search_threshold: 10,search_contains: true});
		obj.trigger("chosen:updated");
	}
}

//显示创建产品
function openCreateProductDiv(){
	$("#addNewProduct input").val("");
	$("#newProductInfo").val("");
	$("#newProductBatch").val(1);
	$('#saveNewProductUploadPicPic').attr("src","");
    $('#saveNewProductUploadPicPic').css('display','none');
    $('#saveNewProductUploadPicBtn').css('display','');
    $("#newProductGfNum").empty();
    for(var i=0;i<areaList.length;i++){
    	var name = "";
			if(areaList[i].type == '0'){
				name = areaList[i].number + "号大棚";
			}else if(areaList[i].type == '1'){
				name = areaList[i].number + "号鱼塘";
			}
		var option = "<option ";
		option+="value='"+areaList[i].number+"'>"+name+"</option>"
    	$("#newProductGfNum").append(option);
    }
	$("#addNewProduct").modal('show');
	setTimeout(function () {
		initEmployeeSelect($("#newProductleader"),0,"请选择负责人");
	}, 500);
}

//显示添加批次界面
function openAddBatch(sourceId,batchId){
	$("#batch_list").modal('hide');
	setTimeout(function () {
		$("#addBatchDiv").modal('show');
	}, 500);
	if(batchId == '0'){
		$("#batch_div_info").html("添加批次");
	}else{
		$("#batch_div_info").html("修改批次信息");
	}
	$("#addBatchDiv input").val("");
	$("#addBatchDiv textarea").val("");
	addBatchCheckRecord(0,null,null);
	addBatchTranslateRecord(0,null);
	addBatchSendRecord(0,null);
	if(sourceId == '0'){
		//批次列表点击添加
		sourceId = $("#batch_list_source_id").val();
	}
	$("#addBatchSourceId").val(sourceId);
	$("#updateBatchId").val(batchId);
}
//显示维护档案界面
function openUpdateArchives(sourceId){
	$("#updateArchivesDiv").modal({
		backdrop: 'static',//点击空白处不关闭对话框
	    keyboard: false,//键盘关闭对话框
	    show:true//弹出对话框
	});
	
	growPicAddRemove(0,null);
	growRecord(0,null,null);
	addFeedRecord(0,null,null);
	addVaccineRecord(0,null,null);
	addDrugRecord(0,null,null);
	buyInfo(0,null);
	addCredentials(0,null);
	addCustomDiv(0,null);
	
	$("#updateArchivesDiv input").val("");
	$("#updateArchivesDiv img").attr("src","");
//	
	$("#update_archives_id").val(sourceId);
	$(".fish_device_choose").iCheck({
		checkboxClass: 'icheckbox_square-green',
	});
//	setTimeout(function () {
//		initEmployeeSelect($("#fishBuy"),0,"请选择采购人");
//	}, 500);
	getUpdateArchivesData(sourceId);
}

//获取维护档案数据
function getUpdateArchivesData(sourceId){
	
	$.ajax({
 		type:"POST",
 		url:"actionServlet",
 		data:{"actionName":"sourceService","method":"queryProduct","productId":sourceId},
 		dataType:"JSON",
 		success:function(data){
 			if(data.statusCode == 100){
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
 			if(data.statusCode == 1){
 				//档案
 				$("#update_archives_product_name").val(data.result.productName);
 				$("#update_archives_product_pic").attr("src",imgUrl + data.result.productIcon);
 				$("#plantingTime").val(data.result.plantTime);
 				$("#update_archives_batch").val(data.result.season);
 				$("#update_archives_crop").val(data.result.productDetail);
 				$("#update_archives_varieties").val(data.result.productType);
 				$("#update_archives_product_info").val(data.result.productInformation);
 				setTimeout(function () {
 					initEmployeeSelect($("#update_archives_leader"),data.result.employeeId,"请选择负责人");
 				}, 500);
 				
 				//鱼苗来源
 				if( data.result.fishSource != null && data.result.fishSource != ""){
 					var fishSource = JSON.parse(data.result.fishSource);
 					$("#fishName").val(fishSource.name);
 					$("#fishFactoryName").val(fishSource.factory);
 					$("#fishSize").val(fishSource.size);
 					$("#fishQuality").val(fishSource.quality);
 					var hgzIcon = fishSource.hgzIcon;
 					if(hgzIcon == null || hgzIcon==""){
 						$(".fishHgzUploadPicBtn").css("display","");
 						$(".fishHgzUploadPicPic").css("display","none");
 					}else{
 						$(".fishHgzUploadPicBtn").css("display","none");
 						$(".fishHgzUploadPicPic").css("display","");
 						$(".fishHgzUploadPicPic").attr("src",imgUrl + hgzIcon);
 					}
 					setTimeout(function () {
 	 					initEmployeeSelect($("#fishBuy"),0,"请选择采购人");
 	 					$("#fishBuy option[value='"+fishSource.buy+"']").attr("selected","selected"); 
 	 					$('#fishBuy').trigger('chosen:updated');//更新选项  
 	 				}, 500);
 					
 					var saleIcon = fishSource.saleIcon;
 					if(saleIcon == null || saleIcon==""){
 						$(".fishSaleUploadPicBtn").css("display","");
 						$(".fishSaleUploadPicPic").css("display","none");
 					}else{
 						$(".fishSaleUploadPicBtn").css("display","none");
 						$(".fishSaleUploadPicPic").css("display","");
 						$(".fishSaleUploadPicPic").attr("src",imgUrl + saleIcon);
 					}
 					
 				}else{
 					setTimeout(function () {
 	 					initEmployeeSelect($("#fishBuy"),0,"请选择采购人");
 	 				}, 500);
 				}
 				
 				//环境数据
 				var devices = data.result.envData;
 				$(".fish_device_choose").each(function(){
 					var device = $(this).attr("val");
 					if(devices !=null && devices!= "" && devices.indexOf(device) != -1){
 						$(this).iCheck('check');
 					}else{
 						$(this).iCheck('uncheck');
 					}
 				});
 				
 				//网店链接
 				var webLink = data.result.webLinks;
 				if(webLink != null && webLink != ""){
 					var webLinks = webLink.split("|");
 					for(var i =0;i<webLinks.length;i++){
 						if(i > 0){
 							$("#buy_web").find("tr:first-child").find(".add_new_web_link").click();
 						}
 						$("#buy_web").find("tr:last-child").find(".web_link").val(webLinks[i]);
 					}
 					
 				}
 				//实体店地址
 				var shopAddress = data.result.shopAddress;
 				if(shopAddress != null && shopAddress != ""){
 					var shopAddresses = shopAddress.split("|");
 					for(var i =0;i<shopAddresses.length;i++){
 						if(i > 0){
 							$("#buy_shop").find("tr:first-child").find(".add_new_shop_address").click();
 						}
 						$("#buy_shop").find("tr:last-child").find(".shop_address").val(shopAddresses[i]);
 					}
 				}
 				//销售人员
 				var saler = data.result.saler;
 				setTimeout(function () {
 					initEmployeeSelect($("#sale_employee_list"),0,"请选择销售员工");
	 				if(saler != null && saler != ""){
	 					var salers = saler.split(",");
	 					for(var i=0;i<salers.length;i++){
	 						$("#sale_employee_list option[value='"+salers[i]+"']").attr("selected","selected"); 
	 					}
		 				$('#sale_employee_list').trigger('chosen:updated');//更新选项  
	 				}
 				}, 500);
 				
 				//生长期图片
 				if(data.result.growthPic != null && data.result.growthPic!= ""){
 					var growPicArr = JSON.parse(data.result.growthPic);
 					for(var i =0;i<growPicArr.length;i++){
 						growPicAddRemove(1);
 						$("#add_grow_div").children("div:last-child").find(".grow_pic_type").val(growPicArr[i].type);
 						$("#add_grow_div").children("div:last-child").find(".grow_pic_type").change();
 						$("#add_grow_div").children("div:last-child").find(".grow_pic_date").val(growPicArr[i].picDate);
 						$("#add_grow_div").children("div:last-child").find(".grow_pic_desc").val(growPicArr[i].desc);
 						$("#add_grow_div").children("div:last-child").find(".grow_pic_position").val(growPicArr[i].position);
 						$("#add_grow_div").children("div:last-child").find(".grow_pic_chl").val(growPicArr[i].chl);
 						$("#add_grow_div").children("div:last-child").find(".grow_pic_shl").val(growPicArr[i].shl);
 						var icon = growPicArr[i].icon;
 						if(icon == null || icon == ""){
 							$("#add_grow_div").children("div:last-child").find(".growPicUploadPicBtn").css("display","")
 							$("#add_grow_div").children("div:last-child").find(".growPicUploadPicPic").css("display","none")
 						}else{
 							$("#add_grow_div").children("div:last-child").find(".growPicUploadPicBtn").css("display","none")
 							$("#add_grow_div").children("div:last-child").find(".growPicUploadPicPic").css("display","")
 							$("#add_grow_div").children("div:last-child").find(".growPicUploadPicPic").attr("src",imgUrl + icon);
 						}
 					}
 				}

 				//认证信息
 				if(data.result.authInfo != null && data.result.authInfo!= ""){
 					var authInfoArr = JSON.parse(data.result.authInfo);
 					for(var i =0;i<authInfoArr.length;i++){
 						addCredentials(1,null);
 						$("#add_credentials_div").children("div:last-child").find(".credentials_type").val(authInfoArr[i].rzType);
 						$("#add_credentials_div").children("div:last-child").find(".credentials_date").val(authInfoArr[i].rzBzDate);
 						$("#add_credentials_div").children("div:last-child").find(".credentials_num").val(authInfoArr[i].rzNum);
 						$("#add_credentials_div").children("div:last-child").find(".credentials_end_date").val(authInfoArr[i].rzEndDate);
 						$("#add_credentials_div").children("div:last-child").find(".credentials_jg").val(authInfoArr[i].rzJg);
 						var icon = authInfoArr[i].icon;
 						if(icon == null || icon == ""){
 							$("#add_credentials_div").children("div:last-child").find(".addCredentialsUploadPicBtn").css("display","");
 							$("#add_credentials_div").children("div:last-child").find(".addCredentialsUploadPicPic").css("display","none");
 						}else{
 							$("#add_credentials_div").children("div:last-child").find(".addCredentialsUploadPicBtn").css("display","none");
 							$("#add_credentials_div").children("div:last-child").find(".addCredentialsUploadPicPic").css("display","");
 							$("#add_credentials_div").children("div:last-child").find(".addCredentialsUploadPicPic").attr("src",imgUrl + icon);
 						}
 						
 					}
 				}
 				
 				//成长记录
 				if(data.result.growInfo != null && data.result.growInfo!= ""){
 					var growInfoArr = JSON.parse(data.result.growInfo);
 					for(var i =0;i<growInfoArr.length;i++){
 						growRecord(1,null,growInfoArr[i].employee);
 						$("#add_grow_record_div").children("table:last-child").find(".grow_record_type").val(growInfoArr[i].type);
 						$("#add_grow_record_div").children("table:last-child").find(".grow_record_time").val(growInfoArr[i].time);
 						$("#add_grow_record_div").children("table:last-child").find(".grow_record_size").val(growInfoArr[i].size);
 						$("#add_grow_record_div").children("table:last-child").find(".grow_record_quality").val(growInfoArr[i].quality);
 						$("#add_grow_record_div").children("table:last-child").find(".grow_record_state").val(growInfoArr[i].state);
 					}
 				}
 				
 				//饲料记录
 				if(data.result.feedInfo != null && data.result.feedInfo!= ""){
 					var feedInfoArr = JSON.parse(data.result.feedInfo);
 					for(var i =0;i<feedInfoArr.length;i++){
 						addFeedRecord(1,null,feedInfoArr[i].employee);
 						$("#add_feed_div").children("div:last-child").find(".feed_use_time").val(feedInfoArr[i].time);
 						$("#add_feed_div").children("div:last-child").find(".feed_name").val(feedInfoArr[i].name);
 						$("#add_feed_div").children("div:last-child").find(".feed_factory_date").val(feedInfoArr[i].factoryDate);
 						$("#add_feed_div").children("div:last-child").find(".feed_factory").val(feedInfoArr[i].factory);
 						$("#add_feed_div").children("div:last-child").find(".feed_buy_date").val(feedInfoArr[i].buyDate);
 						$("#add_feed_div").children("div:last-child").find(".feed_type").val(feedInfoArr[i].type);
 						$("#add_feed_div").children("div:last-child").find(".buy_cnt").val(feedInfoArr[i].buyCnt);
 						$("#add_feed_div").children("div:last-child").find(".out_cnt").val(feedInfoArr[i].outCnt);
 						$("#add_feed_div").children("div:last-child").find(".in_tmp").val(feedInfoArr[i].inTmp);
 						$("#add_feed_div").children("div:last-child").find(".out_tmp").val(feedInfoArr[i].outTmp);
 					}
 				}
 				
 				//疫苗记录
 				if(data.result.vaccineInfo != null && data.result.vaccineInfo!= ""){
 					var vaccineInfoArr = JSON.parse(data.result.vaccineInfo);
 					for(var i =0;i<vaccineInfoArr.length;i++){
 						addVaccineRecord(1,null,vaccineInfoArr[i]);
 						$("#add_vaccine_record_div").children("div:last-child").find(".vaccine_use_time").val(vaccineInfoArr[i].time);
 						$("#add_vaccine_record_div").children("div:last-child").find(".vaccine_name").val(vaccineInfoArr[i].name);
 						$("#add_vaccine_record_div").children("div:last-child").find(".vaccine_factory_date").val(vaccineInfoArr[i].factoryDate);
 						$("#add_vaccine_record_div").children("div:last-child").find(".vaccine_factory").val(vaccineInfoArr[i].factory);
 						$("#add_vaccine_record_div").children("div:last-child").find(".vaccine_buy_date").val(vaccineInfoArr[i].buyDate);
 						$("#add_vaccine_record_div").children("div:last-child").find(".vaccine_cnt").val(vaccineInfoArr[i].useCnt);
 						$("#add_vaccine_record_div").children("div:last-child").find(".vaccine_reason").val(vaccineInfoArr[i].reason);
 					}
 				}
 				
 				
 				//用药
 				if(data.result.drugInfo != null && data.result.drugInfo!= ""){
 					var drugInfoArr = JSON.parse(data.result.drugInfo);
 					for(var i =0;i<drugInfoArr.length;i++){
 						addDrugRecord(1,null,drugInfoArr[i]);
 						$("#add_drug_record_div").children("div:last-child").find(".drug_use_time").val(drugInfoArr[i].time);
 						$("#add_drug_record_div").children("div:last-child").find(".drug_name").val(drugInfoArr[i].name);
 						$("#add_drug_record_div").children("div:last-child").find(".drug_factory_date").val(drugInfoArr[i].factoryDate);
 						$("#add_drug_record_div").children("div:last-child").find(".drug_factory").val(drugInfoArr[i].factory);
 						$("#add_drug_record_div").children("div:last-child").find(".drug_buy_date").val(drugInfoArr[i].buyDate);
 						$("#add_drug_record_div").children("div:last-child").find(".drug_use_cnt").val(drugInfoArr[i].type);
 						$("#add_drug_record_div").children("div:last-child").find(".drug_reason").val(drugInfoArr[i].reason);
// 						$("#add_drug_record_div").children("div:last-child").find(".drug_record_check_employee option[value='"+drugInfoArr[i].check+"']").attr("selected","selected"); 
// 						$("#add_drug_record_div").children("div:last-child").find(".drug_record_check_employee").trigger('chosen:updated');//更新选项  
// 						$("#add_drug_record_div").children("div:last-child").find(".drug_record_deal_employee option[value='"+drugInfoArr[i].deal+"']").attr("selected","selected"); 
// 						$("#add_drug_record_div").children("div:last-child").find(".drug_record_deal_employee").trigger('chosen:updated');//更新选项  
 					}
 				}
 				
 				//自定义模块
 				if(data.result.custom != null && data.result.custom!= ""){
 					var customArr = JSON.parse(data.result.custom);
 					for(var i =0;i<customArr.length;i++){
 						addCustomDiv(1,null);
 						$("#custom_div").children("div:last-child").find(".custom_name").val(customArr[i].name);
 						var detail = customArr[i].details;
 						for(var j=0;j<detail.length;j++){
 							if(j > 0){
 								$("#custom_div").children("div:last-child").find(".addCustomContent").click();
 							}
 							$("#custom_div").children("div:last-child").children("table:last-child").find("tr:last").find(".custom_time").val(detail[j].time);
 							$("#custom_div").children("div:last-child").children("table:last-child").find("tr:last").find(".custom_content").val(detail[j].content);
 						}
 						
 					}
 				}
 				
 				
 			}
 		}
	});
	
}







//显示批次列表界面
function openBatchList(sourceId,img,name,time){
	$("#batch_list").modal('show');
	$("#batch_list_source_id").val(sourceId);
	$("#batchListImg").attr("src",img);
	$("#batchListPrduct").html(name);
	$("#batchListTime").html("种植时间:" + time);
	
	getBatchListData();
}

//获取批次列表数据
function getBatchListData(){
	var sourceId = $("#batch_list_source_id").val();
	var htmlStr = $("#batchListLi").html();
	$("#theList").empty();
	$("#theList").append("<li id='batchListLi' class='theListBox'  style='height:150px;display:none' >" + htmlStr+ "</li>");
	$.ajax({
 		type:"POST",
 		url:"actionServlet",
 		data:{"method":"queryBatch","actionName":"sourceService"
 				,"productId":sourceId},
 		dataType:"JSON",
 		success:function(data){
 			if(data.statusCode == 100){
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
 			if(data.statusCode == 1){
 				for(var i=0;i<data.result.length;i++){
 					var newStr = "<li class='theListBox'  style='height:150px' >" + htmlStr+"</li>";
 					var re = new RegExp("#batch_id#","g");
 					newStr = newStr.replace(re,data.result[i].id);
 					newStr = newStr.replace("#batch_list_checkbox#","batch_list_checkbox");
 					newStr = newStr.replace("#batchListMarketTime#",data.result[i].listedTime);
 					newStr = newStr.replace("#batchListBarCodeImg#",imgUrl + data.result[i].barcodeUrl);
 					re = new RegExp("#batchListBarCode#","g");
 					newStr = newStr.replace(re,data.result[i].barcode);
 					newStr = newStr.replace("#batchListQrCodeImg#",imgUrl + data.result[i].qrcodeUrl);
 					var isShelve = data.result[i].isShelve;
 					if(isShelve == "1"){
 						isShelve = "已上架";
 					}else{
 						isShelve = "已下架";
 					}
 					newStr = newStr.replace("#batchState#",isShelve);
 					newStr = newStr.replace("#source_id#",sourceId);
 					newStr=newStr.replace("#fishProductId#",data.result[i].productId);
 					$("#theList").append(newStr);
 				}
 				$(".batch_list_checkbox").iCheck({
 					checkboxClass: 'icheckbox_square-green',
 				});
 			}
 		}
	});
	
}
function clickScanStatistics(type,thisName){
	$(thisName).children(':first-child').addClass('tjqxbbI_hover').removeClass('tjqxbbI');
	$('.tjqxbb>span').css('color','#0583DF');
	$('.smqyfbt>i').addClass('smqyfbtI').removeClass('smqyfbtI_hover');
	$('.smqyfbt>span').css('color','#6A829A');
	var productId=$("#aaa").val();
	$(".areaSelectionOptionsLeft").css("display","");
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	if(month < 10){
		month = "0" + month;
	}
	var endTime=year+"-"+month;
	var stDate = new Date();
	stDate.setMonth(stDate.getMonth()-6);
	year = stDate.getFullYear();
	month = stDate.getMonth()+1;
	if(month < 10){
		month = "0" + month;
	}
	var startTime=year+"-"+month;
	$(".areaSelectionOptionsLeft>input.startTime").val(startTime);
	$(".areaSelectionOptionsLeft>input.endTime").val(endTime);
	getScanData(startTime,endTime,productId,"")
}
//显示扫码统计界面
function openScanStatistics(type,thisName){
	if(productId != 0){
		$("#batch_list").modal('hide');
		$(".searchProduct").val($("#batchListPrduct").html());
	}else{
		$(".searchProduct").val("");
	}
	$("#scavengingStatistics").modal('show');
	if(type == 1){
		$('.smqyfbt>span').css('color','#6A829A');
		$('.smqyfbt>i').removeClass('smqyfbtI_hover').addClass('smqyfbtI');
		$(".tjqxbb>span").css('color','#0583DF');
		$(".tjqxbb>i").removeClass('tjqxbbI').addClass('tjqxbbI_hover');
		var productId=$(thisName).next().val();
		$("#aaa").val(productId);
		$(".areaSelectionOptionsLeft").css("display","");
		var nowDate = new Date();
		var year = nowDate.getFullYear();
		var month = nowDate.getMonth()+1;
		if(month < 10){
			month = "0" + month;
		}
		var endTime=year+"-"+month;
		var stDate = new Date();
		stDate.setMonth(stDate.getMonth()-6);
		year = stDate.getFullYear();
		month = stDate.getMonth()+1;
		if(month < 10){
			month = "0" + month;
		}
		var startTime=year+"-"+month;
		$(".areaSelectionOptionsLeft>input.startTime").val(startTime);
		$(".areaSelectionOptionsLeft>input.endTime").val(endTime);
		getScanData(startTime,endTime,productId,"")
	}
	if(type == 2){
		$('.smqyfbt>span').css('color','#0583DF');
		$('.smqyfbt>i').removeClass('smqyfbtI').addClass('smqyfbtI_hover');
		$(".tjqxbb>span").css('color','#6A829A');
		$(".tjqxbb>i").removeClass('tjqxbbI_hover').addClass('tjqxbbI');
		$(".areaSelectionOptionsLeft").css("display","none");
		showAreaMap();
		
	}
	
}
function getScanData(startTime,endTime,productId,productName){
	
	var myChart = echarts.init(document.getElementById("container1"),'macarons');
	myChart.clear();
	myChart.showLoading({
	    text: '正在努力的读取数据中...',    //loading话术
	});
	if(productId == null || productId ==""){
		productId = "0";
	}
	$.ajax({
 		type:"POST",
 		url:"actionServlet",
 		data:{"actionName":"sourceService","method":"scanCount"
 				,"startTime":startTime,"endTime":endTime,"productId":productId,"productName":productName},
 		dataType:"JSON",
 		success:function(data){
 			if(data.statusCode == 100){
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
 			if(data.statusCode == 1){
 				
 				myChart.hideLoading();
 				
 				var listss=[];
 			    var listName=[];
 			    var listDateCope=[];
 			    //值
 			    var list = data.result.y;
 			    var listData = data.result.x;
 			    for(var i=0;i<list.length;i++){
 			        var listObj={};
 			        listName.push(list[i].name)
 			        listObj.name=list[i].name;
 			        listObj.type="line";
 			        listObj.data=list[i].data;
 			        listss.push(listObj);
 			    }
 			    //日期
 			    for(var j=0;j<listData.length;j++){
 			        listDateCope.push(listData[j]);
 			    }
 			    
 			    var option = {
		    		title : {
			   	        text: '扫码统计',
			   	        subtext: '',
			   	        x:'center',
			   	        textStyle:{
		    	    	  color:'#008ACD',
		    	    	  fontStyle:'normal',
		    	    	  fontWeight:'500',
		    	    	  fontSize:20
		    	       }
 			   	    },
 			        tooltip : {
 			            trigger: 'axis'
 			        },
 			       legend: {
 				        orient: 'horizontal',
 				        x:'center',
 				        y:'bottom',
 				        data:listName
 				    },
 			        calculable : true,
 			        xAxis : [
 			            {
 			            	splitLine:{show: false},
 			                type : 'category',
 			                axisLine:{
	 			                  lineStyle:{
	 			                    color:'#008ACD'
	 			                }
 			                },
 			                boundaryGap : false,
 			                data :listDateCope
 			            }
 			        ],
 			        yAxis : [
 			            {
 			            	splitLine:{show: false},
 			                type : 'value',
	 			            axisLine:{
	 			                  lineStyle:{
	 			                    color:'#008ACD'
	 			                }
	 			          }
 			            }
 			        ],
 			        series : listss
 			    };
 			    myChart.setOption(option);      
 				
 			}
 		}
	});
}
function convertData (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

function showAreaMap(){
	$.get('./dist/js/echarts/china.json', function (chinaJson) {
		echarts.registerMap('china', chinaJson); // 注册地图
		var mapChart = echarts.init(document.getElementById('container1'));
		mapChart.clear();
		mapChart.showLoading({
		    text: '正在努力的读取数据中...',    //loading话术
		});
		var option = {
				backgroundColor: '#021926',  		// 图表背景色
				geo: {
			        map: 'china',
			        itemStyle: {					// 定义样式
			            normal: {					// 普通状态下的样式
			            	areaColor: 'transparent',
		                    borderColor: '#3fdaff',
		                    borderWidth: 2,
		                    shadowColor: 'rgba(63, 218, 255, 0.5)',
		                    shadowBlur: 30
			            },
			            emphasis: {					// 高亮状态下的样式
			            	areaColor: '#2B91B7',
			            }
			        }
			    },
			    title : {
			        text: '区域统计',
			        textStyle:{
			    		color:'#FFFFFF',
			    	},
			        subtext: '',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: function(data){ 
	                    return data.name+'--'+ data.seriesName + "扫码:"+data.data.value[2]+"次"; 
	                }
			    },
			    legend: {
			        orient: 'vertical',
			        x:'right',
			        y:'bottom',
			        data:[],
			    	textStyle:{
			    		color:'#FFFFFF',
			    	}
			    },
			    toolbox: {
			        show: true,
			        orient : 'horizontal',
			        x: 'left',
			        y: 'bottom',
			        feature : {
			            mark : {show: false},
			            dataView : {
			            	show: true, 
			            	readOnly: true,
			            	backgroundColor:"#323c48",
			            	textareaColor:"#323c48",
			            	textColor:"#FFFFFF",
			            	buttonColor:"#CCCCCC",
			            	iconStyle:{
			            		normal:{
			            			color:"#ffffff"
			            		}
			            	},
			            	optionToContent: function(opt) {
			            		var optArr=[];
			            		var series = opt.series;
			            		var table='<table style="width:95%;text-align:center;margin:0 auto;"><tbody><tr style="min-height:25px;line-height:25px;border:1px solid #fff;border-bottom:none;">'
			            			+ '<td style="color:#fff;">名称</td>'
			                        + '<td style="color:#fff;">扫码区域</td>'
			                        +'<td style="color:#fff;">扫码次数</td>'
			                        + '</tr>';
			            		for(var i=0;i<series.length;i++){
			            			table+='<tr style="min-height:25px;line-height:25px;border:1px solid #fff;"><td style="color:#fff">' + series[i].name + '</td>';
			            			  var a=series[i].data;
			            			  table+='<td>';
			            			  for(var j=0;j<series[i].data.length;j++){
			            				  table+='<div style="color:#fff">'+series[i].data[j].name+'</div>';
			            			  }
			            			  table+='</td><td>';
			            			  for(var k=0;k<series[i].data.length;k++){
			            				  table+='<div style="color:#fff">'+series[i].data[k].value[2]+'</div>';
			            			  }
			            			  table+='</td><tr>';
			            		}
			            		table += '</tbody></table>';
			            		 return table;
			            	}
			            },
			            restore : {show: false},
			            saveAsImage : {show: false}
			        }
			    },
				series: []

			}

 		 	mapChart.setOption(option);
		
		$.ajax({
	 		type:"POST",
	 		url:"actionServlet",
	 		data:{"actionName":"sourceService","method":"scanArea"},
	 		dataType:"JSON",
	 		success:function(data){
	 			if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
	 			if(data.statusCode == 1){
	 				mapChart.hideLoading();
	 				for (var i = 0; i < data.result.length; i++) {
	 					option.series.push({
	 							roam: false,
	 					        name: data.result[i].name, 
	 					        type: 'scatter',
	 					        coordinateSystem: 'geo',
	 					        data: convertData(data.result[i].data),
	 					        symbolSize: function(val) {
	 					        	if(val < 50){
	 					        		return 10;
	 					        	}else if(val >= 50 && val < 200){
	 					        		return 12;
	 					        	}else{
	 					        		return 15;
	 					        	}
					 	        },
					 	       label: {
					 	            normal: {
					 	                formatter: '{b}',
					 	                position: 'right',
					 	                show: false,
					 	                textStyle: {
					 	                    color: '#fff',
					 	                    fontSize: 20,

					 	                }
					 	            },
					 	            emphasis: {
					 	                show: false
					 	            }
					 	        },
					 	        itemStyle: {
					 	            normal: {
					 	                opacity: 1
					 	            }
					 	        },
					 	        animationDelay: function(idx) {
					 	            return idx * 10;
					 	        }
	 					       
	 					});
	 					option.legend.data.push(data.result[i].name)
	 			    }
	 				mapChart.setOption(option);  
	 			}
	 		}
		});

  	});

}
//搜索
function scanSearch(){
	var searchStartTime=$(".areaSelectionOptionsLeft>input.startTime").val();
	var searchEndTime=$(".areaSelectionOptionsLeft>input.endTime").val();
	var searchKeyword=$(".areaSelectionOptionsLeft>input.searchProduct").val();
	
	getScanData(searchStartTime,searchEndTime,0,searchKeyword);
}

//新建产品
function saveNewProduct(){
	var productName = $("#pro_name").val();
	var productIcon = $("#saveNewProductUploadPicPic").attr("src");
	var areaNum = $("#newProductGfNum").val();
	var plantTime = $("#newProductPlantTime").val();
	var productDetail = $("#newProductCrop").val();
	var productType = $("#newProductVarieties").val();
	var employeeId = $("#newProductleader").val();
	var productInformation = $("#newProductInfo").val();
	if(productName == null || productName == ""){
		toastr.warning('请填写产品名称','提示');
		return;
	}
	if(productIcon == null || productIcon == ""){
		toastr.warning('请选择产品图片','提示');
		return;
	}
	if(plantTime == null || plantTime == ""){
		toastr.warning('请填写养殖时间','提示');
		return;
	}
	if(productDetail == null || productDetail == ""){
		toastr.warning('请填写养殖鱼类','提示');
		return;
	}
	if(productType == null || productType == ""){
		toastr.warning('请填写养殖品种','提示');
		return;
	}
	if(employeeId == null || employeeId == "" || employeeId == '0'){
		toastr.warning('请填写产品负责人','提示');
		return;
	}
	$('.btn-ladda-demo2').ladda( 'bind');
	Ladda.bind( '.progress-demo .ladda-button',{
	    callback: function( instance ){
	        var progress = 0;
	        var interval = setInterval( function(){
	            progress = Math.min( progress + Math.random() * 0.1, 1 );
	            instance.setProgress( progress );

	            if( progress === 1 ){
	                instance.stop();
	                clearInterval( interval );
	            }
	        }, 200 );
	    }
	});
	var l = $('.btn-ladda-demo2').ladda();
	l.ladda( 'start' );
	$.ajax({
 		type:"POST",
 		url:"actionServlet",
 		data:{"actionName":"sourceService","method":"addProduct"
 				,"areaNum":areaNum,"productName":productName,"plantTime":plantTime
 				,"productDetail":productDetail,"productType":productType,"employeeId":employeeId
 				,"productInformation":productInformation,"productIcon":productIcon},
 		dataType:"JSON",
 		success:function(data){
 			if(data.statusCode == 100){
 				l.ladda('stop');
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
 			if(data.statusCode == 1){
 				getSourceList(1);
 				swal({
 		  	 		title: "创建成功",
 		       		text: "",
 		        	type: "success"
 		       	});
 				l.ladda('stop');
 				$("#addNewProduct").modal('hide');
 			}else{
 				l.ladda('stop');
 				toastr.warning(data.message,'提示');
 				return;
 			}
 			
 		}
	});
}


//新建批次
function saveBatch(btnName){
	var batchId = $("#updateBatchId").val();
	var sourceId = $("#addBatchSourceId").val();
	var marketTime = $("#addBatch_time_to_market").val();
	var desc = $("#addBatch_description").val();
	var checkLen = $("#detectionRecord").children().length-1;
	
	if(marketTime == null || marketTime == ""){
		toastr.warning('请填写上市时间','提示');
		return;
	}
	
	var checkJsonArr = [];
	var translateJsonArr = [];
	var sendJsonArr = [];
	
	$("#detectionRecord").children().each(function(index,element){
		if(index > 0){
			var checkJson = {};
			var type = $(this).find(".addbatchCheckType").val();
			var ckDate = $(this).find(".addBatch_check_date").val();
			var mechanism = $(this).find(".addBatchCheckMechanism").val();
			var employee = $(this).find(".addBatchCheckEmployee").val();
			var icon = $(this).find(".batchCheckUploadPicPic").attr("src");
			
			checkJson.time=ckDate;
			checkJson.organ=mechanism;
			checkJson.tester=employee;
			checkJson.icon=icon;
			checkJson.type=type;
			
			var detailJsonArr = [];
			
			$(this).find(".addBatchCheckDetails").each(function(index,element){
				var detailJson = {};
				var type = $(element).find(".addBatchCheckDetailsType").val();
				var val = $(element).find(".addBatchCheckDetailsVal").val();
				detailJson.quota=type;
				detailJson.value=val;
				detailJsonArr.push(detailJson);
			})
			checkJson.detail=detailJsonArr;
			checkJsonArr.push(checkJson);
		}
	});
	
	$("#batchTranslateRecord").children().each(function(index,element){
		if(index > 0){
			var translateJson = {};
			var time = $(this).find(".translateRecordTime").val();
			var content = $(this).find(".translateRecordContent").val();
			var operator = $(this).find(".addBatchTranslateEmployee").val();
			var operatorname = $(this).find(".addBatchTranslateEmployee").find("option:selected").text();
			
			if(time == "" && content == "" && operator == "0"){
				return true;
			}
			
			translateJson.time=time;
			translateJson.content=content;
			translateJson.operator=operator;
			translateJson.operatorname=operatorname;
			translateJsonArr.push(translateJson)
		}
	})
	
	$("#batchSendRecord").children().each(function(index,element){
		if(index > 0){
			var sendJson = {};
			var time = $(this).find(".sendRecordTime").val();
			var destination = $(this).find(".sendRecordAddress").val();
			var distributor = $(this).find(".addBatchSendEmployee").val();
			var distributorname = $(this).find(".addBatchSendEmployee").find("option:selected").text();
			
			if(time == "" && destination == "" && distributor == "0"){
				return true;
			}
			
			sendJson.time=time;
			sendJson.destination=destination;
			sendJson.distributor=distributor;
			sendJson.distributorname=distributorname;
			sendJsonArr.push(sendJson)
		}
	})
	$('.btn-ladda-demo1').ladda( 'bind');
	Ladda.bind( '.progress-demo .ladda-button',{
	    callback: function( instance ){
	        var progress = 0;
	        var interval = setInterval( function(){
	            progress = Math.min( progress + Math.random() * 0.1, 1 );
	            instance.setProgress( progress );

	            if( progress === 1 ){
	                instance.stop();
	                clearInterval( interval );
	            }
	        }, 200 );
	    }
	});
	var l = $('.btn-ladda-demo1').ladda();
	l.ladda( 'start' );
	if(batchId == '0'){
		//新增批次
		$.ajax({
	 		type:"POST",
	 		url:"actionServlet",
	 		data:{"actionName":"sourceService","method":"addBatch"
	 				,"productId":sourceId,"listedTime":marketTime,"quotaDesc":desc
	 				,"testingRec":JSON.stringify(checkJsonArr)
	 				,"machiningRec":JSON.stringify(translateJsonArr)
	 				,"distributeRec":JSON.stringify(sendJsonArr)},
	 		dataType:"JSON",
	 		success:function(data){
	 			if(data.statusCode == 100){
	 				l.ladda('stop');
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
	 			if(data.statusCode == 1){
	 				getSourceList(1);
	 				swal({
	 		  	 		title: "新增成功",
	 		       		text: "",
	 		        	type: "success"
	 		       	});
	 				l.ladda('stop');
	 				$("#addBatchDiv").modal('hide');
	 			}
	 		}
		});
	}else{
		//修改批次
		$.ajax({
	 		type:"POST",
	 		url:"actionServlet",
	 		data:{"actionName":"sourceService","method":"updateBatch","batchId":batchId
	 				,"productId":sourceId,"listedTime":marketTime,"quotaDesc":desc
	 				,"testingRec":JSON.stringify(checkJsonArr)
	 				,"machiningRec":JSON.stringify(translateJsonArr)
	 				,"distributeRec":JSON.stringify(sendJsonArr)},
	 		dataType:"JSON",
	 		success:function(data){
	 			if(data.statusCode == 100){
	 				l.ladda('stop');
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
	 			if(data.statusCode == 1){
	 				swal({
	 		  	 		title: "保存成功",
	 		       		text: "",
	 		        	type: "success"
	 		       	});
	 				l.ladda('stop');
	 				$("#addBatchDiv").modal('hide');
	 			}
	 		}
		});
	}
	
	
}

//归档
function pigeonhole(id){
	 swal({
		   title: '归档',
		   text: '确定执行归档操作？',
		   type: 'warning',
		   showCancelButton: true,
		   closeOnConfirm: false, 
		   allowOutsideClick:true,
		   confirmButtonText: '确定',
		   cancelButtonText: '取消',
		 }, function() { 
			 
			 $.ajax({
			 		type:"POST",
			 		url:"actionServlet",
			 		data:{"actionName":"sourceService","method":"archive","productId":id},
			 		dataType:"JSON",
			 		success:function(data){
			 			if(data.statusCode == 100){
			 				toastr.error('请联系管理员','未拥有权限');
			 				return;
			 			}
			 			if(data.statusCode == 1){
			 				getSourceList(1);
			 				swal({
		 		       		    title: "归档成功",
		 		       		    text: "",
		 		       		    type: "success"
			 		       	});
			 			}
			 		}
				});
		}); 
}
//删除档案
function deleteArchives(id){
	 swal({
		   title: '删除',
		   text: '确定删除档案？',
		   type: 'warning',
		   allowOutsideClick:true,
		   showCancelButton: true,
		   closeOnConfirm: false, 
		   confirmButtonColor:"#FF4040",
		   confirmButtonText: '确定',
		   cancelButtonText: '取消',
		 }, function() { 
			 
			 $.ajax({
			 		type:"POST",
			 		url:"actionServlet",
			 		data:{"actionName":"sourceService","method":"deleteProduct","ids":id},
			 		dataType:"JSON",
			 		success:function(data){
			 			if(data.statusCode == 100){
			 				toastr.error('请联系管理员','未拥有权限');
			 				return;
			 			}
			 			if(data.statusCode == 1){
			 				getSourceList(1);
			 				swal({
		 		       		    title: "删除成功",
		 		       		    text: "",
		 		       		    type: "success"
			 		       	});
			 			}
			 		}
				});
			 
		}); 
}

//批次列表-鼠标移入移出
function batchListInOut(type,obj){
	$(obj).css("display","none")
	if(type == 1){
		$(obj).next().css("display","")
	}else{
		$(obj).prev().css("display","")
	}
}
//批次列表-操作
function batchListOperation(type){
	var selectObj = $(".batch_list_checkbox");
	var productId = $("#batch_list_source_id").val();
	var selectIds = "";
	$(selectObj).each(function(){
		if($(this).parent().hasClass("checked")){
			selectIds+="," + $(this).val();
		}
	});
	if(selectIds.length>0){
		selectIds=selectIds.substring(1);
	}else{
		swal({
	  		title: "提示",
      		text: "请选择数据",
      		type: "info"
     	});
		return ;
	}
	
	if(type == 1){
		//上架
		swal({
			   title: '上架',
			   text: '确定上架所选产品？',
			   type: 'warning',
			   allowOutsideClick:true,
			   showCancelButton: true,
			   closeOnConfirm: false, 
			   confirmButtonText: '确定',
			   cancelButtonText: '取消',
			 }, function() { 
				 
				 $.ajax({
				 		type:"POST",
				 		url:"actionServlet",
				 		data:{"actionName":"sourceService","method":"shelves","batchIds":selectIds},
				 		dataType:"JSON",
				 		success:function(data){
				 			if(data.statusCode == 100){
				 				toastr.error('请联系管理员','未拥有权限');
				 				return;
				 			}
				 			if(data.statusCode == 1){
				 				getBatchListData();
				 				 swal({
				 	       		    title: "操作成功",
				 	       		    text: "",
				 	       		    type: "success"
				 	       	     });
				 			}
				 		}
					});
			}); 
	}
	if(type == 2){
		//下架
		swal({
			   title: '下架',
			   text: '确定下架所选产品？',
			   type: 'warning',
			   allowOutsideClick:true,
			   showCancelButton: true,
			   closeOnConfirm: false, 
			   confirmButtonText: '确定',
			   cancelButtonText: '取消',
			 }, function() { 
				 $.ajax({
				 		type:"POST",
				 		url:"actionServlet",
				 		data:{"actionName":"sourceService","method":"offShelf","batchIds":selectIds},
				 		dataType:"JSON",
				 		success:function(data){
				 			if(data.statusCode == 100){
				 				toastr.error('请联系管理员','未拥有权限');
				 				return;
				 			}
				 			if(data.statusCode == 1){
				 				getBatchListData();
				 				 swal({
				 	       		    title: "操作成功",
				 	       		    text: "",
				 	       		    type: "success"
				 	       	     });
				 			}
				 		}
					});
			}); 
	}
	if(type == 3){
		//删除
		swal({
			   title: '删除',
			   text: '确定删除所选批次？',
			   type: 'warning',
			   allowOutsideClick:true,
			   showCancelButton: true,
			   closeOnConfirm: false, 
			   confirmButtonColor:"#FF4040",
			   confirmButtonText: '确定',
			   cancelButtonText: '取消',
			 }, function() { 
				 
				 
				 $.ajax({
				 		type:"POST",
				 		url:"actionServlet",
				 		data:{"actionName":"sourceService","method":"deleteBatch","ids":selectIds,"productId":productId},
				 		dataType:"JSON",
				 		success:function(data){
				 			if(data.statusCode == 100){
				 				toastr.error('请联系管理员','未拥有权限');
				 				return;
				 			}
				 			if(data.statusCode == 1){
				 				 getSourceList(1);
								 getBatchListData();
				 				 swal({
				 	       		    title: "删除成功",
				 	       		    text: "",
				 	       		    type: "success"
				 	       	     });
				 			}
				 		}
					});
			}); 
	}
}


//修改批次信息
function updateBatchInfo(batchId){
	var sourceId = $("#batch_list_source_id").val();
	openAddBatch(sourceId,batchId);
	setTimeout(function () {
		$.ajax({
	 		type:"POST",
	 		url:"actionServlet",
	 		data:{"actionName":"sourceService","method":"getBatchById","id":batchId},
	 		dataType:"JSON",
	 		success:function(data){
	 			if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
	 			if(data.statusCode == 1){
	 				var time = data.result.listedTime;
	 				var content = data.result.quotaDesc;
	 				var testingRec = data.result.testingRec;
	 				var machiningRec = data.result.machiningRec;
	 				var distributeRec = data.result.distributeRec;
	 				var sourceId = data.result.productId;
	 				var checkJson = JSON.parse(testingRec);
	 				var translateJson = JSON.parse(machiningRec);
	 				var sendJson = JSON.parse(distributeRec);
	 				
	 				$("#addBatch_time_to_market").val(time);
	 				$("#addBatch_description").val(content);
	 				for(var i=0;i<checkJson.length;i++){
	 					addBatchCheckRecord(1,null,checkJson[i]);
	 					var detail = checkJson[i].detail;
	 					for(var j = 0;j<detail.length;j++){
	 						if(j > 0){
	 							$("#detectionRecord").children("div:last-child").find(".checkRecordAdd").click();
	 						}
	 						$("#detectionRecord").children("div:last-child").find(".addBatchCheckDetailsType").last().val(detail[j].quota);
	 						$("#detectionRecord").children("div:last-child").find(".addBatchCheckDetailsVal").last().val(detail[j].value);
	 					}
	 				}
	 				for(var i=0;i<translateJson.length;i++){
	 					$("#add_record").click();
	 					$("#batchTranslateRecord").children("div:last-child").find(".translateRecordTime").last().val(translateJson[i].time);
	 					$("#batchTranslateRecord").children("div:last-child").find(".translateRecordContent").last().val(translateJson[i].content);
	 					$("#batchTranslateRecord").children("div:last-child").find(".addBatchTranslateEmployee").last().val(translateJson[i].operator);
	 					$(".addBatchTranslateEmployee").trigger("chosen:updated");
	 				}
	 				for(var i=0;i<sendJson.length;i++){
	 					$("#add_send_record").click();
	 					$("#batchSendRecord").children("div:last-child").find(".sendRecordTime").last().val(sendJson[i].time);
	 					$("#batchSendRecord").children("div:last-child").find(".sendRecordAddress").last().val(sendJson[i].destination);
	 					$("#batchSendRecord").children("div:last-child").find(".addBatchSendEmployee").last().val(sendJson[i].distributor);
	 					$(".addBatchSendEmployee").trigger("chosen:updated");
	 				}
	 				
	 			}
	 		}
		});
	},1000);
	
	
}

//添加批次-检测记录
function addBatchCheckRecord(type,obj,msgObj){
	var divText = $("#detectionRecord").children("div:first-child").html();
	if(type == '1'){
		//新增检测记录
		divText = "<div class='add_box' style='position:relative'>" + divText + "</div>";
		var icon = "";
		var employee = "0";
		var time = "";
		var mechanism = "";
		var imgDis = "none";
		var chooseImgDis = "";
		if(msgObj != null){
			icon = msgObj.icon;
			employee = msgObj.tester;
			time = msgObj.time;
			mechanism = msgObj.organ;
			if(icon != ""){
				icon = imgUrl + icon;
				imgDis = "";
				chooseImgDis = "none";
			}
		}
		divText = divText.replace("#imgDisplay#",imgDis);
		divText = divText.replace("#chooseDisplay#",chooseImgDis);
		divText = divText.replace("#icon#",icon);
		divText = divText.replace("#time#",time);
		divText = divText.replace("#mechanism#",mechanism);
		$("#detectionRecord").append(divText);
		if(msgObj != null){
			$("#detectionRecord").children("div:last-child").find(".addbatchCheckType").val(msgObj.type);
		}
		$("#detectionRecord").children("div:last-child").find(".addbatchCheckType").change();
		initEmployeeSelect($("#detectionRecord").children("div:last-child").find(".addBatchCheckEmployee"),employee,"请选择检测员工");
	}
	if(type == '2'){
		//删除检测记录
		$(obj).parent().remove();
	}
	if(type == '0'){
		//清空
		var divText = $("#detectionRecord").children("div:first-child").html();
		divText = "<div class='add_box' style='position:relative;display:none'>"+divText+"</div>";
		$("#detectionRecord").empty();
		$("#detectionRecord").append(divText);
	}
	
}
//添加批次-检测明细+-
function checkRecordOperation(type,obj){
	var trText = "<tr class='addBatchCheckDetails' height='50px'>" + $(obj).parent().parent().html() + "</tr>";
	if(type == '1'){
		$(obj).parent().parent().parent().append(trText);
	}
	else if(type == '2'){
		var len = $(obj).parent().parent().parent().find("tr").length;
		if(len > 2){
			$(obj).parent().parent().remove();
		}
	}
}
//添加批次-加工记录
function addBatchTranslateRecord(type,obj){
	var divText = $("#batchTranslateRecord").children("div:first-child").html();
	if(type == '1'){
		//新增加工记录
		divText = "<div class='translateRecord' style='position:relative'>" + divText + "</div>";
		$("#batchTranslateRecord").append(divText);
		$("#batchTranslateRecord").children("div:last-child").css('display','');
		initEmployeeSelect($("#batchTranslateRecord").children("div:last-child").find(".addBatchTranslateEmployee"),0,"请选择加工员工");
	}
	if(type == '2'){
		//删除加工记录
		$(obj).parent().parent().parent().parent().remove();
	}
	if(type == '0'){
		//清空
		var divText = $("#batchTranslateRecord").children("div:first-child").html();
		divText = "<div class='translateRecord' style='position:relative;display:none'>"+divText+"</div>";
		$("#batchTranslateRecord").empty();
		$("#batchTranslateRecord").append(divText);
	}
}

//添加批次-配送记录
function addBatchSendRecord(type,obj){
	var divText = $("#batchSendRecord").children("div:first-child").html();
	if(type == '1'){
		//新增加工记录
		divText = "<div class='sendRecord' style='position:relative'>" + divText + "</div>";
		$("#batchSendRecord").append(divText);
		$("#batchSendRecord").children("div:last-child").css('display','');
		initEmployeeSelect($("#batchSendRecord").children("div:last-child").find(".addBatchSendEmployee"),0,"请选择配送员工");
	}
	if(type == '2'){
		//删除加工记录
		$(obj).parent().parent().parent().parent().remove();
	}
	if(type == '0'){
		//清空
		var divText = $("#batchSendRecord").children("div:first-child").html();
		divText = "<div class='sendRecord' style='position:relative;display:none'>"+divText+"</div>";
		$("#batchSendRecord").empty();
		$("#batchSendRecord").append(divText);
	}
}

//维护档案-生长期图片
function growPicAddRemove(type,obj){
	var divText = $("#add_grow_div").children("div:first-child").html();
	if(type == '1'){
		//生长期图片
		divText = "<div class='add_box' style='position:relative;margin-top:20px;padding:10px 30px;'>" + divText + "</div>";
		$("#add_grow_div").append(divText);
		$("#add_grow_div").children("div:last-child").css('display','');
	}
	if(type == '2'){
		//删除生长期图片
		$(obj).parent().remove();
	}
	if(type == '0'){
		//清空
		var divText = $("#add_grow_div").children("div:first-child").html();
		divText = "<div class='add_box' style='position:relative;margin-top:20px;padding:10px 30px;display:none'>"+divText+"</div>";
		$("#add_grow_div").empty();
		$("#add_grow_div").append(divText);
	}
	
}

//维护档案-成长记录
function growRecord(type,obj,msg){
	var tableText = $("#add_grow_record_table").html();
	if(type == '1'){
		tableText = "<table class='add_grow_record_table' style='margin-top:20px' >" + tableText + "</table>";
		$("#add_grow_record_div").append(tableText);
		$("#add_grow_record_div").css("display","");
		
		var obj = $("#add_grow_record_div").children("table:last-child").find(".grow_record_employee");
		setTimeout(function () {
			initEmployeeSelect(obj,0,"请选择记录人员");
			if(msg != null){
				$(obj).find("option[value='"+msg+"']").attr("selected","selected"); 
				$(obj).trigger('chosen:updated');//更新选项  
			}
		}, 500);
	}
	if(type == '2'){
		//删除成长记录
		var len = $(".add_grow_record_table").length;
		if(len == 2){
			$("#add_grow_record_div").css("display","none");
		}
		$(obj).parent().parent().parent().remove();
	}
	if(type == '0'){
		//清空成长记录
		tableText = "<table id='add_grow_record_table' class='add_grow_record_table' style='margin-top:20px;display:none' >" + tableText + "</table>";
		$("#add_grow_record_div").empty();
		$("#add_grow_record_div").append(tableText);
		$("#add_grow_record_div").css("display","none");
	}
}

//维护档案-饲料记录
function addFeedRecord(type ,obj,msg){
	var divText = $("#add_feed_table").html();
	if(type == '1'){
		divText = "<div class='add_box add_feed_table' style='margin-top:20px;padding:10px 30px;'>" + divText + "</div>";
		$("#add_feed_div").append(divText);
		var obj = $("#add_feed_div").children("div:last-child").find(".feed_record_employee");
		setTimeout(function () {
			initEmployeeSelect(obj,0,"采购人员");
			if(msg != null){
				$(obj).find("option[value='"+msg+"']").attr("selected","selected"); 
				$(obj).trigger('chosen:updated');//更新选项  
			}
		}, 500);
	}
	if(type == '2'){
		//删除饲料记录
		$(obj).parent().parent().parent().parent().parent().remove();
	}
	if(type == '0'){
		//清空饲料记录
		divText = "<div id='add_feed_table' class='add_box add_feed_table' style='margin-top:20px;padding:10px 30px;display:none'>" + divText + "</div>";
		$("#add_feed_div").empty();
		$("#add_feed_div").append(divText);
	}
	
}


//维护档案-疫苗记录
function addVaccineRecord(type ,obj , msg){
	var divText = $("#add_vaccine_record").html();
	if(type == '1'){
		divText = "<div class='add_box add_vaccine_record' style='margin-top:20px;padding:10px 30px;'>" + divText + "</div>";
		$("#add_vaccine_record_div").append(divText);
		var obj = $("#add_vaccine_record_div").children("div:last-child").find(".vaccine_record_check_employee");
		var obj2 = $("#add_vaccine_record_div").children("div:last-child").find(".vaccine_record_deal_employee");
		setTimeout(function () {
			initEmployeeSelect(obj,0,"检测人员");
			initEmployeeSelect(obj2,0,"操作人员");
			$(obj).find("option[value='"+msg.check+"']").attr("selected","selected"); 
			$(obj).trigger('chosen:updated');//更新选项  
			
			$(obj2).find("option[value='"+msg.deal+"']").attr("selected","selected"); 
			$(obj2).trigger('chosen:updated');//更新选项  
			
		}, 500);
	}
	if(type == '2'){
		//删除疫苗记录
		$(obj).parent().parent().parent().parent().parent().remove();
	}
	if(type == '0'){
		//清空疫苗记录
		divText = "<div id='add_vaccine_record' class='add_box add_vaccine_record' style='margin-top:20px;padding:10px 30px;display:none'>" + divText + "</div>";
		$("#add_vaccine_record_div").empty();
		$("#add_vaccine_record_div").append(divText);
	}
	
}

//维护档案-用药记录
function addDrugRecord(type ,obj,msg){
	var divText = $("#add_drug_record").html();
	if(type == '1'){
		divText = "<div class='add_box add_drug_record' style='margin-top:20px;padding:10px 30px;'>" + divText + "</div>";
		$("#add_drug_record_div").append(divText);
		var obj = $("#add_drug_record_div").children("div:last-child").find(".drug_record_check_employee");
		var obj2 = $("#add_drug_record_div").children("div:last-child").find(".drug_record_deal_employee");
		setTimeout(function () {
			initEmployeeSelect(obj,0,"检测人员");
			initEmployeeSelect(obj2,0,"操作人员");
			
			$(obj).find("option[value='"+msg.check+"']").attr("selected","selected"); 
			$(obj).trigger('chosen:updated');//更新选项  
			
			$(obj2).find("option[value='"+msg.deal+"']").attr("selected","selected"); 
			$(obj2).trigger('chosen:updated');//更新选项  
			
			
		}, 500);
	}
	if(type == '2'){
		//删除用药记录
		$(obj).parent().parent().parent().parent().parent().remove();
	}
	if(type == '0'){
		//清空用药记录
		divText = "<div id='add_drug_record' class='add_box add_drug_record' style='margin-top:20px;padding:10px 30px;display:none'>" + divText + "</div>";
		$("#add_drug_record_div").empty();
		$("#add_drug_record_div").append(divText);
	}
	
}



//维护档案-认证信息
function addCredentials(type,obj){
	var divText = $("#add_credentials_info_div").html();
	if(type == 1){
		divText = "<div class='add_box add_credentials_info_div' style='position:relative;margin-top:20px;padding:10px 10px'>" + divText + "</div>";
		$("#add_credentials_div").append(divText);
	}
	if(type == '2'){
		$(obj).parent().remove();
	}
	if(type == '0'){
		divText = "<div id='add_credentials_info_div' class='add_box add_credentials_info_div' style='position:relative;margin-top:20px;padding:10px 10px;display:none'>" + divText + "</div>";
		$("#add_credentials_div").empty();
		$("#add_credentials_div").append(divText);
	}
}
//维护档案-购买信息
function buyInfo(type,obj){
	if(type == 1){
		//新增
		var trText = "<tr>" + $(obj).parent().parent().html() + "</tr>";
		$(obj).parent().parent().parent().append(trText);
	}
	if(type == 2){
		//删除
		var len = $(obj).parent().parent().parent().find("tr").length;
		if(len > 1){
			$(obj).parent().parent().remove();
		}
	}
	if(type == '0'){
		//清空
		var trText = "<tr>" + $("#buy_web").find("tr:first-child").html() + "</tr>";
		$("#buy_web").empty();
		$("#buy_web").append(trText);
		trText = "<tr>" + $("#buy_shop").find("tr:first-child").html() + "</tr>";
		$("#buy_shop").empty();
		$("#buy_shop").append(trText);
	}
}

//维护档案
function saveUpdateArchives(){
	var sourceId = $("#update_archives_id").val();
	var productName = $("#update_archives_product_name").val();
	var icon = $("#update_archives_product_pic").attr("src");
	var plantTime = $("#plantingTime").val();
	var crop = $("#update_archives_crop").val();
	var varieties = $("#update_archives_varieties").val();
	var leader = $("#update_archives_leader").val();
	var desc = $("#update_archives_product_info").val();
	
	if(productName == null || productName == ""){
		toastr.warning('请填写产品名称','提示');
		return;
	}
	if(icon == null || icon == ""){
		toastr.warning('请选择产品图片','提示');
		return;
	}
	if(plantTime == null || plantTime == ""){
		toastr.warning('请填写种植时间','提示');
		return;
	}
	if(crop == null || crop == ""){
		toastr.warning('请填写产品作物','提示');
		return;
	}
	if(varieties == null || varieties == ""){
		toastr.warning('请填写产品品种','提示');
		return;
	}
	if(leader == null || leader == "" || leader == '0'){
		toastr.warning('请填写产品负责人','提示');
		return;
	}
	$('.btn-ladda-demo3').ladda( 'bind');
	Ladda.bind( '.progress-demo .ladda-button',{
	    callback: function( instance ){
	        var progress = 0;
	        var interval = setInterval( function(){
	            progress = Math.min( progress + Math.random() * 0.1, 1 );
	            instance.setProgress( progress );

	            if( progress === 1 ){
	                instance.stop();
	                clearInterval( interval );
	            }
	        }, 200 );
	    }
	});
	var l = $('.btn-ladda-demo3').ladda();
	l.ladda( 'start' );
	var fishSource = {};//鱼苗来源
	var fishName = $("#fishName").val();
	var fishFactoryName = $("#fishFactoryName").val();
	var fishSize = $("#fishSize").val();
	var fishQuality = $("#fishQuality").val();
	var fishBuy = $("#fishBuy").val();
	var fishBuyName = $("#fishBuy").find("option:selected").text();
	if(fishBuy == '0'){
		fishBuyName = "";
	}
	var fishHgz = $(".fishHgzUploadPicPic").attr("src");
	var fishSale = $(".fishSaleUploadPicPic").attr("src");
	fishSource.name = fishName;
	fishSource.factory=fishFactoryName;
	fishSource.size = fishSize;
	fishSource.quality = fishQuality;
	fishSource.buy = fishBuy;
	fishSource.buyname = fishBuyName;
	fishSource.hgzIcon = fishHgz;
	fishSource.saleIcon = fishSale;
	
	var growPicJsonArr = [];//生长期图片
	var growJsonArr = [];//成长记录
	var feedJsonArr = [];//饲料记录
	var vaccineJsonArr = [];//疫苗记录
	var drugJsonArr = [];//用药记录
	var renZhengInfoJsonArr=[];//认证信息
	
	//生长期图片
	$("#add_grow_div").children().each(function(index,element){
		if(index > 0){
			var growPicJson = {};
			var picDate = $(this).find(".grow_pic_date").val();
			var position = $(this).find(".grow_pic_position").val();
			var desc = $(this).find(".grow_pic_desc").val();
			var icon = $(this).find(".growPicUploadPicPic").attr("src");
			var type = $(this).find(".grow_pic_type").val();
			var chl = $(this).find(".grow_pic_chl").val();
			var shl = $(this).find(".grow_pic_shl").val();

			growPicJson.picDate=picDate;
			growPicJson.position=position;
			growPicJson.desc=desc;
			growPicJson.icon=icon;
			growPicJson.type = type;
			growPicJson.chl = chl;
			growPicJson.shl = shl;
			growPicJsonArr.push(growPicJson);
		}
	});
	
	//成长记录
	$(".add_grow_record_table").each(function(index,element){
		if(index > 0){
			var growRecordJson = {};
			var type = $(this).find(".grow_record_type").val();
			var time = $(this).find(".grow_record_time").val();
			var size = $(this).find(".grow_record_size").val();
			var quality = $(this).find(".grow_record_quality").val();
			var state = $(this).find(".grow_record_state").val();
			var employee = $(this).find(".grow_record_employee").val();
			var employeename = $(this).find(".grow_record_employee").find("option:selected").text();
			if(employee == '0'){
				employeename = "";
			}
			
			if(time == "" && size == "" && quality == "" && state=="" && employee == "0"){
				return true;
			}
			
			growRecordJson.type = type;
			growRecordJson.time = time;
			growRecordJson.size = size;
			growRecordJson.quality = quality;
			growRecordJson.state = state;
			growRecordJson.employee = employee;
			growRecordJson.employeename=employeename;
			growJsonArr.push(growRecordJson);
		}
	});
	//饲料
	$(".add_feed_table").each(function(index,element){
		if(index > 0){
			var feedJson = {};
			var time = $(this).find(".feed_use_time").val();
			var name = $(this).find(".feed_name").val();
			var factoryDate =  $(this).find(".feed_factory_date").val();
			var factory =  $(this).find(".feed_factory").val();
			var buyDate = $(this).find(".feed_buy_date").val();
			var type = $(this).find(".feed_type").val();
			var buyCnt = $(this).find(".buy_cnt").val();
			var outCnt = $(this).find(".out_cnt").val();
			var inTmp = $(this).find(".in_tmp").val();
			var outTmp = $(this).find(".in_tmp").val();
			var employee = $(this).find(".feed_record_employee").val();
			var employeename = $(this).find(".feed_record_employee").find("option:selected").text();
			if(employee == '0'){
				employeename = "";
			}
			if(time == "" && name == "" && factoryDate == "" && factory=="" && buyDate == ""
				&& type == "" && buyCnt == "" && outCnt == "" && inTmp=="" && outTmp == "" && employee == "0"){
				return true;
			}
			
			feedJson.time=time;
			feedJson.name=name;
			feedJson.factoryDate=factoryDate;
			feedJson.factory=factory;
			feedJson.buyDate=buyDate;
			feedJson.type=type;
			feedJson.buyCnt=buyCnt;
			feedJson.outCnt=outCnt;
			feedJson.inTmp=inTmp;
			feedJson.outTmp=outTmp;
			feedJson.employee=employee;
			feedJson.employeename=employeename
			feedJsonArr.push(feedJson);
		}
	});
	
	//疫苗
	$(".add_vaccine_record").each(function(index,element){
		if(index > 0){
			var vaccineJson = {};
			var time = $(this).find(".vaccine_use_time").val();
			var name = $(this).find(".vaccine_name").val();
			var factoryDate =  $(this).find(".vaccine_factory_date").val();
			var factory =  $(this).find(".vaccine_factory").val();
			var buyDate = $(this).find(".vaccine_buy_date").val();
			var useCnt = $(this).find(".vaccine_cnt").val();
			var reason = $(this).find(".vaccine_reason").val();
			var check = $(this).find(".vaccine_record_check_employee").val();
			var deal = $(this).find(".vaccine_record_deal_employee").val();
			var checkname = $(this).find(".vaccine_record_check_employee").find("option:selected").text();
			var dealname = $(this).find(".vaccine_record_deal_employee").find("option:selected").text();
			if(check == '0'){
				checkname = "";
			}
			if(deal == '0'){
				dealname = "";
			}
			if(time == "" && name == "" && factoryDate == "" && factory=="" && buyDate == ""
				&& useCnt == "" && reason == "" && check == "0" && deal == "0"){
				return true;
			}
			
			vaccineJson.time=time;
			vaccineJson.name=name;
			vaccineJson.factoryDate=factoryDate;
			vaccineJson.factory=factory;
			vaccineJson.buyDate=buyDate;
			vaccineJson.useCnt=useCnt;
			vaccineJson.reason=reason;
			vaccineJson.check=check;
			vaccineJson.deal=deal;
			vaccineJson.checkname=checkname;
			vaccineJson.dealname=dealname;
			vaccineJsonArr.push(vaccineJson);
		}
	});
	
	//用药
	$(".add_drug_record").each(function(index,element){
		if(index > 0){
			var drugJson = {};
			var time = $(this).find(".drug_use_time").val();
			var name = $(this).find(".drug_name").val();
			var factoryDate =  $(this).find(".drug_factory_date").val();
			var factory =  $(this).find(".drug_factory").val();
			var buyDate = $(this).find(".drug_buy_date").val();
			var useCnt = $(this).find(".drug_use_cnt").val();
			var reason = $(this).find(".drug_reason").val();
			var check = $(this).find(".drug_record_check_employee").val();
			var deal = $(this).find(".drug_record_deal_employee").val();
			var checkname = $(this).find(".drug_record_check_employee").find("option:selected").text();
			var dealname = $(this).find(".drug_record_deal_employee").find("option:selected").text();
			if(check == '0'){
				checkname = "";
			}
			if(deal == '0'){
				dealname = "";
			}
			if(time == "" && name == "" && factoryDate == "" && factory=="" && buyDate == ""
				&& useCnt == "" && reason == "" && check == "0" && deal == "0"){
				return true;
			}
			
			drugJson.time=time;
			drugJson.name=name;
			drugJson.factoryDate=factoryDate;
			drugJson.factory=factory;
			drugJson.buyDate=buyDate;
			drugJson.useCnt=useCnt;
			drugJson.reason=reason;
			drugJson.check=check;
			drugJson.deal=deal;
			drugJson.checkname=checkname;
			drugJson.dealname=dealname;
			drugJsonArr.push(drugJson);
		}
	});
	
	
	//认证信息
	$("#add_credentials_div").children().each(function(index,element){
		if(index > 0){
			var renzhengJson = {};
			var rzType = $(this).find(".credentials_type").val();
			var rzBzDate = $(this).find(".credentials_date").val();
			var rzNum = $(this).find(".credentials_num").val();
			var rzEndDate = $(this).find(".credentials_end_date").val();
			var rzJg = $(this).find(".credentials_jg").val();
			var icon = $(this).find(".addCredentialsUploadPicPic").attr("src");
			
			if(rzType == "0" && rzBzDate == "" && rzNum == "" && rzEndDate=="" 
				&& rzJg == "" && icon == ""){
				return true;
			}
			
			renzhengJson.rzType=rzType;
			renzhengJson.rzBzDate=rzBzDate;
			renzhengJson.rzNum=rzNum;
			renzhengJson.rzEndDate=rzEndDate;
			renzhengJson.rzJg=rzJg;
			renzhengJson.icon=icon;
			renZhengInfoJsonArr.push(renzhengJson);
		}
	});
	
	var devices = "";
	$(".fish_device_choose").each(function(){
		if($(this).parent().hasClass("checked")){
			devices+="," + $(this).attr("val");
		}
	});
	if(devices.length>0){
		devices=devices.substring(1);
	}
	
	var webLinks = "";
	$("#buy_web").find(".web_link").each(function(index,element){
		var webLink = $(this).val();
		if(webLink != null && webLink != ''){
			webLink = webLink.replace("|","");
			webLinks+="|" + webLink;
		}
	});
	if(webLinks.length>0){
		webLinks=webLinks.substring(1);
	}
	
	var shopAddress = "";
	$("#buy_shop").find(".shop_address").each(function(index,element){
		var shop = $(this).val();
		if(shop != null && shop != ''){
			shop = shop.replace("|","");
			shopAddress+= "|" + shop;
		}
	});
	if(shopAddress.length>0){
		shopAddress=shopAddress.substring(1);
	}
	
	var saler = $("#sale_employee_list").val(); 
	if(saler != null && saler!=''){
		saler = saler.toString();
	}
	
	var customJsonArr = [];
	$("#custom_div").children().each(function(index,element){
		if(index > 0){
			var customJson = {};
			var details = [];
			var name = $(this).find(".custom_name").val();
			$(this).children("table:last-child").find("tr").each(function(index,element){
				var detail = {};
				var time = $(this).find(".custom_time").val();
				var content = $(this).find(".custom_content").val();
				detail.time = time;
				detail.content = content;
				details.push(detail)
			});
			customJson.name = name;
			customJson.details = details;
			customJsonArr.push(customJson);
		}
	});
	
//	console.info("鱼苗来源" + JSON.stringify(fishSource));
//	console.info("生长期图片" + JSON.stringify(growPicJsonArr));
//	console.info("成长记录" + JSON.stringify(growJsonArr));
//	console.info("饲料记录" + JSON.stringify(feedJsonArr));
//	console.info("疫苗记录" + JSON.stringify(vaccineJsonArr));
//	console.info("用药记录" + JSON.stringify(drugJsonArr));
//	console.info("认证信息" + JSON.stringify(renZhengInfoJsonArr));
//	console.info("环境数据" + devices);
//	console.info("网店链接" + webLinks);
//	console.info("实体店地址" + shopAddress);
	
	$.ajax({
 		type:"POST",
 		url:"actionServlet",
 		data:{"actionName":"sourceService","method":"updateFishArchive","productId":sourceId
 				,"productName":productName,"productIcon":icon,"productDetail":crop,"productType":varieties
 				,"plantTime":plantTime,"employeeId":leader,"productInformation":desc
 				,"fishSource":JSON.stringify(fishSource)
 				,"growthPic":JSON.stringify(growPicJsonArr)
 				,"authInfo":JSON.stringify(renZhengInfoJsonArr)
 				,"growInfo":JSON.stringify(growJsonArr)
 				,"feedInfo":JSON.stringify(feedJsonArr)
 				,"vaccineInfo":JSON.stringify(vaccineJsonArr)
 				,"drugInfo":JSON.stringify(drugJsonArr)
 				,"webLinks":webLinks,"shopAddress":shopAddress
 				,"envData":devices,"saler":saler
 				,"custom":JSON.stringify(customJsonArr)},
 		dataType:"JSON",
 		success:function(data){
 			if(data.statusCode == 100){
 				l.ladda('stop');
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
 			if(data.statusCode == 1){
 				getSourceList(1);
 				l.ladda('stop');
 				$("#updateArchivesDiv").modal('hide');
 				swal({
	       		    title: "保存成功",
	       		    text: "",
	       		    type: "success"
 		       	});
 			}
 		}
	});
	
}


//维护档案-成长期类型
function chooseGrowPicType(obj){
	
	var type = $(obj).val();
	if(type == 1){
		$(obj).parent().parent().parent().find(".tr_grow_chl").css("display","");
		$(obj).parent().parent().parent().find(".tr_grow_shl").css("display","none");
	}else if(type == 2){
		$(obj).parent().parent().parent().find(".tr_grow_chl").css("display","none");
		$(obj).parent().parent().parent().find(".tr_grow_shl").css("display","none");
	}else if(type == 3){
		$(obj).parent().parent().parent().find(".tr_grow_chl").css("display","none");
		$(obj).parent().parent().parent().find(".tr_grow_shl").css("display","");
	}
	
}

//维护档案-自定义模块
function addCustomDiv(type,obj){
	var divText = $("#custom_div_demo").html();
	divText = "<div class='add_box' style='margin-top:10px;' >" + divText + "</div>"
	if(type == 1){
		$("#custom_div").append(divText);
	}
	if(type == 2){
		$(obj).parent().parent().parent().parent().parent().remove();
	}
	if(type == 0){
		var divText = $("#custom_div_demo").html();
		divText = "<div id='custom_div_demo' class='add_box' style='margin-top:10px;display:none' >" + divText + "</div>"
		$("#custom_div").empty();
		$("#custom_div").append(divText);
	}
}

//维护档案-自定义模块-内容
function addCustomContentDiv(type,obj){
	if(type == 1){
		var trText = "<tr>" + $(obj).parent().parent().html() + "</tr>";
		$(obj).parent().parent().parent().append(trText);
	}
	if(type == 2){
		if($(obj).parent().parent().parent().find("tr").length > 1){
			$(obj).parent().parent().remove();
		}
	}
}



//添加批次-检测项目
function addBatchChangeCheckPro(obj){
	var selectVal = $(obj).val();
	$(obj).parent().parent().parent().find(".addBatchCheckDetailsType").empty();
	var option = "";
	if(selectVal == '31'){
		option += "<option value='31'>硝基呋喃类代谢物</option>";
		option += "<option value='32'>孔雀石绿</option>";
		option += "<option value='33'>氯霉素</option>";
		option += "<option value='34'>土霉素</option>";
		option += "<option value='35'>磺胺类</option>";
	}
	if(selectVal == '32'){
		option += "<option value='41'>铅</option>";
		option += "<option value='42'>镉</option>";
		option += "<option value='43'>汞</option>";
		option += "<option value='44'>砷</option>";
	}
	if(selectVal == '33'){
		option += "<option value='51'>麻痹行贝类毒瘤</option>";
		option += "<option value='52'>腹泻型贝类毒瘤</option>";
		option += "<option value='53'>河豚毒素</option>";
	}
	if(selectVal == '34'){
		option += "<option value='51'>致泻型大肠杆菌</option>";
		option += "<option value='52'>副溶血型弧菌</option>";
		option += "<option value='53'>金色葡萄球菌</option>";
	}
	$(obj).parent().parent().parent().find(".addBatchCheckDetailsType").append(option);
	

}

//12.26搜索
function search(){
	var searchStartTime=$(".areaSelectionOptionsLeft>input.startTime").val();
	var searchEndTime=$(".areaSelectionOptionsLeft>input.endTime").val();
	var searchKeyword=$(".areaSelectionOptionsLeft>input.searchProduct").val();
}

//显示遮罩层   
function showMask(){
	var height = $("body").height();
    $("#mask").css("height",height);     
    $("#mask").css("width","100%");     
    $("#mask").show();     
}  
//隐藏遮罩层  
function hideMask(){
    $("#mask").hide();   
    $("#h5_view_pic").css("display","none");
}

//12.28
function preview(barcode){
	$("#batch_list").modal('hide');
	$.ajax({
 		type:"POST",
 		url:"staticServlet",
 		data:{"actionName":"STCH5Service","method":"showArchive","barcode":barcode},
 		dataType:"JSON",
 		success:function(data){
 			if(data.statusCode == 100){
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
 			$("#viewTheFiles").modal('show');
 			$("#picturePreview .carousel-inner").empty();
 			$("#h5_view_pro_batch_id").val(data.result.batchId);
 			$("#h5_view_pro_pic").attr("src",imgUrl + data.result.productIcon);
 			$("#h5_view_pro_detail").html(data.result.productDetail);
			$("#h5_view_pro_type").html(data.result.productType);
			$("#h5_view_pro_date").html(data.result.listedTime);
			$("#h5_view_company_name").html(data.result.companyName);
			$("#h5_view_leader").html(data.result.employeeName);
			$("#h5_view_company_address").html(data.result.address);
			$("#h5_view_pro_desc").html(data.result.productInformation);
			$("#h5_view_company_info").html(data.result.describe);
 			if(data.result.quotaDesc == ""){
			    	$("#cpzb").css("display","none");
			    }else{
			    	$("#cpzb").css("display","");
			    	$("#h5_view_pro_quota_desc").html(data.result.quotaDesc);
			    }
			var lng = 116.404;
			var lat = 39.915;
			if(data.result.lng != ""){
				lng = data.result.lng;
			}
			if(data.result.lat != ""){
				lat = data.result.lat;
			}
			var map = new BMap.Map("position_map");
			var point = new BMap.Point(lng,lat);
			map.centerAndZoom(point, 15);
			map.enableScrollWheelZoom(true);
			map.clearOverlays();
			var marker = new BMap.Marker(new BMap.Point(lng, lat)); // 创建点
			map.addOverlay(marker);   
			marker.setAnimation(BMAP_ANIMATION_BOUNCE);
			map.panBy(180, 120);
			$("#productIntroduction>p").html(data.result.productInformation);
			//鱼苗来源
			var ymly=JSON.parse(data.result.fishSource);
			
			$("#souceFormList .seedName").html(ymly.name);
			$("#souceFormList .venderName").html(ymly.buy);
			$("#souceFormList .spec").html(ymly.size);
			$("#souceFormList .fryQuality").html(ymly.quality);
			$("#souceFormList .purchaser").html(ymly.buyname);
			if(ymly.hgzIcon!=''){$("#souceFormList .scz").html('<img style="width:200px;height:200px" src="'+imgUrl + ymly.hgzIcon+'" alt="">');}
			if(ymly.saleIcon!=''){$("#souceFormList .xss").html('<img style="width:200px;height:200px" src="'+imgUrl + ymly.saleIcon+'" alt="">');}
			//生长期图片
			var szPic = JSON.parse(data.result.growthPic);
			if(szPic == null || szPic.length == 0){
			   $(".growthPhaseBox").css('display','none')
			}else{
			    $(".growthPhaseBox").css('display','')
			    for(var z=0,szHtml='';z<szPic.length;z++){
	 			  szHtml+='<div class="item"><img style="width:800px;height:500px" src="'+imgUrl + szPic[z].icon+'"><div class="carousel-caption"><p class="pictureTime">'+szPic[z].picDate+'</p><p class="pictureAddress">'+szPic[z].position+'</p><p class="pictureRemarks">'+szPic[z].desc+'</p></div></div>';
	 			 }
	 			    sessionStorage.setItem('ymSzqkey',szHtml)
			    }
			//成长记录
			var growUp=JSON.parse(data.result.growInfo);
			var growUpHtml='';
			if(growUp.length==0){
				$(".fertilizerUseTableBox").css('display',"none")
				sessionStorage.setItem("growUpkey", '');
			}
			else{
				$(".fertilizerUseTableBox").css('display',"")
				growUpHtml+='<tbody>';
				for(var y=0;y<growUp.length;y++){
					growUpHtml+='<tr><td>'+growUp[y].time+'</td><td>'+growUp[y].size+'</td><td>'+growUp[y].quality+'</td><td>'+growUp[y].state+'</td><td>'+growUp[y].employeename+'</td></tr>';
				}
				growUpHtml+='</tbody>';
				sessionStorage.setItem('growUpkey',growUpHtml);
			}
			//饲料记录
			var feedingHtml='';
			var feed=JSON.parse(data.result.feedInfo);
			if(feed.length==0){
				$(".viewLogBox").css("display","none")
				sessionStorage.setItem("feedkey", '');
			}
			else{
				$(".viewLogBox").css("display","")
				feedingHtml='<tbody>';
				for(var o=0;o<feed.length;o++){
					feedingHtml+='<tr><td>'+feed[o].time+'</td><td>'+feed[o].name+'</td><td>'+feed[o].type+'</td><td>'+feed[o].employeename+'</td></tr>';
				}
				feedingHtml+='</tbody>';
				sessionStorage.setItem("feedkey",feedingHtml);
			}
			//疫苗记录
			var vaccineHtml='';
			var vaccine=JSON.parse(data.result.vaccineInfo)
			if(vaccine.length==0){
				$(".KeyEnvironmentalDataBox").css("display","none");
				sessionStorage.setItem('vaccinekey','');
			}
			else{
				$(".KeyEnvironmentalDataBox").css("display","");
				vaccineHtml='<tbody>';
				for(var p=0;p<vaccine.length;p++){
					vaccineHtml+='<tr><td>'+vaccine[p].time+'</td><td>'+vaccine[p].name+'</td><td>'+vaccine[p].useCnt+'</td><td>'+vaccine[p].reason+'</td><td>'+vaccine[p].checkname+'</td></tr>';
				}
				vaccineHtml+='</tbody>';
				sessionStorage.setItem('vaccinekey',vaccineHtml);
			}
			//用药记录
			var marHtml='';
			var mar=JSON.parse(data.result.drugInfo);
			if(mar.length==0){
				$(".agriculturalRecordsBox").css("display","none");
				sessionStorage.setItem("markey", '');
			}
			else{
				$(".agriculturalRecordsBox").css("display","");
				marHtml='<tbody>';
				for(var z=0;z<mar.length;z++){
					marHtml+='<tr><td>'+mar[z].time+'</td><td>'+mar[z].name+'</td><td>'+mar[z].useCnt+'</td><td>'+mar[z].reason+'</td><td>'+mar[z].checkname+'</td></tr>';
				}
				marHtml+='</tbody>';
				sessionStorage.setItem("markey", marHtml); 
			}
			//认证信息
			var lsp=function(dataid){
		         this.dataid=dataid;
		         return this;
		     };
		     lsp.prototype={
		         add:function(dataval){
		             this.dataval=dataval || [];
		             sessionStorage.setItem(this.dataid,JSON.stringify(this.dataval));
		         },
		         get:function(){
		            return JSON.parse(sessionStorage.getItem(this.dataid));
		         },
		         remove:function(){
		         	sessionStorage.removeItem(this.dataid);
		         },
		         clear:function(){
		         	sessionStorage.clear();
		         }
		     };
		     var credentials=JSON.parse(data.result.authInfo);
		     if(credentials == null || credentials.length == 0){
		        $(".productIntroductionBox").css('display','none')
		     }else{
				 var nlsp =new lsp("credentialsContent");
			     nlsp.add(credentials);
			     var gn=nlsp.get();
			     var nlsp=new lsp("credentialsContent").add(credentials);
		     }
		   //环境监控
		     var deviceMapHtml='';
		      var device = data.result.envData;
		      if(device == null || device == ""){
		        	$(".seedSourceInformationBox").css('display','none')
		        }else{
		          $(".seedSourceInformationBox").css('display','');
		          var devices = device.split(",");
			      $.each(devices,function(i,e){
			    	  deviceMapHtml+='<span class=""><input type="hidden" value="'+e+'"><a>'+deviceMap[e]+'</a></span>'
			      });
			      $("#environmentalDataOptions").html(deviceMapHtml);
			      $("#environmentalDataOptions").children("span:first-child").addClass('envDataLeft').addClass('envDataChoose');
			      $("#environmentalDataOptions").children("span:last-child").addClass("envDataRight");
		        }
		      //公司简介
		      $("#companyProfile>p").html(data.result.describe);
		      //实体店
		        $(".tr_view_buy").remove();
		        var shop = data.result.shopAddress;
		        if(shop != ""){
		        	var shops = shop.split("|");
		        	var shopHtml = "";
		        	for(var i = 0;i<shops.length;i++){
		        		shopHtml+="<tr class='tr_view_buy' style='text-align:right;margin-right:10px'><td>"+shops[i]+"</td></tr>";
		        	}
		        	$("#view_h5_shop").append(shopHtml);
		        }
		        //网店
		       var web = data.result.webLinks;
		        if(web != ""){
		        	var webs = web.split("|");
		        	var webHtml = "";
		        	for(var i = 0;i<webs.length;i++){
		        		webHtml+="<tr class='tr_view_buy' style='text-align:right;margin-right:10px'><td><a target='_blank' href='"+webs[i]+"'>点击购买</a></td></tr>";
		        	}
		        	$("#view_h5_web").append(webHtml);
		        }
		        //销售
	 		       var saler = data.result.saler;
			        if(saler != ""){
			        	var salers = saler.split(";");
			        	var salerHtml = "";
			        	for(var i = 0;i<salers.length;i++){
			        		salerHtml+="<tr class='tr_view_buy' style='text-align:right;margin-right:10px'><td><span>"+salers[i].split(",")[0]+"</span><span style='margin-left:20px'>" + salers[i].split(",")[1] + "</span></td></tr>";
			        	}
			        	$("#view_h5_saler").append(salerHtml);
			        }
			    
 		}
	})

	
}
//鱼苗来源
function fry(){
	$("#seedsourceInformation").modal('show');
}
//生长期图片
function growthPhaseBoxClick(tableName){
	showMask();
	var ymSzqvalue=sessionStorage.getItem('ymSzqkey');
	$(".carousel-inner").html(ymSzqvalue);
	$(".carousel-inner").children("div:first-child").addClass("active");
	$("#picturePreview h3").html($(tableName).children("div:last-child").html())
	$("#h5_view_pic").css("display","");
}

//成长记录
function growUp(tableName){
	$("#viewTable").modal('show');
	$("#viewTable .propmt").css('display','none');
	$("#viewTable h4").html($(tableName).children('div:last-child').html());
	var growUpkey=sessionStorage.getItem('growUpkey');
	if(growUpkey==''){$("#useTable").empty();$("#viewTable .propmt").css('display','block')}
	else{
		var thead='<thead><tr><th>记录时间</th><th>尺寸</th><th>质量</th><th>健康状态</th><th>记录人</th></tr></thead>';
		$("#useTable").html(thead+growUpkey);
	}
}
//饲料记录
function feed(tableName){
	$("#viewTable").modal('show');
	var feedkey=sessionStorage.getItem('feedkey');
	$("#viewTable .propmt").css('display','none');
	$("#viewTable h4").html($(tableName).children('div:last-child').html());
	if(feedkey==''){$("#useTable").empty();$("#viewTable .propmt").css('display','block')}
	else{
		var thead='<thead><tr><th>使用时间</th><th>名称</th><th>品种</th><th>操作人</th></tr></thead>';
		$("#useTable").html(thead+feedkey);
	}
}
//疫苗记录
function vaccine(tableName){
	var vaccinekey=sessionStorage.getItem('vaccinekey');
	$("#viewTable .propmt").css('display','none');
	$("#viewTable h4").html($(tableName).children('div:last-child').html());
	$("#viewTable").modal('show');
	if(vaccinekey==''){$("#useTable").empty();$("#viewTable .propmt").css('display','block')}
	else{
		var thead='<thead><tr><th>使用时间</th><th>名称</th><th>使用量</th><th>病因</th><th>操作人</th></tr></thead>';
		$("#useTable").html(thead+vaccinekey);
	}
}
//用药记录
function marClick(tableName){
	var marvalue=sessionStorage.getItem('markey');
	$("#viewTable .propmt").css('display','none');
	$("#viewTable h4").html($(tableName).children('div:last-child').html());
	$("#viewTable").modal('show');
	if(marvalue==''){$("#useTable").empty();$("#viewTable .propmt").css('display','block')}
	else{
		var thead='<thead><tr><th>使用时间</th><th>名称</th><th>用量</th><th>病因</th><th>操作人</th></tr></thead>';
		$("#useTable").html(thead+marvalue);
	}
}
//认证信息
function productCertification(){
	$("#productCertification").modal('show');
	var credentialsContent=JSON.parse(sessionStorage.getItem('credentialsContent'));
	var credentialsHtml='';
	for(var i=0;i<credentialsContent.length;i++){
		credentialsHtml+='<tr style="height:50px" data-id='+i+' onclick="tabletr(this)"><td>'+authMap[credentialsContent[i].rzType]+'</td><td>已检测</td><td>&gt;</td></tr>';
	}
 	$("#productTable>tbody").html(credentialsHtml);
	$("#productTable tr").mouseenter(function(){
    	$(this).css('background','#ddd');
    })
    $("#productTable tr").mouseleave(function(){
    	$(this).css('background','#fff');
    })
}
//认证信息
function tabletr(tableName){
	// $("#productTable").on('click','tr',function(){
	    	$("#picturePreview h3").html($(this).children("td:first-child").html());
	    	var n=$(tableName).attr("data-id");
	    	var rzContent=JSON.parse(sessionStorage.getItem('credentialsContent'));
	    	var rzHtml='';
	    	for(var j=0;j<rzContent.length;j++){
	    		rzHtml+='<div class="item"><img style="width:800px;height:500px" src="'+imgUrl + rzContent[j].icon+'"><div class="carousel-caption"><p class="pictureTime">证书编号:'+rzContent[j].rzNum+'</p><p class="pictureAddress">颁证日期:'+rzContent[j].rzBzDate+'</p><p>有效期:'+rzContent[j].rzEndDate+'</p><p class="pictureRemarks">认证机构:'+rzContent[j].rzJg+'</p></div></div>';
	    	}
	    	showMask();
	    	$(".carousel-inner").html(rzHtml);
	    	$(".carousel-inner").children("div").eq(n).addClass("active");
	    	$("#h5_view_pic").css("display","");
	    	
	   // })
}
//环境数据
function environment(){
	$("#environmentalData").modal('show');
	$("#environmentalDataOptions").children("span:first-child").click();

}

function environmentalData(listss,listDateCope,listName){
    var myChart = echarts.init(document.getElementById("main"));
    myChart.clear();
    var option = {
            tooltip : {
            trigger: 'axis',
            formatter:function(data){
                var res='<div style="color:#fff">'+data[0].name+'</div>' ;
                for(var i=0;i<data.length;i++){
                    res+='<div style="color:#fff">'+data[i].seriesName+':'+data[i].data+'</div>';
                }
                return res;
                }
            },
            legend: {
                data:listName,
                show:true,
                bottom:'10%',
                selected:{'平均值':true,'最高值':true,'最低值':true}
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom:"15%",
                containLabel: true
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : listDateCope
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    min: 0,
                    max: 100
                }
            ],
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
                }, {
                start: 0,
                end: 100,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series : listss
        };
        myChart.setOption(option); 
}


(function(){
	$(function(){
		  $("#theList").on('click','.printBarCode',function(){
			  $(this).parent().parent().parent().children(":first-child").children(":last-child").children("p:first-child").html("产品名称:"+$("#batchListPrduct").html())
			  $(this).parent().parent().parent().children(":first-child").children(":last-child").children("p:last-child").html("经销商:"+$("#companyName").html())
			  $(this).parent().parent().parent().children(":first-child").jqprint({
		            debug: false,            
		            importCSS: false,         
		            printContainer: true,    
		            operaSupport: true ,   
		      });  
			
		  })
		  $("#theList").on('click','.printTwoCode',function(){
			  $(this).parent().parent().prev().children().children().children().children("td:last-child").children(":last-child").children("p:first-child").html("产品名称:"+$("#batchListPrduct").html())
			  $(this).parent().parent().prev().children().children().children().children("td:last-child").children(":last-child").children().eq(1).html("经销商:"+$("#companyName").html())
			  $(this).parent().parent().prev().children().children().children().children("td:last-child").jqprint({
				  	debug: false,            
		            importCSS: false,         
		            printContainer: true,    
		            operaSupport: true  
			  })
		  })
		  $("#traceabilityArchives>li").mouseenter(function(){
			  var img = $(this).find("img").attr("src").replace(".png","_click.png");
			   $(this).find("img").attr("src",img);
		  })
		   $("#traceabilityArchives>li").mouseleave(function(){
			   var img = $(this).find("img").attr("src").replace("_click","");
				$(this).find("img").attr("src",img);
		  })
		 
		//切换环境数据
		$("#environmentalDataOptions").on('click','span',function(){
			$(this).addClass('envDataChoose').siblings('.envDataChoose').removeClass('envDataChoose');
			var deviceId = $(this).children("input:first-child").val();
			 var batchId = $("#h5_view_pro_batch_id").val();
			 var myChart = echarts.init(document.getElementById("main"));
				myChart.clear();
				myChart.showLoading({
				    text: '正在努力的读取数据中...',    //loading话术
				});
			 $.ajax({
			 		type:"POST",
			 		url:"/wisdom_farming_site/staticServlet",
			 		data:{"actionName":"STCH5Service","method":"queryEnvData","batchId":batchId,"deviceNum":deviceId},
			 		dataType:"JSON",
			 		success:function(data){
			 			if(data.statusCode == 100){
			 				toastr.error('请联系管理员','未拥有权限');
			 				return;
			 			}
			 			myChart.hideLoading();
			 			var listss=[];
						var listName=[];
						var listDateCope=[];
						    //值
						var list = data.result.y;
						var listData = data.result.x;
						for(var i=0;i<list.length;i++){
						   var listObj={};
						   listName.push(list[i].name)
						   listObj.name=list[i].name;
						   listObj.type="line";
						   listObj.data=list[i].data;
						   listss.push(listObj);
						}
						 //日期
						for(var j=0;j<listData.length;j++){
						   listDateCope.push(listData[j]);
						}
					 environmentalData(listss,listDateCope,listName); 
			 		}
			 })
		})
	})
})()
