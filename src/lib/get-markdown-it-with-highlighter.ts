import type MarkdownIt from 'markdown-it';
import markdownit from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
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

	// Add markdown-it-anchor
	// This adds 'id' anchors to header elements, matching the default behavior of marked
	// We also tweak it to 'slugify' in the same way
	markdownIt.use(markdownItAnchor, {
		tabIndex: false,
		slugify: (text: string) => {
			const id = text
				.toLowerCase()
				.trim()
				// remove html tags
				.replace(/<[!/a-z].*?>/gi, '')
				// remove unwanted chars
				.replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
				.replace(/\s/g, '-');
			return id;
		},
	});

	// Add custom plugins
	for (const plugin of plugins) {
		markdownIt.use(plugin);
	}

	return markdownIt;
};
