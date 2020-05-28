package dao;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import utils.DBUtil;
import utils.Encrypt;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import entity.DataTable;

public class TsCmd {
	private static Logger log = Logger.getLogger(TsCmd.class.getName());

	public String CmdAction = "";
	public String AppKey = "";
	public String DBInfoKey = "";
//	public String ActionParas = "";
	
	public String Ps="";
	public String DBKey="";
	public String Path="";
	public TsCmdResult CmdResult = new TsCmdResult();

	public static TsCmd getCmd(HttpServletRequest request) {
		TsCmd aCmd = new TsCmd();
		try {
			aCmd.CmdAction = TiIo.getHttpRequestPara(request, "Action", "");
			aCmd.AppKey = TiIo.getHttpRequestPara(request, "AppKey", "");
			aCmd.DBInfoKey = TiIo.getHttpRequestPara(request, "DBInfoKey", "");
		//	aCmd.ActionParas = TiIo.getHttpRequestPara(request, "ActionParas", "");
			System.out.println("acmd.cmdaction="+aCmd.CmdAction);
		//	System.out.println("aCmd.ActionParas="+aCmd.ActionParas);
			aCmd.DBKey=TiIo.getHttpRequestPara(request, "DBKey", "");
			aCmd.Ps=TiIo.getHttpRequestPara(request, "Ps", "");
			aCmd.Path=TiIo.getHttpRequestPara(request, "Path", "");
			System.out.println("acmd.DBKey="+aCmd.DBKey);
			System.out.println("acmd.Ps="+aCmd.Ps);
			System.out.println("acmd.Path="+aCmd.Path);
		} catch (Exception e) {
			log.info(e.getMessage());
		}
		return aCmd;
	}

	public String getResponseText() {
		String aRes = "";
		try {
//			switch (CmdAction) {
//			case "acExecuteDB":
//				acExecuteDB();
//				break;
//			case "acGetTables":
//				acGetTables();
//				break;
//			default:
//				acGetError();
//				break;
//			}
			System.out.println("cmdaction="+CmdAction);
			if(CmdAction.equals("acExecuteSql")){
//				System.out.println("执行acExecuteSql");
				acExecuteSql();
			}else if(CmdAction.equals("acGetTables")){
//				System.out.println("执行acGetTables");
				acGetTables();
			}else if(CmdAction.equals("acWxGetJsConfig")){
//				System.out.println("执行acWxGetJsConfig");
			//	acWxGetJsConfig();
			}
			else{
				acGetError();
			}
		} catch (Exception e) {
			CmdResult.ErrorList.add(e.getMessage());
			log.info(e.getMessage());
		}
		aRes = JSON.toJSONString(CmdResult);
		System.out.println("aRes="+aRes);
		return aRes;
	}

@SuppressWarnings("unchecked")
	public void acExecuteSql() {
//		try {
//			Map<String, Map<String, String>> aPs = (Map<String, Map<String, String>>) JSON.parse(this.ActionParas);
//			String aPath = aPs.get("Path").get("Path");
//			Map<String, String> aParas = aPs.get("Paras");
//			CmdResult.Datas = "";
//			CmdResult.State = TiDB.executeSql(aPath, aParas, CmdResult.ErrorList) ? 1 : 0;
//		} catch (Exception er) {
//			CmdResult.ErrorList.add(er.getMessage());
//			log.info(er.getMessage());
//		}
	try{
		System.out.println("进入acExecuteSql");
		Map<String, String> aParas = (Map<String, String>) JSON.parse(this.Ps);
		for(String key:aParas.keySet()){
			if(key.equals("stupwd")){
				if(aParas.get(key).length()>0){
				aParas.put(key, Encrypt.e(aParas.get(key)));
				}
			}
			System.out.println(key+"="+aParas.get(key));
		}
		CmdResult.Datas = "";
		CmdResult.State = TiDB.executeSql(this.Path, aParas, CmdResult.ErrorList) ? 1 : 0;
	}catch (Exception er) {
		CmdResult.ErrorList.add(er.getMessage());
		log.info(er.getMessage());
	}
	}

	@SuppressWarnings("unchecked")
	public void acGetTables() {
//		try {
//			System.out.println("进入acGetTables");
//			Map<String, Map<String, String>> aPs = (Map<String, Map<String, String>>) JSON.parse(this.ActionParas);
//			Map<String, String> aTables = aPs.get("Tables");
//			Map<String, String> aTargetTables = new HashMap<String, String>();
//			for (String aTab : aTables.keySet()) {
//				String aFn = aTables.get(aTab);
//				aTargetTables.put(aTab, aFn);
//			}
//			Map<String, String> aParas = aPs.get("Paras");
//			Map<String, Object> maps = TiDB.getDataSet(aTargetTables, aParas, CmdResult.ErrorList);
//			CmdResult.Datas = JSONObject.toJSON(maps);
//			CmdResult.State = 1;
//		} catch (Exception er) {
//			CmdResult.ErrorList.add(er.getMessage());
//			log.info(er.getMessage());
//		}
		try {
//			System.out.println("进入acGetTables");
		Map<String, String> aParas = (Map<String, String>) JSON.parse(this.Ps);
		for(String key:aParas.keySet()){
			if(key.equals("Pwd")){
				aParas.put(key, Encrypt.e(aParas.get(key)));
			}
	//		System.out.println(key+"="+aParas.get(key));
		}
		String sql=TiIo.getSql(this.Path, aParas, CmdResult.ErrorList);
		System.out.println(sql);
		DataTable adt = new DataTable();
		
			ResultSet rs = DBUtil.Select(this.DBKey, sql);
			adt = TiDB.getDataTable(rs);
		
		List<Map<String, Object>> li = new ArrayList<Map<String, Object>>();
		li = DataTable.getListData(adt);
		Map<String, Object> maps = new HashMap<String, Object>();
		maps.put(this.DBKey, li);
		CmdResult.Datas = JSONObject.toJSON(maps);
		CmdResult.State = 1;
		} catch (Exception er) {
			
				CmdResult.ErrorList.add(er.getMessage());
			
			log.info(er.getMessage());
		}
	}

	public void acGetError() {
		CmdResult.ErrorList.add("没有提供相应的Action");
	}

	class TsCmdResult implements java.io.Serializable {
		private static final long serialVersionUID = 1L;
		public int State = 0;// 是否成功
		public Object Datas = "";// 其他信息
		public List<String> ErrorList = new ArrayList<String>();// 提示信息
	}

}
