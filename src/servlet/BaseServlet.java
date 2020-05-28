package servlet;

import java.io.IOException;


import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
@WebServlet("/BaseServlet")
public class BaseServlet extends HttpServlet {


	private static final long serialVersionUID = 1L;



	public void writeJson(Object object, HttpServletResponse response) {
		try {
			String json = JSON.toJSONStringWithDateFormat(object, "yyyy-MM-dd HH:mm:ss");
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write(json);
			response.getWriter().flush();
			response.getWriter().close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void writeJson(String jsonStr, HttpServletResponse response) {
		try {
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write(jsonStr);
			response.getWriter().flush();
			response.getWriter().close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
