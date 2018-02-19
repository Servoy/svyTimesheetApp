/**
 * @param {JSRecord} record
 * @param {Array} propertiesArray
 * @return {Array}>
 * @properties={typeid:24,uuid:"B1937D28-8B4B-45B7-941A-0DC84582CBF7"}
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
 * @param {String} name
 * 
 * @return {String}
 * 
 * @properties={typeid:24,uuid:"F9DC3BB5-4A2A-40B8-A79B-C11CF4C1F9F6"}
 */
function getServoyProperty(name) {
	var value = Packages.com.servoy.j2db.util.Settings.getInstance().get(name);
	if (!value) {
		return null;
	}
	
	return value.toString();
}

/**
 * @param {String} name
 * @param {String} value
 * 
 * @properties={typeid:24,uuid:"6DB97D84-D6D2-4438-9064-D8C1007AAF69"}
 */
function setServoyProperty(name, value) {
	var instance = Packages.com.servoy.j2db.util.Settings.getInstance();
	instance.put(name, value);
	instance.save();
}

/**
 * @return {Boolean}
 * @properties={typeid:24,uuid:"589E9B8E-AA98-439F-9564-677AD392359D"}
 */
function isDesktop() {
	var userAgent = plugins.ngclientutils.getUserAgent();
	return (!/iPhone|iPad|iPod|Android/.test(userAgent));
}
