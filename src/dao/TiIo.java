package dao;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;

import utils.ReadSQLUtil;

public class TiIo {
	private static Logger log = Logger.getLogger(TiIo.class.getName());

	// // 取得Request参数值
	public static String getHttpRequestPara(HttpServletRequest request, String aKey, String aDefaultValue) {
		String aRes = "";
		try {
			String aFlag = request.getParameter(aKey);
			aRes = aFlag != null ? aFlag : aDefaultValue;
		} catch (Exception e) {
			log.info(e.getMessage());
		}
		return aRes;
	}

	// 根据文件名及参数表返回SQL
	public static String getSql(String aFn, Map<String, String> aPs, List<String> aDebugList) {
		String aSql = "";
		try {
			//aSql = ReadSQLUtil.Query(aFn);
			 aSql = ReadSQLUtil.ReadSqlFromHttp(aFn);
			for (String aKey : aPs.keySet()) {
				String aOld = "{" + aKey + "}";
				 //String aNew = aPs.get(aKey);//可能是Int类型
				String aNew = String.valueOf(aPs.get(aKey));
				aSql = aSql.replace(aOld, aNew);
				
			}
		} catch (Exception er) {
			aDebugList.add(er.getMessage());
			log.info(er.getMessage());
		}
		return aSql;
	}

	// Http Get
	public static String HttpGet(String aUrl) {
		String aRes = "";
		try {
			HttpClient httpClient = new DefaultHttpClient();
			HttpGet httpGet = new HttpGet(aUrl);// 初始化
			HttpResponse httpResponse = httpClient.execute(httpGet);// 接收执行的结果
			HttpEntity entity = httpResponse.getEntity();// 从消息体里拿结果
			if (entity != null) {
				aRes = EntityUtils.toString(entity, "UTF-8");// 将结果转成字符串类型
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return aRes;
	}

	// Http Get 转换为对象
	public static Object HttpGetObj(String aUrl) {
		Object aObj = null;
		try {
			String aRes = HttpGet(aUrl);
			aObj = JSON.parse(aRes);
		} catch (Exception er) {
			log.info(er.getMessage());
		}
		return aObj;
	}

	public static String HttpPost(String aUrl, String aJson) {
		String aRes = "";
		DefaultHttpClient httpClient = new DefaultHttpClient();
		HttpPost httpost = new HttpPost(aUrl);
		try {
			httpost.setEntity(new StringEntity(aJson, "UTF-8"));
			HttpResponse response = httpClient.execute(httpost);
			aRes = EntityUtils.toString(response.getEntity(), "UTF-8");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return aRes;
	}

}
