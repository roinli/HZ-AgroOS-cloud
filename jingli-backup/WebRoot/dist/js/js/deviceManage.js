$(function(){
	
	
	
	
	
	
		$(".clickState").click(function(){
	        var showId=$(this).attr("data-id");
	        var showColor=$(this).attr("data-color");
	        var a=$("#myTab").children().eq(showId).children(":first-child").attr("class");
	        var s1 = a.substring(0,a.length);
	        $(this).attr("data-toggle","modal");
	        $(this).attr("data-target","#runningState");
	        $("#myTab").children().children("a").css("color","#A8A9AB");
	        $(".tab-content").children().eq(showId).addClass("active");
	        $("#myTab").children().eq(showId).children(":last-child").css("color","#"+showColor)
	        $("#myTab").children().eq(showId).children(":first-child").removeClass(a).addClass(s1);
	        getDeviceGroupVal(showId);
	      })
	  $('#runningState').on('hide.bs.modal', function () {
	      $(".linkNormal>i").removeClass().addClass("linkNormalBgNo");
	      $(".sensingAlarm>i").removeClass().addClass("senseNo");
	      $(".running>i").removeClass().addClass("runningBgNo");
	      $(".disconnectionEquipment>i").removeClass().addClass("disconnectionEquipmentBgNo");
	  })

	   $(".linkNormal").click(function(){
	      $(this).children(":first-child").removeClass().addClass("linkNormalBg");
	      $(this).children(":last-child").css("color","#177AD5");
	      $(this).siblings().children("a").css("color","#A8A9AB");
	      $(".sensingAlarm>i").removeClass().addClass("senseNo");
	      $(".running>i").removeClass().addClass("runningBgNo");
	      $(".disconnectionEquipment>i").removeClass().addClass("disconnectionEquipmentBgNo");
	      getDeviceGroupVal(0);
	  })
 
		 $(".sensingAlarm").click(function(){
			 $(this).children(":first-child").removeClass().addClass("sense");
			 $(this).children(":last-child").css("color","#FD5436");
			 $(this).siblings().children("a").css("color","#A8A9AB");
			 $(".linkNormal>i").removeClass().addClass("linkNormalBgNo");
			 $(".running>i").removeClass().addClass("runningBgNo");
			 $(".disconnectionEquipment>i").removeClass().addClass("disconnectionEquipmentBgNo");
			 getDeviceGroupVal(1);
		})  
  
	 $(".running").click(function(){
		      $(this).children(":first-child").removeClass().addClass("runningBg");
		      $(this).children(":last-child").css("color","#14CB66");
		      $(this).siblings().children("a").css("color","#A8A9AB");
		      $(".linkNormal>i").removeClass().addClass("linkNormalBgNo");
		      $(".sensingAlarm>i").removeClass().addClass("senseNo");
		      $(".disconnectionEquipment>i").removeClass().addClass("disconnectionEquipmentBgNo");
		      getDeviceGroupVal(2);
		  })   
 
	  $(".disconnectionEquipment").click(function(){
	      $(this).children(":first-child").removeClass().addClass("disconnectionEquipmentBg");
	      $(this).children(":last-child").css("color","#FE9129");
	      $(this).siblings().children("a").css("color","#A8A9AB");
	      $(".linkNormal>i").removeClass().addClass("linkNormalBgNo");
	      $(".sensingAlarm>i").removeClass().addClass("senseNo");
	      $(".running>i").removeClass().addClass("runningBgNo");
	      getDeviceGroupVal(3);
	  }) 
	})	 

