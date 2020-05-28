package servlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import utils.DBUtil;

public class UploadServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.sendRedirect("http://localhost:16327/web1/Apps/webs/dac/Manage/mCheck.htm");
		System.out.println("uploadservlet");
		response.setContentType("text/html;charset=utf-8");
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		
		String stuname = null;
		Date date = new Date();
		String photype = null;
		String stunumber = null;
		String stuxy = null;
		boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		// 判断enctype属性是否为multipart/form-data
		if (!isMultipart) {
			out.print("<script type='text/javascript'>" + "alert('表单数据不合法')"
					+ "</script>");// 如果表单数据不是multipart/form-data
																// 那么进行js跳转
			return;
		}
		
		// 创建工厂类
				DiskFileItemFactory factory = new DiskFileItemFactory();
				System.out.println("创建工厂类");
				factory.setSizeThreshold(102400);// 设置初始化内存，如果上传的文件超过该大小，将不保存到内存，而且硬盘中(单位：byte)
				File fileTemp = new File(this.getServletContext().getRealPath("/WEB-INF/upload") + "_temp");// 建立临时目录
				System.out.println(this.getServletContext().getRealPath("/WEB-INF/upload") + "_temp");
				fileTemp.mkdirs();/*
									 * //只能在已经存在的目录中创建创建文件夹。 如果上传的文件超过设置内存的大小，将文件保存至该目录，
									 * 待文件上传完毕后，自动删除上传的临时文件；
									 * 如果多次上传同一个文件，该文件会保存到服务器的临时目录，而不删除
									 */
				factory.setRepository(fileTemp);// 设置临时文件路径
				ServletFileUpload upload = new ServletFileUpload(factory); // 创建文件上传对象
				upload.setSizeMax(1024000 * 5);// 设置客户端最大上传，-1为无限大（单位：byte)
				List items = null;
				
				try {
					items = upload.parseRequest(request);// 分析request，并将保存结果至List里
				} catch (FileUploadException e) {
					out.print("<script type='text/javascript'>" + "alert('上传文件过大!')"
							+ "</script>");
					return;
				}
				System.out.println("items大小："+items.size());
				Iterator itr = items.iterator();// 迭代器
				String Src = null;
				String filename = null;
				while (itr.hasNext()) {// 循环处理表单元素
					FileItem item = (FileItem) itr.next();
					if (item.isFormField()){
					if ("stuname".equals(item.getFieldName())) {
						stuname = item.getString("utf-8");
						System.out.println("stuname="+stuname);

					}else if("photype".equals(item.getFieldName())){
						photype=item.getString("utf-8");
						System.out.println("photype="+photype);
					}else if("stunumber".equals(item.getFieldName())){
						stunumber=item.getString("utf-8");
						System.out.println("stunumber="+stunumber);
					}else if("stuxy".equals(item.getFieldName())){
						stuxy=item.getString("utf-8");
						System.out.println("stuxy="+stuxy);
					}
					
					}else{

							String HomeWorkFileSrcName = item.getName();// 获得文件名(commons
																		// fileupload封装好的getanme)
							System.out.println("文件名"+HomeWorkFileSrcName);
							filename = UUID.randomUUID().toString() + "_" + new String(
									HomeWorkFileSrcName/* .getBytes(),"utf-8" */);// 采用全局唯一标示符,防止名称重复
			//				filename = new String(
			//						HomeWorkFileSrcName/* .getBytes(),"utf-8" */);

				//			Src = getServletContext().getRealPath("/WEB-INF/upload") + "\\"+stuname ;// 获取文件存储的路径
							Src="E:\\web1\\Apps\\webs\\dac\\Manage\\images\\upload\\"+stuname;
							System.out.println("Src: " + Src);

							File saveFile = new File(Src);
							saveFile.mkdirs();

							saveFile = new File(saveFile, filename.substring(filename.lastIndexOf("\\") + 1));
							System.out.println("filename: " + filename);
							System.out.println("saveFile: " + saveFile);
							try {
								item.write(saveFile);// 写入文件
							} catch (Exception e) {
								out.print("<script type='text/javascript'>" + "alert('文件上传失败')"
										+ "</script>");
								return;
							}
						

					}

				}
				String path="upload/"+stuname+"/"+filename;
				path=path.replaceAll("\\\\", "/");
				String sql="INSERT INTO Tpho ([phoid],[phoowner],[phoname],[phopath],[photime],[photype],[ischecked],[phograde],[phostunumber],[phoxy]) VALUES ( "
				+"'"+UUID.randomUUID().toString() +"'"+","
				+"'"+stuname+"'"+","
				+"'"+filename+"'"+","
				+"'"+path+"'"+","
				+"'"+date+"'"+","
				+"'"+photype+"'"+","
				+"'0'"+","
				+"'0'"+","
				+"'"+stunumber+"'"+","
				+"'"+stuxy+"'"+
				")";
				System.out.println(sql);
				DBUtil.Execute(sql);
		//		out.print("<script type='text/javascript'>alert('上传成功请继续!');window.location.href='http://localhost:16327/web1/Apps/webs/dac/Manage/mCheck.htm';</script>");
	}

}
