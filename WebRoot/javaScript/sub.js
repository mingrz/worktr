var TL_Sub_Input_Link,TL_Sub_Input_index,TL_Trip,TL_Vertex,TL_Vertex_Index,TL_Input_Stop;
var TL_Stop_Valid={"1号线":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
		"2号线":[24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]}
function AnimatePoint(second)
{
	if( TL_Sub_Input_Link==undefined || TL_Vertex==undefined )
		return;
	
	var station,sttime,edtime;
	var arrIndex, minute=(second-second%60)/60;
	if( (arrIndex=TL_Vertex_Index[minute])!=undefined){
		//arrIndex=TL_Vertex_Index[minute];
		for( var i=0;i<arrIndex.length;i++ ){
			if( second<TL_Vertex[arrIndex[i]][1] ){
				if( i>0&&TL_Vertex[arrIndex[i]][2]==TL_Vertex[arrIndex[i-1]][2] ){
					sttime=TL_Vertex[arrIndex[i]-1][1];edtime=TL_Vertex[arrIndex[i]][1];
					station=TL_Vertex[arrIndex[i]-1]+"->"+TL_Vertex[arrIndex[i]];
				}
				else if(i==0){
					sttime=TL_Vertex[arrIndex[i]][1];edtime=TL_Vertex[arrIndex[i]+1][1];
					station=TL_Vertex[arrIndex[i]][1]+"->"+TL_Vertex[arrIndex[i]+1][1];
				}
				else
					station=undefined
					
			}
			else{
				if( second<TL_Vertex[arrIndex[i]+1][1] ){
					sttime=TL_Vertex[arrIndex[i]][1];edtime=TL_Vertex[arrIndex[i]+1][1];
					station=TL_Vertex[arrIndex[i]][0]+"->"+TL_Vertex[arrIndex[i]+1][0];
				}
				else
					station=undefined;
			}
			
			if( station!=undefined )
				CaculatePoint(second,station,sttime,edtime);
			
			console.log(TL_Vertex[arrIndex[i]]);console.log(i);
		}
	}
}

function CaculatePoint(second,station,sttime,edtime)
{
	var link,arrPoints,id,p1,p2,dis=[];
	id=TL_Sub_Input_index[station].split("->")[1];
	link=getFeature(51,id);dis[0]=0;
	for( var i=0;i<link.geometry.components.length-1;i++ ){
		p1=new SuperMap.Geometry.Point(link.geometry.components[i].x,link.geometry.components[i].y);
		p2=new SuperMap.Geometry.Point(link.geometry.components[i+1].x,link.geometry.components[i+1].y);
		
		dis[i+1]=p1.distanceTo(p2);
		dis[0]+=dis[i+1];
	}
	
	var x,y,t1,t2,span=edtime-sttime;
	for( var i=1;i<dis.length;i++ ){
		t2=sttime+span*dis[i]/dis[0];
		if( second<t1 ){
			s=(second-t1)/(t2-t1);
			x=s*(link.geometry.components[i].x-link.geometry.components[i-1].x)+link.geometry.components[i-1].x;
			y=s*(link.geometry.components[i].y-link.geometry.components[i-1].y)+link.geometry.components[i-1].y;
			DrawPoint(x,y);
			break;
		}
		
		t1=t2;
	}
}

function DrawPoint(x,y)
{
	var layer=supermap.getLayersByName("markerLayer"+51)[0];
	var lonlat=new SuperMap.Geometry.Point(x,y);
	var lineVector = new SuperMap.Feature.Vector(lonlat);
	var features = [];
	lineVector.style = {
			fillColor : "red",
			strokeColor : "yellow",
			pointRadius : 9
		};
	
	features.push(lineVector);
	layer.addFeatures(features);
	
	//lineVector.geometry.x+=10;
	//layer.redraw();
}