function onMessage(event) {
		
	    	var eventJson = eval('(' + event.data + ')'); 
	    	var currentGfNum = $("#gf_num_list").val();
	    	if(currentGfNum == eventJson.gfNum){
	    		var device = eventJson.deviceNum;
	    		var state = eventJson.state;
	    		var msg = eventJson.msgInfo;
	    		var type = eventJson.type;//0采集器1控制器
	    		var val = eventJson.val;//采集数值
	    		
	    		if(type == '0' && state != '2'){
	    			//采集器
	    			if(device == '1'){
	    				$("#temperature").html( val+ " <font style='font-family:微软雅黑'>℃</font>");
	    			}else if(device == '2'){
	    				$("#humidity").html( val + " <font style='font-family:微软雅黑'>%</font>");
	    			}else if(device == '3'){
	    				$("#co2").html( val + " <font style='font-family:微软雅黑;font-size:14px'>ppm</font>");
	    			}else if(device == '4'){
	    				$("#light").html( val + " <font style='font-family:微软雅黑;font-size:14px'>Lux</font>");
	    			}else if(device == '5'){
	    				$("#soilTem").html( val + " <font style='font-family:微软雅黑;font-size:14px'>℃</font>");
	    			}else if(device == '6'){
	    				$("#soilHum").html( val + " <font style='font-family:微软雅黑;font-size:14px'>%</font>");
	    			}else if(device == '7'){
	    				$("#soilPh").html( val + " <font style='font-family:微软雅黑;font-size:14px'>PH</font>");
	    			}else if(device == '17'){
	    				$("#leafTem").html( val + " <font style='font-family:微软雅黑;font-size:14px'>℃</font>");
	    			}else if(device == '18'){
	    				$("#leafHum").html( val + " <font style='font-family:微软雅黑'>%</font>");
	    			}else if(device == '19'){
	    				$("#fruitSize").html( val + " <font style='font-family:微软雅黑;font-size:14px'>mm</font>");
	    			}else if(device == '20'){
	    				$("#stalkSize").html( val + " <font style='font-family:微软雅黑;font-size:14px'>mm</font>");
	    			}
	    			else if(device == '31'){
	    				$("#fishTem").html( val + " <font style='font-family:微软雅黑'>℃</font>");
	    			}else if(device == '32'){
	    				$("#dissolvedOxygen").html( val + " <font style='font-family:微软雅黑;font-size:14px'>Mg/L</font>");
	    			}else if(device == '33'){
	    				$("#waterPh").html( val + " <font style='font-family:微软雅黑;font-size:14px'>PH</font>");
	    			}else if(device == '34'){
	    				$("#ammoniaNitrogen").html( val + " <font style='font-family:微软雅黑;font-size:14px'>Mg/L</font>");
	    			}else if(device == '35'){
	    				$("#blueAlgae").html( val + " <font style='font-family:微软雅黑;font-size:14px'>Mg/L</font>");
	    			}else if(device == '36'){
	    				$("#waterTurbidity").html( val + " <font style='font-family:微软雅黑;font-size:14px'>NUT</font>");
	    			}else if(device == '37'){
	    				$("#nitrate").html( val + " <font style='font-family:微软雅黑;font-size:14px'>Mg/L</font>");
	    			}else if(device == '38'){
	    				$("#feedSurplus").html( val + " <font style='font-family:微软雅黑;font-size:14px'>Kg</font>");
	    			}else if(device == '39'){
	    				$("#feedDelivery").html( val + " <font style='font-family:微软雅黑;font-size:14px'>Kg</font>");
	    			}
	    			if(state == '0'){
	    				//采集器数值恢复正常
	    				if(msg != ""){
	    					toastr.success(msg,'消息');
	    				}
	    				deviceStateGroup(0,device);
	    			}else if(state == '1'){
	    				//采集器数值预警
	    				if(msg != ""){
	    					toastr.warning(msg,'预警');
	    					warningCount();
	    				}
	    				deviceStateGroup(1,device);
	    			}else{
	    				//采集器断线
	    				if(msg != ""){
	    					toastr.error(msg,'断开');
	    				}
	    				deviceStateGroup(2,device);
	    			}
	    		}else{
	    			//控制器
	    			var stateStr = "";
	    			if(state == '0'){
	    				//关闭设备
	    				toastr.warning(msg,'关闭');
	    				state = false;
		    			stateStr = "已关闭";
		    			deviceStateGroup(0,device);
	    			}else if(state == '1'){
	    				//开启设备
	    				toastr.success(msg,'开启');
	    				state = true;
		    			stateStr = "已开启";
		    			deviceStateGroup(0,device);
	    			}else{
	    				toastr.error(msg,'断开');
	    				state = false;
		    			stateStr = "已断开";
		    			deviceStateGroup(2,device);
	    			}
	    			if(device == '61'){
		    			setSwitchery(water_con1,state);
		    			$("#water_con_state").html(stateStr);
		    			if(stateStr=='已断开'){
		    				water_con1.disable();
		    			}else{
		    				water_con1.enable();
		    			}
		    		}else if(device == '62'){
		    			setSwitchery(window_con1,state);
		    			$("#window_con_state").html(stateStr);
		    			if(stateStr=='已断开'){
		    				window_con1.disable();
		    			}else{
		    				window_con1.enable();
		    			}
		    		}else if(device == '63'){
		    			setSwitchery(hot_con1,state);
		    			$("#hot_con_state").html(stateStr);
		    			if(stateStr=='已断开'){
		    				hot_con1.disable();
		    			}else{
		    				hot_con1.enable();
		    			}
		    		}else if(device == '64'){
		    			setSwitchery(co2_con1,state);
		    			$("#co2_con_state").html(stateStr);
		    			if(stateStr=='已断开'){
		    				co2_con1.disable();
		    			}else{
		    				co2_con1.enable();
		    			}
		    		}else if(device == '65'){
		    			setSwitchery(light_con1,state);
		    			$("#light_con_state").html(stateStr);
		    			if(stateStr=='已断开'){
		    				light_con1.disable();
		    			}else{
		    				light_con1.enable();
		    			}
		    		}else if(device == '66'){
		    			setSwitchery(wind_con1,state);
		    			$("#wind_con_state").html(stateStr);
		    			if(stateStr=='已断开'){
		    				wind_con1.disable();
		    			}else{
		    				wind_con1.enable();
		    			}
		    		}else if(device == '71'){
		    			setSwitchery(water_in_con1,state);
		    			$("#water_in_con_state").html(stateStr);
		    			if(stateStr=='已断开'){
		    				water_in_con1.disable();
		    			}else{
		    				water_in_con1.enable();
		    			}
		    		}else if(device == '72'){
		    			setSwitchery(water_out_con1,state);
		    			$("#water_out_con_state").html(stateStr);
		    			if(stateStr=='已断开'){
		    				water_out_con1.disable();
		    			}else{
		    				water_out_con1.enable();
		    			}
		    		}else if(device == '73'){
		    			setSwitchery(feed_con1,state);
		    			$("#feed_con_state").html(stateStr);
		    			if(stateStr=='已断开'){
		    				feed_con1.disable();
		    			}else{
		    				feed_con1.enable();
		    			}
		    		}else if(device == '74'){
		    			setSwitchery(o2_con1,state);
		    			$("#o2_con_state").html(stateStr);
		    			if(stateStr=='已断开'){
		    				o2_con1.disable();
		    			}else{
		    				o2_con1.enable();
		    			}
		    		}
	    		}
	    	}
}
 function onOpen(event) {
     socketState = true;
 }

 function onError(event) {
     socketState = false;
 }
 function wsConnect(companyId) {
 	if(webSocket != null && socketState){
 		webSocket.send(companyId);
 	}
     return false;
 }
 
 //修改按钮状态
 function setSwitchery(switchElement, checkedBool) {
     if ((checkedBool && !switchElement.isChecked()) || (!checkedBool && switchElement.isChecked())) {
         switchElement.setPosition(true);
     }
 }
 
 //点击视频显示遮罩层   
 function showMask(){
	 $("#mask").css("display","none");  
	 var height = $("body").height();
	     $("#mask").css("height",height);   
     $("#mask").css("width","100%");     
     $("#mask").show();     
 }  
 //隐藏遮罩层  
 function hideMask(){
	 $("#mask").css("display","");
	 clickStopRealPlay();
	 setSwitchery(camera_con1,false);
     $("#divPlugin").css('display','none');
     $("#download_plugin").css('display','none');
     $("#mask").hide();   
 }

