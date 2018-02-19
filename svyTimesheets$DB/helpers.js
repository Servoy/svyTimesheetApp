/**
 * @param {String} name
 * 
 * @return {String}
 * 
 * @properties={typeid:24,uuid:"713A085E-A8B4-49B9-B041-96AC8D48F2D8"}
 */
function getServoyProperty(name) {
	var value = Packages.com.servoy.j2db.util.Settings.getInstance().get(name);
	if (!value) {
		return null;
	}
	
	return value.toString();
}

/**
 * @param {String} name
 * @param {String} value
 * 
 * @properties={typeid:24,uuid:"C21DC45E-E7BC-4FBD-8A3D-BF459D495AE9"}
 */
function setServoyProperty(name, value) {
	var instance = Packages.com.servoy.j2db.util.Settings.getInstance();
	instance.put(name, value);
	instance.save();
}

/**
 * @return {Boolean}
 * @properties={typeid:24,uuid:"1D6E1352-ADC9-4479-915F-D4ABB71AB519"}
 */
function isDesktop() {
	var userAgent = plugins.ngclientutils.getUserAgent();
	return (!/iPhone|iPad|iPod|Android/.test(userAgent));
}

/**
 * @param {Number} id
 * @param {String} table
 * @param {String} property
 * @return {Boolean}
 * @properties={typeid:24,uuid:"574AE21C-6F70-4044-8F55-7ABC997ED253"}
 */
function hasRecord(id, table, property) {	
	return scopes.svyDataUtils.dataSourceHasValue('db:/timesheet/' + table, property, id);
}
