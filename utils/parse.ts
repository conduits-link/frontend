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

export { parseLatex };
