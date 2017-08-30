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

public class SignalDataDao{
	public static ArrayList<String> listSignal = new ArrayList<String>();
	public static DecimalFormat decimalFormat=new DecimalFormat("00");
	
	/*public String GetParamSingnal(Connection conn,String id)
	{
		String strResult = "";
		ArrayList<String> attrlist = new ArrayList<String>();
		
		if( listSignal.size()<1 ){
			listSignal.add("1,60,1,0,sy,sr,sg,5,20,35");
			listSignal.add("1,60,2,0,sy,sr,sg,5,20,35");
			listSignal.add("2,80,1,500,sy,sr,sg,5,20,55");
			listSignal.add("2,80,2,500,sy,sr,sg,5,20,55");
			listSignal.add("3,90,1,1000,sy,sr,sg,5,35,50");
			listSignal.add("3,90,2,1000,sy,sr,sg,5,35,50");

		}
		
		strResult="[";
		String[] arrID=id.split(",");
		for( int i=0;i<arrID.length;i++ ){
			strResult+="["+ listSignal.get(Integer.parseInt(arrID[i])*2-2) +"]";
			strResult+="["+ listSignal.get(Integer.parseInt(arrID[i])*2-1) +"]";
		}
		strResult+="]";
		
		return strResult;
	}*/
	
	public String GetParamSingnal(Connection conn,String id)
	{
		String sql,strline="",strResult = "";
		
		//ArrayList<ArrayList<String>> listFeature = new ArrayList<ArrayList<String>>();
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		int dis=-500,cur=0;
		listSignal.clear();
		//if( listSignal.size()<1 )
		{
			try {
				st = conn.createStatement();
				sql="select device_id,phase_id,ids,period,yellow,green,off from signal_phase_map where (phase_id='4' or phase_id='8') and device_id in ("+id+") order by device_id,phase_id,ids";
				rs=st.executeQuery(sql);
				
				while(rs.next()){
					if( cur!=rs.getInt(1) ){
						cur=rs.getInt(1);
						dis+=500;
					}
					
					strline="";
					//for( int i=1;i<=7;i++ )
					strline+=rs.getString(1)+",";strline+=rs.getString(4)+",";strline+=rs.getString(2)+",";strline+=dis+",";
					if( rs.getInt(3)==5 ){
						strline+="sy,sr,sg,";
						strline+="3,";strline+=rs.getInt(4)-3-(rs.getInt(5)-rs.getInt(6))+",";strline+=rs.getInt(5)-rs.getInt(6);
						//strline+=rs.getString(5)+",";strline+=rs.getInt(4)-rs.getInt(5)-rs.getInt(6)+",";strline+=rs.getString(6);
					}
					
					strResult+=strline+";";
					listSignal.add(strline);
				}
				
				rs.close();
			} catch (SQLException e) {
				System.out.println("Error:"+e.toString()+e.getMessage());
			}
		}
		
		strResult=strResult.substring(0,strResult.length()-1);
		
		return strResult;
	}
	
	public  String  GetDataSpaceAndTime(Connection conn,String id,String stDateTime)
	{
		String strResult = "";
		int nSecond=Integer.valueOf(stDateTime.substring(11,13))*3600+Integer.valueOf(stDateTime.substring(14,16))*60+
				Integer.valueOf(stDateTime.substring(17,19));
		
		/*if( listSignal.size()<1 ){
			listSignal.add("1,60,1,0,sy,sr,sg,5,20,35");
			listSignal.add("1,60,2,0,sy,sr,sg,5,20,35");
			listSignal.add("2,80,1,500,sy,sr,sg,5,20,55");
			listSignal.add("2,80,2,500,sy,sr,sg,5,20,55");
			listSignal.add("3,90,1,1000,sy,sr,sg,5,35,50");
			listSignal.add("3,90,2,1000,sy,sr,sg,5,35,50");
		}*/
		
		ArrayList<ArrayList<String>> listData = new ArrayList<ArrayList<String>>();
		
		int nI=0,le=0,nSum=0,paramHeader=4;
		String[] arrPa,arrPa0=null,arrID=id.split(",");
		for( int i=0;i<arrID.length;i++ ){
			for( int k=0;k<listSignal.size();k++ ){
				arrPa=listSignal.get(k).split(",");
				if( !arrPa[0].equals(arrID[i]) )
					continue;
				
				nSum=0;
				ArrayList<String> attrlist = new ArrayList<String>();
				
				//attrlist.add(arrPa[0]);attrlist.add(arrPa[2]);
				strResult+=arrPa[0]+",";strResult+=arrPa[2]+",";
				
				if( i==0 ){
					arrPa0=arrPa;
					le=nSecond%Integer.parseInt(arrPa[1]);
				}
				else
					le=nSecond%Integer.parseInt(arrPa[1]);
					//le=(nSecond+(Integer.parseInt(arrPa[1])-Integer.parseInt(arrPa0[1])))%Integer.parseInt(arrPa[1]);
				
				nSum=0;
				nI=(arrPa.length-paramHeader)/2;
				for(int j=0;i<nI;j++){
					nSum+=Integer.parseInt(arrPa[paramHeader+nI+j]);
					if( le<=nSum ){
						//attrlist.add("45");
						strResult+="45,";
						int ti=le-(nSum-Integer.parseInt(arrPa[paramHeader+nI+j]));
						//attrlist.add(j+"");
						strResult+=j+",";
						//attrlist.add( (le-(nSum-Integer.parseInt(arrPa[paramHeader+nI+j])))+"" );

						strResult+=(le-(nSum-Integer.parseInt(arrPa[paramHeader+nI+j])))+";";
						listData.add(attrlist);
						break;
					}
				}
			}
		}
		
		strResult=strResult.substring(0,strResult.length()-1);
		
		return strResult;
	}
}
