/**
 * @param {Number} id
 * @return {Boolean}
 * @properties={typeid:24,uuid:"864F83E9-4ABB-479F-8A05-25D4B6B2040D"}
 */
function hasBudget(id)
{
	return scopes.helpers.hasRecord(id, 'budget', 'budget_id');
}

/**
 * @param {Number} id
 * @return {JSRecord<db:/timesheet/budget>}
 * @public
 * @properties={typeid:24,uuid:"BD2B8207-8ACC-43C6-8A81-04BC82BEF74F"}
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
 * @properties={typeid:24,uuid:"27EA0C06-5E3C-4B3B-8078-F5A8D934043F"}
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
 * @properties={typeid:24,uuid:"B3DDDA7E-5DC9-401E-AF3C-4BACFFBDB7A7"}
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
