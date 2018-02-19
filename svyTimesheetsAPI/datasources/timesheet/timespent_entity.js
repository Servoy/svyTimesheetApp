/**
 * @param {Number} id
 * @return {JSRecord<db:/timesheet/timespent>}
 * @public
 * @properties={typeid:24,uuid:"A6C3A5FE-FA67-4654-88FF-60EF4125F2E1"}
 */
function getTimespent(id)
{
	var query = datasources.db.timesheet.timespent.createSelect();
	query.where.add(query.columns.timespent_id.eq(id));
	var fs = datasources.db.timesheet.timespent.getFoundSet();
	fs.loadRecords(query);
	if (fs.getSize() != 1){
		return null;
	}
	return fs.getRecord(1);
}

/**
 * @param {JSRecord<db:/timesheet/timespent>} record
 * @return {Boolean}
 * @private
 * @properties={typeid:24,uuid:"3F9E06B6-9034-4D33-8F5B-B4E99182AD77"}
 */
function validateSave(record)
{	
	var errorMessages = [];
	
	//check hours_spent
	if (record.hours > 24){	
		errorMessages.push('The Hours number is bigger than 24.');
	}
	
	//check description length
	if (record.description.length > 100){	
		errorMessages.push('The Description length is bigger than 100 characters.');
	}
	
	//check if the timesheet_id is a valid one
	if (!datasources.db.timesheet.timesheet.getFoundSet().hasTimesheet(record.timesheet_id)){
		errorMessages.push("The Timesheet ID doesn't correspond to any record from the Timesheet table.");
	}
	
	//check if the company_id is a valid one
	if (!datasources.db.timesheet.company.getFoundSet().hasCompany(record.company_id)){
		errorMessages.push("The Company ID doesn't correspond to any record from the Company table.");
	}	
	
	//check if the budget_id is a valid one
	if (!datasources.db.timesheet.budget.getFoundSet().hasBudget(record.budget_id)){
		errorMessages.push("The Budget ID doesn't correspond to any record from the Budget table.");
	}
	
	if (errorMessages.length > 0){
		throw errorMessages;
	}

	return true;
}

/**
 * @param {JSRecord<db:/timesheet/timespent>} record record that will be inserted
 * @return {Boolean}
 * @private
 * @properties={typeid:24,uuid:"7CADCBC5-0B03-4583-99B5-CCD21370CC28"}
 */
function onRecordInsert(record) {
	if (validateSave(record)){		
		datasources.db.timesheet.budget.getFoundSet().addHours(record.budget_id, record.hours, record.is_billable == 1);
	}
	return true;
}

/**
* @param {JSRecord<db:/timesheet/timespent>} record record that will be updated
* @returns {Boolean}
* @private
* @properties={typeid:24,uuid:"B1BE0291-DF33-4B78-9CD5-354764465B47"}
*/
function onRecordUpdate(record) {
	
	if (validateSave(record)){	
		
		var oldValuesTimespent = globals.getOldValues(record, ['budget_id', 'hours', 'is_billable']);
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
