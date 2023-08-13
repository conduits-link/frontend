import { NextRequest, NextResponse } from "next/server";

import { client } from "@gradio/client";

export async function POST(request: NextRequest) {
	const { settings, prompt } = await request.json();

	const app = await client(
		"https://ysharma-explore-llamav2-with-tgi.hf.space/"
	);
	const result = (await app.predict("/chat", [
		"Howdy!", // string  in 'Message' Textbox component
	])) as string;

	return NextResponse.json(result);
}
