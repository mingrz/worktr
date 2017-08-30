var Materials_drawPoint;//物资绘制控件
var DangerousCars_drawPoint;//危险品车辆绘制控件
var Others_drawPoint;//其他绘制控件
var Bus_drawPoint;//公交绘制控件
var ProwlCar_drawPoint;//巡逻车绘制控件
var Man_drawPoint//管理人员绘制控件
var pos;//坐标
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
        //$(".all_tc").css("visibility","visible");   
    });
    EventUtil.addHandler(document,"click",function(event){
        $(".all_tc").css("visibility","hidden");  
    });
});

// function addLayer(){
//             supermap.addLayers([layer,vector,markerlayer,markerlayer1,markerlayer2,markerlayer3,markerlayer4,markerlayer5]);
//             // supermap.setCenter(new SuperMap.LonLat(12992908.68611, 4798249.58516), 12);
//             supermap.setCenter(new SuperMap.LonLat(12944665.39419, 4845167.46848), 13);
//         }


//标记点弹窗的弹窗的隐藏（btn）        
function zhao_none(a,b){
	$(a).css("display","none");
	$(b).remove();
}


var max ={};
var Materialmax = 0;
//工作人员查看,修改的属性框的创建
function policeMan_setup(data){
    var nr='';
    nr+='<div class="node_kuang" style="height:219px">'+
        '<p class="tj_title">管理人员信息'+
            '<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao_left\',\'.node_kuang\')" />'+
        '</P>'+
        '<div class="mennu_content">'+
            '<div id="jd_menu">'+
                '<ul class="menu_ul">'+
                    '<li><span>人员编号</span><input type="text" name="" id="policeNumber" value="'+data[0]+'"/></li>'+
                    '<li><span>管理部门</span><input type="text" name="" id="department" value="'+data[1]+'"/></li>'+
                    '<li><span>人员姓名</span><input type="text" name="" id="policeName" value="'+data[2]+'"/></li>'+
                    '<li><span>管理片区</span><input type="text" name="" id="superviseArea" value="'+data[3]+'"/></li>'+
                    '<li><span>执勤时间</span><input type="text" name="" id="onDuty" value="'+data[4]+'-'+data[5]+'"/></li>'+
                    '<li><span>人员状态</span>'+
                        '<select class="select2" id="devicetype">'+
                            '<option>0-未激活</option>'+
                            '<option>1-激活</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
            '</div>'+
            '<div class="tu" >'+
                '<div class="imgnum">'+
                  '<input type="file" class="filepath" onchange="changeImgs(this)"/>'+
                  '<img src="images/man.jpg" class="original_img1" />'+
                  '<img src="" class="change_img2" style="display:none"/>'+
                 '</div>'+
            '</div>'+
        '</div>'+
        '<p class="deploy_btn">'+
            '<input type="submit" name="submit" class="btn1" value="确定修改" onclick="getEmptyVal(),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
            '<input type="button" name="button" class="btn2" value="取消" onclick="zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
            '<input type="button" name="button" class="btn2" value="解除" onclick="removeDataMarker(),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
            '<input type="submit" name="submit" class="Push_notifications_btn" value="推送信息">'+
        '</p>'+
    '</div>';
    $('body').append(nr);
    $("#devicetype option").eq(data[6]).attr("selected", true);
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

//巡逻车辆属性框的创建显示
// function ProwlCar_show(){
//     $(".zhao").css("display","block");
//     policeManAttribute(341,1);
// }

//巡逻车辆属性框的创建
function ProwlCar_setup(data){
    var nr='';
    nr+='<div class="node_kuang" style="height:219px">'+
        '<p class="tj_title">巡逻车辆信息'+
            '<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao_left\',\'.node_kuang\')"/>'+
        '</P>'+
        '<div class="mennu_content">'+
            '<div id="jd_menu">'+
                '<ul class="menu_ul">'+
                    '<li><span>车辆编号</span><input type="text" id="prowlNumber" name="" value="'+data[0]+'"/></li>'+
                    '<li><span>管理部门</span><input type="text" id="prowlDepartment" name="" value="'+data[1]+'"/></li>'+
                    '<li><span>车辆类型</span><input type="text" id="carType" name="" value="'+data[2]+'"/></li>'+
                    '<li><span>车牌号码</span><input type="text" id="plateNumber" name="" value="'+data[3]+'"/></li>'+
                    '<li><span>服务时间</span><input type="text" id="onDuty" name="" value="'+data[4]+'-'+data[5]+'"/></li>'+
                    '<li><span>车辆状态</span>'+
                        '<select class="select2" id="cars_type">'+
                            '<option>0-未激活</option>'+
                            '<option>1-激活</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
            '</div>'+
            '<div class="tu" >'+
                '<div class="imgnum">'+
                  '<input type="file" class="filepath" onchange="changeImgs(this)"/>'+
                  '<img src="images/car.jpg" class="original_img1" />'+
                  '<img src="" class="change_img2" style="display:none"/>'+
                 '</div>'+
            '</div>'+
        '</div>'+
        '<p class="deploy_btn">'+
           ' <input type="submit" name="submit" class="btn1" value="确定修改" onclick="getEmptycarsVal1(1),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
            '<input type="button" name="button" class="btn2" value="取消" onclick="zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
            '<input type="button" name="button" class="btn2" value="解除" onclick="removeDataMarker(),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
        '</p>'+
    '</div>';
    $('body').append(nr);
    $("#cars_type option").eq(data[7]).attr("selected", true);
}

//公交优先属性框的创建显示
// function Bus_show(){
//     $(".zhao").css("display","block");
//     //BusAttribute();
//     policeManAttribute(341,2);
// }

//公交优先属性框的创建
function Bus_setup(data){
    var nr='';
    nr+='<div class="node_kuang" style="height:242px;">'+
        '<p class="tj_title"><span>添加公交优先信息</span>'+
            '<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao_left\',\'.node_kuang\')"/>'+
        '</P>'+
        '<div class="mennu_content">'+
            '<div id="jd_menu">'+
                '<ul class="menu_ul">'+
                    '<li><span>车辆编号</span><input type="text" id="carsNumber" name="" value="'+data[0]+'"/></li>'+
                    '<li><span>管理部门</span><input type="text" id="department" name="" value="'+data[1]+'"/></li>'+
                    '<li><span>车辆类型</span><input type="text" id="carType" name="" value="'+data[2]+'"/></li>'+
                    '<li><span>车牌号码</span><input type="text" id="plateNumber" name="" value="'+data[3]+'"/></li>'+
                    '<li><span>服务时间</span><input type="text" id="onDuty" name="" value="'+data[4]+'-'+data[5]+'"/></li>'+
                    '<li><span>优先等级</span>'+
                        '<select class="select2" id="firstleval">'+
                            '<option>1级</option>'+
                            '<option>2级</option>'+
                            '<option>3级</option>'+
                        '</select>'+
                    '</li>'+
                    '<li><span>车辆状态</span>'+
                        '<select class="select2" id="cars_type">'+
                            '<option>0-未激活</option>'+
                            '<option>1-激活</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
            '</div>'+
            '<div class="tu" >'+
                '<div class="imgnum">'+
                  '<input type="file" class="filepath" onchange="changeImgs(this)"/>'+
                  '<img src="images/car.jpg" class="original_img1" />'+
                  '<img src="" class="change_img2" style="display:none"/>'+
                 '</div>'+
            '</div>'+
        '</div>'+
        '<p class="deploy_btn">'+
            '<input type="submit" name="submit" class="btn1" value="确定修改" onclick="getEmptycarsVal(2),zhao_none(\'.zhao_left\',\'.node_kuang\')"/>'+
            '<input type="button" name="button" class="btn2" value="取消" onclick="zhao_none(\'.zhao_left\',\'.node_kuang\')"/>'+
            '<input type="button" name="button" class="btn2" value="解除" onclick="removeDataMarker(),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
        '</p>'+
    '</div>';
    $('body').append(nr);
    $("#firstleval option").eq(data[6]).attr("selected", true);
    $("#cars_type option").eq(data[7]).attr("selected", true);
}       

//其他优先属性框的创建显示
// function Others_show(){
//     $(".zhao").css("display","block");
//     //OthersAttribute();
//     policeManAttribute(341,3);
// }

//其他优先属性框的创建
function Others_setup(data){
    var nr='';
    nr+='<div class="node_kuang" style="height:242px;">'+
        '<p class="tj_title"><span>添加其他优先信息</span>'+
            '<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao_left\',\'.node_kuang\')"/>'+
        '</P>'+
        '<div class="mennu_content">'+
            '<div id="jd_menu">'+
                '<ul class="menu_ul">'+
                    '<li><span>车辆编号</span><input type="text" id="carsNumber" name="" value="'+data[0]+'"/></li>'+
                    '<li><span>管理部门</span><input type="text" id="department" name="" value="'+data[1]+'"/></li>'+
                    '<li><span>车辆类型</span><input type="text" id="carType" name="" value="'+data[2]+'"/></li>'+
                    '<li><span>车牌号码</span><input type="text" id="plateNumber" name="" value="'+data[3]+'"/></li>'+
                    '<li><span>服务时间</span><input type="text" id="onDuty" name="" value="'+data[4]+'-'+data[5]+'"/></li>'+
                    '<li><span>优先等级</span>'+
                        '<select class="select2" id="firstleval">'+
                            '<option>1级</option>'+
                            '<option>2级</option>'+
                            '<option>3级</option>'+
                        '</select>'+
                    '</li>'+
                    '<li><span>车辆状态</span>'+
                        '<select class="select2" id="cars_type">'+
                            '<option>0-未激活</option>'+
                            '<option>1-激活</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
            '</div>'+
            '<div class="tu" >'+
                '<div class="imgnum">'+
                  '<input type="file" class="filepath" onchange="changeImgs(this)"/>'+
                  '<img src="images/car.jpg" class="original_img1" />'+
                  '<img src="" class="change_img2" style="display:none"/>'+
                 '</div>'+
            '</div>'+
        '</div>'+
        '<p class="deploy_btn">'+
            '<input type="submit" name="submit" class="btn1" value="确定修改" onclick="getEmptycarsVal(3),zhao_none(\'.zhao_left\',\'.node_kuang\')"/>'+
            '<input type="button" name="button" class="btn2" value="取消" onclick="zhao_none(\'.zhao_left\',\'.node_kuang\')"/>'+
            '<input type="button" name="button" class="btn2" value="解除" onclick="removeDataMarker(),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
        '</p>'+
    '</div>';
    $('body').append(nr);
    $("#firstleval option").eq(data[6]).attr("selected", true);
    $("#cars_type option").eq(data[7]).attr("selected", true);
}       

//危险品车辆属性框的创建显示
// function DangerousCars_show(){
//     $(".zhao").css("display","block");
//     //DangerousCarsAttribute();
//     policeManAttribute(341,4);
// }

//危险品车辆属性框的创建
function DangerousCars_setup(data){
    var nr='';
    nr+='<div class="node_kuang" style="height:219px">'+
        '<p class="tj_title">危险品车辆信息'+
            '<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao_left\',\'.node_kuang\')"/>'+
        '</P>'+
        '<div class="mennu_content">'+
            '<div id="jd_menu">'+
                '<ul class="menu_ul">'+
                    '<li><span>车辆编号</span><input type="text" id="prowlNumber" name="" value="'+data[0]+'"/></li>'+
                    '<li><span>管理部门</span><input type="text" id="prowlDepartment" name="" value="'+data[1]+'"/></li>'+
                    '<li><span>车辆类型</span><input type="text" id="carType" name="" value="'+data[2]+'"/></li>'+
                    '<li><span>车牌号码</span><input type="text" id="plateNumber" name="" value="'+data[3]+'"/></li>'+
                    '<li><span>服务时间</span><input type="text" id="onDuty" name="" value="'+data[4]+'-'+data[5]+'"/></li>'+
                    '<li><span>车辆状态</span>'+
                        '<select class="select2" id="cars_type">'+
                            '<option>0-未激活</option>'+
                            '<option>1-激活</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
            '</div>'+
            '<div class="tu" >'+
                '<div class="imgnum">'+
                  '<input type="file" class="filepath" onchange="changeImgs(this)"/>'+
                  '<img src="images/car.jpg" class="original_img1" />'+
                  '<img src="" class="change_img2" style="display:none"/>'+
                 '</div>'+
            '</div>'+
        '</div>'+
        '<p class="deploy_btn">'+
           ' <input type="submit" name="submit" class="btn1" value="确定修改" onclick="getEmptycarsVal1(4),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
            '<input type="button" name="button" class="btn2" value="取消" onclick="zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
            '<input type="button" name="button" class="btn2" value="解除" onclick="removeDataMarker(),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
        '</p>'+
    '</div>';
    $('body').append(nr);
    $("#cars_type option").eq(data[7]).attr("selected", true);
}       

        
//物资存放属性框的显示
// function Materials_show(){
//     $(".zhao").css("display","block");
//     policeManAttribute(321);
// }
function Materials_setup(data){//物资存放属性框的创建
    var nr='';
    nr+='<div class="node_kuang" style="height:245px">'+
        '<p class="tj_title">物资存放信息'+
            '<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao_left\',\'.node_kuang\')"/>'+
        '</P>'+
        '<div class="mennu_content">'+
            '<div id="jd_menu">'+
                '<ul class="menu_ul">'+      
                   ' <li><span>物资编号</span><input type="text" id="materialNumber" name="" value="'+data[0]+'"/></li>'+
                    '<li><span>物资类型</span><input type="text" id="materialType" name="" value="'+data[1]+'"/></li>'+
                    '<li><span>物资数量</span><input type="text" id="materialNum" name="" value="'+data[2]+'"/></li>'+
                    '<li><span>存放时间</span><input type="text" id="materialTime" readonly="readonly" name="" value="'+data[3]+'" onClick="jeDate({dateCell:\'#materialTime\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/></li>'+
                    '<li><span>经度坐标</span><input type="text" id="Lon" name="" value="'+pos.lon+'"/></li>'+
                    '<li><span>纬度坐标</span><input type="text" id="Lat" name="" value="'+pos.lat+'"/></li>'+
                    '<li><span>存放地点</span><input type="text" id="place" name="" value="'+data[4]+'"/></li>'+
                '</ul>'+
            '</div>'+
            '<div class="tu" >'+
                '<div class="imgnum">'+
                  '<input type="file" class="filepath" onchange="changeImgs(this)"/>'+
                  '<img src="images/man.jpg" class="original_img1" />'+
                  '<img src="" class="change_img2" style="display:none"/>'+
                 '</div>'+
            '</div>'+
        '</div>'+
        '<p class="deploy_btn">'+
            '<input type="submit" name="submit" class="btn1" value="确定修改" onclick="getEmptyMaterialVal(),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
            '<input type="button" name="button" class="btn2" value="取消" onclick="zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
            '<input type="button" name="button" class="btn2" value="解除" onclick="removeDataMarker(),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
        '</p>'+
        '</div>';
        $('body').append(nr);
}
        
 
//推送信息的弹出层
function Push_notificationsSetup(){
    var content='';
    $(".zhao").css("display","block");
    content+='<div class="Push_notificationsFrame">'+
                '<p class="PushNotifications_tltle">推送信息编辑</p>'+
                '<textarea class="PushNotifications_content"></textarea>'+
                '<p class="deploy_btn">'+
                    '<input type="submit"  value="推送" class="PushNotifications_btn1" class="PushNotifications_btn2" onclick="zhao_none(\'.zhao\',\'.Push_notificationsFrame\')"/>'+
                    '<input type="button" value="取消" class="PushNotifications_btn2" onclick="zhao_none(\'.zhao\',\'.Push_notificationsFrame\')"/>'+
                '</p>'+
            '</div>';
    $('body').append(content);
}
var policeVal;
function manCarWuDataAttr(){
    var data=[];
    data.push($("#policeNumber").val());
    return data;
}
function getEmptyVal(insert_data){//人
    var PoliceNumber=$("#policeNumber").val();
    var Department=$("#department").val();
    var PoliceName=$("#policeName").val();
    var SuperviseArea=$("#superviseArea").val();
    var OnDuty=$("#onDuty").val();
    var Devicetype=$("#devicetype option").index($('#devicetype option:selected'));
    var _time=OnDuty.split("-");   
    policeVal=PoliceNumber+";"+"'"+Department+"'"+";"+"'"+PoliceName+"'"+";"+"'"+SuperviseArea+"'"+";"+"'"+_time[0]+"'"+";"+"'"+_time[1]+"'"+";"+Devicetype+";0;"+pos.lon+" "+pos.lat;    
    if(insert_data){
        insertPolice(policeVal,320,PoliceNumber);
        max[13]++;
		changState();
    }else{
        insertPolice(policeVal,320);
    }
}
function insertPolice(policeVal,type,PoliceNumber){//人车物公用的ajax
    var dd=true;
    $(".node_kuang input").each(function(){
        if($(this).attr("type")=='text' && $(this).val()==""){
            dd=false;
        }
    })
    if(dd){
        $.ajax({
            url:"GetDevice",
            dataType:"json",
            data:{ "action":"insert","type":type,"val":policeVal},
            contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
            beforeSend:function(){ },
            success: function( data, textStatus, jqXHR ){
                if(PoliceNumber){ 
                    reviseAlert("添加成功！");
                }else{
                    reviseAlert("修改成功！");
                }
            },
            error:function()
            {
                    
            }
        })
    }else{
        alert("数据格式不正确或为空");
    }
}
//添加人员属性框
function emptyMan_information(){
   var manNum=max[13]+1;
    var content='';
    $(".zhao").css("display","block");
    content+='<div class="node_kuang" style="height:219px;">'+
        '<p class="tj_title"><span>添加管理人员信息</span>'+
            '<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
        '</P>'+
        '<div class="mennu_content">'+
            '<div id="jd_menu">'+
                '<ul class="menu_ul">'+
                    '<li><span>人员编号</span><input type="text" id="policeNumber" readonly="readonly"  name="" value="'+manNum+'"/></li>'+
                    '<li><span>管理部门</span><input type="text" id="department" name="" value=""/></li>'+
                    '<li><span>人员姓名</span><input type="text" id="policeName" name="" value=""/></li>'+
                    '<li><span>管理片区</span><input type="text" id="superviseArea" name="" value=""/></li>'+
                    '<li><span>执勤时间</span><input type="text" id="onDuty" name="" value=""/></li>'+
                    '<li><span>人员状态</span>'+
                        '<select class="select2" id="devicetype">'+
                            '<option>0-未激活</option>'+
                            '<option>1-激活</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
            '</div>'+
            '<div class="tu" >'+
                '<div class="imgnum">'+
                  '<input type="file" class="filepath" onchange="changeImgs(this)"/>'+
                  '<img src="images/man.jpg" class="original_img1" />'+
                  '<img src="" class="change_img2" style="display:none"/>'+
                 '</div>'+
            '</div>'+
        '</div>'+
        '<p class="deploy_btn">'+
            '<input type="submit" name="submit" class="btn1" value="确定添加" onclick="getEmptyVal(\'insert_data\'),zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
            '<input type="button" name="button" class="btn2" value="取消" onclick="zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
            '<input type="button" name="button" class="btn2" value="解除" onclick="removeDataMarker(),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
        '</p>'+
    '</div>'
    $('body').append(content);
}
function getEmptycarsVal1(num,insert_data,tab){//巡逻车，危险品
    var ProwlNumber=$("#prowlNumber").val();
    var ProwlDepartment=$("#prowlDepartment").val();
    var CarType=$("#carType").val();
    var PlateNumber=$("#plateNumber").val();
    var OnDuty=$("#onDuty").val();
    var Cars_type=$("#cars_type option").index($('#cars_type option:selected'));
    var _time=OnDuty.split("-");
    policeVal=ProwlNumber+";"+"'"+ProwlDepartment+"'"+";"+"'"+num+"'"+";"+"'"+PlateNumber+"'"+";"+"'"+_time[0]+"'"+";"+"'"+_time[1]+"'"+";0;"+Cars_type+";0;"+pos.lon+" "+pos.lat;
    //insertPolice(policeVal,50);
    if(insert_data){
        insertPolice(policeVal,340,ProwlNumber);
        max[14]++;
        changState();
    }else if(insert_data && tab){
        insertPolice(policeVal,340,ProwlNumber);
        max[17]++;
        changState();
    }else{
        insertPolice(policeVal,340);
    }
}
//巡逻车添加框
function emptyProwlCar_information(){
    var manNum=max[14]+1;
    var content='';
    $(".zhao").css("display","block");
    content+='<div class="node_kuang" style="height:219px;">'+
        '<p class="tj_title"><span>添加巡逻车信息</span>'+
            '<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
        '</P>'+
        '<div class="mennu_content">'+
            '<div id="jd_menu">'+
                '<ul class="menu_ul">'+
                    '<li><span>车辆编号</span><input type="text" id="prowlNumber" name="" value="'+manNum+'"/></li>'+
                    '<li><span>管理部门</span><input type="text" id="prowlDepartment" name="" value=""/></li>'+
                    '<li><span>车辆类型</span><input type="text" id="carType" name="" readonly="readonly" value="热谱探测车"/></li>'+
                    '<li><span>车牌号码</span><input type="text" id="plateNumber" name="" value=""/></li>'+
                    '<li><span>服务时间</span><input type="text" id="onDuty" name="" value=""/></li>'+
                    '<li><span>车辆状态</span>'+
                        '<select class="select2" id="cars_type">'+
                            '<option>0-未激活</option>'+
                            '<option>1-激活</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
            '</div>'+
            '<div class="tu" >'+
                '<div class="imgnum">'+
                  '<input type="file" class="filepath" onchange="changeImgs(this)"/>'+
                  '<img src="images/car.jpg" class="original_img1" />'+
                  '<img src="" class="change_img2" style="display:none"/>'+
                 '</div>'+
            '</div>'+
        '</div>'+
        '<p class="deploy_btn">'+
            '<input type="submit" name="submit" class="btn1" value="确定修改" onclick="getEmptycarsVal1(1,\'insert_data\'),zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
            '<input type="button" name="button" class="btn2" value="取消" onclick="zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
            '<input type="button" name="button" class="btn2" value="解除" onclick="removeDataMarker(),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
        '</p>'+
    '</div>'
    $('body').append(content);
}
//危险品添加框
function emptyDangerousCar_information(){
    var manNum=max[17]+1;
    var content='';
    $(".zhao").css("display","block");
    content+='<div class="node_kuang" style="height:219px;">'+
        '<p class="tj_title"><span>添加危险品车辆信息</span>'+
            '<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
        '</P>'+
        '<div class="mennu_content">'+
            '<div id="jd_menu">'+
                '<ul class="menu_ul">'+
                    '<li><span>车辆编号</span><input type="text" id="prowlNumber" name="" value="'+manNum+'"/></li>'+
                    '<li><span>管理部门</span><input type="text" id="prowlDepartment" name="" value=""/></li>'+
                    '<li><span>车辆类型</span><input type="text" id="carType" name="" readonly="readonly" value="危险品车"/></li>'+
                    '<li><span>车牌号码</span><input type="text" id="plateNumber" name="" value=""/></li>'+
                    '<li><span>服务时间</span><input type="text" id="onDuty" name="" value=""/></li>'+
                    '<li><span>车辆状态</span>'+
                        '<select class="select2" id="cars_type">'+
                            '<option>0-未激活</option>'+
                            '<option>1-激活</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
            '</div>'+
            '<div class="tu" >'+
                '<div class="imgnum">'+
                  '<input type="file" class="filepath" onchange="changeImgs(this)"/>'+
                  '<img src="images/car.jpg" class="original_img1" />'+
                  '<img src="" class="change_img2" style="display:none"/>'+
                 '</div>'+
            '</div>'+
        '</div>'+
        '<p class="deploy_btn">'+
            '<input type="submit" name="submit" class="btn1" value="确定修改" onclick="getEmptycarsVal1(4,\'insert_data\',\'tab\'),zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
            '<input type="button" name="button" class="btn2" value="取消" onclick="zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
            '<input type="button" name="button" class="btn2" value="解除" onclick="removeDataMarker(),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
        '</p>'+
    '</div>'
    $('body').append(content);
}

function getEmptycarsVal(num,insert_data,tab){//公交，其他
    var CarsNumber=$("#carsNumber").val();
    var Department=$("#department").val();
    var CarType=$("#carType").val();
    var PlateNumber=$("#plateNumber").val();
    var OnDuty=$("#onDuty").val();
    var Firstleval=$("#firstleval option").index($('#firstleval option:selected'));
    var Cars_type=$("#cars_type option").index($('#cars_type option:selected'));
    var _time=OnDuty.split("-");
    policeVal=CarsNumber+";"+"'"+Department+"'"+";"+"'"+num+"'"+";"+"'"+PlateNumber+"'"+";"+"'"+_time[0]+"'"+";"+"'"+_time[1]+"'"+";"+"'"+Firstleval+"'"+";"+Cars_type+";0;"+pos.lon+" "+pos.lat;
    //insertPolice(policeVal,50);
    if(insert_data){
        insertPolice(policeVal,340,CarsNumber);
        max[15]++;
        changState();
    }else if(insert_data && tab){
    	changState();
        insertPolice(policeVal,340,CarsNumber);
        max[16]++;
    }else{
        insertPolice(policeVal,340);
    }
}
function changState(){
	var _state = TL_MarkerMap[getCurMarkerid()];
        _state.state=1;
}
//公交优先添加框
function emptyBus_information(){
    var manNum=max[15]+1;
    var content='';
    $(".zhao").css("display","block");
    content+='<div class="node_kuang" style="height:242px;">'+
        '<p class="tj_title"><span>添加公交优先信息</span>'+
            '<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
        '</P>'+
        '<div class="mennu_content">'+
            '<div id="jd_menu">'+
                '<ul class="menu_ul">'+
                    '<li><span>车辆编号</span><input type="text" id="carsNumber" name="" value="'+manNum+'"/></li>'+
                    '<li><span>管理部门</span><input type="text" id="department" name="" value=""/></li>'+
                    '<li><span>车辆类型</span><input type="text" id="carType" name="" readonly="readonly" value="公交车"/></li>'+
                    '<li><span>车牌号码</span><input type="text" id="plateNumber" name="" value=""/></li>'+
                    '<li><span>服务时间</span><input type="text" id="onDuty" name="" value=""/></li>'+
                    '<li><span>优先等级</span>'+
                        '<select class="select2" id="firstleval">'+
                            '<option>1级</option>'+
                            '<option>2级</option>'+
                            '<option>3级</option>'+
                        '</select>'+
                    '</li>'+
                    '<li><span>车辆状态</span>'+
                        '<select class="select2" id="cars_type">'+
                            '<option>0-未激活</option>'+
                            '<option>1-激活</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
            '</div>'+
            '<div class="tu" >'+
                '<div class="imgnum">'+
                  '<input type="file" class="filepath" onchange="changeImgs(this)"/>'+
                  '<img src="images/car.jpg" class="original_img1" />'+
                  '<img src="" class="change_img2" style="display:none"/>'+
                 '</div>'+
            '</div>'+
        '</div>'+
        '<p class="deploy_btn">'+
            '<input type="submit" name="submit" class="btn1" value="确定修改" onclick="getEmptycarsVal(2,\'insert_data\'),zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
            '<input type="button" name="button" class="btn2" value="取消" onclick="zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
            '<input type="button" name="button" class="btn2" value="解除" onclick="removeDataMarker(),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
        '</p>'+
    '</div>';
    $('body').append(content);
}
//其他优先添加框
function emptyOther_information(){
    var manNum=max[16]+1;
    var content='';
    $(".zhao").css("display","block");
    content+='<div class="node_kuang" style="height:242px;">'+
        '<p class="tj_title"><span>添加其他优先信息</span>'+
            '<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
        '</P>'+
        '<div class="mennu_content">'+
            '<div id="jd_menu">'+
                '<ul class="menu_ul">'+
                    '<li><span>车辆编号</span><input type="text" id="carsNumber" name="" value="'+manNum+'"/></li>'+
                    '<li><span>管理部门</span><input type="text" id="department" name="" value=""/></li>'+
                    '<li><span>车辆类型</span><input type="text" id="carType" name="" readonly="readonly" value="消防车"/></li>'+
                    '<li><span>车牌号码</span><input type="text" id="plateNumber" name="" value=""/></li>'+
                    '<li><span>服务时间</span><input type="text" id="onDuty" name="" value=""/></li>'+
                    '<li><span>优先等级</span>'+
                        '<select class="select2" id="firstleval">'+
                            '<option>1级</option>'+
                            '<option>2级</option>'+
                            '<option>3级</option>'+
                        '</select>'+
                    '</li>'+
                    '<li><span>车辆状态</span>'+
                        '<select class="select2" id="cars_type">'+
                            '<option>0-未激活</option>'+
                            '<option>1-激活</option>'+
                        '</select>'+
                    '</li>'+
                '</ul>'+
            '</div>'+
            '<div class="tu" >'+
                '<div class="imgnum">'+
                  '<input type="file" class="filepath" onchange="changeImgs(this)"/>'+
                  '<img src="images/car.jpg" class="original_img1" />'+
                  '<img src="" class="change_img2" style="display:none"/>'+
                 '</div>'+
            '</div>'+
        '</div>'+
        '<p class="deploy_btn">'+
            '<input type="submit" name="submit" class="btn1" value="确定修改" onclick="getEmptycarsVal(3,\'insert_data\',\'tab\'),zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
            '<input type="button" name="button" class="btn2" value="取消" onclick="zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
            '<input type="button" name="button" class="btn2" value="解除" onclick="removeDataMarker(),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
        '</p>'+
    '</div>'
    $('body').append(content);
}
function getEmptyMaterialVal(insert_data){//物资
    var MaterialNumber=$("#materialNumber").val();
    var MaterialType=$("#materialType").val();
    var MaterialNum=$("#materialNum").val();
    var MaterialTime=$("#materialTime").val();
    var _Lon=$("#Lon").val();
    var _Lat=$("#Lat").val();
    var Place=$("#place").val();
    //var _time=OnDuty.split("-");
    policeVal=MaterialNumber+";"+"'"+MaterialType+"'"+";"+"'"+Place+"'"+";"+"'"+MaterialNum+"'"+";"+"'"+MaterialTime+"'"+";0;"+_Lon+" "+_Lat;
    //insertPolice(policeVal,40);
    if(insert_data){
        insertPolice(policeVal,330,MaterialNumber);
        changState();
    }else{
        insertPolice(policeVal,330);
    }
    Materialmax++;
}
//添加物资
function emptyMaterial(){
    var manNum=max[18]+1;
    var gmarker=this;
    var content='';
    $(".zhao").css("display","block");
    content+='<div class="node_kuang" style="height:245px">'+
        '<p class="tj_title">物资存放信息'+
            '<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.node_kuang\')"/>'+
        '</P>'+
        '<div class="mennu_content">'+
            '<div id="jd_menu">'+
                '<ul class="menu_ul">'+
                   ' <li><span>物资编号</span><input type="text" id="materialNumber" readonly="readonly" name="" value="'+manNum+'"/></li>'+
                    '<li><span>物资类型</span><input type="text" id="materialType" name="" value=""/></li>'+
                    '<li><span>物资数量</span><input type="text" id="materialNum" name="" value=""/></li>'+
                    '<li><span>存放时间</span><input type="text" id="materialTime" readonly="readonly" name="" value="" onClick="jeDate({dateCell:\'#materialTime\',isTime:true,format:\'YYYY-MM-DD hh:mm:ss\'})"/></li>'+
                    '<li><span>经度坐标</span><input type="text" readonly="readonly" id="Lon" name="" value="'+pos.lon+'"/></li>'+
                    '<li><span>纬度坐标</span><input type="text" readonly="readonly" id="Lat" name="" value="'+pos.lat+'"/></li>'+
                    '<li><span>存放地点</span><input type="text" id="place" name="" value=""/></li>'+
                '</ul>'+
            '</div>'+
            '<div class="tu" >'+
                '<div class="imgnum">'+
                  '<input type="file" class="filepath" onchange="changeImgs(this)"/>'+
                  '<img src="images/man.jpg" class="original_img1" />'+
                  '<img src="" class="change_img2" style="display:none"/>'+
                 '</div>'+
            '</div>'+
        '</div>'+
        '<p class="deploy_btn">'+
            '<input type="submit" name="submit" class="btn1" value="确定添加" onclick="getEmptyMaterialVal(\'insert_data\'),zhao_none(\'.zhao\',\'.node_kuang\');">'+
            '<input type="button" name="button" class="btn2" value="取消" onclick="zhao_none(\'.zhao\',\'.node_kuang\')">'+
            '<input type="button" name="button" class="btn2" value="解除" onclick="removeDataMarker(),zhao_none(\'.zhao_left\',\'.node_kuang\')">'+
        '</p>'+
        '</div>';
        $('body').append(content);
}
//footer下无数据时弹出框
function emptyAlert(){
  var nr='';
  nr+='<div class="pop_bg">'+
  '<div class="pop_up">'+
    '<p class="pop_p1"><span>无数据,请进行添加</span></p>'+
    '<p class="pop_p2"><input type="button" value="确定" onclick="zhao_none(\'.zhao\',\'.pop_bg\')"></p>'+
  '</div>'+
'</div>';
$('body').append(nr);
}


//路网
function queryNetFeature(){
            $.ajax({
                url:"GetRoadNet",
                dataType:"json",
                data:{ "action":"query","type":"30"},
                contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
                beforeSend:function(){ 
                    //$(".zhao,#loading").css("display","block");
                 },
                success: function( data, textStatus, jqXHR ){
                    doRoadNetFeature( data );
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
     if( data ){
        var vol;
        var line,lineVector;
        var features = [];
        for( var i=0;i<data.entitys.length;i++ ){
            var points=[];
            vol = data.entitys[i];
            for ( var j=0;j<data.entitys[i].length;j+=2 ){
                points.push(new SuperMap.Geometry.Point(vol[j],vol[j+1]));
            }
            line = new SuperMap.Geometry.LineString(points);
            lineVector = new SuperMap.Feature.Vector(line);
            if(i%9==0){
                lineVector.style={
                    strokeColor:"red",
                    fill:false,
                    strokeWidth:1
                }
            }
            features.push(lineVector);
        }
        vector.addFeatures(features);
    }
}  
          
function deletePoint(num){
    var gmarkerId=gmarker.id;
    if(gmarkerId.indexOf("Map")>-1){

    }else{
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
/********************************************/
var m_dataNum=0;//图片编号
var m_flagAttr=0; // 查看概要属性和详细属性
var m_roadNum=2;
// 左键点击查属性
function markerAttrClick(cur){
    var ind,id,val;
    id=cur.substring(cur.indexOf("_")+1,cur.length);
    ind=parseInt(cur.substring(0,cur.indexOf("_")));
    var va
    va=getDataType(ind,1);
    va=va.split(",");
    
    val="{ID:"+id+"}";
    m_flagAttr=1;
    var dt=DT(ind);
    ajax_Marker(va[0],'query',va[1],2,ind,val,dt);
}
function addMarker2Map( arg ){
    var lonlat,size,offset,id,markerlayer;
    markerlayer=supermap.getLayersByName("markerLayer"+m_dataNum);
    lonlat = getLonlatFromMap(arg);
    size = new SuperMap.Size(20,22);
    offset = new SuperMap.Pixel(-(size.w/2), -size.h);
//  id=m_dataNum+"_"+getMaxMarkerid(m_dataNum);
	id=m_dataNum+"_"+(max[m_dataNum]+1);
    if( m_dataNum>=5 && m_dataNum<=12){
        markerCreate(markerlayer[0],lonlat,size,offset,id,'./theme/images/'+m_dataNum+'.0.png',2);
    }else if(m_dataNum==13){
        markerCreate(markerlayer[0],lonlat,size,offset,id,'./images/float/liang/4.png',2);
    }else if(m_dataNum==14){
        markerCreate(markerlayer[0],lonlat,size,offset,id,'./images/float/liang/1.png',2);
    }else if(m_dataNum==15){
        markerCreate(markerlayer[0],lonlat,size,offset,id,'./images/float/liang/2.png',2);
    }else if(m_dataNum==16){
        markerCreate(markerlayer[0],lonlat,size,offset,id,'./images/float/liang/3.png',2);
    }else if(m_dataNum==17){
        markerCreate(markerlayer[0],lonlat,size,offset,id,'./images/float/liang/5.png',2);
    }else if(m_dataNum==18){
        markerCreate(markerlayer[0],lonlat,size,offset,id,'./images/float/liang/2.png',2);
    }
    $("#sign"+m_dataNum).attr("src","images/mark_hui0.png");
    m_dataNum=0;
}

function createLayer( ind )
{
    var markerlayer;
    markerlayer=new SuperMap.Layer.Markers("markerLayer"+ind);
    
    markerlayer.setVisibility(false);
    supermap.addLayer(markerlayer);

}
function getLeftCheck( ind,strName )
{
    var strCheck='<li>'+
    '<label for="ipt'+ind+'" ><input type="checkbox" name="check'+ind+'" onclick="onCheckLeftClick('+ind+')" id="ipt'+ind+'"/>'+strName+'</label>'+
    '<img src="images/mark_hui0.png" class="sign" id="sign'+ind+'"  onclick="newPoint('+ind+')"/>'+
    '</li>';
    return strCheck;
}
function listLeftClick(url,action,type,menutype,dataNum,val,DT)
{   
    if( (dataNum >=5 && getAllMarkerid(dataNum).length<1)){ // 请求数据
        ajax_Marker(url,action,type,menutype,dataNum,'',DT);
    }
}
//marker   ajax
function ajax_Marker(url,action,type,menutype,dataNum,val,DT){
    var queryType;
    queryType=type.substr(type.length-1,1);
    var divMap=$("#map");
    $.ajax({
        url:url,
        dataType:"json",
        data:{ "action":action,"type":type,"val":val,"DT":DT},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
            var layer=supermap.getLayersByName("markerLayer"+dataNum)[0];
            
            if(action =="query" && queryType=="0"){ // 处理坐标
                forMarkersFeature(layer,menutype,dataNum,data);
                for( var item in data.entitys ){
            	    if(max[dataNum]==undefined){
            		  max[dataNum] = 0;
            	    }
                    if(max[dataNum] < data.entitys[item][0]){
                        max[dataNum]=parseInt(data.entitys[item][0]);
                    }
            	}
            }else if(action =="query" && queryType=="1"){ // 处理属性
                forMarkersAttribute(dataNum,data);
            }else if(action =="insert"||action =="update"){

            }
            
        },
        error:function(){}
    });
}
function forMarkersFeature(layer,menutype,dataNum,data){
    var lonlat,size,offset,id,path;
    if(dataNum>=5&&dataNum<13){
        path='./theme/images/'+dataNum+'.0.png';
    }else if(dataNum==13){
        path='./images/float/liang/4.png';
    }else if(dataNum==14){
        path='./images/float/liang/1.png';
    }else if(dataNum==15){
        path='./images/float/liang/2.png';
    }else if(dataNum==16){
        path='./images/float/liang/3.png';
    }else if(dataNum==17){
        path='./images/float/liang/5.png';
    }else if(dataNum==18){
        path='./images/float/liang/2.png';
    }
    for( var item in data.entitys ){
    	lonlat = data.entitys[item][data.entitys[item].length-1].replace(" ",",");
        lonlat = SuperMap.LonLat.fromString(lonlat);
        if(dataNum>=5&&dataNum<13){
            lonlat.transform("EPSG:4326","EPSG:900913");
            size = new SuperMap.Size(20,22);
        }else{
            size = new SuperMap.Size(30,32);
        }
        offset = new SuperMap.Pixel(-(size.w/2), -size.h);
        id=dataNum+"_"+data.entitys[item][0];
        //max[dataNum][0]++;
        markerCreate(layer,lonlat,size,offset,id,path,1);
    } 
      
}

function newPoint( dataNum )
{
    $("#sign"+dataNum).attr("src","images/mark_red1.png");
    m_dataNum = dataNum;
}
function onCheckLeftClick( ind )
{
    var va,markerlayer;
    va=getDataType(ind,0);
    va=va.split(",");
    markerlayer=supermap.getLayersByName("markerLayer"+ind);
    
    var ele='#sign'+ind;
    var ele1='#ipt'+ind;
    var ele2='footer .f_li'+(ind-4);
    var dt=DT(ind);
    if($(ele1).prop("checked")==true){
        $(ele).css("display","block");
        $(ele1).parent("label").css("color","red");
        markerlayer[0].setVisibility(true);
        listLeftClick(va[0],'query',va[1],2,ind,'',dt);
    }else{
        $(ele).css("display","none");
        $(ele1).parent("label").css("color","black");
        markerlayer[0].setVisibility(false);
        markerNormalize(ind);
    }
}
function getDataType(ind,type)
{
    var url="GetDevice",queryType=10;
    if( ind>=5 && ind<=12){
        url="GetDevice";
        queryType=(ind+1)*10+type;
    }else if(ind==13){
        url="GetDevice";
        queryType=(33)*10+type;
    }else if(ind>13&&ind<18){
        url="GetDevice";
        queryType=(34)*10+type;
    }else if(ind==18){
        url="GetDevice";
        queryType=(32)*10+type;
    }
    
    return url+","+queryType;
}
function createCheck(){//创建左侧列表的check选项
    var module = '';
    var strName=['信号控制','路段车检','路口车检','旅行时间','天气观测','诱导显示','视频监控','排放检测','人员管理'
    ,'巡逻车辆','公交优先','其他优先','危险品车辆','物资管理'];
    for(var i=0;i<strName.length;i++){
        createLayer(i+5);
        module+=getLeftCheck(i+5,strName[i]);
        if( i==7 ){
            $(".module1").append(module);
            module = '';
        }else  if( i==8 ){
            $(".module2").append(module);
            module = '';
        }else  if( i==12 ){
            $(".module3").append(module);
            module = '';
        }else  if( i==13 ){
            $(".module4").append(module);
            module = '';
        }
    }
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
    var dt=DT(ind);
    ajax_Marker(va[0],'query',va[1],2,ind,val,dt);
}
function DT(ind){//车辆类型
    var DT='';
    if(ind==14){
        DT=1;
    }else if(ind==15){
        DT=2;
    }else if(ind==16){
        DT=3;
    }else if(ind==17){
        DT=4;
    }else{
        DT='';
    }
    return DT;
}
function forMarkersAttribute(ind,data)
{
    if( m_flagAttr==1 ){
        generalAttr(ind,data);
    }
    else if( m_flagAttr==2 )
        detailAttr(ind,data.entitys);
}
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
        da=['人员编号',0,'管理部门',1,'人员姓名',2,'管理片区',3];
    else if( ind==14 )
        da=['车辆编号',0,'管理部门',1,'车辆类型',2,'车牌号码',3];
    else if( ind==15 )
        da=['车辆编号',0,'管理部门',1,'车辆类型',2,'车牌号码',3];
    else if( ind==16 )
        da=['车辆编号',0,'管理部门',1,'车辆类型',2,'车牌号码',3];
    else if( ind==17 )
        da=['车辆编号',0,'管理部门',1,'车辆类型',2,'车牌号码',3];
    else if( ind==18 )
        da=['物资编号',0,'物资类型',1,'物资数量',2,'存放时间',3];
    
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
}
function detailAttr(ind,data)
{
    if( data.length==0 ){
        for( var i=0;i<15;i++)
            data.push('');
        
        //data[0]=getMaxMarkerid(ind);
        var cur=getCurMarkerid();
        data[0]=cur.substring(cur.indexOf("_")+1,cur.length);
    }
    
    var layer;
    if( ind==5 ){
        // setBackgroundNet(m_roadNum,data[18],true,18);
        createCommonDialog(["信号控制机管理信息","信号控制机属性"],ind,['设备编号',0,'设备位置',1,'主街名称',2,'次街名称',3,'经度坐标',-1,'纬度坐标',-1,'设备位置',1,'产品型号',5,'控制机型',6,'主要相位',7,'伴随相位',8,'主街相位',9,'次街相位',10,'检测器类',11,'控制模式',12,'优先控制',13,'通讯类型',14],
            [0,7,8],{2:{li:[7,8,9,11,12,13],co:[['定时控制','感应控制','中心控制'],['1','2','3','4','5','6','7','8'],['A','B','C','D','E','F','G','H'],['0-无检测器','1-视频检测','2-雷达检测','3-地磁检测','4-线圈检测','5-电子警察数据'],['0-单点定时','1-感应控制','2-干道协调','3-区域协调'],['0-无优先','1-公交优先','2-VIP优先']]}},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','img');
    }
    else if( ind==6 ){
        createCommonDialog(["路段车检器管理信息","路段车检器属性"],ind,['车检器号',0,'经度坐标',-1,'纬度坐标',-1,'设备类型',2,'数据类型',1,'检测能力',3],
                [0,4,5],{},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','img');
    }
    else if( ind==7 ){
         createCommonDialog(["路口车检器管理信息","路口车检器属性"],ind,['车检器号',0,'路口编号',1,'路口名称',2,'进口路段',4,'出口路段',5,'经度坐标',-1,'纬度坐标',-1,'设备类型',3,'供电类型',3,'通信连接',3],
                [0,6,7],{},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','img');
    }
    else if( ind==8 ){
        createCommonDialog(["旅行时间设备管理信息","旅行时间设备属性"],ind,['设备编号',0,'设备位置',1,'经度坐标',-1,'纬度坐标',-1,'设备类型',2,'供电类型',3,'通信连接',2],//3是路段编号
                [0,4,5],{},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','img');
    }
    else if( ind==9 ){
        createCommonDialog(["气象观测站管理信息","气象观测站属性"],ind,['气象站号',0,'路段编号',1,'路段名称',3,'设备厂家',4,'经度坐标',-1,'纬度坐标',-1,'设备类型',5,'供电类型',4,'通信连接',4],
            [0,5,6],{},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','img');
    }
    else if( ind==10 ){
        createCommonDialog(["诱导显示屏管理信息","诱导显示屏属性"],ind,['显示屏号',0,'路段编号',1,'路段名称',2,'设备厂家',3,'经度坐标',-1,'纬度坐标',-1,'设备类型',4,'供电类型',4,'通信连接',4],
            [0,5,6],{},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','img');
    }
    else if( ind==11 ){
        // setBackgroundNet(m_roadNum,data[4],true,18);
        createCommonDialog(["视频摄像机属性","视频摄像机属性"],ind,['设备编号',0,'位置名称',1,'生产厂家',2,'设备类型',3,'路段编号',4,'经度坐标',-1,'纬度坐标',-1],
            [0,5,6],{},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','img');
    }
    else if( ind==12 ){
        // setBackgroundNet(m_roadNum,data[3],true);
        createCommonDialog(["环境观测站属性"],ind,['设备编号',0,'路段名称',2,'路段编号',3,'生产厂家',4,'设备类型',5,'经度坐标',-1,'纬度坐标',-1],
            [0,2],{},['确认','onOKProperty2('+ind+')','取消','onCancelProperty2()','解除','removeDataMarker()'],data,'body','','','general');
    }else if(ind==13){
        policeMan_setup(data);
    }else if(ind==14){
        ProwlCar_setup(data);
    }else if(ind==15){
        Bus_setup(data);
    }else if(ind==16){
        Others_setup(data);
    }else if(ind==17){
        DangerousCars_setup(data);
    }else if(ind==18){
        Materials_setup(data);
    }
}
function removeDataMarker(){
    var ma=getCurMarker();
    var datatype=ma.id.substring(0,ma.id.indexOf("_")); 
    // var layer=supermap.getLayersByName("markerLayer2")[0];
    // layer.setVisibility(false);
    // supermap.setCenter(getCurMarkerLonlat(),14);
    if( ma.state==1 ){
        deleteDeviceMarker();
    }else if( ma.state==2 ){
        removeFeature(datatype,ma);
    }
    zhao_none('.zhao_left','.jd_nodes');
    // layer.redraw();
}
function markerRightClick(ma)
        {
            // var p,l,t;
            // var datatype=ma.id.substring(0,ma.id.indexOf("_")); 
            // p= supermap.getPixelFromLonLat(ma.lonlat);
            // l=p.x+"px";
            // t=p.y+"px";
            pos=ma.lonlat;
            getMarkerAttr();
            // if( datatype==5 ){
            //     deviceRightClick("#signal_light",ma,l,t);
            // }else if( datatype==6 ){
            //     deviceRightClick("#roads_traffic",ma,l,t);
            // }else if( datatype==7 ){
            //     deviceRightClick("#signal_traffic",ma,l,t);
            // }else if( datatype==8 ){
            //     deviceRightClick("#trip_time",ma,l,t);
            // }else if( datatype==9 ){
            //     deviceRightClick("#weather_forecast",ma,l,t);
            // }else if( datatype==10 ){
            //     deviceRightClick("#lead_show",ma,l,t);
            // }else if( datatype==11 ){
            //     deviceRightClick("#monitor",ma,l,t);
            // }
            // else if( datatype==12 ){
            //     deviceRightClick("#blowoff_station",ma,l,t);
            // }else if( datatype==13 ){
            //     deviceRightClick("#policeMan",ma,l,t);
            //     pos=ma.lonlat;
            // }else if( datatype==14 ){
            //     deviceRightClick("#ProwlCar",ma,l,t);
            //     pos=ma.lonlat;
            // }else if( datatype==15 ){
            //     deviceRightClick("#Bus",ma,l,t);
            //     pos=ma.lonlat;
            // }else if( datatype==16 ){
            //     deviceRightClick("#Others",ma,l,t);
            //     pos=ma.lonlat;
            // }else if( datatype==17 ){
            //     deviceRightClick("#DangerousCars",ma,l,t);
            //     pos=ma.lonlat;
            // }else if( datatype==18 ){
            //     deviceRightClick("#Materials",ma,l,t);
            //     pos=ma.lonlat;
            // }
        }
        //  function deviceRightClick(ob,s,l,t)
        // {
        //     if( s.state==1 ){
        //         $(".jt_node").css("visibility","hidden");
        //         $(ob).css({"visibility":"visible","left":l,"top":t});
        //         $(".look").css("display","block");
        //         $(".addlook").css("display","none");
        //     }else if( s.state==2 ){
        //         $(".jt_node").css("visibility","hidden");
        //         $(ob).css({"visibility":"visible","left":l,"top":t});
        //         $(".look").css("display","none");
        //         $(".addlook").css("display","block");

        //         $(".removeAddlook").click(function(){
        //             var datatype=s.id.substring(0,s.id.indexOf("_")); 
        //             removeFeature(datatype,s);
        //         })
        //     }
        // }
function getDataAttr(){
    var data=[];
    var arr=$('.node_ul').children();
    for( var i=0;i<arr.length;i++ ){
        // var ss=$('#attr'+i)[0].tagName;
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
        data[4]=dataIn[2];
        data[5]=dataIn[3];
        setLeftData(ind,data);
    }else if(ind==12){
        var data = $(".jd_nodes_btn").attr("data");
        data = data.split(",");
        var dataIn=getDataAttr();
        dataIn[7]=data[1];
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
    // setBackgroundNet(m_roadNum,str,false,14);
    //$(".zhao_left").css("display","none");
    zhao_none('.zhao_left','.jd_nodes');
}

function onCancelProperty2()
{
    var i,str,spans=$(".node_ul span");
    for( i=0;i<spans.length;i++ )
        if( spans[i].innerText=="路段编号" || spans[i].innerText=="路口编号"|| spans[i].innerText=="区域编号" )
            break;
    
    str=$('#attr'+i).val();
    
    // setBackgroundNet(m_roadNum,str,false,14);
    
    //$(".zhao_left").css("display","none");
    zhao_none('.zhao_left','.jd_nodes');
}

function setBackgroundNet(datanum,id,show,level)
{
    var layer=supermap.getLayersByName("markerLayer"+datanum)[0];
    // var divMap=$("#map");
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
    var item;
    if(id!=undefined){
        var ids=id.split(',');
        for( var i=0;i<ids.length;i++ ){
            if( (item=getFeature(datanum,ids[i]))!=undefined ){
                if( show ){
                    setLineProperty(item,5,0,0,0);
                }else{
                    setLineProperty(item,5,1,0,0);
                }
            }
        }
    }
    layer.redraw();
}
//设备里的图表部分
//function ajax_MarkerDatas(ind,choice_name){
//var va,id,ind,cur,val;
//cur=getCurMarkerid();
//id=cur.substring(cur.indexOf("_")+1,cur.length);
//ind=parseInt(cur.substring(0,cur.indexOf("_")));
//va=getDataType(ind,1);
//va=va.split(",");
//val="{ID:"+id+"}";
//$.ajax({
//   url:va[0],
//       dataType:"json",
//       data:{"action":"query","type":va[1],"val":val},
//       contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
//       beforeSend:function(){  },
//       success: function( data, textStatus, jqXHR ){
//          //name(data);
//          chartsDetailAttr(ind,data,choice_name);
//       },
//       error:function(){}
//})
//}

function createChartsDialog( title,ind,fields,data,parent ){
  var content='';
  content+='<div class="content_kuang">'+
        '<div class="z_title">'+
            '<p class="title_left">'+title[0]+'</p>'+
            '<p class="title_right">'+title[1]+'<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.content_kuang\')"></p>'+
        '</div>'+
        '<div class="content">'+
            '<div class="content_left">'+
                '<div id="carFlow"></div>'+ 
            '</div>'+
            '<div class="content_right">'+
                '<ul class="cRight_u1"></ul>'+
                '<ul class="cRight_u2"></ul>'+
            '</div>'+
        '</div>'+
    '</div>'
    $('body').append(content);
  setChartsDialogContext(fields,data,parent);
}
function chartsDetailAttr(ind,data,choice_name)
{
    if( data.length==0 ){
        for( var i=0;i<15;i++ )
            data.push('');
            //data[0]=getMaxMarkerid(ind);
        var cur=getCurMarkerid();
        data[0]=cur.substring(cur.indexOf("_")+1,cur.length);
    }
    
    if( ind == 6 ){
        createChartsDialog(["车检器交通流量统计","路段车检器属性"],ind,['车检器号',0,'路段编号',3,'路段名称',1,'经度坐标',-1,'纬度坐标',-1,'设备类型',2],
                data,'.cRight_u1,.cRight_u2');
        $(".cRight_u1 li,.cRight_u2 li").css("line-height","20px");
        // RoadDirection();
        RoadDirectionAjax(data.entitys[0]);
    }else if( ind == 7){
        if(choice_name == "路口"){
            createChartsDialog(["路口转向数据统计","路口车检器属性"],ind,['设备编号',0,'路口编号',1,'路口名称',2,'进口方向',4,'出口方向',5,'经度坐标',-1,'纬度坐标',-1,'设备类型',3],
                    data,'.cRight_u1');
            $(".cRight_u1").addClass("ul_all").removeClass("cRight_u1");
            $(".cRight_u2").remove();
            $("#carFlow").attr("id","crossTurn");
            CrossTurnChartsData();
        }else if(choice_name == "出口"){
            createChartsDialog(["出口车流量数据统计","路口车检器属性"],ind,['设备编号',0,'路口编号',1,'路口名称',2,'进口方向',4,'出口方向',5,'经度坐标',-1,'纬度坐标',-1,'设备类型',3],
                    data,'.cRight_u1');
            $(".cRight_u1").addClass("ul_all").removeClass("cRight_u1");
            $(".cRight_u2").remove();
            $("#carFlow").attr("id","crossOut");
            CrossOutChartsData();
        }
    }else if(ind == 8){
        createChartsDialog(["旅行时间样本量统计","旅行时间设备属性"],ind,['设备编号',0,'位置名称',1,'经度坐标',-1,'纬度坐标',-1,'设备类型',2],
                data,'.cRight_u1');
        $(".cRight_u1").addClass("ul_all").removeClass("cRight_u1");
        $(".cRight_u2").remove();
        $("#carFlow").attr("id","tripTime");
        TripCharts();
    }else if(ind == 9){
        var nr='';
        createChartsDialog(["气象观测数据统计","气象观测站属性"],ind,['气象站号',0,'站点名称',2,'站点桩号',3,'路段编号',1,'经度坐标',-1,'纬度坐标',-1,'设备厂家',4,'设备类型',5],
                data,'.cRight_u1');
        $(".cRight_u1").addClass("ul_all").removeClass("cRight_u1");
        $(".cRight_u2").remove();
        nr+='<div class="weatherchartData_show" id="weatherData_show"></div>'+
            '<div class="weatherBar">'+
                 '<div class="weatherStatus_frame">'+
                     '<p class="weatherStatus_bar"></p><span class="span_describ">天气状况</span>'+
                 '</div>'+
                 '<div class="seeing_frame">'+
                     '<p class="seeing_bar"></p><span class="span_describ">能见度</span>'+
                 '</div>'+
                 '<div class="roadStatus_frame">'+
                     '<p class="roadStatus_bar"></p><span class="span_describ">路面状况</span>'+
                 '</div>'+
            '</div>';
        $("#carFlow").remove();
        $(".content_kuang").addClass("environment_Data_statistics");
        $(".ul_all").css("height","470px");
        $(".content_left").addClass("chart").append(nr);
        thermography_Data();
    }else if(ind == 10){
        var nr='',content='';
        createChartsDialog(["诱导显示内容","诱导显示屏属性"],ind,['显示屏编号',0,'路段编号',1,'路段名称',2,'设备厂家',3,'经度坐标',-1,'纬度坐标',-1,'设备类型',4],
                data,'.cRight_u1');
        $(".cRight_u1").addClass("ul_all").removeClass("cRight_u1");
        $(".cRight_u2").remove();
        $("#carFlow").remove();
        content+='<textarea id="leadContent" readonly="readonly">前方道路应急施工，旅行时间15分钟，建议绕行西昌路</textarea>';
        $(".content_left").append(content);
        nr+='<p class="bt_frame">'+
                '<input type="button" value="编辑" class="bt1"/>'+
                '<input type="submit" value="推送" class="bt2" onclick="zhao_none(\'.zhao\',\'.content_kuang\')"/>'+
                '<input type="button" value="取消" class="btn_3" onclick="zhao_none(\'.zhao\',\'.content_kuang\')"/>'+
            '</p>';
        $(".ul_all").append(nr);
        $(".bt1").click(function(){
            $("#leadContent").attr("readonly",false);
        })
    }else if(ind == 11){
        var nr='';
        createChartsDialog(["实时摄像机图像","视频摄像机属性"],ind,['摄像机编号',0,'位置名称',1,'设备厂家',2,'经度坐标',-1,'纬度坐标',-1,'设备类型',3],
                data,'.cRight_u1');
        $(".cRight_u1").addClass("ul_all").removeClass("cRight_u1");
        $(".cRight_u2").remove();
        nr+='<div id="camera"><img src="images/view.jpg"></div>';
        $("#carFlow").remove();
        $(".content_left").append(nr);
    }
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
function removeFeature(ind,feaObj) {//删除点的功能 
    var markerlayer=supermap.getLayersByName("markerLayer"+ind);
    markerlayer[0].removeMarker(feaObj);
    TL_Old.pop();
}
//删除设备ajax
function deleteDeviceMarker() {
	var type, id;
	var marker = getCurMarkerid().split("_");
	type = parseInt(marker[0]) + 1;
	id = "device_id";

    var ma=getCurMarker();
    var datatype=ma.id.substring(0,ma.id.indexOf("_"));
    var markerlayer=supermap.getLayersByName("markerLayer"+datatype);
    markerlayer[0].removeMarker(ma);
	if(type > 13) {
		type += 18;
		if(type<35){
			id = "id";
		}
	}
	type = type + "0";
	$.ajax({
		url: "GetDevice",
		dataType: "json",
		data: {
			"action": "delete",
			"type": type,
			"val": id + "," + marker[1]
		},
		contentType: "contentType:application/x-www-form-urlencoded; charset=UTF-8",
		beforeSend: function() {},
		success: function(data, textStatus, jqXHR) {
			var obj = "删除成功！";
			reviseAlert(obj);
		},
		error: function() {

		}
	})
	removeFeature(getCurMarkerid().split("_")[0],getCurMarker());
	zhao_none('.zhao,.jd_nodes');
}