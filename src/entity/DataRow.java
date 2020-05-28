package entity;

import java.sql.Blob;
import java.sql.Date;
import java.util.List;

public class DataRow {

	List<DataColumn> col;

	public DataColumn getColumnObject(String colName) {

		for (DataColumn c : col) {
			if (c.getKey().toUpperCase().equals(colName.toUpperCase())) {
				try {
					return c;
				} catch (Exception e) {
					System.out.println("´íÎóÃèÊö£º" + e.toString());
				}
			}
		}
		return null;
	}

	public Object getColumn(String colName) {
		for (DataColumn c : col) {
			if (c.getKey().toUpperCase().equals(colName.toUpperCase())) {
				try {
					return c.getValue();
				} catch (Exception e) {
					System.out.println("´íÎóÃèÊö£º" + e.toString());
				}
			}
		}
		return null;
	}

	public int getIntColumn(String colName) {
		for (DataColumn c : col) {
			if (c.getKey().toUpperCase().equals(colName.toUpperCase())) {
				try {
					return Integer.parseInt(c.getValue().toString());
				} catch (Exception e) {
					System.out.println("´íÎóÃèÊö£º" + e.toString());
				}
			}
		}
		return 0;
	}

	public String getStringColumn(String colName) {
		for (DataColumn c : col) {
			if (c.getKey().toUpperCase().equals(colName.toUpperCase())) {
				try {
					return c.getValue().toString();
				} catch (Exception e) {
					System.out.println("´íÎóÃèÊö£º" + e.toString());
				}
			}
		}
		return null;
	}

	public String eval(String colName) {
		for (DataColumn c : col) {
			if (c.getKey().toUpperCase().equals(colName.toUpperCase())) {
				try {
					return c.getValue() + "";// ´Ë·½·¨½«ÆÁ±Î´íÎó£¡£¡£¡
				} catch (Exception e) {
					System.out.println("´íÎóÃèÊö£º" + e.toString());
				}
			}
		}
		return null;
	}

	public Date getDateColumn(String colName) {
		for (DataColumn c : col) {
			if (c.getKey().toUpperCase().equals(colName.toUpperCase())) {
				try {
					return Date.valueOf(c.getValue().toString());
				} catch (Exception e) {
					System.out.println("´íÎóÃèÊö£º" + e.toString());
				}
			}
		}
		return null;
	}

	public Blob getBlobColumn(String colName) {
		for (DataColumn c : col) {
			if (c.getKey().toUpperCase().equals(colName.toUpperCase())) {
				try {
					return (Blob) c.getValue();
				} catch (Exception e) {
					System.out.println("´íÎóÃèÊö£º" + e.toString());
				}
			}
		}
		return null;
	}

	public float getFloatColumn(String colName) {
		for (DataColumn c : col) {
			if (c.getKey().toUpperCase().equals(colName.toUpperCase())) {
				try {
					return Float.parseFloat(c.getValue().toString());
				} catch (Exception e) {
					System.out.println("´íÎóÃèÊö£º" + e.toString());
				}
			}
		}
		return 0;
	}

	public DataRow(List<DataColumn> c) {
		col = c;
	}

	public List<DataColumn> getCol() {
		return col;
	}

	public void setCol(List<DataColumn> col) {
		this.col = col;
	}
}