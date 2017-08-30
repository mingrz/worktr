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

public class RoadNetDao {
	
	public static ArrayList<ArrayList<String>> listRoadNetFeature     = new ArrayList<ArrayList<String>>();
	public static HashMap<String,String> mapNode2InputLinkSub     	  = new HashMap<String,String>();
	public static DecimalFormat decimalFormatF=new DecimalFormat("##0.00");
	
	/**
	 * 
	 * @return
	 */
	public  String  GetRoadNetFeature(Connection conn)
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
			    //sql ="select id,ST_AsText(geo) from gis_net where link_type!=10 and sec>0 order by index_row"; 
			    //sql="select distinct(sec),ST_AsText(geo),a.from_node_id||'->'||a.to_node_id from input_link a,output_linktdmoe b where a.from_node_id=b.from_node_id and a.to_node_id=b.to_node_id";
				//sql="select distinct(linkid),ST_AsText(geo),length,link_type,a.from_node_id||'->'||a.to_node_id from input_link a where a.link_type<22 and a.link_type>=3";
				sql="select distinct(linkid),ST_AsText(geo),length,link_type,a.from_node_id||'->'||a.to_node_id from input_link a where a.link_type!=10";
			    rs=st.executeQuery(sql); //执行数据查询

			    while(rs.next()){
			    	indexSt=0;indexEd=0;
			    	ArrayList<String> attrlist = new ArrayList<String>();
			    	attrlist.add(rs.getString(1));
			    	attrlist.add(decimalFormatF.format(rs.getFloat(3)));
			    	attrlist.add(rs.getString(4));
			    	
			    	strGeo=rs.getString(2);
			    	strGeo=strGeo.replace("LINESTRING(", "");
			    	strGeo=strGeo.replace(")", "");
			    	attrlist.add(strGeo);
			    	
			    	/*strGeo=strGeo.replace("<LineString>", "");
			    	strGeo=strGeo.replace("</LineString>", "");
			    	strGeo=strGeo.replace("<coordinates>", "");
			    	strGeo=strGeo.replace("</coordinates>", "");*/
			    	/*strPoint=strGeo.split(",");
			    	for( int i=0;i<strPoint.length;i++ ){
			    		strPoint[i]=strPoint[i].replace(" ",",");
			    		attrlist.add(strPoint[i]);
			    	}*/
			    	
			    	/*strPoint=strGeo.split(" ");
			    	for( int i=0;i<strPoint.length;i++ ){
			    		strPoint[i]=strPoint[i].replace(",0.0","");
			    		//if( i==0 )
			    		//	strPoint[0]="116.295089,39.892920";
			    		//else
			    		//	strPoint[i]="116.295056,39.896175";
			    			
			    		
			    		//attrlist.add(strPoint[i]);
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
		return strResult;
	}
	
	public  String  GetRoadNetFeatureByExtent(Connection conn,String strExtent)
	{
		String strResult = "";
		String sql;

		String strGeo,strLine;
		String[] strPoint;

		ArrayList<ArrayList<String>> listFeature = new ArrayList<ArrayList<String>>();

		int indexSt=0,indexEd=0;

		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象

		try {
			st = conn.createStatement();
			sql="select distinct(linkid),ST_AsText(geo),from_node_id,to_node_id,link_type,lane_capacity_in_vhc_per_hour from input_link a where ST_Intersects('POLYGON(("+
			strExtent+"))',geo)";
			sql+=" and a.link_type!=10";
			rs=st.executeQuery(sql); //执行数据查询

			while(rs.next()){
				indexSt=0;indexEd=0;
				ArrayList<String> attrlist = new ArrayList<String>();
				attrlist.add(rs.getString(1));
				attrlist.add(rs.getString(3));
				attrlist.add(rs.getString(4));
				attrlist.add(rs.getString(5));
				attrlist.add(rs.getString(6));

				strGeo=rs.getString(2);
				strGeo=strGeo.replace("LINESTRING(", "");
				strGeo=strGeo.replace(")", "");
				attrlist.add(strGeo);
				/*strPoint=strGeo.split(",");
				for( int i=0;i<strPoint.length;i++ ){
					strPoint[i]=strPoint[i].replace(" ",",");
					attrlist.add(strPoint[i]);
				}*/

				listFeature.add(attrlist);
			}

