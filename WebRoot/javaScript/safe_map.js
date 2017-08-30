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
function overRoadIndex(argument){
    overAndOut(argument,12,beforelineWidth);
    var speed;  
    var _state =parseInt(argument.state);
    var divMap=$("#map");
    if(divMap.attr("roadFlag")=="静态安全"){//动态服务水平
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
    }else if(divMap.attr("roadFlag")=="天气安全"){
        if(_state==0){
            speed="30 KM/H";
        }else if(_state==1){
            speed="50 KM/H";
        }else if(_state==2){
            speed="70 KM/H";
        }else if(_state==3){
            speed="90 KM/H";
        }else if(_state==4){
            speed="120 KM/H";
        }
    }else if(divMap.attr("roadFlag")=="动态安全"){
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
// 			var arr =["高","较高","中","低","较低"];
// 	for(var i=0;i<7630;i++){	
// 		var index = Math.floor(Math.random()*5);
// 		if(supermap.getZoom()>14){
// 				setLine(lineMap[i],5,5,index,arr[index],i);
// 		}else{
// 			setLine(lineMap[i],2,5,index,arr[index],i);
// 		}
// 	}
// //重绘图层
//     vector.redraw();
// if($(this).prop("checked") == true){
//     vector.setVisibility(true);
//     vector.redraw();
// }else{
//   vector.setVisibility(false);
// }
// queryRoadNetFeature();
// roadFlag=10;
var divMap=$("#map");
divMap.attr("roadFlag","动态安全");
if(divMap.attr("roadFlag")=="动态安全"){
  bFlagRealData=1;
  queryRealData();
}
})
var roadFlag,bFlagRealData;
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
//     vector.redraw();
// queryRoadNetFeature();
// if($(this).prop("checked") == true){
//     vector.setVisibility(true);
//     vector.redraw();
// }else{
//   vector.setVisibility(false);
// }
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
 //   var arr =["80 KM/H","100 KM/H","70 KM/H","130 KM/H","120 KM/H"];
	// for(var i=0;i<7630;i++){	
	// 	var index = Math.floor(Math.random()*5);
	// 	if(supermap.getZoom()>14){
	// 			setLine(lineMap[i],5,5,index,arr[index],i);
	// 	}else{
	// 		setLine(lineMap[i],2,5,index,arr[index],i);
	// 	}
	// }
	// //重绘图层
	// vector.redraw();
  // queryRoadNetFeature(); 
  // if($(this).prop("checked") == true){
  //   vector.setVisibility(true);
  //   vector.redraw();
  // }else{
  //   vector.setVisibility(false);
  // }
// roadFlag=12;
// bFlagRealData=1;
// queryRealData();
var divMap=$("#map");
divMap.attr("roadFlag","天气安全");
if(divMap.attr("roadFlag")=="天气安全"){
  bFlagRealData=1;
  queryRealData();
}
})

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
             divMap.attr("roadFlag","动态安全");
             if(divMap.attr("roadFlag")=="动态安全"){
                bFlagRealData=1;
                queryRealData();
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
     new SuperMap.LonLat(12994189.00633,4795956.47431),
      new SuperMap.LonLat(12994255.88873,4795344.97808),
      new SuperMap.LonLat(12990749.34006,4792172.84141),
      new SuperMap.LonLat(12990711.12155,4798899.29990),
      new SuperMap.LonLat(12990954.76458,4795287.65031),
      new SuperMap.LonLat(12990696.78960,4799035.45336)
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