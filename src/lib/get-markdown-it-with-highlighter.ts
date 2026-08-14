import type MarkdownIt from 'markdown-it';
import markdownit from 'markdown-it';
import markdownItHljs from 'markdown-it-highlightjs';

// Unless otherwise specified:
// * Allow HTML snippets
// * Use ''' as the language prefix
// This matches the behavior of marked
const defaultOptions: markdownit.Options = {
	html: true,
	langPrefix: '',
};

/**
 * Returns an instance of markdown-it
 *
 * Two plugins are added:
 * 1. Highlight.js for syntax highlighting
 * 2. markdown-it-anchor. This adds id attributes to header elements
 */
export const getMarkdownIt = (options: markdownit.Options, plugins: MarkdownIt.PluginSimple[]): MarkdownIt => {
	const mergedOptions = { ...defaultOptions, ...options };
	const markdownIt = markdownit(mergedOptions);

	// Add highlightjs
	markdownIt.use(markdownItHljs);

	// Add custom plugins
	for (const plugin of plugins) {
		markdownIt.use(plugin);
	}

	return markdownIt;
};
