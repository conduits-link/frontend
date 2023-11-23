import { NextRequest, NextResponse } from "next/server";

async function getAiResponse(prompt: string) {
	const response = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: prompt }],
			temperature: 0.7,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
			max_tokens: 200,
			stream: false, // use instead of loading icon
			n: 1,
		}),
	});

	const json = await response.json();
	return json.choices[0].message.content;
}

export async function POST(request: NextRequest) {
	const { prompt, input } = await request.json();
	const toSend = prompt + "\n'" + input + "'";
	const answer = await getAiResponse(toSend);

	return NextResponse.json({
		prompt,
		input,
		answer,
	});
}
