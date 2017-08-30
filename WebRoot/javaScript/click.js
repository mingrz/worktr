var _Val;
//index里的两侧选项条里的文字变色
$(".u2 li input").click(function(){
  $(this).parent().toggleClass("blue");
});

$(".right_u2 li input").click(function(){
  $(this).each(function(){
    if($(this).prop("checked")==true){
      $(this).parent().css("color","red");
    }else{
      $(this).parent().css("color","#4d4d4d");
    }
  })
});
$("body").delegate(".lb input","click",function(){
   if($(this).prop("checked")==true){
      $(this).next("span").css("color","red");
    }else{
      $(this).next("span").css("color","#4d4d4d");
    }
});

//标记点第一个选择弹窗
function insertLeftData(ins,dataIn)
{
  
}
function setLeftData(ind,dataIn)
{ 
  var va,val,lonlat;
  va=getDataOption(ind);
  va=va.split(",");
  lonlat=getCurMarkerLonlat();
  if( ind==5 ){
    val="'"+dataIn[0]+"';'"+dataIn[1]+"';'"+dataIn[2]+"';'"+dataIn[3]+"';'"+dataIn[4]+"';'"+dataIn[5]+"';'"+dataIn[6]+"';'"+dataIn[7]+"';'"+dataIn[8]+"';'"+dataIn[9]+"';'"+dataIn[10]+"';'"+dataIn[11]+"';'"+dataIn[12]+"';'"+dataIn[13]+"';'"+dataIn[14]+"';'"+dataIn[15]+"';'"+dataIn[16]+"';'"+dataIn[17]+"';'"+dataIn[18]+"';'"+dataIn[19]+"';'"+dataIn[20]+"'";
  }else if( ind==6 ){
    val="'"+dataIn[0]+"';'"+dataIn[1]+"';'"+dataIn[2]+"';'"+dataIn[3]+"';"+lonlat.lon+" "+lonlat.lat+"]";
  }else if( ind==7 ){
    val="'"+dataIn[0]+"';'"+dataIn[1]+"';'"+dataIn[2]+"';'"+dataIn[3]+"';'{"+dataIn[4]+','+dataIn[5]+"}';"+
    "'0';'0';"+lonlat.lon+" "+lonlat.lat+"]";
  }else if( ind==8 ){
    val="'"+dataIn[0]+"';'"+dataIn[1]+"';'"+dataIn[2]+"';'"+dataIn[3]+"';"+lonlat.lon+" "+lonlat.lat+"]";
  }else if( ind==10 ){
    val="'"+dataIn[0]+"';'"+dataIn[1]+"';'"+dataIn[2]+"';'"+dataIn[3]+"';'"+dataIn[4]+"';"+lonlat.lon+" "+lonlat.lat+"]";
  }else if( ind==11 ){
    val="'"+dataIn[0]+"';'"+dataIn[1]+"';'"+dataIn[2]+"';'"+dataIn[3]+"';'"+dataIn[4]+"';"+lonlat.lon+" "+lonlat.lat+"]";
  }else if(ind==13||ind==14||ind==15||ind==16||ind==17||ind==19||ind==20||ind==21||ind==22){
    val="'"+dataIn[0]+"';'"+dataIn[1]+"';'"+(ind-12)+"';'"+dataIn[2]+"';'"+dataIn[3]+"';'"+dataIn[4]+"';'"+dataIn[5]+"';'"+dataIn[6]+"';"+
    "'0';'0';'0';'0';"+"'"+dataIn[7]+"';'"+dataIn[8]+"';"+lonlat.lon+" "+lonlat.lat+"]";
  }else if(ind==18||ind==23){
    val="'"+dataIn[0]+"';'"+dataIn[1]+"';'"+(ind-12)+"';'"+dataIn[2]+"';'"+dataIn[3]+"';'"+dataIn[4]+"';'"+dataIn[5]+"';'"+dataIn[6]+"';'"+dataIn[7]+"';"+
    "'0';'0';'0';"+"'"+dataIn[8]+"';'"+dataIn[9]+"';"+lonlat.lon+" "+lonlat.lat+"]";
  }else if(ind==24||ind==25||ind==26){
    val="'"+dataIn[0]+"';'"+dataIn[1]+"';'"+(ind-12)+"';'"+dataIn[2]+"';'"+dataIn[3]+"';'"+dataIn[4]+"';"+
    "'0';'0';'0';'0';'0';"+"'"+dataIn[5]+','+dataIn[6]+','+dataIn[7]+"';'"+dataIn[8]+"';"+"'0';"+lonlat.lon+" "+lonlat.lat+"]";
  }else if(ind==27||ind==28){
    val="'"+dataIn[0]+"';'"+dataIn[1]+"';'"+(ind-12)+"';'"+dataIn[2]+"';'"+dataIn[3]+"';'"+dataIn[4]+"';'"+dataIn[7]+"';'"+dataIn[8]+"';"+
    "'0';"+"'"+dataIn[5]+"';'"+dataIn[6]+"';"+"'0';'"+dataIn[9]+"';"+"'0';"+lonlat.lon+" "+lonlat.lat+"]";
  }else if(ind==29){
    val="'"+dataIn[0]+"';'"+dataIn[1]+"';'"+(ind-12)+"';'"+dataIn[2]+"';'"+dataIn[4]+"';'"+dataIn[5]+"';"+"'0';"+"'"+dataIn[7]+"';"+
    "'0';'0';"+"'"+dataIn[3]+"';'"+dataIn[8]+"';'"+dataIn[9]+"';'"+dataIn[10]+"';"+lonlat.lon+" "+lonlat.lat+"]";
  }else if(ind==9){//||ind==12
    val="'"+dataIn[0]+"';'"+dataIn[1]+"';'"+dataIn[2]+"';'"+dataIn[3]+"';'"+dataIn[4]+"';'"+dataIn[5]+"';"+lonlat.lon+" "+lonlat.lat+"]";
  }else if(ind==12){//||ind==12
    val="'"+dataIn[0]+"';'"+dataIn[7]+"';'"+dataIn[1]+"';'"+dataIn[2]+"';'"+dataIn[3]+"';'"+dataIn[4]+"';"+lonlat.lon+" "+lonlat.lat+"]";
  }else if(ind==30){
    val="'"+dataIn[0]+"';'"+dataIn[1]+"';'"+(ind-12)+"';'"+dataIn[2]+"';'"+dataIn[3]+"';'"+dataIn[4]+"';"+
    "'0';'0';'0';'0';'0';"+"'"+dataIn[6]+','+dataIn[7]+','+dataIn[8]+','+dataIn[9]+"';'"+dataIn[10]+"';"+"'0';"+lonlat.lon+" "+lonlat.lat+"]";
  }
  
  // ajax_Marker(va[0],va[1],(ind+1)*10+0+'',2,ind,val);
  if(ind==9||ind==12){
    ajax_Marker(va[0],'insert',(ind+1)*10+0+'',2,ind,val);
  }else{
    ajax_Marker(va[0],va[1],(ind+1)*10+0+'',2,ind,val);
  }
}
//删除动态事件ajax
function deleteEventsMarker(){
  var type;
  var marker=getCurMarkerid().split("_");
  var ma=getCurMarker();
  var datatype=ma.id.substring(0,ma.id.indexOf("_"));
  var markerlayer=supermap.getLayersByName("markerLayer"+datatype);
  markerlayer[0].removeMarker(ma);
    if( marker[0]==13 ){
            type = 1;
        } else if( marker[0]==14 )
            type = 2;
        else if( marker[0]==15 )
            type = 3;
        else if( marker[0]==16 )
            type = 4;
        else if( marker[0]==17 )
            type = 5;
        else if( marker[0]==18 )
            type = 6;
        else if( marker[0]==19 )
            type = 7;
        else if( marker[0]==20 )
            type = 8;
        else if( marker[0]==21 )
            type = 9;
        else if( marker[0]==22 )
            type = 10;
        else if( marker[0]==23 )
            type = 11;
        else if( marker[0]==24 )
            type = 12;
        else if( marker[0]==25 )
            type = 13;
        else if( marker[0]==26 )
            type = 14;
        else if( marker[0]==27 )
            type = 15;
        else if( marker[0]==28 )
            type = 16;
        else if( marker[0]==29 )
            type = 17;
        else if( marker[0]==30 )
            type = 18; 
  $.ajax({
     url:"GetScenario",
         dataType:"json",
         data:{ "action":"delete","val":marker[1]+","+type},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
            reviseAlert("删除成功！");         
         },
         error:function()
         {

         }
  })
  zhao_none('.zhao,.jd_nodes');
}
//设备里的图表部分
// function ajax_MarkerDatas(ind,choice_name){
//   var va,id,ind,cur,val;
//   cur=getCurMarkerid();
//   id=cur.substring(cur.indexOf("_")+1,cur.length);
//   ind=parseInt(cur.substring(0,cur.indexOf("_")));
//   va=getDataType(ind,1);
//   va=va.split(",");
//   val="{ID:"+id+"}";
//   $.ajax({
//      url:va[0],
//          dataType:"json",
//          data:{"action":"query","type":va[1],"val":val},
//          contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
//          beforeSend:function(){  },
//          success: function( data, textStatus, jqXHR ){
//             //name(data);
//             chartsDetailAttr(ind,data,choice_name);
//          },
//          error:function(){}
//   })
// }

// function createChartsDialog( title,ind,fields,data,parent ){
//   var content='';
//   content+='<div class="content_kuang">'+
//         '<div class="z_title">'+
//             '<p class="title_left">'+title[0]+'</p>'+
//             '<p class="title_right">'+title[1]+'<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.content_kuang\')"></p>'+
//         '</div>'+
//         '<div class="content">'+
//             '<div class="content_left">'+
//                 '<div id="carFlow"></div>'+ 
//             '</div>'+
//             '<div class="content_right">'+
//                 '<ul class="cRight_u1"></ul>'+
//                 '<ul class="cRight_u2"></ul>'+
//             '</div>'+
//         '</div>'+
//     '</div>'
//     $('body').append(content);
//   setChartsDialogContext(fields,data,parent);
// }
// function setChartsDialogContext(fields,data,parent){
//     var ss,lonlat;
//     var nr='';
//     ss=getCurMarkerLonlat();
//     lonlat=new SuperMap.LonLat(ss.lon,ss.lat);
//     lonlat.transform("EPSG:900913", "EPSG:4326" );
    
//     //var nr=head;
//     for(var i=0;i<fields.length;i+=2){
//       if( fields[i]=='经度坐标' )
//         ss=lonlat.lon.toFixed(6);
//       else if( fields[i]=='纬度坐标' )
//         ss=lonlat.lat.toFixed(6);
//       else
//         {
//           var _index = fields[i+1];
//           ss=data.entitys[_index];
//         }
//       nr+='<li>'+fields[i]+':<span class="sp_right">'+ss+'</span></li>';
//     }
//     $(parent).append(nr);
// }

function setRoadTime(){
  $(".zhao").css("display","block");
  doRoadTime();
}

//路段MOE汇总分析 导出CVS文件
    function clickDownload(aLink)
    {
      var str = "";
      var th_length=$(".MOE_biao th").length;
      $(".MOE_biao th").each(function(){
        
        if(($(this).index()+1)%th_length==0){
          str+=$(this).text()+"\n";
        }else{
          str+=$(this).text()+",";
        }
      });

      $(".MOE_biao td").each(function(){
        if(($(this).index()+1)%th_length==0){
          str+=$(this).text()+"\n";
        }else{
          str+=$(this).text()+",";
        }
      });
        str =  encodeURIComponent(str);
        aLink.href = "data:text/csv;charset=utf-8,\ufeff"+str;
    }