//初始化数据
function initData(){
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
	 				var searchCompanyId = data.message.split(',')[0];
	 				var searchGf = data.message.split(',')[1];
	 				for (var i = 0; i < data.result.length; i++) {
	 					var name = "";
	 					if(data.result[i].type == '0'){
	 						name = data.result[i].number + "号大棚";
	 					}else if(data.result[i].type == '1'){
	 						name = data.result[i].number + "号鱼塘";
	 					}
					var option = "<option ";
					if(data.result[i].number == searchGf){
						option+=" selected='selected' ";
					}
					option+="value='"+data.result[i].number+"'>"+name+"</option>"
					$("#gf_num_list").append(option);
				}
	 				wsConnect(searchCompanyId);//公司id
	 				getData();
	 			}
	 		}
	 		
		});
}

//验证数据格式
function validData(bean){
	if(bean == null){
		return "";
	}else{
		var arr = bean.split(',');
		return arr[0];
	}
}
//初始化控制器
function initControlDevice(data){
	if(camera_con == null ){
		camera_con = document.querySelector('#camera_con');
		camera_con1 = new Switchery(camera_con,{"color":switcheryColor,"secondaryColor": defalutColor});
	}
	if(data.result.type == '3'){
		//农业
		var waterState = data.result.device61;//水泵状态
		var windowState = data.result.device62;//天窗状态
		var hotState = data.result.device63;//供热状态
		var co2State = data.result.device64;//co2发生器状态
		var lightState = data.result.device65;//补光机状态
		var windState = data.result.device66;//通风机状态
		//水泵
		if(water_con == null){
			water_con = document.querySelector('#water_con');
    		water_con1 = new Switchery(water_con,{"color":switcheryColor,"secondaryColor": defalutColor});
		}
		if(waterState != null && waterState.split(',')[0]=='0'){
			$("#water_con_state").html('已关闭');
			setSwitchery(water_con1,false);
			water_con1.enable();
			deviceStateGroup(0,61);
		}else if(waterState != null && waterState.split(',')[0]=='1'){
			$("#water_con_state").html('已开启');
			setSwitchery(water_con1,true);
			water_con1.enable();
			deviceStateGroup(0,61);
		}else{
			$("#water_con_state").html('已断开');
			setSwitchery(water_con1,false);
			water_con1.disable();
			deviceStateGroup(2,61);
		}
		
		//天窗
		if(window_con == null){
    		window_con = document.querySelector('#window_con');
    		window_con1 = new Switchery(window_con,{"color":switcheryColor,"secondaryColor": defalutColor});
		}
		if(windowState != null && windowState.split(',')[0]=='0'){
			$("#window_con_state").html('已关闭');
			setSwitchery(window_con1,false);
			window_con1.enable();
			deviceStateGroup(0,62);
		}else if(windowState != null && windowState.split(',')[0]=='1'){
			$("#window_con_state").html('已开启');
			setSwitchery(window_con1,true);
			window_con1.enable();
			deviceStateGroup(0,62);
		}else{
			$("#window_con_state").html('已断开');
			setSwitchery(window_con1,false);
			window_con1.disable();
			deviceStateGroup(2,62);
		}
		
		//co2
		if(co2_con == null){
    		co2_con = document.querySelector('#co2_con');
    		co2_con1 = new Switchery(co2_con,{"color":switcheryColor,"secondaryColor": defalutColor});
		}
		if(co2State != null && co2State.split(',')[0]=='0'){
			$("#co2_con_state").html('已关闭');
			setSwitchery(co2_con1,false);
			co2_con1.enable();
			deviceStateGroup(0,64);
		}else if(co2State != null && co2State.split(',')[0]=='1'){
			$("#co2_con_state").html('已开启');
			setSwitchery(co2_con1,true);
			co2_con1.enable();
			deviceStateGroup(0,64);
		}else{
			$("#co2_con_state").html('已断开');
			setSwitchery(co2_con1,false);
			co2_con1.disable();
			deviceStateGroup(2,64);
		}
		
		//供热
		if(hot_con == null){
			hot_con = document.querySelector('#hot_con');
    		hot_con1 = new Switchery(hot_con,{"color":switcheryColor,"secondaryColor": defalutColor});
		}
		if(hotState != null && hotState.split(',')[0]=='0'){
			$("#hot_con_state").html('已关闭');
			setSwitchery(hot_con1,false);
			hot_con1.enable();
			deviceStateGroup(0,63);
		}else if(hotState != null && hotState.split(',')[0]=='1'){
			$("#hot_con_state").html('已开启');
			setSwitchery(hot_con1,true);
			hot_con1.enable();
			deviceStateGroup(0,63);
		}else{
			$("#hot_con_state").html('已断开');
			setSwitchery(hot_con1,false);
			hot_con1.disable();
			deviceStateGroup(2,63);
		}
		
		//补光
		if(light_con == null){
			light_con = document.querySelector('#light_con');
    		light_con1 = new Switchery(light_con,{"color":switcheryColor,"secondaryColor": defalutColor});
		}
		if(lightState != null && lightState.split(',')[0]=='0'){
			$("#light_con_state").html('已关闭');
			setSwitchery(light_con1,false);
			light_con1.enable();
			deviceStateGroup(0,65);
		}else if(lightState != null && lightState.split(',')[0]=='1'){
			$("#light_con_state").html('已开启');
			setSwitchery(light_con1,true);
			light_con1.enable();
			deviceStateGroup(0,65);
		}else{
			$("#light_con_state").html('已断开');
			setSwitchery(light_con1,false);
			light_con1.disable();
			deviceStateGroup(2,65);
		}
		
		//风机
		if(wind_con == null){
    		wind_con = document.querySelector('#wind_con');
    		wind_con1 = new Switchery(wind_con,{"color":switcheryColor,"secondaryColor": defalutColor});
		}
		if(windState != null && windState.split(',')[0]=='0'){
			$("#wind_con_state").html('已关闭');
			setSwitchery(wind_con1,false);
			wind_con1.enable();
			deviceStateGroup(0,66);
		}else if(windState != null && windState.split(',')[0]=='1'){
			$("#wind_con_state").html('已开启');
			setSwitchery(wind_con1,true);
			wind_con1.enable();
			deviceStateGroup(0,66);
		}else{
			$("#wind_con_state").html('已断开');
			setSwitchery(wind_con1,false);
			wind_con1.disable();
			deviceStateGroup(2,66);
		}
		
	}else{
		//渔业
		var waterInState = data.result.device71;//进水
		var waterOutState = data.result.device72;//出水
		var feedState = data.result.device73;//投食
		var o2State = data.result.device74;//增氧   	
		//进水
		if(water_in_con == null){
			water_in_con = document.querySelector('#water_in_con');
    		water_in_con1 = new Switchery(water_in_con,{"color":switcheryColor,"secondaryColor": defalutColor});
		}
		if(waterInState != null && waterInState.split(',')[0]=='0'){
			$("#water_in_con_state").html('已关闭');
			setSwitchery(water_in_con1,false);
			water_in_con1.enable();
			deviceStateGroup(0,71);
		}else if(waterInState != null && waterInState.split(',')[0]=='1'){
			$("#water_in_con_state").html('已开启');
			setSwitchery(water_in_con1,true);
			water_in_con1.enable();
			deviceStateGroup(0,71);
		}else{
			$("#water_in_con_state").html('已断开');
			setSwitchery(water_in_con1,false);
			water_in_con1.disable();
			deviceStateGroup(2,71);
		}
		//出水
		if(water_out_con == null){
			water_out_con = document.querySelector('#water_out_con');
    		water_out_con1 = new Switchery(water_out_con,{"color":switcheryColor,"secondaryColor": defalutColor});
		}
		if(waterOutState!=null &&  waterOutState.split(',')[0]=='0'){
			$("#water_out_con_state").html('已关闭');
			setSwitchery(water_out_con1,false);
			water_out_con1.enable();
			deviceStateGroup(0,72);
		}else if(waterOutState!=null &&  waterOutState.split(',')[0]=='1'){
			$("#water_out_con_state").html('已开启');
			setSwitchery(water_out_con1,true);
			water_out_con1.enable();
			deviceStateGroup(0,72);
		}else{
			$("#water_out_con_state").html('已断开');
			setSwitchery(water_out_con1,false);
			water_out_con1.disable();
			deviceStateGroup(2,72);
		}
		
		//投食
		if(feed_con == null){
			feed_con = document.querySelector('#feed_con');
    		feed_con1 = new Switchery(feed_con,{"color":switcheryColor,"secondaryColor": defalutColor});
		}
		if(feedState != null && feedState.split(',')[0]=='0'){
			$("#feed_con_state").html('已关闭');
			setSwitchery(feed_con1,false);
			feed_con1.enable();
			deviceStateGroup(0,73);
		}else if(feedState != null && feedState.split(',')[0]=='1'){
			$("#feed_con_state").html('已开启');
			setSwitchery(feed_con1,true);
			feed_con1.enable();
			deviceStateGroup(0,73);
		}else{
			$("#feed_con_state").html('已断开');
			setSwitchery(feed_con1,false);
			feed_con1.disable();
			deviceStateGroup(2,73);
		}
		
		//增氧
		if(o2_con == null){
			o2_con = document.querySelector('#o2_con');
    		o2_con1 = new Switchery(o2_con,{"color":switcheryColor,"secondaryColor": defalutColor});
		}
		if(o2State != null && o2State.split(',')[0]=='0'){
			$("#o2_con_state").html('已关闭');
			setSwitchery(o2_con1,false);
			o2_con1.enable();
			deviceStateGroup(0,74);
		}else if(o2State != null && o2State.split(',')[0]=='1'){
			$("#o2_con_state").html('已开启');
			setSwitchery(o2_con1,true);
			o2_con1.enable();
			deviceStateGroup(0,74);
		}else{
			$("#o2_con_state").html('已断开');
			setSwitchery(o2_con1,false);
			o2_con1.disable();
			deviceStateGroup(2,74);
		}
		
	}
		
}

