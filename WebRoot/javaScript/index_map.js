var roadID,node_ID,beforeGroup,simulat_start_time;
var  _id = "";
var lineVector1= [];
var publiclineColor = [];
// var roadFlag=0;
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
              EventUtil.addHandler("contextmenu",function(event){
                event= EventUtil.getEvent(event);
                EventUtil.preventDefault(event);
             });
              EventUtil.addHandler(document,"click",function(event){
                  $(".all_tc").css("visibility","hidden");  
             });
        });
        //  function vectorLayer(){ //小区图层加载       
        //     supermap.addLayer(vector);
        // }
        // function odHouse(){     
        //     supermapOD.addLayer(vectorOD);
        //     oDxiaoqu();
        // }
         function LayerCreation(){
                for(var x=0;x<24;x++){
                var featuresLayer = "featuresLayer"+x;
                var featuresLayerObj="new SuperMap.Layer.Vector()";
                eval(featuresLayer+"="+featuresLayerObj);
              }
            for(var i=0;i<50;i++){
                var markerlayer = "markerlayer"+i;
                var markerObj="new SuperMap.Layer.Markers('markerLayer"+i+"')";
                eval(markerlayer+"="+markerObj);
            }

                vector = new SuperMap.Layer.Vector("vector");//小区
                vector1 = new SuperMap.Layer.Vector("vector1"); //路网
                //vectorSG = new SuperMap.Layer.Vector("vectorSG"); //路网
            }
    
// function HOUSE(feature){    
//     gmarker= this;        
//     var centerPoint= feature.geometry.getBounds().getCenterLonLat();
//     var pos= new SuperMap.LonLat(centerPoint.x,centerPoint.y);                
//     var p=supermap.getPixelFromLonLat(centerPoint);
//     var l= p.x+"px";
//     var t= p.y+"px";
//     $(".jt_node").css("visibility","hidden");
//     $("#village").css({"visibility":"visible","left":l,"top":t});                           
// }
function getVillageId(argument){//小区ID的选择
    if($("#AreaNumber")){
        _id =argument.id;
        $("#AreaNumber").val(_id);
    }
    if(beforeGroup == argument){
        return;
    }
    argument.style={
                    fillColor:"blue",
                    fillOpacity:"0.6",
                    stroke:"true",
                    strokeColor:"#EE9900",
                    labelSelect:"true",
                };
    if(beforeGroup){
          beforeGroup.style={
                    fillColor:"#ee9900",
                    fillOpacity:"0.4",
                    stroke:"true",
                    strokeColor:"#EE9900",
                    labelSelect:"true",
               }; 
    };
    beforeGroup = argument;
    vector.redraw();
}   
//小区中心点
function villageCenter(){
    $.ajax({
        url:"GetDevice",
        dataType:"json",
        data:{ "action":"query","type":"160"},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
            getVillageCenter( data );
        },
        error:function(){}
    });
}
function getVillageCenter(data){
    var markerlayer3=supermap.getLayersByName("markerLayer3");
    if( data ){
        if( data.total != 0 )
        {
            for( var item in data.entitys ){
              
               var dot = data.entitys[item][1];
               var lonlat = SuperMap.LonLat.fromString(dot);
                var size = new SuperMap.Size(16,18);
                var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
                var icon = new SuperMap.Icon('./theme/images/marker.png', size, offset);
                marker =new SuperMap.Marker(lonlat,icon) ;
                marker.id=data.entitys[item][0];
                markerlayer3[0].addMarker(marker);
                marker.events.on({"rightclick":villagesDIV,"scope": marker});
            }
        }
    }
};
//小区中心弹出的显示隐藏
function villagesDIV(){   
    gmarker= this;
    var p= supermap.getPixelFromLonLat(gmarker.lonlat);
    var l=p.x+"px";
    var t=p.y+"px";
    $(".jt_node").css("visibility","hidden");
    $("#villages").css({"visibility":"visible","left":l,"top":t});      
}
        
/*******************************/
function removeFeature(ind,feaObj) {//删除点的功能 
    var markerlayer=supermap.getLayersByName("markerLayer"+ind);
    markerlayer[0].removeMarker(feaObj);
}
function markerRightClick(ma)
{
    getMarkerAttr(); 
}

function markerAttrRightClick(cur)
{
    
}
        
        // 左键点击查属性
        function markerAttrClick(cur)
        {
            var ind,id,val;
            id=cur.substring(cur.indexOf("_")+1,cur.length);
            ind=parseInt(cur.substring(0,cur.indexOf("_")));

            var va
            va=getDataType(ind,1);
            va=va.split(",");
            
            val="{ID:"+id+"}";
            m_flagAttr=1;
            ajax_Marker(va[0],'query',va[1],2,ind,val);
            
            if($('#ipt'+ind+'_'+ind).prop("checked")==true){ //右侧事件check特殊处理
                if($('#scenario'+cur).prop("checked")==false)
                    $('#scenario'+cur).attr("checked",false);
                //else
                //  $('#scenario'+cur).attr("checked",true);
            }
            
        }

function addMarker2Map( arg )
{
    var lonlat,size,offset,id,markerlayer;
    if( m_dataNum>0 ){
        markerlayer=supermap.getLayersByName("markerLayer"+m_dataNum);
        lonlat = getLonlatFromMap(arg);
        size = new SuperMap.Size(20,22);
        offset = new SuperMap.Pixel(-(size.w/2), -size.h);
        id=m_dataNum+"_"+getMaxMarkerid(m_dataNum);
        markerCreate(markerlayer[0],lonlat,size,offset,id,'./theme/images/'+m_dataNum+'.0.png',2);
        $("#sign"+m_dataNum).attr("src","images/mark_hui0.png");
        m_dataNum=0;
    }
}

var m_dataNum=0;
function newPoint( dataNum )
{
    $("#sign"+dataNum).attr("src","images/mark_red1.png");
    m_dataNum = dataNum;
}

function listLeftClick(url,action,type,menutype,dataNum)
{   
    //layer.setVisibility(true);

    if( (dataNum >=5 && getAllMarkerid(dataNum).length<1) || ( dataNum <5 && getAllFeatureNum(dataNum)<1)  ){ // 请求数据
        ajax_Marker(url,action,type,menutype,dataNum);
    }
    else if( dataNum==2 ){
    	var data={},divMap=$("#map");
    	data["entitys"]=[];
    	divMap.attr("roadFlag","运行状态1");
    	doTrafficTimeData(dataNum,supermap.getLayersByName("markerLayer"+dataNum)[0],data,0);
        changeRoadActive();
    }
    
}

//checkbox选中事件-查询数据
function onCheckLeftClick( ind )
{
    var va,markerlayer,dragfeature;
    va=getDataType(ind,0);
    va=va.split(",");
    markerlayer=supermap.getLayersByName("markerLayer"+ind);
    
    var ele='#sign'+ind;
    var ele1='#ipt'+ind;
    var ele2='footer .li'+(ind-4);
    
    if($(ele1).prop("checked")==true){
        $(ele1).parent("label").css("color","red");
        if(ele2){
            $(ele2).children("img").attr("src","images/float/liang/"+(ind-5)+".png");
            $(ele2).children("p").css("color","red");
            if( ind!=0 && ind!=1 && ind!=2 && ind!=3 && ind!=4 && ind!=5 && ind!=9 && ind!=12 ) // 无添加功能
                $(ele).css("display","block");
                //$(ele1).parent().next().css("display","block");
            if(ind!=2){
                markerlayer[0].setVisibility(true);
                dragfeature=supermap.getControlsBy("name","dragfeature"+ind);
                if( dragfeature.length>0 )
                	dragfeature[0].activate();
            }
            if(ind == 2){
            	$("#right_ipt4").prop("checked",false);
            }
            listLeftClick(va[0],'query',va[1],2,ind);
        }
    }else{
        if(ele2){
            $(ele2).children("img").attr("src","images/float/hui/"+(ind-5)+".png");
            $(ele2).children("p").css("color","white");
            $(ele).css("display","none")
            //$(ele1).parent().next().css("display","none");
        }
        $(ele1).parent("label").css("color","black");
        markerlayer[0].setVisibility(false);
        dragfeature = supermap.getControlsBy("name","dragfeature"+ind);
        if( dragfeature.length>0 )
        	dragfeature[0].deactivate();
        markerNormalize(ind);
    }
}

// 右侧check点击事件
function onCheckRightClick(leftInd,rightInd)
{
    
    if($('#ipt'+rightInd+'_'+rightInd).prop("checked")==true){
        $('#ipt'+leftInd).attr("checked",true);
        add2CheckRight(leftInd,rightInd);
    }else{
        $('#ipt'+leftInd).attr("checked",false);
        $(".rliul"+rightInd+" li").remove();
    }
    
    onCheckLeftClick(leftInd);
}
function eventMarker(data,marker,idName,text){
    for(var i=0;i<data.entitys.length;i++){
        var dot = data.entitys[i][2];
        $(marker).parent("label").siblings("ul").append("<li><label class='lb'><input lot="+dot+" type='checkbox' name='' id='"+idName+"_"+data.entitys[i][0]+"'/><span class='r_sp'>"+text+":"+data.entitys[i][1]+"</span></label></li>");
    }
}
function add2CheckRight(leftInd,rightInd)
{
    if( $('#ipt'+rightInd+'_'+rightInd).parent("label").siblings("ul").children().length > 0 )
        return;
    
    var arr=getAllMarkerid(leftInd);
    for(var i=0;i<arr.length;i++){
        $('#ipt'+rightInd+'_'+rightInd).parent("label").siblings("ul").append("<li><label class='lb'><input lot="+arr[i]+
                " lotlat type='checkbox' idType="+arr[i].substring(arr[i].indexOf("_")+1,arr[i].length)+" name='' onclick='onScenarioCheckClick(\"" +arr[i]+ "\",this)' id='scenario"+arr[i]+"'/><span class='r_sp'>编号"+
                ":"+arr[i].substring(arr[i].indexOf("_")+1,arr[i].length)+"</span></label></li>");
    }
}

function onScenarioCheckClick(scenarioID,_this)
{
    markerClick(scenarioID,1);
	var marker = getCurMarker().lonlat;
	$(_this).attr("lotlat",marker.lon+','+marker.lat);
}