function setnodeVal(arg){
  $(".zhao").css("display","block");
  NodesAttribute(arg);
}
function NodesAttribute(arg){//路段节点属性的ajax
  // var gmarkerId=node_ID.id;
  var gmarkerId=arg.id;
  gmarkerId=gmarkerId.split("_")[1];
  var _val="{'ID':"+gmarkerId+"}";
  $.ajax({
     url:"GetDevice",
         dataType:"json",
         data:{ "action":"query","type":11,"val":_val},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               doNodes( data,arg);
         },
         error:function()
         {

         }
  })
}
function doNodes(data,arg){//节点属性
    //var coord=node_ID.lonlat;
    // var poslon=new SuperMap.LonLat(node_ID.lonlat.lon,node_ID.lonlat.lat);
    var poslon=new SuperMap.LonLat(arg.geometry.x,arg.geometry.y);
    var coord=poslon.transform("EPSG:900913", "EPSG:4326" ); 
    var cLon=coord.lon.toFixed(6)-0;
    var cLat=coord.lat.toFixed(6)-0;
    var nr='';
    var da=['节点编号','节点名称','经度坐标','纬度位置','控制类型'];
    nr+='<div id="jd_nodes" class="jd_nodes" style="height:186px">'+
           '<p class="tj_title">道路节点属性'+
               '<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.jd_nodes\')" />'+
           '</P>'+
           '<ul class="node_ul">'+
               '<li><span>节点编号</span><input type="text" name="" value="'+data.entitys[0]+'"/></li>'+
               '<li><span>节点名称</span><input type="text" name="" value="'+data.entitys[1]+'" readonly="readonly"/></li>'+
               '<li><span>经度坐标</span><input type="text" name="" value="'+cLon+'" readonly="readonly"/></li>'+
               '<li><span>纬度位置</span><input type="text" name="" value="'+cLat+'" readonly="readonly"/></li>'+
               '<li><span>控制类型</span>'+
                   '<select class="select1 sec1" id="controlType">'+
                       '<option>0-未知</option>'+
                       '<option>1-无控制</option>'+
                       '<option>2-让行标志</option>'+
                       '<option>3-双向停车标志</option>'+
                       '<option>4-四向停车标志</option>'+
                       '<option>5-定时信号控制</option>'+
                       '<option>6-感应控制</option>'+
                       '<option>100-交通环岛</option>'+
                   '</select>'+
               '</li>'+
               // '<li><span>信号周期</span><input type="text" name="" value="'+data.entitys[3]+'"/></li>'+
               '<p class="pIptFrame"><input type="button" value="确定修改"><input type="button" value="取消"></p>'+
           '</ul>'+
       '</div>';
    $('body').append(nr);
    $(".pIptFrame").css({"width":"100%","height":"22px","text-align":"center","margin-top":"8px"});
    $(".pIptFrame input").css({"padding":"0px 2px","margin-left":"12px","margin-right":"12px","font-size": "0.75em"});
    $("#controlType option").eq(data.entitys[2]).attr("selected", true);
    divDrag('.tj_title','.jd_nodes');
   }
function setroadNetVal(){//路段属性显示
  $(".zhao").css("display","block");
  roadNetAttribute('charts_val');
}
function setRoadFlow(){//路段流量数据显示
  $(".zhao").css("display","block");
  roadNetAttribute();
}
function setroadTrip(){//路段旅行时间报表显示
  $(".zhao").css("display","block");
  var _val="{'ID':"+roadID+"}";
  $.ajax({
     url:"GetDevice",
         dataType:"json",
         data:{ "action":"query","type":31,"val":_val},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
          doRoadTip(data);
         },
         error:function()
         {

         }
  }); 
}
function roadNetAttribute(arg){//路段属性的ajax
 
  if($("#ipt2").prop("checked")==true){
	  var roadID = arg.id;
	  roadID=roadID.split("_")[1];
	  var _val="{'ID':"+roadID+"}";
	  $.ajax({
	     url:"GetDevice",
	         dataType:"json",
	         data:{ "action":"query","type":31,"val":_val},
	         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
	         beforeSend:function(){  },
	         success: function( data, textStatus, jqXHR ){
	               roadNetVal( data );
	         },
	         error:function()
	         {
	
	         }
	  })
  }else if($("#right_ipt4").prop("checked")==true){
  	var roadID = arg.id.split("_")[1];
  	getChoiceRoadData(roadID);
  }
}
function roadNetVal(data){
  var content='';
  content+='<div class="environment_Data_statistics jd_nodes" style="width:1000px;height:530px">'+
            '<p class="tj_title">所选道路路段信息'+
                '<img src="images/min.png" class="empty_btn" style="cursor:pointer" onclick="zhao_none(\'.zhao\',\'.jd_nodes\')">'+
            '</P>'+
            '<ul class="concertMainTitle_ul">'+
                '<li class="mainUl_li1">'+
                  '<span>路段数据类型</span>'+
                  '<select id="road_targetSelect1" style="width:127px">'+
                    '<option>路段仿真车流量统计</option>'+
                    '<option>路段仿真旅行时间统计</option>'+
                  '</select>'+
                '</li>'+
                '<li class="mainUl_li7 titleLi1">'+
                  '<span>统计开始时间</span>'+
                  '<input type="text" id="roadTime_1" value="2016-04-01 07:00:00" onClick="jeDate({dateCell:\'#roadTime_1\',isTime:true,format:\'YYYY-MM-DD hh:MM:ss\'})">'+
                '</li>'+
                '<li class="mainUl_li7 titleLi1">'+
                  '<span>统计结束时间</span>'+
                  '<input type="text" id="roadTime_2" value="2016-04-01 17:00:00" onClick="jeDate({dateCell:\'#roadTime_2\',isTime:true,format:\'YYYY-MM-DD hh:MM:ss\'})">'+
                '</li>'+
                '<li class="mainUl_li3">'+
                  '<input type="button" value="确定">'+
                '</li>'+
            '</ul>'+
            '<div class="content">'+
                '<div id="chart" class="content_left chart"></div>'+
                '<div class="content_right">'+
                    '<p class="z_title">路段属性编辑<p>'+
                    '<ul class="node_ul node_ultimate_bg">'+
                      '<li><span>路段编号</span><input type="text" name="" value="'+data.entitys[0]+'"/></li>'+
                      '<li><span>起始节点</span><input type="text" name="" value="'+data.entitys[1]+'"/></li>'+
                      '<li><span>终止节点</span><input type="text" name="" value="'+data.entitys[2]+'"/></li>'+
                      '<li><span>路段长度</span><input type="text" name="" value="'+data.entitys[3]+'km"/></li>'+
                      '<li><span>路段名称</span><input type="text" name="" value="'+data.entitys[4]+'"/></li>'+
                      '<li><span>路段类型</span>'+
                          '<select id="road_targetSelect2">'+
                              '<option>1-城市快速路</option>'+
                              '<option>2-城市主干道</option>'+
                              '<option>3-城市次干道</option>'+
                              '<option>4-城市支路</option>'+
                              '<option>5-路口连接线</option>'+
                              '<option>6-城市内辅路</option>'+
                              '<option>7-城市内匝道</option>'+
                              '<option>8-城市内胡同</option>'+
                              '<option>9-城市外辅路</option>'+
                              '<option>10-城市外匝道</option>'+
                              '<option>11-小区连杆</option>'+
                              '<option>12-高速公路</option>'+
                              '<option>13-一级公路</option>'+
                              '<option>14-二级公路</option>'+
                              '<option>15-三级公路</option>'+
                              '<option>16-四级公路</option>'+
                              '<option>100-公交专用道</option>'+
                              '<option>200-步行专用道</option>'+
                          '</select>'+
                      '</li>'+
                      '<li><span>路段方向</span>'+
                          '<select id="road_targetSelect3">'+
                              '<option>0-双向</option>'+
                              '<option>1-单向</option>'+
                          '</select>'+
                      '</li>'+
                      '<li><span>允许需求</span>'+
                          '<select id="road_targetSelect4">'+
                              '<option>1-客车</option>'+
                              '<option>2-货车</option>'+
                              '<option>3-公交车</option>'+
                              '<option>4-普通公交车</option>'+
                              '<option>5-自行车类</option>'+
                          '</select>'+
                      '</li>'+
                      '<li><span>车道数量</span><input type="text" name="" value="'+data.entitys[7]+'"/></li>'+
                      '<li><span>限速数值</span><input type="text" name="" value="'+data.entitys[8]+'km/h"/></li>'+
                      '<li><span>车道能力</span><input type="text" name="" value="'+data.entitys[9]+'vph"/></li>'+
                      '<li><span>阻塞密度</span><input type="text" name="" value="'+data.entitys[10]+'vhc"/></li>'+
                      '<li><span>拥堵波速</span><input type="text" name="" value="12km/h"/></li>'+
                      '<p class="p_btFrame"><input type="button" value="确定修改"><input type="button" value="取消" onclick="zhao_none(\'.zhao\',\'.jd_nodes\')"></p>'+
                  '</ul>'+
                  '<ul class="ul_btFrame">'+
                      '<li><input type="button" value="导出数据"><input type="button" value="导出图表"></li>'+
                  '</ul>'+
                '</div>'+
            '</div>'+
        '</div>';
  $('body').append(content);
  $("#road_targetSelect2 option").eq(data.entitys[5]).attr("selected", true);
  $("#road_targetSelect3 option").eq(data.entitys[6]).attr("selected", true);
  $("#road_targetSelect4 option").eq(1).attr("selected", true);
  divDrag('.tj_title','.jd_nodes');
  roadChartsData();
}
// //路段流量样图
// function doRoadFlow(data){//路段属性中的（路段流量数据统计）
//   var nr='';
//   nr+='<div class="content_kuang">'+
//         '<div class="z_title">'+
//             '<p class="title_left">路段流量数据统计</p>'+
//             '<p class="title_right">路段属性<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.content_kuang\')"></p>'+
//         '</div>'+
//         '<div class="content">'+
//             '<div class="content_left">'+
//                 '<div id="road_flow"></div>'+
//                 // '<p class="ps"><span>说明:此处显示路段进、出、留的车辆数据,3条曲线</span></p>'+
//            ' </div>'+
//             '<div class="content_right">'+
//                 '<ul class="ul_all" id="road_ulHeight">'+
//                     '<li style="line-height: 22px">路段编号:<span class="sp_right">'+data.entitys[0]+'</span></li>'+
//                     '<li style="line-height: 22px">路段类型:<span class="sp_right">'+data.entitys[2]+'</span></li>'+
//                     '<li style="line-height: 22px">起始节点:<span class="sp_right">'+data.entitys[3]+'</span></li>'+
//                     '<li style="line-height: 22px">终止节点:<span class="sp_right">'+data.entitys[4]+'</span></li>'+
//                     '<li style="line-height: 22px">路段方向:<span class="sp_right">'+data.entitys[5]+'</span></li>'+
//                     '<li style="line-height: 22px">路段长度:<span class="sp_right">'+data.entitys[6]+'</span></li>'+
//                     '<li style="line-height: 22px">车道数量:<span class="sp_right">'+data.entitys[7]+'</span></li>'+
//                     '<li style="line-height: 22px">限速数值:<span class="sp_right">'+data.entitys[8]+'</span></li>'+
//                     '<li style="line-height: 22px">车道能力:<span class="sp_right">'+data.entitys[9]+'</span></li>'+
//                     '<li style="line-height: 22px">阻塞密度:<span class="sp_right">'+data.entitys[10]+'</span></li>'+
//                     '<li style="line-height: 22px">左转道数:<span class="sp_right">'+data.entitys[11]+'</span></li>'+
//                     '<li style="line-height: 22px">左转道长:<span class="sp_right">'+data.entitys[12]+'</span></li>'+
//                     '<li style="line-height: 22px">右转道数:<span class="sp_right">'+data.entitys[13]+'</span></li>'+
//                     '<li style="line-height: 22px">右转道长:<span class="sp_right">'+data.entitys[14]+'</span></li>'+
//                 '</ul>'+
//             '</div>'+
//         '</div>'+
//     '</div>';
//     $('body').append(nr);
//     roadChartsData();
// }
//动态生成插入
function houseAttribute(arg){//小区的ajax
  $(".zhao").css("display","block");
  var gmarkerId=arg.id;
  gmarkerId=gmarkerId.split("_")[1];
  var _val="{'ID':"+gmarkerId+"}";
  $.ajax({
     url:"GetDevice",
         dataType:"json",
         data:{ "action":"query","type":41,"val":_val},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               dohouse( data );
         },
         error:function()
         {

         }
  })
}
function dohouse(data){//小区内容弹出框
  var content='';
  content+='<div class="environment_Data_statistics jd_nodes" style="width:1000px;height:530px">'+
            '<p class="tj_title">所选交通小区信息'+
                '<img src="images/min.png" class="empty_btn" style="cursor:pointer" onclick="zhao_none(\'.zhao\',\'.jd_nodes\')">'+
            '</P>'+
            '<ul class="concertMainTitle_ul">'+
                '<li class="mainUl_li1">'+
                  '<span>小区数据类型</span>'+
                  '<select id="road_targetSelect1" style="width:127px">'+
                    '<option>产生出行需求统计</option>'+
                    '<option>吸引出行需求统计</option>'+
                  '</select>'+
                '</li>'+
                '<li class="mainUl_li7 titleLi1">'+
                  '<span>统计开始时间</span>'+
                  '<input type="text" id="nodeTime_1" value="2016-04-01 07:00:00" onClick="jeDate({dateCell:\'#nodeTime_1\',isTime:true,format:\'YYYY-MM-DD hh:MM:ss\'})">'+
                '</li>'+
                '<li class="mainUl_li7 titleLi1">'+
                  '<span>统计结束时间</span>'+
                  '<input type="text" id="nodeTime_2" value="2016-04-01 17:00:00" onClick="jeDate({dateCell:\'#nodeTime_2\',isTime:true,format:\'YYYY-MM-DD hh:MM:ss\'})">'+
                '</li>'+
                '<li class="mainUl_li3">'+
                  '<input type="button" value="确定">'+
                '</li>'+
            '</ul>'+
            '<div class="content">'+
                '<div id="chart" class="content_left chart"></div>'+
                '<div class="content_right">'+
                  '<p class="z_title">小区属性编辑<p>'+
                  '<ul class="node_ul node_ultimate_bg">'+
                      '<li><span>小区编号</span><input type="text" name="" value="'+data.entitys[0][0]+'"/></li>'+
                      '<li><span>小区面积</span><input type="text" name="" value="'+parseInt(data.entitys[0][1])+'"/></li>'+
                      '<li><span>小区出口</span><input type="text" name="" value="'+data.entitys[0][2]+'个"/></li>'+
                      '<li><span>小区入口</span><input type="text" name="" value="'+data.entitys[0][3]+'个"/></li>'+
                      '<li><span>小区名称</span><input type="text" name="" value="'+data.entitys[0][4]+'"/></li>'+
                      '<p class="p_btFrame"><input type="button" value="确定修改"><input type="button" value="取消" onclick="zhao_none(\'.zhao\',\'.jd_nodes\')"></p>'+
                  '</ul>'+
                  '<p class="z_title">小区出入点属性编辑<p>'+
                  '<ul class="node_ul node_ultimate_bg">'+
                      '<li><span>节点编号</span><input type="text" name="" value="'+data.entitys[1][0]+'"/></li>'+
                      '<li><span>进出类型</span><select class="sec2" id="nodeSec2"><option>0-双向</option><option>1-只进入</option><option>-1-只离开</option></select></li>'+
                      '<li><span>连杆数量</span><input type="text" name="" value="'+data.entitys[1][2]+'条"/></li>'+
                      '<li><span>连杆能力</span><input type="text" name="" value="'+data.entitys[1][3]+'v/h"/></li>'+
                      '<p class="p_btFrame"><input type="button" value="确定修改"><input type="button" value="取消" onclick="zhao_none(\'.zhao\',\'.jd_nodes\')"></p>'+
                      '<li><label for="nodeLink"><input type="checkbox" name="nodeLink" class="nodeLG" id="nodeLink"><span>显示交通小区连接杆</span></label></li>'+
                  '</ul>'+
                  '<ul class="ul_btFrame">'+
                      '<li><input type="button" value="导出数据"><input type="button" value="导出图表"></li>'+
                  '</ul>'+
                '</div>'+
            '</div>'+
        '</div>';
  $('body').append(content);
  $("#nodeSec2 option").eq(data.entitys[1][2]).attr("selected", true);
  divDrag('.tj_title','.jd_nodes');
  _data=[
          ["2016-04-01 05:00:00","100"],["2016-04-01 05:30:00","500"],["2016-04-01 06:00:00","700"],["2016-04-01 06:30:00","80"],
          ["2016-04-01 07:00:00","120"],["2016-04-01 07:30:00","320"],["2016-04-01 08:00:00","90"],["2016-04-01 08:30:00","0"],["2016-04-01 09:00:00","100"]
          ,["2016-04-01 09:30:00","400"],["2016-04-01 10:00:00","600"],["2016-04-01 10:30:00","210"],["2016-04-01 11:00:00","99"],
          ["2016-04-01 11:30:00","146"],["2016-04-01 12:00:00","500"],["2016-04-01 12:30:00","360"],["2016-04-01 13:00:00","250"],
          ["2016-04-01 13:30:00","600"]
        ]
  houseChartsData('出行量',_data);
  $("body").delegate("#road_targetSelect1","change",function(){
      $("#chart").remove();
      var html='<div id="chart" class="content_left chart"></div>';
      $(".content").append(html);
      if($(this)[0].selectedIndex==0){
        _data=[
          ["2016-04-01 05:00:00","100"],["2016-04-01 05:30:00","500"],["2016-04-01 06:00:00","700"],["2016-04-01 06:30:00","80"],
          ["2016-04-01 07:00:00","120"],["2016-04-01 07:30:00","320"],["2016-04-01 08:00:00","90"],["2016-04-01 08:30:00","0"],["2016-04-01 09:00:00","100"]
          ,["2016-04-01 09:30:00","400"],["2016-04-01 10:00:00","600"],["2016-04-01 10:30:00","210"],["2016-04-01 11:00:00","99"],
          ["2016-04-01 11:30:00","146"],["2016-04-01 12:00:00","500"],["2016-04-01 12:30:00","360"],["2016-04-01 13:00:00","250"],
          ["2016-04-01 13:30:00","600"]
        ]
          houseChartsData('出行量',_data);
      }else if($(this)[0].selectedIndex==1){
        _data=[
          ["2016-04-01 05:00:00","200"],["2016-04-01 05:30:00","500"],["2016-04-01 06:00:00","700"],["2016-04-01 06:30:00","900"],
          ["2016-04-01 07:00:00","900"],["2016-04-01 07:30:00","320"],["2016-04-01 08:00:00","90"],["2016-04-01 08:30:00","0"],["2016-04-01 09:00:00","100"]
          ,["2016-04-01 09:30:00","400"],["2016-04-01 10:00:00","600"],["2016-04-01 10:30:00","210"],["2016-04-01 11:00:00","99"],
          ["2016-04-01 11:30:00","600"],["2016-04-01 12:00:00","500"],["2016-04-01 12:30:00","360"],["2016-04-01 13:00:00","250"],
          ["2016-04-01 13:30:00","600"]
        ]
          houseChartsData('驶入量',_data);
      }
  })
}
//旅行时间样本统计图表
function doTripTime(data){
  var poslon=new SuperMap.LonLat(gmarker.lonlat.lon,gmarker.lonlat.lat);
    var coord=poslon.transform("EPSG:900913", "EPSG:4326" ); 
    var cLon=coord.lon.toFixed(6)-0;
    var cLat=coord.lat.toFixed(6)-0;
  var nr='';
  nr+='<div class="content_kuang">'+
        '<div class="z_title">'+
            '<p class="title_left">旅行时间样本量统计</p>'+
            '<p class="title_right">旅行时间设备属性<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.content_kuang\')"></p>'+
        '</div>'+
        '<div class="content">'+
            '<div class="content_left">'+
                '<div id="tripTime"></div>'+
            '</div>'+
            '<div class="content_right">'+
                '<ul class="ul_all" style="height:320px">'+
                    '<li>设备编号:<span class="sp_right">'+data.entitys[0]+'</span></li>'+
                    '<li>位置名称:<span class="sp_right">'+data.entitys[1]+'</span></li>'+
                    '<li>经度坐标:<span class="sp_right">'+cLon+'</span></li>'+
                    '<li>纬度坐标:<span class="sp_right">'+cLat+'</span></li>'+
                    '<li>设备类型:<span class="sp_right">'+data.entitys[2]+'</span></li>'+
                '</ul>'+
            '</div>'+
        '</div>'+
    '</div>';
    $('body').append(nr);
    TripCharts();
}
//排放检测图表框
function EnvironmentDatas(){
  $(".zhao").css("display","block");
  var content='';
  content+='<div class="EnvironmentFrame">'+
        '<div class="Chart_frame">'+
                      '<p class="tj_title">环境观测数据统计<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.EnvironmentFrame\')"/></p>'+
                      '<div class="chart">'+
                          '<p class="chartTitle">'+
                              '<span>综合指数</span>'+
                              '<span class="pm" onclick="changeData(this,\'#chartData_show_PM\')">PM2.5/PM10</span>'+
                              '<span class="so2" onclick="changeData(this,\'#chartData_show_SO2\')">SO2</span>'+
                              '<span class="no2" onclick="changeData(this,\'#chartData_show_NO2\')">NO2</span>'+
                              '<span class="co" onclick="changeData(this,\'#chartData_show_CO\')">CO</span>'+
                              '<span class="o3" onclick="changeData(this,\'#chartData_show_O3\')">O3</span>'+
                          '</p>'+
                          '<div class="chartData_show" id="chartData_show_PM"></div>'+
                          '<div class="chartData_show" id="chartData_show_SO2" style="display: none"></div>'+
                          '<div class="chartData_show" id="chartData_show_NO2" style="display: none"></div>'+
                          '<div class="chartData_show" id="chartData_show_CO" style="display: none"></div>'+
                          '<div class="chartData_show" id="chartData_show_O3" style="display: none"></div>'+
                      '</div>'+
                  '</div>'+
      '</div>';
  $("body").append(content);
  charts_data();
}

