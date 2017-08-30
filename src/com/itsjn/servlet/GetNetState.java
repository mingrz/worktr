package com.itsjn.servlet;

import com.itsjn.servlet.DataThread;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.support.WebApplicationContextUtils;

import sun.awt.AppContext;

import net.sf.json.JSONObject;

import com.itsjn.config.ServerURL;
import com.itsjn.dao.NetStateDao;
public class GetNetState extends HttpServlet {

	 private DataThread datathread;  
	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
		if (datathread != null && datathread.isInterrupted()) {  
			datathread.interrupt();  
        }  
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		 doPost( request, response );
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		NetStateDao  cDao = ( NetStateDao )WebApplicationContextUtils.getWebApplicationContext(getServletContext()).getBean("netstateDao");
		
		String strResult = "";
		String strAction = request.getParameter( "action" );
		
		if( strAction.equals("query") )
		{
			String strType = request.getParameter( "type" );
			String strParam= request.getParameter( "pa" );
			
			if( strType.equals( "1" )){ // sec数据
				String strDate="",strTime="";
				if( strParam!=null && strParam.length()>0 ){
					strDate=strParam.substring(0,strParam.indexOf(","));
					strTime=strParam.substring(strParam.lastIndexOf(",")+1,strParam.length());
				}
				strResult = cDao.GetSecData(ServerURL.conn,strDate,strTime,"rea");
				//strResult = cDao.GetIndex(ServerURL.conn,"2016-04-01 10:00:00","2016-04-01 10:00:00",1);
			}
			else if( strType.equals( "2" )){ // zone数据
				strResult = cDao.GetZoneData(ServerURL.conn,strParam,"rea");
			}
			else if( strType.equals( "3" )){ // 信号机参数
				strResult = cDao.GetParamSingnal(ServerURL.conn,strParam);
			}
			else if( strType.equals( "4" )){ // 信号机实时状态
				String strTime,strID=strParam.substring(0,strParam.lastIndexOf(","));
				strTime=strParam.substring(strParam.lastIndexOf(",")+1,strParam.length());
				strResult = cDao.GetDataSpaceAndTime(ServerURL.conn,strID,strTime);
			}
			else if( strType.equals( "5" )){ // sec的分时数据
				String[] str=strParam.split(",");
				strResult = cDao.GetSecDataByID(ServerURL.conn,str[0],str[1],"rea");
			}
			else if( strType.equals( "6" )){ // 车检器流量数据
				strResult = cDao.GetSection(ServerURL.conn,strParam);
			}
			else if( strType.equals( "11" )){ // 地铁实时数据
				strResult = cDao.GetSubway(ServerURL.conn,strParam);
			}
			// 30-40都为查询仿真的数据
			else if( strType.equals( "31" ) ){
				String strDate="",strTime="";
				if( strParam!=null && strParam.length()>0 ){
					strDate=strParam.substring(0,strParam.indexOf(","));
					strTime=strParam.substring(strParam.lastIndexOf(",")+1,strParam.length());
				}
				strResult = cDao.GetSecData(ServerURL.conn,strDate,strTime,"sim");
			}
			else if( strType.equals( "32" )){ // zone数据
				strResult = cDao.GetZoneData(ServerURL.conn,strParam,"sim");
			}
			else if( strType.equals( "35" )){ // sec的分时数据
				String[] str=strParam.split(",");
				strResult = cDao.GetSecDataByID(ServerURL.conn,str[0],str[1],"sim");
			}
		}
		
//		System.out.println("____FUCK TIME:" + myThread1.str);
//		System.out.println( strResult );
	    response.setContentType("application/x-json");
		response.setCharacterEncoding("UTF-8");
		if( strResult.length()>0 )
			response.getWriter().write(strResult);
		else
			response.getWriter().write("error");
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
		String str = null;  
		if (str == null && datathread == null) {  
			//datathread = new DataThread();  
			//datathread.start(); // servlet 上下文初始化时启动 socket  
		}  
	}
}
