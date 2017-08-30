var gmarkerLonLat,markerID;var cc = null;
var Annunciator_regionID,Annunciator_groupID,Annunciator_type;
var markerZoomMap = {};
var beforeZone = [];
var param_old = [];
var param_new = [];
var intersectionSignal_id = [];
var signalDataMap = {};//协调组下信号机属性
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

//图标和侧边栏关联变色
function listClick(marker) {
	$(".area_all p").css("color", "#000");
	$(marker).parent("li").find("p").css("color", "red");
	var ID = $(marker).parent("li").attr("id").split("_");
	var signals_id_arr = alldata[ID[2]].coordination[ID[3]].groupid[ID[4]].signals;//获取协调分组——所有信号机 object id 


	markerClick(signals_id_arr,2);
	
}

 //标记点弹窗的弹窗的隐藏（btn）        
function zhao_none(a,b){
  $(a).css("display","none");
  $(b).remove();
}

 //信号控制
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
    if( data ){
    	if(markerlayer){
    		markerlayer.clearMarkers();
    	}  
        for( var item in data.entitys ){
           var dot = data.entitys[item][1].replace(" ",",");
           var lonlat = SuperMap.LonLat.fromString(dot.replace(" ",","));
           lonlat.transform("EPSG:4326","EPSG:900913");
           var size = new SuperMap.Size(20,22);
           var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
           var id=data.entitys[item][0];
           //createControlMarker(lonlat, size, offset, id);
           if(maxSignal < data.entitys[item][0]){
                maxSignal=parseInt(data.entitys[item][0]);
            }
           markerCreate(markerlayer,lonlat, size, offset, id,'./theme/images/5.0.png',3);
        }
        maxSignal++;
    }
};
function signal_lightDIV(ma){
    gmarker= ma;
    markerID=gmarker.id;
    var markerLonLat = new SuperMap.LonLat(gmarker.lonlat.lon,gmarker.lonlat.lat);
    var p= supermap.getPixelFromLonLat(gmarker.lonlat);
    var l=p.x+"px";
    var t=p.y+"px";
    $(".jt_node").css("visibility","hidden");
    $("#choice_list").css({"visibility":"visible","left":l,"top":t}); 
    gmarkerLonLat=markerLonLat.transform("EPSG:900913", "EPSG:4326" );    
}

function markerAttrAjax(gmarkerId){
	var val="{ID:"+gmarkerId+"}";
	$.ajax({
         url:"GetDevice",
         dataType:"json",
         data:{"action":"query","type":61,"val":val},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data){
            //doWork( data );
            var da=['设备编号','设备位置','主街名称','生产厂家','产品型号'];
            $("#rNumber").html(da[0]);
            $("#rName").html(da[1]);
            $("#r3").html(da[2]);
            $("#r4").html(da[3]);
            $("#r5").html(da[4]);
            $("#iNumber").html(data.entitys[0]);
            $("#iName").html(data.entitys[1]);
            $("#iAbility").html(data.entitys[2]);
            $("#iSpeed").html(data.entitys[4]);
            $("#iDescribe").html(data.entitys[5]);
            // console.log(data.entitys);
         },
         error:function(){}
    })
}
        
var maxRegionID=1;
var region_ID;
var mapRegionControlGroupID={};// 区域-协调控制-分组id的最大值
var mapRegionGroupAnnunciatorID={};// 区域-协调控制-分组-信号机   id的最大值

function newAnnunciator(regionID, groupID, type, AnnunciatorName,toggle,signal_id){
	
	if(type==2){
		if(mapRegionGroupAnnunciatorID[regionID+"_"+2+"_"+groupID]!=undefined){
			mapRegionGroupAnnunciatorID[regionID+"_"+2+"_"+groupID]++;
		}
		else
			mapRegionGroupAnnunciatorID[regionID+"_"+2+"_"+groupID]=1;
			
		inserAnnunciatorControl($("#group_line_child_"+regionID+'_'+groupID),regionID,groupID,mapRegionGroupAnnunciatorID[regionID+"_"+2+"_"+groupID],AnnunciatorName,type,toggle,signal_id);
	}
	else if(type==3){		
		if(mapRegionGroupAnnunciatorID[regionID+"_"+3+"_"+groupID]!=undefined){
			mapRegionGroupAnnunciatorID[regionID+"_"+3+"_"+groupID]++;
		}
		else
			mapRegionGroupAnnunciatorID[regionID+"_"+3+"_"+groupID]=1;
		inserAnnunciatorControl($("#group_area_child_"+regionID+'_'+groupID),regionID,groupID,mapRegionGroupAnnunciatorID[regionID+"_"+3+"_"+groupID],AnnunciatorName,type,toggle,signal_id);
	}
}

function newRegion(){
	insertRegionControl(maxRegionID+1,$("#areaName").val());
	maxRegionID++;
}
function newGroup(regionID,type,groupName,subName){

    if(type==2){
		if(mapRegionControlGroupID[regionID+"_"+2]!=undefined){
			mapRegionControlGroupID[regionID+"_"+2]++;
		}
		else
			mapRegionControlGroupID[regionID+"_"+2]=1;
			
		inserGroupControl($("#control_line_"+regionID),regionID,mapRegionControlGroupID[regionID+"_"+2],groupName,subName,type);
	}
	else if(type==3){		
		if(mapRegionControlGroupID[regionID+"_"+3]!=undefined){
			mapRegionControlGroupID[regionID+"_"+3]++;
		}
		else
			mapRegionControlGroupID[regionID+"_"+3]=1;
		insertAreaControl($("#control_area_"+regionID),regionID,mapRegionControlGroupID[regionID+"_"+3],groupName,subName,type);
	}
}
// 区域控制信息
var alldata = {};
var itemData = [];
SingnalCoordnation();
//区域控制列表  ajax
function SingnalCoordnation(){
  $.ajax({
     url:"GetDevice",
         dataType:"json",
         data:{ "action":"query","type":64},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               createRegion( data.entitys );
         },
         error:function()
         {

         }
  })
}

