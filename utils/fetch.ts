export default async function sendFetch(
	route: string,
	method: string,
	cookie: string,
	data?: Object
) {
	const response = (await fetch(route, {
		method: method,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Credentials": "true",
			Accept: "application/json",
			Cookie: cookie,
		},
		credentials: "include",
		body: JSON.stringify(data),
		cache: "no-store",
	})) as Response;

	const body = (await response.json()) as any;

	return {
		response,
		body,
	};
}
