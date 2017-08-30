var features=[];
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
           
            EventUtil.addHandler(document,"click",function(event){
                  $(".all_tc").css("visibility","hidden");  
             });
        });
//左侧列表高度自适应
$(document).ready(function() { 
    ratioHeight('blowdownFrame','environmentLayer',5,1,6);
    ratioHeight('blowdownFrame','environmentList',2,1,6);
    ratioHeight('blowdownFrame','environmentData',6,1,6);
    // ratioHeight('blowdownFrame','environmentData_Ul',5,1);
});
$(window).resize(function(){
    ratioHeight('blowdownFrame','environmentLayer',5,1,6);
    ratioHeight('blowdownFrame','environmentList',2,1,6);
    ratioHeight('blowdownFrame','environmentData',6,1,6);
    // ratioHeight('blowdownFrame','environmentData_Ul',5,1);
});
//鼠标滚动事件
$(document).on("mousewheel DOMMouseScroll",function(){
    if(supermap.getZoom()>14){
        for(var i=0; i<features.length;i++){
            features[i].style={
                strokeColor:features[i].style.strokeColor,
                fill:true,
                strokeWidth:5
            }
        }
    }else{
        for(var i=0; i<features.length;i++){
            features[i].style={
                strokeColor:features[i].style.strokeColor,
                fill:true,
                strokeWidth:2
            }
        }
    }
});
//左侧列表里的第一个模块文字变色（input）
$(document).ready(function(){
    $(".environmentLayer_Ul_u1 li input").click(function(){
            if($(this).prop("checked")==true){
                $(this).parent().css("color","red");
            }else{
                $(this).parent().css("color","#000");
            }
    })
    $(".environmentLayer_Ul_p").click(function(){
        $(this).next("ul").fadeToggle();
        $(this).toggleClass("arrowRight");
    })
    
    $("#roadBlowdown").click(function(){//路网排放input开关
        var divMap=$("#map");
        divMap.attr("roadFlag","道路尾气");
        if($(this).prop("checked") == true && divMap.attr("roadFlag")=="道路尾气"){
            initTimeline(0,1,1);
            $(".describeFrame_gas").css({"display":"block"});
        }else{
           vector.setVisibility(false);
           $(".describeFrame_gas").css({"display":"none"});
        }
    })
    $("#CrossLayer").click(function(){//路网排放input开关
        var divMap=$("#map");
        divMap.attr("roadFlag","路口尾气");
        if($(this).prop("checked") == true && divMap.attr("roadFlag")=="路口尾气"){
            initTimeline(0,1,1);
        }else{
           heatMapCross.setVisibility(false);
        }
    })
    $("#environment_stations").click(function(){//环境观测站
        if($(this).prop("checked") == true){
            markerlayer.setVisibility(true);
            markerlayer.clearMarkers();
            queryCameraInfo();
        }else{
            markerlayer.setVisibility(false);
        }
    })
    $("#environment_video").click(function(){//视频监控
        if($(this).prop("checked") == true){
            markerlayer1.setVisibility(true);
            markerlayer1.clearMarkers();
            Video_marker();
        }else{
            markerlayer1.setVisibility(false);
        }
    })
})
var map = {};
var ID;
var markerZoomMap = {};
var beforeMarker;
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
/**创建新的观测站点**/
function play_up_features(b){//重新渲染涂层,共有的方法
    supermap.removeLayer(b);
    supermap.addLayer(b);
}

