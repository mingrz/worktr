package com.itsjn.servlet;

import javax.servlet.http.HttpServlet;
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
import com.itsjn.dao.DeviceDao;
import com.itsjn.dao.ScenarioDao;

public class GetScenario extends HttpServlet  {

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
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
		 
		ScenarioDao  cDao = ( ScenarioDao )WebApplicationContextUtils.getWebApplicationContext(getServletContext()).getBean("scenarioDao");
		
		String strResult = "";
		String strAction = request.getParameter( "action" );
		
		if( strAction.equals("query") ) // 查询
		{
			String strID,strType,strDeviceID="";
			strID = request.getParameter( "type" );
			strType = strID.substring(strID.length()-1, strID.length());
			strID = strID.substring(0, strID.length()-1);
			strID = String.valueOf(Integer.parseInt(strID)-13);
			//strDeviceID=request.getParameter( "ID" );
			
			JSONObject jsonObject;
			if(  strType.equals( "1") ){
				jsonObject=JSONObject.fromObject(request.getParameter("val"));
				strDeviceID=jsonObject.get("ID").toString();
			}
			
				if(  strType.equals( "0" ) ){
					strResult = cDao.GetConstructionFeature(ServerURL.conn,strID);
				}
				else if(  strType.equals( "1" ) ){
					strResult = cDao.GetConstructionAttribute(ServerURL.conn,strDeviceID,strID);	
				}
				else if(  strType.equals( "2" ) ){
					strResult = cDao.GetConstructionSection(ServerURL.conn,strID);	
				}
			
		}
		else // 插入、更新、删除
		{
			String strValue;
			strValue=request.getParameter( "val" );
			strResult = cDao.EditConstruction(ServerURL.conn,strAction,strValue);
		}
		
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
	}

}

