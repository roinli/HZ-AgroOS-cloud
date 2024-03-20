var employeeList;
//var imgUrl = "http://ozdwirxvt.bkt.clouddn.com/";
var pageSize=5;
var areaList;
var deviceMap= {"1":"空气温度","2":"空气湿度","3":"CO2浓度","4":"光照强度","5":"土壤温度","6":"土壤水分","7":"土壤PH"}
var authMap= {"1":"农药残留检测","2":"无公害农产品认证","3":"绿色食品认证","4":"有机食品认证","5":"HACCP认证","6":"土壤检测报告","7":"国家地理认证"
		,"8":"食品安全检测报告","9":"ISO质量管理体系认证","10":"优良种子认证","11":"ISO食品安全管理体系认证","12":"大米检测报告","13":"营养检测报告"
		,"14":"QS食品质量安全认证","15":"食品流通许可证","16":"大米监测报告","17":"其他认证","0":"其他认证"}
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
	$("#newProductGfNum").empty();
	$('#saveNewProductUploadPicPic').attr("src","");
    $('#saveNewProductUploadPicPic').css('display','none');
    $('#saveNewProductUploadPicBtn').css('display','');
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
	addFertilization(0,null);
	addAdministration(0,null);
	addFarming(0,null,0);
	addCredentials(0,null);
	buyInfo(0,null);
	addCustomDiv(0,null);
	
	$("#updateArchivesDiv input").val("");
	$("#updateArchivesDiv img").attr("src","");
	
	$(".seedCertificateUploadPicBtn").css("display","");
	$(".seedCertificateUploadPicPic").css("display","none");
	$(".seedSaleUploadPicBtn").css("display","");
	$(".seedSaleUploadPicPic").css("display","none");
	$(".seedTransgeneUploadPicBtn").css("display","");
	$(".seedTransgeneUploadPicPic").css("display","none");
	
	$(".seedSourceCertificateUploadPicBtn").css("display","");
	$(".seedSourceCertificateUploadPicPic").css("display","none");
	$(".seedSourceSaleUploadPicBtn").css("display","");
	$(".seedSourceSaleUploadPicPic").css("display","none");
	$(".seedSourceTransgeneUploadPicBtn").css("display","");
	$(".seedSourceTransgeneUploadPicPic").css("display","none");
	
	$("#update_archives_id").val(sourceId);
	$(".farm_device_choose").iCheck({
		checkboxClass: 'icheckbox_square-green',
	});
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
 				
 				setTimeout(function () {
 					initEmployeeSelect($("#farm_week_record_employee"),0,"请选择记录人");
 				}, 500);
 				
 				//种植周期信息
 				if( data.result.growingCycles != null && data.result.growingCycles != ""){
 					var growingCycles = JSON.parse(data.result.growingCycles);
 					$(".farm_week_date").val(growingCycles.sowingDate);
 					$(".farm_week_ymchl").val(growingCycles.ymchl);
 					$(".farm_week_gg_date").val(growingCycles.ggDate);
 					$(".farm_week_cs_date").val(growingCycles.csDate);
 					$(".farm_week_recv_date").val(growingCycles.recvDate);
 					$(".farm_week_ggl").val(growingCycles.ggl);
 					$(".farm_week_hfcll").val(growingCycles.hfcll);
 					$(".farm_week_record_date").val(growingCycles.recordDate);
 					
 					$("#farm_week_record_employee option[value='"+growingCycles.recordEmployee+"']").attr("selected","selected"); 
 					$('#farm_week_record_employee').trigger('chosen:updated');//更新选项  
 					
 				}
 				
 				//种源
 				$("#seed_buy_employee").val(0);
	 			$("#seedling_buy_employee").val(0);
 				if(data.result.seedSource != null && data.result.seedSource != ""){
 					var seedInfo = JSON.parse(data.result.seedSource);
 	 				var seedType = seedInfo.type;
 	 				$("#seedType").val(seedType);
 					chooseSeedType();
 					
 	 				if(seedType == 1){
 	 					$(".seed_name").val(seedInfo.name);
 	 					$(".seed_cj").val(seedInfo.cj);
 	 					$(".seed_buy_date").val(seedInfo.buyDate);
 	 					$(".seed_out_date").val(seedInfo.outDate);
 	 					if(seedInfo.hgz != null && seedInfo.hgz != ""){
 	 						$(".seedCertificateUploadPicBtn").css("display","none")
 	 						$(".seedCertificateUploadPicPic").css("display","")
 	 						$(".seedCertificateUploadPicPic").attr("src",imgUrl + seedInfo.hgz);
 	 					}
 	 					if(seedInfo.sale != null && seedInfo.sale != ""){
 	 						$(".seedSaleUploadPicBtn").css("display","none")
 	 						$(".seedSaleUploadPicPic").css("display","")
 	 						$(".seedSaleUploadPicPic").attr("src",imgUrl + seedInfo.sale);
 	 					}
 	 					if(seedInfo.zjy != null && seedInfo.zjy != ""){
 	 						$(".seedTransgeneUploadPicBtn").css("display","none")
 	 						$(".seedTransgeneUploadPicPic").css("display","")
 	 						$(".seedTransgeneUploadPicPic").attr("src",imgUrl + seedInfo.zjy);
 	 					}
 	 					setTimeout(function () {
 	 						initEmployeeSelect($("#seed_buy_employee"),seedInfo.buyEmployee,"请选择采购人");
 	 					}, 500);
 	 					$("#seed_buy_employee option[value='"+seedInfo.buyEmployee+"']").attr("selected","selected"); 
 	 					$('#seed_buy_employee').trigger('chosen:updated');//更新选项  
 	 				}else{
 	 					$(".seedling_name").val(seedInfo.name);
 	 					$(".seedling_cj").val(seedInfo.cj);
 	 					$(".seedling_chl").val(seedInfo.buyDate);
 	 					$(".seedling_size").val(seedInfo.size);
 	 					$(".seedling_buy_date").val(seedInfo.outDate);
 	 					if(seedInfo.hgz != null && seedInfo.hgz != ""){
 	 						$(".seedSourceCertificateUploadPicBtn").css("display","none")
 	 						$(".seedSourceCertificateUploadPicPic").css("display","")
 	 						$(".seedSourceCertificateUploadPicPic").attr("src",imgUrl + seedInfo.hgz);
 	 					}
 	 					if(seedInfo.sale != null && seedInfo.sale != ""){
 	 						$(".seedSourceSaleUploadPicBtn").css("display","none")
 	 						$(".seedSourceSaleUploadPicPic").css("display","")
 	 						$(".seedSourceSaleUploadPicPic").attr("src",imgUrl + seedInfo.sale);
 	 					}
 	 					if(seedInfo.zjy != null && seedInfo.zjy != ""){
 	 						$(".seedSourceTransgeneUploadPicBtn").css("display","none")
 	 						$(".seedSourceTransgeneUploadPicPic").css("display","")
 	 						$(".seedSourceTransgeneUploadPicPic").attr("src",imgUrl + seedInfo.zjy);
 	 					}
 	 					$("#seedling_buy_employee option[value='"+seedInfo.buyEmployee+"']").attr("selected","selected"); 
 	 					$('#seedling_buy_employee').trigger('chosen:updated');//更新选项  
 	 				}
 				}else{
 					$("#seedType").val(1);
 					chooseSeedType();
 				}
 				
 				//环境数据
 				var devices = data.result.envData;
 				$(".farm_device_choose").each(function(){
 					var device = $(this).attr("val");
 					if(devices!=null && devices!= "" && devices.indexOf(device) != -1){
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
 						$("#add_grow_div").children("div:last-child").find(".grow_pic_date").val(growPicArr[i].picDate);
 						$("#add_grow_div").children("div:last-child").find(".grow_pic_desc").val(growPicArr[i].desc);
 						$("#add_grow_div").children("div:last-child").find(".grow_pic_position").val(growPicArr[i].position);
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
 				//施肥记录
 				if(data.result.fertilizationRec != null && data.result.fertilizationRec!= ""){
 					var fertilizationRecArr = JSON.parse(data.result.fertilizationRec);
 					for(var i =0;i<fertilizationRecArr.length;i++){
 						addFertilization(1);
 						$("#add_fertilization_record_div").children("table:last-child").find(".ferilization_time").val(fertilizationRecArr[i].fzDate);
 						$("#add_fertilization_record_div").children("table:last-child").find(".ferilization_name").val(fertilizationRecArr[i].fzName);
 						$("#add_fertilization_record_div").children("table:last-child").find(".ferilization_type").val(fertilizationRecArr[i].fzType);
 						$("#add_fertilization_record_div").children("table:last-child").find(".ferilization_cnt").val(fertilizationRecArr[i].fzCnt);
 						$("#add_fertilization_record_div").children("table:last-child").find(".ferilization_pp").val(fertilizationRecArr[i].fzPp);
 						$("#add_fertilization_record_div").children("table:last-child").find(".ferilization_gys").val(fertilizationRecArr[i].fzGys);
 					}
 					var fertilizer = JSON.parse(data.result.fertilizer);
 					$("#soil_info").val(fertilizer.soilInfo);
 					setTimeout(function () {
 						
 						$("#update_archives_check_employee option[value='"+fertilizer.soilCheckEmployee+"']").attr("selected","selected"); 
 	 					$('#update_archives_check_employee').trigger('chosen:updated');//更新选项  
 	 					
 	 					$("#update_archives_deal_employee option[value='"+fertilizer.soilFzEmployee+"']").attr("selected","selected"); 
 	 					$('#update_archives_deal_employee').trigger('chosen:updated');//更新选项  
 						
 	 				}, 500);
 				}
 				
 				//用药记录
 				if(data.result.pesticideRec != null && data.result.pesticideRec!= ""){
 					var pesticideRecArr = JSON.parse(data.result.pesticideRec);
 					for(var i =0;i<pesticideRecArr.length;i++){
 						addAdministration(1);
 						$("#add_administration_record_div").children("table:last-child").find(".administration_time").val(pesticideRecArr[i].drugDate);
 						$("#add_administration_record_div").children("table:last-child").find(".administration_name").val(pesticideRecArr[i].drugName);
 						$("#add_administration_record_div").children("table:last-child").find(".administration_count").val(pesticideRecArr[i].drugCnt);
 						$("#add_administration_record_div").children("table:last-child").find(".administration_pp").val(pesticideRecArr[i].drugPp);
 						$("#add_administration_record_div").children("table:last-child").find(".administration_gys").val(pesticideRecArr[i].drugGys);
 					}
 					var drug = JSON.parse(data.result.drug);
 					$("#administration_reason").val(drug.drugReason);
 					$("#drug_out_factory_time").val(drug.drugTime);
 					setTimeout(function () {
 						$("#administration_check_employee option[value='"+drug.drugCheckEmployee+"']").attr("selected","selected"); 
 	 					$('#administration_check_employee').trigger('chosen:updated');//更新选项  
 	 					
 	 					$("#administration_deal_employee option[value='"+drug.drugDealEmployee+"']").attr("selected","selected"); 
 	 					$('#administration_deal_employee').trigger('chosen:updated');//更新选项  
 	 				}, 500);
 				}
 				
 				//农事记录
 				if(data.result.farmingRec != null && data.result.farmingRec!= ""){
 					var farmingRecArr = JSON.parse(data.result.farmingRec);
 					for(var i =0;i<farmingRecArr.length;i++){
 						addFarming(1,null,farmingRecArr[i].frEmployee);
 						$("#add_farming_record_div").children("table:last-child").find(".farm_record_time").val(farmingRecArr[i].frDate);
 						$("#add_farming_record_div").children("table:last-child").find(".farm_record_content").val(farmingRecArr[i].frContent);
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
	var htmlStr = $("#batchListLi").html();
	$("#theList").empty();
	$("#theList").append("<li id='batchListLi' class='theListBox'  style='height:150px;display:none' >" + htmlStr+ "</li>");
	
	var sourceId = $("#batch_list_source_id").val();
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
			   	        x:'center'
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
 			                type : 'category',
 			                boundaryGap : false,
 			                data :listDateCope
 			            }
 			        ],
 			        yAxis : [
 			            {
 			                type : 'value'
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
	                    return data.name+ data.seriesName + "扫码:"+data.data.value[2]+"次"; 
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

//新建产品
function saveNewProduct(){
	var productName = $("#pro_name").val();
	var productIcon = $("#saveNewProductUploadPicPic").attr("src");
	var areaNum = $("#newProductGfNum").val();
	var plantTime = $("#newProductPlantTime").val();
	var season = $("#newProductBatch").val();
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
		toastr.warning('请填写种植时间','提示');
		return;
	}
	if(productDetail == null || productDetail == ""){
		toastr.warning('请填写产品作物','提示');
		return;
	}
	if(productType == null || productType == ""){
		toastr.warning('请填写产品品种','提示');
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
 				,"areaNum":areaNum,"productName":productName,"plantTime":plantTime,"season":season
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
function saveBatch(){
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
			var employeename = $(this).find(".addBatchCheckEmployee").find("option:selected").text();
			var icon = $(this).find(".batchCheckUploadPicPic").attr("src");
			
			checkJson.time=ckDate;
			checkJson.organ=mechanism;
			checkJson.tester=employee;
			checkJson.testername = employeename;
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
//维护档案-施肥记录
function addFertilization(type,obj){
	var tableText = $("#add_fertilization_table").html();
	if(type == '1'){
		tableText = "<table class='add_fertilization_table' style='margin-top:10px' >" + tableText + "</table>";
		$("#add_fertilization_div").css('display','');
		$("#add_fertilization_record_div").append(tableText);
		if($("#add_fertilization_info_div").css('display') == "none"){
			$("#add_fertilization_info_div").css('display','');
			setTimeout(function () {
					initEmployeeSelect($("#update_archives_check_employee"),0,"请选择检测人员");
					initEmployeeSelect($("#update_archives_deal_employee"),0,"请选择施肥人员");
				}, 500);
		}
	}
	if(type == '2'){
		//删除施肥记录
		var len = $(".add_fertilization_table").length;
		if(len == 2){
			$("#add_fertilization_div").css('display','none');
			$("#add_fertilization_info_div").css('display','none');
		}
		$(obj).parent().parent().parent().remove();
	}
	if(type == '0'){
		//清空记录
		tableText = "<table id='add_fertilization_table' class='add_fertilization_table' style='margin-top:10px;display:none' >" + tableText + "</table>";
		$("#add_fertilization_div").css('display','none');
		$("#add_fertilization_info_div").css('display','none');
		$("#add_fertilization_record_div").empty();
		$("#add_fertilization_record_div").append(tableText);
	}
}
//维护档案-农药记录
function addAdministration(type,obj){
	var tableText = $("#add_administration_table").html();
	if(type == '1'){
		tableText = "<table class='add_administration_table' style='margin-top:10px' >" + tableText + "</table>";
		$("#add_administration_div").css('display','');
		$("#add_administration_record_div").append(tableText);
		
		if($("#add_administration_info_div").css('display') == "none"){
			$("#add_administration_info_div").css('display','');
			setTimeout(function () {
				initEmployeeSelect($("#administration_check_employee"),0,"请选择病因检测人员");
				initEmployeeSelect($("#administration_deal_employee"),0,"请选择打药人员");
			}, 500);
			
		}
	}
	if(type == '2'){
		var len = $(".add_administration_table").length;
		if(len == 2){
			$("#add_administration_div").css('display','none');
			$("#add_administration_info_div").css('display','none');
		}
		$(obj).parent().parent().parent().remove();
	}
	if(type == '0'){
		//清空记录
		tableText = "<table id='add_administration_table' class='add_administration_table' style='margin-top:10px;display:none' >" + tableText + "</table>";
		$("#add_administration_div").css('display','none');
		$("#add_administration_info_div").css('display','none');
		$("#add_administration_record_div").empty();
		$("#add_administration_record_div").append(tableText);
	}
}
//维护档案-农事记录
function addFarming(type,obj,employeeId){
	var tableText = $("#add_farming_table").html();
	if(type == '1'){
		tableText = "<table class='add_farming_table' style='margin-top:10px' >" + tableText + "</table>";
		$("#add_farming_div").css('display','');
		$("#add_farming_record_div").append(tableText);
		var obj = $("#add_farming_record_div").children("table:last-child").find(".farm_record_employee");
		setTimeout(function () {
			initEmployeeSelect(obj,employeeId,"请选择操作人员");
		}, 500);
		
		
	}
	if(type == '2'){
		var len = $(".add_farming_table").length;
		if(len == 2){
			$("#add_farming_div").css('display','none');
		}
		$(obj).parent().parent().parent().remove();
	}
	if(type == '0'){
		//清空记录
		tableText = "<table id='add_farming_table' class='add_farming_table' style='margin-top:10px;display:none' >" + tableText + "</table>";
		$("#add_farming_div").css('display','none');
		$("#add_farming_record_div").empty();
		$("#add_farming_record_div").append(tableText);
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
//维护档案-种子种苗
function chooseSeedType(){
	var opt = $("#seedType").val();
	if(opt == '1'){
		$("#table_seed").css("display","");
		$("#table_seed_source").css("display","none");
		var value = $("#seed_buy_employee").val();
		if(value == null || value == ""){
			value=0;
		}
		setTimeout(function () {
			initEmployeeSelect($("#seed_buy_employee"),value,"请选择采购人");
		}, 500);
		
	}else if(opt == '2'){
		$("#table_seed").css("display","none");
		$("#table_seed_source").css("display","");
		var value = $("#seedling_buy_employee").val();
		if(value == null || value == ""){
			value=0;
		}
		setTimeout(function () {
			initEmployeeSelect($("#seedling_buy_employee"),value,"请选择采购人");
		}, 500);
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

//维护档案-保存
function saveUpdateArchives(){
	var sourceId = $("#update_archives_id").val();
	var productName = $("#update_archives_product_name").val();
	var icon = $("#update_archives_product_pic").attr("src");
	var plantTime = $("#plantingTime").val();
	var batch = $("#update_archives_batch").val();
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
	var soilInfo = $("#soil_info").val();//土壤壤情
	var soilCheckEmployee = $("#update_archives_check_employee").val();//监测人员
	var soilFzEmployee = $("#update_archives_deal_employee").val();//施肥人员
	
	var soilCheckEmployeename = $("#update_archives_check_employee").find("option:selected").text()//监测人员
	if(soilCheckEmployee == "0"){
		soilCheckEmployeename = "";
	}
	var soilFzEmployeename = $("#update_archives_deal_employee").find("option:selected").text()//施肥人员
	if(soilFzEmployee == "0"){
		soilFzEmployeename = "";
	}
	
	var fertilizer = {};
	fertilizer.soilInfo=soilInfo;
	fertilizer.soilCheckEmployee=soilCheckEmployee;
	fertilizer.soilFzEmployee=soilFzEmployee;
	fertilizer.soilCheckEmployeename=soilCheckEmployeename;
	fertilizer.soilFzEmployeename=soilFzEmployeename;
	
	var drugReason = $("#administration_reason").val();//病因
	var drugCheckEmployee = $("#administration_check_employee").val();//病因检测人员
	var drugDealEmployee = $("#administration_deal_employee").val();//打药人员
	
	var drugCheckEmployeename = $("#administration_check_employee").find("option:selected").text();
	if(drugCheckEmployee == "0"){
		drugCheckEmployeename = "";
	}
	var drugDealEmployeename = $("#administration_deal_employee").find("option:selected").text();
	if(drugDealEmployee == "0"){
		drugDealEmployeename = "";
	}
	
	var drugTime = $("#drug_out_factory_time").val();//出厂日期
	var drug = {};
	drug.drugReason = drugReason;
	drug.drugCheckEmployee = drugCheckEmployee;
	drug.drugDealEmployee = drugDealEmployee;
	drug.drugTime = drugTime;
	drug.drugCheckEmployeename = drugCheckEmployeename;
	drug.drugDealEmployeename = drugDealEmployeename;
	
	var growJsonArr = [];
	var fertilizerJsonArr = [];
	
	var drugJsonArr = [];
	var farmReordJsonArr=[];
	var renZhengInfoJsonArr=[];
	var farmWeekJson = {};
	var seedJson = {};
	
	//生长期图片
	$("#add_grow_div").children().each(function(index,element){
		if(index > 0){
			var growJson = {};
			var picDate = $(this).find(".grow_pic_date").val();
			var position = $(this).find(".grow_pic_position").val();
			var desc = $(this).find(".grow_pic_desc").val();
			var icon = $(this).find(".growPicUploadPicPic").attr("src");
			
			if(picDate == "" && position == "" && desc == "" && icon==""){
				return true;
			}
			
			growJson.picDate=picDate;
			growJson.position=position;
			growJson.desc=desc;
			growJson.icon=icon;
			growJsonArr.push(growJson);
		}
	});
	//施肥记录
	$("#add_fertilization_record_div").children().each(function(index,element){
		if(index > 0){
			var fertilizerJson = {};
			var fzDate = $(this).find(".ferilization_time").val();
			var fzName = $(this).find(".ferilization_name").val();
			var fzType = $(this).find(".ferilization_type").val();
			var fzCnt = $(this).find(".ferilization_cnt").val();
			var fzPp = $(this).find(".ferilization_pp").val();
			var fzGys = $(this).find(".ferilization_gys").val();
			
			if(fzDate == "" && fzName == "" && fzType == "" && fzCnt=="" && fzPp=="" && fzGys==""){
				return true;
			}
			
			fertilizerJson.fzDate=fzDate;
			fertilizerJson.fzName=fzName;
			fertilizerJson.fzType=fzType;
			fertilizerJson.fzCnt=fzCnt;
			fertilizerJson.fzPp=fzPp;
			fertilizerJson.fzGys=fzGys;
			
			fertilizerJsonArr.push(fertilizerJson);
		}
	});
	//用药记录
	$("#add_administration_record_div").children().each(function(index,element){
		if(index > 0){
			var drugJson = {};
			var drugDate = $(this).find(".administration_time").val();
			var drugName = $(this).find(".administration_name").val();
			var drugCnt = $(this).find(".administration_count").val();
			var drugPp = $(this).find(".administration_pp").val();
			var drugGys = $(this).find(".administration_gys").val();
			
			if(drugDate == "" && drugName == "" && drugCnt == "" && drugPp=="" && drugGys==""){
				return true;
			}
			
			drugJson.drugDate=drugDate;
			drugJson.drugName=drugName;
			drugJson.drugCnt=drugCnt;
			drugJson.drugPp=drugPp;
			drugJson.drugGys=drugGys;
			
			drugJsonArr.push(drugJson);
		}
	});
	//农事记录
	$("#add_farming_record_div").children().each(function(index,element){
		if(index > 0){
			var farmingRecordJson = {};
			var frDate = $(this).find(".farm_record_time").val();
			var frContent = $(this).find(".farm_record_content").val();
			var frEmployee = $(this).find(".farm_record_employee").val();
			var frEmployeename = $(this).find(".farm_record_employee").find("option:selected").text();
			if(frEmployee == '0'){
				frEmployeename = "";
			}
			
			if(frDate == "" && frContent == "" && frEmployee == "0"){
				return true;
			}
			
			farmingRecordJson.frDate=frDate;
			farmingRecordJson.frContent=frContent;
			farmingRecordJson.frEmployee=frEmployee;
			farmingRecordJson.frEmployeename=frEmployeename;
			
			farmReordJsonArr.push(farmingRecordJson);
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
			
			if(rzType == "" && rzBzDate == "" && rzNum == ""  && rzEndDate == "" && rzJg == "" && icon == ""){
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
	//种植周期信息
	var sowingDate = $(".farm_week_date").val();
	var ymchl = $(".farm_week_ymchl").val();
	var ggDate = $(".farm_week_gg_date").val();
	var csDate = $(".farm_week_cs_date").val();
	var recvDate = $(".farm_week_recv_date").val();
	var ggl = $(".farm_week_ggl").val();
	var hfcll = $(".farm_week_hfcll").val();
	var recordDate = $(".farm_week_record_date").val();
	var recordEmployee = $("#farm_week_record_employee").val();
	var recordEmployeename = $("#farm_week_record_employee").find("option:selected").text();
	if(recordEmployee == '0'){
		recordEmployeename = "";
	}
	
	farmWeekJson.sowingDate=sowingDate;
	farmWeekJson.ymchl=ymchl;
	farmWeekJson.ggDate=ggDate;
	farmWeekJson.csDate=csDate;
	farmWeekJson.recvDate=recvDate;
	farmWeekJson.ggl=ggl;
	farmWeekJson.hfcll=hfcll;
	farmWeekJson.recordDate=recordDate;
	farmWeekJson.recordEmployee=recordEmployee;
	farmWeekJson.recordEmployeename=recordEmployeename;
	
	//种源
	var seedType = $("#seedType").val();
	if(seedType == '1'){
		var name = $(".seed_name").val();
		var cj = $(".seed_cj").val();
		var buyDate = $(".seed_buy_date").val();
		var outDate = $(".seed_out_date").val();
		var buyEmployee = $("#seed_buy_employee").val();
		var buyEmployeename = $("#seed_buy_employee").find("option:selected").text();
		if(buyEmployee == '0'){
			buyEmployeename = "";
		}
		var hgz = $(".seedCertificateUploadPicPic").attr("src");
		var sale = $(".seedSaleUploadPicPic").attr("src");
		var zjy = $(".seedTransgeneUploadPicPic").attr("src");
		
		seedJson.type="1";
		seedJson.name=name;
		seedJson.cj=cj;
		seedJson.buyDate=buyDate;
		seedJson.outDate=outDate;
		seedJson.buyEmployee=buyEmployee;
		seedJson.buyEmployeename=buyEmployee;
		seedJson.hgz=hgz;
		seedJson.sale=sale;
		seedJson.zjy=zjy;
		
	}else{
		var name = $(".seedling_name").val();
		var cj = $(".seedling_cj").val();
		var chl = $(".seedling_chl").val();
		var size = $(".seedling_size").val();
		var buyDate = $("#seedling_buy_date").val();
		var buyEmployee = $("#seedling_buy_employee").val();
		var buyEmployeename = $("#seedling_buy_employee").find("option:selected").text();
		if(buyEmployee == '0'){
			buyEmployeename = "";
		}
		var hgz = $(".seedSourceCertificateUploadPicPic").attr("src");
		var sale = $(".seedSourceSaleUploadPicPic").attr("src");
		var zjy = $(".seedSourceTransgeneUploadPicPic").attr("src");
		
		seedJson.type="2";
		seedJson.name=name;
		seedJson.cj=cj;
		seedJson.chl=chl
		seedJson.buyDate=buyDate;
		seedJson.size=size;
		seedJson.buyEmployee=buyEmployee;
		seedJson.buyEmployeename=buyEmployeename;
		seedJson.hgz=hgz;
		seedJson.sale=sale;
		seedJson.zjy=zjy;
	}
	
	var devices = "";
	$(".farm_device_choose").each(function(){
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
	
//	console.info("生长期图片" + JSON.stringify(growJsonArr));
//	console.info("化肥" + JSON.stringify(fertilizerJsonArr));
//	console.info("土壤壤情" + JSON.stringify(fertilizer));
//	console.info("用药记录" + JSON.stringify(drugJsonArr));
//	console.info("病因" + JSON.stringify(drug));
//	console.info("农事记录" + JSON.stringify(farmReordJsonArr));
//	console.info("认证信息" + JSON.stringify(renZhengInfoJsonArr));
//	console.info("种植周期" + JSON.stringify(farmWeekJson));
//	console.info("种源" + JSON.stringify(seedJson));
//	console.info("环境数据" + devices);
//	console.info("网店链接" + webLinks);
//	console.info("实体店地址" + shopAddress);
//	console.info("自定义模块" + JSON.stringify(customJsonArr));
	
	
	$.ajax({
 		type:"POST",
 		url:"actionServlet",
 		data:{"actionName":"sourceService","method":"updateArchive","productId":sourceId
 				,"productName":productName,"productIcon":icon,"productDetail":crop,"productType":varieties
 				,"plantTime":plantTime,"batchCount":batch,"employeeId":leader,"productInformation":desc
 				,"growthPic":JSON.stringify(growJsonArr),"fertilizationRec":JSON.stringify(fertilizerJsonArr)
 				,"pesticideRec":JSON.stringify(drugJsonArr),"farmingRec":JSON.stringify(farmReordJsonArr)
 				,"authInfo":JSON.stringify(renZhengInfoJsonArr),"growingCycles":JSON.stringify(farmWeekJson)
 				,"seedSource":JSON.stringify(seedJson),"webLinks":webLinks,"shopAddress":shopAddress
 				,"fertilizer":JSON.stringify(fertilizer),"drug":JSON.stringify(drug)
 				,"envData":devices,"saler":saler,"custom":JSON.stringify(customJsonArr)},
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

//预览
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
 			if(data.statusCode == 1){
 				
 				$("#viewTheFiles").modal('show');
 			    $("#picturePreview .carousel-inner").empty();
 			    
 			   $("#h5_view_pro_batch_id").val(data.result.batchId);
 			    $("#h5_view_pro_pic").attr("src",imgUrl + data.result.productIcon);
 			    $("#h5_view_pro_name").html(data.result.productName);
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
				map.panBy(180, 120)
 			    
 			    //生长期图片
 			    var szPic = JSON.parse(data.result.growthPic);
 			    if(szPic == null || szPic.length == 0){
 			    	$(".growthPhaseBox").css('display','none')
 			    }else{
 			    	$(".growthPhaseBox").css('display','')
 			    	for(var z=0,szHtml='';z<szPic.length;z++){
 	 			        szHtml+='<div class="item"><img style="width:800px;height:500px" src="'+imgUrl + szPic[z].icon+'"><div class="carousel-caption"><p class="pictureTime">'+szPic[z].picDate+'</p><p class="pictureAddress">'+szPic[z].position+'</p><p class="pictureRemarks">'+szPic[z].desc+'</p></div></div>';
 	 			    }
 	 			    sessionStorage.setItem('szqkey',szHtml)
 			    }
 			    
 			    //肥料使用表
 			    var fz = JSON.parse(data.result.fertilizationRec);
 			    if(fz == null || fz.length == 0){
			    	$(".fertilizerUseTableBox").css('display','none')
			    }else{
			    	$(".fertilizerUseTableBox").css('display','')
			    	var fzHtml="<tbody>";
	 			    for(var s=0;s<fz.length;s++){
	 			    	fzHtml+='<tr><td>'+fz[s].fzDate+'</td><td>'+fz[s].fzName+'</td><td>'+fz[s].fzType+'</td><td>'+fz[s].fzCnt+'</td><td>'+fz[s].fzPp+'</td><td>'+fz[s].fzGys+'</td></tr>';
	 			    }
	 			    fzHtml+="</tbody>";
	 			    sessionStorage.setItem("key", fzHtml); 
 			    }
 			    
 			   //农药使用表
 			    var pesticideHtml="";
 			    pesticideHtml+="<tbody>";
 		        var pesticide=JSON.parse(data.result.pesticideRec);
 		        if(pesticide == null || pesticide.length == 0){
 		        	$(".viewLogBox").css('display','none')
 		        }else{
 		        	$(".viewLogBox").css('display','')
 		        	for(var d=0;d<pesticide.length;d++){
 	 			    	pesticideHtml+='<tr><td style="width:21%">'+pesticide[d].drugDate+'</td><td style="width:25%">'+pesticide[d].drugName+'</td><td style="width:13%">'+pesticide[d].drugCnt+'</td>'+
 	 					                '<td style="width:17%">'+pesticide[d].drugPp+'</td>'+
 	 					                '<td style="width:24%">'+pesticide[d].drugGys+'</td>'+
 	 					            '</tr>'
 	 			    }
 	 			    pesticideHtml+="</tbody>";
 	 			    sessionStorage.setItem("pesticidekey", pesticideHtml); 
 		        }
 			    
 			    
 			    //农事记录
 			    
 			    var agricultural=JSON.parse(data.result.farmingRec);
 			    
 			   if(agricultural == null || agricultural.length == 0){
		        	$(".agriculturalRecordsBox").css('display','none')
		        }else{
		        	$(".agriculturalRecordsBox").css('display','')
		        	var agriculturalHtml="<tbody>";
		        	for(var y=0;y<agricultural.length;y++){
	 			    	var emName = "无";
	 			    	if(agricultural[y].frEmployee != "0"){
	 			    		emName = agricultural[y].frEmployeename;
	 			    	}
	 			        agriculturalHtml+='<tr><td style="width:100px">'+agricultural[y].frDate+'</td><td style="width:500px">'+agricultural[y].frContent+'</td><td style="width:100px">'+emName+'</td></tr>';
	 			    }
	 			    agriculturalHtml+="</tbody>";
	 			    sessionStorage.setItem("agriculturalkey", agriculturalHtml); 
		        }
 			   
 			    
 			 //认证信息
// 			    var credentials=[
// 			     		        {"uname":"农药残留检测","position":"由565认证","icon":"img/backgroud.jpg","desc":"证书编号555","picDate":"2017-01","endTime":"2018-01"},
// 			    		        {"uname":"绿色食品认证","position":"由888认证","icon":"img/backgroud.jpg","desc":"证书编号666","picDate":"2017-12","endTime":"2018-05"},
// 			    		    ];
 			    var credentials = JSON.parse(data.result.authInfo);
 			    
 			   if(credentials == null || credentials.length == 0){
		        	$(".productIntroductionBox").css('display','none')
		        }else{
		        	$(".productIntroductionBox").css('display','')
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
	 		        var nlsp =new lsp("credentialsContent");
	 		        nlsp.add(credentials);
	 		        var gn=nlsp.get();
	 		        var nlsp=new lsp("credentialsContent").add(credentials);
		        }
 		        
 		       //种源来源信息
 		        var zyly = JSON.parse(data.result.seedSource);
 		        if(zyly == null || zyly == ""){
 		        	$(".seedSourceInformationBox").css('display','none')
 		        }else{
 		        	$(".seedSourceInformationBox").css('display','')
 		        	$("#souceFormList p.seedName").html(zyly.name);
 	 		        $("#souceFormList p.venderName").html(zyly.cj);
 	 		        $("#souceFormList p.buyDate").html(zyly.buyDate);
 	 		        $("#souceFormList p.outDate").html(zyly.outDate);
 	 		        if(zyly.buyEmployee == '0'){
 	 		    	   $("#souceFormList p.buyEmployee").html("无");
 	 		        }else{
 	 		    	   $("#souceFormList p.buyEmployee").html(zyly.buyEmployeename);
 	 		        }
 	 		        if(zyly.hgz != ''){
 	 		        	 $("#souceFormList p.scz").html('<img style="width:200px;height:200px" src="'+imgUrl + zyly.hgz+'" alt="">');
 	 		        }
 		 		    if(zyly.sale != ''){
 		 		    	$("#souceFormList p.xss").html('<img style="width:200px;height:200px" src="'+imgUrl + zyly.sale+'" alt="">');
 		 		    }
 		 		   if(zyly.zjy != ''){
 		 			  $("#souceFormList p.fzjy").html('<img style="width:200px;height:200px" src="'+imgUrl + zyly.zjy+'" alt="">');
 		 		    }
 		        }
 		        
 		        //环境数据
 		        var device = data.result.envData;
 		        if(device == null || device == ""){
 		        	$(".KeyEnvironmentalDataBox").css('display','none')
 		        }else{
 		        	$(".KeyEnvironmentalDataBox").css('display','');
 		        	var devices = device.split(",");
 		        	var dhtml = "";
 		        	for(var i=0;i<devices.length;i++){
 		        		dhtml += "<span onclick='getEnvData(this)'><input type='hidden' value='"+devices[i]+"'><a>"+deviceMap[devices[i]]+"</a></span>";
 		        	}
 		        	$("#environmentalDataOptions").html(dhtml);
 		        	$("#environmentalDataOptions").children("span:first-child").addClass("envDataChoose");
 		        	$("#environmentalDataOptions").children("span:first-child").addClass("envDataLeft");
 		        	$("#environmentalDataOptions").children("span:last-child").addClass("envDataRight");
 		        }
 		       
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
 		}
	});
	
	
//	 $('#theList').on('click','.preview',function(){
		   
//		    $("#picturePreview .carousel-inner").html(szHtml);
//		    $(".carousel-inner").children("div:first-child").addClass("active");
		    
//		    $("#agriculturalRecords tbody").html(agriculturalHtml);
		    //加工记录
//		    var jgHtml="";
//		    var jg=[
//		        {"time":"2017-12-19","content":"清除稻谷中各种杂质","operatorname":"17"},
//		        {"time":"2017-12-21","content":"去石","operatorname":"15"}
//		    ]
//		    for(var x=0;x<jg.length;x++){
//		        jgHtml+='<tr><td style="width:20%">'+jg[x].time+'</td><td>'+jg[x].content+'</td><td style="width:20%">'+jg[x].operatorname+'</td></tr>'
//		        
//		    }
//		    $("#processing tbody").html(jgHtml);
//
//		    //配送记录
//		    var dispatchingHtml="";
//		    var ps=[{"time":"2017-12-30","destination":"北京市朝阳区","distributorname":"13"}]
//		    for(var w=0;w<ps.length;w++){
//		        dispatchingHtml+='<tr><td style="width:20%">'+ps[w].time+'</td><td>'+ps[w].destination+'</td><td style="width:20%">'+ps[w].distributorname+'</td></tr>'
//		    }
//		    $("#dispatching tbody").html(dispatchingHtml);


		    //自定义模块
//		    var moduleHtml='';
//		    var zdy=[
//		        {"name":"使用说明","details":[{"time":"2017-12-07","content":"高隔热供热个人"},{"time":"2017-12-23","content":"东方红热就搞了个我哦热加工惹急"}]},
//		        {"name":"功效","details":[{"time":"2017-11-28","content":"发热管让他忽然他"},{"time":"2017-12-22","content":"体育教育提建议他金太阳"}]}
//		    ];
//		    for(var v=0;v<zdy.length;v++){
//		        moduleHtml+='<div class="form-group productIntroduction"><label for="message-text" class="control-label">'+zdy[v].name+'</label><table style="width:85%;"><thead><tr><th>时间</th><th>内容</th></tr></thead><tbody>';
//		       for(var u=0;u<zdy[v].details.length;u++){
//		         moduleHtml+='<tr><td style="width:30%">'+zdy[v].details[u].time+'</td><td>'+zdy[v].details[u].content+'</td></tr>';
//		       }
//		       moduleHtml+='</tbody></table></div>';
//		    }
//		    $("#customModule").html(moduleHtml);
//	  })
}

//12.26搜索
function scanSearch(){
	var searchStartTime=$(".areaSelectionOptionsLeft>input.startTime").val();
	var searchEndTime=$(".areaSelectionOptionsLeft>input.endTime").val();
	var searchKeyword=$(".areaSelectionOptionsLeft>input.searchProduct").val();
	getScanData(searchStartTime,searchEndTime,0,searchKeyword);
}
//12.27

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

//生长期图片
function growthPhaseBoxClick(tableName){
	showMask();
	var szqvalue=sessionStorage.getItem('szqkey');
	$(".carousel-inner").html(szqvalue);
	$(".carousel-inner").children("div:first-child").addClass("active");
	$("#picturePreview h3").html($(tableName).children("div:last-child").html())
	$("#h5_view_pic").css("display","");
}
function fertilizerUseTableBoxClick(tableName){
//肥料使用表
//    $(".fertilizerUseTableBox").click(function(){
    	$("#viewTable").modal('show');
//    	viewTheFiles
    	$("#viewTable h4").html($(tableName).children("div:last-child").html());
    	var thead='<thead><tr><th>使用时期</th><th>名称</th><th>类型</th><th>用量</th><th>品牌</th><th>供应商</th></tr></thead>';
    	var value = sessionStorage.getItem("key"); 
    	var tableHtml=thead+value;
    	$("#useTable").html(tableHtml);
//    })
}

function viewLogBoxClick(tableName){
	 //用药记录
   // $(".viewLogBox").click(function(){
    	$("#viewTable").modal('show');
    	$("#viewTable h4").html($(tableName).children("div:last-child").html());
    	var thead='<thead><tr><th>使用时间</th><th>名称</th><th>用量</th><th>品牌</th><th>供应商</th></tr></thead>';
    	var pesticidevalue=sessionStorage.getItem("pesticidekey");
    	var pesticideHtml=thead+pesticidevalue;
    	$("#useTable").html(pesticideHtml);
    //})
}

function agriculturalRecordsBoxClick(tableName){
	 //农事记录
//    $(".agriculturalRecordsBox").click(function(){
    	$("#viewTable").modal('show');
    	$("#viewTable h4").html($(tableName).children("div:last-child").html());
    	var thead='<thead><tr><th style="width:100px;">农事时间</th><th style="width:500px">农事内容</th><th style="width:100px">操作员</th></tr></thead>';
    	var agriculturalvalue=sessionStorage.getItem("agriculturalkey");
    	var agriculturalHtml=thead+agriculturalvalue;
    	$("#useTable").html(agriculturalHtml);
//    })
}
//种子来源信息
function seedSourceInformationBoxClick(){
	$("#seedsourceInformation").modal('show');
}

function changePicColor(type,obj){
	if(type == 1){
		var img = $(obj).find("img").attr("src").replace(".png","_click.png");
		$(obj).find("img").attr("src",img);
	}else{
		var img = $(obj).find("img").attr("src").replace("_click","");
		$(obj).find("img").attr("src",img);
	}

}

function getEnvData(obj){
   $("#environmentalDataOptions").find("span").removeClass("envDataChoose");
   $(obj).addClass("envDataChoose");
   var deviceId = $(obj).find("input").val();
   var batchId = $("#h5_view_pro_batch_id").val();
   var myChart = echarts.init(document.getElementById("div_envdata"),'macarons');
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
			    
			    var option = {
	    		title : {
		   	        text: '',
		   	        subtext: '',
		   	        x:'center'
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
			                type : 'category',
			                boundaryGap : false,
			                data :listDateCope
			            }
			        ],
			        yAxis : [
			            {
			                type : 'value'
			            }
			        ],
			        series : listss
			    };
			    myChart.setOption(option);    
 		}
 	});
   
}
(function(){
	//12.26
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
		  //生长期关闭
		  $('#picturePreview').on('hide.bs.modal', function () {
			  $("#viewTheFiles").modal('show');
			})
	    //认证信息
	    $(".productIntroductionBox").click(function(){
	    	$("#productCertification").modal('show');
	    	var credentialsContent=JSON.parse(sessionStorage.getItem('credentialsContent'));
	    	var credentialsHtml='';
	    	for(var i=0;i<credentialsContent.length;i++){

	    		var name = authMap[credentialsContent[i].rzType];
	    		credentialsHtml+='<tr style="height:50px" data-id='+i+'><td>'+name+'</td><td>已检测</td><td>&gt;</td></tr>';

	    	}
	     	$("#productTable>tbody").html(credentialsHtml);
	    })
	    
	    $("#productTable").on('mouseenter','tr',function(){
	    	$(this).css('background','#ddd');
	    })
	    $("#productTable").on('mouseleave','tr',function(){
	    	$(this).css('background','#fff');
	    })
	    
	     $("#productTable").on('click','tr',function(){
	    	$("#picturePreview h3").html($(this).children("td:first-child").html());
	    	var n=$(this).attr("data-id");
	    	var rzContent=JSON.parse(sessionStorage.getItem('credentialsContent'));
	    	var rzHtml='';
	    	for(var j=0;j<rzContent.length;j++){
	    		rzHtml+='<div class="item"><img style="width:800px;height:500px" src="'+imgUrl + rzContent[j].icon+'"><div class="carousel-caption"><p class="pictureTime">证书编号:'+rzContent[j].rzNum+'</p><p class="pictureAddress">颁证日期:'+rzContent[j].rzBzDate+'</p><p class="pictureRemarks">认证机构:'+rzContent[j].rzJg+'</p></div></div>';
	    	}
	    	
	    	showMask();
	    	$(".carousel-inner").html(rzHtml);
	    	$(".carousel-inner").children("div").eq(n).addClass("active");
	    	$("#h5_view_pic").css("display","");
	    	
	    })
	   //切换环境数据
	   $("#environmentalDataOptions>span").click(function(){
		   console.info("click");
		   $("#environmentalDataOptions").find("span").removeClass("envDataChoose");
		   $(this).addClass("envDataChoose");
		})
	    //关键环境数据
	    $(".KeyEnvironmentalDataBox").click(function(){
	    	$("#environmentalData").modal('show');
			$("#environmentalDataOptions").children("span:first-child").click();
	    })
	    function environmentalData(list,environmentListData){
			    var myChart = echarts.init(document.getElementById("main"));
			    myChart.clear();
			    var listss=[];
			    var listName=[];
			    // var environmentListData=environmentListData
			    for(var i=0;i<list.length;i++){
			        var listObj={};
			        listName.push(list[i].name)
			        listObj.name=list[i].name;
			        listObj.type="line";
			        listObj.data=list[i].data;
			        listss.push(listObj);
			    }
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
			                    data : environmentListData
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
	})
})()

