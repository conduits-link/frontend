export default function sendFetch(route, method, cookie, data) {
	return new Promise((resolve, reject) => {
		fetch(route, {
			method: method,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": true,
				Accept: "application/json",
				cookie: cookie,
			},
			credentials: "include",
			body: JSON.stringify(data),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				resolve(data);
			});
	});
}
