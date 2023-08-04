import { NextResponse } from "next/server";

export async function POST(request) {
	const { prompt } = await request.json();

	return NextResponse.json({ prompt });
}
