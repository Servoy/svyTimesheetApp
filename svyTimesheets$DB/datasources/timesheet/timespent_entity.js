/**
 * @param {Number} id
 * @return {JSRecord<db:/timesheet/timespent>}
 * @public
 * @properties={typeid:24,uuid:"9E0106AA-C5B4-4535-9AD5-72AAA431710A"}
 */
function getTimespent(id) {
	var query = datasources.db.timesheet.timespent.createSelect();
	query.where.add(query.columns.timespent_id.eq(id));
	var fs = datasources.db.timesheet.timespent.getFoundSet();
	fs.loadRecords(query);
	if (fs.getSize() != 1) {
		return null;
	}
	return fs.getRecord(1);
}

/**
 * @param {JSRecord<db:/timesheet/timespent>} record
 * @return {Boolean}
 * @private
 * @properties={typeid:24,uuid:"79D01220-2480-4514-9F4F-CBE55A9E12B5"}
 */
function validateSave(record) {
	var errorMessages = [];

	//check hours_spent
	if (record.hours > 24) {
		errorMessages.push('The Hours number is bigger than 24.');
	}

	//check description length
	if (record.description.length > 100) {
		errorMessages.push('The Description length is bigger than 100 characters.');
	}

	//check if the timesheet_id is a valid one
	if (!datasources.db.timesheet.timesheet.getFoundSet().hasTimesheet(record.timesheet_id)) {
		errorMessages.push("The Timesheet ID doesn't correspond to any record from the Timesheet table.");
	}

	//check if the company_id is a valid one
	if (!datasources.db.timesheet.company.getFoundSet().hasCompany(record.company_id)) {
		errorMessages.push("The Company ID doesn't correspond to any record from the Company table.");
	}

	//check if the budget_id is a valid one
	if (!datasources.db.timesheet.budget.getFoundSet().hasBudget(record.budget_id)) {
		errorMessages.push("The Budget ID doesn't correspond to any record from the Budget table.");
	}

	if (errorMessages.length > 0) {
		throw errorMessages;
	}

	return true;
}

/**
 * @param {JSRecord<db:/timesheet/timespent>} record record that will be inserted
 * @return {Boolean}
 * @private
 * @properties={typeid:24,uuid:"FD3CD815-5510-4E82-90F2-0B1D8472F001"}
 */
function onRecordInsert(record) {
	if (validateSave(record)) {
		datasources.db.timesheet.budget.getFoundSet().addHours(record.budget_id, record.hours, record.is_billable == 1);
	}
	return true;
}

/**
 * @param {JSRecord<db:/timesheet/timespent>} record record that will be updated
 * @returns {Boolean}
 * @private
 * @properties={typeid:24,uuid:"9137C05B-2185-4887-BEB9-A7D75B6318F9"}
 */
function onRecordUpdate(record) {

	if (validateSave(record)) {

		var oldValuesTimespent = scopes.timesheetsUtils.getOldValues(record, ['budget_id', 'hours', 'is_billable']);
		/** @type {Number} */
		var oldBudgetId = oldValuesTimespent['budget_id'];
		/** @type {Number} */
		var oldHours = oldValuesTimespent['hours'];
		/** @type {Boolean} */
		var oldBillable = oldValuesTimespent['is_billable'];

		datasources.db.timesheet.budget.getFoundSet().removeHours(oldBudgetId, oldHours, oldBillable == 1);
		datasources.db.timesheet.budget.getFoundSet().addHours(record.budget_id, record.hours, record.is_billable == 1);
	}

	return true;
}

/**
 * Record pre-delete trigger.
 * Validate the record to be deleted.
 * When false is returned the record will not be deleted in the database.
 * When an exception is thrown the record will also not be deleted in the database but it will be added to databaseManager.getFailedRecords(),
 * the thrown exception can be retrieved via record.exception.getValue().
 *
 * @param {JSRecord<db:/timesheet/timespent>} record record that will be deleted
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B7151737-7FCA-4E5A-86EB-42531DED5355"}
 */
function onRecordDelete(record) {
	datasources.db.timesheet.budget.getFoundSet().removeHours(record.budget_id, record.hours, Boolean(record.is_billable));

	return true
}

/**
 * @return {Number}
 * @properties={typeid:24,uuid:"E42A3027-7B99-4024-A1A6-55D5CC0FACC4"}
 */
function getLatestRecordId() {

	var query = datasources.db.timesheet.timespent.createSelect();

	query.result.add(query.columns.timespent_id.max, 'latesttimespentid');

	/** @type {JSDataSet<{latesttimespentid: Number}>} */

	var ds = databaseManager.getDataSetByQuery(query, 1);

	ds.rowIndex = 1;

	return ds.latesttimespentid;

}
