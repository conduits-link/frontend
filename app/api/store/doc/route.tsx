import type { NextRequest } from "next/server";

import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
	const { storeLocation, fileName } = await request.json();

	const fileContent = fs.readFileSync(
		path.join(storeLocation, fileName),
		"utf8"
	);

	const lines = fileContent.split(/\r?\n/).filter((line) => line !== "");
	var docStructure: any[] = [];

	lines.forEach((line, index) => {
		if (line.startsWith("#")) {
			let level: number = line.match(/^#+/)?.[0].length || 0;

			docStructure.push({
				type: "heading",
				level,
				children: [
					{
						text: line.replace("#".repeat(level), "").trim(),
					},
				],
			});
		} else {
			docStructure.push({
				type: "paragraph",
				children: [
					{
						text: line.trim(),
					},
				],
			});
		}
	});

	const doc = {
		title: fileName.replace(/\.[^/.]+$/, ""),
		docStructure,
	};

	return new Response(JSON.stringify({ doc }));
}
