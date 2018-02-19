/**
 * @return {String}
 * @properties={type:12,typeid:36,uuid:"5A8C4251-29B9-4129-B111-F97D5729A493"}
 */
function calculateCompanyName()
{
	var finalName = name;
	if (name.length > 13){
		finalName = name.substring(0, 13) + "...";
	}

	return finalName;
}