function drawPoints_Station(a){
    featuresLayer.setVisibility(true);
    Station_drawPoint = new SuperMap.Control.DrawFeature(featuresLayer,SuperMap.Handler.Point, { multi: true });//创建绘制点的控件
    Station_drawPoint.style={
        fillColor:"red",
        strokeColor:"yellow",
        pointRadius:5
    };
    supermap.addLayer(featuresLayer);
    supermap.addControl(Station_drawPoint);//添加点线面绘制控件
    Station_drawPoint.activate();
    $(".addEnvironmentStation").attr("src","images/add0.png");
    Station_drawPoint.events.on({"featureadded":drawCompleted_Station});    
}
function drawCompleted_Station(a){
    Station_drawPoint.deactivate();//关闭绘制点
    $(".addEnvironmentStation").attr("src","images/add1.png");
}
function add_Station(currentFeature){
    gmarker= this;
    var centerPoint= currentFeature.geometry.getCentroid();
    pos= new SuperMap.LonLat(centerPoint.x,centerPoint.y);                
    var point= new SuperMap.Geometry.Point(pos.lon, pos.lat);                       
    var p=supermap.getPixelFromLonLat(pos);
    var l= p.x+"px";
    var t= p.y+"px";
    $(".jt_node").css("visibility","hidden");
    $("#right_environment").css({"visibility":"visible","left":l,"top":t});
    $(".look").css("display","none");
    $(".addlook").css("display","block");
}
function unFeatureSelect() {//人员删除点的功能
    featuresLayer.removeAllFeatures([]);
    featuresLayer.setVisibility(false);
}

//请求观测站点的ajax（index里的排放检测）
function queryCameraInfo(){
    $.ajax({
        url:"GetDevice",
        dataType:"json",
        data:{ "action":"query","type":"130"},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
            environmentStation_marker( data );
        },
        error:function()
        {

        }
    });
}

function environmentStation_marker(data){//观测站的marker点
    var markerlayer=supermap.getLayersByName("markerLayer");
    if( data ){
        markerlayer[0].clearMarkers();
        for( var item in data.entitys ){
            var statedata = data.entitys[item][3].replace(" ",",").split(",");
            var lonlat = SuperMap.LonLat.fromString(statedata[0]+','+statedata[1]);
            var size = new SuperMap.Size(22,22);
            var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
            var id = data.entitys[item][0]
            var lon = translateMa(lonlat);

            createMarker(lon,size,offset,id);
        }
    }

}
function translateMa(a){
    var lonVal =a.transform("EPSG:4326","EPSG:900913");
    return lonVal;
}
function createMarker(lonlat,size,offset,id){
 		var markerlayer=supermap.getLayersByName("markerLayer");
 		var icon = new SuperMap.Icon('./theme/images/9.0.png', size, offset);
        marker =new SuperMap.Marker(lonlat,icon);
        marker.id=id
        markerZoomMap[id] = marker;
        markerlayer[0].addMarker(marker);
        marker.events.on({"click":leftData_Station,"scope": marker});
}
//气象站管理列表点击
function listClick(marker){
		$(".environmentList_Ul p").css("color","#000");
		$(marker).find("p").css("color","red");
		var ID = $(marker).attr("id").split("_")[1];
		
		if( markerZoomMap[ID]==beforeMarker )
			return;
		
	if(markerZoomMap[ID]){
		
		var lonlat = markerZoomMap[ID].lonlat;
		var size = new SuperMap.Size(44,44);
	    var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
	    markerlayer.removeMarker(markerZoomMap[ID]);
		createMarker(lonlat,size,offset,ID);
		if(beforeMarker){
			var before_ID = beforeMarker.id
			var before_lonlat = beforeMarker.lonlat;
			var before_size = new SuperMap.Size(22,22);
	    	var before_offset = new SuperMap.Pixel(-(before_size.w/2), -before_size.h);
			markerlayer.removeMarker(beforeMarker);
			createMarker(before_lonlat,before_size,before_offset,before_ID);
		}
		beforeMarker = markerZoomMap[ID];
		stationAttr();
	}
}

