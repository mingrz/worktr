var TL_TimeID;//Timeline时间
function ratioHeight(listID,moduleID,ratioNum,multiple,pai){
	var High=document.body.clientHeight;
	/*index 页面里的高度自适应*/
	var LeftHeight=document.getElementById(listID);/*header相关联的左侧列表（正文在主体里）*/

	var List2=document.getElementById(moduleID);/*左侧列表里的两个模块*/

	document.getElementById('map').style.height=High+'px';
	
	if(pai==6){
		LeftHeight.style.height=High-85+'px';
	}else{
		LeftHeight.style.height=High-5+'px';/*为其添加的样式（高度）*/
	}
	List2.style.height=(High-5)/ratioNum*multiple-40+'px';

	if(document.getElementById('r_uu2')){
		influenceHeight(High,'r_uu2');
	}
}
function influenceHeight(List,module){
	var moduleID=document.getElementById(module);/*左侧列表里的两个模块*/
	moduleID.style.height=(List-5)/3*2-236+'px';
//	moduleID.style.height=(List-5)/3*2-157+'px';
}
function setCenter(){//每个页面 地图中心点
	 supermap.setCenter(new SuperMap.LonLat(12990226.0445648, 4793154.9179491), 5);
}
function setMapURL(layer,ind){
	//layer.url="http://127.0.0.1:8088/ITSJN/tiles/${z}/${x}/${y}.jpg";
}
//交通控制侧导航拖拽
var leftOffset;
var dragging=false;
$("#js-widthAuto").mousedown(function(e){
	dragging=true;
	e.cancelBubble=true;
	leftOffset = $("#js-widthAuto").offset().left;
	_mx = event.pageX;
});

$(document).mousemove(function(event){
	if(dragging){
		_x = event.pageX;

		if(_x<230){
			$("#list_left1").css("width",230+"px");
			$(".area_p1").css("background-size","7%");
		}
		else if(_x>450){
			$("#list_left1").css("width",450+"px");
			$(".area_p1").css("background-size","4%");
		}else{
			$("#list_left1").css("width",_x+"px");
		}
	}
});

$(document).mouseup(function(e){
	dragging=false;
	e.cancelBubble=true;
});
//标记点弹窗的弹窗的隐藏（btn）        
function zhao_none(ele1,ele2){
	$(ele1).css("display","none");
	$(ele2).remove();
}
/*修改、添加、删除alert*/
function reviseAlert(obj){
	var nr='';
	nr+='<div class="pop_bg">'+
	'<div class="zhao1"></div>'+
	'<div class="pop_up">'+
	'<p class="pop_p1"><span>'+obj+'</span></p>'+
	'<p class="pop_p2"><input type="button" value="确定" onclick="zhao_none(\'.zhao1\',\'.pop_bg\')"></p>'+
	'</div>'+
	'</div>';
	$('body').append(nr);
}
//拖动
function divDrag(ele1,ele2){//拖动添加新建list属性框的方法
	$(ele1).css("cursor","move");
	$(ele1).on({
		mousedown: function(e){
		var el=$(ele2);
		var os = el.offset(); dx = e.pageX-os.left, dy = e.pageY-os.top;
		$(document).on('mousemove.drag', function(e){ el.offset({top: e.pageY-dy, left: e.pageX-dx}); });
	}
//	,mouseup: function(e){ $(document).off('mousemove.drag'); }
	});
	$(document).on({mouseup:function(e){ $(document).off('mousemove.drag'); }})
}

var TL_MarkerMap;
var TL_Old=[],TL_Cur=[];
function markerCreate(layer,lonlat,size,offset,id,path,state){
	if( TL_MarkerMap==undefined )
		TL_MarkerMap={};

	var icon = new SuperMap.Icon(path, size, offset);
	var markerCur =new SuperMap.Marker(lonlat,icon);
	markerCur.id=id;
	markerCur.path=path;
	markerCur.state=state; // 1数据库数据，2新建。若新建的数据添加到数据库，则需将state设为1
	TL_MarkerMap[id] = markerCur;
	layer.addMarker(markerCur);
	markerCur.events.on({"click":function(){// 左键点击处理
		markerClick(markerCur.id,1);},
		"rightclick":function(){ //右键处理
			rightClick(layer,id,1);
		}
	});

	//if( menutype==2 ){ // 动态交通特殊处理，用0的位置存当前类型的所有id
		var datatype=id.substring(0,id.indexOf("_")+1);
		if(TL_MarkerMap[datatype+"0"]==undefined)
			TL_MarkerMap[datatype+"0"]=[];

		var flag=false;
		for( var i=0;i<TL_MarkerMap[datatype+"0"].length;i++ ){
			if( TL_MarkerMap[datatype+"0"][i]==id ){
				flag=true;
				break;
			}
		}
		
		if( !flag )//flag != true
			TL_MarkerMap[datatype+"0"].push(id);
	//}
}

function rightClick(layer,id,flag)
{
	markerClick(id,flag,true);
	
	markerRightClick(TL_MarkerMap[id]);	
}

function markerClick(cur,flag,rightClick=false) // cur数组ids,flag 1单个信号机，2信号机多个
{
	if( flag==2 ){
		for(var curMarker in cur)
			TL_Cur.push(TL_MarkerMap[curMarker]);
	}
	else{
		TL_Cur.push(TL_MarkerMap[cur]);
	}
	

	if( flag==2 || TL_Old.length==0 || cur!=TL_Old[0].id )
		markerClickSwitch(TL_Old,TL_Cur);

	TL_Cur=[];TL_Old=[];
	if( flag==2 ){
		for(var curMarker in cur)
			TL_Old.push(TL_MarkerMap[curMarker]);
	}else if(!rightClick){
		markerAttr(cur);
	}
		TL_Old.push(TL_MarkerMap[cur]);
}

function markerAttr(id) // 点击marker后，获取marker数据
{
	markerAttrClick(id);
}

function markerClickSwitch(old,cur) // old,cur数组
{
	var layer,bigSize,smallSize,offset;
	var id,lonlat,path;
	bigSize=new SuperMap.Size(44,44);
	smallSize=new SuperMap.Size(22,22);

	for(var oldMarker in old){
		id = old[oldMarker].id;
		lonlat = old[oldMarker].lonlat;
		path = old[oldMarker].path;
		offset = new SuperMap.Pixel(-(smallSize.w / 2), -smallSize.h);
		layer=supermap.getLayersByName("markerLayer"+id.substring(0,id.indexOf("_")));
		layer[0].removeMarker(old[oldMarker]);
		markerCreate(layer[0], lonlat, smallSize, offset, id,path,old[oldMarker].state);
	}

	for(var curMarker in cur)
	{
		id = cur[curMarker].id
		lonlat = cur[curMarker].lonlat;
		path = cur[curMarker].path;
		offset = new SuperMap.Pixel(-(bigSize.w / 2), -bigSize.h);
		layer=supermap.getLayersByName("markerLayer"+id.substring(0,id.indexOf("_")));
		layer[0].removeMarker(cur[curMarker]);
		markerCreate(layer[0], lonlat, bigSize, offset, id,path,cur[curMarker].state);
	}
}

function getCurMarker()
{
	var m;
	if(TL_Old.length>0)
		m=TL_Old[0];
	
	return m;
}

function getCurMarkerid()
{
	var id=0;
	if(TL_Old.length>0)
		id=TL_Old[0].id;
	
	return id;
}

function getCurMarkerLonlat()
{
	var lonlat=0;
	if(TL_Old.length>0)
		lonlat=TL_Old[0].lonlat;
	//.transform("EPSG:900913", "EPSG:4326" )
	return lonlat;
}

