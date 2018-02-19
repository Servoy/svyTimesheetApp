/**
 * @return {String}
 * @properties={type:12,typeid:36,uuid:"A8BC1DE9-3358-464F-8EE9-E9AE937BAF5A"}
 */
function caulculateDeleteIcon()
{
	if (utils.hasRecords(timespent_to_timesheet)){
		if (timespent_to_timesheet.status == 0){
			return 'fa fa-trash-o timesheetTableIcon';
		}
	}
	return '';
}

/**
 * @return {String}
 * @properties={type:12,typeid:36,uuid:"AAE8C767-97E8-49EF-B186-9BE58E29151F"}
 */
function caulculateEditIcon()
{
	if (utils.hasRecords(timespent_to_timesheet)){
		if (timespent_to_timesheet.status == 0){
			return 'fa fa-pencil-square-o fa-lg timesheetTableIcon';
		}
	}
	return '';
}

/**
 * @return {String}
 * @properties={type:12,typeid:36,uuid:"12F8C6BE-B151-4A76-9AFC-F968DB1A3E01"}
 */
function calculateDescription()
{
	var finalDescription = description;
	if (description.length > 25){
		finalDescription = description.substring(0, 25) + "...";
	}

	return finalDescription;
}

/**
 * @return {String}
 * @properties={type:12,typeid:36,uuid:"235841D1-BF1F-41F9-8924-9F30A0673063"}
 */
function calculateBillableIcon()
{
	var classes = "fa fa-eur";
	if (is_billable == 0){
		classes = "fa fa-eur disabled";
	}
	
	return classes;
}