function createRegion(arrData) {
	var id = "0";
	var group_id = "0";
	var arrGroup;
	var arrItem;
	for(var i = 0; i < arrData.length; i += 4) {
		if(id != arrData[i]) {
			insertRegionControl(arrData[i], "控制区域-" + arrData[i + 1]);
			id = arrData[i];
			if(alldata[id] == undefined) {
				alldata[id] = {};
			}
			var region = new Object();
			region.id = id;
			region.name = arrData[i + 1];
			region.coordination = {};
			alldata[id] = region;

		}
		var name = arrData[i + 1];

		if(parseInt(id) > maxRegionID) // 获取regionid最大值
			maxRegionID = parseInt(id);

		arrGroup = arrData[i + 2].split(",");

		if(arrGroup[3] == 2) {
			if(alldata[id].coordination[arrGroup[3]] == undefined) {
				var obCoordination = new Object();
				obCoordination.id = arrGroup[3];
				obCoordination.groupid = {};
				alldata[id].coordination[arrGroup[3]] = obCoordination;
			}

			inserGroupControl($("#control_line_" + id), id, arrGroup[0], "协调组-" + arrGroup[1], arrGroup[2],arrGroup[3]);

			group_id = arrGroup[0];
			arrItem = arrData[i + 3].split(",");

			if(mapRegionControlGroupID[id + "_" + 2] == undefined) // 初始化
				mapRegionControlGroupID[id + "_" + 2] = parseInt(group_id);
			else if(parseInt(group_id) > mapRegionControlGroupID[id + "_" + 2]) // 获取groupid最大值
				mapRegionControlGroupID[id + "_" + 2] = parseInt(group_id);

			for(var j = 0; j < arrItem.length; j += 2) {
				inserAnnunciatorControl($("#group_line_child_" + id + "_" + group_id), id, group_id, arrItem[j], arrItem[j + 1],arrGroup[3]);

				if(mapRegionGroupAnnunciatorID[id + "_" + 2 + "_" + group_id] == undefined) {
					mapRegionGroupAnnunciatorID[id + "_" + 2 + "_" + group_id] = (arrItem[j]);
				} else if(mapRegionGroupAnnunciatorID[id + "_" + 2 + "_" + group_id] < parseInt(arrItem[j])) {
					mapRegionGroupAnnunciatorID[id + "_" + 2 + "_" + group_id] = parseInt(arrItem[j]);
				}
			}
		} else if(arrGroup[3] == 3) {
			if(alldata[id].coordination[arrGroup[3]] == undefined) {
				var obCoordination = new Object();
				obCoordination.id = arrGroup[3];
				obCoordination.groupid = {};
				alldata[id].coordination[arrGroup[3]] = obCoordination;
			}

			insertAreaControl($("#control_area_" + id), id, arrGroup[0], "区域协调-" + arrGroup[1], arrGroup[2],arrGroup[3]);
			
			group_id = arrGroup[0];

			arrItem = arrData[i + 3].split(",");

			if(mapRegionControlGroupID[id + "_" + 3] == undefined) // 初始化
				mapRegionControlGroupID[id + "_" + 3] = parseInt(group_id);
			else if(parseInt(group_id) > mapRegionControlGroupID[id + "_" + 3]) // 获取groupid最大值
				mapRegionControlGroupID[id + "_" + 3] = parseInt(group_id);

			for(var j = 0; j < arrItem.length; j += 2) {
				inserAnnunciatorControl($("#group_area_child_" + id + "_" + group_id), id, group_id, arrItem[j], arrItem[j + 1],arrGroup[3]);
				
				if(mapRegionGroupAnnunciatorID[id + "_" + 3 + "_" + group_id] == undefined) {
					mapRegionGroupAnnunciatorID[id + "_" + 3 + "_" + group_id] = parseInt(arrItem[j]);
				} else if(mapRegionGroupAnnunciatorID[id + "_" + 3 + "_" + group_id] < parseInt(arrItem[j])) {
					mapRegionGroupAnnunciatorID[id + "_" + 3 + "_" + group_id] = parseInt(arrItem[j]);
				}
			}
		}else if(arrGroup[3] == undefined){
			if(alldata[id].coordination[2] == undefined){
				alldata[id].coordination[2] = {};
				alldata[id].coordination[2].id = 2;
				alldata[id].coordination[2].groupid = {};
			}else if(alldata[id].coordination[3] == undefined){
				alldata[id].coordination[3] = {};
				alldata[id].coordination[3].id = 3;
				alldata[id].coordination[3].groupid = {};
			}else if(alldata[id].coordination[1] == undefined){
				alldata[id].coordination[1] = {};
				alldata[id].coordination[1].id = 1;
				alldata[id].coordination[1].groupid = {};
			}
			
		}
	}
	//console.log(alldata);//console.log(alldata[1].coordination[2].groupid[1])
}
//控制管理删除
function GroupNameRemove(ele){
       var groupID = $(ele).parents("li").attr("id");
      var _id = groupID.split("_");
      $.ajax({
     	url:"GetDevice",
         	dataType:"json",
         	data:{ "action":"delete","type":62,"val":"id,"+alldata[_id[2]].id+",type,"+alldata[_id[2]].coordination[_id[3]].id+",groupid,"+alldata[_id[2]].coordination[_id[3]].groupid[_id[4]].id},
         	contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         	beforeSend:function(){  },
         	success: function( data, textStatus, jqXHR ){
               reviseAlert('删除成功');
         	},
         	error:function()
         	{

        	 }
  	})
      
      delete alldata[_id[2]].coordination[_id[3]].groupid[_id[4]];	
      $(ele).parent().parent().parent().parent().remove();//.parent()
}
//控制管理marker删除
function markerRightRemove(){
	var arr = [];
	if(Annunciator_regionID||Annunciator_type||Annunciator_groupID||markerID){
		$("#line_signale_"+Annunciator_regionID+"_"+Annunciator_groupID+"_"+markerID).remove();
		delete alldata[Annunciator_regionID].coordination[Annunciator_type].groupid[Annunciator_groupID].signals[markerID];
		for(var x in alldata[Annunciator_regionID].coordination[Annunciator_type].groupid[Annunciator_groupID].signals){
						arr.push(alldata[Annunciator_regionID].coordination[Annunciator_type].groupid[Annunciator_groupID].signals[x].id)
					}
					var signalids = arr.join(",");
					var value = alldata[Annunciator_regionID].id+";'"+alldata[Annunciator_regionID].name+"';"+alldata[Annunciator_regionID].coordination[Annunciator_type].groupid[Annunciator_groupID].id+";'"+
					alldata[Annunciator_regionID].coordination[Annunciator_type].groupid[Annunciator_groupID].groupName+"';'"+alldata[Annunciator_regionID].coordination[Annunciator_type].groupid[Annunciator_groupID].subName+"';"+
					alldata[Annunciator_regionID].coordination[Annunciator_type].id+";'{"+signalids+"}']";
					uploadData(value);
			
	}
}
function inserAnnunciatorControl(annunciatorParent, regionID, groupID, AnnunciatorID, AnnunciatorName,type,toggle,signal_id) {
	var list = "";
	list += '<li id="line_signale_' + regionID + '_' + groupID + '_' + AnnunciatorID + '">' +
		'<div class="li_box">' +
		'<div class="box_img"><img class="li_img" src="images/singal_IMG/3.png"></div>' +
		'<div class="li_words">' +
		'<p class="nr_name nr_nameSon" id="line_signaleId_' + AnnunciatorID + '" title="Epics-' + AnnunciatorName + '">Epics-' + AnnunciatorName + '</p>' +
		'<p class="describe_words" id="line_signaleName_' + AnnunciatorID + '" title="' + AnnunciatorName + '">' + AnnunciatorName + '</p>' +
		'</div>' +
		'</div>' +
		'</li>';
	$(annunciatorParent).append(list);
	var arr = [];
	//插入object
				if(alldata[regionID].coordination[type].groupid[groupID].signals[AnnunciatorID] == undefined) {
					var signal = new Object();
				}	
				if(signal_id){
					signal.id = signal_id;
					signal.name = AnnunciatorName;
					alldata[regionID].coordination[type].groupid[groupID].signals[signal_id] = signal;
				}else{
					signal.id = AnnunciatorID;
					signal.name = AnnunciatorName;
					alldata[regionID].coordination[type].groupid[groupID].signals[AnnunciatorID] = signal;
				}
					//					signal.coordination = {};
//					alldata[regionID].coordination[type].groupid[groupID].signals[AnnunciatorID] = signal;
					for(var x in alldata[regionID].coordination[type].groupid[groupID].signals){
						arr.push(alldata[regionID].coordination[type].groupid[groupID].signals[x].id);
					}
					var signalids = arr.join(",");
					var value = alldata[regionID].id+";'"+alldata[regionID].name+"';"+alldata[regionID].coordination[type].groupid[groupID].id+";'"+
					alldata[regionID].coordination[type].groupid[groupID].groupName+"';'"+alldata[regionID].coordination[type].groupid[groupID].subName+"';"+
					alldata[regionID].coordination[type].id+";'{"+signalids+"}']";
					if(toggle){
						uploadData(value);
					}
					
}
	function inserGroupControl(groupParent,regionID,groupID,groupName,subName,type){
		 //创建干道协调组
	var list="";
     list='<li id="group_line_'+regionID+'_'+2+'_'+groupID+'">'+
            '<div onclick="listClick(this)" class="li_box">'+
                '<label for="ipt_'+regionID+'_'+groupID+'">'+
                	'<input type="checkbox" name="check_'+regionID+'_'+groupID+'" onclick="addAnnunciator('+regionID+','+groupID+',this,2)" class="groupCheck" id="ipt_'+regionID+'_'+groupID+'">'+
                	'<div class="box_img" >'+
                		'<img class="li_img img_check" src="images/singal_IMG/2.png" >'+
                		// '<img class="li_img img_check" src="images/light.png">'+
                	'</div>'+
                '</label>'+
                '<div class="li_words">'+
                    '<p class="nr_name parentName"><span title="'+groupName+'" id="group_line'+groupID+'">'+groupName+'</span><img class="More1" src="images/more.png" onclick="lineViewSetup(this)"><img class="Del" onclick="GroupNameRemove(this)" src="images/del0.png"><img class="down" src="images/down.png"></p>'+
                    '<p class="describe_words parentName" title="'+subName+'" id="group_lineName'+groupID+'">'+subName+'</p>'+
                '</div>'+
            '</div>'+
            '<ul class="area_ul4 concert_son" id="group_line_child_'+regionID+'_'+groupID+'"></ul>'+
          '</li>';
    $(groupParent).append(list);
    //插入object
    if(alldata[regionID].coordination[type].groupid[groupID] == undefined) {
    	var group = new Object();
    }
    else
    	group=alldata[regionID].coordination[type].groupid[groupID];
    
    group.id = groupID;
    group.groupName = groupName.split("-")[1];
    group.subName = subName;
    group.signals = {};
    alldata[regionID].coordination[type].groupid[groupID] = group;


	}
	function insertAreaControl(groupParent,regionID,groupID,groupName,subName,type){
		 //创建区域协调
	var list="";
      list+='<li id="group_area_'+regionID+'_'+3+'_'+groupID+'">'+
            '<div onclick="listClick(this)" class="li_box">'+
                '<label for="Areaipt_'+regionID+'_'+groupID+'">'+
                	'<input type="checkbox" name="check_'+regionID+'_'+groupID+'" onclick="addAnnunciator('+regionID+','+groupID+',this,3)" class="groupCheck" id="Areaipt_'+regionID+'_'+groupID+'">'+
                	'<div class="box_img" >'+
                		'<img class="li_img img_check" src="images/singal_IMG/4.png" >'+
                		// '<img class="li_img img_check" src="images/light.png">'+
                	'</div>'+
                //'<div class="box_img"><img class="li_img" src="images/light.png"><img class="li_img" src="images/light.png"></div>'+
                '<div class="li_words">'+
                    '<p class="nr_name"><span title="'+groupName+'" id="Area'+groupID+'">'+groupName+'</span><img class="Del" onclick="GroupNameRemove(this)" src="images/del0.png"><img class="down" src="images/down.png"></p>'+
                    '<p class="describe_words" title="'+subName+'" id="group_area_name_'+groupID+'">'+subName+'</p>'+
                '</div></label>'+
            '</div>'+
            '<ul class="area_ul4 concert_son"  id="group_area_child_'+regionID+'_'+groupID+'"></ul>'+
          '</li>';
    $(groupParent).append(list);
    //插入object
    if(alldata[regionID].coordination[type].groupid[groupID] == undefined) {
				var group = new Object();
			}
				group.id = groupID;
				group.groupName = groupName.split("-")[1];
				group.subName = subName;
				group.signals = {};
				alldata[regionID].coordination[type].groupid[groupID] = group;
				
				
	}
//上传信号控制
function uploadData(value){
	$.ajax({
     url:"GetDevice",
         dataType:"json",
         data:{ "action":"insert","type":62,"val":value},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               reviseAlert('修改成功');
         },
         error:function()
         {

         }
  })
//					arr4.push(alldata[x].coordination[y].groupid[z].signals[n].name);

}
	
	
   function insertRegionControl(regionID, regionName) {

	var list = '';
	list += '<li>' +
		'<ul class="area_u1" id="bigArea_' + regionID + '">' +
		'<li><p class="area_p1"><img src="images/boll.png" class="bg_img"/><span>' + regionName + '</span></p>' +
		'<ul class="area_ul2" id="area_' + regionID + '">' +
		'<li><p class="alongControl area_p2"><div class="lightFrame_img"><img src="images/light.png" class="bg_img1"/></div>' +
		'<span class="nameSpan">单点控制</span>' +
		'<img src="images/add1.png" onclick="drawPoints(this),kk(featuresLayer)" class="Add" id="addPoints1">' +
		'</p>' +
		'<ul class="area_ul3" id="control_point_' + regionID + '"></ul> ' +
		'</li>' +
		'<li><p class="concertControl area_p2"><div class="lightFrame_img"><img src="images/light.png" class="bg_img1"/><img src="images/light.png" class="bg_img1"/></div><span class="nameSpan">干道协调</span><img src="images/add1.png" title="添加" class="Add" onclick="addGroupset(' + regionID + ',2)"></p>' +
		'<ul class="area_ul3" id="control_line_' + regionID + '"></ul> ' +
		'</li>' +
		'<li><p class="areaControl area_p2"><div class="lightFrame_img"><img src="images/light.png" class="bg_img1"/><img src="images/light.png" class="bg_img1"/><img src="images/light.png" class="bg_img1"/></div><span class="nameSpan">区域协调</span><img src="images/add1.png" title="添加" class="Add" onclick="addGroupset(' + regionID + ',3)"></p>' +
		'<ul class="area_ul3" id="control_area_' + regionID + '"></ul> ' +
		'</li>' +
		'</ul>' +
		'</li>' +
		'</ul>' +
		'</li> ';
	$(list).insertBefore('.establishArea');
}
/*实时监控编辑*/
function RealTimeVideoAttribute(){
  var gmarkerId=gmarker.id;
  var val="{ID:"+gmarkerId+"}";
  $.ajax({
     url:"GetDevice",
         dataType:"json",
         data:{ "action":"query","type":61,"val":val},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               realTimeVideo( data );
         },
         error:function()
         {

         }
  })
  
  bFlagDelete=false;
  getSignalPhaseMap(gmarkerId);
}
var controlModels=["0-单点定时","1-感应控制","2-干道协调","3-区域协调"];
var firstControls=["0-无优先","1-公交优先","2-VIP优先"];

