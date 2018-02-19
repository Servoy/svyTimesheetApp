/**
 * @param {JSRecord} record
 * @param {Array} propertiesArray
 * @return {Array}
 * @properties={typeid:24,uuid:"A189FFC9-9221-414E-BE61-5B0B41E5F2F0"}
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

/**
 * @param {JSRecord} record
 * @return {String}
 * @public
 * @properties={typeid:24,uuid:"0BDFF745-ED66-41F1-9D89-E02931FAE5F2"}
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
