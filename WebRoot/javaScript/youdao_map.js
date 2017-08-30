var allGroup = {};
var id = "";
var ID;
var beforeZone = [];
//创建EventUtil对象
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
$(document).ready(function() { 
    ratioHeight('leadFrame','leadLayer',6,1,6);
    ratioHeight('leadFrame','leadList',2,1,6);
    ratioHeight('leadFrame','leadData',4,1,6);
    $(".environmentLayer_Ul_u1 li input").click(function(){
        if($(this).prop("checked")==true){
             $(this).parent().css("color","red");
        }else{
             $(this).parent().css("color","#000");
        }
    })
    $(".environmentLayer_Ul_p").click(function(){
        $(this).next("ul").fadeToggle();
    })
    
    $("#Layer_ipt1").click(function(){
        if($(this).prop("checked") == true){
            marker0.setVisibility(true);
            marker0.clearMarkers();
            queryLeadMarkerStation();
        }else{
            marker0.setVisibility(false);
        }
    })
    $("#Layer_ipt2").click(function(){
        if($(this).prop("checked") == true){
            marker1.setVisibility(true);
            marker1.clearMarkers();
            marker2.setVisibility(true);
            marker2.clearMarkers();
            marker3.setVisibility(true);
            marker3.clearMarkers();
            marker4.setVisibility(true);
            marker4.clearMarkers();
            policedata();ProwlCardata();Busdata();Othersdata();
        }else{
            marker1.setVisibility(false);
            marker2.setVisibility(false);
            marker3.setVisibility(false);
            marker4.setVisibility(false);
        }
    })
});
$(window).resize(function(){
    ratioHeight('leadFrame','leadLayer',6,1,6); 
    ratioHeight('leadFrame','leadList',2,1,6);
    ratioHeight('leadFrame','leadData',4,1,6);
});
function zhao_none(a,b){
    $(a).css("display","none");
    $(b).remove();
}
function changeFooterImg(num){//页面下方图标点击事件 
    $(".replace img").each(function(i,n){
        $(this).attr("src","images/logo/leadBlue/"+(i+1)+".png");//修改点击的那张图
        if(num==1){
            $(".replace .li"+num+" img").attr("src","images/logo/leadRed/1.png").css({"width":"40px","height":"40px","margin-top":"6px"});
            $(".replace .li2 img,.replace .li3 img").css({"width":"50px","height":"50px","margin-top":"0px"});
            $(".replace .li4 img").css({"width":"40px","height":"40px","margin-top":"0px","margin-top": "6px"});
            $(".roadUl1").css({"display":"block"});
            $(".roadUl2,.roadUl3,.roadUl4").css({"display":"none"});
        }else if(num==2){
            $(".replace .li"+num+" img").attr("src","images/logo/leadRed/2.png").css({"width":"40px","height":"40px","margin-top":"6px"});
            $(".replace .li3 img").css({"width":"50px","height":"50px","margin-top":"0px"});
            $(".replace .li1 img,.replace .li4 img").css({"width":"40px","height":"40px","margin-top":"0px","margin-top": "6px"});
            $(".roadUl2").css({"display":"block"});
            $(".roadUl1,.roadUl3,.roadUl4").css({"display":"none"});
        }
        else if(num==3){
            $(".replace .li"+num+" img").attr("src","images/logo/leadRed/3.png").css({"width":"40px","height":"40px","margin-top":"6px"});
            $(".replace .li2 img").css({"width":"50px","height":"50px","margin-top":"0px"});
            $(".replace .li1 img,.replace .li4 img").css({"width":"40px","height":"40px","margin-top":"0px","margin-top": "6px"});
            $(".roadUl3").css({"display":"block"});
            $(".roadUl1,.roadUl2,.roadUl4").css({"display":"none"});
        }
        else if(num==4){
            $(".replace .li"+num+" img").attr("src","images/logo/leadRed/4.png").css({"width":"40px","height":"40px","margin-top":"6px"});
            $(".replace .li2 img,.replace .li3 img").css({"width":"50px","height":"50px","margin-top":"0px"});
            $(".replace .li1 img").css({"width":"40px","height":"40px","margin-top":"0px","margin-top": "6px"});
            $(".roadUl4").css({"display":"block"});
            $(".roadUl1,.roadUl2,.roadUl3").css({"display":"none"});
        }
    });
    var vector =supermap.getLayersByName("markerLayer2")[0];
    vector.setVisibility(false);
    $(".roadStates_ul li p").css("background-color","#0B3893");
    firstShow(num);
    hiddenLayer();
    changelistFilter(num);//切换与中间筛选内容
}
function hiddenLayer(){
    var villageVector =supermap.getLayersByName("markerLayer3")[0];//小区
    var PointVector =supermap.getLayersByName("PointVector")[0];//交通瓶颈
    villageVector.setVisibility(false);
    PointVector.setVisibility(false);
    heatMapCross.setVisibility(false);
}
function firstShow(num){
    var vector =supermap.getLayersByName("markerLayer2")[0];
    var divMap=$("#map");
    if(num==1){
        divMap.attr("roadFlag","运行状态");
        if(divMap.attr("roadFlag")=="运行状态"){
            hiddenLayer();
            initTimeline(1,1,1);
            $(".describeFrame").css({"display":"block"});
            $(".describeFrame_saturation,.describeFrame_safe,.describeFrame_gas").css({"display":"none"});
        }
        $(".tps p").css("background-color","red");
    }else if(num==2){
        divMap.attr("roadFlag","动态安全");
        if(divMap.attr("roadFlag")=="动态安全"){
            hiddenLayer();
            initTimeline(0,1,1);
            $(".describeFrame_safe").css({"display":"block"});
            $(".describeFrame_saturation,.describeFrame,.describeFrame_gas").css({"display":"none"});
        }
        $(".dynamic p").css("background-color","red");
    }
    else if(num==3){
        divMap.attr("roadFlag","道路尾气");
        if(divMap.attr("roadFlag")=="道路尾气"){
            hiddenLayer();
            initTimeline(0,1,1);
           $(".move p").css("background-color","red");
           $(".describeFrame_gas").css({"display":"block"});
           $(".describeFrame_saturation,.describeFrame,.describeFrame_safe").css({"display":"none"});
        }
    }
    else if(num==4){
        divMap.attr("roadFlag","停车场");
        if(divMap.attr("roadFlag")=="停车场"){
            vector.setVisibility(false);
            hiddenLayer();
            $(".describeFrame_saturation,.describeFrame,.describeFrame_safe,.describeFrame_gas").css({"display":"none"});
            // initTimeline(0,1,70); 
            // $(".subway p").css("background-color","red");
        }
    }
}
function partLeftClick(num){
    var divMap=$("#map");
    if(num==1){
            divMap.attr("roadFlag","运行状态");
            if(divMap.attr("roadFlag")=="运行状态"){
                hiddenLayer();
                initTimeline(0,1,1);
                $(".describeFrame").css({"display":"block"});
                $(".describeFrame_gas,.describeFrame_saturation,.describeFrame_safe").css({"display":"none"});
            }
        }else if(num==2){
            divMap.attr("roadFlag","饱和程度");
            if(divMap.attr("roadFlag")=="饱和程度"){
                hiddenLayer();
                initTimeline(0,1,50);
                $(".describeFrame_saturation").css({"display":"block"});
                $(".describeFrame_gas,.describeFrame,.describeFrame_safe").css({"display":"none"});
            }
        }else if(num==3){
            divMap.attr("roadFlag","拥堵瓶颈");
            if(divMap.attr("roadFlag")=="拥堵瓶颈"){
                vector.setVisibility(false);
                initTimeline(0,1);
                $(".describeFrame_saturation,.describeFrame,.describeFrame_safe,.describeFrame_gas").css({"display":"none"});
            }
        }else if(num==4){
            divMap.attr("roadFlag","拥堵水平");
            if(divMap.attr("roadFlag")=="拥堵水平"){
                hiddenLayer();
                vector.setVisibility(false);
                initTimeline(0,1,2);
                $(".describeFrame").css({"display":"block"});
                $(".describeFrame_gas,.describeFrame_saturation,.describeFrame_safe").css({"display":"none"});
            }
        }else if(num==5){
            divMap.attr("roadFlag","动态安全");
            if(divMap.attr("roadFlag")=="动态安全"){
                hiddenLayer();
                initTimeline(0,1,1);
                $(".describeFrame_safe").css({"display":"block"});
                $(".describeFrame_gas,.describeFrame_saturation,.describeFrame").css({"display":"none"});
            }
        }else if(num==6){//天气安全/
            divMap.attr("roadFlag","天气安全");
            if(divMap.attr("roadFlag")=="天气安全"){
                hiddenLayer();
                initTimeline(0,1,1);
                $(".describeFrame_safe").css({"display":"block"});
                $(".describeFrame_gas,.describeFrame_saturation,.describeFrame").css({"display":"none"});
            }
        }else if(num==7){
            divMap.attr("roadFlag","道路尾气");
            if(divMap.attr("roadFlag")=="道路尾气"){
                hiddenLayer();
                initTimeline(0,1,1);
                $(".describeFrame_gas").css({"display":"block"});
                $(".describeFrame_safe,.describeFrame_saturation,.describeFrame").css({"display":"none"});
            }
        }else if(num==8){
            divMap.attr("roadFlag","路口尾气");
            if(divMap.attr("roadFlag")=="路口尾气"){
                vector.setVisibility(false);
                hiddenLayer();
                initTimeline(0,1);
            }
        }
    }