//请求视频点的ajax
function queryVideo(){
            $.ajax({
                url:"GetRoadNet",
                dataType:"json",
                data:{ "action":"query","type":"1"},
                contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
                beforeSend:function(){  },
                success: function( data, textStatus, jqXHR ){
                    Video_marker( data );
                },
                error:function()
                {

                }
            });
        }

        function Video_marker(data){
            var markerlayer1=supermap.getLayersByName("markerLayer1");
            var lonlat = [
                  new SuperMap.LonLat(12995798.96124,4797953.39167),
                  new SuperMap.LonLat(12994936.65602,4797838.73613),
                  new SuperMap.LonLat(12994750.34076,4799030.67604),
                  new SuperMap.LonLat(12997181.99372,4798158.81619),
                  new SuperMap.LonLat(12997294.26067,4797423.10979),
                  new SuperMap.LonLat(12994045.68691,4797740.80119),
                  new SuperMap.LonLat(12993938.19733,4798306.91293),
                  new SuperMap.LonLat(12993921.47673,4798710.59599)
            ];
            //if( data ){
               // if( data.total != 0 )
               // {
                    for( var item in lonlat ){
                       //var statedata = data.entitys[item];
                       //var lonlat = SuperMap.LonLat.fromString(statedata);
                       var dot = lonlat[item];

                        var size = new SuperMap.Size(22,22);
                        var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
                        var icon = new SuperMap.Icon('./theme/images/7.0.png', size, offset);
                        //marker =new SuperMap.Marker(new SuperMap.LonLat(4799301.8956295, 4799301.8956295),icon) ;
                        //marker =new SuperMap.Marker(lonlat,icon);
                        marker =new SuperMap.Marker(dot,icon);
                        markerlayer1[0].addMarker(marker);
                        //marker.events.on({"click":menuDiv,"scope": marker});
                    }
             //   }
            //}
        };

var data={entitys://假数据
[
    [1,"北苑路",12,"南京莱斯","纳诺信",102,89,20,10,30,50,"12994189.00633 4795956.47431"],
    [2,"北苑西路",22,"南京莱斯","纳诺信",56,36,26,15,35,48,"12994255.88873 4795344.97808"],
    [3,"立汤路",43,"南京莱斯","纳诺信",99,74,14,16,26,46,"12990749.34006 4792172.84141"],
    [4,"北京路",77,"南京莱斯","纳诺信",87,50,25,20,36,39,"12990711.12155 4798899.29990"],
    [5,"高尔基路",99,"南京莱斯","纳诺信",65,23,11,23,21,28,"12990954.76458 4795287.65031"]
]
}
//点击map时隐藏数据
$("body").delegate("#map","click",function(){$(".environmentData_Ul li").css("display","none");})
//点击观测站站点气泡左键，数据的展现
function leftData_Station(){
             $(".environmentData_Ul li").css("display","block");
            var gmarker= this;
            var gmarkerId=gmarker.id;
            $(".environmentList_Ul p").css("color","#000");
            $("#site_"+gmarkerId+" p").css("color","red");
            
            if( markerZoomMap[gmarker.id]==beforeMarker ){
                return;
            }

            var lonlat = gmarker.lonlat;
    		var size = new SuperMap.Size(44,44);
    	    var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
    	    markerlayer.removeMarker(gmarker);
    		createMarker(lonlat,size,offset,gmarker.id);
    		if(beforeMarker){
    			var before_ID = beforeMarker.id
    			var before_lonlat = beforeMarker.lonlat;
    			var before_size = new SuperMap.Size(22,22);
    	    	var before_offset = new SuperMap.Pixel(-(before_size.w/2), -before_size.h);
    			markerlayer.removeMarker(beforeMarker);
    			createMarker(before_lonlat,before_size,before_offset,before_ID);
    		}
    		beforeMarker = markerZoomMap[gmarker.id];
    		
            stationAttr();
           
        }
function stationAttr(){
	$(".environmentData_Ul li").css("display","block");
	var item=  Math.floor(Math.random()*5);
    var item=  Math.floor(Math.random()*5);
    var valName=['PM2.5','PM10','二氧化硫','二氧化氮','一氧化碳','臭氧'];
    $("#PM25").html(valName[0]);
    $("#PM10").html(valName[1]);
    $("#SO2").html(valName[2]);
    $("#NO2").html(valName[3]);
    $("#CO").html(valName[4]);
    $("#O3").html(valName[5]);
    $("#PM25_val").html(data.entitys[item][5]);
    $("#PM10_val").html(data.entitys[item][6]);
    $("#SO2_val").html(data.entitys[item][7]);
    $("#NO2_val").html(data.entitys[item][8]);
    $("#CO_val").html(data.entitys[item][9]);
    $("#O3_val").html(data.entitys[item][10]);
}


