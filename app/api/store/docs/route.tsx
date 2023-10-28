import type { NextRequest } from "next/server";

import fs from "fs";
import path from "path";

interface doc {
	title: string;
	link: string;
}

export async function POST(request: NextRequest) {
	const { storeLocation } = await request.json();

	const files = fs
		.readdirSync(storeLocation)
		.filter((file) => path.extname(file) === ".md");

	var docs: doc[] = [];
	files.forEach((file, index) => {
		docs.push({
			title: file.replace(/\.[^/.]+$/, ""),
			link: file,
		});
	});

	return new Response(JSON.stringify({ docs }));
}