function changelistFilter(num){
    var html='';
    $("#leadChangeFrame").remove();
    if(num==1){
        html+='<div class="leadChange" id="leadChangeFrame">'+
                '<ul id="leadRoadCross">'+
                    '<li class="leadChangeLi1"><label for="leadCrossSet"><input type="checkBox" id="leadCrossSet"/><span class="setWorld">路口瓶颈阈值设置</span></label></li>'+
                    '<li class="leadChangeLi2"><span class="setWorld1">饱和程度大于</span><input type="text" value="" id="leadCross_ipt1"/></li>'+
                    '<li class="leadChangeLi2"><span class="setWorld1">排队长度大于</span><input type="text" value="" id="leadCross_ipt2"/><span style="margin-left: 3px;font-size: 0.8em">米</span></li>'+
                '</ul>'+
                '<ul id="leadRoad">'+
                    '<li class="leadChangeLi1"><label for="leadRoadSet"><input type="checkBox" id="leadRoadSet"/><span class="setWorld">路段瓶颈阈值设置</span></label></li>'+
                    '<li class="leadChangeLi2"><span class="setWorld1">饱和程度大于</span><input type="text" value="" id="leadRoad_ipt1"/></li>'+
                    '<li class="leadChangeLi2"><span class="setWorld1">状态处于</span>'+
                        '<select id="leadRoadSelect">'+
                            '<option>1-轻度拥堵</option>'+
                            '<option>2-中度拥堵</option>'+
                            '<option>3-严重拥堵</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
                '<ul id="leadArea">'+
                    '<li class="leadChangeLi1"><label for="leadAreaSet"><input type="checkBox" id="leadAreaSet"/><span class="setWorld">区域拥堵阈值设置</span></label></li>'+
                    '<li class="leadChangeLi2"><span class="setWorld1">拥堵指数大于</span><input type="text" value="" id="leadArea_ipt1"/></li>'+
                '</ul>'+
            '</div>';
    }else if(num==2){
        html+='<div class="leadChange" id="leadChangeFrame">'+
                '<ul id="leadRoadCross">'+
                    '<li class="leadChangeLi1"><label for="moveSafeSet"><input type="checkBox" id="moveSafeSet"/><span class="setWorld">动态安全阈值设置</span></label></li>'+
                    '<li class="leadChangeLi2"><span class="setWorld1">风险处于</span>'+
                        '<select id="moveSafeSelect">'+
                            '<option>1-中都风险</option>'+
                            '<option>2-较高风险</option>'+
                            '<option>3-盖度风险</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
                '<ul id="leadRoad">'+
                    '<li class="leadChangeLi1"><label for="airIceSet"><input type="checkBox" id="airIceSet"/><span class="setWorld">天气风险阈值设置</span></label></li>'+
                    '<li class="leadChangeLi2"><span class="setWorld1">风险处于</span>'+
                        '<select id="airIceFilter">'+
                            '<option>1-结冰风险</option>'+
                            '<option>1-即将结冰</option>'+
                            '<option>1-已是冰雪</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
            '</div>';
    }else if(num==3){
        html+='<div class="leadChange" id="leadChangeFrame">'+
                '<ul id="leadRoadCross">'+
                    '<li class="leadChangeLi1"><label for="blowoffRoad"><input type="checkBox" id="blowoffRoad"/><span class="setWorld">路段排放阈值设置</span></label></li>'+
                    '<li class="leadChangeLi2"><span class="setWorld1">风险处于</span>'+
                        '<select id="blowoffRoadSelect">'+
                            '<option>1-轻度污染</option>'+
                            '<option>2-中度污染</option>'+
                            '<option>3-重度污染</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
                '<ul id="leadRoad">'+
                    '<li class="leadChangeLi1"><label for="blowoffCross"><input type="checkBox" id="blowoffCross"/><span class="setWorld">路口排放阈值设置</span></label></li>'+
                    '<li class="leadChangeLi2"><span class="setWorld1">风险处于</span>'+
                        '<select id="blowoffCrossSelect">'+
                            '<option>1-轻度污染</option>'+
                            '<option>2-中度污染</option>'+
                            '<option>3-重度污染</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
            '</div>';
    }
    $("#leadData").append(html);
}
function listClick(Group){
		$(".environmentList_Ul p").css("color","#000");
		$(Group).find("p").css("color","red");
		var ID = $(Group).attr("data").split(",");
//		if( allGroup[ID]==beforeZone )
//			return;
		if(beforeZone.length>0){
			for(var x=0;x<beforeZone.length;x++){
				beforeZone[x].style={
                    fillColor:"#ee9900",
                    fillOpacity:"0.4",
                    stroke:"true",
                    strokeColor:"#EE9900",
                    labelSelect:"true",
               };
               vector.redraw();
			}
			beforeZone = [];
		}
		for(var i=0;i<ID.length;i++){
			zone_color(ID[i]);
		}
	
	}
