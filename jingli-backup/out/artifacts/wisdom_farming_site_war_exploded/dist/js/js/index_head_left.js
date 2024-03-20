//var imgUrl = "http://ozdwirxvt.bkt.clouddn.com/";
var  imgUrl="http://img.nxptdn.com/";
var map;
function header(){
    $("#warning_icon").click(function(){
//    	$("#warning_icon .remind").css({'background':"transparent","color":"transparent"});
    	window.location.href="actionServlet?actionName=permissionService&method=toPage&page=warningManage";
    });
    $("#quit").click(function(){
    	window.location.href="loginServlet?method=userLogOut";
    });
    $("#quit").click(function(){
    	window.location.href="loginServlet?method=userLogOut";
    });
	toastr.options = {
		  "closeButton": true,
		  "debug": false,
		  "progressBar": true,
		  "preventDuplicates": false,
		  "positionClass": "toast-top-right",
		  "onclick": null,
		  "showDuration": "400",
		  "hideDuration": "2500",
		  "timeOut": "2500",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}
		
	$("body").niceScroll({
        cursorcolor: "#E0E0E2",//滚动条的颜色
        cursoropacitymax: 1, //滚动条的透明度，从0-1
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "6px", //滚动条的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径  圆角
        autohidemode: true, //是否隐藏滚动条  true的时候默认不显示滚动条，当鼠标经过的时候显示滚动条
        zindex:"auto",//给滚动条设置z-index值
        railpadding: {top:0, right:0, left:0, bottom:0}//滚动条的位置
    })
    warningCount();
}

function warningCount(){
	var companyId=sessionStorage.getItem("key");
	 $.ajax({
	    	type:"POST",
			url:"actionServlet",
			data:{"actionName":"earlyWaringService","method":"queryNotReadCount","companyId":companyId},
			dataType:"JSON",
			success:function(data){
				if(data.statusCode=='1'){
					sessionStorage.setItem('warningCount',data.result);
					if(data.result=='0'){
						$("#warning_icon .remind").css({'background':"transparent","color":"transparent"});
						$("#warning_icon .remind").html(data.result);
					}
					else if(data.result>99){
						$("#warning_icon .remind").css({'background':"#FE8110","color":"#fff"});
						$('#warning_icon .remind').html('99'+'+');
					}
					else{
						$("#warning_icon .remind").css({'background':"#FE8110","color":"#fff"});
						$('#warning_icon .remind').html(data.result);
					}
				}
			}
	    })
}
function scroll(scrollName){
	$(scrollName).niceScroll({
        cursorcolor: "#E0E0E2",//滚动条的颜色
        cursoropacitymax: 1, //滚动条的透明度，从0-1
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "6px", //滚动条的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径  圆角
        autohidemode: true, //是否隐藏滚动条  true的时候默认不显示滚动条，当鼠标经过的时候显示滚动条
        zindex:"auto",//给滚动条设置z-index值
        railpadding: {top:0, right:0, left:0, bottom:0}//滚动条的位置
    })
}

$(window).resize(function() {
	var footHeight=$('#divFooter').offset().top;
	 var midHeight=footHeight;
	 $("#div1").css("height",midHeight-50+'px');
	 $('.main').css("min-height",footHeight-50+'px');
});

