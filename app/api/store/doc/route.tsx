import type { NextRequest } from "next/server";

import fs from "fs";
import path from "path";

import {
	convertMarkdownToNestedDoc,
	convertNestedDocToMarkdown,
	parseFileName,
} from "@/utils/parse";

export async function POST(request: NextRequest) {
	const { storeLocation, fileName } = await request.json();

	const filePath = decodeURI(path.join(storeLocation, fileName));

	const fileContent = fs.readFileSync(filePath, "utf8");
	const fileStats = fs.statSync(filePath);

	const docStructure = convertMarkdownToNestedDoc(fileContent);

	const doc = {
		title: parseFileName(fileName),
		body: docStructure,
		modified: fileStats.mtime,
	};

	return new Response(JSON.stringify({ doc }));
}

export async function PUT(request: NextRequest) {
	const { storeLocation, fileName, docStructure } = await request.json();

	const filePath = decodeURI(path.join(storeLocation, fileName));

	const fileContent = convertNestedDocToMarkdown(docStructure);

	fs.writeFileSync(filePath, fileContent);

	return new Response(JSON.stringify({}));
}