function zone_color(i){
	if(allGroup[i]){
		allGroup[i].style={
                    fillColor:"blue",
                    fillOpacity:"0.6",
                    stroke:"true",
                    strokeColor:"#EE9900",
                    labelSelect:"true",
              };
        vector.redraw();
		beforeZone.push(allGroup[i]);
	}
}

function xiaoqu(){
    $.ajax({
         url:"GetDevice",
        dataType:"json",
        data:{ "action":"query","type":"40"},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){ 
            $(".zhao,#loading").css("display","block");
         },
        success: function( data, textStatus, jqXHR ){
			add2Layer(data,3,vector,"",true,"region");
        },
        complete:function(){
            $(".zhao,#loading").css("display","none");
        },
        error:function()
        {

         }
    });
}
//小区
function addqu(data) { 
    supermap.addLayers([vector]);
    if( data ){
        var vol,polygonVector;
        var features = [];
        for( var i=0;i<data.entitys.length;i++ ){
           var points=[];
            vol = data.entitys[i];
            for ( var j=1;j<vol.length;j++ ){
                var lonlat = SuperMap.LonLat.fromString(vol[j].split(",")[0]+','+vol[j].split(",")[1]);
                lonlat = lonlat.transform("EPSG:4326","EPSG:900913");
                points.push(new SuperMap.Geometry.Point(lonlat.lon,lonlat.lat));
            }
            linearRings = new SuperMap.Geometry.LinearRing(points);
            region = new SuperMap.Geometry.Polygon([linearRings]);
            polygonVector = new SuperMap.Feature.Vector(region);
            var _groupID =data.entitys[i][0];
            polygonVector.id=_groupID;
            allGroup[_groupID]=polygonVector;//小区矩阵存入一个object
            features.push(polygonVector);
        }
        vector.addFeatures(features);
    }else {
       reviseAlert("数据已加载。");
    }

}
function getleadVillageId(argument){//小区ID的选择
    var layer=supermap.getLayersByName("markerLayer3")[0];
	argument.style={
            fillColor:"blue",
            fillOpacity:"0.6",
            stroke:"true",
            strokeColor:"#EE9900",
            labelSelect:"true",
        }
	layer.redraw();

    if($(".villageText")){
    	id +=argument.id.split("_")[1]+",";
    	$(".villageText").html(id);
    }
}
function removeID(){
	id = "";
	// $("#empty_text").empty();
	// selectFeature.deactivate();
	// vector.removeAllFeatures();
    var layer=supermap.getLayersByName("markerLayer3")[0]; 
    layer.setVisibility(false);
    var vector=supermap.getLayersByName("markerLayer2")[0];
    vector.setVisibility(true);
}

