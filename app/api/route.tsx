import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { prompt, input } = await request.json();

	const result = {};

	return NextResponse.json(result);
}
