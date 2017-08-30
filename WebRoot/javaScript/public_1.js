//iframe初始高度
$(document).ready(function(){ 
	var High1=document.body.clientHeight; 
	var ifm=document.getElementById("iframepage"); 
	ifm.style.height=High1-96+'px';
});
//iframe在窗口改变时的高度
$(window).resize(function(){  
	var High1=document.body.clientHeight;  
	var ifm=document.getElementById("iframepage"); 
	ifm.style.height=High1-96+'px';
});

	/*header部分菜单和工具按钮*/
	// $(".guan_li").click(function(){
	// 		$(this).toggleClass("guan_li2");
	// 		myFrame.window.show1();
	// 	});
	// $(".gong_ju").click(function(){
	// 	$(this).toggleClass("gong_ju2");
	// 	myFrame.window.show2();
	// });

	//logo处的文字变色
	$(".logo_choice li").click(function(){
		$(this).children("p").css("color","red");
		$(this).siblings().children("p").css("color","#fff");
	});
	//图片的改变
	$("#logo_choice li").click(function(){
        var i = $(this).index();
        $("#logo_choice li").each(function(b){
            $(this).children("img").attr("src","images/logo/white/"+b+".png");
        });
        $(this).children("img").attr("src","images/logo/red/"+i+".png");
    });
    // function dis(){
    // 	var GJ=document.getElementById('gj');
    // 	var GL=document.getElementById('gl');
    // 	GJ.onclick=null;
    // 	GL.onclick=null;
    // }
	//iframe指向的url
	function publicNav(roads){
		$("#iframepage").attr("src",roads);
			$('.gong_ju').attr('disabled','disabled').removeClass('gong_ju2').addClass('gong_ju');
			$('.guan_li').attr('disabled','disabled').removeClass('guan_li2').addClass('guan_li');
	}
	
	$(".Traffic").click(function(){
		publicNav("dtjt.html");
	});
	$(".status").click(function(){
		$("#iframepage").attr("src","index.html");
			$('.gong_ju').removeAttr('disabled').removeClass('gong_ju2').addClass('gong_ju');
			$('.guan_li').removeAttr('disabled').removeClass('guan_li2').addClass('guan_li');
	});
	$(".control").click(function(){
		publicNav("kongzhi.html");
	});
	$(".arrange").click(function(){
		publicNav("bushu.html");
	});
	// $(".safe").click(function(){
	// 	publicNav("safe.html");
	// });
	$(".lead1").click(function(){
		publicNav("youdao.html");
	});
	// $(".static").click(function(){
	// 	publicNav("jingtai.html");
	// });
	$(".thermography").click(function(){
		publicNav("roadSafe.html");
	});
	$(".discharge").click(function(){
		publicNav("paifang.html");
	});	
/*日期*/
function showtime(){
	var date=new Date();
	var yy=date.getFullYear();
	var yue=date.getMonth()+1;
	var ri=date.getDate();
	var hh=date.getHours();
	var mm=date.getMinutes();
	var ss=date.getSeconds();
	var day=date.getDay();
	/*var am_pm="AM";
	if(hh>12){
		hh=hh-12;
		an_pm="pm";
	}*/

	switch(day){
		case 0:
			 day="星期日";
			 break;
		case 1:
			 day="星期一";
			 break;
		case 2:
			 day="星期二";
			 break;
		case 3:
			 day="星期三";
			 break;
		case 4:
			 day="星期四";
			 break;
		case 5:
			 day="星期五";
			 break;
		case 6:
			 day="星期六";
			 break;
	}
	mm=checkTime(mm);
	ss=checkTime(ss);
	var div1=document.getElementById("div1");
	div1.innerHTML=yy+"年"+yue+"月"+ri+"日"+"  "+hh+":"+mm+":"+ss+"  "/*+am_pm+" "*/+day;
	/*var Vernier_time=document.getElementById("vernier_time");
		Vernier_time.innerHTML=hh+":"+mm;*/
	t=setTimeout('showtime()',500);
}
function checkTime(i){
	if (i<10){
		i="0" + i;
	}
	return i;
}

window.onload=function(){
	showtime();
}