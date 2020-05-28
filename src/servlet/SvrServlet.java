package servlet;

import java.io.IOException;

import javax.servlet.ServletException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;


import dao.TsCmd;
@WebServlet(description = "前台业务逻辑部分", urlPatterns = { "/SvrServlet" })
public class SvrServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(SvrServlet.class.getName());

	public SvrServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
			doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("ok");
		// 跨域请求
		response.setHeader("Access-Control-Allow-Origin", "*");
		// 将请求、响应的编码均设置为UTF-8(防止中文乱码)
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		try {
			TsCmd aCmd = TsCmd.getCmd(request);
			String aResponseText = aCmd.getResponseText();
			super.writeJson(aResponseText, response);
		} catch (Exception e) {
			log.info(e.getMessage());
		}

	}

}
