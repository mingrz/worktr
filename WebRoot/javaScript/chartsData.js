function thermography_DataCharts(){//气象观测数据统计（热谱和index里的天气观测报表）
    var content='';
    $(".zhao").css("display","block");
    content+='<div class="environment_Data_statistics">'+
                '<div class="Chart_frame">'+
                    '<p class="tj_title">气象观测数据统计</p>'+
                    '<div class="chart">'+
                       '<div class="weatherchartData_show" id="weatherData_show"></div>'+
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
                       '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="revise_frame">'+
                    '<p class="tj_title">环境观测站属性<img src="images/min.png" class="empty_btn" onclick="zhao_none(\'.zhao\',\'.environment_Data_statistics\')"></p>'+
                    '<ul class="node_ul node_bg" id="node_ul">'+
                        '<li><span>气象站号</span><input id="node_number" readonly="readonly" type="text" value="" /></li>'+
                        '<li><span>站点名称</span><input id="node_name" type="text" value="" /></li>'+
                        '<li><span>站点桩号</span><input id="node_pileno" type="text" value="" /></li>'+
                        '<li><span>路段编号</span><input id="node_roadNum" type="text" value="" /></li>'+
                        '<li><span>经度坐标</span><input id="node_lat" type="text" value="" /></li>'+
                        '<li><span>纬度坐标</span><input id="node_log" type="text" value="" /></li>'+
                        '<li><span>设备厂家</span><input id="node_production" type="text" value="" /></li>'+
                        '<li><span>设备类型</span><input id="node_type" type="text" value="" /></li>'+
                    '</ul>'+
                    '<div class="btn_frame">'+
                        '<input type="submit" class="setup_environment_btn1" value="确定修改" onclick="update_Site(),zhao_none(\'.zhao\',\'.environment_Data_statistics\')"/>'+
                        '<input type="button" class="abolish_btn1" value="取消" onclick="zhao_none(\'.zhao\',\'.environment_Data_statistics\')"/>'+
                        '<p class="csv_frame">'+
                            '<input type="button" class="csv_btn1" value="导出数据到csv"/>'+
                        '</p>'+
                    '</div>'+
                '</div>'+
            '</div>';
    $('body').append(content);
    thermography_Data();
}
function thermography_Data(){//气象观测的报表图样及数据
    var _weatherData_show = echarts.init(document.getElementById('weatherData_show'));
    weatherData = {
    tooltip: {
        trigger: 'axis'
    },
    color:['red','green','yellow','#ccc','blue' ],
    legend: {
        data:['气温','相对湿度','露点温度','路面温度','冰点温度']
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '温度',
            min: -50,
            max: 100,
            interval: 50,
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        {
            type: 'value',
            name: '相对湿度',
            min: 0,
            max: 100,
            interval: 5,
            axisLabel: {
                formatter: '{value} '
            }
        }
    ],
    series: [
        {
            name:'气温',
            type:'line',
            yAxisIndex: 0,
            itemStyle : {  
                normal : {  
                    lineStyle:{  
                        color:'red'  
                    }  
                }  
            },
            data:[10, 16,0, 23, 25, 30, 12, 3, 12, -5, 8, 14]
        },
        {
            name:'相对湿度',
            type:'line',
            yAxisIndex: 1,
            itemStyle : {  
                normal : {  
                    lineStyle:{  
                        color:'green'  
                    }  
                }  
            },
            data:[10, 40, 20, 70, 50, 90, 67, 88, 46, 60, 90, 87]
        },
        {
            name:'露点温度',
            type:'line',
            yAxisIndex: 0,
            itemStyle : {  
                normal : {  
                    lineStyle:{  
                        color:'yellow'  
                    }  
                }  
            },
            data:[12, 16, 23, 8, 7, 0, -3, -9, 0, 8, 12, 22]
        },
        {
            name:'路面温度',
            type:'line',
            yAxisIndex: 0,
            itemStyle : {  
                normal : {  
                    lineStyle:{  
                        color:'#ccc'  
                    }  
                }  
            },
            data:[20, 12, 0, 9, 3, 9, 15, 22, 11, 7, 0, 5]
        },
        {
            name:'冰点温度',
            type:'line',
            yAxisIndex: 0,
            itemStyle : {  
                normal : {  
                    lineStyle:{  
                        color:'blue'  
                    }  
                }  
            },
            data:[0, -1, -5, 0, 2, 0, -3, 0, -9, -10, -1, 0]
        }
        
    ]
};
_weatherData_show.setOption(weatherData);
}