//信号控制实时监控
/*信号实时监控*/
function realTimeVideo(data){
  $(".zhao").css("display","block");
  var nr='';
  nr+='<div class="realTimeView" id="realTimeView">'+
     '<div class="map_title">'+
          '<span>信号控制实时监控</span>'+
         '<img src="images/min.png" class="empty_btn empty" onclick="zhao_none(\'.zhao\'),reasize(\'#realTimeView\')"/>'+
     '</div>'+
     '<div class="mc_main viewMain">'+
      '<div class="mainLeft">'+
        '<div class="mapView">'+
          '<div id="mapView"></div>'+
            '<video width="160px" height="120px" autoplay="autoplay" loop="loop" class="viewTop">'+
                '<source src="video/view1.mp4" type="video/mp4" />'+
            '</video>'+
            '<video width="160px" height="120px" autoplay="autoplay" loop="loop" class="viewLeft">'+
                '<source src="video/view1.mp4" type="video/mp4" />'+
            '</video>'+
            '<video width="160px" height="120px" autoplay="autoplay" loop="loop" class="viewRight">'+
              '<source src="video/view1.mp4" type="video/mp4" />'+
            '</video>'+
           '<video width="160px" height="120px" autoplay="autoplay" loop="loop" class="viewDown">'+
            '<source src="video/view1.mp4" type="video/mp4" />'+
           '</video> '+
         '</div>'+
       '</div>'+
       '<div class="mainRight">'+
       	  '<div class="dataView">'+
            '<ul class="preinstallTitleUl">'+
              '<li class="viewLi1">控制模式</li>'+
              '<li>'+
                '<div class="preinstall">'+
                  '<p class="preinstallTitle">预设模式</p>'+
                  '<p class="preinstallModel">'+controlModels[data.entitys[12]]+'</p>'+
                '</div>'+
                '<div class="now">'+
                  '<p class="nowTitle">当前模式</p>'+
                  '<p class="nowModel">协调控制</p>'+
                '</div>'+
              '</li>'+
            '</ul>'+
            '<ul class="integrateUl">'+
              '<li class="viewLi1">协调控制</li>'+
              '<li>'+
                '<ul class="integrate1">'+
                  '<li class="integrateLi1 integrateBg"><i class="greenkuai"></i><i class="greenkuai"></i><i class="greenkuai"></i><i class="greenkuai"></i><i class="greenkuai"></i></li>'+
                  '<li class="integrateLi2">信号周期</li>'+
                  '<li class="integrateLi2">相位差</li>'+
                '</ul>'+
                '<ul class="integrate2">'+
                  '<li class="integrateLi1">协调前</li>'+
                  '<li class="integrateLi3">120s</li>'+
                  '<li class="integrateLi3">NONE</li>'+
                '</ul>'+
                '<ul class="integrate3">'+
                  '<li class="integrateLi1">协调后</li>'+
                  '<li class="integrateLi3">90s</li>'+
                  '<li class="integrateLi3">5s</li>'+
                '</ul>'+
              '</li>'+
            '</ul>'+
            '<ul class="clockUl">'+
              '<li class="viewLi1">时钟</li>'+
              '<li>'+
                '<ul class="clock1">'+
                  '<li class="integrateLi1">设备</li>'+
                  '<li class="integrateLi2">系统</li>'+
                  '<li class="integrateLi2">误差</li>'+
                '</ul>'+
                '<ul class="clock2">'+
                  '<li class="clockLi1">12:30:54</li>'+
                  '<li class="clockLi2" id="system_time">12:30:55</li>'+
                  '<li class="clockLi2">1s</li>'+
                '</ul>'+
              '</li>'+
            '</ul>'+
            '<ul class="controlUl">'+
              '<li class="viewLi1">优先控制</li>'+
              '<li class="controlLi1">'+firstControls[data.entitys[13]]+'</li>'+
            '</ul>'+
            '<ul class="alarmUl">'+
              '<li class="viewLi1">警报</li>'+
              '<li class="alarmLi1"><img class="biggreen" src="images/img2/biggreen.png"></li>'+
            '</ul>'+
            '<ul class="semaphoreUl">'+
              '<li class="viewLi1">通信状态</li>'+
              '<li class="semaphoreLi1">'+
                '<img class="biggreen" src="images/img2/biggreen.png">'+
                '<div class="barGreen">100%</div>'+
              '</li>'+
            '</ul>'+
         '</div>'+
          '<div class="row row1 r">'+
            '<span class="r_sp1">主要相位</span>'+
            '<span class="r_sp2">1</span>'+
            '<span class="r_sp2">2</span>'+
            '<span class="r_sp2">3</span>'+
            '<span class="r_sp2">4</span>'+
            '<span class="r_sp2">5</span>'+
            '<span class="r_sp2">6</span>'+
            '<span class="r_sp2">7</span>'+
            '<span class="r_sp2">8</span>'+
            '<span class="r_sp2">9</span>'+
            '<span class="r_sp2">10</span>'+
            '<span class="r_sp2">11</span>'+
            '<span class="r_sp2">12</span>'+
            '<span class="r_sp2">13</span>'+
            '<span class="r_sp2">14</span>'+
            '<span class="r_sp2">15</span>'+
            '<span class="r_sp2">16</span>'+
          '</div>'+
          '<div class="row row2">'+
            '<span class="r_sp1">倒<i></i>计<i></i>时</span>'+
            '<span class="r_sp2">1</span>'+
            '<span class="r_sp2">2</span>'+
            '<span class="r_sp2">3</span>'+
            '<span class="r_sp2">4</span>'+
            '<span class="r_sp2">5</span>'+
            '<span class="r_sp2">6</span>'+
            '<span class="r_sp2">7</span>'+
            '<span class="r_sp2">8</span>'+
            '<span class="r_sp2">9</span>'+
            '<span class="r_sp2">10</span>'+
            '<span class="r_sp2">11</span>'+
            '<span class="r_sp2">12</span>'+
            '<span class="r_sp2">13</span>'+
            '<span class="r_sp2">14</span>'+
            '<span class="r_sp2">15</span>'+
            '<span class="r_sp2">16</span>'+
          '</div>'+
          '<div class="row row2">'+
            '<span class="r_sp1">预设时间</span>'+
            '<span class="r_sp2">1</span>'+
            '<span class="r_sp2">2</span>'+
            '<span class="r_sp2">3</span>'+
            '<span class="r_sp2">4</span>'+
            '<span class="r_sp2">5</span>'+
            '<span class="r_sp2">6</span>'+
            '<span class="r_sp2">7</span>'+
            '<span class="r_sp2">8</span>'+
            '<span class="r_sp2">9</span>'+
            '<span class="r_sp2">10</span>'+
            '<span class="r_sp2">11</span>'+
            '<span class="r_sp2">12</span>'+
            '<span class="r_sp2">13</span>'+
            '<span class="r_sp2">14</span>'+
            '<span class="r_sp2">15</span>'+
            '<span class="r_sp2">16</span>'+
          '</div>'+
          '<div class="row row2">'+
            '<span class="r_sp1">车辆信号</span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/redpoint.png"></span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/greenpoint1.png"></span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/redpoint.png"></span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/redpoint.png"></span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/redpoint.png"></span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/greenpoint1.png"></span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/redpoint.png"></span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/redpoint.png"></span>'+
          '</div>'+
          '<div class="row row2">'+
            '<span class="r_sp1">行人信号</span>'+
            '<span class="r_sp2" style="visibility:hidden;"><img class="manPoint" src="images/img2/greenman.png"></span>'+
            '<span class="r_sp2"><img class="manPoint" src="images/img2/greenman.png"></span>'+
            '<span class="r_sp2" style="visibility:hidden;"><img class="manPoint" src="images/img2/greenman.png"></span>'+
            '<span class="r_sp2" style="visibility:hidden;"><img class="manPoint" src="images/img2/greenman.png"></span>'+
            '<span class="r_sp2" style="visibility:hidden;"><img class="manPoint" src="images/img2/greenman.png"></span>'+
            '<span class="r_sp2"><img class="manPoint" src="images/img2/greenman.png"></span>'+
            '<span class="r_sp2" style="visibility:hidden;"><img class="manPoint" src="images/img2/greenman.png"></span>'+
            '<span class="r_sp2" style="visibility:hidden;"><img class="manPoint" src="images/img2/greenman.png"></span>'+
          '</div>'+
          '<div class="row row2">'+
            '<span class="r_sp1">车辆检测</span>'+
          '</div>'+
          '<div class="row row2">'+
            '<span class="r_sp1">行人请求</span>'+
          '</div>'+
          '<div class="row row2">'+
            '<span class="r_sp1">优先请求</span>'+
          '</div>'+
          '<div class="row row1 r">'+
            '<span class="r_sp1">伴随相位</span>'+
            '<span class="r_sp2">A</span>'+
            '<span class="r_sp2">B</span>'+
            '<span class="r_sp2">C</span>'+
            '<span class="r_sp2">D</span>'+
            '<span class="r_sp2">E</span>'+
            '<span class="r_sp2">F</span>'+
            '<span class="r_sp2">G</span>'+
            '<span class="r_sp2">H</span>'+
            '<span class="r_sp2">I</span>'+
            '<span class="r_sp2">J</span>'+
            '<span class="r_sp2">K</span>'+
            '<span class="r_sp2">L</span>'+
            '<span class="r_sp2">M</span>'+
            '<span class="r_sp2">N</span>'+
            '<span class="r_sp2">O</span>'+
            '<span class="r_sp2">P</span>'+
          '</div>'+
          '<div class="row row2">'+
            '<span class="r_sp1">倒<i></i>计<i></i>时</span>'+
            '<span class="r_sp2">1</span>'+
            '<span class="r_sp2">2</span>'+
            '<span class="r_sp2">3</span>'+
            '<span class="r_sp2">4</span>'+
            '<span class="r_sp2">5</span>'+
            '<span class="r_sp2">6</span>'+
            '<span class="r_sp2">7</span>'+
            '<span class="r_sp2">8</span>'+
            '<span class="r_sp2">9</span>'+
            '<span class="r_sp2">10</span>'+
            '<span class="r_sp2">11</span>'+
            '<span class="r_sp2">12</span>'+
            '<span class="r_sp2">13</span>'+
            '<span class="r_sp2">14</span>'+
            '<span class="r_sp2">15</span>'+
            '<span class="r_sp2">16</span>'+
          '</div>'+
          '<div class="row row2">'+
            '<span class="r_sp1">车辆信号</span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/redpoint.png"></span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/greenpoint1.png"></span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/redpoint.png"></span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/redpoint.png"></span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/redpoint.png"></span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/greenpoint1.png"></span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/redpoint.png"></span>'+
            '<span class="r_sp2"><img class="point" src="images/img2/redpoint.png"></span>'+
          '</div>'+
          '<div class="row row2">'+
            '<span class="r_sp1">行人信号</span>'+
            '<span class="r_sp2" style="visibility:hidden;"><img class="manPoint" src="images/img2/greenman.png"></span>'+
            '<span class="r_sp2"><img class="manPoint" src="images/img2/greenman.png"></span>'+
            '<span class="r_sp2" style="visibility:hidden;"><img class="manPoint" src="images/img2/greenman.png"></span>'+
            '<span class="r_sp2" style="visibility:hidden;"><img class="manPoint" src="images/img2/greenman.png"></span>'+
            '<span class="r_sp2" style="visibility:hidden;"><img class="manPoint" src="images/img2/greenman.png"></span>'+
            '<span class="r_sp2"><img class="manPoint" src="images/img2/greenman.png"></span>'+
            '<span class="r_sp2" style="visibility:hidden;"><img class="manPoint" src="images/img2/greenman.png"></span>'+
            '<span class="r_sp2" style="visibility:hidden;"><img class="manPoint" src="images/img2/greenman.png"></span>'+
          '</div>'+
          // '<div class="divWhite">'+
          //   '<div class="White"></div>'+
          //   '<div class="White"></div>'+
          // '</div>'+
       '</div>'+
    '</div>'+
'</div>';
$('body').append(nr);
  mapVideo();
  mapCur=mapView;
  //systemTime();
}
/*实时监控里的系统时间*/
function systemTime(){
  var date=new Date();
    var hh=date.getHours();
    var mm=date.getMinutes();
    var ss=date.getSeconds();
    mm=checkTime(mm);
    ss=checkTime(ss);
    var _systemTime=document.getElementById("system_time");
    _systemTime.innerText=hh+":"+mm+":"+ss;
    t=setTimeout('systemTime()',500);
  }
  function checkTime(i){
  if (i<10){
    i="0" + i;
  }
  return i;
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
  $(".zhao").css("display","block");

  var poslon=new SuperMap.LonLat(gmarker.lonlat.lon,gmarker.lonlat.lat);
  var coord=poslon.transform("EPSG:900913", "EPSG:4326" ); 

  var cLon=coord.lon.toFixed(6)-0;
  var cLat=coord.lat.toFixed(6)-0;
  var nr='';
  //var data=['300087','万家丽路路口','北苑路','秋实路','2.990533','23.709122','南京莱斯','ASC/3','3,7','2,6','TCP网口','127.0.0.1','118.0.0.2','2000'];
nr+='<div class="mapControl" id="mapControl" style="width:1011px">'+
    '<div class="map_title">'+
        '<span>所选信号控制机信息</span>'+
        '<img src="images/min.png" class="empty_btn empty" onclick="zhao_none(\'.zhao\'),reasize(\'#mapControl\'),reset()"/>'+
    '</div>'+
   '<div class="mc_main" id="mc_main">'+
    '<div id="map1"></div>'+
    '<div class="iconList">'+
    '<div class="signalEditMain">'+
		    '<div class="signalBase">'+
		      '<p class="signalEdit_title" style="clear: both">信号机控制机属性</p>'+
		      '<ul>'+
		        '<li><span class="spa1">设备编号</span><input type="text" class="signal_ipt1 width_103 height_15" name="" id="number" value="'+data.entitys[0]+'"/></li>'+
		        '<li><span class="spa1">设备位置</span><input type="text" class="signal_ipt1 width_103 height_15" name="" id="position" value="'+data.entitys[1]+'"/></li>'+
		        '<li><span class="spa1">主街名称</span><input type="text" class="signal_ipt1 width_103 height_15" name="" id="firstStreet" value="'+data.entitys[2]+'"/></li>'+
		        '<li><span class="spa1">次街名称</span><input type="text" class="signal_ipt1 width_103 height_15" name="" id="secondStreet" value="'+data.entitys[3]+'"/></li>'+
		        '<li><span class="spa1">经度坐标</span><input type="text" class="signal_ipt1 width_103 height_15" name="" id="lon" readonly="readonly" value="'+cLon+'"/></li>'+
		        '<li><span class="spa1">纬度坐标</span><input type="text" class="signal_ipt1 width_103 height_15" name="" id="lat" readonly="readonly" value="'+cLat+'"/></li>'+
		        '<li><span class="spa1">生产厂家</span><input type="text" class="signal_ipt1 width_103 height_15" name="" id="vender" value="'+data.entitys[4]+'"/></li>'+
		        '<li><span class="spa1">产品型号</span><input type="text" name="" class="signal_ipt1 width_103 height_15" id="version" value="'+data.entitys[5]+'"/></li>'+
		        '<li>'+
		          '<span class="spa1">控制机型</span>'+
		          '<select class="sel width_103 height_15" id="controlType">'+
		            '<option>0-单点自由控制机</option>'+
		            '<option>1-Epics优化控制机</option>'+
		            '<option>2-感应优化控制机</option>'+
		            '<option>3-中心协调控制机</option>'+
		          '</select>'+
		        '</li>'+
		      '</ul>'+
		    '</div>'+
		    '<div class="signalSet">'+
		      '<p class="signalEdit_title" style="clear: both">信号设置信息</p>'+
		      '<ul>'+
		        '<li>'+
		          '<span class="spa1">主要相位</span>'+
		          '<select class="sel width_103 height_15" id="majorAspect">'+
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
		          '<span class="spa1">伴随相位</span>'+
		          '<select class="sel width_103 height_15" id="followPhase">'+
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
		        '<li><span class="spa1">主街相位</span><input type="text" name="" class="signal_ipt1 width_103 height_15" id="mainStemPhase" value="'+data.entitys[9]+'"/></li>'+
		        '<li><span class="spa1">次街相位</span><input type="text" name="" class="signal_ipt1 width_103 height_15" id="secondStreetPhase" value="'+data.entitys[10]+'"/></li>'+
		        '<li>'+
		          '<span class="spa1">检测器类</span>'+
		          '<select class="sel width_103 height_15" id="detectors">'+
		            '<option>0-无检测器</option>'+
		            '<option>1-视频检测</option>'+
		            '<option>2-雷达检测</option>'+
		            '<option>3-地磁检测</option>'+
		            '<option>4-线圈检测</option>'+
		            '<option>5-电子警察数据</option>'+
		          '</select>'+
		        '</li>'+
		        '<li>'+
		          '<span class="spa1">控制模式</span>'+
		          '<select class="sel width_103 height_15" id="controlModel">'+
		            '<option>'+controlModels[0]+'</option>'+
		            '<option>'+controlModels[1]+'</option>'+
		            '<option>'+controlModels[2]+'</option>'+
		            '<option>'+controlModels[3]+'</option>'+
		          '</select>'+
		        '</li>'+
		        '<li>'+
		          '<span class="spa1">优先控制</span>'+
		          '<select class="sel width_103 height_15" id="firstControl">'+
		            '<option>'+firstControls[0]+'</option>'+
		            '<option>'+firstControls[1]+'</option>'+
		            '<option>'+firstControls[2]+'</option>'+
		          '</select>'+
		        '</li>'+
		      '</ul>'+
		    '</div>'+
		    '<div class="signalLink">'+
		      '<p class="signalEdit_title" style="clear: both">通信连接信息</p>'+
		      '<ul>'+
		        '<li><span class="spa1">通讯类型</span><input type="text" name="" class="signal_ipt1 width_103 height_15" id="communicationsType"  value="'+data.entitys[14]+'"/></li>'+
		        '<li><span class="spa1">信号机IP</span><input type="text" name="" class="signal_ipt1 width_103 height_15" id="signalIp"  value="'+data.entitys[15]+'"/></li>'+
		        '<li><span class="spa1">目标IP</span><input type="text" name="" class="signal_ipt2 width_103 height_15" id="targetIp"  value="'+data.entitys[16]+'"/></li>'+
		        '<li><span class="spa1">目标端口</span><input type="text" name="" class="signal_ipt1 width_103 height_15" id="targetPort"  value="'+data.entitys[17]+'"/></li>'+
		      '</ul>'+
		    '</div>'+
		    '<div class="editBtn">'+
		      '<input type="button" class="editBt1" value="保存设置" onclick="reviseSingle()">'+
		      '<input type="button" class="editBt2" value="取消" onclick="zhao_none(\'.zhao\',\'#signalEdit\')">'+
		    '</div>'+
   			' </div>'+
   			 '<p class="NatureTitle">定时控制参数</p>'+
	        '<ul id="setSignal" type="query" style="overflow-y:hidden;">'+
	          '<li><span class="spa1">信号周期</span><input data="pe" type="text" name="" class="Nature_ipt1 js-inp-cyc" id="cyc" value=""/></li>'+
	          '<li><span class="spa1">相位编号</span><input data="ph" type="text" name="" class="Nature_ipt1 js-inp-val" id="ph" value=""/>'+
	          '</li>'+
	          '<li><span class="spa1">黄灯开始</span><input data="y" type="text" name="" class="Nature_ipt1 js-inp-yel" id="yel" value=""/></li>'+
	          '<li style="display:none;"><span class="spa1">绿信比</span><input data="off" type="text" name="" class="Nature_ipt1 js-inp-off" id="off" value="0"/></li>'+
	        '</ul>'+
    '</div>'+
  '</div>'+
'</div>';
    $('body').append(nr);
    $("#controlType option").eq(data.entitys[6]).attr("selected", true);
    $("#majorAspect option").eq(data.entitys[7]).attr("selected", true);
    $("#followPhase option").eq(data.entitys[8]).attr("selected", true);
    $("#detectors option").eq(data.entitys[11]).attr("selected", true);
    $("#controlModel option").eq(data.entitys[12]).attr("selected", true);
    $("#firstControl option").eq(data.entitys[13]).attr("selected", true);
    xintu();
    mapCur=map;
    signalConfig(8);
    getSignalPhaseMap(gmarker.id);
    
}
//信号控制的设置修改属性ajax
function reviseSingle(){
  var gmarkerId=gmarker.id;
  var Empty_Number = $("#number").val();
      var Empty_position = $("#position").val();
      var Empty_firstStreet = $("#firstStreet").val();
      var Empty_secondStreet = $("#secondStreet").val();
      var Empty_lon = $("#lon").val();
      var Empty_lat = $("#lat").val();
      var Empty_vender = $("#vender").val();
      var Empty_version = $("#version").val();
      var Empty_controlType = $("#controlType option").index($('#controlType option:selected'));
      var Empty_majorAspect = $("#majorAspect option").index($('#majorAspect option:selected'));
      var Empty_followPhase = $("#followPhase option").index($('#followPhase option:selected'));
      var Empty_mainStemPhase = $("#mainStemPhase").val();
      var Empty_secondStreetPhase = $("#secondStreetPhase").val();
      var Empty_detectors = $("#detectors option").index($('#detectors option:selected'));
      var Empty_controlModel = $("#controlModel option").index($('#controlModel option:selected'));
      var Empty_firstControl = $("#firstControl option").index($('#firstControl option:selected'));
      var Empty_communicationsType = $("#communicationsType").val();
      var Empty_signalIp = $("#signalIp").val();
      var Empty_targetIp = $("#targetIp").val();
      var Empty_targetPort = $("#targetPort").val();
  var dd=true;
    $("#dwork_nodes input").each(function(){
      if($(this).val()==""){
        dd=false;
      }
    });
    if(dd){
  $.ajax({
     url:"GetDevice",
         dataType:"json",
         data:{ "action":"update","type":60,"val":+Empty_Number+";"+"'"+Empty_position+"'"+";"+"'"+Empty_firstStreet+"'"+";"+"'"+Empty_secondStreet+"'"+";"+"'"+Empty_vender+"'"+";"+"'"+Empty_version+"'"+";"+"'"+Empty_controlType+"'"+";"+"'"+Empty_majorAspect+"'"+";"+"'"+Empty_followPhase+"'"+";"+"'"+Empty_mainStemPhase+"'"+";"+"'"+Empty_secondStreetPhase+"'"+";"+"'"+Empty_detectors+"'"+";"+"'"+Empty_controlModel+"'"+";"+"'"+Empty_firstControl+"'"+";"+"'"+Empty_communicationsType+"'"+";"+"'"+Empty_signalIp+"'"+";"+"'"+Empty_targetIp+"'"+";"+"'"+Empty_targetPort+"'"},//+",control_type,"+0+",device_id,"+"'"+gmarkerId+"'"
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
            var str="数据属性修改成功！";
                 reviseAlert(str);
               //alert("修改成功！");
               zhao_none('.zhao','#signalEdit');
               deng();
              unFeatureSelect();              
         },
         error:function()
         {
            //alert("修改最后一项是错误的")
         }
  })
  }else{
      reviseAlert("数据格式不正确或为空");
    }
}
//信号控制的设置添加的ajax
function empty_addSingles(){
  var Empty_Number = $("#empty_Number").val();
      var Empty_position = $("#empty_position").val();
      var Empty_firstStreet = $("#empty_firstStreet").val();
      var Empty_secondStreet = $("#empty_secondStreet").val();
      var Empty_lon = $("#empty_lon").val();
      var Empty_lat = $("#empty_lat").val();
      var Empty_vender = $("#empty_vender").val();
      var Empty_version = $("#empty_version").val();
      var Empty_controlType = $("#empty_controlType option").index($('#empty_controlType option:selected'));
      var Empty_majorAspect = $("#empty_majorAspect option").index($('#empty_majorAspect option:selected'));
      var Empty_followPhase = $("#empty_followPhase option").index($('#empty_followPhase option:selected'));
      var Empty_mainStemPhase = $("#empty_mainStemPhase").val();
      var Empty_secondStreetPhase = $("#empty_secondStreetPhase").val();
      var Empty_detectors = $("#empty_detectors option").index($('#empty_detectors option:selected'));
      var Empty_controlModel = $("#empty_controlModel option").index($('#empty_controlModel option:selected'));
      var Empty_firstControl = $("#empty_firstControl option").index($('#empty_firstControl option:selected'));
      var Empty_communicationsType = $("#empty_communicationsType").val();
      var Empty_signalIp = $("#empty_signalIp").val();
      var Empty_targetIp = $("#empty_targetIp").val();
      var Empty_targetPort = $("#empty_targetPort").val();

  var dd=true;
    $("#signalEdit1 input").each(function(){
      if($(this).val()==""){
        dd=false;
      }
    });
    if(dd){
      $.ajax({
       url:"GetDevice",
           dataType:"json",
           data:{ "action":"insert","type":60,"val":Empty_Number+";"+"'"+Empty_position+"'"+";"+"'"+Empty_firstStreet+"'"+";"+Empty_secondStreet+";"+Empty_vender+";"+Empty_version+";"+Empty_controlType+";"+Empty_majorAspect+";"+Empty_followPhase+";"+"'"+Empty_mainStemPhase+"'"+";"+"'"+Empty_secondStreetPhase+"'"+";"+Empty_detectors+";"+Empty_controlModel+";"+Empty_firstControl+";"+"'"+Empty_communicationsType+"'"+";"+"'"+Empty_signalIp+"'"+";"+"'"+Empty_targetIp+"'"+";"+Empty_targetPort+";0;0;0;'point("+Empty_lon+" "+Empty_lat+")'"},
           contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
           beforeSend:function(){  },
           success: function( data, textStatus, jqXHR ){
                 var str="数据属性添加成功！";
                  reviseAlert(str);
                 //alert("数据属性添加成功！");
                 zhao_none('.zhao','#signalEdit1');  
                 deng();
                 unFeatureSelect();
           },
           error:function()
           {
            //alert("wrong");
           }
    })
  }else{
      reviseAlert("数据格式不正确或为空");
    }
}
//信号控制的设置添加空的属性弹窗
function empty_singleSet(){
  $(".zhao").css("display","block");
  
  var poslon=new SuperMap.LonLat(pos.lon,pos.lat);
  var coord=poslon.transform("EPSG:900913", "EPSG:4326" ); 

  var cLon=coord.lon.toFixed(6)-0;
  var cLat=coord.lat.toFixed(6)-0;
  var nr='';
  //var data=['300087','万家丽路路口','北苑路','秋实路','2.990533','23.709122','南京莱斯','ASC/3','3,7','2,6','TCP网口','127.0.0.1','118.0.0.2','2000'];
  nr+='<div id="signalEdit1" class="jd_nodes" style="display: block;" >'+
  '<p class="EditTitle">编辑信号机属性<img src="images/min.png" class="empty_btn empty" onclick="zhao_none(\'.zhao\',\'#signalEdit1\')"></p>'+
  '<div class="signalEditMain">'+
    '<div class="signalBase">'+
      '<p class="signalEdit_title">信号机基本信息</p>'+
      '<ul>'+
        '<li><span class="spa1">设备编号</span><input type="text" class="signal_ipt1" name="" readonly="readonly" id="empty_Number" value="'+maxSignal+'"/></li>'+
        '<li><span class="spa1">设备位置</span><input type="text" class="signal_ipt1" name="" id="empty_position" value=""/></li>'+
        '<li><span class="spa1">主街名称</span><input type="text" class="signal_ipt1" name="" id="empty_firstStreet" value=""/></li>'+
        '<li><span class="spa1">次街名称</span><input type="text" class="signal_ipt1" name="" id="empty_secondStreet" value=""/></li>'+
        '<li><span class="spa1">经度坐标</span><input type="text" class="signal_ipt1" name="" readonly="readonly" id="empty_lon" value="'+cLon+'"/></li>'+
        '<li><span class="spa1">纬度坐标</span><input type="text" class="signal_ipt1" name="" readonly="readonly" id="empty_lat" value="'+cLat+'"/></li>'+
        '<li><span class="spa1">生产厂家</span><input type="text" class="signal_ipt1" name="" id="empty_vender" value=""/></li>'+
        '<li><span class="spa1">产品型号</span><input type="text" name="" class="signal_ipt1" id="empty_version" value=""/></li>'+
        '<li>'+
          '<span class="spa1">控制机型</span>'+
          '<select class="sel" id="empty_controlType">'+
            '<option>0-单点自由控制机</option>'+
            '<option>1-Epics优化控制机</option>'+
            '<option>2-感应优化控制机</option>'+
            '<option>3-中心协调控制机</option>'+
          '</select>'+
        '</li>'+
      '</ul>'+
    '</div>'+
    '<div class="signalSet">'+
      '<p class="signalEdit_title">信号设置信息</p>'+
      '<ul>'+
        '<li>'+
          '<span class="spa1">主要相位</span>'+
          '<select class="sel" id="empty_majorAspect">'+
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
          '<span class="spa1">伴随相位</span>'+
          '<select class="sel" id="empty_followPhase">'+
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
        '<li><span class="spa1">主街相位</span><input type="text" name="" id="empty_mainStemPhase" class="signal_ipt1" value=""/></li>'+
        '<li><span class="spa1">次街相位</span><input type="text" name="" id="empty_secondStreetPhase" class="signal_ipt1" value=""/></li>'+
        '<li>'+
          '<span class="spa1">检测器类</span>'+
          '<select class="sel" id="empty_detectors">'+
            '<option>0-无检测器</option>'+
            '<option>1-视频检测</option>'+
            '<option>2-雷达检测</option>'+
            '<option>3-地磁检测</option>'+
            '<option>4-线圈检测</option>'+
            '<option>5-电子警察数据</option>'+
          '</select>'+
        '</li>'+
        '<li>'+
          '<span class="spa1">控制模式</span>'+
          '<select class="sel" id="empty_controlModel">'+
            '<option>0-单点定时</option>'+
            '<option>1-感应控制</option>'+
            '<option>2-干道协调</option>'+
            '<option>3-区域协调</option>'+
          '</select>'+
        '</li>'+
        '<li>'+
          '<span class="spa1">优先控制</span>'+
          '<select class="sel" id="empty_firstControl">'+
            '<option>0-无优先</option>'+
            '<option>1-公交优先</option>'+
            '<option>2-VIP优先</option>'+
          '</select>'+
        '</li>'+
      '</ul>'+
    '</div>'+
    '<div class="signalLink">'+
      '<p class="signalEdit_title">通信连接信息</p>'+
      '<ul>'+
        '<li><span class="spa1">通讯类型</span><input type="text" name="" id="empty_communicationsType" class="signal_ipt1" value=""/></li>'+
        '<li><span class="spa1">信号机IP</span><input type="text" name="" id="empty_signalIp" class="signal_ipt1" value=""/></li>'+
        '<li><span class="spa1">目标IP</span><input type="text" name="" id="empty_targetIp" class="signal_ipt2" value=""/></li>'+
        '<li><span class="spa1">目标端口</span><input type="text" name="" id="empty_targetPort" class="signal_ipt1" value=""/></li>'+
      '</ul>'+
    '</div>'+
    '<div class="editBtn">'+
      '<input type="button" class="editBt1" value="保存设置" onclick="empty_addSingles()">'+
      '<input type="button" class="editBt2" value="取消" onclick="zhao_none(\'.zhao\',\'#signalEdit1\')">'+
    '</div>'+
 ' </div>'+
'</div>';
    $('body').append(nr);
}

