var villageGroup = '',oldColor;
//创建EventUtil对象
var EventUtil={
		addHandler:function(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	}
	else if(element.attachEvent){
		element.attachEvent("on"+type,handler);
	}
},
getEvent:function(event){
	return event?event:window.event;
},
//取消事件的默认行为
preventDefault:function(event){
	if(event.preventDefault){
		event.preventDefault();
	}else{
		event.returnValue= false;
	}
},
stopPropagation:function(event){
	if(event.stopPropagation){
		event.stopPropagation();
	}else{
		event.cancelBubble=true;
	}
}
};
EventUtil.addHandler(window,"load",function(event){
    EventUtil.addHandler(document,"contextmenu",function(event){
        event= EventUtil.getEvent(event);
        EventUtil.preventDefault(event);
    });
    EventUtil.addHandler(document,"click",function(event){
          $(".all_tc").css("visibility","hidden");  
     });
});
//鼠标滚动事件
var features=[];
$(document).on("mousewheel DOMMouseScroll",function(){
	var divMap=$("#map");
	var layer=supermap.getLayersByName("markerLayer2")[0];
	var subPoint=supermap.getLayersByName("markerLayer50")[0];
	if(divMap.attr("roadFlag")=="运行状态1"||divMap.attr("roadFlag")=="运行状态" || divMap.attr("roadFlag")=="拥堵路段"||divMap.attr("roadFlag")=="服务水平"||divMap.attr("roadFlag")=="静态安全"||divMap.attr("roadFlag")=="动态安全"||divMap.attr("roadFlag")=="天气安全"||divMap.attr("roadFlag")=="道路尾气"){
		 onMouseWheel(layer);
    }else{
    	if($("#ipt2").prop("checked")==true){
    		onMouseWheel(layer);
		}
    }
    if(divMap.attr("roadFlag")=="交通"){
    	onMouseWheel(subPoint);
    }
});

function queryRealData(strDate,bFlagRealData){
	//if( TL_AllLineMap==undefined||TL_AllLineMap[0]==0 )
	//	return;
	var roadUrl;
	if(bFlagRealData==1){
		roadUrl="GetNetState";
	}else if(bFlagRealData==40||bFlagRealData==50||bFlagRealData==60||bFlagRealData==70){
		roadUrl="GetNetIndex";
	}
	var divMap=$("#map");
	var vector=supermap.getLayersByName("markerLayer2")[0];
	
	$.ajax({
		url:roadUrl,
		dataType:"json",
		data:{ "action":"query","type":bFlagRealData,"pa":strDate},
		contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
		beforeSend:function(){ 
			$(".zhao1").css("display","block");
			$("#loading").css("display","block");
		},
		success: function( data, textStatus, jqXHR ){
			// supermap.addLayers([vector]);
			doTrafficTimeData(2,vector,data,bFlagRealData);
			changeRoadActive();
			
			if(divMap.attr("roadFlag")=="运行状态1"&&$("#ipt2").prop("checked")==false){
				vector.setVisibility(false);
			}
		},
		complete:function(){
			$(".zhao1").css("display","none");
			$("#loading").css("display","none");
		},
		error:function(){
			var ab=0;
		}

	});
}

