function getEmplyoeeList(page){
		var name = $("#serarch_name").val();
		$.ajax({
			type:"POST",
 	 		url:"actionServlet",
 	 		data:{"actionName":"employeeService","method":"queryListCount","name":name},
 	 		dataType:"JSON",
 	 		success:function(data){
 	 			if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
 	 			var allSize = data.result;

 				if(allSize > 20){

// 				if(allSize > pageSize){

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
 	 		data:{"actionName":"employeeService","method":"queryList","name":name,"startRec":startRec,"pageSize":pageSize},
 	 		dataType:"JSON",
 	 		success:function(data){
 	 			if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
 	 			if(data.statusCode == 1){
 	 				var htmlStr = $("#demo_tr").html();
 					$("#data_table").empty();
 					$("#data_table").append("<tr id='demo_tr' style='display:none'>" + htmlStr+ "</tr>");
 					for(var i=0;i<data.result.length;i++){
 						var newStr = "<tr>" + htmlStr+"</tr>";
 						newStr = newStr.replace("#employeeId#",data.result[i].id);
 						newStr = newStr.replace("#employeeName#",data.result[i].name);
 						newStr = newStr.replace("#employeePosition#",data.result[i].position);
 						newStr = newStr.replace("#employeeAge#",data.result[i].age);
 						var date = data.result[i].certificatesValid;
 						if(date == null){
 							date = "";
 						}
 						newStr = newStr.replace("#certificatesDate#",date);
 						newStr = newStr.replace("#employeeAddress#",data.result[i].address);
 						newStr = newStr.replace("#icheck_class#","icheckbox");
 						var userState = data.result[i].healthyState;
 						if(userState == 1){
 							userState="优"
 						}else if(userState == 2){
 							userState="良"
 						}else if(userState == 3){
 							userState="差"
 						}
 						newStr = newStr.replace("#employeeState#",userState);
 						newStr = newStr.replace("#mobile#",data.result[i].mobile);
 						var icon = data.result[i].icon;
 						if(icon != ""){
 							icon = pic_url + icon;
 							newStr = newStr.replace("#icon_display#","");
 						}else{
 							newStr = newStr.replace("#icon_display#","none");
 						}
 						newStr = newStr.replace("#employeeIcon#",icon);
 						var cerIcon = data.result[i].certificates;
 						if(cerIcon != ""){
 							cerIcon = pic_url + cerIcon;
 							newStr = newStr.replace("#zgz_display#","");
 						}else{
 							newStr = newStr.replace("#zgz_display#","none");
 						}
 						newStr = newStr.replace("#employeeCertificates#",cerIcon);
 						$("#data_table").append(newStr);
 						if(i%2 == 1){
 							$("#data_table").children("tr:last-child").css("background","#F7F8FA")
 						}
 					}
 					$(".icheckbox").iCheck({
						checkboxClass: 'icheckbox_square-green',
					});
 					$('#selectAll').on('ifChecked', function(event){ 
				   		$('.icheckbox').iCheck('check');
			       	}); 
			       	$('#selectAll').on('ifUnchecked', function(event){ 
			    		$('.icheckbox').iCheck('uncheck');
			       	}); 
			       	
 					
 	 			}	
 	 			
 	 		}
 	 	});
		
 }
 		
function firstcallbackAjax(api){
	var current=api.getCurrent();
    getEmplyoeeList(current);
}

        
function addEmplyoee(){
	$("#addpersonal input").val("");
	$("#imgviewEmployeeIcon").attr("src","");
	$('#imgviewEmployeeIcon').css('display','none');
	
	$("#imgview_certificates").attr("src","");
	$('#imgview_certificates').css('display','none');
	
	$('#choose_employee_icon').css('display','');
	$('#choose_certificates').css('display','');
	$("#addpersonal").modal('show');
}
         
function saveEmplyoee(){
	var telReg = /(\+86|0086)?\s*1[345789]\d{9}/;
	var numReg=/^[0-9]*[1-9][0-9]*$/;
	var name=$("#user_name").val();
    var icon = $("#imgviewEmployeeIcon").attr("src");
    var certificates = $("#imgview_certificates").attr("src");
    var sex = $("#user_sex").val();
    var age = $("#user_age").val();
    var mobile = $("#user_tel").val();
    var address = $("#user_address").val();
    var position = $("#user_position").val();
    var state = $("#user_state").val();
    var certificatesValid = $("#certificatesValid").val();
    if(name == ""){
    	toastr.warning('请填写员工姓名','提示');
		return;
    }
    if(age == ""){
    	toastr.warning('请填写员工年龄','提示');
		return;
    }
    if(!numReg.test(age)){
    	toastr.warning('请正确填写员工年龄','提示');
		return;
    }
    if(mobile == ""){
    	toastr.warning('请填写员工手机号','提示');
		return;
    }
    if(!telReg.test(mobile)){
    	toastr.warning('请填写正确的手机号','提示');
		return;
    }
    $('.btn-ladda-demo').ladda( 'bind');
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
	var l = $('.btn-ladda-demo').ladda();
	l.ladda( 'start' );
  	 $.ajax({
		type:"POST",
		url:"actionServlet",
		data:{"actionName":"employeeService","method":"add","file_icon":icon,"name":name
			,"sex":sex,"mobile":mobile,"position":position,"age":age,"healthyState":state
			,"address":address,"icon":icon,"certificates":certificates,"certificatesValid":certificatesValid},
		dataType:"JSON",
		success:function(data){
			if(data.statusCode == 100){
				l.ladda('stop');
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
			if(data.statusCode == 1){
				swal({
		            title: "新增成功",
		            text: "",
		            type: "success"
		         });
				l.ladda('stop');
				$("#addpersonal").modal('hide');
				getEmplyoeeList(1);
			}
		}
  	 });

}

//function showBigPic(obj,e){
//	var img = $(obj).attr("src");
//	$("#big_img_div").css("display","");
//	$("#big_img").attr("src",img);
//}
//function hideBigPic(){
//	$("#test_img_div").css("display","none");
//}

//获取选中id
function getSelectIds(){
	var selectObj = $(".checked");
	var selectIds = "";
	$(selectObj).each(function(){
		selectIds+="," + $(this).find("input").val();
	});
	if(selectIds.length>0){
		selectIds=selectIds.substring(1);
	}
	return selectIds;
}

function deleteEmployee(){
	
	var ids = getSelectIds();
	if(ids.length == 0){
		swal({
            title: "请选择数据",
            text: "",
            type: "info"
         });
	}else{
		swal({
 		   title: "删除",
 		   text: '确定要删除该员工么',
 		   type: 'warning',
 		   showCancelButton: true,
 		   closeOnConfirm: false, 
 		   confirmButtonText: '确定',
 		   cancelButtonText: '取消',
 		 }, function() { 
 			$.ajax({
 				type:"POST",
 	 	 		url:"actionServlet",
 	 	 		data:{"actionName":"employeeService","method":"delete","ids":ids},
 	 	 		dataType:"JSON",
 	 	 		success:function(data){
 	 	 			if(data.statusCode == 100){
		 				toastr.error('请联系管理员','未拥有权限');
		 				return;
		 			}
 	 	 			getEmplyoeeList(1);
 	 	 			swal({
 	 	 	            title: "删除成功",
 	 	 	            text: "",
 	 	 	            type: "success"
 	 	 	         });
 	 	 		}
 			});
 			 
 		 });
		
	}
	
}


//专家交流
function getUserType(){
	$.ajax({
		type:"POST",
		url:"actionServlet",
		data:{"actionName":"webService","method":"getUserInfo"},
		dataType:"JSON",
		success:function(data){
			if(data.statusCode == 100){
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
			if(data.statusCode == 1){
				$("#expert_user_type").val(data.result.type);
				if(data.result.type == '2'){
					$("#expert_div").css("display","")
					$(".checkDisplay").css("display","")
				}
			}
		}
	});
}

function getExpertList(page){
	
	var name = $("#serarch_name").val();
	
	$.ajax({
		type:"POST",
	 		url:"actionServlet",
	 		data:{"actionName":"expertService","method":"queryListCount","name":name},
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
	 		data:{"actionName":"expertService","method":"queryList","name":name,"startRec":startRec,"pageSize":pageSize},
	 		dataType:"JSON",
	 		success:function(data){
	 			if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
	 			if(data.statusCode == 1){
	 				var htmlStr = $("#demo_tr").html();
					$("#data_table").empty();
					$("#data_table").append("<tr id='demo_tr' style='display:none'>" + htmlStr+ "</tr>");
					for(var i=0;i<data.result.length;i++){
						var newStr = "<tr>" + htmlStr+"</tr>";
						newStr = newStr.replace("#expertId#",data.result[i].id);
						newStr = newStr.replace("#expertName#",data.result[i].name);
						var type = data.result[i].type;
						if(type == '0'){
							newStr = newStr.replace("#expertType#","农业");
						}else{
							newStr = newStr.replace("#expertType#","渔业");
						}
						var sex = data.result[i].sex;
						if(sex=='1'){
							newStr = newStr.replace("#expertSex#","男");
						}else{
							newStr = newStr.replace("#expertSex#","女");
						}
						newStr = newStr.replace("#expertIndustry#",data.result[i].industry);
						newStr = newStr.replace("#expertMajor#",data.result[i].major);
						newStr = newStr.replace("#expertPhone#",data.result[i].mobile);
						newStr = newStr.replace("#expertWx#",data.result[i].wechat);
						newStr = newStr.replace("#expertQq#",data.result[i].qq);
						newStr = newStr.replace("#expertIcon#",pic_url + data.result[i].icon);
						newStr = newStr.replace("#icheck_class#","icheckbox");
						$("#data_table").append(newStr);
						if(i%2 == 1){
 							$("#data_table").children("tr:last-child").css("background","#F7F8FA")
 						}
					}
					$(".icheckbox").iCheck({
					checkboxClass: 'icheckbox_square-green',
				});
					$('#selectAll').on('ifChecked', function(event){ //ifCreated 事件应该在插件初始化之前绑定 
				    	$('.icheckbox').iCheck('check');
		       	}); 
		       	$('#selectAll').on('ifUnchecked', function(event){ //ifCreated 事件应该在插件初始化之前绑定 
		    	   	$('.icheckbox').iCheck('uncheck');
		       	}); 
	 			}	
	 			
	 		}
	 	});
	
}
		
function firstcallbackAjax(api){
var current=api.getCurrent();
getExpertList(current);
}

    
function addExpert(){
$("#addExpert input").val("");
$("#imgviewExpertIcon").attr("src","");
$('#imgviewExpertIcon').css('display','none');

$('#choose_expert_icon').css('display','');
$("#addExpertModal").modal('show');
}
     
function saveExpert(){
	var telReg = /(\+86|0086)?\s*1[345789]\d{9}/;
	var name=$("#expert_name").val();
	var sex = $("#expert_sex").val();
	var type = $("#expert_type").val();
	var industry = $("#expert_industry").val();
	var major = $("#expert_major").val();
	var mobile = $("#expert_mobile").val();
	var wx = $("#expert_wx").val();
	var qq = $("#expert_qq").val();
	var icon = $("#imgviewExpertIcon").attr("src");
	if(name==''){
		toastr.warning('请输入姓名','提示');
		return;
	}
	if(industry==''){
		toastr.warning('请输入行业','提示');
		return;
	}
	if(major==''){
		toastr.warning('请输入专长','提示');
		return;
	}
	if(mobile==''){
		toastr.warning('请输入手机号','提示');
		return;
	}
	if(!telReg.test(mobile)){
		toastr.warning('请输入正确的手机号','提示');
		return;
	}
	$('.btn-ladda-demo4').ladda( 'bind');
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
	var l = $('.btn-ladda-demo4').ladda();
	l.ladda( 'start' );
	 $.ajax({
	type:"POST",
	url:"actionServlet",
	data:{"actionName":"expertService","method":"saveExpert","icon":icon,"name":name
			,"sex":sex,"type":type,"industry":industry,"major":major,"mobile":mobile
			,"wechat":wx,"qq":qq},
	dataType:"JSON",
	success:function(data){
		if(data.statusCode == 100){
			l.ladda('stop');
				toastr.error('请联系管理员','未拥有权限');
				return;
		}
		if(data.statusCode == 1){
			swal({
	            title: "新增成功",
	            text: "",
	            type: "success"
	         });
			l.ladda('stop');
			$("#addExpertModal").modal('hide');
			$("#addExpertModal .modal-body input").val('');
			getExpertList(1);
		}
	}
	 });

}

function showBigPic(obj,e){
	var img = $(obj).attr("src");
	$("#test_img_div").css("display","");
	$("#test_img").attr("src",img);
}
function hideBigPic(){
	$("#test_img_div").css("display","none");
}

//获取选中id
function getSelectIds(){
	var selectObj = $(".checked");
	var selectIds = "";
	$(selectObj).each(function(){
		selectIds+="," + $(this).find("input").val();
	});
	if(selectIds.length>0){
		selectIds=selectIds.substring(1);
	}
	return selectIds;
}

function deleteExpert(){

var ids = getSelectIds();
if(ids.length == 0){
	swal({
        title: "请选择数据",
        text: "",
        type: "info"
     });
}else{
	swal({
		   title: "删除",
		   text: '确定要删除该专家么',
		   type: 'warning',
		   showCancelButton: true,
		   closeOnConfirm: false, 
		   confirmButtonText: '确定',
		   cancelButtonText: '取消',
		 }, function() { 
			$.ajax({
				type:"POST",
	 	 		url:"actionServlet",
	 	 		data:{"actionName":"expertService","method":"deleteExpert","ids":ids},
	 	 		dataType:"JSON",
	 	 		success:function(data){
	 	 			if(data.statusCode == 100){
		 				toastr.error('请联系管理员','未拥有权限');
		 				return;
		 			}
	 	 			getExpertList(1);
	 	 			swal({
	 	 	            title: "删除成功",
	 	 	            text: "",
	 	 	            type: "success"
	 	 	         });
	 	 		}
			});
			 
		 });
	
}

}


