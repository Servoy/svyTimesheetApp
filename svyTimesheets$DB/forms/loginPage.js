/**
 * @type {String}
 * @properties={typeid:35,uuid:"297587B4-76F4-4F49-BA7F-62049A02B463"}
 */
var password = 'password';

/**
 * @type {String}
 * @properties={typeid:35,uuid:"FE6703BA-9791-47FA-8C1D-840D0771E701"}
 */
var username = 'johndoe';

/**
 * @type {String}
 * @properties={typeid:35,uuid:"97203594-A21D-418D-8EAB-5AE7A9FFC5E1"}
 */
var errorMessage = null;

/**
 * @param {JSEvent} event
 * @private
 * @return {Boolean} 
 * @properties={typeid:24,uuid:"D826A9E0-F3C3-4556-9FDB-ABFFCC88E376"}
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
    
    // scopes.data.populateCompanies();		
	// scopes.data.populateBudgets();
    
    return true;
}