function getAllMarkerid(datatype)
{
	var ids=[];
	if(TL_MarkerMap!=undefined && TL_MarkerMap[datatype+"_0"]!=undefined)
		var ids=TL_MarkerMap[datatype+"_0"];

	return ids;
}

function getMaxMarkerid(datatype)
{
	var id=1;
	if(TL_MarkerMap[datatype+"_0"]!=undefined)
			id=TL_MarkerMap[datatype+"_0"].length+1;

	return id;
}
// 将图标变成小图标
function markerNormalize(ind)
{	
	if(TL_Old.length>0){
		var id=TL_Old[0].id;
		if(ind==parseInt(id.substring(0,id.indexOf("_")))){
			markerClickSwitch(TL_Old,[]);
			TL_Old=[];
		}
	}
}

var TL_AllLineMap;

function getAllFeatureNum(datatype)
{
	var num=0;
	var layer=supermap.getLayersByName("markerLayer"+datatype)[0];
	num=layer.features.length;
	
	return num;
}

function getFeature(datanum,id)
{
	var item;
	var layer=supermap.getLayersByName("markerLayer"+datanum)[0];
	item=layer.getFeatureById(datanum+"_"+id);
	
	return item;
}

function getLonlatByZoneID( datanum,zoneid )
{
	var id=-1;
	var layer=supermap.getLayersByName("markerLayer"+datanum)[0];
	for( var i=0;i<layer.features.length;i++ )
		if( layer.features[i].zone_id == zoneid ){
			id=layer.features[i].geometry;
			break;
		}

	return id;
}

//小区初始化
var villageArr = ["#7E0023","#FF0000","#FF7E00","#FFFF00","#00E400"];//小区颜色公用
/*function doVillage(data,layer,show){
	var heatFeatures = [];
	layer.setVisibility(show);
	if( data ){
        var vol,polygonVector;
        for( var i=0;i<data.entitys.length;i++ ){
           var points=[];
            vol = data.entitys[i];
            for ( var j=1;j<vol.length;j++ ){
                var lonlat = SuperMap.LonLat.fromString(vol[j].split(",")[0]+','+vol[j].split(",")[1]);
                lonlat = lonlat.transform("EPSG:4326","EPSG:900913");
                points.push(new SuperMap.Geometry.Point(lonlat.lon,lonlat.lat));
               // points.push(new SuperMap.Geometry.Point(vol[j],vol[j+1]));
            }
            var _groupID =data.entitys[i][0];
            linearRings = new SuperMap.Geometry.LinearRing(points);
            region = new SuperMap.Geometry.Polygon([linearRings]);
            polygonVector = new SuperMap.Feature.Vector(region);
            groupColor(polygonVector,"#00E400");
            
            polygonVector.id=_groupID;
            heatFeatures.push(polygonVector);
        }
        layer.addFeatures(heatFeatures);
    }else {}
};*/

function groupColor(polygonVector,villageColor){
	if(typeof(polygonVector) == 'object'){
		polygonVector.style = {//小区颜色
					fillColor:villageColor,
	                fillOpacity:"0.6",
	                stroke:"true",
	                strokeColor:"#EE9900",
	                labelSelect:"true",
			}
	}
	
}

function VillageState(datanum,da,layer){
	if(da.length<1){
		for( var item in layer.features ){
			item=layer.features[item];
			groupColor(item);
		}
	}else{
		for(var i=0;i<da.length;i+=2){
			var item=layer.getFeatureById(datanum+"_"+da[i]);
			groupColor(item,villageArr[da[i+1]]);
		}
	}
	layer.setVisibility(true);
	layer.redraw();
}

function add2Layer(data,datanum,layer,layertype,show,geotype)
{
	var vol,selectFeatureRoad,va,vas;
	var line,lineVector,lonlat;
	features = [];
	layer.setVisibility(show);

	for( var i=0;i<data.entitys.length;i++ ){
		var points=[];
		var id,j;
		vol = data.entitys[i];
		id = vol[0];
		
		vas=vol[data.entitys[i].length-1].split(",");
		for ( j=0;j<vas.length;j++ ){
			va=vas[j].split(" ");
			lonlat=new SuperMap.Geometry.Point(parseFloat(va[0]),parseFloat(va[1]));
			lonlat.transform("EPSG:4326","EPSG:900913");
			points.push(lonlat);
		}
		
		if( geotype=="point" ){
			lineVector = new SuperMap.Feature.Vector(points[0]);
			lineVector.style = {
					fillColor : "gary",
					strokeColor : "yellow",
					pointRadius : getPointSize(datanum)
				};
			
			if(datanum == 50){
				lineVector.original_id = data.entitys[i][1];
				lineVector.name = data.entitys[i][2];
			}
			else if( datanum == 4 ) // 小区中心点增加小区编号
				lineVector.zone_id=vol[1];
			
		}
		else if( geotype=="line" ){
			line = new SuperMap.Geometry.LineString(points);
			lineVector = new SuperMap.Feature.Vector(line);
			lineVector.linktype=vol[2];
			lineVector.length=vol[1];
			setLineProperty1(lineVector,getLineWidth(datanum));			
		}
		else if( geotype=="region" ){
			var linearRings = new SuperMap.Geometry.LinearRing(points);
			line = new SuperMap.Geometry.Polygon([linearRings]);
			lineVector = new SuperMap.Feature.Vector(line);
            groupColor(lineVector,"#00E400");
		}
		
		lineVector.id = datanum+"_"+id;
		if( TL_AllLineMap == undefined )
			TL_AllLineMap = {};
		
		if( TL_AllLineMap[datanum+"_"+0] == undefined )
			TL_AllLineMap[datanum+"_"+0]=0;

		TL_AllLineMap[datanum+"_"+0]+=1;
		TL_AllLineMap[lineVector.id]=lineVector;
		features.push(lineVector);
	}

	layer.addFeatures(features);
}

function getPointSize(datanum){
	var width=6;
	var level=supermap.getZoom();
	if( level<=13 )
		width=3;
	else if( level>13 && level<=16 )
		width=5;
	else 
		width=7;
	
	return width;
	
}

function getLineWidth(datanum){
	var width=2,level=supermap.getZoom();
	if( level<=13 )
		width=2;
	else if( level>13 && level<=16 )
		width=4;
	else 
		width=6;
	
	return width;
}

