/**
 * @param {Number} id
 * @return {Boolean}
 * @properties={typeid:24,uuid:"BF035391-822F-4954-8E3C-4FC882895FBB"}
 */
function hasCompany(id)
{
	return scopes.helpers.hasRecord(id, 'company', 'company_id');
}
