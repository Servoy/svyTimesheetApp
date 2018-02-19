/**
 * @param {Number} id
 * @return {Boolean}
 * @properties={typeid:24,uuid:"55D04C9F-F87F-4D9B-B8DB-504ACA2FE38E"}
 */
function hasBudget(id)
{
	return globals.hasRecord(id, 'budget', 'budget_id');
}

/**
 * @param {Number} id
 * @return {JSRecord<db:/timesheet/budget>}
 * @public
 * @properties={typeid:24,uuid:"52B94D85-F6A5-4E67-979A-4C341457491E"}
 * @AllowToRunInFind
 */
function getBudget(id){
    
	var query = datasources.db.timesheet.budget.createSelect();
	query.where.add(query.columns.budget_id.eq(id));
	var fs = datasources.db.timesheet.budget.getFoundSet();
	fs.loadRecords(query);
	if (fs.getSize() != 1){
		return null;
	}
	return fs.getRecord(1);
}

/**
 * @param {Number} budgetId
 * @param {Number} hours
 * @param {Boolean} isBillable
 * @return {Boolean}
 * @public
 * @properties={typeid:24,uuid:"5C4F3B0A-FB08-43EE-83B2-7D45DC40B26C"}
 */
function addHours(budgetId, hours, isBillable)
{
	var record = getBudget(budgetId);
	if (!record){
		return false;
	}

	record.hours_spent_total += hours;
	if (isBillable) {
		record.hours_remaining -= hours;
		record.hours_spent_billable += hours;
	}
	
	return databaseManager.saveData(record);
}

/**
 * @param {Number} budgetId
 * @param {Number} hoursNumber
 * @param {Boolean} isBillable
 * @return {Boolean}
 * @public
 * @properties={typeid:24,uuid:"03400E8A-A390-4635-90B8-EBAACD77FCC7"}
 */
function removeHours(budgetId, hoursNumber, isBillable)
{
	var record = getBudget(budgetId);
	if (!record){
		return false;
	}
	
	record.hours_spent_total -= hoursNumber;
	if (isBillable) {
		record.hours_remaining += hoursNumber;
		record.hours_spent_billable -= hoursNumber;
	}
	
	return databaseManager.saveData(record);
}
