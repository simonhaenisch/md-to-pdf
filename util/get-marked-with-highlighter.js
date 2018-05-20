const marked = require('marked');
const { getLanguage, highlight } = require('highlight.js');

const renderer = new marked.Renderer();

renderer.code = (code, language) => {
	// check whether the given language is available for highlight.js
	const isAvailableLanguage = Boolean(language && getLanguage(language));
	// highlight only if the language is valid
	return isAvailableLanguage
		? `<pre><code class="hljs ${language}">${highlight(language, code).value}</code></pre>`
		: `<pre><code>${code}</code></pre>`;
};

/**
 * Get a marked renderer with an attached highlighter.
 * @param {Object} config Configuration object
 * @param {Object} config.marked_options Options for marked
 * @returns a marked renderer with highlight.js parser attached
 */
module.exports = config => {
	marked.setOptions({ ...config.marked_options, renderer });

	return marked;
};
