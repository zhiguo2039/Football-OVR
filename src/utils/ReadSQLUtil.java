package utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.apache.log4j.Logger;

import constant.GlobalParas;
import dao.TiIo;

public class ReadSQLUtil {

	private static Logger log = Logger.getLogger(ReadSQLUtil.class);

	public static String ReadSqlFromFile(String fileName) {
		String sql = "";
		try {
			File file = new File(GlobalParas.sqlPath + fileName);
			InputStream in = new FileInputStream(file);
			byte[] buf = new byte[8096];
			int size = 0;
			while ((size = in.read(buf)) != -1) {
				String tem = new String(buf, 0, size);
				sql += tem;
			}
			in.close();
		} catch (FileNotFoundException e) {
			log.error("Sql file not Found!");
			e.printStackTrace();
		} catch (IOException e) {
			log.error("Read sql file IOException!");
			e.printStackTrace();
		}
		return sql;
	}

	public static String ReadSqlFromHttp(String fileName) {
		String sql = "";
		try {
			sql = TiIo.HttpGet(GlobalParas.sqlPath + fileName);
			System.out.println(GlobalParas.sqlPath + fileName);
		} catch (Exception e) {
			log.info(e.getMessage());
		}
		return sql;
	}

	public static String Query(String fileName) {
		String sql = "";
		String sqlPath = "E:\\temp\\Datas\\DBSqls\\";
		try {
			File file = new File(sqlPath + fileName);
			InputStream in = new FileInputStream(file);
			byte[] buf = new byte[8096];
			int size = 0;
			while ((size = in.read(buf)) != -1) {
				String tem = new String(buf, 0, size);
				sql += tem;
			}
			in.close();
		} catch (FileNotFoundException e) {
			log.error("Sql file not Found!");
			e.printStackTrace();
		} catch (IOException e) {
			log.error("Read sql file IOException!");
			e.printStackTrace();
		}
		return sql;
	}

}
