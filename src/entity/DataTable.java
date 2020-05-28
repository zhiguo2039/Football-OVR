package entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DataTable {

	List<DataRow> row;

	public DataTable() {
	}

	public DataTable(List<DataRow> r) {
		row = r;
	}

	public List<DataRow> getRow() {
		return row;
	}

	public void setRow(List<DataRow> row) {
		this.row = row;
	}

	public static void outTable(DataTable dt) {
		for (DataRow r : dt.getRow()) {
			for (DataColumn c : r.getCol()) {
				System.out.print(c.getKey() + ":" + c.getValue() + " ");
			}
			wl("");
		}
	}

	public static List<Map<String, Object>> getListData(DataTable dt) {
		List<Map<String, Object>> lists = new ArrayList<Map<String, Object>>();
		Map<String, Object> map = new HashMap<String, Object>();
		for (DataRow r : dt.getRow()) {
			for (DataColumn c : r.getCol()) {
				map.put(c.getKey(), String.valueOf(c.getValue()));
			}
			if (!map.isEmpty()) {
				lists.add(map);
				map = new HashMap<String, Object>();// 注意需要重新new
			}
		}
		return lists;
	}

	public static void wl(String s) {
		System.out.println(s);
	}
}
