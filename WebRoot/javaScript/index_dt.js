
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
$(document).ready(function() {
	var High=document.body.clientHeight;
	document.getElementById('map').style.height=High+'px';
	// document.getElementById('dt_map1').style.height=High-210+'px';
	// document.getElementById('dt_map2').style.height=High-210+'px';
	// document.getElementById('dt_map3').style.height=High-210+'px';
})
$(window).resize(function(){
    var High=document.body.clientHeight;
	document.getElementById('map').style.height=High+'px';
	if($("#replaceIpt1").prop("checked")==true){
    	document.getElementById('dt_map1').style.height=High-130+'px';
		document.getElementById('dt_map2').style.height=High-130+'px';
		document.getElementById('dt_map3').style.height=High-130+'px';
    }
})
	function setCenter(){//每个页面 地图中心点
		 supermap.setCenter(new SuperMap.LonLat(12957229.13494, 4853699.61315), 11);
	}
/*日期*/
function showtime(){
	var date=new Date();
	var yy=date.getFullYear();
	var yue=date.getMonth()+1;
	var ri=date.getDate();
	var hh=date.getHours();
	var mm=date.getMinutes();
	var ss=date.getSeconds();
	var day=date.getDay();
	switch(day){
		case 0:
			 day="星期日";
			 break;
		case 1:
			 day="星期一";
			 break;
		case 2:
			 day="星期二";
			 break;
		case 3:
			 day="星期三";
			 break;
		case 4:
			 day="星期四";
			 break;
		case 5:
			 day="星期五";
			 break;
		case 6:
			 day="星期六";
			 break;
	}
	mm=checkTime(mm);
	ss=checkTime(ss);
	var div1=document.getElementById("div1");
	div1.innerHTML=yy+"年"+yue+"月"+ri+"日"+"  "+hh+":"+mm+":"+ss+"  "/*+am_pm+" "*/+day;
	/*var Vernier_time=document.getElementById("vernier_time");
		Vernier_time.innerHTML=hh+":"+mm;*/
	t=setTimeout('showtime()',500);
}
function checkTime(i){
	if (i<10){
		i="0" + i;
	}
	return i;
}
/****/
function createMoveFeelMap(name1,name2,name3){
	var html='';
	html+='<div class="splitScreenFrame">'+
			'<p class="ScreenZhao"></p>'+
				'<div class="screenMapAll">'+
				'<div class="Screen_1" id="dt_map1"><div class="ScreenZhao1" onclick="showBigMap(this,1)"></div><div class="littleMapHeader"><div class="littleMapHeader1"></div><div class="littleMapHeader2"><h4 class="littleMapHeader_words">'+name1+'</h4></div></div></div>'+
				'<div class="Screen_2" id="dt_map2"><div class="ScreenZhao1" onclick="showBigMap(this,2)"></div><div class="littleMapHeader"><div class="littleMapHeader1"></div><div class="littleMapHeader2"><h4 class="littleMapHeader_words">'+name2+'</h4></div></div></div>'+
				'<div class="Screen_3" id="dt_map3"><div class="ScreenZhao1" onclick="showBigMap(this,3)"></div><div class="littleMapHeader"><div class="littleMapHeader1"></div><div class="littleMapHeader2"><h4 class="littleMapHeader_words">'+name3+'</h4></div></div></div>'+
			'</div>'+
		'</div>';
	$("#map").append(html);
	
	var High=document.body.clientHeight;
	document.getElementById('dt_map1').style.height=High-130+'px';
	document.getElementById('dt_map2').style.height=High-130+'px';
	document.getElementById('dt_map3').style.height=High-130+'px';
	$(".splitScreenFrame").css({'position':'absolute','z-index':'9999','width':'100%','height':'100%','top':"0px","left":"0px"});
	$(".ScreenZhao").css({'position': 'absolute','z-index':'9999','width':'100%','height':'100%','background-color': '#000','opacity':' 0.4'});
	createLittleMap();
}
function footerImgChange(ele,num){
	$(".replace img,.replaceTop img").each(function(i,n){
        $(this).attr("src","images/logo/dtWhite/"+(i+1)+".png");
    })
    $(".splitScreenFrame").remove();
    if($(ele).prop("checked")==true){
    	if(num==1){
    		createMoveFeelMap('轨道交通状态','公共汽车动态','交通枢纽动态');
    		$(".replace .li1 img,.replaceTop .li1 img").attr("src","images/logo/dtRed/1.png");
    	}else if(num==2){
    		createMoveFeelMap('当前全天推演','未来一天预测','未来一周预测');
    		$(".replace .li2 img,.replaceTop .li2 img").attr("src","images/logo/dtRed/2.png");
    	}
    	$(ele).parent().parent().siblings('li').children().children('input').prop("checked",false);
    	$(".replace").addClass('replaceTop').removeClass('replace');
    	$('.f_world').css("display","none");
    }else{
    	$(".replaceTop").addClass('replace').removeClass('replaceTop');
    	$('.f_world').css("display","block");
    }
}
function showBigMap(ele,num){
	$(ele).parent().css({"width":"100%","left":"0px"});
	$(ele).parent().siblings('div').css({"display":"none"});
	$(ele).css("display","none");
	var html='<img src="images/min.png" class="closeReturn" onclick="returnLittleMap(this,'+num+')"/>';
	$(".littleMapHeader1").append(html);
	$(".closeReturn").css({"width":"14px","height":"15px","float":"right","margin-right":"6px","cursor":"pointer"});
	if(num==1){
		supermap_1.updateSize();
	}else if(num==2){
		supermap_2.updateSize();
	}else if(num==3){
		supermap_3.updateSize();
	}
}
function returnLittleMap(ele,num){
	$(ele).parent().parent().siblings('div').css("display","block");
	$(ele).parent().parent().parent().siblings('div').css("display","block");
	if(num==1){
		$(ele).parent().parent().parent().css({"left":"0px","width":"33%"});
		supermap_1.updateSize();
	}else if(num==2){
		$(ele).parent().parent().parent().css({"left":"0.4%","width":"33%"});
		supermap_2.updateSize();
	}else if(num==3){
		$(ele).parent().parent().parent().css({"left":"0.7%","width":"33%"});
		supermap_3.updateSize();
	}
	$('.littleMapHeader1 img').remove();
}
function subwayPointData(){//地铁坐标点
	$.ajax({
		//url:"GetNetState",
		url:"GetRoadNet",
		dataType:"json",
		//data:{ "action":"query","type":11,"pa":"2,'2016-04-01 00:00:00','2016-04-01 23:00:00',1"},
		data:{ "action":"query","type":70},
		contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
		beforeSend:function(){ 
		},
		success: function( data, textStatus, jqXHR ){
			/*TL_Vertex=data.dta;
			TL_Vertex_Index=data.ind;
			AnimatePoint(18990);*/
			
			TL_Input_Stop=data.entitys;
			settingCht('1','2',['1号线','2号线']);
			
			var layerNode=supermap.getLayersByName("markerLayer50")[0];
			doSubwayNetFeature(layerNode,data,"point");
			if($("#replaceIpt1").prop("checked")==true||$("#replaceIpt2").prop("checked")==true){
				var layerNode_1=supermap_1.getLayersByName("markerLayer50_1")[0];
				var layerNode_2=supermap_2.getLayersByName("markerLayer50_2")[0];
				var layerNode_3=supermap_3.getLayersByName("markerLayer50_3")[0];
				doSubwayNetFeature(layerNode_1,data,"point");
				doSubwayNetFeature(layerNode_2,data,"point");
				doSubwayNetFeature(layerNode_3,data,"point");
			}
		},
		complete:function(){
		},
		error:function(){}
	});
	$.ajax({
		//url:"GetRoadNet",
		url:"GetNetState",
		dataType:"json",
		//data:{ "action":"query","type":80},
		data:{ "action":"query","type":11,"pa":"2,'2016-04-01 00:00:00','2016-04-01 23:00:00',1"},
		contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
		beforeSend:function(){ 
		},
		success: function( data, textStatus, jqXHR ){
			TL_Vertex=data.dta;
			TL_Vertex_Index=data.ind;
			//AnimatePoint(18990);
			settingCht('1',TL_Vertex,['1号线','2号线']);
			
			/*var layerLine=supermap.getLayersByName("markerLayer51")[0];
			doSubwayNetFeature(layerLine,data,"line");
			drawAnimator(data,supermap.getLayersByName("animator")[0]);
			if($("#replaceIpt1").prop("checked")==true||$("#replaceIpt2").prop("checked")==true){
				var layerLine_1=supermap_1.getLayersByName("markerLayer51_1")[0];
				var layerLine_2=supermap_2.getLayersByName("markerLayer51_2")[0];
				var layerLine_3=supermap_3.getLayersByName("markerLayer51_3")[0];
				doSubwayNetFeature(layerLine_1,data,"line");
				drawAnimator(data,supermap_1.getLayersByName("animator_1")[0]);
				doSubwayNetFeature(layerLine_2,data,"line");
				drawAnimator(data,supermap_2.getLayersByName("animator_2")[0]);
				doSubwayNetFeature(layerLine_3,data,"line");
				drawAnimator(data,supermap_3.getLayersByName("animator_3")[0]);
			}*/
			
			//TL_Sub_Input_Link=data.entitys;
			//TL_Sub_Input_index=data.ind;
			//AnimatePoint(18990);
		},
		complete:function(){
		},
		error:function(){}
	});
	subwayPointFlowData();
};
function doSubwayNetFeature(layer,data,feature){
	
	if( data && layer){
		add2Layer(data, parseInt(layer.name.substring(layer.name.length-2,layer.name.length)), layer,"",true,feature);
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
    //          	externalGraphic:"images/subway/subwayRedCar.png",
				// allowRotate:true,
				// graphicWidth:18,
				// graphicHeight:18,
				fillColor: "#8A36CC",
				fillOpacity: 1,
				strokeOpacity: 0,
				label: i + "",
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
				label: i + "",
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
layer.renderer.dataField = "POPULATION";
layer.addFeatures(points);
//layer.animator.start();
layer.renderer.glint = false;
}
function subwayPointFlowData(){//站点流量
	var pa=1+","+"'2016-04-01 08:00:00','2016-04-01 09:05:00'"+","+ -1;
	$.ajax({
		url:"GetNetState",
		dataType:"json",
		data:{ "action":"query","type":11,"pa":pa},
		contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
		success: function( data, textStatus, jqXHR ){
			subwayPointFlowDraw(data.entitys);
		},
		error:function(){}
	});
};
function subwayPointFlowDraw(data){
	for(var i=0;i<data.length;i++){
		TL_AllLineMap["50_"+data[i][0]].style.pointRadius = 10;
		// if(data[i][1]<num){
		// 	TL_AllLineMap["50_"+data[i][0]].style.pointRadius = 10;
		// }
	}
		var layer=supermap.getLayersByName("markerLayer50")[0];
		layer.redraw();
}

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

if(!arg.original_id){
		return;
	}

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
    		$("#Frame_popup").css({"width":"150px","height":"90px","background-color":"#f5f5f5","border":"3px solid #0B3893","border-radius":"8px"});
//  	$("#Frame_popup_contentDiv").css({"width":"195px","height":"100px"});
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
	var html = '<iframe src="traffic/mbtaviz.github.io-master_work2/index.html" name="traffic" id="traffic" frameborder="1" scrolling=""  style="width:1343px; position:absolute;top:126px;left:95px;z-index:1000;height:537px;border:1px solid #000">'+
	'</iframe>'
	$("body").append(html);
	var remove = '<img src="images/min.png" class="empty_btn" onclick="removeTraffic()"  style="cursor:pointer;position:absolute;top:126px;left:1395px;z-index:1000;">';
	$("body").append(remove);
}
function removeTraffic(){
	$("#traffic").remove();
	$(".empty_btn").remove();
}