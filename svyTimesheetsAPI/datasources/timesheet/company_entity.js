/**
 * @param {Number} id
 * @return {Boolean}
 * @properties={typeid:24,uuid:"7353388B-BA60-45DE-8233-79E4DDACC00F"}
 */
function hasCompany(id)
{
	return globals.hasRecord(id, 'company', 'company_id');
}