// 底点击事件
function footerClick(ind){
    var ele1='#ipt'+ind;
    if($(ele1).prop("checked")==false ){
        $(ele1).attr("checked",true);
        onCheckLeftClick(ind);
    }else{
        $(ele1).attr("checked",false);
        onCheckLeftClick(ind);
    }
}
function createLayer( ind )
{
    var markerlayer,dragFeature;
    var divMap=$("#map");
    if( ind==0||ind==1||ind==2||ind==3||ind==4 ){ //路网 小区       
        markerlayer=new SuperMap.Layer.Vector("markerLayer"+ind);
        dragFeature = new SuperMap.Control.DragFeature(markerlayer);
        if( ind==0 ){
        	dragFeature.name="dragfeature"+ind;
        	dragFeature.onDrag=onDragVector;
        	supermap.addControl(dragFeature);
        }
    }
    else{
        markerlayer=new SuperMap.Layer.Markers("markerLayer"+ind);
    }
    
    markerlayer.setVisibility(false);
    supermap.addLayer(markerlayer);
    
    if( ind==2 ){//|| ind==0 
        if(divMap.attr("roadFlag")=="运行状态1"){
            vectorRoad = new SuperMap.Control.SelectFeature(markerlayer,{
                callbacks: {"click":GetLinkID,"rightclick":roadNetAttribute,"over":overRoadIndex,"out":outRoadIndex}//
            });  
            supermap.addControl(vectorRoad);
            vectorRoad.activate();
        }
    }
    if (ind==3) {//||ind==4
        var vectorVillage = new SuperMap.Control.SelectFeature(markerlayer,{ 
                    selectStyle:{
                         fillColor:"blue",
                         fillOpacity:"0.6",
                         stroke:"true",
                         strokeColor:"#EE9900",
                         labelSelect:"true",
                }, 
                	onSelect: getIndexVillageId,
                    callbacks: {"rightclick":houseAttribute}
                }); 
            supermap.addControl(vectorVillage);
            vectorVillage.activate();
    }
    // if( ind == 0 ){
    //  var dragFeature = new SuperMap.Control.DragFeature(markerlayer);
    //  supermap.addControl(dragFeature);
    //  dragFeature.activate();
    // }
    if( ind == 0 ){
        var dragFeature = new SuperMap.Control.SelectFeature(markerlayer,{
            callbacks: {"rightclick":setnodeVal}
        });
        supermap.addControl(dragFeature);
        dragFeature.activate();
    }
}
// function roadDiv(feature)
// {
//     roadID = feature.id;
//     roadID=roadID.split("_")[1];
//     var centerPoint= feature.geometry.getBounds().getCenterLonLat();
//     var pos= new SuperMap.LonLat(centerPoint.x,centerPoint.y);                
//     var p=supermap.getPixelFromLonLat(centerPoint);
//     var l= p.x+"px";
//     var t= p.y+"px";
//     $(".jt_node").css("visibility","hidden");
//     $("#roads").css({"visibility":"visible","left":l,"top":t}); 
// }

function getLeftCheck( ind,strName )
{
    if(ind==31||ind==32){//后期需要改
         var strCheck='<li>'+
         '<label for="ipt'+ind+'" ><input type="checkbox" name="check'+ind+'" onclick="planningHtml('+ind+')" id="ipt'+ind+'"/>'+strName+'</label>'+
         '</li>';
     }else{
        var strCheck='<li>'+
         '<label for="ipt'+ind+'" ><input type="checkbox" name="check'+ind+'" onclick="onCheckLeftClick('+ind+')" id="ipt'+ind+'"/>'+strName+'</label>'+
         '<img src="images/mark_hui0.png" class="sign" id="sign'+ind+'"  onclick="newPoint('+ind+')"/>'+
         '</li>';
     }
    
    // var strCheck='<li>'+
    // '<li>'+
 //    '<label for="ipt'+ind+'" ><input type="checkbox" name="check'+ind+'" onclick="onCheckLeftClick('+ind+')" id="ipt'+ind+'"/>'+strName+'</label>'+
 //    '</li>';
    return strCheck;
}
function planningHtml(ind){
    $(".zhao_left").css("display","block");
    var html='';
    if(ind==31){
        html+='<div id="jd_nodes" class="jd_nodes" style="overflow: hidden; height: 395px;">'+
        '<p class="tj_title" style="cursor: move;">规划路段属性编辑'+
        '<img src="images/min.png" class="empty_btn" style="cursor:pointer" onclick="zhao_none(\'.zhao_left\',\'.jd_nodes\'),abolish(\'#ipt31\')"></p>'+
        '<ul class="node_ul" style="overflow-y:auto;max-height:430px">'+
        '<li><span>路段编号</span><input id="attr0" type="text" name="" data="" value="GL_8799"></li>'+
        '<li><span>起始节点</span><input id="attr1" type="text" name="" data="" value="2"></li>'+
        '<li><span>终止节点</span><input id="attr2" type="text" name="" data="" value="5"></li>'+
        '<li><span>路段长度</span><input id="attr3" type="text" name="" data="" value="5"></li>'+
        '<li><span>路段名称</span><input id="attr4" type="text" name="" data="" value="万家丽路"></li>'+
        '<li><span>路段类型</span>'+
            '<select id="attr5">'+
                '<option>1-城市快速路</option><option>2-城市主干道</option><option>3-城市次干道</option><option>4-城市支路</option><option>5-路口连接线</option>'+
                '<option>6-城市内辅路</option><option>7-城市内匝道</option><option>8-城市内胡同</option><option>9-城市外辅路</option><option>10-城市外匝道</option>'+
                '<option>11-小区连杆</option><option>12-高速公路</option><option>13-一级公路</option><option>14-二级公路</option><option>15-三级公路</option>'+
                '<option>16-四级公路</option><option>100-公交专用道</option><option>200-步行专用道</option>'+
            '</select>'+
        '</li>'+
        '<li><span>路段方向</span><select id="attr6"><option>0-双向</option><option>1-单向</option></select></li>'+
        '<li><span>允许需求</span>'+
            '<select id="attr7">'+
                '<option>0-全部</option><option>1-客车</option>'+
                '<option>2-货车</option><option>3-公交车</option>'+
                '<option>4-普通公交车</option><option>5-自行车类</option>'+
            '</select>'+
        '</li>'+
        '<li><span>车道数量</span><input id="attr8" type="text" name="" data="" value="1"></li>'+
        '<li><span>限速数值</span><input id="attr9" type="text" name="" data="" value="40"></li>'+
        '<li><span>车道能力</span><input id="attr10" type="text" name="" data="" value="800"></li>'+
        '<li><span>阻塞密度</span><input id="attr11" type="text" name="" data="" value="180"></li>'+
        '<li><span>拥堵波速</span><input id="attr12" type="text" name="" data="" value="12"></li>'+
        '<li><span>启用状况</span><select id="attr13"><option>0-未启用</option><option>1-启用</option></select></li>'+
        '</ul>'+
        '<p class="node_bt"><input class="jd_nodes_btn btn1" type="button" name="button" data="" onclick="zhao_none(\'.zhao_left\',\'.jd_nodes\')" value="确认">'+
            '<input class="jd_nodes_btn btn1" type="button" name="button" data="" onclick="zhao_none(\'.zhao_left\',\'.jd_nodes\')" value="取消"><input class="jd_nodes_btn btn1" type="button" onclick="zhao_none(\'.zhao_left\',\'.jd_nodes\')" value="解除">'+
        '</p>'+
        '</div>';
    }if(ind==32){
        html+='<div id="jd_nodes" class="jd_nodes" style="overflow: hidden; height: 365px;">'+
        '<p class="tj_title" style="cursor: move;">规划建设场所属性编辑'+
        '<img src="images/min.png" class="empty_btn" style="cursor:pointer" onclick="zhao_none(\'.zhao_left\',\'.jd_nodes\'),abolish(\'#ipt32\')"></p>'+
        '<ul class="node_ul" style="overflow-y:auto;max-height:430px">'+
        '<li><span>归属小区</span><input id="attr0" type="text" name="" data="" value="82"></li>'+
        '<li><span>场所编号</span><input id="attr1" type="text" name="" data="" value="GN_2"></li>'+
        '<li><span>场所描述</span><input id="attr2" type="text" name="" data="" value="大型住宅 "></li>'+
        '<li><span>产生需求1</span><input id="attr3" type="text" name="" data="" value="08:00-12:00"></li>'+
        '<li><span>需求增减</span><input id="attr4" type="text" name="" data="" value="40"></li>'+
        '<li><span>产生需求2</span><input id="attr5" type="text" name="" data="" value="11:00-14:00"></li>'+
        '<li><span>需求增减</span><input id="attr6" type="text" name="" data="" value="50"></li>'+
        '<li><span>吸引需求1</span><input id="attr7" type="text" name="" data="" value="08:00-12:00"></li>'+
        '<li><span>需求增减</span><input id="attr8" type="text" name="" data="" value="30"></li>'+
        '<li><span>吸引需求2</span><input id="attr9" type="text" name="" data="" value="11:00-14:00"></li>'+
        '<li><span>需求增减</span><input id="attr10" type="text" name="" data="" value="50"></li>'+
        '<li><span>启用状况</span><select id="attr13"><option>0-未启用</option><option>1-启用</option></select></li>'+
        '</ul>'+
        '<p class="node_bt">'+
            '<input class="jd_nodes_btn btn1" type="button" name="button" data="" onclick="zhao_none(\'.zhao_left\',\'.jd_nodes\')" value="确认">'+
            '<input class="jd_nodes_btn btn1" type="button" name="button" data="" onclick="zhao_none(\'.zhao_left\',\'.jd_nodes\')" value="取消">'+
            '<input class="jd_nodes_btn btn1" type="button" onclick="zhao_none(\'.zhao_left\',\'.jd_nodes\')" value="解除">'+
        '</p>'+
        '</div>';
    }
    
    $("body").append(html);
}
function getRightCheck( ind,strName )
{
    var strCheck='<li class="rli'+ind+'">'+
    '<label for="ipt'+ind+'_'+ind+'" ><input type="checkbox" name="check'+ind+'_'+ind+'" onclick="onCheckRightClick('+ind+','+ind+')" id="ipt'+ind+'_'+ind+'"/>'+strName+'</label>'+
    '<ul class="rliul'+ind+' rul"></ul>';
    return strCheck;
}

