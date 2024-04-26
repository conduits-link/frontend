export async function GET(req: Request) {
	return new Response(
		JSON.stringify({
			credits: 0,
		}),
		{
			status: 200,
			statusText: "Authentication not available.",
		}
	);
}
