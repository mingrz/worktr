var mapPhases = {};
var markerCur=undefined;
var click=[0,0];
var marId=1,bFlagDelete=false;
var googleAllNode = [];
var googleAllLine = [],googleClickData = [];
var to_node_toggle = true;
var old_clickLine,node_marker,old_node,old_fromLine,old_toLine,removeGoogleMarker;

//回车事件
$("body").delegate("#ph", "keydown", function(event){
	//console.log(markerCur);
	if(event.keyCode == 13){ 
		if(markerCur!=undefined ){
			insertMarker2Map($("#ph").val());
		}
	}
});

function initilize(){
	mapPhases = {};
	markerCur=undefined;
	click=[0,0];
	marId=1,bFlagDelete=false;
}

//插入marker
function insertMarker2Map(pha){
	if( pha=="" ){
		// alert("请重新输入相位号");
		reviseAlert("请重新输入灯组属性");
		return;
	}

	if(markerCur.attr.ph!=undefined){//&&markerCur.attr.ph!=pha
		if( mapPhases[markerCur.attr.ph]!=undefined && mapPhases[markerCur.attr.ph][markerCur.id] !=undefined){
			delete mapPhases[markerCur.attr.ph][markerCur.id];
			mapPhases[this.attr.ph]-=1;
			if( markerCur.attr.st==3 && mapPhases[markerCur.attr.ph]==0 ) //若存在的marker,改变相位st设为1新建,此时相位无数据需要删除 
				deleteSignalPhaseMap(markerID,markerCur.attr.ph);
		}

		markerCur.attr.ph = pha;
		click[0]=markerCur.attr.ph;click[1]=markerCur.id;

		if( mapPhases[pha]==undefined ) // 相位不存在
		{	mapPhases[pha]= {};mapPhases[pha][0]=0; }

		mapPhases[pha][0]+=1;
		mapPhases[pha][markerCur.id]=markerCur;
	}
}
//失去焦点事件
$("body").delegate("#an", "blur", function(){
	if(markerCur!=undefined){
		if( markerCur.attr.st==3 )
			markerCur.attr.st==5;
		markerCur.attr.an = $(this).val();
		markerCur.getIcon().rotation = $(this).val();
		markerCur.setMap(map);
		$("#phi_"+($("#ph").val())+" img").css("transform","rotate("+$(this).val()+"deg)");
	}
});

//回车事件
$("body").delegate("#an", "keydown", function(event){
	if(event.keyCode == 13){ 
		if(markerCur!=undefined){
			if( markerCur.attr.st==3 )
				markerCur.attr.st==5;
			markerCur.attr.an = $(this).val();
			markerCur.getIcon().rotation = $(this).val();
			markerCur.setMap(map);
		}
	}
}); 

function doSignalPhase(data)
{
	if( data["entitys"].length<1 )
		return;

	marId=1;//标志id
	mapPhases = {};//初始化存储标志map

	var allData=data["entitys"];
	for(var i=0;i<allData.length;i++){
		var lineData=allData[i];
		{
			markerID=lineData[0];
			if( lineData.length>0 ){
				var ph=lineData[1];
				var ids=lineData[2].split(",");
				var ans=lineData[3].split(",");
				var pos=lineData[4].split(",");
				var pe=lineData[5];
				var y=lineData[6];
				var g=lineData[7];
				var off=lineData[8];
				var from_link_id=lineData[9];
				var to_link_id=lineData[10];
				var node_id=lineData[11];
				var flow=lineData[12];
				for( var k=0;k<ids.length;k++ ){
					createMarker(ph,ids[k],ans[k],3,pos[k].substring(pos[k].indexOf(" ")+1,pos[k].length),pos[k].substring(0,pos[k].indexOf(" ")),
							pe,y,g,off,'',"black",node_id,from_link_id,to_link_id,flow);//绘制标志

					if( mapPhases[ph]==undefined ) // 相位不存在
					{	mapPhases[ph]= {};mapPhases[ph][0]=0; }

					mapPhases[ph][0]+=1;
					mapPhases[ph][markerCur.id]=markerCur;
				}
			}
		}

	}
}