function setLinePropert(lineVector,width,state,level,speed, filterFlag = false,flow,travleTime,off_gas) {
	lineVector.state=state;
	lineVector.speed=speed;
	lineVector.level=level;
	lineVector.flow=flow;
	lineVector.travleTime=travleTime;
	lineVector.off_gas=off_gas;
	var divMap=$("#map");
	var color;
	//褐红#7E0023 红#FF0000 橙色#FF7E00 黄#FFFF00 绿#00E400
	if(state >=0&&state <6) {
		if(divMap.attr("roadFlag")=="运行状态"||divMap.attr("roadFlag")=="服务水平"||divMap.attr("roadFlag")=="拥堵瓶颈"||divMap.attr("roadFlag")=="饱和程度"||divMap.attr("roadFlag")=="车流密度"||divMap.attr("roadFlag")=="行程车速"||divMap.attr("roadFlag")=="流量"){
			if(state<0){
				color="#cccccc";
			}else{
				var arr = ["#7E0023","#FF0000","#FF7E00","#FFFF00","#00E400","gray"];
				color = arr[state];
			}
		}else if(divMap.attr("roadFlag")=="拥堵路段"){
			if(speed<30){
				color="#7E0023";
			}else{
				color="gray";
			}
			if(state==5){color="gray";}
		}else if(divMap.attr("roadFlag")=="排队长度"){
			if(state==0||state==1){
				color="#00E400";
			}else if(state==2||state==3||state==4){
				color="#7E0023";
			}else if(state==5){
				color="gray";
			}
		}else if(divMap.attr("roadFlag")=="静态安全"||divMap.attr("roadFlag")=="动态安全" ||divMap.attr("roadFlag")=="天气安全"){//第四功能 静态10,动态11,天气安全12
			var arr = ["#FF0000","#FFFF00","#00E400","blue","black","gray"];
			color = arr[state];
		}else if(divMap.attr("roadFlag")=="道路尾气"){
			var arr = ["#7E0023","#FF0000","#FF7E00","#FFFF00","#00E400","gray"];
			color = arr[state];
		}else if(divMap.attr("roadFlag")=="运行状态1"){
			var arr = ["#FF7E00","gray","gray"];
			color = arr[state];
		}
		
	}else if(level > 0) {
		
	}
	else if(speed > 0){

	}
	if(filterFlag){
		color="gray";
	}else if(state==10){
		color="yellow";
	}
	lineVector.style = {
			strokeColor: color,
			fill: false,
			strokeWidth: width
	}
}

function doTrafficTimeData(datanum,layer,data,bFlagRealData)
{
	var divMap=$("#map");
	if( data.entitys.length==0 ){
		for( var item in layer.features ){
			item=layer.features[item];
			if(divMap.attr("roadFlag")=="运行状态1"){
				if(supermap.getZoom()>13){
					setLineProperty1(item,5);
				}else{
					setLineProperty1(item,2);
				}
			}else{
				if(supermap.getZoom()>13){
					setLineProperty1(item,5);
				}else{
					setLineProperty1(item,2);
				}
			}	
		}
	}
	else{
		var _uplimit=$("#uplimit").val();
		var _downlimit=$("#downlimit").val();
		if((_uplimit-_downlimit)<0){
			reviseAlert("上限必须大于下限");
			return;
		}
		for( var i=0;i<data.entitys.length;i++ ){
			for ( var j=0;j<data.entitys[i].length;j+=11 ){
				var item=TL_AllLineMap[datanum+"_"+data.entitys[i][j]];
				//var item=layer.getFeatureById(datanum +"_"+data.entitys[i][j]);
		
				if( item!=undefined ){
					//var lineWidth = popupText(_Width);
					setVectorData(item,data.entitys[i]);
					
					if(divMap.attr("roadFlag")=="运行状态"){
						setLineProperty1(item);
					}else if(divMap.attr("roadFlag")=="拥堵路段"||divMap.attr("roadFlag")=="排队长度"){
						setLineProperty1(item);
					}else if(divMap.attr("roadFlag")=="服务水平"){
						 setLineProperty1(item);
					}else if(divMap.attr("roadFlag")=="饱和程度"){
						setLineProperty1(item,popupText(data.entitys[i][j+2]));
					}else if(divMap.attr("roadFlag")=="车流密度"){
						setLineProperty1(item,popupText(data.entitys[i][j+2]));
					}else if(divMap.attr("roadFlag")=="行程车速"){
						setLineProperty1(item,popupText(data.entitys[i][j+2]));
					}else if(divMap.attr("roadFlag")=="静态安全"||divMap.attr("roadFlag")=="动态安全"||divMap.attr("roadFlag")=="天气安全"){
						if(supermap.getZoom()>14){
							setLineProperty1(item);
						}else{
							setLineProperty1(item);
						}
					}else if(divMap.attr("roadFlag")=="道路尾气"){
						if(supermap.getZoom()>14){
							setLineProperty1(item);
						}else{
							setLineProperty1(item);
						}
					}else if(divMap.attr("roadFlag")=="流量"){
						if(item.flow<=600){
							lineWidth=2;
						}else if(item.flow>600&&item.flow<=1000){
							lineWidth=4;
						}else if(item.flow>1000&&item.flow<=1400){
							lineWidth=6;
						}else if(item.flow>1400&&item.flow<=1800){
							lineWidth=8;
						}else if(item.flow>1800){
							lineWidth=10;
						}
						
						setLineProperty1(item,lineWidth);
					}else if(divMap.attr("roadFlag")=="运行状态1"){
						setLineProperty1(item);
					}
				}
			}
		}	
	}
	layer.setVisibility(true);
	layer.redraw();
	zhao_none(".zhao1",".jd_nodes");
}

function setVectorData(linevector,data){
	var divMap=$("#map");
	if(divMap.attr("roadFlag")=="运行状态"||divMap.attr("roadFlag")=="静态安全"){
		linevector.state=data[1];
		linevector.speed=data[2];
		linevector.travleTime=data[3];
		linevector.flow=data[4];
		linevector.off_gas = { "co2":data[5],"nox":data[6],"co":data[7],"hc":data[8],"pm":data[9],"pm2.5":data[10] };
	}
	else
		linevector.level=data[2];
}

function setLineProperty1(linevector,width) {
	var state,color,speed,divMap=$("#map");
	state=linevector.state;
	speed=linevector.speed;
	if(state >=0&&state <6) {
		if(divMap.attr("roadFlag")=="运行状态"||divMap.attr("roadFlag")=="服务水平"||divMap.attr("roadFlag")=="拥堵瓶颈"||divMap.attr("roadFlag")=="饱和程度"||divMap.attr("roadFlag")=="车流密度"||divMap.attr("roadFlag")=="行程车速"||divMap.attr("roadFlag")=="流量"){
			if(state<0){
				color="#cccccc";
			}else{
				var arr = ["#7E0023","#FF0000","#FF7E00","#FFFF00","#00E400","gray"];
				color = arr[state];
			}
			
			if( (divMap.attr("roadFlag")=="饱和程度"||divMap.attr("roadFlag")=="车流密度"||divMap.attr("roadFlag")=="行程车速") &&
			($("#uplimit").val()<$("#downlimit").val() || (linevector.level<$("#uplimit").val() && linevector.level>$("#downlimit").val() )) )
				color="gray";
			
		}else if(divMap.attr("roadFlag")=="拥堵路段"){
			if(speed<30){
				color="#7E0023";
			}else{
				color="gray";
			}
			if(state==5){color="gray";}
		}else if(divMap.attr("roadFlag")=="排队长度"){
			if(state==0||state==1){
				color="#00E400";
			}else if(state==2||state==3||state==4){
				color="#7E0023";
			}else if(state==5){
				color="gray";
			}
		}else if(divMap.attr("roadFlag")=="静态安全"||divMap.attr("roadFlag")=="动态安全" ||divMap.attr("roadFlag")=="天气安全"){//第四功能 静态10,动态11,天气安全12
			var arr = ["#FF0000","#FFFF00","#00E400","blue","black","gray"];
			color = arr[state];
		}else if(divMap.attr("roadFlag")=="道路尾气"){
			var arr = ["#7E0023","#FF0000","#FF7E00","#FFFF00","#00E400","gray"];
			color = arr[state];
		}else if(divMap.attr("roadFlag")=="运行状态1"){
			color="gray";
		}
	}
	if( linevector.style==null )
		linevector.style = {
			strokeColor: color,
			fill: false,
			strokeWidth: width
		}
	else if( width!=undefined )
		linevector.style["strokeWidth"]=width;
	
	linevector.style["strokeColor"]=color;
}

