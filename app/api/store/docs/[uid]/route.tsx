import fs from "fs";
import path from "path";

import {
	convertMarkdownToNestedDoc,
	convertNestedDocToMarkdown,
	parseFileName,
} from "@/utils/parse";

export async function GET(
	req: Request,
	{ params }: { params: { uid: string } }
) {
	const filePath = decodeURI(
		path.join(process.env.STORE_LOCATION as string, params.uid)
	);

	if (fs.existsSync(filePath)) {
		const fileContent = fs.readFileSync(filePath, "utf8");
		const fileStats = fs.statSync(filePath);

		const docStructure = convertMarkdownToNestedDoc(fileContent);

		const doc = {
			_id: params.uid,
			title: parseFileName(params.uid),
			body: docStructure,
			created: fileStats.birthtime,
			modified: fileStats.mtime,
		};

		return new Response(
			JSON.stringify({
				status: 200,
				message: "File retrieved.",
				data: {
					file: doc,
				},
			})
		);
	}

	return new Response(
		JSON.stringify({
			status: 500,
			message: "Something went wrong.",
			data: {
				file: null,
			},
		})
	);
}

export async function PUT(
	req: Request,
	{ params }: { params: { uid: string } }
) {
	const { file } = await req.json();

	const filePath = decodeURI(
		path.join(process.env.STORE_LOCATION as string, params.uid)
	);

	if (fs.existsSync(filePath)) {
		const fileContent = convertNestedDocToMarkdown(file.body);

		fs.writeFileSync(filePath, fileContent);

		const fileStats = fs.statSync(filePath);

		const doc = {
			_id: params.uid,
			title: parseFileName(params.uid),
			body: file.body,
			created: fileStats.birthtime,
			modified: fileStats.mtime,
		};

		return new Response(
			JSON.stringify({
				status: 200,
				message: "File saved.",
				data: {
					file: doc,
				},
			})
		);
	}

	return new Response(
		JSON.stringify({
			status: 500,
			message: "Something went wrong.",
			data: {
				file: null,
			},
		})
	);
}
