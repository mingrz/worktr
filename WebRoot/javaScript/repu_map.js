var beforelineWidth;//路网划过之前的线宽
var infowin,beforeLine,beforelineColor;//划过之前的路网线，之前的颜色
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
var ID;
var map = {};
var lineMap = {};var features=[];
var markerZoomMap = {};
var infowin,beforeLine,beforelineColor,beforeMarker;
    ratioHeight('thermographyFrame','thermographyLayer',4,1);
    ratioHeight('thermographyFrame','thermographyList',2,1);
    ratioHeight('thermographyFrame','weatherData',4,1);
    $(".environmentLayer_Ul_u1 input").each(function(){
});
$(".environmentLayer_Ul_u1 input").click(function(){
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
    $("#dynamic").click(function(){
        var divMap=$("#map");
        divMap.attr("roadFlag","动态安全");
        if($(this).prop("checked") == true){
        	$("#statics").attr("checked",false).parent().css("color","#000");
        	$("#weather_roads").attr("checked",false).parent().css("color","#000");
            if(divMap.attr("roadFlag")=="动态安全"){
              bFlagRealData=1;
              queryRealData();
            }
            $(".roadSafeFrame").css("display","block");
        }else{
            vector.setVisibility(false);
            // $(".temperature_block").remove();
        }
    })
    $("#statics").click(function(){
        var divMap=$("#map");
        divMap.attr("roadFlag","静态安全");
    	if($(this).prop("checked") == true){
    	$("#dynamic").attr("checked",false).parent().css("color","#000");
    	$("#weather_roads").attr("checked",false).parent().css("color","#000");
    	if(divMap.attr("roadFlag")=="静态安全"){
          bFlagRealData=1;
          queryRealData();
        }
        $(".roadSafeFrame").css("display","block");
	}else{
        vector.setVisibility(false);
        // $(".temperature_block").remove();
        }
    })
    $("#weather_roads").click(function(){
        var divMap=$("#map");
        divMap.attr("roadFlag","天气安全");
    	 if($(this).prop("checked") == true){
    	 	$("#dynamic").attr("checked",false).parent().css("color","#000");
    	    $("#statics").attr("checked",false).parent().css("color","#000");
    	 	// roadFlag=12;
            if(divMap.attr("roadFlag")=="天气安全"){
              bFlagRealData=1;
              queryRealData();
            }
            $(".roadSafeFrame").css("display","none");
	}else{
        vector.setVisibility(false);
            // $(".temperature_block").remove();
        }
    })
    $("#weather_stations").click(function(){
        if($(this).prop("checked") == true){
            markerlayer.setVisibility(true);
            markerlayer.clearMarkers();
            queryweatherStation();
        }else{
            markerlayer.setVisibility(false);
        }
    })
    $("#weather_video").click(function(){
        if($(this).prop("checked") == true){
            markerlayer1.setVisibility(true);
            markerlayer1.clearMarkers();
            Video_marker();
        }else{
            markerlayer1.setVisibility(false);
        }
    })
$(window).resize(function(){
    ratioHeight('thermographyFrame','thermographyLayer',4,1);
    ratioHeight('thermographyFrame','thermographyList',2,1);
    ratioHeight('thermographyFrame','weatherData',4,1);
});
//鼠标滚动事件
$(document).on("mousewheel DOMMouseScroll",function(){
    if(supermap.getZoom()>13){
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
var bFlagRealData;
function queryRoadNetFeature(){
    var divMap=$("#map");
    $.ajax({
         url:"GetRoadNet",
         dataType:"json",
         data:{ "action":"query","type":"30"},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){ 
             $(".zhao,#loading").css("display","block");
          },
         success: function( data, textStatus, jqXHR ){
             doRoadNetFeature( data );
             divMap.attr("roadFlag","动态安全");
             if(divMap.attr("roadFlag")=="动态安全"){
                bFlagRealData=1;
                queryRealData();
             }
             $(".roadSafeFrame").css("display","block");
             changeRoadActive();
         },
         complete:function(){
             $(".zhao,#loading").css("display","none");
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
function queryRealData(strDate){
  if( TL_AllLineMap==undefined||TL_AllLineMap[0]==0 )
    return;
  var roadUrl;
  var strDate='2016-04-01'+','+'420';
  // if(bFlagRealData==1){
    roadUrl="GetNetState";
  // }else if(bFlagRealData==40||bFlagRealData==50||bFlagRealData==60||bFlagRealData==70){
  //   roadUrl="GetNetIndex";
  // }
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
// function setLineProperty(lineVector,width,state, level, speed,j) {
// 	lineVector.state=state;
//     lineVector.speed=speed;  
//     lineMap[j]=lineVector;
//     var color;
//     if(state > 0) {
//     	var arr = ["red","yellow","green","blue","black"];
//  	// index = Math.floor(Math.random()*5);
//     	color = arr[state];     
//     } else if(level > 0) {
        		
//     }
//     else if(speed > 0){
        		
//     }
//     	lineVector.style = {
//     	strokeColor: color,
//     	fill: false,
//     	strokeWidth: width
//     	}
// }
/**创建新的气象观测站点**/
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
function unFeatureSelect() {//气象站删除点的功能
    featuresLayer.removeAllFeatures([]);
    featuresLayer.setVisibility(false);
}

 //标记点弹窗的弹窗的隐藏（btn）        
function zhao_none(a,b){
    $(a).css("display","none");
    $(b).remove();
}
function getlinkId(argument){//路网ID的选择
    var id;
    id =argument.id.split("_")[1];
    $("#roadNum").val(id);
}
//观测站添加的属性框
 function emptyStation_information(){
    gmarker= this;
    var content='';
    content+='<div class="jd_nodes" style="height: 267px;">'+
                '<p class="tj_title">添加气象观测站<img src="images/min.png" class="empty_btn" style="cursor:pointer" onclick="zhao_none(\'.zhao\',\'.jd_nodes\'),unFeatureSelect(),closeVectorOrNot()"></p>'+
                '<ul class="node_ul">'+
                    '<li><span>气象站号</span><input type="text" id="number" readonly="readonly" value="'+(maxSiteID+1)+'" /></li>'+
                    '<li><span>路段名称</span><input type="text" id="name" value="" /></li>'+
                    '<li><span>站点桩号</span><input type="text" id="pileno"  value="" /></li>'+
                    '<li><span>路段编号</span><input type="text" id="roadNum" value="" /></li>'+
                    '<li><span>经度坐标</span><input type="text" id="Lon" readonly="readonly" value="'+pos.lon+'" /></li>'+
                    '<li><span>纬度坐标</span><input type="text" id="Lag" readonly="readonly" value="'+pos.lat+'" /></li>'+
                    '<li><span>设备厂家</span><input type="text" id="production" value="" /></li>'+
                    '<li><span>设备类型</span><input type="text" id="type" value="" /></li>'+
                '</ul>'+
                '<p class="btn_frame">'+
                    '<input type="submit" class="setup_environment_btn1" value="确定添加" onclick="insert_Site(),zhao_none(\'.zhao\',\'.jd_nodes\'),markershow(),unFeatureSelect(),closeVectorOrNot()"/>'+
                    '<input type="button" class="abolish_btn1" value="取消" onclick="zhao_none(\'.zhao\',\'.jd_nodes\'),unFeatureSelect(),closeVectorOrNot()"/>'+
                '</p>'+
            '</div>';
    $('body').append(content);
    divDrag('.tj_title','.jd_nodes');
    // getlinkId(argument);
    if($("#dynamic,#statics,#weather_roads").prop("checked")==false){
        vector.setVisibility(true);
    }
 }
 function closeVectorOrNot(){
    if($("#dynamic,#statics,#weather_roads").prop("checked")==false){
        vector.setVisibility(false);
    }
 }
 //插入数据，后期改成ajax
function insertStation_information(){
    var Empty_station=$("#empty_station").val();
    var Empty_roadName=$("#empty_roadName").val();
    var Empty_Mileage=$("#empty_Mileage").val();
    var Empty_roadNumber=$("#empty_roadNumber").val();
    var Empty_lot=$("#empty_lot").val();
    var Empty_lat=$("#empty_lat").val();
    var Empty_vender=$("#empty_vender").val();
    var Empty_types=$("#empty_types").val();
    data.entitys.push([Empty_station-0]);
    data.entitys[data.entitys.length-1].push(""+Empty_roadName+"");
    data.entitys[data.entitys.length-1].push(""+Empty_Mileage+"");
    data.entitys[data.entitys.length-1].push(Empty_roadNumber-0);
    data.entitys[data.entitys.length-1].push(Empty_vender);
    data.entitys[data.entitys.length-1].push(Empty_types);
    data.entitys[data.entitys.length-1].push(29);
    data.entitys[data.entitys.length-1].push(40);
    data.entitys[data.entitys.length-1].push(2);
    data.entitys[data.entitys.length-1].push("东北");
    data.entitys[data.entitys.length-1].push(101);
    data.entitys[data.entitys.length-1].push("湿");
    data.entitys[data.entitys.length-1].push(16);
    data.entitys[data.entitys.length-1].push(0);
    data.entitys[data.entitys.length-1].push(6);
    data.entitys[data.entitys.length-1].push("阴");
    data.entitys[data.entitys.length-1].push(0);
    data.entitys[data.entitys.length-1].push(""+Empty_lot+' '+Empty_lat+"");
    markerlayer.setVisibility(false);
    
 }
 //请求观测站点的ajax
function queryweatherStation(){
            $.ajax({
                url:"GetDevice",
                dataType:"json",
                data:{ "action":"query","type":"100"},
                contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
                beforeSend:function(){  },
                success: function( data, textStatus, jqXHR ){
                    weatherStation_marker( data );
                },
                error:function()
                {

                }
            });
        }
//气象站marker
        function weatherStation_marker(data){
            if( data ){
                for( var item in data.entitys ){
                        var statedata = data.entitys[item][3].split(",");
                        var lonlat = SuperMap.LonLat.fromString(+statedata[0]+','+statedata[1]);
                        var size = new SuperMap.Size(22,22);
                        var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
                        var id = data.entitys[item][0];
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
        marker.events.on({"click":leftData_Station,"rightclick": mouseClickHandler});
        // mouseClickHandler(marker);
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

        var infowin;
    function mouseClickHandler(gmarker){//警报弹出传
     	      clearPopup();
			 var gmarker = this;
             var p= supermap.getPixelFromLonLat(gmarker.lonlat);
             var content='<div class="zhao_bg red_bg"></div>'+
                            '<div class="weather_alarm">'+
                                '<p class="alarm_title">KM36+500西山道西侧</p>'+
                                '<div class="alarmImg_frame">'+
                                    '<img src="images/road_temperature.png" class="road_temperature alarm">'+
                                    '<img src="images/rain.png" class="rain ">'+
                                    '<img src="images/air_temperature.png" class="air_temperature ">'+
                                '</div>'+
                                '<p class="alarmTemperature_frame">'+
                                    '<span class="roadTemperature">路温</span>:'+
                                    '<span class="roadTemperature_val">10.3</span>'+
                                    '<span class="airTemperature">气温</span>:'+
                                    '<span class="airTemperature_val">20.3</span>'+
                                '</p>'+
                            '</div>';
            //初始化Anchored类
            var popup = new SuperMap.Popup(
                     "chicken",
                     gmarker.lonlat,
                     new SuperMap.Size(194,108),
                     content,
                     true,
                     null
             );

             infowin = popup;
            //添加弹窗到map图层
             supermap.addPopup(popup);
         }
 //清除弹出框
function clearPopup(){
    if(infowin!=undefined){
     infowin.hide();
     infowin.destroy();
    }
};
var data={entitys:
  [
    [1,"北苑路","KM396+500",12,"南京莱斯","纳诺信",23,35,3,"东南",101,"干",15,0,3,"晴",0,"12994189.00633 4795956.47431"],
    [2,"北苑西路","KM396+500",22,"南京莱斯","纳诺信",24,35,3,"东南",101,"湿",15,0,3,"小雨",2,"12994255.88873 4795344.97808"],
    [3,"立汤路","KM396+500",43,"南京莱斯","纳诺信",25,35,3,"东南",101,"干",15,0,3,"晴",0,"12990749.34006 4792172.84141"],
    [4,"北京路","KM396+500",77,"南京莱斯","纳诺信",26,35,3,"东南",101,"干",15,0,3,"晴",0,"12990711.12155 4798899.29990"],
    [5,"高尔基路","KM396+500",99,"南京莱斯","纳诺信",27,35,3,"东南",101,"干",15,0,3,"晴",0,"12990954.76458 4795287.65031"]
  ]
}
$("body").delegate("#map","click",function(){$(".environmentData_Ul li").css("display","none");})
//点击观测站站点气泡左键，数据的展现
function leftData_Station(){
            $(".environmentData_Ul li").css("display","block");
            var gmarker= this;
            var gmarkerId=gmarker.id;
            $(".environmentList_Ul p").css("color","#000");
            $("#site_"+gmarkerId+" p").css("color","red");

            if( markerZoomMap[gmarker.id]==beforeMarker )
                return;

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
//                     gmarkerId=data.entitys[item][0];
                       var valName=['大气温度','相对湿度','风速','风向','大气压','路面状态','路面温度','冰点温度','覆盖物厚度','天气类型','降水量'];
                        $("#airTemperature").html(valName[0]);
                        $("#relativeHumidity").html(valName[1]);
                        $("#windSpeed").html(valName[2]);
                        $("#windDirection").html(valName[3]);
                        $("#atmosphere").html(valName[4]);
                        $("#conditionScore").html(valName[5]);
                        $("#pavementTemperature").html(valName[6]);
                        $("#freezingTemperature").html(valName[7]);
                        $("#coveringThickness").html(valName[8]);
                        $("#weatherType").html(valName[9]);
                        $("#precipitation").html(valName[10]);
                         $("#airTemperature_val").html(data.entitys[item][6]);
                        $("#relativeHumidity_val").html(data.entitys[item][7]);
                        $("#windSpeed_val").html(data.entitys[item][8]);
                        $("#windDirection_val").html(data.entitys[item][9]);
                        $("#atmosphere_val").html(data.entitys[item][10]);
                        $("#conditionScore_val").html(data.entitys[item][11]);
                        $("#pavementTemperature_val").html(data.entitys[item][12]);
                        $("#freezingTemperature_val").html(data.entitys[item][13]);
                        $("#coveringThickness_val").html(data.entitys[item][14]);
                        $("#weatherType_val").html(data.entitys[item][15]);
                        $("#precipitation_val").html(data.entitys[item][16]);
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
                new SuperMap.LonLat(12947740.43195,4849276.91421),
                  new SuperMap.LonLat(12948290.42026,4849571.31620),
                  new SuperMap.LonLat(12949393.97985,4849963.65314),
                  new SuperMap.LonLat(12949410.70045,48449168.23031),
                  new SuperMap.LonLat(12949428.61538,4848493.43467),
                  new SuperMap.LonLat(12949438.17001,4848089.75162)
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
                        //marker =new SuperMap.Marker(lonlat,icon);
                        marker =new SuperMap.Marker(dot,icon);
                        markerlayer1[0].addMarker(marker);
                        //marker.events.on({"click":menuDiv,"scope": marker});
                    }
             //   }
            //}
        };
/************路面，冰点**************/
// function drawCompleted(drawGeometryArgs){
//             if(beforeLine){
//                 beforeLine.style={strokeColor:beforelineColor,strokeWidth:5};
//                 vector.addFeatures(beforeLine);
//             }
//             //之前line样式
//             beforelineColor = drawGeometryArgs.style.strokeColor;
//             beforeLine = drawGeometryArgs;
            
//             //清除之前popup
//             clearPopup();
//             //路段高亮
//              drawGeometryArgs.style={
//                             strokeColor:"#ccc",
//                             fill:true,
//                             strokeWidth:5
//                         };
//             vector.addFeatures(drawGeometryArgs);           
            
//             var speed =drawGeometryArgs.speed;
//             var popup = new SuperMap.Popup("false", 
//                                      supermap.getLonLatFromPixel(new SuperMap.Pixel(event.pageX,event.pageY)),//将鼠标位置转换为经纬度坐标
//                                      new SuperMap.Size(70,20),
//                                      speed,
//                                      true,
//                                      null
//             );
//             infowin = popup;
//     //添加弹窗到map图层
//             supermap.addPopup(popup);
//         }
        
// $("body").delegate("#false_close","mouseover",function(){
//         if(beforeLine){
//             beforeLine.style={strokeColor:beforelineColor,strokeWidth:5};
//             vector.addFeatures(beforeLine);
//     }
// });



/**************************/
//热谱图层下的温度表
function temperature_block(){
    var content='';
    content+='<div class="temperature_block">'+
                    '<p class="temperature_title">热普地图</p>'+
                    '<ul class="temperature_Ul">'+
                        '<li><i class="temperature_color temperature_bg1"></i><span class="temperature_color_val">5<sup>▫</sup>C</span>'+
                            '<i class="freezing_color freezing_bg1"></i><span class="freezing_color_val">-5<sup>▫</sup>C</span></li>'+
                        '<li><i class="temperature_color temperature_bg2"></i><span class="temperature_color_val">4<sup>▫</sup>C</span>'+
                            '<i class="freezing_color freezing_bg2"></i><span class="freezing_color_val">-4<sup>▫</sup>C</span></li>'+
                        '<li><i class="temperature_color temperature_bg3"></i><span class="temperature_color_val">3<sup>▫</sup>C</span>'+
                            '<i class="freezing_color freezing_bg3"></i><span class="freezing_color_val">-3<sup>▫</sup>C</span></li>'+
                        '<li><i class="temperature_color temperature_bg4"></i><span class="temperature_color_val">2<sup>▫</sup>C</span>'+
                            '<i class="freezing_color freezing_bg4"></i><span class="freezing_color_val">-2<sup>▫</sup>C</span></li>'+
                        '<li><i class="temperature_color temperature_bg5"></i><span class="temperature_color_val">1<sup>▫</sup>C</span>'+
                            '<i class="freezing_color freezing_bg5"></i><span class="freezing_color_val">-1<sup>▫</sup>C</span></li>'+
                    '</ul>'+
                    '<p class="now_color">'+
                        '<i class="temperature_color temperature_bg6"></i><span class="temperature_color_val">当前温度</span>'+
                    '</p>'+
                '</div>';
    $('body').append(content);
}

//气象站管理
var maxSiteID = 0;

querySite();
function querySite(){
            $.ajax({
                url:"GetDevice",
                dataType:"json",
                data:{ "action":"query","type":"100"},
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
		insertSite(arrSite[0],arrSite[0],arrSite[2],arrSite[3]);
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
         data:{ "action":"delete","type":100,"val":"device_id"+","+ID},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               reviseAlert("删除成功！");
               markershow();
         },
         error:function()
         {

         }
	});
	
})
$("body").delegate(".More","click",function(){
	thermography_DataCharts();
	ID = $(this).parents("li").attr("id");//.split("_")[1]
		var geo = $(this).attr("data").split(",");
        var val="{ID:"+ID.split("_")[1]+"}";
	$.ajax({
		 url:"GetDevice",
         dataType:"json",
         data:{ "action":"query","type":101,"val":val},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
            $("#node_number").val(data.entitys[0]);
            $("#node_name").val(data.entitys[3]);
            $("#node_pileno").val(data.entitys[2]);
            $("#node_roadNum").val(data.entitys[1]);
            $("#node_production").val(data.entitys[4]);
            $("#node_type").val(data.entitys[5]);
            $("#node_lat").val(geo[0]);
            $("#node_log").val(geo[1]);
         },
         error:function()
         {

         }
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
//添加站点 ajax
function insert_Site(){
    var device_id = maxSiteID+1;
	var number = $("#number").val();
	var name = $("#name").val();
	var pileno = $("#pileno").val();
	var roadNum = $("#roadNum").val();
	var Lon = $("#Lon").val();
	var Lag = $("#Lag").val();
	var production = $("#production").val();
	var type = $("#type").val();
	insertSite(device_id,device_id,name,(Lon+","+Lag));
	var value = "'"+device_id+"';'"+roadNum+"';'"+pileno+"';'"+name+"';'"+production+"';'"+type+"';"+Lon+" "+Lag+"]";
	siteAjax(value);
}
//修改站点 ajax
function update_Site() {
	var device_id = ID.split("_")[1];
	var number = $("#node_number").val();
	var name = $("#node_name").val();
	var pileno = $("#node_pileno").val();
	var roadNum = $("#node_roadNum").val();
	var Lon = $("#node_lat").val();
	var Lag = $("#node_log").val();
	var production = $("#node_production").val();
	var type = $("#node_type").val();
	$("#"+ID+" .environmentList_number").text(number);
	$("#"+ID+" .cross_name").text(name);
	var value = "'"+device_id+"';'"+roadNum+"';'"+pileno+"';'"+name+"';'"+production+"';'"+type+"';"+Lon+" "+Lag+"]";
	siteAjax(value,device_id);
}

function siteAjax(value,device_id){
	var dd=true;
		$(".node_ul input").each(function(){
			if($(this).val()==""){
				dd=false;
			}
		});
	if(dd){
    	$.ajax({
		 url:"GetDevice",
         dataType:"json",
         data:{ "action":"insert","type":100,"val":value},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
         	if(device_id){
               reviseAlert("修改成功！");
         	}else{
			maxSiteID++;
               reviseAlert("添加成功！");

            }
         },
         error:function()
         {

         }
	});
	}else{
			alert("数据格式不正确或为空");
		}
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
function markershow(){//添加点时的渲染
    $("#weather_stations").attr("checked",true);
    $("#weather_stations").parent().css("color","red");
    queryweatherStation();
}
$("#Signboard").click(function(){
    if($(this).prop("checked") == true){
        markers.setVisibility(true);
        markers.clearMarkers();
        addMarker();
    }else{
        markers.setVisibility(false);
    }
})
//定义addMarker函数，触发layerInitialized事件会调用此函数
function addMarker(){
    var lonlat = [
     new SuperMap.LonLat(12995798.96124,4797953.39167),
      new SuperMap.LonLat(12994936.65602,4797838.73613),
      new SuperMap.LonLat(12994750.34076,4799030.67604),
      new SuperMap.LonLat(12997181.99372,4798158.81619),
      new SuperMap.LonLat(12997294.26067,4797423.10979),
      new SuperMap.LonLat(12994045.68691,4797740.80119),
      new SuperMap.LonLat(12993938.19733,4798306.91293),
      new SuperMap.LonLat(12993921.47673,4798710.59599),
      new SuperMap.LonLat(12993880.86956,4799173.99547),
      new SuperMap.LonLat(12993790.10059,4800158.12221),
      new SuperMap.LonLat(12993661.11311,4800989.37489),
      new SuperMap.LonLat(12992942.12731,4800920.10383),
      new SuperMap.LonLat(12992110.87463,4800850.83278),
      new SuperMap.LonLat(12993625.28325,4801959.16969),
      new SuperMap.LonLat(12993231.15482,4797704.97133),
      new SuperMap.LonLat(12994093.46005,4796830.72282),
      new SuperMap.LonLat(12994093.46005,4796830.72282),
      new SuperMap.LonLat(12994112.56931,4796350.60274),
      new SuperMap.LonLat(12993312.36917,4796718.45594),
      new SuperMap.LonLat(12993255.04139,4797203.35333),
      new SuperMap.LonLat(12990926.10069,4795364.08734),
      new SuperMap.LonLat(12990911.76875,4796379.26662),
      new SuperMap.LonLat(12990840.10903,4797425.49845),
      new SuperMap.LonLat(12990742.17409,4798070.43587),
      new SuperMap.LonLat(12990696.78960,4799035.45336)
    ];
    // var markers=supermap.getLayersByName("markers");
    if(lonlat)
        {
          for( var item in lonlat ){
            var dot = lonlat[item];
            var size = new SuperMap.Size(33,33);
            var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
            icon = new SuperMap.Icon('./images/float/liang/0.png', size, offset);
            marker =new SuperMap.Marker(dot,icon) ;
            markers.addMarker(marker);
            //注册 click 事件,触发 mouseClickHandler()方法
           marker.events.on({"click":mouseClickHandler});
          }
       } 
};
//定义mouseClickHandler函数，触发click事件会调用此函数
function mouseClickHandler(event){
    clearPopup();
    gmarker= this;
    var p= supermap.getPixelFromLonLat(gmarker.lonlat);
    //初始化Anchored类
    var popup = new SuperMap.Popup(
        "chicken",
        gmarker.lonlat,
        new SuperMap.Size(194,108),
        '<img style="max-width: 100% !important;" src="./images/timg.jpg">',
        true,
        null
    );
    infowin = popup;
    //添加弹窗到map图层
    supermap.addPopup(popup);
}
function overRoadIndex(argument){
    function Random(low,height){
        var num = height-low;
        return Math.floor(Math.random()*num+low);
    }
    overAndOut(argument,12,beforelineWidth);
    var showVal;  
    var divMap=$("#map");
    if(divMap.attr("roadFlag")=="静态安全"){
        showVal =parseInt(argument.state);
        if(showVal==0){
            showVal = "风险状况(高)"+"<br>"+"风险指标:"+Random(23,30);
        }else if(showVal==1){
            showVal = "风险状况(较高)"+"<br>"+"风险指标:"+Random(13,23);
        }else if(showVal==2){
            showVal = "风险状况(中)"+"<br>"+"风险指标:"+Random(5,13);
        }else if(showVal==3){
            showVal = "风险状况(较低)"+"<br>"+"风险指标:"+Random(3,5);
        }else if(showVal==4){
            showVal = "风险状况(低)"+"<br>"+"风险指标:"+Math.floor(Math.random()*2);
        } 
    }else if(divMap.attr("roadFlag")=="天气安全"){
        showVal =parseInt(argument.state);
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
        showVal+="<br>"+"路面温度:"+"30"+"℃<br>"+"路面冰点:"+"-0.5℃"+"<br>"+"路面状态:"+"干";
    }else if(divMap.attr("roadFlag")=="动态安全"){
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
        showVal="安全车速:"+parseInt(_speed)+'km/h'+"<br>"+"风险指标:"+HR;
    }
    // var speed =drawGeometryArgs.speed;
    var popup = new SuperMap.Popup.FramedCloud(
    	"Frame_popups",
        supermap.getLonLatFromPixel(new SuperMap.Pixel(event.pageX+12,event.pageY)),//将鼠标位置转换为经纬度坐标
        null,// new SuperMap.Size(112,33)
        showVal,
        null,
        false,
        null,
        false
    );
  //添加弹窗到map图层
    supermap.addPopup(popup);
    if(divMap.attr("roadFlag")=="动态安全"||divMap.attr("roadFlag")=="静态安全"){
        $("#Frame_popup").css({"width":"128px","height":"56px","background-color":"#f5f5f5","border":"3px solid #0B3893","border-radius":"8px"});
        $("#Frame_popup_contentDiv").css({"width":"126px","height":"53px"});
        $(".desValFrame").css({"width":"116px"});
    }else if(divMap.attr("roadFlag")=="天气安全"){
        $("#Frame_popup").css({"width":"150px","height":"109px","background-color":"#f5f5f5","border":"3px solid #0B3893","border-radius":"8px"});
        $("#Frame_popup_contentDiv").css({"width":"146px","height":"103px"});
        $(".desValFrame").css({"width":"136px"});
    }
}
function outRoadIndex(argument){
    overAndOut(argument,beforelineWidth,beforelineWidth);
    supermap.removeAllPopup();
}

function overAndOut(argument,width1,width2){
    if(beforeLine){
        beforeLine.style={strokeColor:beforelineColor,strokeWidth:beforelineWidth};
        vector.addFeatures(beforeLine);
    }
    //之前line样式
    beforelineColor = argument.style.strokeColor;
    beforelineWidth = argument.style.strokeWidth;
    beforeLine = argument;
    //路段高亮
    if(supermap.getZoom()>13){//#F0E68C
      argument.style={
        strokeColor:beforelineColor,
        fill:true,
        strokeWidth:width1
    };
    }else{
      argument.style={
        strokeColor:beforelineColor,
        fill:true,
        strokeWidth:width2
    };
    }
    vector.redraw();
}
function changeRoadActive(){//同一图层 不同路网 数据方法展现（调用在height.js里）
    var divMap=$("#map");
   if(divMap.attr("roadFlag")=="静态安全"){//静态
        selectFeature_vector.deactivate();
            selectFeature_vector = new SuperMap.Control.SelectFeature(vector,{
                    callbacks: {"over":overRoadIndex,"out":outRoadIndex,"click":getlinkId}
                }); 
            supermap.addControl(selectFeature_vector);
            selectFeature_vector.activate();
    }else if(divMap.attr("roadFlag")=="动态安全"){//动态
        selectFeature_vector.deactivate();
            selectFeature_vector = new SuperMap.Control.SelectFeature(vector,{
                    callbacks: {"over":overRoadIndex,"out":outRoadIndex,"click":getlinkId}
                }); 
            supermap.addControl(selectFeature_vector);
            selectFeature_vector.activate();
    }else if(divMap.attr("roadFlag")=="天气安全"){//天气安全
        selectFeature_vector.deactivate();
            selectFeature_vector = new SuperMap.Control.SelectFeature(vector,{
                    callbacks: {"over":overRoadIndex,"out":outRoadIndex,"click":getlinkId}
                }); 
            supermap.addControl(selectFeature_vector);
            selectFeature_vector.activate();
    }
}