//路段旅行时间统计
function doRoadTime(){
  var nr='';
  var data=['路段编号','路段名称','路段类型','起始节点','路段方向','路段长度','车道数量','车限速值','车道能力','阻塞密度','左转道数','右转道数','右转道长'];
  var Val=['8799','万家丽路','4-主干道','2','1','5','4','80','800','180','0','0','0'];
  nr+='<div class="content_kuang">'+
        '<div class="z_title">'+
            '<p class="title_left">路段旅行时间统计</p>'+
            '<p class="title_right">路段属性<img src="images/min.png" class="empty_btn"onclick="zhao_none(\'.zhao\',\'.content_kuang\')"></p>'+
        '</div>'+
        '<div class="content">'+
            '<div class="content_left">'+
                '<div id="road_time"></div>'+
            '</div>'+
            '<div class="content_right">'+
                '<ul class="ul_all">'+
                    '<li>'+data[0]+':<span class="sp_right">'+Val[0]+'</span></li>'+
                    '<li>'+data[1]+':<span class="sp_right">'+Val[1]+'</span></li>'+
                    '<li>'+data[2]+':<span class="sp_right">'+Val[2]+'</span></li>'+
                    '<li>'+data[3]+':<span class="sp_right">'+Val[3]+'</span></li>'+
                    '<li>'+data[4]+':<span class="sp_right">'+Val[4]+'</span></li>'+
                    '<li>'+data[5]+':<span class="sp_right">'+Val[5]+'</span></li>'+
                    '<li>'+data[6]+':<span class="sp_right">'+Val[6]+'</span></li>'+
                    '<li>'+data[7]+':<span class="sp_right">'+Val[7]+'</span></li>'+
                    '<li>'+data[8]+':<span class="sp_right">'+Val[8]+'</span></li>'+
                    '<li>'+data[9]+':<span class="sp_right">'+Val[9]+'</span></li>'+
                    '<li>'+data[10]+':<span class="sp_right">'+Val[10]+'</span></li>'+
                    '<li>'+data[11]+':<span class="sp_right">'+Val[11]+'</span></li>'+
                    '<li>'+data[12]+':<span class="sp_right">'+Val[12]+'</span></li>'+
                '</ul>'+
            '</div>'+
        '</div>'+
    '</div>';
    $('body').append(nr);
}


//信号机相位图
// function doXinhaoji(){
//  var nr='';
//  var data=['设备编号','设备位置','路口名称','生产厂家','经度坐标','纬度坐标','控制类型','信号周期','相位差'];
//  var Val=['87','99','万家丽路口','南京莱斯','2.990533','23.709122','2-感应控制','120s','2.20s'];
//  nr+='<div class="content_kuang">'+
//         '<div class="z_title">'+
//             '<p class="title_left">信号机相位图</p>'+
//             '<p class="title_right">信号机属性<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.content_kuang\')"></p>'+
//         '</div>'+
//         '<div class="content">'+
//             '<div class="content_left">'+
//                 '<div id="semaphore"><img src="images/jiqi.jpg"/></div>'+
//             '</div>'+
//             '<div class="content_right">'+
//                 '<ul class="ul_all">'+
//                     '<li>'+data[0]+':<span class="sp_right">'+Val[0]+'</span></li>'+
//                     '<li>'+data[1]+':<span class="sp_right">'+Val[1]+'</span></li>'+
//                     '<li>'+data[2]+':<span class="sp_right">'+Val[2]+'</span></li>'+
//                     '<li>'+data[3]+':<span class="sp_right">'+Val[3]+'</span></li>'+
//                     '<li>'+data[4]+':<span class="sp_right">'+Val[4]+'</span></li>'+
//                     '<li>'+data[5]+':<span class="sp_right">'+Val[5]+'</span></li>'+
//                     '<li>'+data[6]+':<span class="sp_right">'+Val[6]+'</span></li>'+
//                     '<li>'+data[7]+':<span class="sp_right">'+Val[7]+'</span></li>'+
//                     '<li>'+data[8]+':<span class="sp_right">'+Val[8]+'</span></li>'+
//                 '</ul>'+
//             '</div>'+
//         '</div>'+
//     '</div>';
//     $('body').append(nr);
// }


