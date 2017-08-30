package com.itsjn.util;



import java.io.IOException;
import java.io.File;
import java.io.StringBufferInputStream;

import java.lang.String;

import java.util.logging.Level;
import java.util.logging.Logger;

import java.net.URL;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.dom4j.DocumentException;
import org.dom4j.io.SAXReader;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import org.dom4j.DocumentException;
import org.dom4j.io.SAXReader;


import org.xml.sax.SAXException;



public class XmlUtil {
	private transient NodeList nodeList;

	private transient Document document;

	private String xmlFile;

	/**
	 * Read the XML document and create a nodelist.
	 *
	 * @param xmlFile the URL pointing to the file to read
	 * @throws IOException if xmlFile can't be found
	 */
	public XmlUtil(String xmlFile) throws IOException {
		this.xmlFile = xmlFile;
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory
					.newInstance();

			// build document
			DocumentBuilder builder = factory.newDocumentBuilder();
			document = builder.parse(new File(this.xmlFile));

			// generate the NodeList
			Element rootElement = document.getDocumentElement();
			nodeList = rootElement.getChildNodes();
		} catch (SAXException e) {
			Logger.getLogger("com.epeer").log(Level.WARNING,
					"SAXException, file: " + xmlFile.toString(), e);
		} catch (ParserConfigurationException e) {
			Logger.getLogger("com.epeer").log(Level.WARNING,
					"Error configuring parser", e);
		} catch (NullPointerException e) {
			Logger.getLogger("com.epeer").log(Level.WARNING,
					"Nullpointerexception: xmlFile = " + xmlFile.toString(), e);
		}
	}
	
	public XmlUtil(File xmlFile) throws IOException {
		
		try {
			this.xmlFile=xmlFile.getAbsolutePath();
			DocumentBuilderFactory factory = DocumentBuilderFactory
					.newInstance();

			// build document
			DocumentBuilder builder = factory.newDocumentBuilder();
			document = builder.parse(xmlFile);

			// generate the NodeList
			Element rootElement = document.getDocumentElement();
			nodeList = rootElement.getChildNodes();
		} catch (SAXException e) {
			Logger.getLogger("com.epeer").log(Level.WARNING,
					"SAXException, file: " + xmlFile.toString(), e);
		} catch (ParserConfigurationException e) {
			Logger.getLogger("com.epeer").log(Level.WARNING,
					"Error configuring parser", e);
		} catch (NullPointerException e) {
			Logger.getLogger("com.epeer").log(Level.WARNING,
					"Nullpointerexception: xmlFile = " + xmlFile.toString(), e);
		}
	}
	public XmlUtil(URL uri) throws DocumentException {

		SAXReader reader = new SAXReader();
		document = (Document) (reader.read(uri));

		// generate the NodeList
		Element rootElement = document.getDocumentElement();
		nodeList = rootElement.getChildNodes();

	}
	
	/**
	 * Read the XML document and create a nodelist.
	 *
	 * @param xmlFile the URL pointing to the file to read
	 * @throws IOException if xmlFile can't be found
	 */
	public XmlUtil(String xmlData, int novalue) throws IOException {
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory
					.newInstance();

			// build document
			DocumentBuilder builder = factory.newDocumentBuilder();
			document = builder.parse(new StringBufferInputStream(xmlData));

			// generate the NodeList
			Element rootElement = document.getDocumentElement();
			nodeList = rootElement.getChildNodes();
		} catch (SAXException e) {
			Logger.getLogger("com.epeer").log(Level.WARNING,
					"SAXException, file: " + xmlFile.toString(), e);
		} catch (ParserConfigurationException e) {
			Logger.getLogger("com.epeer").log(Level.WARNING,
					"Error configuring parser", e);
		} catch (NullPointerException e) {
			Logger.getLogger("com.epeer").log(Level.WARNING,
					"Nullpointerexception: xmlFile = " + xmlFile.toString(), e);
		}
	}
		
	/**
	 * Get the value held by the node <code>keyTag</code>. This is a convenience
	 * method, mostly for use when there is only one match for
	 * <code>keyTag</code>, because the first occurance is always returned.
	 *
	 * @param keyTag the node to search for
	 * @return the value held by the node <code>keyTag</code>, or
	 * <code>null</code> if not found
	 */
	public String getValue(String keyTag) {
		return searchNodeValue(nodeList, keyTag);
	}
	public boolean setValue(String keyTag,String value){
		try{
			Node node= searchNode(nodeList, keyTag);
			node.setNodeValue(value);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
		
	}

	/**
	 * Get the value held by the node <code>keyTag</code> and with the attribute
	 * <code>attrKey</code> having the value <code>attrValue</code>.
	 *
	 * @param keyTag the node to search for
	 * @param attrKey the name of the attribute holding <code>attrValue</code>
	 * @param attrValue the value held by <code>attrKey</code>
	 * @return the value held by the node <code>keyTag</code>, or
	 * <code>null</code> if not found
	 */
	public Node getValue(String keyTag, String attrKey, String attrValue) {
		return searchNodeValue(nodeList, keyTag, attrKey, attrValue);
	}

	/**
	 * Get the {@link Document} used by this XMLParser, or <code>null</code> if no
	 * valid Document has been initiated.
	 *
	 * @return the {@link Document} used by this XMLParser, or <code>null</code>
	 * if no valid Document has been initiated
	 */
	public Document getDocument() {
		return document;
	}
	private Node searchNode(NodeList nodeList, String keyTag) {
		for (int i = 0; i < nodeList.getLength(); i++) {
			try {
				Node node = nodeList.item(i);
				Node childNode = searchNode(node.getChildNodes(),
						keyTag);
				if(childNode!=null){
					return childNode;
				}
				if (node.getNodeName().equals(keyTag)) {
					Node aNode = node.getLastChild();
					return aNode;
				}
			} catch (NullPointerException e) {
				continue;
			}
		}
		return null;
	}
	private String searchNodeValue(NodeList nodeList, String keyTag) {
		// step through 'nodeList'
		for (int i = 0; i < nodeList.getLength(); i++) {
			try {
				Node node = nodeList.item(i);
				String returnedValue = searchNodeValue(node.getChildNodes(),
						keyTag);
				if (returnedValue != null)
					return returnedValue;
				// search for the tag 'keyTag'
				if (node.getNodeName().equals(keyTag)) {
					// get the value of the node
					Node aNode = node.getLastChild();
					return aNode.getNodeValue();
				}
			} catch (NullPointerException e) {
				continue;
			}
		}
		return null;
	}

	private Node searchNodeValue(NodeList nodeList, String keyTag,
			String attrKey, String attrValue) {
		// step through 'nodeList'
		for (int i = 0; i < nodeList.getLength(); i++) {
			try {
				Node node = nodeList.item(i);
				Node returnedNode = searchNodeValue(node.getChildNodes(),
						keyTag, attrKey, attrValue);

				if (returnedNode != null)
					return returnedNode;

				// search for the tag 'keyTag'
				if (node.getNodeName().equals(keyTag)) {
					Node attribute = node.getAttributes().getNamedItem(attrKey);
					if (attribute.getTextContent().equals(attrValue))
						return node;
				}
			} catch (NullPointerException e) {
				continue;
			}
		}
		return null;
	}
	
//	public static void main(String [] argv)
//	{
//		String xmlStr = "<?xml version='1.0' encoding='GB18030' ?>"; 
//		xmlStr += "<databaseconfig>";
//		xmlStr += "<driverclass>oracle.jdbc.driver.OracleDriver</driverclass>";
//		xmlStr += "<connection>jdbc:oracle:thin:@10.0.0.61:1521:gis</connection>";
//		xmlStr += "<username>bjlddb2007</username>";
//		xmlStr += "<password>bjlddb</password>";
//		xmlStr += "</databaseconfig>";
//
//		try{
//
//			XmlUtil fx = new XmlUtil("http://www.w3school.com.cn//example//xmle//xmle_note.xml");
//			if(fx != null){
//				System.out.println(fx.getValue("driverclass"));
//				System.out.println(fx.getValue("connection"));
//				System.out.println(fx.getValue("username"));
//				System.out.println(fx.getValue("password"));
//			}
//		}catch(Exception e){
//			e.printStackTrace();
//		}
//	}

	public NodeList getNodeList() {
		return nodeList;
	}

}
