/**
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 * @private
 * @properties={typeid:24,uuid:"1C8A3C82-576C-4635-AD82-6D58AED34342"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	
	if (firstShow){
		/** @type {Array<servoyextra-sidenav.MenuItem>} */
		var menuData = scopes.globals.setMenuData();
		elements.sidenav.setRootMenuItems(menuData);
	}
	
	scopes.data.populateTimeRecords(foundset.timesheet_id);
	
	populateDaysGrids();
	updateUI();
}

/**
 * @private
 * @properties={typeid:24,uuid:"9BA8A55E-E681-4DA6-AE75-072F28F0DE9A"}
 */
function populateDaysGrids(){
	
	var dayDate = scopes.calendar.weekDateValues(foundset.year, foundset.week);
	var dayDate2;
	var dayDate3;
	
	for (var i = 0; i < 7; i++){
		
		dayDate2 = scopes.svyDateUtils.addDays(dayDate, i);
		dayDate2.setHours(0);
		dayDate2.setMinutes(0);
		dayDate2.setSeconds(0);
		dayDate3 = scopes.svyDateUtils.addHours(dayDate2, 23);
		dayDate3 = scopes.svyDateUtils.addMinutes(dayDate3, 59);
		dayDate3 = scopes.svyDateUtils.addSeconds(dayDate3, 59);
			
		switch (i){
			case 0:
				var queryMonday = datasources.mem.timespent.createSelect();
				queryMonday.where.add(queryMonday.columns.book_date.between(dayDate2, dayDate3));
				queryMonday.where.add(queryMonday.columns.timesheet_id.eq(foundset.timesheet_id));
				elements.tableMonday.foundset.foundset.loadRecords(queryMonday);
				break;
				
			case 1:
				var queryTuesday = datasources.mem.timespent.createSelect();
				queryTuesday.where.add(queryTuesday.columns.book_date.between(dayDate2, dayDate3));
				queryTuesday.where.add(queryTuesday.columns.timesheet_id.eq(foundset.timesheet_id));
				elements.tableTuesday.foundset.foundset.loadRecords(queryTuesday);
				break;
			
			case 2:
				var queryWednesday = datasources.mem.timespent.createSelect();
				queryWednesday.where.add(queryWednesday.columns.book_date.between(dayDate2, dayDate3));
				queryWednesday.where.add(queryWednesday.columns.timesheet_id.eq(foundset.timesheet_id));
				elements.tableWednesday.foundset.foundset.loadRecords(queryWednesday);
				break;
				
			case 3:
				var queryThursday = datasources.mem.timespent.createSelect();
				queryThursday.where.add(queryThursday.columns.book_date.between(dayDate2, dayDate3));
				queryThursday.where.add(queryThursday.columns.timesheet_id.eq(foundset.timesheet_id));
				elements.tableThursday.foundset.foundset.loadRecords(queryThursday);
				break;
				
			case 4:
				var queryFriday = datasources.mem.timespent.createSelect();
				queryFriday.where.add(queryFriday.columns.book_date.between(dayDate2, dayDate3));
				queryFriday.where.add(queryFriday.columns.timesheet_id.eq(foundset.timesheet_id));
				elements.tableFriday.foundset.foundset.loadRecords(queryFriday);
				break;
				
			case 5:
				var querySaturday = datasources.mem.timespent.createSelect();
				querySaturday.where.add(querySaturday.columns.book_date.between(dayDate2, dayDate3));
				querySaturday.where.add(querySaturday.columns.timesheet_id.eq(foundset.timesheet_id));
				elements.tableSaturday.foundset.foundset.loadRecords(querySaturday);
				break;
				
			case 6:
				var querySunday = datasources.mem.timespent.createSelect();
				querySunday.where.add(querySunday.columns.book_date.between(dayDate2, dayDate3));
				querySunday.where.add(querySunday.columns.timesheet_id.eq(foundset.timesheet_id));
				elements.tableSunday.foundset.foundset.loadRecords(querySunday);
				break;
		}	
	}	
}

/**
 * @private
 * @properties={typeid:24,uuid:"C1D93A29-4A18-4670-8F9B-FDBB2A3A4216"}
 */
