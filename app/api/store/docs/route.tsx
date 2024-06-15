import fs from "fs";
import path from "path";

import { doc } from "@/utils/types";

import {
	convertMarkdownToNestedDoc,
	convertNestedDocToMarkdown,
	parseFileName,
} from "@/utils/parse";

export async function GET(req: Request) {
	const files = fs
		.readdirSync(process.env.STORE_LOCATION as string)
		.filter((doc) => path.extname(doc) === ".md");

	var docs: doc[] = [];
	files.forEach((doc) => {
		const body = convertMarkdownToNestedDoc(
			fs.readFileSync(
				path.join(process.env.STORE_LOCATION as string, doc),
				"utf8"
			)
		);
		let { birthtime, mtime } = fs.statSync(
			path.join(process.env.STORE_LOCATION as string, doc)
		);

		docs.push({
			uid: doc,
			title: parseFileName(doc),
			body,
			created: birthtime,
			modified: mtime,
		});
	});

	return new Response(
		JSON.stringify({
			docs,
		})
	);
}

export async function POST(req: Request) {
	const { doc } = await req.json();

	const filePath = decodeURI(
		path.join(process.env.STORE_LOCATION as string, `${doc.title}.md`)
	);

	const fileContent = convertNestedDocToMarkdown(doc.body);

	fs.writeFileSync(filePath, fileContent);

	const fileStats = fs.statSync(filePath);

	return new Response(
		JSON.stringify({
			doc: {
				uid: `${doc.title}.md`,
				created: fileStats.birthtime,
				modified: fileStats.mtime,
			},
		})
	);
}
