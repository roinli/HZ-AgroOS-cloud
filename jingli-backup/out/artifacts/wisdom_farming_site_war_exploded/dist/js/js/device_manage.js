$(function(){
    //表格移入移出
    $(".sensorDel>.col-xs-4").mouseover(function(){
        $(this).css("background","#f0f2fd");
        $(this).children("div.right").css("display","none");
        $(this).children("div.setup").css("display","block");
    })
    $(".sensorDel>.col-xs-4").mouseout(function(){
        $(this).css("background","#fff");
        $(this).children("div.right").css("display","");
        $(this).children("div.setup").css("display","none");
    })
})

//显示采集设备设置页面
function showCjDeviceDiv(id,name){
	$("#cj_device_name").html(name + '预警设置');
	$("#cj_device_num").val(id);
	cjDeviceLeftData(id);
}

//采集设备左侧列表
function cjDeviceLeftData(id){
	$.ajax({
		type:"POST",
	 		url:"actionServlet",
	 		data:{"actionName":"deviceService","method":"getCjDeviceLeftSetting","deviceNum":id},
	 		dataType:"JSON",
	 		success:function(data){
	 			if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
	 			if(data.statusCode == 1){
	 				$(".new_left_li").remove();
	 				for(var i=0;i<data.result.length;i++){
	 					var html="<li class='new_left_li'><a onclick='showCjDeviceData("+data.result[i].id+")' data-toggle='tab' href='' ondragstart='return false' >";
	 					html+=data.result[i].startTime + "~" + data.result[i].endTime;
	 					if(data.result[i].useState == 0){
	 						html+="关闭";
	 					}else{
	 						html+="开启";
	 					}
	 					html+="</a></li>";
	 					$("#ul_cj_device_left").append(html);
	 				}
	 			}
	 			$("#cj_device_new").addClass("active");
	 			showCjDeviceData(0);
	 			$("#cj_device_div").modal('show');
	 		}
	});
}

//采集设备数据详情
function showCjDeviceData(id){
	if(id == '0'){
		$("#cj_device input").val('');
		$("#cj_device_state").val('1');
		$("#btn_cj_setting_cancel").css('display','');
		$("#btn_cj_setting_del").css('display','none');
		return;
	}
	$("#btn_cj_setting_cancel").css('display','none');
	$("#btn_cj_setting_del").css('display','');
	$.ajax({
		type:"POST",
	 		url:"actionServlet",
	 		data:{"actionName":"deviceService","method":"getCjDeviceSettingInfo","id":id},
	 		dataType:"JSON",
	 		success:function(data){
	 			if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
	 			if(data.statusCode == 1){
	 				$("#cj_device input").val('');
	 				$("#cj_device_state").val('1');
	 				$("#cj_device_setting_id").val(data.result.id);
	 				$("#start_time_top").val(data.result.startTime);
	 				$("#end_time_top").val(data.result.endTime);
	 				$("#input_cj_data_left").val(data.result.leftRange);
	 				$("#input_cj_data_right").val(data.result.rightRange);
	 				$("#cj_device_state").val(data.result.useState);
	 			}
	 		}
	});
}

