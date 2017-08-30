package com.itsjn.dao;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import net.sf.json.JSONObject;

import com.itsjn.config.ServerURL;
import com.itsjn.entity.CameraAttr;
import com.itsjn.util.WebClient;
import com.itsjn.dao.RoadNetDao;

import java.sql.Connection;     //导入数据库连接对象
import java.sql.DriverManager;  //导入数据库驱动管理对象
import java.sql.ResultSet;      //导入数据记录集对象
import java.sql.SQLException;   //导入数据SQL操作异常对象
import java.sql.Statement;      //导入SQL操作接口对象

import java.util.HashMap;  
import java.util.Iterator;  
import java.util.Set; 
import java.util.Random;

import java.text.DecimalFormat;

public class NetStateDao{

	public static ArrayList<ArrayList<String>> listRoadNetFeature     = new ArrayList<ArrayList<String>>();
	public static ArrayList<ArrayList<String>> listNetState    = new ArrayList<ArrayList<String>>();
	public static ArrayList<String> listSignal = new ArrayList<String>();
	public static DecimalFormat decimalFormat=new DecimalFormat("00");
	public static DecimalFormat decimalFormatF=new DecimalFormat("##0.00");
	public static Connection m_conn;
	public static String strTimeCur="";
	
	public void UpdataeData() {
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		if( listNetState.size()>0 && strTimeCur==listNetState.get(0).get(0) )
			return;

		if(m_conn!=null ){
			try {	
				st = m_conn.createStatement();
				sql ="select timestamp_in_min,b.linkid,speed from output_linktdmoe a,input_link b " +
				"where a.from_node_id=b.from_node_id and a.to_node_id=b.to_node_id and timestamp_in_min=(select max(timestamp_in_min) from output_linktdmoe ) order by linkid";
				rs=st.executeQuery(sql); //执行数据查询
				
				int nInd=0;
				synchronized (listNetState){
					while(rs.next()){
						if( listNetState.size()==0 ){
							ArrayList<String> attrlist = new ArrayList<String>();
							attrlist.add(rs.getString(1));
							attrlist.add(rs.getString(2));
							
							if( rs.getInt(3) < 20 )
								attrlist.add("0");
							else if( rs.getInt(3) >=20 && rs.getInt(2)<38)
								attrlist.add("1");
							else if( rs.getInt(3) >=38 && rs.getInt(2)<48)
								attrlist.add("2");
							else if( rs.getInt(3) >=48)
								attrlist.add("3");
							
							attrlist.add(rs.getString(3));

							listNetState.add(attrlist);
						}else{
							//listNetState.add(nInd,);
							ArrayList<String> attrlist=listNetState.get(nInd);
							attrlist.add(0, rs.getString(1));
							attrlist.add(0, rs.getString(2));
							
							if( rs.getInt(3) < 20 )
								attrlist.add("0");
							else if( rs.getInt(3) >=20 && rs.getInt(2)<38)
								attrlist.add("1");
							else if( rs.getInt(3) >=38 && rs.getInt(2)<48)
								attrlist.add("2");
							else if( rs.getInt(3) >=48)
								attrlist.add("3");
							
							attrlist.add(rs.getString(3));
						}
							
					}
				}
				
				rs.close(); //关闭数据记录集
				
				strTimeCur=listNetState.get(0).get(0);

			}catch (SQLException e) {
				System.out.println("Error:"+e.toString()+e.getMessage());
			}
		}
	}
	
	public String GetNewData( Connection conn ) {
		String strResult="";
		
		synchronized (m_conn){
			m_conn=conn;
		}
		
		if( listNetState.size()==0  )
			UpdataeData();
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listNetState );
		strResult = jsobject.toString();
		