function changeRoadActive(){//同一图层 不同路网 数据方法展现（调用在height.js里）
	var divMap=$("#map");
	var vector=supermap.getLayersByName("markerLayer2")[0];
	if(divMap.attr("roadFlag")=="运行状态" && typeof vectorRoad != "undefined"){
			vectorRoad.deactivate();
			vectorRoad = new SuperMap.Control.SelectFeature(vector,{
					callbacks: {"click":roadShowDatas,"over":describeValOver,"out":describeValOut,"rightclick":createDataTimeDialog}
				});	
			supermap.addControl(vectorRoad);
			vectorRoad.activate();
	}else if(divMap.attr("roadFlag")=="拥堵路段"){
		vectorRoad.deactivate();
		vectorRoad = new SuperMap.Control.SelectFeature(vector,{
			callbacks: {"rightclick":OCSDataShow,"over":describeValOver,"out":describeValOut}
		});	
		supermap.addControl(vectorRoad);
		vectorRoad.activate();
	}else if(divMap.attr("roadFlag")=="服务水平"){
		vectorRoad.deactivate();
		vectorRoad = new SuperMap.Control.SelectFeature(vector,{
			callbacks: {"over":describeValOver,"out":describeValOut}
		});	
		supermap.addControl(vectorRoad);
		vectorRoad.activate();
	}else if(divMap.attr("roadFlag")=="饱和程度"){
		vectorRoad.deactivate();
		vectorRoad = new SuperMap.Control.SelectFeature(vector,{
			callbacks: {"over":describeValOver,"out":describeValOut}
		});	
		supermap.addControl(vectorRoad);
		vectorRoad.activate();
	}else if(divMap.attr("roadFlag")=="车流密度"){
		vectorRoad.deactivate();
		vectorRoad = new SuperMap.Control.SelectFeature(vector,{
			callbacks: {"over":describeValOver,"out":describeValOut}
		});	
		supermap.addControl(vectorRoad);
		vectorRoad.activate();
	}else if(divMap.attr("roadFlag")=="行程车速"){
		vectorRoad.deactivate();
		vectorRoad = new SuperMap.Control.SelectFeature(vector,{
			callbacks: {"over":describeValOver,"out":describeValOut}
		});	
		supermap.addControl(vectorRoad);
		vectorRoad.activate();
	}
	// else if(divMap.attr("roadFlag")=="拥堵瓶颈"){
	// 	vectorRoad.deactivate();
	// 		vectorRoad = new SuperMap.Control.SelectFeature(vector,{
	// 				callbacks: {"over":describeValOver,"out":describeValOut}
	// 			});	
	// 		supermap.addControl(vectorRoad);
	// 		vectorRoad.activate();
	// }
	// else if(divMap.attr("roadFlag")=="饱和程度"){
	// 	vectorRoad.deactivate();
	// 		vectorRoad = new SuperMap.Control.SelectFeature(vector,{
	// 				callbacks: {"over":describeValOver,"out":describeValOut}
	// 			});	
	// 		supermap.addControl(vectorRoad);
	// 		vectorRoad.activate();
	// }else if(divMap.attr("roadFlag")=="排队长度"){//排队长度
	// 	vectorRoad.deactivate();
	// 		vectorRoad = new SuperMap.Control.SelectFeature(vector,{
	// 				callbacks: {"over":describeValOver,"out":describeValOut}
	// 			});	
	// 		supermap.addControl(vectorRoad);
	// 		vectorRoad.activate();
	// }
	else if(divMap.attr("roadFlag")=="静态安全"){//静态
		vectorRoad.deactivate();
			vectorRoad = new SuperMap.Control.SelectFeature(vector,{
					callbacks: {"over":describeValOver,"out":describeValOut,"click":describeVista}
				});	
			supermap.addControl(vectorRoad);
			vectorRoad.activate();
	}else if(divMap.attr("roadFlag")=="动态安全"){//动态
		vectorRoad.deactivate();
			vectorRoad = new SuperMap.Control.SelectFeature(vector,{
					callbacks: {"over":describeValOver,"out":describeValOut}
				});	
			supermap.addControl(vectorRoad);
			vectorRoad.activate();
	}else if(divMap.attr("roadFlag")=="天气安全"){//天气安全
		vectorRoad.deactivate();
			vectorRoad = new SuperMap.Control.SelectFeature(vector,{
					callbacks: {"over":describeValOver,"out":describeValOut}
				});	
			supermap.addControl(vectorRoad);
			vectorRoad.activate();
	}else if(divMap.attr("roadFlag")=="道路尾气"){//道路尾气
		vectorRoad.deactivate();
			vectorRoad = new SuperMap.Control.SelectFeature(vector,{
					callbacks: {"over":describeValOver,"out":describeValOut}
				});	
			supermap.addControl(vectorRoad);
			vectorRoad.activate();
	}else if(divMap.attr("roadFlag")=="流量"){//道路流量
		vectorRoad.deactivate();
			vectorRoad = new SuperMap.Control.SelectFeature(vector,{
					callbacks: {"over":describeValOver,"out":describeValOut}
				});	
			supermap.addControl(vectorRoad);
			vectorRoad.activate();
	}else if(divMap.attr("roadFlag")=="运行状态1"){//道路路段
		vectorRoad.deactivate();
		vectorRoad = new SuperMap.Control.SelectFeature(vector,{
			callbacks: {"click":GetLinkID,"rightclick":roadNetAttribute,"over":overRoadIndex,"out":outRoadIndex}
		});  
		supermap.addControl(vectorRoad);
		vectorRoad.activate();
	}
}
var infowin;
function roadShowDatas(argument){
	var divMap=$("#map");
	var vector=supermap.getLayersByName("markerLayer2")[0];
	if(supermap.getZoom()>13){
	var gas;
	var showVal =parseInt(argument.state) ;
	if(argument.off_gas==undefined){
		argument.off_gas={
			"co2":'无数据',
			"nox":'无数据',
			"co":'无数据',
			"hc":'无数据',
			"pm":'无数据',
			"pm2.5":'无数据'
		}
		gas="二氧化碳："+argument.off_gas["co2"]+"<br><span style='margin-left:10px'></span>"+"臭氧："+argument.off_gas["nox"]+"<br><span style='margin-left:10px'></span>"+"一氧化碳："+argument.off_gas["co"]+"<br><span style='margin-left:10px'></span>"+"碳氢化合物："+argument.off_gas["hc"]+"<br><span style='margin-left:10px'></span>"+"PM10："+argument.off_gas["pm"]+"<br><span style='margin-left:10px'></span>"+"PM2.5粒子："+argument.off_gas["pm2.5"];
	}else{
		gas="二氧化碳："+(argument.off_gas["co2"]-0).toFixed(2)+'ppb'+"<br><span style='margin-left:10px'></span>"+"臭氧："+(argument.off_gas["nox"]-0).toFixed(2)+'g'+"<br><span style='margin-left:10px'></span>"+"一氧化碳："+(argument.off_gas["co"]-0).toFixed(2)+'ppb'+"<br><span style='margin-left:10px'></span>"+"碳氢化合物："+(argument.off_gas["hc"]-0).toFixed(2)+'g'+"<br><span style='margin-left:10px'></span>"+"PM10："+(argument.off_gas["pm"]-0).toFixed(2)+'g'+"<br><span style='margin-left:10px'></span>"+"PM2.5："+(argument.off_gas["pm2.5"]-0).toFixed(2)+'g';
	}
	if(divMap.attr("roadFlag")=="运行状态"){
		var _travleTime,h,roadFlow,gas;
		if(argument.travleTime==undefined){
			_travleTime='无数据';
			roadFlow='无数据';
			h='';
		}else{
			_travleTime=argument.travleTime;
			roadFlow=argument.flow;
			h="h";
		}
		var _speed=argument.speed;
		showVal="<span style='margin-left:10px'></span>行程速度:"+(_speed-0).toFixed(2)+"km/h"+"<br><span style='margin-left:10px'></span>"+"旅行时间:"+_travleTime+h+"<br><span style='margin-left:10px'></span>"+"link长度:"+argument.length+"km"+"<br><span style='margin-left:10px'></span>"+
		"道路流量:"+(roadFlow-0).toFixed(2)+"pcu/h"+"<br><span style='margin-left:10px'></span>"+gas;
	}
	var popup = new SuperMap.Popup.FramedCloud(
        "Frame_popup",
        supermap.getLonLatFromPixel(new SuperMap.Pixel((event.pageX+12),event.pageY)),//将鼠标位置转换为经纬度坐标
        null,//new SuperMap.Size(172,216)
        showVal,//'<div class="desValFrame"><span>'+showVal+'</span></div>'
        null,
        true,
        null,
        false
    );
 	
	infowin=popup;
	//添加弹窗到map图层
    supermap.addPopup(popup);
    if(divMap.attr("roadFlag")=="运行状态"){
    	$("#Frame_popup").css({"width":"200px","height":"220px","background-color":"#f5f5f5","border":"3px solid #0B3893","border-radius":"8px","font-size":"0.8em"});
    	$("#Frame_popup_contentDiv").css({"width":"200px","height":"210px"});
    	// $(".desValFrame").css({"width":"136px"});
    }
    $(".desValFrame span").css("margin-left","10px");
    vector.redraw();
}else{}
}