$("body").delegate(".img_kuang", "click", function() {
	var strValue=$(this).css("background-image");
	var tIndex = strValue.substring(strValue.lastIndexOf("/")+1,strValue.lastIndexOf("."));
	if(googleClickData[2] == undefined){
		reviseAlert("路段属性不能为空");
		return;
	}
	if( click[0]==0 && click[1]>0 ){
		reviseAlert("灯组属性不能为空");
		return;
	}
	if( mapPhases[click[0]]!=undefined ){//通过相位在map中找到标志
		if( mapPhases[click[0]][click[1]]!=undefined ){
			mapPhases[click[0]][click[1]].getIcon().fillColor = 'black';
			mapPhases[click[0]][click[1]].setMap(mapCur);
		}
	}	
	
	createMarker("",tIndex,"0",1,gmarkerLonLat.lat,gmarkerLonLat.lon,'','','','','',"blue",googleClickData[0],googleClickData[1],googleClickData[2],0);
});
function createMarker(phase,index,angle,state,lat,lon,pe,y,g,off,link_id,color,node_id,from_link_id,to_link_id,flow){
	var off = 0;
	var pathArr = ['m0 0 Q10 2 0 10 L2 8 L10 17 L10 24 Q9 25 7 22 L6 18 L4 16 L4 33 L8 39 Q8 43 6 43 L0 34 L0 24 L-6 34 L-6 41 L-8 42 L-10 40 L-9 32 L-9 32 L-4 25 L-3 18 L-10 22 Q-12 22 -12 22 L-12 19 L-2 9 L0 8 Q-4 4 0 0',
	               'm0 0 L0 5 L11 5 Q13 6 15 9  L15 27 L11 27 Q11 10 10 9 L0 9 L0 13 L-11 7 z',
	               'm0 0 L0 5 L11 5 Q13 6 15 9  L15 27 L11 27 Q11 10 10 9 L0 9 L0 13 L-11 7 z',
	               'm0 0  L12 7 L0 13 L0 9 L-9 9 Q-10 10 -11 11 L-10 27 L-15 27 L-15 10 Q-16 7 -10 5 L0 5 z', 
	               'm0 0 L7 11 L3 11 L3 20 L8 20 L8 14 L15 22 L8 30 L8 25 L3 25 L3 33 L-3 33 L-3 11 L-7 11 z',
	               'm0 0  L7 13 L3 13 L3 33 L-3 33 L-3 13 L-7 13 z',
	               'm0 0 L7 -11 L3 -11 L3 -20 Q8 -24 13 -20 L13 0 L17 0 L17 -22 Q8 -29 -4 -22 L-4 -11 L-7 -11 z', 
	               'm0 0 L-7 12 L0 22 L0 15 L16 19 L16 23 Q8 23 -3 26 L-3 32 L-7 32 L0 44 L9 32 L3 32 L4 28 Q9 27 15 26 L15 42 L20 42 L21 14 L0 7 Z',
	               'm0 0 L7 11 L3 11 L3 32 L-3 32 L-3 25 L-8 25 L-8 30 L-15 23 L-8 15 L-8 20 L-3 20 L-3 11 L-7 11 Z',
	               'm0 5 L9 0 L9 -6 L15 4 L9 13 L9 6 L4 11 L4 28 L-3 28 L-3 11 L-9 6 L-9 13 L-15 4 L-9 -6 L-9 0 z',
	               'm0 0 L7 10 L3 10 L3 20 L8 20 L8 14 L15 23 L8 30 L8 25 L3 25 L3 33 L-3 33 L-3 25 L-8 25 L-8 30 L-15 23 L-8 14 L-8 20 L-3 20 L-3 10 L-7 10 z'];
	
	// 创建maker
	markerCur = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lon),
		clickable: true,
		draggable: true,
		icon: {
		path: pathArr[index],
		strokeColor: "black",
		fillColor: color,
		fillOpacity: 1,
		rotation: 0,
		strokeWeight: 1
	},
	map: mapCur
	});
	
	if( phase=="" )
		click[0]=0;
	else 
		click[0]=phase;
	
	markerCur.id = marId;
	click[1]=markerCur.id;
	markerCur.getIcon().rotation=angle;
	markerCur.attr ={ph:phase,nu:index,an:angle,pe:pe,g:g,y:y,off:off,st:state,from_link_id:from_link_id,to_link_id:to_link_id,flow:flow/2,node_id:node_id}; // st的值 1新建，2新建删除 3存在未修改，4存在删除,5存在修改
