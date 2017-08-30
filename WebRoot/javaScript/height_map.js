$(document).ready(function() { 
	//地图高度
	var High=document.body.clientHeight;
	document.getElementById('map').style.height=High+'px';
});
$(window).resize(function(){ 
	var High=document.body.clientHeight;
	document.getElementById('map').style.height=High+'px';
});