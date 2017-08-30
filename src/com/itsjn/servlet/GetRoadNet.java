package com.itsjn.servlet;

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
import com.itsjn.dao.RoadNetDao;
public class GetRoadNet extends HttpServlet {

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
		
		RoadNetDao  cDao = ( RoadNetDao )WebApplicationContextUtils.getWebApplicationContext(getServletContext()).getBean("roadnetDao");
		
		String strResult = "";
		String strAction = request.getParameter( "action" );
		
		if( strAction.equals("query") )
		{
			String strType = request.getParameter( "type" );
			strType = strType.substring(0, strType.length()-1); // 与GetDevice保持一致
			
			if( strType.equals( "3" )){ // 路网
				strResult = cDao.GetRoadNetFeature(ServerURL.conn);
				//strResult = cDao.GetOtherFeature(ServerURL.conn,"gis_net");
			}
			else if( strType.equals( "1" )){ // 节点
				String strParam= request.getParameter( "pa" );
				strResult = cDao.GetNodeFeature(ServerURL.conn,strParam);
				//strResult = cDao.GetOtherFeature(ServerURL.conn,"input_link");
			}
			else if( strType.equals( "2" )){ // 中心点
				String strParam= request.getParameter( "pa" );
				strResult = cDao.GetCentralNodeFeature(ServerURL.conn);
				//strResult = cDao.GetOtherFeature(ServerURL.conn,"input_link");
			}
			else if( strType.equals( "4" )){ // 气象
				strResult = cDao.GetOtherFeature(ServerURL.conn,"gis_weather_net");
			}
			else if( strType.equals( "5" )){ // 安全
				strResult = cDao.GetOtherFeature(ServerURL.conn,"gis_security_net");
			}
			else if( strType.equals( "6" )){ // 根据范围查询路网
				String strParam= request.getParameter( "pa" );
				strResult = cDao.GetRoadNetFeatureByExtent(ServerURL.conn,strParam);
			}
			else if( strType.equals( "7" )){ //地铁站点
				strResult = cDao.GetSubNodeFeatrue(ServerURL.conn);
			}
			else if( strType.equals( "8" )){ //地铁线路
				strResult = cDao.GetSubwayNetFeature(ServerURL.conn);
			}
		}
		
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
	}

}
