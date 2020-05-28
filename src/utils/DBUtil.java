package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.log4j.Logger;

import constant.Constant;

import entity.DBInfo;

public class DBUtil {

	private static Logger log = Logger.getLogger(DBUtil.class);

	// ��ݿ��ַ
	private static String driver = "{DBDriver}";

	private static String url = "{DBUrl}";

	// �û���
	private static String user = "{DBUser}";

	// ����
	private static String password = "{DBPassword}";

	private static Connection conn = null;
	private static DBInfo dbInfo = null;

	/**
	 * 
	 * @Title: getConnection
	 * @Description:获取连接
	 * @return Connection
	 */
	public static Connection getConnection() {
		try {
			return ConnectionFactory.getInstance().makeConnection();
		} catch (Exception ex) {
			log.error("SQL Server connect error! errmsg:{}", ex);
			return null;
		}
	}

	/**
	 * 
	 * @Title: Select
	 * @Description: 执行select 查询数据库
	 * @param SQL
	 * @return ResultSet 数据结合
	 */
	public static ResultSet Select(String SQL) {
		System.out.println("进入dbutil.select1()");
		Connection conn = getConnection();
		Statement statement = null;
		ResultSet rs = null;
		try {
			statement = conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);
			rs = statement.executeQuery(SQL);
		} catch (Exception e) {
			log.error("Select from sql server error! errmsg:{}", e);
		}
		return rs;
	}

	/**
	 * 
	 * @Title: Execute
	 * @Description: 执行SQL语句（insert、update、delete）
	 * @param SQL
	 *            void
	 */
	public static void Execute(String SQL) {
		Connection conn = getConnection("DB");
		Statement statement = null;
		try {
			statement = conn.createStatement();
			statement.execute(SQL);
		} catch (Exception e) {
			log.error("Execute sql error! errmsg:{}", e);
		} finally {
			try {
				statement.close();
				conn.close();
			} catch (SQLException e) {
				log.error("Close the Statement or Connection error! errmsg:{}", e);
			}
		}
	}

	public static Connection getConnection(String DBInfoKey) {
		try {

			if (Constant.dBMap == null) {
				Constant.initDB();
			}
			dbInfo = Constant.dBMap.get(DBInfoKey);
			System.out.println("dbinfo="+dbInfo);
			if (dbInfo != null) {
				Class.forName(dbInfo.getDriver());
				conn = DriverManager.getConnection(dbInfo.getUrl(), dbInfo.getUser(), dbInfo.getPassword());
			}
			return conn;
		} catch (Exception ex) {
			log.error("SQL Server connect error! errmsg:{}", ex);
			return null;
		}
	}

	public static ResultSet Select(String DBInfoKey, String SQL) {
		System.out.println("进入dbutil.select2()");
		Connection conn = getConnection(DBInfoKey);
		Statement statement = null;
		ResultSet rs = null;
		try {
			statement = conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);
			rs = statement.executeQuery(SQL);
		} catch (Exception e) {
			log.error("Select from sql server error! errmsg:{}", e);
		}
	//	System.out.println(rs);
		return rs;
	}

	public static void Execute(String DBInfoKey, String SQL) {
		Connection conn = getConnection(DBInfoKey);
		Statement statement = null;
		try {
			statement = conn.createStatement();
			statement.execute(SQL);
		} catch (Exception e) {
			log.error("Execute sql error! errmsg:{}", e);
		} finally {
			try {
				statement.close();
				conn.close();
			} catch (SQLException e) {
				log.error("Close the Statement or Connection error! errmsg:{}", e);
			}
		}
	}

	/**
	 * 执行写操作
	 * 
	 * @param sql
	 * @param params
	 */
	public static void execute(String sql, Object[] params) {
		Connection conn = null;
		PreparedStatement ps = null;
		try {
			conn = getConnection("DB");
			ps = conn.prepareStatement(sql);
			if (params != null) {
				for (int i = 0; i < params.length; ++i) {
					ps.setObject(i + 1, params[i]);
				}
			}
			ps.execute();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (ps != null) {
				try {
					ps.close();
				} catch (SQLException e) {
				}
			}

			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
				}
			}
		}
	}

	/**
	 * 查询方法
	 * 
	 * @param sql
	 * @param params
	 * @param handler
	 */
	@SuppressWarnings("rawtypes")
	public static Object query(String sql, Object[] params, DataHandler handler) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = getConnection();
			ps = conn.prepareStatement(sql);

			if (params != null) {
				for (int i = 0; i < params.length; ++i) {
					ps.setObject(i + 1, params[i]);
				}
			}
			rs = ps.executeQuery();
			return handler.handle(rs);
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
				}
			}

			if (ps != null) {
				try {
					ps.close();
				} catch (SQLException e) {
				}
			}

			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
				}
			}
		}
	}

}