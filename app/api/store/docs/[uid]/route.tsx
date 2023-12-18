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

		let _id = params.uid;
		let { birthtime, mtime } = fs.statSync(filePath);

		if (file.title !== parseFileName(params.uid)) {
			const newFilePath = path.join(
				process.env.STORE_LOCATION as string,
				file.title + ".md"
			);

			fs.renameSync(filePath, newFilePath);

			_id = file.title + ".md";
			birthtime = fs.statSync(newFilePath).birthtime;
			mtime = fs.statSync(newFilePath).mtime;
		}

		const doc = {
			_id,
			title: file.title,
			body: file.body,
			created: birthtime,
			modified: mtime,
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
