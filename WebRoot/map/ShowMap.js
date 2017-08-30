var g_map,layer,vectorLayer;

function init(){
	/*
	 * 不支持canvas的浏览器不能运行该范例
	 * android 设备也不能运行该范例*/
	var broz = SuperMap.Util.getBrowser();

	if (!document.createElement('canvas').getContext) {
		alert('您的浏览器不支持 canvas，请升级');
		return;
	} else if (broz.device === 'android') {
		alert('您的设备不支持高性能渲染，请使用pc或其他设备');
		return;
	}
	
	g_map = new SuperMap.Map("map", {
		controls : [ new SuperMap.Control.Navigation(),
				new SuperMap.Control.Zoom(),
				new SuperMap.Control.MousePosition(),
				new SuperMap.Control.LayerSwitcher() ]
	});
	
	layer = new SuperMap.Layer.CloudLayer();
	g_map.addLayer(layer);
	g_map.setCenter(new SuperMap.LonLat(12992908.68611, 4798249.58516), 0);
	//g_map.setCenter(new SuperMap.LonLat(12987210.848371, 4795332.91460768), 12);
	
	//初始化Vector图层
	vectorLayer = new SuperMap.Layer.Vector("Vector Layer", {
		renderers : [ "Canvas2" ]
	});
	//给在vector图层上所选择的要素初始化
	select = new SuperMap.Control.SelectFeature(vectorLayer, {
		onSelect : onFeatureSelect,
		onUnselect : onFeatureUnselect,
		repeat : true
	});
	
	var markerlayer = new SuperMap.Layer.Markers("markerLayer");
	g_map.addLayer(markerlayer);
	
	g_map.addControl(select);
	g_map.addLayer(vectorLayer);
}

function onFeatureSelect(feature) {
}

//清除要素时调用此函数
function onFeatureUnselect(feature) {
}

//编辑选择的要素
function editSelectedFeatures() {
}

//添加图层
function addLayer() {
	//map.addLayers( [ layer, vectorLayer ]);
	//map.setCenter(new SuperMap.LonLat(11733502.481499, 4614406.969325), 4);
	//map.addControl(new SuperMap.Control.MousePosition());
}

function queryCameraInfo(){
	$.ajax({
		url:"GetDevice",
		dataType:"json",
		 data:{ "action":"query"},
	        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
	        beforeSend:function(){  },
	        success: function( data, textStatus, jqXHR ){
	        	doCameraInfo( data );
	        },
	        error:function()
	        {
	
	        }
	});
}

function doCameraInfo(data){
	var markerlayer=g_map.getLayersByName("markerLayer");
	
	if( data ){
		if( data.total != 0 )
		{
			for( var item in data.entitys ){
				statedata = data.entitys[item];
				
				var lonlat = SuperMap.LonLat.fromString(statedata.geo);
				
				var size = new SuperMap.Size(44,33);
				var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
				var icon = new SuperMap.Icon('./theme/images/marker.png', size, offset);
				//marker =new SuperMap.Marker(new SuperMap.LonLat(12987210.848371, 4795332.91460768),icon) ;
				var marker =new SuperMap.Marker(lonlat,icon) ;
				markerlayer[0].addMarker(marker);
			}
		}
	}
}

function queryRoadNetFeature(){
	$.ajax({
		url:"GetRoadNet",
		dataType:"json",
		 data:{ "action":"query"},
	        contentType:"contentType:application/x-www-form-urlencoded; charset=UTF-8",
	        beforeSend:function(){  },
	        success: function( data, textStatus, jqXHR ){
	        	doRoadNetFeature( data );
	        },
	        error:function(){
	        }
	});
}

function doRoadNetFeature(data){
	var layer=g_map.getLayersByName("Vector Layer");
	
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
			
			line = new SuperMap.Geometry.LinearRing(points);
			lineVector = new SuperMap.Feature.Vector(line);
			lineVector.style={
					strokeColor:"#C0FF3E",
					fill:false,
					strokeWidth:2
					};
			features.push(lineVector);
		}
		vectorLayer.addFeatures(features);
		vectorLayer.redraw();
	}
}

//SQL查询
function queryBySQL() {
	
	queryRoadNetFeature();
	return;
	
	/*var viewBounds=g_map.getExtent();
	var l=g_map.getZoom();
	viewBounds=g_map.getMaxExtent();
	
	var n=l+1;
	var Resolutions = 20037508.3427892 * 2 / 256 / (2^n);
	Resolutions=g_map.getResolution();
	var bounds=[-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892];
	
	startX = Math.floor(((viewBounds.left - bounds[0]) / Resolutions) / 256);
	startY = Math.floor(((viewBounds.bottom - bounds[1]) / Resolutions) / 256);
	endX = Math.floor(((viewBounds.right - bounds[2]) / Resolutions) / 256);
	endY = Math.floor(((viewBounds.top - bounds[3]) / Resolutions) / 256);
	
	return;*/
	//查询中国的全部省会。
	var queryParamCapital, queryBySQLParamsCapital, queryBySQLServiceCapital;
	//初始化查询参数
			queryParamCapital = new SuperMap.REST.FilterParameter( {
				name : "LF_Road@langfang",
				//name: "China_Capital_P@China400",
				attributeFilter : "SmID >=0"
			}),
			//初始化sql查询参数
			queryBySQLParamsCapital = new SuperMap.REST.QueryBySQLParameters(
					{
						queryParams : [ queryParamCapital ]
					}),
			//SQL查询服务
			queryBySQLServiceCapital = new SuperMap.REST.QueryBySQLService(
					url1, {
						eventListeners : {
							"processCompleted" : processCompletedCapital,
							"processFailed" : processFailedCapital
						}
					});
	queryBySQLServiceCapital.processAsync(queryBySQLParamsCapital);
}

//SQL查询(省会)成功时触发此事件
function processCompletedCapital(queryEventArgs) {
	var i, j, feature, result = queryEventArgs.result;
	features = [];
	if (result && result.recordsets) {
		for (i = 0; i < result.recordsets.length; i++) {
			if (result.recordsets[i].features) {
				for (j = 0; j < result.recordsets[i].features.length; j++) {
					feature = result.recordsets[i].features[j];
					//feature.style = styleCaptial;
					feature.style = styRed;
					features.push(feature);
				}
			}
		}
	}
	vectorLayer.addFeatures(features);
	select.activate();
}

//SQL查询(省会)失败时出发的事件
function processFailedCapital(e) {
	alert(e.error.errorMsg);
}
