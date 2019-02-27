const marked = require('marked');
const { getLanguage, highlight } = require('highlight.js');

const renderer = new marked.Renderer();

renderer.code = (code, language) => {
	// if the given language is not available in highlight.js, fall back to plaintext
	language = (getLanguage(language) && language) || 'plaintext';

	return `<pre><code class="hljs ${language}">${highlight(language, code).value}</code></pre>`;
};

/**
 * Get a marked renderer with an attached highlighter.
 *
 * @param {Object} options Marked cnfiguration object
 *
 * @returns a marked renderer with highlight.js parser attached
 */
module.exports = options => {
	marked.setOptions({ ...options, renderer });

	return marked;
};
