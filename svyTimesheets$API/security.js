/**
 * @type {String}
 * @public
 * @properties={typeid:35,uuid:"BC9669FF-1060-4161-9F38-4CEBC3595FD1"}
 */
var password = null;

/**
 * @type {String}
 * @public
 * @properties={typeid:35,uuid:"F99EC18F-2F1C-42A2-8626-5A6B41A4C835"}
 */
var username = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F601EF82-2DA7-44D1-8F9C-F4BEE1C8F0CC",variableType:8}
 */
var userId = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"02FA58DE-F247-4FA5-9E51-458C72B79B07"}
 */
var name = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"36C45018-D85E-4473-9741-F722814B2EB7"}
 */
var email = null;

/**
 * @param {String} user
 * @param {String} pass
 * @return {Boolean}
 * @public
 * @properties={typeid:24,uuid:"CC4375C6-0332-421C-A4BA-459079732B4B"}
 */
function authenticate(user, pass) {
	
	var client = plugins.http.createNewHttpClient();
	var request = client.createGetRequest(globals.crmURL + 'userinfo/1');
	request.addHeader('Accept', 'application/json');
	request.addHeader('Content-type','application/json');
	var response = request.executeRequest(user, pass);
	application.output('HTTP Response Code: ' + response.getStatusCode());
	if (response.getStatusCode() == plugins.http.HTTP_STATUS.SC_UNAUTHORIZED){
		return false;
	}
	
	/** @type {{successful: Boolean, message: String, value: *}} */
	var responseBody = JSON.parse(response.getResponseBody());
	if (responseBody.successful == false){
		return false;
	}

	username = user;
	password = pass;
	userId = responseBody.value.user_id;
	name = responseBody.value.name;
	email = responseBody.value.email;
	
	if (!security.login(username, userId, ['Administrators'])){
		return false;
	}
	
	return true;
}

/**
 * @public
 * @properties={typeid:24,uuid:"B6BA6D9A-7378-4869-9528-EB3B559DACC2"}
 */
function logout() {	
	security.logout();
}