function queryRoadNetFeature(){
  var divMap=$("#map");
    $.ajax({
         url:"GetRoadNet",
         dataType:"json",
         data:{ "action":"query","type":"30"},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){ 
             $(".zhao","#loading").css("display","block");
          },
         success: function( data, textStatus, jqXHR ){
             doRoadNetFeature( data );
             if(divMap.attr("roadFlag")=="道路尾气"){
                initTimeline(1,1,1);
                $("#roadBlowdown").prop("checked",true);$("#roadBlowdown").parent().css("color","red");
                $(".describeFrame_gas").css({"display":"block"});
            }
         },
         complete:function(){
             $(".zhao","#loading").css("display","none");
        },
         error:function(){
             var ab=0;
         }
      });
};
function doRoadNetFeature(data){
  if( data && vector){
    add2Layer(data,1,vector,"",false,"line");
  }
}     

function queryRealData(strDate,bFlagRealData){
    var roadUrl;
    if(bFlagRealData==1){
        roadUrl="GetNetState";
    }
    var divMap=$("#map");
    var vector=supermap.getLayersByName("vector")[0];
    
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
            doTrafficTimeData(1,vector,data,bFlagRealData);
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
 //标记点弹窗的弹窗的隐藏（btn）        
function zhao_none(a,b){
    $(a).css("display","none");
    $(b).remove();
}
function markershow(){//添加点时的渲染
    $("#environment_stations").attr("checked",true);
    $("#environment_stations").parent().css("color","red");
    queryCameraInfo();
}
//观测站添加的属性框
 function emptyStation_information(){
    gmarker= this;
    $(".zhao_left").css("display","block");
    var content='';
    content+='<div class="jd_nodes" style="height: 243px;">'+
                '<p class="tj_title">添加环境观测站<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao_left\',\'.jd_nodes\'),vectorSetVisibility()"></p>'+
                '<ul class="node_ul">'+
                    '<li><span>环境站号</span><input id="number" type="text" value="" /></li>'+
                    '<li><span>站点名称</span><input id="name" type="text" value="" /></li>'+
                    '<li><span>路段编号</span><input id="roadNum" type="text" value="" /></li>'+
                    '<li><span>经度坐标</span><input id="Lon" type="text" readonly="readonly" value="'+pos.lon+'" /></li>'+
                    '<li><span>纬度坐标</span><input id="Lag" type="text" readonly="readonly" value="'+pos.lat+'"/></li>'+
                    '<li><span>设备厂家</span><input id="production" type="text" value="" /></li>'+
                    '<li><span>设备类型</span><input id="type" type="text" value="" /></li>'+
                '</ul>'+
                '<p class="btn_frame">'+
                    '<input type="submit" class="setup_environment_btn1" value="确定添加" onclick="insert_Site(),zhao_none(\'.zhao_left\',\'.jd_nodes\'),markershow(),unFeatureSelect(),vectorSetVisibility()"/>'+
                    '<input type="button" class="abolish_btn1" value="取消" onclick="zhao_none(\'.zhao_left\',\'.jd_nodes\'),vectorSetVisibility()"/>'+
                '</p>'+
            '</div>';
    $('body').append(content);
    divDrag('.tj_title','.jd_nodes');
    if($("#roadBlowdown").prop("checked")==false){
        vector.setVisibility(true);
        selectFeature_road.deactivate();
         selectFeature_road = new SuperMap.Control.SelectFeature(vector,{//路网
                callbacks: {"click":getlinkId}//,"rightclick":add_Station
            });    
        supermap.addControl(selectFeature_road);
        selectFeature_road.activate();
    }
    
 }
 function vectorSetVisibility(){
    if($("#roadBlowdown").prop("checked")==false){
        vector.setVisibility(false);
        selectFeature_road.deactivate();
         selectFeature_road = new SuperMap.Control.SelectFeature(vector,{//路网
                callbacks: {"click":getlinkId,"over":describeValOver,"out":describeValOut}//,"rightclick":add_Station
            });    
        supermap.addControl(selectFeature_road);
        selectFeature_road.activate();
    }
 }
//观测站图表数据显示和修改的属性框
function charts_Station_revise(){
    $(".zhao").css("display","block");
    var content='';
    content+='<div class="environment_Data_statistics">'+
                '<p class="tj_title">环境观测数据统计<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.environment_Data_statistics\')"></p>'+
                '<ul class="environmentChangeUl">'+
                    '<li><span style="margin-left:7px">环境数据类型</span><select id="gasType"><option>PM2.5数值统计</option><option>PM10数值统计</option><option>NO2数值统计</option><option>CO数值统计</option><option>SO2数值统计</option><option>O3数值统计</option></select></li>'+
                    '<li class="environmentLi2"><span>统计开始时间</span><input type="text" value="2016-04-01 07:00:00" class="timeIpt" data="" id="time1" onClick="jeDate({dateCell:\'#time1\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"></li>'+
                    '<li class="environmentLi2"><span>统计结束时间</span><input type="text" value="2016-04-01 20:00:00" class="timeIpt" data="" id="time2" onClick="jeDate({dateCell:\'#time2\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"></li>'+
                    '<li class="environmentLi2"><input type="button" value="确定" class="chartBtn"></li>'+
                '</ul>'+
                '<div class="environment_content">'+
                    '<div class="chart" id="chart"></div>'+
                    '<div class="revise_frame">'+
                        '<p class="tj_title">环境观测站属性</p>'+                                                          
                        '<ul class="node_ul node_bg" id="node_ul">'+
                            '<li><span>环境站号</span><input id="node_number" type="text" value="" /></li>'+
                            '<li><span>站点名称</span><input id="node_name" type="text" value="" /></li>'+
                            '<li><span>路段编号</span><input id="node_roadNum" type="text" value="" /></li>'+
                            '<li><span>经度坐标</span><input id="node_lat" type="text" value="" /></li>'+
                            '<li><span>纬度坐标</span><input id="node_log" type="text" value="" /></li>'+
                            '<li><span>设备厂家</span><input id="node_production" type="text" value="" /></li>'+
                            '<li><span>设备类型</span><input id="node_type" type="text" value="" /></li>'+
                            '<li><span>供电类型</span><input id="node_electric" type="text" value="太阳能" /></li>'+
                            '<li><span>通信连接</span><input id="node_communication" type="text" value="127.0.1.1" /></li>'+
                        '</ul>'+
                        // '<div class="btn_frame">'+
                        //     '<input type="submit" class="setup_environment_btn1" value="确定添加" onclick="update_Site()" />'+
                        //     '<input type="button" class="abolish_btn1" value="取消" onclick="zhao_none(\'.zhao\',\'.environment_Data_statistics\')"/>'+
                        //     '<p class="csv_frame">'+
                        //         '<input type="button" class="csv_btn1" value="导出数据到csv"/>'+
                        //     '</p>'+
                        // '</div>'+
                        '<div class="btn_frame">'+
                            '<a id="P_btn_frame" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
    $('body').append(content);
    divDrag('.tj_title','.environment_Data_statistics');
    var data=[
        ['2016-04-01 07:00:00','120'],['2016-04-01 07:15:00','132'],['2016-04-01 07:30:00','140'],['2016-04-01 07:45:00','150'],['2016-04-01 08:00:00','165'],['2016-04-01 08:15:00','170'],['2016-04-01 08:30:00','176'],['2016-04-01 08:45:00','180'],['2016-04-01 09:00:00','180'],['2016-04-01 09:15:00','203'],
        ['2016-04-01 09:30:00','213'],['2016-04-01 09:45:00','156']
    ];
    charts_data(data,'PM2.5','0','500');
    $("body").delegate("#gasType","change",function(){
        if($(this)[0].selectedIndex==0){
            var data=[
                ['2016-04-01 07:00:00','120'],['2016-04-01 07:15:00','132'],['2016-04-01 07:30:00','140'],['2016-04-01 07:45:00','150'],['2016-04-01 08:00:00','165'],['2016-04-01 08:15:00','170'],['2016-04-01 08:30:00','176'],['2016-04-01 08:45:00','180'],['2016-04-01 09:00:00','180'],['2016-04-01 09:15:00','203'],
                ['2016-04-01 09:30:00','213'],['2016-04-01 09:45:00','156']
            ];
            charts_data(data,'PM2.5','0','500');
        }else if($(this)[0].selectedIndex==1){
            var data=[
                ['2016-04-01 07:00:00','99'],['2016-04-01 07:15:00','86'],['2016-04-01 07:30:00','120'],['2016-04-01 07:45:00','122'],['2016-04-01 08:00:00','120'],['2016-04-01 08:15:00','120'],['2016-04-01 08:30:00','130'],['2016-04-01 08:45:00','98'],['2016-04-01 09:00:00','80'],['2016-04-01 09:15:00','75'],
                ['2016-04-01 09:30:00','90'],['2016-04-01 09:45:00','86']
            ];
            charts_data(data,'PM10','0','500');
        }else if($(this)[0].selectedIndex==2){
            var data=[
                ['2016-04-01 07:00:00','10'],['2016-04-01 07:15:00','20'],['2016-04-01 07:30:00','15'],['2016-04-01 07:45:00','20'],['2016-04-01 08:00:00','22'],['2016-04-01 08:15:00','27'],['2016-04-01 08:30:00','30'],['2016-04-01 08:45:00','20'],['2016-04-01 09:00:00','16'],['2016-04-01 09:15:00','10'],
                ['2016-04-01 09:30:00','15'],['2016-04-01 09:45:00','20']
            ];
            charts_data(data,'NO2','0','50');
        }else if($(this)[0].selectedIndex==3){
            var data=[
                ['2016-04-01 07:00:00','30'],['2016-04-01 07:15:00','50'],['2016-04-01 07:30:00','55'],['2016-04-01 07:45:00','60'],['2016-04-01 08:00:00','55'],['2016-04-01 08:15:00','48'],['2016-04-01 08:30:00','40'],['2016-04-01 08:45:00','50'],['2016-04-01 09:00:00','80'],['2016-04-01 09:15:00','75'],
                ['2016-04-01 09:30:00','90'],['2016-04-01 09:45:00','86']
            ];
            charts_data(data,'CO','0','100');
        }else if($(this)[0].selectedIndex==4){
            var data=[
                ['2016-04-01 07:00:00','10'],['2016-04-01 07:15:00','16'],['2016-04-01 07:30:00','33'],['2016-04-01 07:45:00','33'],['2016-04-01 08:00:00','40'],['2016-04-01 08:15:00','45'],['2016-04-01 08:30:00','56'],['2016-04-01 08:45:00','98'],['2016-04-01 09:00:00','80'],['2016-04-01 09:15:00','75'],
                ['2016-04-01 09:30:00','90'],['2016-04-01 09:45:00','86']
            ];
            charts_data(data,'SO2','0','100');
        }else if($(this)[0].selectedIndex==5){
            var data=[
                ['2016-04-01 07:00:00','20'],['2016-04-01 07:15:00','18'],['2016-04-01 07:30:00','44'],['2016-04-01 07:45:00','36'],['2016-04-01 08:00:00','40'],['2016-04-01 08:15:00','56'],['2016-04-01 08:30:00','80'],['2016-04-01 08:45:00','98'],['2016-04-01 09:00:00','80'],['2016-04-01 09:15:00','75'],
                ['2016-04-01 09:30:00','90'],['2016-04-01 09:45:00','86']
            ];
            charts_data(data,'O3','0','100');
        }
        TDR_CVS(data);
    })
    TDR_CVS(data);
 }
 function TDR_CVS(data){
    var str;
    if($("#gasType")[0].selectedIndex==0){
        str = "pm2.5,日期时间,数值\n";
    }else if($("#gasType")[0].selectedIndex==1){
        str = "pm10,日期时间,数值\n";
    }else if($("#gasType")[0].selectedIndex==2){
        str = "NO2,日期时间,数值\n";
    }else if($("#gasType")[0].selectedIndex==3){
        str = "CO,日期时间,数值\n";
    }else if($("#gasType")[0].selectedIndex==4){
        str = "SO2,日期时间,数值\n";
    }else if($("#gasType")[0].selectedIndex==5){
        str = "O3,日期时间,数值\n";
    }
    for(var i=0;i<data.length;i++){
        str+=(i+1)+","+data[i][0]+","+data[i][1]+"\n";
    }
    str =  encodeURIComponent(str);
    $("#P_btn_frame")[0].href = "data:text/csv;charset=utf-8,\ufeff"+str;
};
//环境站管理
var maxSiteID = 0;


querySite();
function querySite(){
    $.ajax({
        url:"GetDevice",
        dataType:"json",
        data:{ "action":"query","type":"130"},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
            createSite( data );
        },
        error:function(){ }
    });
}

