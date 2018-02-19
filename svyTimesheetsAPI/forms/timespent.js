/**
 * @param {{timesheetId: Number, bookDate: String, companyId: Number, budgetId: Number, hours: Number, description: String, isBillable: Boolean}} body
 * @return {Array<{code: Number, body: String}>}
 * @private
 * @properties={typeid:24,uuid:"781BC3F7-234B-4C70-853F-617A6CC2B483"}
 */
function ws_create(body){
	
	var returnObject = globals.getAPIReturnObject();
	
	if (!body || (typeof body != 'object')){
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.successful = false;
		returnObject.body.message = "The body properties are empty or missing.";
		throw globals.handleAPIReturnObject(returnObject); 
	}

	/* timespent table */
	var idx = foundset.newRecord();
	var record = foundset.getRecord(idx);
	record.timesheet_id = body.timesheetId;	
	record.company_id = body.companyId;
	record.budget_id = body.budgetId;
	record.description = body.description;
	record.hours = body.hours;
	record.book_date = new Date(body.bookDate);
	record.is_billable = body.isBillable;
	returnObject.body.value = {id: record.timespent_id};
	
	databaseManager.startTransaction();

	if ( (!databaseManager.saveData(record)) || (!databaseManager.commitTransaction()) ){
		
		var failedRecords = databaseManager.getFailedRecords();	
		var messageErrors = [];
		for (var i=0; i<failedRecords.length; i++){
			messageErrors.push(globals.getExceptions(failedRecords[i]));
			application.output(globals.getExceptions(failedRecords[i]));
		}
		
		databaseManager.rollbackTransaction();
		databaseManager.revertEditedRecords();
		
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.message = messageErrors;
		returnObject.body.successful = false;
		throw globals.handleAPIReturnObject(returnObject); 
	}
	
	throw globals.handleAPIReturnObject(returnObject); 
}

/**
 * @param {{timesheetId: Number, bookDate: String, companyId: Number, budgetId: Number, hours: Number, description: String, isBillable: Boolean}} body
 * @param {Number} timespentId
 * @return {Array<{code: Number, body: String}>}
 * @private
 * @properties={typeid:24,uuid:"03C1BBC9-3B39-430C-9510-76D3C8717088"}
 */
function ws_update(body, timespentId){
	
	var returnObject = globals.getAPIReturnObject();
	
	if (!body || (typeof body != 'object') || !timespentId){
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.successful = false;
		returnObject.body.message = "One or more required properties are missing.";
		throw globals.handleAPIReturnObject(returnObject); 
	}

	//get timespent record
	var record = datasources.db.timesheet.timespent.getFoundSet().getTimespent(timespentId);
	if (!record){
		returnObject.code = plugins.http.HTTP_STATUS.SC_NOT_FOUND;
		returnObject.body.message = 'No Timespent record was found.';
		returnObject.body.successful = false;
		throw globals.handleAPIReturnObject(returnObject); 
	}

	/* set timespent record */
	if (body.hasOwnProperty('bookDate')){
		record.book_date = new Date(body.bookDate);
	}
	if (body.hasOwnProperty('companyId')){
		record.company_id = body.companyId;
	}
	if (body.hasOwnProperty('budgetId')){
		record.budget_id = body.budgetId;
	}
	if (body.hasOwnProperty('hours')){
		record.hours = body.hours;
	}
	if (body.hasOwnProperty('description')){
		record.description = body.description;
	}
	if (body.hasOwnProperty('isBillable')){
		record.is_billable = body.isBillable;
	}
	
	databaseManager.startTransaction();

	if ( (!databaseManager.saveData(record)) || (!databaseManager.commitTransaction()) ){
		
		var failedRecords = databaseManager.getFailedRecords();	
		var messageErrors = [];
		for (var i=0; i<failedRecords.length; i++){
			messageErrors.push(globals.getExceptions(failedRecords[i]));
		}
		
		databaseManager.rollbackTransaction();
		databaseManager.revertEditedRecords();
		
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.message = messageErrors;
		returnObject.body.successful = false;
		throw globals.handleAPIReturnObject(returnObject); 
	}

	throw globals.handleAPIReturnObject(returnObject); 
}

/**
 * @param {Number} timespentId
 * @return {Array<{code: Number, body: String}>}
 * @private
 * @properties={typeid:24,uuid:"A1437CCB-1B8E-40DB-BC82-C76BA1E617DA"}
 */
function ws_delete(timespentId){
	
	var returnObject = globals.getAPIReturnObject();
	
	if (!timespentId){
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.successful = false;
		returnObject.body.message = "The Timespent ID is missing.";
		throw globals.handleAPIReturnObject(returnObject); 
	}	

	//delete record from timespent
	var query = datasources.db.timesheet.timespent.createSelect();
	query.where.add(query.columns.timespent_id.eq(timespentId));
	var fs = datasources.db.timesheet.timespent.getFoundSet();
	fs.loadRecords(query);
	var record = fs.getRecord(1);
	
	if (!fs.deleteRecord()){	
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.message = globals.getExceptions(record);
		returnObject.body.successful = false;
		throw globals.handleAPIReturnObject(returnObject); 
	}

	//update budget table
	datasources.db.timesheet.budget.getFoundSet().removeHours(record.budget_id, record.hours, Boolean(record.is_billable));
	
	throw globals.handleAPIReturnObject(returnObject); 
}

/**
 * this API returns a list of time records related to a contact id
 * @param {Number} timesheedId
 * @return {Array<{code: Number, body: String}>}
 * @private
 * @properties={typeid:24,uuid:"3EA60118-1837-4F8B-A43D-15E95152D424"}
 */
function ws_read(timesheedId){
	
	var returnObject = globals.getAPIReturnObject();
	
	var query = datasources.db.timesheet.timespent.createSelect();
	query.result.add(query.columns.timespent_id);
	query.result.add(query.columns.hours);
	query.result.add(query.columns.description);
	query.result.add(query.columns.book_date);
	query.result.add(query.columns.is_billable);
	query.result.add(query.columns.company_id);
	query.result.add(query.columns.budget_id);
	query.result.add(query.columns.timesheet_id);
	query.where.add(query.columns.timesheet_id.eq(timesheedId));
	/** @type {JSDataSet<{timespent_id: Number, hours: Number, description: String, book_date: Date, is_billable: Boolean, company_id: Number, budget_id: Number, timesheet_id: Number}>} */
	var ds = databaseManager.getDataSetByQuery(query, -1);	

	if (ds.getMaxRowIndex() == 0){
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.successful = false;
		returnObject.body.message = "No time records were found.";
		throw globals.handleAPIReturnObject(returnObject); 
	}
	
	var list = [];
	var itemsList = {
		columnNames: ['timeId', 'hours', 'description', 'book_date', 'is_billable', 'companyId', 'budgetId', 'timesheetId'],
		list: list
	};
	for (var i = 1; i <= ds.getMaxRowIndex(); i++)
	{
		ds.rowIndex = i;
		itemsList.list.push([ds.timespent_id, ds.hours, ds.description, ds.book_date, ds.is_billable, ds.company_id, ds.budget_id, ds.timesheet_id]);
	}
	returnObject.body.value = itemsList;

	
	throw globals.handleAPIReturnObject(returnObject); 
}