//获取数据信息
function getData(){
	
	var gfNum = $("#gf_num_list").val();
	$.ajax({
		type:"POST",
	 		url:"actionServlet",
	 		data:{"actionName":"deviceService","method":"getDeviceInfoByGfNum","gfNum":gfNum},
	 		dataType:"JSON",
	 		success:function(data){
	 			if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
	 			if(data.statusCode == 1){
	 				if(data.result.type == '3'){
	 					$(".farm-type").css('display','');
	 					$(".fish-type").css('display','none');
	 					var temperature = data.result.device1;
	 					var humidity = data.result.device2;
	 					var co2 = data.result.device3;
	 					var light = data.result.device4;
	 					var soilTem = data.result.device5;
	 					var soilHum = data.result.device6;
	 					var soilPh = data.result.device7;
	 					var leafTem = data.result.device17;
	 					var leafHum = data.result.device18;
	 					var fruitSize = data.result.device19;
	 					var stalkSize = data.result.device20;
	 					
	 					$("#temperature").html( validData(temperature) + " <font style='font-family:微软雅黑;font-size:14px'>℃</font>");
	 					$("#humidity").html( validData(humidity) + " <font style='font-family:微软雅黑;font-size:14px'>%</font>");
	 					$("#co2").html( validData(co2) + " <font style='font-family:微软雅黑;font-size:14px'>ppm</font>");
	 					$("#light").html( validData(light) + " <font style='font-family:微软雅黑;font-size:14px'>Lux</font>");
	 					$("#soilTem").html( validData(soilTem) + " <font style='font-family:微软雅黑;font-size:14px'>℃</font>");
	 					$("#soilHum").html( validData(soilHum) + " <font style='font-family:微软雅黑;font-size:14px'>%</font>");
	 					$("#soilPh").html( validData(soilPh) + " <font style='font-family:微软雅黑;font-size:14px'>PH</font>");
	 					$("#leafTem").html( validData(leafTem) + " <font style='font-family:微软雅黑;font-size:14px'>℃</font>");
	 					$("#leafHum").html( validData(leafHum) + " <font style='font-family:微软雅黑;font-size:14px'>%</font>");
	 					$("#fruitSize").html( validData(fruitSize) + " <font style='font-family:微软雅黑;font-size:14px'>mm</font>");
	 					$("#stalkSize").html( validData(stalkSize) + " <font style='font-family:微软雅黑;font-size:14px'>mm</font>");
	 					initDeviceStateGroup(1,data.result);
	 				}else{
	 					// 如果是鱼池进行向下执行
	 					$(".farm-type").css('display','none');
	 					$(".fish-type").css('display','');
	 					
	 					var fishTem = data.result.device31;
	 					var dissolvedOxygen = data.result.device32;
	 					var waterPh = data.result.device33;
	 					var ammoniaNitrogen = data.result.device34;
	 					var blueAlgae = data.result.device35;
	 					var waterTurbidity = data.result.device36;
	 					var nitrate = data.result.device37;
	 					var feedSurplus = data.result.device38;
	 					var feedDelivery = data.result.device39;
	 					
	 					$("#fishTem").html( validData(fishTem) + " <font style='font-family:微软雅黑;font-size:14px'>℃</font>");
	 					$("#dissolvedOxygen").html( validData(dissolvedOxygen) + " <font style='font-family:微软雅黑;font-size:14px'>Mg/L</font>");
	 					$("#waterPh").html( validData(waterPh) + " <font style='font-family:微软雅黑;font-size:14px'>PH</font>");
	 					$("#ammoniaNitrogen").html( validData(ammoniaNitrogen) + " <font style='font-family:微软雅黑;font-size:14px'>Mg/L</font>");
	 					$("#blueAlgae").html( validData(blueAlgae) + " <font style='font-family:微软雅黑;font-size:14px'>Mg/L</font>");
	 					$("#waterTurbidity").html( validData(waterTurbidity) + " <font style='font-family:微软雅黑;font-size:14px'>NUT</font>");
	 					$("#nitrate").html( validData(nitrate) + " <font style='font-family:微软雅黑;font-size:14px'>Mg/L</font>");
	 					$("#feedSurplus").html( validData(feedSurplus) + " <font style='font-family:微软雅黑;font-size:14px'>Kg</font>");
	 					$("#feedDelivery").html( validData(feedDelivery) + " <font style='font-family:微软雅黑;font-size:14px'>Kg</font>");
	 					initDeviceStateGroup(2,data.result);
	 				}	
	 				
	 				// 初始化开关状态
	 				initControlDevice(data);
	 			}
	 		}
	});
}