//侧边
function menu(){
	 var footHeight=$('#divFooter').offset().top;
	 var midHeight=footHeight;
	 $("#div1").css("height",midHeight-50+'px');
	 $('.main').css("min-height",footHeight-50+'px');
	$.ajax({
			type:"POST",
			url:"actionServlet",
			data:{"actionName":"webService","method":"getMenuByUser"},
			dataType:"JSON",
			success:function(data){
				if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
				if(data.statusCode == 1){
					var menuData = data.result;
					var html = "";
					for(var i=0;i<menuData.length;i++){
					    html+='<li><a class="withripple" href="javascript:;" >';
					    html+='<img src="./img/menu/'+menuData[i].img+'" alt="">';
					    html+='<span class="sidespan">'+menuData[i].menuName+'</span><i class="pull-right glyphicon glyphicon-menu-right" style="top:17px"></i></a>';
					    if(menuData[i].childList.length != 0){
					        html+='<ul class="sidebar-dropdown ">';
					    }
					    for(var j=0;j<menuData[i].childList.length;j++){
					        html+='<li><a href="'+menuData[i].childList[j].menuUrl+'" class="withripple" >'+menuData[i].childList[j].menuName+'</a></li>';
					    }
					    if(menuData[i].childList.length != 0){
					        html+='</ul>';
					    }
					    html+='</li>';
					}
					$("#menu_ul").html(html);
					$(".sidenav li a").click(function(){
					    var that=$(this);
					    if(that.hasClass("hover")){ 
//					    	12.25
					        $(this).removeClass("hover");
				            $(this).next().slideUp();
				            $(this).children("i:last-child").addClass("glyphicon-menu-right").removeClass("glyphicon-menu-down");
					    }
					    else{
					    	$(this).addClass("hover");
					        $(this).next().slideToggle();    
					        $(this).parent().siblings().children("a").removeClass("hover").next().slideUp();
					        $(this).children("i:last-child").addClass("glyphicon-menu-down").removeClass("glyphicon-menu-right");
					    } 
				        $(this).parent().siblings().children("a").children("i:last-child").addClass("glyphicon-menu-right").removeClass("glyphicon-menu-down");
					})
					
				}
			}
	});
	
	updateUserInfo();
	$("#employee_manage").click(function(){
    	window.location.href="actionServlet?actionName=permissionService&method=toPage&page=employeeManage";
    });
}
function updateUserInfo(){
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
				$("#companyIcon").attr("src",imgUrl + data.result.icon);
				$("#companyName").html(data.result.name);
				$("#title_company_name").html(data.result.searchName);
				if(data.result.type != 3 && data.result.type!=4){
					$("#companyInfo").css("display","none");
					$("#employee_manage").css("display","none");
					$("#warning_icon").css("display","none");
				}else{
					$("#companyInfo").css("display","");
					$("#employee_manage").css("display","");
					$("#warning_icon").css("display","");
				}
				$("#companyName").attr("qx",data.result.type);
			}
		}
	});
}

//个人模态框
function personalModel(){
  //保存公司
  $("#choose_pic").click(function(){
	  $("#file_choose_pic").click();
  })
  $("#companyInfo").click(function(){
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
					$("#company_error").css("display","none");
					
					if(data.result.icon != ''){
						$('#imgviewPersonal').attr("src",imgUrl + data.result.icon);
						$('#imgviewPersonal').css('display','');
						$('#choose_pic').css('display','none');
					}
					$("#uname").val(data.result.name);
					$("#u_bir").val(data.result.contacts);
					$("#u_detail").val(data.result.address);
					$("#companyProfile").val(data.result.describe);
					if(map == null){
						map = new BMap.Map("container");
					}
					var lng = data.result.lng;
					var lat = data.result.lat;
					if(lng == null || lng == "" || lat == null || lat == ''){
						lng = 116.404;
						lat = 39.915;						
					}else{
						$("#company_position").val(lng+","+lat);
						map.clearOverlays();
						var marker = new BMap.Marker(new BMap.Point(lng, lat)); // 创建点
						map.addOverlay(marker);   
						marker.setAnimation(BMAP_ANIMATION_BOUNCE);
					}
					point = new BMap.Point(lng,lat);
					map.centerAndZoom(point, 15);
					map.enableScrollWheelZoom(true);
					map.addEventListener("click",function(e){
						map.clearOverlays();
						var marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat)); // 创建点
						map.addOverlay(marker);   
						marker.setAnimation(BMAP_ANIMATION_BOUNCE);
						$("#company_position").val(e.point.lng+"," +e.point.lat);
						point = new BMap.Point(e.point.lng,e.point.lat);
						map.panTo(point);
					});
					map.panBy(150, 150)
					$("#personal").modal('show');
				}
			}
		});
  })
  $('#company_sure').click(function(){
	  var imgBase64=$("#imgviewPersonal").attr("src");
	  var companyName=$("#uname").val();
	  var contacts=$("#u_bir").val();
	  var address=$("#u_detail").val();
	  var str=$("#companyProfile").val();
	  var describe=str.replace(/\s/g, "");
	  var position = $("#company_position").val();
	  
	  if(companyName===""){$("#company_error").css("display","")}
	  else{
		  $.ajax({
				type:"POST",
				url:"actionServlet",
				data:{"actionName":"queryUserService","method":"updateDescribe","name":companyName
						,"contacts":contacts,"address":address,"describe":describe,'icon':imgBase64
						,"position":position},
				dataType:"JSON",
				success:function(data){
					if(data.statusCode == 100){
		 				toastr.error('请联系管理员','未拥有权限');
		 				return;
		 			}
					if(data.statusCode == 1){
						updateUserInfo();
						swal({
				            title: "保存成功",
				            text: "",
				            type: "success"
				         });
						$("#personal").modal('hide');
					}
				}
			});
	  }
	  
  })
	  
  //禁止使用换行
  var test= document.getElementById("companyProfile");  
  test.onkeydown = function(e){  
     send(e);  
  }  
     function send(e){  
     var code;  
     if (!e) var  e = window.event;  
     if (e.keyCode) code = e.keyCode;  
     else if (e.which) code = e.which;  
     if(code==13 && window.event){  
         e.returnValue = false;  
     }else if(code==13){  
         e.preventDefault();  
     }  
   
 } 
 
}