//环境监测站数据统计
// function doEnvironment(){
//  var nr='';
//  var data=['环境站编号','路段编号','路段名称','设备厂家','经度坐标','纬度坐标','设备类型'];
//  var Val=['87','99','万家丽路口'  ,'纳诺信','2.709122','23.709122','全要素'];
//  nr+='<div class="content_kuang">'+
//         '<div class="z_title">'+
//             '<p class="title_left">环境监测站数据统计</p>'+
//             '<p class="title_right">环境监测站属性<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.content_kuang\')"></p>'+
//         '</div>'+
//         '<div class="content">'+
//             '<div class="content_left">'+
//                 '<div id="environment"></div>'+
//             '</div>'+
//             '<div class="content_right">'+
//                 '<ul class="ul_all">'+
//                     '<li>'+data[0]+':<span class="sp_right">'+Val[0]+'</span></li>'+
//                     '<li>'+data[1]+':<span class="sp_right">'+Val[1]+'</span></li>'+
//                     '<li>'+data[2]+':<span class="sp_right">'+Val[2]+'</span></li>'+
//                     '<li>'+data[3]+'<span class="sp_right">'+Val[3]+'</span></li>'+
//                     '<li>'+data[4]+':<span class="sp_right">'+Val[4]+'</span></li>'+
//                     '<li>'+data[5]+':<span class="sp_right">'+Val[5]+'</span></li>'+
//                     '<li>'+data[6]+':<span class="sp_right">'+Val[6]+'</span></li>'+
//                 '</ul>'+
//             '</div>'+
//         '</div>'+
//     '</div>';
//     $('body').append(nr);
// }
//诱导显示内容
function doLeadContent(data){
  var poslon=new SuperMap.LonLat(gmarker.lonlat.lon,gmarker.lonlat.lat);
    var coord=poslon.transform("EPSG:900913", "EPSG:4326" ); 
    var cLon=coord.lon.toFixed(6)-0;
    var cLat=coord.lat.toFixed(6)-0;
  var nr='';
  nr+='<div class="content_kuang">'+
        '<div class="z_title">'+
            '<p class="title_left">诱导显示内容</p>'+
            '<p class="title_right">诱导显示屏属性<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.content_kuang\')"></p>'+
        '</div>'+
        '<div class="content">'+
            '<div class="content_left">'+
                '<textarea id="leadContent" readonly="readonly">前方道路应急施工，旅行时间15分钟，建议绕行西昌路</textarea>'+
            '</div>'+
            '<div class="content_right">'+
                '<ul class="ul_all">'+
                    '<li>显示屏编号:<span class="sp_right">'+data.entitys[0]+'</span></li>'+
                    '<li>路段编号:<span class="sp_right">'+data.entitys[4]+'</span></li>'+
                    '<li>路段名称:<span class="sp_right">'+data.entitys[1]+'</span></li>'+
                    '<li>设备厂家:<span class="sp_right">'+data.entitys[2]+'</span></li>'+
                    '<li>经度坐标:<span class="sp_right">'+cLon+'</span></li>'+
                    '<li>纬度坐标:<span class="sp_right">'+cLat+'</span></li>'+
                    '<li>设备类型:<span class="sp_right">'+data.entitys[3]+'</span></li>'+
                '</ul>'+
                '<p class="bt_frame">'+
                  '<input type="button" value="编辑" class="bt1"/>'+
                  '<input type="submit" value="推送" class="bt2" onclick="zhao_none(\'.zhao\',\'.content_kuang\')"/>'+
                  '<input type="button" value="取消" class="btn_3" onclick="zhao_none(\'.zhao\',\'.content_kuang\')"/>'+
                '</p>'+
            '</div>'+
        '</div>'+
    '</div>';
    $('body').append(nr);
    $(".bt1").click(function(){
      $("#leadContent").attr("readonly",false);
    })
}

//fz==仿真
//快速仿真
function doSimulation(){
  var nr='';
  nr+='<div class="fangzhen white" id="fz">'+
        '<div class="fz_title">'+
           ' <span>快速仿真选项</span>'+
            '<img src="images/min.png" class="empty_btn" style="cursor:pointer" onclick="zhao_none(\'.zhao\',\'.fangzhen\')"/>'+
            '<img src="images/lessen.png" class="fz_btn1 empty_btn" style="cursor:pointer" />'+
        '</div>'+
        '<div class="fz_main">'+
            // '<div id="map1"></div>'+
            '<div class="list_message" id="list_message">'+
                '<div class="list1_message" id="rlist_message1">'+
                        '<p class="message_title1">仿真项目信息</p>'+
                        '<ul class="message_u1">'+
                            '<li>'+
                                '<span class="white">仿真编号</span>'+
                                '<input id="simulat_num" type="text" name="text" value=" " />'+
                            '</li>'+
                            '<li>'+
                                '<span class="white">项目名称</span>'+
                                '<input id="simulat_item_name" type="text" name="text" value=" " />'+
                            '</li>'+
                            '<li>'+
                                '<span class="white">项目编号</span>'+
                                '<input id="simulat_item_num" type="text" name="text" value=" " />'+
                            '</li>'+
                        '</ul>'+
                        '<ul class="message_u2">'+
                            '<li>'+
                                '<span>影响事件</span>'+
                                '<ul class="mes_u3" id="influence"></ul>'+
                            '</li>'+
                            '<li>'+
                                '<span>优化措施</span>'+
                                '<ul class="mes_u3" id="measure"></ul>'+
                            '</li>'+
                        '</ul>'+
                    '</div>'+
                '<div class="list2_message" id="rlist_message2">'+
                    '<p class="message_title1">仿真时间范围</p>'+
                    '<div class="mes_part2">'+
                        '<ul class="message_u1">'+
                            '<li>'+
                                '<select>'+
                                    '<option>从当前时间开始</option>'+
                                    '<option>从前1时间开始</option>'+
                                '</select>'+
                            '</li>'+
                            '<li>'+
                                '<span class="white">开始时间</span>'+
                                '<input type="text"  value="" id="simulat_start_time" onClick="jeDate({dateCell:\'#simulat_start_time\',isTime:true,format:\'YYYY-MM-DD hh:MM:ss\'})"/>'+
                            '</li>'+
                            '<li>'+
                                '<span class="white">结束时间</span>'+
                               ' <input type="text" name="text" value=" " id="simulat_end_time" onClick="jeDate({dateCell:\'#simulat_end_time\',isTime:true,format:\'YYYY-MM-DD hh:MM:ss\'})"/>'+
                            '</li>'+
                            '<li>'+
                                '<span class="white">仿真周期</span>'+
                                '<b>Min</b>'+
                               ' <input type="text" name="text" value=" " class="min" />'+
                            '</li>'+
                        '</ul>'+
                   ' </div>'+
                    '<div class="fz_btn">'+
                        '<input type="button" name="button" class="fz_btn1" value="开始仿真" onclick="simulatAjax(),clearTypeArr()"/>'+
                        '<input type="button" name="button" class="fz_btn2" value="查看报告" />'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';
    $('body').append(nr);
    var today = new Date(); 
  var date,laterDate; 
  date = (today.getFullYear()) +"-" + timeChange((today.getMonth() + 1 ))+ "-" + timeChange(today.getDate()) + " " + timeChange(today.getHours()) +":"+timeChange(today.getMinutes())+":"+timeChange(today.getSeconds());
  laterDate = (today.getFullYear()) +"-" + timeChange((today.getMonth() + 1 )) + "-" + timeChange(today.getDate()) + " " + timeChange((today.getHours()+1)) +":"+timeChange(today.getMinutes())+":"+timeChange(today.getSeconds());
  $("#simulat_start_time").val(date);
  $("#simulat_end_time").val(laterDate);
  // if($("#indexSelect").val()=='方案一'){$("#simulat_num,#simulat_item_num").val('1');}
  // else if($("#indexSelect").val()=='方案二'){$("#simulat_num,#simulat_item_num").val('2');}
  // else{$("#simulat_num,#simulat_item_num").val('3');}
  
  divDrag('.fz_title','.fangzhen');
}
function setSimulation(){
  $(".zhao").css("display","block");
  doSimulation();
  setTimeout(function(){
    getR_ramp();
    simulatRegionAjax(region);
  },100)
}
function setAnalysis(){
  $(".zhao").css("display","block");
  doAnalysis();
}

//交通路段数据分析
function doAnalysis(){
  var nr='';
  nr+='<div class="jt_fenxi" id="fenxi">'+
        '<div class="fenxi_title">'+
            '<span>交通分析工具--所选路段交通数据分析</span>'+
            '<img src="images/min.png" class="empty_btn"  onclick="zhao_none(\'.zhao\',\'.jt_fenxi\'),abolish(\'#right_ipt9\')"/>'+
       ' </div>'+
        '<div class="fenxi_mian" id="fx_content">'+
            '<div class="xy_choice">'+
                '<ul class="xy_u1">'+
                    '<li><span>车辆筛选(x)轴</span>'+
                        '<select>'+
                            '<option>-15分钟间隔离开的车辆</option>'+
                            '<option>-30分钟时间间隔离开车辆</option>'+
                            '<option>-1小时时间间隔离开车辆</option>'+
                            '<option>-2分钟间隔离开的车辆</option>'+
                            '<option>-4分钟间隔离开的车辆</option>'+
                            '<option>-距离阈值（0.2公里间隔）</option>'+
                            '<option>-距离阈值（1公里间隔）</option>'+
                            '<option>-距离阈值（2公里间隔）</option>'+
                            '<option>-距离阈值（5公里间隔）</option>'+
                            '<option>-距离阈值（10公里间隔）</option>'+
                            '<option>-旅行时间划分（2分钟间隔）</option>'+
                            '<option>-旅行时间划分（5分钟间隔）</option>'+
                            '<option>-旅行时间划分（10分钟间隔）</option>'+
                            '<option>-旅行时间划分（30分钟间隔）</option>'+
                       ' </select>'+
                    '</li>'+
                    '<li><span>交通分析(y)轴'+
                        '<select>'+
                            '<option>-总旅行时间（min）</option>'+
                            '<option>-总旅行距离（km）</option>'+
                            '<option>-平均旅行时间（min）</option>'+
                            '<option>-平均旅行距离（km）</option>'+
                            '<option>-平均车速（km/h）</option>'+
                            '<option>-每公里的平均旅行时间（min/km）</option>'+
                            '<option>-95%旅行时间（min）</option>'+
                            '<option>-90%旅行时间（min）</option>'+
                            '<option>-80%旅行时间（min）</option>'+
                            '<option>-距离阈值（10公里间隔</option>'+
                            '<option>-95%每公里的旅行时间（min/km）</option>'+
                            '<option>-90%每公里的旅行时间（min/km）</option>'+
                            '<option>-80%每公里的旅行时间（min/km）</option>'+
                        '</select>'+
                    '</li>'+
                    '<li><span>空间选择'+
                        '<select>'+
                            '<option>-全路网</option>'+
                            '<option>-从车辆路径选择的OD对</option>'+
                            '<option>-经过所选路段</option>'+
                            '<option>-经过所选路段的出行</option>'+
                            '<option>-经过所选路段的部分出行</option>'+
                            '<option>-从子区产生的出行</option>'+
                            '<option>-通过子区的出行</option>'+
                            '<option>-子区内部到外部的出行</option>'+
                            '<option>-子区外部到内部的出行</option>'+
                            '<option>-子区内部到内部的出行</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
            '</div>'+
           ' <div class="fenxi_view">'+
                '<div class="fenxi_tu" id="fx_tu"></div>'+
                '<div class="fenxi_choice">'+
                    '<p>汇总分析选择</p>'+
                    '<ul class="fenxi_u1">'+
                        '<li>路段:<span>9568</span>-&gt;<span>1234</span></li>'+
                       ' <li>路段:<span>9568</span>-&gt;<span>1234</span></li>'+
                    '</ul>'+
                    '<p class="p_bt p1"><input type="button" name="daochu1" value="导出图表" class="bt1" /></p>'+
                    '<p class="p_bt p2"><input type="button" name="daochu2" value="导出所有数据到CSV" class="bt2" /></p>'+
                   ' <p class="p_bt p3"><input type="button" name="daochu1" value="退出" class="bt3" onclick="zhao_none(\'.zhao\',\'.jt_fenxi\'),abolish(\'#right_ipt9\')"/></p>'+
               ' </div>'+
            '</div>'+
        '</div>'+
    '</div>';
    $('body').append(nr);
  var FxTu = echarts.init(document.getElementById('fx_tu'));      
  option6 = {
    backgroundColor:'#fff',
      color: ['#3398DB'],
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow' 
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                  alignWithLabel: true
              }
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : [
          {
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
              data:[10, 52, 200, 334, 540, 330, 220]
          }
      ]
  };            
  // 为echarts对象加载数据 
  FxTu.setOption(option6); 
}
function abolish(k){
  if($(k).attr("checked",false)){
    $(k).parent().css("color","#4d4d4d");
  }
  $(k).attr("checked",false);
  // $('.MOE_biao table tbody td').remove();
}
//od路径图
function jt_OD(num){
  $(".zhao").css("display","block");
  var nr='';
  nr+='<div class="jt_OD white" style="height:528px">'+
        '<div class="z_title">'+
        '<p style="width: 100%" class="title_left">交通分析工具--路网需求时空分布'+
        '<img src="images/min.png" style="cursor:pointer" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.jt_OD\'),abolish(\'#right_ipt'+num+'\'),claerOdTimer()"/>'+
        '</p>'+
        '<ul class="concertMainTitle_ul" style="clear: both">'+
        '<li class="mainUl_li1"><span>需求展现选择</span>'+
        '<select id="targetSelect"></select>'+
        '</li>'+
        '<li class="mainUl_li7 titleLi1">'+
        '<span>统计开始日期</span>'+
        '<input type="text" value="2016-04-01 00:00:00" id="concertDay1" onclick="jeDate({dateCell:\'#concertDay1\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})">'+
        '</li>'+
        '<li class="mainUl_li7 titleLi1">'+
        '<span>统计结束日期</span>'+
        '<input type="text" value="2016-04-01 23:59:59" id="concertDay2" onclick="jeDate({dateCell:\'#concertDay2\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})">'+
        '</li>'+
        '<li class="mainUl_li3"><input type="button" class="concertMainTitle_ul_btn" value="确定">'+
        '</li>'+
        '</ul>'+
        '</div>'+
        '<div class="OD_mian">'+
            '<div class="odTimeFrame">'+
              '<input type="button" value="－" onclick="odInitTimeline(\'减\')" id="odTimeReduce"/>'+
              '<div class="odTime" id="odTime">'+
                  '<ul class="odTime_ul">'+
                      '<li></li><li></li><li></li><li></li><li></li>'+
                      '<li></li><li></li><li></li><li></li><li></li>'+
                      '<li></li><li></li><li></li><li></li><li></li>'+
                      '<li></li><li></li><li></li><li></li><li></li>'+
                      '<li></li><li></li><li></li><li></li>'+
                  '</ul>'+
                  '<div class="odVernier" id="odYb"><time id="odVernier_time">00:00</time></div>'+
              '</div>'+
              '<input type="button" value="+" onclick="odInitTimeline(\'加\')" id="odTimeAdd"/>'+
            '</div>'+
        '</div>'+
    '</div>';
    $('body').append(nr);
    var options;
    if($("#right_ipt1").prop("checked")==true){
        options='';
        options+='<option>出行OD时空分布图</option>';
    }else if($("#right_ipt2").prop("checked")==true){
        options='';
        options+='<option>产生需求时空分布</option><option>吸引需求时空分布</option>';
    }
    $("#targetSelect").append(options);
    divDrag('.z_title','.jt_OD');
    odSet();//添加图层
    $("#odTime").attr('step',37.5);
    $("#odTime").attr('span',60);
    odInitTimeline();
}
function odSet(){
    var html='';
    html+='<div class="OD_tu" id="mapOD"></div>';
    $(".OD_mian").append(html);
    oD();
//  ajax_OdPoint();
}
function oD(){//时空分布图
    supermapOD = new SuperMap.Map("mapOD", {
        controls : [ new SuperMap.Control.Navigation(),
                new SuperMap.Control.Zoom()
                ]
    });
    layerOD = new SuperMap.Layer.CloudLayer();
    markerOD=new SuperMap.Layer.Vector("markerOD");
    supermapOD.addLayers([layerOD,markerOD]);
    supermapOD.setCenter(new SuperMap.LonLat(12990226.0445648,
            4793154.9179491), 13);
    var selectOD = new SuperMap.Control.SelectFeature(markerOD,{
          callbacks: {"rightclick":getOdpointline}
        }); 
    supermapOD.addControl(selectOD);
    selectOD.activate();
    simulatRegionAjax(markerOD);
}
var odTimer;
function claerOdTimer(){
  if( odTimer!=undefined  ){
    clearTimeout(odTimer);
  }
}
function odInitTimeline(addRduce){
    var realtime,curTime,pos;
    curTime=(new Date().getTime()/1000%86400 + 8*60*60)/60;
    realtime=curTime;
    if(addRduce=='减'){
        realtime=parseInt($("#odTime").val())-parseInt($("#odTime").attr('span'));
      }else if(addRduce=='加'){
        realtime=parseInt($("#odTime").val())+parseInt($("#odTime").attr('span'));
      }
      
    if( realtime > 1440 ) realtime=1440;
    else if( realtime < 0 ) realtime=0;
    
    if( realtime>=0 && realtime <=1440 ){
      pos=$("#odTime").attr('step')*parseInt(realtime/$("#odTime").attr('span'));
      $("#odYb").css("margin-left",pos-3+"px");
      
      $("#odTime").val( realtime );
      update_Time();
      odTimer=setTimeout(function(){odInitTimeline('加')}, 1000*60*60);
    }
  }
 
