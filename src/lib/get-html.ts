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

	const markedContent: string = marked(md);
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
		const ctx = [];
		ctx.push(`<div id="table-of-contents"><h1>${config.toc_headings ?? 'Table of content'}</h1>\n<ul>`);
		build(toc, config.toc_depth ?? 0, 0, ctx);
		ctx.push('</ul></div>');
		html = html.replace('<!-- TOC -->', ctx.join(''));
	}

	return html;
};

/**
 * Build a tree with the calculated table of content
 * @param coll The table of content data previously calculated
 * @param startHeading The starting index for the generation
 * @param level The starting level for the generation
 * @param ctx A array that will handle generated table of content link
 */
function build(coll: TableOfContent[], startHeading: number, level: number, ctx: any[]) {
	if (startHeading >= coll.length || coll[startHeading].level <= level) {
		return startHeading;
	}

	const node = coll[startHeading];
	ctx.push(`<li><a href="#${node.anchor}">${node.text}</a>`);
	startHeading++;
	const childCtx: any[] = [];
	startHeading = build(coll, startHeading, node.level, childCtx);
	if (childCtx.length > 0) {
		ctx.push('<ul>');
		childCtx.forEach(function (idm) {
			ctx.push(idm);
		});
		ctx.push('</ul>');
	}

	ctx.push('</li>');
	startHeading = build(coll, startHeading, level, ctx);

	return startHeading;
}
