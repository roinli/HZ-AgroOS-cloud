(function(){
    $(function(){
//    	var imgUrl = "http://ozdwirxvt.bkt.clouddn.com/";
    	var imgUrl="http://img.nxptdn.com/";
    	'use strict';
    	//环境数据
        var deviceMap= {"1":"空气温度","2":"空气湿度","3":"CO2浓度","4":"光照强度","5":"土壤温度","6":"土壤水分","7":"土壤PH"};
        
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
//     	            	console.info("地区:" + remote_ip_info.province);
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
     	            
    				//生长期图片
     			    var growthPeriod = JSON.parse(data.result.growthPic);
    				if(growthPeriod == null || growthPeriod.length == 0){
     			    	$("#growthPhasePicture").css('display','none')
     			    }else{
     			    	disLength+=0.5;
     			    	$("#growthPhasePicture").css('display','')
     			    	var nlsp =new lsp("growthPeriodContent");
         		        nlsp.add(growthPeriod);
         		        var gn=nlsp.get();
         		        var nlsp=new lsp("growthPeriodContent").add(growthPeriod);
     			    }
    				
    				 //肥料使用表
    		        var fertilization = JSON.parse(data.result.fertilizationRec);
    		        if(fertilization == null || fertilization.length == 0){
    			    	$("#fertilizerUseTable").css('display','none')
    			    }else{
    			    	disLength+=0.5;
    			    	$("#fertilizerUseTable").css('display','')
    			    	var nlsp =new lsp("fertilizationContent");
        		        nlsp.add(fertilization);
        		        var gn=nlsp.get();
        		        var nlsp=new lsp("fertilizationContent").add(fertilization);
    			    }
    		        
    		        
    		      //农药使用表
    		        var pesticide = JSON.parse(data.result.pesticideRec);
    		        if(pesticide == null || pesticide.length == 0){
     		        	$("#pesticideUseTable").css('display','none')
     		        }else{
     		        	disLength+=0.5;
     		        	$("#pesticideUseTable").css('display','')
     		        	var nlsp =new lsp("pesticideContent");
        		        nlsp.add(pesticide);
        		        var gn=nlsp.get();
        		        var nlsp=new lsp("pesticideContent").add(pesticide);
    		        }
    		        
    		        
    		     // 农事记录
    		        var farming = JSON.parse(data.result.farmingRec);
    		        if(farming == null || farming.length == 0){
    		        	$("#agriculturalRecordsTable").css('display','none')
    		        }else{
    		        	disLength+=0.5;
    		        	$("#agriculturalRecordsTable").css('display','')
    		        	 var nlsp =new lsp("farmingContent");
        		        nlsp.add(farming);
        		        var gn=nlsp.get();
        		        var nlsp=new lsp("farmingContent").add(farming);
    		        }
    		        
    		        //认证信息
    		        var rzxx = JSON.parse(data.result.authInfo);
    		        if(rzxx == null || rzxx.length == 0){
    		        	$("#credentialsTable").css('display','none')
    		        }else{
    		        	disLength+=0.5;
    		        	$("#credentialsTable").css('display','')
    		        	var nlsp =new lsp("rzxxContent");
        		        nlsp.add(rzxx);
        		        var gn=nlsp.get();
        		        var nlsp=new lsp("rzxxContent").add(rzxx);
    		        }
    		        
    		        
    		      //种源信息
    		        var provenance = JSON.parse(data.result.seedSource);
    		        if(provenance == null || provenance.length == 0){
    		        	$("#sourceInformation").css('display','none')
    		        }else{
    		        	disLength+=0.5;
    		        	$("#sourceInformation").css('display','')
    		        	var nlsp =new lsp("provenanceContent");
        		        nlsp.add(provenance);
        		        var gn=nlsp.get();
        		        var nlsp=new lsp("provenanceContent").add(provenance); 
    		        }
    		        
    		        //环境数据
    		        var envData = data.result.envData;
    		        if(envData == null || envData == ""){
    		        	$("#environmentalData").css('display','none')
    		        }else{
    		        	disLength+=0.5;
    		        	$("#environmentalData").css('display','')
    		        	var deviceMapHtml='';
    		        	$.each(deviceMap,function(i,e){
    		        		if(envData.indexOf(i) != -1){
    		        			deviceMapHtml+='<span class=""><input type="hidden" value="'+i+'"><a>'+e+'</a></span>';
    		        		}
    		            })
    		            localStorage.setItem('deviceMapkey',deviceMapHtml);
    		        	localStorage.setItem('batchId',data.result.batchId);
    		        }
    		        
    		        var starHtml = "<input id='input-star' type='number' class='rating' min=0 max=5 step=0.5 readonly='readonly' value="+disLength+" >"
    		        $("#p_start_level").append(starHtml)
    		        $("#input-star").rating({showClear:false,showCaption:false});
//    		    	$("#input-star").rating('refresh');
//    		    	var inpStr=("#input-star"); 
//    		    	$inp.rating('refresh',{ 
//	    		    	stars:disLength, 
//	    		    	min: 0, 
//	    		    	max: 5, 
//	    		    	step: 1, 
//	    		    	showClear: false, 
//	    		    }); 
    		        //购买网址
    		        var buyInt=data.result.webLinks;
    		        var buyArr=buyInt.split("|");
    		        var buyHtml="";
    		        for(var j=0;j<buyArr.length;j++){
    		            buyHtml+='<p class="link"><a target="_blank" href="'+buyArr[j]+'">点击购买</a></p>'
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
    	
        // var farmingHtml="";
        // for(var i=0;i<farming.length;i++){
        //     farmingHtml+='<tr><td>'+farming[i].frDate+'</td>'+
        //             '<td>'+farming[i].frContent+'</td>'+
        //             '<td>'+farming[i].frEmployeename+'</td>'
        //         '</tr>'
        // }
        // $("#agriculturalRecords tbody").html(farmingHtml);




        //检测记录
        // var detection=[
        //     {"icon":"img/004.jpg","detail":[{"quota":"1","value":"1%"},{"quota":"2","value":"0.1%"}],"tester":"17","time":"2017-12-01","organ":"11"},
        //     {"icon":"img/005.jpg","detail":[{"quota":"4","value":"0.02%"}],"tester":"0","time":"2017-12-08","organ":"bbbb"}
        // ]
        // var detectionHtml=""
        // for(var m=0;m<detection.length;m++){
        //     detection[m]=JSON.stringify(detection[m])
        //     detectionHtml+='<tr><td>农残检测</td><td><span class="mui-icon mui-icon-forward"></td>'+
        //     '<td style="display:none">'+detection[m]+'</td>'+
        //     '</tr>'
        // }
        // $("#companyCheck tbody").html(detectionHtml)
        // $("#companyCheck tbody tr").click(function(){
        //     var detectionMsg=$(this).children("td:last-child").html();
        //     localStorage.setItem('detectionContent',detectionMsg);
        //     window.location.href='productCertification.html'
        // })
       

       

        //加工记录
        // var machining=[
        //     {"time":"2017-12-19","content":"清除稻谷中各种杂质","operatorname":"17"},
        //     {"time":"2017-12-21","content":"去石","operatorname":"15"}
        // ]
        // var machiningHtml="";
        // for(var k=0;k<machining.length;k++){
        //     machiningHtml+='<tr><td>'+machining[k].time+'</td><td>'+machining[k].content+'</td><td>'+machining[k].operatorname+'</td></tr>'
        // }
        // $("#processingRecords tbody").html(machiningHtml);

        //配送记录
        // var dispatching=[{"time":"2017-12-30","destination":"北京市朝阳区","distributorname":"13"}];
        // var dispatchingHtml="";
        // for(var l=0;l<dispatching.length;l++){
        //     dispatchingHtml+='<tr><td>'+dispatching[l].time+'</td><td>'+dispatching[l].destination+'</td><td>'+dispatching[l].distributorname+'</td></tr>'
        // }
        // $("#distributionRecord tbody").html(dispatchingHtml);

        
        // $(".provenanceName>b").html(provenance.name);
        // $(".provenanceVender>b").html(provenance.cj);
        // $(".hgz input").val(provenance.hgz);
        // $(".xs input").val(provenance.sale);
        // $(".zjy input").val(provenance.zjy);
        // $(".clickHref").click(function(){
        //     var content=$(this).children("span:first-child").html();
        //     var imgurl=$(this).children("input:last-child").val();
        //     localStorage.setItem('typeContent',content);
        //     localStorage.setItem('imgUrl',imgurl);
        //     window.location.href='credentialsPicture.html';
        // })
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
        //生长期图片
        $("#growthPhasePicture").click(function(){
            window.location.href="./page/growthPhasePicture.html";
        })
        //施肥
        $("#fertilizerUseTable").click(function(){
           window.location.href='./page/fertilizationRecord.html';
        })
        //农药
        $("#pesticideUseTable").click(function(){
            window.location.href='./page/pesticideUseTable.html';
        })
        $("#environmentalData").click(function(){
            window.location.href='./page/environmentalData.html';
        })
        //农事时间
        $("#agriculturalRecordsTable").click(function(){
            window.location.href='./page/agriculturalRecordsTable.html';
        })
        //认证信息
        $("#credentialsTable").click(function(){
            window.location.href='./page/credentials.html';
        })
        //种子来源信息
        $("#sourceInformation").click(function(){
            window.location.href='./page/seedSourceInformation.html'
        })
        $('#traceabilityArchivesList li').on('touchstart',function(e) {
        	changePicColor(1,this);
        });
        $('#traceabilityArchivesList li').on('touchend',function(e) {
        	changePicColor(2,this);
        });
        
    })
})()

function changePicColor(type,obj){
	if(type == 1){
		var img = $(obj).find("img").attr("src").replace(".png","_click.png");
		$(obj).find("img").attr("src",img);
	}else{
		var img = $(obj).find("img").attr("src").replace("_click","");
		$(obj).find("img").attr("src",img);
	}

}

