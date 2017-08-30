function settingCht( objChart,arrTrips,arrSubLine )
{
	var num=0,arrXAxis=[],arrValues=[],objN2O={};
	for( var i=0;i<arrSubLine.length;i++ ){
		for(var j=0;j<TL_Stop_Valid[arrSubLine[i]].length;j++){
			arrValues=[];arrValues.push(num++);
			arrValues.push(TL_Input_Stop[TL_Stop_Valid[arrSubLine[i]][j]-1][2]);
			arrXAxis.push(arrValues);
			
			objN2O[TL_Input_Stop[TL_Stop_Valid[arrSubLine[i]][j]-1][0]]=num-1;
		}
	}
	
	var arrSeries=[],arrSec=[];num=0;
	for( var i=0;i<arrTrips.length;i++ ){
		if( num!=arrTrips[i][2] ){
			if( arrSec.length>0 )
				arrSeries.push(arrSec);
			
			arrSec=[];
			num=arrTrips[i][2];
		}
		arrValues=[];
		arrValues.push(objN2O[arrTrips[i][0]]);
		arrValues.push(arrTrips[i][1]);
		//arrValues.push(objN2O[arrTrips[i][2]]);
		
		arrSec.push(arrValues);
	}
}

function settingOptionTrips(objChart,arrSeries,arrXAxis,arrPa)
{
	var option={},obj={},arr=[];
	
	option['title'	]={text:'地铁车辆运行数据分析',subtext:'北京奥泽尔',left: 'center',top: 16};
	option['grid' 	]={top: 90};
	option['tooltip']={'trigger': 'axis','axisPointer': {'type': 'cross'},formatter:function(obj){
		//console.log(obj);
	}};
	option['yAxis'	]={type:'value',splitNumber:10,splitLine: {show:false,lineStyle: {type: 'dashed'}},
	axisLabel: {formatter: function (obj) { return timeFormat(obj);}}};
	option['xAxis'	]={type: 'value',position:'top',splitNumber:4,splitLine: {lineStyle: {type: 'solid'}},
	axisLabel: {formatter: function (obj) { return arrXAxis[obj];}}};
	
	
	//option['series'	]=[{ name: 'line1',type: 'line',label: {emphasis: {show: true,position: 'right',textStyle: {color: 'blue',fontSize: 16}}},data: arrSeries[0]},
	//	{ name: 'line2',type: 'line',label: {emphasis: {show: true,position: 'right',textStyle: {color: 'blue',fontSize: 16}}},data: arrSeries[1]}];
	//option['title']={};
	
	for( var i=0;i<arrSeries.length;i++ ){
		arr.push({name: 'line'+i,type: 'line',label: {emphasis: {show: true,position: 'right',textStyle: {color: 'blue',fontSize: 16}}},data: arrSeries[i]});
	}
	
	option['series'	]=arr;
	
	objChart.setOption(option);
}

function timeFormat(num)
{
	var ho,mi;
	ho=parseInt((1440-num)/60);mi=(1440-num)%60;
	return pad(ho,2)+":"+pad(mi,2);
}

function pad(num, n) {  
    var len = num.toString().length;  
    while(len < n) {  
        num = "0" + num;  
        len++;  
    }  
    return num;  
} 