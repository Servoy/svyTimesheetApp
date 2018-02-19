/**
 * @AllowToRunInFind
 * @param {Number} id
 * @return {Array<{code: Number, body: String}>}
 * @private
 * @properties={typeid:24,uuid:"45AE4C85-B212-404B-9EE9-EB4B720CD22F"}
 */
function ws_read(id){
	
	var returnObject = globals.getAPIReturnObject();
	
	var query = datasources.db.timesheet.budget.createSelect();
	query.result.add(query.columns.budget_id);
	query.result.add(query.columns.company_id);
	query.result.add(query.columns.name);
	query.result.add(query.columns.hours_spent_total);
	query.result.add(query.columns.hours_spent_billable);
	query.result.add(query.columns.hours_remaining);
	query.result.add(query.columns.quantity);
	query.where.add(query.columns.budget_id.eq(id));
	
	/** @type {JSDataSet<{budget_id: Number, company_id: Number, name: String, hours_spent_total: Number, hours_spent_billable: Number, hours_remaining: Number, quantity:Number}>} */
	var ds = databaseManager.getDataSetByQuery(query, -1);	

	if (ds.getMaxRowIndex() == 0){
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.successful = false;
		returnObject.body.message = "No budget was found with ID " + id;
		throw globals.handleAPIReturnObject(returnObject); 
	}
	
	ds.rowIndex = 1;
	returnObject.body.value = {
		company_id: ds.company_id,
		name: ds.name,
		hours_spent_total: ds.hours_spent_total,
		hours_spent_billable: ds.hours_spent_billable,
		hours_remaining: ds.hours_remaining,
		quantity: ds.quantity
	}
		
	throw globals.handleAPIReturnObject(returnObject); 
}
