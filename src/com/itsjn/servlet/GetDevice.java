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
import com.itsjn.dao.DeviceDao;
public class GetDevice extends HttpServlet {

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
		
		// action=query&type=110&ID=1&DT=1 车辆管理
		DeviceDao  cDao = ( DeviceDao )WebApplicationContextUtils.getWebApplicationContext(getServletContext()).getBean("deviceDao");
		
		String strResult = "";
		String strAction = request.getParameter( "action" );
		
		String strID,strType,strDeviceID="",strDataType="";
		strID = request.getParameter( "type" ); //数据种类+数据项
		strType = strID.substring(strID.length()-1, strID.length());
		strID = strID.substring(0, strID.length()-1);
		
		if( strAction.equals("query") )
		{	
			JSONObject jsonObject;
			if(  strType.equals( "1") ){
				strDataType=request.getParameter( "val" );
				jsonObject=JSONObject.fromObject(request.getParameter("val"));
				strDeviceID=jsonObject.get("ID").toString();
				strDataType=request.getParameter( "DT" );
			}
			else{
				strDeviceID=request.getParameter("ID");
				strDataType=request.getParameter( "DT" );
			}
			
			if( strID.equals( "1" )){ // 节点
				strResult = cDao.GetAttribute(ServerURL.conn,strDeviceID,"input_node");
			}
			else if( strID.equals( "3" )){ // 路网
				strResult = cDao.GetAttribute(ServerURL.conn,strDeviceID,"input_link");
			}
			else if( strID.equals( "4" )){ // 小区
				if(  strType.equals( "0" ) )
					strResult = cDao.GetZoneFeature(ServerURL.conn);
				else
					strResult = cDao.GetZoneAttribute(ServerURL.conn,strDeviceID);
			}
			else if( strID.equals( "5" )){ // 中心点
				if(  strType.equals( "0" ) )
					strResult = cDao.GetFeature(ServerURL.conn,"input_activity_location");
				else
					strResult = cDao.GetAttribute(ServerURL.conn,strDeviceID,"input_activity_location");
			}
			else if( strID.equals( "6" )){ // 信号机设备
				if(  strType.equals( "0" ) )
					strResult = cDao.GetFeature(ServerURL.conn,"input_device_signal_attr");
				else if(  strType.equals( "1" ) )
					strResult = cDao.GetAttribute(ServerURL.conn,strDeviceID,"input_device_signal_attr");
				else if(  strType.equals( "2" ) )
					strResult = cDao.GetSingnalCoordnation(ServerURL.conn);
				else if(  strType.equals( "3" ) )
					strResult = cDao.GetSingnalPhaseMap(ServerURL.conn,strDeviceID);
				else if(  strType.equals( "4" ) )
					strResult = cDao.GetSingnalCoordnation(ServerURL.conn);
			}
			else if( strID.equals( "7" )){ // 路段设备
				if(  strType.equals( "0" ) )
					strResult = cDao.GetFeature(ServerURL.conn,"input_device_section_attr");
				else
					strResult = cDao.GetAttribute(ServerURL.conn,strDeviceID,"input_device_section_attr");
			}
			else if( strID.equals( "8" )){ // 路口设备
				if(  strType.equals( "0" ) )
					strResult = cDao.GetFeature(ServerURL.conn,"input_device_cross_attr");
				else
					strResult = cDao.GetAttribute(ServerURL.conn,strDeviceID,"input_device_cross_attr");
			}
			else if( strID.equals( "9" )){ // 旅行时间设备
				if(  strType.equals( "0" ) )
					strResult = cDao.GetFeature(ServerURL.conn,"input_device_traveltime_attr");
				else
					strResult = cDao.GetAttribute(ServerURL.conn,strDeviceID,"input_device_traveltime_attr");
			}
			else if( strID.equals( "10" )){ // 天气设备
				if(  strType.equals( "0" ) )
					strResult = cDao.GetFeature(ServerURL.conn,"input_device_weather_attr");
				else
					strResult = cDao.GetAttribute(ServerURL.conn,strDeviceID,"input_device_weather_attr");
			}
			else if( strID.equals( "11" )){ // 诱导屏设备
				if(  strType.equals( "0" ) )
					strResult = cDao.GetFeature(ServerURL.conn,"input_device_screen_attr");
				else
					strResult = cDao.GetAttribute(ServerURL.conn,strDeviceID,"input_device_screen_attr");
			}
			else if( strID.equals( "12" )){ // 相机设备
				if(  strType.equals( "0" ) )
					strResult = cDao.GetFeature(ServerURL.conn,"input_device_camera_attr");
				else
					strResult = cDao.GetAttribute(ServerURL.conn,strDeviceID,"input_device_camera_attr");
			}
			else if( strID.equals( "13" )){ // 环境设备
				if(  strType.equals( "0" ) )
					strResult = cDao.GetFeature(ServerURL.conn,"input_device_environment_attr");
				else
					strResult = cDao.GetAttribute(ServerURL.conn,strDeviceID,"input_device_environment_attr");

			}
			else if( strID.equals( "32" )){ // 物质信息
				if(  strType.equals( "0" ) )
					strResult = cDao.GetMaterialFeature(ServerURL.conn);
				else
					strResult = cDao.GetMaterialAttribute(ServerURL.conn,strDeviceID);
			}
			else if( strID.equals( "33" )){ // 人员信息
				if(  strType.equals( "0" ) )
					strResult = cDao.GetPersonFeature(ServerURL.conn);
				else
					strResult = cDao.GetPersonAttribute(ServerURL.conn,strDeviceID);
			}
			else if( strID.equals( "34" )){ // 车辆信息
				if(  strType.equals( "0" ) )
					strResult = cDao.GetVechicleFeature(ServerURL.conn,strDataType);
				else
					strResult = cDao.GetVechicleAttribute(ServerURL.conn,strDeviceID,strDataType);
			}
			
			else if( strID.equals( "35" )){ // 主动诱导
				if(  strType.equals( "0" ) )
					strResult = cDao.GetFeature(ServerURL.conn,"traffic_induction");
				else
					strResult = cDao.GetAttribute(ServerURL.conn,strDeviceID,"traffic_induction");
			}
			else if( strID.equals( "50" )){ // 站点
				if(  strType.equals( "0" ) )
					strResult = cDao.GetFeature(ServerURL.conn,"sub_input_stop");
				else
					strResult = cDao.GetAttribute(ServerURL.conn,strDeviceID,"sub_input_stop");
			}
		}
		else{
			String strValue;
			strValue=request.getParameter( "val" );
			boolean bMultiLine=false;
			if(strValue.indexOf(']')>=0)
				bMultiLine=true;
			
			if( strID.equals( "6" )){ // 信号机设备
				if(  strType.equals( "0" ) ){
					strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"input_device_signal_attr",false,false);
				}
				else if(strType.equals( "3" )){
					strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"signal_phase_map",bMultiLine,false);
				}else if(strType.equals( "2" )){
					strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"signal_coordnation",bMultiLine,false);
				}
			}
			else if( strID.equals( "7" )){ // 路段
				strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"input_device_section_attr",true,true);
			}
			else if( strID.equals( "8" )){ // 路口
				strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"input_device_cross_attr",true,true);
			}
			else if( strID.equals( "9" )){ // 旅行时间
				strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"input_device_traveltime_attr",true,true);
			}else if( strID.equals( "10" )){ // 气象管理
				strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"input_device_weather_attr",true,true);
			}else if( strID.equals( "11" )){ // 诱导屏
				strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"input_device_screen_attr",true,true);
			}else if( strID.equals( "12" )){ // 相机
				strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"input_device_camera_attr",true,true);
			}else if( strID.equals( "13" )){ // 环境设备
					strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"input_device_environment_attr",true,true);
			}
			else if( Integer.parseInt(strID)>13 && Integer.parseInt(strID)<32){ // 事件
					strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"scenario_attr",true,true);
			}else if( strID.equals( "32" )){ // 人员管理
					strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"man_person_info",true,true);
				
			}else if( strID.equals( "33" )){ // 物资管理
					strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"man_material_info",true,true);
				
			}else if( strID.equals( "34" )){ // 车辆管理
					strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"man_vechicle_info",true,true);
				
			}else if( strID.equals( "35" )){ // 主动诱导管理 
					strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"traffic_induction",true,true);
			}
			else if( strID.equals( "50" )){ // 地铁站点
				strResult = cDao.EditSignalAttribute(ServerURL.conn,strAction,strValue,"sub_input_stop",bMultiLine,false);
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
