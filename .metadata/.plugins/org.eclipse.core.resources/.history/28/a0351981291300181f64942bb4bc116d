/**
 * @type {String}
 * @properties={typeid:35,uuid:"9EE5FC5A-69B4-43D0-BF70-B1BE76F1E6BC"}
 */
var password = 'password';

/**
 * @type {String}
 * @properties={typeid:35,uuid:"8E19E796-8FD8-49C2-A66D-D45A10DAE1B5"}
 */
var username = 'johndoe';

/**
 * @type {String}
 * @properties={typeid:35,uuid:"5CA82AFD-2CCC-4ADA-9748-530E4184B971"}
 */
var errorMessage = null;

/**
 * @param {JSEvent} event
 * @private
 * @return {Boolean} 
 * @properties={typeid:24,uuid:"2A0FD68D-EFFE-4957-B213-CFB526F52A5B"}
 */
function login(event) {
	
	errorMessage = null;
	 
    //login process
    if (!username){
        errorMessage = 'Please specify a valid user name.';
        return false;
    }
    if (!password){
        errorMessage = 'Please specify a valid password.';
        return false;
    }

    if (!scopes.security.authenticate(username, password)){
    	errorMessage = 'Authentication unsuccessful.';
    	return false;
    }
    
    scopes.data.populateCompanies();		
	scopes.data.populateBudgets();
    
    return true;
}