function queryLeadMarkerStation(){
    $.ajax({
        url:"GetDevice",
        dataType:"json",
        data:{ "action":"query","type":110},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
            leadStation_marker( data );
        },
        error:function()
        {

        }
    });
}
function leadStation_marker(data){
    var marker0=supermap.getLayersByName("marker");
    if( data ){
        if( data.total != 0 )
        {
            for( var item in data.entitys ){
                lonlat = SuperMap.LonLat.fromString(data.entitys[item][data.entitys[item].length-1].replace(" ",","));
                lonlat.transform("EPSG:4326","EPSG:900913");
                //  var dot = data.entitys[item][1];
                // var lonlat = SuperMap.LonLat.fromString(dot);
                 var size = new SuperMap.Size(20,22);
                 var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
                 var icon = new SuperMap.Icon('./theme/images/10.0.png', size, offset);
                 marker =new SuperMap.Marker(lonlat,icon) ;
                 marker.id=data.entitys[item][0];
                 marker0[0].addMarker(marker);
                 //marker.events.on({"click":leftData_xinhao,"rightclick":signal_trafficDIV,"scope": marker});
            }
        }
    }
};


//样本车辆
//人员
function policedata(){
    $.ajax({
         url:"GetDevice",
        dataType:"json",
        data:{ "action":"query","type":330},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
            getPolice( data );
        },
        error:function()
        {

        }
    });
}
function getPolice(data){
    var marker1=supermap.getLayersByName("marker1");
    if( data ){
        if( data.total != 0 ){
            for( var item in data.entitys ){
               var dot = data.entitys[item][1].replace(" ",",");
               var lonlat = SuperMap.LonLat.fromString(dot);
               var size = new SuperMap.Size(20,22);
                var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
                var icon = new SuperMap.Icon('./theme/images/man.png', size, offset);
                marker =new SuperMap.Marker(lonlat,icon) ;
                marker.id=data.entitys[item][0];
                marker1[0].addMarker(marker);
               // marker.events.on({"rightclick":PoliceDIV,"scope": marker});
            }
        }
    }
}
//巡逻车数据查询，并渲染
function ProwlCardata(){
    $.ajax({
        url:"GetDevice",
        // url:"GetInfo",
        dataType:"json",
        data:{ "action":"query","type":340,"DT":1},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
            getProwlCar( data );
        },
        error:function()
        {

        }
    });
}
function getProwlCar(data){
    var marker2=supermap.getLayersByName("marker2");
    if( data ){
        if( data.total != 0 )
        {   marker2[0].clearMarkers();
            for( var item in data.entitys ){     
                var dot = data.entitys[item][1].replace(" ",",");
                var lonlat = SuperMap.LonLat.fromString(dot);
                var size = new SuperMap.Size(32,32);
                var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
                var icon = new SuperMap.Icon('images/float/liang/1.png', size, offset);
                marker =new SuperMap.Marker(lonlat,icon);
                marker.id=data.entitys[item][0];
                marker2[0].addMarker(marker);
                //marker.events.on({"rightclick":ProwlCarDIV,"scope": marker});
            }
        }
    }
};
//公交优先点的数据
function Busdata(){//公交优先点的数据ajax
    $.ajax({
        url:"GetDevice",
        dataType:"json",
        data:{ "action":"query","type":340,"DT":2},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
            getBus( data );
        },
        error:function()
        {

        }
    });
}
function getBus(data){
    var marker3=supermap.getLayersByName("marker3");
    if( data ){
        if( data.total != 0 )
        {   
            marker3[0].clearMarkers();
            for( var item in data.entitys ){
                var dot = data.entitys[item][1].replace(" ",",");
                var lonlat = SuperMap.LonLat.fromString(dot);
                var size = new SuperMap.Size(32,32);
                var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
                var icon = new SuperMap.Icon('images/float/liang/2.png', size, offset);
                marker =new SuperMap.Marker(lonlat,icon) ;
                marker.id=data.entitys[item][0];
                marker3[0].addMarker(marker);
                //marker.events.on({"rightclick":BusDIV,"scope": marker});
            }
        }
    }
};
//其他优先点的数据查询
function Othersdata(){
    $.ajax({
        url:"GetDevice",
        dataType:"json",
        data:{ "action":"query","type":340,"DT":3},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
            getOthers( data );
        },
        error:function()
        {

        }
    });
}
function getOthers(data){//其他优先点的显示遍历
    var marker4=supermap.getLayersByName("marker4");
    if( data ){
        if( data.total != 0 )
        {
            marker4[0].clearMarkers();
            for( var item in data.entitys ){
                var dot = data.entitys[item][1].replace(" ",",");
                var lonlat = SuperMap.LonLat.fromString(dot);
                var size = new SuperMap.Size(32,32);
                var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
                var icon = new SuperMap.Icon('images/float/liang/3.png', size, offset);
                marker =new SuperMap.Marker(lonlat,icon) ;
                marker.id=data.entitys[item][0];
                marker4[0].addMarker(marker);
                //marker.events.on({"rightclick":OthersDIV,"scope": marker});
            }
        }
    }
};


