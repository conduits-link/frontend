function setStoreLocation(loc: string) {
	localStorage.setItem("storeLocation", loc);
}

function getStoreLocation() {
	const loc = localStorage.getItem("storeLocation");
	return loc ? loc : "";
}

export { setStoreLocation, getStoreLocation };
