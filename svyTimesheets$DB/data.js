/**
 * populate Timesheets table
 * @param {JSFoundSet<db:/timesheet/timesheet>} fs
 * @param {Number} year
 * @public
 * @properties={typeid:24,uuid:"74C43176-4796-43CB-8266-9AEB12C001EC"}
 */
function populateTimesheets(fs, year) {
	
	var query = datasources.db.timesheet.timesheet.createSelect();
	query.result.addPk();
	query.where.add(query.columns.year.eq(year));
	query.sort.add(query.columns.week.asc);
	
	fs.loadRecords(query);
}
