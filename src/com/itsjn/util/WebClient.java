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
 * ��ȡURL��ַ���ݷ�װ
 * 
 * @author continue
 * @version v1.0 2010-06-29
 */
public class WebClient {

	private static String _newLine = System.getProperty("line.separator");

	public WebClient() {

	}

	/**
	 * ��ȡ����URL��ַ������
	 * @param url				URL��ַ
	 * @param oriEncoding		�������
	 * @param targetEncoding	�������
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
		// ����ƴ�յ�URL�������ӣ�URL.openConnection���������URL�����ͣ�
		// ���ز�ͬ��URLConnection����Ķ�������URL��һ��http�����ʵ�ʷ��ص���HttpURLConnection
		HttpURLConnection connection = (HttpURLConnection) getUrl
				.openConnection();
		connection.setRequestProperty("Accept", "text/xml");
		connection.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)"); 

		// �������ӣ�����ʵ����get requestҪ����һ���connection.getInputStream()�����вŻ���������
		// ������
		connection.connect();
		// ȡ������������ʹ��Reader��ȡ
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
