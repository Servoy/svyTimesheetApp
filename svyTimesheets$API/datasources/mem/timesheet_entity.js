/**
 * @param {Number} id
 * @return {JSRecord<mem:timesheet>}
 * @public
 * @properties={typeid:24,uuid:"E478DD44-65AD-46F5-8148-6AE9F3811094"}
 */
function getTimesheet(id)
{
	var query = datasources.mem.timesheet.createSelect();
	query.where.add(query.columns.timesheet_id.eq(id));
	var fs = datasources.mem.timesheet.getFoundSet();
	fs.loadRecords(query);
	if (fs.getSize() != 1){
		return null;
	}
	return fs.getRecord(1);
}

/**
 * @param {JSRecord<mem:timesheet>} record record that will be inserted *
 * @return {Boolean}
 * @private
 * @properties={typeid:24,uuid:"7CA98318-737D-489C-8F2D-E058C6F2A863"}
 */
function onRecordInsert(record) {
	if (!globals.apiSyncTimesheet){
		return true;
	}
	
	var content = {
		year: record.year,
		week: record.week,
		userId: scopes.security.userId
	}
	content = JSON.stringify(content);
	
	var client = plugins.http.createNewHttpClient();
	var request = client.createPostRequest(globals.crmURL + 'timesheets');
	request.addHeader('Accept', 'application/json');
	request.addHeader('Content-type','application/json');
	request.setBodyContent(content, 'application/json');
	var response = request.executeRequest(scopes.security.username, scopes.security.password);
	
	if (response.getStatusCode() == plugins.http.HTTP_STATUS.SC_UNAUTHORIZED){
		throw 'Unsuccessful authentication.';
	}
	
	/** @type {{successful: Boolean, message: String, value: *}} */
	var responseBody = JSON.parse(response.getResponseBody());
	
	if (responseBody.successful == false){
		throw 'Message: ' + responseBody.message;
	}

	application.output('Timesheet ID: ' + responseBody.value.id);
	record.timesheet_id = responseBody.value.id;
	
	globals.apiSyncTimesheet = 0;

	return true;
}

/**
 * @param {JSRecord<mem:timesheet>} record record that will be updated
 * @return {Boolean}
 * @private
 * @properties={typeid:24,uuid:"4B28F827-AD65-4706-842B-73749A1B8863"}
 */
function onRecordUpdate(record) {
	
	if (!globals.apiSyncTimesheet){
		return true;
	}
	
	if (record.status != 1){
		return true;
	}
	
	//update status only
	var content = {
		'status': 1
	}
	content = JSON.stringify(content);
	
	var client = plugins.http.createNewHttpClient();
	var request = client.createPutRequest(globals.crmURL + 'timesheets/' + record.timesheet_id);
	request.addHeader('Accept', 'application/json');
	request.addHeader('Content-type','application/json');
	request.setBodyContent(content, 'application/json');
	var response = request.executeRequest(scopes.security.username, scopes.security.password);
	
	application.output('HTTP Response Code: ' + response.getStatusCode());
	
	if (response.getStatusCode() == plugins.http.HTTP_STATUS.SC_UNAUTHORIZED){
		application.output('Unsuccessful authentication.');
		return false;
	}
	
	/** @type {{successful: Boolean, message: String, value: *}} */
	var responseBody = JSON.parse(response.getResponseBody());
	
	if (responseBody.successful == false){
		application.output('Message: ' + responseBody.message);
	}
	
	globals.apiSyncTimesheet = 0;
	
	return true;
}

/**
 * @param {Number} id
 * @param {Number} hours
 * @return {Boolean}
 * @public
 * @properties={typeid:24,uuid:"D659BB63-8C1F-4BE2-B441-C6C047468BE6"}
 */
function timesheetAddHours(id, hours){
	
	var timesheetRecord = getTimesheet(id);
	timesheetRecord.hours_sum += hours;
	
	return databaseManager.saveData(timesheetRecord);
}

/**
 * @param {Number} id
 * @param {Number} hours
 * @return {Boolean}
 * @public
 * @properties={typeid:24,uuid:"1F5A3B71-BC42-483A-9D93-7EECD052B9CA"}
 */
function timesheetRemoveHours(id, hours){
	
	var timesheetRecord = getTimesheet(id);
	timesheetRecord.hours_sum -= hours;
	
	return databaseManager.saveData(timesheetRecord);
}
