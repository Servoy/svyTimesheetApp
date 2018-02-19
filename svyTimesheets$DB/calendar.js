/**
 * create years list for the Years select box
 * @public
 * @properties={typeid:24,uuid:"46DB69B0-D515-4C20-937C-5B91DCAC9CA2"}
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
 * @properties={typeid:24,uuid:"9CF0C6ED-3240-4934-84D3-5661BDE9AB6D"}
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
 * @properties={typeid:24,uuid:"9F8A242D-EC51-49A5-AE93-90CB073160C8"}
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
 * @properties={typeid:24,uuid:"4C88EDC4-3821-43ED-ABE4-FEC161CA1C9B"}
 */
function weeksAlreadyCreated(selectedYear) {
	var query = datasources.db.timesheet.timesheet.createSelect();
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
 * @properties={typeid:24,uuid:"B62BF711-DD27-45EB-8FA5-610B30B76034"}
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
 * @properties={typeid:24,uuid:"DE545FB3-957D-4B8A-9D1D-C95F99DCD5B0"}
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