function createSite(data){
	for(var i=0;i<data.entitys.length;i++){
		var arrSite = data.entitys[i];
		insertSite(arrSite[0],arrSite[1],arrSite[2],arrSite[3]);
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
        var val="{ID:"+ID+"}";
	$.ajax({
		 url:"GetDevice",
         dataType:"json",
         data:{ "action":"delete","type":130,"val":"device_id"+","+ID},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
            //alert("删除成功！");
            var obj = "删除成功！";
            reviseAlert(obj);
            markershow()
         },
         error:function()
         {

         }
	});
	
})
$("body").delegate(".More","click",function(){
	charts_Station_revise();
	ID = $(this).parents("li").attr("id");//.split("_")[1]
		var geo = $(this).attr("data").split(" ");
        var val="{ID:"+ID.split("_")[1]+"}";
	$.ajax({
		 url:"GetDevice",
         dataType:"json",
         data:{ "action":"query","type":131,"val":val},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
            $("#node_number").val(data.entitys[1]);
            $("#node_name").val(data.entitys[2]);
            $("#node_roadNum").val(data.entitys[3]);
            $("#node_production").val(data.entitys[4]);
            $("#node_type").val(data.entitys[5]);
            $("#node_lat").val((geo[0]-0).toFixed(4));
            $("#node_log").val((geo[1]-0).toFixed(4));
            console.log(data);
         },
         error:function(){}
	});
	
})