/********信号机新的添加点*********/
function drawPoints(a){
  drawPoint.activate();
  $(a).attr("src","images/add0.png");
}
function drawCompleted(a){
    drawPoint.deactivate();//关闭绘制点
    $("#addPoints1").attr("src","images/add1.png");
}
function signal_control_drawPoint(){
  drawPoint = new SuperMap.Control.DrawFeature(featuresLayer,SuperMap.Handler.Point, { multi: true });//创建绘制点的控件
  drawPoint.style={
    fillColor:"red",
    strokeColor:"yellow",
    pointRadius:5
  };
  supermap.addLayer(featuresLayer);
  supermap.addControl(drawPoint);//添加点线面绘制控件
  drawPoint.events.on({"featureadded":drawCompleted});           
}


function addSignal_control(currentFeature){
	gmarker= this;
    var centerPoint= currentFeature.geometry.getCentroid();
     pos= new SuperMap.LonLat(centerPoint.x,centerPoint.y);                
    var point= new SuperMap.Geometry.Point(pos.lon, pos.lat);                       
    var p=supermap.getPixelFromLonLat(pos);
    var l= p.x+"px";
    var t= p.y+"px";
    $(".jt_node").css("visibility","hidden");
    $("#editControl").css({"visibility":"visible","left":l,"top":t});
    $(".look").css("display","none");
    $(".addlook").css("display","block");
}
function unFeatureSelect() {//删除点的功能
    featuresLayer.removeAllFeatures([]);
}
function kk(b){
    supermap.removeLayer(b);
    supermap.addLayer(b);
}