//采集器保存设置
function saveAndUpdateSetting(){
	var id = $("#cj_device_setting_id").val();// 
	var deviceNum = $("#cj_device_num").val();
	var startTime = $("#start_time_top").val();
	var endTime = $("#end_time_top").val();
	var leftRange = $("#input_cj_data_left").val();
	var rightRange = $("#input_cj_data_right").val();
	var useState = $("#cj_device_state").val();
	
	if(startTime == null || startTime == ''){
		toastr.warning('请选择开始时间','提示');
		return;
	}
	if(endTime == null || endTime == ''){
		toastr.warning('请选择结束时间','提示');
		return;
	}
	if(leftRange == '' && rightRange == ''){
		toastr.warning('请填写预警范围','提示');
		return;
	}
	var st = startTime.split(":");
	var et = endTime.split(":");
	if(parseInt(st[0]) > parseInt(et[0])){
		toastr.warning('时间范围有误，请检查','提示');
		return;
	}if(parseInt(st[0]) == parseInt(et[0]) && parseInt(st[1]) >= parseInt(et[1])){
		toastr.warning('时间范围有误，请检查','提示');
		return;
	}
	var method = "";
	if(id == ''){
		method="saveCjDeviceSetting";
	}else{
		method="updateCjDeviceSetting";
	}
	$.ajax({
		type:"POST",
	 		url:"actionServlet",
	 		data:{"actionName":"deviceService","method":method,"id":id
	 			,"startTime":startTime,"endTime":endTime,"leftRange":leftRange
	 			,"rightRange":rightRange,"useState":useState,"deviceNum":deviceNum},
	 		dataType:"JSON",
	 		success:function(data){
	 			if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
	 			if(data.statusCode == 1){
	 				var id = $("#cj_device_num").val();
	 				cjDeviceLeftData(id);
	 				swal({
	 	    	  		title: "保存成功",
	 	          		text: "",
	 	          		type: "success"
	 	         	});
	 			}else{
	 				swal({
	 	    	  		title: "保存失败",
	 	          		text: data.message,
	 	          		type: "error"
	 	         	});
	 			}
	 		}
	});
	
}
//采集器删除设置
function deleteCjSetting(){
	var id = $("#cj_device_setting_id").val();
	var deviceNum = $("#cj_device_num").val();
	
	swal({
		   title: "删除",
		   text: '确定要删除该设置么',
		   type: 'warning',
		   showCancelButton: true,
		   closeOnConfirm: false, 
		   confirmButtonText: '确定',
		   cancelButtonText: '取消',
		 }, function() { 
			 
			 $.ajax({
					type:"POST",
				 		url:"actionServlet",
				 		data:{"actionName":"deviceService","method":"deleteCjDeviceSetting","id":id,"deviceNum":deviceNum},
				 		dataType:"JSON",
				 		success:function(data){
				 			if(data.statusCode == 100){
				 				toastr.error('请联系管理员','未拥有权限');
				 				return;
				 			}
				 			if(data.statusCode == 1){
				 				var id = $("#cj_device_num").val();
				 				cjDeviceLeftData(id);
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

//显示控制设备页面
function showKzDeviceDiv(id,name){
	$("#kz_device_num").val(id);
	$("#kz_device_name").html(name + '设置');
	kzDeviceLeftData(id);
}
function kzDeviceLeftData(id){
	$.ajax({
		type:"POST",
	 		url:"actionServlet",
	 		data:{"actionName":"deviceService","method":"getControlDeviceLeftSetting","deviceNum":id},
	 		dataType:"JSON",
	 		success:function(data){
	 			if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
	 			if(data.statusCode == 1){
	 				$(".new_kz_left_li").remove();
	 				$("#option_device_model").css("display","");
	 				$("#kz_device_open_device").empty();
	 				$("#kz_device_close_device").empty();
	 				if(id == '61'){
	 					//水泵
	 					$("#kz_device_open_device").append("<option value='6'>土壤水分</option>");
	 					$("#kz_device_close_device").append("<option value='6'>土壤水分</option>");
	 				}else if(id == '62'){
	 					//天窗
	 					$("#kz_device_open_device").append("<option value='1'>空气温度</option>");
	 					$("#kz_device_open_device").append("<option value='4'>光照强度</option>");
	 					$("#kz_device_close_device").append("<option value='1'>空气温度</option>");
	 					$("#kz_device_close_device").append("<option value='4'>光照强度</option>");
	 				}else if(id == '63'){
	 					//供热
	 					$("#kz_device_open_device").append("<option value='1'>空气温度</option>");
	 					$("#kz_device_close_device").append("<option value='1'>空气温度</option>");
	 				}else if(id == '64'){
	 					//co2
	 					$("#kz_device_open_device").append("<option value='3'>CO2浓度</option>");
	 					$("#kz_device_close_device").append("<option value='3'>CO2浓度</option>");
	 				}else if(id == '65'){
	 					//光控  隐藏智能选项
	 					$("#option_device_model").css("display","none");
	 				}else if(id == '66'){
	 					//风机
	 					$("#kz_device_open_device").append("<option value='1'>空气温度</option>");
	 					$("#kz_device_close_device").append("<option value='1'>空气温度</option>");
	 					$("#kz_device_open_device").append("<option value='3'>CO2浓度</option>");
	 					$("#kz_device_close_device").append("<option value='3'>CO2浓度</option>");
	 				}else if(id == '71' || id == '72'){
	 					//进出口水阀
	 					$("#kz_device_open_device").append("<option value='36'>水浊度</option>");
	 					$("#kz_device_close_device").append("<option value='36'>水浊度</option>");
	 				}else if(id == '73'){
	 					//投食机
	 					$("#option_device_model").css("display","none");
	 				}else if(id == '74'){
	 					//增氧机
	 					$("#kz_device_open_device").append("<option value='32'>水溶氧</option>");
	 					$("#kz_device_close_device").append("<option value='32'>水溶氧</option>");
	 				}
	 				for(var i=0;i<data.result.length;i++){
	 					var html="<li class='new_kz_left_li'><a onclick='showKzDeviceData("+data.result[i].id+")' data-toggle='tab' href='' ondragstart='return false' >";
	 					var model = data.result[i].controlType;
	 					if(model == '0'){
	 						html+="单次定时  <br>";
	 						html+=data.result[i].startTime + "~" + data.result[i].endTime;
	 					}if(model == '1'){
	 						html+="循环模式   <br>";
	 						if(data.result[i].loopType == '0'){
	 							html+=data.result[i].startTime + "~" + data.result[i].endTime;
	 						}else{
	 							html+=data.result[i].startTime + " 循环：" + data.result[i].loopCnt + "次";
	 						}
	 					}if(model == '2'){
	 						html+="智能模式  <br>";
	 						html+=data.result[i].startTime + "~" + data.result[i].endTime;
	 					}
	 					
	 					if(data.result[i].useState == 0){
	 						html+="<br>关闭";
	 					}else{
	 						html+="<br>开启";
	 					}
	 					html+="</a></li>";
	 					$("#ul_kz_device_left").append(html);
	 				}
	 			}
	 			$("#kz_device_new").addClass("active");
	 			cleanKzDeviceVal();
	 			$("#kz_device_model").removeAttr("disabled");
	 			$("#btn_kz_setting_cancel").css('display','');
	 			$("#btn_kz_setting_del").css('display','none');
	 			$("#kz_device_div").modal('show');
	 		}
	});
	
}

//显示控制页面详细
function showKzDeviceData(id){
	cleanKzDeviceVal();
	if(id == '0'){
		$("#btn_kz_setting_cancel").css('display','');
		$("#btn_kz_setting_del").css('display','none');
		$("#kz_device_model").removeAttr("disabled");
		return;
	}else{
		$("#kz_device_model").attr("disabled","disabled");
		$("#btn_kz_setting_cancel").css('display','none');
		$("#btn_kz_setting_del").css('display','');
		$.ajax({
			type:"POST",
		 		url:"actionServlet",
		 		data:{"actionName":"deviceService","method":"getControlDeviceSettingInfo","id":id},
		 		dataType:"JSON",
		 		success:function(data){
		 			if(data.statusCode == 100){
		 				toastr.error('请联系管理员','未拥有权限');
		 				return;
		 			}
		 			if(data.statusCode == 1){
		 				cleanKzDeviceVal();//清空数据
		 				$("#kz_device_setting_id").val(data.result.id);//主键赋值
		 				$("#kz_device_start_time").val(data.result.startTime);//开启时间
		 				var weeks = data.result.loopWeek;
		 				$(".icheckbox").each(function(){
		 					var cbval = $(this).attr("data");
		 					if(weeks.indexOf(cbval) != '-1'){
		 						$(this).iCheck('check');
		 					}
		 				});
		 				$("#kz_device_state").val(data.result.useState);//是否启用
		 				var model = data.result.controlType;
		 				$("#kz_device_model").val(model);//模式
		 				changeKzType();
		 				if(model == '0'){
		 					//单次定时
		 					$(".tr_kz_device_end_time").css('display','');
		 					$("#kz_device_end_time").val(data.result.endTime);
		 				}
		 				if(model == '1'){
		 					//循环定时
		 					$(".tr_kz_device_end_time").css('display','none');
		 					$("#input_kz_cxsj").val(data.result.durationTime);
		 					$("#input_kz_jg").val(data.result.intervalTime);
		 					var endType = data.result.loopType;
		 					$("#kz_device_end_state").val(endType)
		 					changeLoopEndType();
		 					if(endType == '0'){
		 						//按时间
		 						$("#end_time_loop").val(data.result.endTime);
		 					}else{
		 						$("#input_kz_loop_cnt").val(data.result.loopCnt);
		 					}
		 				}
		 				if(model == '2'){
		 					$(".tr_kz_device_end_time").css('display','');
		 					$("#kz_device_open_device").val(data.result.openDevice);
		 					$("#kz_device_open_type").val(data.result.openType);
		 					$("#kz_device_open_val").val(data.result.openVal);
		 					
		 					$("#kz_device_close_device").val(data.result.closeDevice);
		 					$("#kz_device_close_type").val(data.result.closeType);
		 					$("#kz_device_close_val").val(data.result.closeVal);
		 					$("#kz_device_end_time").val(data.result.endTime);
		 				}
		 			}
		 		}
		});
	}
}
//清空控制器设置页面值
function cleanKzDeviceVal(){
	$("#kz_device_setting_id").val('');
	$("#kz_device input").val('');
	$("#kz_device_model").val('0');
	$('.icheckbox').iCheck('uncheck');
	$("#kz_device_end_state").val('0');
	$("#kz_device_state").val('1');
	changeKzType();
	changeLoopEndType();
}

//修改控制设备模式
function changeKzType(){
	var type = $("#kz_device_model").val();
	if(type == '0'){
		$(".kz_device_loop").css('display','none');
		$(".kz_device_zn").css('display','none');
		$(".tr_kz_device_end_time").css('display','');
	}
	else if(type == '1'){
		$(".kz_device_loop").css('display','');
		$(".kz_device_zn").css('display','none');
		$(".tr_kz_device_end_time").css('display','none');
		$('#tr_loop_end_time').css('display','');
		$('#tr_loop_end_cnt').css('display','none');
		$(".tr_kz_device_end_time").css('display','none');
	}
	else if(type == '2'){
		$(".kz_device_loop").css('display','none');
		$(".kz_device_zn").css('display','');
		$(".tr_kz_device_end_time").css('display','');
	}
}
//修改循环结束模式
function changeLoopEndType(){
	var model = $("#kz_device_model").val();
	if(model == '1'){
		var type = $("#kz_device_end_state").val();
		if(type == '0'){
			$('#tr_loop_end_time').css('display','');
			$('#tr_loop_end_cnt').css('display','none');
		}else if(type == '1'){
			$('#tr_loop_end_time').css('display','none');
			$('#tr_loop_end_cnt').css('display','');
		}
	}
}
//控制器保存设置
function saveAndUpdateKzSetting(){
	var method = "";
	var id = $("#kz_device_setting_id").val();
	if(id == '' || id == null){
		method = "saveControlDeviceSetting"
	}else{
		method = "updateControlDeviceSetting"
	}
	var deviceNum =	$("#kz_device_num").val();//设备id
	var model = $("#kz_device_model").val();//模式
	var startTime = $("#kz_device_start_time").val();//开启时间
	var week="";//周期
	
	if(startTime == null || startTime == ''){
		toastr.warning('请选择开启时间','提示');
		return;
	}
	
	$(".checked").each(function(){
		week+=$(this).find("input").attr("data"); 
	});
	if(week == null || week == ''){
		toastr.warning('请选择开启周期','提示');
		return;
	}
	var useState = $("#kz_device_state").val();//是否开启
	var endTime = "";
	var durationTime = "";
	var intervalTime = "";
	var loopType = "";
	var loopCnt="";
	var openDevice = "";
	var closeDevice = "";
	var openType = "";
	var closeType = "";
	var openVal = "";
	var closeVal = "";
	if(model == '0'){
		//单次定时
		endTime = $("#kz_device_end_time").val();//结束时间
		if(endTime == null || endTime == ''){
			toastr.warning('请选择结束时间','提示');
			return;
		}
		var st = startTime.split(":");
		var et = endTime.split(":");
		if(parseInt(st[0]) > parseInt(et[0])){
			toastr.warning('时间范围有误，请检查','提示');
			return;
		}if(parseInt(st[0]) == parseInt(et[0]) && parseInt(st[1]) >= parseInt(et[1])){
			toastr.warning('时间范围有误，请检查','提示');
			return;
		}
		
	}else if(model == '1'){
		var regzs = /^\+?[1-9][0-9]*$/;//正整数  
		//循环
		durationTime = $("#input_kz_cxsj").val();
		intervalTime = $("#input_kz_jg").val();
		if(durationTime == null || durationTime == ''){
			toastr.warning('请填写持续时间','提示');
			return;
		}
		if(parseInt(durationTime) == 0 || !regzs.test(durationTime) ){
			toastr.warning('持续时间请输入大于0的正整数','提示');
			return;
		}
		if(intervalTime == null || intervalTime == ''){
			toastr.warning('请填写间隔时间','提示');
			return;
		}
		if(parseInt(intervalTime) == 0 || !regzs.test(intervalTime)){
			toastr.warning('间隔时间请输入大于0的正整数','提示');
			return;
		}
		loopType = $("#kz_device_end_state").val();
		if(loopType == '0'){
			endTime = $("#end_time_loop").val();
			if(endTime == null || endTime == ''){
				toastr.warning('请选择结束时间','提示');
				return;
			}
			var st = startTime.split(":");
			var et = endTime.split(":");
			if(parseInt(st[0]) > parseInt(et[0])){
				toastr.warning('时间范围有误，请检查','提示');
				return;
			}if(parseInt(st[0]) == parseInt(et[0]) && parseInt(st[1]) >= parseInt(et[1])){
				toastr.warning('时间范围有误，请检查','提示');
				return;
			}
		}else{
			loopCnt = $("#input_kz_loop_cnt").val();
			if(loopCnt == null || loopCnt == ''){
				toastr.warning('请填写循环次数','提示');
				return;
			}
			if(parseInt(loopCnt) == 0 || !regzs.test(intervalTime)){
				toastr.warning('循环次数请输入大于0的正整数','提示');
				return;
			}
		}
	}else{
		//智能
		openDevice = $("#kz_device_open_device").val();
		closeDevice = $("#kz_device_close_device").val();
		openType = $("#kz_device_open_type").val();
		closeType = $("#kz_device_close_type").val();
		openVal = $("#kz_device_open_val").val();
		closeVal = $("#kz_device_close_val").val();
		endTime = $("#kz_device_end_time").val();
		if(openVal == null || openVal == ''){
			toastr.warning('请填写开启设备数值','提示');
			return;
		}
		if(closeVal == null || closeVal == ''){
			toastr.warning('请填写关闭设备数值','提示');
			return;
		}
		if(endTime == null || endTime == ''){
			toastr.warning('请选择结束时间','提示');
			return;
		}
		var st = startTime.split(":");
		var et = endTime.split(":");
		
		if(parseInt(st[0]) > parseInt(et[0])){
			toastr.warning('时间范围有误，请检查1','提示');
			return;
		}if(parseInt(st[0]) == parseInt(et[0]) && parseInt(st[1]) >= parseInt(et[1])){
			toastr.warning('时间范围有误，请检查2','提示');
			return;
		}
		if(openDevice == closeDevice){
			//操控设备相同，判断是否符合逻辑
			if(openType == closeType){
				//同时大于或小于
				toastr.warning('数值选择有误，请检查','提示');
				return;
			}else{
				if(openType == '0' && closeType == '1' && parseInt(openVal) <= parseInt(closeVal)){
					toastr.warning('数值选择有误，请检查1','提示');
					return;
				}
				if(openType == '1' && closeType == '0' && parseInt(openVal) >= parseInt(closeVal)){
					toastr.warning('数值选择有误，请检查2','提示');
					return;
				}
			}
		}
	}
	
	 $.ajax({
		type:"POST",
		url:"actionServlet",
	 	data:{"actionName":"deviceService","method":method,"id":id,"deviceNum":deviceNum
	 			,"controlType":model,"openDevice":openDevice,"closeDevice":closeDevice
	 			,"openType":openType,"closeType":closeType,"openVal":openVal,"closeVal":closeVal
	 			,"startTime":startTime,"endTime":endTime,"loopType":loopType,"loopCnt":loopCnt
	 			,"durationTime":durationTime,"intervalTime":intervalTime,"loopWeek":week,"useState":useState},
 		dataType:"JSON",
 		success:function(data){
 			if(data.statusCode == 100){
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
 			if(data.statusCode == 1){
 				var id = $("#kz_device_num").val();
 				kzDeviceLeftData(id);
 				swal({
 	    	  		title: "保存成功",
 	          		text: "",
 	          		type: "success"
 	         	});
 			}
 		}
	});
	
}

//删除控制器设置
function deleteKzSetting(){
	var id = $("#kz_device_setting_id").val();
	var deviceNum =	$("#kz_device_num").val();//设备id
	swal({
	   title: "删除",
	   text: '确定要删除该设置么',
	   type: 'warning',
	   showCancelButton: true,
	   closeOnConfirm: false, 
	   confirmButtonText: '确定',
	   cancelButtonText: '取消',
	 }, function() { 
		 $.ajax({
			type:"POST",
	 		url:"actionServlet",
	 		data:{"actionName":"deviceService","method":"deleteControlDeviceSetting","id":id,"deviceNum":deviceNum},
	 		dataType:"JSON",
	 		success:function(data){
	 			if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
	 			if(data.statusCode == 1){
	 				var id = $("#kz_device_num").val();
	 				kzDeviceLeftData(id);
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

//12.26

//12.26
$(function(){
	 $(".clickState").click(function(){
          var showId=$(this).attr("data-id");
          var showColor=$(this).attr("data-color");
          var a=$("#myTab").children().eq(showId).children(":first-child").attr("class");
          var s1 = a.substring(0,a.length-2);
          $(this).attr("data-toggle","modal");
          $(this).attr("data-target","#runningState");
          $("#myTab").children().children("a").css("color","#A8A9AB");
          $(".tab-content").children().eq(showId).addClass("active");
          $("#myTab").children().eq(showId).children(":last-child").css("color","#"+showColor)
          $("#myTab").children().eq(showId).children(":first-child").removeClass(a).addClass(s1);
        })
     $('#runningState').on('hide.bs.modal', function () {
        $(".linkNormal>i").removeClass().addClass("linkNormalBgNo");
        $(".sensingAlarm>i").removeClass().addClass("senseNo");
        $(".running>i").removeClass().addClass("runningBgNo");
        $(".disconnectionEquipment>i").removeClass().addClass("disconnectionEquipmentBgNo");
    })
    $(".linkNormal>a").click(function(){
        $(this).prev().removeClass().addClass("linkNormalBg");
        $(this).css("color","#177AD5");
        $(this).parent().siblings().children("a").css("color","#A8A9AB");
        $(".sensingAlarm>i").removeClass().addClass("senseNo");
        $(".running>i").removeClass().addClass("runningBgNo");
        $(".disconnectionEquipment>i").removeClass().addClass("disconnectionEquipmentBgNo");
    })
    $(".sensingAlarm>a").click(function(){
        $(this).prev().removeClass().addClass("sense");
        $(this).css("color","#FD5436");
        $(this).parent().siblings().children("a").css("color","#A8A9AB");
        $(".linkNormal>i").removeClass().addClass("linkNormalBgNo");
        $(".running>i").removeClass().addClass("runningBgNo");
        $(".disconnectionEquipment>i").removeClass().addClass("disconnectionEquipmentBgNo");
    })  
    $(".running>a").click(function(){
        $(this).prev().removeClass().addClass("runningBg");
        $(this).css("color","#14CB66");
        $(this).parent().siblings().children("a").css("color","#A8A9AB");
        $(".linkNormal>i").removeClass().addClass("linkNormalBgNo");
        $(".sensingAlarm>i").removeClass().addClass("senseNo");
        $(".disconnectionEquipment>i").removeClass().addClass("disconnectionEquipmentBgNo");
    })   
    $(".disconnectionEquipment>a").click(function(){
        $(this).prev().removeClass().addClass("disconnectionEquipmentBg");
        $(this).css("color","#FE9129");
        $(this).parent().siblings().children("a").css("color","#A8A9AB");
        $(".linkNormal>i").removeClass().addClass("linkNormalBgNo");
        $(".sensingAlarm>i").removeClass().addClass("senseNo");
        $(".running>i").removeClass().addClass("runningBgNo");
    })  
    
})