function update_Time(){
  $("#odVernier_time").html(
    String(parseInt($("#odTime").val()/60)<10?"0":"")
    +
    String(parseInt($("#odTime").val()/60))
    + ':' + 
    String(parseInt($("#odTime").val()%60/$("#odTime").attr('span'))*$("#odTime").attr('span')<10?"0":"")
    +
    String(parseInt($("#odTime").val()%60/$("#odTime").attr('span'))*$("#odTime").attr('span'))
  );
}
//function ajax_OdPoint(){//获取中心点
//$.ajax({
//      url:"GetDevice",
//      dataType:"json",
//      data:{ "action":"query","type":50},
//      contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
//      beforeSend:function(){  },
//      success: function( data, textStatus, jqXHR ){
//          var layer=supermapOD.getLayersByName("markerOD")[0];
//          add2Layer(data,4,layer,"",$('#right_ipt1').prop("checked"),"point");
//      },
//      error:function(){}
//  });
//}
function getOdpointline(arg){//获取中心点连线数据
    var val_type='',val='';
    if($("#right_ipt1").prop("checked")==true){
        val_type=-1;
    }else if($("#right_ipt2").prop("checked")==true){
//      val_type = getFeature(4,arg.id).zone_id;
				val_type = 100;
    }
    var val="'"+$("#concertDay1").val()+"',"+val_type;
    $.ajax({
        url:"GetNetIndex",
        dataType:"json",
        data:{ "action":"query","type":901,"pa":val},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
          		roadSKT(data.entitys);
        },
        error:function(){}
    });
}
function roadSKT(data){
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
					setLineProperty1(lineVector);			//,1,1,0,data[i][2]
					features.push(lineVector);
		}

	markerOD.addFeatures(features);
}
function getChoiceRoadData(ele){//路段属性的ajax
    var _val="{'ID':"+ele+"}";
    $.ajax({
       url:"GetDevice",
           dataType:"json",
           data:{ "action":"query","type":31,"val":_val},
           contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
           beforeSend:function(){  },
           success: function( data, textStatus, jqXHR ){
              choiceRoadAnalyse(data);
           },
           error:function(){}
    })
}
//交通分析工具MOE图表
function choiceRoadAnalyse(data){
  // $(".zhao").css("display","block");
  var nr='';
  nr+='<div class="content_kuang environment_Data_statistics jd_nodes">'+
      '<div class="z_title">'+
      '<p style="float: none; width: 100%;" class="title_left">交通分析工具-所选路段交通分析<img src="images/min.png" style="cursor:pointer" class="empty_btn" onclick="zhao_none(\'.zhao_left\',\'.content_kuang\')">'+
      '</p>'+
      '<ul class="concertMainTitle_ul">'+
        '<li class="mainUl_li1"><span>路段数据类型</span>'+
            '<select id="targetSelect">'+
              '<option>路段平均车速</option>'+
              '<option>路段旅行时间统计</option>'+
              '<option>路段车流量统计</option>'+
              '<option>路段延误统计</option>'+
              '<option>每车道交通密度</option>'+
              '<option>路段排队长度</option>'+
              '<option>路段排队车辆数</option>'+
            '</select>'+
        '</li>'+
        '<li class="mainUl_li7 titleLi1"><span>统计开始日期</span><input type="text" value="2016-04-01 00:00:00" id="concertDay3" onclick="jeDate({dateCell:\'#concertDay1\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"></li>'+
        '<li class="mainUl_li7 titleLi1"><span>统计结束日期</span><input type="text" value="2016-04-01 23:59:59" id="concertDay4" onclick="jeDate({dateCell:\'#concertDay2\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"></li>'+
        '<li class="mainUl_li3"><input type="button" class="concertMainTitle_ul_btn" value="确定" onclick="moeTimeAjax()"></li>'+
      '</ul>'+
      '</div>'+
        '<div class="content">'+
            '<div id="chart" class="content_left chart"></div>'+
            '<div class="content_right">'+
              '<p class="title_right" style="color:white;font-size: 14px;">所选路段属性</p>'+
              '<ul class="node_ul nodeHeight" style="overflow-y:auto;max-height:430px;">'+
                '<li><span>路段编号</span><input id="attr0" type="text" name="" data="" value="'+data.entitys[0]+'" readonly="readonly"></li>'+
                '<li><span>起始节点</span><input id="attr1" type="text" name="" data="" value="'+data.entitys[1]+'"></li>'+
                '<li><span>终止节点</span><input id="attr2" type="text" name="" data="" value="'+data.entitys[2]+'"></li>'+
                '<li><span>路段长度</span><input id="attr3" type="text" name="" data="" value="'+data.entitys[3]+'"></li>'+
                '<li><span>路段名称</span><input id="attr4" type="text" name="" data="" value="'+data.entitys[4]+'"></li>'+
                '<li><span>路段类型</span>'+
                      '<select id="road_targetSelect2">'+
                          '<option>1-城市快速路</option>'+
                          '<option>2-城市主干道</option>'+
                          '<option>3-城市次干道</option>'+
                          '<option>4-城市支路</option>'+
                          '<option>5-路口连接线</option>'+
                          '<option>6-城市内辅路</option>'+
                          '<option>7-城市内匝道</option>'+
                          '<option>8-城市内胡同</option>'+
                          '<option>9-城市外辅路</option>'+
                          '<option>10-城市外匝道</option>'+
                          '<option>11-小区连杆</option>'+
                          '<option>12-高速公路</option>'+
                          '<option>13-一级公路</option>'+
                          '<option>14-二级公路</option>'+
                          '<option>15-三级公路</option>'+
                          '<option>16-四级公路</option>'+
                          '<option>100-公交专用道</option>'+
                          '<option>200-步行专用道</option>'+
                      '</select>'+
                '</li>'+
                '<li><span>路段方向</span>'+
                      '<select id="road_targetSelect3">'+
                          '<option>0-双向</option>'+
                          '<option>1-单向</option>'+
                      '</select>'+
                '</li>'+
                '<li><span>允许需求</span>'+
                      '<select id="road_targetSelect4">'+
                          '<option>1-客车</option>'+
                          '<option>2-货车</option>'+
                          '<option>3-公交车</option>'+
                          '<option>4-普通公交车</option>'+
                          '<option>5-自行车类</option>'+
                      '</select>'+
                '</li>'+
                '<li><span>车道数量</span><input id="attr8" type="text" name="" data="" value="'+data.entitys[7]+'"></li>'+
                '<li><span>限速数值</span><input id="attr9" type="text" name="" data="" value="'+data.entitys[8]+'"></li>'+
                '<li><span>车道能力</span><input id="attr10" type="text" name="" data="" value="'+data.entitys[9]+'"></li>'+
                '<li><span>阻塞密度</span><input id="attr11" type="text" name="" data="" value="'+data.entitys[10]+'"></li>'+
                '<li><span>拥堵波速</span><input id="attr12" type="text" name="" data="" value="12km/h"></li>'+
              '</ul>'+
              '<ul class="ul_btFrame">'+
                '<li><input type="button" value="导出数据"><input type="button" value="导出图表"></li>'+
              '</ul>'+
            '</div>'+
       ' </div>'+
    '</div>';
    $('body').append(nr); 
    $("#road_targetSelect2 option").eq(data.entitys[5]).attr("selected", true);
    $("#road_targetSelect3 option").eq(data.entitys[6]).attr("selected", true);
    $("#road_targetSelect4 option").eq(1).attr("selected", true);
    divDrag('.z_title','.content_kuang');
    $(".environment_Data_statistics").css({"height":"528px"})
    // MOEChartsData();
    moeTimeAjax();
}
function moeTimeAjax(){
  $("#chart").remove();
  var html='';
  html+='<div id="chart" class="content_left chart"></div>';
  $(".content").append(html);
  var upTime=$("#concertDay3").val().split(" ")[0];
  var _vNum=$("#attr0").val();
  var pa=upTime+","+_vNum;
  if(upTime != ""){
    $.ajax({
     url:"GetNetState",
         dataType:"json",
         data:{ "action":"query","type":5,"pa":pa},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               moeTimeCharts(data.entitys);
         },
         error:function(){}
    })
  }else{
    alert("请选开始与结束开始时间");
  }
}
function moeTimeCharts(data){
var data1=[];
var data2=[];
var data3=[];
var dataMinMax1=[],dataMinMax2=[],dataMinMax3=[];
var dataChange = data1 ;
for(var i=1;i<(data.length-1);i++){
  var dataLine1=[],dataLine2=[],dataLine3=[];
  dataLine1.push(data[i][0]);
  dataLine1.push(data[i][1]); 
  data1.push(dataLine1);
  dataLine2.push(data[i][0]);
  dataLine2.push(data[i][2]); 
  data2.push(dataLine2);
  dataLine3.push(data[i][0]);
  dataLine3.push(data[i][3]); 
  data3.push(dataLine3);
  dataMinMax1.push(data[i][1]);
  dataMinMax2.push(data[i][2]);
  dataMinMax3.push(data[i][3]);
}
var dataMinMax=[Math.min.apply(null, dataMinMax1),Math.max.apply(null, dataMinMax1),Math.min.apply(null, dataMinMax2),Math.max.apply(null, dataMinMax2),Math.min.apply(null, dataMinMax3),Math.max.apply(null, dataMinMax3)];

if($("#targetSelect")[0].selectedIndex==0){
  dataChange = data1;
  var YMin=dataMinMax[0].toFixed(2);
  var YMax=(dataMinMax[1]+10).toFixed(2);
}else if($("#targetSelect")[0].selectedIndex==1){
  dataChange = data2;
  var YMin=dataMinMax[2].toFixed(2);
  var YMax=(dataMinMax[3]+0.5).toFixed(2);
}else if($("#targetSelect")[0].selectedIndex==2){
  dataChange = data3;
  var YMin=dataMinMax[4].toFixed(2);
  var YMax=(dataMinMax[5]+1).toFixed(2);
}
$("body").delegate("#targetSelect","change",function(){
  if($(this)[0].selectedIndex==0){
    dataChange = data1;
    YMin=dataMinMax[0].toFixed(2);
    YMax=(dataMinMax[1]+10).toFixed(2);
  }else if($(this)[0].selectedIndex==1){
    dataChange = data2;
    YMin=dataMinMax[2].toFixed(2);
    YMax=(dataMinMax[3]+0.5).toFixed(2);
  }else if($(this)[0].selectedIndex==2){
    dataChange = data3;
    YMin=dataMinMax[4].toFixed(2);
    YMax=(dataMinMax[5]+1).toFixed(2);
  }
  MOEChartsData(dataChange,YMin,YMax);
})
MOEChartsData(dataChange,YMin,YMax);
}
//index页面里右侧MOE报表样式数据
function MOEChartsData(dataChange,YMin,YMax){
    var _MOE_TU1 = echarts.init(document.getElementById('chart'));          
    option = {
    backgroundColor:"#fff",
    color:['red','green'],
    legend: {
        data:['红线数据']
    },
    tooltip: {
        trigger: 'axis'
        // formatter: '{a} <br/>{b}  {c}'
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
    },
    yAxis:{
        type: 'value',
        min:YMin,
        max:YMax,
        splitLine: {
            show: false
        }
    },
    series: [{
        name: '红线数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        symbolSize:6,
        itemStyle : {
                normal : {
                    color:'red',
                    lineStyle:{
                        color:'red'
                    }
                }
            },
        data: dataChange
    }
    ]
};  
    _MOE_TU1.setOption(option);
}
//路段交通分析汇总
function doAnalyseForm(){
  var nr='';
  nr+='<div class="jt_MOE white">'+
        '<div class="fenxi_title">'+
            '<span>交通分析工具--路段MOE汇总分析</span>'+
            '<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.jt_MOE\'),abolish(\'#right_ipt3\')"/>'+
        '</div>'+
        '<div class="MOE_main">'+
            '<ul class="MOE_u1">'+
                '<li><span class="white">路段筛选</span>'+
                    '<select>'+
                    '<option>所有路段</option>'+
                    '<option>所选路段</option>'+
                    '<option>高速公路</option>'+
                    '<option>城市快速路</option>'+
                    '<option>城市主干道</option>'+
                    '<option>城市次干道</option>'+
                    '<option>城市支路</option>'+
                    '<option>路口连接线</option>'+
                    '<option>城市内辅路</option>'+
                    '<option>城市内匝道</option>'+
                    '<option>城市内胡同</option>'+
                    '<option>城市外辅路</option>'+
                    '<option>城市外匝道</option>'+
                    '<option>小区连杆</option>'+
                    '<option>高速公路</option>'+
                    '<option>一级公路</option>'+
                    '<option>二级公路</option>'+
                    '<option>三级公路</option>'+
                    '<option>四级公路</option>'+
                    '<option>公交专用道</option>'+
                    '<option>步行专用道</option>'+
                    '<option>小区连接线</option>'+
                    '<option>除小区链接线外所有路段</option>'+
                    '</select>'+
                '</li>'+
                '<li class="analyse_li2"><span class="white">日期筛选</span><input type="text" name="txt" id="fx_time0" value="2016-04-01" onClick="jeDate({dateCell:\'#fx_time0\',isTime:true,format:\'YYYY-MM-DD\'})"/></li>'+
                '<li class="analyse_li2"><span class="white">开始时间</span><input type="text" id="fx_time1" value="00:00:00"/></li>'+
                '<li class="analyse_li2"><span class="white">结束时间</span><input type="text" id="fx_time2" value="23:59:59"/></li>'+
                '<li class="analyse_li2"><input type="button" value="确定" class="fx_ipt" onclick="AnalyseForm_dataAjax()"/><a id="test" onclick="clickDownload(this)" download="downlaod.csv" href="javascript:void(0)">导出CSV文件</a></li>'+
           ' </ul>'+
            '<div style="clear: both;"></div>'+
            '<div class="MOE_biao">'+
                '<table cellspacing="0">'+
                    '<tr>'+
                        '<th>路段编号</th>'+
                        '<th>路段名称</th>'+
                        '<th>从节点</th>'+
                        '<th>到节点</th>'+
                        '<th>路段长度(m)</th>'+
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
           ' </div>'+
        '</div>'+
    '</div>';
    $('body').append(nr);
    divDrag('.fenxi_title','.jt_MOE');
    AnalyseForm_dataAjax();
}
//路段交通分析汇总 数据
function MoeRoad(data){
    var html='';
    for( var i=0;i<data.entitys.length;i++ ){
            html+='<tr class="if_or_not">'+
            '<td class="road_id" ondblclick="getChoiceRoadData($(this).text())">'+data.entitys[i][0]+'</td>'+
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
    $('.MOE_biao table tbody').append(html);
}
//所选路段交通分析
function doRoadAnalyse(){
	var layer=supermap.getLayersByName("markerLayer2")[0];
	if($("#right_ipt4").prop("checked")==true){
		$("#ipt2").prop("checked",false);
		$("#ipt2").parent("label").css("color","black");
		layer.setVisibility(true);
	}else{
		layer.setVisibility(false);
	}
}
function AnalyseForm_dataAjax(){
  var pa;
  var t0=$("#fx_time0").val();
  var t1=$("#fx_time1").val();
  var t2=$("#fx_time2").val();
  pa="'"+t0+' '+t1+"','"+t0+' '+t2+"',"+1;
  if($(".if_or_not")){
      $(".if_or_not").remove();
  }
  
  if(t0!=''&&t1!=''&&t2!=''){
    $.ajax({
     url:"GetNetIndex",
         dataType:"json",
         data:{ "action":"query","type":30,"pa":pa},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               MoeRoad(data);
         },
         error:function(){}
    })
  }else{
    reviseAlert("请填写日期与时间");
  }
}
function Path(ele){//需要
  // $(".zhao").css("display","block");
  var nr='';
  nr+='<div class="content_kuang environment_Data_statistics jd_nodes">'+
      '<div class="z_title">'+
      '<p style="float: none; width: 100%;" class="title_left">交通分析工具-路径分析<img src="images/min.png" style="cursor:pointer" class="empty_btn" onclick="zhao_none(\'.zhao_left\',\'.content_kuang\'),abolish(\'#right_ipt6\')">'+
      '</p>'+
      '<ul class="concertMainTitle_ul">'+
        '<li class="mainUl_li1"><span>路径参数类型</span>'+
            '<select id="targetSelect_path">'+
              '<option>仿真旅行时间</option>'+
              '<option>观测+仿真旅行时间</option>'+
            '</select>'+
        '</li>'+
        '<li class="mainUl_li7 titleLi1"><span>统计开始日期</span><input type="text" value="2016-04-01 00:00:00" id="concertDay_1" onclick="jeDate({dateCell:\'#concertDay_1\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"></li>'+
        '<li class="mainUl_li7 titleLi1"><span>统计结束日期</span><input type="text" value="2016-04-01 00:00:00" id="concertDay_2" onclick="jeDate({dateCell:\'#concertDay_2\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"></li>'+
        '<li class="mainUl_li3"><input type="button" class="concertMainTitle_ul_btn" value="确定"></li>'+
      '</ul>'+
      '</div>'+
        '<div class="content">'+
            '<div class="content_left">'+
                '<div id="chartPath" class="charts"></div>'+
                '<div class="hu_biao">'+
                    '<table cellspacing="0">'+
                        '<tr>'+
                            '<th>弧段</th>'+
                            '<th>起止接点</th>'+
                            '<th>街道名称</th>'+
                            '<th>长度</th>'+
                            '<th>限速</th>'+
                            '<th>自由流旅行时间</th>'+
                            '<th>车道数</th>'+
                            '<th>车道饱和流率</th>'+
                            '<th>车道能力</th>'+
                            '<th>弧段类型</th>'+
                        '</tr>'+
                    '</table>'+
                '</div>'+
            '</div>'+
            '<div class="content_right">'+
              '<p class="title_right" style="color:white;font-size: 14px;">所选路段属性</p>'+
              '<ul class="node_ul nodeHeight" style="overflow-y:auto;max-height:430px;">'+
                '<li><span>路径编号</span><input id="attr0" type="text" name="" data="" value="8799" readonly="readonly"></li>'+
                '<li><span>路径名称</span><input id="attr1" type="text" name="" data="" value="四元桥到机场"></li>'+
                '<li><span>弧段数量</span><input id="attr2" type="text" name="" data="" value="27"></li>'+
                '<li><span>路径距离</span><input id="attr3" type="text" name="" data="" value="5km"></li>'+
                '<li><span>自由流旅行时间</span><input id="attr4" type="text" name="" data="" value="1.5min"></li>'+
                '<li><span>仿真旅行时间</span><input id="attr5" type="text" name="" data="" value="1.3min"></li>'+
                '<li><span>观测旅行时间</span><input id="attr6" type="text" name="" data="" value="1.1min"></li>'+
                '<li><span>误差百分比</span><input id="attr7" type="text" name="" data="" value="20%"></li>'+
              '</ul>'+
              '<ul class="ul_btFrame">'+
                '<li><input type="button" value="导出数据"><input type="button" value="导出图表"></li>'+
              '</ul>'+
            '</div>'+
       ' </div>'+
    '</div>';
    $('body').append(nr); 
    if($(ele).prop("checked")==true){
      divDrag('.z_title','.content_kuang');
      $(".environment_Data_statistics").css({"height":"528px"});
      $(".content_left").css({"width":"800px","height":"470px","float":"left"});
      $(".charts").css({"width":"800px","height":"364px"});
      $("#attr4,#attr5,#attr6").css({"float":"right","margin-top":"3px","width":"48%","margin-right":"3px"});
      $("#attr7").css({"margin-left":"10px","width":"55%"});
      pathChartsData();
      path_biao();
    }
  }
