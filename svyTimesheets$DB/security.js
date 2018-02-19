/**
 * @type {String}
 * @public
 * @properties={typeid:35,uuid:"927FA177-653C-4156-96CA-B69EDB1A0803"}
 */
var password = null;

/**
 * @type {String}
 * @public
 * @properties={typeid:35,uuid:"74655159-D193-42CB-A909-9CB58C97024F"}
 */
var username = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"BBA40A5C-2AF7-4DFD-BBC9-29FAD5A8E301",variableType:8}
 */
var userId = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"10D453E6-6388-4F85-B4D8-E0C248CF3637"}
 */
var name = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7E059F6D-F0A7-4487-8B2D-51D5800AF78B"}
 */
var email = null;

/**
 * @param {String} user
 * @param {String} pass
 * @return {Boolean}
 * @public
 * @properties={typeid:24,uuid:"1E34FCFA-80E8-4AC8-8215-573552DB3CFA"}
 */
function authenticate(user, pass) {
	
	var query = datasources.db.timesheet.user.createSelect();
	query.result.add(query.columns.user_id);
	query.where.add(query.columns.username.eq(user));
	query.where.add(query.columns.password.eq(pass));
	query.where.add(query.columns.is_active.eq(1));
	/** @type {JSDataSet<{user_id: Number, username: String, password: String}>} */
	var ds = databaseManager.getDataSetByQuery(query, -1);	
	if (ds.getMaxRowIndex() != 1){
		return null;
	}

	ds.rowIndex = 1;
	
	username = user;
	password = pass;
	userId = ds.user_id;
	name = ds.username;
	password = ds.password;
	
	return security.login(username, userId, ['Administrators']);
}

/**
 * @public
 * @properties={typeid:24,uuid:"217D7268-2739-413D-AE51-015D2FD50581"}
 */
function logout() {	
	security.logout();
}