//选择图片
function choosePic(obj){
	$(obj).parent().find("input").click();
}
//上传图片
function filechange(file) {  
      if (file.files && file.files[0]) {  
          var reader = new FileReader();  
          reader.onload = function (evt) {  
        	  showImgView(evt.target.result , file); 
          };  
          var fileSize = file.files[0].size;
          var name=file.value;
          var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
          
          if(fileName !="jpg" && fileName !="jpeg" && fileName !="png" ){
        	  swal({
		    	  title: "图片格式有误",
		          text: "请选择 jpg,jpeg,png格式上传",
		          type: "error"
	          });
              return false;
          }
          var size = fileSize / 1024;    
          if(size>2000){
		      swal({
		    	  title: "图片过大",
		          text: "上传图片不得大于2M",
		          type: "error"
	          });
        	  return false
          }
          
          reader.readAsDataURL(file.files[0]);
         
      } 
      //ie兼容
      else {  
          file.select(); 
          file.blur();  
          var src = document.selection.createRange().text;
          var name=file.value;
          var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
          var fso = new ActiveXObject("Scripting.FileSystemObject");
          fileSize = fso.GetFile(src).size; 
          if(fileName !="jpg" && fileName !="jpeg" && fileName !="png" ){
        	  swal({
		    	  title: "图片格式有误",
		          text: "请选择 jpg,jpeg,png格式上传",
		          type: "error"
	          });
              return false;
          }
          var size = fileSize / 1024;    
          if(size>2000){
		      swal({
		    	  title: "图片过大",
		          text: "上传图片不得大于2M",
		          type: "error"
	          });
        	  return false
          }
          showImgView(src,file);
      }
  }  
function showImgView(src,obj) {  
	$(obj).parent().find("a").css("display","none");
	$(obj).parent().find("button").css("display","none");
	$(obj).parent().find("img").css("display","");
	$(obj).parent().find("img").attr("src",src);
} 

function getDeviceUnit(device){
	var unit = "";
	 if(device == "1"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>℃</font>"
	   }else if(device == "2"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>%</font>"
	   }else if(device == "3"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>ppm</font>"
	   }else if(device == "4"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>Lux</font>"
	   }else if(device == "5"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>℃</font>"
	   }else if(device == "6"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>%</font>"
	   }else if(device == "7"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>PH</font>"
	   }else if(device == "17"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>℃</font>"
	   }else if(device == "18"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>%</font>"
	   }else if(device == "19"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>mm</font>"
	   }else if(device == "20"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>mm</font>"
	   }else if(device == "31"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>℃</font>"
	   }else if(device == "32"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>Mg/L</font>"
	   }else if(device == "33"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>PH</font>"
	   }else if(device == "34"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>Mg/L</font>"
	   }else if(device == "35"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>Mg/L</font>"
	   }else if(device == "36"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>NUT</font>"
	   }else if(device == "37"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>Mg/L</font>"
	   }else if(device == "38"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>Kg</font>"
	   }else if(device == "39"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>Kg</font>"
	   }else if(device == "39"){
	  	unit = " <font style='font-family:微软雅黑;font-size:14px'>Kg</font>"
	   }
	 return unit;
	
}