function insertSite(ID,siteNum,siteName,siteGeo){
		html ='<li onclick="listClick(this)" id="site_'+ID+'">'+
			'<div class="li_box">'+
				'<div class="box_img"><img src="images/greenflag.png" class="li_flag"></div>'+
				'<div class="li_words">'+
					'<p class="environmentList_number">'+siteNum+'</p>'+
					'<p class="cross_name">'+siteName+'</p>'+
				'</div>'+
				'<img src="images/del0.png" class="delete">'+
				'<img src="images/more.png" class="More" data="'+siteGeo+'">'+
				'</div>'+
		'</li>';
	$(".environmentList_Ul").append(html);	
}
//添加站点 
function insert_Site(){
//添加站点 ajax
    var device_id = maxSiteID+1;
	var number = $("#number").val();
	var name = $("#name").val();
	var roadNum = $("#roadNum").val();
	var Lon = $("#Lon").val();
	var Lag = $("#Lag").val();
	var production = $("#production").val();
	var type = $("#type").val();
	insertSite(device_id,number,name,(Lon+","+Lag));
	var value = "'"+device_id+"';'"+number+"';'"+name+"';'"+roadNum+"';'"+production+"';'"+type+"';"+Lon+" "+Lag+"]";
	siteAjax(value);

}
//修改站点 
// function update_Site() {
// 	//修改站点 ajax
// 	var device_id = ID.split("_")[1];
// 	var number = $("#node_number").val();
// 	var name = $("#node_name").val();
// 	var roadNum = $("#node_roadNum").val();
// 	var Lon = $("#node_lat").val();
// 	var Lag = $("#node_log").val();
// 	var production = $("#node_production").val();
// 	var type = $("#node_type").val();
// 	$("#"+ID+" .environmentList_number").text(number);
// 	$("#"+ID+" .cross_name").text(name);
// 	var value = "'"+device_id+"';'"+number+"';'"+name+"';'"+roadNum+"';'"+production+"';'"+type+"';"+Lon+" "+Lag+"]";
// 	siteAjax(value,device_id);
// }