// function mouseClickHandler(event){
//     clearPopup();
// }
// function clearPopup(){
//     if(infowin!=undefined){
//      infowin.hide();
//      infowin.destroy();
//     }
// };
function describeValOver(argument){
	function Random(low,height){
		var num = height-low;
		return Math.floor(Math.random()*num+low);
	}
var divMap=$("#map");
var beforelineColor,beforeLine;
var vector=supermap.getLayersByName("markerLayer2")[0];
if(beforeLine){
        beforeLine.style={strokeColor:beforelineColor,strokeWidth:5};
        vector.addFeatures(beforeLine);
    }
    //之前line样式
    beforelineColor = argument.style.strokeColor;
    beforelineWidth = argument.style.strokeWidth;
    beforeLine = argument;
    
    //路段高亮
    if(supermap.getZoom()>13){//BC8F8F
    	argument.style={
	        strokeColor:beforelineColor,
	        fill:true,
	        strokeWidth:12
    	};
    }else{
    	argument.style={
	        strokeColor:beforelineColor,
	        fill:true,
	        strokeWidth:6
	    };
    } 
   if(supermap.getZoom()>13&&divMap.attr("roadFlag")!="运行状态"){
	var showVal =parseInt(argument.state);
	if(divMap.attr("roadFlag")=="动态安全"){
		var _speed=argument.speed;
		//HR
		var HR_state = argument.state;
		var HR = "";
		if(HR_state == "4"){
			HR = Math.floor(Math.random()*2);
		}else if(HR_state == "3"){
			HR = Random(3,5);
		}else if(HR_state == "2"){
			HR = Random(5,13);
		}
		else if(HR_state == "1"){
			HR = Random(13,23);
		}
		else if(HR_state == "0"){
			HR = Random(23,30);
		}
		showVal="安全车速:"+parseInt(_speed)+'km/h'+"<br><span style='margin-left:10px'></span>"+"风险指标:"+HR;
	}else if(divMap.attr("roadFlag")=="服务水平"){
		if(showVal==0){
			showVal = "I级";
		}else if(showVal==1){
			showVal = "II级";
		}else if(showVal==2){
			showVal = "III级";
		}else if(showVal==3){
			showVal = "IV级";
		}else if(showVal==4){
			showVal = "V级";
		}else if(showVal==5){
			showVal = "无数据";
		}
	}else if(divMap.attr("roadFlag")=="拥堵路段"){
		var showVal = argument.speed;
		if(argument.speed<30){
			showVal = "拥堵";
		}else{
			showVal = "畅通";
		}
	}else if(divMap.attr("roadFlag")=="天气安全"){
		if(showVal==0){
			showVal = "风险状况(高)";
		}else if(showVal==1){
			showVal = "风险状况(较高)";
		}else if(showVal==2){
			showVal = "风险状况(中)";
		}else if(showVal==3){
			showVal = "风险状况(较低)";
		}else if(showVal==4){
			showVal = "风险状况(低)";
		} 
		showVal+="<br><span style='margin-left:10px'></span>"+"路面温度:"+"30"+"℃<br><span style='margin-left:10px'></span>"+"路面冰点:"+"-0.5℃"+"<br><span style='margin-left:10px'></span>"+"路面状态:"+"干";
	}else if(divMap.attr("roadFlag")=="静态安全"){
		if(showVal==0){
			showVal = "风险状况(高)"+"<br><span style='margin-left:10px'></span>"+"风险指标:"+Random(23,30);
		}else if(showVal==1){
			showVal = "风险状况(较高)"+"<br><span style='margin-left:10px'></span>"+"风险指标:"+Random(13,23);
		}else if(showVal==2){
			showVal = "风险状况(中)"+"<br><span style='margin-left:10px'></span>"+"风险指标:"+Random(5,13);
		}else if(showVal==3){
			showVal = "风险状况(较低)"+"<br><span style='margin-left:10px'></span>"+"风险指标:"+Random(3,5);
		}else if(showVal==4){
			showVal = "风险状况(低)"+"<br><span style='margin-left:10px'></span>"+"风险指标:"+Math.floor(Math.random()*2);
		} 
	}else if(divMap.attr("roadFlag")=="道路尾气"){//道路尾气
		if(argument.off_gas==undefined){
			argument.off_gas={
				"co2":'无数据',
				"nox":'无数据',
				"co":'无数据',
				"hc":'无数据',
				"pm":'无数据',
				"pm2.5":'无数据'
			}
			var showVal="<br><span style='margin-left:10px'></span>"+"二氧化碳："+argument.off_gas["co2"]+"<br><span style='margin-left:10px'></span>"+"氮氧化物："+argument.off_gas["nox"]+"<br><span style='margin-left:10px'></span>"+"一氧化碳："+argument.off_gas["co"]+"<br><span style='margin-left:10px'></span>"+"碳氢化合物："+argument.off_gas["hc"]+"<br><span style='margin-left:10px'></span>"+"颗粒物："+argument.off_gas["pm"]+"<br><span style='margin-left:10px'></span>"+"PM2.5粒子："+argument.off_gas["pm2.5"];
		}else{
			var showVal="<br><span style='margin-left:10px'></span>"+"二氧化碳："+(argument.off_gas["co2"]-0).toFixed(2)+'g'+"<br><span style='margin-left:10px'></span>"+"氮氧化物："+(argument.off_gas["nox"]-0).toFixed(2)+'g'+"<br><span style='margin-left:10px'></span>"+"一氧化碳："+(argument.off_gas["co"]-0).toFixed(2)+'g'+"<br><span style='margin-left:10px'></span>"+"碳氢化合物："+(argument.off_gas["hc"]-0).toFixed(2)+'g'+"<br><span style='margin-left:10px'></span>"+"颗粒物："+(argument.off_gas["pm"]-0).toFixed(2)+'g'+"<br><span style='margin-left:10px'></span>"+"PM2.5粒子："+(argument.off_gas["pm2.5"]-0).toFixed(2)+'g';
		}
	}else if(divMap.attr("roadFlag")=="流量"){
		var _Flow=argument.flow+'pcu/h';
		showVal=_Flow;
	}else if(divMap.attr("roadFlag")=="饱和程度"||divMap.attr("roadFlag")=="车流密度"||divMap.attr("roadFlag")=="行程车速"){
		var _Width=argument.level;
		if(divMap.attr("roadFlag")=="车流密度"){
			showVal = _Width+'pcu/km/lane';
		}else if(divMap.attr("roadFlag")=="行程车速"){
			showVal = _Width+'km/h';
		}else{
			showVal = _Width;
		}
	}
	var popup = new SuperMap.Popup.FramedCloud(
        "Frame_popup",
        supermap.getLonLatFromPixel(new SuperMap.Pixel((event.pageX+12),event.pageY)),//将鼠标位置转换为经纬度坐标
        null,//new SuperMap.Size(182,226)
        showVal,//'<div class="desValFrame"><span>'+showVal+'</span></div>'
        null,
        false,
        null,
        false
    );
	//添加弹窗到map图层
    supermap.addPopup(popup);
    if(divMap.attr("roadFlag")=="道路尾气"){
    	$("#Frame_popup").css({"width":"170px","height":"180px","background-color":"#f5f5f5","border":"3px solid #0B3893","border-radius":"8px","font-size":"0.8em"});
    	$("#Frame_popup_contentDiv").css({"width":"170px","height":"176px"});
    	// $(".desValFrame").css({"width":"136px"});
    }else if(divMap.attr("roadFlag")=="车流密度"){
    	$("#Frame_popup").css({"width":"148px","height":"30px","background-color":"#f5f5f5","border":"3px solid #0B3893","border-radius":"8px","font-size":"0.8em"});
    	$("#Frame_popup_contentDiv").css({"width":"146px","height":"30px"});
    	// $(".desValFrame").css({"width":"136px"});
    }else if(divMap.attr("roadFlag")=="动态安全"||divMap.attr("roadFlag")=="静态安全"){
    	$("#Frame_popup").css({"width":"148px","height":"56px","background-color":"#f5f5f5","border":"3px solid #0B3893","border-radius":"8px","font-size":"0.8em"});
    	$("#Frame_popup_contentDiv").css({"width":"146px","height":"53px"});
    	// $(".desValFrame").css({"width":"136px"});
    }else if(divMap.attr("roadFlag")=="天气安全"){
    	$("#Frame_popup").css({"width":"148px","height":"109px","background-color":"#f5f5f5","border":"3px solid #0B3893","border-radius":"8px","font-size":"0.8em"});
    	$("#Frame_popup_contentDiv").css({"width":"146px","height":"103px"});
    	// $(".desValFrame").css({"width":"136px"});
    }else{
    	$("#Frame_popup").css({"width":"118px","height":"33px","background-color":"#f5f5f5","border":"3px solid #0B3893","border-radius":"8px","font-size":"0.8em"});
    	$("#Frame_popup_contentDiv").css({"width":"114px","height":"30px"});
    	// $(".desValFrame").css({"width":"102px"});
    }
    // $(".desValFrame span").css("margin-left","10px");
}else{}
vector.redraw();
}
var beforelineWidth;

