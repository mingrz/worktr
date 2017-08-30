package com.itsjn.dao;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
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

import java.sql.Connection;     //导入数据库连接对象
import java.sql.DriverManager;  //导入数据库驱动管理对象
import java.sql.ResultSet;      //导入数据记录集对象
import java.sql.SQLException;   //导入数据SQL操作异常对象
import java.sql.Statement;      //导入SQL操作接口对象

import java.util.Random;
import java.text.DecimalFormat;

public class NetIndexDao {
	
	public static ArrayList<ArrayList<String>> 	listRoadNetFeature    = new ArrayList<ArrayList<String>>();
	public static HashMap<String,ArrayList<Float>> 	   	mapInputLink     	  = new HashMap<String,ArrayList<Float>>();
	public static DecimalFormat decimalFormat=new DecimalFormat("##0.00");
	public static DecimalFormat decimalFormat1=new DecimalFormat("##0");

	/**路网拥堵路段的指数(与每条路的拥堵状态区别)
	 * 
	 * @return
	 */
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
			
			attrlist.add(decimalFormat.format(index));

		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}

		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", attrlist );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public  String  GetOCS(Connection conn,String stDateTime,String edDateTime,int nType)
	{
		String strResult = "";
		String sql;
		String strStDate,strEdDate,strStTime,strEdTime;
		strStDate=stDateTime.substring(0,11)+"'";
		strEdDate=edDateTime.substring(0,11)+"'";
		strStTime=Integer.valueOf(stDateTime.substring(12,14))*60+Integer.valueOf(stDateTime.substring(15,17))+"";
		strEdTime=Integer.valueOf(edDateTime.substring(12,14))*60+Integer.valueOf(edDateTime.substring(15,17))+"";
		
		ArrayList<ArrayList<String>> listData     = new ArrayList<ArrayList<String>>();
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		String[] timeArray ={"60","240","1200","10800"};

		try {
			st = conn.createStatement();
			sql ="select b.tt,b.sec,a.name,a.from_node_id,a.to_node_id,a.length*1000,number_of_lanes,speed_limit,lane_capacity_in_vhc_per_hour,link_type_name,b.sp,lane_capacity_in_vhc_per_hour*1.21,0,0 from input_link a,"+
			"(select sec,count(*) as tt,avg(speed) as sp from output_sectdmoe where timestamp_in_min>="+strStTime+" and timestamp_in_min<"+strEdTime+" and day_no>="+strStDate+" and day_no<="+strEdDate+" and state<=1 group by sec) b"+
			" where a.sec=b.sec and tt>"+timeArray[nType-1]+
			" and a.length=(select max(d.length) from input_link d where d.sec=b.sec ) order by b.sec";
			
			rs=st.executeQuery(sql); //执行数据查询

			while(rs.next()){
				ArrayList<String> attrlist = new ArrayList<String>();
				for( int i=2;i<=14;i++ ){
					if( i==6 || i==11 || i==12 )
						attrlist.add(decimalFormat1.format(rs.getFloat(i)));
					else{
						String str=rs.getString(i);
						if( rs.getString(i)==null)
							attrlist.add("");
						else
							attrlist.add(rs.getString(i));
					}
				}
				
				listData.add(attrlist);
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

	public  String  GetTPI(Connection conn,String id,String stDateTime,String edDateTime,String strType)
	{
		String strResult = "";
		String sql;
		
		ArrayList<ArrayList<String>> listData     = new ArrayList<ArrayList<String>>();
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		int max=10,min=7;
		Random random = new Random();
		
		String strTable="";
		if( strType=="rea" )
			strTable="output_congestion_index";
		else if( strType=="sim" )
			strTable="sim_congestion_index";

		try {
			st = conn.createStatement();
			sql ="select id,to_char(datatime,'YYYY-MM-DD HH24:MI:SS'),ratio,index,state from "+strTable+" where datatime>="+
			stDateTime+" and datatime<"+edDateTime+" and id="+id+" order by id,datatime";
			//if( nType==0 )
			//	sql=sql.replace("id>0", "id=0");
			
			rs=st.executeQuery(sql); //执行数据查询

			while(rs.next()){
				ArrayList<String> attrlist = new ArrayList<String>();
				attrlist.add(rs.getString(2));
				attrlist.add(decimalFormat.format(rs.getFloat(4)));
				
				listData.add(attrlist);
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
	
	public  String  GetTCR(Connection conn,String id,String stDateTime,String edDateTime,String strType)
	{
		String strResult = "";
		String sql;
		
		ArrayList<ArrayList<String>> listData     = new ArrayList<ArrayList<String>>();
		//ArrayList<String> attrlistY = new ArrayList<String>();
		
		//int[] ratioArray ={0,4,8,11,14,24};
		//int[] indexArray ={0,2,4,6,8,10};
		Double vktAll=0.0,vkt=0.0,Rate=0.0;
		
		HashMap<String , Double> mapVKTAll = new HashMap<String , Double>();
		HashMap<String , Double> mapVKT    = new HashMap<String , Double>();

		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		int max=20,min=10;
		Random random = new Random();
		
		String strTable="";
		if( strType=="rea" )
			strTable="output_congestion_index";
		else if( strType=="sim" )
			strTable="sim_congestion_index";//sim_sectdmoe

		try {
			st = conn.createStatement();
			sql ="select id,to_char(datatime,'YYYY-MM-DD HH24:MI:SS') as timestamp, sum(index) from "+strTable+" where datatime>="+
			stDateTime+" and datatime<"+edDateTime+" and id="+id+" group by id,timestamp order by id,timestamp";
			rs=st.executeQuery(sql); //执行数据查询

			while(rs.next()){
				mapVKTAll.put(rs.getString(2), rs.getDouble(3));
			}
			rs.close();

			//sql ="select id,to_char(datatime,'YYYY-MM-DD HH24:MI:SS') as timestamp, sum(index) from output_congestion_index where datatime>="+
			//stDateTime+" and datatime<"+edDateTime+" and id>0 and state<=1 and id="+id+" group by id,timestamp order by id,timestamp";
			sql ="select to_char(datatime,'YYYY-MM-DD HH24:MI:SS') as timestamp, sum(index) from "+strTable+" where datatime>="+
			stDateTime+" and datatime<"+edDateTime+" and id>0 and state<=4 group by timestamp order by timestamp";
			rs=st.executeQuery(sql); //执行数据查询

			while(rs.next()){
				//mapVKT.put(rs.getString(2), rs.getDouble(3));
				ArrayList<String> attrlist = new ArrayList<String>();
				String key = rs.getString(1);
				attrlist.add(key);
				
				if(mapVKTAll.containsKey(key)){
					if( mapVKTAll.get(key) > 0 ){
						Rate=mapVKTAll.get(key)*100/rs.getDouble(2);
						//System.out.println(rs.getDouble(2)+","+mapVKTAll.get(key)+","+Rate);
					}
					else
						Rate=0.0;
				}
				else
					Rate=0.0;
				
				attrlist.add(decimalFormat.format(Rate));
				//int s = random.nextInt(max)%(max-min+1) + min;
				//attrlist.add(s+"");
				listData.add(attrlist);
			}
			rs.close(); //关闭数据记录集		
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}

		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listData );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public  String  GetCKR(Connection conn,String id,String stDateTime,String edDateTime,String strType)
	{
		String sql,strResult = "";
		
		ArrayList<ArrayList<String>> listData     = new ArrayList<ArrayList<String>>();
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		int max=20,min=10;
		Random random = new Random();
		
		String strTable="";
		if( strType=="rea" )
			strTable="output_congestion_index";
		else if( strType=="sim" )
			strTable="sim_congestion_index";
		
		try {
			st = conn.createStatement();
			sql= "select to_char(datatime,'YYYY-MM-DD HH24:MI:SS') as timestamp,ratio,index,state from "+strTable+" where datatime>="+
			stDateTime+" and datatime<"+edDateTime+" and id="+id+" order by timestamp";
			rs=st.executeQuery(sql); //执行数据查询
			
			while(rs.next()){
				ArrayList<String> attrlist = new ArrayList<String>();
				attrlist.add(rs.getString(1));
				attrlist.add(decimalFormat.format(rs.getFloat(2)));
				
				//int s = random.nextInt(max)%(max-min+1) + min;
				//attrlist.add(s+"");
				
				listData.add(attrlist);
			}
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listData );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public  String  GetCKT(Connection conn,String id,String stDateTime,String edDateTime, String strType)
	{
		String str,sql,strResult = "";
		ArrayList<ArrayList<String>> listData     = new ArrayList<ArrayList<String>>();
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		int max=20,min=10;
		Random random = new Random();
		
		String strTable="";
		if( strType=="rea" )
			strTable="output_congestion_index";
		else if( strType=="sim" )
			strTable="sim_congestion_index";
		
		try {
			st = conn.createStatement();
			sql= "select to_char(datatime,'YYYY-MM-DD HH24:MI:SS') as timestamp,ckt,ratio,index,state from "+strTable+" where datatime>="+
			stDateTime+" and datatime<"+edDateTime+" and id="+id+" order by timestamp";
			rs=st.executeQuery(sql); //执行数据查询
			
			while(rs.next()){
				ArrayList<String> attrlist = new ArrayList<String>();

				attrlist.add(rs.getString(1));
				attrlist.add(rs.getString(2));
				
				//int s = random.nextInt(max)%(max-min+1) + min;
				//attrlist.add(s+"");
				
				listData.add(attrlist);
			}
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listData );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public  String  GetStatistics(Connection conn,String id,String stDateTime,String edDateTime,String strType)
	{
		String sql,strResult = "";
		String strStDate,strEdDate,strStTime,strEdTime;
		strStDate=stDateTime.substring(0,11)+"'";
		strEdDate=edDateTime.substring(0,11)+"'";
		strStTime=Integer.valueOf(stDateTime.substring(12,14))*60+Integer.valueOf(stDateTime.substring(15,17))+"";
		strEdTime=Integer.valueOf(edDateTime.substring(12,14))*60+Integer.valueOf(edDateTime.substring(15,17))+"";
		
		String vkt="0",tpi="0",ckt="0",tcr="0";
		
		ArrayList<String> attrlist = new ArrayList<String>();
		
		String strTable="";
		if( strType=="rea" )
			strTable="output_congestion_index";
		else if( strType=="sim" )
			strTable="sim_congestion_index";
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		try {
			st = conn.createStatement();
			/*sql ="select sum(c.link_out_volume_number_of_veh*c.length) from gis_taz a,input_link b,output_sectdmoe c where ST_Intersects(a.geo,b.geo) and b.sec=c.sec "+
			"and timestamp_in_min>="+strStTime+" and timestamp_in_min<"+strEdTime+" and a.id="+id+" and day_no>="+strStDate+" and day_no<"+strEdDate;
			System.out.println(id+"1");
			rs=st.executeQuery(sql); //执行数据查询
			System.out.println(id+"2");
			
			while(rs.next()){
				vkt=rs.getString(1);
			}*/
			
			sql="select id,count(*)*15,avg(index),avg(ratio) from "+strTable+" where  datatime>="+stDateTime+"and  datatime<"+edDateTime+
			" and id="+id+" and state<=1 group by id";
			rs=st.executeQuery(sql); //执行数据查询
			
			while(rs.next()){
				ckt=decimalFormat.format(rs.getFloat(2));
				tpi=decimalFormat.format(rs.getFloat(3));
				tcr=decimalFormat.format(rs.getFloat(4));
			}
			rs.close(); //关闭数据记录集
			System.out.println(id+"3");
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		//attrlist.add(vkt);
		attrlist.add(tpi);
		attrlist.add(tcr);
		attrlist.add(ckt);
			
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", attrlist );
		strResult = jsobject.toString();
		System.out.println(strResult);
		return strResult;
	}
	
	public String GetInputLink(Connection conn)
	{
		String sql,strResult = "";
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		ArrayList<Float> arrMaxs=new ArrayList<Float>();
		ArrayList<Float> arrValues=new ArrayList<Float>();
		
		float len=0;int sec=0;
		
		try {
			st = conn.createStatement();
			if( mapInputLink.size()<1 ){
				sql ="select distinct(sec),linkid,lane_capacity_in_vhc_per_hour,length,speed_limit from input_link a where sec>0 order by sec";
				rs=st.executeQuery(sql); //执行数据查询

				while(rs.next()){
					if( sec==0 || sec!=rs.getInt(1) ){
						if( arrMaxs.size()>0 ){
							arrValues.add(arrMaxs.get(0));
							arrValues.add(arrMaxs.get(1));
							mapInputLink.put(sec+"", arrValues);
						}
						
						arrValues=new ArrayList<Float>();
						sec=rs.getInt(1);
						len=0;
					}
					
					arrValues.add(rs.getFloat(2));
					
					if( len<rs.getFloat(4) ){
						arrMaxs.clear();
						len=rs.getFloat(4);
						arrMaxs.add(rs.getFloat(3));
						arrMaxs.add(rs.getFloat(5));
						
					}
					
				}
				
				rs.close(); //关闭数据记录集
			}
			
		}catch (SQLException e) {
					System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		return strResult;
	}
	
	public  String  GetServiceEvaluation(Connection conn,String stDateTime,String edDateTime,String strType)
	{
		System.out.println( stDateTime );
		
		String sql,strResult = "";
		String strStDate,strEdDate,strStTime,strEdTime;
		strStDate=stDateTime.substring(0,11)+"'";
		strEdDate=edDateTime.substring(0,11)+"'";
		strStTime=Integer.valueOf(stDateTime.substring(12,14))*60+Integer.valueOf(stDateTime.substring(15,17))+"";
		strEdTime=Integer.valueOf(edDateTime.substring(12,14))*60+Integer.valueOf(edDateTime.substring(15,17))+"";
		
		ArrayList<ArrayList<String>> listData     = new ArrayList<ArrayList<String>>();
		HashMap<String , ArrayList<Float>> mapPCU = new HashMap<String , ArrayList<Float>>();
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		GetInputLink(conn);

		try {
			st = conn.createStatement();
			
			sql ="select sec,avg(speed),sum(link_out_volume_number_of_veh),max(length),avg(density_in_veh_per_distance_per_lane) from output_sectdmoe "+
			"where timestamp_in_min>="+strStTime+" and timestamp_in_min<"+strEdTime+" and day_no>="+strStDate+" and day_no<="+strEdDate+" group by sec";
			rs=st.executeQuery(sql); //执行数据查询

			while(rs.next()){
				ArrayList<Float> attr = new ArrayList<Float>();
				attr.add(rs.getFloat(2));attr.add(rs.getFloat(3));attr.add(rs.getFloat(4));attr.add(rs.getFloat(5));
				mapPCU.put(rs.getString(1), attr);
			}
			
			rs.close(); //关闭数据记录集
			
			String state="4";
			float pcu=0,vc=0,vo=0;
			Iterator itAll = mapPCU.keySet().iterator();
			while(itAll.hasNext()) {
				String key = (String)itAll.next();
				
				if(mapInputLink.containsKey(key)){
					int nSize=mapInputLink.get(key).size();
					//pcu=mapPCU.get(key).get(1)*100/mapPCU.get(key).get(0);
					pcu=mapPCU.get(key).get(3);
					vo=mapInputLink.get(key).get(nSize-2);
					vc=mapPCU.get(key).get(1).floatValue()/vo;
					
					for( int i=0;i<nSize-2;i++ ){
						ArrayList<String> attrlist = new ArrayList<String>();
						int linkid=(int)mapInputLink.get(key).get(i).floatValue();
						attrlist.add(linkid+"");

						if( strType.equals( "4" ) || strType.equals( "5" ) ){
							state=getStateByVIC(vc,mapInputLink.get(key).get(nSize-1));
						}
						else if( strType.equals( "6" ) ){
							//车流密度=单车道小时流量/速度
							vc=pcu;
							state=getStateByTVD(vc,mapInputLink.get(key).get(nSize-1));
						}
						else if( strType.equals( "7" ) ){
							vc=mapPCU.get(key).get(0);
							state=getStateBySpeed(vc,mapInputLink.get(key).get(nSize-1));
						}

						attrlist.add(state);
						attrlist.add(decimalFormat.format(vc));
						//attrlist.add(vc+"");
						listData.add(attrlist);
					}
				}
			}

		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listData );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public String getStateByVIC(float vc,float le)
	{
		String state="4";
		
		if( le>=100 ){
			if( vc<=0.4  )
				state="4";
			else if( vc>0.4 && vc<=0.69  )
				state="3";
			else if( vc>0.69 && vc<=0.91  )
				state="2";
			else if( vc>0.91 && vc<=1  )
				state="1";
			else if( vc>1  )
				state="0";
		}
		else if( le>=80 && le<100 ){
			if( vc<=0.34  )
				state="4";
			else if( vc>0.34 && vc<=0.61  )
				state="3";
			else if( vc>0.61 && vc<=0.83  )
				state="2";
			else if( vc>0.83 && vc<=1  )
				state="1";
			else if( vc>1  )
				state="0";
		}
		else if( le<80 ){
			if( vc<=0.3  )
				state="4";
			else if( vc>0.3 && vc<=0.55  )
				state="3";
			else if( vc>0.55 && vc<=0.77  )
				state="2";
			else if( vc>0.77 && vc<=1  )
				state="1";
			else if( vc>1  )
				state="0";
		}
		
		return state;
	}
	
	public String getStateByTVD(float vc,float le)
	{
		String state="4";
		
		if( le>=100 ){
			if( vc<=10  )
				state="4";
			else if( vc>10 && vc<=20  )
				state="3";
			else if( vc>20 && vc<=32  )
				state="2";
			else if( vc>32 && vc<=42  )
				state="1";
			else if( vc>42  )
				state="0";
		}
		else if( le>=80 && le<100 ){
			if( vc<=10  )
				state="4";
			else if( vc>10 && vc<=20  )
				state="3";
			else if( vc>20 && vc<=32  )
				state="2";
			else if( vc>32 && vc<=50  )
				state="1";
			else if( vc>50  )
				state="0";
		}
		else if( le<80 ){
			if( vc<=10  )
				state="4";
			else if( vc>10 && vc<=20  )
				state="3";
			else if( vc>20 && vc<=32  )
				state="2";
			else if( vc>32 && vc<=57  )
				state="1";
			else if( vc>57  )
				state="0";
		}
		
		return state;
	}
	
	public String getStateBySpeed(float vc,float le)
	{
		String state="4";
		
		if( le>=100 ){
			if( vc<=53  )
				state="0";
			else if( vc>53 && vc<=62  )
				state="1";
			else if( vc>62 && vc<=76  )
				state="2";
			else if( vc>76 && vc<=88  )
				state="3";
			else if( vc>88  )
				state="4";
		}
		else if( le>=80 && le<100 ){
			if( vc<=40  )
				state="0";
			else if( vc>40 && vc<=55  )
				state="1";
			else if( vc>55 && vc<=64  )
				state="2";
			else if( vc>64 && vc<=72  )
				state="3";
			else if( vc>72  )
				state="4";
		}
		else if( le<80 ){
			if( vc<=30  )
				state="0";
			else if( vc>30 && vc<=44  )
				state="1";
			else if( vc>44 && vc<=50  )
				state="2";
			else if( vc>50 && vc<=55  )
				state="3";
			else if( vc>55  )
				state="4";
		}
		
		return state;
	}
	
	public String GetInputDemand(Connection conn,String strDateTime,String id)
	{
		String str,sql,strResult = "";
		ArrayList<ArrayList<String>> listData = new ArrayList<ArrayList<String>>();
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		try {
			st = conn.createStatement();
			sql ="select from_zone,to_zone,number_of_trips_demand_type from input_demand where datatime="+strDateTime;
			if( !id.equals("-1") )
				sql +=" and from_zone="+id;
			
			rs=st.executeQuery(sql); //执行数据查询
			
			while(rs.next()){
				ArrayList<String> list = new ArrayList<String>();
				for(int i=1;i<=3;i++)
					list.add(rs.getString(i));
				
				listData.add(list);
			}
			
			rs.close(); //关闭数据记录集
			
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listData );
		strResult = jsobject.toString();
		
		return strResult;
	}
}
