function setStoreLocation(loc: string) {
	if (typeof window === "undefined") return;
	localStorage.setItem("storeLocation", loc);
}

function getStoreLocation() {
	if (typeof window === "undefined") return;
	const loc = localStorage.getItem("storeLocation");
	return loc ? loc : "";
}

export { setStoreLocation, getStoreLocation };
