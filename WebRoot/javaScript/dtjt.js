// var bFlagRealData=0;// 请求数据类型
// var bFlagRealData;// 请求数据类型
// var bFlagTime=[1,1];//实时标志,timer启用标志
var id = "";
var AllSingnal = [];
var singnalGroup,singnal_pa;
var param_old = [];
var param_new = [];
var signalsArr = [];
var cc = null;
var groupSingnalData = {};
function changeImg(num){//页面下方图标点击事件 
    $(".replace img").each(function(i,n){
        $(this).attr("src","images/logo/blue/"+(i+1)+".png");//修改点击的那张图
        if(num==1){
        	supermap.setCenter(new SuperMap.LonLat(12990226.0445648, 4793154.9179491), 13);
        	$(".replace .li"+num+" img").attr("src","images/logo/choiceRed/1.png").css({"width":"40px","height":"40px","margin-top":"6px"});
        	$(".replace .li2 img,.replace .li3 img,.replace .li4 img,.replace .li5 img,.replace .li6 img").css({"width":"50px","height":"50px","margin-top":"0px"});
        	$(".roadUl1").css("display","block");
			$(".roadUl2,.roadUl3,.roadUl4,.roadUl5,.roadUl6").css("display","none");
			$(".replace .li4 img").css({"width":"40px","height":"40px","margin-top":"0px","margin-top": "6px"});
			$(".filter_density,.filter_saturation,.filter_speed,.describeFrame_flow,.pointOn_off1").css("display","none");
			$(".describeFrame").css("display","block");
			$(".describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
        }else if(num==2){
        	supermap.setCenter(new SuperMap.LonLat(12990226.0445648, 4793154.9179491), 13);
        	$(".replace .li"+num+" img").attr("src","images/logo/choiceRed/2.png").css({"width":"40px","height":"40px","margin-top":"6px"});
        	$(".replace .li1 img,.replace .li3 img,.replace .li4 img,.replace .li5 img,.replace .li6 img").css({"width":"50px","height":"50px","margin-top":"0px"});
        	$(".roadUl1,.roadUl3,.roadUl4,.roadUl5,.roadUl6").css("display","none");
        	$(".replace .li4 img").css({"width":"40px","height":"40px","margin-top":"0px","margin-top": "6px"});
        	$(".filter_density,.filter_saturation,.filter_speed,.pointOn_off1").css("display","none");
			$(".roadUl2").css("display","block");
			$(".describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
        }
        else if(num==3){
        	supermap.setCenter(new SuperMap.LonLat(12990226.0445648, 4793154.9179491), 13);
        	$(".replace .li"+num+" img").attr("src","images/logo/choiceRed/3.png").css({"width":"40px","height":"40px","margin-top":"6px"});
        	$(".replace .li2 img,.replace .li1 img,.replace .li4 img,.replace .li5 img,.replace .li6 img").css({"width":"50px","height":"50px","margin-top":"0px"});
        	$(".roadUl3").css("display","block");
        	$(".replace .li4 img").css({"width":"40px","height":"40px","margin-top":"0px","margin-top": "6px"});
        	$(".roadUl2,.roadUl1,.roadUl4,.roadUl5,.roadUl6").css("display","none");
        	$(".filter_density,.filter_saturation,.filter_speed,.describeFrame_flow,.pointOn_off1").css("display","none");
        	$(".describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
        }
        else if(num==4){
        	supermap.setCenter(new SuperMap.LonLat(12957229.13494, 4853699.61315), 11);
        	$(".replace .li"+num+" img").attr("src","images/logo/choiceRed/4.png").css({"width":"40px","height":"40px","margin-top":"6px"});
        	$(".replace .li2 img,.replace .li1 img,.replace .li3 img,.replace .li5 img,.replace .li6 img").css({"width":"50px","height":"50px","margin-top":"0px"});
        	$(".roadUl4,.pointOn_off1").css("display","block");
        	$(".roadUl2,.roadUl1,.roadUl5,.roadUl3,.roadUl6").css("display","none");
        	$(".filter_density,.filter_saturation,.filter_speed,.describeFrame_flow").css("display","none");
        	$(".describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
        }
        else if(num==5){
        	supermap.setCenter(new SuperMap.LonLat(12990226.0445648, 4793154.9179491), 13);
        	$(".replace .li"+num+" img").attr("src","images/logo/choiceRed/5.png").css({"width":"40px","height":"40px","margin-top":"6px"});
        	$(".replace .li2 img,.replace .li3 img,.replace .li1 img,.replace .li6 img").css({"width":"50px","height":"50px","margin-top":"0px"});
        	$(".replace .li4 img").css({"width":"40px","height":"40px","margin-top":"0px","margin-top": "6px"});
        	$(".roadUl5").css("display","block");
        	$(".roadUl2,.roadUl3,.roadUl1,.roadUl4,.roadUl6").css("display","none");
        	$(".filter_density,.filter_saturation,.filter_speed,.describeFrame_flow,.pointOn_off1").css("display","none");
        	$(".describeFrame_safe").css("display","block");
			$(".describeFrame,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
        }
        else if(num==6){
        	supermap.setCenter(new SuperMap.LonLat(12990226.0445648, 4793154.9179491), 13);
        	$(".replace .li"+num+" img").attr("src","images/logo/choiceRed/6.png").css({"width":"40px","height":"40px","margin-top":"6px"});
        	$(".replace .li2 img,.replace .li3 img,.replace .li4 img,.replace .li1 img,.replace .li5 img").css({"width":"50px","height":"50px","margin-top":"0px"});
        	$(".roadUl6").css("display","block");
        	$(".replace .li4 img").css({"width":"40px","height":"40px","margin-top":"0px","margin-top": "6px"});
        	$(".roadUl2,.roadUl3,.roadUl4,.roadUl1,.roadUl5").css("display","none");
        	$(".filter_density,.filter_saturation,.filter_speed,.describeFrame_flow,.pointOn_off1").css({"width":"40px","height":"40px","margin-top":"6px"});
        	$(".describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
        }
    });
    removeVetor(); 
	vector.setVisibility(false);
	$(".roadStates_ul li p").css("background-color","#0B3893");
	first_Show(num);
}
function removeVetor(){
	supermap.getLayersByName("markerLayer3")[0].setVisibility(false);
	supermap.getLayersByName("markerLayer50")[0].setVisibility(false);
	PointVector.setVisibility(false);
	heatMapCross.setVisibility(false);
	lineOD.setVisibility(false);
	heatGridLayer.setVisibility(false);
	markerlayer.setVisibility(false);
}
function first_Show(num){
	var divMap=$("#map");
	if(num==1){
		divMap.attr("roadFlag","运行状态");
		if(divMap.attr("roadFlag")=="运行状态"){
			removeVetor();
			initTimeline(0,1,1);
			$(".describeFrame").css("display","block");
			$(".filter_density,.filter_saturation,.filter_speed,.describeFrame_gas,.pointOn_off1").css("display","none");
			$(".describeFrame_serve,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
		}
		
		$(".tps p").css("background-color","red");
	}else if(num==2){
		divMap.attr("roadFlag","服务水平");
		if(divMap.attr("roadFlag")=="服务水平"){
			removeVetor();
			initTimeline(0,1,1);
			$(".describeFrame_serve").css("display","block");
			$(".filter_density,.filter_saturation,.filter_speed,.describeFrame_gas,.pointOn_off1").css("display","none");
			$(".describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
			$(".tsi p").css("background-color","red");
		}
	}
	else if(num==3){
		divMap.attr("roadFlag","单点");
		if(divMap.attr("roadFlag")=="单点"){
			vector.setVisibility(false);
			removeVetor();
			initTimeline(0,1);
			$(".alone p").css("background-color","red");
			$(".filter_density,.filter_saturation,.filter_speed,.describeFrame_gas,.pointOn_off1").css("display","none");
			$(".describeFrame_serve,.describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
		}
	}
	else if(num==4){//公共交通
		divMap.attr("roadFlag","交通");
		if(divMap.attr("roadFlag")=="交通"){
			vector.setVisibility(false);
			removeVetor();
			initTimeline(0,1,70);
			$(".subway p").css("background-color","red");
			$(".pointOn_off1").css({"display":"block"});
			$(".filter_density,.filter_saturation,.filter_speed,.describeFrame_gas").css("display","none");
			$(".describeFrame_serve,.describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
		}
	}
	else if(num==5){
		divMap.attr("roadFlag","静态安全");
		if(divMap.attr("roadFlag")=="静态安全"){
			removeVetor();
			initTimeline(0,0,1);
			$(".describeFrame_safe").css("display","block");
			$(".filter_density,.filter_saturation,.filter_speed,.describeFrame_gas,.pointOn_off1").css("display","none");
			$(".describeFrame_serve,.describeFrame,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
			$(".static p").css("background-color","red");
		}
	}else if(num==6){
		divMap.attr("roadFlag","道路尾气");
		if(divMap.attr("roadFlag")=="道路尾气"){
			removeVetor();
			initTimeline(0,1,1);
			$(".describeFrame_gas").css("display","block");
			$(".filter_density,.filter_saturation,.filter_speed,.pointOn_off1").css("display","none");
			$(".describeFrame_serve,.describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
			$(".move p").css("background-color","red");
		}
	}
}
	
// function firstShow_1(){
// 	setTimeout(function(){ changeImg(1)},500);
// }
// firstShow_1();
function part1Click(num){
	var divMap=$("#map");
	if(num==1){//tps运行状态  1--7part1
			divMap.attr("roadFlag","运行状态");
			if(divMap.attr("roadFlag")=="运行状态"){
				removeVetor();
				initTimeline(0,1,1);
				legend();
				$(".describeFrame_flow,.describeFrame_gas,.pointOn_off1").css("display","none");
			}
		}else if(num==2){//拥堵水平TPI
			divMap.attr("roadFlag","拥堵水平");
			if(divMap.attr("roadFlag")=="拥堵水平"){
				vector.setVisibility(false);
				removeVetor();
				initTimeline(0,1,2); 
				legend();
				$(".describeFrame_flow,.describeFrame_gas,.pointOn_off1").css("display","none");
			}
		}
		else if(num==3){//拥堵路段OCS
			divMap.attr("roadFlag","拥堵路段");
			if(divMap.attr("roadFlag")=="拥堵路段"){
				removeVetor();
				 initTimeline(0,1,1);
				 $(".describeFrame_flow,.filter_density,.filter_saturation,.filter_speed,.describeFrame_gas,.pointOn_off1").css("display","none");
				$(".describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
			}
		}
		else if(num==18){//需求分布od
			divMap.attr("roadFlag","需求分布");
			if(divMap.attr("roadFlag")=="需求分布"){
				vector.setVisibility(false);
				removeVetor();
				initTimeline(0,1);
				$(".describeFrame_flow,.filter_density,.filter_saturation,.filter_speed,.describeFrame_gas,.pointOn_off1").css("display","none");
				$(".describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
			}
		}
		else if(num==4){//服务水平TSI/*第二功能模块*/ 
			divMap.attr("roadFlag","服务水平");
			if(divMap.attr("roadFlag")=="服务水平"){
				removeVetor();
				initTimeline(0,1,1);
				$(".describeFrame_flow,.filter_density,.filter_saturation,.filter_speed,.describeFrame_gas,.pointOn_off1").css("display","none");
				$(".describeFrame_serve").css("display","block");
				$(".describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
			}
		}else if(num==5){//饱和程度VIC
			divMap.attr("roadFlag","饱和程度");
			if(divMap.attr("roadFlag")=="饱和程度"){
				removeVetor();
				 initTimeline(0,1,50);
				$(".describeFrame_flow,.filter_density,.filter_speed,.pointOn_off1,.describeFrame_serve,.describeFrame_gas,.describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed").css("display","none");
				$(".describeFrame_saturation,.filter_saturation").css("display","block");
			}
		}else if(num==6){//车流密度TVD
			divMap.attr("roadFlag","车流密度");
			if(divMap.attr("roadFlag")=="车流密度"){
				removeVetor();
				 initTimeline(0,1,60);
				$(".describeFrame_flow,.filter_saturation,.filter_speed,.pointOn_off1,.describeFrame_serve,.describeFrame_gas,.describeFrame,.describeFrame_safe,.describeFrame_saturation,.describeFrame_speed").css("display","none");
				$(".describeFrame_density,.filter_density").css("display","block");
			}
		}else if(num==7){//行程车速TES
			divMap.attr("roadFlag","行程车速");
			if(divMap.attr("roadFlag")=="行程车速"){
				removeVetor();
				 initTimeline(0,1,70);
				$(".describeFrame_flow,.filter_density,.filter_saturation,.pointOn_off1,.describeFrame_serve,.describeFrame_gas,.describeFrame,.describeFrame_safe,.describeFrame_saturation,.describeFrame_density").css("display","none");
				$(".filter_speed,.describeFrame_speed").css("display","block");
			}
		}else if(num==8){//流量
			divMap.attr("roadFlag","流量");
			if(divMap.attr("roadFlag")=="流量"){
				removeVetor();
				initTimeline(0,1,1);
				$("describeFrame_speed,.filter_density,.filter_saturation,.pointOn_off1,.describeFrame_serve,.describeFrame_gas,.describeFrame,.describeFrame_safe,.describeFrame_saturation,.describeFrame_density").css("display","none");
				$(".describeFrame_flow").css("display","block");
			}
		}
		else if(num==9){//单点性能
			divMap.attr("roadFlag","单点");
			if(divMap.attr("roadFlag")=="单点"){
				vector.setVisibility(false);
				removeVetor();
				initTimeline(1,0);
				$(".describeFrame_flow,.filter_density,.filter_saturation,.filter_speed,.describeFrame_gas,.pointOn_off1").css("display","none");
				$(".describeFrame_serve,.describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
			}
		}else if(num==10){//协调性能
			TL_Old=[];
			divMap.attr("roadFlag","协调");
			if(divMap.attr("roadFlag")=="协调"){
				vector.setVisibility(false);
				removeVetor();
				initTimeline(1,0);
				// deng();
				$(".filter_density,.filter_saturation,.filter_speed,.describeFrame_gas,.pointOn_off1").css("display","none");
				$(".describeFrame_serve,.describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
			}
		}else if(num==11){//地铁
			vector.setVisibility(false);
			removeVetor();
			$(".pointOn_off1").css({"display":"block"});
		}else if(num==12){//公交
			vector.setVisibility(false);
			removeVetor();
		}else if(num==13){//出租车
			vector.setVisibility(false);
			removeVetor();
		}else if(num==14){//静态/*第四功能模块*/
			divMap.attr("roadFlag","静态安全");
			if(divMap.attr("roadFlag")=="静态安全"){
				removeVetor();
				 initTimeline(0,0,1);
				$(".describeFrame_flow,.filter_density,.filter_saturation,.filter_speed,.describeFrame_gas,.pointOn_off1").css("display","none");
				$(".describeFrame_safe").css("display","block");
				$(".describeFrame_serve,.describeFrame,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
			}
		}else if(num==15){//动态
			divMap.attr("roadFlag","动态安全");
			if(divMap.attr("roadFlag")=="动态安全"){
				removeVetor();
				 initTimeline(0,1,1);
				$(".describeFrame_safe").css("display","block");
				$(".describeFrame_flow,.filter_density,.filter_saturation,.filter_speed,.describeFrame_gas,.pointOn_off1").css("display","none");
				$(".describeFrame_serve,.describeFrame,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
			}
		}else if(num==16){//天气安全/
			divMap.attr("roadFlag","天气安全");
			if(divMap.attr("roadFlag")=="天气安全"){
				removeVetor();
				 initTimeline(0,1,1);
				$(".describeFrame_safe").css("display","block");
				$(".describeFrame_flow,.filter_density,.filter_saturation,.filter_speed,.describeFrame_gas,.pointOn_off1").css("display","none");
				$(".describeFrame_serve,.describeFrame,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
			}
		}else if(num==17){//道路尾气/
			divMap.attr("roadFlag","道路尾气");
			if(divMap.attr("roadFlag")=="道路尾气"){
				removeVetor();
				initTimeline(0,1,1);
				$(".describeFrame_gas").css("display","block");
				$(".describeFrame_flow,.filter_density,.filter_saturation,.filter_speed,.pointOn_off1").css("display","none");
				$(".describeFrame_serve,.describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
			}
		}else if(num==19){//路口尾气
			divMap.attr("roadFlag","路口尾气");
			if(divMap.attr("roadFlag")=="路口尾气"){
				vector.setVisibility(false);
				removeVetor();
				initTimeline(0,1);
				$(".describeFrame_flow,.filter_density,.filter_saturation,.filter_speed,.describeFrame_gas,.pointOn_off1").css("display","none");
				$(".describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed,.describeFrame_saturation").css("display","none");
			}
		}
	}
function ajax_OdPoint(){//获取中心点
$.ajax({
     url:"GetDevice",
     dataType:"json",
     data:{ "action":"query","type":50},
     contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
     beforeSend:function(){  },
     success: function( data, textStatus, jqXHR ){
         var layer=supermap.getLayersByName("markerLayer4")[0];
         add2Layer(data,4,layer,"",true,"point");
     },
     error:function(){}
 });
}
function getOdline(val){//获取中心点连线数据
    $.ajax({
        url:"GetNetIndex",
        dataType:"json",
        data:{ "action":"query","type":901,"pa":val},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
          		odLine(data.entitys);
        },
        error:function(){}
    });
}
function odLine(data){
	  var features = []
		for(var i=0;i<data.length;i++){
					var points = [];
					var lonlat,line,lineVector;
					var from_zone = getFeature(4,data[i][0]).zone_id;
					var to_zone = getFeature(4,data[i][1]).zone_id;
					lonlat=new SuperMap.Geometry.Point(getLonlatByZoneID(4,from_zone).x,getLonlatByZoneID(4,from_zone).y);
					points.push(lonlat);
					lonlat=new SuperMap.Geometry.Point(getLonlatByZoneID(4,to_zone).x,getLonlatByZoneID(4,to_zone).y);
					points.push(lonlat);
					line = new SuperMap.Geometry.LineString(points);
					lineVector = new SuperMap.Feature.Vector(line);
					setLineProperty1(lineVector,1,10,0,data[i][2]);			
					features.push(lineVector);
		}

	lineOD.addFeatures(features);
}
/*******************************/
function divRemove(ele1,ele2){
	$(ele1).css("display","none");
	$(ele2).remove();
}
function TCR_rightClick(argument){
	var divMap=$("#map");
	if($(".words_ocs").text()=="常发拥堵路段统计(OCS)"){

	}else{
		var up_name,down_name,titleVal;
		up_name="TPI";
		down_name="TPI";
		$(".zhao").css("display","block");
		var content='';
		content+='<div id="divFrame" class="divFrame white">'+
					'<div class="divTitle">'+
						'<span>区域运行效率评价</span>'+
						'<img src="images/min.png" class="empty_btn" onclick="divRemove(\'.zhao\',\'#divFrame\')" style="cursor:pointer">'+
					'</div>'+
					'<div class="divTime">'+
						'<ul class="ULtime">'+
							'<li class="choiceLi">'+
								'<span>评价指标选择</span>'+
								'<select id="choiceLi_select">'+
									'<option>交通拥堵指数TPI</option>'+//拥堵水平
									'<option>日交通拥堵率TCR</option>'+//日拥堵率
									'<option>拥堵里程比例CKR</option>'+//拥堵比例
									'<option>拥堵持续时间CKT</option>'+//拥堵时间
									'<option>日路网稳定性P</option>'+//日稳定性
								'</select>'+
							'</li>'+//'+up_name+' '+down_name+'
							'<li class="leftli li_marginLeft_1"><span>历史日期选择(蓝线)</span><input type="text" value="2016-04-01 00:00:00" class="timeIpt" data="" id="upTimeIpt" onClick="jeDate({dateCell:\'#upTimeIpt\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"></li>'+
							'<li class="midli li_marginLeft_1"><span>近期日期选择(绿线)</span><input type="text" value="2016-04-02 00:00:00" class="timeIpt" data="" id="downTimeIpt" onClick="jeDate({dateCell:\'#downTimeIpt\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"></li>'+
							'<li class="rightLi li_marginLeft_1" >'+
								'<span>评价周期</span>'+
								'<select class="timeSelect" id="tilltime">'+
									'<option>1天</option>'+
									// '<option>7天</option>'+
									// '<option>30天</option>'+
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
									'<span class="choiceTitle">区域编号及名称</span>'+
									// '<input type="button" class="choiceBtn" value="全选" onClick="TCR_Td()"/>'+
									// '<input type="button" class="choiceBtn" value="放弃" onClick="giveUpAll()"/>'+
								'</p>'+
								'<div class="villageNumShow">'+
									'<table cellspacing="0">'+
										'<tr class="tr_line">'+
											'<th>区域编号</th>'+
											'<th>区域名称</th>'+
										'</tr>'+
										'<tr class="textTr">'+
											'<td class="vNum"></td>'+
											'<td></td>'+
										'</tr>'+
									'</table>'+
								'</div>'+
							'</div>'+
							'<div class="upVal">'+
								'<p class="wordsTitle">蓝线数据统计结果:</p>'+
								'<ul class="valUl">'+
									// '<li><span>所有VKT值</span><input type="text" class="valSpan" id="up_dataVal1" readonly="readonly" /></li>'+
									'<li><span>平均TPI值</span><input type="text" class="valSpan" id="up_dataVal2" readonly="readonly"/></li>'+
									'<li><span>拥堵率TCR</span><input type="text" class="valSpan" id="up_dataVal3" readonly="readonly"/></li>'+
									'<li><span>拥堵持续CKT</span><input type="text" class="valSpan" id="up_dataVal4" readonly="readonly"/></li>'+
								'</ul>'+
							'</div>'+
							'<div class="downVal">'+
								'<p class="wordsTitle">绿线数据统计结果:</p>'+
								'<ul class="valUl">'+
									// '<li><span>所有VKT值</span><input type="text" class="valSpan" id="down_dataVal1" readonly="readonly"/></li>'+
									'<li><span>平均TPI值</span><input type="text" class="valSpan" id="down_dataVal2" readonly="readonly"/></li>'+
									'<li><span>拥堵率TCR</span><input type="text" class="valSpan" id="down_dataVal3" readonly="readonly"/></li>'+
									'<li><span>拥堵持续CKT</span><input type="text" class="valSpan" id="down_dataVal4" readonly="readonly"/></li>'+
								'</ul>'+
							'</div>'+
							'<p class="P_btn_frame">'+
								'<a id="P_btn_frame" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
								'<input type="button" value="确定" class="countBtn" onclick="TCR_dataAjax()"/>'+//
							'</p>'+
						'</div>'+
					'</div>'+
				'</div>';
		$("body").append(content);
		getVillageId(argument);
		divDrag('.divTitle','.divFrame');
		$("body").delegate("#choiceLi_select","change",function(){
			TCR_dataAjax(); 
		});
		TCR_dataAjax();//加在一个触发事件里
	}
}

function timeChange(num){
	var num=num+"";
	return num=num.length>1?num:0+num;
}
function dateAddDays(dataStr,dayCount) {
	 var strdate=dataStr; //日期字符串
	 var isdate = new Date(strdate.replace(/-/g,"/"));  //把日期字符串转换成日期格式
	//  isdate = new Date((isdate/1000+(86400*dayCount))*1000);  //日期加1天
	 var pdate = isdate.getFullYear()+"-"+(timeChange(isdate.getMonth()+1))+"-"+(timeChange(isdate.getDate()))+" "+(23)+":"+(59)+":"+(59);   //把日期格式转换成字符串
	 return pdate;
}

function TCR_dataAjax(){//TCR图表请求数据
	var divMap=$("#map");
	$("#upContentTu").remove();
	var html='';
	html+='<div class="upContentTU" id="upContentTu"></div>';
	$(".divContent_left").append(html);
	$(".upVal input,.downVal input").val("");
	var upTime=$("#upTimeIpt").val();
	var downTime=$("#downTimeIpt").val();
	var isTimes;
	if($("#tilltime")[0].selectedIndex==0){
		isTimes = dateAddDays(upTime,1);
	}else if($("#tilltime")[0].selectedIndex==1){
		isTimes=dateAddDays(upTime,7);
	}else if($("#tilltime")[0].selectedIndex==2){
		isTimes=dateAddDays(upTime,30);
	}
	var _vNum=$(".vNum").text();
	var pa=_vNum+",'"+upTime+"','"+isTimes+"'";
	var type;
	if($("#choiceLi_select")[0].selectedIndex==0){
		type=10;
	}else if($("#choiceLi_select")[0].selectedIndex==1){
		type=20;
	}else if($("#choiceLi_select")[0].selectedIndex==2){
		type=80;
	}else if($("#choiceLi_select")[0].selectedIndex==3){
		type=90;
	}else if($("#choiceLi_select")[0].selectedIndex==4){
		type=20;
	}
	if(upTime != "" && downTime!=""){
		$.ajax({
		 url:"GetNetIndex",
         dataType:"json",
         data:{ "action":"query","type":type,"pa":pa},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               showTcrDataline(data.entitys);
         },
         error:function(){}
		})
	}else{
		alert("请选择历史与近期开始时间");
	}
}
function showTcrDataline(data1){
	var divMap=$("#map");
	var upTime=$("#upTimeIpt").val();
	var downTime=$("#downTimeIpt").val();
	var is_Times;
	if($("#tilltime")[0].selectedIndex==0){
		is_Times = dateAddDays(downTime,1);
	}else if($("#tilltime")[0].selectedIndex==1){
		is_Times = dateAddDays(downTime,7);
	}else if($("#tilltime")[0].selectedIndex==2){
		is_Times = dateAddDays(downTime,30);
	}
	var _vNum=$(".vNum").text();
	var _pa=_vNum+",'"+downTime+"','"+is_Times+"'";
	var type,Name;
	if($("#choiceLi_select")[0].selectedIndex==0){
		type=10;
		Name=null;
	}else if($("#choiceLi_select")[0].selectedIndex==1){
		type=20;
		Name='%';
	}else if($("#choiceLi_select")[0].selectedIndex==2){
		type=80;
		Name='%';
	}else if($("#choiceLi_select")[0].selectedIndex==3){
		type=90;
		Name='min';
	}else if($("#choiceLi_select")[0].selectedIndex==4){
		type=20;
		Name='%';
	}
	if(upTime != "" && downTime!=""){
		$.ajax({
		 url:"GetNetIndex",
         dataType:"json",
         data:{ "action":"query","type":type,"pa":_pa},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR){
               TCR_DataCharts(data.entitys,data1,Name);
         },
         error:function(){}
		})
	}else{
		alert("请选择历史与近期开始时间");
	}
}
function TDR_CVS(data2,data1){
	var divMap=$("#map");
	var str;
	if($("#choiceLi_select")[0].selectedIndex==0){
		if((data1.length>0&&data2.length>0)||(data1.length<0&&data2.length<0)){
			str = "蓝线,日期时间,拥堵指数TPI,绿线,日期时间,拥堵指数TPI\n";
		}else if(data1.length>0 && data2.length<=0){
			str = "蓝线,日期时间,拥堵指数TPI\n";
		}else if(data1.length<=0 && data2.length>0){
			str = "蓝线,日期时间,拥堵指数TPI\n";
		}
	}else if($("#choiceLi_select")[0].selectedIndex==1){
		if((data1.length>0&&data2.length>0)||(data1.length<0&&data2.length<0)){
			str = "蓝线,日期时间,拥堵率指数TCR,绿线,日期时间,拥堵率指数TCR\n";
		}else if(data1.length>0 && data2.length<=0){
			str = "蓝线,日期时间,拥堵率指数TCR\n";
		}else if(data1.length<=0 && data2.length>0){
			str = "蓝线,日期时间,拥堵率指数TCR\n";
		}
	}else if($("#choiceLi_select")[0].selectedIndex==2){
		if((data1.length>0&&data2.length>0)||(data1.length<0&&data2.length<0)){
			str = "蓝线,日期时间,拥堵里程指数CKR,绿线,日期时间,拥堵里程指数CKR\n";
		}else if(data1.length>0 && data2.length<=0){
			str = "蓝线,日期时间,拥堵里程指数CKR\n";
		}else if(data1.length<=0 && data2.length>0){
			str = "蓝线,日期时间,拥堵里程指数CKR\n";
		}
	}else if($("#choiceLi_select")[0].selectedIndex==3){
		if((data1.length>0&&data2.length>0)||(data1.length<0&&data2.length<0)){
			str = "蓝线,日期时间,拥堵持续时间指数CKT,绿线,日期时间,拥堵持续时间指数CKT\n";
		}else if(data1.length>0 && data2.length<=0){
			str = "蓝线,日期时间,拥堵持续时间指数CKT\n";
		}else if(data1.length<=0 && data2.length>0){
			str = "蓝线,日期时间,拥堵持续时间指数CKT\n";
		}
	}else if($("#choiceLi_select")[0].selectedIndex==4){
		if((data1.length>0&&data2.length>0)||(data1.length<0&&data2.length<0)){
			str = "蓝线,日期时间,日路网稳定指数P,绿线,日期时间,日路网稳定指数P\n";
		}else if(data1.length>0 && data2.length<=0){
			str = "蓝线,日期时间,日路网稳定指数P\n";
		}else if(data1.length<=0 && data2.length>0){
			str = "绿线,日期时间,日路网稳定指数P\n";
		}
	}
	var dataLength = data1.length>data2.length?data1.length:data2.length;
	if(data1.length>0&&data2.length>0){
		for(var i=0;i<dataLength;i++){
			str+=(i+1)+","+data1[i][0]+","+data1[i][1]+","+(i+1)+","+data2[i][0]+","+data2[i][1]+"\n";
		}
	}else if(data1.length>0 && data2.length<=0){
		for(var i=0;i<dataLength;i++){
			str+=(i+1)+","+data1[i][0]+","+data1[i][1]+"\n";
		}
	}else if(data1.length<=0 && data2.length>0){
		for(var i=0;i<dataLength;i++){
			str+=(i+1)+","+data2[i][0]+","+data2[i][1]+"\n";
		}
	}else if(data1.length<0&&data2.length<0){
		str+=1+","+'无数据'+","+'无数据'+","+1+","+'无数据'+","+'无数据'+"\n";
	}
	
	str =  encodeURIComponent(str);
    $("#P_btn_frame")[0].href = "data:text/csv;charset=utf-8,\ufeff"+str;
};

function TCR_DataCharts(data2,data1,Name){
var _upContentTu = echarts.init(document.getElementById('upContentTu')); 
var data2_2=[];
for(var j=0;j<data2.length;j++){
	var arr = [];
	arr[0] = data2[j][0];
	arr[1] = data2[j][1];
	data2_2.push(arr);
}
TDR_CVS(data2_2,data1);
if(data1.length>0){
	for(var i=0;i<data2.length;i++){
		data2[i][0]=data2[i][0].replace(data2[i][0].split(" ")[0],data1[0][0].split(" ")[0]);
	}    
}
var divMap=$("#map");

optionUp = {
	backgroundColor:"#fff",
    color:['yellow','green'],
    legend: {
        data:['历史数据','近期数据']
    },
    tooltip: {
        trigger: 'axis'
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
        // ,
        // data:xTime
        // ,
        // axisLabel:{
        // 	formatter:function(){
        // 		// if(index===10){
        // 			return	xTime[0].split(" ").join("\n")
        // 		// }
        // 	}
        // }
    },
    yAxis:{
        type: 'value',
        name:Name,
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    series: [{
        name: '历史数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        symbolSize:3,
        itemStyle : {
				normal : {
                    color:'blue',
					lineStyle:{
						color:'blue'
					}
				}
			},
        data: data1
    },{
        name: '近期数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        symbolSize:3,
        itemStyle : {
				normal : {
                    color:'green',
					lineStyle:{
						color:'green'
					}
				}
			},
        data: data2
    }
    ]
};  
// if(divMap.attr("roadFlag")=="拥堵水平"){
// 		optionUp.yAxis.min=0;
// 		optionUp.yAxis.max=10;
// 		// xHeight=0;
// 		// yHeight = 10;
// 	}
if($("#choiceLi_select")[0].selectedIndex==0){
	optionUp.yAxis.min=0;
	optionUp.yAxis.max=10;
	// xHeight=0;
	// yHeight = 10;
}
	// else if(divMap.attr("roadFlag")=="日拥堵率"||divMap.attr("roadFlag")=="拥堵比列"||divMap.attr("roadFlag")=="日稳定性"){
	// 	yHeight = '';
	// 	xHeight='';
	// }else if(divMap.attr("roadFlag")=="拥堵时间"){
	// 	yHeight = '';
	// 	xHeight='';
	// }
 _upContentTu.setOption(optionUp);
 statisticsResult();
}
function statisticsResult(){
	var divMap=$("#map");
	var upTime=$("#upTimeIpt").val();
 	var downTime=$("#downTimeIpt").val();
	var isTimes,is_Times;
	var _vNum=$(".vNum").text();
	if($("#tilltime")[0].selectedIndex==0){
		isTimes = dateAddDays(upTime,1);
		is_Times = dateAddDays(downTime,1);
	}else if($("#tilltime")[0].selectedIndex==1){
		isTimes=dateAddDays(upTime,7);
		is_Times = dateAddDays(downTime,7);
	}else if($("#tilltime")[0].selectedIndex==2){
		isTimes=dateAddDays(upTime,30);
		is_Times = dateAddDays(downTime,30);
	}
	var pa=_vNum+",'"+upTime+"','"+isTimes+"'";
	var _pa=_vNum+",'"+downTime+"','"+is_Times+"'";
	var type;
	// if(divMap.attr("roadFlag")=="拥堵水平"){
	// 	type=11;
	// }else if(divMap.attr("roadFlag")=="日拥堵率"){
	// 	type=21;
	// }
	// else if(divMap.attr("roadFlag")=="拥堵比列"){
	// 	type=81;
	// }
	// else if(divMap.attr("roadFlag")=="拥堵时间"){
	// 	//type=20;
	// 	type=91;
	// }
	// else if(divMap.attr("roadFlag")=="日稳定性"){
	// 	//type=20;
	// 	type=21;
	// }
	if($("#choiceLi_select")[0].selectedIndex==0){
		type=11;
	}else if($("#choiceLi_select")[0].selectedIndex==1){
		type=21;
	}else if($("#choiceLi_select")[0].selectedIndex==2){
		type=81;
	}else if($("#choiceLi_select")[0].selectedIndex==3){
		type=91;
	}else if($("#choiceLi_select")[0].selectedIndex==4){
		type=21;
	}
	$.ajax({
	 url:"GetNetIndex",
     dataType:"json",
     data:{ "action":"query","type":type,"pa":pa},
     contentType:"contentType:application/x-www-form-urlencoded;charset=UTF-8",
     beforeSend:function(){  },
     success: function( data, textStatus, jqXHR ){
           totalVal_up(data.entitys);
     },
     error:function(){}
	})
	$.ajax({
	 url:"GetNetIndex",
     dataType:"json",
     data:{ "action":"query","type":type,"pa":_pa},
     contentType:"contentType:application/x-www-form-urlencoded;charset=UTF-8",
     beforeSend:function(){  },
     success: function( data, textStatus, jqXHR ){
           totalVal_down(data.entitys);
     },
     error:function(){}
	})
}
function totalVal_up(data){
	// $("#up_dataVal1").val(data[0]);
 	$("#up_dataVal2").val((data[0]-0).toFixed(1));
 	$("#up_dataVal3").val((data[1]-0).toFixed(1));
 	$("#up_dataVal4").val((data[2]-0).toFixed(1));
}
function totalVal_down(data){
 	// $("#down_dataVal1").val(data[0]);
 	$("#down_dataVal2").val((data[0]-0).toFixed(1));
 	$("#down_dataVal3").val((data[1]-0).toFixed(1));
 	$("#down_dataVal4").val((data[2]-0).toFixed(1));
}

function choiceBtn(ele){
	$(ele).css("display","none");
}
function closeRoveVecter(){
	var vector=supermap.getLayersByName("markerLayer2")[0];
	vector.setVisibility(true);
	supermap.getLayersByName("markerLayer3")[0].setVisibility(false);
}
function OCSDataShow(argument){
	$(".zhao").css("display","block");
	var content='';
	content+='<div class="divFrame">'+
				'<div class="divTitle">'+
					'<span class="words_ocs">常发拥堵路段统计(OCS)</span>'+
					'<img src="images/min.png" class="empty_btn" onclick="closeRoveVecter(),divRemove(\'.zhao\',\'.divFrame\')" style="cursor:pointer">'+
				'</div>'+
				'<div class="contenDiv">'+
					'<div class="contentLeft">'+
						'<table cellspacing="0">'+
							'<tr>'+
								'<th>序号</th>'+
								'<th>路段名称</th>'+
								'<th>从节点</th>'+
								'<th>到节点</th>'+
								'<th>路段长度(km)</th>'+
								'<th>车道数量</th>'+
								'<th>路段限速(km/h)</th>'+
								'<th>车道能力</th>'+
								'<th>路段类型</th>'+
								'<th>平均车速</th>'+
								'<th>仿真流量</th>'+
								'<th>平均仿真密度</th>'+
								'<th>观测流量</th>'+
							'</tr>'+
						'</table>'+
					'</div>'+
					'<div class="contentRight">'+
						'<p class="rightTitle">常发拥堵路段统计设置</p>'+
						'<div class="villageFrame BG" id="villageFrame">'+
							'<p>'+
								// '<span class="choiceTitle">选择交通小区</span>'+ 
								'<input type="button" class="choiceBtn" id="choiceViilage1" value="选择交通小区" onclick="villageShow(),choiceBtn(\'.zhao\')"/>'+//queryVillage
								// '<input type="button" class="choiceBtn" value="全选" onClick="TCR_Td()"/>'+
								// '<input type="button" class="choiceBtn" value="放弃" onClick="giveUpAll()"/>'+
							'</p>'+
							// '<textarea class="villageNum"></textarea>'+
							'<div class="villageNumShow1">'+
								'<table cellspacing="0">'+
									'<tr class="tr_line">'+
										'<th>区域编号</th>'+
										'<th>区域名称</th>'+
									'</tr>'+
									'<tr class="textTr">'+
										'<td class="vNum"></td>'+
										'<td></td>'+
									'</tr>'+
								'</table>'+
							'</div>'+
						'</div>'+
						'<div class="choiceTime BG">'+
							'<p class="choiceTime_p">选择拥堵类型</p>'+
							'<ul>'+
								'<li><label><input type="checkbox" class="checkbox" id="choiceTime_ipt1" onclick="congestionRoad(\'#choiceTime_ipt1\')" /><span class="checkwords">日常发拥堵路段</span></label></li>'+
								'<li><label><input type="checkbox" class="checkbox" id="choiceTime_ipt2" onclick="congestionRoad(\'#choiceTime_ipt2\')" /><span class="checkwords">周常发拥堵路段</span></label></li>'+
								'<li><label><input type="checkbox" class="checkbox" id="choiceTime_ipt3" onclick="congestionRoad(\'#choiceTime_ipt3\')" /><span class="checkwords">月常发拥堵路段</span></label></li>'+
								'<li><label><input type="checkbox" class="checkbox" id="choiceTime_ipt4" onclick="congestionRoad(\'#choiceTime_ipt4\')" /><span class="checkwords">年常发拥堵路段</span></label></li>'+
							'</ul>'+
						'</div>'+
						'<p class="P_btn_frame">'+
							'<input type="button" value="确定" onclick="ocs_dataAjax()" class="" />'+
							'<input type="button" value="退出" class="" onclick="closeRoveVecter(),divRemove(\'.zhao\',\'.divFrame\')"/>'+
							'<a id="P_btn_frame_text" onclick="clickDownload(this)" download="block_up.csv" href="javascript:void(0)">导出CSV文件</a>'+
						'</p>'+
					'</div>'+
				'</div>'+
			'</div>';
	$("body").append(content);
	divDrag('.divTitle','.divFrame');
	$("#choiceTime_ipt1").prop("checked",true).next().css("color","red");
}
//选择小区
	// $("body").delegate("#choiceViilage1","click",function(){
	// 	vector.setVisibility(false);
	// 	removeVetor();
	// })
// $("#map").click(function(){
// 	 var divMap=$("#map");
// 	 if(divMap.attr("roadFlag")=="拥堵路段"){
// 	 	OCSDataShow();
// 	 }
// })
function ocsTd(data){
    var html='';
     for( var i=0;i<data.entitys.length;i++ ){
          html+='<tr class="trData">'+
                '<td>'+data.entitys[i][0]+'</td>'+
                '<td>'+data.entitys[i][1]+'</td>'+
                '<td>'+data.entitys[i][2]+'</td>'+
                '<td>'+data.entitys[i][3]+'</td>'+
                '<td>'+data.entitys[i][4]+'</td>'+
                '<td>'+data.entitys[i][5]+'</td>'+
                '<td>'+data.entitys[i][6]+'</td>'+
                '<td>'+data.entitys[i][7]+'</td>'+
                '<td>'+data.entitys[i][8]+'</td>'+
                '<td>'+data.entitys[i][9]+'</td>'+
                '<td>'+data.entitys[i][10]+'</td>'+
                '<td>'+data.entitys[i][11]+'</td>'+
                '<td>'+data.entitys[i][12]+'</td>'+
            '</tr>';
        }
    $('.contentLeft table tbody').append(html);
    }
function ocs_dataAjax(){//TCR图表请求数据
	var valIndex,pa;
	if($("#choiceTime_ipt1").prop("checked")==true){//判断选中类型
		valIndex=1;
		pa="'"+$("#DD").text()+' '+'00:00:00'+"','"+$("#DD").text()+' '+'23:59:59'+"',"+valIndex;
	}else if($("#choiceTime_ipt2").prop("checked")==true){
		// valIndex=2;
		valIndex=1;
		pa="'"+$("#DD").text()+' '+'00:00:00'+"','"+$("#DD").text()+' '+'23:59:59'+"',"+valIndex;
	}else if($("#choiceTime_ipt3").prop("checked")==true){
		// valIndex=3;
		valIndex=1;
		pa="'"+$("#DD").text()+' '+'00:00:00'+"','"+$("#DD").text()+' '+'23:59:59'+"',"+valIndex;
	}else if($("#choiceTime_ipt4").prop("checked")==true){
		// valIndex=4;
		valIndex=1;
		pa="'"+$("#DD").text()+' '+'00:00:00'+"','"+$("#DD").text()+' '+'23:59:59'+"',"+valIndex;
	}else{
		reviseAlert("请选择拥堵类型");
	}
	if($(".trData")){
		$(".trData").remove();
	}
	// var pa="'"+time1+"','"+time2+"',"+valIndex;
	// var pa=aa+","+valIndex;
	if(valIndex!=undefined&&$(".vNum").text()!=''){
		$.ajax({
		 url:"GetNetIndex",
         dataType:"json",
         data:{ "action":"query","type":30,"pa":pa},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               ocsTd(data);
         },
         error:function(){}
		})
	}else{
		reviseAlert("请选择小区/请勾选拥堵类型");
	}
}
function congestionRoad(ele){
	if($(ele).prop("checked")==true){
		$(ele).next().css("color","red");
		$(ele).parent().parent().siblings("li").children().children('input').next().css("color","#000");
		$(ele).parent().parent().siblings("li").children().children().attr("checked",false);
	}else{
		$(ele).next().css("color","#000");
	}
	
}

//常发拥堵路段 导出CVS文件
    function clickDownload(aLink)
    {
    	var str = "";
    	var th_length=$(".contentLeft th").length;
    	$(".contentLeft th").each(function(){
    		
    		if(($(this).index()+1)%th_length==0){
    			str+=$(this).text()+"\n";
    		}else{
    			str+=$(this).text()+",";
    		}
    	});

    	$(".contentLeft td").each(function(){
    		if(($(this).index()+1)%th_length==0){
    			str+=$(this).text()+"\n";
    		}else{
    			str+=$(this).text()+",";
    		}
    	});
        str =  encodeURIComponent(str);
        aLink.href = "data:text/csv;charset=utf-8,\ufeff"+str;
    }

 var data={entitys:
			  [
			    [1,"2016121123000",120,15,5,"1,2,2,3,3,1,4,2,5,3,6,3,7,2,8,1"],
			    [2,"2016121123000",90,30,5,"1,1,2,2,3,3,4,1,5,1,6,1,7,2,8,1"],
			    [3,"2016121123000",120,20,5,"1,2,2,3,3,2,4,2,5,2,6,3,7,2,8,1"],
			    [4,"2016121123000",60,5,5,"1,3,2,1,3,1,4,3,5,1,6,3,7,2,8,1"],
			    [5,"2016121123000",90,10,5,"1,2,2,3,3,2,4,2,5,3,6,3,7,2,8,1"]
			  ]
}


function singleSetAttr(id,groupSignal = false){
  var val="{ID:"+id+"}";
  $.ajax({
     url:"GetDevice",
         dataType:"json",
         data:{ "action":"query","type":61,"val":val},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
         		if(!groupSignal){
         			doConcert(data);  
         		}else if(groupSignal){
                	groupSingnalData[id] = data.entitys;
                }
                	
                },
         error:function()
         {

         }
  })
}
function doConcert(data){
  $(".zhao").css("display","block");
  var poslon=new SuperMap.LonLat(gmarker.lonlat.lon,gmarker.lonlat.lat);
  var coord=poslon.transform("EPSG:900913", "EPSG:4326" ); 

  var cLon=coord.lon.toFixed(6)-0;
  var cLat=coord.lat.toFixed(6)-0;
  //var coord=gmarker.lonlat;
  var titleP='车辆通过率统计分析',unit1='%',unit2='%',unit3='%',unit4='%',unit5='%';
  var titleSP1='早高峰',titleSP2='晚高峰',titleSP3='清晨',titleSP4='白天',titleSP5='夜晚';
  var _date = getNowFormatDate();
  var nr='';
  nr+='<div class="concertOptimize  white" id="concertOptimize" >'+
		  '<p class="concertTitle">'+
		    '<span>单点控制性能评价</span>'+
		    '<img src="images/min.png" class="empty_btn empty" onclick="zhao_none(\'.zhao\',\'.concertOptimize\')"/>'+
		  '</p>'+
		  '<div class="concertMain">'+
		  	'<div class="insertUl">'+
		       	'<ul class="concertMainTitle_ul">'+
		      	'<li class="mainUl_li1">'+
		          '<span>评价指标选择</span>'+
		          '<select id="targetSelect">'+
		            '<option>信号控制性能图</option>'+//相位-
				    '<option>相位车流量</option>'+//相位-
				    '<option>相位流量比</option>'+//路口-
				    '<option>相位饱和度</option>'+//路口-
				    '<option>红灯启亮时排队长度</option>'+//相位-
				    '<option>绿灯启亮时排队长度</option>'+//相位-
				    '<option>绿灯时间通过量</option>'+//路口-
				    '<option>转向车流量</option>'+//路口-
				    '<option>平均停车次数</option>'+//路口-
				    '<option>平均延误</option>'+//路口-
		          '</select>'+
		        '</li>'+
		        '<li class="mainUl_li2">'+
		          '<span>相位选择</span>'+
		          '<select id="targetSelect2" class="targetSelect_coor2">'+
		            '<option>1相位</option>'+
		            '<option>2相位</option>'+
		            '<option>3相位</option>'+
		            '<option>4相位</option>'+
		            '<option>5相位</option>'+
		            '<option>6相位</option>'+
		            '<option>7相位</option>'+
		            '<option>8相位</option>'+
		          '</select>'+
		        '</li>'+
		        '<li class="mainUl_li7 titleLi1">'+//'+title1+'
		          '<span>日期选择</span>'+
		          '<input type="text" value="2016-04-01 00:00:00" id="concertDay" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD\'})"/>'+
		        '</li>'+
		        '<li class="mainUl_li2 titleLi2">'+
		          '<span>早高峰时段</span>'+
		          '<input type="text" value="07:00-09:00" id="morningTime" />'+
		        '</li>'+
		        '<li class="mainUl_li2 titleLi3">'+
		          '<span>晚高峰时段</span>'+
		          '<input type="text" value="07:00-09:00" id="nightTime" />'+
		        '</li>'+
		        '<li class="mainUl_li3"><input type="button" class="concertMainTitle_ul_btn" value="确定"/></li>'+
		      '</ul>'+
		    '</div>'+
		    '<div class="concertLeft" id="dtjtGoogleMap">'+
		      '<div class="concertFrame_Tu" id="optimizeChart"></div>'+
		    '</div>'+
		    '<div class="concertRight">'+
		     '<ul class="concertRight_ul1">'+
		      	'<p class="RightTitle">信号控制机属性</p>'+
		        '<li>'+
		          '<span class="concertSpa1">设备编号</span>'+
		          '<input type="text" class="concertipt" id="number" value="'+data.entitys[0]+'" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">设备位置</span>'+
		          '<input type="text" class="concertipt" id="position" value="'+data.entitys[1]+'" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">主街名称</span>'+
		          '<input type="text" class="concertipt" id="firstStreet" value="'+data.entitys[2]+'" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">次街名称</span>'+
		          '<input type="text" class="concertipt" id="secondStreet" value="'+data.entitys[3]+'" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">经度坐标</span>'+
		          '<input type="text" class="concertipt" id="lon" readonly="readonly" value="'+cLon+'" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">纬地坐标</span>'+
		          '<input type="text" class="concertipt" id="lat" readonly="readonly" value="'+cLat+'"/>'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">产品型号</span>'+
		          '<input type="text" class="concertipt" id="version" value="'+data.entitys[5]+'" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">控制机型</span>'+
		          '<select class="concertsel" id="controlType">'+
		            '<option>0-单点自由控制机</option>'+
		            '<option>1-Epics优化控制机</option>'+
		            '<option>2-感应优化控制机</option>'+
		            '<option>3-中心协调控制机</option>'+
		          '</select>'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">主要相位</span>'+
		          '<select class="concertsel" id="majorAspect">'+
		            '<option>1</option>'+
		            '<option>2</option>'+
		            '<option>3</option>'+
		            '<option>4</option>'+
		            '<option>5</option>'+
		            '<option>6</option>'+
		            '<option>7</option>'+
		            '<option>8</option>'+
		            '<option>9</option>'+
		            '<option>10</option>'+
		            '<option>11</option>'+
		            '<option>12</option>'+
		            '<option>13</option>'+
		            '<option>14</option>'+
		            '<option>15</option>'+
		            '<option>16</option>'+
		          '</select>'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">伴随相位</span>'+
		          '<select class="concertsel" id="followPhase">'+
		            '<option>A</option>'+
		            '<option>B</option>'+
		            '<option>C</option>'+
		            '<option>D</option>'+
		            '<option>E</option>'+
		            '<option>F</option>'+
		            '<option>G</option>'+
		            '<option>H</option>'+
		          '</select>'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">主街相位</span>'+
		          '<input type="text" class="concertipt" id="mainStemPhase" value="'+data.entitys[9]+'" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">次街相位</span>'+
		          '<input type="text" class="concertipt" id="secondStreetPhase" value="'+data.entitys[10]+'" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">检测器类</span>'+
		          '<select class="concertsel" id="detectors">'+
		            '<option>0-无检测器</option>'+
		            '<option>1-视频检测</option>'+
		            '<option>2-雷达检测</option>'+
		            '<option>3-地磁检测</option>'+
		            '<option>4-线圈检测</option>'+
		            '<option>5-电子警察数据</option>'+
		          '</select>'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">控制模式</span>'+
		          '<select class="concertsel" id="controlModel">'+
		            '<option>0-单点定时</option>'+
		            '<option>1-感应控制</option>'+
		            '<option>2-干道协调</option>'+
		            '<option>3-区域协调</option>'+
		          '</select>'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">优先控制</span>'+
		          '<select class="concertsel" id="firstControl">'+
		            '<option>0-无优先</option>'+
		            '<option>1-公交优先</option>'+
		            '<option>2-VIP优先</option>'+
		          '</select>'+
		        '</li>'+
		        '<li>'+
		          '<span class="concertSpa1">通信连接</span>'+
		          '<input type="text" class="concertipt" id="signalIp" value="'+data.entitys[15]+'" />'+
		        '</li>'+
		      '</ul>'+
		      '<p class="RightTitle changeRightTitle">'+titleP+'</p>'+
		      '<ul class="concertRight_ul2">'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_1">'+titleSP1+'</span>'+
				      '<span class="spa_words spa_words1">'+unit1+'</span>'+
				      '<input type="text" class="li_span1 li_span1_1 concertipt1" id="mor" value="76.4" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_2">'+titleSP2+'</span>'+
				      '<span class="spa_words spa_words2">'+unit2+'</span>'+
				      '<input type="text" class="li_span1 li_span1_1 concertipt1" id="nig" value="69.3" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_3">'+titleSP3+'</span>'+
				      '<span class="spa_words spa_words3">'+unit3+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="earlyMor" value="82" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_4">'+titleSP4+'</span>'+
				      '<span class="spa_words spa_words4">'+unit4+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="normalDay" value="88.3" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_5">'+titleSP5+'</span>'+
				      '<span class="spa_words spa_words5">'+unit5+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="darkNight" value="85.3" />'+
				    '</li>'+
				    '<p class="concertRight_btFrame">'+
				        // '<input type="button" value="导出数据"/>'+
				        '<a id="P_btn_frame1" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
				        // '<input type="button" value="导出图表"/>'+
				    '</p>'+
				'</ul>'+
		    '</div>'+
		  '</div>'+
		'</div>';
    $('body').append(nr);
    $("body").delegate("#targetSelect","change",function(){
    	var contentLi='',contentRight='';
		if($(this)[0].selectedIndex==0){
			$(".concertMainTitle_ul,.concertMainTitle_ul_1,.concertRight_ul2,.concertRight_btFrame").remove();
			contentLi+='<ul class="concertMainTitle_ul">'+
				      	'<li class="mainUl_li1">'+
				          '<span>评价指标选择</span>'+
				          '<select id="targetSelect">'+
				            '<option>信号控制性能图</option>'+//相位-
				            '<option>相位车流量</option>'+//相位-
				            '<option>相位流量比</option>'+//路口-
				            '<option>相位饱和度</option>'+//路口-
				            '<option>红灯启亮时排队长度</option>'+//相位-
				            '<option>绿灯启亮时排队长度</option>'+//相位-
				            '<option>绿灯时间通过量</option>'+//路口-
				            '<option>转向车流量</option>'+//路口-
				            '<option>平均停车次数</option>'+//路口-
				            '<option>平均延误</option>'+//路口-
				          '</select>'+
				        '</li>'+
				        '<li class="mainUl_li2">'+
				          '<span>相位选择</span>'+
				          '<select id="targetSelect2" class="targetSelect_coor2">'+
				            '<option>1相位</option>'+
		            		'<option>2相位</option>'+
		            		'<option>3相位</option>'+
		            		'<option>4相位</option>'+
		            		'<option>5相位</option>'+
		            		'<option>6相位</option>'+
		            		'<option>7相位</option>'+
		            		'<option>8相位</option>'+
				          '</select>'+
				        '</li>'+
				        '<li class="mainUl_li7 titleLi1">'+//'+title1+'
				          '<span>日期选择</span>'+
				          '<input type="text" value="2016-04-01 00:00:00" id="concertDay" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD\'})"/>'+//'+_date+'
				        '</li>'+
				        '<li class="mainUl_li2 titleLi2">'+
				          '<span>早高峰时段</span>'+
				          '<input type="text" value="07:00-09:00" id="morningTime" />'+
				        '</li>'+
				        '<li class="mainUl_li2 titleLi3">'+
				          '<span>晚高峰时段</span>'+
				          '<input type="text" value="07:00-09:00" id="nightTime" />'+
				        '</li>'+
				        '<li class="mainUl_li3"><input type="button" class="concertMainTitle_ul_btn" value="确定"/></li>'+
				      '</ul>';
				$(".insertUl").append(contentLi);
				$("#targetSelect option").eq(0).attr("selected",true);
				titleP='车辆通过率统计分析',unit1='%',unit2='%',unit3='%',unit4='%',unit5='%';
  				titleSP1='早高峰',titleSP2='晚高峰',titleSP3='清晨',titleSP4='白天',titleSP5='夜晚';
  				$(".changeRightTitle").text(titleP);
  			contentRight+='<ul class="concertRight_ul2">'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_1">'+titleSP1+'</span>'+
				      '<span class="spa_words spa_words1">'+unit1+'</span>'+
				      '<input type="text" class="li_span1 li_span1_1 concertipt1" id="mor" value="76.4" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_2">'+titleSP2+'</span>'+
				      '<span class="spa_words spa_words2">'+unit2+'</span>'+
				      '<input type="text" class="li_span1 li_span1_1 concertipt1" id="nig" value="69.3" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_3">'+titleSP3+'</span>'+
				      '<span class="spa_words spa_words3">'+unit3+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="earlyMor" value="82" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_4">'+titleSP4+'</span>'+
				      '<span class="spa_words spa_words4">'+unit4+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="normalDay" value="88.3" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_5">'+titleSP5+'</span>'+
				      '<span class="spa_words spa_words5">'+unit5+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="darkNight" value="85.3" />'+
				    '</li>'+
				    '<p class="concertRight_btFrame">'+
				        '<a id="P_btn_frame1" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
				    '</p>'+
				'</ul>';
				$(".concertRight").append(contentRight);
  				$(".li_span1").removeClass("concertipt1_3 concertipt1_2 concertipt1_1");
  				$(".li_span1").addClass("concertipt1");  
  				$(".concertRight_ul2").removeClass("concertRight_ul2_bg");
		}else if($(this)[0].selectedIndex==1){
			$(".concertMainTitle_ul,.concertMainTitle_ul_1,.concertRight_ul2,.concertRight_btFrame").remove();
			contentLi+='<ul class="concertMainTitle_ul_1">'+
				      	'<li class="mainUl_li1_1">'+
				          '<span>评价指标选择</span>'+
				          '<select id="targetSelect">'+
				            '<option>信号控制性能图</option>'+
				            '<option>相位车流量</option>'+
				            '<option>相位流量比</option>'+
				            '<option>相位饱和度</option>'+
				            '<option>红灯启亮时排队长度</option>'+
				            '<option>绿灯启亮时排队长度</option>'+
				            '<option>绿灯时间通过量</option>'+
				            '<option>转向车流量</option>'+
				            '<option>平均停车次数</option>'+
				            '<option>平均延误</option>'+
				          '</select>'+
				        '</li>'+
				        '<li class="mainUl_li2">'+
				          '<span>相位选择</span>'+
				          '<select id="targetSelect2" class="targetSelect_coor2">'+
				            '<option>1相位</option>'+
		            		'<option>2相位</option>'+
		            		'<option>3相位</option>'+
		            		'<option>4相位</option>'+
		            		'<option>5相位</option>'+
		            		'<option>6相位</option>'+
		            		'<option>7相位</option>'+
		            		'<option>8相位</option>'+
				          '</select>'+
				        '</li>'+
				        '<li class="mainUl_li4 titleLi1">'+//'+title1+'
				          '<span>历史日期选择(蓝线)</span>'+
				          '<input type="text" value="2016-04-01 00:00:00" id="concertDay" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD\'})"/>'+
				        '</li>'+
				        '<li class="mainUl_li4 titleLi2">'+
				          '<span>近期日期选择(绿线)</span>'+
				          '<input type="text" value="2016-04-02 00:00:00" id="nowDay" onClick="jeDate({dateCell:\'#nowDay\',isTime:true,format:\'YYYY-MM-DD\'})"/>'+//'+_date+'
				        '</li>'+
				        '<li class="mainUl_li3_1"><input type="button" class="concertMainTitle_ul_btn" value="确定"/></li>'+
				      '</ul>';
				$(".insertUl").append(contentLi);
				$("#targetSelect option").eq(1).attr("selected",true);
				titleP='相位流量变化统计',unit1='pcu',unit2='pcu',unit3='%',unit4='%',unit5='%';
  				 titleSP1='日总流量(蓝线)',titleSP2='日总流量(绿线)',titleSP3='日总流量变化',titleSP4='早高峰流量变化',titleSP5='晚高峰流量变化';
  				 $(".changeRightTitle").text(titleP);
  				contentRight+='<ul class="concertRight_ul2">'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_1">'+titleSP1+'</span>'+
				      '<span class="spa_words spa_words1">'+unit1+'</span>'+
				      '<input type="text" class="li_span1 li_span1_1 concertipt1" id="mor" value="7200" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_2">'+titleSP2+'</span>'+
				      '<span class="spa_words spa_words2">'+unit2+'</span>'+
				      '<input type="text" class="li_span1 li_span1_1 concertipt1" id="nig" value="7600" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_3">'+titleSP3+'</span>'+
				      '<span class="spa_words spa_words3">'+unit3+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="earlyMor" value="+5" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_4">'+titleSP4+'</span>'+
				      '<span class="spa_words spa_words4">'+unit4+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="normalDay" value="+2" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_5">'+titleSP5+'</span>'+
				      '<span class="spa_words spa_words5">'+unit5+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="darkNight" value="-0.6" />'+
				    '</li>'+
				    '<p class="concertRight_btFrame">'+
				        '<a id="P_btn_frame1" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
				    '</p>'+
				'</ul>';
				$(".concertRight").append(contentRight);
  				 $(".li_span1").removeClass("concertipt1");
  				 $(".li_span1_1").addClass("concertipt1_1");
  				 $(".li_span1_2").addClass("concertipt1_2");
  				 $(".concertRight_ul2").removeClass("concertRight_ul2_bg");
		}else if($(this)[0].selectedIndex==2){
			$(".concertMainTitle_ul,.concertMainTitle_ul_1,.concertRight_ul2,.concertRight_btFrame").remove();
			contentLi+='<ul class="concertMainTitle_ul_1">'+
				      	'<li class="mainUl_li1_1">'+
				          '<span>评价指标选择</span>'+
				          '<select id="targetSelect">'+
				            '<option>信号控制性能图</option>'+
				            '<option>相位车流量</option>'+
				            '<option>相位流量比</option>'+
				            '<option>相位饱和度</option>'+
				            '<option>红灯启亮时排队长度</option>'+
				            '<option>绿灯启亮时排队长度</option>'+
				            '<option>绿灯时间通过量</option>'+
				            '<option>转向车流量</option>'+
				            '<option>平均停车次数</option>'+
				            '<option>平均延误</option>'+
				          '</select>'+
				        '</li>'+
				        '<li class="mainUl_li2">'+
				          '<span>相位选择</span>'+
				          '<select id="targetSelect2" class="targetSelect_coor2">'+
				            '<option>1相位</option>'+
		            		'<option>2相位</option>'+
		            		'<option>3相位</option>'+
		            		'<option>4相位</option>'+
		            		'<option>5相位</option>'+
		            		'<option>6相位</option>'+
		            		'<option>7相位</option>'+
		            		'<option>8相位</option>'+
				          '</select>'+
				        '</li>'+
				        '<li class="mainUl_li4 titleLi1">'+//'+title1+'
				          '<span>历史日期选择(蓝线)</span>'+
				          '<input type="text" value="2016-04-01 00:00:00" id="concertDay" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD\'})"/>'+
				        '</li>'+
				        '<li class="mainUl_li4 titleLi2">'+
				          '<span>近期日期选择(绿线)</span>'+
				          '<input type="text" value="2016-04-02 00:00:00" id="nowDay" onClick="jeDate({dateCell:\'#nowDay\',isTime:true,format:\'YYYY-MM-DD\'})"/>'+
				        '</li>'+
				        '<li class="mainUl_li3_1"><input type="button" class="concertMainTitle_ul_btn" value="确定"/></li>'+
				      '</ul>';
				$(".insertUl").append(contentLi);
				$("#targetSelect option").eq(2).attr("selected",true);
				titleP='流量比统计',unit1='%',unit2='%',unit3='%',unit4='%',unit5='%';
  				titleSP1='平均流量比(蓝线)',titleSP2='平均流量比(绿线)',titleSP3='平均流量比变化率',titleSP4='最大流量比(蓝线)',titleSP5='最大流量比(绿线)';
  				$(".changeRightTitle").text(titleP);
  				// $(".concertSpa1_1").text(titleSP1);$(".concertSpa1_2").text(titleSP2);$(".concertSpa1_3").text(titleSP3);
  				// $(".concertSpa1_4").text(titleSP4);$(".concertSpa1_5").text(titleSP5);$(".spa_words1").text(unit1);
  				// $(".spa_words2").text(unit2);$(".spa_words3").text(unit3);$(".spa_words4").text(unit4);$(".spa_words5").text(unit5);
  				contentRight+='<ul class="concertRight_ul2">'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_1">'+titleSP1+'</span>'+
				      '<span class="spa_words spa_words1">'+unit1+'</span>'+
				      '<input type="text" class="li_span1 li_span1_1 concertipt1" id="mor" value="+0.3" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_2">'+titleSP2+'</span>'+
				      '<span class="spa_words spa_words2">'+unit2+'</span>'+
				      '<input type="text" class="li_span1 li_span1_1 concertipt1" id="nig" value="+0.2" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_3">'+titleSP3+'</span>'+
				      '<span class="spa_words spa_words3">'+unit3+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="earlyMor" value="+3" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_4">'+titleSP4+'</span>'+
				      '<span class="spa_words spa_words4">'+unit4+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="normalDay" value="+.6" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_5">'+titleSP5+'</span>'+
				      '<span class="spa_words spa_words5">'+unit5+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="darkNight" value="-0.6" />'+
				    '</li>'+
				    '<p class="concertRight_btFrame">'+
				        '<a id="P_btn_frame1" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
				    '</p>'+
				'</ul>';
				$(".concertRight").append(contentRight); 
  				 $(".li_span1").removeClass("concertipt1 concertipt1_2");
  				 $(".li_span1_1").addClass("concertipt1_1");
  				 $(".li_span1_2").addClass("concertipt1_3");
  				 $(".concertRight_ul2").removeClass("concertRight_ul2_bg");
		}else if($(this)[0].selectedIndex==3){
			$(".concertMainTitle_ul,.concertMainTitle_ul_1,.concertRight_ul2,.concertRight_btFrame").remove();
			contentLi+='<ul class="concertMainTitle_ul_1">'+
				      	'<li class="mainUl_li1_1">'+
				          '<span>评价指标选择</span>'+
				          '<select id="targetSelect">'+
				            '<option>信号控制性能图</option>'+
				            '<option>相位车流量</option>'+
				            '<option>相位流量比</option>'+
				            '<option>相位饱和度</option>'+
				            '<option>红灯启亮时排队长度</option>'+
				            '<option>绿灯启亮时排队长度</option>'+
				            '<option>绿灯时间通过量</option>'+
				            '<option>转向车流量</option>'+
				            '<option>平均停车次数</option>'+
				            '<option>平均延误</option>'+
				          '</select>'+
				        '</li>'+
				        '<li class="mainUl_li2">'+
				          '<span>相位选择</span>'+
				          '<select id="targetSelect2" class="targetSelect_coor2">'+
				            '<option>1相位</option>'+
		            		'<option>2相位</option>'+
		            		'<option>3相位</option>'+
		            		'<option>4相位</option>'+
		            		'<option>5相位</option>'+
		            		'<option>6相位</option>'+
		            		'<option>7相位</option>'+
		            		'<option>8相位</option>'+
				          '</select>'+
				        '</li>'+
				        '<li class="mainUl_li4 titleLi1">'+//'+title1+'
				          '<span>历史日期选择(蓝线)</span>'+//'+_date+'
				          '<input type="text" value="2016-04-01 00:00:00" id="concertDay" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD\'})"/>'+
				        '</li>'+
				        '<li class="mainUl_li4 titleLi2">'+
				          '<span>近期日期选择(绿线)</span>'+
				          '<input type="text" value="2016-04-02 00:00:00" id="nowDay" onClick="jeDate({dateCell:\'#nowDay\',isTime:true,format:\'YYYY-MM-DD\'})"/>'+
				        '</li>'+
				        '<li class="mainUl_li3_1"><input type="button" class="concertMainTitle_ul_btn" value="确定"/></li>'+
				      '</ul>';
				$(".insertUl").append(contentLi);
				$("#targetSelect option").eq(3).attr("selected",true);
				titleP='饱和度统计',unit1='%',unit2='%',unit3='%',unit4='%',unit5='%';
  				titleSP1='平均饱和度(蓝线)',titleSP2='平均饱和度(绿线)',titleSP3='平均饱和度变化率',titleSP4='最大饱和度(蓝线)',titleSP5='最大饱和度(绿线)';
  				$(".changeRightTitle").text(titleP);
  				contentRight+='<ul class="concertRight_ul2">'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_1">'+titleSP1+'</span>'+
				      '<span class="spa_words spa_words1">'+unit1+'</span>'+
				      '<input type="text" class="li_span1 li_span1_1 concertipt1" id="mor" value="0.3" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_2">'+titleSP2+'</span>'+
				      '<span class="spa_words spa_words2">'+unit2+'</span>'+
				      '<input type="text" class="li_span1 li_span1_1 concertipt1" id="nig" value="0.2" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_3">'+titleSP3+'</span>'+
				      '<span class="spa_words spa_words3">'+unit3+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="earlyMor" value="+8" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_4">'+titleSP4+'</span>'+
				      '<span class="spa_words spa_words4">'+unit4+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="normalDay" value="0.5" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_5">'+titleSP5+'</span>'+
				      '<span class="spa_words spa_words5">'+unit5+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="darkNight" value="0.6" />'+
				    '</li>'+
				    '<p class="concertRight_btFrame">'+
				        // '<input type="button" value="导出数据"/>'+
				        '<a id="P_btn_frame1" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
				        // '<input type="button" value="导出图表"/>'+
				    '</p>'+
				'</ul>';
				$(".concertRight").append(contentRight);
  				$(".li_span1").removeClass("concertipt1 concertipt1_2");
  				$(".li_span1_1").addClass("concertipt1_1");
  				$(".li_span1_2").addClass("concertipt1_3");
  				$(".concertRight_ul2").removeClass("concertRight_ul2_bg");
		}else if($(this)[0].selectedIndex==4||$(this)[0].selectedIndex==5){
			$(".concertMainTitle_ul,.concertMainTitle_ul_1,.concertRight_ul2,.concertRight_btFrame").remove();
			contentLi+='<ul class="concertMainTitle_ul_1">'+
				      	'<li class="mainUl_li1_1">'+
				          '<span>评价指标选择</span>'+
				          '<select id="targetSelect">'+
				            '<option>信号控制性能图</option>'+
				            '<option>相位车流量</option>'+
				            '<option>相位流量比</option>'+
				            '<option>相位饱和度</option>'+
				            '<option>红灯启亮时排队长度</option>'+
				            '<option>绿灯启亮时排队长度</option>'+
				            '<option>绿灯时间通过量</option>'+
				            '<option>转向车流量</option>'+
				            '<option>平均停车次数</option>'+
				            '<option>平均延误</option>'+
				          '</select>'+
				        '</li>'+
				        '<li class="mainUl_li2">'+
				          '<span>相位选择</span>'+
				          '<select id="targetSelect2" class="targetSelect_coor2">'+
				            '<option>1相位</option>'+
		            		'<option>2相位</option>'+
		            		'<option>3相位</option>'+
		            		'<option>4相位</option>'+
		            		'<option>5相位</option>'+
		            		'<option>6相位</option>'+
		            		'<option>7相位</option>'+
		            		'<option>8相位</option>'+
				          '</select>'+
				        '</li>'+
				        '<li class="mainUl_li4 titleLi1">'+//'+title1+'
				          '<span>历史日期选择(蓝线)</span>'+//'+_date+'
				          '<input type="text" value="2016-04-01 00:00:00" id="concertDay" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD\'})"/>'+
				        '</li>'+
				        '<li class="mainUl_li4 titleLi2">'+
				          '<span>近期日期选择(绿线)</span>'+
				          '<input type="text" value="2016-04-02 00:00:00" id="nowDay" onClick="jeDate({dateCell:\'#nowDay\',isTime:true,format:\'YYYY-MM-DD\'})"/>'+
				        '</li>'+
				        '<li class="mainUl_li3_1"><input type="button" class="concertMainTitle_ul_btn" value="确定"/></li>'+
				      '</ul>';
				$(".insertUl").append(contentLi);
				if($(this)[0].selectedIndex==4){
					$("#targetSelect option").eq(4).attr("selected",true);
				}else{
					$("#targetSelect option").eq(5).attr("selected",true);
				}
				titleP='排队长度统计',unit1='m',unit2='m',unit3='m',unit4='m',unit5='%';
  				titleSP1='总排队长度(蓝线)',titleSP2='总排队长度(绿线)',titleSP3='最大排队(蓝线)',titleSP4='最大排队(绿线)',titleSP5='最大排队变化率';
  				$(".changeRightTitle").text(titleP);
  				contentRight+='<ul class="concertRight_ul2">'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_1">'+titleSP1+'</span>'+
				      '<span class="spa_words spa_words1">'+unit1+'</span>'+
				      '<input type="text" class="li_span1 li_span1_1 concertipt1" id="mor" value="6.3" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_2">'+titleSP2+'</span>'+
				      '<span class="spa_words spa_words2">'+unit2+'</span>'+
				      '<input type="text" class="li_span1 li_span1_1 concertipt1" id="nig" value="5.9" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_3">'+titleSP3+'</span>'+
				      '<span class="spa_words spa_words3">'+unit3+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="earlyMor" value="0.3" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_4">'+titleSP4+'</span>'+
				      '<span class="spa_words spa_words4">'+unit4+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="normalDay" value="0.28" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_5">'+titleSP5+'</span>'+
				      '<span class="spa_words spa_words5">'+unit5+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1" id="darkNight" value="+3" />'+
				    '</li>'+
				    '<p class="concertRight_btFrame">'+
				        '<a id="P_btn_frame1" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
				    '</p>'+
				'</ul>';
				$(".concertRight").append(contentRight);
  				$(".li_span1").removeClass("concertipt1 concertipt1_1 concertipt1_2");
  				$(".li_span1").addClass("concertipt1_3");
  				$(".concertRight_ul2").removeClass("concertRight_ul2_bg");
		}else if($(this)[0].selectedIndex==6){
			$(".concertMainTitle_ul,.concertMainTitle_ul_1,.concertRight_ul2,.concertRight_btFrame").remove();
			contentLi+='<ul class="concertMainTitle_ul_1">'+
				      	'<li class="mainUl_li1_1">'+
				          '<span>评价指标选择</span>'+
				          '<select id="targetSelect">'+
				            '<option>信号控制性能图</option>'+
				            '<option>相位车流量</option>'+
				            '<option>相位流量比</option>'+
				            '<option>相位饱和度</option>'+
				            '<option>红灯启亮时排队长度</option>'+
				            '<option>绿灯启亮时排队长度</option>'+
				            '<option>绿灯时间通过量</option>'+
				            '<option>转向车流量</option>'+
				            '<option>平均停车次数</option>'+
				            '<option>平均延误</option>'+
				          '</select>'+
				        '</li>'+
				        '<li class="mainUl_li4">'+
				          '<span>相位选择</span>'+
				          '<select id="targetSelect2" class="targetSelect_coor2">'+
				            '<option>1相位</option>'+
		            		'<option>2相位</option>'+
		            		'<option>3相位</option>'+
		            		'<option>4相位</option>'+
		            		'<option>5相位</option>'+
		            		'<option>6相位</option>'+
		            		'<option>7相位</option>'+
		            		'<option>8相位</option>'+
				          '</select>'+
				        '</li>'+
				        '<li class="mainUl_li4 titleLi1">'+//'+title1+'
				          '<span>开始时间</span>'+//'+_date+'
				          '<input type="text" value="2016-04-01 00:00:00" id="concertDay" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/>'+
				        '</li>'+
				        '<li class="mainUl_li4 titleLi2">'+
				          '<span>结束时间</span>'+
				          '<input type="text" value="2016-04-02 00:00:00" id="nowDay" onClick="jeDate({dateCell:\'#nowDay\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/>'+
				        '</li>'+
				        '<li class="mainUl_li3"><input type="button" class="concertMainTitle_ul_btn" value="确定"/></li>'+
				      '</ul>';
				$(".insertUl").append(contentLi);
				$("#targetSelect option").eq(6).attr("selected",true);
				titleP='绿灯时间通过量分析',unit1='个',unit2='pcu',unit3='pcu/s',unit4='s',unit5='s';
  				titleSP1='时间段周期数量',titleSP2='平均周期通过量',titleSP3='单位绿时通过量',titleSP4='85位通过量时间',titleSP5='95位通过量时间';
  				$(".changeRightTitle").text(titleP);
  				contentRight+='<ul class="concertRight_ul2">'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_1">'+titleSP1+'</span>'+
				      '<span class="spa_words_1">'+unit1+'</span>'+
				      '<input type="text" class="li_span1 li_span1_1 concertipt1_4" id="mor" value="60" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_2">'+titleSP2+'</span>'+
				      '<span class="spa_words_1">'+unit2+'</span>'+
				      '<input type="text" class="li_span1 li_span1_1 concertipt1_4" id="nig" value="20" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_3">'+titleSP3+'</span>'+
				      '<span class="spa_words_1">'+unit3+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1_4" id="earlyMor" value="0.8" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_4">'+titleSP4+'</span>'+
				      '<span class="spa_words_1">'+unit4+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1_4" id="normalDay" value="35" />'+
				    '</li>'+
				    '<li>'+
				      '<span class="concertSpa1 concertSpa1_5">'+titleSP5+'</span>'+
				      '<span class="spa_words_1">'+unit5+'</span>'+
				      '<input type="text" class="li_span1 li_span1_2 concertipt1_4" id="darkNight" value="45" />'+
				    '</li>'+
				    '<p class="concertRight_btFrame">'+
				        '<a id="P_btn_frame1" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
				    '</p>'+
				'</ul>';
				$(".concertRight").append(contentRight);
  				$(".li_span1").removeClass("concertipt1 concertipt1_1 concertipt1_2");
  				$(".li_span1").addClass("concertipt1_3");
  				$(".concertRight_ul2").removeClass("concertRight_ul2_bg");
		}else if($(this)[0].selectedIndex==7){
			$(".concertMainTitle_ul,.concertMainTitle_ul_1,.concertRight_ul2,.concertRight_btFrame").remove();
			contentLi+='<ul class="concertMainTitle_ul_1">'+
				      	'<li class="mainUl_li1_1">'+
				          '<span>评价指标选择</span>'+
				          '<select id="targetSelect">'+
				            '<option>信号控制性能图</option>'+
				            '<option>相位车流量</option>'+
				            '<option>相位流量比</option>'+
				            '<option>相位饱和度</option>'+
				            '<option>红灯启亮时排队长度</option>'+
				            '<option>绿灯启亮时排队长度</option>'+
				            '<option>绿灯时间通过量</option>'+
				            '<option>转向车流量</option>'+
				            '<option>平均停车次数</option>'+
				            '<option>平均延误</option>'+
				          '</select>'+
				        '</li>'+
				        '<li class="mainUl_li4 titleLi1">'+//'+title1+'
				          '<span>开始时间</span>'+
				          '<input type="text" value="2016-04-01 00:00:00" id="concertDay" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/>'+
				        '</li>'+
				        '<li class="mainUl_li4 titleLi2">'+
				          '<span>结束时间</span>'+
				          '<input type="text" value="2016-04-02 00:00:00" id="nowDay" onClick="jeDate({dateCell:\'#nowDay\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/>'+
				        '</li>'+
				        '<li class="mainUl_li3"><input type="button" class="concertMainTitle_ul_btn" value="确定"/></li>'+
				      '</ul>';
				$(".insertUl").append(contentLi);
				$("#targetSelect option").eq(7).attr("selected",true);
				titleP='单位时间转向流量';
				$(".changeRightTitle").text(titleP);
  				contentRight+='<ul class="concertRight_ul2">'+
				'</ul>'+
				'<p class="concertRight_btFrame">'+
				    '<a id="P_btn_frame1" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
				    '<input type="button" value="导出图表"/>'+
				'</p>';
				$(".concertRight").append(contentRight);
  				$(".concertRight_ul2").addClass("concertRight_ul2_bg");
		}else if($(this)[0].selectedIndex==8){
			$(".concertMainTitle_ul,.concertMainTitle_ul_1,.concertRight_ul2,.concertRight_btFrame").remove();
			contentLi+='<ul class="concertMainTitle_ul_1">'+
				      	'<li class="mainUl_li1_1">'+
				          '<span>评价指标选择</span>'+
				          '<select id="targetSelect">'+
				            '<option>信号控制性能图</option>'+
				            '<option>相位车流量</option>'+
				            '<option>相位流量比</option>'+
				            '<option>相位饱和度</option>'+
				            '<option>红灯启亮时排队长度</option>'+
				            '<option>绿灯启亮时排队长度</option>'+
				            '<option>绿灯时间通过量</option>'+
				            '<option>转向车流量</option>'+
				            '<option>平均停车次数</option>'+
				            '<option>平均延误</option>'+
				          '</select>'+
				        '</li>'+
				        '<li class="mainUl_li4 titleLi1">'+//'+title1+'
				          '<span>开始时间</span>'+
				          '<input type="text" value="2016-04-01 00:00:00" id="concertDay" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/>'+
				        '</li>'+
				        '<li class="mainUl_li4 titleLi2">'+
				          '<span>结束时间</span>'+
				          '<input type="text" value="2016-04-02 00:00:00" id="nowDay" onClick="jeDate({dateCell:\'#nowDay\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/>'+
				        '</li>'+
				        '<li class="mainUl_li3"><input type="button" class="concertMainTitle_ul_btn" value="确定"/></li>'+
				      '</ul>';
				$(".insertUl").append(contentLi);
					$("#targetSelect option").eq(8).attr("selected",true);
					titleP='单位时间平均停车次数';
				$(".changeRightTitle").text(titleP);
  				contentRight+='<ul class="concertRight_ul2">'+
				    '<li>'+
				      '<span class="coorWords coorWords1">02相位方向:</span>'+
				      '<span class="coorWords coorWords2">13</span>'+
				      '<span class="coorWords coorWords3">次/车/小时</span>'+
				    '</li>'+
				    '<li>'+
				      '<span class="coorWords coorWords1">04相位方向:</span>'+
				      '<span class="coorWords coorWords2">13</span>'+
				      '<span class="coorWords coorWords3">次/车/小时</span>'+
				    '</li>'+
				    '<li>'+
				      '<span class="coorWords coorWords1">06相位方向:</span>'+
				      '<span class="coorWords coorWords2">13</span>'+
				      '<span class="coorWords coorWords3">次/车/小时</span>'+
				    '</li>'+
				    '<li>'+
				      '<span class="coorWords coorWords1">08相位方向:</span>'+
				      '<span class="coorWords coorWords2">13</span>'+
				      '<span class="coorWords coorWords3">次/车/小时</span>'+
				    '</li>'+
				'</ul>'+
				'<p class="concertRight_btFrame">'+
				    '<a id="P_btn_frame1" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
				    '<input type="button" value="导出图表"/>'+
				'</p>';
				$(".concertRight").append(contentRight);
  				$(".concertRight_ul2").addClass("concertRight_ul2_bg");
		}
	})
    $("#controlType option").eq(data.entitys[6]).attr("selected", true);
    $("#majorAspect option").eq(data.entitys[7]).attr("selected", true);
    $("#followPhase option").eq(data.entitys[8]).attr("selected", true);
    $("#detectors option").eq(data.entitys[11]).attr("selected", true);
    $("#controlModel option").eq(data.entitys[12]).attr("selected", true);
    $("#firstControl option").eq(data.entitys[13]).attr("selected", true);
    getOptimizeChartsData();
}
function getOptimizeChartsData(){
	var unit='s';
	var colorBlue='red';
	var typeVal='time';
	var dataTitle=['绿灯','红灯','车'];
	var data1=[
			    ["2017-04-01 05:30:00","20"],["2017-04-01 05:40:00","22"],["2017-04-01 05:50:00","15"],["2017-04-01 06:00:00","18"],["2017-04-01 06:10:00","10"],
			    ["2017-04-01 06:20:00","20"],["2017-04-01 06:30:00","22"],["2017-04-01 06:40:00","20"],["2017-04-01 06:50:00","20"],["2017-04-01 07:00:00","20"],
			    ["2017-04-01 07:10:00","20"],["2017-04-01 07:20:00","20"],["2017-04-01 07:30:00","22"],["2017-04-01 07:40:00","16"],["2017-04-01 07:50:00","16"],
			    ["2017-04-01 08:10:00","16"],["2017-04-01 08:20:00","18"],["2017-04-01 08:30:00","20"],["2017-04-01 08:40:00","20"],["2017-04-01 08:50:00","20"],
			    ["2017-04-01 09:00:00","20"],["2017-04-01 09:10:00","20"],["2017-04-01 09:20:00","21"],["2017-04-01 09:30:00","24"],["2017-04-01 09:40:00","20"],
			    ["2017-04-01 09:50:00","20"],["2017-04-01 10:00:00","22"],["2017-04-01 10:10:00","22"],["2017-04-01 10:20:00","21"],["2017-04-01 10:30:00","21"],
			    ["2017-04-01 10:40:00","20"],["2017-04-01 10:50:00","20"],["2017-04-01 11:00:00","20"],["2017-04-01 11:10:00","20"],["2017-04-01 11:20:00","20"],
			    ["2017-04-01 11:30:00","20"],["2017-04-01 11:40:00","22"],["2017-04-01 11:50:00","21"],["2017-04-01 12:00:00","20"],["2017-04-01 12:10:00","20"],
			    ["2017-04-01 12:20:00","20"],["2017-04-01 12:30:00","20"],["2017-04-01 12:40:00","20"],["2017-04-01 12:50:00","20"],["2017-04-01 13:00:00","25"],
			    ["2017-04-01 13:10:00","22"],["2017-04-01 13:20:00","22"],["2017-04-01 13:30:00","22"],["2017-04-01 13:40:00","22"],["2017-04-01 13:50:00","21"],
			    ["2017-04-01 14:00:00","26"],["2017-04-01 14:10:00","20"],["2017-04-01 14:20:00","20"],["2017-04-01 14:30:00","20"],["2017-04-01 14:40:00","22"],
			    ["2017-04-01 14:50:00","20"],["2017-04-01 15:00:00","20"],["2017-04-01 15:10:00","20"],["2017-04-01 15:20:00","20"],["2017-04-01 15:30:00","24"],
			    ["2017-04-01 15:40:00","20"],["2017-04-01 15:50:00","20"],["2017-04-01 16:00:00","24"],["2017-04-01 16:10:00","20"],["2017-04-01 16:20:00","20"],
			    ["2017-04-01 16:30:00","20"],["2017-04-01 16:40:00","21"],["2017-04-01 16:50:00","20"],["2017-04-01 17:00:00","20"],["2017-04-01 17:10:00","20"]
		    ];
	var data2=[
		        ["2017-04-01 05:30:00","45"],["2017-04-01 05:40:00","43"],["2017-04-01 05:50:00","55"],["2017-04-01 06:00:00","60"],["2017-04-01 06:10:00","62"],
		        ["2017-04-01 06:20:00","60"],["2017-04-01 06:30:00","60"],["2017-04-01 06:40:00","60"],["2017-04-01 06:50:00","60"],["2017-04-01 07:00:00","60"],
		        ["2017-04-01 07:10:00","60"],["2017-04-01 07:20:00","55"],["2017-04-01 07:30:00","58"],["2017-04-01 07:40:00","58"],["2017-04-01 07:50:00","45"],
		        ["2017-04-01 08:10:00","60"],["2017-04-01 08:20:00","60"],["2017-04-01 08:30:00","60"],["2017-04-01 08:40:00","60"],["2017-04-01 08:50:00","62"],
		        ["2017-04-01 09:00:00","60"],["2017-04-01 09:10:00","60"],["2017-04-01 09:20:00","60"],["2017-04-01 09:30:00","60"],["2017-04-01 09:40:00","55"],
		        ["2017-04-01 09:50:00","34"],["2017-04-01 10:00:00","84"],["2017-04-01 10:10:00","68"],["2017-04-01 10:20:00","56"],["2017-04-01 10:30:00","82"],
		        ["2017-04-01 10:40:00","59"],["2017-04-01 10:50:00","67"],["2017-04-01 11:00:00","62"],["2017-04-01 11:10:00","67"],["2017-04-01 11:20:00","66"],
		        ["2017-04-01 11:30:00","65"],["2017-04-01 11:40:00","61"],["2017-04-01 11:50:00","60"],["2017-04-01 12:00:00","63"],["2017-04-01 12:10:00","63"],
		        ["2017-04-01 12:20:00","61"],["2017-04-01 12:30:00","62"],["2017-04-01 12:40:00","60"],["2017-04-01 12:50:00","60"],["2017-04-01 13:00:00","60"],
		        ["2017-04-01 13:10:00","60"],["2017-04-01 13:20:00","60"],["2017-04-01 13:30:00","60"],["2017-04-01 13:40:00","62"],["2017-04-01 13:50:00","60"],
		        ["2017-04-01 14:00:00","52"],["2017-04-01 14:10:00","60"],["2017-04-01 14:20:00","60"],["2017-04-01 14:30:00","60"],["2017-04-01 14:40:00","60"],
		        ["2017-04-01 14:50:00","69"],["2017-04-01 15:00:00","60"],["2017-04-01 15:10:00","61"],["2017-04-01 15:20:00","62"]
		    ];
	var data3=[
		        ["2017-04-01 05:30:00","25"],["2017-04-01 05:30:00","20"],["2017-04-01 05:30:00","18"],["2017-04-01 05:50:00","6"],["2017-04-01 05:50:00","7"],["2017-04-01 05:50:00","1"],["2017-04-01 05:50:00","61"],
		        ["2017-04-01 06:00:00","10"],["2017-04-01 06:00:00","31"],["2017-04-01 06:00:00","71"],["2017-04-01 06:00:00","85"],["2017-04-01 06:00:00","98"],["2017-04-01 06:00:00","93"],["2017-04-01 06:00:00","36"],
		        ["2017-04-01 06:40:00","47"],["2017-04-01 06:40:00","56"],["2017-04-01 06:40:00","68"],["2017-04-01 06:40:00","25"],["2017-04-01 06:40:00","26"],["2017-04-01 06:40:00","21"],["2017-04-01 06:40:00","59"],
		        ["2017-04-01 07:10:00","58"],["2017-04-01 07:10:00","59"],["2017-04-01 07:10:00","42"],["2017-04-01 07:10:00","32"],["2017-04-01 07:10:00","67"],["2017-04-01 07:10:00","48"],["2017-04-01 07:10:00","73"],["2017-04-01 07:40:00","54"],
		        ["2017-04-01 07:40:00","58"],["2017-04-01 07:40:00","49"],["2017-04-01 07:40:00","47"],["2017-04-01 07:40:00","45"],["2017-04-01 07:50:00","48"],["2017-04-01 07:50:00","62"],["2017-04-01 07:50:00","79"],["2017-04-01 07:50:00","88"],
		        ["2017-04-01 07:50:00","89"],["2017-04-01 07:50:00","47"],["2017-04-01 07:50:00","20"],["2017-04-01 08:10:00","24"],["2017-04-01 08:10:00","25"],["2017-04-01 08:10:00","47"],["2017-04-01 08:10:00","41"],["2017-04-01 08:10:00","45"],
		        ["2017-04-01 08:10:00","47"],["2017-04-01 08:10:00","50"],["2017-04-01 08:30:00","63"],["2017-04-01 08:30:00","72"],["2017-04-01 08:30:00","46"],["2017-04-01 08:30:00","73"],["2017-04-01 08:30:00","61"],["2017-04-01 08:30:00","63"],
		        ["2017-04-01 08:40:00","60"],["2017-04-01 08:40:00","15"],["2017-04-01 08:40:00","27"],["2017-04-01 08:40:00","12"],["2017-04-01 08:40:00","19"],["2017-04-01 08:40:00","15"],["2017-04-01 08:40:00","22"],["2017-04-01 08:40:00","37"],
		        ["2017-04-01 09:00:00","104"],["2017-04-01 09:00:00","39"],["2017-04-01 09:00:00","93"],["2017-04-01 09:00:00","118"],["2017-04-01 09:00:00","66"],["2017-04-01 09:00:00","92"],["2017-04-01 09:00:00","42"],["2017-04-01 09:00:00","41"],
		        ["2017-04-01 09:00:00","53"],["2017-04-01 09:00:00","42"],["2017-04-01 09:00:00","32"],["2017-04-01 09:00:00","79"],["2017-04-01 09:10:00","61"],["2017-04-01 09:10:00","59"],["2017-04-01 09:10:00","118"],["2017-04-01 09:10:00","38"],
		        ["2017-04-01 09:10:00","107"],["2017-04-01 09:10:00","80"],["2017-04-01 09:10:00","30"],["2017-04-01 09:10:00","46"],["2017-04-01 09:10:00","55"],["2017-04-01 09:10:00","50"],["2017-04-01 09:10:00","104"],["2017-04-01 09:10:00","81"],
		        ["2017-04-01 09:30:00","86"],["2017-04-01 09:30:00","67"],["2017-04-01 09:30:00","36"],["2017-04-01 09:30:00","102"],["2017-04-01 09:50:00","118"],["2017-04-01 09:50:00","92"],["2017-04-01 09:50:00","94"],["2017-04-01 09:50:00","84"],
		        ["2017-04-01 10:00:00","54"],["2017-04-01 10:00:00","106"],["2017-04-01 10:00:00","31"],["2017-04-01 10:00:00","51"],["2017-04-01 10:00:00","59"],["2017-04-01 10:00:00","27"],["2017-04-01 10:00:00","17"],["2017-04-01 10:00:00","43"],
		        ["2017-04-01 10:30:00","71"],["2017-04-01 10:30:00","102"],["2017-04-01 10:30:00","67"],["2017-04-01 10:30:00","96"],["2017-04-01 10:30:00","44"],["2017-04-01 10:30:00","38"],["2017-04-01 10:30:00","43"],["2017-04-01 10:30:00","30"],
		        ["2017-04-01 10:50:00","41"],["2017-04-01 10:50:00","48"],["2017-04-01 10:50:00","31"],["2017-04-01 10:50:00","46"],["2017-04-01 10:50:00","44"],["2017-04-01 10:50:00","23"],["2017-04-01 10:50:00","28"],["2017-04-01 10:50:00","51"],
		        ["2017-04-01 11:10:00","49"],["2017-04-01 11:10:00","37"],["2017-04-01 11:10:00","92"],["2017-04-01 11:10:00","57"],["2017-04-01 11:10:00","106"],["2017-04-01 11:10:00","49"],["2017-04-01 11:10:00","49"],["2017-04-01 11:10:00","59"],
		        ["2017-04-01 12:00:00","62"],["2017-04-01 12:00:00","46"],["2017-04-01 12:00:00","39"],["2017-04-01 12:00:00","37"],["2017-04-01 12:00:00","39"],["2017-04-01 12:00:00","30"],["2017-04-01 12:00:00","22"],["2017-04-01 12:00:00","29"],
		        ["2017-04-01 12:20:00","77"],["2017-04-01 12:20:00","12"],["2017-04-01 12:20:00","13"],["2017-04-01 12:20:00","19"],["2017-04-01 12:20:00","24"],["2017-04-01 12:20:00","45"],["2017-04-01 12:20:00","22"]
		    ];

	optimizeCharts(dataTitle,data1,data2,data3,typeVal,unit,colorBlue);
	$("body").delegate("#targetSelect","change",function(){
		var nr='';
		if($(this)[0].selectedIndex==0){  
			$("#optimizeChart").remove();
			nr+='<div class="concertFrame_Tu" id="optimizeChart"></div>';
			$(".concertLeft").append(nr);
			dataTitle=['绿灯','红灯','车'];
			unit='s';
			colorBlue='red';
			xHeight=null;
			xMin=null;
			typeVal='time';
			var data1=[
			    ["2017-04-01 05:30:00","20"],["2017-04-01 05:40:00","22"],["2017-04-01 05:50:00","15"],["2017-04-01 06:00:00","18"],["2017-04-01 06:10:00","10"],
			    ["2017-04-01 06:20:00","20"],["2017-04-01 06:30:00","22"],["2017-04-01 06:40:00","20"],["2017-04-01 06:50:00","20"],["2017-04-01 07:00:00","20"],
			    ["2017-04-01 07:10:00","20"],["2017-04-01 07:20:00","20"],["2017-04-01 07:30:00","22"],["2017-04-01 07:40:00","16"],["2017-04-01 07:50:00","16"],
			    ["2017-04-01 08:10:00","16"],["2017-04-01 08:20:00","18"],["2017-04-01 08:30:00","20"],["2017-04-01 08:40:00","20"],["2017-04-01 08:50:00","20"],
			    ["2017-04-01 09:00:00","20"],["2017-04-01 09:10:00","20"],["2017-04-01 09:20:00","21"],["2017-04-01 09:30:00","24"],["2017-04-01 09:40:00","20"],
			    ["2017-04-01 09:50:00","20"],["2017-04-01 10:00:00","22"],["2017-04-01 10:10:00","22"],["2017-04-01 10:20:00","21"],["2017-04-01 10:30:00","21"],
			    ["2017-04-01 10:40:00","20"],["2017-04-01 10:50:00","20"],["2017-04-01 11:00:00","20"],["2017-04-01 11:10:00","20"],["2017-04-01 11:20:00","20"],
			    ["2017-04-01 11:30:00","20"],["2017-04-01 11:40:00","22"],["2017-04-01 11:50:00","21"],["2017-04-01 12:00:00","20"],["2017-04-01 12:10:00","20"],
			    ["2017-04-01 12:20:00","20"],["2017-04-01 12:30:00","20"],["2017-04-01 12:40:00","20"],["2017-04-01 12:50:00","20"],["2017-04-01 13:00:00","25"],
			    ["2017-04-01 13:10:00","22"],["2017-04-01 13:20:00","22"],["2017-04-01 13:30:00","22"],["2017-04-01 13:40:00","22"],["2017-04-01 13:50:00","21"],
			    ["2017-04-01 14:00:00","26"],["2017-04-01 14:10:00","20"],["2017-04-01 14:20:00","20"],["2017-04-01 14:30:00","20"],["2017-04-01 14:40:00","22"],
			    ["2017-04-01 14:50:00","20"],["2017-04-01 15:00:00","20"],["2017-04-01 15:10:00","20"],["2017-04-01 15:20:00","20"],["2017-04-01 15:30:00","24"],
			    ["2017-04-01 15:40:00","20"],["2017-04-01 15:50:00","20"],["2017-04-01 16:00:00","24"],["2017-04-01 16:10:00","20"],["2017-04-01 16:20:00","20"],
			    ["2017-04-01 16:30:00","20"],["2017-04-01 16:40:00","21"],["2017-04-01 16:50:00","20"],["2017-04-01 17:00:00","20"],["2017-04-01 17:10:00","20"]
		    ];
			var data2=[
				        ["2017-04-01 05:30:00","45"],["2017-04-01 05:40:00","43"],["2017-04-01 05:50:00","55"],["2017-04-01 06:00:00","60"],["2017-04-01 06:10:00","62"],
				        ["2017-04-01 06:20:00","60"],["2017-04-01 06:30:00","60"],["2017-04-01 06:40:00","60"],["2017-04-01 06:50:00","60"],["2017-04-01 07:00:00","60"],
				        ["2017-04-01 07:10:00","60"],["2017-04-01 07:20:00","55"],["2017-04-01 07:30:00","58"],["2017-04-01 07:40:00","58"],["2017-04-01 07:50:00","45"],
				        ["2017-04-01 08:10:00","60"],["2017-04-01 08:20:00","60"],["2017-04-01 08:30:00","60"],["2017-04-01 08:40:00","60"],["2017-04-01 08:50:00","62"],
				        ["2017-04-01 09:00:00","60"],["2017-04-01 09:10:00","60"],["2017-04-01 09:20:00","60"],["2017-04-01 09:30:00","60"],["2017-04-01 09:40:00","55"],
				        ["2017-04-01 09:50:00","34"],["2017-04-01 10:00:00","84"],["2017-04-01 10:10:00","68"],["2017-04-01 10:20:00","56"],["2017-04-01 10:30:00","82"],
				        ["2017-04-01 10:40:00","59"],["2017-04-01 10:50:00","67"],["2017-04-01 11:00:00","62"],["2017-04-01 11:10:00","67"],["2017-04-01 11:20:00","66"],
				        ["2017-04-01 11:30:00","65"],["2017-04-01 11:40:00","61"],["2017-04-01 11:50:00","60"],["2017-04-01 12:00:00","63"],["2017-04-01 12:10:00","63"],
				        ["2017-04-01 12:20:00","61"],["2017-04-01 12:30:00","62"],["2017-04-01 12:40:00","60"],["2017-04-01 12:50:00","60"],["2017-04-01 13:00:00","60"],
				        ["2017-04-01 13:10:00","60"],["2017-04-01 13:20:00","60"],["2017-04-01 13:30:00","60"],["2017-04-01 13:40:00","62"],["2017-04-01 13:50:00","60"],
				        ["2017-04-01 14:00:00","52"],["2017-04-01 14:10:00","60"],["2017-04-01 14:20:00","60"],["2017-04-01 14:30:00","60"],["2017-04-01 14:40:00","60"],
				        ["2017-04-01 14:50:00","69"],["2017-04-01 15:00:00","60"],["2017-04-01 15:10:00","61"],["2017-04-01 15:20:00","62"]
				    ];
			var data3=[
				        ["2017-04-01 05:30:00","25"],["2017-04-01 05:30:00","20"],["2017-04-01 05:30:00","18"],["2017-04-01 05:50:00","6"],["2017-04-01 05:50:00","7"],["2017-04-01 05:50:00","1"],["2017-04-01 05:50:00","61"],
				        ["2017-04-01 06:00:00","10"],["2017-04-01 06:00:00","31"],["2017-04-01 06:00:00","71"],["2017-04-01 06:00:00","85"],["2017-04-01 06:00:00","98"],["2017-04-01 06:00:00","93"],["2017-04-01 06:00:00","36"],
				        ["2017-04-01 06:40:00","47"],["2017-04-01 06:40:00","56"],["2017-04-01 06:40:00","68"],["2017-04-01 06:40:00","25"],["2017-04-01 06:40:00","26"],["2017-04-01 06:40:00","21"],["2017-04-01 06:40:00","59"],
				        ["2017-04-01 07:10:00","58"],["2017-04-01 07:10:00","59"],["2017-04-01 07:10:00","42"],["2017-04-01 07:10:00","32"],["2017-04-01 07:10:00","67"],["2017-04-01 07:10:00","48"],["2017-04-01 07:10:00","73"],["2017-04-01 07:40:00","54"],
				        ["2017-04-01 07:40:00","58"],["2017-04-01 07:40:00","49"],["2017-04-01 07:40:00","47"],["2017-04-01 07:40:00","45"],["2017-04-01 07:50:00","48"],["2017-04-01 07:50:00","62"],["2017-04-01 07:50:00","79"],["2017-04-01 07:50:00","88"],
				        ["2017-04-01 07:50:00","89"],["2017-04-01 07:50:00","47"],["2017-04-01 07:50:00","20"],["2017-04-01 08:10:00","24"],["2017-04-01 08:10:00","25"],["2017-04-01 08:10:00","47"],["2017-04-01 08:10:00","41"],["2017-04-01 08:10:00","45"],
				        ["2017-04-01 08:10:00","47"],["2017-04-01 08:10:00","50"],["2017-04-01 08:30:00","63"],["2017-04-01 08:30:00","72"],["2017-04-01 08:30:00","46"],["2017-04-01 08:30:00","73"],["2017-04-01 08:30:00","61"],["2017-04-01 08:30:00","63"],
				        ["2017-04-01 08:40:00","60"],["2017-04-01 08:40:00","15"],["2017-04-01 08:40:00","27"],["2017-04-01 08:40:00","12"],["2017-04-01 08:40:00","19"],["2017-04-01 08:40:00","15"],["2017-04-01 08:40:00","22"],["2017-04-01 08:40:00","37"],
				        ["2017-04-01 09:00:00","104"],["2017-04-01 09:00:00","39"],["2017-04-01 09:00:00","93"],["2017-04-01 09:00:00","118"],["2017-04-01 09:00:00","66"],["2017-04-01 09:00:00,92"],["2017-04-01 09:00:00","42"],["2017-04-01 09:00:00","41"],
				        ["2017-04-01 09:00:00","53"],["2017-04-01 09:00:00","42"],["2017-04-01 09:00:00","32"],["2017-04-01 09:00:00","79"],["2017-04-01 09:10:00","61"],["2017-04-01 09:10:00","59"],["2017-04-01 09:10:00","118"],["2017-04-01 09:10:00","38"],
				        ["2017-04-01 09:10:00","107"],["2017-04-01 09:10:00","80"],["2017-04-01 09:10:00","30"],["2017-04-01 09:10:00","46"],["2017-04-01 09:10:00","55"],["2017-04-01 09:10:00","50"],["2017-04-01 09:10:00","104"],["2017-04-01 09:10:00","81"],
				        ["2017-04-01 09:30:00","86"],["2017-04-01 09:30:00","67"],["2017-04-01 09:30:00","36"],["2017-04-01 09:30:00","102"],["2017-04-01 09:50:00","118"],["2017-04-01 09:50:00","92"],["2017-04-01 09:50:00","94"],["2017-04-01 09:50:00","84"],
				        ["2017-04-01 10:00:00","54"],["2017-04-01 10:00:00","106"],["2017-04-01 10:00:00","31"],["2017-04-01 10:00:00","51"],["2017-04-01 10:00:00","59"],["2017-04-01 10:00:00","27"],["2017-04-01 10:00:00","17"],["2017-04-01 10:00:00","43"],
				        ["2017-04-01 10:30:00","71"],["2017-04-01 10:30:00","102"],["2017-04-01 10:30:00","67"],["2017-04-01 10:30:00","96"],["2017-04-01 10:30:00","44"],["2017-04-01 10:30:00","38"],["2017-04-01 10:30:00","43"],["2017-04-01 10:30:00","30"],
				        ["2017-04-01 10:50:00","41"],["2017-04-01 10:50:00","48"],["2017-04-01 10:50:00","31"],["2017-04-01 10:50:00","46"],["2017-04-01 10:50:00","44"],["2017-04-01 10:50:00","23"],["2017-04-01 10:50:00","28"],["2017-04-01 10:50:00","51"],
				        ["2017-04-01 11:10:00","49"],["2017-04-01 11:10:00","37"],["2017-04-01 11:10:00","92"],["2017-04-01 11:10:00","57"],["2017-04-01 11:10:00","106"],["2017-04-01 11:10:00","49"],["2017-04-01 11:10:00","49"],["2017-04-01 11:10:00","59"],
				        ["2017-04-01 12:00:00","62"],["2017-04-01 12:00:00","46"],["2017-04-01 12:00:00","39"],["2017-04-01 12:00:00","37"],["2017-04-01 12:00:00","39"],["2017-04-01 12:00:00","30"],["2017-04-01 12:00:00","22"],["2017-04-01 12:00:00","29"],
				        ["2017-04-01 12:20:00","77"],["2017-04-01 12:20:00","12"],["2017-04-01 12:20:00","13"],["2017-04-01 12:20:00","19"],["2017-04-01 12:20:00","24"],["2017-04-01 12:20:00","45"],["2017-04-01 12:20:00","22"]
				    ];
		}else if($(this)[0].selectedIndex==1){
			$("#optimizeChart").remove();
			nr+='<div class="concertFrame_Tu" id="optimizeChart"></div>';
			$(".concertLeft").append(nr);
			dataTitle=['绿线','蓝线'];
			// yHeight=15;
			unit='pcu';
			colorBlue='blue';
			typeVal='time';
			data1=[
			    ["2017-04-01 05:30:00","500"],["2017-04-01 05:45:00","590"],["2017-04-01 06:00:00","470"],["2017-04-01 06:15:00","600"],["2017-04-01 06:30:00","500"],
			    ["2017-04-01 06:45:00","500"],["2017-04-01 07:00:00","590"],["2017-04-01 07:15:00","470"],["2017-04-01 07:30:00","600"],["2017-04-01 07:45:00","500"],
			    ["2017-04-01 08:00:00","500"],["2017-04-01 08:15:00","590"],["2017-04-01 08:30:00","470"],["2017-04-01 08:45:00","600"],["2017-04-01 09:00:00","500"],
			    ["2017-04-01 09:15:00","500"],["2017-04-01 09:15:00","600"],["2017-04-01 09:30:00","500"],["2017-04-01 09:45:00","600"],["2017-04-01 10:00:00","500"],
			    ["2017-04-01 10:15:00","500"],["2017-04-01 10:30:00","600"],["2017-04-01 10:45:00","500"],["2017-04-01 11:00:00","500"],["2017-04-01 11:15:00","700"],
			    ["2017-04-01 11:30:00","600"],["2017-04-01 11:45:00","600"],["2017-04-01 12:00:00","500"],["2017-04-01 12:45:00","500"],["2017-04-01 13:00:00","700"],
			    ["2017-04-01 13:30:00","600"],["2017-04-01 13:45:00","700"],["2017-04-01 14:00:00","550"],["2017-04-01 14:15:00","500"],["2017-04-01 14:30:00","600"],
			    ["2017-04-01 14:45:00","750"],["2017-04-01 15:00:00","700"],["2017-04-01 15:30:00","550"],["2017-04-01 15:45:00","500"],["2017-04-01 16:00:00","600"],
			    ["2017-04-01 16:15:00","750"],["2017-04-01 16:30:00","700"],["2017-04-01 16:45:00","550"],["2017-04-01 17:00:00","700"],["2017-04-01 17:15:00","600"],
			    ["2017-04-01 17:30:00","600"],["2017-04-01 17:45:00","500"],["2017-04-01 18:00:00","600"],["2017-04-01 18:15:00","700"],["2017-04-01 18:30:00","500"],
			    ["2017-04-01 18:45:00","600"],["2017-04-01 19:00:00","500"],["2017-04-01 19:15:00","600"],["2017-04-01 19:30:00","700"],["2017-04-01 19:45:00","500"]
		    ];
		    data2=[
			    ["2017-04-01 05:30:00","600"],["2017-04-01 05:45:00","600"],["2017-04-01 06:00:00","500"],["2017-04-01 06:15:00","550"],["2017-04-01 06:30:00","500"],
			    ["2017-04-01 06:45:00","600"],["2017-04-01 07:00:00","600"],["2017-04-01 07:15:00","500"],["2017-04-01 07:30:00","550"],["2017-04-01 07:45:00","500"],
			    ["2017-04-01 08:00:00","600"],["2017-04-01 08:15:00","600"],["2017-04-01 08:30:00","500"],["2017-04-01 08:45:00","550"],["2017-04-01 09:00:00","500"],
			    ["2017-04-01 09:15:00","600"],["2017-04-01 09:15:00","550"],["2017-04-01 09:30:00","550"],["2017-04-01 09:45:00","550"],["2017-04-01 10:00:00","500"],
			    ["2017-04-01 10:15:00","600"],["2017-04-01 10:30:00","550"],["2017-04-01 10:45:00","550"],["2017-04-01 11:00:00","600"],["2017-04-01 11:15:00","700"],
			    ["2017-04-01 11:30:00","750"],["2017-04-01 11:45:00","550"],["2017-04-01 12:00:00","550"],["2017-04-01 12:45:00","600"],["2017-04-01 13:00:00","700"],
			    ["2017-04-01 13:30:00","750"],["2017-04-01 13:45:00","600"],["2017-04-01 14:00:00","550"],["2017-04-01 14:15:00","600"],["2017-04-01 14:30:00","700"],
			    ["2017-04-01 14:45:00","750"],["2017-04-01 15:00:00","600"],["2017-04-01 15:30:00","550"],["2017-04-01 15:45:00","600"],["2017-04-01 16:00:00","600"],
			    ["2017-04-01 16:15:00","750"],["2017-04-01 16:30:00","600"],["2017-04-01 16:45:00","600"],["2017-04-01 17:00:00","700"],["2017-04-01 17:15:00","600"],
			    ["2017-04-01 17:30:00","600"],["2017-04-01 17:45:00","600"],["2017-04-01 18:00:00","600"],["2017-04-01 18:15:00","700"],["2017-04-01 18:30:00","600"],
			    ["2017-04-01 18:45:00","600"],["2017-04-01 19:00:00","500"],["2017-04-01 19:15:00","600"],["2017-04-01 19:30:00","700"],["2017-04-01 19:45:00","600"]
		    ];
		    data3=[];
		}else if($(this)[0].selectedIndex==2){
			$("#optimizeChart").remove();
			nr+='<div class="concertFrame_Tu" id="optimizeChart"></div>';
			$(".concertLeft").append(nr);
			dataTitle=['绿线','蓝线'];
			// yHeight=15;
			unit='%';
			colorBlue='blue';
			typeVal='time';
			data1=[
			    ["2017-04-01 05:30:00","0.1"],["2017-04-01 05:45:00","0.3"],["2017-04-01 06:00:00","0.4"],["2017-04-01 06:15:00","0.4"],["2017-04-01 06:30:00","0.3"],
			    ["2017-04-01 06:45:00","0.2"],["2017-04-01 07:00:00","0.3"],["2017-04-01 07:15:00","0.4"],["2017-04-01 07:30:00","0.4"],["2017-04-01 07:45:00","0.3"],
			    ["2017-04-01 08:00:00","0.4"],["2017-04-01 08:15:00","0.2"],["2017-04-01 08:30:00","0.5"],["2017-04-01 08:45:00","0.4"],["2017-04-01 09:00:00","0.8"],
			    ["2017-04-01 09:15:00","0.5"],["2017-04-01 09:15:00","0.3"],["2017-04-01 09:30:00","0.8"],["2017-04-01 09:45:00","0.7"],["2017-04-01 10:00:00","0.8"],
			    ["2017-04-01 10:15:00","0.6"],["2017-04-01 10:30:00","0.7"],["2017-04-01 10:45:00","0.7"],["2017-04-01 11:00:00","0.7"],["2017-04-01 11:15:00","0.8"],
			    ["2017-04-01 11:30:00","0.6"],["2017-04-01 11:45:00","0.6"],["2017-04-01 12:00:00","0.8"],["2017-04-01 12:45:00","0.8"],["2017-04-01 13:00:00","0.7"],
			    ["2017-04-01 13:30:00","0.6"],["2017-04-01 13:45:00","0.7"],["2017-04-01 14:00:00","0.6"],["2017-04-01 14:15:00","0.4"],["2017-04-01 14:30:00","0.4"],
			    ["2017-04-01 14:45:00","0.6"],["2017-04-01 15:00:00","0.7"],["2017-04-01 15:30:00","0.6"],["2017-04-01 15:45:00","0.4"],["2017-04-01 16:00:00","0.3"],
			    ["2017-04-01 16:15:00","0.5"],["2017-04-01 16:30:00","0.8"],["2017-04-01 16:45:00","0.8"],["2017-04-01 17:00:00","0.8"],["2017-04-01 17:15:00","0.4"],
			    ["2017-04-01 17:30:00","0.5"],["2017-04-01 17:45:00","0.8"],["2017-04-01 18:00:00","0.5"],["2017-04-01 18:15:00","0.7"],["2017-04-01 18:30:00","0.6"],
			    ["2017-04-01 18:45:00","0.5"],["2017-04-01 19:00:00","0.8"],["2017-04-01 19:15:00","0.7"],["2017-04-01 19:30:00","0.8"],["2017-04-01 19:45:00","0.6"]
		    ];
		    data2=[
			    ["2017-04-01 05:30:00","0.1"],["2017-04-01 05:45:00","0.2"],["2017-04-01 06:00:00","0.3"],["2017-04-01 06:15:00","0.3"],["2017-04-01 06:30:00","0.4"],
			    ["2017-04-01 06:45:00","0.1"],["2017-04-01 07:00:00","0.2"],["2017-04-01 07:15:00","0.3"],["2017-04-01 07:30:00","0.3"],["2017-04-01 07:45:00","0.4"],
			    ["2017-04-01 08:00:00","0.1"],["2017-04-01 08:15:00","0.3"],["2017-04-01 08:30:00","0.3"],["2017-04-01 08:45:00","0.3"],["2017-04-01 09:00:00","0.4"],
			    ["2017-04-01 09:15:00","0.1"],["2017-04-01 09:15:00","0.3"],["2017-04-01 09:30:00","0.7"],["2017-04-01 09:45:00","0.5"],["2017-04-01 10:00:00","0.5"],
			    ["2017-04-01 10:15:00","0.5"],["2017-04-01 10:30:00","0.5"],["2017-04-01 10:45:00","0.6"],["2017-04-01 11:00:00","0.5"],["2017-04-01 11:15:00","0.6"],
			    ["2017-04-01 11:30:00","0.5"],["2017-04-01 11:45:00","0.6"],["2017-04-01 12:00:00","0.6"],["2017-04-01 12:45:00","0.7"],["2017-04-01 13:00:00","0.8"],
			    ["2017-04-01 13:30:00","0.6"],["2017-04-01 13:45:00","0.7"],["2017-04-01 14:00:00","0.7"],["2017-04-01 14:15:00","0.5"],["2017-04-01 14:30:00","0.6"],
			    ["2017-04-01 14:45:00","0.5"],["2017-04-01 15:00:00","0.6"],["2017-04-01 15:30:00","0.7"],["2017-04-01 15:45:00","0.5"],["2017-04-01 16:00:00","0.6"],
			    ["2017-04-01 16:15:00","0.5"],["2017-04-01 16:30:00","0.8"],["2017-04-01 16:45:00","0.9"],["2017-04-01 17:00:00","0.8"],["2017-04-01 17:15:00","0.7"],
			    ["2017-04-01 17:30:00","0.7"],["2017-04-01 17:45:00","0.8"],["2017-04-01 18:00:00","0.7"],["2017-04-01 18:15:00","0.9"],["2017-04-01 18:30:00","0.7"],
			    ["2017-04-01 18:45:00","0.7"],["2017-04-01 19:00:00","0.8"],["2017-04-01 19:15:00","0.6"],["2017-04-01 19:30:00","0.8"],["2017-04-01 19:45:00","0.6"]
		    ];
		    data3=[];
		}else if($(this)[0].selectedIndex==3){
			$("#optimizeChart").remove();
			nr+='<div class="concertFrame_Tu" id="optimizeChart"></div>';
			$(".concertLeft").append(nr);
			dataTitle=['绿线','蓝线'];
			// yHeight=15;
			unit='%';
			colorBlue='blue';
			typeVal='time';
			data1=[
			    ["2017-04-01 05:30:00","0.1"],["2017-04-01 05:45:00","0.3"],["2017-04-01 06:00:00","0.4"],["2017-04-01 06:15:00","0.4"],["2017-04-01 06:30:00","0.3"],
			    ["2017-04-01 06:45:00","0.1"],["2017-04-01 07:00:00","0.3"],["2017-04-01 07:15:00","0.4"],["2017-04-01 07:30:00","0.4"],["2017-04-01 07:45:00","0.3"],
			    ["2017-04-01 08:00:00","0.1"],["2017-04-01 08:15:00","0.3"],["2017-04-01 08:30:00","0.8"],["2017-04-01 08:45:00","0.4"],["2017-04-01 09:00:00","0.8"],
			    ["2017-04-01 09:15:00","0.1"],["2017-04-01 09:15:00","0.3"],["2017-04-01 09:30:00","0.8"],["2017-04-01 09:45:00","0.8"],["2017-04-01 10:00:00","0.8"],
			    ["2017-04-01 10:15:00","0.6"],["2017-04-01 10:30:00","0.7"],["2017-04-01 10:45:00","0.8"],["2017-04-01 11:00:00","0.8"],["2017-04-01 11:15:00","0.8"],
			    ["2017-04-01 11:30:00","0.6"],["2017-04-01 11:45:00","0.7"],["2017-04-01 12:00:00","0.8"],["2017-04-01 12:45:00","0.8"],["2017-04-01 13:00:00","0.8"],
			    ["2017-04-01 13:30:00","0.6"],["2017-04-01 13:45:00","0.7"],["2017-04-01 14:00:00","0.6"],["2017-04-01 14:15:00","0.4"],["2017-04-01 14:30:00","0.4"],
			    ["2017-04-01 14:45:00","0.6"],["2017-04-01 15:00:00","0.7"],["2017-04-01 15:30:00","0.6"],["2017-04-01 15:45:00","0.4"],["2017-04-01 16:00:00","0.4"],
			    ["2017-04-01 16:15:00","0.5"],["2017-04-01 16:30:00","0.8"],["2017-04-01 16:45:00","0.8"],["2017-04-01 17:00:00","0.8"],["2017-04-01 17:15:00","0.4"],
			    ["2017-04-01 17:30:00","0.5"],["2017-04-01 17:45:00","0.8"],["2017-04-01 18:00:00","0.4"],["2017-04-01 18:15:00","0.8"],["2017-04-01 18:30:00","0.6"],
			    ["2017-04-01 18:45:00","0.5"],["2017-04-01 19:00:00","0.8"],["2017-04-01 19:15:00","0.6"],["2017-04-01 19:30:00","0.8"],["2017-04-01 19:45:00","0.6"]
		    ];
		    data2=[
			    ["2017-04-01 05:30:00","0.1"],["2017-04-01 05:45:00","0.2"],["2017-04-01 06:00:00","0.3"],["2017-04-01 06:15:00","0.3"],["2017-04-01 06:30:00","0.4"],
			    ["2017-04-01 06:45:00","0.1"],["2017-04-01 07:00:00","0.2"],["2017-04-01 07:15:00","0.3"],["2017-04-01 07:30:00","0.3"],["2017-04-01 07:45:00","0.4"],
			    ["2017-04-01 08:00:00","0.1"],["2017-04-01 08:15:00","0.2"],["2017-04-01 08:30:00","0.3"],["2017-04-01 08:45:00","0.3"],["2017-04-01 09:00:00","0.4"],
			    ["2017-04-01 09:15:00","0.1"],["2017-04-01 09:15:00","0.2"],["2017-04-01 09:30:00","0.7"],["2017-04-01 09:45:00","0.5"],["2017-04-01 10:00:00","0.6"],
			    ["2017-04-01 10:15:00","0.5"],["2017-04-01 10:30:00","0.6"],["2017-04-01 10:45:00","0.7"],["2017-04-01 11:00:00","0.5"],["2017-04-01 11:15:00","0.6"],
			    ["2017-04-01 11:30:00","0.5"],["2017-04-01 11:45:00","0.6"],["2017-04-01 12:00:00","0.7"],["2017-04-01 12:45:00","0.5"],["2017-04-01 13:00:00","0.6"],
			    ["2017-04-01 13:30:00","0.5"],["2017-04-01 13:45:00","0.6"],["2017-04-01 14:00:00","0.7"],["2017-04-01 14:15:00","0.5"],["2017-04-01 14:30:00","0.6"],
			    ["2017-04-01 14:45:00","0.5"],["2017-04-01 15:00:00","0.6"],["2017-04-01 15:30:00","0.7"],["2017-04-01 15:45:00","0.5"],["2017-04-01 16:00:00","0.6"],
			    ["2017-04-01 16:15:00","0.5"],["2017-04-01 16:30:00","0.8"],["2017-04-01 16:45:00","0.9"],["2017-04-01 17:00:00","0.8"],["2017-04-01 17:15:00","0.7"],
			    ["2017-04-01 17:30:00","0.7"],["2017-04-01 17:45:00","0.8"],["2017-04-01 18:00:00","0.7"],["2017-04-01 18:15:00","0.8"],["2017-04-01 18:30:00","0.8"],
			    ["2017-04-01 18:45:00","0.7"],["2017-04-01 19:00:00","0.8"],["2017-04-01 19:15:00","0.9"],["2017-04-01 19:30:00","0.8"],["2017-04-01 19:45:00","0.6"]
		    ];
		    data3=[];
		}else if($(this)[0].selectedIndex==4||$(this)[0].selectedIndex==5){
			$("#optimizeChart").remove();
			nr+='<div class="concertFrame_Tu" id="optimizeChart"></div>';
			$(".concertLeft").append(nr);
			// yHeight=150;
			unit='m';
			colorBlue='blue';
			typeVal='time';
			dataTitle=['绿线','蓝线'];
			data1=[
			    ["2017-04-01 05:30:00","30"],["2017-04-01 05:45:00","30"],["2017-04-01 06:00:00","70"],["2017-04-01 06:15:00","60"],["2017-04-01 06:30:00","50"],
			    ["2017-04-01 06:45:00","50"],["2017-04-01 07:00:00","80"],["2017-04-01 07:15:00","80"],["2017-04-01 07:30:00","120"],["2017-04-01 07:45:00","150"],
			    ["2017-04-01 08:00:00","120"],["2017-04-01 08:15:00","220"],["2017-04-01 08:30:00","270"],["2017-04-01 08:45:00","240"],["2017-04-01 09:00:00","280"],
			    ["2017-04-01 09:15:00","120"],["2017-04-01 09:15:00","220"],["2017-04-01 09:30:00","270"],["2017-04-01 09:45:00","240"],["2017-04-01 10:00:00","280"],
			    ["2017-04-01 10:15:00","120"],["2017-04-01 10:30:00","220"],["2017-04-01 10:45:00","270"],["2017-04-01 11:00:00","240"],["2017-04-01 11:15:00","280"],
			    ["2017-04-01 11:30:00","100"],["2017-04-01 11:45:00","100"],["2017-04-01 12:00:00","120"],["2017-04-01 12:45:00","80"],["2017-04-01 13:00:00","80"],
			    ["2017-04-01 13:30:00","120"],["2017-04-01 13:45:00","110"],["2017-04-01 14:00:00","80"],["2017-04-01 14:15:00","100"],["2017-04-01 14:30:00","180"],
			    ["2017-04-01 14:45:00","200"],["2017-04-01 15:00:00","180"],["2017-04-01 15:30:00","160"],["2017-04-01 15:45:00","120"],["2017-04-01 16:00:00","100"],
			    ["2017-04-01 16:15:00","80"],["2017-04-01 16:30:00","120"],["2017-04-01 16:45:00","200"],["2017-04-01 17:00:00","200"],["2017-04-01 17:15:00","220"],
			    ["2017-04-01 17:30:00","240"],["2017-04-01 17:45:00","240"],["2017-04-01 18:00:00","240"],["2017-04-01 18:15:00","280"],["2017-04-01 18:30:00","280"],
			    ["2017-04-01 18:45:00","220"],["2017-04-01 19:00:00","240"],["2017-04-01 19:15:00","280"],["2017-04-01 19:30:00","280"],["2017-04-01 19:45:00","200"]
		    ];
		    data2=[
			    ["2017-04-01 05:30:00","30"],["2017-04-01 05:45:00","30"],["2017-04-01 06:00:00","50"],["2017-04-01 06:15:00","60"],["2017-04-01 06:30:00","60"],
			    ["2017-04-01 06:45:00","30"],["2017-04-01 07:00:00","80"],["2017-04-01 07:15:00","70"],["2017-04-01 07:30:00","120"],["2017-04-01 07:45:00","150"],
			    ["2017-04-01 08:00:00","80"],["2017-04-01 08:15:00","220"],["2017-04-01 08:30:00","240"],["2017-04-01 08:45:00","220"],["2017-04-01 09:00:00","290"],
			    ["2017-04-01 09:15:00","200"],["2017-04-01 09:15:00","220"],["2017-04-01 09:30:00","270"],["2017-04-01 09:45:00","220"],["2017-04-01 10:00:00","290"],
			    ["2017-04-01 10:15:00","220"],["2017-04-01 10:30:00","240"],["2017-04-01 10:45:00","270"],["2017-04-01 11:00:00","260"],["2017-04-01 11:15:00","290"],
			    ["2017-04-01 11:30:00","180"],["2017-04-01 11:45:00","180"],["2017-04-01 12:00:00","100"],["2017-04-01 12:45:00","120"],["2017-04-01 13:00:00","90"],
			    ["2017-04-01 13:30:00","100"],["2017-04-01 13:45:00","110"],["2017-04-01 14:00:00","100"],["2017-04-01 14:15:00","100"],["2017-04-01 14:30:00","200"],
			    ["2017-04-01 14:45:00","160"],["2017-04-01 15:00:00","80"],["2017-04-01 15:30:00","160"],["2017-04-01 15:45:00","100"],["2017-04-01 16:00:00","120"],
			    ["2017-04-01 16:15:00","200"],["2017-04-01 16:30:00","120"],["2017-04-01 16:45:00","220"],["2017-04-01 17:00:00","200"],["2017-04-01 17:15:00","200"],
			    ["2017-04-01 17:30:00","240"],["2017-04-01 17:45:00","240"],["2017-04-01 18:00:00","220"],["2017-04-01 18:15:00","260"],["2017-04-01 18:30:00","270"],
			    ["2017-04-01 18:45:00","240"],["2017-04-01 19:00:00","260"],["2017-04-01 19:15:00","280"],["2017-04-01 19:30:00","280"],["2017-04-01 19:45:00","200"]
		    ];
		    data3=[];
		}else if($(this)[0].selectedIndex==6){  
			$("#optimizeChart").remove();
			nr+='<div class="concertFrame_Tu" id="optimizeChart"></div>';
			$(".concertLeft").append(nr);
			dataTitle=['','','车'];
			// yHeight=150;
			unit='s';
			typeVal='time';
			var data1=[];
			var data2=[];
			var data3=[
				        ["2017-04-01 05:30:00","25"],["2017-04-01 05:30:00","20"],["2017-04-01 05:30:00","18"],["2017-04-01 05:50:00","6"],["2017-04-01 05:50:00","7"],["2017-04-01 05:50:00","1"],["2017-04-01 05:50:00","61"],
				        ["2017-04-01 06:00:00","10"],["2017-04-01 06:00:00","31"],["2017-04-01 06:00:00","71"],["2017-04-01 06:00:00","85"],["2017-04-01 06:00:00","98"],["2017-04-01 06:00:00","93"],["2017-04-01 06:00:00","36"],
				        ["2017-04-01 06:40:00","47"],["2017-04-01 06:40:00","56"],["2017-04-01 06:40:00","68"],["2017-04-01 06:40:00","25"],["2017-04-01 06:40:00","26"],["2017-04-01 06:40:00","21"],["2017-04-01 06:40:00","59"],
				        ["2017-04-01 07:10:00","58"],["2017-04-01 07:10:00","59"],["2017-04-01 07:10:00","42"],["2017-04-01 07:10:00","32"],["2017-04-01 07:10:00","67"],["2017-04-01 07:10:00","48"],["2017-04-01 07:10:00","73"],["2017-04-01 07:40:00","54"],
				        ["2017-04-01 07:40:00","58"],["2017-04-01 07:40:00","49"],["2017-04-01 07:40:00","47"],["2017-04-01 07:40:00","45"],["2017-04-01 07:50:00","48"],["2017-04-01 07:50:00","62"],["2017-04-01 07:50:00","79"],["2017-04-01 07:50:00","88"],
				        ["2017-04-01 07:50:00","89"],["2017-04-01 07:50:00","47"],["2017-04-01 07:50:00","20"],["2017-04-01 08:10:00","24"],["2017-04-01 08:10:00","25"],["2017-04-01 08:10:00","47"],["2017-04-01 08:10:00","41"],["2017-04-01 08:10:00","45"],
				        ["2017-04-01 08:10:00","47"],["2017-04-01 08:10:00","50"],["2017-04-01 08:30:00","63"],["2017-04-01 08:30:00","72"],["2017-04-01 08:30:00","46"],["2017-04-01 08:30:00","73"],["2017-04-01 08:30:00","61"],["2017-04-01 08:30:00","63"],
				        ["2017-04-01 08:40:00","60"],["2017-04-01 08:40:00","15"],["2017-04-01 08:40:00","27"],["2017-04-01 08:40:00","12"],["2017-04-01 08:40:00","19"],["2017-04-01 08:40:00","15"],["2017-04-01 08:40:00","22"],["2017-04-01 08:40:00","37"],
				        ["2017-04-01 09:00:00","104"],["2017-04-01 09:00:00","39"],["2017-04-01 09:00:00","93"],["2017-04-01 09:00:00","118"],["2017-04-01 09:00:00","66"],["2017-04-01 09:00:00,92"],["2017-04-01 09:00:00","42"],["2017-04-01 09:00:00","41"],
				        ["2017-04-01 09:00:00","53"],["2017-04-01 09:00:00","42"],["2017-04-01 09:00:00","32"],["2017-04-01 09:00:00","79"],["2017-04-01 09:10:00","61"],["2017-04-01 09:10:00","59"],["2017-04-01 09:10:00","118"],["2017-04-01 09:10:00","38"],
				        ["2017-04-01 09:10:00","107"],["2017-04-01 09:10:00","80"],["2017-04-01 09:10:00","30"],["2017-04-01 09:10:00","46"],["2017-04-01 09:10:00","55"],["2017-04-01 09:10:00","50"],["2017-04-01 09:10:00","104"],["2017-04-01 09:10:00","81"],
				        ["2017-04-01 09:30:00","86"],["2017-04-01 09:30:00","67"],["2017-04-01 09:30:00","36"],["2017-04-01 09:30:00","102"],["2017-04-01 09:50:00","118"],["2017-04-01 09:50:00","92"],["2017-04-01 09:50:00","94"],["2017-04-01 09:50:00","84"],
				        ["2017-04-01 10:00:00","54"],["2017-04-01 10:00:00","106"],["2017-04-01 10:00:00","31"],["2017-04-01 10:00:00","51"],["2017-04-01 10:00:00","59"],["2017-04-01 10:00:00","27"],["2017-04-01 10:00:00","17"],["2017-04-01 10:00:00","43"],
				        ["2017-04-01 10:30:00","71"],["2017-04-01 10:30:00","102"],["2017-04-01 10:30:00","67"],["2017-04-01 10:30:00","96"],["2017-04-01 10:30:00","44"],["2017-04-01 10:30:00","38"],["2017-04-01 10:30:00","43"],["2017-04-01 10:30:00","30"],
				        ["2017-04-01 10:50:00","41"],["2017-04-01 10:50:00","48"],["2017-04-01 10:50:00","31"],["2017-04-01 10:50:00","46"],["2017-04-01 10:50:00","44"],["2017-04-01 10:50:00","23"],["2017-04-01 10:50:00","28"],["2017-04-01 10:50:00","51"],
				        ["2017-04-01 11:10:00","49"],["2017-04-01 11:10:00","37"],["2017-04-01 11:10:00","92"],["2017-04-01 11:10:00","57"],["2017-04-01 11:10:00","106"],["2017-04-01 11:10:00","49"],["2017-04-01 11:10:00","49"],["2017-04-01 11:10:00","59"],
				        ["2017-04-01 12:00:00","62"],["2017-04-01 12:00:00","46"],["2017-04-01 12:00:00","39"],["2017-04-01 12:00:00","37"],["2017-04-01 12:00:00","39"],["2017-04-01 12:00:00","30"],["2017-04-01 12:00:00","22"],["2017-04-01 12:00:00","29"],
				        ["2017-04-01 12:20:00","77"],["2017-04-01 12:20:00","12"],["2017-04-01 12:20:00","13"],["2017-04-01 12:20:00","19"],["2017-04-01 12:20:00","24"],["2017-04-01 12:20:00","45"],["2017-04-01 12:20:00","22"]
				    ];
		}else if($(this)[0].selectedIndex==7||$(this)[0].selectedIndex==8){
			$("#optimizeChart").remove();
			if($(this)[0].selectedIndex==7){
				setSingleSet();
				setTimeout(function(){
					flowValue();
				},100);
  				function flowValue(){
  					var html = '';
  					for(var i in mapPhases){
  						html += '<li>'+
				      '<span class="coorWords coorWords1">'+i+'相位:</span>'+
				      '<span class="coorWords coorWords2">'+mapPhases[i][i].attr.flow+'</span>'+
				      '<span class="coorWords coorWords3">pcu/h</span>'+
				    '</li>';
  					}
  					$(".concertRight_ul2").append(html);
  				}
			}else{
				nr+='<div class="concertFrame_Tu" id="optimizeChart"><img class="tu_img" src="images/x1.png"></div>';
			}
			$(".concertLeft").append(nr);
			$(".tu_img").css({"width":"100%","height":"100%"});
		}
		if($(this)[0].selectedIndex>=0&&$(this)[0].selectedIndex<=6){
			optimizeCharts(dataTitle,data1,data2,data3,typeVal,unit,colorBlue);
		}
		
	});
}

function signalAlone_CVS(data1,data2,data3){
	var divMap=$("#map");
	var str;
	var dataLength = data1.length>data2.length?data1.length:data2.length;
	var dataLength1 = dataLength>data3.length?dataLength:data3.length;
	if($("#targetSelect")[0].selectedIndex==0){
		str = "红灯,日期时间,亮起时间,绿灯,日期时间,亮起时间,车,到达时间,灯亮起时间\n";
		// var hong = 3,lv = 3;che = 3;
		for(var i=0;i<dataLength1;i++){
			// str+=(i+1)+","+data1[i][0]+","+data1[i][1]+","+(i+1)+","+data2[i][0]+","+data2[i][1]+","+(i+1)+","+data3[i][0]+","+data3[i][1]+"\n";
			if(i<data1.length){
				str+=(i+1)+","+data1[i][0]+","+data1[i][1]+",";
			}else{
				str+=''+","+''+","+''+",";
			}
			if(i<data2.length){
				str+=(i+1)+","+data2[i][0]+","+data2[i][1]+",";
			}else{
				str+=''+","+''+","+''+",";
			}
			if(i<data3.length){
				str+=(i+1)+","+data3[i][0]+","+data3[i][1]+"\n";
			}else{
				str+=''+","+''+","+''+",";
			}
		}
	}else if($("#targetSelect")[0].selectedIndex==1){
		str = "蓝线,日期时间,流量值,绿线,日期时间,流量值\n";
	}else if($("#targetSelect")[0].selectedIndex==2){
		str = "蓝线,日期时间,流量比,绿线,日期时间,流量比\n";
	}else if($("#targetSelect")[0].selectedIndex==3){
		str = "蓝线,日期时间,饱和度,绿线,日期时间,饱和度\n";
	}else if($("#targetSelect")[0].selectedIndex==4||$("#targetSelect")[0].selectedIndex==5){
		str = "蓝线,日期时间,排队长度,绿线,日期时间,排队长度\n";
	}else if($("#targetSelect")[0].selectedIndex==6){
		str = "车,日期时间,亮起时间\n";
	}
	if($("#targetSelect")[0].selectedIndex>=1&&$("#targetSelect")[0].selectedIndex<6){
		for(var i=0;i<dataLength1;i++){
			if(i<data1.length){
				str+=(i+1)+","+data1[i][0]+","+data1[i][1]+",";
			}else{
				str+=''+","+''+","+''+",";
			}
			if(i<data2.length){
				str+=(i+1)+","+data2[i][0]+","+data2[i][1]+"\n";
			}else{
				str+=''+","+''+","+''+",";
			}
		}
	}else if($("#targetSelect")[0].selectedIndex==6){
		for(var i=0;i<data3.length;i++){
				str+=(i+1)+","+data3[i][0]+","+data3[i][1]+"\n";
		}
	}
	// if(data1.length>0&&data2.length>0){
	
	// }
	str =  encodeURIComponent(str);
    $("#P_btn_frame1")[0].href = "data:text/csv;charset=utf-8,\ufeff"+str;
}

function optimizeCharts(dataTitle,data1,data2,data3,typeVal,unit,colorBlue){//,xHeight,xMin
signalAlone_CVS(data1,data2,data3);
var _optimize = echarts.init(document.getElementById('optimizeChart'));

//yAxisIndex:1,x数组 y数组 两个y轴
option = {
    backgroundColor:"#fff",
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    tooltip : {
        trigger: 'axis',
    },
    toolbox:{
    	feature:{
	    	saveAsImage:{
	    		pixelRatio:2
	    	}
	    }
    },
    color:["green",colorBlue,"#000"],
    legend: {
        data:dataTitle,
        x: 'left'
    },
    xAxis : 
        { 
            type: typeVal 
        },
    
    yAxis: 
        {
            name: unit,
            type: 'value',
            boundaryGap: [0, '100%']
        },
    series: [
        {
            name:dataTitle[0],
            type:'line',
            lineStyle: {
                normal: {
                    width: 1,
                    color:"green"
                }
            },
            symbolSize: 3,
            data:data1
        },
        {
            name:dataTitle[1],
            type:'line',
            lineStyle: {
                normal: {
                    width: 1,
                    color:colorBlue
                }
            },
            symbolSize: 3,
            data:data2
        },
        {
            name:dataTitle[2],
            type:'scatter',
            symbolSize:3,
            data:data3
        }
    ]
};
if($("#targetSelect")[0].selectedIndex==0){
	option.yAxis.min=0;
	option.yAxis.max=150;
}else if($("#targetSelect")[0].selectedIndex==2||$("#targetSelect")[0].selectedIndex==3){
	option.yAxis.min=0;
	option.yAxis.max=1;
}

_optimize.setOption(option);
}
function canvasChart(){
	var _myCanvas=document.getElementById("myCanvas");
	var ctx=_myCanvas.getContext("2d");
	ctx.scale(2.8,2.9);
	ctx.lineWidth = 1;
	ctx.strokeStyle ='white';
	//路段边界
	//左上
	ctx.moveTo(115,0);
	ctx.lineTo(115,40);
	ctx.arc(95, 40, 20, 0, Math.PI/2, 0);
	ctx.moveTo(95,60);
	ctx.lineTo(0,60);
	//左下
	ctx.moveTo(0,110);
	ctx.lineTo(95,110);
	ctx.arc(95, 130, 20,1.5*Math.PI, 0, false);
	ctx.moveTo(115,130);
	ctx.lineTo(115,160);
	//右上
	ctx.moveTo(180,0);
	ctx.lineTo(180,40);
	ctx.arc(200, 40, 20, 1*Math.PI, 0.5*Math.PI, 1);
	ctx.moveTo(200,60);
	ctx.lineTo(300,60);
	//右下
	ctx.moveTo(300,110);
	ctx.lineTo(200,110);
	ctx.arc(200, 130, 20, 1.5*Math.PI, 1*Math.PI, 1);
	ctx.moveTo(180,130);
	ctx.lineTo(180,160);
	ctx.stroke();
	ctx.beginPath();
	//信号相位框
	//左
	ctx.rect(70, 102, 10, 4);
	ctx.rect(70, 95, 10, 4);
	ctx.rect(70, 88, 10, 4);
	//右
	ctx.rect(210, 64, 10, 4);
	ctx.rect(210, 71, 10, 4);
	ctx.rect(210, 78, 10, 4);
	//上
	ctx.rect(119, 25, 4, 10);
	ctx.rect(126, 25, 4, 10);
	ctx.rect(133, 25, 4, 10);
	//下
	ctx.rect(172, 135, 4, 10);
	ctx.rect(165, 135, 4, 10);
	ctx.rect(158, 135, 4, 10);

	ctx.lineWidth = 2;
	ctx.strokeStyle ='red';
	ctx.stroke();
	ctx.beginPath();
	// 停止线
	ctx.fillStyle ='white';
	ctx.fillRect(84, 62, 8, 46);//左
	ctx.fillRect(198, 62, 8, 46);//右
	ctx.fillRect(117, 37, 62, 8);//上
	ctx.fillRect(117, 124, 62, 8);//下
	ctx.lineWidth = 2;
	ctx.strokeStyle ='white';
	ctx.stroke();
	//直行 yellow左 green右 lightBlue上 pink下
	ctx.beginPath();
	ctx.fillStyle ='yellow';
	ctx.fillRect(82, 93, 122, 8);
	ctx.fillStyle ='green';
	ctx.fillRect(86, 69, 122, 6);
	ctx.fillStyle ='lightBlue';
	ctx.fillRect(124, 37, 6, 94);
	ctx.fillStyle =' ';
	ctx.fillRect(163, 39, 3, 94);
	//左侧左转
	ctx.strokeStyle ='yellow';
	ctx.lineWidth = 4;
	ctx.arc(82, 14, 76, 0, Math.PI/2, 0);
	ctx.stroke();
	//左侧右转
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle ='yellow';
	ctx.arc(82, 154, 50, 1.5*Math.PI, 0, 0);
	ctx.stroke();
	ctx.beginPath();
	//右侧右转
	ctx.strokeStyle ='green';
	ctx.lineWidth = 2;
	ctx.arc(206, 25, 40, 1*Math.PI, 0.5*Math.PI, 1);
	ctx.stroke();
	//右侧左转
	ctx.beginPath();
	ctx.lineWidth = 4;
	ctx.strokeStyle ='green';
	ctx.arc(206, 150, 70, 1.5*Math.PI, 1*Math.PI, 1);
	ctx.stroke();
	//上右转
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.strokeStyle ='lightBlue';
	ctx.arc(80, 38, 40, 0, Math.PI/2, 0);
	ctx.stroke();
	//上左转
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle ='lightBlue';
	ctx.arc(202, 38, 66,1*Math.PI, 0.5*Math.PI, 1);
	ctx.stroke();
	//下右转
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle ='pink';
	ctx.arc(88, 134, 70,1.5*Math.PI, 0, 0);
	ctx.stroke();
	//下左转
	ctx.beginPath();
	ctx.lineWidth = 4;
	ctx.strokeStyle ='pink';
	ctx.arc(214, 134, 40,1.5*Math.PI, 1*Math.PI, 1);
	ctx.stroke();
	// ctx.font="10px Arial";
	// ctx.fillStyle = "#FFFFFF";
	// ctx.fillText("01",56,108);
}
function canvas2Chart(){
	var _myCanvas=document.getElementById("myCanvas");
	var ctx=_myCanvas.getContext("2d");
	ctx.scale(2.8,2.9);
	ctx.lineWidth = 1;
	ctx.strokeStyle ='white';
	//路段边界
	//左上
	ctx.moveTo(115,0);
	ctx.lineTo(115,40);
	ctx.arc(95, 40, 20, 0, Math.PI/2, 0);
	ctx.moveTo(95,60);
	ctx.lineTo(0,60);
	//左下
	ctx.moveTo(0,110);
	ctx.lineTo(95,110);
	ctx.arc(95, 130, 20,1.5*Math.PI, 0, false);
	ctx.moveTo(115,130);
	ctx.lineTo(115,160);
	//右上
	ctx.moveTo(180,0);
	ctx.lineTo(180,40);
	ctx.arc(200, 40, 20, 1*Math.PI, 0.5*Math.PI, 1);
	ctx.moveTo(200,60);
	ctx.lineTo(300,60);
	//右下
	ctx.moveTo(300,110);
	ctx.lineTo(200,110);
	ctx.arc(200, 130, 20, 1.5*Math.PI, 1*Math.PI, 1);
	ctx.moveTo(180,130);
	ctx.lineTo(180,160);
	ctx.stroke();
	ctx.beginPath();
	
	ctx.font="10px Arial";
	ctx.fillStyle = "#FFFFFF";
	//上
	ctx.fillText("01",115,30);
	ctx.fillText("02",127,30);
	ctx.fillText("03",140,30);
	//左
	ctx.fillText("15",70,108);
	ctx.fillText("05",70,99);
	ctx.fillText("06",70,90);
	//右
	ctx.fillText("14",207,69);
	ctx.fillText("04",207,79);
	ctx.fillText("03",207,88);
	//下
	ctx.fillText("15",142,144);
	ctx.fillText("05",155,144);
	ctx.fillText("06",169,144);

	ctx.lineWidth = 2;
	ctx.strokeStyle ='red';
	ctx.stroke();
	ctx.beginPath();
	// 停止线
	ctx.fillStyle ='white';
	ctx.fillRect(84, 62, 8, 46);//左
	ctx.fillRect(198, 62, 8, 46);//右
	ctx.fillRect(117, 37, 62, 8);//上
	ctx.fillRect(117, 124, 62, 8);//下
	ctx.lineWidth = 2;
	ctx.strokeStyle ='white';
	ctx.stroke();
	//直行 yellow左 green右 lightBlue上 pink下
	ctx.beginPath();
	ctx.fillStyle ='yellow';
	ctx.fillRect(82, 93, 122, 2);
	ctx.fillStyle ='green';
	ctx.fillRect(86, 69, 122, 2);
	ctx.fillStyle ='lightBlue';
	ctx.fillRect(124, 37, 2, 94);
	ctx.fillStyle =' ';
	ctx.fillRect(163, 39, 2, 94);
	//左侧左转
	ctx.strokeStyle ='yellow';
	ctx.lineWidth = 2;
	ctx.arc(82, 14, 76, 0, Math.PI/2, 0);
	ctx.stroke();
	//左侧右转
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle ='yellow';
	ctx.arc(82, 154, 50, 1.5*Math.PI, 0, 0);
	ctx.stroke();
	ctx.beginPath();
	//右侧右转
	ctx.strokeStyle ='green';
	ctx.lineWidth = 2;
	ctx.arc(206, 25, 40, 1*Math.PI, 0.5*Math.PI, 1);
	ctx.stroke();
	//右侧左转
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle ='green';
	ctx.arc(206, 150, 70, 1.5*Math.PI, 1*Math.PI, 1);
	ctx.stroke();
	//上右转
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle ='lightBlue';
	ctx.arc(80, 38, 40, 0, Math.PI/2, 0);
	ctx.stroke();
	//上左转
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle ='lightBlue';
	ctx.arc(202, 38, 66,1*Math.PI, 0.5*Math.PI, 1);
	ctx.stroke();
	//下右转
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle ='pink';
	ctx.arc(88, 134, 70,1.5*Math.PI, 0, 0);
	ctx.stroke();
	//下左转
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle ='pink';
	ctx.arc(214, 134, 40,1.5*Math.PI, 1*Math.PI, 1);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.rect(46, 86, 20, 20);
	ctx.rect(120, 0, 20, 20);
	ctx.rect(224, 64, 20, 20);
	// ctx.rect(210, 64, 10, 10);
	ctx.lineWidth = 2;
	ctx.strokeStyle ='red';
	ctx.font="10px Arial";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("4次",46,100);
	ctx.fillText("4次",120,13);
	ctx.fillText("4次",225,78);
	ctx.stroke(); 
	ctx.beginPath();
	
}
function deng(){
    $.ajax({
        url:"GetDevice",
        dataType:"json",
        data:{ "action":"query","type":60},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
            getdeng( data );
        },
        error:function(){}
    });
}
function getdeng(data){
	//var markerlayer=supermap.getLayersByName("markerlayer");
	var divMap=$("#map");
    if( data ){
    	if(markerlayer){
    		markerlayer.clearMarkers();
    	}  
        for( var item in data.entitys ){
           var dot = data.entitys[item][1].replace(" ",",");
           var lonlat = SuperMap.LonLat.fromString(dot);
           lonlat.transform("EPSG:4326","EPSG:900913");
           var size = new SuperMap.Size(20,22);
           var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
           
           //createControlMarker(lonlat, size, offset, id);
           	if(divMap.attr("roadFlag")=="单点"){
           		var id=data.entitys[item][0];
           		markerCreate(markerlayer,lonlat, size, offset, id,'./theme/images/5.0.png',3);
           	}else if(divMap.attr("roadFlag")=="协调"){
           		for(var SingnalArr=0;SingnalArr<AllSingnal.length;SingnalArr++){
           			var arr=AllSingnal[SingnalArr][3].split(",");
           			for(var kItem=0;kItem<arr.length;kItem+=2){
	           			var id=arr[kItem];
	           			if(data.entitys[item][0] == id){
	           				markerCreate(markerlayer,lonlat, size, offset, id,'./theme/images/5.0.png',3);
	           			}
	           		}
           		}
           	}
           
        }
    }
    markerlayer.setVisibility(true);
};
function signal_lightDIV(ma){
	var divMap=$("#map");
    gmarker= ma;
    markerID=gmarker.id; 
    var markerLonLat = new SuperMap.LonLat(gmarker.lonlat.lon,gmarker.lonlat.lat);
    var p= supermap.getPixelFromLonLat(gmarker.lonlat);
    var l=p.x+"px";
    var t=p.y+"px";
    $(".jt_node").css("visibility","hidden");
    if(divMap.attr("roadFlag")=="单点"){
    	$("#choice_list1").css({"visibility":"visible","left":l,"top":t});
    }else if(divMap.attr("roadFlag")=="协调"){
    	$("#choice_list").css({"visibility":"visible","left":l,"top":t});
    }
     
    gmarkerLonLat=markerLonLat.transform("EPSG:900913", "EPSG:4326" );    
}
function markerAttrAjax(gmarkerId){
	
}
function markerAttrClick(cur)
{
	markerAttrAjax(cur);
}
function markerRightClick(ma) 
{
	var divMap=$("#map");
	if(divMap.attr("roadFlag")=="单点"){
		gmarker= ma;
		singleSetAttr(gmarker.id);
		signal_lightDIV(gmarker);
    }else if(divMap.attr("roadFlag")=="协调"){
    	groupSingnal(ma);
    }
	
}

//筛选功能
function createfilterDialog(title,bFlagTime0,bFlagTime1,bFlagRealData)
{
	$(".zhao1").css("display","block");
	var html='<div id="jd_nodes" class="jd_nodes" style="overflow:hidden;height:116px">'+
	'<p class="tj_title">'+title+
	'<img src="images/min.png" class="empty_btn" style="cursor:pointer" onclick="zhao_none(\'.zhao1\',\'.jd_nodes\')" />'+
	'</P>'+
	'<ul class="node_ul">'+
		'<li>'+
			'<span>上限范围</span>'+
			'<input id="uplimit" type="text" name="" value="">'+
		'</li>'+
		'<li>'+
			'<span>下限范围</span>'+
			'<input id="downlimit" type="text" name="" value="">'+
		'</li>'+
	'</ul>'+
		'<p class="node_bt">'+
			'<input type="button" class="btn_frame_bt1" value="确定" onclick="initTimeline('+bFlagTime0+','+bFlagTime1+','+bFlagRealData+')"/>'+
			'<input type="button" class="btn_frame_bt2" value="取消" onclick="zhao_none(\'.zhao\',\'.jd_nodes\')"/>'+
		'</p>'+
	'</div>';
	$("body").append(html);		
}
$(window).resize(function(){  
    var High=document.body.clientHeight;
    document.getElementById('map').style.height=High+'px';
    if(parseInt($("#yb")[0].offsetLeft)>=parseInt($(".f_mid").width()-200)){//当窗口改变时，游标重置
        $('.f_mid').scrollLeft(600);
    }else{
        $('.f_mid').scrollLeft(0);
    };
    if($("#footer").width()<1300){
        $(".f_mid").css({"width":"900px"}).addClass('yincang');
        $("#myTimeline").addClass('Timeline');
    }
    if($("#footer").width()>1300){
        $(".f_mid").css({"width":"1152px"}).removeClass('yincang');
        $("#myTimeline").removeClass('Timeline');
    };
});

//区域协调
SingnalCoordnation();
function SingnalCoordnation(){
  $.ajax({
     url:"GetDevice",
         dataType:"json",
         data:{ "action":"query","type":64},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
             for(var i=0;i<data.entitys.length;i+=4){
             	var singnalArr = [];
             	singnalArr.push(data.entitys[i]);
             	singnalArr.push(data.entitys[i+1]);
             	singnalArr.push(data.entitys[i+2]);
             	singnalArr.push(data.entitys[i+3]);
				AllSingnal.push(singnalArr);
			}
         },
         error:function()
         {

         }
  })
}
function groupSingnal(marker){
	//获取协调组 id
	singnalGroup = [];
	for(var i=0;i<AllSingnal.length;i++){
		var group = AllSingnal[i][2].split(",");
		var singnal = AllSingnal[i][3].split(",");
		for(var x=0;x<singnal.length;x+=2){
			if(singnal[x] == marker.id && group[3] == 2){
				singnalGroup = singnal;
			}
			singleSetAttr(singnal[x],true);
		}
	}
	if(singnalGroup.length<1){
		reviseAlert("该信号机不属于协调组");
		return false;
	}
	
	singnal_pa = "";
	for(var n=0;n<singnalGroup.length;n+=2){
		if(n == singnalGroup.length-2)
			singnal_pa += singnalGroup[n];
		else
			singnal_pa += singnalGroup[n]+",";
			
		signalsArr.push(singnalGroup[n+1]);
	}
	lineView();
	function lineView(){
		if(!$.isEmptyObject(groupSingnalData)){
			zhao_none('.zhao','.areaView');
			lineViewSetup();
		}else{
			setTimeout(function(){
				lineView();
			},1000)
		}
	}
};
function groupSingnalAjax(pa){
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
//时空图
var paramData = [[1,60,1,0,"sy","sr","sg",5,20,35],[1,60,2,0,"sy","sr","sg",5,20,35],[2,80,1,500,"sy","sr","sg",5,20,55],[2,80,2,500,"sy","sr","sg",5,20,55],[3,90,1,1000,"sy","sr","sg",5,35,50],[3,90,2,1000,"sy","sr","sg",5,35,50]];
function lineViewSetup(){
	var optionHtml='';
	for(var itemI=0;itemI<singnalGroup.length;itemI+=2){
		optionHtml+='<option>'+singnalGroup[itemI]+'</option>';
	}
	param_old = [];
	param_new = [];

	//信号机参数ajax
	groupSingnalAjax(singnal_pa);

  $(".zhao").css("display","block");
  var content='';
  var _date = getNowFormatDate();
  content+='<div class="areaView" id="areaView">'+
        '<p class="areaViewTitle">'+
          '<span id="view">线协调控制性能评价</span>'+
          '<img src="images/min.png" class="empty_btn areaViewClose" onclick="zhao_none(\'.zhao\',\'.areaView\')">'+
        '</p>'+
        '<div class="insertUl">'+
		    '<ul class="concertMainTitle_ul">'+
		      	'<li class="mainUl_li1">'+
		          '<span>评价指标选择</span>'+
		          '<select id="targetSelect_area">'+
		            '<option>线协调时空图</option>'+
				    '<option>路径总流量</option>'+
				    '<option>平均总行程车速</option>'+
				    // '<option>非协调方向红灯启亮排队</option>'+
		          '</select>'+
		        '</li>'+
		        '<li class="mainUl_li4">'+
		          '<span>评价方向选择</span>'+
		          '<select id="targetSelect2" class="targetSelect_coor">'+
		            '<option>1</option>'+
		            '<option>2</option>'+
		            '<option>3</option>'+
		            '<option>4</option>'+
		            '<option>5</option>'+
		            '<option>6</option>'+
		            '<option>7</option>'+
		            '<option>8</option>'+
		          '</select>'+
		        '</li>'+
		        '<li class="mainUl_li4 titleLi1">'+//'+title1+'
		          '<span>日期选择</span>'+
		          '<input type="text" id="concertDay" value="2016-04-01 00:00:00" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/>'+
		        '</li>'+
		        '<li class="mainUl_li4">'+
		          '<span>评价周期</span>'+
		          '<select id="evaluateTime">'+
                    '<option>1h</option>'+
                    '<option>2h</option>'+
                    '<option>3h</option>'+
                    '<option>4h</option>'+
                    '<option>5h</option>'+
                    '<option>6h</option>'+
                    '<option>7h</option>'+
                    '<option>8h</option>'+
                    '<option>9h</option>'+
                    '<option>10h</option>'+
                    '<option>11h</option>'+
                    '<option>12h</option>'+
                    '<option>13h</option>'+
                    '<option>14h</option>'+
                    '<option>15h</option>'+
                    '<option>16h</option>'+
                    '<option>17h</option>'+
                    '<option>18h</option>'+
                    '<option>19h</option>'+
                    '<option>20h</option>'+
                    '<option>21h</option>'+
                    '<option>22h</option>'+
                    '<option>23h</option>'+
                    '<option>24h</option>'+
                  '</select>'+
		        '</li>'+
		        '<li class="mainUl_li3"><input type="button" class="concertMainTitle_ul_btn" value="确定"/></li>'+
		      '</ul>'+
		'</div>'+
        '<div class="viewContent">'+
          '<div class="showCharts" id="lineView"></div>'+
          '<div class="listCharts">'+
            '<div class="LinelistAll">'+
              // '<ul class="signalChoiceUl" id="signalChoiceUl" style="height:205px">'+
              //   '<p class="listCharts_title">信号路口选择</p>'+
              // '</ul>'+
             '<ul class="Linelist_signalChoiceUl" id="signalChoiceUl" style="height:205px">'+
		      	'<p class="RightTitle">线协调控制参数</p>'+
		        '<li>'+
		          '<span class="LinelistAll_span">协调组名</span>'+
		          '<input type="text" class="concertipt" id="coorName" value="协调组_1" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">协调类型</span>'+
		          '<input type="text" class="concertipt" id="coorType" value="双向协调" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">协调周期</span>'+
		          '<input type="text" class="concertipt" id="coorCycle" value="120s" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">设计速度</span>'+
		          '<input type="text" class="concertipt" id="designSpeed" value="45km/h" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">信号机ID</span>'+
		          '<select class="concertsel" id="semaphoreID">'+optionHtml+
		          '</select>'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span"  style="font-size:0.75em">协调相位</span>'+
		          '<input type="text" class="concertipt" id="coorPhase" value="2,4" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">绿<i style="margin-left:4.5px"></i>信<i style="margin-left:4.5px"></i>比</span>'+
		          '<input type="text" class="concertipt" id="greenRatio" value="0.5" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">相<i style="margin-left:4.5px"></i>位<i style="margin-left:4.5px"></i>差</span>'+
		          '<input type="text" class="concertipt" id="phaseDifference" value="5s" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">设备位置</span>'+
		          '<input type="text" class="concertipt" id="position" value="'+groupSingnalData[singnalGroup[0]][1]+'" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">主街名称</span>'+
		          '<input type="text" class="concertipt" id="firstStreet" value="'+groupSingnalData[singnalGroup[0]][2]+'" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">次街名称</span>'+
		          '<input type="text" class="concertipt" id="secondStreet" value="'+groupSingnalData[singnalGroup[0]][3]+'" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">产品型号</span>'+
		          '<input type="text" class="concertipt" id="version" value="'+groupSingnalData[singnalGroup[0]][5]+'" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">控制机型</span>'+
		          '<select class="concertsel" id="controlType">'+
		            '<option>0-单点自由控制机</option>'+
		            '<option>1-Epics优化控制机</option>'+
		            '<option>2-感应优化控制机</option>'+
		            '<option>3-中心协调控制机</option>'+
		          '</select>'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">主街相位</span>'+
		          '<input type="text" class="concertipt" id="mainStemPhase" value="'+groupSingnalData[singnalGroup[0]][9]+'" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">次街相位</span>'+
		          '<input type="text" class="concertipt" id="secondStreetPhase" value="'+groupSingnalData[singnalGroup[0]][10]+'" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">检测器类</span>'+
		          '<select class="concertsel" id="detectors">'+ 
		            '<option>0-无检测器</option>'+
		            '<option>1-视频检测</option>'+
		            '<option>2-雷达检测</option>'+
		            '<option>3-地磁检测</option>'+
		            '<option>4-线圈检测</option>'+
		            '<option>5-电子警察数据</option>'+
		          '</select>'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">控制模式</span>'+
		          '<select class="concertsel" id="controlModel">'+
		            '<option>0-单点定时</option>'+
		            '<option>1-感应控制</option>'+
		            '<option>2-干道协调</option>'+
		            '<option>3-区域协调</option>'+
		          '</select>'+
		        '</li>'+
		      '</ul>'+
              '<p class="oldTime_title">线协调效率分析</p>'+
              '<ul class="oldTimeUl">'+
              	'<li>'+
		          '<span class="LinelistAll_span">评价方向总流量</span>'+
		          // '<span class="LinelistAll_span1">pcu</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_2" id="allFolw" value="12345pcu" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">平均总行程车速</span>'+
		          // '<span class="LinelistAll_span1">km/h</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_2" id="allSpeed" value="40km/h" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">路径平均停车率</span>'+
		          // '<span class="LinelistAll_span1">%</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_2" id="Stop" value="0.8%" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">单位绿时通过量</span>'+
		          // '<span class="LinelistAll_span1">pcu/s/o</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_2" id="greenPass" value="0.6pcu/s/c" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">路径平均通过率</span>'+
		          // '<span class="LinelistAll_span1">%</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_2" id="roadPass" value="85.3%" />'+
		        '</li>'+
              '</ul>'+
              '<p class="btn_p_frame" style="text-align: center">'+
	              '<a id="P_btn_frame1" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
	              '<input type="button" value="导出图表" class="area_btn"/>'+
              '</p>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>';
      $('body').append(content);
  
	cc = Curve.init("lineView");

	$("body").delegate("#targetSelect_area","change",function(){
		var textUl='',oldTimeUl_text='',divNr='';
		if($(this)[0].selectedIndex==0){
			$(".concertMainTitle_ul,.oldTimeUl,.btn_p_frame").remove();
			$("#lineView").remove();
			divNr+='<div class="showCharts" id="lineView"></div>';
			$(".viewContent").append(divNr);
			groupSingnalAjax(singnal_pa); 
			cc = Curve.init("lineView");
			textUl+='<ul class="concertMainTitle_ul">'+
		      	'<li class="mainUl_li1">'+
		          '<span>评价指标选择</span>'+
		          '<select id="targetSelect_area">'+
		            '<option>线协调时空图</option>'+
				    '<option>路径总流量</option>'+
				    '<option>平均总行程车速</option>'+
				    // '<option>非协调方向红灯启亮排队</option>'+
		          '</select>'+
		        '</li>'+
		        '<li class="mainUl_li4">'+
		          '<span>评价方向选择</span>'+
		          '<select id="targetSelect2" class="targetSelect_coor">'+
		            '<option>1</option>'+
		            '<option>2</option>'+
		            '<option>3</option>'+
		            '<option>4</option>'+
		            '<option>5</option>'+
		            '<option>6</option>'+
		            '<option>7</option>'+
		            '<option>8</option>'+
		          '</select>'+
		        '</li>'+
		        '<li class="mainUl_li4 titleLi1">'+//'+title1+'
		          '<span>日期选择</span>'+
		          '<input type="text" id="concertDay" value="2016-04-01 00:00:00" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/>'+
		        '</li>'+
		        '<li class="mainUl_li4">'+
		          '<span>评价周期</span>'+
		          '<select id="evaluateTime">'+
                    '<option>1h</option>'+
                    '<option>2h</option>'+
                    '<option>3h</option>'+
                    '<option>4h</option>'+
                    '<option>5h</option>'+
                    '<option>6h</option>'+
                    '<option>7h</option>'+
                    '<option>8h</option>'+
                    '<option>9h</option>'+
                    '<option>10h</option>'+
                    '<option>11h</option>'+
                    '<option>12h</option>'+
                    '<option>13h</option>'+
                    '<option>14h</option>'+
                    '<option>15h</option>'+
                    '<option>16h</option>'+
                    '<option>17h</option>'+
                    '<option>18h</option>'+
                    '<option>19h</option>'+
                    '<option>20h</option>'+
                    '<option>21h</option>'+
                    '<option>22h</option>'+
                    '<option>23h</option>'+
                    '<option>24h</option>'+
                  '</select>'+
		        '</li>'+
		        '<li class="mainUl_li3"><input type="button" class="concertMainTitle_ul_btn" value="确定"/></li>'+
		      '</ul>';
		    $(".insertUl").append(textUl);
		    $(".oldTime_title").text('线协调效率分析');
		    oldTimeUl_text+='<ul class="oldTimeUl">'+
              	'<li>'+
		          '<span class="LinelistAll_span">评价方向总流量</span>'+
		          // '<span class="LinelistAll_span1">pcu</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_2" id="allFolw" value="12345pcu" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">平均总行程车速</span>'+
		          // '<span class="LinelistAll_span1">km/h</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_2" id="allSpeed" value="40km/h" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">路径平均停车率</span>'+
		          // '<span class="LinelistAll_span1">%</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_2" id="Stop" value="0.8%" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">单位绿时通过量</span>'+
		          // '<span class="LinelistAll_span1">pcu/s/o</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_2" id="greenPass" value="0.6pcu/s/c" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">路径平均通过率</span>'+
		          // '<span class="LinelistAll_span1">%</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_2" id="roadPass" value="85.2%" />'+
		        '</li>'+
              '</ul>'+
              '<p class="btn_p_frame" style="text-align: center">'+
              	// '<input type="button" value="导出数据" class="area_btn"/>'+
              	'<a id="P_btn_frame1" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
	            '<input type="button" value="导出图表" class="area_btn"/>'+
              '</p>';
		    $(".LinelistAll").append(oldTimeUl_text);
		    $("#targetSelect_area option").eq(0).attr("selected",true);
		}else if($(this)[0].selectedIndex==1){
			textUl='';oldTimeUl_text='';divNr='';
			$(".concertMainTitle_ul,.oldTimeUl,.btn_p_frame").remove();
			$("#lineView").remove();
			divNr+='<div class="showCharts" id="lineView"></div>'; 
			$(".viewContent").append(divNr);
			textUl+='<ul class="concertMainTitle_ul">'+
		      	'<li class="mainUl_li1">'+
		          '<span>评价指标选择</span>'+
		          '<select id="targetSelect_area">'+
		            '<option>线协调时空图</option>'+
				    '<option>路径总流量</option>'+
				    '<option>平均总行程车速</option>'+
				    // '<option>非协调方向红灯启亮排队</option>'+
		          '</select>'+
		        '</li>'+
		        '<li class="mainUl_li2">'+
		          '<span>评价方向选择</span>'+
		          '<select id="targetSelect2" class="targetSelect_coor2">'+
		            '<option>1相位</option>'+
		            '<option>2相位</option>'+
		            '<option>3相位</option>'+
		            '<option>4相位</option>'+
		            '<option>5相位</option>'+
		            '<option>6相位</option>'+
		            '<option>7相位</option>'+
		            '<option>8相位</option>'+
		          '</select>'+
		        '</li>'+
		        '<li class="mainUl_li4 titleLi1">'+//'+title1+'
		          '<span>历史日期选择(蓝线)</span>'+
		          '<input type="text" id="concertDay" value="2016-04-01 00:00:00" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/>'+
		        '</li>'+
		        '<li class="mainUl_li4 titleLi2">'+
		          '<span>近期日期选择(绿线)</span>'+
		          '<input type="text" id="concertDay" value="2016-04-02 00:00:00" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/>'+
		        '</li>'+
		        '<li class="mainUl_li3_1"><input type="button" class="concertMainTitle_ul_btn" value="确定"/></li>'+
		      '</ul>';
		    $(".insertUl").append(textUl);
		    $(".oldTime_title").text('路径流量变化统计');
		    oldTimeUl_text+='<ul class="oldTimeUl">'+
              	'<li>'+
		          '<span class="LinelistAll_span">日总流量(蓝线)</span>'+
		          // '<span class="LinelistAll_span1">pcu</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_1" id="allFolw" value="7200pcu" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">日总流量(绿线)</span>'+
		          // '<span class="LinelistAll_span1">pcu</span>'+
		          '<input type="text" class="oldTimeUl_ipt0 oldTimeUl_ipt oldTimeUl_ipt_1" id="allSpeed" value="7460pcu" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">日总流量变化率</span>'+
		          // '<span class="LinelistAll_span1">%</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_2" id="Stop" value="1.2%" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">早高峰流量变化</span>'+
		          // '<span class="LinelistAll_span1">%</span>'+
		          '<input type="text" class="oldTimeUl_ipt0 oldTimeUl_ipt oldTimeUl_ipt_2" id="greenPass" value="+3%" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">晚高峰流量变化</span>'+
		          // '<span class="LinelistAll_span1">%</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_2" id="roadPass" value="+2%" />'+
		        '</li>'+
              '</ul>'+
              '<p class="btn_p_frame">'+
              	// '<input type="button" value="导出数据" class="area_btn"/>'+
              	// '<input type="button" value="导出图表" class="area_btn"/>'+
              	'<a id="P_btn_frame1" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
              '</p>';
		    $(".LinelistAll").append(oldTimeUl_text);
		    $("#targetSelect_area option").eq(1).attr("selected",true);
		    getareaLineChartsData();
		}else if($(this)[0].selectedIndex==2){
			textUl='';oldTimeUl_text='';divNr='';
			$(".concertMainTitle_ul,.oldTimeUl,.btn_p_frame").remove();
			$("#lineView").remove();
			divNr+='<div class="showCharts" id="lineView"></div>'; 
			$(".viewContent").append(divNr);
			textUl+='<ul class="concertMainTitle_ul">'+
		      	'<li class="mainUl_li1">'+
		          '<span>评价指标选择</span>'+
		          '<select id="targetSelect_area">'+
		            '<option>线协调时空图</option>'+
				    '<option>路径总流量</option>'+
				    '<option>平均总行程车速</option>'+
				    // '<option>非协调方向红灯启亮排队</option>'+
		          '</select>'+
		        '</li>'+
		        '<li class="mainUl_li5">'+
		          '<span>评价方向选择</span>'+
		          '<select id="targetSelect2" class="targetSelect_coor1">'+
		            '<option>1相位</option>'+
		            '<option>2相位</option>'+
		            '<option>3相位</option>'+
		            '<option>4相位</option>'+
		            '<option>5相位</option>'+
		            '<option>6相位</option>'+
		            '<option>7相位</option>'+
		            '<option>8相位</option>'+
		          '</select>'+
		        '</li>'+
		        '<li class="mainUl_li8 titleLi1">'+//'+title1+'
		          '<span>历史日期选择(蓝线)</span>'+
		          '<input type="text" id="concertDay" value="2016-04-01 00:00:00" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/>'+
		        '</li>'+
		        '<li class="mainUl_li8 titleLi2">'+
		          '<span>近期日期选择(绿线)</span>'+
		          '<input type="text" id="concertDay" value="2016-04-02 00:00:00" onClick="jeDate({dateCell:\'#concertDay\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/>'+
		        '</li>'+
		        '<li class="mainUl_li6">'+
		          '<span>评价周期</span>'+
		          '<select id="evaluateTime">'+
		            '<option>1h</option>'+
		            '<option>2h</option>'+
		            '<option>3h</option>'+
		            '<option>4h</option>'+
		            '<option>5h</option>'+
		            '<option>6h</option>'+
		            '<option>7h</option>'+
		            '<option>8h</option>'+
		            '<option>9h</option>'+
		            '<option>10h</option>'+
		            '<option>11h</option>'+
		            '<option>12h</option>'+
		            '<option>13h</option>'+
		            '<option>14h</option>'+
		            '<option>15h</option>'+
		            '<option>16h</option>'+
		            '<option>17h</option>'+
		            '<option>18h</option>'+
		            '<option>19h</option>'+
		            '<option>20h</option>'+
		            '<option>21h</option>'+
		            '<option>22h</option>'+
		            '<option>23h</option>'+
		            '<option>24h</option>'+
		          '</select>'+
		        '</li>'+
		        '<li class="mainUl_li9"><input type="button" class="concertMainTitle_ul_btn" value="确定"/></li>'+
		      '</ul>';
		    $(".insertUl").append(textUl);
		    $(".oldTime_title").text('平均车速变化统计');
		    oldTimeUl_text+='<ul class="oldTimeUl">'+
              	'<li>'+
		          '<span class="LinelistAll_span">平均车速(蓝线)</span>'+
		          // '<span class="LinelistAll_span1">min</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_4" id="allFolw" value="3min" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">平均车速(绿线)</span>'+
		          '<input type="text" class="oldTimeUl_ipt0 oldTimeUl_ipt oldTimeUl_ipt_4" id="allSpeed" value="4min" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">平均车速变化率</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_1" id="Stop" value="5%" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">早高峰车速变化</span>'+
		          '<input type="text" class="oldTimeUl_ipt0 oldTimeUl_ipt oldTimeUl_ipt_1" id="greenPass" value="+3%" />'+
		        '</li>'+
		        '<li>'+
		          '<span class="LinelistAll_span">晚高峰车速变化</span>'+
		          '<input type="text" class="oldTimeUl_ipt oldTimeUl_ipt0 oldTimeUl_ipt_1" id="roadPass" value="-1.2%" />'+
		        '</li>'+
              '</ul>'+
              '<p class="btn_p_frame">'+
              	'<a id="P_btn_frame1" download="block_up.csv" href="javascript:void(0)">导出数据</a>'+
              '</p>';
		    $(".LinelistAll").append(oldTimeUl_text);
		    $("#targetSelect_area option").eq(2).attr("selected",true);
		    getareaLineChartsData();
		}
	})
	$("#controlType option").eq(groupSingnalData[singnalGroup[0]][6]).attr("selected", true);
    $("#detectors option").eq(groupSingnalData[singnalGroup[0]][11]).attr("selected", true);
    $("#controlModel option").eq(groupSingnalData[singnalGroup[0]][12]).attr("selected", true);
    $("body").delegate("#semaphoreID","change",function(){
    	var selecIndex =$(this)[0].selectedIndex*2;
    	$("#position").val(groupSingnalData[singnalGroup[selecIndex]][1]);
    	$("#firstStreet").val(groupSingnalData[singnalGroup[selecIndex]][2]);
    	$("#secondStreet").val(groupSingnalData[singnalGroup[selecIndex]][3]);
    	$("#version").val(groupSingnalData[singnalGroup[selecIndex]][5]);
    	$("#mainStemPhase").val(groupSingnalData[singnalGroup[selecIndex]][9]);
    	$("#secondStreetPhase").val(groupSingnalData[singnalGroup[selecIndex]][10]);
    	$("#controlType option").eq(groupSingnalData[singnalGroup[selecIndex]][6]).attr("selected", true);
    	$("#detectors option").eq(groupSingnalData[singnalGroup[selecIndex]][11]).attr("selected", true);
    	$("#controlModel option").eq(groupSingnalData[singnalGroup[selecIndex]][12]).attr("selected", true);
    })
}
function getareaLineChartsData(){
	var yHeight=150;
	var typeVal='time';
	var dataTitle=['蓝线','绿线'];
	// $("body").delegate("#targetSelect_area","change",function(){
		if($("#targetSelect_area")[0].selectedIndex==1){
			var unitName='pcu';
			data1=[
			    ["2017-04-01 05:30:00","500"],["2017-04-01 05:45:00","590"],["2017-04-01 06:00:00","470"],["2017-04-01 06:15:00","600"],["2017-04-01 06:30:00","500"],
			    ["2017-04-01 06:45:00","500"],["2017-04-01 07:00:00","590"],["2017-04-01 07:15:00","470"],["2017-04-01 07:30:00","600"],["2017-04-01 07:45:00","500"],
			    ["2017-04-01 08:00:00","500"],["2017-04-01 08:15:00","590"],["2017-04-01 08:30:00","470"],["2017-04-01 08:45:00","600"],["2017-04-01 09:00:00","500"],
			    ["2017-04-01 09:15:00","500"],["2017-04-01 09:15:00","600"],["2017-04-01 09:30:00","500"],["2017-04-01 09:45:00","600"],["2017-04-01 10:00:00","500"],
			    ["2017-04-01 10:15:00","500"],["2017-04-01 10:30:00","600"],["2017-04-01 10:45:00","500"],["2017-04-01 11:00:00","500"],["2017-04-01 11:15:00","700"],
			    ["2017-04-01 11:30:00","600"],["2017-04-01 11:45:00","600"],["2017-04-01 12:00:00","500"],["2017-04-01 12:45:00","500"],["2017-04-01 13:00:00","700"],
			    ["2017-04-01 13:30:00","600"],["2017-04-01 13:45:00","700"],["2017-04-01 14:00:00","550"],["2017-04-01 14:15:00","500"],["2017-04-01 14:30:00","600"],
			    ["2017-04-01 14:45:00","750"],["2017-04-01 15:00:00","700"],["2017-04-01 15:30:00","550"],["2017-04-01 15:45:00","500"],["2017-04-01 16:00:00","600"],
			    ["2017-04-01 16:15:00","750"],["2017-04-01 16:30:00","700"],["2017-04-01 16:45:00","550"],["2017-04-01 17:00:00","700"],["2017-04-01 17:15:00","600"],
			    ["2017-04-01 17:30:00","600"],["2017-04-01 17:45:00","500"],["2017-04-01 18:00:00","600"],["2017-04-01 18:15:00","700"],["2017-04-01 18:30:00","500"],
			    ["2017-04-01 18:45:00","600"],["2017-04-01 19:00:00","500"],["2017-04-01 19:15:00","600"],["2017-04-01 19:30:00","700"],["2017-04-01 19:45:00","500"]
		    ];
		    data2=[
			    ["2017-04-01 05:30:00","600"],["2017-04-01 05:45:00","600"],["2017-04-01 06:00:00","500"],["2017-04-01 06:15:00","550"],["2017-04-01 06:30:00","500"],
			    ["2017-04-01 06:45:00","600"],["2017-04-01 07:00:00","600"],["2017-04-01 07:15:00","500"],["2017-04-01 07:30:00","550"],["2017-04-01 07:45:00","500"],
			    ["2017-04-01 08:00:00","600"],["2017-04-01 08:15:00","600"],["2017-04-01 08:30:00","500"],["2017-04-01 08:45:00","550"],["2017-04-01 09:00:00","500"],
			    ["2017-04-01 09:15:00","600"],["2017-04-01 09:15:00","550"],["2017-04-01 09:30:00","550"],["2017-04-01 09:45:00","550"],["2017-04-01 10:00:00","500"],
			    ["2017-04-01 10:15:00","600"],["2017-04-01 10:30:00","550"],["2017-04-01 10:45:00","550"],["2017-04-01 11:00:00","600"],["2017-04-01 11:15:00","700"],
			    ["2017-04-01 11:30:00","750"],["2017-04-01 11:45:00","550"],["2017-04-01 12:00:00","550"],["2017-04-01 12:45:00","600"],["2017-04-01 13:00:00","700"],
			    ["2017-04-01 13:30:00","750"],["2017-04-01 13:45:00","600"],["2017-04-01 14:00:00","550"],["2017-04-01 14:15:00","600"],["2017-04-01 14:30:00","700"],
			    ["2017-04-01 14:45:00","750"],["2017-04-01 15:00:00","600"],["2017-04-01 15:30:00","550"],["2017-04-01 15:45:00","600"],["2017-04-01 16:00:00","600"],
			    ["2017-04-01 16:15:00","750"],["2017-04-01 16:30:00","600"],["2017-04-01 16:45:00","600"],["2017-04-01 17:00:00","700"],["2017-04-01 17:15:00","600"],
			    ["2017-04-01 17:30:00","600"],["2017-04-01 17:45:00","600"],["2017-04-01 18:00:00","600"],["2017-04-01 18:15:00","700"],["2017-04-01 18:30:00","600"],
			    ["2017-04-01 18:45:00","600"],["2017-04-01 19:00:00","500"],["2017-04-01 19:15:00","600"],["2017-04-01 19:30:00","700"],["2017-04-01 19:45:00","600"]
		    ];
		}else if($("#targetSelect_area")[0].selectedIndex==2){
			var unitName='km/h';
			var data1=[
			    ["2017-04-01 05:30:00","20"],["2017-04-01 05:40:00","22"],["2017-04-01 05:50:00","15"],["2017-04-01 06:00:00","18"],["2017-04-01 06:10:00","10"],
			    ["2017-04-01 06:20:00","20"],["2017-04-01 06:30:00","22"],["2017-04-01 06:40:00","20"],["2017-04-01 06:50:00","20"],["2017-04-01 07:00:00","20"],
			    ["2017-04-01 07:10:00","20"],["2017-04-01 07:20:00","20"],["2017-04-01 07:30:00","22"],["2017-04-01 07:40:00","16"],["2017-04-01 07:50:00","16"],
			    ["2017-04-01 08:10:00","16"],["2017-04-01 08:20:00","18"],["2017-04-01 08:30:00","20"],["2017-04-01 08:40:00","20"],["2017-04-01 08:50:00","20"],
			    ["2017-04-01 09:00:00","20"],["2017-04-01 09:10:00","20"],["2017-04-01 09:20:00","21"],["2017-04-01 09:30:00","24"],["2017-04-01 09:40:00","20"],
			    ["2017-04-01 09:50:00","20"],["2017-04-01 10:00:00","22"],["2017-04-01 10:10:00","22"],["2017-04-01 10:20:00","21"],["2017-04-01 10:30:00","21"],
			    ["2017-04-01 10:40:00","20"],["2017-04-01 10:50:00","20"],["2017-04-01 11:00:00","20"],["2017-04-01 11:10:00","20"],["2017-04-01 11:20:00","20"],
			    ["2017-04-01 11:30:00","20"],["2017-04-01 11:40:00","22"],["2017-04-01 11:50:00","21"],["2017-04-01 12:00:00","20"],["2017-04-01 12:10:00","20"],
			    ["2017-04-01 12:20:00","20"],["2017-04-01 12:30:00","20"],["2017-04-01 12:40:00","20"],["2017-04-01 12:50:00","20"],["2017-04-01 13:00:00","25"],
			    ["2017-04-01 13:10:00","22"],["2017-04-01 13:20:00","22"],["2017-04-01 13:30:00","22"],["2017-04-01 13:40:00","22"],["2017-04-01 13:50:00","21"],
			    ["2017-04-01 14:00:00","26"],["2017-04-01 14:10:00","20"],["2017-04-01 14:20:00","20"],["2017-04-01 14:30:00","20"],["2017-04-01 14:40:00","22"],
			    ["2017-04-01 14:50:00","20"],["2017-04-01 15:00:00","20"],["2017-04-01 15:10:00","20"],["2017-04-01 15:20:00","20"],["2017-04-01 15:30:00","24"],
			    ["2017-04-01 15:40:00","20"],["2017-04-01 15:50:00","20"],["2017-04-01 16:00:00","24"],["2017-04-01 16:10:00","20"],["2017-04-01 16:20:00","20"],
			    ["2017-04-01 16:30:00","20"],["2017-04-01 16:40:00","21"],["2017-04-01 16:50:00","20"],["2017-04-01 17:00:00","20"],["2017-04-01 17:10:00","20"]
		    ];
			var data2=[
			    ["2017-04-01 05:30:00","45"],["2017-04-01 05:40:00","43"],["2017-04-01 05:50:00","55"],["2017-04-01 06:00:00","60"],["2017-04-01 06:10:00","62"],
			    ["2017-04-01 06:20:00","60"],["2017-04-01 06:30:00","60"],["2017-04-01 06:40:00","60"],["2017-04-01 06:50:00","60"],["2017-04-01 07:00:00","60"],
			    ["2017-04-01 07:10:00","60"],["2017-04-01 07:20:00","55"],["2017-04-01 07:30:00","58"],["2017-04-01 07:40:00","58"],["2017-04-01 07:50:00","45"],
			    ["2017-04-01 08:10:00","60"],["2017-04-01 08:20:00","60"],["2017-04-01 08:30:00","60"],["2017-04-01 08:40:00","60"],["2017-04-01 08:50:00","62"],
			    ["2017-04-01 09:00:00","60"],["2017-04-01 09:10:00","60"],["2017-04-01 09:20:00","60"],["2017-04-01 09:30:00","60"],["2017-04-01 09:40:00","55"],
			    ["2017-04-01 09:50:00","34"],["2017-04-01 10:00:00","84"],["2017-04-01 10:10:00","68"],["2017-04-01 10:20:00","56"],["2017-04-01 10:30:00","82"],
			    ["2017-04-01 10:40:00","59"],["2017-04-01 10:50:00","67"],["2017-04-01 11:00:00","62"],["2017-04-01 11:10:00","67"],["2017-04-01 11:20:00","66"],
			    ["2017-04-01 11:30:00","65"],["2017-04-01 11:40:00","61"],["2017-04-01 11:50:00","60"],["2017-04-01 12:00:00","63"],["2017-04-01 12:10:00","63"],
			    ["2017-04-01 12:20:00","61"],["2017-04-01 12:30:00","62"],["2017-04-01 12:40:00","60"],["2017-04-01 12:50:00","60"],["2017-04-01 13:00:00","60"],
			    ["2017-04-01 13:10:00","60"],["2017-04-01 13:20:00","60"],["2017-04-01 13:30:00","60"],["2017-04-01 13:40:00","62"],["2017-04-01 13:50:00","60"],
			    ["2017-04-01 14:00:00","52"],["2017-04-01 14:10:00","60"],["2017-04-01 14:20:00","60"],["2017-04-01 14:30:00","60"],["2017-04-01 14:40:00","60"],
			    ["2017-04-01 14:50:00","69"],["2017-04-01 15:00:00","60"],["2017-04-01 15:10:00","61"],["2017-04-01 15:20:00","62"]
			];
		}
	areaLineCharts(dataTitle,data1,data2,yHeight,typeVal,unitName);
}
function areaAlone_CVS(data1,data2){
	var divMap=$("#map");
	var str;
	var dataLength = data1.length>data2.length?data1.length:data2.length;
	if($("#targetSelect_area")[0].selectedIndex==1){
		str = "蓝线,日期时间,流量,绿线,日期时间,流量\n";
	}else if($("#targetSelect_area")[0].selectedIndex==2){
		str = "蓝线,日期时间,速度,绿线,日期时间,速度\n";
	}
	if($("#targetSelect_area")[0].selectedIndex>=1&&$("#targetSelect_area")[0].selectedIndex<4){
		for(var i=0;i<dataLength;i++){
			if(i<data1.length){
				str+=(i+1)+","+data1[i][0]+","+data1[i][1]+",";
			}else{
				str+=''+","+''+","+''+",";
			}
			if(i<data2.length){
				str+=(i+1)+","+data2[i][0]+","+data2[i][1]+"\n";
			}else{
				str+=''+","+''+","+''+",";
			}
		}
	}
	str =  encodeURIComponent(str);
    $("#P_btn_frame1")[0].href = "data:text/csv;charset=utf-8,\ufeff"+str;
}
function areaLineCharts(dataTitle,data1,data2,yHeight,typeVal,unitName){//,xHeight,xMin
areaAlone_CVS(data1,data2);
var areaLine = echarts.init(document.getElementById('lineView'));
//yAxisIndex:1,x数组 y数组 两个y轴
option = {
    backgroundColor:"#fff",
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    tooltip : {
        trigger: 'axis',
    },
    toolbox:{
    	feature:{
	    	saveAsImage:{
	    		pixelRatio:2
	    	}
	    }
    },
    color:["blue","green","#000"],
    legend: {
        data:dataTitle,
        x: 'left'
    },
    xAxis : 
        { 
            type: typeVal
        },
    
    yAxis: 
        {
            name: unitName,
            type: 'value',
            boundaryGap: [0, '100%']
        },
    series: [
        {
            name:dataTitle[0],
            type:'line',
            lineStyle: {
                normal: {
                    width: 1,
                    color:"blue"
                }
            },
            symbolSize:3,
            data:data1
        },
        {
            name:dataTitle[1],
            type:'line',
            lineStyle: {
                normal: {
                    width: 1,
                    color:"green"
                }
            },
            symbolSize:3,
            data:data2
        }
    ]
};

areaLine.setOption(option);
}
function intersection(){
	var objSignal={};
for(var x = 0; x < param_old.length; x++) {
	if(objSignal[param_old[x][0]]==undefined){
		var obj_id = new Object();
		obj_id["id"]=param_old[x][0];
		obj_id[param_old[x][2]] = {};
		obj_id[param_old[x][2]][param_old[x][2]]=param_old[x];
		obj_id[param_old[x][2]]["id"]=param_old[x][2];
		objSignal[param_old[x][0]]=obj_id;
	}else{
		if(objSignal[param_old[x][0]][param_old[x][2]]==undefined){
			var obj_xw = new Object();
			obj_xw[param_old[x][2]]=param_old[x];
			obj_xw["id"]=param_old[x][2];
			objSignal[param_old[x][0]][param_old[x][2]]=obj_xw;
		}
	}
}
	var _html = '',checked = '',index = 0;
   	for(var i in objSignal){
   		for(var x in objSignal[i]){
   			if(x=="id"){
   				break  ;
   			}
   	checked += '<label style="font-size:0.75em" for="xw_'+objSignal[i].id+'_'+objSignal[i][x].id+'" ><input class="intersectionRadio" type="checkbox" name="xw_'+objSignal[i].id+'_'+objSignal[i][x].id+'" id="xw_'+objSignal[i].id+'_'+objSignal[i][x].id+'" />'+objSignal[i][x].id+'</label>';
   		}
   		_html+='<li><label style="clear:both;font-size:0.75em" for="signal_'+objSignal[i].id+'" ><input class="intersectionRadio" type="radio" name="signalCheck1" id="signal_'+objSignal[i].id+'" /><p class="roadName">'+'Epic-'+objSignal[i].id+'</p><p class="roadName">'+signalsArr[index]+'</p><p class="sonCheck">'+checked+'</p></label></li>';
   		// console.log(_html);
   		checked ='';
   		index++;
   	}
   	// $("#signalChoiceUl").append(_html);
	$(".signalChoiceUl input").click(function(){
		$(this).prop("checked",false);
		$(".sonCheck input").prop("checked",false);
	})  
	$(".sonCheck input").click(function(){
		$(".signalChoiceUl input").prop("checked",false);
		$(this).prop("checked",true);
		$(this).parent().parent().siblings("input").prop("checked",true);
	}) 
	
//干道协调动态监控路口信号选择
$('body').delegate('.sonCheck input','click',function(){
	var phase_id = $(this).attr("id").split("_")[2];
	var signal_id = $(this).parents("label").attr("for").split("_")[1];
	var dataAll = objSignal[signal_id][phase_id][phase_id];
	for(var i=0;i<dataAll.length;i++){
		if(dataAll[i]=="sy"){
			
		}
	}
	$("#phase").val(dataAll[1]);
	$("#light").val();
	$("#split").val(dataAll[3]);
	$("#difference").val(0);
	
});
}

var testMin=0;
function lineViewAjax(date){
	var time;
	if(date){
		time = getNowFormatDate()+" 00:00:00";
	}
	time = $("#concertDay").val();
	
	var pa =singnal_pa+","+time;
	
	 $.ajax({
        url:"GetSignalData",
        dataType:"text",
        data:{ "action":"query","type":"20","pa":pa},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
			canvas(param_new,data,0,0,0,0,0,0);
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
function canvas(param,data,id,dir,a,b,c,d){
	for( var i=0;i<param.length;i++ ){
		if( param[i][0] == id && param[i][2] == dir ){
			param[i][1]=a;param[i][7]=b;param[i][8]=c;param[i][9]=d;
		}
	}
	
	var paramHeader=4;
	var nI=(param[0].length-paramHeader)/2;
	
	var nPhase=0;
	var arrState=[],arrLine=[];
	var arr_1 = data.split(";");
	for(var i=0;i<arr_1.length;i++){
		var arr_2=arr_1[i].split(",");
		
		arrLine=[];
		for(var j=0;j<arr_2.length;j++)
			arrLine.push(parseInt(arr_2[j]));
			
			if( arrLine[0] == id && arrLine[1] == dir ){
				if(param[i][arrLine[3]+paramHeader+nI]<arrLine[4])
					arrLine[4]=param[i][arrLine[3]+paramHeader+nI];
			}
		param[i][2]=i%2+1;		
		arrLine[1]=i%2+1;
		arrState.push(arrLine);
	}

	var option = {
			xAxis: 240,
			paramData:paramData,//param
			statusData:arrState
	};
	cc.setOption(option);
	cc.redraw();
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