//协调优化评价
function setConcert(){ 
    singleSetAttribute(Flag);
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
		    '<span>单点控制性能</span>'+
		    '<img src="images/min.png" class="empty_btn empty" onclick="zhao_none(\'.zhao\',\'.concertOptimize\')"/>'+
		  '</p>'+
		  '<div class="concertMain">'+
		  	'<div class="insertUl">'+
		       	'<ul class="concertMainTitle_ul">'+
		        '<li class="mainUl_li1">'+
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
		    '<div class="concertLeft">'+
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
    $(".concertipt").css({"margin-left":"8px"});
    $("#controlType option").eq(data.entitys[6]).attr("selected", true);
    $("#majorAspect option").eq(data.entitys[7]).attr("selected", true);
    $("#followPhase option").eq(data.entitys[8]).attr("selected", true);
    $("#detectors option").eq(data.entitys[11]).attr("selected", true);
    $("#controlModel option").eq(data.entitys[12]).attr("selected", true);
    $("#firstControl option").eq(data.entitys[13]).attr("selected", true);
    getOptimizeChartsData();
}
function signalAlone_CVS(data1,data2,data3){
	var divMap=$("#map");
	var str;
	var dataLength = data1.length>data2.length?data1.length:data2.length;
	var dataLength1 = dataLength>data3.length?dataLength:data3.length;
		str = "红灯,日期时间,亮起时间,绿灯,日期时间,亮起时间,车,到达时间,灯亮起时间\n";
		for(var i=0;i<dataLength1;i++){
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
	str =  encodeURIComponent(str);
    $("#P_btn_frame1")[0].href = "data:text/csv;charset=utf-8,\ufeff"+str;
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
            min:0,
            max:150,
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
// if($("#targetSelect")[0].selectedIndex==0){
// 	option.yAxis.min=0;
// 	option.yAxis.max=150;
// }
// else if($("#targetSelect")[0].selectedIndex==2||$("#targetSelect")[0].selectedIndex==3){
// 	option.yAxis.min=0;
// 	option.yAxis.max=1;
// }
_optimize.setOption(option);
}
//标记点弹窗的弹窗的隐藏（btn）        
function zhao_none1(a){
  $(a).css("display","none");
  $(a).remove();
}
/*修改、添加、删除alert*/
function reviseAlert(obj){
  var nr='';
  nr+='<div class="pop_bg">'+
  '<div class="zhao1"></div>'+
  '<div class="pop_up">'+
    '<p class="pop_p1"><span>'+obj+'</span></p>'+
    '<p class="pop_p2"><input type="button" value="确定" onclick="zhao_none1(\'.pop_bg\')"></p>'+
  '</div>'+
'</div>';
$('body').append(nr);
}


//相位编辑器的ajax
function editorMapAttribute(){
  var gmarkerId=gmarker.id;
  var val="{ID:"+gmarkerId+"}";
  $.ajax({
     url:"GetDevice",
         dataType:"json",
         data:{ "action":"query","type":61,"val":val},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               editorMap( data );
         },
         error:function()
         {

         }
  })
  
  
}
function editorMap(data){
  $(".zhao").css("display","block");

  var poslon=new SuperMap.LonLat(gmarker.lonlat.lon,gmarker.lonlat.lat);
  var coord=poslon.transform("EPSG:900913", "EPSG:4326" ); 

  var cLon=coord.lon.toFixed(6)-0;
  var cLat=coord.lat.toFixed(6)-0;
  var nr='';
  nr+='<div class="mapControl" id="mapControl">'+
    '<div class="map_title">'+
        '<span>配置信号机参数</span>'+
        '<img src="images/min.png" class="empty_btn empty" onclick="zhao_none(\'.zhao\'),reasize(\'#mapControl\'),reset()"/>'+
    '</div>'+
   '<div class="mc_main" id="mc_main">'+
    '<div class="signalProperty">'+
      '<div class="signalNature">'+
        // '<p class="NatureTitle">信号控制机属性</p>'+
        '<ul>'+
          '<p class="NatureTitle">信号机基本信息</p>'+
          '<li><span class="spa1">设备编号</span><input type="text" readonly="readonly" id="number" class="Nature_ipt1" name="" value="'+data.entitys[0]+'"/></li>'+
          '<li><span class="spa1">设备位置</span><input type="text" readonly="readonly" id="position" class="Nature_ipt1" name="" value="'+data.entitys[1]+'"/></li>'+
          '<li><span class="spa1">主街名称</span><input type="text" readonly="readonly" id="firstStreet" class="Nature_ipt1" name="" value="'+data.entitys[2]+'"/></li>'+
          '<li><span class="spa1">次街名称</span><input type="text" readonly="readonly" id="secondStreet" class="Nature_ipt1" name="" value="'+data.entitys[3]+'"/></li>'+
          '<li><span class="spa1">经度坐标</span><input type="text" readonly="readonly" id="lon" class="Nature_ipt1" name="" value="'+cLon+'"/></li>'+
          '<li><span class="spa1">纬度坐标</span><input type="text" readonly="readonly" id="lat" class="Nature_ipt1" name="" value="'+cLat+'"/></li>'+
          '<li><span class="spa1">生产厂家</span><input type="text" readonly="readonly" id="vender" class="Nature_ipt1" name="" value="'+data.entitys[4]+'"/></li>'+
          '<li><span class="spa1">产品型号</span><input type="text" readonly="readonly" id="version" name="" class="Nature_ipt1" value="'+data.entitys[5]+'"/></li>'+
          '<li>'+
          '<span class="spa1">控制机型</span>'+
          '<select class="sel1" id="controlType" onfocus="this.defaultIndex=this.selectedIndex;" onchange="this.selectedIndex=this.defaultIndex;">'+
            '<option>0-单点自由控制机</option>'+
            '<option>1-Epics优化控制机</option>'+
            '<option>2-感应优化控制机</option>'+
            '<option>3-中心协调控制机</option>'+
          '</select>'+
          '</li>'+
          '<p class="NatureTitle">信号设置信息</p>'+
          '<li>'+
            '<span class="spa1">主要相位</span>'+
            '<select class="sel1" id="majorAspect" onfocus="this.defaultIndex=this.selectedIndex;" onchange="this.selectedIndex=this.defaultIndex;">'+
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
          '<li>'+
          '<span class="spa1">伴随相位</span>'+
          '<select class="sel1" id="followPhase" onfocus="this.defaultIndex=this.selectedIndex;" onchange="this.selectedIndex=this.defaultIndex;">'+
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
          '<li><span class="spa1">主街相位</span><input type="text" name="" readonly="readonly" id="mainStemPhase" class="Nature_ipt1" value="'+data.entitys[9]+'"/></li>'+
          '<li><span class="spa1">次街相位</span><input type="text" name="" readonly="readonly" id="secondStreetPhase" class="Nature_ipt1" value="'+data.entitys[10]+'"/></li>'+
          '<li>'+
            '<span class="spa1">检测器类</span>'+
            '<select class="sel1" id="detectors" onfocus="this.defaultIndex=this.selectedIndex;" onchange="this.selectedIndex=this.defaultIndex;">'+
              '<option>0-无检测器</option>'+
              '<option>1-视频检测</option>'+
              '<option>2-雷达检测</option>'+
              '<option>3-地磁检测</option>'+
              '<option>4-线圈检测</option>'+
              '<option>5-电子警察数据</option>'+
            '</select>'+
          '</li>'+
          '<li>'+
            '<span class="spa1">控制模式</span>'+
            '<select class="sel1" id="controlModel" onfocus="this.defaultIndex=this.selectedIndex;" onchange="this.selectedIndex=this.defaultIndex;">'+
              '<option>0-单点定时</option>'+
              '<option>1-感应控制</option>'+
              '<option>2-干道协调</option>'+
              '<option>3-区域协调</option>'+
            '</select>'+
          '</li>'+
          '<li>'+
            '<span class="spa1">优先控制</span>'+
            '<select class="sel1" id="firstControl" onfocus="this.defaultIndex=this.selectedIndex;" onchange="this.selectedIndex=this.defaultIndex;">'+
              '<option>0-无优先</option>'+
              '<option>1-公交优先</option>'+
              '<option>2-VIP优先</option>'+
            '</select>'+
          '</li>'+
          '<p class="NatureTitle">通信连接信息</p>'+
          '<li><span class="spa1">通讯类型</span><input type="text" name="" readonly="readonly" id="communicationsType" class="Nature_ipt1" value="'+data.entitys[14]+'"/></li>'+
          '<li><span class="spa1">信号机IP</span><input type="text" name="" class="Nature_ipt1" id="signalIp"  value="'+data.entitys[15]+'"/></li>'+
		  '<li><span class="spa1">目标IP</span><input type="text" name="" class="Nature_ipt1" id="targetIp"  value="'+data.entitys[16]+'"/></li>'+
		  '<li><span class="spa1">目标端口</span><input type="text" name="" class="Nature_ipt1" id="targetPort"  value="'+data.entitys[17]+'"/></li>'+
        '</ul>'+
      '</div>'+
    '</div>'+
    '<div id="map1"></div>'+
    '<div class="iconList">'+
      '<p class="iconList_title">路口渠化标志选择</p>'+
      '<ul>'+
          '<div class="img_kuang aa icon_0"></div>'+
          '<div class="img_kuang icon_1"></div>'+
          '<div class="img_kuang icon_2"></div>'+
          '<div class="img_kuang icon_3"></div>'+
          '<div class="img_kuang icon_4"></div>'+
          '<div class="img_kuang icon_5"></div>'+
          '<div class="img_kuang icon_6"></div>'+
          '<div class="img_kuang icon_7"></div>'+
          '<div class="img_kuang icon_8"></div>'+
          '<div class="img_kuang icon_9"></div>'+
      '</ul>'+
      '<div class="mapEdit" id="mapEdit">'+
      '<ul>'+
      '<p class="iconList_title" style="margin-top:0;">路段属性</p>'+
          '<li id="googleLineAttr" style="margin-bottom: 8px !important;"><input style="width:50px;" id="googleNode" type="number" min="0" data="node_id" placeholder="节点" name="" class="Nature_ipt1" value=""/><input style="width:50px;" id="googleFrom_Node" type="number" min="0" data="from_link_id" placeholder="驶入" name="" class="Nature_ipt1" value=""/><input style="width:50px;" id="googleTo_Node" type="number" min="0" data="to_link_id" placeholder="驶出" name="" class="Nature_ipt1" value=""/></li>'+
//        '<li style="margin-bottom:4px;"><input style="width:80px" id="googleFlow" type="number" min="0" data="flow" placeholder="驶入路段流量" name="" class="Nature_ipt1" value=""/></li>'+//margin-left: 2px;padding-left:0 !important
      '</ul>'+
        '<p class="NatureTitle">信号灯组设置</p>'+
        '<ul id="setSignal" type="insert">'+
          '<li><span class="spa1">灯组名称</span><input type="text" name="" class="Nature_ipt1" readonly="readonly" value="信号相位"/></li>'+
          '<li><span class="spa1">灯组属性</span><input data="ph" type="text" name="" class="Nature_ipt1 js-inp-val" id="ph" value=""/>'+
          '</li>'+
          '<li><span class="spa1">旋转角度</span><input data="an" type="text" name="" class="Nature_ipt1 js-inp-val" id="an" value=""/></li>'+
          '<li><span class="spa1">相位周期</span><input data="pe" type="text" name="" class="Nature_ipt1 js-inp-cyc" id="cyc" value=""/></li>'+
          '<li><span class="spa1">黄灯开始</span><input data="y" type="text" name="" class="Nature_ipt1 js-inp-yel" id="yel" value=""/></li>'+
          '<li><span class="spa1">绿灯开始</span><input data="g" type="text" name="" class="Nature_ipt1 js-inp-gre" id="gre" value=""/></li>'+
          '<li style="display:none;"><span class="spa1">绿信比</span><input data="off" type="text" name="" class="Nature_ipt1 js-inp-off" id="off" value="0"/></li>'+
          '<li><span class="spa1">饱和流率</span><input data="flow" type="text" name="" class="Nature_ipt1" id="flow" value=""/></li>'+
          '<li><span class="spa1">经度坐标</span><input type="text" name="" class="Nature_ipt1" id="js-lat" value=""/></li>'+
          '<li><span class="spa1">纬度坐标</span><input type="text" name="" class="Nature_ipt1" id="js-lng" value=""/></li>'+
        '</ul>'+
      '</div>'+
      '<div class="SignalBtn">'+
        '<input type="button" class="SignalBtn1" value="保存设置" onclick="markerdata()">'+
        '<input type="button" class="SignalBtn2"  value="取消" onclick="zhao_none(\'.zhao\',\'#mapControl\')"> '+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>';
$('body').append(nr);
$(".sel1").css("margin-left","8px");
$(".NatureTitle").css({"font-size":"0.8em"});
$("#controlType option").eq(data.entitys[6]).attr("selected", true);
    $("#majorAspect option").eq(data.entitys[7]).attr("selected", true);
    $("#followPhase option").eq(data.entitys[8]).attr("selected", true);
    $("#detectors option").eq(data.entitys[11]).attr("selected", true);
    $("#controlModel option").eq(data.entitys[12]).attr("selected", true);
    $("#firstControl option").eq(data.entitys[13]).attr("selected", true);
    xintu();
    mapCur=map;
    BoundsTimeOut();
    function BoundsTimeOut(){
    	setTimeout(function(){
    	googleNodeAjax();
    	googleRoadAjax(map);
	},1000);
    };
    
//  var onload = true;
//	google.maps.event.addDomListener(map, 'tilesloaded', function(){
//		if(onload){
//			googleNodeAjax();
//  		googleRoadAjax(map);
//  		onload = false;
//		}
//	});
	
	var gmarkerId=gmarker.id;
	bFlagDelete=true;
  	getSignalPhaseMap(gmarkerId);
  	signalConfig(8);
}
/*控制区域添加*/
function addAreaName(){//创建大的分区的创建属性框
  $(".zhao").css("display","block");
  var nr=''; 
  //console.log(arrRegion);
  //初始创建控制区域的弹窗
  nr+='<div class="addArea">'+
          '<p class="areaTitle">创建区域控制<img src="images/min.png" class="closeBtn" onclick="zhao_none(\'.zhao\',\'.addArea\')"/></p>'+
          '<ul class="areaUl">'+
            '<li><span>区域名称</span><input type="text" value="控制区域-" id="areaName" /></li>'+
            '<div class="areaBtn">'+
              '<input type="submit" value="保存创建" class="areabtn1" />'+
              '<input type="button" value="取消" class="areabtn2" onclick="zhao_none(\'.zhao\',\'.addArea\')"/>'+
            '</div>'+
          '</ul>'+
        '</div>';
$('body').append(nr);

$(".areabtn1").click(function(){//大的分区级下面的三个子项
   newRegion();
   zhao_none('.zhao','.addArea');
    
})
}

