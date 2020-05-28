package dao;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import entity.DataColumn;
import entity.DataRow;
import entity.DataTable;

import utils.DBUtil;

public class TiDB {
	private static Logger log = Logger.getLogger(TiDB.class.getName());

	// 执行SQL操作
	public static Boolean executeSql(String aSql, List<String> aErrors) {
		Boolean aFlag = false;
		try {
			DBUtil.Execute(aSql);
			aFlag = true;
		} catch (Exception er) {
			if (aErrors != null) {
				aErrors.add(aSql);
				aErrors.add(er.getMessage());
			}
			log.info(er.getMessage());
		}
		return aFlag;
	}

	// 执行SQL文件及参数表的SQL操作
	public static Boolean executeSql(String aSqlFn, Map<String, String> aPs, List<String> aErrors) {
		String aSql = TiIo.getSql(aSqlFn, aPs, aErrors);
		System.out.println(aSql);
		return executeSql(aSql, aErrors);
	}

	public static Map<String, Object> getDataSet(Map<String, String> aTables, Map<String, String> aPs,
			List<String> aErrors) {
		Map<String, Object> maps = new HashMap<String, Object>();
		List<Map<String, Object>> li = new ArrayList<Map<String, Object>>();
		try {
			for (String aTable : aTables.keySet()) {
				DataTable adt = getTable(aTables.get(aTable), aPs, aErrors);
				li = DataTable.getListData(adt);
				maps.put(aTable, li);
				li = new ArrayList<Map<String, Object>>();
			}
		} catch (Exception er) {
			log.info(er.getMessage());
			aErrors.add(er.getMessage());
		}
		return maps;

	}

	public static DataTable getTable(String aSql, List<String> aErrors) {
		DataTable adt = new DataTable();
		try {
			ResultSet rs = DBUtil.Select(aSql);
			adt = getDataTable(rs);
		} catch (Exception er) {
			if (aErrors != null) {
				aErrors.add(aSql);
				aErrors.add(er.getMessage());
			}
			log.info(er.getMessage());
		}
		return adt;
	}

	private static DataTable getTable(String aPara, String aSql, List<String> aErrors) {
		DataTable adt = new DataTable();
		try {
			ResultSet rs = DBUtil.Select(aPara, aSql);
			adt = getDataTable(rs);
		} catch (Exception er) {
			if (aErrors != null) {
				aErrors.add(aSql);
				aErrors.add(er.getMessage());
			}
			log.info(er.getMessage());
		}
		return adt;
	}

	public static DataTable getDataTable(ResultSet rs) {
System.out.println("进入TIDB.getdatatable");
		DataTable t = null;
		try {
			ResultSetMetaData rsmd = rs.getMetaData();
	//		System.out.println("count="+rsmd.getColumnCount());
			List<DataRow> row = new ArrayList<DataRow>();// 表所有行集合
			List<DataColumn> col = null;// 行所有列集合
			DataRow r = null; // 单独一行
			DataColumn c = null;// 单独一列
			// 此处开始循环读数据，每次往表格中插入一行记录
		//	System.out.println("next="+rs.next());
			while (rs.next()) {
			//	System.out.println("进入while");
				// 初始化行集合，
				// 初始化列集合
				col = new ArrayList<DataColumn>();
				// 此处开始列循环，每次向一行对象插入一列
				for (int i = 1; i <= rsmd.getColumnCount(); i++) {
					String columnName = rsmd.getColumnName(i);
			//		System.out.println("columnName="+columnName);
					Object value = rs.getObject(columnName);
			//		System.out.println("value="+value);
					// 初始化单元列
					if(value==null) {
						value="";
					}
					c = new DataColumn(columnName, value);
					// 将列信息加入列集合
					col.add(c);
				}
				// 初始化单元行
				r = new DataRow(col);
				// 将行信息降入行结合
				row.add(r);
			}
			// 得到数据表
			t = new DataTable(row);
		} catch (SQLException e) {
			e.printStackTrace();

			log.info(e.getMessage());
		}
		return t;
	}

	// 根据文件名与参数表返回查询结果
	public static DataTable getTable(String aSqlFn, Map<String, String> aPs, List<String> aErrors) {
		String aSql = "";
		String aPara = "";
		try {
			aSql = TiIo.getSql(aSqlFn, aPs, aErrors);
			aPara = aPs.get("DBKey");
		} catch (Exception e) {
			aErrors.add(e.getMessage());
		}
		if (aPara != null) {
			return getTable(aPara, aSql, aErrors);
		} else {
			return getTable(aSql, aErrors);
		}
	}

}