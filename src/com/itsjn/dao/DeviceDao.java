package com.itsjn.dao;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.text.DecimalFormat;
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

import java.sql.Connection;     //导入数据库连接对象
import java.sql.DriverManager;  //导入数据库驱动管理对象
import java.sql.ResultSet;      //导入数据记录集对象
import java.sql.SQLException;   //导入数据SQL操作异常对象
import java.sql.Statement;      //导入SQL操作接口对象

public class DeviceDao {

	public static ArrayList<ArrayList<String>> listRoadNetFeature     = new ArrayList<ArrayList<String>>();
	public static DecimalFormat decimalFormat=new DecimalFormat("##0.00");
	/**
	 * ,Integer type,Integer id
	 * @return
	 */
	public  String  GetFeature(Connection conn,String strTable)
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		String strGeo="";
		ArrayList<ArrayList<String>> listFeature = new ArrayList<ArrayList<String>>();
		
		int nNum=2;
		String strField="";
		strField="device_id,";
		if( strTable.equals("input_device_environment_attr") ){
			nNum=4;
			strField="device_id,stationid,name,";
		}
		else if( strTable.equals("input_device_weather_attr") ){
			nNum=4;
			strField="device_id,link_id,name,";
		}
		else if( strTable.equals("traffic_induction") ){
			nNum=5;
			strField="device_id,areaid,name,zoneids,";
		}
		else if( strTable.equals("input_activity_location") ){
			nNum=3;
			strField="zone_id,node_id,";
		}
		
		try {
			st = conn.createStatement();
			sql ="select "+strField+"ST_AsText(geo) from " +strTable;
			rs=st.executeQuery(sql);
			
			 while(rs.next()){
				 ArrayList<String> attrlist = new ArrayList<String>();
				 for( int i=1;i<=nNum;i++ ){
					 if( i<=nNum-1 )
						 attrlist.add(rs.getString(i));
					 else{
						 strGeo=rs.getString(i);
						 
						 if( strTable.equals("traffic_induction") ){
							 /*String strLine;
							 String[] strPoint;
							 int indexSt=0,indexEd=0;
							 strGeo=strGeo.replace("POLYGON((", "");
						    	strGeo=strGeo.replace("))", "");
						    	
						    	while( ( indexEd=strGeo.indexOf(",",indexSt) )>0){
						    		strLine=strGeo.substring(indexSt, indexEd);
						    		strPoint=strLine.split(" ");
							    	attrlist.add(strPoint[0]);
							    	attrlist.add(strPoint[1]);
							    	
							    	indexSt=indexEd+1;
						    	}
						    	
						    	strLine=strGeo.substring(indexSt, strGeo.length());
					    		strPoint=strLine.split(" ");
						    	attrlist.add(strPoint[0]);
						    	attrlist.add(strPoint[1]);*/
						 }
						 else{
							 strGeo=strGeo.replace("POINT(", "");
							 strGeo=strGeo.replace(")", "");
							 //strGeo=strGeo.replace(" ", ",");
							 attrlist.add(strGeo);
						 }
					 }
				 }
				 
				 listFeature.add(attrlist);
			 }
		} catch (SQLException e) {
		     System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listFeature );
		strResult = jsobject.toString();
		
