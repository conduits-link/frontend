const pattern = /\$\$(.*?)\$\$|\$(.*?)\$/g;

const replaceWithLatex = (
	match: string,
	content1: string,
	content2: string
): string => {
	const content = content1 || content2;
	const latexMarkup = content1
		? `<latex-block>${content}</latex-block>`
		: `<latex-inline>${content}</latex-inline>`;
	return latexMarkup;
};

function parseLatex(html: string): string {
	return html.replace(pattern, replaceWithLatex);
}

export { parseLatex };
