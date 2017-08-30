package com.itsjn.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import net.sf.json.JSONObject;

public class ScenarioDao {
	/**
	 * ,Integer type,Integer id
	 * @return
	 */
//	动态事件
	public  String  GetConstructionFeature(Connection conn,String type)
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		String strGeo;
		ArrayList<ArrayList<String>> listFeature = new ArrayList<ArrayList<String>>();
		
		try {
			st = conn.createStatement();
			sql ="select scenario_id,ST_AsText(geo) from scenario_attr where scenario_type ="+type;
			rs=st.executeQuery(sql);
			
			 while(rs.next()){
				 ArrayList<String> attrlist = new ArrayList<String>();
				 attrlist.add(rs.getString(1));

				 strGeo=rs.getString(2);
				 strGeo=strGeo.replace("POINT(", "");
				 strGeo=strGeo.replace(")", "");
				 strGeo=strGeo.replace(" ", ",");
				 attrlist.add(strGeo);
				 
				 listFeature.add(attrlist);
			 }
			
		} catch (SQLException e) {
		     System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listFeature );
		strResult = jsobject.toString();
//		System.out.println(strResult);
		return strResult;
	}
	
// 路段编号 坐标
	public  String  GetConstructionSection(Connection conn,String type)
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		String strGeo;
		ArrayList<ArrayList<String>> listFeature = new ArrayList<ArrayList<String>>();
		
		try {
			st = conn.createStatement();
			sql ="select scenario_id,link_id,ST_AsText(geo) from scenario_attr where scenario_type ="+type;
			rs=st.executeQuery(sql);
			
			 while(rs.next()){
				 ArrayList<String> attrlist = new ArrayList<String>();
				 attrlist.add(rs.getString(1));
				 attrlist.add(rs.getString(2));

				 strGeo=rs.getString(3);
				 strGeo=strGeo.replace("POINT(", "");
				 strGeo=strGeo.replace(")", "");
				 strGeo=strGeo.replace(" ", ",");
				 attrlist.add(strGeo);
				 
				 listFeature.add(attrlist);
			 }
			
		} catch (SQLException e) {
		     System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listFeature );
		strResult = jsobject.toString();