//(排放页面和index里的排放)
// //图表里pm,so2,no2,co,o3数据切换功能
//  function changeData(ele,chartDiv){
//         $(ele).css("color","red");
//         $(ele).siblings("span").css("color","#000");
//         $(chartDiv).css("display","block");
//         $(chartDiv).siblings("div").css("display","none");
// }
//站点图表所需的数据
 function charts_data(data,Name,YMin,YMax){//排放页面和index里的排放报表里的样式及数据
    var chartData_show = echarts.init(document.getElementById('chart'));
    option = {
        backgroundColor:"#fff",
        color:['red'],
        legend: {
            data:[Name]
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
            name: Name,
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
            data: data
        }
        ]
    };  
 chartData_show.setOption(option,true);
}

//index页面里路段属性中的报表样式数据（路段流量样图）
function roadChartsData(){
    var roadFlow = echarts.init(document.getElementById('chart'));          
    option1 = {
    backgroundColor:"#fff",
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
    },
    color:['red','green','yellow'],
    legend: {
        left: 'left',
        data: ['进入','出去','滞留']
    },
    xAxis : [
        { 
            type: 'value',
            min: 0,
            max: 24,
            axisLabel: {
            formatter: '{value} h'
            },
        }
    ],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: {
        type: 'value',
        min:0,
        max:1000,
        name: '车(量)',
    },
    series: [
        {
            name: '进入',
            type: 'line',
            data:[
                ["1","100"],["2","500"],["3","700"],["4","80"],
                ["5","120"],["6","320"],["7","90"],["8","0"],["9","100"]
                ,["10","400"],["11","600"],["12","210"],["13","99"],
                ["14","146"],["15","500"],["16","360"],["17","250"],
                ["18","600"]
               ]
        },
        {
            name: '出去',
            type: 'line',
            data:[
                ["1","50"],["2","160"],["3","206"],["4","300"],
                ["5","405"],["6","200"],["7","120"],["8","230"],
                ["9","100"],["10","400"],["11","600"],["12","210"],
                ["13","130"],["14","203"],["15","402"],["16","346"],
                ["17","215"],["18","301"]
               ]
        },
        {
            name: '滞留',
            type: 'line',
            data:[
                ["1","203"],["2","102"],["3","315"],["4","450"],
                ["5","152"],["6","55"],["7","60"],["8","203"],
                ["9","260"],["10","309"],["11","190"],["12","280"],
                ["13","405"],["14","89"],["15","316"],["16","190"],
                ["17","410"],["18","66"]
               ]
        }
    ]
};
    // 为echarts对象加载数据 
    roadFlow.setOption(option1);
}
//index页面里路段属性中的报表样式数据（路段流量样图）
function roadTripChartsData(){
    var Road_Trip = echarts.init(document.getElementById('road_Trip'));          
    Trip = {
    backgroundColor:"#fff",
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
    },
    color:['red'],
    legend: {
        left: 'left',
        data: ['距离']
    },
    xAxis : [
        { 
            type: 'value',
            min: 0,
            max: 24,
            axisLabel: {
            formatter: '{value} h'
            },
        }
    ],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: {
        type: 'value',
        min:0,
        max:1000,
        name: '距离(m)',
    },
    series: [
        {
            name: '距离',
            type: 'line',
            data:[
                ["1","100"],["2","500"],["3","700"],["4","80"],
                ["5","120"],["6","320"],["7","90"],["8","0"],["9","100"]
                ,["10","400"],["11","600"],["12","210"],["13","99"],
                ["14","146"],["15","500"],["16","360"],["17","250"],
                ["18","600"]
               ]
        }
    ]
};

    // 为echarts对象加载数据 
    Road_Trip.setOption(Trip);
}

