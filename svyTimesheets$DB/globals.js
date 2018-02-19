/**
 * @type {String}
 * @properties={typeid:35,uuid:"355CBE3B-3F50-473A-8151-8A5290A9DFBE"}
 */
var crmURL = 'http://localhost:8080/servoy-service/rest_ws/svyTimesheetsAPI/';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"831F075E-295D-4AA4-9AAE-EBF88365D582",variableType:8}
 */
var apiSyncTimesheet = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"DEDD16DE-45C9-4BC9-A58B-A920D5F414F1",variableType:4}
 */
var apiSyncTimespent = 0;

/**
 * @param {Number} rowsCount
 * @return {Number}
 * @public
 * @properties={typeid:24,uuid:"E7ABA835-812B-4537-9E10-A4C604FC5C69"}
 */
function calculateTableHeight(rowsCount) {
	var height = 40 + (37 * rowsCount);
	return height;
}

/**
 * @param {Number} rowsCount
 * @return {Number}
 * @public
 * @properties={typeid:24,uuid:"AEB4F75B-0D31-42AD-BAC3-E938FFE762AD"}
 */
function calculateTimesheetsTableHeight(rowsCount) {
	var height = 60 + (55 * rowsCount);
	return height;
}

/**
 * Callback method for when solution is opened.
 * When deeplinking into solutions, the argument part of the deeplink url will be passed in as the first argument
 * All query parameters + the argument of the deeplink url will be passed in as the second argument
 * For more information on deeplinking, see the chapters on the different Clients in the Deployment Guide.
 *
 * @param {String} arg startup argument part of the deeplink url with which the Client was started
 * @param {Object<Array<String>>} queryParams all query parameters of the deeplink url with which the Client was started
 *
 * @properties={typeid:24,uuid:"88096C7C-6E73-4D67-B978-148899C5DA69"}
 */
function onSolutionOpen(arg, queryParams) {
	databaseManager.setAutoSave(false);
}

/**
 * @properties={typeid:24,uuid:"29F4FB8B-6023-4065-8168-49B960DA6816"}
 */
function setMenuData() {
	var menu = [{
    	menuItems: [
    	{
	    	id: 1,
	    	text: scopes.security.name
    	}, 
		{
			isDivider: false
		},
		{
	    	id: 2,
	    	text: 'Timesheets List',
			styleClass : "sn-large",
	        iconStyleClass: "fa fa-list"
    	},
		{
			id: 3,
			text: 'Create Timesheet',
	        styleClass : 'sn-large',
	        iconStyleClass: 'fa fa-plus'
	    	
		},
		{
			id: 4,
			text: 'Logout',
	        styleClass : 'sn-large',
	        iconStyleClass: 'fa fa-user'
		}
    	]
    }];
	
	return menu;
}

/**
 * @param {object} menuItemId
 * @param {JSEvent} event
 * @return {boolean}
 * @public
 * @properties={typeid:24,uuid:"BD45C031-5063-444D-9FC7-287E872DA758"}
 */
function onMenuItemSelected(menuItemId, event) {
	switch(menuItemId){
		case 2:
			application.showForm(forms.timesheetsList);
			//elements.sidenav.open = false;
			break;
		case 3:
			application.showForm(forms.createTimesheet);
			//elements.sidenav.open = false;
			break;
		case 4:
			//elements.sidenav.open = false;
			scopes.security.logout();
			break;	
	}
	return false;
}
