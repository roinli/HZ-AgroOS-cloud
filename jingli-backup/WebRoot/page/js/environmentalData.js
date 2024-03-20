(function(){
    $(function(){
        'use strict'
    	 var deviceMapkey=localStorage.getItem('deviceMapkey');
    	 var batchId = localStorage.getItem('batchId');
         $("#selectOptions").html(deviceMapkey);
         $("#selectOptions").children("span:first-child").addClass('selected');
//         var fistValue=$("#selectOptions option:first").val();
         var fistValue=$("#selectOptions").children("span:first-child").children("input:first-child").val();
         var myChart=echarts.init(document.getElementById("container"));
         myChart.clear();
	     	myChart.showLoading({
	     	    text: '数据加载中...',    //loading话术
	     	});
         $.ajax({
      		type:"POST",
      		url:"/wisdom_farming_site/staticServlet",
      		data:{"actionName":"STCH5Service","method":"queryEnvData","batchId":batchId,"deviceNum":fistValue},
      		dataType:"JSON",
      		success:function(data){
      			myChart.hideLoading();
      			environmentalData(data.result.y,data.result.x);
      		}
      	});
        //进入页面 默认
//        var myChart=echarts.init(document.getElementById("container"));
//        var list= [{
//                name: '平均值',
//                data: [43.4, 52.5, 57.1, 69.6, 43.4, 52.5, 57.1, 69.6, 43.4, 52.5, 57.1, 69.6,43.4, 52.5, 57.1, 69.6,43.4, 52.5, 57.1, 69.6,43.4, 52.5, 57.1, 69.6]
//                }, {
//                    name: '最高值',
//                    data: [24.4, 24.0, 29.7, 29.8,24.4, 24.0, 29.7, 29.8,24.4, 24.0, 29.7, 29.8,24.4, 24.0, 29.7, 29.8,24.4, 24.0, 29.7, 49.8,24.4, 24.0, 29.7, 29.8]
//                }, {
//                    name: "最低值",
//                    data: [74.4, 17.2, 16.5, 19.1,74.4, 17.2, 16.5, 19.1,74.4, 17.2, 16.5, 19.1,74.4, 17.2, 16.5, 19.1,74.4, 17.2, 16.5, 19.1,74.4, 17.2, 16.5, 19.1]
//            }];
//        var environmentListData=['2017-09','2017-10','2017-11','2017-12',"2018-01",'2018-02','2018-03','2018-04','2018-05',"2018-06",'2018-07','2018-08','2018-09','2018-09',"2018-10",'2018-11','2018-12','2019-01','2019-02',"2019-03",'2019-04','2019-05','2019-06',"2019-07"]
//        environmentalData(list,environmentListData);

//        $("#selectOptions").change(function(){
        $("#selectOptions").on('click','span',function(){
        	 $(this).addClass('selected').siblings('.selected').removeClass('selected');
        	 //选中的值
        	 var selectValue=$(this).children("input:first-child").val();
        	 var myChart=echarts.init(document.getElementById("container"));
             myChart.clear();
    	     	myChart.showLoading({
    	     	    text: '数据加载中...',    //loading话术
    	     	});
        	
                $.ajax({
		      		type:"POST",
		      		url:"/wisdom_farming_site/staticServlet",
		      		data:{"actionName":"STCH5Service","method":"queryEnvData","batchId":batchId
		      				,"deviceNum":selectValue},
		      		dataType:"JSON",
		      		success:function(data){
		      			myChart.hideLoading();
		      			environmentalData(data.result.y,data.result.x);
		      		}
		      	});
        });
//                if($(this).val()=='4'){
//                    $("#beam").css("display","block");
//                    $("#publicContainer").css("display","none");
//                    var myChart1 = echarts.init(document.getElementById("beamContainer"));
//                    myChart1.clear();
//                    var option1 = {
//                         color: ['#3398DB'],
//                         tooltip : {
//                             trigger: 'axis',
//                             formatter:function(data){
//                                 var res;
//                                 return  res="<span style='color:#fff'>"+data[0].axisValue+"<span>"+"<br/>"+"<span style='color:#fff'>值:"+data[0].data+"</span>"
//                             },
//                             axisPointer : {           
//                                 type : 'shadow'        
//                             }
//                         },
//                         grid: {
//                             left: '3%',
//                             right: '4%',
//                             bottom:"10%",
//                             containLabel: true
//                         },
//                         xAxis : [
//                             {
//                                 type : 'category',
//                                 data : ['2017-01-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02','2017-01-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02','2017-01-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02','2017-01-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02','2017-01-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02', '2017-02-02'],
//                                 axisTick: {
//                                     alignWithLabel: true
//                                 }
//                             }
//                         ],
//                         yAxis : [
//                             {
//                                 type : 'value'
//                             }
//                         ],
//                           dataZoom: [{
//                                    type: 'inside',
//                                    }, {
//                                    start: 0,
//                                    end: 10,
//                                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
//                                    handleSize: '80%',
//                                    handleStyle: {
//                                    color: '#fff',
//                                    shadowBlur: 3,
//                                    shadowColor: 'rgba(0, 0, 0, 0.6)',
//                                    shadowOffsetX: 2,
//                                    shadowOffsetY: 2
//                                    }
//                                }],
//                         series : [
//                             {
//                                 name:'直接访问',
//                                 type:'bar',
//                                 barWidth: '60%',
//                                 data:[10, 52, 200, 334, 390, 330, 220,10, 52, 200, 334, 390, 330, 220,10, 52, 200, 334, 390, 330, 220,10, 52, 200, 334, 390, 330, 220,10, 52, 200, 334, 390, 330, 220]
//                             }
//                         ]
//                    };
//                     myChart1.setOption(option1); 
//                }
//                else{
//                    $("#beam").css("display","none");
//                    $("#publicContainer").css("display","block");
//                    $("#selectOptions").find("option:selected").text();
//                    $("#publicContainer>h4").html($("#selectOptions").find("option:selected").text());
//                    var list= [{
//                            name: '平均值',
//                            data: [4.4, 5.5, 5.1, 6.6, 4.4, 5.5, 5.1, 6.6, 3.4, 2.5, 7.1, 9.6,3.4, 2.5, 7.1, 9.6,3.4, 5.5, 7.1, 9.6,4.4, 5.5, 5.1, 6.6]
//                            }, {
//                                name: '最高值',
//                                data: [4.4, 2.0, 2.7, 2.8,2.4, 2.0, 2.7, 2.8,2.4, 2.0, 2.7, 2.8,2.4, 4.0, 2.7, 9.8,2.4, 2.0, 2.7, 4.8,2.4, 2.0, 2.7, 2.8]
//                            }, {
//                                name: "最低值",
//                                data: [4.4, 7.2, 6.5, 9.1,4.4, 7.2, 16.5, 9.1,7.4, 1.2, 1.5, 1.1,7.4, 1.2, 1.5, 1.1,7.4, 1.2, 1.5, 1.1,7.4, 17.2, 1.5, 1.1]
//                        }];
//                    var environmentListData=['2017-09','2017-10','2017-11','2017-12',"2018-01",'2018-02','2018-03','2018-04','2018-05',"2018-06",'2018-07','2018-08','2018-09','2018-09',"2018-10",'2018-11','2018-12','2019-01','2019-02',"2019-03",'2019-04','2019-05','2019-06',"2019-07"]
//                    environmentalData(list,environmentListData); 
//                }
//        })    

        // 公共
        function environmentalData(list,environmentListData){
            var myChart=echarts.init(document.getElementById("container"));
            myChart.clear();                
            var listss=[];
            var listName=[];
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
                    var res='<div style="color:#fff">'+data[0].axisValue+'</div>' ;
                    for(var i=0;i<data.length;i++){
                        res+='<div style="color:#fff">'+data[i].seriesName+':'+data[i].data+'</div>';
                    }
                    return res;
                    }
                },
                legend: {
                    data:listName,
                    show:true,
                    top:'5%',
                    selected:{'平均值':true,'最高值':true,'最低值':true}
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom:"12%",
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
                    }
                ],
                dataZoom: [{
                    type: 'inside',
                    }, {
                    start: 0,
                    end: 10,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '60%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
                series :listss
            };
            myChart.setOption(option); 
        }    
    })
})()