// 点、线、面移动
function onDragVector(feature,pixel){
   var fea= feature;
    var position = pixel;
    var latlon=supermap.getLonLatFromPixel(pixel);
   latlon=latlon.transform("EPSG:900913", "EPSG:4326" );
	var val=fea.id.split("_")[1]+";"+fea.original_id+";"+latlon.lon+";"+latlon.lat+";"+"'"+fea.name+"'";
    $.ajax({
            url:"GetDevice",
            dataType:"json",
            data:{ "action":"insert","type":500,"val":val},
            contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
            beforeSend:function(){ },
            success: function( data, textStatus, jqXHR ){
                    reviseAlert("修改成功！");
            },
            error:function()
            {
                    
            }
        })
}

// 地图滚轮放大、缩小
function onMouseWheel(layer){
	for( var item in layer.features ){
		item=layer.features[item];
		item.style["strokeWidth"]=getLineWidth( parseInt(layer.name.substring(0,layer.name.indexOf("_"))) );
	
		/*地铁的点滚动*/
		if(layer.name=='markerLayer50'){
			item.style["pointRadius"]=getPointSize();
		}
	}
	
	layer.redraw();
}

function onMouseOver(){
	
}

function popupText(_Width){
	var lineWidth;
	var divMap=$("#map");
	if(divMap.attr("roadFlag") == "饱和程度") {
		if(_Width <= 0.25) {
			lineWidth = 2;
		} else if(_Width > 0.25 && _Width <=0.5) {
			lineWidth = 4;
		} else if(_Width > 0.5 && _Width <=0.75) {
			lineWidth = 6;
		} else if(_Width > 0.75 && _Width <=1) {
			lineWidth = 8;
		} else if(_Width > 1) {
			lineWidth = 10;
		}
	} else if(divMap.attr("roadFlag") == "车流密度") {
		if(_Width <= 10) {
			lineWidth = 2;
		} else if(_Width > 10 && _Width <=20) {
			lineWidth = 4;
		} else if(_Width > 20 && _Width <=30) {
			lineWidth = 6;
		} else if(_Width > 30 && _Width <=50) {
			lineWidth = 8;
		} else if(_Width > 50) {
			lineWidth = 10;
		}
	} else if(divMap.attr("roadFlag") == "行程车速") {
		if(_Width <= 25) {
			lineWidth = 2;
		} else if(_Width > 25 && _Width <= 50) {
			lineWidth = 4;
		} else if(_Width > 50 && _Width <= 75) {
			lineWidth = 6;
		} else if(_Width > 75 && _Width <= 100) {
			lineWidth = 8;
		} else if(_Width > 100) {
			lineWidth = 10;
		}
	}
	return lineWidth;
}
function getLonlatFromMap(arg)
{
	clientX = arg.clientX;
    clientY = arg.clientY;
    //获取浏览器页面的宽度和高度
    var clientWidth = document.body.clientWidth;
    var clientHeight = document.body.clientHeight;
    //获取地图的高度和宽度
    var mapWidth = supermap.size.w;
    var mapHeight = supermap.size.h;
    //当前point的经纬度坐标=传入坐标-(当前页面高度-地图的高度)
    var px = new SuperMap.Pixel(clientX-(clientWidth-mapWidth),clientY-(clientHeight-mapHeight));
    var point = supermap.getLonLatFromPixel(px);
    var x = clientX-(clientWidth-mapWidth);
    var y = clientY-(clientHeight-mapHeight);
    
    return point;
}
//********************************************************************************************** 
function createCommonDialog(title, ind, fields, readonlys, specialDivs, buttons, data, parent, setChart,img,general) {
	if(setChart){
		var option_html = '';
		if(title[2].length>0){
			option_html = '<select id="targetSelect">';
			for(var i=0;i<title[2].length;i++){
				option_html+='<option>'+title[2][i]+'</option>'
			}
			option_html+= '</select>';
		}
		var nr = '<div class="content_kuang environment_Data_statistics jd_nodes"><div class="z_title"><p style="float:none;width:100%;" class="title_left">' + title[0] +
		'<img src="images/min.png" style="cursor:pointer"  class="empty_btn" onclick="zhao_none(\'.zhao_left\',\'.content_kuang\')"></p>'+
		'<ul class="concertMainTitle_ul">'+
		      	'<li class="mainUl_li1">'+
		        '<span>'+ title[1] +'</span>'+
		           option_html+
		        '</li>'+
		        '<li class="mainUl_li7 titleLi1">'+//'+title1+'
		          '<span>统计开始日期</span>'+
		          '<input type="text" value="2016-04-01 00:00:00" id="concertDay" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD\'})"/>'+
		        '</li>'+
		       '<li class="mainUl_li7 titleLi1">'+//'+title1+'
		          '<span>统计结束日期</span>'+
		          '<input type="text" value="2016-04-01 00:00:00" id="concertDay" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD\'})"/>'+
		        '</li>'+
		        '<li class="mainUl_li3"><input type="button" class="concertMainTitle_ul_btn" value="确定"/></li>'+
		      '</ul>'+
		'</div>' +
		'<div class="content">' +
		'<div id="chart" class="content_left chart"></div>' +
		'<div class="content_right"><p class="title_right" style="color:white;font-size: 14px;">' + title[3] + '</p>' +
		'<ul class="node_ul nodeHeight" style="overflow-y:auto;max-height:430px;">';
	}else if(img){
		var imgName;
		if(ind==5){
			imgName=1;
		}else if(ind==6){
			imgName=2;
		}else if(ind==7){
			imgName=3;
		}else if(ind==8){
			imgName=5;
		}else if(ind==9){
			imgName=6;
		}else if(ind==10){
			imgName=7;
		}else if(ind==11){
			imgName=8;
		}
		var nr='<div class="equipmentFrame jd_nodes">'+
			'<p class="tj_title">'+title[0]+
				'<img src="images/min.png" class="empty_btn" style="cursor:pointer" onclick="onCancelProperty2('+ind+'),zhao_none(\'.zhao_left\',\'.jd_nodes\')" />'+
			'</P>'+
			'<div class="equipmentImg" >'+
                '<div class="imgnum">'+
                  '<input type="file" class="filepath" onchange="changeImgs(this)"/>'+
                  '<img src="images/set/'+imgName+'.png" class="original_img1" />'+
                  '<img src="" class="change_img2" style="display:none"/>'+
                 '</div>'+
            '</div>'+
            '<div class="equipment_Information" >'+
                '<p class="tj_title titleName" style="color:white;font-size: 14px;">' + title[1] + '</p>'+
            	'<ul class="node_ul nodeHeight1" style="overflow-y:auto;max-height:430px;">';
		'</div>';
	}else if(general){
		var nr ='<div id="jd_nodes" class="jd_nodes" style="overflow:hidden">'+
		'<p class="tj_title">'+title[0]+
		'<img src="images/min.png" class="empty_btn" style="cursor:pointer" onclick="onCancelProperty2('+ind+'),zhao_none(\'.zhao_left\',\'.jd_nodes\')" />'+
		'</P>'+
		'<ul class="node_ul" style="overflow-y:auto;max-height:430px">';
	}
	setCommonDialogContext(nr, fields, readonlys, specialDivs, buttons, data, parent,setChart ,ind,general,img);
	//弹窗高度
	if($(".node_bt").length > 0) {
		if(ind==6){
			var divHeight = fields.length / 2 * 25 + 30 + 40 + 134 + "px"; //有修改按钮 134是路段车检器后加多出的高度部分
		}else if(ind==29){
			var divHeight = fields.length / 2 * 25 + 30 + 40 + 30 + "px";
		}else{
			var divHeight = fields.length / 2 * 25 + 30 + 40 + "px"; //有修改按钮
		}
	}else {
		var divHeight = fields.length / 2 * 25 + 40 + "px";
	}
	if(setChart) {
		var divHeight = "528px";
		$(".jd_nodes").css("width", "1000px");
		$(".environment_Data_statistics").css({"height":"528px"});
		redrawChartsIndex(setChart);
	}else if(img){
		$(".equipmentFrame").css({"height":"380px"});
		if(ind==5||ind==6||ind==7||ind==8||ind==9||ind==10||ind==11){$(".nodeHeight1").css({"height":"161px"});$(".node_ul li select").css({"width":"128px"})}
	}else if(general){
		$(".jd_nodes").css("height", divHeight);
	}
}
function redrawChartsIndex(chart) {
	myChart = echarts.init(document.getElementById(chart.id));
	var series = [],xAxis = [],yAxis = [];
	for(var i=0;i<chart.series.length;i++){
		var obj = {
            name:chart.series[i][0],
            type:chart.series[i][1],
            yAxisIndex: chart.series[i][2],
            data:chart.series[i][3]
        };
        series.push(obj);
	};
	for(var i =0;i<chart.xAxis.length;i++){
		var obj = {
			type: chart.xAxis[i][0],
			name:chart.xAxis[i][1],
			min:chart.xAxis[i][2],
        	max:chart.xAxis[i][3],
//      	formatter: chart.xAxis[i][5],
            splitLine: {
            	show: chart.xAxis[i][4]
        	}
		}
		if(chart.xAxis[i][6].length>0){
			obj["data"] = chart.xAxis[i][6]
		}
		xAxis.push(obj);
	}
	for(var i =0;i<chart.yAxis.length;i++){
		var obj = {
			type: chart.yAxis[i][0],
			name:chart.yAxis[i][1],
			min:chart.yAxis[i][2],
        	max:chart.yAxis[i][3],
            splitLine: {
            	show: chart.yAxis[i][4]
        	}
		}
		if(chart.yAxis[i][5]){
			obj["axisLabel"] = {
                formatter: chart.yAxis[i][5]
            }
		}
		yAxis.push(obj);
	}
	optionUp = {
		backgroundColor: "#fff",
		color:chart.color,
		legend: {
			data: chart.legend_data
		},
		tooltip: {
			trigger: 'axis'
		},
		toolbox: {
			feature: {
				saveAsImage: {
					pixelRatio: 2
				}
			}
		},
		grid: chart.grid,
		xAxis:xAxis,
		yAxis:yAxis,
		series:series
	};
	myChart.setOption(optionUp, true);
}
//**********************************************************************************************
function setCommonDialogContext(head,fields,readonlys,specialDivs,buttons,data,parent,setChart,ind,general,img)
{
	var ss,lonlat;
	ss=getCurMarkerLonlat();
	lonlat=new SuperMap.LonLat(ss.lon,ss.lat);
	lonlat.transform("EPSG:900913", "EPSG:4326" );
	
	var nr=head;
	for(var i=0;i<fields.length;i+=2){
		if( fields[i]=='经度坐标' )
			ss=lonlat.lon.toFixed(6);
		else if( fields[i]=='纬度坐标' )
			ss=lonlat.lat.toFixed(6);
		else if( fields[i]=='绕行路段1'||fields[i]=='01类收费' )
			ss=data[fields[i+1]].split(",")[0];
		else if( fields[i]=='绕行路段2'||fields[i]=='02类收费' )
			ss=data[fields[i+1]].split(",")[1];
		else if( fields[i]=='绕行路段3'||fields[i]=='03类收费' )
			ss=data[fields[i+1]].split(",")[2];
		else if( fields[i]=='04类收费' )
			ss=data[fields[i+1]].split(",")[3];
		else
			ss=data[fields[i+1]];
		
		nr+='<li><span>'+fields[i]+'</span><input id="attr'+(i/2)+'" type="text" name="" data="'+ss+'" value="'+ss+'"/></li>';
	}
	if(setChart){
		if(ind==6){
		var roadNum=data[3].split(",");
		var roadName=data[1].split(",");
		if(roadNum[0]==undefined)roadNum[0]='无数据';
		else if(roadNum[1]==undefined)roadNum[1]='无数据';
		if(roadName[0]==undefined)roadName[0]='无数据';
		else if(roadName[1]==undefined)roadName[1]='无数据';
		nr+='<li><span>00方向信息</span></li>'+
			'<li><span>路段编号</span><input id="attr7" readonly="readonly"  type="text" name="" value="'+roadNum[0]+'"/></li>'+
			'<li><span>路段名称</span><input id="attr8" readonly="readonly"  type="text" name="" value="'+roadName[0]+'"/></li>'+
			'<li><span>01方向信息</span></li>'+
			'<li><span>路段编号</span><input id="attr10" readonly="readonly"  type="text" name="" value="'+roadNum[1]+'"/></li>'+
			'<li><span>路段名称</span><input id="attr11" readonly="readonly"  type="text" name="" value="'+roadName[1]+'"/></li>';
		}
	}else if(img){
		if(ind==6){
		var roadNum=data[3].split(",");
		var roadName=data[1].split(",");
		if(roadNum[0]==undefined)roadNum[0]='无数据';
		else if(roadNum[1]==undefined)roadNum[1]='无数据';
		if(roadName[0]==undefined)roadName[0]='无数据';
		else if(roadName[1]==undefined)roadName[1]='无数据';
		nr+='<li><span>00方向信息</span></li>'+
			'<li><span>路段编号</span><input id="attr7" readonly="readonly"  type="text" name="" value="'+roadNum[0]+'"/></li>'+
			'<li><span>路段名称</span><input id="attr8" readonly="readonly"  type="text" name="" value="'+roadName[0]+'"/></li>'+
			'<li><span>01方向信息</span></li>'+
			'<li><span>路段编号</span><input id="attr10" readonly="readonly"  type="text" name="" value="'+roadNum[1]+'"/></li>'+
			'<li><span>路段名称</span><input id="attr11" readonly="readonly"  type="text" name="" value="'+roadName[1]+'"/></li>'+
			'<li><span>供电类型</span><input id="attr12" readonly="readonly"  type="text" name="" value="太阳能"/></li>'+
			'<li><span>通信连接</span><input id="attr13" readonly="readonly"  type="text" name="" value="127.1.2.12"/></li>';
		}
	}
	
	if( buttons.length<1 ){
		if(setChart){
			if(ind==6||ind==7||ind==8||ind==9){//增加导出图表按钮，导出数据按钮
			nr+='</ul><ul class="ul_btFrame"><li><input type="button" value="导出数据"/><input type="button" value="导出图表"/></li></ul>';
			}	
		}else{
			nr+= '</ul></div>';
		}
	}
	else{
		if(img){
			if(ind==5||ind==6||ind==7||ind==8||ind==9||ind==10||ind==11){
				nr+='</ul>'+
					'<p class="p_titl">设备运维信息</p>'+
					'<ul class="node_ul">'+
						'<li><span>运行状态</span><input id="attrData1"  type="text" name="" value=""/></li>'+
						'<li><span>维护周期</span><input id="attrData2"  type="text" name="" value=""/></li>'+
						'<li><span>上次维护</span><input id="attrData3"  type="text" name="" value=""/></li>'+
						'<li><span>维护备注</span><input id="attrData4"  type="text" name="" value=""/></li>'+
					'</ul>'+
					'<p class="node_bt">';
			}
		}else{
			nr+= '</ul><p class="node_bt">';
		}
		for( i=0;i<buttons.length;i+=2 )
		
		nr+='<input class="jd_nodes_btn btn1" type="button" name="button" data="'+data+'" onclick="'+buttons[i+1]+'" value="'+buttons[i]+'"/>';
		nr+='</p></div>';
	}
	if(setChart){
		nr+='</div></div></div>';
	}
	if(img){
		nr+='</div></div>';
	}
	$(parent).append(nr);
	if(ind==29){
		addTextarea(data);
	}else if(ind==30){
		addchargeTime(data);
	}
	
	if(setChart){
		divDrag('.title_left','.content_kuang');
	}else{
		divDrag('.tj_title','.jd_nodes');    
	}
	    
	//readonly
	for(var x=0;x<readonlys.length;x++)
		$("#attr"+(readonlys[x])).attr("readonly","readonly");

	var divParent;
	for( var item in specialDivs ){
		if( item == 1 ){ // 时间控件
			for( x=0;x<specialDivs[item]["li"].length;x++ ){
				var ab=specialDivs[item]["li"][x];
				if(ind==29||ind==30){
					var valTime="jeDate({dateCell:\'#attr"+specialDivs[item]["li"][x]+"\',isTime:true,format:\'YYYY-MM-DD\'})";//时间控件
				}else{
					var valTime="jeDate({dateCell:\'#attr"+specialDivs[item]["li"][x]+"\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})";//时间控件
				}
            	$("#attr"+specialDivs[item]["li"][x]).attr("onclick",valTime);
			}
		}else if( item == 2 ){ // select
			for( x=0;x<specialDivs[item]["li"].length;x++ ){
				nr="";
				divParent=$("#attr"+specialDivs[item]["li"][x]).parent();
				$("#attr"+specialDivs[item]["li"][x]).remove();
				for( i=0;i<specialDivs[item]["co"][x].length;i++ )
					nr+='<option>'+specialDivs[item]["co"][x][i]+'</option>';
				
				var ab='<select id="attr'+(specialDivs[item]["li"][x])+'">'+nr+'</select>';
				divParent.append('<select id="attr'+(specialDivs[item]["li"][x])+'">'+nr+'</select>');
				if(fields[6]=='限行类型'){
					$("#attr"+(specialDivs[item]["li"][0])+" "+"option").eq(data[11].split(",")[0]).attr("selected",true);
					$("#attr"+(specialDivs[item]["li"][1])+" "+"option").eq(data[12].split(",")[0]).attr("selected",true);
				}else if(fields[6]=='控制类型'){
					$("#attr"+(specialDivs[item]["li"][x])+" "+"option").eq(data[5].split(",")[x]).attr("selected",true);
				}else{
					$("#attr"+(specialDivs[item]["li"][x])+" "+"option").eq(data[12].split(",")[x]).attr("selected",true);
				}
				
			}
		}
		else if( item == 3 ){ // 
			var selectParent;
			for( x=0;x<specialDivs[item]["li"].length;x++ ){
				nr="";
				divParent=$("#attr"+specialDivs[item]["li"][x]).parent();
				$("#attr"+specialDivs[item]["li"][x]).remove();
				for( i=0;i<specialDivs[item]["co"].length;i++ ){
					nr += '<label style="display:inline-block;margin-right:5px" for="select_'+(specialDivs[item]["li"][x])+
					'"><input style="width:13px;height:13px;" type="checkbox" id="check_'+(specialDivs[item]["li"][x])+
					'">'+specialDivs[item]["co"][i]+'</label>';
				}
				divParent.append('<li class="js-checkList" style="float: right;width: 153px;">'+nr+"</li>");
			}
		}
	}
}
/**********dtjt&&index公用的部分**********/
function initTimeline(bFlagTime0,bFlagTime1,bFlagRealData,period = 60,minus){
 		var realtime,curTime,pos,span=15;
 		var divMap=$("#map");
 		curTime=(new Date().getTime()/1000%86400 + 8*60*60)/60;
 		if( bFlagTime0==1 ){
 			realtime=curTime;
 		}else if(bFlagTime0==2){
 			if(minus){
 				realtime=parseInt($("#myTimeline").val())-parseInt($("#myTimeline").attr('span'));
 			}else{
 				realtime=parseInt($("#myTimeline").val())+parseInt($("#myTimeline").attr('span'));
 			}
 		}else if(bFlagTime0==0){
 			realtime=parseInt($("#myTimeline").val());
 		}
 		
 		if( realtime > 1440 ) realtime=1440;
 		else if( realtime < 0 ) realtime=0;
 		
 		if( realtime>=0 && realtime <=1440 ){//&& realtime <= (curTime+120)
 	 		pos=$("#myTimeline").attr('step')*parseInt(realtime/$("#myTimeline").attr('span'));
 			//pos=$("#myTimeline").attr('step')*parseInt(realtime);
 	 		$("#yb").css("margin-left",pos-3+"px");
 	 		
 	 		$("#myTimeline").val( realtime );
 	 		updateTimes();
 	 		var time = timeChange(Math.floor(realtime/60))+":"+timeChange(Math.floor(realtime%60/span)*span)+":"+"00";
 	 		var spacingTime=realtime+span;
			var afterTime =  timeChange(Math.floor(spacingTime/60))+":"+timeChange(Math.floor(spacingTime%60/span)*span)+":"+"00";
 	 		if(parseInt($("#yb")[0].offsetLeft)>=parseInt($(".f_mid").width()-200)){
 	 			$('.f_mid').scrollLeft(600);
 	 		}else{
 	 			$('.f_mid').scrollLeft(0);
 	 		}
 	 		if(divMap.attr("roadFlag")=="拥堵瓶颈"){//part3交通瓶颈
 	 			hiddenLayer();
	 	 		circle();
	 	 		var PointVector =supermap.getLayersByName("PointVector")[0];//交通瓶颈
    			PointVector.setVisibility(true);
	 	 	}else if(divMap.attr("roadFlag")=="单点"||divMap.attr("roadFlag")=="协调"){
	 	 		removeVetor();
	 	 		deng();
	 	 	}else if(divMap.attr("roadFlag")=="需求分布"){
	 	 		ajax_OdPoint();
	 	 		getOdline("'"+$("#DD").text()+" "+"00:00:00"+"',"+ -1);
	 	 	}else if(divMap.attr("roadFlag")=="路口尾气"){
	 	 		queryCrosshotMap();
	 	 	}
 	 		if( bFlagRealData>=1 ){
 	 			if(bFlagRealData==1){
					queryRealData(($("#DD").text()+","+parseInt(realtime)),bFlagRealData);
				}else if(bFlagRealData==31){
					queryRealData(($("#DD").text()+","+parseInt(realtime)),bFlagRealData);
				}
				if(divMap.attr("roadFlag")=="交通"&&bFlagRealData==70 ){
					subwayPointData(bFlagRealData);
				}else{
					if(bFlagRealData==40||bFlagRealData==50||bFlagRealData==60||bFlagRealData==70){
						queryRealData(("'"+'2016-04-01 '+time+"','"+'2016-04-01 '+afterTime+"'"),bFlagRealData);
					}
				}
				
				if(bFlagRealData==2){
 	 				var pa="'"+'2016-04-01 '+time+"'";
 	 				VillageState_Ajax(pa);
 	 			}
 	 		}

 	 		if(  bFlagTime1==1 ){
 	 			if( TL_TimeID!=undefined  ){
 	 				clearTimeout(TL_TimeID);
 	 			}
 	 			// TL_TimeID=setTimeout(function(){ initTimeline();}, 60 * 1000);
 	 			if(divMap.attr("roadFlag")=="拥堵水平"){
		    		TL_TimeID=setTimeout(function(){initTimeline(bFlagTime0,1,0,period);}, period * 1000);
		    	}else if(divMap.attr("roadFlag")=="运行状态"||divMap.attr("roadFlag")=="拥堵路段"||divMap.attr("roadFlag")=="服务水平"||divMap.attr("roadFlag")=="流量"||divMap.attr("roadFlag")=="动态安全"||divMap.attr("roadFlag")=="天气安全"||divMap.attr("roadFlag")=="道路尾气"||divMap.attr("roadFlag")=="热谱地图"||divMap.attr("roadFlag")=="冰点预测"||divMap.attr("roadFlag")=="路面状况"){
		    		TL_TimeID=setTimeout(function(){initTimeline(bFlagTime0,1,1,period); }, period * 1000); 
		    	}else if(divMap.attr("roadFlag")=="饱和程度"){
		    		TL_TimeID=setTimeout(function(){initTimeline(bFlagTime0,1,50,period); }, period * 1000); 
		    	}else if(divMap.attr("roadFlag")=="车流密度"){
		    		TL_TimeID=setTimeout(function(){initTimeline(bFlagTime0,1,60,period);}, period * 1000);  
		    	}else if(divMap.attr("roadFlag")=="行程车速"){
		    		TL_TimeID=setTimeout(function(){initTimeline(bFlagTime0,1,70,period);}, period * 1000);  
		    	}else if(divMap.attr("roadFlag")=="单点"||divMap.attr("roadFlag")=="协调"){
		    		TL_TimeID=setTimeout(function(){initTimeline(bFlagTime0,1); }, period * 1000);
		    	}else if(divMap.attr("roadFlag")=="静态安全"){
		    		TL_TimeID=setTimeout(function(){initTimeline(bFlagTime0,0,1,period);}, period * 1000);  
		    	}else if(divMap.attr("roadFlag")=="需求分布"||divMap.attr("roadFlag")=="路口尾气"||divMap.attr("roadFlag")=="拥堵瓶颈"){
		    		TL_TimeID=setTimeout(function(){initTimeline(bFlagTime0,1,'',period);}, period * 1000);  
		    	}
 	 		}
 		}
 	}
 