//控制器开关控制
function conDeviceOpenClose(obj){
	var val = $(obj).val();
	var state="";
	if(val == '61'){
		//水泵
		state = water_con.checked
		water_con1.disable();
		$("#water_con_state").html("执行中");
		setTimeout("water_con1.enable()",5000);
	}
	if(val == '62'){
		//天窗
		state = window_con.checked
		window_con1.disable();
		$("#window_con_state").html("执行中");
		setTimeout("window_con1.enable()",5000);
	}
	if(val == '63'){
		//供热
		state = hot_con.checked
		hot_con1.disable();
		$("#hot_con_state").html("执行中");
		setTimeout("hot_con1.enable()",5000);
	}
	if(val == '64'){
		//co2
		state = co2_con.checked
		co2_con1.disable();
		$("#co2_con_state").html("执行中");
		setTimeout("co2_con1.enable()",5000);
	}
	if(val == '65'){
		//补光
		state = light_con.checked
		light_con1.disable();
		$("#light_con_state").html("执行中");
		setTimeout("light_con1.enable()",5000);
	}
	if(val == '66'){
		//风机
		state = wind_con.checked
		wind_con1.disable();
		$("#wind_con_state").html("执行中");
		setTimeout("wind_con1.enable()",5000);
	}
	if(val == '71'){
		//进水
		state = water_in_con.checked
		water_in_con1.disable();
		$("#water_in_con_state").html("执行中");
		setTimeout("water_in_con1.enable()",5000);
	}
	if(val == '72'){
		//出水
		state = water_out_con.checked
		water_out_con1.disable();
		$("#water_out_con_state").html("执行中");
		setTimeout("water_out_con1.enable()",5000);
	}
	if(val == '73'){
		//投食
		state = feed_con.checked
		feed_con1.disable();
		$("#feed_con_state").html("执行中");
		setTimeout("feed_con1.enable()",5000);
	}
	if(val == '74'){
		//增氧
		state = o2_con.checked
		o2_con1.disable();
		$("#o2_con_state").html("执行中");
		setTimeout("o2_con1.enable()",5000);
	}
	sendControlDeviceState(val,state);
	
}

