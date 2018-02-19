/**
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 * @private
 * @properties={typeid:24,uuid:"DDBE8E31-1E67-4F27-831A-70CCD8C94E17"}
 */
function onShow(firstShow, event) {

	elements.sidenav.open = false;
	year = new Date().getFullYear();
	week = scopes.calendar.populateWeeksList(year);
	
	if (firstShow){
		/** @type {Array<servoyextra-sidenav.MenuItem>} */
		var menuData = scopes.globals.setMenuData();
		elements.sidenav.setRootMenuItems(menuData);
	}
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"3C5B0A30-2775-40CF-8A67-2BBA8831CC75"}
 */
function changeYearAction(event) {	
	week = scopes.calendar.populateWeeksList(year);	
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"D5E14A20-D2AD-41C3-AA68-B57E69D6DC80"}
 */
function closeButtonOnAction(event) {
	foundset.deleteRecord();
	application.showForm(forms.timesheetsList);
}

/**
 * @public
 * @properties={typeid:24,uuid:"8592E8E2-F33D-4D4A-AC27-1FDF8042AE58"}
 */
function createRecord(){
	var idx = foundset.newRecord();
	var record = foundset.getRecord(idx);
	record.user_id = scopes.security.userId;
	record.status = 0;
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"3DF56732-3ABD-4236-8A1B-81E195E3E838"}
 * @AllowToRunInFind
 */
function saveOnAction(event) {
	
	if (!databaseManager.saveData(foundset.getSelectedRecord())){
		var failedRecords = databaseManager.getFailedRecords();	
		for (var i=0; i<failedRecords.length; i++){
			application.output(failedRecords[i].exception.getMessage());
		}
	}

	if (scopes.helpers.isDesktop()){
		plugins.webnotificationsToastr.success('The new Timesheet was created successfully.');
	}
		
	application.showForm(forms.timesheetPage);
}
