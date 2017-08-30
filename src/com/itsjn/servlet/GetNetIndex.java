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
import com.itsjn.dao.NetIndexDao;
public class GetNetIndex extends HttpServlet {

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
		
		NetIndexDao  cDao = ( NetIndexDao )WebApplicationContextUtils.getWebApplicationContext(getServletContext()).getBean("netindexDao");
		
		String strResult = "";
		String strAction = request.getParameter( "action" );
		
		if( strAction.equals("query") )
		{
			String strData;
			String strType = request.getParameter( "type" );
			String strParam= request.getParameter( "pa" );
			String [] arrParam=strParam.split(",");
			
			strData=strType.substring(strType.length()-1, strType.length());
			strType = strType.substring(0, strType.length()-1);
			
			if( strType.equals( "1" )){ // tpi和统计
				if( strData.equals("0"))
					strResult = cDao.GetTPI(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"rea");
				else if( strData.equals("1") )
					strResult = cDao.GetStatistics(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"rea");
				else if( strData.equals("2") )
					strResult = cDao.GetTPI(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"sim");
				else if( strData.equals("3") )
					strResult = cDao.GetStatistics(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"sim");
			}
			else if( strType.equals( "2" )){ // tcr和统计
				if( strData.equals("0"))
					strResult = cDao.GetTCR(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"rea");
				else if( strData.equals("1") )
					strResult = cDao.GetStatistics(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"rea");
				else if( strData.equals("2"))
					strResult = cDao.GetTCR(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"sim");
				else if( strData.equals("3") )
					strResult = cDao.GetStatistics(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"sim");
			}
			else if( strType.equals( "3" )){ // ocs
				strResult = cDao.GetOCS(ServerURL.conn,arrParam[0],arrParam[1],Integer.valueOf(arrParam[2]));
			}
			else if( Integer.valueOf(strType)>=4&&Integer.valueOf(strType)<=7){ // tsi vic tvd tes
				strResult = cDao.GetServiceEvaluation(ServerURL.conn,arrParam[0],arrParam[1],strType);
			}
			else if( strType.equals( "8" )){ // ckr
				if( strData.equals("0"))
					strResult = cDao.GetCKR(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"rea");
				else if( strData.equals("1") )
					strResult = cDao.GetStatistics(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"rea");
				else if( strData.equals("2"))
					strResult = cDao.GetCKR(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"sim");
				else if( strData.equals("3") )
					strResult = cDao.GetStatistics(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"sim");
			}
			else if( strType.equals( "9" )){ // ckt
				if( strData.equals("0"))
					strResult = cDao.GetCKT(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"rea");
				else if( strData.equals("1") )
					strResult = cDao.GetStatistics(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"rea");
				else if( strData.equals("2"))
					strResult = cDao.GetCKT(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"sim");
				else if( strData.equals("3") )
					strResult = cDao.GetStatistics(ServerURL.conn,arrParam[0],arrParam[1],arrParam[2],"sim");
			}
			
			else if( strType.equals( "90" )){
				strResult = cDao.GetInputDemand(ServerURL.conn,arrParam[0],arrParam[1]);
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
