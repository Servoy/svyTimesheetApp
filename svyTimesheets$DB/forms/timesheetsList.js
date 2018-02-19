/**
 * @type {Number}
 * @private
 * @properties={typeid:35,uuid:"86F0AD4C-E607-4EE6-BB8A-5297938A07C7",variableType:4}
 */
var currentYear = null;

/**
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 * @private
 * @properties={typeid:24,uuid:"7DB5C6E7-FC56-4858-A9B0-6EA3598889A8"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	
	if (firstShow){
		
		scopes.calendar.setYearsList();
		currentYear = new Date().getFullYear();
		scopes.data.populateTimesheets(foundset, currentYear);
	    
		/** @type {Array<servoyextra-sidenav.MenuItem>} */
		var menuData = scopes.globals.setMenuData();
	    elements.sidenav.setRootMenuItems(menuData);
	}
	
	updateUI();
}

/**
 * @private
 * @properties={typeid:24,uuid:"97D39022-1868-4098-8F55-405B563630A4"}
 */
function updateUI(){
	
	elements.sidenav.open = false;
	elements.sidenav.visible = false;
	elements.sidenav.visible = true;
	
	var countRecords = elements.timesheetTable.foundset.foundset.getSize();
	
	if (countRecords == 0){
    	elements.noTimesheetsMessage.visible =  true;
    	elements.timesheetTable.visible =  false;
    }
    else {
    	elements.noTimesheetsMessage.visible =  false;
    	elements.timesheetTable.visible =  true;
    	elements.timesheetTable.responsiveHeight = globals.calculateTimesheetsTableHeight(countRecords);
    }
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"DE7F880E-AAF6-411D-9D9E-3DEEC9F9D55D"}
 */
function selectYearOnAction(event) {	
	scopes.data.populateTimesheets(foundset, currentYear);
	updateUI();
}

/**
 * @param {JSEvent} event
 * @properties={typeid:24,uuid:"D57A909E-CB24-43BB-804C-F16238EF1862"}
 */
function tableOnCellClick(event) {
	application.showForm(forms.timesheetPage);
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"FE915500-D08F-49C5-9E3C-8C812C462DA7"}
 */
function addButtonOnAction(event) {
	forms.createTimesheet.createRecord();
	application.showForm(forms.createTimesheet);
}
