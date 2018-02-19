/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"232B097A-1EA4-4D37-A3BB-E8A2384B509E"}
 */
var recordDate = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2FD5A114-E5C7-4007-A11C-4BEF8BAC8D32"}
 */
var submitButtonMessage = null;

/**
 * @param {Number} id
 * @public
 * @properties={typeid:24,uuid:"BA8F15F2-949A-4023-8A39-015F7E5BC103"}
 */
function createRecord(id){
	
	//get latest inserted record to obtain the company and budget ids
	var lastTimespendId = datasources.db.timesheet.timespent.getFoundSet().getLatestRecordId();
	var query = datasources.db.timesheet.timespent.createSelect();
	query.where.add(query.columns.timespent_id.eq(lastTimespendId));
	var fs = datasources.db.timesheet.timespent.getFoundSet();
	fs.loadRecords(query);
	var latestCompanyId = null;
	var latestBudgetId = null;
	if (fs.getSize() > 0){
		var latestRecord = fs.getRecord(1);
		latestCompanyId = latestRecord.company_id;
		latestBudgetId = latestRecord.budget_id;
	}
	
	var idx = foundset.newRecord();
	var rec = foundset.getRecord(idx);
	rec.is_billable = 1;
	rec.hours = 0;
	rec.timesheet_id = id;
	rec.company_id = latestCompanyId;
	rec.budget_id = latestBudgetId;   
	recordDate = null;
}

/**
 * @param recordId
 * @public
 * @properties={typeid:24,uuid:"95A85EF4-64CF-4DF2-90D6-BC4675916BBA"}
 */
function editRecord(recordId){
	foundset.loadRecords(recordId);
	recordDate = foundset.book_date.getDate() + ' ' + foundset.book_date.getMonth() + ' ' + foundset.book_date.getFullYear();
}

/**
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 * @private
 * @properties={typeid:24,uuid:"51AF9F6B-F8F8-4E0A-8D04-0BC91EA6C2A3"}
 */
function onShow(firstShow, event) {
	
	elements.sidenav.open = false;
	
	if (firstShow){
		/** @type {Array<servoyextra-sidenav.MenuItem>} */
		var menuData = scopes.globals.setMenuData();
		elements.sidenav.setRootMenuItems(menuData);
	}
	
	createWeekDaysValuelist();
	
	if (foundset.timespent_id){
		submitButtonMessage = 'Update Time Record';
	}
	else {
		submitButtonMessage = 'Create Time Record';
	}   
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"EE22DB77-34B0-4D9F-8EF7-4148ADFB0AD8"}
 */
function saveFormOnAction(event) {
	
	var toastMessage;
	if (foundset.timespent_id){//edit
		toastMessage = 'The Timespent record was updated succesfully.';
	}
	else {//create
		toastMessage = 'The Timespent record was created succesfully.';
	}
	
	if (recordDate == null){
		plugins.dialogs.showWarningDialog('Note','Please select a Date.');
	}
	else if (company_id == null){
		plugins.dialogs.showWarningDialog('Note','Please select a Company.');
	}
	else if (budget_id == null){
		plugins.dialogs.showWarningDialog('Note','Please select a Budget.');
	}
	else if ( (hours == 0) || (hours > 24) ){
		plugins.dialogs.showWarningDialog('Note','Please insert a valid Number of Hours.');
	}
	else if (description == null){
		plugins.dialogs.showWarningDialog('Note','Please insert a Description.');
	}
	else {
		var record = foundset.getSelectedRecord();	
		
		if (!record.is_billable){ record.is_billable = 0; }
		var dateDayMonth = recordDate.split(' ');	
		record.book_date = new Date(parseInt(dateDayMonth[2]), parseInt(dateDayMonth[1]), parseInt(dateDayMonth[0])); 
		if (!databaseManager.saveData(record)) {
			toastMessage = 'The creation of the Timespent record was not successful.';
		}
		
		var failedRecords = databaseManager.getFailedRecords();	
		for (var i=0; i<failedRecords.length; i++){
			application.output('error: ' + scopes.timesheetsUtils.getExceptions(failedRecords[i]));
		}
		
		if (scopes.helpers.isDesktop()) {
			if (failedRecords.length == 0) {
				plugins.webnotificationsToastr.success(toastMessage);
			} else {

				plugins.webnotificationsToastr.error(toastMessage);
			}
		}

		application.showForm(forms.timesheetPage);
	}
	
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"A7C37070-2293-4EED-8187-74E201CF0238"}
 */
function changeCompanyAction(event) {	
    budget_id = setDefaultBudgetId(company_id);
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"007B4631-7261-44ED-A3F3-6A7DE0D43536"}
 */
function backButtonOnAction(event) {
	if (foundset == 0){
		foundset.deleteRecord();
	}
	else {
		var idx = foundset.getSelectedRecord();
		idx.revertChanges();
	}
	
	application.showForm(forms.timesheetPage);
}

/**
 * @param {Number} companyId
 * @return {Number}
 * @private
 * @properties={typeid:24,uuid:"0A773D49-937B-4822-A96C-4088F9FBB520"}
 */
function setDefaultBudgetId(companyId) {
	
	var selectDefault = application.getValueListItems('budgetsList');
    selectDefault.rowIndex = 1;
    var selectDefaultBudgetId = selectDefault['realvalue'];
    var budgetId = parseInt(selectDefaultBudgetId);
    
    return budgetId;
}

/**
 * @private
 * @properties={typeid:24,uuid:"943D30D2-B3FA-45C6-B92B-C8261425BE4E"}
 */
function createWeekDaysValuelist(){
	
	/** @type {JSRecord<db:/timesheet/timesheet>} */
	var timesheetRecord = datasources.db.timesheet.timesheet.getFoundSet().getTimesheet(foundset.timesheet_id);
	
	var dayDate = scopes.calendar.weekDateValues(timesheetRecord.year, timesheetRecord.week);
	var months = scopes.calendar.getMonths();
	var weekDaysNames = scopes.calendar.getWeekDaysNames();
	var workDaysValues = new Array();
	var workDaysTexts = new Array();
	var day2;
	var month2;
	var month2String;

	for (var i = 0; i < 7; i++){
		
		var d2 = scopes.svyDateUtils.addDays(dayDate, i);
		day2 = d2.getDate();
		month2 = d2.getMonth();
		month2String = months[month2];
			
		workDaysTexts.push(weekDaysNames[i] + ', ' + day2 + ' ' + month2String);
		workDaysValues.push(day2 + ' ' + month2 + ' ' + d2.getFullYear());
		
	}
    application.setValueListItems('workDaysList', workDaysTexts, workDaysValues);
    
    return true;
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"2839DB77-3CC1-4192-8D11-CBC9A892E470"}
 */
function refreshCompanies(event) {
//	scopes.data.populateCompanies();
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"E066F350-6458-422F-ADC8-A1BFF3ADFD9F"}
 */
function refreshBudgets(event) {
//	scopes.data.populateBudgets();
}