			rs.close(); //关闭数据记录集

		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}

		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listFeature );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public  String  GetSubwayNetFeature(Connection conn)
	{
		String strResult = "";
		String sql;
		
		String strGeo;

		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象

		String strKey;
		ArrayList<ArrayList<String>> listFeature = new ArrayList<ArrayList<String>>();
		HashMap<String,String> mapFeatureIndex= new HashMap<String,String>();
		
		boolean bFlag=false;
		if( mapNode2InputLinkSub.size()<1 )
			bFlag=true;
			

		try {
			st = conn.createStatement();
			sql ="select linkid,name,from_node,to_node,ST_AsText(geo) from sub_input_link order by from_node"; 
			rs=st.executeQuery(sql); //执行数据查询

			while(rs.next()){
				ArrayList<String> attrlist = new ArrayList<String>();
				attrlist.add(rs.getString(1));
				attrlist.add(rs.getString(2));
				
				if( bFlag && rs.getInt(3)>0 )
					mapNode2InputLinkSub.put(rs.getString(3), rs.getString(1));

				strGeo=rs.getString(5);
				strGeo=strGeo.replace("LINESTRING(", "");
				strGeo=strGeo.replace(")", "");
				attrlist.add(strGeo);

				listFeature.add(attrlist);
				
				if( rs.getString(3)!=null && rs.getString(4)!=null )
					mapFeatureIndex.put("\""+rs.getString(3)+"->"+rs.getString(4)+"\"", "\""+(listFeature.size()-1)+"->"+rs.getString(1)+"\"");
			}

			rs.close(); //关闭数据记录集

		} catch (SQLException e) {
			System.out.println("Error:"+e.toString()+e.getMessage());
		}
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listFeature );
		strResult = jsobject.toString();
		strResult=strResult.replace("}",",");
		strResult+="\"ind\":"+mapFeatureIndex.toString()+"}";
		strResult=strResult.replace("=",":");
		
		return strResult;
	}
	
	public  String  GetOtherFeature(Connection conn,String strTable)
	{
		String strResult = "";
		String sql;
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		String strGeo,strLine;
		String[] strPoint;
		
		int indexSt=0,indexEd=0;
		ArrayList<ArrayList<String>> listFeature = new ArrayList<ArrayList<String>>();
		
		String strField="";
		strField="id,";
		
		try {
			st = conn.createStatement();
			sql ="select "+strField+"ST_AsText(geo) from " +strTable+
			" order by "+strField;
			sql=sql.substring(0,sql.length()-1);
			System.out.println(sql);
			rs=st.executeQuery(sql);
			
			 while(rs.next()){
				 indexSt=0;indexEd=0;
				 ArrayList<String> attrlist = new ArrayList<String>();
				 attrlist.add(rs.getString(1));

				 strGeo=rs.getString(2);
				 strGeo=strGeo.replace("LINESTRING(", "");
				 /*strGeo=strGeo.replace(")", "");

				 strPoint=strGeo.split(",");
				 for( int i=0;i<strPoint.length;i++ ){
					 strPoint[i]=strPoint[i].replace(" ",",");
					 attrlist.add(strPoint[i]);
				 }*/

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
	
	public  String  GetNodeFeature(Connection conn, String strExtent)
	{
		String strResult = "";
		String sql;
		String strGeo;
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		ArrayList<ArrayList<String>> listFeature = new ArrayList<ArrayList<String>>();
		
		try {
			st = conn.createStatement();
		    sql ="select node_id,ST_AsText(geo) from input_node where node_id not in (select centroid_i from gis_taz) ";
		    if( strExtent!=null&&strExtent.length()>0 ){
		    	sql += " and node_id in ( select distinct(from_node_id) from input_link "+
		    	" where ST_Intersects('POLYGON(("+strExtent+"))',geo)"+
		    	" union select distinct(to_node_id) from input_link"+" where ST_Intersects('POLYGON(("+strExtent+"))',geo)"+" )";
		    }
		    
		    rs=st.executeQuery(sql); //执行数据查询
		    
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
	
	public String GetSubNodeFeatrue(Connection conn)
	{
		String strResult = "";
		String sql;
		String strGeo;
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		//ArrayList<String> attrlist = new ArrayList<String>();
		ArrayList<ArrayList<String>> listFeature = new ArrayList<ArrayList<String>>();
		
		try {
			st = conn.createStatement();			
			sql="select stop_id,original_stop_id,name,lat,lon from sub_input_stop order by stop_id";
			
			rs=st.executeQuery(sql); //执行数据查询
			while(rs.next()){
				ArrayList<String> attrlist = new ArrayList<String>();
				attrlist.add(rs.getString(1));
				attrlist.add(rs.getString(2));
				attrlist.add(rs.getString(3));
				strGeo=rs.getString(4)+" ";
				strGeo+=rs.getString(5);
				attrlist.add(strGeo);
				
				listFeature.add(attrlist);
				
				//attrlist.add(rs.getString(3));
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
	
	public  String  GetCentralNodeFeature(Connection conn)
	{
		String strResult = "";
		String sql;
		String strGeo;
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		ArrayList<ArrayList<String>> listFeature = new ArrayList<ArrayList<String>>();
		
		try {
			st = conn.createStatement();
		    sql ="select node_id,ST_AsText(geo) from input_node where node_id in (select centroid_i from gis_taz) ";
		    
		    rs=st.executeQuery(sql); //执行数据查询
		    
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
	
	public  String  GetNetIndex(Connection conn)
	{
		String strResult = "";
		
		String[] indexs={"2","2","2","2","2","2","2","1","0","1","2","2","2","2","2","2","2","1","1","1","2","2","2","2"};
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", listRoadNetFeature );
		strResult = jsobject.toString();
		
		return strResult;
	}
}