//index页面里旅行时间的报表
function TripCharts(){
    var trip_time = echarts.init(document.getElementById('tripTime'));          
    _tripTime = {
    backgroundColor:"#fff",
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
    },
    color:['red'],
    legend: {
        left: 'left',
        data: ['距离']
    },
    xAxis : [
        { 
            type: 'value',
            min: 0,
            max: 24,
            axisLabel: {
            formatter: '{value} h'
            },
        }
    ],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: {
        type: 'value',
        min:0,
        max:1000,
        name: '距离(m)',
    },
    series: [
        {
            name: '距离',
            type: 'line',
            data:[
                ["1","100"],["2","500"],["3","700"],["4","80"],
                ["5","120"],["6","320"],["7","90"],["8","0"],["9","100"]
                ,["10","400"],["11","600"],["12","210"],["13","99"],
                ["14","146"],["15","500"],["16","360"],["17","250"],
                ["18","600"]
               ]
        }
    ]
};

    // 为echarts对象加载数据 
    trip_time.setOption(_tripTime);
}

//index页面里路口车检属性中的报表样式数据
function CrossTurnChartsData(){
    var CrossTurn = echarts.init(document.getElementById('crossTurn'));          
    turn = {
    backgroundColor:"#fff",
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
    },
    color:['red','green','yellow'],
    legend: {
        left: 'left',
        data: ['左转', '直行','右转']
    },
    xAxis : [
        { 
            type: 'value',
            min: 0,
            max: 24,
            axisLabel: {
            formatter: '{value} h'
            },
        }
    ],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: {
        type: 'value',
        min:0,
        max:1000,
        name: '车(量)',
    },
    series: [
        {
            name: '左转',
            type: 'line',
            data:[
                ["1","100"],["2","500"],["3","700"],["4","80"],
                ["5","120"],["6","320"],["7","90"],["8","0"],["9","100"]
                ,["10","400"],["11","600"],["12","210"],["13","99"],
                ["14","146"],["15","500"],["16","360"],["17","250"],
                ["18","600"]
               ]
        },
        {
            name: '直行',
            type: 'line',
            data:[
                ["1","50"],["2","160"],["3","206"],["4","300"],
                ["5","405"],["6","200"],["7","120"],["8","230"],
                ["9","100"],["10","400"],["11","600"],["12","210"],
                ["13","130"],["14","203"],["15","402"],["16","346"],
                ["17","215"],["18","301"]
               ]
        },
        {
            name: '右转',
            type: 'line',
            data:[
                ["1","203"],["2","102"],["3","315"],["4","450"],
                ["5","152"],["6","55"],["7","60"],["8","203"],
                ["9","260"],["10","309"],["11","190"],["12","280"],
                ["13","405"],["14","89"],["15","316"],["16","190"],
                ["17","410"],["18","66"]
               ]
        }
    ]
};
    // 为echarts对象加载数据 
    CrossTurn.setOption(turn);
}

