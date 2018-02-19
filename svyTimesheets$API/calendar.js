/**
 * create years list for the Years select box
 * @public
 * @properties={typeid:24,uuid:"214FD300-78F0-4254-9359-996308A0FDAA"}
 */
function setYearsList() {

	var year = new Date().getFullYear();
	var yearsValues = new Array();
	var yearsDescription = new Array();
	
	for (var i = year; i > year-5; i--){
		yearsValues.push(i);
		yearsDescription.push(i.toString());
	}	
    application.setValueListItems('yearsList', yearsDescription, yearsValues);
}

/**
 * @return {Array<{month: String}>}
 * @public
 * @properties={typeid:24,uuid:"AEE0E3BE-2283-418E-A6F6-C721BB1F2663"}
 */
function getMonths() {
	var months = new Array();
	months[0] = 'January';
	months[1] = 'February';
	months[2] = 'March';
	months[3] = 'April';
	months[4] = 'May';
	months[5] = 'June';
	months[6] = 'July';
	months[7] = 'August';
	months[8] = 'September';
	months[9] = 'October';
	months[10] = 'November';
	months[11] = 'December';
	
	return months;
}

/**
 * @return {Array<{day: String}>}
 * @public
 * @properties={typeid:24,uuid:"A3A0B117-21DE-4773-A775-CEDFAB7E6A32"}
 */
function getWeekDaysNames() {
	var weekDaysNames = new Array();
	weekDaysNames[0] = 'Monday';
	weekDaysNames[1] = 'Tuesday';
	weekDaysNames[2] = 'Wednesday';
	weekDaysNames[3] = 'Thursday';
	weekDaysNames[4] = 'Friday';
	weekDaysNames[5] = 'Saturday';
	weekDaysNames[6] = 'Sunday';
	
	return weekDaysNames;
}

/**
 * @param {Number} selectedYear
 * @return {Array<{Number}>}
 * @public
 * @properties={typeid:24,uuid:"26A35288-7CE6-41ED-B6E9-ADDE3FB0FB38"}
 */
function weeksAlreadyCreated(selectedYear) {
	var query = datasources.mem.timesheet.createSelect();
	query.result.add(query.columns.week);
	query.where.add(query.columns.year.eq(selectedYear));
	query.sort.add(query.columns.week.desc);
	
	var ds = databaseManager.getDataSetByQuery(query,-1); //-1 = unlimited
	var weeksAlreadyCreatedArray = ds.getColumnAsArray(1);
	
	return weeksAlreadyCreatedArray;	
}

/**
 * @param {Number} selectedYear
 * @return {Number}
 * @public
 * @properties={typeid:24,uuid:"46EFAF9A-1156-4F01-8499-6B9AD539F436"}
 */
function populateWeeksList(selectedYear) {
	
	var week = 52;	
	var currentYear = new Date().getFullYear();
	
	if (currentYear == selectedYear){
		//get current week
		var d = new Date();
	    d.setHours(0,0,0);
	    d.setDate(d.getDate()+4-(d.getDay()||7));
	    week = Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);	       
	}
	
	var weeksValues = new Array();
	var weeksTexts = new Array();
	var weeksAlreadyCreatedArr = weeksAlreadyCreated(selectedYear);
	
	for (var i = week; i > 0; i--){
		if (weeksAlreadyCreatedArr.indexOf(i) < 0){
			weeksValues.push(i);
			weeksTexts.push(i.toString());
		}
	}	
    application.setValueListItems('weeksList', weeksTexts, weeksValues);
    var defaultWeek = weeksValues[0];
    return defaultWeek;//this will the default week value in the select box
}

/**
 * @param {Number} year
 * @param {Number} week
 * @return {Date}
 * @public
 * @properties={typeid:24,uuid:"D2C1117E-0184-41DC-AA2A-8F0D134F0FB8"}
 */
function weekDateValues(year, week)
{
	var simple = new Date(year, 0, 1 + (week - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4){
    	ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    }    
    else {
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }
    
    var day = ISOweekStart.getDate();
	var monthNumber = ISOweekStart.getMonth();
	
	var dayDate = new Date(year, monthNumber, day);

	return dayDate;
}