//	google.maps.event.addDomListener(markerCur, 'rightclick', remove);
	google.maps.event.addDomListener(markerCur, 'rightclick', function(event){
		if($("#setSignal").attr("type")=="insert"){
			removeGoogleMarker = this;
			var _div = '<ul class="ul_all js_line_ul">'+
                    '<li class="look get_Google_node" onclick="remove()">删除图标</li>'+
                '</ul>';
			nodePopup(event.latLng,_div,'map_popup','e');
		}
		
	});
	google.maps.event.addDomListener(markerCur, 'dragend', clickAndMove); 
	google.maps.event.addDomListener(markerCur, 'click', clickAndMove);

	marId++;
	//清空属性栏
	$("#ph").val(null);
	$("#an").val(null);
	$("#cyc").val(null);
	$("#yel").val(null);                                
	$("#gre").val(null);
//	$("#off").val(markerCur.attr.off);//暂时不需要相位
	$("#flow").val(null);
	
	//信号机相位示意图
	$("#phi_"+phase+" span:first").html("φ"+phase);
	$("#phi_"+phase+" img").attr("greenlight",y-g);
	$("#phi_"+phase+" img").attr("src","images/arrow/min/"+index+".png");
	$("#phi_"+phase+" img").css("transform","rotate("+angle+"deg)");
	phaseframe();
	
}
function phaseframe(){
	var total_1 = 0,total_2 = 0;
//	var total = 0;
	var num =0;
	for(var i=1;i<$("#phaseframe img").length+1;i++){
		if($("#phi_"+i+" img").attr("greenlight")){
			num+=1;
		}
		if(num == 8){
//			if((parseInt($("#phi_1 img").attr("greenlight"))+parseInt($("#phi_2 img").attr("greenlight"))!=parseInt($("#phi_5 img").attr("greenlight"))+parseInt($("#phi_6 img").attr("greenlight")))||(parseInt($("#phi_3 img").attr("greenlight"))+parseInt($("#phi_4 img").attr("greenlight"))!=parseInt($("#phi_7 img").attr("greenlight"))+parseInt($("#phi_8 img").attr("greenlight")))){
//				return false;
//			}
//			for(var n =1;n<$("#phaseframe img").length/2+1;n++){
//				total += parseInt($("#phi_"+n+" img").attr("greenlight"));
//			}
//			for(var y=1;y<$("#phaseframe img").length+1;y++){
//				var period = $("#phi_"+y+" img").attr("greenlight");
//				$("#phi_"+y).css("width",period/total*100+"%");
//			}
			
			for(var n =1;n<$("#phaseframe img").length+1;n++){
				if(n<=$("#phaseframe img").length/2){
					total_1 += parseInt($("#phi_"+n+" img").attr("greenlight"));	
				}else{
					total_2 += parseInt($("#phi_"+n+" img").attr("greenlight"));	
				}
			}
			for(var y=1;y<$("#phaseframe img").length+1;y++){
				var period = $("#phi_"+y+" img").attr("greenlight");
				if(y<=$("#phaseframe img").length/2){
					$("#phi_"+y).css("width",period/total_1*100+"%");	
				}else{
					$("#phi_"+y).css("width",period/total_2*100+"%");	
				}
			}
			var main = parseInt($("#phi_1").css("width"))+parseInt($("#phi_2").css("width"))-1;
			var next = parseInt($("#phi_3").css("width"))+parseInt($("#phi_4").css("width"))-1;
			$(".barrier_1").css("left",main+"px");
			$(".ring_main").css("width",main+"px");
			$(".ring_next").css("width",next+"px");
		}
	}
}
// 移动、点击marker处理
function clickAndMove(){
	
	if( mapPhases[click[0]]!=undefined ){//通过相位在map中找到标志
		if( mapPhases[click[0]][click[1]]!=undefined ){
			mapPhases[click[0]][click[1]].getIcon().fillColor = 'black';
			mapPhases[click[0]][click[1]].setMap(mapCur);
		}
	}
	$("#js-lat").val(markerCur.getPosition().lng().toFixed(6));
	$("#js-lng").val(markerCur.getPosition().lat().toFixed(6));
	
	if(this.attr.ph==""){
		click[0] = 0;
		click[1] = marId;
		markerCur = this;
		$("#ph").val(this.attr.ph);
		$("#an").val(this.attr.an);
		$("#cyc").val(this.attr.pe);
		$("#yel").val(this.attr.y);
		$("#gre").val(this.attr.g);
		$("#flow").val(this.attr.flow);
		$("#googleNode").val(this.attr.node_id);
		$("#googleTo_Node").val(this.attr.to_link_id);
		$("#googleFrom_Node").val(this.attr.from_link_id);
		return;
	}
	
		mapPhases[this.attr.ph][this.id].getIcon().fillColor = 'blue';
		mapPhases[this.attr.ph][this.id].setMap(mapCur);
		click[1]=this.id;
		click[0]=this.attr.ph;
		markerCur=mapPhases[this.attr.ph][this.id];

	$("#ph").val(markerCur.attr.ph);
	$("#an").val(markerCur.attr.an);
	$("#cyc").val(markerCur.attr.pe);
	$("#yel").val(markerCur.attr.y);
	$("#gre").val(markerCur.attr.g);
//	$("#off").val(markerCur.attr.off);//暂时不需要相位
	$("#flow").val(markerCur.attr.flow);
	
	$("#googleNode").val(markerCur.attr.node_id);
	$("#googleTo_Node").val(markerCur.attr.to_link_id);
	$("#googleFrom_Node").val(markerCur.attr.from_link_id);
	googleClickData[0] = markerCur.attr.node_id;
	googleClickData[1] = markerCur.attr.from_link_id;
	googleClickData[2] = markerCur.attr.to_link_id;
	
//	for(var i in googleAllLine){//匹配符合标志from_id的路段
//		if((googleAllLine[i].from_node_id == markerCur.attr.from_link_id)&&(googleAllLine[i].to_node_id == markerCur.attr.node_id)||
//		(googleAllLine[i].to_node_id == markerCur.attr.from_link_id)&&(googleAllLine[i].from_node_id == markerCur.attr.node_id)){
//			$("#googleFlow").val(googleAllLine[i].flow);
//		}
//	}
	for(var i in googleAllLine){//匹配符合驶入驶出路段
		if((markerCur.attr.node_id == googleAllLine[i].from_node_id || markerCur.attr.node_id == googleAllLine[i].to_node_id)&&(googleAllLine[i].to_node_id == markerCur.attr.from_link_id || googleAllLine[i].from_node_id == markerCur.attr.from_link_id) )
		{
			clickLine(googleAllLine[i],"from");
		}
		if(
			(markerCur.attr.node_id == googleAllLine[i].to_node_id || markerCur.attr.node_id == googleAllLine[i].from_node_id)&&(googleAllLine[i].from_node_id == markerCur.attr.to_link_id || googleAllLine[i].to_node_id == markerCur.attr.to_link_id))
		{
			clickLine(googleAllLine[i],"to");
		}
	}
	for(var i in googleAllNode){//匹配符合节点
		if(googleAllNode[i].id == markerCur.attr.node_id){
			clickRoad(googleAllNode[i].id);
			googleClickData[0] = googleAllNode[i].id;
		}
	}
}
//  删除marker点
function remove() {
	var  _this= removeGoogleMarker;
	if( mapPhases[_this.attr.ph] != undefined && mapPhases[_this.attr.ph][_this.id]  ){
		
		delete mapPhases[_this.attr.ph][_this.id];  // 新建marker直接在map中删除掉，存在的marker则更新该相位
		mapPhases[_this.attr.ph][0]-=1;
		$("#phi_"+(_this.attr.ph)+" img").attr("src","");
		if( _this.attr.st==3 && mapPhases[_this.attr.ph][0]==0 )
				deleteSignalPhaseMap(markerID,_this.attr.ph);
	}
		_this.setMap(null);
		click[1]=undefined;
}

