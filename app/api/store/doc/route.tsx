import type { NextRequest } from "next/server";

import fs from "fs";
import path from "path";

interface doc {
	title: string;
	content: string;
}

export async function POST(request: NextRequest) {
	const { storeLocation, fileName } = await request.json();

	const fileContent = fs.readFileSync(
		path.join(storeLocation, fileName),
		"utf8"
	);

	console.log(fileContent);

	const doc = {
		title: fileName.replace(/\.[^/.]+$/, ""),
		content: fileContent,
	};

	return new Response(JSON.stringify({ doc }));
}