//发送控制指令
function sendControlDeviceState(deviceId,state){
	var s = "";
	if(state == true){
		s=1;
	}else{
		s=0;
	}
	$.ajax({
		type:"POST",
	 		url:"actionServlet",
	 		data:{"actionName":"deviceService","method":"updateControlDeviceState","state":s,"deviceId":deviceId},
	 		dataType:"JSON",
	 		success:function(data){
	 			if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
	 			toastr.warning('*注意请不要频繁操作','操作指令已发送，请稍候');
	 		}
	});
}

//播放视频
function showVideo(){
	showMask();
	if(isLogin){
		$("#divPlugin").css('display','');
		toastr.warning('请稍候...','视频连接中');
		clickStartRealPlay();
		return;
	}
	$.ajax({
		type:"POST",
	 		url:"actionServlet",
	 		data:{"actionName":"deviceService","method":"getCameraInfo"},
	 		dataType:"JSON",
	 		success:function(data){
	 			if(data.statusCode == 100){
	 				toastr.error('请联系管理员','未拥有权限');
	 				return;
	 			}
	 			szIP = data.result.cameraUrl;
	 			szUsername = data.result.cameraUname;
	 			szPort = data.result.cameraPort;
	 			szPassword = data.result.cameraPwd;
	 			if(szIP != '' && szIP!=null){
	 				
	 				var iRet = WebVideoCtrl.I_CheckPluginInstall();
	 		    	if (-2 == iRet || -1 == iRet) {
	 		    		$("#download_plugin").css('display','');
	 		    		$("#divPlugin").css('display','none');
	 		    		return;
	 		    	}
	 		    	toastr.warning('请稍候...','视频连接中');
 		    	$("#download_plugin").css('display','none');
		    		$("#divPlugin").css('display','');
	 		    	WebVideoCtrl.I_InitPlugin(600, 400, {
	 		            bWndFull: true,//是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
	 		            iWndowType: 1,
	 		    		cbSelWnd: function (xmlDoc) {
	 		    			g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
	 		    		}
	 		    	});
	 		    	WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
	 		    	var errorTimmer;
	 		    	var iRet = WebVideoCtrl.I_Login(szIP, 1,szPort , szUsername, szPassword, {
	 		    		success: function (xmlDoc) {
	 		    			setTimeout(function () {
	 		    				isLogin = true;
	 		    				console.log("loginSuccess");
	 		    				getChannelInfo();
	 		    			}, 5);
	 		    		},
	 		    		error: function (code,xmlDoc) {
	 		    			clearTimeout(errorTimmer)
	 		    			videoFail();
	 		    			console.log(xmlDoc);
	 		    		}
	 		    	});
	 		    	errorTimmer = setTimeout(function () {
	 		    		if(!isLogin){
	 		    			console.log("loginError");
		    				videoFail();
	 		    		}
    			}, 5000);
	 		   		
	 			}else{
	 				hideMask();
	 				toastr.error('请配置摄像头参数','预览失败');
	 				cameraSetting();
	 			}
	 		}
	});
	
}


// 海康摄像头获取通道
function getChannelInfo() {
	// 数字通道
	WebVideoCtrl.I_GetDigitalChannelInfo(szIP, {
		async: true,
		success: function (xmlDoc) {
			console.log('获取数字通道成功');
			
//			var oChannels = $(xmlDoc).find("InputProxyChannelStatus");
//			$.each(oChannels, function (i) {
//				var id = $(this).find("id").eq(0).text(),
//					name = $(this).find("name").eq(0).text(),
//					online = $(this).find("online").eq(0).text();
//				if ("false" == online) {// 过滤禁用的数字通道
//					return true;
//				}
//				if ("" == name) {
//					name = "IPCamera " + (i < 9 ? "0" + (i + 1) : (i + 1));
//				}
//				console.log(id + "," + name + "," + online);
//			});
			
			clickStartRealPlay();
		},
		error: function () {
			videoFail();
		}
	});
}

	// 海康摄像头开始预览