		return strResult;
		
	}
	
	
	public  String  GetSecDataByID(Connection conn,String strDate,String id,String strType)
	{
		String str,sql,strResult = "";
		
		ArrayList<String> list = new ArrayList<String>();
		ArrayList<ArrayList<String>> listRoadData     = new ArrayList<ArrayList<String>>();
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		String strTable="";
		if( strType=="rea" )
			strTable="output_sectdmoe";
		else if( strType=="sim" )
			strTable="sim_sectdmoe";
		
		try {
			st = conn.createStatement();
			sql ="select b.from_node_id,b.to_node_id,a.sec,a.link_type,state,timestamp_in_min,travel_time_in_min,speed,link_out_volume_number_of_veh from "+strTable+" a,input_link b where a.sec=b.sec and day_no='"+
			strDate+"' and a.sec="+id+" order by timestamp_in_min";
			rs=st.executeQuery(sql); //执行数据查询
			while(rs.next()){
				ArrayList<String> attrlist = new ArrayList<String>();
				
				if( list.size()<1 ){
					for( int i=1;i<=5;i++ )
						list.add(rs.getString(i));
					
					listRoadData.add(list);
				}
				
				str="";
				if( rs.getInt(6)/60<10 )
					str+="0"+rs.getInt(6)/60+":";
				else
					str+=rs.getInt(6)/60+":";
				
				if( rs.getInt(6)%60<10 )
					str+="0"+rs.getInt(6)%60+":00";
				else
					str+=""+rs.getInt(6)%60+":00";
				
				str=strDate+" "+str;
				
				attrlist.add(str);
				attrlist.add(rs.getString(8));
				attrlist.add(rs.getString(7));
				attrlist.add(rs.getString(9));
				
				listRoadData.add(attrlist);
			}
			
			rs.close(); //关闭数据记录集
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listRoadData );
		strResult = jsobject.toString();
		
		return strResult;
	}

	// TPS
	public  String  GetSecData(Connection conn,String strDate,String strStartTime,String strType)
	{
		String sql,strResult = "";

		String state="5";
		ArrayList<ArrayList<String>> listRoadData     = new ArrayList<ArrayList<String>>();

		int speed=0,linktype=0;

		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		int max=80,min=33,old=0,nNum1=0,nNum2=0;
		Random random = new Random();
		int nMin=Integer.parseInt(strStartTime);
		nMin=nMin-nMin%5;
		
		String strTable="";
		if( strType=="rea" )
			strTable="output_sectdmoe";
		else if( strType=="sim" )
			strTable="sim_sectdmoe";

		try {
			st = conn.createStatement();
			st.setMaxRows(1000000);st.setFetchSize(1000000);st.setPoolable(true);
			//sql ="select id,speed,state,a.sec from output_sectdmoe a,gis_net b where a.sec=b.sec and timestamp_in_min="+strStartTime+" order by a.sec";
			sql ="select a.sec,state,travel_time_in_min,speed,link_volume_in_veh_per_hour_per_lane,link_type,total_co2,total_nox,total_co,total_hc,total_pm,total_pm25 from "+strTable+" a where timestamp_in_min="+nMin+
			" and day_no='"+strDate+"'";
			//System.out.println(sql);
			rs=st.executeQuery(sql); //执行数据查询

			while(rs.next()){
				ArrayList<String> attrlist = new ArrayList<String>();
				
				speed=rs.getInt(4);
				linktype=rs.getInt(6);
				state=rs.getString(2);
				
				attrlist.add(rs.getString(1));	
				attrlist.add(state);
				attrlist.add(rs.getString(4));
				attrlist.add(decimalFormatF.format(rs.getFloat(3)));
				attrlist.add(rs.getString(5));
				attrlist.add(decimalFormatF.format(rs.getFloat(7)));
				attrlist.add(decimalFormatF.format(rs.getFloat(8)));
				attrlist.add(decimalFormatF.format(rs.getFloat(9)));
				attrlist.add(decimalFormatF.format(rs.getFloat(10)));
				attrlist.add(decimalFormatF.format(rs.getFloat(11)));
				attrlist.add(decimalFormatF.format(rs.getFloat(12)));

				listRoadData.add(attrlist);
			}

			rs.close(); //关闭数据记录集

		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}

		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listRoadData );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public  String  GetIndexNet(Connection conn,String stTime,String edTime,String stState,String edState)
	{
		String strResult = "";
		String sql;
		
		ArrayList<String> attrlist = new ArrayList<String>();
		
		int[] ratioArray ={0,4,8,11,14,24};
		int[] indexArray ={0,2,4,6,8,10};
		float vktAll=0,vkt=0,index=0;

		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象

		try {
			st = conn.createStatement();
			sql ="select sec,sum(link_out_volume_number_of_veh)*avg(length) from output_sectdmoe where day_no='2016-04-01'"+
			" and timestamp_in_min>="+stTime+" and timestamp_in_min<"+edTime+" group by sec order by sec";
			rs=st.executeQuery(sql); //执行数据查询

			while(rs.next()){
				vktAll+=rs.getFloat(2);
			}
			rs.close();

			sql ="select sec,sum(link_out_volume_number_of_veh)*avg(length) from output_sectdmoe where day_no='2016-04-01'"+
			" and timestamp_in_min>="+stTime+" and timestamp_in_min<"+edTime+" and state>="+stState+" state<="+edState+
			" group by sec order by sec";
			rs=st.executeQuery(sql); //执行数据查询

			while(rs.next()){
				vkt+=rs.getFloat(2);
			}
			rs.close(); //关闭数据记录集
			
			if( vktAll>0 ){
				index=vkt*100/vktAll;

				for( int i=0;i<ratioArray.length;i++ ){
					if( i==ratioArray.length-1 ){
						index=10;
					}
					else if( index>ratioArray[i] && index<=ratioArray[i+1] ){
						index=indexArray[i]+(indexArray[i+1]-indexArray[i])*(index-ratioArray[i])/(ratioArray[i+1]-ratioArray[i]);
					}
				}
			}
			
			attrlist.add(String.valueOf(index));

		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}

		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", attrlist );
		strResult = jsobject.toString();
		return strResult;
	}

	// TPI
	public  String GetZoneData(Connection conn,String strStartTime,String strType)
	{
		String sql,strResult = "";
		
		ArrayList<String> attrlist = new ArrayList<String>();
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		String strTable="";
		if( strType=="rea" )
			strTable="output_congestion_index";
		else if( strType=="sim" )
			strTable="sim_congestion_index";
		
		try {
			st = conn.createStatement();
			sql= "select id,ratio,index,state from "+strTable+" where datatime="+strStartTime+" and id>0";
			rs=st.executeQuery(sql); //执行数据查询
			
			while(rs.next()){
				attrlist.add(rs.getString(1));
				attrlist.add(rs.getString(4));
			}
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", attrlist );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public  String  GetDataTime(Connection conn)
	{
		String sql,strResult = "";
		
		ArrayList<String> attrlist = new ArrayList<String>();
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		String strTime;
		
		try {
			st = conn.createStatement();
			sql= "select max(day_no),min(timestamp_in_min),max(timestamp_in_min)  from sim_sectdmoe";
			rs=st.executeQuery(sql); //执行数据查询
			
			while(rs.next()){
				strTime=decimalFormat.format(rs.getInt(2)/60)+":"+decimalFormat.format(rs.getInt(2)%60)+":00";
				attrlist.add(rs.getString(1)+" "+ strTime);
				strTime=decimalFormat.format(rs.getInt(3)/60)+":"+decimalFormat.format(rs.getInt(3)%60)+":00";
				attrlist.add(rs.getString(1)+" "+ strTime);
			}
			
			rs.close();
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", attrlist );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public String GetParamSingnal(Connection conn,String id)
	{
		String strResult = "";
		ArrayList<String> attrlist = new ArrayList<String>();
		
		if( listSignal.size()<1 ){
			listSignal.add("1,60,1,0,sy,sr,sg,ly,lg,5,15,25,5,10");
			listSignal.add("1,60,2,0,sy,sr,lg,ly,sg,5,15,10,5,25");
			listSignal.add("2,80,1,500,sy,sr,lg,ly,sg,5,30,10,5,30");
			listSignal.add("2,80,2,500,sy,sr,sg,ly,lg,5,30,30,5,10");
			listSignal.add("3,90,1,1000,sy,sr,lg,ly,sg,5,30,10,5,40");
			listSignal.add("3,90,2,1000,sy,sr,sg,ly,lg,5,30,40,5,10");
		}
		
		strResult="[";
		String[] arrID=id.split(",");
		for( int i=0;i<arrID.length;i++ ){
			strResult+="["+ listSignal.get(Integer.parseInt(arrID[i])*2-2) +"]";
			strResult+="["+ listSignal.get(Integer.parseInt(arrID[i])*2-1) +"]";
		}
		strResult+="]";
		
		return strResult;
	}
	
	public  String  GetDataSpaceAndTime(Connection conn,String id,String stDateTime)
	{
		String strResult = "";
		int nSecond=Integer.valueOf(stDateTime.substring(11,13))*3600+Integer.valueOf(stDateTime.substring(14,16))*60+
				Integer.valueOf(stDateTime.substring(17,19));
		
		if( listSignal.size()<1 ){
			listSignal.add("1,60,1,0,sy,sr,sg,ly,lg,5,15,25,5,10");
			listSignal.add("1,60,2,0,sy,sr,lg,ly,sg,5,15,10,5,25");
			listSignal.add("2,80,1,500,sy,sr,lg,ly,sg,5,30,10,5,30");
			listSignal.add("2,80,2,500,sy,sr,sg,ly,lg,5,30,30,5,10");
			listSignal.add("3,90,1,1000,sy,sr,lg,ly,sg,5,30,10,5,40");
			listSignal.add("3,90,2,1000,sy,sr,sg,ly,lg,5,30,40,5,10");
		}
		
		ArrayList<ArrayList<String>> listData = new ArrayList<ArrayList<String>>();
		
		int nI=0,le=0,nSum=0;
		String[] arrPa,arrPa0=null,arrID=id.split(",");
		for( int i=0;i<arrID.length;i++ ){
			for( int k=0;k<2;k++ ){
				ArrayList<String> attrlist = new ArrayList<String>();
				arrPa=listSignal.get(Integer.parseInt(arrID[i])*2-2+k).split(",");
				attrlist.add(arrPa[0]);attrlist.add(arrPa[2]);
				
				if( i==0 ){
					arrPa0=arrPa;
					le=nSecond%Integer.parseInt(arrPa[1]);
				}
				else
					le=(nSecond+(Integer.parseInt(arrPa[1])-Integer.parseInt(arrPa0[1])))%Integer.parseInt(arrPa[1]);
				
				nSum=0;
				nI=(arrPa.length-4)/2;
				for(int j=0;i<nI;j++){
					nSum+=Integer.parseInt(arrPa[4+nI+j]);
					if( le<=nSum ){
						attrlist.add("45");
						int ti=le-(nSum-Integer.parseInt(arrPa[4+nI+j]));
						attrlist.add(j+"");
						attrlist.add( (le-(nSum-Integer.parseInt(arrPa[4+nI+j])))+"" );
						listData.add(attrlist);
						break;
					}
				}
			}
		}
		
		//JSONObject jsobject = new JSONObject();
		//jsobject.element("entitys", listData );
		//strResult = jsobject.toString();
		strResult = listData.toString();
		return strResult;
	}
	
	//liuiang
	public  String  GetSection(Connection conn,String id)
	{
		String sql,strResult = "";
		
		ArrayList<ArrayList<String>> attrSectionList = new ArrayList<ArrayList<String>>();
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		try {
			st = conn.createStatement();
			sql= "select datatime,count from realtime_device_section where id="+id+" order by datatime";
			rs=st.executeQuery(sql); //执行数据查询
			
			while(rs.next()){
				 ArrayList<String> attr = new ArrayList<String>();
				 attr.add(rs.getString(1));
				 attr.add(rs.getString(2));

				 attrSectionList.add(attr);
			}
			
			rs.close();
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", attrSectionList );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public  String  GetSubway(Connection conn,String strParam)
	{
		String strResult="";
		String[] strP=strParam.split(",");
		if( strP[0].equals("1") ){
			strResult=GetSubwayVolumn(conn,strP[1],strP[2],strP[3]);
		}
		else if( strP[0].equals("2") )
			strResult=GetSubwayVertex(conn,strP[1],strP[2]);
		
		return strResult;
	}
	
	public  String  GetSubwayVolumn(Connection conn,String stDateTime,String edDateTime,String strID)
	{
		String sql,strResult = "";
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		String strStDate,strEdDate,strStTime,strEdTime;
		strStDate=stDateTime.substring(0,11)+"'"; 
		strEdDate=edDateTime.substring(0,11)+"'";
		strStTime=Integer.valueOf(stDateTime.substring(12,14))*60+Integer.valueOf(stDateTime.substring(15,17))+"";
		strEdTime=Integer.valueOf(edDateTime.substring(12,14))*60+Integer.valueOf(edDateTime.substring(15,17))+"";
		
		ArrayList<ArrayList<String>> listData = new ArrayList<ArrayList<String>>();
		
		String[] strCon={"",""};
		if( !strID.equals("-1") ){
			strCon[0]=" and from_node="+strID;strCon[1]=" and to_node="+strID;
		}
		
		try {
			st = conn.createStatement();
			sql= "select x.from_node,x.in,y.out from (select from_node,count(volumn) as in from sub_input_transit_demand where departure_time_in_min>="+
			strStTime+" and departure_time_in_min<"+strEdTime+strCon[0]+" group by from_node) x left join "+
			"(select to_node,count(volumn) as out from sub_input_transit_demand where arrival_time_in_min>="+strStTime+" and departure_time_in_min<"+strEdTime+
			strCon[1]+" group by to_node ) y on x.from_node=y.to_node order by x.from_node";
			rs=st.executeQuery(sql); //执行数据查询
			
			while(rs.next()){
				ArrayList<String> attr = new ArrayList<String>();
				attr.add(RoadNetDao.mapNode2InputLinkSub.get(rs.getString(1)));
				attr.add(rs.getString(1));
				if( rs.getString(2)==null )
					attr.add("0");
				else
					attr.add(rs.getString(2));
				
				if( rs.getString(3)==null )
					attr.add("0");
				else
					attr.add(rs.getString(3));
				
				listData.add(attr);
			}
			
			rs.close();
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listData );
		strResult = jsobject.toString();
		
		return strResult;
	}
	
	public  String  GetSubwayVertex(Connection conn,String stDateTime,String edDateTime)
	{
		String sql,strResult = "";
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		String strStDate,strEdDate,strStTime,strEdTime;
		strStDate=stDateTime.substring(0,11)+"'"; 
		strEdDate=edDateTime.substring(0,11)+"'";
		strStTime=Integer.valueOf(stDateTime.substring(12,14))*60+Integer.valueOf(stDateTime.substring(15,17))+"";
		strEdTime=Integer.valueOf(edDateTime.substring(12,14))*60+Integer.valueOf(edDateTime.substring(15,17))+"";
		
		String nKey;
		ArrayList<Integer> arrValues;
		ArrayList<ArrayList<String>> listDataVertex = new ArrayList<ArrayList<String>>();
		HashMap<String,ArrayList<Integer>>mapVertexIndex= new HashMap<String,ArrayList<Integer>>();
		
		int stopid=0;
		ArrayList<ArrayList<String>> arrLine = new ArrayList<ArrayList<String>>();
		ArrayList<ArrayList<ArrayList<String>>> arrDataVertex = new ArrayList<ArrayList<ArrayList<String>>>();
		
		try {
			st = conn.createStatement();
			sql="select stop_id,time,trip_id from sub_input_vertex order by trip_id desc,time";
			rs=st.executeQuery(sql); //执行数据查询
			while(rs.next()){
				ArrayList<String> attr = new ArrayList<String>();
				attr.add(rs.getString(1));attr.add((86400-rs.getInt(2))+"");attr.add(rs.getString(3));// 时间倒序
				listDataVertex.add(attr);
				
				int ab=rs.getInt(2);
				nKey="\""+rs.getInt(2)/60+"\"";
				if(!mapVertexIndex.containsKey(nKey)){
					arrValues=new ArrayList<Integer>();
					arrValues.add(listDataVertex.size()-1);
					mapVertexIndex.put(nKey, arrValues);
				}
				else{
					int nn,nT=rs.getInt(2);
					arrValues=mapVertexIndex.get(nKey);
					nn=Integer.valueOf(listDataVertex.get(arrValues.get(arrValues.size()-1)).get(1));
					if( nT > Integer.valueOf(listDataVertex.get(arrValues.get(arrValues.size()-1)).get(1)) )
						arrValues.add(listDataVertex.size()-1);
					else if( nT <= Integer.valueOf(listDataVertex.get(arrValues.get(0)).get(1)) )
						arrValues.add(0,listDataVertex.size()-1);
					else{
						for( int i=0;i<arrValues.size();i++ ){
							nn=Integer.valueOf(listDataVertex.get(arrValues.get(i)).get(1));
							if( nT <= Integer.valueOf(listDataVertex.get(arrValues.get(i)).get(1)) ){
								arrValues.add(i,listDataVertex.size()-1);
								break;
							}
						}
					}
				}
				
				/*ArrayList<String> attr = new ArrayList<String>();
				if( stopid!=rs.getInt(3) ){
					if( arrLine.size()>0 ){
						arrDataVertex.add(arrLine);
						arrLine = new ArrayList<ArrayList<String>>();
					}
					
					stopid=rs.getInt(3);
				}
				
				attr.add((rs.getInt(1)-1)+"");attr.add(rs.getInt(2)/60+"");attr.add(rs.getString(3));
				arrLine.add(attr);*/
				
			}
			rs.close();
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}
		//System.out.println(arrDataVertex);
		strResult="{\"dta\":"+listDataVertex.toString()+",";
		strResult += "\"ind\":"+mapVertexIndex.toString()+"}";
		strResult=strResult.replace("=",":");
		//strResult="{\"59\":[0, 6644],\"60\":[1,2]}";
		//arrDataVertex.clear();
		
		return strResult;
	}
}