function markerdata(){
	if($("#ph").val() =="" || parseInt($("#ph").val())<0){
		reviseAlert("灯组属性不能为空");
	}
	var arrReInsert=[],arrDelete=[];
	for( var x in mapPhases){
		var arr=[],arr1=[],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[],arr7=[],arr8=[],arr9=[],arr10=[],arr11=[];
		for( var y in mapPhases[x] ){
			if( mapPhases[x][y]==undefined || y==0 )
				continue;

			arr1.push(mapPhases[x][y].attr.nu);
			arr2.push(mapPhases[x][y].attr.an);
			arr3.push(mapPhases[x][y].getPosition().lng().toFixed(6)+" "+mapPhases[x][y].getPosition().lat().toFixed(6));
			arr4.push(mapPhases[x][y].attr.pe);
			arr6.push(mapPhases[x][y].attr.g);
			arr5.push(mapPhases[x][y].attr.y);
			arr7.push(mapPhases[x][y].attr.off);
			arr8.push(mapPhases[x][y].attr.from_link_id);
			arr9.push(mapPhases[x][y].attr.to_link_id);
			arr10.push(mapPhases[x][y].attr.node_id);
			arr11.push(mapPhases[x][y].attr.flow);
		}

		if( arr1.length>0&&(mapPhases[x][y].attr.st==1||mapPhases[x][y].attr.st==5) ){
			arr.push(markerID);
			arr.push(x);//mapPhases[x][y].attr.ph
			arr.push("'"+arr1.join(",")+"'");
			arr.push("'"+arr2.join(",")+"'");
			arr.push("'"+arr3.join(",")+"'");
			arr.push(arr4.join(","));
			arr.push(arr5.join(","));
			arr.push(arr6.join(","));
			arr.push(arr7.join(","));
			arr.push(arr8.join(","));
			arr.push(arr9.join(","));
			arr.push(arr10.join(","));
			arr.push(arr11.join(","));
			arrReInsert.push(arr.join(";"));
			
			//保存成功修改 st状态为  3
			mapPhases[x][y].attr.st= 3;
		}
	}

	if( arrReInsert.length>0 )
		$.ajax({
			url:"GetDevice",
			dataType:"json",
			data:{ "action":"insert","type":63,"val":arrReInsert.join("]")},
			contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
			beforeSend:function(){  },
			success: function( data, textStatus, jqXHR ){
				reviseAlert("保存成功");
			},
			error:function(){}
		})

}