//右侧list疏导数据添加ajax
function insertLeadArea(leadAreaVal){
    var gmarkerId=gmarker.id;
    $.ajax({
        url:"GetDevice",
        dataType:"json",
        data:{ "action":"insert","type":type,"val":leadAreaVal},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){ },
        success: function( data, textStatus, jqXHR ){
            reviseAlert("添加成功！");
        },
        error:function()
        {
                
        }
    })
}
var leadAreaVal;
function getEmptyLeadVal(){//上传数据时获取值
    var AreaNumber=$("#areaNumber").val();
    var AreaName=$("#areaName").val();
    var EditTime=$("#editTime option").index($('#editTime option:selected'));
    var StartEndTime1=$("#startEndTime1").val();
    var StartEndTime2=$("#startEndTime2").val();
    var StartEndTime3=$("#startEndTime3").val();
    var UserCount=$("#userCount").val();
    var LeadRatio=$("#leadRatio").val();
    var EditState=$("#editState option").index($('#editState option:selected'));
    var LeadDescribe=$("#leadDescribe").val();
    //var _time=OnDuty.split("-");
    leadAreaVal="'"+PoliceNumber+"';"+"'"+Department+"'"+";"+"'"+PoliceName+"'"+";"+"'"+SuperviseArea+"'"+";"+"'"+_time[0]+"'"+";"+"'"+_time[1]+"'"+";'"+Devicetype+"';'0';"+pos.lon+" "+pos.lat+"]";
    insertPolice(leadAreaVal);
}
function addleadList(){
	$(".zhao").css("display","block");
    var content='';
    content+='<div class="lead_nodes" id="empty_addlead" style="height: 380px;">'+
                '<p class="lead_title">添加主动疏导区域<img src="images/min.png" class="empty_btn" style="cursor:pointer" onclick="removeID(),zhao_none(\'.zhao\',\'.lead_nodes\')"></p>'+
                '<p class="villageBtn_frame">'+
                    '<input type="button" value="选择交通小区" class="villageChoice_btn">'+
                    '<input type="button" value="放弃" onclick="removeID(),empty_Site()" class="giveUp_btn1">'+
                '</p>'+
                '<textarea id="empty_text" readonly="readonly" class="villageText"></textarea>'+
                '<ul class="editContent">'+
                    '<li><span>区域编号</span><input type="text" value="" id="areaNumber" class="editContent_text_ipt1"></li>'+
                    '<li><span>区域名称</span><input type="text" value="" id="areaName" class="editContent_text_ipt1"></li>'+
                    '<li><span>疏导周期</span>'+
                        '<select class="editContent_select1" id="editTime">'+
                            '<option>0-始终</option>'+
                            '<option>1-当前日期</option>'+
                        '</select>'+
                    '</li>'+
                    '<li><span>起止时间1</span><input type="text" id="startEndTime1" value="" class="editContent_text_ipt2"></li>'+
                    '<li><span>起止时间2</span><input type="text" id="startEndTime2" value="" class="editContent_text_ipt2"></li>'+
                    '<li><span>起止时间3</span><input type="text" id="startEndTime3" value="" class="editContent_text_ipt2"></li>'+
                    '<li><span>用户统计</span><input type="text" id="userCount" value="" class="editContent_text_ipt3"><span>%</span></li>'+
                    '<li><span>疏导比例</span><input type="text" id="leadRatio" value="" class="editContent_text_ipt3"><span>%</span></li>'+
                    '<li><span>疏导状态</span>'+
                        '<select class="editContent_select1" id="editState">'+
                            '<option>0-无效</option>'+
                            '<option>1-激活</option>'+
                        '</select>'+
                    '</li>'+
                    '<li><span>疏导描述</span><input type="text" id="leadDescribe" class="editContent_text_ipt1"></li>'+
                '</ul>'+
                '<p class="addPframe_btn">'+
                    '<input type="submit" value="确定添加" class="addData_btn" onclick="removeID(),insert_Site(),zhao_none(\'.zhao\',\'.lead_nodes\')">'+
                    '<input type="button" value="取消" class="giveUp_btn2" onclick="removeID(),empty_Site(),zhao_none(\'.zhao\',\'.lead_nodes\')">'+
                '</p>'+
            '</div>';
    $('body').append(content);
    divDrag('.lead_title','.lead_nodes');
    choiceVillage();
}