function describeValOut(argument){
	var vector=supermap.getLayersByName("markerLayer2")[0];
	var divMap=$("#map");
	if(divMap.attr("roadFlag")!="运行状态"){
		supermap.removeAllPopup();
	}
    var beforelineColor;
    beforelineColor = argument.style.strokeColor;
    
    if(supermap.getZoom()>13){//BC8F8F
    	argument.style={
        strokeColor:beforelineColor,
        fill:true,
        strokeWidth:beforelineWidth
    };
    }else{
    	argument.style={
        strokeColor:beforelineColor,
        fill:true,
        strokeWidth:beforelineWidth
    };
    }
    vector.redraw();
}
function queryRoadNetFeature(){
	var divMap=$("#map");
	$.ajax({
		url:"GetRoadNet",
		dataType:"json",
		data:{ "action":"query","type":"30"},
		contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
		beforeSend:function(){ 
			$(".zhao1","#loading").css("display","block");
		},
		success: function( data, textStatus, jqXHR ){
			doRoadNetFeature( data );
			if(divMap.attr("roadFlag")=="运行状态"){
				// removeVetor();
				initTimeline(1,1,1);
				$(".tps p").css("background-color","red");
				$(".describeFrame").css("display","block");
				$(".filter_density,.filter_saturation,.filter_speed,.pointOn_off1").css("display","none");
				$(".describeFrame_serve,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
			}
		},
		complete:function(){
			$(".zhao1","#loading").css("display","none");
		},
		error:function(){
			var ab=0;
		}

	});
};
function doRoadNetFeature(data){
	var vector=supermap.getLayersByName("markerLayer2")[0];
	if( data && vector){
		add2Layer(data,2,vector,"",false,"line");
	}
	// if(data && markerlayer){
	// 	add2Layer(data,1,markerlayer,"",false,"line");
	// }
}
function subwayPointData(bFlagRealData){//地铁坐标点
	$.ajax({
		url:"GetRoadNet",
		dataType:"json",
		data:{ "action":"query","type":bFlagRealData},
		contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
		beforeSend:function(){ 
		},
		success: function( data, textStatus, jqXHR ){
			doSubwayNetFeature(data,"point");
		},
		complete:function(){
		},
		error:function(){}
	});
	$.ajax({
		url:"GetRoadNet",
		dataType:"json",
		data:{ "action":"query","type":80},
		contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
		beforeSend:function(){ 
		},
		success: function( data, textStatus, jqXHR ){
			doSubwayNetFeature(data,"line");
			drawAnimator(data,animator);
		},
		complete:function(){
		},
		error:function(){}
	});
};
function doSubwayNetFeature(data,feature){
	var markerLayer50=supermap.getLayersByName("markerLayer50")[0];
	if( data && subwayLine){
		add2Layer(data,50,markerLayer50,"",true,feature);
	}
}
function drawAnimator(data,layer)
{
	var vol,va,vas;
	var line,lineVector,lonlat;
	features = [];
		var points=[];

	for( var i=0;i<data.entitys.length;i++ ){
		var id,j,TIME;
		vol = data.entitys[i];
		id = vol[0];
		
		vas=vol[data.entitys[i].length-1].split(",");
		for (var j=0;j<vas.length;j++ ){
			va=vas[j].split(" ");
			
			var vector = new SuperMap.Feature.Vector(
            new SuperMap.Geometry.Point(parseFloat(va[0]),parseFloat(va[1])).transform("EPSG:4326","EPSG:900913"),//设置第一个位置
            {
                FEATUREID:i+'b',//设置为点的id
                TIME:j//设置第一个时间
            },
             {
				fillColor: "#8A36CC",
				fillOpacity: 1,
				strokeOpacity: 0,
//				label: population + "",
				fontColor: "#ffffff",
				fontOpacity: "1",
				fontFamily: "隶书",
				fontSize: "1em",
				pointRadius: 4
						}
    		)
			 points.push(vector);
			 
			 
		}
		var time = 0;
		for (var j=vas.length-1;j>0;j-- ){
			va=vas[j].split(" ");
			
			var vector = new SuperMap.Feature.Vector(
            new SuperMap.Geometry.Point(parseFloat(va[0]),parseFloat(va[1])).transform("EPSG:4326","EPSG:900913"),//设置第一个位置
            {
                FEATUREID:i+'g',//设置为点的id
                TIME:time//设置第一个时间
            },
             {
				fillColor: "#00FF00",
				fillOpacity: 1,
				strokeOpacity: 0,
//				label: population + "",
				fontColor: "#ffffff",
				fontOpacity: "1",
				fontFamily: "隶书",
				fontSize: "1em",
				pointRadius: 4
						}
    		)
			 points.push(vector);
			 time++;
			 
		}
		
	}
layer.addFeatures(points);
layer.animator.start();
layer.renderer.glint = false;
}
function subwayPointFlowData(){//站点流量
	var pa=1+","+"'2016-04-01 05:00:00','2016-04-01 05:05:00'"+","+ -1;
	$.ajax({
		url:"GetNetState",
		dataType:"json",
		data:{ "action":"query","type":11,"pa":pa},
		contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
		success: function( data, textStatus, jqXHR ){
			console.log(data);
		},
		error:function(){}
	});
};

function subwayAttr(arg){
	var subwayId=arg.id.split("_")[1];
//	var val="{'ID':"+subwayId+"}";
//	$.ajax({
//		url:"GetDevice",
//		dataType:"json",
//		data:{ "action":"query","type":501,"val":val},
//		contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
//		beforeSend:function(){ 
//		},
//		success: function( data, textStatus, jqXHR ){
			//暂时
//			arg.num=data.entitys[0];
//			arg.name=data.entitys[2];


			var showVal="<span style='margin-left:10px'></span>"+"站点编号:"+subwayId+"<br><span style='margin-left:10px'></span>"+"原始编号:"+arg.original_id+
			"<br><span style='margin-left:10px'></span>"+"站点名称:"+arg.name;
			var lonLat = new SuperMap.LonLat(arg.geometry.x,arg.geometry.y);
			var popup = new SuperMap.Popup.FramedCloud(
		        "Frame_popup",
		        lonLat,
		        //supermap.getLonLatFromPixel(new SuperMap.Pixel(event.pageX,event.pageY)),//将鼠标位置转换为经纬度坐标
		        null,
		        showVal,
		        null,
		        false,
		        null,
		        false
		    );
    		supermap.addPopup(popup);
//		},
//		complete:function(){
//		},
//		error:function(){}
//	});
}
function subwayOut(argument){
	var divMap=$("#map");
	var markerLayer=supermap.getLayersByName("markerLayer50")[0];
	if(divMap.attr("roadFlag")=="交通"){
		supermap.removeAllPopup();
	}
    markerLayer.redraw();
}

function subwayRightClick(){
//	window.open("traffic/mbtaviz.github.io-master_work2/index.html");
	var html = '<iframe src="traffic/mbtaviz.github.io-master_work2/index.html" name="traffic" id="traffic" frameborder="1" scrolling=""  style="width:1343px; position:absolute;top:25px;left:95px;z-index:1000;height:537px;border:1px solid #000">'+
	'</iframe>'
	$("body").append(html);
	var remove = '<img src="images/min.png" class="empty_btn" onclick="removeTraffic()"  style="cursor:pointer;position:absolute;top:25px;left:1400px;z-index:1000;">';
	$("body").append(remove);
}
	function removeTraffic(){
		$("#traffic").remove();
		$(".empty_btn").remove();
	}
//小区
function queryVillage(){
	$.ajax({
		url:"GetDevice",
		dataType:"json",
		data:{ "action":"query","type":"40"},
		contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
		beforeSend:function(){ 
			$(".zhao1,#loading").css("display","block");
		},
		success: function( data, textStatus, jqXHR ){
			var layer=supermap.getLayersByName("markerLayer3")[0];
			add2Layer(data,3,layer,"",false,"region");
		},
		complete:function(){
			$(".zhao1,#loading").css("display","none");
		},
		error:function()
		{

		}
	});
}
function villageShow(){
	var vector=supermap.getLayersByName("markerLayer2")[0];
	vector.setVisibility(false);
	supermap.getLayersByName("markerLayer3")[0].setVisibility(true);
}
//var VillageState_color = {};
function VillageState_Ajax(pa){
	// var pa = '2016-04-01 07:00:00';
	$.ajax({
		url:"GetNetState",
		dataType:"json",
		data:{ "action":"query","type":"2","pa":pa},
		contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
		beforeSend:function(){ 
			$(".zhao1","#loading").css("display","block");
		},
		success: function( data, textStatus, jqXHR ){
			var layer=supermap.getLayersByName("markerLayer3")[0];
			VillageState(3,data.entitys,layer);
		},
		complete:function(){
			$(".zhao1","#loading").css("display","none");
		},
		error:function()
		{

		}
	});
}
function queryCrosshotMap(){//路口节点尾气
    $.ajax({
        url:"GetRoadNet",
        dataType:"json",
        data:{ "action":"query","type":"30"},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){ 
             $(".zhao1","#loading").css("display","block");
         },
        success: function( data, textStatus, jqXHR ){
            doCrosshotMap( data );
        },
        complete:function(){
            $(".zhao1","#loading").css("display","none");
        },
        error:function(){ }
    });
}
function doCrosshotMap(data){
    var heatFeatures = [];
    if( data ){
        if( data.total != 0 )
        {
            for( var item in data.entitys ){
               var statedata = data.entitys[item][3].split(",");
                for(var i=0;i<statedata.length;i++){
                    var lonlat = SuperMap.LonLat.fromString(statedata[i].split(" ")[0]+','+statedata[i].split(" ")[1]);
                    lonlat = lonlat.transform("EPSG:4326","EPSG:900913");
                    var Point = new SuperMap.Geometry.Point(lonlat.lon,lonlat.lat);
                    heatFeatures.push(new SuperMap.Feature.Vector(Point,{"value":i}));
               }
            }
        }
    }
    heatMapCross.featureWeight = "value";
    heatMapCross.addFeatures(heatFeatures);
    heatMapCross.setVisibility(true);
};
function getVillageId(argument){//小区ID的选择
	var vector=supermap.getLayersByName("markerLayer2")[0];
	if(villageGroup == argument){
		// return 
		id =argument.id.split("_")[1];
	    $(".vNum").html(id);
	}else{
		if(oldColor){
			villageGroup.style={
		        fillColor:oldColor,
		        fillOpacity:"0.6",
		        stroke:"true",
		        strokeColor:"#EE9900",
		        labelSelect:"true",
		    };
		}

		oldColor = argument.style.fillColor;
		argument.style={
	        fillColor:"#000",
	        fillOpacity:"0.6",
	        stroke:"true",
	        strokeColor:"#EE9900",
	        labelSelect:"true",
	    };
	
		supermap.getLayersByName("markerLayer3")[0].redraw();
	    villageGroup = argument;

	    if($(".vNum")){
	    	id =argument.id.split("_")[1];
	    	$(".vNum").html(id);
	        // _vNum=id;
	    }
	    if($(".words_ocs").text()=="常发拥堵路段统计(OCS)"){
	    	vector.setVisibility(true);
		    $(".zhao").css("display","block");
	    }
	}
}
function getlinkId(argument){//小区ID的选择
	var id;
	id =argument.id.split("_")[1];
	$(".vNum").html(id);
}
//静态街景
function describeVista(){
	var divMap=$("#map");
	if(divMap.attr("roadFlag")=="静态安全"){
		window.open("Vista/start.html");
	}
}
function createDataTimeDialog(argument){
	var up_name,down_name,titleVal;		
	$(".zhao").css("display","block");
	var content='';
	content+='<div id="divFrame" class="divFrame white">'+
				'<div class="divTitle">'+
					'<span>分时数据指数</span>'+//交通拥堵率统计(TCR)
					'<img src="images/min.png" class="empty_btn" onclick="divRemove(\'.zhao\',\'#divFrame\')" style="cursor:pointer">'+
				'</div>'+
				'<div class="divTime">'+
					'<ul class="ULtime">'+
						'<li class="leftli1"><span>开始时间</span><input type="text" value="2016-04-01" class="timeIpt" data="" id="upTimeIpt" onClick="jeDate({dateCell:\'#upTimeIpt\',isTime:true,format:\'YYYY-MM-DD\'})"></li>'+
						// '<li class="midli"><span>结束时间</span><input type="text" value="2016-04-02" class="timeIpt" id="downTimeIpt" onClick="jeDate({dateCell:\'#downTimeIpt\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"></li>'+
						'<li class="rightLi1" >'+
							'<span>类型选择</span>'+
							'<select class="typeSelect" id="typeSelect">'+
								'<option>行程车速</option>'+
								'<option>旅行时间</option>'+
								'<option>流量数值</option>'+
							'</select>'+
						'</li>'+
					'</ul>'+
				'</div>'+
				'<div class="divContent">'+
					'<div class="divContent_left">'+
						'<div class="upContentTU" id="upContentTu"></div>'+
						// '<div class="downContentTU" id="downContentTu"></div>'+
					'</div>'+
					'<div class="divContent_right">'+
						'<div class="villageFrame">'+
							'<p>'+
								'<span class="choiceTitle">选择路段编号</span>'+
							'</p>'+
							// '<textarea class="villageNum"></textarea>'+
							'<div class="villageNumShow">'+
								'<table cellspacing="0">'+
									'<tr class="tr_line">'+
										'<th>路段编号</th>'+
										'<th>路段名称</th>'+
									'</tr>'+
									'<tr class="textTr">'+
										'<td class="vNum"></td>'+
										'<td></td>'+
									'</tr>'+
								'</table>'+
							'</div>'+
						'</div>'+
						'<div class="linkupVal">'+
							'<p class="wordsTitle">路段属性:</p>'+
							'<ul class="valUl">'+
								'<li><span>从节点</span><input type="text" class="valSpan" id="link1" readonly="readonly" /></li>'+
								'<li><span>到节点</span><input type="text" class="valSpan" id="link2" readonly="readonly"/></li>'+
								'<li><span>sec</span><input type="text" class="valSpan" id="link3" readonly="readonly"/></li>'+
								'<li><span>link_type</span><input type="text" class="valSpan" id="link4" readonly="readonly"/></li>'+
								'<li><span>state</span><input type="text" class="valSpan" id="link5" readonly="readonly"/></li>'+
							'</ul>'+
						'</div>'+
						'<p class="P_btn_frame">'+
							'<a id="P_btn_frame" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
							// '<input type="button" value="导出图表" class="" />'+
							'<input type="button" value="确定" class="countBtn" onclick="DataTimeAjax()"/>'+//
						'</p>'+
					'</div>'+
				'</div>'+
			'</div>';
	$("body").append(content);
	
	getlinkId(argument);
	DataTimeAjax();//加在一个触发事件里
	divDrag('.divTitle','.divFrame');
	
}
function DataTimeAjax(){//TCR图表请求数据
	$("#upContentTu").remove();
	var html='';
	html+='<div class="upContentTU" id="upContentTu"></div>';
	$(".divContent_left").append(html);
	var upTime=$("#upTimeIpt").val();
	var _vNum=$(".vNum").text();
	var pa=upTime+","+_vNum;
	
	if(upTime != ""){
		$.ajax({
		 url:"GetNetState",
         dataType:"json",
         data:{ "action":"query","type":5,"pa":pa},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               DataTimeCharts(data.entitys);
               $("#link1").val(data.entitys[0][0]);
				 $("#link2").val(data.entitys[0][1]);
				 $("#link3").val(data.entitys[0][2]);
				 $("#link4").val(data.entitys[0][3]);
				 $("#link5").val(data.entitys[0][4]);
         },
         error:function(){}
		})
	}else{
		alert("请选开始与结束开始时间");
	}
}
function DataTimeCharts(data){
var data1=[];
var data2=[];
var data3=[];
var dataMinMax1=[],dataMinMax2=[],dataMinMax3=[];
var dataChange = data1 ;
for(var i=1;i<(data.length-1);i++){
	var dataLine1=[],dataLine2=[],dataLine3=[];
	dataLine1.push(data[i][0]);
	dataLine1.push(data[i][1]);	
	data1.push(dataLine1);
	dataLine2.push(data[i][0]);
	dataLine2.push(data[i][2]);	
	data2.push(dataLine2);
	dataLine3.push(data[i][0]);
	dataLine3.push(data[i][3]);	
	data3.push(dataLine3);
	dataMinMax1.push(data[i][1]);
	dataMinMax2.push(data[i][2]);
	dataMinMax3.push(data[i][3]);
}
var dataMinMax=[Math.min.apply(null, dataMinMax1),Math.max.apply(null, dataMinMax1),Math.min.apply(null, dataMinMax2),Math.max.apply(null, dataMinMax2),Math.min.apply(null, dataMinMax3),Math.max.apply(null, dataMinMax3)];

// var YMin=dataMinMax[0].toFixed(2);
// var YMax=(dataMinMax[1]+10).toFixed(2);
if($("#typeSelect")[0].selectedIndex==0){
	dataChange = data1;
	var YMin=dataMinMax[0].toFixed(2);
	var YMax=(dataMinMax[1]+10).toFixed(2);
}else if($("#typeSelect")[0].selectedIndex==1){
	dataChange = data2;
	var YMin=dataMinMax[2].toFixed(2);
	var YMax=(dataMinMax[3]+0.5).toFixed(2);
}else if($("#typeSelect")[0].selectedIndex==2){
	dataChange = data3;
	var YMin=dataMinMax[4].toFixed(2);
	var YMax=(dataMinMax[5]+1).toFixed(2);
}
$("body").delegate("#typeSelect","change",function(){
	if($(this)[0].selectedIndex==0){
		dataChange = data1;
		YMin=dataMinMax[0].toFixed(2);
		YMax=(dataMinMax[1]+10).toFixed(2);
	}else if($(this)[0].selectedIndex==1){
		dataChange = data2;
		YMin=dataMinMax[2].toFixed(2);
		YMax=(dataMinMax[3]+0.5).toFixed(2);
	}else if($(this)[0].selectedIndex==2){
		dataChange = data3;
		YMin=dataMinMax[4].toFixed(2);
		YMax=(dataMinMax[5]+1).toFixed(2);
	}
	redrawCharts(dataChange,YMin,YMax);
	// _upContentTu.setOption(optionUp, true);
})
redrawCharts(dataChange,YMin,YMax);

 // TDR_CVS(data2,data1);
}
function redrawCharts(dataChange,YMin,YMax){
 var _upContentTu = echarts.init(document.getElementById('upContentTu'));
optionUp = {
	backgroundColor:"#fff",
    color:['red','green'],
    legend: {
        data:['红线数据']
    },
    tooltip: {
        trigger: 'axis'
        // formatter: '{a} <br/>{b}  {c}'
    },
    toolbox:{
    	feature:{
	    	saveAsImage:{
	    		pixelRatio:2
	    	}
	    }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        }
    },
    yAxis:{
        type: 'value',
        min:YMin,
        max:YMax,
        splitLine: {
            show: false
        }
    },
    series: [{
        name: '红线数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        symbolSize:6,
        itemStyle : {
				normal : {
                    color:'red',
					lineStyle:{
						color:'red'
					}
				}
			},
        data: dataChange
    }
    ]
};  
 _upContentTu.setOption(optionUp,true);
 DataTime_CVS(dataChange);
}
function DataTime_CVS(dataChange){
	var divMap=$("#map");
	var str;
	if(divMap.attr("roadFlag")=="运行状态"){
		if($("#typeSelect")[0].selectedIndex==0){
			str = "红线,日期时间,行程车速\n";
		}else if($("#typeSelect")[0].selectedIndex==1){
			str = "红线,日期时间,旅行时间\n";
		}else if($("#typeSelect")[0].selectedIndex==2){
			str = "红线,日期时间,流量数值\n";
		}
	}
	
	var dataLength = dataChange.length;
	for(var i=0;i<dataLength;i++){
		str+=(i+1)+","+dataChange[i][0]+","+dataChange[i][1]+"\n";
	}
	str =  encodeURIComponent(str);
    $("#P_btn_frame")[0].href = "data:text/csv;charset=utf-8,\ufeff"+str;
};
function dragFeature_activate(){
	dragFeature.activate();}
