import { ErrorMessage } from "./errors";

export async function sendFetch(
	route: string,
	method: string,
	cookie: string,
	data?: Object
): Promise<apiResponse> {
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

	// TODO: improve robustness
	let body = null;
	try {
		body = await response.json();
	} catch (e) {}

	return {
		response,
		body,
	};
}

export async function wrapFetch(
	request: {
		route: string;
		method: string;
		cookie: string;
		data?: Object;
	},
	showFlashMessage: (type: "success" | "error" | "info", text: string) => void,
	successRedirect?: {
		url: string;
		router: any;
	},
	onResponse?: (res: apiResponse) => void
): Promise<apiResponse> {
	const { route, method, cookie, data } = request;
	const { response, body } = await sendFetch(route, method, cookie, data);

	if (response.ok) {
		if (successRedirect && successRedirect.router) {
			console.log("redirecting?");
			successRedirect.router.push(successRedirect.url);
		}
	} else {
		switch (response.status) {
			case 400:
				if (showFlashMessage)
					showFlashMessage("error", ErrorMessage.STATUS_400);
				break;
			case 401:
				if (showFlashMessage)
					showFlashMessage("error", ErrorMessage.STATUS_401);
				if (successRedirect && successRedirect.router)
					return successRedirect.router.push("/login");
			case 403:
				if (showFlashMessage)
					showFlashMessage("error", ErrorMessage.STATUS_403);
				break;
			case 404:
				if (showFlashMessage)
					showFlashMessage("error", ErrorMessage.STATUS_404);
				break;
			case 410:
				if (showFlashMessage)
					showFlashMessage("error", ErrorMessage.STATUS_410);
				break;
			case 501:
				if (showFlashMessage)
					showFlashMessage("error", ErrorMessage.STATUS_501);
				break;
			default:
				if (showFlashMessage)
					showFlashMessage("error", ErrorMessage.STATUS_500);
				break;
		}
	}

	if (onResponse) onResponse({ response, body });

	return {
		response,
		body,
	};
}