function choiceVillage(){//选择小区按钮
    var layer=supermap.getLayersByName("markerLayer3")[0];//小区markerLayer3
    var vector=supermap.getLayersByName("markerLayer2")[0];
	$(".villageChoice_btn").click(function(){
    	// selectFeature.activate();
		id = "";
    	$(".zhao").css("display","none");
    	$("#Layer_ipt3").attr("checked",true);
    	$("#Layer_ipt3").parent().css("color","red");
    	// vector.removeAllFeatures();
    	// xiaoqu();
        layer.setVisibility(true);
        vector.setVisibility(false);
    })
}
function reviseLeadList(){
    var content='';
    $(".zhao").css("display","block");
    content+='<div class="lead_nodes" id="empty_addlead" style="height: 368px;">'+
                '<p class="lead_title">修改主动疏导区域<img src="images/min.png" class="empty_btn" style="cursor:pointer" onclick="removeID(),zhao_none(\'.zhao\',\'.lead_nodes\')"></p>'+
                '<p class="villageBtn_frame">'+
                    '<input type="button" value="重选交通小区" class="villageChoice_btn">'+
                    '<input type="button" value="放弃" onclick="removeID()" class="giveUp_btn1">'+
                '</p>'+
                '<textarea id="empty_text" readonly="readonly" class="villageText"></textarea>'+
                '<ul class="editContent">'+
                    '<li><span>区域编号</span><input type="text" value="" id="areaNumber" class="editContent_text_ipt1"></li>'+
                    '<li><span>区域名称</span><input type="text" value="" id="areaName" class="editContent_text_ipt1"></li>'+
                    '<li><span>疏导周期</span>'+
                        '<select class="editContent_select1" id="editTime">'+
                            '<option>0-始终</option>'+
                            '<option>1-当前日期</option>'+
                        '</select>'+
                    '</li>'+
                    '<li><span>起止时间1</span><input type="text" id="startEndTime1" value="" class="editContent_text_ipt2"></li>'+
                    '<li><span>起止时间2</span><input type="text" id="startEndTime2" value="" class="editContent_text_ipt2"></li>'+
                    '<li><span>起止时间3</span><input type="text" id="startEndTime3" value="" class="editContent_text_ipt2"></li>'+
                    '<li><span>用户统计</span><input type="text" id="userCount" value="" class="editContent_text_ipt3"><span>%</span></li>'+
                    '<li><span>疏导比例</span><input type="text" id="leadRatio" value="" class="editContent_text_ipt3"><span>%</span></li>'+
                    '<li><span>疏导状态</span>'+
                        '<select class="editContent_select1" id="editState">'+
                            '<option>0-无效</option>'+
                            '<option>1-激活</option>'+
                        '</select>'+
                    '</li>'+
                    '<li><span>疏导描述</span><input type="text" id="leadDescribe" class="editContent_text_ipt1"></li>'+
                '</ul>'+
                '<p class="addPframe_btn">'+
                    '<input type="submit" value="确定修改" class="addData_btn" onclick="removeID(),insert_Site(1),zhao_none(\'.zhao\',\'.lead_nodes\')">'+
                    '<input type="button" value="取消" class="giveUp_btn2" onclick="removeID(),zhao_none(\'.zhao\',\'.lead_nodes\')">'+
                '</p>'+
            '</div>';
    $("body").append(content);
    divDrag('.lead_title','.lead_nodes');
    choiceVillage();
    //$("#editTime option").eq(data.entitys[6]).attr("selected", true);、
    //$("#editState option").eq(data.entitys[6]).attr("selected", true);
}
function deletePoint(num){
    //var gmarkerId=gmarker.id;
    $.ajax({
         url:"GetDevice",
         dataType:"json",
         data:{ "action":"delete","type":num,"val":"id,"+gmarkerId},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               reviseAlert("删除成功！");
         },
         error:function()
         {

         }
    })
}
var lonlat = ["12994189.00633 4795956.47431",300,"12994255.88873 4795344.97808",200,"12990749.34006 4792172.84141",300,"12990711.12155 4798899.29990",120,"12990954.76458 4795287.65031",250];
//交通瓶颈
function circle() {
	var arr = [];
		supermap.addLayers([PointVector]);
	for(var i = 0; i < lonlat.length; i+=2) {
		var lon = lonlat[i].split(" ");
		var point = new SuperMap.Geometry.Point(lon[0],lon[1]);
		var circleP = createCircle(point, lonlat[i+1], 256, 360, 360);
		var circleVector = new SuperMap.Feature.Vector(circleP);
		circleVector.style = {
			strokeColor: "red",
			fillColor: "red",
			strokeWidth: 2,
			fillOpacity: 1.0
		};
		arr.push(circleVector);
	}
	PointVector.addFeatures(arr);
}
//圆（交通瓶颈的绘制圆的方法）
function createCircle(origin, radius, sides,r,angel){
    var rR = r*Math.PI/(180*sides);
    var rotatedAngle, x, y;
    var points = [];
    for(var i=0; i<sides; ++i) {
        rotatedAngle = rR*i;
        x = origin.x + (radius * Math.cos(rotatedAngle));
        y = origin.y + (radius * Math.sin(rotatedAngle));
        points.push(new SuperMap.Geometry.Point(x, y));
    }
    rotatedAngle = r*Math.PI/180;
    x = origin.x + (radius * Math.cos(rotatedAngle));
    y = origin.y + (radius * Math.sin(rotatedAngle));
    points.push(new SuperMap.Geometry.Point(x, y));

    var ring = new SuperMap.Geometry.LinearRing(points);
    ring.rotate(parseFloat(angel),origin);
    var geo = new SuperMap.Geometry.Collection([ring]);
    geo.origin = origin;
    geo.radius = radius;
    geo.r = r;
    geo.angel = angel;
    geo.sides = sides;
    geo.polygonType = "Curve";
    return geo;
}

