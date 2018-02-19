/**
 * @return {String}
 * @properties={type:12,typeid:36,uuid:"744C0127-1DE2-40FC-B641-26CAC6918030"}
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
 * @properties={type:12,typeid:36,uuid:"B7DE20D1-33A3-41B7-BFC6-6A3DBF647FB0"}
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
 * @properties={typeid:36,uuid:"1A4E0D53-AD33-445B-BE23-5ED7C6AFAA66"}
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
 * @properties={type:12,typeid:36,uuid:"A11412AC-4BEA-4934-BAF3-8C088810CA50"}
 */
function calculateBillableIcon()
{
	var classes = "fa fa-eur";
	if (is_billable == 0){
		classes = "fa fa-eur disabled";
	}
	
	return classes;
}
