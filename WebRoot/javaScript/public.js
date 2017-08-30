//仿真结果状态Ajax
var simulat_num,indexTime,simulat_start_time;
function simulat_type(){
	$.ajax({
        url:"GetFastSim",
        dataType:"json",
        data:{ "action":"query","type":"10","pa":simulat_num},
        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
        beforeSend:function(){  },
        success: function( data, textStatus, jqXHR ){
        	if(data.entitys[0] == 1){
        		indexTime = simulat_start_time; //开始时间  /结束时间data.entitys[1]
        		//仿真完成
        		$("#enlarge span").text("仿真完成").addClass("simulatResult").removeClass("load");
        	}else{
        		simulat_timeout(simulat_type,window);
        	}
        },
        error:function(){}
    });
}
function simulat_timeout(method,context){
	clearTimeout(method.time);
	method.time = setTimeout(function(){
		method.call(context);
	},5000)
}
//仿真结果展示
$("body").delegate(".simulatResult","click",function(){
	$("#iframepage").attr("src","index.html");
	$("#logo_choice li").each(function(b){
        $(this).children("img").attr("src","images/logo/white/"+b+".png");
        $(this).children("p").css("color","#fff");
    });
	$(".status p").css("color","red");
	$(".status img").attr("src","images/logo/red/1.png");
	$('.gong_ju').removeAttr('disabled').removeClass('gong_ju2').addClass('gong_ju');
	$('.guan_li').removeAttr('disabled').removeClass('guan_li2').addClass('guan_li');
    myFrame.window.$("#list_left").css("left","-206px");
    myFrame.window.$("#list_right").css("right","-206px");
    myFrame.window.$(".leftArrow").attr("src","images/index_right.png");
    myFrame.window.$(".rightArrow").attr("src","images/index_left.png");
    
    myFrame.window.$("#DD").text(indexTime.split(" ")[0]);
    
    $(".simulatResult").parent().css({"background":"none","bottom":"83px","display":"none"});
    setTimeout(function(){
        myFrame.window.datasTimeshow();
    },2000);
    	
})