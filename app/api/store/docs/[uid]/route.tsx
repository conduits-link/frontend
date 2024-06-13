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
			uid: params.uid,
			title: parseFileName(params.uid),
			body: docStructure,
			created: fileStats.birthtime,
			modified: fileStats.mtime,
		};

		return new Response(
			JSON.stringify({
				doc,
			})
		);
	}

	return new Response(null, {
		status: 404,
		statusText: "No doc was found.",
	});
}

export async function PUT(
	req: Request,
	{ params }: { params: { uid: string } }
) {
	const { doc } = await req.json();

	const filePath = decodeURI(
		path.join(process.env.STORE_LOCATION as string, params.uid)
	);

	if (fs.existsSync(filePath)) {
		const fileContent = convertNestedDocToMarkdown(doc.body);

		fs.writeFileSync(filePath, fileContent);

		let uid = params.uid;
		let { birthtime, mtime } = fs.statSync(filePath);

		if (doc.title !== parseFileName(params.uid)) {
			const newFilePath = path.join(
				process.env.STORE_LOCATION as string,
				doc.title + ".md"
			);

			fs.renameSync(filePath, newFilePath);

			uid = doc.title + ".md";
			birthtime = fs.statSync(newFilePath).birthtime;
			mtime = fs.statSync(newFilePath).mtime;
		}

		return new Response(
			JSON.stringify({
				doc: {
					modified: mtime,
				},
			})
		);
	}

	return new Response(null, {
		status: 404,
		statusText: "No doc was found.",
	});
}

export async function DELETE(
	req: Request,
	{ params }: { params: { uid: string } }
) {
	const filePath = decodeURI(
		path.join(process.env.STORE_LOCATION as string, params.uid)
	);

	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);

		return new Response(null, {
			status: 200,
			statusText: "The doc was removed.",
		});
	}

	return new Response(null, {
		status: 404,
		statusText: "No doc was found.",
	});
}
