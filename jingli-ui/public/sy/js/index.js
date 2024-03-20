
var host=location.protocol+"//"+location.hostname+":"+location.port;
// var apiUrl='http://47.98.131.132:12005';
var apiUrl='http://server.wisdom.nxptdn.com/';
var getArchiveByCodeUrl = apiUrl+'/source/getArchiveByCode';
var getEnvDataListUrl = apiUrl+'/source/getEnvDataList';
var updateAreaUrl = apiUrl+'/source/updateArea';
var code = '2019112413133533';//TestCode
var code = GetQueryString('code');
var vm = new Vue({
  el: '#indexPage',
  data: {
    product: {},
  },
  created() {
    this.getArchiveByCode();
  },
  methods: {
    getArchiveByCode: function() {
      mui.ajax(getArchiveByCodeUrl, {
        data: {
          "code": code
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function(data) {
          if(data.statusCode =='1') {
            vm.product = data.result;
            vm.product.webLinks = vm.product.webLinks.split("#");
            vm.product.shopAddress = vm.product.shopAddress.split("#");
            var growthPicList = data.result.growthPic.split('#');
            var growthPic = new Array();
            growthPicList.forEach(function(element, index) {
              growthPic.push(JSON.parse(growthPicList[index]));
            });
            vm.product.growthPic=growthPic;

            var fertilizationRec = data.result.fertilizationRec.split('#');
            var growthPicR = new Array();
            fertilizationRec.forEach(function(element, index) {
              growthPicR.push(JSON.parse(fertilizationRec[index]));
            });
            vm.product.fertilizationRec=growthPicR;

            var pesticideRec = data.result.pesticideRec.split('#');
            var pesticideRecR = new Array();
            pesticideRec.forEach(function(element, index) {
              pesticideRecR.push(JSON.parse(pesticideRec[index]));
            });
            vm.product.pesticideRec=pesticideRecR;

            var farmingRec = data.result.farmingRec.split('#');
            var farmingRecR = new Array();
            farmingRec.forEach(function(element, index) {
              farmingRecR.push(JSON.parse(farmingRec[index]));
            });
            vm.product.farmingRec=farmingRecR;

            var authInfo = data.result.authInfo.split('#');
            var authInfoR = new Array();
            authInfo.forEach(function(element, index) {
              authInfoR.push(JSON.parse(authInfo[index]));
            });
            vm.product.authInfo=authInfoR;

            vm.product.seedSource=JSON.parse(data.result.seedSource);

            if(vm.product.envData && vm.product.envData.length>0){
              setTimeout(function(){
                vm.getEnvData(vm.product.envData[0].deviceId)
              },200)
            }

            vm.product.integrity = initStar(vm.product.integrity);

            getAreaId();
          }
        },
        error: function(xhr, type, errorThrown) {
          mui.toast("网络错误，请检查网络!");
          console.log('error:' + type);
        }
      })
    },
    initBaiduMap:function(){
      var map = new BMap.Map("allmap");
      map.centerAndZoom(new BMap.Point(vm.product.lng,vm.product.lat),11);
      map.enableScrollWheelZoom(true);

      map.clearOverlays();
      var new_point = new BMap.Point(vm.product.lng,vm.product.lat);
      var marker = new BMap.Marker(new_point);
      map.addOverlay(marker);
      map.panTo(new_point);
    },
    getEnvData:function(deviceId){
      if(document.querySelector(".selected")){
        document.querySelector(".selected").setAttribute("class","");
      }
      document.getElementById(deviceId).setAttribute("class","selected");
      var myChart=echarts.init(document.getElementById("container"));
      myChart.clear();
      myChart.showLoading({
        text: '数据加载中...',
      });
      mui.ajax(getEnvDataListUrl, {
        data: {
          "code": code,
          "deviceId": deviceId
        },
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success: function(data) {
          myChart.hideLoading();
          environmentalData(data.result.y,data.result.x);
        },
        error: function(xhr, type, errorThrown) {
          mui.toast("网络错误，请检查网络!");
          console.log('error:' + type);
        }
      });
    }
  }
})

mui.init();
var viewApi = mui('#app').view({
  defaultPage: '#setting'
});

function go(id){
  viewApi.go(id);
  vm.initBaiduMap();
}

mui('.mui-scroll-wrapper').scroll();

var view = viewApi.view;
(function($) {
  var oldBack = $.back;
  $.back = function() {
    if (viewApi.canBack()) {
      viewApi.back();
    } else {
      oldBack();
    }
  };
})(mui);


pushHistory();
window.addEventListener("popstate", function(e) {
  mui.back();
  pushHistory();
}, false);
function pushHistory() {
  var state = {
    title: "title",
    url: "#"
  };
  window.history.pushState(state, "title", "#");
}

function GetQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return unescape(r[2]); return null;
}

document.getElementById("allmap").style.height = document.body.clientHeight +'px';
document.getElementById("allmap").style.width = document.body.clientWidth  +'px';
document.getElementById("container").style.height = (document.body.clientHeight-157) +'px';
document.getElementById("container").style.width = (document.body.clientWidth-22)  +'px';

function getAreaId(){
  var isScan = window.sessionStorage.getItem('isScan');
  if(isScan != '1'){
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      var position = r.point.lat + "," + r.point.lng;
      var url = 'http://api.map.baidu.com/geocoder/v2/?callback=updateAreaId&location='+position+'&output=json&pois=1&ak=rsDc94z1UsYM51z2KDpSlgWgBdSKsXUv';
      console.info(url);
      jQuery.getScript(url);
    });
  }
}
function updateAreaId(data){
  console.log(data);
  var province = data.result.addressComponent.province;
  if(province != ''){
    province = province.replace("省","");
    province = province.replace("市","");
  }
  mui.ajax(updateAreaUrl, {
    data: {
      "code": code,
      "areaId": province
    },
    dataType: 'json',
    type: 'post',
    timeout: 10000,
    success: function(data) {
      window.sessionStorage.setItem('isScan','1');
    },
    error: function(xhr, type, errorThrown) {
      mui.toast("网络错误，请检查网络!");
      console.log('error:' + type);
    }
  });
}


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

function initStar(n){
  var n2 = (n /2)|0
  var n1 = n %2!=0?1:0;
  var n0 = 5-n2-n1;

  var sR = new Array();
  for(var i = 0;i<n2;i++){
    sR.push("img/s2.png")
  }
  for(var i = 0;i<n1;i++){
    sR.push("img/s1.png")
  }
  for(var i = 0;i<n0;i++){
    sR.push("img/s0.png")
  }
  return sR;
}