//干道协调
function addGroupset(regionID,type){
    $(".zhao").css("display","block");
    var nr='';
  //创建干道协调的弹窗
  nr+='<div class="addGroup">'+
          '<p class="areaTitle">创建干道协调分组<img src="images/min.png" class="closeBtn" onclick="zhao_none(\'.zhao\',\'.addGroup\')"/></p>'+
          '<ul class="areaUl">'+
            '<li><span>分组名称</span><input type="text" value="协调组-" id="groupName" /></li>'+
            '<li><span>位置名称</span><input type="text" value="" id="areaPositionName" /></li>'+
            '<div class="areaBtn">'+
              '<input type="submit" value="保存创建" class="areabtn1" />'+
              '<input type="button" value="取消" class="areabtn2" onclick="zhao_none(\'.zhao\',\'.addGroup\')"/>'+
            '</div>'+
          '</ul>'+
        '</div>';
$('body').append(nr);
  $(".areabtn1").click(function(){
  	var groupName=$("#groupName").val();
    var subName=$("#areaPositionName").val();
    newGroup(regionID,type,groupName,subName);
    zhao_none(".zhao",".addGroup");
  })
}

//function GroupNameRemove(ele){//干道协调里的分组删除
//      $(ele).parent().parent().parent().parent().remove();
//}

