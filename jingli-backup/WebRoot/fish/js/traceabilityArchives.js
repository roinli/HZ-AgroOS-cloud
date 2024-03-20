(function(){
    $(function(){
//    	var imgUrl = "http://ozdwirxvt.bkt.clouddn.com/";
    	var imgUrl="http://img.nxptdn.com/";
    	'use strict';
    	//环境数据
        var deviceMap= {"31":"鱼池水温","32":"溶氧含量","33":"水PH","34":"氨氮含量","35":"蓝藻含量","36":"水浊度"
        	,"37":"亚硝酸盐含量","38":"饲料余量","39":"饲料投放量"};
        
     // 进入页面
    	$.ajax({
     		type:"POST",
     		url:"staticServlet",
     		data:{"actionName":"STCH5Service","method":"showArchive"},
     		dataType:"JSON",
     		success:function(data){
     			if(data.statusCode == 1){
     				
     				var disLength = 1.5;
     				
     				 var lsp=function(dataid){
      		            this.dataid=dataid;
      		            return this;
      		        };
      		        lsp.prototype={
      		            add:function(dataval){
      		                this.dataval=dataval || [];
      		               localStorage.setItem(this.dataid,JSON.stringify(this.dataval));
      		            },
      		            get:function(){
      		               return JSON.parse(localStorage.getItem(this.dataid));
      		            },
      		            remove:function(){
      		               localStorage.removeItem(this.dataid);
      		            },
      		            clear:function(){
      		               localStorage.clear();
      		            }
      		        };
     		        
 		       $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function(){ 
	            	$.ajax({
	            		type:"POST",
	            		url:"staticServlet",
	            		data:{"actionName":"STCH5Service","method":"updateArea","companyId":data.result.companyId
	            				,"userType":data.result.userType,"sourceId":data.result.productId
	            				,"areaId":remote_ip_info.province},
	            		dataType:"JSON",
	            		success:function(data){}
	            	});
//    	            	console.info("地区:" + remote_ip_info.province);
              	});  
     		       
     		    $("#product_img").attr("src",imgUrl + data.result.productIcon);
  			    $("#product_name").html(data.result.productName);
  			    $("#product_detail").html(data.result.productDetail);
  			    $("#product_type").html(data.result.productType);
  			    $("#product_date").html(data.result.listedTime);
  			    if(data.result.quotaDesc == ""){
  			    	$(".indexDescription").css("display","none");
  			    }else{
  			    	$(".indexDescription").css("display","");
  			    	$("#description").html(data.result.quotaDesc);
  			    }
  			    
  			    $("#companyName").html(data.result.companyName);
  			    $("#leader").html(data.result.employeeName);
  			    $("#address").html(data.result.address);
  			    $(".productIntroductionMsg").html(data.result.productInformation);
  			    $(".companyProfileMsg").html(data.result.describe);
  			    
  			    var lng = 116.404;
  				var lat = 39.915;
  				if(data.result.lng != ""){
  					lng = data.result.lng;
  				}
  				if(data.result.lat != ""){
  					lat = data.result.lat;
  				}
  			    var map = new BMap.Map("allmap");
   			    var point = new BMap.Point(lng,lat);
  				map.centerAndZoom(point, 15);
  				map.enableScrollWheelZoom(true);
  				map.clearOverlays();
  				var marker = new BMap.Marker(new BMap.Point(lng, lat)); // 创建点
  				map.addOverlay(marker);   
  				marker.setAnimation(BMAP_ANIMATION_BOUNCE);
  				map.panBy(180, 120)
  				
  				//鱼苗来源
     		    var ymly = JSON.parse(data.result.fishSource);
	 		    var nlsp =new lsp("ymlyContent");
	 		    nlsp.add(ymly);
	 		    var gn=nlsp.get();
	 		    var nlsp=new lsp("ymlyContent").add(ymly);
  				
  				//鱼类生长期图片
  				var fishGrowthPeriod= JSON.parse(data.result.growthPic);
  				if(fishGrowthPeriod == null || fishGrowthPeriod.length == 0){
 			    	$("#growthPhasePicture").css('display','none')
 			    }else{
 			    	disLength+=0.5;
 			    	$("#growthPhasePicture").css('display','')
 			    	var nlsp =new lsp("fishGrowthPeriodContent");
 			        nlsp.add(fishGrowthPeriod);
 			        var gn=nlsp.get();
 			        var nlsp=new lsp("fishGrowthPeriodContent").add(fishGrowthPeriod);
 			    }
  				
	 		    //成长记录
	 		    var growUp = JSON.parse(data.result.growInfo);
	 		    if(growUp == null || growUp.length == 0){
	 		    	$("#fertilizerUseTable").css('display','none')
	 		    }else{
	 		    	$("#fertilizerUseTable").css('display','')
	 		    	disLength+=0.5;
	 		    	var nlsp =new lsp("growUpContent");
		 	        nlsp.add(growUp);
		 	        var gn=nlsp.get();
		 	        var nlsp=new lsp("growUpContent").add(growUp);
	 		    }
	 		    
	 		   //饲料记录
	 	       var feed=JSON.parse(data.result.feedInfo);
	 	       if(feed == null || feed.length == 0){
	 		    	$("#pesticideUseTable").css('display','none')
	 		   }else{
	 		    	$("#pesticideUseTable").css('display','')
	 		    	disLength+=0.5;
	 		    	var nlsp =new lsp("feedContent");
		 	        nlsp.add(feed);
		 	        var gn=nlsp.get();
		 	        var nlsp=new lsp("feedContent").add(feed);
	 		   }
	 	       
	 	       
	 	   // 疫苗记录
	        var vaccine=JSON.parse(data.result.vaccineInfo);
	        if(vaccine == null || vaccine.length == 0){
 		    	$("#agriculturalRecordsTable").css('display','none')
 		   }else{
 		    	$("#agriculturalRecordsTable").css('display','')
 		    	disLength+=0.5;
 		    	var nlsp =new lsp("vaccineContent");
 		        nlsp.add(vaccine);
 		        var gn=nlsp.get();
 		        var nlsp=new lsp("vaccineContent").add(vaccine);
 		   }
	        
	      //用药记录
	        var mar=JSON.parse(data.result.drugInfo);
	        if(mar == null || mar.length == 0){
 		    	$("#sourceInformation").css('display','none')
 		   }else{
 		    	$("#sourceInformation").css('display','')
 		    	disLength+=0.5;
 		    	var nlsp =new lsp("marContent");
 		        nlsp.add(mar);
 		        var gn=nlsp.get();
 		        var nlsp=new lsp("marContent").add(mar);
 		   }
	        
	        
	      //认证信息
	        var fishRzxx=JSON.parse(data.result.authInfo);
	        if(fishRzxx == null || fishRzxx.length == 0){
 		    	$("#credentialsTable").css('display','none')
 		   }else{
 		    	$("#credentialsTable").css('display','')
 		    	disLength+=0.5;
 		    	 var nlsp =new lsp("fishRzxxContent");
 		        nlsp.add(fishRzxx);
 		        var gn=nlsp.get();
 		        var nlsp=new lsp("fishRzxxContent").add(fishRzxx);
 		   }

	        
	      //环境数据
	        var envData = data.result.envData;
	        if(envData == null || envData == ""){
	        	$("#environmentalData").css('display','none')
	        }else{
	        	disLength+=0.5;
	        	$("#environmentalData").css('display','')
	        	var fishDeviceMapHtml='';
	        	$.each(deviceMap,function(i,e){
	        		if(envData.indexOf(i) != -1){
	        			fishDeviceMapHtml+='<span class=""><input type="hidden" value="'+i+'"><a>'+e+'</a></span>';
	        		}
	            })
	            localStorage.setItem('fishDeviceMapkey',fishDeviceMapHtml);
	        	localStorage.setItem('batchId',data.result.batchId);
	        }
	        
	        var starHtml = "<input id='input-star' type='number' class='rating' min=0 max=5 step=0.5 readonly='readonly' value="+disLength+" >"
	        $("#p_start_level").append(starHtml)
	        $("#input-star").rating({showClear:false,showCaption:false});
	        
	        //购买网址
	        var buyInt=data.result.webLinks;
	        var buyArr=buyInt.split("|");
	        var buyHtml="";
	        for(var j=0;j<buyArr.length;j++){
	        	if(buyArr[j] != ""){
	        		buyHtml+='<p class="link"><a target="_blank" href="'+buyArr[j]+'">点击购买</a></p>'
	        	}
	        }
	        $("#operationsMsg_left").html(buyHtml)
	        
	        
	        var shop=data.result.shopAddress;
	        var shops=shop.split("|");
	        var shopHtml="";
	        for(var j=0;j<shops.length;j++){
	        	shopHtml+='<p>'+shops[j]+'</p>'
	        }
	        $("#operationsMsg_center").html(shopHtml)
	        
	        //销售
		       var saler = data.result.saler;
	        if(saler != ""){
	        	var salers = saler.split(";");
	        	var salerHtml = "";
	        	for(var i = 0;i<salers.length;i++){
	        		salerHtml+="<p><span>"+salers[i].split(",")[0]+"</span><span class='lastChildRight'>" + salers[i].split(",")[1] + "</span></p>";
	        	}
	        	$("#operationsMsg_right").append(salerHtml);
	        }
	        
     				
     			}
     		}
    	});
        
    	$(".companyInformationAddress>button").click(function(){
            $("#allmap").css("display","block")
        })
        $("#operations li").click(function(){
            $(this).addClass("publicStyle").siblings(".publicStyle").removeClass("publicStyle");
        })
        $(".operationsMsg_left").click(function(){
            $("#operationsMsg_center").css("display","none");$("#operationsMsg_right").css("display","none");$("#operationsMsg_left").css("display","block")
        })
        $(".operationsMsg_center").click(function(){
            $("#operationsMsg_left").css("display","none");$("#operationsMsg_right").css("display","none");$("#operationsMsg_center").css("display","block")
        })
        $(".operationsMsg_right").click(function(){
            $("#operationsMsg_left").css("display","none");$("#operationsMsg_center").css("display","none");$("#operationsMsg_right").css("display","block")
        })
         // 鱼苗来源
        $("#fishSource").click(function(){
            window.location.href='./fish/seedSourceInformation.html';
        })
        //生长期图片
        $("#growthPhasePicture").click(function(){
            window.location.href="./fish/growthPhasePicture.html";
        })
        //成长记录
        $("#fertilizerUseTable").click(function(){
           window.location.href='./fish/fertilizationRecord.html';
        })
        //饲料记录
        $("#pesticideUseTable").click(function(){
            window.location.href='./fish/pesticideUseTable.html';
        })
        //疫苗记录
        $("#agriculturalRecordsTable").click(function(){
            window.location.href='./fish/agriculturalRecordsTable.html';
        })

        //用药记录
        $("#sourceInformation").click(function(){
            window.location.href='./fish/marTable.html';
        })
       
        //认证信息
        $("#credentialsTable").click(function(){
            window.location.href='./fish/credentials.html';
        })

        //环境变量
        $("#environmentalData").click(function(){
            window.location.href='./fish/environmentalData.html';
        })
        
        
        

//        //购买网址
//        var buyInt="http://www.baidu.com|http://www.hao123.com";
//        var buyArr=buyInt.split("|");
//        var buyHtml="";
//        for(var j=0;j<buyArr.length;j++){
//            buyHtml+='<p class="link"><a href="'+buyArr[j]+'">'+buyArr[j]+'</a></p>'
//        }
//        $("#operationsMsg_left").html(buyHtml)
//
//
//        //种源信息
//        var provenance={"hgz":"7aec54e736d12f2ee7ed822044c2d56284356881.jpg","buyEmployee":"13","name":"菠萝种子","outDate":"2017-11-28","cj":"鑫瑞种子产地","buyDate":"2017-12-16","type":"1","zjy":"86d6277f9e2f0708a5559f5de224b899a901f21f.jpg","sale":"500fd9f9d72a6059099ccd5a2334349b023bbae5.jpg"};
//        var nlsp =new lsp("provenanceContent");
//        nlsp.add(provenance);
//        var gn=nlsp.get();
//        var nlsp=new lsp("provenanceContent").add(provenance); 
        
       
    })
})()