function getSignalPhaseMap(gmarkerId)//查询标志
{
	initilize();
	
	$.ajax({
		url:"GetDevice",
		dataType:"json",
		data:{"action":"query","type":63,"ID":gmarkerId},
		contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
		beforeSend:function(){  },
		success: function( data){
			doSignalPhase(data);
		},
		error:function(){
			alert("wrong");
		}
	})
}

function deleteSignalPhaseMap(markerID,ph)
{
	$.ajax({
		url:"GetDevice",
		dataType:"json",
		data:{ "action":"delete","type":63,"val":"device_id,"+markerID+",phase_id,'"+ph+"'"},
		contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
		beforeSend:function(){  },
		success: function( data, textStatus, jqXHR ){},
		error:function(){ }
	});
}
$("body").delegate("#mapEdit input","blur",function(){
	var _attr = $(this).attr("data");
	if(markerCur!=undefined){
		if( markerCur.attr.st==3 ){
			markerCur.attr.st=5;		
		}
		if(parseInt(click[0])>0 && parseInt(click[1])>0 && mapPhases[click[0]] !=undefined && mapPhases[click[0]][click[1]] !=undefined){	
			mapPhases[click[0]][click[1]].attr[_attr] = $(this).val();
		}else{
			if(_attr == "an"){
				markerCur.getIcon().rotation = $(this).val();
				markerCur.setMap(map);
			}
			markerCur.attr[_attr] = $(this).val();
			if(_attr == "ph" || parseInt($("#ph").val())<0){
				insertMarker2Map($("#ph").val());
			}
		}
		$("#phi_"+$("#ph").val()+" span:first").html("φ"+$("#ph").val());
		$("#phi_"+($("#ph").val())+" img").attr("src","images/arrow/min/"+markerCur.attr["nu"]+".png");
		if(mapPhases[click[0]][click[1]].attr["y"]&&mapPhases[click[0]][click[1]].attr["g"]){
			$("#phi_"+($("#ph").val())+" img").attr("greenlight",mapPhases[click[0]][click[1]].attr["y"]-mapPhases[click[0]][click[1]].attr["g"]);
			phaseframe();
		}
	}
	
})
$("body").delegate("#googleLineAttr input","blur",function(){
	var attr = $(this).attr("data");
	if(attr == "node_id"){
		googleClickData[0] = $(this).val();
	}else if(attr == "from_link_id"){
		googleClickData[1] = $(this).val();
	}else if(attr == "to_link_id"){
		googleClickData[2] = $(this).val();
	}
})

