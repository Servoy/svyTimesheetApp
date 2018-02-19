/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9C990C1C-A49B-4222-95E7-CB34ECFAD80D"}
 */
var recordDate = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A1D9BE76-3C5A-4BDD-BF40-6443A51DFB00"}
 */
var submitButtonMessage = null;

/**
 * @param {Number} id
 * @public
 * @properties={typeid:24,uuid:"604A6A2F-25C9-42F8-9CC6-CF06B37698C1"}
 */
function createRecord(id){
	
	//get latest inserted record to obtain the company and budget ids
	var lastTimespendId = foundset.latestTimespendId;
	var query = datasources.mem.timespent.createSelect();
	query.where.add(query.columns.timespent_id.eq(lastTimespendId));
	var fs = datasources.mem.timespent.getFoundSet();
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
 * @properties={typeid:24,uuid:"BAB3C387-8F8A-4FE6-A2CD-800AC2AD5710"}
 */
function editRecord(recordId){
	foundset.loadRecords(recordId);
	recordDate = foundset.book_date.getDate() + ' ' + foundset.book_date.getMonth() + ' ' + foundset.book_date.getFullYear();
}

/**
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 * @private
 * @properties={typeid:24,uuid:"03CD8EF9-0DF4-43F9-B7AC-1ECE257E0289"}
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
 * @properties={typeid:24,uuid:"69A723E6-A5FC-413D-8776-7F67FA48AEC1"}
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
		
		globals.apiSyncTimespent = 1;
		if (!record.is_billable){ record.is_billable = 0; }
		var dateDayMonth = recordDate.split(' ');	
		record.book_date = new Date(parseInt(dateDayMonth[2]), parseInt(dateDayMonth[1]), parseInt(dateDayMonth[0])); 
		databaseManager.saveData(record);
		
		var failedRecords = databaseManager.getFailedRecords();	
		for (var i=0; i<failedRecords.length; i++){
			application.output('error: ' + globals.getExceptions(failedRecords[i]));
		}
		globals.apiSyncTimespent = 0;
		
		if (scopes.helpers.isDesktop()){
			plugins.webnotificationsToastr.success(toastMessage);
		}

		application.showForm(forms.timesheetPage);
	}
	
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"3AAD04F3-41B9-4696-ADED-844CFBE9639F"}
 */
function changeCompanyAction(event) {	
    budget_id = setDefaultBudgetId(company_id);
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"006FDB69-4F58-4874-9617-253B49CA2E26"}
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
 * @properties={typeid:24,uuid:"C37838DA-0955-4CBD-986F-4A6DD62234A4"}
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
 * @properties={typeid:24,uuid:"831B9AFD-7C2A-45AA-8EB3-EABF60D2F7C3"}
 */
function createWeekDaysValuelist(){
	
	/** @type  {JSRecord<mem:timesheet>} */
	var timesheetRecord = datasources.mem.timesheet.getFoundSet().getTimesheet(foundset.timesheet_id);
	
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
 * @properties={typeid:24,uuid:"46DA32A4-567B-4BAD-93FA-4690DB67A879"}
 */
function refreshCompanies(event) {
	scopes.data.populateCompanies();
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"89A76DF5-C56C-4A6A-8C66-DEC522DB5E87"}
 */
function refreshBudgets(event) {
	scopes.data.populateBudgets();
}
