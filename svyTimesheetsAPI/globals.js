/**
 * @return {{code:Number, body:{successful: Boolean, message: String, value: Object}}}
 * @public
 * @properties={typeid:24,uuid:"73C45594-BEBD-49F4-B4F2-E5FB33A68AF1"}
 */
function getAPIReturnObject() {
	return {
		code: plugins.http.HTTP_STATUS.SC_OK,
		body: {
			successful: true,
			message: null,
			value: null
		}
	}
}

/**
 * @param {{code:Number, body:{successful: Boolean, message: String, value: Object}}} returnObject
 * @return Array<{code: Number, body: String}>
 * @public
 * @properties={typeid:24,uuid:"96AB3595-F23D-4D2A-9D7E-0EB50B47ACC6"}
 */
function handleAPIReturnObject(returnObject) {
	var code = returnObject.code;
	var body = JSON.stringify(returnObject.body);
	return [code, body];
}

/**
 * @param {{ws_authenticate:Array<{password:String, username:String, userId: Number}>}} authObject
 * @return {{username: String, password: String, userId: Number}}
 * @public
 * @properties={typeid:24,uuid:"0513F839-B5D6-4757-A7E0-9E65F69615D4"}
 */
function getCredentials(authObject) {
	
	return authObject.ws_authenticate[0];
}

/**
 * @param {JSRecord} record
 * @return {String}
 * @public
 * @properties={typeid:24,uuid:"6B5C8910-6FC1-452A-8DA2-7AF5005BC92D"}
 */
function getExceptions(record) {
	
	if (record.exception instanceof DataException) {
		/** @type {DataException} */
		var ex = record.exception;
		var exceptionValue = ex.getValue();
		//exceptionValue = exceptionValue.toString();
		return exceptionValue;
	}
	else if (record.exception.getMessage()){
		return record.exception.getMessage();
	}
	return null;
}

/**
 * @param {Number} id
 * @param {String} table
 * @param {String} property
 * @return {Boolean}
 * @properties={typeid:24,uuid:"22A909BD-A3B2-431B-82FA-538025BF7153"}
 */
function hasRecord(id, table, property) {	
	return scopes.svyDataUtils.dataSourceHasValue('db:/timesheet/' + table, property, id);
}

/**
 * @param {JSRecord} record
 * @param {Array} propertiesArray
 * @return {Array}>
 * @properties={typeid:24,uuid:"379AE507-E8C4-49B6-8598-BC398E35B4F9"}
 */
function getOldValues(record, propertiesArray) {
	
	//initialize the list with the current values in case data is unchanged
	var propertiesList = [];
	for (var j = 0; j < propertiesArray.length; j++){
		propertiesList[propertiesArray[j]] = record[propertiesArray[j]];
	}
	
	/** @type {JSDataSet} */
	var dataset = record.getChangedData();	
	for(var i = 1 ; i <= dataset.getMaxRowIndex() ; i++)
	{
		//application.output(dataset.getValue(i,1) +' '+ dataset.getValue(i,2) +' '+ dataset.getValue(i,3));
		
		if (propertiesArray.indexOf(dataset.getValue(i,1)) != -1){
			propertiesList[dataset.getValue(i,1)] = dataset.getValue(i,2);
		}
	}
	
	return propertiesList;
}