//		System.out.println(strResult);
		return strResult;
	}
	
	public  String  GetConstructionAttribute(Connection conn,String id,String type)
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		ArrayList<String> attrlist = new ArrayList<String>();
		
		try {
			st = conn.createStatement();
			sql ="select scenario_id,link_id,scenario_type,name,sttime,edtime,capacity,speed_limit,demand,signal_peirod,signal_filter,link_toll,state,reamark from scenario_attr where scenario_id=" + id + " and scenario_type="+type;
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
				 attrlist.add(rs.getString(10));
				 attrlist.add(rs.getString(11));
				 attrlist.add(rs.getString(12));
				 attrlist.add(rs.getString(13));
				 attrlist.add(rs.getString(14));
			 }
			
		} catch (SQLException e) {
		     System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", attrlist );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public  String  EditConstruction(Connection conn,String strAction,String strValue)
	{
		String strResult = "";
	
		if( strAction.equals("insert") ){
			strResult=InsertConstruction(conn,strValue);
		}
		else if( strAction.equals("update") ){
			strResult=UpdateConstruction(conn,strValue);
		}
		else if( strAction.equals("delete") ){
			strResult=DeleteConstruction(conn,strValue);
		}
		
		return strResult;
	}
	
//	public  String  Insert(Connection conn,String strValue)
//	{
//		String strResult = "";
//		String sql;
//		
//		Statement st; //数据库操作对象
//		ResultSet rs; //数据记录集对象
//		
//		int nCount=0;
//		
//		String [] arrValue=strValue.split(",");
//		
//		try {
//			st = conn.createStatement();
//			//sql="insert into input_device_signal_attr values('1','广阳道','南京莱斯','2','13306,13354','120','20',ST_Transform(ST_GeomFromText('point(12987175.90899 4790357.46199)',900913),4326));";
//			sql="insert into scenario_attr values(";
//			sql+=arrValue[0];
//			
////			sql+="ST_Transform(ST_GeomFromText('point("+arrValue[1]+")',900913),4326))";
//			sql+=")";
//			nCount=st.executeUpdate(sql);
//			
//		} catch (SQLException e) {
//			System.out.println("Error:"+e.toString()+e.getMessage());
//		}
//		
//		if( nCount>0 ){
//			JSONObject jsobject = new JSONObject();
//			strResult=jsobject.toString();
////			 strResult="OK";
//		}
//		 else
//			 strResult="ERROR";
//		
//		return strResult;
//	}
	//*******************************************************************************************************************************
	
	public  String  InsertConstruction(Connection conn,String strValue)
	{
		String strResult = "";
		String sql;

		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象

		int nCount=0;

		String [] arrValue=strValue.split(",");

		try {
			st = conn.createStatement();
			//sql="insert into input_device_signal_attr values('1','广阳道','南京莱斯','2','13306,13354','120','20',ST_Transform(ST_GeomFromText('point(12987175.90899 4790357.46199)',900913),4326));";
			sql="insert into scenario_attr values(";
 
			for( int i=0;i<arrValue.length;i++ ){

				if( i==arrValue.length-1 ){
					//sql+="ST_Transform(ST_GeomFromText('point("+arrValue[1]+")',900913),4326))";
					sql+="ST_Transform(ST_GeomFromText('point("+arrValue[i]+")',900913),4326)";
				}
				else if( i==3 || i==4 || i==5 || i==13 )
					sql+="'"+arrValue[i]+"',";
				else
					sql+=arrValue[i]+",";
			}
			sql+=")";
			System.out.println(sql);
			nCount=st.executeUpdate(sql);

		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}

		if( nCount>0 ){
			JSONObject jsobject = new JSONObject();
			strResult=jsobject.toString();
//			 strResult="OK";
		}
		 else{
			 strResult="ERROR";
		 }

		return strResult;
	}

	public  String UpdateConstruction(Connection conn,String strValue)
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

			sql="update scenario_attr set ";
			int leg=arrValue.length;
			for(int i=0;i<arrValue.length;i+=2){
				if( i==arrValue.length-2 ){
					sql+=arrValue[i]+"="+arrValue[i+1]+";";
				}
				else if( i==arrValue.length-4 )
					sql+=" where "+arrValue[i]+"="+arrValue[i+1]+" and ";
				else if( i==arrValue.length-6 )
					sql+=arrValue[i]+"="+arrValue[i+1];
				else
					sql+=arrValue[i]+"="+arrValue[i+1]+",";
			}
//			
//			else if( arrValue[2].equals("2") ){

//			}
				
			nCount=st.executeUpdate(sql);
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}

		if( nCount>0 ){
			JSONObject jsobject = new JSONObject();
			strResult=jsobject.toString();
//			 strResult="OK";
		}
		 else{
			 strResult="ERROR";
		 }
		return strResult;
	}

	public  String DeleteConstruction(Connection conn,String strValue)
	{
		String strResult = "";
		String sql;

		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象

		int nCount=0;

		String [] arrValue=strValue.split(",");
		try {
			st = conn.createStatement();

			//delete from <表名> [where <删除条件>]
            //例：delete from a where name='开心朋朋'（删除表a中列值为开心朋朋的行）

			sql="delete from scenario_attr where scenario_id="+arrValue[0];
			sql+="and scenario_type="+arrValue[1];

			nCount=st.executeUpdate(sql);
		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}

		if( nCount>0 ){
			JSONObject jsobject = new JSONObject();
			strResult=jsobject.toString();
//			 strResult="OK";
		}
		 else{
			 strResult="ERROR";
		 }

		return strResult;
	}
}


