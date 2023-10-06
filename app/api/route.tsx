import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { prompt, input } = await request.json();

	return NextResponse.json({
		answer: "Temporary test string.",
	});
}