function createCheck(){//创建左侧列表的check选项
    var mo='',module = '';
    $(".setLi").css("display","none");
    var strName=['路网节点','道路节点','道路路段','交通小区','小区中心','信号控制','路段车检','路口车检','旅行时间',
                 '天气观测','诱导显示','视频监控','排放检测','道路施工','事故事件','应急抢修','恶劣天气','交通管制',
                 '商场周边','学校周边','医院周边','大型活动','紧急疏散','假日出行','VMS诱导','电台广播','主动诱导',
                 '信号控制','匝道控制','交通限行','收费车道','规划路段','规划场所'];
    for(var i=0;i<strName.length;i++){
        createLayer(i);
        module+=getLeftCheck(i,strName[i]);
        if( i>12 )
            mo+=getRightCheck(i,strName[i]);
        
        if( i==4 ){
            $(".module1").append(module);
            mo='';module = '';
        }
        else  if( i==12 ){
            $(".module2").append(module);
            mo='';module = '';
        }
        else  if( i==23 ){
            $(".module3").append(module);
            $('#right_s1').append(mo);
            mo='';module = '';
        }
        else  if( i==28 ){
            $(".module4").append(module);
            $('#right_s2').append(mo);
            mo='';module = '';
        }
        else  if( i==32 ){
            $(".module5").append(module);
            $('#right_s3').append(mo);
            mo='';module = '';
        }
        
        if( i<6 || i>12 ){ // 预先加载事件
            var va=getDataType(i,0);
            va=va.split(",");
            listLeftClick(va[0],'query',va[1],2,i);
        }
    }
}

//marker   ajax
function ajax_Marker(url,action,type,menutype,dataNum,val){
    var queryType;
    queryType=type.substr(type.length-1,1);
    var divMap=$("#map");
    $.ajax({
        url:url,
        dataType:"json",
        data:{ "action":action,"type":type,"val":val},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
            var layer=supermap.getLayersByName("markerLayer"+dataNum)[0];
            
            if( dataNum==0 || dataNum==4 ){
                add2Layer(data,dataNum,layer,"",$('#ipt'+dataNum).prop("checked"),"point");
            }
            else if( dataNum==2 ){
            	//initTimeline(1,1,1);
            	
            	/*if($("#list_left").css("left")=="0px" || $("#list_right").css("right")=="0px"){
                     // add2Layer(data,dataNum,layer,"",$('#ipt'+dataNum).prop("checked"),"line");
                    // layer.setVisibility(true);
                    divMap.attr("roadFlag","运行状态1");
                    if(divMap.attr("roadFlag")=="运行状态1"){
                        initTimeline(0,0,1);
                    }
                 }*/   

            }
            else if( dataNum==3 ){
                add2Layer(data,dataNum,layer,"",$('#ipt'+dataNum).prop("checked"),"region");
            }
            else if( dataNum==1){
            	var ab=0;
            }
            else if(action =="query" && queryType=="0"){ // 处理坐标
                forMarkersFeature(layer,menutype,dataNum,data);
            }else if(action =="query" && queryType=="1"){ // 处理属性
                forMarkersAttribute(dataNum,data);
            }
            else if(action =="insert"||action =="update"){

            }
        },
        error:function(){}
    });
}

function forMarkersFeature(layer,menutype,dataNum,data){
    var lonlat,size,offset,id,path;
    
    path='./theme/images/'+dataNum+'.0.png';
    /*if(dataNum==1){
        for(var i=0;i<data.entitys.length;i+=2){
            lonlat = SuperMap.LonLat.fromString(data.entitys[i+1]);
            size = new SuperMap.Size(5,5);
            offset = new SuperMap.Pixel(-(size.w/2), -size.h);
            id=dataNum+"_"+data.entitys[i];

            markerCreate(layer,lonlat,size,offset,id,path,1);
        }
    }
    else*/
    // {
        for( var item in data.entitys ){
            lonlat = SuperMap.LonLat.fromString(data.entitys[item][data.entitys[item].length-1].replace(" ",","));
            lonlat.transform("EPSG:4326","EPSG:900913");
            size = new SuperMap.Size(20,22);
            offset = new SuperMap.Pixel(-(size.w/2), -size.h);
            id=dataNum+"_"+data.entitys[item][0];
            
            markerCreate(layer,lonlat,size,offset,id,path,1);
        }
    // }        
}

function getMarkerAttr()
{
    //$(".zhao_left").css("display","none");
    $(".zhao_left").css("display","block");

    var va,id,ind,cur;
    cur=getCurMarkerid();

    id=cur.substring(cur.indexOf("_")+1,cur.length);
    ind=parseInt(cur.substring(0,cur.indexOf("_")));

    va=getDataType(ind,1);
    va=va.split(",");

    val="{ID:"+id+"}";
    m_flagAttr=2;
    ajax_Marker(va[0],'query',va[1],2,ind,val);
}

