package utils;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

import utils.ConnectionFactory;

public class ConnectionFactory {

	private static String driver;
	private static String url;
	private static String user;
	private static String password;

	private static final ConnectionFactory FACTORY = new ConnectionFactory();
	private Connection conn;

	static {// 静态代码块，初始化类（执行一次），对类的属性进行赋值，用于属性文件的加载
		Properties prop = new Properties();// 用于处理属性文件的键值对
		try {
			InputStream in = ConnectionFactory.class.getClassLoader().getResourceAsStream("dbconfig.properties");// 属性文件中的内容
			prop.load(in);// 从输入流中读取属性列表
		} catch (Exception e) {
			System.out.println("=======配置文件读取错误=======");
		}

		driver = prop.getProperty("driver");
		url = prop.getProperty("url");
		user = prop.getProperty("user");
		password = prop.getProperty("password");
		System.out.println("连接参数"+driver+" "+url+" "+user+" "+password);
	}

	private ConnectionFactory() {

	}

	public static ConnectionFactory getInstance() {// // 单例模式，只有一个connectionfactory存在
		return FACTORY;
	}

	public Connection makeConnection() {
		try {
			Class.forName(driver);
			conn = DriverManager.getConnection(url, user, password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}

	public static void main(String[] args) {
		try {
			Class.forName(driver);
			// String URL =
			// "jdbc:jtds:sqlserver://223.68.171.138:15033;DatabaseName=BT_Wx";
			String URL = "jdbc:jtds:sqlserver://10.160.68.99:1433/;databaseName=OVR_DatabaseFBL";
			String USER = "sa";
			String PASSWORD = "WuHan2019";
			Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
			System.out.println(conn);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}