/*区域分组*/
function addLittleArea(regionID,type){
  $(".zhao").css("display","block");
  var nr='';
  //创建区域分组的弹窗
  nr+='<div class="LittleArea">'+
          '<p class="areaTitle">创建干道协调分组<img src="images/min.png" class="closeBtn" onclick="zhao_none(\'.zhao\',\'.LittleArea\')"/></p>'+
          '<ul class="areaUl">'+
            '<li><span>分区名称</span><input type="text" value="区域组-" id="LittlegroupName" /></li>'+
            '<li><span>位置名称</span><input type="text" value="" id="LittlePositionName" /></li>'+
            '<div class="areaBtn">'+
              '<input type="submit" value="保存创建" class="areabtn1" />'+
              '<input type="button" value="取消" class="areabtn2" onclick="zhao_none(\'.zhao\',\'.LittleArea\')"/>'+
            '</div>'+
          '</ul>'+
        '</div>';
$('body').append(nr);
  $(".areabtn1").click(function(){
  	var groupName=$("#LittlegroupName").val();
    var subName=$("#LittlePositionName").val();
    newGroup(regionID,type,groupName,subName);
    zhao_none(".zhao",".LittleArea");
  })
 }
  


/**右键marker点添加道干道协调**/
//marker点添加道干道协调
function markerRightAttribute(){
  var gmarkerId=gmarker.id;
  var val="{ID:"+gmarkerId+"}";
  $.ajax({
     url:"GetDevice",
         dataType:"json",
         data:{ "action":"query","type":61,"val":val},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               addGroupSiganlset( data );
         },
         error:function()
         {

         }
  })
}
function addAnnunciator(regionID,groupID,ele,type){
	Annunciator_regionID = regionID;
	Annunciator_groupID = groupID;
	Annunciator_type = type;
    $(".area_all input").attr("checked",false); 
    $(".area_all .li_words p").css("color","#000");
    $(ele).attr("checked",true); 
   	$(ele).parent().next(".li_words").children("p").css("color","red");
}

var signal_id,signal_name;
function addGroupSiganlset(data){
  signal_id = data.entitys[0];
  signal_name = data.entitys[1];
  
  newAnnunciator(Annunciator_regionID, Annunciator_groupID, Annunciator_type, signal_name,1,signal_id)
}


//区域协调动态监控
// function areaViewSetup(){
//   $(".zhao").css("display","block");
//   var content='';
//   content+='<div class="areaView" id="areaView" >'+
//         '<p class="areaViewTitle">'+
//           '<span id="view">区域协调动态监控-区域组1</span>'+
//           '<img src="images/min.png" class="empty_btn areaViewClose" onclick="zhao_none(\'.zhao\',\'.areaView\')">'+
//         '</p>'+
//         '<div class="viewContent">'+
//           '<div class="showCharts"><img src="images/t1_03.png"></div>'+
//           '<div class="listCharts">'+
//             '<div class="ArealistAll">'+
//               '<ul class="signalChoiceUl">'+
//                 '<p class="listCharts_title">信号路口选择</p>'+
//                 '<li>'+
//                   '<label for="signal_1" ><input type="checkbox" name="signalCheck1" id="signal_1" />'+
//                     '<div class="li_words"><p class="identifier">Epic-1</p><p class="roadName">北苑路口</p></div>'+
//                   '</label> '+
//                 '</li>'+
//               '</ul>'+
//               '<ul class="phaseChoiceUl">'+
//                 '<p class="signalPhase_title">信号相位选择</p>'+
//                 '<li> '+
//                   '<label for="phaseleft" ><input type="checkbox" name="phaseCheck1" id="phaseleft" />'+
//                     //'<div class="li_words"><p class="identifier">Epic-1</p><p class="roadName">北苑路口</p></div>'+
//                     '<span>左转相位</span>'+
//                   '</label> '+
//                 '</li>'+
//                 '<li> '+
//                   '<label for="phaseup" ><input type="checkbox" name="phaseCheck2" id="phaseup" />'+
//                     '<span>直行相位</span>'+
//                   '</label> '+
//                 '</li>'+
//                 '<li> '+
//                   '<label for="phaseright" ><input type="checkbox" name="phaseCheck3" id="phaseright" />'+
//                     '<span>右转相位</span>'+
//                   '</label> '+
//                 '</li>'+
//                 '<li> '+
//                   '<label for="cardata" ><input type="checkbox" name="phasecheck4" id="cardata" />'+
//                     '<span>车辆数据</span>'+
//                   '</label> '+
//                 '</li>'+
//               '</ul>'+
//               '<ul class="oldTimeUl">'+
//                 '<p class="oldTime_title">历史时空图</p>'+
//                 '<li><span>查看日期</span><input type="text" id="Area_date" class="date" value="" onClick="jeDate({dateCell:\'#Area_date\',isTime:true,format:\'YYYY-MM-DD\'})"/></li>'+
//                 '<li><span>开始时间</span><input type="text" id="Area_time" value="" onClick="jeDate({dateCell:\'#Area_time\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/></li>'+
//                 '<li><span>查看周期</span>'+
//                   '<select class="timeSelect">'+
//                     '<option>1h</option>'+
//                     '<option>2h</option>'+
//                     '<option>3h</option>'+
//                     '<option>4h</option>'+
//                     '<option>5h</option>'+
//                     '<option>6h</option>'+
//                     '<option>7h</option>'+
//                     '<option>8h</option>'+
//                     '<option>9h</option>'+
//                     '<option>10h</option>'+
//                     '<option>11h</option>'+
//                     '<option>12h</option>'+
//                     '<option>13h</option>'+
//                     '<option>14h</option>'+
//                     '<option>15h</option>'+
//                     '<option>16h</option>'+
//                     '<option>17h</option>'+
//                     '<option>18h</option>'+
//                     '<option>19h</option>'+
//                     '<option>20h</option>'+
//                     '<option>21h</option>'+
//                     '<option>22h</option>'+
//                     '<option>23h</option>'+
//                     '<option>24h</option>'+
//                   '</select>'+
//                 '</li>'+
//                 '<p class="btn_p_frame"><input type="button" value="确定" class="area_btn" /></p>'+
//               '</ul>'+
//             '</div>'+
//           '</div>'+
//           '<div class="viewFooter">'+
//             '<ul class="signalIds">'+
//               '<li class="firstName">信号机ID</li>'+
//               '<li class="signalId" title="">'+data.entitys[0][0]+'</li>'+
//               '<li class="signalId" title="">'+data.entitys[1][0]+'</li>'+
//               '<li class="signalId" title="">'+data.entitys[2][0]+'</li>'+
//               '<li class="signalId" title="">'+data.entitys[3][0]+'</li>'+
//               '<li class="signalId" title="">'+data.entitys[4][0]+'</li>'+
//               '<li class="signalId" title=""></li>'+
//               '<li class="signalId" title=""></li>'+
//               '<li class="signalId" title=""></li>'+
//               '<li class="signalId" title=""></li>'+
//               '<li class="signalId" title=""></li>'+
//               '<li class="signalId" title=""></li>'+
//               '<li class="signalId" title=""></li>'+
//               '<li class="signalId" title=""></li>'+
//               '<li class="signalId" title=""></li>'+
//               '<li class="signalId" title=""></li>'+
//               '<li class="signalId" title=""></li>'+
//             '</ul>'+
//             '<ul class="signalPeriods">'+
//               '<li class="firstName">信号周期</li>'+
//               '<li class="signalWhite">'+data.entitys[0][2]+'s</li>'+
//               '<li class="signalWhite">'+data.entitys[1][2]+'s</li>'+
//               '<li class="signalWhite">'+data.entitys[2][2]+'s</li>'+
//               '<li class="signalWhite">'+data.entitys[3][2]+'s</li>'+
//               '<li class="signalWhite">'+data.entitys[4][2]+'s</li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//             '</ul>'+
//             '<ul class="phaseDifferences">'+
//               '<li class="firstName">相位差</li>'+
//               '<li class="signalWhite">'+data.entitys[0][3]+'s</li>'+
//               '<li class="signalWhite">'+data.entitys[1][3]+'s</li>'+
//               '<li class="signalWhite">'+data.entitys[2][3]+'s</li>'+
//               '<li class="signalWhite">'+data.entitys[3][3]+'s</li>'+
//               '<li class="signalWhite">'+data.entitys[4][3]+'s</li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//             '</ul>'+
//             '<ul class="greenRatios">'+
//               '<li class="firstName">绿信比</li>'+
//               '<li class="signalWhite">'+data.entitys[0][4]+'s</li>'+
//               '<li class="signalWhite">'+data.entitys[1][4]+'s</li>'+
//               '<li class="signalWhite">'+data.entitys[2][4]+'s</li>'+
//               '<li class="signalWhite">'+data.entitys[3][4]+'s</li>'+
//               '<li class="signalWhite">'+data.entitys[4][4]+'s</li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//               '<li class="signalWhite"></li>'+
//             '</ul>'+
//           '</div>'+
//         '</div>'+
//       '</div>';
//       $('body').append(content);
//       linecharts();
// }