function path_biao(data){
    var html='';
    var Moe=[[1,1024,1026,"广阳道",0.008,40,0.012,2,1800,1500,"minor arterial"],[2,2024,2026,"光明道",0.01,60,0.02,2,1800,1500,"minor arterial"],[3,2024,2026,"大屯路",0.02,630,0.021,2,1600,1200,"minor arterial"]];
    for( var i=0;i<Moe.length;i++ ){
            html+='<tr class="if_or_not">'+
            '<td>'+Moe[i][0]+'</td>'+
            '<td>['+Moe[i][1]+','+Moe[i][2]+']</td>'+
            '<td>'+Moe[i][3]+'</td>'+
            '<td>'+Moe[i][4]+'</td>'+
            '<td>'+Moe[i][5]+'</td>'+
            '<td>'+Moe[i][6]+'</td>'+
            '<td>'+Moe[i][7]+'</td>'+
            '<td>'+Moe[i][8]+'</td>'+
            '<td>'+Moe[i][9]+'</td>'+
            '<td>'+Moe[i][10]+'</td>'+
        '</tr>';
    }
    $('.hu_biao table tbody').append(html);
}
function ReporAttribute(){//右侧属性
    roadID=$("#reportNum").val();
    var _val="{'ID':"+roadID+"}";
    $.ajax({
       url:"GetDevice",
           dataType:"json",
           data:{ "action":"query","type":31,"val":_val},
           contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
           beforeSend:function(){  },
           success: function( data, textStatus, jqXHR ){
                 $("#attr0").val(data.entitys[0]);
                 $("#attr1").val(data.entitys[1]);
                 $("#attr2").val(data.entitys[2]);
                 $("#attr3").val(data.entitys[3]);
                 $("#attr4").val(data.entitys[4]);
                 $("#attr8").val(data.entitys[8]);
                 $("#attr9").val(data.entitys[9]);
                 $("#attr10").val(data.entitys[10]);
                 $("#attr11").val(data.entitys[11]);
                 $("#road_targetSelect2 option").eq(data.entitys[5]).attr("selected", true);
                 $("#road_targetSelect3 option").eq(data.entitys[6]).attr("selected", true);
                 $("#road_targetSelect4 option").eq(1).attr("selected", true);
           },
           error:function(){}
    })
}
function reportRoadTimeAjax(){
  $("#reportChart").remove();  
  var html='';
  html+='<div id="reportChart"></div>';
  $(".left_down").before(html);
  var upTime=$("#reportIpt3").val().split("--")[0].split(" ")[0];
  var _vNum=$("#reportNum").val();
  var pa=upTime+","+_vNum;
  if(upTime != ""){
    $.ajax({
     url:"GetNetState",
         dataType:"json",
         data:{ "action":"query","type":5,"pa":pa},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               reportRoadTimeCharts(data.entitys);
         },
         error:function(){}
    })
  }else{
    alert("请选开始与结束开始时间");
  }
}
function reportRoadTimeCharts(data){
var data1=[];
var data2=[];
var data3=[];
var dataMinMax1=[],dataMinMax2=[],dataMinMax3=[];
var dataChange = data1 ;
for(var i=1;i<(data.length-1);i++){
  var dataLine1=[],dataLine2=[],dataLine3=[];
  dataLine1.push(data[i][0]);
  dataLine1.push(data[i][1]); 
  data1.push(dataLine1);
  dataLine2.push(data[i][0]);
  dataLine2.push(data[i][2]); 
  data2.push(dataLine2);
  dataLine3.push(data[i][0]);
  dataLine3.push(data[i][3]); 
  data3.push(dataLine3);
  dataMinMax1.push(data[i][1]);
  dataMinMax2.push(data[i][2]);
  dataMinMax3.push(data[i][3]);
}
var dataMinMax=[Math.min.apply(null, dataMinMax1),Math.max.apply(null, dataMinMax1),Math.min.apply(null, dataMinMax2),Math.max.apply(null, dataMinMax2),Math.min.apply(null, dataMinMax3),Math.max.apply(null, dataMinMax3)];

if($("#appraisalChoice")[0].selectedIndex==0){
  dataChange = data1;
  var YMin=dataMinMax[0].toFixed(2);
  var YMax=(dataMinMax[1]+10).toFixed(2);
}else if($("#appraisalChoice")[0].selectedIndex==1){
  dataChange = data2;
  var YMin=dataMinMax[2].toFixed(2);
  var YMax=(dataMinMax[3]+0.5).toFixed(2);
}else if($("#appraisalChoice")[0].selectedIndex==2){
  dataChange = data3;
  var YMin=dataMinMax[4].toFixed(2);
  var YMax=(dataMinMax[5]+1).toFixed(2);
}
$("body").delegate("#appraisalChoice","change",function(){
  if($(this)[0].selectedIndex==0){
    dataChange = data1;
    YMin=dataMinMax[0].toFixed(2);
    YMax=(dataMinMax[1]+10).toFixed(2);
  }else if($(this)[0].selectedIndex==1){
    dataChange = data2;
    YMin=dataMinMax[2].toFixed(2);
    YMax=(dataMinMax[3]+0.5).toFixed(2);
  }else if($(this)[0].selectedIndex==2){
    dataChange = data3;
    YMin=dataMinMax[4].toFixed(2);
    YMax=(dataMinMax[5]+1).toFixed(2);
  }
  reportChartsData(dataChange,YMin,YMax);
})
reportChartsData(dataChange,YMin,YMax);
}
//index页面里右侧评估报告报表样式数据
function reportChartsData(dataChange,YMin,YMax){
    var report = echarts.init(document.getElementById('reportChart'));          
    option = {
    backgroundColor:"#fff",
    color:['red','green'],
    legend: {
        data:['红线数据']
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
    },
    yAxis:{
        type: 'value',
        min:YMin,
        max:YMax,
        splitLine: {
            show: false
        }
    },
    series: [{
        name: '红线数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        symbolSize:6,
        itemStyle : {
                normal : {
                    color:'red',
                    lineStyle:{
                        color:'red'
                    }
                }
            },
        data: dataChange
    }
    ]
};  
    report.setOption(option);
}
function appraisalReportHtml(){
  var html='';
  html+='<div class="reportFrame">'+
      '<div class="reportTitle">'+
          '<p class="title_report">方案结果评估报告<img src="images/min.png" style="cursor:pointer" class="empty_btn" onclick="zhao_none(\'.zhao_left\',\'.reportFrame\')">'+
          '<ul class="reportTitle_u1">'+
              '<li><span style="margin-left:7px">评估项目选择</span><select id="dataTypeId"><option>01</option><option>02</option><option>03</option></select></li>'+
              '<li class="reportTitle_u1_l2"><span>项目名称</span><input type="text" class="reportIpt1" value="A5施工仿真"></li>'+
              '<li class="reportTitle_u1_l2"><span>评估对象选择</span><select id="reportObj"><option>交通小区</option><option>路径</option><option>弧段</option></select></li>'+
              '<li class="reportTitle_u1_l2"><span>时间范围</span><input type="text" id="reportIpt3" class="reportIpt3" value="2016-04-02 08:00:00--10:00:00"></li>'+
          '</ul>'+
          '<ul class="reportTitle_u2">'+
              '<li><span id="changeNumName" style="margin-left:7px">小区编号</span><input type="text" id="reportNum" class="reportIpt2 reportTitle_u2_Ipt" value=""></li>'+
              '<li class="reportTitle_u1_l2"><span>评估指标选择</span><select id="appraisalChoice"><option>交通拥堵指数TPI</option><option>交通拥堵率TCR</option></select>'+
              '</li>'+
              '<li class="reportTitle_u1_l2"><span>评估前</span><select id="colorId0"><option>黑色</option><option>红色</option><option>绿色</option><option>黄色</option></select></li>'+
              '<li class="reportTitle_u1_l2"><span>方案一</span><select id="colorId1"><option>红色</option><option>绿色</option><option>黄色</option><option>黑色</option></select></li>'+
              '<li class="reportTitle_u1_l2"><span>方案二</span><select id="colorId2"><option>绿色</option><option>黄色</option><option>黑色</option><option>红色</option></select></li>'+
              '<li class="reportTitle_u1_l2"><span>方案三</span><select id="colorId3"><option>黄色</option><option>黑色</option><option>红色</option><option>绿色</option></select></li>'+
              '<li class="reportTitle_u1_l2"><input type="button" value="确定" onclick="changeReportCharts()"  class="reportTitle_u2_btn"/></li>'+
          '</ul>'+
      '</div>'+
      '<div class="reportContent">'+
          '<div class="reportContent_left">'+
              '<div id="reportChart"></div>'+
              '<div class="left_down">'+
                  '<ul class="left_down_u1">'+
                      '<li><span>评估前数据统计</span></li>'+
                      '<li><span>平均TPI值</span><input type="text" id="downIpt1" class="downIpt1" value=""/></li>'+
                      '<li><span>拥堵率TCR</span><input type="text" id="downIpt2" class="downIpt1" value=""/></li>'+
                      '<li><span>拥堵持续CKT</span><input type="text" id="downIpt3" class="downIpt1" value=""/></li>'+
                  '</ul>'+
                  '<ul class="left_down_u2">'+
                      '<li><span>方案一数据统计</span></li>'+
                      '<li><span>平均TPI值</span><input type="text" id="downIpt4" class="downIpt1" value=""/></li>'+
                      '<li><span>拥堵率TCR</span><input type="text" id="downIpt5" class="downIpt1" value=""/></li>'+
                      '<li><span>拥堵持续CKT</span><input type="text" id="downIpt6" class="downIpt1" value=""/></li>'+
                  '</ul>'+
                  '<ul class="left_down_u2">'+
                      '<li><span>方案二数据统计</span></li>'+
                      '<li><span>平均TPI值</span><input type="text" id="downIpt7" class="downIpt1" value=""/></li>'+
                      '<li><span>拥堵率TCR</span><input type="text" id="downIpt8" class="downIpt1" value=""/></li>'+
                      '<li><span>拥堵持续CKT</span><input type="text" id="downIpt9" class="downIpt1" value=""/></li>'+
                  '</ul>'+
                  '<ul class="left_down_u2">'+
                      '<li><span>方案三数据统计</span></li>'+
                      '<li><span>平均TPI值</span><input type="text" id="downIpt10" class="downIpt1" value=""/></li>'+
                      '<li><span>拥堵率TCR</span><input type="text" id="downIpt11" class="downIpt1" value=""/></li>'+
                      '<li><span>拥堵持续CKT</span><input type="text" id="downIpt12" class="downIpt1" value=""/></li>'+
                  '</ul>'+
              '</div>'+
          '</div>'+
          '<div class="reportContent_right">'+
              '<p class="z_title re">所选小区属性</p>'+
                      '<ul class="node_ul node_ultimate_bg re">'+
                        '<li><span>小区编号</span><input type="text" id="villageReport1" class="node_ul_ipt1" name="" value=""></li>'+
                        '<li><span>小区面积</span><input type="text" id="villageReport2" class="node_ul_ipt1" name="" value=""></li>'+
                        '<li><span>小区出口</span><input type="text" id="villageReport3" class="node_ul_ipt1" name="" value=""></li>'+
                        '<li><span>小区入口</span><input type="text" id="villageReport4" class="node_ul_ipt1" name="" value=""></li>'+
                        '<li><span>小区名称</span><input type="text" id="villageReport5" class="node_ul_ipt1" name="" value=""></li>'+
                      '</ul>'+
                      '<p class="z_title re">小区中心属性</p>'+
                      '<ul class="node_ul node_ultimate_bg re">'+
                        '<li><span>节点编号</span><input type="text" name="" id="villageReport6" class="node_ul_ipt1" value=""></li>'+
                        '<li><span>进出类型</span>'+
                            '<select id="nodeSec2" class="node_ul_ipt2">'+
                            '<option>0-双向</option>'+
                            '<option selected="selected">1-只进入</option>'+
                            '<option>-1-只离开</option>'+
                            '</select>'+
                        '</li>'+
                        '<li><span>连杆数量</span><input type="text" id="villageReport7" name="" class="node_ul_ipt1" value=""></li>'+
                        '<li><span>连杆能力</span><input type="text" id="villageReport8" name="" class="node_ul_ipt1" value=""></li>'+
                      '</ul>'+
              '<ul class="ul_btFrame1">'+
                '<li><input type="button" value="导出数据"><input type="button" value="导出图表"></li>'+
              '</ul>'+
          '</div>'+
      '</div>'+
  '</div>';
  $("body").append(html);
  divDrag('.reportTitle','.reportFrame');
  $(".node_ul select").css({"width":"138px"});
  $("body").delegate("#appraisalChoice","change",function(){
      changeReportCharts(); 
    });
  $("body").delegate("#reportObj","change",function(){
    var htmlContent1,htmlContent2;
      if($(this)[0].selectedIndex==0){
        htmlContent1='',htmlContent2='';
        $("#changeNumName").text('小区编号');
        $("#appraisalChoice option").remove();
        htmlContent1+='<option>交通拥堵指数TPI</option><option>交通拥堵率TCR</option>';
        $("#appraisalChoice").append(htmlContent1);
        $(".re").remove();
        htmlContent2+='<p class="z_title re">所选小区属性</p>'+
                      '<ul class="node_ul node_ultimate_bg re">'+
                        '<li><span>小区编号</span><input type="text" id="villageReport1" class="node_ul_ipt1" name="" value=""></li>'+
                        '<li><span>小区面积</span><input type="text" id="villageReport2" class="node_ul_ipt1" name="" value=""></li>'+
                        '<li><span>小区出口</span><input type="text" id="villageReport3" class="node_ul_ipt1" name="" value=""></li>'+
                        '<li><span>小区入口</span><input type="text" id="villageReport4" class="node_ul_ipt1" name="" value=""></li>'+
                        '<li><span>小区名称</span><input type="text" id="villageReport5" class="node_ul_ipt1" name="" value=""></li>'+
                      '</ul>'+
                      '<p class="z_title re">小区中心属性</p>'+
                      '<ul class="node_ul node_ultimate_bg re">'+
                        '<li><span>节点编号</span><input type="text" name="" id="villageReport6" class="node_ul_ipt1" value=""></li>'+
                        '<li><span>进出类型</span>'+
                            '<select id="nodeSec2" class="node_ul_ipt2">'+
                            '<option>0-双向</option>'+
                            '<option selected="selected">1-只进入</option>'+
                            '<option>-1-只离开</option>'+
                            '</select>'+
                        '</li>'+
                        '<li><span>连杆数量</span><input type="text" id="villageReport7" name="" class="node_ul_ipt1" value=""></li>'+
                        '<li><span>连杆能力</span><input type="text" id="villageReport8" name="" class="node_ul_ipt1" value=""></li>'+
                      '</ul>';
        $(".ul_btFrame1").before(htmlContent2);
        // ReportHouseAttribute();
      }else if($(this)[0].selectedIndex==1){
        htmlContent1='',htmlContent2='';
        $("#changeNumName").text('路径编号');
        $("#appraisalChoice option").remove();
        htmlContent1+='<option>路径旅行时间</option><option>路径延误</option><option>路径车公里数</option>';
        $("#appraisalChoice").append(htmlContent1);
        $(".re").remove();
        htmlContent2+='<p class="z_title re">所选路径属性</p>'+
                      '<ul class="node_ul node_ultimate_bg re">'+
                        '<li><span>路径编号</span><input type="text" class="node_ul_ipt1" name="" value=""></li>'+
                        '<li><span>路径名称</span><input type="text" class="node_ul_ipt1" name="" value=""></li>'+
                        '<li><span>弧段数量</span><input type="text" class="node_ul_ipt1" name="" value=""></li>'+
                        '<li><span>路径距离</span><input type="text" class="node_ul_ipt1" name="" value=""></li>'+
                        '<li><span>自有流旅行时间</span><input type="text" class="freeIpt1 node_ul_ipt1" name="" value=""></li>'+
                      '</ul>';
        $(".ul_btFrame1").before(htmlContent2);
        $(".node_ul li span").css({"width":"initial"});
        $(".freeIpt1").css({"width":"99px"});
        $(".node_ul_ipt1").css({"margin-left":"18px"});
      }else if($(this)[0].selectedIndex==2){
        htmlContent1='',htmlContent2='';
        $("#changeNumName").text('所选路径属性');
        $("#appraisalChoice option").remove();
        htmlContent1+='<option>路段车流量</option><option>路段旅行时间</option><option>路段平均车速</option>'+
                      '<option>路段延误统计</option><option>每车道交通密度</option><option>路段排队长度</option>'+
                      '<option>路段排队车辆数</option>';
        $("#appraisalChoice").append(htmlContent1);
        $(".re").remove();
        htmlContent2+='<p class="z_title re">所选路径属性</p>'+
                      '<ul class="node_ul node_ultimate_bg re">'+
                        '<li><span>路段编号</span><input id="attr0" type="text" name="" data="" value="" readonly="readonly"></li>'+
                        '<li><span>起始节点</span><input id="attr1" type="text" name="" data="" value=""></li>'+
                        '<li><span>终止节点</span><input id="attr2" type="text" name="" data="" value=""></li>'+
                        '<li><span>路段长度</span><input id="attr3" type="text" name="" data="" value=""></li>'+
                        '<li><span>路段名称</span><input id="attr4" type="text" name="" data="" value=""></li>'+
                        '<li><span>路段类型</span>'+
                              '<select id="road_targetSelect2">'+
                                  '<option>1-城市快速路</option>'+
                                  '<option>2-城市主干道</option>'+
                                  '<option>3-城市次干道</option>'+
                                  '<option>4-城市支路</option>'+
                                  '<option>5-路口连接线</option>'+
                                  '<option>6-城市内辅路</option>'+
                                  '<option>7-城市内匝道</option>'+
                                  '<option>8-城市内胡同</option>'+
                                  '<option>9-城市外辅路</option>'+
                                  '<option>10-城市外匝道</option>'+
                                  '<option>11-小区连杆</option>'+
                                  '<option>12-高速公路</option>'+
                                  '<option>13-一级公路</option>'+
                                  '<option>14-二级公路</option>'+
                                  '<option>15-三级公路</option>'+
                                  '<option>16-四级公路</option>'+
                                  '<option>100-公交专用道</option>'+
                                  '<option>200-步行专用道</option>'+
                              '</select>'+
                        '</li>'+
                        '<li><span>路段方向</span>'+
                              '<select id="road_targetSelect3">'+
                                  '<option>0-双向</option>'+
                                  '<option>1-单向</option>'+
                              '</select>'+
                        '</li>'+
                        '<li><span>允许需求</span>'+
                              '<select id="road_targetSelect4">'+
                                  '<option>1-客车</option>'+
                                  '<option>2-货车</option>'+
                                  '<option>3-公交车</option>'+
                                  '<option>4-普通公交车</option>'+
                                  '<option>5-自行车类</option>'+
                              '</select>'+
                        '</li>'+
                        '<li><span>车道数量</span><input id="attr8" type="text" name="" data="" value=""></li>'+
                        '<li><span>限速数值</span><input id="attr9" type="text" name="" data="" value=""></li>'+
                        '<li><span>车道能力</span><input id="attr10" type="text" name="" data="" value=""></li>'+
                        '<li><span>阻塞密度</span><input id="attr11" type="text" name="" data="" value=""></li>'+
                        '<li><span>拥堵波速</span><input id="attr12" type="text" name="" data="" value="12km/h"></li>'+
                      '</ul>';
                $(".ul_btFrame1").before(htmlContent2);
                $(".node_ul select").css({"width":"138px"});
                // ReporAttribute();
      }
  });
}
function changeReportCharts(){
  if($("#reportObj")[0].selectedIndex==2){
      ReporAttribute();
      reportRoadTimeAjax();
  }else if($("#reportObj")[0].selectedIndex==0){
      report_dataAjax();
      ReportHouseAttribute();
  }
}
function ReportHouseAttribute(){//报告小区的ajax
  var _vNum=$("#reportNum").val();
  var _val="{'ID':"+_vNum+"}";
  $.ajax({
     url:"GetDevice",
         dataType:"json",
         data:{ "action":"query","type":41,"val":_val},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
              $("#villageReport1").val(data.entitys[0][0]);
              $("#villageReport2").val(data.entitys[0][1]);
              $("#villageReport3").val(data.entitys[0][2]);
              $("#villageReport4").val(data.entitys[0][3]);
              $("#villageReport5").val(data.entitys[0][4]);
              $("#villageReport6").val(data.entitys[1][0]);
              $("#villageReport7").val(data.entitys[1][2]);
              $("#villageReport8").val(data.entitys[1][3]);
              $("#nodeSec2 option").eq(data.entitys[1][1]).attr("selected", true);
         },
         error:function()
         {

         }
  })
}
function timeChange(num){
  var num=num+"";
  return num=num.length>1?num:0+num;
}
function dateAddDays(dataStr,dayCount){
   var strdate=dataStr; //日期字符串
   var isdate = new Date(strdate.replace(/-/g,"/"));  //把日期字符串转换成日期格式
  //  isdate = new Date((isdate/1000+(86400*dayCount))*1000);  //日期加1天
   var pdate = isdate.getFullYear()+"-"+(timeChange(isdate.getMonth()+1))+"-"+(timeChange(isdate.getDate()))+" "+(23)+":"+(59)+":"+(59);   //把日期格式转换成字符串
   return pdate;
}
function report_dataAjax(){//报告小区图表数据
  $("#reportChart").remove();  
  var html='';
  html+='<div id="reportChart"></div>';
  $(".left_down").before(html);
  var upTime=$("#reportIpt3").val().split("--")[0];
  var isTimes =$("#reportIpt3").val().split("--")[0].split(" ")[0]+' '+$("#reportIpt3").val().split("--")[1];
  // var isTimes = dateAddDays(upTime,1);
  
  var _vNum=$("#reportNum").val();
  var pa=_vNum+",'"+upTime+"','"+isTimes+"'";
  var type,Name;
  if($("#appraisalChoice")[0].selectedIndex==0){
    type=1;
    Name=null;
  }else if($("#appraisalChoice")[0].selectedIndex==1){
    type=2;
    Name='%';
  }
  var reportLineColor=getLineColor();
  if(_vNum != ""){
    reportBeforeData(type,pa,Name,reportLineColor);
  }else{
    alert("请选择历史与近期开始时间");
  }
}
function getLineColor(){
  var lineColor=['black','red','green','yellow'];
  if($("#colorId0")[0].selectedIndex==0){
      lineColor[0]='black';
  }else if($("#colorId0")[0].selectedIndex==1){
      lineColor[0]='red';
  }else if($("#colorId0")[0].selectedIndex==2){
      lineColor[0]='green';
  }else if($("#colorId0")[0].selectedIndex==3){
      lineColor[0]='yellow';
  }
  if($("#colorId1")[0].selectedIndex==0){
      lineColor[1]='red';
  }else if($("#colorId1")[0].selectedIndex==1){
      lineColor[1]='green';
  }else if($("#colorId1")[0].selectedIndex==2){
      lineColor[1]='yellow';
  }else if($("#colorId1")[0].selectedIndex==3){
      lineColor[1]='black';
  }
  if($("#colorId2")[0].selectedIndex==0){
      lineColor[2]='green';
  }else if($("#colorId2")[0].selectedIndex==1){
      lineColor[2]='yellow';
  }else if($("#colorId2")[0].selectedIndex==2){
      lineColor[2]='black';
  }else if($("#colorId2")[0].selectedIndex==3){
      lineColor[2]='red';
  }
  if($("#colorId3")[0].selectedIndex==0){
      lineColor[3]='yellow';
  }else if($("#colorId3")[0].selectedIndex==1){
      lineColor[3]='black';
  }else if($("#colorId3")[0].selectedIndex==2){
      lineColor[3]='red';
  }else if($("#colorId3")[0].selectedIndex==3){
      lineColor[3]='green';
  }
  return lineColor;
}
function reportBeforeData(type,pa,Name,reportLineColor){
  $.ajax({
     url:"GetNetIndex",
         dataType:"json",
         data:{ "action":"query","type":type+'0',"pa":pa},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               plan1(type,data.entitys,pa,Name,reportLineColor);
         },
         error:function(){}
    });
  function plan1(type,data1,pa,Name,reportLineColor){
     $.ajax({
         url:"GetNetIndex",
             dataType:"json",
             data:{ "action":"query","type":type+'2',"pa":pa+',1'},
             contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
             beforeSend:function(){  },
             success: function( data, textStatus, jqXHR ){
                   reportVillage_DataCharts(data.entitys,data1,Name,reportLineColor)
             },
             error:function(){}
        });
      }
}


