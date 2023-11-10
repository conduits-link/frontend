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

function timeAgo(timestamp: string): string {
	const currentDate = new Date();
	const targetDate = new Date(timestamp);

	const timeDifference = currentDate.getTime() - targetDate.getTime();
	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (seconds < 60) {
		return "just now";
	} else if (minutes < 60) {
		return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
	} else if (hours < 24) {
		return `${hours} hour${hours > 1 ? "s" : ""} ago`;
	} else if (days < 7) {
		return `${days} day${days > 1 ? "s" : ""} ago`;
	} else if (weeks < 4) {
		return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
	} else if (months < 12) {
		return `${months} month${months > 1 ? "s" : ""} ago`;
	} else {
		return `${years} year${years > 1 ? "s" : ""} ago`;
	}
}

export { areEquivalent, timeAgo };
