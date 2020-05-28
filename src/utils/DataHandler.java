package utils;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface DataHandler<T> {

	public T handle(ResultSet rs) throws SQLException;
}