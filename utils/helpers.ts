function areEquivalent(obj1: any, obj2: any): boolean {
	// Get the keys (property names) of both objects
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	// Check if the number of keys in both objects is the same
	if (keys1.length !== keys2.length) {
		return false;
	}

	// Iterate through the keys and compare property values
	for (const key of keys1) {
		// Check if the key exists in both objects
		if (!obj2.hasOwnProperty(key)) {
			return false;
		}

		// Compare the values of the properties
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}

	// If all properties have the same values, return true
	return true;
}

export { areEquivalent };
