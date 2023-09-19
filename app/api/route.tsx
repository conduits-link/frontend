import { NextRequest, NextResponse } from "next/server";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
	apiKey: "YOUR_API_KEY",
});

async function getAiResponse(topic: string) {
	const openai = new OpenAIApi(configuration);
	const completion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: topic,
		max_tokens: 1024,
		n: 1,
		stop: null,
		temperature: 0.7,
	});
	console.log(completion.data.choices[0].text);
}

export async function POST(request: NextRequest) {
	const { prompt, input } = await request.json();
	const toSend = prompt + "\n'" + input + "'";

	return NextResponse.json({
		prompt,
		input,
		answer:
			"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer congue condimentum augue, ut laoreet nunc vulputate eu. Aenean scelerisque tortor nec ligula tincidunt auctor. Donec in mi sed tellus fringilla ultrices at in elit. Suspendisse potenti. Vivamus accumsan venenatis orci, id venenatis ante suscipit a. Suspendisse at metus non arcu sagittis facilisis. Quisque hendrerit ac libero non bibendum.",
	});
}
