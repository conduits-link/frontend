function convertMarkdownToNestedDoc(fileContent: string): Object[] {
	const lines = fileContent.split(/\r?\n/).filter((line) => line !== "");
	var nestedDoc: Object[] = [];

	lines.forEach((line, index) => {
		if (line.startsWith("#")) {
			let level: number = line.match(/^#+/)?.[0].length || 0;

			nestedDoc.push({
				type: "heading",
				level,
				children: [
					{
						type: "text",
						children: [
							{
								text: line.replace("#".repeat(level), "").trim(),
							},
						],
					},
				],
			});
		} else {
			nestedDoc.push({
				type: "paragraph",
				children: [
					{
						type: "text",
						children: [
							{
								text: line.trim(),
							},
						],
					},
				],
			});
		}
	});

	return nestedDoc.length > 0
		? nestedDoc
		: [
				{
					type: "paragraph",
					children: [{ type: "text", children: [{ text: "" }] }],
				},
		  ];
}

function convertNestedDocToMarkdown(nestedDoc: any): string {
	var fileContent: string = "";

	nestedDoc.forEach((object: any, i: number) => {
		if (object.type === "heading") {
			if (object.children[0].text)
				fileContent +=
					"#".repeat(object.level) + " " + object.children[0].text;
			else
				fileContent +=
					"#".repeat(object.level) +
					" " +
					object.children[0].children[0].text;
		} else if (object.type == "paragraph") {
			if (object.children[0].text) fileContent += object.children[0].text;
			else fileContent += object.children[0].children[0].text;
		}

		if (i !== nestedDoc.length - 1) fileContent += "\n";
		fileContent += "\n";
	});

	return fileContent;
}

function parseFileName(fileName: string): string {
	return decodeURI(fileName).replace(/\.[^/.]+$/, "");
}

function countWordsInObject(obj: any) {
	let count = 0;
	for (let key in obj) {
		if (key == "text" && typeof obj[key] === "string") {
			count += obj[key].split(/\s+/).length;
		} else if (typeof obj[key] === "object" && obj[key] !== null) {
			count += countWordsInObject(obj[key]);
		}
	}
	return count;
}

const singleOrDoubleDollar = /\$\$(.*?)\$\$|\$(.*?)\$/g;

const replaceWithLatex = (
	match: string,
	content1: string,
	content2: string
): string => {
	return content1
		? `<latex-block>${content1}</latex-block>`
		: `<latex-inline>${content2}</latex-inline>`;
};

function parseLatex(html: string): string {
	return html.replace(singleOrDoubleDollar, replaceWithLatex);
}

export {
	convertMarkdownToNestedDoc,
	convertNestedDocToMarkdown,
	countWordsInObject,
	parseFileName,
	parseLatex,
};