var data={entitys:
  [
    [1,"2016121123000",120,15,5,"1,2,2,3,3,1,4,2,5,3,6,3,7,2,8,1"],
    [2,"2016121123000",90,30,5,"1,1,2,2,3,3,4,1,5,1,6,1,7,2,8,1"],
    [3,"2016121123000",120,20,5,"1,2,2,3,3,2,4,2,5,2,6,3,7,2,8,1"],
    [4,"2016121123000",60,5,5,"1,3,2,1,3,1,4,3,5,1,6,3,7,2,8,1"],
    [5,"2016121123000",90,10,5,"1,2,2,3,3,2,4,2,5,3,6,3,7,2,8,1"]
  ]
}
//干道协调动态监控
var paramData = [[1,60,1,0,"sy","sr","sg",5,20,35],[1,60,2,0,"sy","sr","sg",5,20,35],[2,80,1,500,"sy","sr","sg",5,20,55],[2,80,2,500,"sy","sr","sg",5,20,55],[3,90,1,1000,"sy","sr","sg",5,35,50],[3,90,2,1000,"sy","sr","sg",5,35,50]];
var signalsArr = [];
function getSignalData(signals_id_arr){
	for(var itemSignal in signals_id_arr){
		singleSetAttribute('',itemSignal);
	}
}
function lineViewShow(ele){
	if(!$.isEmptyObject(signalDataMap)){
		lineViewSetup(ele);
	}else{
		setTimeout(function(){
			lineViewShow(ele);
		},1000)
	}
}
function lineViewSetup(ele){
	
	param_old = [];
	param_new = [];
if(ele){
		intersectionSignal_id = [];
		signalsArr = [];
		var ID = $(ele).parents("li").attr("id").split("_");
		signals_id_arr = alldata[ID[2]].coordination[ID[3]].groupid[ID[4]].signals;//获取协调分组——所有信号机 object id 
		for(var i in signals_id_arr){
			intersectionSignal_id.push(signals_id_arr[i].id);
			signalsArr.push(signals_id_arr[i].name);
		}
}
getSignalData(signals_id_arr);


	zhao_none('.zhao','.areaView');//初始进入时多次点击 去掉多建的弹窗
		//信号机参数ajax
	getSignalAjax();

  $(".zhao").css("display","block");
  var content='';
  var _date = getNowFormatDate();
  var optionHtml='';
	for(var itemI=0;itemI<intersectionSignal_id.length;itemI++){
		optionHtml+='<option>'+intersectionSignal_id[itemI]+'</option>';
	}
  content+='<div class="areaView1" id="areaView">'+
        '<p class="areaViewTitle">'+
          '<span id="view">干线协调控制设置-干线组1</span>'+
          '<img src="images/min.png" class="empty_btn areaViewClose" onclick="zhao_none(\'.zhao\',\'.areaView1\')">'+
        '</p>'+
        '<div class="insertUl">'+
		   '<ul class="concertMainTitle_ul">'+
		        '<li class="mainUl_li1 titleLi1">'+
		          '<span>日期选择</span>'+
		          '<input type="text" id="concertDays" value="2016-04-01" onClick="jeDate({dateCell:\'#concertDays\',isTime:true,format:\'YYYY-MM-DD\'})"/>'+
		        '</li>'+
		        '<li class="mainUl_li4">'+
		          '<span>协调控制时间段</span>'+
		          '<input type="text" id="timeDuan" value="09:00-12:00"/>'+
		        '</li>'+
		        '<li class="mainUl_li4">'+
		          '<span>查看历史时空图数据</span>'+
		          '<input type="text" id="skTime" value="2016-04-01" onClick="jeDate({dateCell:\'#skTime\',isTime:true,format:\'YYYY-MM-DD\'})"/>'+
		        '</li>'+
		      '</ul>'+
		'</div>'+
        '<div class="viewContent">'+
          '<div class="showCharts" id="lineView"></div>'+
        '</div>'+
        '<div class="signal_Set">'+
        	'<p class="setTitle_words">干线协调参数设置</p>'+
        	'<ul class="signalSetUL">'+
        		'<li>'+
        			'<span class="li_s1">信号周期</span>'+
        			'<span class="li_s1">信号机ID</span>'+
        			'<span class="li_s2">'+intersectionSignal_id[0]+'</span>'+
        			'<span class="li_s2">'+intersectionSignal_id[0]+'</span>'+
        			'<span class="li_s2">'+intersectionSignal_id[1]+'</span>'+
        			'<span class="li_s2">'+intersectionSignal_id[1]+'</span>'+
        			'<span class="li_s2">'+intersectionSignal_id[2]+'</span>'+
        			'<span class="li_s2">'+intersectionSignal_id[2]+'</span>'+
        			'<span class="li_s2"></span>'+
        			'<span class="li_s2"></span>'+
        			'<span class="li_s2"></span>'+
        			'<span class="li_s2"></span>'+
        			'<span class="li_s2"></span>'+
        			'<span class="li_s2"></span>'+
        		'</li>'+
        		'<li>'+
        			'<input type="text" value="'+paramData[0][1]+'" class="li_ipt1">'+
        			'<span class="li_s1">协调相位</span>'+
        			'<input type="text" class="li_ipt2" value="4">'+
        			'<input type="text" class="li_ipt2" value="8">'+
        			'<input type="text" class="li_ipt2" value="4">'+
        			'<input type="text" class="li_ipt2" value="8">'+
        			'<input type="text" class="li_ipt2" value="4">'+
        			'<input type="text" class="li_ipt2" value="8">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        		'</li>'+
        		'<li>'+
        			'<span class="li_s1">协调速度</span>'+
        			'<span class="li_s1">绿<i style="margin-left:4.5px"></i>信<i style="margin-left:4.5px"></i>比</span>'+
        			'<input type="text" class="li_ipt2" value="'+paramData[0][9]+'">'+
        			'<input type="text" class="li_ipt2" value="'+paramData[1][9]+'">'+
        			'<input type="text" class="li_ipt2" value="'+paramData[2][9]+'">'+
        			'<input type="text" class="li_ipt2" value="'+paramData[3][9]+'">'+
        			'<input type="text" class="li_ipt2" value="'+paramData[4][9]+'">'+
        			'<input type="text" class="li_ipt2" value="'+paramData[5][9]+'">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        		'</li>'+
        		'<li>'+
        			'<input type="text" value="45km/h" class="li_ipt1">'+
        			'<span class="li_s1">相<i style="margin-left:4.5px"></i>位<i style="margin-left:4.5px"></i>差</span>'+
        			'<input type="text" id="li_ipt1" class="li_ipt2" value="0">'+
        			'<input type="text" id="li_ipt2" class="li_ipt2" value="0">'+
        			'<input type="text" id="li_ipt3" class="li_ipt2" value="10">'+
        			'<input type="text" id="li_ipt4" class="li_ipt2" value="10">'+
        			'<input type="text" id="li_ipt5" class="li_ipt2" value="20">'+
        			'<input type="text" id="li_ipt6" class="li_ipt2" value="20">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        			'<input type="text" class="li_ipt2" value="">'+
        		'</li>'+
        	'</ul>'+
        	'<ul class="btnUl">'+
        		'<li>'+
        			'<input type="button" value="拷贝参数">'+
        		'</li>'+
        		'<li>'+
        			'<input type="button" value="粘贴参数">'+
        		'</li>'+
        		'<li>'+
        			'<input onclick="querylineViewAjax()" type="button" value="确定修改">'+
        		'</li>'+
        		'<li>'+
        			'<input type="button" value="启用控制">'+
        		'</li>'+
        	'</ul>'+
        '</div>'+
      '</div>';
      $('body').append(content);
  
	  cc = Curve.init("lineView");
	  signalDataMap;
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
   		checked ='';
   		index++;
   	}
   	// $("#signalChoiceUl").append(_html);
	// $(".signalChoiceUl input").click(function(){
	// 	$(this).prop("checked",false);
	// 	$(".sonCheck input").prop("checked",false);
	// })  
	// $(".sonCheck input").click(function(){
	// 	$(".signalChoiceUl input").prop("checked",false);
	// 	$(this).prop("checked",true);
	// 	$(this).parent().parent().siblings("input").prop("checked",true);
	// }) 
	
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
function timeChange(num){
	var num=num+"";
	return num=num.length>1?num:0+num;
}
var testMin=0;
function lineViewAjax(date){
	var time;
	if(date){
		time = getNowFormatDate()+" 00:00:00";
	}
//	time = $("#concertDay").val();
time = getNowFormatDate()+" 00:00:48";
	
	var pa =intersectionSignal_id.join(",")+","+time;
	
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
function querylineViewAjax(){
	var time;
	var phaseoff = [[8,1,0],[8,2,0],[9,1,10],[9,2,10],[10,1,20],[10,2,20]];
	phaseoff[0][2] = $("#li_ipt1").val();
	phaseoff[1][2] = $("#li_ipt2").val();
	phaseoff[2][2] = $("#li_ipt3").val();
	phaseoff[3][2] = $("#li_ipt4").val();
	phaseoff[4][2] = $("#li_ipt5").val();
	phaseoff[5][2] = $("#li_ipt6").val();
	var arrState=[],arrLine=[];
	var time =48;
	var strResult,le=[];
	var nI=0,nSum=0,paramHeader=4;
	nI=(param_new[0].length-paramHeader)/2;
	for(var i=0;i<param_new.length;i++){
		nSum = 0;
			if(param_new[i][2] == phaseoff[i][1]&&param_new[i][0] == phaseoff[i][0]){
				arrLine=[];
				le.push((phaseoff[i][2]+time)%param_new[i][1]);
				arrLine.push(phaseoff[i][0]);arrLine.push(phaseoff[i][1]);arrLine.push(45);
				
				for(var j=0;j<nI;j++){
					nSum+=(param_new[i][paramHeader+nI+j]);
					if( le[i]<=nSum ){
						strResult+="45,";
						var ti=le-(nSum-(param_new[i][paramHeader+nI+j]));
						arrLine.push(j);
						//strResult+=(le-(nSum-(param_new[i][paramHeader+nI+j])))+";";
						arrLine.push(le[i]-(nSum-(param_new[i][paramHeader+nI+j])));
						arrState.push(arrLine);
						break;
					}
				}
			}
	}
	for(var i=0;i<arrState.length;i++){
		arrState[i] = arrState[i].join(",");
	}
	canvas(param_new,arrState.join(";"),0,0,0,0,0,0);
//	 $.ajax({
//      url:"GetSignalData",
//      dataType:"text",
//      data:{ "action":"query","type":"20","pa":pa},
//      contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
//      beforeSend:function(){  },
//      success: function( data, textStatus, jqXHR ){
//			canvas(param_new,data,0,0,0,0,0,0);
//      },
//      error:function(){}
//  });

}
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
			paramData:param,//param
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
function linecharts(){//干道协调里的图表
    var _lineView = echarts.init(document.getElementById('lineView'));
    var line1 = [];
    for (var i=0; i<7;i++){
        var ii =[{
            type: 'line',
            symbol:'none',
            itemStyle : {
                normal : {
                    color:'red',
                    lineStyle:{
                        color:'red'
                    }
                }
            },
            data: []
        },
        {
            type: 'line',
            symbol:'none',
            itemStyle : {
                normal : {
                    color:'green',
                    lineStyle:{
                        color:'green'
                    }
                }
            },
            data: []
        },
        {
            type: 'line',
            symbol:'none',
            itemStyle : {
                normal : {
                    color:'yellow',
                    lineStyle:{
                        color:'yellow'
                    }
                }
            },
            data: []
        }
        ]
        line1.push(ii[0]);
        line1.push(ii[1]);
        line1.push(ii[2]);
    }
option_line = {
    backgroundColor:"#fff",
    legend: {
        left: 'left',
    },
    xAxis: {
        min:0,
        max:240,
        type: 'value',
        name: 's',
        splitLine: {show: false}
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: {
        min:-500,
        max:10000,
        axisLabel : {
                formatter: '{value} m'
            },
        type: 'value',
        name: '距离m'
    },
    series:line1
};
if (option_line && typeof option_line === "object") {
    option_line.series[0].data = [['0','0'], ['36','0'],'-',['77','0'],['137','0']];
    option_line.series[1].data = [['42','0'],['72','0'],'-',['142','0'],['178','0']];
    option_line.series[2].data = [['36','0'],['42','0'],'-',['72','0'],['77','0'],'-',['137','0'],['142','0']];
    
    option_line.series[3].data = [['0','720'], ['20','720'],'-',['60','720'],['120','720']];
    option_line.series[4].data = [['25','720'],['55','720'],'-',['125','720'],['155','720']];
    option_line.series[5].data = [['20','720'],['25','720'],'-',['55','720'],['60','720'],'-',['120','720'],['125','720']];
    
    option_line.series[6].data = [['0','2190'], ['8','2190'],'-',['54','2190'],['144','2190']];
    option_line.series[7].data = [['13','2190'],['49','2190'],'-',['149','2190'],['179','2190']];
    option_line.series[8].data = [['8','2190'],['13','2190'],'-',['49','2190'],['54','2190'],'-',['144','2190'],['149','2190']];
    
    option_line.series[9].data = [['41','4260'], ['101','4260'],'-',['147','4260'],['207','4260']];
    option_line.series[10].data = [['0','4260'],['36','4260'],'-',['106','4260'],['142','4260']];
    option_line.series[11].data = [['36','4260'],['41','4260'],'-',['101','4260'],['106','4260'],'-',['142','4260'],['147','4260']];
    
    option_line.series[12].data = [['17','5920'], ['77','5920'],'-',['123','5920'],['173','5920']];
    option_line.series[13].data = [['0','5920'],['12','5920'],'-',['82','5920'],['118','5920']];
    option_line.series[14].data = [['12','5920'],['17','5920'],'-',['77','5920'],['82','5920'],'-',['118','5920'],['123','5920']];
    
    option_line.series[15].data = [['0','6770'], ['30','6770'],'-',['70','6770'],['130','6770']];
    option_line.series[16].data = [['35','6770'],['65','6770'],'-',['135','6770'],['171','6770']];
    option_line.series[17].data = [['30','6770'],['35','6770'],'-',['65','6770'],['70','6770'],'-',['130','6770'],['135','6770']];
    
    option_line.series[18].data = [['0','8440'], ['6','8440'],'-',['52','8440'],['112','8440']];
    option_line.series[19].data = [['11','8440'],['47','8440'],'-',['117','8440'],['152','8440']];
    option_line.series[20].data = [['6','8440'],['11','8440'],'-',['47','8440'],['52','8440'],'-',['112','8440'],['117','8440']];
}
    _lineView.setOption(option_line);
}
function insertChartsSiganl(a){
   // var signal_li=$(a).parent().parent().next('ul').children("li");
    var content='';
    content+='<li>'+
                '<label for="signal_1">'+
                    '<input type="checkbox" name="signalCheck1" id="signal_1">'+
                    '<div class="li_words">'+
                        '<p class="identifier">Epic-1</p>'+
                        '<p class="roadName">北苑路口</p>'+
                    '</div>'+
                '</label>'+
            '</li>';
    $(".signalChoiceUl").append(content);
}

function markerAttrClick(cur)
{
	markerAttrAjax(cur);
}

function markerRightClick(ma)
{
	signal_lightDIV(ma);
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
