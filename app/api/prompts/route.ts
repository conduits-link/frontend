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

export async function POST(req: Request) {
   const data = await req.json();
   const prompt = {
      uid: data.name,
      ...data,
   };
   console.log("new prompt: ", prompt);
   return new Response(null, { status: 201, });
}
