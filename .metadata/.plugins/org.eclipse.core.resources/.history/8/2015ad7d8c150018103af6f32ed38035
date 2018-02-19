/**
 * @type {String}
 * @properties={typeid:35,uuid:"114881B6-8203-460D-980D-380CA8199457"}
 */
var crmURL = 'http://localhost:8080/servoy-service/rest_ws/svyTimesheetsAPI/';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"49DF4028-B6C6-4984-8954-62F5F9EF548D",variableType:8}
 */
var apiSyncTimesheet = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"6D67BDC2-CAEB-4D33-B2EF-FBDDFE68CFBC",variableType:4}
 */
var apiSyncTimespent = 0;

/**
 * @param {Number} rowsCount
 * @return {Number}
 * @public
 * @properties={typeid:24,uuid:"486B8C4A-881F-4AA3-9C75-A119B656B192"}
 */
function calculateTableHeight(rowsCount) {
	var height = 40 + (37 * rowsCount);
	return height;
}

/**
 * @param {Number} rowsCount
 * @return {Number}
 * @public
 * @properties={typeid:24,uuid:"6FF7F0F3-06B2-4C2C-81F4-98A6EA18AC89"}
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
 * @properties={typeid:24,uuid:"1F582E42-2587-4F2F-AB0B-B36E3469397B"}
 */
function onSolutionOpen(arg, queryParams) {
	databaseManager.setAutoSave(false);
}

/**
 * @properties={typeid:24,uuid:"29A862AF-0EAE-4C47-973B-2DAEFF771A3E"}
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
 * @properties={typeid:24,uuid:"586D2D1E-E3FB-485A-B08B-40FB886490D0"}
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
