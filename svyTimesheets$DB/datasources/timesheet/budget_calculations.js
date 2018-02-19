/**
 * @return {String}
 * @properties={type:12,typeid:36,uuid:"29CD9060-3B37-4809-970E-86E2036D3D61"}
 */
function calculateBudgetName()
{
	var finalName = name;
	if (name.length > 10){
		finalName = name.substring(0, 10) + "...";
	}

	return finalName;
}
