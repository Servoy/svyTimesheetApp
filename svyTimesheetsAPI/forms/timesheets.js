/**
 * @param {{year: Number, week: String, userId: Number}} body
 * @return {Array<{code: Number, body: String}>}
 * @private
 * @properties={typeid:24,uuid:"507F8F7C-39F5-4BCB-877F-B816DA7DF331"}
 */
function ws_create(body){
	
	var returnObject = globals.getAPIReturnObject();

	if (!body || (typeof body != 'object')){
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.successful = false;
		returnObject.body.message = "The body properties are empty or missing.";
		throw globals.handleAPIReturnObject(returnObject); 
	}
	
	var idx = foundset.newRecord();
	var record = foundset.getRecord(idx);
	record.year = body.year;
	record.week = body.week;
	record.user_id = body.userId;
	record.status = 0; //draft	
	
	if (!databaseManager.saveData(record)){
		returnObject.code = plugins.http.HTTP_STATUS.SC_INTERNAL_SERVER_ERROR;
		returnObject.body.message = record.exception;
		returnObject.body.successful = false;
	}
	else {
		returnObject.body.value = {id: record.timesheet_id};
	}
	
	throw globals.handleAPIReturnObject(returnObject); 
}

/**
 * @param {{status: Number}} body
 * @param {Number} timesheetId
 * @return {Array<{code: Number, body: String}>}
 * @private
 * @properties={typeid:24,uuid:"3B1E471B-8EAC-4AD6-8131-595610FF2BBA"}
 */
function ws_update(body, timesheetId){
	
	var returnObject = globals.getAPIReturnObject();
	
	if (!body || (typeof body != 'object') || !timesheetId){
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.successful = false;
		returnObject.body.message = "The body properties are empty or missing.";
		throw globals.handleAPIReturnObject(returnObject); 
	}
	
	var query = datasources.db.timesheet.timesheet.createSelect();
	query.where.add(query.columns.timesheet_id.eq(timesheetId));
	var fs = datasources.db.timesheet.timesheet.getFoundSet();
	fs.loadRecords(query);

	//when no record is found for update
	if (fs.getSize() == 0){
		returnObject.code = plugins.http.HTTP_STATUS.SC_NOT_FOUND;
		returnObject.body.message = 'No record was found.';
		returnObject.body.successful = false;
		throw globals.handleAPIReturnObject(returnObject); 
	}
	var record = fs.getRecord(1);
	
	if (body.hasOwnProperty('status')){
		record.status = body.status;
	}
	
	if (!databaseManager.saveData(record)){
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.message = globals.getExceptions(record);
		returnObject.body.successful = false;
	}
	
	throw globals.handleAPIReturnObject(returnObject); 
}

/**
 * @param {Number} timesheetId
 * @return {Array<{code: Number, body: String}>}
 * @private
 * @properties={typeid:24,uuid:"E430816C-75B0-44B7-9F16-D913F7D0F38C"}
 */
function ws_delete(timesheetId){
	
	var returnObject = globals.getAPIReturnObject();
	
	if (!timesheetId){
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.successful = false;
		returnObject.body.message = "The Timesheet ID is missing.";
		throw globals.handleAPIReturnObject(returnObject); 
	}	
	
	//check record from timesheet
	var query = datasources.db.timesheet.timesheet.createSelect();
	query.where.add(query.columns.timesheet_id.eq(timesheetId));
	var fs = datasources.db.timesheet.timesheet.getFoundSet();
	fs.loadRecords(query);
	var fsSize = fs.getSize();
	if (fsSize == 0){//no timesheet record found
		returnObject.code = plugins.http.HTTP_STATUS.SC_NO_CONTENT;
		returnObject.body.successful = true;
		throw globals.handleAPIReturnObject(returnObject); 
	}
	
	//check if there are timespent records created for the timesheet id
	var query2 = datasources.db.timesheet.timespent.createSelect();
	query2.result.add(query2.columns.timespent_id);
	query2.where.add(query2.columns.timesheet_id.eq(timesheetId));
	/** @type {JSDataSet<{timespend_id: Number}>} */
	var ds = databaseManager.getDataSetByQuery(query, -1);	
	if (ds.getMaxRowIndex() > 0){
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.successful = false;
		returnObject.body.message = "There are timespent records attached to this Timesheet ID. Please remove the timespent records first before requesting this action.";
		throw globals.handleAPIReturnObject(returnObject); 
	}
	
	//delete timesheet record
	if (!fs.deleteRecord()){	
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.message = 'The timsheet could not be deleted.';
		returnObject.body.successful = false;
		throw globals.handleAPIReturnObject(returnObject); 
	}
	
	throw globals.handleAPIReturnObject(returnObject); 
}

/**
 * @AllowToRunInFind
 * @param {Number} yearParameter
 * @param {{ws_authenticate:Array<{password:String, username:String, userId: Number}>}} authObject
 * @return {Array<{code: Number, body: String}>}
 * @private
 * @properties={typeid:24,uuid:"2359DB17-8A3C-4A17-A099-BEDD4CE1E535"}
 */
function ws_read(yearParameter, authObject){
	
	var returnObject = globals.getAPIReturnObject();
	
	var credentials = globals.getCredentials(authObject);

	var query = datasources.db.timesheet.timesheet.createSelect();
	query.result.add(query.columns.timesheet_id);
	query.result.add(query.columns.week);
	query.result.add(query.columns.status);
	query.result.add(query.columns.year);
	query.sort.add(query.columns.week.desc);
	query.where.add(query.columns.user_id.eq(credentials.userId));
	query.where.add(query.columns.year.eq(yearParameter));
	query.groupBy.add(query.columns.timesheet_id);
	var join = query.joins.timesheet_to_timespent;
	query.result.add(join.columns.hours.sum, 'hourssum');
	/** @type {JSDataSet<{timesheet_id: Number, week: Number, status: Number, year: Number, hourssum: Number}>} */
	var ds = databaseManager.getDataSetByQuery(query, -1);	
	if (ds.getMaxRowIndex() == 0){
		returnObject.body.message = "No Timesheets were found.";
		returnObject.body.value = { list: 0 };
		throw globals.handleAPIReturnObject(returnObject); 
	}
	
	var list = [];
	var timesList = {
		columnNames: ['timesheetId', 'week', 'status', 'year', 'hoursSum'],
		list: list
	};
	for (var i = 1; i <= ds.getMaxRowIndex(); i++)
	{
		ds.rowIndex = i;
		if (!ds.hourssum){
			ds.hourssum = 0;
		}
		timesList.list.push([ds.timesheet_id, ds.week, ds.status, ds.year, ds.hourssum]);
	}
	returnObject.body.value = timesList;

	throw globals.handleAPIReturnObject(returnObject); 
}