function LatLngBounds(){//返回屏幕范围经纬度坐标
	if(map.getBounds() == undefined){
		BoundsTimeOut();
	}
	var arrBounds = map.getBounds().toUrlValue().split(",");
	var bounds_1 = arrBounds[1]+" "+arrBounds[2];
	var bounds_2 = arrBounds[3]+" "+arrBounds[2];
	var bounds_3 = arrBounds[3]+" "+arrBounds[0];
	var bounds_4 = arrBounds[1]+" "+arrBounds[0];
	var val = bounds_1+","+bounds_2+","+bounds_3+","+bounds_4+","+bounds_1;
	return val;
}
//*******************************************************google节点
function googleNodeAjax(){
	var val = LatLngBounds();
	$.ajax({
     url:"GetRoadNet",
         dataType:"json",
         data:{ "action":"query","type":11,"pa":val},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
            googleNode(map,data.entitys,'green');        
         },
         error:function()
         {

         }
  })
}
//绘制节点
function googleNode(map,data,color){
	for(var i=0;i<data.length;i++){
		var nodeData ;
			var latlng = data[i][1].split(" ");
			nodeData = new google.maps.LatLng(latlng[1],latlng[0]);
		  var populationOptions = {
	      strokeColor: color,
	      strokeOpacity: 1.0,
	      strokeWeight: 2,
	      fillColor: color,
	      fillOpacity: 1.0,
	      map: map,
	      center: nodeData,
	      radius: 5,
	      zIndex:1000
	   };
    var cityCircle = new google.maps.Circle(populationOptions);
	cityCircle.id = data[i][0];
	googleAllNode.push(cityCircle);
	google.maps.event.addDomListener(cityCircle, 'click', function(){
		if($(".map_popup")){
			$(".map_popup").remove();
		}
	});
	google.maps.event.addDomListener(cityCircle, 'rightclick', function(){
		node_marker = this;
		var _div = '<ul class="ul_all js_node_ul">'+
                    '<li class="look get_Google_node" data="googleFrom_Node" onclick="nodePop(this)">驶入车道</li>'+
                    '<li class="look get_Google_node" data="googleNode" onclick="nodePop(this)">路口节点</li>'+
                    '<li class="look get_Google_node" data="googleTo_Node" onclick="nodePop(this)">驶出车道</li>'+
                '</ul>';
		
		nodePopup(new google.maps.LatLng(this.getCenter().lat(),this.getCenter().lng()),_div,'map_popup','right');//节点弹窗
	});
	var _html = '<span class="js-googleSpan" style="font-size:14px;color:#fff">'+cityCircle.id+'<span>';
		nodePopup(new google.maps.LatLng(cityCircle.getCenter().lat(),cityCircle.getCenter().lng()),_html,'map_node');
	}    
	google.maps.event.addDomListener(map,'click',function(){
		if($(".map_popup")){
			$(".map_popup").remove();
		}
	});
};
function nodePop(popup){
	var _id = $(popup).attr("data");
	if(_id == "googleNode"){
		googleClickData[0] = node_marker.id;//保存节点编号
		$('#'+_id).val(node_marker.id);
		clickRoad(node_marker.id);
	}else{
		if(googleClickData[0]){
			if(_id == "googleFrom_Node"){
				googleClickData[1] = node_marker.id;//保存路段编号
				var line_flow = forGoogleAllLine(node_marker.id,googleClickData[0]);
				$('#googleFlow').val(line_flow.flow);
			}else if(_id == "googleTo_Node"){
				googleClickData[2] = node_marker.id;
			}
			$('#'+_id).val(node_marker.id);
		}else{
			reviseAlert("选择节点");
		}
	}
	
}
function forGoogleAllLine(from,to){//返回符合 from_node、to_node 的路段
	for(var i in googleAllLine){
		if((googleAllLine[i].from_node_id == from && googleAllLine[i].to_node_id == to)||(googleAllLine[i].from_node_id == to && googleAllLine[i].to_node_id == from)){
			return googleAllLine[i];
		}
	}
}
function linePop(popup){
	var _id = $(popup).attr("data");
	if(_id == "googleFrom_Node"){
		if(googleClickData[0]){//保存路段节点
			if(googleClickData[0] == line_marker.from_node_id){//如果路段驶入编号等于节点编号
				googleClickData[1] = line_marker.to_node_id;
				$('#googleFlow').val(line_marker.flow);
				$('#'+_id).val(line_marker.to_node_id);
				clickLine(line_marker,"from");
			}else if(googleClickData[0] == line_marker.to_node_id){//如果路段驶出编号等于节点编号
				googleClickData[1] = line_marker.from_node_id;
				$('#googleFlow').val(line_marker.flow);
				$('#'+_id).val(line_marker.from_node_id);
				clickLine(line_marker,"from");
			}else{
				reviseAlert("选择有效路段");
			}
		
		}else if(!googleClickData[0]){
			reviseAlert("选择节点");
		}
	}else if(_id == "googleTo_Node"){
		if(googleClickData[0] && (googleClickData[0] == line_marker.from_node_id || googleClickData[0] == line_marker.to_node_id)){
			if(googleClickData[0] == line_marker.from_node_id){
				googleClickData[2] = line_marker.to_node_id;
				$('#'+_id).val(line_marker.to_node_id);
			}else if(googleClickData[0] == line_marker.to_node_id){
				googleClickData[2] = line_marker.from_node_id;
				$('#'+_id).val(line_marker.from_node_id);
			}
			clickLine(line_marker,"to");
		}else if(!googleClickData[0]){
			reviseAlert("选择节点");
		}else{
			reviseAlert("选择有效路段");
		}
	}
	
}
//节点编号弹窗
function nodePopup(latlng,_html,labelClass,position = 'center'){
	if($(".map_popup")){
		$(".map_popup").remove();
	}
	marker = new UserMarker(map,{latlng:latlng, angle: 0, labelText:_html, labelClass:labelClass,_position:position}); 
}

