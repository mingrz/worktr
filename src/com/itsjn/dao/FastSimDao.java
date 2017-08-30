package com.itsjn.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DecimalFormat;
import java.util.ArrayList;

import net.sf.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;

public class FastSimDao {
	Socket socket=null;
	public static DecimalFormat decimalFormat=new DecimalFormat("00");
	//	开始快速仿真
	public  String  StartFastSim(Connection conn,String strParam)
	{
		String strResult = "ok";
		
		try {
			if( socket==null )
				socket=new Socket("127.0.0.1",6666);
			else if( socket.isClosed() ){
				socket.close();
				socket=new Socket("127.0.0.1",6666);
			}
			
			//socket.setKeepAlive(true);
			
			 OutputStream outputStream=socket.getOutputStream();//获取一个输出流，向服务端发送信息
			 PrintWriter printWriter=new PrintWriter(outputStream);
			 printWriter.print(strParam);
			 printWriter.flush();
			 
			 //printWriter.close();
			 //outputStream.close();
			 //socket.shutdownOutput();	//关闭输出流
			 
			 socket.close();
			
		} catch (IOException e) {
			strResult="error";
			e.printStackTrace();
		}
		
		/*String sql;
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		int nCount=0;
		
		String [] arrParam=new String[]{};
		String [] arrLine=new String[]{};
		arrLine=strParam.split(";");
		
		if( arrLine.length>0 ){
			arrParam=arrLine[0].split(",");
			try {
				st = conn.createStatement();
				sql= "insert into simulate_attr values("+arrParam[0]+","+arrParam[1]+","+arrParam[2]+",1)"+
				" ON CONFLICT ON CONSTRAINT pk_simulate_attr do update set(name,itemid,state)=("+arrParam[1]+","+arrParam[2]+",1)";
				nCount=st.executeUpdate(sql);
				
			} catch (SQLException e) {
				strResult="error";
				e.printStackTrace();
			}
		}else
			strResult="error";*/
		
		ArrayList<String> attrlist = new ArrayList<String>();
		attrlist.add(strResult);
		
		JSONObject jsobject = new JSONObject();
		jsobject.element("entitys", attrlist );
		strResult = jsobject.toString();
		return strResult;
	}
	
	public  String  GetFastSimState(Connection conn,String strSimID)
	{
		String sql,strResult = "";
		
		ArrayList<String> attrlist = new ArrayList<String>();
		
		Statement st; //数据库操作对象
		ResultSet rs; //数据记录集对象
		
		try {
			st = conn.createStatement();
			sql= "select state from simulate_attr where simid="+strSimID;
			rs=st.executeQuery(sql); //执行数据查询
			
			while(rs.next()){
				attrlist.add(rs.getString(1));
				//attrlist.add("1");
			}
			
			if(attrlist.size()<1)
				attrlist.add("0");
			else if( attrlist.get(0).equals("1") ){
				sql= "select max(day_no),min(timestamp_in_min),max(timestamp_in_min)  from sim_sectdmoe";
				rs=st.executeQuery(sql); //执行数据查询
				
				String strTime;
				while(rs.next()){
					strTime=decimalFormat.format(rs.getInt(2)/60)+":"+decimalFormat.format(rs.getInt(2)%60)+":00";
					attrlist.add(rs.getString(1)+" "+ strTime);
					strTime=decimalFormat.format(rs.getInt(3)/60)+":"+decimalFormat.format(rs.getInt(3)%60)+":00";
					attrlist.add(rs.getString(1)+" "+ strTime);
				}
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
}