function updateUI(){
	
	elements.sidenav.open = false;
	
	var timesheetHasHours = false;
	elements.textNoHours.visible = true;
	elements.submitTimesheetButton.visible =  false;
	elements.buttonAddTime.visible =  false;
	
	var hoursAvailableMonday = elements.tableMonday.foundset.foundset.getSize();
	if (hoursAvailableMonday == 0){
		elements.tableMonday.visible = false;
		elements.titleMonday.visible = false;
	}
	else {
		elements.tableMonday.visible = true;
		elements.titleMonday.visible = true;					
		timesheetHasHours =  true;
		elements.tableMonday.responsiveHeight = globals.calculateTableHeight(hoursAvailableMonday);
	}
	
	var hoursAvailableTuesday = elements.tableTuesday.foundset.foundset.getSize(); 
    if (hoursAvailableTuesday == 0){
		elements.tableTuesday.visible = false;
		elements.titleTuesday.visible = false;
	}
	else {
		elements.tableTuesday.visible = true;
		elements.titleTuesday.visible = true;					
		timesheetHasHours =  true;
		elements.tableTuesday.responsiveHeight = globals.calculateTableHeight(hoursAvailableTuesday);
	}
    
	var hoursAvailableWednesday = elements.tableWednesday.foundset.foundset.getSize();
	if (hoursAvailableWednesday == 0){
		elements.tableWednesday.visible = false;
		elements.titleWednesday.visible = false;
	}
	else {
		elements.tableWednesday.visible = true;
		elements.titleWednesday.visible = true;					
		timesheetHasHours =  true;
		elements.tableWednesday.responsiveHeight = globals.calculateTableHeight(hoursAvailableWednesday);
	}
	
	var hoursAvailableThursday = elements.tableThursday.foundset.foundset.getSize();
	if (hoursAvailableThursday == 0){
		elements.tableThursday.visible = false;
		elements.titleThursday.visible = false;
	}
	else {
		elements.tableThursday.visible = true;
		elements.titleThursday.visible = true;					
		timesheetHasHours =  true;
		elements.tableThursday.responsiveHeight = globals.calculateTableHeight(hoursAvailableThursday);
	}
	
	var hoursAvailableFriday = elements.tableFriday.foundset.foundset.getSize();
	if (hoursAvailableFriday == 0){
		elements.tableFriday.visible = false;
		elements.titleFriday.visible = false;
	}
	else {
		elements.tableFriday.visible = true;
		elements.titleFriday.visible = true;					
		timesheetHasHours =  true;
		elements.tableFriday.responsiveHeight = globals.calculateTableHeight(hoursAvailableFriday);
	}
    
    var hoursAvailableSaturday = elements.tableSaturday.foundset.foundset.getSize();
	if (hoursAvailableSaturday == 0){
		elements.tableSaturday.visible = false;
		elements.titleSaturday.visible = false;
	}
	else {
		elements.tableSaturday.visible = true;
		elements.titleSaturday.visible = true;					
		timesheetHasHours =  true;
		elements.tableSaturday.responsiveHeight = globals.calculateTableHeight(hoursAvailableSaturday);
	}
    
    var hoursAvailableSunday = elements.tableSunday.foundset.foundset.getSize();
	if (hoursAvailableSunday == 0){
		elements.tableSunday.visible = false;
		elements.titleSunday.visible = false;
	}
	else {
		elements.tableSunday.visible = true;
		elements.titleSunday.visible = true;					
		timesheetHasHours =  true;
		elements.tableSunday.responsiveHeight = globals.calculateTableHeight(hoursAvailableSunday);
	}
    
	if (timesheetHasHours){
		elements.textNoHours.visible = false;
	}
	
	if ( (foundset.status == 0) && (timesheetHasHours == true)){
		elements.submitTimesheetButton.visible =  true;
	}
	
	if (foundset.status == 0){ 
		elements.buttonAddTime.visible =  true;
	}
	else {
		elements.buttonAddTime.visible = false;
	}
}

/**
 * @param {JSEvent} event
 * @public
 * @properties={typeid:24,uuid:"65BE5A2D-EDF0-4905-9226-E2855BA5BC87"}
 */
function addTimeRecord(event) {
	forms.timespentForm.createRecord(foundset.timesheet_id);
	application.showForm(forms.timespentForm);
}

/**
 * submit the timesheet for review
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"B25645AC-4179-4F55-8054-4D057EBE4484"}
 * @SuppressWarnings(wrongparameters)
 */
function submitTimesheetAction(event) {
	var feedback = plugins.dialogs.showInfoDialog('Submit the Timesheet', 'Are you sure this Timesheet is complete?', ['OK', 'Cancel']);

	if (feedback == 'OK'){
		globals.apiSyncTimesheet = 1;
		foundset.status = 1;
		databaseManager.saveData();
		application.showForm(forms.timesheetsList);
	}
}

/**
 * @param {Number} foundsetindex
 * @param {Number} columnindex
 * @param {JSRecord<mem:timespent>} [record]
 * @param {JSEvent} [event]
 * @private
 * @properties={typeid:24,uuid:"CE4C350E-E898-4E71-BA73-652A3D446C27"}
 * @SuppressWarnings(wrongparameters)
 */
function onRecordClick(foundsetindex, columnindex, record, event) {
	//edit record
	if (columnindex == 5){
		forms.timespentForm.editRecord(record.timespent_id);
		application.showForm(forms.timespentForm);
	}
	//delete record
	else if (columnindex == 6){
		var feedback = plugins.dialogs.showInfoDialog('Delete Record', 'Please confirm the deletion of this record', ['OK', 'Cancel']);
		
		if (feedback == 'OK'){
			
			globals.apiSyncTimespent = 1;
			var fs = datasources.mem.timespent.getFoundSet();
			var query =  datasources.mem.timespent.createSelect();
			query.where.add(query.columns.timespent_id.eq(record.timespent_id));
			fs.loadRecords(query);
			if (!fs.deleteRecord()){
				if (scopes.helpers.isDesktop()){
					plugins.webnotificationsToastr.error('There was a problem deleting the Timespent record.');
				}
			}
			globals.apiSyncTimespent = 0;
			
			if (scopes.helpers.isDesktop()){
				plugins.webnotificationsToastr.success('The Timespent record was deleted successfully.');
			}
			
			updateUI();
		}
	}
	return true;
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"AFF87198-10B4-49CA-9305-8FD66376073A"}
 */
function navOnAction(event) {
	application.showForm(forms.timesheetsList);
}