//保存路段属性
function clickRoad(_id) {
	for(var i = 0; i < googleAllNode.length; i++) {
		if(googleAllNode[i].id == _id) {
			var node = googleAllNode[i];
			if(old_node) {
				var itselfLineColor = {
					strokeColor: "green",
					fillColor: "green"
				};
				old_node.setOptions(itselfLineColor);
			}
			var itselfLineColor = {
				strokeColor: "red",
				fillColor: "red"

			};
			node.setOptions(itselfLineColor);
			old_node = node;
			for(var i = 0; i < googleAllLine.length; i++) {
				googleAllLine[i].setMap(map);
			}
		}
	}
}
function clickLine(line,old_Line){//选中路段变色
	if(old_Line == "from") {
		if(old_fromLine) {
			var itselfLineColor = {
				strokeColor: "green",
				fillColor: "green"
			};
			old_fromLine.setOptions(itselfLineColor);
		}
		var itselfLineColor = {
			strokeColor: "red",
			fillColor: "red"

		};
		line.setOptions(itselfLineColor);
		old_fromLine = line;
	} else if(old_Line == "to") {
		if(old_toLine) {
			var itselfLineColor = {
				strokeColor: "green",
				fillColor: "green"
			};
			old_toLine.setOptions(itselfLineColor);
		}
		var itselfLineColor = {
			strokeColor: "red",
			fillColor: "red"

		};
		line.setOptions(itselfLineColor);
		old_toLine = line;
	}

}
//*******************************************************google路网
function googleRoadAjax(map){
	var val = LatLngBounds();
	$.ajax({
     url:"GetRoadNet",
         dataType:"json",
         data:{ "action":"query","type":60,"pa":val},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
            googleLine(map,data.entitys);        
         },
         error:function()
         {

         }
  })
}
//绘制google路网
function googleLine(map,data){
	for(var i=0;i<data.length;i++){
		var lineData = [];
		for(var x=0,latlngArr = data[i][5].split(",");x<latlngArr.length;x++){
			var latlng = latlngArr[x].split(" ");
			lineData.push(new google.maps.LatLng(latlng[1],latlng[0]));
		}
		drawLine(map,lineData,data[i][0],data[i][1],data[i][2],data[i][3],data[i][4],'green');
	}    
}
function drawLine(map,lineData,ID,from_node_id,to_node_id,link_type,flow,color){//from_node_id驶入编号 to_node_id驶出编号 link_type路网段类型 flow路段流量
	 var line = new google.maps.Polyline({      
                path: lineData,      
                strokeColor: color,
                strokeOpacity: 1.0,  
                strokeWeight: 4 
            });      
      	line.id = ID;
      	line.from_node_id = from_node_id;
      	line.to_node_id = to_node_id;
      	line.link_type = link_type;
      	line.flow = flow;
      	
      	var flag = false;
      	for(var i=0;i<googleAllLine.length;i++){
      		if(line.from_node_id ==googleAllLine[i].to_node_id&&line.to_node_id ==googleAllLine[i].from_node_id){
      			flag =true;
//    			line.hidden = 1;
      			break;
      		}
      	}
      	
      	google.maps.event.addDomListener(line, 'rightclick', function(event){
//			clickLine(this);
			line_marker = this;//保存当前点击路段
		var _div = '<ul class="ul_all js_line_ul">'+
                    '<li class="look get_Google_node" data="googleFrom_Node" onclick="linePop(this)">驶入车道</li>'+//linePop 选择车道
                    '<li class="look get_Google_node" data="googleTo_Node" onclick="linePop(this)">驶出车道</li>'+
                '</ul>';
		nodePopup(event.latLng,_div,'map_popup','center');//路段弹窗
        });
        google.maps.event.addDomListener(line, 'click', function(){
//      	clickLine(this);
        });
        google.maps.event.addDomListener(line, 'mouseover', function(){
        	over_line(line,10);//路段粗细
        });
        google.maps.event.addDomListener(line, 'mouseout', function(){
        	over_line(line,4);
        });
        
        if(!flag){
	      	line.setMap(map);    
	      	googleAllLine.push(line);
      	}else{
      		line.setMap(null);
      	}
      	
}
function over_line(line,width){
	var wline ={
		strokeWeight:width
	}
	line.setOptions(wline);
}
//*******************************************************google路网  end

