package com.itsjn.listener;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import java.sql.Connection;     //������ݿ����Ӷ���
import java.sql.DriverManager;  //������ݿ���������
import java.sql.SQLException;   //�������SQL�����쳣����

import com.itsjn.config.ServerURL;


public class ApplicationInitializeListener implements ServletContextListener {

	public ApplicationInitializeListener() {
		// TODO Auto-generated constructor stub
		
	}

	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		System.out.println( "ITSJN ����ֹͣ" );

	}

	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		 
		 String xmlPath =  arg0.getServletContext().getRealPath("/") + 
		 arg0.getServletContext().getInitParameter("config_xml");
		 System.out.println( "config-path:" + xmlPath );
		 // ����
		 try
		 {
			 SAXReader reader = new  SAXReader();  
	         Document  doc = reader.read( xmlPath );
	         Element elem =  doc.getRootElement();
	         Element childelem = elem.element( "server-url" );
	         ServerURL.CAR_DATA_BASE_URL = childelem.getText();
	         System.out.println( "server-url:" + ServerURL.CAR_DATA_BASE_URL );
		 }
		 catch( DocumentException ex )
		 {
			 System.out.println( ex.getMessage() );
		 }
		 ServerURL.WEB_ROOT_DIR = arg0.getServletContext().getRealPath("/");
		 ServerURL.WEB_ROOT_URL = arg0.getServletContext().getInitParameter("WebRoot");
		 System.out.println( ServerURL.WEB_ROOT_URL );
		 
		 //String url = "jdbc:mysql://127.0.0.1:5432:3306/fangzhen_schema?user=root&password=root";
		 String url = "jdbc:postgresql://127.0.0.1:5432/langfang1?user=root&password=root";
		 try{
			 //Class.forName( "com.mysql.jdbc.Driver" );
			 Class.forName( "org.postgresql.Driver" );
			 ServerURL.conn = DriverManager.getConnection(url);
		 }
		 catch( SQLException e)
		 {
			 int ab=0;
		 }
		 
		 catch( ClassNotFoundException e)
		 {
			 int cd=0;
		 }
		 
		 if( ServerURL.conn==null )
			 System.out.println( "服务开始" );	
	}

}