function updateTimes(){
	$("time").html(
		String(parseInt($("#myTimeline").val()/60)<10?"0":"")
		+
		String(parseInt($("#myTimeline").val()/60))
		+ ':' + 
		String(parseInt($("#myTimeline").val()%60/$("#myTimeline").attr('span'))*$("#myTimeline").attr('span')<10?"0":"")
		+
		String(parseInt($("#myTimeline").val()%60/$("#myTimeline").attr('span'))*$("#myTimeline").attr('span'))
	);
}


$(document).ready(function() { 
	var date=new Date();
	var yy=date.getFullYear();
	var yue=date.getMonth()+1;
	var ri=date.getDate();
	// var divTxt=document.getElementById("DD");
	// // divTxt.innerHTML=yy+"-"+timeChange(yue)+"-"+timeChange(ri);
	// divTxt.innerHTML='2016-04-01';
	
	//地图高度
	var High=document.body.clientHeight;
	document.getElementById('map').style.height=High+'px';

	//时间轴部分
	$("#myTimeline").attr('step',4);
	$("#myTimeline").attr('span',5);
    // initTimeline(1,1,1);
	
    
    $("#myTimeline").click(function(e){
    	var divMap=$("#map");
    	var mouseLeft=e.pageX;
    	var lineLeft=document.getElementById('myTimeline');
    	var ybLeft=mouseLeft-lineLeft.offsetLeft;
    	realtime=parseInt(1.25*(ybLeft+4)+0.5);
    	$("#myTimeline").val( realtime );
    	// bFlagTime[0]=0;
    	if(divMap.attr("roadFlag")=="拥堵水平"){
    		initTimeline(2,1,0);
    	}else if(divMap.attr("roadFlag")=="运行状态"||divMap.attr("roadFlag")=="拥堵路段"||divMap.attr("roadFlag")=="服务水平"||divMap.attr("roadFlag")=="流量"||divMap.attr("roadFlag")=="动态安全"||divMap.attr("roadFlag")=="天气安全"||divMap.attr("roadFlag")=="道路尾气"||divMap.attr("roadFlag")=="热谱地图"||divMap.attr("roadFlag")=="冰点预测"||divMap.attr("roadFlag")=="路面状况"){
    		initTimeline(2,1,1);  
    	}else if(divMap.attr("roadFlag")=="饱和程度"){
    		initTimeline(2,1,50);  
    	}else if(divMap.attr("roadFlag")=="车流密度"){
    		initTimeline(2,1,60);  
    	}else if(divMap.attr("roadFlag")=="行程车速"){
    		initTimeline(2,1,70);  
    	}else if(divMap.attr("roadFlag")=="单点"||divMap.attr("roadFlag")=="协调"){
    		initTimeline(2,1); 
    	}else if(divMap.attr("roadFlag")=="静态安全"){
    		initTimeline(2,0,1);  
    	}else if(divMap.attr("roadFlag")=="需求分布"||divMap.attr("roadFlag")=="路口尾气"||divMap.attr("roadFlag")=="拥堵瓶颈"){
    		initTimeline(2,1);  
    	}
    	
    });

    
	$('#rule').on("change",function(){
		var divMap=$("#map");
		var steps=4,span=5; 
		if( $("#rule").get(0).selectedIndex==0 ){
			steps=4;span=5;
		}
		else if( $("#rule").get(0).selectedIndex==1 ){
			steps=8;span=10;
		}
		else if( $("#rule").get(0).selectedIndex==2 ){
			steps=24;span=30;
		}
		else if( $("#rule").get(0).selectedIndex==3 ){
			steps=48;span=60;
		}
		$("#myTimeline").attr('step',steps);
		$("#myTimeline").attr('span',span);
		if(divMap.attr("roadFlag")=="拥堵水平"){
    		initTimeline(2,1,0);
    	}else if(divMap.attr("roadFlag")=="运行状态"||divMap.attr("roadFlag")=="拥堵路段"||divMap.attr("roadFlag")=="服务水平"||divMap.attr("roadFlag")=="流量"||divMap.attr("roadFlag")=="动态安全"||divMap.attr("roadFlag")=="天气安全"||divMap.attr("roadFlag")=="道路尾气"||divMap.attr("roadFlag")=="热谱地图"||divMap.attr("roadFlag")=="冰点预测"||divMap.attr("roadFlag")=="路面状况"){
    		initTimeline(2,1,1);  
    	}else if(divMap.attr("roadFlag")=="饱和程度"){
    		initTimeline(2,1,50);  
    	}else if(divMap.attr("roadFlag")=="车流密度"){
    		initTimeline(2,1,60);  
    	}else if(divMap.attr("roadFlag")=="行程车速"){
    		initTimeline(2,1,70);  
    	}else if(divMap.attr("roadFlag")=="单点"||divMap.attr("roadFlag")=="协调"){
    		initTimeline(2,1); 
    	}else if(divMap.attr("roadFlag")=="静态安全"){
    		initTimeline(2,0,1);  
    	}else if(divMap.attr("roadFlag")=="需求分布"||divMap.attr("roadFlag")=="路口尾气"||divMap.attr("roadFlag")=="拥堵瓶颈"){
    		initTimeline(2,1);  
    	}
	});
	$("#reduce_btn").on('click',function(){
		var divMap=$("#map");
		if(divMap.attr("roadFlag")=="拥堵水平"){
    		initTimeline(2,1,0,60,1);
    	}else if(divMap.attr("roadFlag")=="运行状态"||divMap.attr("roadFlag")=="拥堵路段"||divMap.attr("roadFlag")=="服务水平"||divMap.attr("roadFlag")=="流量"||divMap.attr("roadFlag")=="动态安全"||divMap.attr("roadFlag")=="天气安全"||divMap.attr("roadFlag")=="道路尾气"||divMap.attr("roadFlag")=="热谱地图"||divMap.attr("roadFlag")=="冰点预测"||divMap.attr("roadFlag")=="路面状况"){
    		initTimeline(2,1,1,60,1);  
    	}else if(divMap.attr("roadFlag")=="饱和程度"){
    		initTimeline(2,1,50,60,1);  
    	}else if(divMap.attr("roadFlag")=="车流密度"){
    		initTimeline(2,1,60,60,1);  
    	}else if(divMap.attr("roadFlag")=="行程车速"){
    		initTimeline(2,1,70,60,1);  
    	}else if(divMap.attr("roadFlag")=="单点"||divMap.attr("roadFlag")=="协调"){
    		initTimeline(2,1,-1,60,1); 
    	}else if(divMap.attr("roadFlag")=="静态安全"){
    		initTimeline(2,0,1,60,1);  
    	}else if(divMap.attr("roadFlag")=="需求分布"||divMap.attr("roadFlag")=="路口尾气"||divMap.attr("roadFlag")=="拥堵瓶颈"){
    		initTimeline(2,1,'',60,1);  
    	}
	});
	$("#vernier_time,#ls_enter").on('click',function(){
		var divMap=$("#map");
		if(divMap.attr("roadFlag")=="拥堵水平"){
    		initTimeline(1,1,0);
    	}else if(divMap.attr("roadFlag")=="运行状态"||divMap.attr("roadFlag")=="拥堵路段"||divMap.attr("roadFlag")=="服务水平"||divMap.attr("roadFlag")=="流量"||divMap.attr("roadFlag")=="动态安全"||divMap.attr("roadFlag")=="天气安全"||divMap.attr("roadFlag")=="道路尾气"||divMap.attr("roadFlag")=="热谱地图"||divMap.attr("roadFlag")=="冰点预测"||divMap.attr("roadFlag")=="路面状况"){
    		initTimeline(1,1,1);  
    	}else if(divMap.attr("roadFlag")=="饱和程度"){
    		initTimeline(1,1,50);  
    	}else if(divMap.attr("roadFlag")=="车流密度"){
    		initTimeline(1,1,60);  
    	}else if(divMap.attr("roadFlag")=="行程车速"){
    		initTimeline(1,1,70);  
    	}else if(divMap.attr("roadFlag")=="单点"||divMap.attr("roadFlag")=="协调"){
    		initTimeline(1,1); 
    	}else if(divMap.attr("roadFlag")=="静态安全"){
    		initTimeline(1,0,1);  
    	}else if(divMap.attr("roadFlag")=="需求分布"||divMap.attr("roadFlag")=="路口尾气"||divMap.attr("roadFlag")=="拥堵瓶颈"){
    		initTimeline(1,1);  
    	}
	});
	$("#yc_enter").on('click',function(){
		var divMap=$("#map");
		if(divMap.attr("roadFlag")=="拥堵水平"){
    		initTimeline(2,1,0,5);
    	}else if(divMap.attr("roadFlag")=="运行状态"||divMap.attr("roadFlag")=="拥堵路段"||divMap.attr("roadFlag")=="服务水平"||divMap.attr("roadFlag")=="流量"||divMap.attr("roadFlag")=="动态安全"||divMap.attr("roadFlag")=="天气安全"||divMap.attr("roadFlag")=="道路尾气"||divMap.attr("roadFlag")=="热谱地图"||divMap.attr("roadFlag")=="冰点预测"||divMap.attr("roadFlag")=="路面状况"){
    		initTimeline(2,1,1,5);  
    	}else if(divMap.attr("roadFlag")=="饱和程度"){
    		initTimeline(2,1,50,5);  
    	}else if(divMap.attr("roadFlag")=="车流密度"){
    		initTimeline(2,1,60,5);  
    	}else if(divMap.attr("roadFlag")=="行程车速"){
    		initTimeline(2,1,70,5);  
    	}else if(divMap.attr("roadFlag")=="单点"||divMap.attr("roadFlag")=="协调"){
    		initTimeline(2,1,-1,5); 
    	}else if(divMap.attr("roadFlag")=="静态安全"){
    		initTimeline(2,0,1);  
    	}else if(divMap.attr("roadFlag")=="需求分布"||divMap.attr("roadFlag")=="路口尾气"||divMap.attr("roadFlag")=="拥堵瓶颈"){
    		initTimeline(2,1,'',5);  
    	}
	});
	$("#yc").on('click',function(){
		var divMap=$("#map");
		if(divMap.attr("roadFlag")=="拥堵水平"){
    		initTimeline(2,1,0);
    	}else if(divMap.attr("roadFlag")=="运行状态"||divMap.attr("roadFlag")=="拥堵路段"||divMap.attr("roadFlag")=="服务水平"||divMap.attr("roadFlag")=="流量"||divMap.attr("roadFlag")=="动态安全"||divMap.attr("roadFlag")=="天气安全"||divMap.attr("roadFlag")=="道路尾气"||divMap.attr("roadFlag")=="热谱地图"||divMap.attr("roadFlag")=="冰点预测"||divMap.attr("roadFlag")=="路面状况"){
    		initTimeline(2,1,1);  
    	}else if(divMap.attr("roadFlag")=="饱和程度"){
    		initTimeline(2,1,50);  
    	}else if(divMap.attr("roadFlag")=="车流密度"){
    		initTimeline(2,1,60);  
    	}else if(divMap.attr("roadFlag")=="行程车速"){
    		initTimeline(2,1,70);  
    	}else if(divMap.attr("roadFlag")=="单点"||divMap.attr("roadFlag")=="协调"){
    		initTimeline(2,1); 
    	}else if(divMap.attr("roadFlag")=="静态安全"){
    		initTimeline(2,0,1);  
    	}else if(divMap.attr("roadFlag")=="需求分布"||divMap.attr("roadFlag")=="路口尾气"||divMap.attr("roadFlag")=="拥堵瓶颈"){
    		initTimeline(2,1);  
    	}
	});

	
	
	$(".roadUl1 p,.roadUl2 p,.roadUl3 p,.roadUl4 p,.roadUl5 p,.roadUl6 p").click(function(){//dtjt 第一功能里左侧按钮的切换
		$(this).css("background-color","red").parent().siblings("li").children("p").css("background-color","#0B3893");
	})
 	//时间刻度弹出
    $(".more").click(function(event){
		 $("#rule").toggle();
		 event.stopPropagation();
	});
	$("#rule").click(function(event){
		 event.stopPropagation();		 
	});
	$("#rule").change(function(){
		 $("#rule").css("display","none");
	});
	function f_tiao(){
		if($("#footer").width()<1300){//当f_mid宽度小于1000时出现滚动条，热度条上移
		$(".f_mid").css({"width":"900px"}).addClass('yincang');
		$("#myTimeline").addClass('Timeline');
	}
	if($("#footer").width()>1300){
		$(".f_mid").css({"width":"1152px"}).removeClass('yincang');
		$("#myTimeline").removeClass('Timeline');
	};
	}
	f_tiao();
});


function legend(){
	$(".describeFrame").css("display","block");
	$(".filter_density,.filter_saturation,.filter_speed").css("display","none");
	$(".describeFrame_serve,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
}
//时间补位
function timeChange(num){
    var num=num+"";
    return num=num.length>1?num:0+num;
}