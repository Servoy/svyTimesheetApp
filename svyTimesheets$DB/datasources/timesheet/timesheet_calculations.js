/**
 * @properties={type:12,typeid:36,uuid:"04AB5C01-AAFB-4CBC-924C-8EF98C851D0C"}
 */
function calculateWeekDate()
{
	var dayDate = scopes.calendar.weekDateValues(year, week);
	var month = dayDate.getMonth();
	var day = dayDate.getDate();
	
	var months = scopes.calendar.getMonths();	
	var monthString = months[month];
	monthString = utils.stringLeft(monthString,3)
    
    return day + '  ' + monthString;
}

/**
 * @properties={type:12,typeid:36,uuid:"25C8404C-F284-43CC-B618-39508984CB24"}
 */
function calculateStatus()
{
	var ret;
	
	switch (status){
		case 0:
			ret = 'Draft';
			break;
		case 1:
			ret = 'Finished';
			break;
		case 2:
			ret = 'Approved';
			break;
	}
		
	return ret;
}

/**
 * @properties={type:12,typeid:36,uuid:"6069E39D-CDD9-4C0E-83B5-186D391FD098"}
 */
function calculateWeekInterval(){
	
	var dayDate = scopes.calendar.weekDateValues(year, week);
	var dayDate2 = scopes.svyDateUtils.addDays(dayDate, 6);	
	var months = scopes.calendar.getMonths();
	
    return dayDate.getDate() + ' ' + months[dayDate.getMonth()] + ' - ' + dayDate2.getDate() + '  ' + months[dayDate2.getMonth()];
}