//主动疏导管理
var maxSiteID = 0;


querySite();
function querySite(){
            $.ajax({
                url:"GetDevice",
                dataType:"json",
                data:{ "action":"query","type":"350"},
                contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
                beforeSend:function(){  },
                success: function( data, textStatus, jqXHR ){
                    createSite( data );
                },
                error:function()
                {

                }
            });
        }

function createSite(attrData){
    for(var i=0;i<attrData.entitys.length;i++){
        var arrSite = attrData.entitys[i];
        if(typeof(arrSite[3]) == "object"){
            continue ;
        }
        var zone_id = arrSite[3].substring(1,arrSite[3].length-1);
        insertSite(arrSite[0],arrSite[1],arrSite[2],zone_id);
        if(maxSiteID<arrSite[0]){
            maxSiteID =parseInt(arrSite[0]) ;
        }
    }
//创建marker点      添加自定义属性  marker.id = arrSite[0];
    
}
//删除站点
$("body").delegate(".delete","click",function(){
	var ID = $(this).parents("li").attr("id").split("_")[1];
		$(this).parents("li").remove();
	$.ajax({
		 url:"GetDevice",
         dataType:"json",
         data:{ "action":"delete","type":70,"val":"device_id"+","+ID},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
            reviseAlert("删除成功！");
         },
         error:function()
         {

         }
	});
	
})
//查询疏导区域
function amendData(data){
	var zoneids = data[9].substring(1,data[9].length-1)+",";
	$("#areaNumber").val(data[1]);
	$("#areaName").val(data[2]);
	$("#editTime option").eq(data[3]).attr("selected","selected");//select indix
	$("#startEndTime1").val(data[4].split(",")[0]);
	$("#startEndTime2").val(data[4].split(",")[1]);
	$("#startEndTime3").val(data[4].split(",")[2]);
	$("#userCount").val(data[5]);
	$("#leadRatio").val(data[6]);
	$("#editState option").eq(data[7]).attr("selected","selected");
	$("#leadDescribe").val(data[8]);
	$("#empty_text").html(zoneids);
}
$("body").delegate(".More","click",function(){
	reviseLeadList();
	ID = $(this).parents("li").attr("id");//.split("_")[1]
	var num = ID.split("_")[1];
	var val = "{ID:"+num+"}"
//	var id = ID.substr(ID.indexOf("_")+1,ID.length-ID.indexOf("_")-1);
	$.ajax({
                url:"GetDevice",
                dataType:"json",
                data:{ "action":"query","type":"351","val":val},
                contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
                beforeSend:function(){  },
                success: function( data, textStatus, jqXHR ){
                    amendData( data.entitys );
                },
                error:function()
                {

                }
            });
	
})
function insertSite(i,siteNum,siteName,zone_id){
		html ='<li onclick="listClick(this)" data="'+zone_id+'" id="site_'+i+'">'+
			'<div class="li_box">'+
				'<div class="box_img"><img src="images/greenflag.png" class="li_flag"></div>'+
				'<div class="li_words">'+
					'<p class="environmentList_number">'+siteNum+'</p>'+
					'<p class="cross_name">'+siteName+'</p>'+
				'</div>'+
				'<img src="images/del0.png" class="delete">'+
				'<img src="images/more.png" class="More" >'+
				'</div>'+
		'</li>';
	$(".environmentList_Ul").append(html);	
}
//添加站点 
function insert_Site(updata){
//添加站点 ajax
    if(updata){
    	var device_id = ID.split("_")[1];
    }else{
    	 var device_id = maxSiteID+1;
    }
	var areaNumber = $("#areaNumber").val();
	var areaName = $("#areaName").val();
	var editTime = $("#editTime option:selected").index();//select indix
	var time1 = $("#startEndTime1").val();
	var time2 = $("#startEndTime2").val();
	var time3 = $("#startEndTime3").val();
	var userCount = $("#userCount").val();
	var leadRatio = $("#leadRatio").val();
	var editState = $("#editState option:selected").index();
	var leadDescribe = $("#leadDescribe").val();
	var empty_text = $("#empty_text").html();
	var text = empty_text.substring(0,empty_text.length-1);
	var value = "'"+device_id+"';'"+areaNumber+"';'"+areaName+"';'"+editTime+"';'"+time1+","+time2+","+time3+"';'"+userCount+"';'"+leadRatio+"';'"+editState+"';'"+leadDescribe+"';'{"+text+"}'"+";0 0"+"]";
	
	if(updata){
    	siteAjax(value,device_id);
    	$("#"+ID+" .environmentList_number" ).text(areaNumber);
    	$("#"+ID+" .cross_name" ).text(areaName);
    }else{
    	 siteAjax(value);
    insertSite(device_id,areaNumber,areaName,text);
    }
	//选择小区置为空
	$("#empty_text").empty();
	id = "";

}
function empty_Site(){
	//选择小区置为空
	$("#empty_text").empty();
	id = "";
}

function siteAjax(value,device_id){
	var dd=true;
		$("#empty_addlead input").each(function(){
			if($(this).val()==""){
				dd=false;
			}
		});
	if(dd){
    	$.ajax({
		 url:"GetDevice",
         dataType:"json",
         data:{ "action":"insert","type":350,"val":value},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
         	if(device_id){
         		reviseAlert("修改成功！");
         	}else{
		
			maxSiteID++;
               reviseAlert("添加成功");
            }
         },
         error:function()
         {

         }
	});
	}else{
			reviseAlert("数据格式不正确或为空");
		}
}
