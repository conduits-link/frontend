import fs from "fs";
import path from "path";

import { convertNestedDocToMarkdown, parseFileName } from "@/utils/parse";

interface doc {
	title: string;
	link: string;
}

export async function GET(req: Request) {
	const files = fs
		.readdirSync(process.env.STORE_LOCATION as string)
		.filter((file) => path.extname(file) === ".md");

	var docs: doc[] = [];
	files.forEach((file) => {
		docs.push({
			title: file.replace(/\.[^/.]+$/, ""),
			link: file,
		});
	});

	return new Response(
		JSON.stringify({
			status: 200,
			message: "Files retrieved.",
			data: {
				files: docs,
			},
		})
	);
}

export async function POST(req: Request) {
	const { file } = await req.json();

	const filePath = decodeURI(
		path.join(process.env.STORE_LOCATION as string, `${file.title}.md`)
	);

	const fileContent = convertNestedDocToMarkdown(file.body);

	fs.writeFileSync(filePath, fileContent);

	const fileStats = fs.statSync(filePath);

	const doc = {
		_id: `${file.title}.md`,
		title: parseFileName(file.title),
		body: file.body,
		created: fileStats.birthtime,
		modified: fileStats.mtime,
	};

	return new Response(
		JSON.stringify({
			status: 200,
			message: "File created.",
			data: {
				file: doc,
			},
		})
	);
}
