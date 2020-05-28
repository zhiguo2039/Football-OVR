package constant;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import entity.DBInfo;

public class Constant {
	
	private static Logger log = Logger.getLogger(Constant.class.getName());
	public static Map<String, DBInfo> dBMap = new HashMap<String, DBInfo>();

	public static void initDB() {
		DBInfo dbInfo = null;
		try {
			dbInfo = new DBInfo("net.sourceforge.jtds.jdbc.Driver",
					"jdbc:jtds:sqlserver://10.160.68.99:1433/;databaseName=OVR_DatabaseFBL", "sa", "WuHan2019");
			dBMap.put("DA", dbInfo);
			log.info(dBMap.get("DA"));
		} catch (Exception e) {
			log.info(e.getMessage());
		}
		

	}

}
