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

        });
var lineMap = {};var features=[];
var infowin,beforeLine,beforelineColor;
$(document).ready(function() { 
  ratioHeight('list_left','list2',3,1);//页面自适应高度
  ratioHeight('list_left','list3',3,1);
  ratioHeight('list_left','list1',3,1);
    $("#uu1 p").click(function(){//左侧第一模块收放
        $(this).next("ul").fadeToggle();
        $(this).toggleClass("arrowRight1");
    })
});
$(window).resize(function(){
  ratioHeight('list_left','list2',3,1);
  ratioHeight('list_left','list3',3,1);
  ratioHeight('list_left','list1',3,1);

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
$(".checkradio_ul input").each(function(){
    $(".checkradio_ul input").click(function(){
        $(".checkradio_ul input").attr("checked",false);
        $(this).attr("checked",true);
        $(".checkradio_ul input").parent().css("color","#000");
        $(this).parent().css("color","red");
        // $(this).parent().parent().siblings("li").Children("label").css("color","#000");
    })
});
$(".equipment_Ul input").click(function(){
    if($(this).prop("checked")==true){
        $(this).parent().css("color","red");
    }else{
        $(this).parent().css("color","#000");
    }
})
$("#ipt1").click(function(){
	// 	var arr =["高","较高","中","低","较低"];
	// for(var i=0;i<7630;i++){	
	// 	var index = Math.floor(Math.random()*5);
	// 	if(supermap.getZoom()>14){
	// 			setLine(lineMap[i],5,5,index, arr[index],i);
	// 	}else{
	// 		setLine(lineMap[i],2,5,index, arr[index],i);
	// 	}
	// }
	// //重绘图层
	// vector.redraw();
  // queryRoadNetFeature();
// roadFlag=10;
// bFlagRealData=1;
// queryRealData(); 
var divMap=$("#map");
divMap.attr("roadFlag","动态安全");
if(divMap.attr("roadFlag")=="动态安全"){
  bFlagRealData=1;
  queryRealData();
}
})
$("#roadNodes").click(function(){
// 		var arr =["高","较高","中","低","较低"];
// 	for(var i=0;i<7630;i++){	
// 		var index = Math.floor(Math.random()*5);
// 		if(supermap.getZoom()>14){
// 				setLine(lineMap[i],5,5,index,arr[index],i);
// 		}else{
// 			setLine(lineMap[i],2,5,index,arr[index],i);
// 		}
// 	}
// //重绘图层
// 	vector.redraw();
// queryRoadNetFeature();
// roadFlag=11;
// bFlagRealData=1;
// queryRealData();
var divMap=$("#map");
divMap.attr("roadFlag","静态安全");
if(divMap.attr("roadFlag")=="静态安全"){
  bFlagRealData=1;
  queryRealData();
}
})
$("#ipt2").click(function(){
	var arr =["80 KM/H","100 KM/H","70 KM/H","130 KM/H","120 KM/H"];
	for(var i=0;i<7630;i++){	
		var index = Math.floor(Math.random()*5);
		if(supermap.getZoom()>14){
				setLine(lineMap[i],5,5,index, arr[index],i);
		}else{
			setLine(lineMap[i],2,5,index, arr[index],i);
		}
	}
	//重绘图层
	vector.redraw();
})
var roadFlag,bFlagRealData;
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
        //   if( data ){
        //         var vol;
        //         var line,lineVector;
        //         features = [];
        //         var arr =["高","较高","中","低","较低"];
        //         for( var i=0;i<data.entitys.length;i++ ){
        //             var points=[];
        //             vol = data.entitys[i];

        //             for ( var j=2;j<vol.length;j++){
        //               var lonlat = SuperMap.LonLat.fromString(vol[j].split(",")[0]+','+vol[j].split(",")[1]);
        //                 lonlat = lonlat.transform("EPSG:4326","EPSG:900913");
        //                 points.push(new SuperMap.Geometry.Point(lonlat.lon,lonlat.lat));
        //                 // points.push(new SuperMap.Geometry.Point(vol[j],vol[j+1]));
        //             }
                    
        //             line = new SuperMap.Geometry.LineString(points);
        //             lineVector = new SuperMap.Feature.Vector(line);
        //             var index = Math.floor(Math.random()*5);
					   //       setLine(lineVector,2,5,index,arr[index],i);
                    
        //             features.push(lineVector);
        //         }
        //         vector.addFeatures(features);
        // }
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
// function createLine(line,width,state,level,speed,j){
//     var lineVector = new SuperMap.Feature.Vector(line);
//     lineVector.state=state;
//     lineVector.speed=speed;  
//     setLine(lineVector,width,state,level,speed,j);  
// //  features.push(lineVector);
//     lineMap[(j-1)/2]=lineVector;
//     return lineVector;
// //  vector.addFeatures(features);                
// }
function setLine(lineVector,width,state, level, speed,j) {
	 lineVector.state=state;
    lineVector.speed=speed;  
    lineMap[j]=lineVector;
    var color;
    if(state > 0) {
    	var arr = ["red","yellow","green","blue","black"];
//  	index = Math.floor(Math.random()*5);
    	color = arr[level];     
    } else if(level > 0) {
        		
    }
    else if(speed > 0){
        		
    }
    	lineVector.style = {
    	strokeColor: color,
    	fill: false,
    	strokeWidth: width
    	}
}
function overRoadIndex(argument){
    overAndOut(argument,12,beforelineWidth);
    var speed;  
    var _state =parseInt(argument.state);
    var divMap=$("#map");
    if(divMap.attr("roadFlag")=="动态安全"){
        if(_state==0){
            speed="V级";
        }else if(_state==1){
            speed="IV级";
        }else if(_state==2){
            speed="III级";
        }else if(_state==3){
            speed="II级";
        }else if(_state==4){
            speed="I级";
        }
    }else if(divMap.attr("roadFlag")=="静态安全"){
        if(_state==0){
            speed="高";
        }else if(_state==1){
            speed="较高";
        }else if(_state==2){
            speed="中";
        }else if(_state==3){
            speed="较低";
        }else if(_state==4){
            speed="低";
        }
    }
    // var speed =drawGeometryArgs.speed;
    var popup = new SuperMap.Popup("false", 
        supermap.getLonLatFromPixel(new SuperMap.Pixel(event.pageX+12,event.pageY)),//将鼠标位置转换为经纬度坐标
        new SuperMap.Size(70,20),
    speed,
        true,
        null
  );
  infowin = popup;
//添加弹窗到map图层
    supermap.addPopup(popup);
     $("#false_GroupDiv").css({"background-color":"#f5f5f5","border":"3px solid #0B3893","border-radius":"8px"});
    // $("#false_close").css({"right":"0px","top":"0px"});
    $("#false_close").css({"display":"none"});
}
function outRoadIndex(argument){
    overAndOut(argument,beforelineWidth,beforelineWidth);
    supermap.removeAllPopup();
}
var beforelineWidth;
function overAndOut(argument,width1,width2){
    if(beforeLine){
        beforeLine.style={strokeColor:beforelineColor,strokeWidth:5};
        vector.addFeatures(beforeLine);
    }
    //之前line样式
    beforelineColor = argument.style.strokeColor;
    beforelineWidth = argument.style.strokeWidth;
    beforeLine = argument;
    
    //路段高亮
    if(supermap.getZoom()>14){//#F0E68C
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
// function drawCompleted(drawGeometryArgs){
//     if(beforeLine){
//         beforeLine.style={strokeColor:beforelineColor,strokeWidth:5};
//         vector.addFeatures(beforeLine);
//     }
//     //之前line样式
//     beforelineColor = drawGeometryArgs.style.strokeColor;
//     beforeLine = drawGeometryArgs;
//     //清除之前popup
//    clearPopup();
//     //路段高亮
//     if(supermap.getZoom()>14){
//     	drawGeometryArgs.style={
//         strokeColor:"#BC8F8F",
//         fill:true,
//         strokeWidth:5
//     };
//     }else{
//     	drawGeometryArgs.style={
//         strokeColor:"#BC8F8F",
//         fill:true,
//         strokeWidth:2
//     };
//     }
//     vector.addFeatures(drawGeometryArgs);           
        	
//     var speed;  
//     var _state =parseInt(drawGeometryArgs.state);
//     var divMap=$("#map");
//     if(divMap.attr("roadFlag")=="动态安全"){
//         if(_state==0){
//             speed="V级";
//         }else if(_state==1){
//             speed="IV级";
//         }else if(_state==2){
//             speed="III级";
//         }else if(_state==3){
//             speed="II级";
//         }else if(_state==4){
//             speed="I级";
//         }
//     }else if(divMap.attr("roadFlag")=="静态安全"){
//         if(_state==0){
//             speed="高";
//         }else if(_state==1){
//             speed="较高";
//         }else if(_state==2){
//             speed="中";
//         }else if(_state==3){
//             speed="较低";
//         }else if(_state==4){
//             speed="低";
//         }
//     }
//     // var speed =drawGeometryArgs.speed;
// 	  var popup = new SuperMap.Popup("false", 
//         supermap.getLonLatFromPixel(new SuperMap.Pixel(event.pageX,event.pageY)),//将鼠标位置转换为经纬度坐标
//         new SuperMap.Size(70,20),
// 		speed,
//         true,
//         null
// 	);
// 	infowin = popup;
// //添加弹窗到map图层
//     supermap.addPopup(popup);
//     $("#false_GroupDiv").css({"background-color":"#f5f5f5","border":"3px solid #0B3893"});
//     $("#false_close").css({"right":"0px","top":"0px"});
// }
        
$("body").delegate("#false_close","mouseover",function(){
        if(beforeLine){
        	beforeLine.style={strokeColor:beforelineColor,strokeWidth:5};
        	vector.addFeatures(beforeLine);
    }
});
		
//清除弹出框
        function clearPopup(){
        	if(infowin!=undefined){
             infowin.hide();
             infowin.destroy();
            }
        };
$("#ipt5").click(function(){
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
     new SuperMap.LonLat(12951851.90804,4846256.45727),
      new SuperMap.LonLat(12951811.30087,4845749.46749),
      new SuperMap.LonLat(12951614.23666,4844485.86517),
      new SuperMap.LonLat(12951470.91723,4844223.11288),
      new SuperMap.LonLat(12952306.94723,4844398.08202),
      new SuperMap.LonLat(12951393.88304,4843956.18045),
      new SuperMap.LonLat(12951604.08487,4843799.12624),
      new SuperMap.LonLat(12950325.55614,4844047.54658),
      new SuperMap.LonLat(12950651.01067,4843982.45567),
      new SuperMap.LonLat(12948945.50948,4844456.00695),
      new SuperMap.LonLat(12948556.15837,4845068.10034),
      new SuperMap.LonLat(12947908.83228,4845322.49233),
      new SuperMap.LonLat(12948307.14086,4845415.05279),
      new SuperMap.LonLat(12948071.85813,4845776.93435),
      new SuperMap.LonLat(12947914.20676,4846005.05110),
      new SuperMap.LonLat(12947492.60878,4846596.24374),
      new SuperMap.LonLat(12947517.68968,4846740.16034),
      new SuperMap.LonLat(12947856.87899,4846720.45391),
      new SuperMap.LonLat(12948090.96739,4846817.79169),
      new SuperMap.LonLat(12948558.54702,4846755.68661),
      new SuperMap.LonLat(12947771.48450,4847719.50976),
      new SuperMap.LonLat(12947740.43195,4847592.31377),
      new SuperMap.LonLat(12947403.63130,4848302.34210),
      new SuperMap.LonLat(12947665.18925,4848476.71407),
      new SuperMap.LonLat(12947527.24430,4849094.18194)
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
        '<img src="./images/timg.jpg">',
        true,
        null
    );
    infowin = popup;
//添加弹窗到map图层
    supermap.addPopup(popup);
}
$("#ipt6").click(function(){
    if($(this).prop("checked") == true){
        markerlayer.setVisibility(true);
        markerlayer.clearMarkers();
        Video_marker();
    }else{
        markerlayer.setVisibility(false);
    }
})
//视频监控气泡点
function Video_marker(){
    var markerlayer=supermap.getLayersByName("markerLayer");
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
                markerlayer[0].addMarker(marker);
                marker.events.on({"click":mouseClickHandler,"scope": marker});
            }
        //   }
    //}
};