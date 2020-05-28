package servlet;

import java.io.FileInputStream;
import java.util.Properties;

import javax.servlet.http.HttpServlet;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

public class LogServlet extends HttpServlet {

	private static final long serialVersionUID = 11111111111111L;

	private String path;

	private static Logger log = Logger.getLogger(LogServlet.class);

	@Override
	public void init() {
		path = this.getServletContext().getRealPath("/");

		String file = this.getInitParameter("log4j_init_path");
		String logFile = this.getInitParameter("log4j_file_path");

		if (file != null) {
			Properties prop = new Properties();
			try {
				prop.load(new FileInputStream(path + file));
				prop.setProperty("log4j.appender.D.File", logFile + prop.getProperty("log4j.appender.D.File"));
				PropertyConfigurator.configure(prop);
			} catch (Exception e) {
				log.info("初始化log4j日志输入路径异常，请检查web.xml参赛配置是否正常，异常发生在{}类的public void init()方法，异常的原意是：{}" + ","
						+ this.getClass().getName() + "," + e.getMessage());
			}
		}
	}
}