// function siteAjax(value,device_id){
// 	var dd=true;
// 		$(".node_ul input").each(function(){
// 			if($(this).val()==""){
// 				dd=false;
// 			}
// 		});
// 	if(dd){
//     	$.ajax({
// 		 url:"GetDevice",
//          dataType:"json",
//          data:{ "action":"insert","type":130,"val":value},
//          contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
//          beforeSend:function(){  },
//          success: function( data, textStatus, jqXHR ){
//          	if(device_id){
//          		//alert("修改成功！");
//                 var obj = "修改成功！";
//                reviseAlert(obj);
//          	}else{
		
// 			maxSiteID++;
//                //alert("添加成功！");
//                var obj = "添加成功！";
//                reviseAlert(obj);
//             }
//          },
//          error:function()
//          {

//          }
// 	});
// 	}else{
// 			alert("数据格式不正确或为空");
// 		}
// }
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
function getlinkId(argument){//路网ID的选择
    var id;
    id =argument.id.split("_")[1];
    $("#roadNum").val(id);
}
function describeValOver(argument){
    var divMap=$("#map");
    var beforelineColor,beforeLine;
    var vector=supermap.getLayersByName("vector")[0];
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
if(supermap.getZoom()>13){
    var showVal =parseInt(argument.state) ;
    if(divMap.attr("roadFlag")=="道路尾气"){//道路尾气
        if(argument.off_gas==undefined){
            argument.off_gas={
                "co2":'无数据',
                "nox":'无数据',
                "co":'无数据',
                "hc":'无数据',
                "pm":'无数据',
                "pm2.5":'无数据'
            }
            var showVal="二氧化碳："+argument.off_gas["co2"]+"<br><span style='margin-left:10px'></span>"+"氮氧化物："+argument.off_gas["nox"]+"<br><span style='margin-left:10px'></span>"+"一氧化碳："+argument.off_gas["co"]+"<br><span style='margin-left:10px'></span>"+"碳氢化合物："+argument.off_gas["hc"]+"<br><span style='margin-left:10px'></span>"+"颗粒物："+argument.off_gas["pm"]+"<br><span style='margin-left:10px'></span>"+"PM2.5粒子："+argument.off_gas["pm2.5"];
        }else{
            var showVal="二氧化碳："+(argument.off_gas["co2"]-0).toFixed(2)+'g'+"<br><span style='margin-left:10px'></span>"+"氮氧化物："+(argument.off_gas["nox"]-0).toFixed(2)+'g'+"<br><span style='margin-left:10px'></span>"+"一氧化碳："+(argument.off_gas["co"]-0).toFixed(2)+'g'+"<br><span style='margin-left:10px'></span>"+"碳氢化合物："+(argument.off_gas["hc"]-0).toFixed(2)+'g'+"<br><span style='margin-left:10px'></span>"+"颗粒物："+(argument.off_gas["pm"]-0).toFixed(2)+'g'+"<br><span style='margin-left:10px'></span>"+"PM2.5粒子："+(argument.off_gas["pm2.5"]-0).toFixed(2)+'g';
        }
        
    }
    var popup = new SuperMap.Popup.FramedCloud(
        "Frame_popups",
        supermap.getLonLatFromPixel(new SuperMap.Pixel((event.pageX+12),event.pageY)),//将鼠标位置转换为经纬度坐标
        null,//new SuperMap.Size(112,33)
        showVal,//'<div class="desValFrame"><span>'+showVal+'</span></div>'
        null,
        false,
        null,
        false
    );
//添加弹窗到map图层
    
    supermap.addPopup(popup);
    if(divMap.attr("roadFlag")=="道路尾气"){
        $("#Frame_popup").css({"width":"148px","height":"139px","background-color":"#f5f5f5","border":"3px solid #0B3893","border-radius":"8px"});
        $("#Frame_popup_contentDiv").css({"width":"146px","height":"133px"});
        $(".desValFrame").css({"width":"136px"});
    }
    $(".desValFrame span").css("margin-left","10px");
    vector.redraw();
}
}
var beforelineWidth;
function describeValOut(argument){
    // var vector=supermap.getLayersByName("markerLayer2")[0];
    supermap.removeAllPopup();
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