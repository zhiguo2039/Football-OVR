package servlet;



import javax.servlet.ServletException;


import org.apache.log4j.Logger;

//import wx.thread.TokenThread;

import constant.Constant;
import constant.GlobalParas;

public class InitServlet extends BaseServlet {
	
	private static final long serialVersionUID = 1L;

private static Logger log = Logger.getLogger(InitServlet.class);

@Override
public void init() throws ServletException {

	GlobalParas.rootDirectory = this.getServletContext().getRealPath("/");
	GlobalParas.sqlPath = this.getInitParameter("sqlPath");
	log.info(GlobalParas.sqlPath);
	GlobalParas.DBIpAddress = this.getInitParameter("DBIpAddress");
	GlobalParas.DBName = this.getInitParameter("DBName");
	GlobalParas.DBUserName = this.getInitParameter("DBUserName");
	GlobalParas.DBPassword = this.getInitParameter("DBPassword");
	Constant.initDB();

	log.info(System.currentTimeMillis());
	
	
        // 获取web.xml中配置的参数
 //       TokenThread.appid = getInitParameter("appid");
 //       TokenThread.appsecret = getInitParameter("appsecret");

//        log.info("weixin api appid:{}", TokenThread.appid);
//        log.info("weixin api appsecret:{}", TokenThread.appsecret);

        // 未配置appid、appsecret时给出提示
 //       if ("".equals(TokenThread.appid) || "".equals(TokenThread.appsecret)) {
//            log.error("appid and appsecret configuration error, please check carefully.");
//        } else {
            // 启动定时获取access_token的线程
//            new Thread(new TokenThread()).start();
 //       }

	
	
}}