function dragFeature_deactivate(){
	dragFeature.deactivate();}

//******************************************************交通控制属性图
var gmarkerLonLat,markerID;
var param_old = [];
var param_new = [];
var intersectionSignal_id = [];
var signalDataMap = {};//协调组下信号机属性
//创建EventUtil对象
        var EventUtil={
            addHandler:function(element,type,handler){
                if(element.addEventListener){
                    element.addEventListener(type,handler,false);
                }
                else if(element.attachEvent){
                    element.attachEvent("on"+type,handler);
                }
            },
            getEvent:function(event){
                return event?event:window.event;
            },
            //取消事件的默认行为
            preventDefault:function(event){
                if(event.preventDefault){
                    event.preventDefault();
                }else{
                    event.returnValue= false;
                }
            },
            stopPropagation:function(event){
                if(event.stopPropagation){
                    event.stopPropagation();
                }else{
                    event.cancelBubble=true;
                }
            }
        };
         EventUtil.addHandler(window,"load",function(event){
            EventUtil.addHandler(document,"contextmenu",function(event){
                event= EventUtil.getEvent(event);
                EventUtil.preventDefault(event);
                // $(".all_tc").css("visibility","visible");   
            });
            EventUtil.addHandler(document,"click",function(event){
                  $(".all_tc").css("visibility","hidden");  
             });
        });
         
