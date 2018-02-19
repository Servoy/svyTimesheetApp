/**
 * @param {Number} placeholder
 * @param {{ws_authenticate:Array<{password:String, username:String, userId: Number}>}} authObject
 * @return {Array<{code: Number, body: String}>}
 * @private 
 * @properties={typeid:24,uuid:"4A861287-6971-40CF-9FA6-A036C1FB5E8F"}
 */
function ws_read(placeholder, authObject){
	
	var returnObject = globals.getAPIReturnObject();
	
	var credentials = globals.getCredentials(authObject);
	var query = datasources.db.timesheet.user.createSelect();
	query.result.add(query.columns.user_id);
	query.result.add(query.columns.name);
	query.result.add(query.columns.email);
	query.where.add(query.columns.username.eq(credentials.username));

	/** @type {JSDataSet<{user_id: Number, name: String, email: String}>} */
	var ds = databaseManager.getDataSetByQuery(query, -1);	
	if (ds.getMaxRowIndex() == 0){
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.successful = false;
		returnObject.body.message = "The User cannot be found.";
		throw globals.handleAPIReturnObject(returnObject); 
	}
	ds.rowIndex = 1;
	
	returnObject.body.value = {
		user_id: ds.user_id,
		name: ds.name,
		email: ds.email
	}
	
	throw globals.handleAPIReturnObject(returnObject); 
}
