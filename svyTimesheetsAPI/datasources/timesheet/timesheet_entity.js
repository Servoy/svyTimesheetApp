/**
 * @param {Number} id
 * @properties={typeid:24,uuid:"C03BCA74-3B0D-4313-9E38-50A5F44926E9"}
 */
function hasTimesheet(id)
{
	return globals.hasRecord(id, 'timesheet', 'timesheet_id');
}
