export async function POST(req: Request) {
	return new Response(null, {
		status: 501,
		statusText: "Authentication not available.",
	});
}
