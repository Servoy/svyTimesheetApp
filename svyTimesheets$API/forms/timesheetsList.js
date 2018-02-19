/**
 * @type {Number}
 * @private
 * @properties={typeid:35,uuid:"5A8F2AD6-479E-4E18-97D6-44E1E2D7131A",variableType:4}
 */
var currentYear = null;

/**
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 * @private
 * @properties={typeid:24,uuid:"D8736DE8-D979-415C-99E8-DD7701B19957"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	
	if (firstShow){
		
		scopes.calendar.setYearsList();
		currentYear = new Date().getFullYear();
		scopes.data.populateTimesheets(currentYear);
	    
		/** @type {Array<servoyextra-sidenav.MenuItem>} */
		var menuData = scopes.globals.setMenuData();
	    elements.sidenav.setRootMenuItems(menuData);
	}
	
	foundset.sort('week desc');	
	updateUI();
}

/**
 * @private
 * @properties={typeid:24,uuid:"A1F4FECE-C0B4-4372-845B-FEA8C0DE2EC4"}
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
 * @properties={typeid:24,uuid:"02F49CBA-DDDA-418D-98CC-78D45F126119"}
 */
function selectYearOnAction(event) {	
	scopes.data.populateTimesheets(currentYear);
	updateUI();
}

/**
 * @param {JSEvent} event
 * @properties={typeid:24,uuid:"A526482D-DAC3-436A-8D08-8FC16AF203F3"}
 */
function tableOnCellClick(event) {
	application.showForm(forms.timesheetPage);
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"21400BA2-8010-4D78-A2E6-A3E6DB6BF44C"}
 */
function addButtonOnAction(event) {
	forms.createTimesheet.createRecord();
	application.showForm(forms.createTimesheet);
}
