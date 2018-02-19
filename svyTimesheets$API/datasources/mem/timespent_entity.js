/**
 * @param {JSRecord<mem:timespent>} record record that will be inserted
 * @return {Boolean}
 * @private
 * @properties={typeid:24,uuid:"E7C3EF24-3F4A-4AE0-9599-1D1E67DB357D"}
 */
function onRecordInsert(record) {
	if (!globals.apiSyncTimespent){
		return true;
	}
	
	var content = {
		timesheetId: record.timesheet_id,
		bookDate: new Date(record.book_date),
		companyId: record.company_id,
		budgetId: record.budget_id,
		hours: record.hours,
		description: record.description,
		isBillable: record.is_billable,
		userId: scopes.security.userId
	}
	content = JSON.stringify(content);
	
	var client = plugins.http.createNewHttpClient();
	var request = client.createPostRequest(globals.crmURL + 'timespent');
	request.addHeader('Accept', 'application/json');
	request.addHeader('Content-type','application/json');
	request.setBodyContent(content, 'application/json');
	var response = request.executeRequest(scopes.security.username, scopes.security.password);
	application.output("HTTP Response Code: " + response.getStatusCode());
	
	if (response.getStatusCode() == plugins.http.HTTP_STATUS.SC_UNAUTHORIZED){
		throw 'Unsuccessful authentication.';
	}
	
	/** @type {{successful: Boolean, message: String, value: *}} */
	var responseBody = JSON.parse(response.getResponseBody());
	
	if (responseBody.successful == false){
		application.output('Errors message: ' + responseBody.message);
		throw 'Message: ' + responseBody.message;
	}

	application.output('ID: ' + responseBody.value.id);
	record.timespent_id = responseBody.value.id;
	
	//update timesheet related record
	datasources.mem.timesheet.getFoundSet().timesheetAddHours(record.timesheet_id, record.hours);

	globals.apiSyncTimespent = 0;
	
	return true;
}

/**
 * @param {JSRecord<mem:timespent>} record record that will be updated
 * @return {Boolean}
 * @private
 * @properties={typeid:24,uuid:"E8445F92-730D-4D21-A268-0A267E6C6632"}
 */
function onRecordUpdate(record) {
	
	var content = {
		timesheetId: record.timesheet_id,
		bookDate: new Date(record.book_date),
		companyId: record.company_id,
		budgetId: record.budget_id,
		hours: record.hours,
		description: record.description,
		isBillable: record.is_billable
	}
	content = JSON.stringify(content);
	
	var client = plugins.http.createNewHttpClient();
	var request = client.createPutRequest(globals.crmURL + 'timespent/' + record.timespent_id);
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
	
	//update timesheet related record
	var oldValuesTimespent = scopes.helpers.getOldValues(record, ['hours']);
	/** @type {Number} */
	var oldHours = oldValuesTimespent['hours'];
	datasources.mem.timesheet.getFoundSet().timesheetRemoveHours(record.timesheet_id, oldHours);
	datasources.mem.timesheet.getFoundSet().timesheetAddHours(record.timesheet_id, record.hours);
	
	return true;
}

/**
 * @param {JSRecord<mem:timespent>} record record that will be deleted
 * @return {Boolean}
 * @private
 * @properties={typeid:24,uuid:"F581E4A5-7D4F-4F30-8B91-168BC80FA22B"}
 */
function onRecordDelete(record) {
	
	if (!globals.apiSyncTimespent){
		return true;
	}
	
	var client = plugins.http.createNewHttpClient();
	var request = client.createDeleteRequest(globals.crmURL + 'timespent/' + record.timespent_id);
	request.addHeader('Accept', 'application/json');
	request.addHeader('Content-type','application/json');
	var response = request.executeRequest(scopes.security.username, scopes.security.password);
	
	if (response.getStatusCode() == plugins.http.HTTP_STATUS.SC_UNAUTHORIZED){
		throw 'Unsuccessful authentication.';
	}
	
	/** @type {{successful: Boolean, message: String, value: *}} */
	var responseBody = JSON.parse(response.getResponseBody());
	
	if (response.getStatusCode() != plugins.http.HTTP_STATUS.SC_OK){
		
		throw 'Message: ' + responseBody.message;
	}
	
	//update timesheet related record
	datasources.mem.timesheet.getFoundSet().timesheetRemoveHours(record.timesheet_id, record.hours);
	
	globals.apiSyncTimespent = 0;
	
	return true;
}
