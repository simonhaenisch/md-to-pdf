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
 * @param {Object} options Marked cnfiguration object
 * @returns a marked renderer with highlight.js parser attached
 */
module.exports = options => {
	marked.setOptions({ ...options, renderer });

	return marked;
};
