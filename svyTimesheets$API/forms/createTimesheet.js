/**
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 * @private
 * @properties={typeid:24,uuid:"4045F2DE-3483-4579-B760-FF26218D7E30"}
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
 * @properties={typeid:24,uuid:"0C4A764B-2431-48B0-B601-14CD8F3F05B3"}
 */
function changeYearAction(event) {	
	week = scopes.calendar.populateWeeksList(year);	
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"7C689154-20ED-4216-BE53-4199E8EE27CC"}
 */
function closeButtonOnAction(event) {
	foundset.deleteRecord();
	application.showForm(forms.timesheetsList);
}

/**
 * @public
 * @properties={typeid:24,uuid:"F412AEAE-F0F1-45AE-9805-24DB6E6C455E"}
 */
function createRecord(){
	var idx = foundset.newRecord();
	var record = foundset.getRecord(idx);
	record.status = 0;
	record.timesheet_id = 0;
	record.hours_sum = 0;
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"F7F02678-3790-4CD3-A07B-C0462E10C5B5"}
 * @AllowToRunInFind
 */
function saveOnAction(event) {
	
	globals.apiSyncTimesheet = 1;
	
	if (!databaseManager.saveData(foundset.getSelectedRecord())){
		var failedRecords = databaseManager.getFailedRecords();	
		for (var i=0; i<failedRecords.length; i++){
			application.output(failedRecords[i].exception.getMessage());
		}
		globals.apiSyncTimesheet = 0;
	}

	if (scopes.helpers.isDesktop()){
		plugins.webnotificationsToastr.success('The new Timesheet was created successfully.');
	}
		
	application.showForm(forms.timesheetPage);
}
