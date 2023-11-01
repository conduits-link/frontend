import type { NextRequest } from "next/server";

import fs from "fs";
import path from "path";

import {
	convertMarkdownToNestedDoc,
	convertNestedDocToMarkdown,
} from "@/utils/parse";

export async function POST(request: NextRequest) {
	const { storeLocation, fileName } = await request.json();

	const fileContent = fs.readFileSync(
		path.join(storeLocation, fileName),
		"utf8"
	);

	const docStructure = convertMarkdownToNestedDoc(fileContent);

	const doc = {
		title: fileName.replace(/\.[^/.]+$/, ""),
		docStructure,
	};

	return new Response(JSON.stringify({ doc }));
}

export async function PUT(request: NextRequest) {
	const { storeLocation, fileName, docStructure } = await request.json();

	const fileContent = convertNestedDocToMarkdown(docStructure);

	fs.writeFileSync(path.join(storeLocation, fileName), fileContent);

	return new Response(JSON.stringify({}));
}