$(document).ready(function(){//收起功能
    $("body").delegate(".area_p1","click",function(){
        $(this).next(".area_ul2").children("li").fadeToggle();
    })
 
var down_toggle = true ;
    $("body").delegate(".down","click",function(){
//      $(this).parent().parent().parent().next(".area_ul4").children("li").fadeOut();
		if(down_toggle){
			 $(this).parent().parent().parent().next(".area_ul4").children("li").fadeOut();
        	 $(this).attr("src","images/right.png");
        	 down_toggle = false ;
		}else{
			$(this).parent().parent().parent().next(".area_ul4").children("li").fadeIn();
        	$(this).attr("src","images/down.png");
        	down_toggle = true ;
		}
    })

});


function signal_lightDIV(ma){
    gmarker= ma;
    markerID=gmarker.id;
    var markerLonLat = new SuperMap.LonLat(gmarker.lonlat.lon,gmarker.lonlat.lat);
    gmarkerLonLat=markerLonLat.transform("EPSG:900913", "EPSG:4326" );    
}
        

//remov编辑框
function reasize(a){
  $(a).remove();
}

//信号控制的设置
function setSingleSet(){
    singleSetAttribute();
}
//信号控制的设置，编辑的数据ajax
var Flag = true;
var maxSignal=0;
function singleSetAttribute(Flag,id){
	if(id){
		var val="{ID:"+id+"}";
	}else{
		var gmarkerId=gmarker.id;
		var val="{ID:"+gmarkerId+"}";
	}

$.ajax({
     url:"GetDevice",
         dataType:"json",
         data:{ "action":"query","type":61,"val":val},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               //dosingleSet( data );
               if(id){
               		signalDataMap[id] = data.entitys;
               		return false;
               }
               if(Flag){
                    doConcert(data);
                    Flag=false;
               }else{
                    dosingleSet( data );
               }
              
         },
         error:function()
         {

         }
})
}
//信号控制的设置，编辑属性弹窗
function dosingleSet(data){

    xintu();
    mapCur=map;
    signalConfig(8);
    getSignalPhaseMap(gmarker.id);
    $("#phaseframe").remove();
}