function clickStartRealPlay() {
	cid = $("#gf_num_list").val();
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex)
	if (oWndInfo != null) {// 已经在播放了，先停止
		WebVideoCtrl.I_Stop();
	}
	var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
		iChannelID: cid,
		iStreamType:2
	});

	if (0 == iRet) {
		console.log('开始预览成功');
	} else {
		videoFail();
	}
}
	
	//停止退出预览
	function clickStopRealPlay() {
	var iRet = WebVideoCtrl.I_Stop();
	console.log('停止：' + iRet);
	if (0 == iRet) {
		szInfo = "停止预览成功！";
	} else {
		szInfo = "停止预览失败！";
	}
}
	
	//视频播放失败方法
	function videoFail(){
		hideMask();
		swal({
	 		title: "预览失败",
   		text: "",
    	type: "error"
   	});
	}
	
	//下载插件
	function installPlugin(){
		window.location.href="dist/WebComponents.exe";
	}
	
	//摄像头设置
	function cameraSetting(){
		$("#camera_setting input").val();
		$.ajax({
		type:"POST",
		url:"actionServlet",
		data:{"actionName":"deviceService","method":"getCameraInfo"},
		dataType:"JSON",
		success:function(data){
			if(data.statusCode == 100){
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
			if(data.statusCode == 1){
				$("#camera_ip").val(data.result.cameraUrl);
				$("#camera_port").val(data.result.cameraPort);
				$("#phone_port").val(data.result.phonePort);
				$("#camera_uname").val(data.result.cameraUname);
				$("#camera_upwd").val(data.result.cameraPwd);
				$("#camera_setting").modal('show');
			}
		}
	});
	}
	
	//保存摄像头设置
	function saveCameraSetting(){
		var ip = $("#camera_ip").val();
		var port = $("#camera_port").val();
		var pport = $("#phone_port").val();
		var name = $("#camera_uname").val();
		var pwd = $("#camera_upwd").val();
		$.ajax({
		type:"POST",
		url:"actionServlet",
		data:{"actionName":"deviceService","method":"updateCameraSetting",
			"ip":ip,"port":port,"pport":pport,"name":name,"pwd":	pwd},
		dataType:"JSON",
		success:function(data){
			if(data.statusCode == 100){
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
			if(data.statusCode == 1){
				$("#camera_setting").modal('hide');
				swal({
		  	 		title: "保存成功",
		       		text: "",
		        	type: "success"
		       	});
			}
		}
	});
	}
	
	//跳转到报表界面
	function showReport(device){
		var gfNum = $("#gf_num_list").val();
		$.ajax({
		type:"POST",
		url:"actionServlet",
		data:{"actionName":"deviceService","method":"showReport",
			"gfNum":gfNum,"device":device},
		dataType:"JSON",
		success:function(data){
			if(data.statusCode == 100){
 				toastr.error('请联系管理员','未拥有权限');
 				return;
 			}
			if(data.statusCode == 1){
				window.location.href="actionServlet?actionName=webService&method=toPage&page=reportForms";
			}
		}
	});
	}
	
	function deviceStateGroup(type,device){
		
		var re = new RegExp("," + device + ",","g");
		
		if(type == 0){
			//设备恢复正常
			connects += device + ",";//连接正常
		runnings += device + ",";//正在运行
		warnings = warnings.replace(re,",");//预警（移出）
		disConnects = disConnects.replace(re,",");//断线（移出）
		}
		if(type == 1){
			//设备预警
			warnings += device + ",";//预警
		runnings += device + ",";//正在运行
		connects = connects.replace(re,",");//连接正常（移出）
		disConnects = disConnects.replace(re,",");//断线（移出）
		}
		if(type == 2){
			//设备断线
			disConnects += device + ","//断线
		connects = connects.replace(re,",");//连接正常（移出）
		runnings = runnings.replace(re,",");//正在运行（移出）
		warnings = warnings.replace(re,",");//预警（移出）
		}
	}
	
	function initDeviceStateGroup(type,data){
		if(type == 1){
			//农业
			if(data.device1 == null){
				deviceStateGroup(2,1);
			}else{
				deviceStateGroup(data.device1.split(',')[1],1);
			}
			if(data.device2 == null){
				deviceStateGroup(2,2);
			}else{
				deviceStateGroup(data.device2.split(',')[1],2);
			}
			if(data.device3 == null){
				deviceStateGroup(2,3);
			}else{
				deviceStateGroup(data.device3.split(',')[1],3);
			}
			if(data.device4 == null){
				deviceStateGroup(2,4);
			}else{
				deviceStateGroup(data.device4.split(',')[1],4);
			}
			if(data.device5 == null){
				deviceStateGroup(2,5);
			}else{
				deviceStateGroup(data.device5.split(',')[1],5);
			}
			if(data.device6 == null){
				deviceStateGroup(2,6);
			}else{
				deviceStateGroup(data.device6.split(',')[1],6);
			}
			if(data.device7 == null){
				deviceStateGroup(2,7);
			}else{
				deviceStateGroup(data.device7.split(',')[1],7);
			}
			if(data.device17 == null){
				deviceStateGroup(2,17);
			}else{
				deviceStateGroup(data.device17.split(',')[1],17);
			}
			if(data.device18 == null){
				deviceStateGroup(2,18);
			}else{
				deviceStateGroup(data.device18.split(',')[1],18);
			}
			if(data.device19 == null){
				deviceStateGroup(2,19);
			}else{
				deviceStateGroup(data.device19.split(',')[1],19);
			}
			if(data.device20 == null){
				deviceStateGroup(2,20);
			}else{
				deviceStateGroup(data.device20.split(',')[1],20);
			}
		}else{
			
			if(data.device31 == null){
				deviceStateGroup(2,31);
			}else{
				deviceStateGroup(data.device31.split(',')[1],31);
			}
			if(data.device32 == null){
				deviceStateGroup(2,32);
			}else{
				deviceStateGroup(data.device32.split(',')[1],32);
			}
			if(data.device33 == null){
				deviceStateGroup(2,33);
			}else{
				deviceStateGroup(data.device33.split(',')[1],33);
			}
			if(data.device34 == null){
				deviceStateGroup(2,34);
			}else{
				deviceStateGroup(data.device34.split(',')[1],34);
			}
			if(data.device35 == null){
				deviceStateGroup(2,35);
			}else{
				deviceStateGroup(data.device35.split(',')[1],35);
			}
			if(data.device36 == null){
				deviceStateGroup(2,36);
			}else{
				deviceStateGroup(data.device36.split(',')[1],36);
			}
			if(data.device37 == null){
				deviceStateGroup(2,37);
			}else{
				deviceStateGroup(data.device37.split(',')[1],37);
			}
			if(data.device38 == null){
				deviceStateGroup(2,38);
			}else{
				deviceStateGroup(data.device38.split(',')[1],38);
			}
			if(data.device39 == null){
				deviceStateGroup(2,39);
			}else{
				deviceStateGroup(data.device39.split(',')[1],39);
			}
		}
	}
	
	//切换查看设备状态
	function getDeviceGroupVal(type){
		
		$("#runningState").find("b").html("");
		$(".normalList").find("li").css("display","none");
		var vals = [];
		if(type == 0){
			//连接正常
			vals = connects.split(",");
		}else if(type == 1){
			//预警
			vals = warnings.split(",");
		}else if(type == 2){
			//运行
			vals = runnings.split(",");
		}else if(type == 3){
			//断线
			vals = disConnects.split(",");
		}
		if(vals == null || vals =="," ){
			$(".normalList").css("display","none");
			$(".noImg").css("display","");
		}else{
			$(".normalList").css("display","");
			$(".noImg").css("display","none");
		}
		for(var i = 0;i<vals.length;i++){
		if(vals[i] != "," && vals[i] != ""){
			$(".device_state_li"+vals[i]).css("display","");
			if(vals[i] == '1'){
				$(".temperature_group").html($("#temperature").html());
			}else if(vals[i] == '2'){
				$(".humidity_group").html($("#humidity").html());
			}else if(vals[i] == '3'){
				$(".co2_group").html($("#co2").html());
			}else if(vals[i] == '4'){
				$(".light_group").html($("#light").html());
			}else if(vals[i] == '5'){
				$(".soilTem_group").html($("#soilTem").html());
			}else if(vals[i] == '6'){
				$(".soilHum_group").html($("#soilHum").html());
			}else if(vals[i] == '7'){
				$(".soilPh_group").html($("#soilPh").html());
			}else if(vals[i] == '17'){
				$(".leafTem_group").html($("#leafTem").html());
			}else if(vals[i] == '18'){
				$(".leafHum_group").html($("#leafHum").html());
			}else if(vals[i] == '19'){
				$(".fruitSize_group").html($("#fruitSize").html());
			}else if(vals[i] == '20'){
				$(".stalkSize_group").html($("#stalkSize").html());
			}
			
			else if(vals[i] == '31'){
				$(".fishTem_group").html($("#fishTem").html());
			}else if(vals[i] == '32'){
				$(".dissolvedOxygen_group").html($("#dissolvedOxygen").html());
			}else if(vals[i] == '33'){
				$(".waterPh_group").html($("#waterPh").html());
			}else if(vals[i] == '34'){
				$(".ammoniaNitrogen_group").html($("#ammoniaNitrogen").html());
			}else if(vals[i] == '35'){
				$(".blueAlgae_group").html($("#blueAlgae").html());
			}else if(vals[i] == '36'){
				$(".waterTurbidity_group").html($("#waterTurbidity").html());
			}else if(vals[i] == '37'){
				$(".nitrate_group").html($("#nitrate").html());
			}else if(vals[i] == '38'){
				$(".feedSurplus_group").html($("#feedSurplus").html());
			}else if(vals[i] == '39'){
				$(".feedDelivery_group").html($("#feedDelivery").html());
			}
			
			
			else if(vals[i] == '61'){
				$(".water_con_state_group").html($("#water_con_state").html());
			}else if(vals[i] == '62'){
				$(".window_con_state_group").html($("#window_con_state").html());
			}else if(vals[i] == '63'){
				$(".hot_con_state_group").html($("#hot_con_state").html());
			}else if(vals[i] == '64'){
				$(".co2_con_state_group").html($("#co2_con_state").html());
			}else if(vals[i] == '65'){
				$(".light_con_state_group").html($("#light_con_state").html());
			}else if(vals[i] == '66'){
				$(".wind_con_state_group").html($("#wind_con_state").html());
			}
			
			else if(vals[i] == '71'){
				$(".water_in_con_state_group").html($("#water_in_con_state").html());
			}else if(vals[i] == '72'){
				$(".water_out_con_state_group").html($("#water_out_con_state").html());
			}else if(vals[i] == '73'){
				$(".feed_con_state_group").html($("#feed_con_state").html());
			}else if(vals[i] == '74'){
				$(".o2_con_state_group").html($("#o2_con_state").html());
			}
			
		}
	}
	}
	
	
	