/**
 * @properties={typeid:36,uuid:"AC96D238-8381-44B2-8569-FDA9BD941F2F"}
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
 * @properties={typeid:36,uuid:"63EEA830-D7CD-41FD-BDF4-4A9192BEE4EE"}
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
 * @properties={typeid:36,uuid:"38F57261-92AC-4E1C-9096-2222242A5B42"}
 */
function calculateWeekInterval(){
	
	var dayDate = scopes.calendar.weekDateValues(year, week);
	var dayDate2 = scopes.svyDateUtils.addDays(dayDate, 6);	
	var months = scopes.calendar.getMonths();
	
    return dayDate.getDate() + ' ' + months[dayDate.getMonth()] + ' - ' + dayDate2.getDate() + '  ' + months[dayDate2.getMonth()];
}
