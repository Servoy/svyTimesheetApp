/**
 * @return {Array<{code: Number, body: String}>}
 * @private
 * @properties={typeid:24,uuid:"A78ABB4B-03FC-4B8F-A5BA-D9764608A973"}
 * @AllowToRunInFind
 */
function ws_read(){
	
	var returnObject = globals.getAPIReturnObject();
	
	var query = datasources.db.timesheet.company.createSelect();
	query.result.add(query.columns.company_id);
	query.result.add(query.columns.name);
	query.sort.add(query.columns.name.asc);
	query.groupBy.add(query.columns.company_id);
	var join = query.joins.company_to_budget;
	query.where.add(join.columns.budget_id.not.eq(null));
	/** @type {JSDataSet<{company_id: Number, name: String}>} */
	var ds = databaseManager.getDataSetByQuery(query, -1);	

	if (ds.getMaxRowIndex() == 0){
		returnObject.code = plugins.http.HTTP_STATUS.SC_BAD_REQUEST;
		returnObject.body.successful = false;
		returnObject.body.message = "No companies were found.";
		throw globals.handleAPIReturnObject(returnObject); 
	}
	
	var list = [];
	var itemsList = {
		columnNames: ['company_id', 'name'],
		list: list
	};
	for (var i = 1; i <= ds.getMaxRowIndex(); i++)
	{
		ds.rowIndex = i;
		itemsList.list.push([ds.company_id, ds.name]);
	}
	returnObject.body.value = itemsList;
	
	throw globals.handleAPIReturnObject(returnObject); 
}
