import marked from 'marked';
import { Config } from './config';
import { getHighlightRenderer } from './get-marked-with-highlighter';
import { getHeadingRenderer, TableOfContent, toc } from './get-marked-with-toc';

/**
 * Generates a HTML document from a markdown string and returns it as a string.
 */
export const getHtml = (md: string, config: Config) => {
	marked.setOptions(config.marked_options);

	(marked as any).use({ renderer: getHighlightRenderer(config.marked_options) });
	(marked as any).use({ renderer: getHeadingRenderer(config).renderer });

	const markedContent = marked(md);
	let html = `<!DOCTYPE html>
	<html>
		<head><meta charset="utf-8"></head>
		<body class="${config.body_class.join(' ')}">
			${markedContent}
		</body>
	</html>
	`;

	// generate table of content only if we have headings
	// const { toc } = getHeadingRenderer(config);
	if (html.includes('<!-- TOC -->') && toc.length !== 0) {
		const generatedToc = [];
		generatedToc.push(`<div id="table-of-contents"><h1>${config.toc_heading}</h1>\n<p>`);
		build(toc, config.toc_skip, config.toc_depth, generatedToc);
		generatedToc.push('</p></div>');
		html = html.replace('<!-- TOC -->', generatedToc.join(''));
	}

	return html;
};

/**
 * Build the table of content
 * @param toc The marked list of heading
 * @param toc_skip Level to skip for the generation
 * @param toc_depth The depth of the toc. Default to 3, increment by the toc_skip value
 * @param generatedToc The array that will content the final toc data
 */
function build(toc: TableOfContent[], toc_skip: number, toc_depth: number, generatedToc: string[]) {
	toc.forEach((node) => {
		if (node.level > toc_skip && node.level <= toc_skip + toc_depth) {
			generatedToc.push(`<a href="#${node.anchor}" class="toc-depth-${node.level}">${node.text}</a><br/>`);
		}
	});
}