//index页面里旅行时间的报表
function CrossOutChartsData(){
    var CrossOut = echarts.init(document.getElementById('crossOut'));          
    _crossOut = {
    backgroundColor:"#fff",
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
    },
    color:['red'],
    legend: {
        left: 'left',
        data: ['距离']
    },
    xAxis : [
        { 
            type: 'value',
            min: 0,
            max: 24,
            axisLabel: {
            formatter: '{value} h'
            },
        }
    ],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: {
        type: 'value',
        min:0,
        max:1000,
        name: '距离(m)',
    },
    series: [
        {
            name: '距离',
            type: 'line',
            data:[
                ["1","100"],["2","500"],["3","700"],["4","80"],
                ["5","120"],["6","320"],["7","90"],["8","0"],["9","100"]
                ,["10","400"],["11","600"],["12","210"],["13","99"],
                ["14","146"],["15","500"],["16","360"],["17","250"],
                ["18","600"]
               ]
        }
    ]
};

    // 为echarts对象加载数据 
    CrossOut.setOption(_crossOut);
}

//index页面里路段车检属性中的报表样式数据
function RoadDirectionAjax(pa){
    $.ajax({
         url:"GetNetState",
         dataType:"json",
         data:{ "action":"query","type":6,"pa":23},
         contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
         beforeSend:function(){  },
         success: function( data, textStatus, jqXHR ){
               RoadDirection(data.entitys);
         },
         error:function(){}
        })
}
function RoadDirection(data){
    var CarFlow = echarts.init(document.getElementById('carFlow')); 
    var data1=data;         
    Direction = {
    backgroundColor:"#fff",
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
    },
    color:['red','green'],
    legend: {
        left: 'left',
        data: ['顺流', '逆流']
    },
    xAxis :{
        type: 'time',
        splitLine: {
            show: false
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis:{
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    series: [
        {
            name: '顺流',
            type: 'line',
            data:data1
            // [
            //     ["1","100"],["2","500"],["3","700"],["4","80"],
            //     ["5","120"],["6","320"],["7","90"],["8","0"],["9","100"]
            //     ,["10","400"],["11","600"],["12","210"],["13","99"],
            //     ["14","146"],["15","500"],["16","360"],["17","250"],
            //     ["18","600"]
            //    ]
        },
        {
            name: '逆流',
            type: 'line',
            data:[
                // ["1","50"],["2","160"],["3","206"],["4","300"],
                // ["5","405"],["6","200"],["7","120"],["8","230"],
                // ["9","100"],["10","400"],["11","600"],["12","210"],
                // ["13","130"],["14","203"],["15","402"],["16","346"],
                // ["17","215"],["18","301"]
               ]
        }
    ]
};
    // 为echarts对象加载数据 
    CarFlow.setOption(Direction);
}


function pathChartsData(){
    var pathId = echarts.init(document.getElementById('chartPath'));          
    option = {
    backgroundColor:"#fff",
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
    },
    color:['red','green','yellow'],
    legend: {
        left: 'left',
        data: ['离开车道车流量']
    },
    xAxis : [
        { 
            type: 'value',
            min: 0,
            max: 24,
            axisLabel: {
            formatter: '{value} h'
            },
        }
    ],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: {
        type: 'value',
        min:0,
        max:1000,
        name: '车(量)',
    },
    series: [
        {
            name: '离开车道车流量',
            type: 'line',
            data:[
                ["1","100"],["2","500"],["3","700"],["4","80"],
                ["5","120"],["6","320"],["7","90"],["8","0"],["9","100"]
                ,["10","400"],["11","600"],["12","210"],["13","99"],
                ["14","146"],["15","500"],["16","360"],["17","250"],
                ["18","600"]
               ]
        }
    ]
};
    pathId.setOption(option);

}
function houseChartsData(name,_data){
    var roadFlow = echarts.init(document.getElementById('chart'));          
    option1 = {
    backgroundColor:"#fff",
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
    },
    color:['red','green','yellow'],
    legend: {
        left: 'left',
        data: [name]
    },
    xAxis : [
        { 
            type: 'time',
        }
    ],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: {
        type: 'value',
        name: '车(量)',
    },
    series: [
        {
            name: name,
            type: 'line',
            data:_data
        }
    ]
};
    // 为echarts对象加载数据 
    roadFlow.setOption(option1);
}