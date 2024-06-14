import { prompts } from "@/utils/prompts";

export async function GET(req: Request) {
	return new Response(
		JSON.stringify({
			prompts,
		}),
		{
			status: 200,
		}
	);
}
