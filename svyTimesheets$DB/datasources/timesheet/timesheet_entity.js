/**
 * @param {Number} id
 * @return {JSRecord<db:/timesheet/timesheet>}
 * @public
 * @properties={typeid:24,uuid:"22FC7E7D-4E43-4A58-AA0A-78BEAF04C57F"}
 */
function getTimesheet(id)
{
	var query = datasources.db.timesheet.timesheet.createSelect();
	query.where.add(query.columns.timesheet_id.eq(id));
	var fs = datasources.db.timesheet.timesheet.getFoundSet();
	fs.loadRecords(query);
	if (fs.getSize() != 1){
		return null;
	}
	return fs.getRecord(1);
}

/**
 * @param {Number} id
 * @properties={typeid:24,uuid:"FC59F6D3-BC2C-4E43-85A5-56E0470BF26B"}
 */
function hasTimesheet(id)
{
	return scopes.helpers.hasRecord(id, 'timesheet', 'timesheet_id');
}

/**
 * @param {JSRecord<db:/timesheet/timesheet>} record
 * @return {Boolean}
 * @private
 * @properties={typeid:24,uuid:"2AB34EAE-ECFF-4E0F-ADB9-1E0968F32D05"}
 */
function validateSave(record) {
	
	var errorMessages = [];
	
	//check user_id
	if (record.user_id == null){	
		errorMessages.push('The User ID should be set.');
	}
	
	//check status
	if (record.status > 2){	
		errorMessages.push('The Status number should be smaller than 3.');
	}
	
	//check week
	if ((record.week == null) || (record.week > 52)){	
		errorMessages.push('The Week should not be bigger than 52 nor null.');
	}
	
	//check week
	if (record.year == null){
		errorMessages.push('The Year should be set.');
	}
	
	if (errorMessages.length > 0){
		throw errorMessages;
	}

	return true;
}
