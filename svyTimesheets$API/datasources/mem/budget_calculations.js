/**
 * @return {String}
 * @properties={typeid:36,uuid:"6FA48BC6-1D92-4BC9-9718-4F6CE812BDD8"}
 */
function calculateBudgetName()
{
	var finalName = name;
	if (name.length > 10){
		finalName = name.substring(0, 10) + "...";
	}

	return finalName;
}
