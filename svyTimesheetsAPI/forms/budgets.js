/**
 * @AllowToRunInFind
 * @return {Array<{code: Number, body: String}>}
 * @private
 * @properties={typeid:24,uuid:"DAFDD6EA-C05A-4ED8-8469-FE83C9D25BBB"}
 */
function ws_read(){
	
	var returnObject = globals.getAPIReturnObject();
	
	var query = datasources.db.timesheet.budget.createSelect();
	query.result.add(query.columns.budget_id);
	query.result.add(query.columns.company_id);
	query.result.add(query.columns.name);
	query.sort.add(query.columns.name.asc);
	
	/** @type {JSDataSet<{budget_id: Number, company_id: Number, name: String}>} */
	var ds = databaseManager.getDataSetByQuery(query, -1);	

	if (ds.getMaxRowIndex() == 0){
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.successful = false;
		returnObject.body.message = "No budgets were found.";
		throw globals.handleAPIReturnObject(returnObject); 
	}
	
	var list = [];
	var itemsList = {
		columnNames: ['id', 'company_id', 'name'],
		list: list
	};
	for (var i = 1; i <= ds.getMaxRowIndex(); i++)
	{
		ds.rowIndex = i;
		itemsList.list.push([ds.budget_id, ds.company_id, ds.name]);
	}
	returnObject.body.value = itemsList;
	
	throw globals.handleAPIReturnObject(returnObject); 
}
