package com.itsjn.util;



import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.beans.Encoder;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import com.sun.org.apache.xerces.internal.impl.io.UTF8Reader;

/**
 * 获取URL地址数据封装
 * 
 * @author continue
 * @version v1.0 2010-06-29
 */
public class WebClient {

	private static String _newLine = System.getProperty("line.separator");

	public WebClient() {

	}

	/**
	 * 获取给定URL地址的数据
	 * @param url				URL地址
	 * @param oriEncoding		输入编码
	 * @param targetEncoding	输出编码
	 * @return
	 * @throws IOException
	 */
	public String getContent(String url, String oriEncoding,
			String targetEncoding) throws IOException {

//		URL u = new URL(url);
//		URLConnection uc = u.openConnection();
//		BufferedReader in;
//
//		if (oriEncoding == null || oriEncoding.length() == 0) {
//			in = new BufferedReader(new InputStreamReader(uc.getInputStream()));
//		}
//		else {
//			in = new BufferedReader(new InputStreamReader(uc.getInputStream(),
//					oriEncoding));
//		}
//
//		String line;
//		StringBuilder sb = new StringBuilder();
//
//		while ((line = in.readLine()) != null) {
//			sb.append(line);
//			sb.append(_newLine);
//		}
//
//		if (targetEncoding == null || targetEncoding.length() == 0) {
//			return sb.toString();
//		}
//
//		return new String(sb.toString().getBytes(), targetEncoding);
		
		URL getUrl = new URL(url);
		// 根据拼凑的URL，打开连接，URL.openConnection函数会根据URL的类型，
		// 返回不同的URLConnection子类的对象，这里URL是一个http，因此实际返回的是HttpURLConnection
		HttpURLConnection connection = (HttpURLConnection) getUrl
				.openConnection();
		connection.setRequestProperty("Accept", "text/xml");
		connection.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)"); 

		// 进行连接，但是实际上get request要在下一句的connection.getInputStream()函数中才会真正发到
		// 服务器
		connection.connect();
		// 取得输入流，并使用Reader读取
		BufferedReader reader = null ;
		if (targetEncoding != null ) {
			reader = new BufferedReader(new InputStreamReader(
					connection.getInputStream() , targetEncoding )); 
		}
		else {
			reader = new BufferedReader(new InputStreamReader(
					connection.getInputStream() ));
		}
		StringBuilder sb = new StringBuilder();
		String line = null;
		while ((line = reader.readLine()) != null) {
			line += _newLine;
			sb.append(line);
		}
		reader.close();
		connection.disconnect();
		return sb.toString();
	}

}