function reportVillage_DataCharts(data2,data1,Name,reportLineColor){
var reportVillage = echarts.init(document.getElementById('reportChart')); 
optionUp = {
  backgroundColor:"#fff",
    color:reportLineColor,
    legend: {
        data:['评估前','方案一','方案二','方案三']
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
        name: '评估前',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        symbolSize:3,
        itemStyle : {
        normal : {
                    color:reportLineColor[0],
          lineStyle:{
            color:reportLineColor[0]
          }
        }
      },
        data: data1
    },{
        name: '方案一',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        symbolSize:3,
        itemStyle : {
        normal : {
                    color:reportLineColor[1],
          lineStyle:{
            color:reportLineColor[1]
          }
        }
      },
        data: data2
    }
    ]
};  
if($("#appraisalChoice")[0].selectedIndex==0){
  optionUp.yAxis.min=0;
  optionUp.yAxis.max=10;
}
 reportVillage.setOption(optionUp);
 statisticsReportResult();
}
function statisticsReportResult(){
  var upTime=$("#reportIpt3").val().split("--")[0];
  var isTimes = dateAddDays(upTime,1);
  var _vNum=$("#reportNum").val();
  var pa=_vNum+",'"+upTime+"','"+isTimes+"'";
  var type;
  if($("#appraisalChoice")[0].selectedIndex==0){
    type=1;
  }else if($("#appraisalChoice")[0].selectedIndex==1){
    type=2;
  }
  $.ajax({
   url:"GetNetIndex",
     dataType:"json",
     data:{ "action":"query","type":type+'1',"pa":pa},
     contentType:"contentType:application/x-www-form-urlencoded;charset=UTF-8",
     beforeSend:function(){  },
     success: function( data, textStatus, jqXHR ){
           totalVal_report(data.entitys);
     },
     error:function(){}
  })
  $.ajax({
   url:"GetNetIndex",
     dataType:"json",
     data:{ "action":"query","type":type+'3',"pa":pa+',1'},
     contentType:"contentType:application/x-www-form-urlencoded;charset=UTF-8",
     beforeSend:function(){  },
     success: function( data, textStatus, jqXHR ){
           totalVal_report1(data.entitys);
     },
     error:function(){}
  })
}
function totalVal_report(data){
  $("#downIpt1").val((data[0]-0).toFixed(1));
  $("#downIpt2").val((data[1]-0).toFixed(1));
  $("#downIpt3").val((data[2]-0).toFixed(1));
}
function totalVal_report1(data){
  $("#downIpt4").val((data[0]-0).toFixed(1));
  $("#downIpt5").val((data[1]-0).toFixed(1));
  $("#downIpt6").val((data[2]-0).toFixed(1));
}