		return strResult;
	}
	
	
	public  String  GetAttribute(Connection conn,String id,String strTable)
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		int nNum=0;
		ArrayList<String> attrlist = new ArrayList<String>();
		
		String strField="";
		if( strTable.equals("input_device_signal_attr") ){
			nNum=21;
			strField="device_id,name,froadname,sroadname,manufacturer,productmodel,control_type,fphase,sphase,froadphase,sroadphase," +
			"detectortype,control_model,prioritycontrol,commtype,localip,targetip,port,link_id,period,phase from ";
		}
		else if( strTable.equals("input_device_camera_attr") ){
			nNum=5;
			strField="device_id,name,manufacturer,device_type,link_id from ";
		}
		else if( strTable.equals("input_device_cross_attr") ){
			nNum=7;
			strField="device_id,node_id,name,device_type,link_id[1],link_id[2],direction from ";
		}
		else if( strTable.equals("input_device_screen_attr") ){
			nNum=5;
			strField="device_id,name,manufacturer,device_type,link_id from ";
		}
		else if( strTable.equals("input_device_section_attr") ){
			nNum=4;
			strField="device_id,name,device_type,link_id from ";
		}
		else if( strTable.equals("input_device_weather_attr") ){
			nNum=6;
			strField="device_id,link_id,pileno,name,manufacturer,device_type from ";
		}
		else if( strTable.equals("input_device_environment_attr") ){
			nNum=6;
			strField="device_id,stationid,name,link_id,manufacturer,device_type from ";
		}
		else if( strTable.equals("input_device_traveltime_attr") ){
			nNum=4;
			strField="device_id,name,device_type,link_id from ";
		}
		else if( strTable.equals("traffic_induction") ){
			nNum=10;
			strField="device_id,areaid,name,period,times,usernum,ration,state,remark,zoneids from ";
		}
		else if( strTable.equals("input_node") ){
			nNum=4;
			strField="node_id,name,control_type,cycle_length_in_second from ";
		}
		else if( strTable.equals("input_link") ){
			nNum=15;
			//strField="linkid,name,link_type_name,from_node_id,to_node_id,direction,length,number_of_lanes,speed_limit,lane_capacity_in_vhc_per_hour,jam_density,number_of_left_turn_lanes,length_of_left_turn_lanes,number_of_right_turn_lanes,length_of_right_turn_lanes from ";
			strField="linkid,from_node_id,to_node_id,length,name,link_type_name,direction,1,number_of_lanes,speed_limit,lane_capacity_in_vhc_per_hour,jam_density,12 from ";
		}
		else if( strTable.equals("sub_input_stop") ){
			nNum=3;
			strField="stop_id,original_stop_id,name from ";
		}
		
		try {
			st = conn.createStatement();
			if( strTable.equals("input_link") )
				sql ="select "+strField+strTable+" where linkid="+id;
			else if( strTable.equals("input_node") )
				sql ="select "+strField+strTable+" where node_id="+id;
			else if( strTable.equals("sub_input_stop") )
				sql ="select "+strField+strTable+" where stop_id="+id;
			else
				sql ="select "+strField+strTable+" where device_id="+id;
			
			rs=st.executeQuery(sql);
			 while(rs.next()){
				 for( int i=1;i<=nNum;i++ )
					 attrlist.add(rs.getString(i));
			 }
			
		} catch (SQLException e) {
		     System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", attrlist );
		strResult = jsobject.toString();
		
		return strResult;
	}
	public  String  GetSingnalInfo()
	{
		String strResult = "";
		return strResult;
	}
	public  String  GetSingnalData()
	{
		String strResult = "";
		return strResult;
	}
	public  String  GetSingnalPhaseMap(Connection conn,String id)
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		ArrayList<ArrayList<String>> listAllData = new ArrayList<ArrayList<String>>();
		
		try {
			sql="select * from signal_phase_map where device_id="+id+" order by phase_id";
			st = conn.createStatement();
			rs=st.executeQuery(sql);
			
			while(rs.next()){
				ArrayList<String> listLineData = new ArrayList<String>();
				for( int i=1;i<=13;i++ )
					listLineData.add(rs.getString(i));
				
				listAllData.add(listLineData);
			}
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listAllData );
		strResult = jsobject.toString();
		
		return strResult;
	}
	
	public  String  GetSingnalCoordnation(Connection conn)
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		String strGroup="",strSignal="";
		int nID=0,nType=0;
		ArrayList<String> listFeature = new ArrayList<String>();
		
		int[] arrFlag = {0,0,0};// 信号机编号、分组编号、类型
		
		try {
			st = conn.createStatement();
			sql ="select id,b.name,groupid,groupname,subname,type,device_id,a.name from input_device_signal_attr a,signal_coordnation b ";
			sql+="where a.device_id = any(b.signalids) and array_length(b.signalids,1)>0 order by id,groupid,type,device_id";
			rs=st.executeQuery(sql);
			
			 while(rs.next()){
				 if( arrFlag[0]!=rs.getInt(1) || arrFlag[1]!=rs.getInt(3) || arrFlag[2]!=rs.getInt(6) ){
					 arrFlag[0]=rs.getInt(1);arrFlag[1]=rs.getInt(3);arrFlag[2]=rs.getInt(6);
					 
					 if( strSignal.length()>0 ){
						 strSignal=strSignal.substring(0,strSignal.length()-1);
						 listFeature.add(strSignal);
						 strSignal="";
					}
					 
					 strGroup=rs.getString(3)+","+rs.getString(4)+","+rs.getString(5)+","+rs.getString(6);
					 listFeature.add(rs.getString(1));listFeature.add(rs.getString(2));
					 listFeature.add(strGroup);
				 }
					 
				 strSignal+=rs.getString(7)+","+rs.getString(8)+",";
			 }
		} catch (SQLException e) {
		     System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		if( strSignal.length()>0 ){
			 strSignal=strSignal.substring(0,strSignal.length()-1);
			 listFeature.add(strSignal);
			 strSignal="";
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listFeature );
		strResult = jsobject.toString();
		
		return strResult;
	}
	public  String  EditSignalAttribute(Connection conn,String strAction,String strValue,String strTable,
			boolean bMultLine,boolean bExitsGeometry)
	{
		String strResult = "";
		
		if( strAction.equals("delete") ){
			strResult=DeleteSingnal(conn,strValue,strTable);
		}
		else
			strResult=InsertSignal(conn,strValue,strTable,bMultLine,bExitsGeometry);
		
		return strResult;
	}
	
	public  String  InsertSignal(Connection conn,String strValue,String strTable,boolean bMultLine,boolean bExitsGeometry)
	{
		String strResult = "";
		String sql,sqlInsert;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		int nCount=0;
		String [] arrValue=new String[]{};
		String [] arrLine=new String[]{};
		String strConstraint="",strUpdate="";
		
		int nLine=1;
		if( bMultLine ){
			arrLine=strValue.split("]");
			nLine=arrLine.length;
		}
		else{
			arrValue=strValue.split(";");
			if( arrValue.length<1 )
				nLine=0;
		}
		
		if( strTable.equals("signal_phase_map")) strConstraint="pk_signal_phase_map";
		else if( strTable.equals("signal_coordnation")) strConstraint="pk_signal_coordnation";
		else if( strTable.equals("input_device_camera_attr")) strConstraint="pk_input_device_camera_attr";
		else if( strTable.equals("input_device_cross_attr")) strConstraint="pk_input_device_cross_attr";
		else if( strTable.equals("input_device_environment_attr")) strConstraint="pk_input_device_environment_attr";
		else if( strTable.equals("input_device_screen_attr")) strConstraint="pk_input_device_screen_attr";
		else if( strTable.equals("input_device_section_attr")) strConstraint="pk_input_device_section_attr";
		else if( strTable.equals("input_device_signal_attr")) strConstraint="pk_input_device_signal_attr";
		else if( strTable.equals("input_device_traveltime_attr")) strConstraint="pk_input_device_traveltime_attr";
		else if( strTable.equals("input_device_weather_attr")) strConstraint="pk_input_device_weather_attr";
		else if( strTable.equals("scenario_attr")) strConstraint="pk_scenario_attr";
		else if( strTable.equals("man_material_info")) strConstraint="pk_man_material_info";
		else if( strTable.equals("man_person_info")) strConstraint="pk_man_person_info";
		else if( strTable.equals("man_vechicle_info")) strConstraint="pk_man_vechicle_info";
		else if( strTable.equals("traffic_induction")) strConstraint="pk_traffic_induction";
		else if( strTable.equals("sub_input_stop")) strConstraint="pk_sub_input_stop";
		try {
			st = conn.createStatement();
			
			for( int m=0;m<nLine; m++ ){
				sql="insert into "+ strTable + " values(";
				if( bMultLine )
					arrValue=arrLine[m].split(";");
				
				for( int n=0;n<arrValue.length;n++ ){
					if( n==arrValue.length-1 ){
						if( bExitsGeometry )
							sql+="ST_Transform(ST_GeomFromText('point("+arrValue[n]+")',900913),4326)";
						else
							sql+=arrValue[n];
					}
					else
						sql+=arrValue[n]+",";
				}
				
				if( strTable.equals("signal_phase_map") )
					//strUpdate="set (ids,ans,pos)=("+arrValue[2]+","+arrValue[3]+","+arrValue[4]+")";
					strUpdate="set (ids,ans,pos,period,yellow,green,off,up_node_id,dest_node_id,node_id,flow)=("+arrValue[2]+","+arrValue[3]+","+arrValue[4]+","+
					arrValue[5]+","+arrValue[6]+","+arrValue[7]+","+arrValue[8]+","+arrValue[9]+","+arrValue[10]+","+arrValue[11]+","+arrValue[12]+")";
				else if( strTable.equals("signal_coordnation"))
					strUpdate="set (name,groupname,subname,signalids)=("+arrValue[1]+","+arrValue[3]+","+arrValue[4]+","+arrValue[6]+")";
				else if( strTable.equals("input_device_camera_attr"))
					strUpdate="set (name,manufacturer,device_type,link_id)=("+arrValue[1]+","+arrValue[2]+","+arrValue[3]+","+arrValue[4]+")";	
				else if( strTable.equals("input_device_cross_attr"))
					strUpdate="set (node_id,name,device_type,link_id,direction,signal_phase)=("+arrValue[1]+","+arrValue[2]+","+arrValue[3]+","+arrValue[4]+","+arrValue[5]+","+arrValue[6]+")";	
				else if( strTable.equals("input_device_environment_attr"))
					strUpdate="set (stationid,name,link_id,manufacturer,device_type)=("+arrValue[1]+","+arrValue[2]+","+arrValue[3]+","+arrValue[4]+","+arrValue[5]+")";
				else if( strTable.equals("input_device_screen_attr"))
					strUpdate="set (name,manufacturer,device_type,link_id)=("+arrValue[1]+","+arrValue[2]+","+arrValue[3]+","+arrValue[4]+")";					
				else if( strTable.equals("input_device_section_attr"))
					strUpdate="set (name,device_type,link_id)=("+arrValue[1]+","+arrValue[2]+","+arrValue[3]+")";
				else if( strTable.equals("input_device_signal_attr")){
					strUpdate="set (name,froadname,sroadname,manufacturer,productmodel,control_type,fphase,sphase,froadphase,sroadphase,detectortype,control_model,prioritycontrol,commtype,localip,targetip,port)=(";
					for(int i=1;i<=17;i++)	
						strUpdate+=arrValue[i]+",";
					strUpdate=strUpdate.substring(0,strUpdate.length()-1)+")";
				}
				else if( strTable.equals("input_device_traveltime_attr"))
					strUpdate="set (name,device_type,link_id)=("+arrValue[1]+","+arrValue[2]+","+arrValue[3]+")";
				else if( strTable.equals("input_device_weather_attr"))
					strUpdate="set (link_id,pileno,name,manufacturer,device_type)=("+arrValue[1]+","+arrValue[2]+","+arrValue[3]+","+arrValue[4]+","+arrValue[5]+")";
				
				else if( strTable.equals("scenario_attr"))
					strUpdate="set (link_id,name,sttime,edtime,capacity,speed_limit,demand,signal_peirod,signal_filter,link_toll,state,reamark)=("+
					arrValue[1]+","+arrValue[3]+","+arrValue[4]+","+arrValue[5]+","+arrValue[6]+","+arrValue[7]+","+arrValue[8]+","+arrValue[9]+","+
					arrValue[10]+","+arrValue[11]+","+arrValue[12]+","+arrValue[13]+")";
				
				else if( strTable.equals("man_material_info"))
					strUpdate="set (name,number,intime)=("+arrValue[2]+","+arrValue[3]+","+arrValue[4]+")";
				else if( strTable.equals("man_person_info"))
					strUpdate="set (department,name,district,sttime,edtime,state)=("+arrValue[1]+","+arrValue[2]+","+arrValue[3]+","+arrValue[4]+","+arrValue[5]+","+arrValue[6]+")";
				else if( strTable.equals("man_vechicle_info"))
					strUpdate="set (department,number,sttime,edtime,priority,state)=("+arrValue[1]+","+arrValue[3]+","+arrValue[4]+","+arrValue[5]+","+arrValue[6]+","+arrValue[7]+")";
				else if( strTable.equals("traffic_induction"))
					strUpdate="set (areaid,name,period,times,usernum,ration,state,remark,zoneids)=("+arrValue[1]+","+arrValue[2]+","+arrValue[3]+","+arrValue[4]+","+arrValue[5]+","+arrValue[6]+","+arrValue[7]+","+arrValue[8]+","+arrValue[9]+")";
				else if( strTable.equals("sub_input_stop"))
					strUpdate="set (stop_id,original_stop_id,lat,lon,name)=("+arrValue[0]+","+arrValue[1]+","+arrValue[2]+","+arrValue[3]+","+arrValue[4]+")";

				sql+=") ON CONFLICT ON CONSTRAINT "+ strConstraint +" do update "+strUpdate;
				System.out.println(sql);
				nCount=st.executeUpdate(sql);
			}
			
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}

		if( nCount>0 )
			strResult=Integer.toString(nCount);
		 else
			 strResult="ERROR";
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", strResult );
		strResult = jsobject.toString();
		
		return strResult;
	}
	
	public  String  DeleteSingnal(Connection conn,String strValue,String strTable)
	{
		// 需要字段名称+值 作为条件
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象

		int nCount=0;
		
		String [] arrValue=strValue.split(",");
		try {
			st = conn.createStatement();
			sql="delete from "+strTable+" where ";
			
				for(int i=0;i<arrValue.length;i+=2){
					sql+= arrValue[i]+"="+arrValue[i+1]+" and ";
				}
				
			sql=sql.substring(0,sql.length()-5);
			System.out.println(sql);
			nCount=st.executeUpdate(sql);
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		if( nCount>0 )
			strResult=Integer.toString(nCount);
		 else
			 strResult="ERROR";
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", strResult );
		strResult = jsobject.toString();
		
		return strResult;
	}
	
	public  String  UpdateSignal(Connection conn,String strValue,String strTable)
	{
		String strResult = "";
		String sql;

		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象

		int nCount=0;

		String [] arrValue=strValue.split(",");
		try {
			st = conn.createStatement();

			//update <表名> set <列名=更新值> [where <更新条件>]
            //例：update tongxunlu set 年龄=18 where 姓名='蓝色小名'

			sql="update "+strTable+" set ";
			
			if( strTable.equals("input_device_signal_attr") ){
				for(int i=2;i<arrValue.length;i+=2){
					if( i==arrValue.length-2 ){
						sql+=arrValue[i]+"="+arrValue[i+1];
						sql+=" where "+arrValue[0]+"="+arrValue[1];
					}
					else
						sql+=arrValue[i]+"="+arrValue[i+1]+",";
				}
			}
			else if( strTable.equals("signal_coordnation") ){
				String strSql="";
				for(int i=0;i<arrValue.length;i+=2*3){
					strSql+=sql;
					strSql+=arrValue[i+4]+"="+arrValue[i+5];
					strSql+=" where "+arrValue[i]+"="+arrValue[i+1]+" and "+arrValue[i+2]+"="+arrValue[i+3]+";";
				}
				
				sql=strSql;
			}
				
			nCount=st.executeUpdate(sql);
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}

		if( nCount>0 )
			strResult=Integer.toString(nCount);
		 else
			 strResult="ERROR";
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", strResult );
		strResult = jsobject.toString();
		
		return strResult;
	}

//	物资信息
	public  String  GetMaterialFeature(Connection conn)
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		String strGeo;
		ArrayList<ArrayList<String>> listFeature = new ArrayList<ArrayList<String>>();
		
		try {
			st = conn.createStatement();
			sql ="select  id,ST_AsText(ST_Transform(ST_GeomFromText(ST_AsText(geo),4326),900913)) from man_material_info";
			rs=st.executeQuery(sql);
			
			 while(rs.next()){
				 ArrayList<String> attrlist = new ArrayList<String>();
				 attrlist.add(rs.getString(1));

				 strGeo=rs.getString(2);
				 strGeo=strGeo.replace("POINT(", "");
				 strGeo=strGeo.replace(")", "");
				 //strGeo=strGeo.replace(" ", ",");
				 attrlist.add(strGeo);
				 
				 listFeature.add(attrlist);
			 }
			
			 rs.close();

		} catch (SQLException e) {
		     System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listFeature );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public  String  GetMaterialAttribute(Connection conn,String id)
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		ArrayList<String> attrlist = new ArrayList<String>();
		
		try {
			st = conn.createStatement();
			sql ="select id,type,number,intime,name,photo from man_material_info where id="+id;
			rs=st.executeQuery(sql);
			
			 while(rs.next()){
				 attrlist.add(rs.getString(1));
				 attrlist.add(rs.getString(2));
				 attrlist.add(rs.getString(3));
				 attrlist.add(rs.getString(4));
				 attrlist.add(rs.getString(5));
				 attrlist.add(rs.getString(6));
//				 attrlist.add(rs.getString(7));
			 }
			
		} catch (SQLException e) {
		     System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", attrlist );
		strResult = jsobject.toString();
		return strResult;
	}
//	人员信息
	public  String  GetPersonFeature(Connection conn)
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		String strGeo;
		ArrayList<ArrayList<String>> listFeature = new ArrayList<ArrayList<String>>();
		
		try {
			st = conn.createStatement();
			sql ="select  id,ST_AsText(ST_Transform(ST_GeomFromText(ST_AsText(geo),4326),900913)) from man_person_info";
			rs=st.executeQuery(sql);
			
			 while(rs.next()){
				 ArrayList<String> attrlist = new ArrayList<String>();
				 attrlist.add(rs.getString(1));

				 strGeo=rs.getString(2);
				 strGeo=strGeo.replace("POINT(", "");
				 strGeo=strGeo.replace(")", "");
				 //strGeo=strGeo.replace(" ", ",");
				 attrlist.add(strGeo);
				 
				 listFeature.add(attrlist);
			 }
			
		} catch (SQLException e) {
		     System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listFeature );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public  String  GetPersonAttribute(Connection conn,String id)
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		ArrayList<String> attrlist = new ArrayList<String>();
		
		try {
			st = conn.createStatement();
			sql ="select id,department,name,district,sttime,edtime,state,photo from man_person_info where id="+id;
			rs=st.executeQuery(sql);
			
			 while(rs.next()){
				 attrlist.add(rs.getString(1));
				 attrlist.add(rs.getString(2));
				 attrlist.add(rs.getString(3));
				 attrlist.add(rs.getString(4));
				 attrlist.add(rs.getString(5));
				 attrlist.add(rs.getString(6));
				 attrlist.add(rs.getString(7));
			 }
			
		} catch (SQLException e) {
		     System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", attrlist );
		strResult = jsobject.toString();
		return strResult;
	}
//	车辆信息
	public  String  GetVechicleFeature(Connection conn,String type )
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		String strGeo;
		ArrayList<ArrayList<String>> listFeature = new ArrayList<ArrayList<String>>();
		
		try {
			st = conn.createStatement();
			sql ="select  id,ST_AsText(ST_Transform(ST_GeomFromText(ST_AsText(geo),4326),900913)) from man_vechicle_info where type='"+type+"'";
			rs=st.executeQuery(sql);
			
			 while(rs.next()){
				 ArrayList<String> attrlist = new ArrayList<String>();
				 attrlist.add(rs.getString(1));

				 strGeo=rs.getString(2);
				 strGeo=strGeo.replace("POINT(", "");
				 strGeo=strGeo.replace(")", "");
				 //strGeo=strGeo.replace(" ", ",");
				 attrlist.add(strGeo);
				 
				 listFeature.add(attrlist);
			 }
			
			 
		} catch (SQLException e) {
		     System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listFeature );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public  String  GetVechicleAttribute(Connection conn,String id,String type)
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		ArrayList<String> attrlist = new ArrayList<String>();
		
		try {
			st = conn.createStatement();
			sql ="select id,department,type,number,sttime,edtime,priority,state,photo from man_vechicle_info where id="+id+ " and type='"+type+"'";
			rs=st.executeQuery(sql);
			
			 while(rs.next()){
				 attrlist.add(rs.getString(1));
				 attrlist.add(rs.getString(2));
				 attrlist.add(rs.getString(3));
				 attrlist.add(rs.getString(4));
				 attrlist.add(rs.getString(5));
				 attrlist.add(rs.getString(6));
				 attrlist.add(rs.getString(7));
				 attrlist.add(rs.getString(8));
				 attrlist.add(rs.getString(9));
			 }
			
		} catch (SQLException e) {
		     System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", attrlist );
		strResult = jsobject.toString();
		return strResult;
	}

//	小区
	public  String  GetZoneFeature(Connection conn)
	{
		String strResult = "";
		String sql;
		
		String strGeo,strLine;
		String[] strPoint;
		
		int indexSt=0,indexEd=0;
		
		if( listRoadNetFeature.size()<1 ){
			Statement st; //数据库操作对象
			ResultSet rs; //数据记录集对象
			
			try {
				st = conn.createStatement();
			    sql ="select  id,ST_AsText(geo) from gis_taz order by id";
			    
			    rs=st.executeQuery(sql); //执行数据查询

			    while(rs.next()){
			    	indexSt=0;indexEd=0;
			    	ArrayList<String> attrlist = new ArrayList<String>();
			    	attrlist.add(rs.getString(1));
			    	strGeo=rs.getString(2);
			    	strGeo=strGeo.replace("POLYGON((", "");
			    	strGeo=strGeo.replace("))", "");
			    	attrlist.add(strGeo);
			    	
			    	 /*strPoint=strGeo.split(",");
					 for( int i=0;i<strPoint.length;i++ ){
						 strPoint[i]=strPoint[i].replace(" ",",");
						 attrlist.add(strPoint[i]);
					 }*/
			    	
			    	listRoadNetFeature.add(attrlist);
			    }
			    
			    rs.close(); //关闭数据记录集
			    
			 } catch (SQLException e) {
			     System.out.println("Error:"+e.toString()+e.getMessage());
			}
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listRoadNetFeature );
		strResult = jsobject.toString();
//		System.out.println(strResult);
		return strResult;
	}
	
	public  String  GetZoneAttribute(Connection conn,String id)
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		ArrayList<ArrayList<String>> listFeature = new ArrayList<ArrayList<String>>();
		
		try {
			st = conn.createStatement();
			//sql ="select id,production,attraciton from gis_taz where id="+id;
			sql ="select id,area,1,1,'清河' from gis_taz where id="+id;
			rs=st.executeQuery(sql);
			
			 while(rs.next()){
				 ArrayList<String> attrlist = new ArrayList<String>();
				 attrlist.add(rs.getString(1));
				 attrlist.add(decimalFormat.format(rs.getFloat(2)));
				 attrlist.add(rs.getString(3));
				 attrlist.add(rs.getString(4));
				 attrlist.add(rs.getString(5));
//				 attrlist.add(rs.getString(6));
//				 attrlist.add(rs.getString(7));
				 
				 listFeature.add(attrlist);
			 }
			 
			 rs.close();
			 
			 ArrayList<String> attrlist = new ArrayList<String>();
			 attrlist.add("60");
			 attrlist.add("0");
			 attrlist.add("1");
			 attrlist.add("9999");
			 
			 listFeature.add(attrlist);
			
		} catch (SQLException e) {
		     System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listFeature );
		strResult = jsobject.toString();
		return strResult;
	}
}
