/**
 * @return {String}
 * @properties={type:12,typeid:36,uuid:"564C5AEF-58FC-46E5-8E16-0D17D18A205D"}
 */
function calculateCompanyName()
{
	var finalName = name;
	if (name.length > 13){
		finalName = name.substring(0, 13) + "...";
	}

	return finalName;
}