var m_flagAttr=0; // 查看概要属性和详细属性
var m_roadNum=2;
function forMarkersAttribute(ind,data)
{
    if( m_flagAttr==1 )
        generalAttr(ind,data);
    else if( m_flagAttr==2 )
        detailAttr(ind,data.entitys);
}
function detailAttr(ind,data)
{
    if( data.length==0 ){
        for( var i=0;i<50;i++ )
            data.push('');
        
        //data[0]=getMaxMarkerid(ind);
        var cur=getCurMarkerid();
        data[0]=cur.substring(cur.indexOf("_")+1,cur.length);
    }
    
    var layer;
    if( ind==5 ){
        // setBackgroundNet(m_roadNum,data[0],true,18);
        createCommonDialog(["信号机属性","信号控制机属性"],ind,['设备编号',0,'设备位置',1,'生产厂家',4,'控制类型',5,'信号周期',19,'相位差',20,'经度坐标',-1,'纬度坐标',-1],
            [0,7,8],{2:{li:[3],co:[['定时控制','感应控制','中心控制']]}},[],data,'body','','','general');
    }
    else if( ind==6 ){
        // setBackgroundNet(m_roadNum,data[3],true,18);
        var chart = {
            "color": ['red', 'green'],//折线颜色
            "legend_data": ['顺流','逆流'],
            "id": "chart",
            "grid": {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            "series": [
                ['顺流', 'line', 0, [
                   ["1","100"],["2","500"],["3","700"],["4","80"],
                   ["5","120"],["6","320"],["7","90"],["8","0"],["9","100"]
                   ,["10","400"],["11","600"],["12","210"],["13","99"],
                   ["14","146"],["15","500"],["16","360"],["17","250"],
                   ["18","600"]
                  ]],
                ['逆流', 'line', 0, [
                   ["1","50"],["2","160"],["3","206"],["4","300"],
                   ["5","405"],["6","200"],["7","120"],["8","230"],
                   ["9","100"],["10","400"],["11","600"],["12","210"],
                   ["13","130"],["14","203"],["15","402"],["16","346"],
                   ["17","215"],["18","301"]
               ]]
            ],//参数：name、type、作用为哪个y轴、数据(二维数组)
            "xAxis": [
                ['time','', null, null, false,'',[]]//多个y轴用数组分开   参数：type类型、name、mix、max、合并线显示、x轴单位、x轴刻度值没有为 []
            ],

            "yAxis": [
                ['value', '', 0, 500, false, '{value} %'],
//              ['value', '相对湿度', 0, 100, false, '{value}']//多个y轴用数组分开   参数：type类型、name、mix、max、合并线显示、y单位
            ],
        };
        createCommonDialog(["所选路段车检器信息","车检数据选择",["00方向流量统计","00方向车速统计","00方向车型统计","01方向流量统计","01方向车速统计","01方向车型统计"],"道路车检器属性"],ind,['车检器号',0,'路段名称',1,'设备类型',2,'路段编号',3,'经度坐标',-1,'纬度坐标',-1],
                [0,4,5],{},[],data,'body',chart);
    }
    else if( ind==7 ){
        // setBackgroundNet(m_roadNum,data[1],true,18);
        var chart = {
            "color": ['red','green','yellow'],
            "legend_data": ['左转', '直行','右转'],
            "id": "chart",
            "grid": {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            "series": [
                ['左转', 'line', 0, [
                ["1","100"],["2","500"],["3","700"],["4","80"],
                ["5","120"],["6","320"],["7","90"],["8","0"],["9","100"]
                ,["10","400"],["11","600"],["12","210"],["13","99"],
                ["14","146"],["15","500"],["16","360"],["17","250"],
                ["18","600"]
               ]],
                ['直行', 'line', 0, [
                ["1","50"],["2","160"],["3","206"],["4","300"],
                ["5","405"],["6","200"],["7","120"],["8","230"],
                ["9","100"],["10","400"],["11","600"],["12","210"],
                ["13","130"],["14","203"],["15","402"],["16","346"],
                ["17","215"],["18","301"]
               ]],
               ['右转', 'line', 0, [
                ["1","203"],["2","102"],["3","315"],["4","450"],
                ["5","152"],["6","55"],["7","60"],["8","203"],
                ["9","260"],["10","309"],["11","190"],["12","280"],
                ["13","405"],["14","89"],["15","316"],["16","190"],
                ["17","410"],["18","66"]
               ]]
            ],
            "xAxis": [
                ['value','', 0, 24, false,'{value} h', []]
            ],

            "yAxis": [
                ['value', '车(量)', 0, 1000, false, '']
            ],
        };
        createCommonDialog(["所选路口车检器信息","路口数据类型",["路口转向数据统计","出口流量数据统计"],"路口车检器属性"],ind,['车检器号',0,'路口编号',1,'路口名称',2,'设备类型',3,'进口路段',4,'出口路段',5,'经度坐标',-1,'纬度坐标',-1],
                [0,6,7],{},[],data,'body',chart);
    }
    else if( ind==8 ){
        // setBackgroundNet(m_roadNum,data[3],true,18);
        var chart = {
            "color": ['red'],
            "legend_data": ['距离'],
            "id": "chart",
            "grid": {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            "series": [
                ['距离', 'line', 0, [
                ["1","100"],["2","500"],["3","700"],["4","80"],
                ["5","120"],["6","320"],["7","90"],["8","0"],["9","100"]
                ,["10","400"],["11","600"],["12","210"],["13","99"],
                ["14","146"],["15","500"],["16","360"],["17","250"],
                ["18","600"]
               ]]
            ],
            "xAxis": [
                ['value','', 0, 24, false,'{value} h', []]
            ],

            "yAxis": [
                ['value', '车(量)', 0, 1000, false, '']
            ],
        };
        createCommonDialog(["所选旅行时间设备信息","旅行时间设备样本量数据统计",[],"旅行时间设备属性"],ind,['设备编号',0,'设备位置',1,'设备类型',2,'经度坐标',-1,'纬度坐标',-1],
                [0,4,5],{},[],data,'body',chart);
    }
    else if( ind==9 ){
        // setBackgroundNet(m_roadNum,data[1],true,18);
        var chart = {
            "color": ['red','green','yellow','#ccc','blue'],
            "legend_data": ['气温','相对湿度','露点温度','路面温度','冰点温度'],
            "id": "chart",
            "grid": {
                //left: '3%',
                //right: '4%',
                //bottom: '3%',
                //containLabel: true
            },
            "series":  [
                ['气温', 'line', 0, [10, 16,0, 23, 25, 30, 12, 3, 12, -5, 8, 14]],
                ['相对湿度', 'line', 1, [10, 40, 20, 70, 50, 90, 67, 88, 46, 60, 90, 87]],
                ['露点温度', 'line', 0, [12, 16, 23, 8, 7, 0, -3, -9, 0, 8, 12, 22]],
                ['路面温度', 'line', 0, [20, 12, 0, 9, 3, 9, 15, 22, 11, 7, 0, 5]],
                ['冰点温度', 'line', 0, [0, -1, -5, 0, 2, 0, -3, 0, -9, -10, -1, 0]],
            ],
            "xAxis": [
                ['category','', null, null, false,'',['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']]
            ],

            "yAxis": [
                ['value', '温度', -50, 100, false, '{value} °C'],
                ['value', '相对湿度', 0, 100, false, '{value}']
            ],
        };
        createCommonDialog(["所选气象观测站信息","气象数据类型",["温湿度数据统计","大气压数据统计","能见度数据统计"],"气象观测站属性"],ind,['气象站号',0,'路段编号',1,'站点桩号',2,'路段名称',3,'生产厂家',4,'设备类型',5,'经度坐标',-1,'纬度坐标',-1],
            [0,6,7],{},[],data,'body',chart);
    }
    else if( ind==10 ){
        // setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["诱导显示屏属性"],ind,['设备编号',0,'路段编号',1,'路段名称',2,'生产厂家',3,'设备类型',4,'经度坐标',-1,'纬度坐标',-1],
            [0,5,6],{},[],data,'body','','','general');
    }
    else if( ind==11 ){
        // setBackgroundNet(m_roadNum,data[4],true,18);
        createCommonDialog(["视频摄像机属性"],ind,['设备编号',0,'位置名称',1,'生产厂家',2,'设备类型',3,'路段编号',4,'经度坐标',-1,'纬度坐标',-1],
            [0,5,6],{},[],data,'body','','','general');
    }
    else if( ind==12 ){
        // setBackgroundNet(m_roadNum,data[3],true);
        createCommonDialog(["所选环境观测站信息","环境数据类型",["PM值数据统计","NOx数据统计","CO数据统计","SO2数据统计","O3数据统计"],"环境观测站属性"],ind,['设备编号',0,'路段名称',2,'路段编号',3,'生产厂家',4,'设备类型',5,'经度坐标',-1,'纬度坐标',-1],
            [0,2],{},[],data,'body');
    }
    else if( ind==13 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["道路施工属性"],ind,['事件编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'能力减少',6,'行驶限速',7,'影响状态',12,'事件描述',13],
            [0,1],{1:{li:[3,4]},2:{li:[7],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==14 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["事故事件属性"],ind,['事件编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'能力减少',6,'行驶限速',7,'影响状态',12,'事件描述',13],
            [0,1],{1:{li:[3,4]},2:{li:[7],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==15 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["应急抢修属性"],ind,['事件编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'能力减少',6,'行驶限速',7,'影响状态',12,'事件描述',13],
            [0,1],{1:{li:[3,4]},2:{li:[7],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==16 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["恶劣天气属性"],ind,['事件编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'能力减少',6,'行驶限速',7,'影响状态',12,'事件描述',13],
            [0,1],{1:{li:[3,4]},2:{li:[7],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==17 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["交通管制属性"],ind,['事件编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'能力减少',6,'行驶限速',7,'影响状态',12,'事件描述',13],
            [0,1],{1:{li:[3,4]},2:{li:[7],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==18 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["商场周边属性"],ind,['商场编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'能力减少',6,'行驶限速',7,'需求增加',8,'影响状态',12,'事件描述',13],
            [0,1],{1:{li:[3,4]},2:{li:[8],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==19 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["学校周边属性"],ind,['学校编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'能力减少',6,'行驶限速',7,'影响状态',12,'事件描述',13],
            [0,1],{1:{li:[3,4]},2:{li:[7],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==20 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["医院周边属性"],ind,['医院编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'能力减少',6,'行驶限速',7,'影响状态',12,'事件描述',13],
            [0,1],{1:{li:[3,4]},2:{li:[7],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==21 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["大型活动属性"],ind,['活动编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'能力减少',6,'行驶限速',7,'影响状态',12,'事件描述',13],
            [0,1],{1:{li:[3,4]},2:{li:[7],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==22 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["紧急疏散属性"],ind,['疏散编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'能力减少',6,'行驶限速',7,'影响状态',12,'事件描述',13],
            [0,1],{1:{li:[3,4]},2:{li:[7],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==23 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["假日出行属性"],ind,['事件编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'能力减少',6,'行驶限速',7,'需求增加',8,'影响状态',12,'事件描述',13],
            [0,1],{1:{li:[3,4]},2:{li:[8],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==24 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["VMS诱导属性"],ind,['屏诱编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'绕行路段1',11,'绕行路段2',11,'绕行路段3',11,'影响状态',12],
            [0,1],{1:{li:[3,4]},2:{li:[8],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==25 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["电台广播属性"],ind,['电台编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'绕行路段1',11,'绕行路段2',11,'绕行路段3',11,'影响状态',12],
            [0,1],{1:{li:[3,4]},2:{li:[8],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==26 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["主动诱导属性"],ind,['事件编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'绕行路段1',11,'绕行路段2',11,'绕行路段3',11,'影响状态',12],
            [0,1],{1:{li:[3,4]},2:{li:[8],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==27 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["信号控制属性"],ind,['控制编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'信号周期',9,'绿信比',10,'能力增减',6,'行驶限速',7,'影响状态',12],
            [0,1],{1:{li:[3,4]},2:{li:[9],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==28 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["匝道控制属性"],ind,['匝道编号',0,'路段编号',1,'路段名称',3,'开始时间',4,'结束时间',5,'信号周期',9,'绿信比',10,'能力增减',6,'行驶限速',7,'影响状态',12],
            [0,1],{1:{li:[3,4]},2:{li:[9],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==30 ){
        setBackgroundNet(m_roadNum,data[1],true,18);
        createCommonDialog(["收费属性"],ind,['收费编号',0,'路段编号',1,'路段名称',3,'开始日期',4,'结束日期',5,'起止时间',5,'01类收费',11,'02类收费',11,'03类收费',11,'04类收费',11,'影响状态',12],
            [0,1],{1:{li:[3,4]},2:{li:[10],co:[['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }
    else if( ind==29 )
        createCommonDialog(["限行属性"],ind,['限行编号',0,'区域编号',1,'区域描述',3,'限行类型',11,'开始日期',4,'结束日期',5,'起止时间',5,'产生减少',7,'吸引减少',11,'影响状态',12,'事件描述',13],
            [0,1],{1:{li:[4,5]},2:{li:[3,9],co:[['货车限行','尾号限行','单双号限行','外地车限行'],['无效','激活']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general'); 
}
function limitVillage(){//交通限行 小区的展示
    var markerlayer=supermap.getLayersByName("markerLayer3")[0];
    markerlayer.setVisibility(true);
    // vectorVillage.deactivate();
    // var vectorVillage = new SuperMap.Control.SelectFeature(markerlayer,{
    //         callbacks: {"click":getIndexVillageId}
    //     }); 
    //     supermap.addControl(vectorVillage);
    //     vectorVillage.activate();
}
function getIndexVillageId(arg){
    var markerLayer=supermap.getLayersByName("markerLayer3")[0];

    regionWrite(arg);
    if($(".reportFrame")&&$("#reportNum").prev("span").text()=='小区编号'){
        $("#reportNum").val(arg.id.split("_")[1]);
    }

}
var limitId="";
function limitVillageHide(){
    var markerLayer=supermap.getLayersByName("markerLayer3")[0];
    markerLayer.setVisibility(false);
}
function addchargeTime(data){//交通限行的文本框 
    var html1='';
    $("#attr3").val(data[4].split(",")[0].split(" ")[0]);
    $("#attr4").val(data[5].split(",")[0].split(" ")[0]);
    var parentLi_time=$("#attr5").parent();
    // var valTime=$("#attr5").val();
    html1+='<div class="choiceUlDiv"><p onclick="timeUlShowHide()"><input type="text" value="" readonly="readonly" class="choiceUlIpt" id="attr5"><span class="secSap"></span></p>'+
        '<ul class="node_ul_choiceUl">';
    if(data[4]!=''||data[5]!=''){
        for(var i=0;i<data[5].split(",").length;i++){
         html1+='<li>'+data[4].split(",")[i].split(" ")[1]+'-'+data[5].split(",")[i].split(" ")[1]+'<img src="images/del0.png" class="Li_img" onclick="deleteTime(this)"></li>'
        }
    }
    
    html1+='<li><input type="text" value="" id="addTime"/><img src="images/add1.png" class="Li_img1" onclick="addTime(this,5)"></li></ul></div>';

    $("#attr5").remove();
    parentLi_time.append(html1);
    $("#attr5").val($(".node_ul_choiceUl li").eq(0).text()); 
    $(".choiceUlDiv").css({"width":"137px","height":"22px","background-color":"#fff","float":"left","border-radius":"3px","position":"relative","top":"3px"});
    $(".choiceUlIpt").css({"float":"left","width":"118px","height":"22px","border":"none"});
    $(".secSap").css({"width":"14px","height":"22px","border":"none","float":"left","background":"url(images/add1.png) no-repeat 50% 50%","background-size":"70%"});
    $(".node_ul_choiceUl").css({"width":"136","background-color":"#fff","position":"absolute","z-index":"101","top":"22px","display":"none"});
    $(".Li_img").css({"width":"10px","height":"10px","float":"right","margin-top":"6px","margin-right":"2px"});
    $(".Li_img1").css({"width":"14px","height":"14px","float":"right","margin-top":"6px"});
    $("#addTime").css({"width":"100px"});
    $(".node_ul_choiceUl li").css({"width":"99%"});
    $(".node_ul li").css({"float":"left"});
}
function addTextarea(data){//交通限行的文本框 
    var html='',html1='';
    $("#attr4").val(data[4].split(",")[0].split(" ")[0]);
    $("#attr5").val(data[5].split(",")[0].split(" ")[0]);
    html+='<input type="button" id="attrChoice" value="选择小区" onclick="regionControl()"/><input type="button" id="attrGiveUp" value="放弃" onclick="limitVillageHide()"/><textarea id="attr1"></textarea>';
    var parentLi=$("#attr1").parent();
    var parentLi_time=$("#attr6").parent();
    var valDate=$("#attr1").val();
    var valTime=$("#attr6").val();
    html1+='<div class="choiceUlDiv"><p onclick="timeUlShowHide()"><input type="text" value="" readonly="readonly" class="choiceUlIpt" id="attr6"><span class="secSap"></span></p>'+
        '<ul class="node_ul_choiceUl">';
    if(data[4]!=''||data[5]!=''){
        for(var i=0;i<data[5].split(",").length;i++){
         html1+='<li>'+data[4].split(",")[i].split(" ")[1]+'-'+data[5].split(",")[i].split(" ")[1]+'<img src="images/del0.png" class="Li_img" onclick="deleteTime(this)"></li>'
        }
    }
    
    html1+='<li><input type="text" value="" id="addTime"/><img src="images/add1.png" class="Li_img1" onclick="addTime(this,6)"></li></ul></div>';
    $("#attr1").remove();
    $("#attr6").remove();
    parentLi.append(html);
    parentLi_time.append(html1);
    $("#attr1").text(valDate);
    // for(var k=0;k<($(".node_ul_choiceUl li").length-1);k++){
    //     $("#attr6").val($(".node_ul_choiceUl li").text());
    // }
    $("#attr6").val($(".node_ul_choiceUl li").eq(0).text());
    $("#attrChoice").css({"width":"56px","height":"22px","text-align":"center","margin-right":"12px"});
    $("#attrGiveUp").css({"width":"30px","height":"22px","text-align":"center","margin-left":"12px"});
    $("#attr1").css({"width":"200px","height":"40px","margin-left":"5px"});
    $(".choiceUlDiv").css({"width":"137px","height":"22px","background-color":"#fff","float":"left","border-radius":"3px","position":"relative","top":"3px"});
    $(".choiceUlIpt").css({"float":"left","width":"118px","height":"22px","border":"none"});
    $(".secSap").css({"width":"14px","height":"22px","border":"none","float":"left","background":"url(images/add1.png) no-repeat 50% 50%","background-size":"70%"});
    $(".node_ul_choiceUl").css({"width":"136","background-color":"#fff","position":"absolute","z-index":"101","top":"22px","display":"none"});
    $(".Li_img").css({"width":"10px","height":"10px","float":"right","margin-top":"6px","margin-right":"2px"});
    $(".Li_img1").css({"width":"14px","height":"14px","float":"right","margin-top":"6px"});
    $("#addTime").css({"width":"100px"});
    $(".node_ul_choiceUl li").css({"width":"99%"});
    $(".node_ul li").css({"float":"left"});
}
function deleteTime(ele){
    $(ele).parent().remove();
}
function addTime(ele,num){
    var html='';
    var parentUl=$(ele).parent();
    var timeVal=$(ele).prev("input").val();
    html+='<li>'+timeVal+'<img src="images/del0.png" class="Li_img" onclick="deleteTime(this)"></li>';
    if($(ele).prev("input").val()!=''){
        parentUl.before(html);
        $(ele).prev("input").val('');
        $("#attr"+num).val($(".node_ul_choiceUl li").eq(0).text());
        // $("#attr6").val($("#attr6").val()+','+timeVal);
        $(".Li_img").css({"width":"12px","height":"12px","float":"right","margin-top":"6px"});
    }
}
function timeUlShowHide(){
    $(".node_ul_choiceUl").toggle();
}
function removeDataMarker(){
    var ma=getCurMarker();
    var datatype=ma.id.substring(0,ma.id.indexOf("_")); 
    var layer=supermap.getLayersByName("markerLayer2")[0];
    layer.setVisibility(false);
    supermap.setCenter(getCurMarkerLonlat(),14);
    if( ma.state==1 ){
        deleteEventsMarker();
    }else if( ma.state==2 ){
        removeFeature(datatype,ma);
    }
    TL_Old=[];
    zhao_none('.zhao_left','.jd_nodes');
    layer.redraw();
}
//*********************************************************************测试
$(document).delegate(".concertMainTitle_ul_btn","click",function(){
    myChart.setOption({
        series:[{
            name:"冰点温度",
            data: [["1","100"],["2","500"],["3","700"],["4","80"],
                   ["5","120"],["6","320"],["7","90"],["8","0"],["9","100"]
                   ,["10","400"],["11","600"],["12","210"],["13","99"],
                   ["14","146"],["15","500"],["16","360"],["17","250"],
                   ["18","600"]]
        }]
    })
})
//*********************************************************************测试end
$(document).delegate("#targetSelect","change",function(){
    var select = $("#targetSelect option:selected").val();
    if(select == "大气压数据统计"){
           var chart = {
            "color": ['red', 'green'],//折线颜色
            "legend_data": ['顺流','逆流'],
            "id": "chart",
            "grid": {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            "series": [
                ['顺流', 'line', 0, [
                   ["1","100"],["2","500"],["3","700"],["4","80"],
                   ["5","120"],["6","320"],["7","90"],["8","0"],["9","100"]
                   ,["10","400"],["11","600"],["12","210"],["13","99"],
                   ["14","146"],["15","500"],["16","360"],["17","250"],
                   ["18","600"]
                  ]],
                ['逆流', 'line', 0, [
                   ["1","50"],["2","160"],["3","206"],["4","300"],
                   ["5","405"],["6","200"],["7","120"],["8","230"],
                   ["9","100"],["10","400"],["11","600"],["12","210"],
                   ["13","130"],["14","203"],["15","402"],["16","346"],
                   ["17","215"],["18","301"]
               ]]
            ],//参数：name、type、作用为哪个y轴、数据(二维数组)
            "xAxis": [
                ['time','', null, null, false,'',[]]//多个y轴用数组分开   参数：type类型、name、mix、max、合并线显示、x轴单位、x轴刻度值没有为 []
            ],

            "yAxis": [
                ['value', '', 0, 500, false, '{value} %'],
//              ['value', '相对湿度', 0, 100, false, '{value}']//多个y轴用数组分开   参数：type类型、name、mix、max、合并线显示、y单位
            ],
        };
      redrawChartsIndex(chart);
    }else if(select == "能见度数据统计"){
        var chart = {
            "color": ['red', 'green'],//折线颜色
            "legend_data": ['顺流','逆流'],
            "id": "chart",
            "grid": {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            "series": [
                ['顺流', 'line', 0, [
                   ["1","100"],["2","500"],["3","700"],["4","80"],
                   ["5","120"],["6","320"],["7","90"],["8","0"],["9","100"]
                   ,["10","400"],["11","600"],["12","210"],["13","99"],
                   ["14","146"],["15","500"],["16","360"],["17","250"],
                   ["18","600"]
                  ]]
            ],//参数：name、type、作用为哪个y轴、数据(二维数组)
            "xAxis": [
                ['time','', null, null, false,'',[]]//多个y轴用数组分开   参数：type类型、name、mix、max、合并线显示、x轴单位、x轴刻度值没有为 []
            ],

            "yAxis": [
                ['value', '', 0, 500, false, '{value} %'],
//              ['value', '相对湿度', 0, 100, false, '{value}']//多个y轴用数组分开   参数：type类型、name、mix、max、合并线显示、y单位
            ],
        };
      redrawChartsIndex(chart);
    }else if(select == "温湿度数据统计"){
         var chart = {
            "color": ['red','green','yellow','#ccc','blue'],
            "legend_data": ['气温','相对湿度','露点温度','路面温度','冰点温度'],
            "id": "chart",
            "grid": {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            "series":  [
                ['气温', 'line', 0, [10, 16,0, 23, 25, 30, 12, 3, 12, -5, 8, 14]],
                ['相对湿度', 'line', 1, [10, 40, 20, 70, 50, 90, 67, 88, 46, 60, 90, 87]],
                ['露点温度', 'line', 0, [12, 16, 23, 8, 7, 0, -3, -9, 0, 8, 12, 22]],
                ['路面温度', 'line', 0, [20, 12, 0, 9, 3, 9, 15, 22, 11, 7, 0, 5]],
                ['冰点温度', 'line', 0, [0, -1, -5, 0, 2, 0, -3, 0, -9, -10, -1, 0]],
            ],
            "xAxis": [
                ['category','', null, null, false,'',['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']]
            ],

            "yAxis": [
                ['value', '温度', -50, 100, false, '{value} °C'],
                ['value', '相对湿度', 0, 100, false, '{value}']
            ],
        };
      redrawChartsIndex(chart);
    }
})

function generalAttr(ind,data)
{
    var da;
    if( ind==5 )
        da=['设备编号',0,'设备位置',1,'生产厂家',4,'信号周期',19,'相位差',20];//5
    else if( ind==6 )
        da=['设备编号',0,'路段名称',1,'设备类型',2,'路段编号',3];//6
    else if( ind==7 )
        da=['设备编号',0,'路口名称',2,'设备类型',3,'路口编号',1];//7
    else if( ind==8 )
        da=['设备编号',0,'路段名称',1,'设备类型',2,'路段编号',3];//8
    else if( ind==9 )
        da=['气象站号',0,'路段编号',1,'路段名称',3,'设备厂家',4,'设备类型',5];//9
    else if( ind==10 )
        da=['路段编号',1,'路段名称',2,'设备厂家',3,'设备类型',4];//10
    else if( ind==11 )
        da=['摄像机编号',0,'位置名称',1,'设备厂家',2,'设备类型',3];//11
    else if( ind==12 )
        da=['站点编号',0,'位置名称',2,'生产厂家',4,'设备类型',5];//12
    else if( ind==13 )
        da=['路段编号',1,'路段名称',3,'能力减少',6,'行驶限速',7,'事件描述',13];//13
    else if( ind==14 )
        da=['路段编号',1,'路段名称',3,'能力减少',6,'能力减少',7,'事件描述',13];//14
    else if( ind==15 )
        da=['路段编号',1,'路段名称',3,'能力减少',6,'行驶限速',7,'事件描述',13];//15
    else if( ind==16 )
        da=['路段编号',1,'路段名称',3,'能力减少',6,'行驶限速',7,'事件描述',13];//16
    else if( ind==17 )
        da=['路段编号',1,'路段名称',3,'能力减少',6,'行驶限速',7,'事件描述',13];//17
    else if( ind==18 )
        da=['路段编号',1,'路段名称',3,'能力减少',6,'行驶限速',7,'事件描述',13];//18
    else if( ind==19 )
        da=['路段编号',1,'路段名称',3,'能力减少',6,'行驶限速',7,'事件描述',13];//19
    else if( ind==20 )
        da=['路段编号',1,'路段名称',3,'能力减少',6,'行驶限速',7,'事件描述',13];//20
    else if( ind==21 )
        da=['路段编号',1,'路段名称',3,'能力减少',6,'行驶限速',7,'事件描述',13];//21
    else if( ind==22 )
        da=['路段编号',1,'路段名称',3,'能力减少',6,'行驶限速',7,'事件描述',13];//22
    else if( ind==23 )
        da=['路段编号',1,'路段名称',3,'能力减少',6,'行驶限速',7,'事件描述',13];//23
    else if( ind==24 )
        da=['路段编号',1,'路段名称',3,'开始日期',4,'结束日期',5,'绕行路段1',3];//24
    else if( ind==25 )
        da=['路段编号',1,'路段名称',3,'开始日期',6,'结束日期',7,'绕行路段1',3];//25
    else if( ind==26 )
        da=['路段编号',1,'路段名称',3,'开始日期',6,'结束日期',7,'绕行路段1',3];//26
    else if( ind==27 )
        da=['路段编号',1,'开始日期',4,'结束日期',5,'能力增减',6,'行驶限速',7];//27
    else if( ind==28 )
        da=['路段编号',1,'开始日期',4,'结束日期',5,'能力增减',6,'行驶限速',7];//28
    else if( ind==29 )
        da=['区域编号',1,'区域描述',3,'产生减少',7,'吸引减少',11,'事件描述',13];//29
    else if( ind==30 )
        da=['路段编号',1,'开始日期',4,'结束日期',5];//30
    
    for(var i=0;i<$('#uu3').children().length*2;i+=2){
        if( i<da.length ){
            $("#pro"+(i+1)).html(da[i]);
            $("#pro"+(i+2)).html(data.entitys[da[i+1]]);
        }
        else{
            $("#pro"+(i+1)).html("");
            $("#pro"+(i+2)).html("");
        }
    }
    var layer,datanum,x;
    if((ind>=13&&ind<=30)||ind==7||ind==12){
        x=1;
    }else if(ind==6||ind==8||ind==9){
        x=3;
    }else if(ind==10){
        x=2;
    }else if(ind==11){
        x=4;
    }
    if(x){
        for(var i=0;i<data.entitys[x].split(",").length;i++){
                var lineVector=1+'_'+data.entitys[x].split(",")[i];
                if(TL_AllLineMap[lineVector]!=undefined){
                    if(publiclineColor[i] && lineVector1[i]){
                        for(var j=0;j<lineVector1.length;j++){
                            lineVector1[j].style.strokeColor = "gray";
                        }
                        lineVector1=[];publiclineColor=[];
                    }
                    if(typeof(TL_AllLineMap[lineVector])==Object){
                        publiclineColor[i] = TL_AllLineMap[lineVector].style.strokeColor;
                    }
                    lineVector1[i]=TL_AllLineMap[lineVector];
                    // lineVector1.style.strokeColor="#FFFF00";
                    // dataNum=lineVector1[i].id.substring(0,lineVector1[i].id.indexOf("_"));
                    
                    if(supermap.getZoom()>14){//#F0E68C
                        TL_AllLineMap[lineVector].style={
                            strokeColor:"#FF7E00",
                            fill:true,
                            strokeWidth:5
                        };
                    }else{
                        TL_AllLineMap[lineVector].style={
                            strokeColor:"#FF7E00",
                            fill:true,
                            strokeWidth:2
                        };
                    }
                    layer=supermap.getLayersByName("markerLayer2")[0];//+dataNum
                    layer.redraw();
                }else{}
                 
            }
    }
    
    // var lineVector=2+'_'+data.entitys[1].split(",");
   
}
var lineVector1= [];
var publiclineColor = [];
function getDataAttr()
{
    var data=[],arr=$('.node_ul').children();
    for( var i=0;i<arr.length;i++ ){
        var ss=$('#attr'+i)[0].tagName;
        if( $('#attr'+i).is('select') )
            data.push($('#attr'+i).get(0).selectedIndex);
        else
            data.push($('#attr'+i).val());
    }
    
    return data;
}

function onOKProperty2(ind)
{
    if(ind==5){
        var data = $(".jd_nodes_btn").attr("data");
        data = data.split(",");
        var dataIn=getDataAttr();
        data[0]=dataIn[0];
        data[1]=dataIn[1];
        data[18]=dataIn[2];
        data[4]=dataIn[3];
        data[5]=dataIn[4];
        data[19]=dataIn[5];
        data[20]=dataIn[6];
        setLeftData(ind,data);
    }else if(ind==29){
        var dataIn=getDataAttr();
        // var _dataLength=dataIn[6].split(",");
        var time1=dataIn[4];
        var time2=dataIn[5];
        var a = '',b = '';
        for(var i=0;i<$(".node_ul_choiceUl li").length-1;i++){
            a+=time1+' '+$(".node_ul_choiceUl li").eq(i).text().split("-")[0]+',';
            b+=time2+' '+$(".node_ul_choiceUl li").eq(i).text().split("-")[1]+',';
        }
        dataIn[4] = a.substring(0,a.length-1);
        dataIn[5] = b.substring(0,b.length-1);
        setLeftData(ind,dataIn);
    }else if(ind==30){
         var dataIn=getDataAttr();
        // var _dataLength=dataIn[6].split(",");
        var time1=dataIn[3];
        var time2=dataIn[4];
        var a = '',b = '';
        for(var i=0;i<$(".node_ul_choiceUl li").length-1;i++){
            a+=time1+' '+$(".node_ul_choiceUl li").eq(i).text().split("-")[0]+',';
            b+=time2+' '+$(".node_ul_choiceUl li").eq(i).text().split("-")[1]+',';
        }
        dataIn[3] = a.substring(0,a.length-1);
        dataIn[4] = b.substring(0,b.length-1);
        setLeftData(ind,dataIn);
    }else{
        var dataIn=getDataAttr();
        setLeftData(ind,dataIn);
    }
 
    var i,str,spans=$(".node_ul span");
    for( i=0;i<spans.length;i++ )
        if( spans[i].innerText=="路段编号" || spans[i].innerText=="路口编号"|| spans[i].innerText=="区域编号" )
            break;
        
    str=$('#attr'+i).val();
    var _state=TL_MarkerMap[ind+'_'+dataIn[0]];
    _state.state=1;
    setBackgroundNet(m_roadNum,str,false,14);
    //$(".zhao_left").css("display","none");
    zhao_none('.zhao_left','.jd_nodes');
}

function onCancelProperty2()
{
    var i,str,spans=$(".node_ul span");
    var divTitle=$(".tj_title").text();
    if(divTitle=="信号机属性"){
        for( i=0;i<spans.length;i++ ){
            if(spans[i].innerText=="设备编号"){
                break;
            }
        }
    }else{
        for( i=0;i<spans.length;i++ ){
             if( spans[i].innerText=="路段编号" || spans[i].innerText=="路口编号"|| spans[i].innerText=="区域编号" ){
                break;
            }
        }
    }
        
    str=$('#attr'+i).val();
    
    setBackgroundNet(m_roadNum,str,false,14);
    
    //$(".zhao_left").css("display","none");
    zhao_none('.zhao_left','.jd_nodes');
}

function setBackgroundNet(datanum,id,show,level)
{
    var layer=supermap.getLayersByName("markerLayer"+datanum)[0];
    var divMap=$("#map");
    layer.setVisibility(show);
    if( $("#ipt"+datanum).prop("checked")==true )
        layer.setVisibility(true);

    for( var item in TL_AllLineMap ){
        if(item.split("_")[0]!=3&&item.split("_")[0]!=2&&item.split("_")[0]!=0&&typeof(TL_AllLineMap[item])==Object){
            TL_AllLineMap[item].style={
                strokeColor:TL_AllLineMap[item].style.strokeColor,
                fill:true,
                strokeWidth:5
            }
        }
    }
    if(divMap.attr("roadFlag")=="运行状态1"){
       vectorRoad.deactivate();
        vectorRoad = new SuperMap.Control.SelectFeature(layer,{
            callbacks: {"click":GetLinkID,"over":overRoadIndex,"out":outRoadIndex}
        });  
        supermap.addControl(vectorRoad);
        vectorRoad.activate();
       supermap.setCenter(getCurMarkerLonlat(),level);//18
    }
    var item,ids=id.split(',');
    for( var i=0;i<ids.length;i++ )
        if( (item=getFeature(datanum,ids[i]))!=undefined ){
            if( show )
                setLineProperty1(item,5,0,0,0);
            else
                setLineProperty1(item,5,1,0,0);
        }
    layer.redraw();
}
//选择图片
function changeImgs(ele){
    var srcs = getObjectURL(ele.files[0]); //获取路径
   $(ele).nextAll(".original_img1").hide(); //this指的是input
   $(ele).nextAll(".change_img2").css("display","block"); //fireBUg查看第二次换图片不起做用
   $(ele).nextAll(".change_img2").attr("src",srcs); //this指的是input
   $(ele).val(''); //必须制空
}
//获得图片路径    
function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) {
   url = window.createObjectURL(file)
  } else if (window.URL != undefined) {
   url = window.URL.createObjectURL(file)
  } else if (window.webkitURL != undefined) {
   url = window.webkitURL.createObjectURL(file)
  }
  return url
 };
function GetLinkID(argument){
    var i,str,spans=$(".node_ul span");
    for( i=0;i<spans.length;i++ )
        if( spans[i].innerText=="路段编号" || spans[i].innerText=="路口编号"|| spans[i].innerText=="区域编号")
            break;
    var layer,id,datanum;
    id=argument.id.substring(argument.id.indexOf("_")+1,argument.id.length);
    // dataNum=argument.id.substring(0,argument.id.indexOf("_"));
    layer=supermap.getLayersByName("markerLayer2")[0];//+dataNum
    if($("#jd_nodes").text()){
        str=$('#attr'+i).val();
        if( str.indexOf(id)<0 ){
            if( str.length>0 )
                str+=",";
            str+=id;
            setLineProperty(argument,5,0,0,0);
        }
        else{
            str=str.replace(","+id,'');
            str=str.replace(id+",",'');
            str=str.replace(id,'');
            setLineProperty(argument,5,1,0,0);
        }
        $('#attr'+i).val(str);
    }
    if($('.reportFrame')){
        $("#reportNum").val(argument.id.split("_")[1]);
    }
    layer.redraw();
}

function overRoadIndex(argument){
    overAndOut(argument,12,beforelineWidth);
}
function outRoadIndex(argument){
    overAndOut(argument,beforelineWidth,beforelineWidth);
}

function overAndOut(argument,width1,width2){
    var vector,datanum,beforelineColor;
    // dataNum=argument.id.substring(0,argument.id.indexOf("_"));
    vector=supermap.getLayersByName("markerLayer2")[0];
    beforelineColor = argument.style.strokeColor;
    beforelineWidth = argument.style.strokeWidth;
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
function getDataOption( ind )
{
    var url,queryType,state;
    state=getCurMarker().state;
    if( state==1 ){
        queryType="update";
    }
    else if( state==2 ){
        queryType="insert";
    }
    
    //if( ind>=5 && ind<13)
        url="GetDevice";
    
    return url+","+queryType;
}

function getDataType(ind,type)
{
    var url="GetDevice",queryType=10;
    queryType=(ind+1)*10+type;
    
    if( ind>=0 && ind<5){
        url="GetRoadNet";
        if( ind==0 ){
            if( type==1 )
                url="GetDevice";
        }
        else if( ind==1 ){
            if( type==1 )
                url="GetDevice";
        }
        else if( ind==2 ){
            if( type==1 )
                url="GetDevice";
        }

        else if( ind==3 ){
            url="GetDevice";
        }
        else if( ind==4 ){
            url="GetDevice";
        }
    }
    else if( ind>=5 && ind<13){
        url="GetDevice";
        /*if( ind==5 )
            queryType=1*10+type;
        else if( ind==6 )
            queryType=5*10+type;
        else if( ind==7 )
            queryType=3*10+type;
        else if( ind==8 )
            queryType=12*10+type;
        else if( ind==9 )
            queryType=6*10+type;
        else if( ind==10 )
            queryType=4*10+type;
        else if( ind==11 )
            queryType=2*10+type;
        else if( ind==12 )
            queryType=7*10+type;*/
    }else if( ind>=13 && ind<=30 ){ // 事件
        url="GetScenario";
        /*if( ind==13 )
            queryType=1*10+type;
        else if( ind==14 )
            queryType=2*10+type;
        else if( ind==15 )
            queryType=3*10+type;
        else if( ind==16 )
            queryType=4*10+type;
        else if( ind==17 )
            queryType=5*10+type;
        else if( ind==18 )
            queryType=6*10+type;
        else if( ind==19 )
            queryType=7*10+type;
        else if( ind==20 )
            queryType=8*10+type;
        else if( ind==21 )
            queryType=9*10+type;
        else if( ind==22 )
            queryType=10*10+type;
        else if( ind==23 )
            queryType=11*10+type;
        
        else if( ind==24 )
            queryType=12*10+type;
        else if( ind==25 )
            queryType=13*10+type;
        else if( ind==26 )
            queryType=14*10+type;
        else if( ind==27 )
            queryType=15*10+type;
        else if( ind==28 )
            queryType=16*10+type;
        
        else if( ind==29 )
            queryType=17*10+type;
        else if( ind==30 )
            queryType=18*10+type;*/
    }
    
    return url+","+queryType;
}
///////////////////////////////////////////////////////////////////////////////////////////////////     
 // //oD矩阵小区
 //        function oDxiaoqu(){
 //            $.ajax({
 //                url:"GetDevice",
 //                dataType:"json",
 //                data:{ "action":"query","type":80},
 //                contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
 //                beforeSend:function(){  },
 //                success: function( data, textStatus, jqXHR ){
 //                    addoDqu(data);
 //                },
 //                error:function()
 //                {

 //                }
 //            });
 //        }
 //        function addoDqu(data) { 
 //             if( data ){
 //                var vol,polygonVector;
 //                var features = [];

 //                for( var i=0;i<data.entitys.length;i++ ){
 //                    var points=[];
 //                    vol = data.entitys[i];

 //                    for ( var j=1;j<data.entitys[i].length;j+=2 ){
 //                        points.push(new SuperMap.Geometry.Point(vol[j],vol[j+1]));
 //                    }
                    
 //                    linearRings = new SuperMap.Geometry.LinearRing(points);
 //                    region = new SuperMap.Geometry.Polygon([linearRings]);
 //                    polygonVector = new SuperMap.Feature.Vector(region);
                  
 //                    features.push(polygonVector);
 //                    //console.log(data.entitys[i]);
 //                    // region.id=data.entitys[i][0];
 //                }
                
 //                vectorOD.addFeatures(features);
 //            }else {
 //                alert("数据已加载。");
 //            }
 //        }
 //    //矩阵列表
 //    function oDMatrix(){
 //        var html="";
 //        var oD=[[123,456,789],[111,222,333],[123,456,789],[111,222,333],[123,456,789],[111,222,333],[123,456,789],[111,222,333],[123,456,789]];
 //         for( var i=0;i<oD.length;i++ ){
 //                        html+='<tr>'+
 //                                '<td style="width:70%"><label for="'+i+'"><input type="checkbox" id="'+i+'"><span class="od_sp1">'+oD[i][0]+'</span><span class="od_sp2">'+oD[i][1]+'</span></label></td>'+
 //                                '<td style="width:30%"><textarea>'+oD[i][2]+'</textarea></td>'+
 //                            '</tr>';
 //                }
 //        $('.table_wai table').append(html);
 //    }





/****************************/

var flagArrow=1,flagArrow1=1;
    function listShow(name){
        if(name=="左"){
           if(flagArrow==1){
                $("#list_left").css("left","0px");
                $(".leftArrow").attr("src","images/index_left.png");
                flagArrow=0;
            }else{
                $("#list_left").css("left","-206px");
                $(".leftArrow").attr("src","images/index_right.png");
                flagArrow=1;
            } 
        }else{
            if(flagArrow1==1){
                $("#list_right").css("right","0px");
                $(".rightArrow").attr("src","images/index_right.png");
                flagArrow1=0;
            }else{
                $("#list_right").css("right","-206px");
                $(".rightArrow").attr("src","images/index_left.png");
                flagArrow1=1;
            } 
        }
        footerChange();
    }
function footerChange(){
    var divMap=$("#map");
    
    if($("#list_left").css("left")=="0px" || $("#list_right").css("right")=="0px"){
        $("footer").css("display","block");
        $("#footer,.replace").css("display","none");
        $(".leftArrow_frame,.rightArrow_frame").css("top",$("#list_left").height()/2+"px");
        var markerlayer=supermap.getLayersByName("markerLayer2")[0];
        markerlayer.setVisibility(false);
        divMap.attr("roadFlag","运行状态1");
		// initTimeline(0,1,0);
        $(".describeFrame_flow,.roadStates_ul,.describeFrame,.describeFrame_speed,.describeFrame_saturation,.describeFrame_density").css("display","none");
        // $(".filter_saturation,.filter_density,.filter_speed").css("display","none");
    }else if($("#list_left").css("left")=="-206px" && $("#list_right").css("right")=="-206px"){
        $("footer").css("display","none");
        $("#footer,.replace").css("display","block");
        $(".leftArrow_frame,.rightArrow_frame").css("top",$("#list_left").height()/2-80+"px");
        $(".describeFrame,.roadStates_ul").css("display","block");
        // markerlayer.setVisibility(false);
        divMap.attr("roadFlag","运行状态");
        for(var i=0;i<=30;i++){
            var markerlayer=supermap.getLayersByName("markerLayer"+i);
            markerlayer[0].setVisibility(false);
        }
        if(divMap.attr("roadFlag")=="运行状态"){
            initTimeline(1,1,1);
            $(".tps p").css("background-color","red");
            $(".vic p,.tvd p,.tes p,.runOff p").css("background-color","#0B3893");
        }
        $("#list2 input").prop("checked",false);
        $("#list2 input").parent().css("color","#4d4d4d");
        $(".sign,.zhao_left").css("display","none");
    }
}

$(document).ready(function(){ 
    ratioHeight('list_left','list2',3,2);
    ratioHeight('list_left','list3',3,1);
    ratioHeight('list_right','R_list1',3,1);
    ratioHeight('list_right','R_list2',3,2);
    $(".leftArrow_frame,.rightArrow_frame").css("top",$("#list_left").height()/2-80+"px");
    
});
$(window).resize(function(){
    ratioHeight('list_left','list2',3,2);
    ratioHeight('list_left','list3',3,1);
    ratioHeight('list_right','R_list1',3,1);
    ratioHeight('list_right','R_list2',3,2);
    $(".leftArrow_frame,.rightArrow_frame").css("top",$("#list_left").height()/2-80+"px");

})


//仿真参数Ajax
var influence = [],measure = [];
function simulatAjax(){
    parent.simulat_num = $("#simulat_num").val();
    var simulat_item_name = $("#simulat_item_name").val();
    var simulat_item_num = $("#simulat_item_num").val();
    parent.simulat_start_time =$("#simulat_start_time").val();//暂时变全局变量
    var simulat_end_time =$("#simulat_end_time").val();
    var influenceNum = influence.join(",");
    var measureNum = measure.join(",");
    var report_num;
    if($("#indexSelect")[0].selectedIndex==0){
        report_num=1;
    }else if($("#indexSelect")[0].selectedIndex==1){
        report_num=2;
    }else if($("#indexSelect")[0].selectedIndex==2){
        report_num=3;
    }
    var pa = parent.simulat_num+","+"'"+simulat_item_name+"',"+"'"+simulat_item_num+"',"+report_num+""+parent.simulat_start_time+","+""+simulat_end_time+";"+influenceNum+";"+""+measureNum+"";
    $.ajax({
        url:"GetFastSim",
        dataType:"json",
        data:{ "action":"sim","type":"10","pa":pa},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
            if(data.entitys[0]=="ok"){
                 parent.simulat_timeout(parent.simulat_type,parent.window);
            }
        },
        error:function(){}
    });
   $("#fz").remove();
}
//仿真小区Ajax
function simulatRegionAjax(layer){
    $.ajax({
        url:"GetDevice",
        dataType:"json",
        data:{ "action":"query","type":"40"},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
            simulatRegion(data,layer);
        },
        error:function(){}
    });
}
//绘制仿真小区
function simulatRegion(data,layer){
	var vol,selectFeatureRoad,va,vas;
	var line,lineVector,lonlat;
	features = [];
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
		var linearRings = new SuperMap.Geometry.LinearRing(points);
		line = new SuperMap.Geometry.Polygon([linearRings]);
		lineVector = new SuperMap.Feature.Vector(line);
		
		lineVector.id = id;
		lineVector.style={
		    fillColor:"#66FF00",
		    fillOpacity:"0.6",
		    stroke:"true",
		    strokeColor:"#EE9900",
		    labelSelect:"true",
	    };
		var oldText = $("#selectRegion").text().split(";");
		for(var n=0;n<oldText.length;n++){
			if(id == oldText[n]){
				lineVector.style={
	            fillColor:"#E60012",
		        fillOpacity:"0.6",
		        stroke:"true",
		        strokeColor:"#EE9900",
		        labelSelect:"true",
        		};
			}
		}
		
		features.push(lineVector);
	}
	layer.addFeatures(features);
};
function empty_Site(){
	//选择小区置为空
	$("#selectRegion").empty();
};
function regionControl(){
	limitVillage();
	$("#selectRegion").attr("data", "xianxing");
}
function regionAttrData(){
	limitVillage();
	$("#selectRegion").attr("data", "write");
};
function regionWrite(argument){
	var r = [],array = [],dom = "";
	if($("#selectRegion").attr("data") == "write") {
		var oldText = $("#selectRegion").text();
		dom = "#selectRegion";

	}else if($("#selectRegion").attr("data") == "xianxing"){
		var oldText = $("#attr1").text();
		dom = "#attr1";
	}else{
		return false;
	}
		if(oldText == "") {
			array = [];
		} else {
			array = oldText.split(",");
		}
		array.push(argument.id.split("_")[1]);
		for(var i = 0, l = array.length; i < l; i++) {
			for(var j = i + 1; j < l; j++)
				if(array[i] === array[j]) {
					j = ++i;
				}
			r.push(array[i]);
		}

		$(dom).text(r.join(","));
};
function clearTypeArr(){
    influence = [];
    measure = [];
}
//function simulat_timeout(method,context){
//  clearTimeout(method.time);
//  method.time = setTimeout(function(){
//      method.call(context);
//  },2000)
//}
//仿真最小化
$('body').delegate(".fz_btn1","click",function(){
     $(".zhao").css("display","none");
     $(".fangzhen").css("display","none");
     var html='';
     html+='<div id="enlarge"><span style="cursor:pointer" class="load">正在仿真,请等待...</span></div>';
     // html+='<div id="enlarge"><img src="images/loading.gif" class="load" /></div>';
     parent.$("body").append(html);
})

$('body').delegate(".lessen2","click",function(){
     $(".zhao").css("display","block");
        $(".fz_kuang").css("display","block");
        $("#enlarge").css("display","none");
})
// $('body').delegate(".load","click",function(){
//     $(".zhao").css("display","block");
//     $(".fangzhen").css("display","block");
//     $("#enlarge").css("display","none");
// })
function getR_ramp(){
    for(var i=33;i<51;i++){
        var markerlayer = "markerlayer";
        var markerObj="new SuperMap.Layer.Markers('markerlayer"+i+"')";
        eval(markerlayer+"="+markerObj);
        supermap1.addLayer(markerlayer);
        var ipt=$(".rliul"+(i-20)+" input");
        var ipt2=$(".rliul"+(i-20)+" span");
        for( var j=0; j<ipt.length;j++){ 
                    if(ipt.eq(j).prop("checked")==true){
                        var dot = ipt.eq(j).attr("lot");
                        var dot1 = ipt.eq(j).attr("lotlat");
                        var lonlat = SuperMap.LonLat.fromString(dot1);
                        var size = new SuperMap.Size(22,22);
                        var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
                        var icon = new SuperMap.Icon('./theme/images/'+(i-20)+'.0.png', size, offset);
                        marker =new SuperMap.Marker(lonlat,icon) ;
//                      markerlayer.addMarker(marker);
                        if((i-20)>12&&(i-20)<24){
                            $("#influence").append("<li><i class='green'></i><span>"+ipt2.eq(j).text()+"</span></li>");
                            // var lot = ipt.eq(j).attr("lot").split("_");
                            // lot = lot[1]*100+lot[0];
                            var idType=ipt.eq(j).attr("idType");
                            var type = dot.split("_")[0]-12;
                            if(type<10){
                                idType = idType*100+type;
                            }else{
                                idType = idType+type;
                            }
                            // influence.push(lot);
                             influence.push(idType);
                        }else{
                            $("#measure").append("<li><i class='green'></i><span>"+ipt2.eq(j).text()+"</span></li>");
                            // var lot = ipt.eq(j).attr("lot").split("_");
                            // lot = lot[1]*100+lot[0];
                            // measure.push(lot);
                            var idType=ipt.eq(j).attr("idType");
                            var type = dot.split("_")[0]-12;
                            if(type<10){
                                idType = idType*100+type;
                            }else{
                                idType = idType+type;
                            } 
                            measure.push(idType);
                        }
                    }
                }
    }
}

function datasTimeshow(){
    var divMap=$("#map");
    var dataTime=parent.indexTime.split(" ")[1];
    realtime=parseInt(dataTime.substring(0,2))*60+parseInt(dataTime.substring(3,5)); 
    $("#myTimeline").val( realtime );
    divMap.attr("roadFlag","运行状态");
    if(divMap.attr("roadFlag")=="运行状态"){
        initTimeline(0,1,1);
    }
}

 


//动态交通功能仿真
function part1Click(num){
    var divMap=$("#map");
    if(num==1){//tps运行状态  1--7part1
            divMap.attr("roadFlag","运行状态");
            if(divMap.attr("roadFlag")=="运行状态"){
                initTimeline(0,1,1);
                legend();
                $(".describeFrame_flow").css("display","none");
            }
        }else if(num==9){//饱和程度VIC
            divMap.attr("roadFlag","饱和程度");
            if(divMap.attr("roadFlag")=="饱和程度"){
                 initTimeline(0,1,50);
                $(".describeFrame_flow,.describeFrame_serve,.describeFrame,.describeFrame_safe,.describeFrame_density,.describeFrame_speed").css("display","none");
                $(".describeFrame_saturation").css("display","block");
            }
        }else if(num==10){//车流密度TVD
            divMap.attr("roadFlag","车流密度");
            if(divMap.attr("roadFlag")=="车流密度"){
                 initTimeline(0,1,60);
                $(".describeFrame_flow,.describeFrame_serve,.describeFrame,.describeFrame_safe,.describeFrame_saturation,.describeFrame_speed").css("display","none");
                $(".describeFrame_density").css("display","block");
            }
        }else if(num==11){//行程车速TES
            divMap.attr("roadFlag","行程车速");
            if(divMap.attr("roadFlag")=="行程车速"){
                 initTimeline(0,1,70);
                $(".describeFrame_flow,.describeFrame_serve,.describeFrame,.describeFrame_safe,.describeFrame_saturation,.describeFrame_density").css("display","none");
                $(".describeFrame_speed").css("display","block");
            }
        }else if(num==12){//流量
            divMap.attr("roadFlag","流量");
            if(divMap.attr("roadFlag")=="流量"){
                initTimeline(0,1,1);
                $("describeFrame_speed,.describeFrame_serve,.describeFrame,.describeFrame_safe,.describeFrame_saturation,.describeFrame_density").css("display","none");
                $(".describeFrame_flow").css("display","block");
                $(".filter_speed").css("display","none");
            }
        }
    }
$(".roadUl1 p").click(function(){//dtjt 第一功能里左侧按钮的切换
        $(this).css("background-color","red").parent().siblings("li").children("p").css("background-color","#0B3893");
    })
//时间补位
function timeChange(num){
    var num=num+"";
    return num=num.length>1?num:0+num;
}
function divRemove(ele1,ele2){
    $(ele1).css("display","none");
    $(ele2).remove();
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