//协调优化评价
function setConcert(){ 
    singleSetAttribute(Flag);
}

//标记点弹窗的弹窗的隐藏（btn）        
function zhao_none1(a){
  $(a).css("display","none");
  $(a).remove();
}

function timeChange(num){
	var num=num+"";
	return num=num.length>1?num:0+num;
}
var testMin=0;
function getSignalAjax(){
	var pa = intersectionSignal_id.join(",");
	$.ajax({
        url:"GetSignalData",
        dataType:"text",
        data:{ "action":"query","type":"10","pa":pa},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
			param(data);
			lineViewAjax(getNowFormatDate());
        },
        error:function(){}
    });
}
function param(data){
var paramHeader=4;
	var arr1=[],arr2=[],arr3=[];
	var arr_1 = data.split(";");
	for(var i=0;i<arr_1.length;i++){
		var arr_2=arr_1[i].split(",");
var nI=(arr_2.length-paramHeader)/2;
		
		arr2=[];arr3=[];
		for(var j=0;j<arr_2.length;j++)
			if(j>=paramHeader&&j<(paramHeader+nI)){
				arr2.push(arr_2[j]);
				arr3.push(arr_2[j]);
			}else{
				arr2.push(parseInt(arr_2[j]));
				arr3.push(parseInt(arr_2[j]));
			}
			
		param_old.push(arr2);
		param_new.push(arr3);
	}
	intersection();
	
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;//+ " " + date.getHours() + seperator2 + date.getMinutes()+ seperator2 + date.getSeconds()
    return currentdate;
}


function markerAttrClick(cur)
{
	markerAttrAjax(cur);
}

//信号机配置图
function signalConfig(num){
	var html = '<div id="phaseframe"><ul class="ring_ul"><li class="ring_main">主街</li><li class="ring_next">次街</li></ul>'+
	'<div class="barrier_1"></div>';//<div class="barrier_2"></div>
	for(var i=0;i<num;i++){
		if(i==num/2){
			html+='<div id="phi_'+(i+1)+'" class="phase clear"><img src=""><span></span><span class="phi_r"></span><span class="phi_y"></span></div>';
		}else{
			html+='<div id="phi_'+(i+1)+'" class="phase"><img src=""><span></span><span class="phi_r"></span><span class="phi_y"></span></div>';
		}
	}
	html+='</div>';
	$('#map1').append(html);
}
function reset(){
	mapPhases = {};
	markerCur = undefined;
	click = [0, 0];
	marId = 1,bFlagDelete = false;
	googleAllNode = [];
	googleAllLine = [],googleClickData = [];
	to_node_toggle = true;
}
//******************************************************交通控制属性图  end