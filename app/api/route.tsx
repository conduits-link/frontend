import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { settings, prompt } = await request.json();

	const result = {};

	return NextResponse.json(result);
}