//*****************************************************google 文本框 
function UserMarker(map, options){
	// Now initialize all properties.   
    this._latlng = options.latlng; //设置图标的位置
    //this.image_ = options.image;  //设置图标的图片
    this._labelText = options.labelText || '标记';
    this._labelClass = options.labelClass || 'shadow';//设置文字的样式
//  this._index = g_markers.length;//
    this._angle = options.angle;
    this._position = options._position;
    //this.labelOffset = options.labelOffset || new google.maps.Size(8, -33);
    this._map= map;    

    this._div = null;
    
    this.setMap(map);
}

UserMarker.prototype = new google.maps.OverlayView();

UserMarker.prototype.onAdd = function() {
	//初始化文字标签
	var label = document.createElement('div');//创建文字标签
		label.className = this._labelClass;
//		label.id = this._index;
		label.style.zIndex = 102;
		label.style.cursor = "hand";
		label.style.position = 'absolute';
		label.innerHTML =this._labelText//'<span class="js-googleSpan" style="font-size:14px;color:#fff">'+this._labelText+'<span>';
	this._div = label;
	var panes = this.getPanes();  
	panes.floatPane.appendChild(label);
}

UserMarker.prototype.draw = function() { 
	 var overlayProjection = this.getProjection();   
	  var position = overlayProjection.fromLatLngToDivPixel(this._latlng);   //将地理坐标转换成屏幕坐标
	  var div = this._div;  
	  var divWidth = parseInt($(".js-googleSpan").css("width")); 
	  var divHeight = parseInt($(".js-googleSpan").css("height")); 
	  if(this._position == 'center'){
	  	div.style.left =position.x-(divWidth/2) + 'px';  
	  	div.style.top  =position.y-(divHeight/2) + 'px';
	  }else if(this._position == 'right'){
	  	div.style.left =position.x+(divWidth/2) + 'px';  
	  	div.style.top  =position.y+(divHeight/2) + 'px';
	  }else if(this._position == 'e'){
	  	div.style.left =position.x +'px';  
	  	div.style.top  =position.y + 'px';
	  }
	  
	  div.style.transform ="rotate("+this._angle+"deg)";
	  div.style.transformorigin="center center";
}

UserMarker.prototype.onRemove = function(){
	var divNode;
	for(var i=0;i<g_markers.length;i++){
		divNode=document.getElementById(i);
		if( divNode!=null )
			divNode.parentNode.removeChild(divNode);
	}
}
//*****************************************************google 文本框 end