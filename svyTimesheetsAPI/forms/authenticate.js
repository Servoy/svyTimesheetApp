/**
 * @param {String} username
 * @param {String} password
 * @return {{username: String, password: String, userId: Number}}
 * @private
 * @properties={typeid:24,uuid:"8D8C417D-18A5-45F7-BFF8-A21A4DCD9547"}
 * @AllowToRunInFind
 */
function ws_authenticate(username, password) {
	
	if (!username || !password){
		return null;
	}

	//user table
	var query = datasources.db.timesheet.user.createSelect();
	query.result.add(query.columns.user_id);
	query.where.add(query.columns.username.eq(username));
	query.where.add(query.columns.password.eq(password));
	query.where.add(query.columns.is_active.eq(1));
	/** @type {JSDataSet<{user_id: Number}>} */
	var ds = databaseManager.getDataSetByQuery(query, -1);	
	if (ds.getMaxRowIndex() != 1){
		return null;
	}

	ds.rowIndex = 1;
	
	return {username: username, password: password, userId: ds.user_id};
}
