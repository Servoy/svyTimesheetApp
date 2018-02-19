/**
 * populate In Memory Timesheets table
 * @param {Number} year
 * @return {Number}
 * @public
 * @properties={typeid:24,uuid:"E91789BC-4454-4AE4-B246-1977EA9B31C5"}
 */
function populateTimesheets(year) {
	
	//clean table first
	var fs = datasources.mem.timesheet.getFoundSet();
	fs.loadAllRecords();
	fs.deleteAllRecords();

	var client = plugins.http.createNewHttpClient();
	var request = client.createGetRequest(globals.crmURL + 'timesheets/' + year);
	request.addHeader('Accept', 'application/json');
	request.addHeader('Content-type','application/json');
	var response = request.executeRequest(scopes.security.username, scopes.security.password);	
	
	/** @type {{successful: Boolean, message: String, value: *}} */
	var responseBody = JSON.parse(response.getResponseBody());
	
	if (responseBody.successful == false){
		//application.output("Message: " + responseBody.message);
		return null;
	}
	
	var listSourceLength = 0;

	if (responseBody.value.list != 0){
		
		var listSource = responseBody.value.list;
		listSourceLength = listSource.length;
		globals.apiSyncTimesheet = 0;
		
		for (var i = 0; i < listSourceLength; i++) {
			var rec = fs.getRecord(fs.newRecord());
			rec.timesheet_id = listSource[i][0];
			rec.week = listSource[i][1];
			rec.status = listSource[i][2];
			rec.year = listSource[i][3];
			rec.hours_sum = listSource[i][4];
			databaseManager.saveData(rec);
			var failedRecords = databaseManager.getFailedRecords();
			if (failedRecords.length > 0){
				for (var j=0; j<failedRecords.length; j++){
					application.output(failedRecords[i]);
				}
			}			
		}			
	}	

	return listSourceLength;
}

/**
 * @param {Number} timesheedId
 * @return {Boolean}
 * @public
 * @properties={typeid:24,uuid:"03B0AA44-3E35-4B5E-BADA-4829C303E911"}
 */
function populateTimeRecords(timesheedId) {
	
	//clean table first
	var fs = datasources.mem.timespent.getFoundSet();
	fs.loadAllRecords();
	fs.deleteAllRecords();
	
	var client = plugins.http.createNewHttpClient();
	var request = client.createGetRequest(globals.crmURL + 'timespent/' + timesheedId);
	request.addHeader('Accept', 'application/json');
	request.addHeader('Content-type','application/json');
	var response = request.executeRequest(scopes.security.username, scopes.security.password);

	/** @type {{successful: Boolean, message: String, value: *}} */
	var responseBody = JSON.parse(response.getResponseBody());

	if (responseBody.successful == false){
		application.output('Message: ' + responseBody.message);
		return false;
	}
	
	if (responseBody.value.list){
		var listSource = responseBody.value.list;
		globals.apiSyncTimespent = 0;

		for (var i = 0; i < listSource.length; i++) {
			var rec = fs.getRecord(fs.newRecord());
			rec.timespent_id = listSource[i][0];
			rec.hours = listSource[i][1];
			rec.description = listSource[i][2];
			rec.book_date = new Date(listSource[i][3]);
			rec.is_billable = listSource[i][4];
			rec.company_id = listSource[i][5];
			rec.budget_id = listSource[i][6];
			rec.timesheet_id = listSource[i][7];
			
			databaseManager.saveData(rec);
			var failedRecords = databaseManager.getFailedRecords();
			if (failedRecords.length > 0){
				for (var j=0; j<failedRecords.length; j++){
					application.output(failedRecords[i]);
				}
			}	
		}			
	}	
	
	return true;
}

/**
 * @return {Boolean}
 * @public
 * @properties={typeid:24,uuid:"0C3100DE-29AF-415F-8CAE-1750CB4B1E20"}
 */
function populateCompanies() {
	
	//clean table first
	var fs = datasources.mem.company.getFoundSet();
	fs.loadAllRecords();
	fs.deleteAllRecords();
	
	var client = plugins.http.createNewHttpClient();
	var request = client.createGetRequest(globals.crmURL + 'companies');
	request.addHeader('Accept', 'application/json');
	request.addHeader('Content-type','application/json');
	var response = request.executeRequest(scopes.security.username, scopes.security.password);

	/** @type {{successful: Boolean, message: String, value: *}} */
	var responseBody = JSON.parse(response.getResponseBody());

	if (responseBody.successful == false){
		application.output('Message: ' + responseBody.message);
		return false;
	}
	
	if (responseBody.value.list){
		var listSource = responseBody.value.list;
		
		for (var i = 0; i < listSource.length; i++) {
			var rec = fs.getRecord(fs.newRecord());
			rec.company_id = listSource[i][0];
			rec.name = listSource[i][1];
			databaseManager.saveData(rec);
			
			//application.output(i + ' ' + rec.company_id + ' ' + rec.name + ' ' +  successInsert);
		}			
	}	
	
	return true;
}

/**
 * @return {Boolean}
 * @public
 * @properties={typeid:24,uuid:"B7CE09C7-5008-473F-A889-67BE4133694A"}
 */
function populateBudgets() {
	
	//clean table first
	var fs = datasources.mem.budget.getFoundSet();
	fs.loadAllRecords();
	fs.deleteAllRecords();
	
	var client = plugins.http.createNewHttpClient();
	var request= client.createGetRequest(globals.crmURL + 'budgets');
	request.addHeader('Accept', 'application/json');
	request.addHeader('Content-type','application/json');
	var response = request.executeRequest(scopes.security.username, scopes.security.password);

	/** @type {{successful: Boolean, message: String, value: *}} */
	var responseBody = JSON.parse(response.getResponseBody());

	if (responseBody.successful == false){
		application.output('Message: ' + responseBody.message);
		return false;
	}
	
	if (responseBody.value.list){
		var listSource = responseBody.value.list;
		
		for (var i = 0; i < listSource.length; i++) {
			var rec = fs.getRecord(fs.newRecord());
			rec.budget_id = listSource[i][0];
			rec.company_id = listSource[i][1];
			rec.name = listSource[i][2];
			databaseManager.saveData(rec);
		}			
	}	
	
	return true;
}
