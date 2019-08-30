const marked = require('marked');
const { getLanguage, highlight } = require('highlight.js');

/**
 * Get a marked renderer with an attached highlighter.
 *
 * @param {Object} options Marked configuration object
 *
 * @returns a marked renderer with highlight.js parser attached
 */
module.exports = options => {
	const renderer = options.renderer || new marked.Renderer();

	if (!Object.prototype.hasOwnProperty.call(renderer, 'code')) {
		renderer.code = (code, language) => {
			// if the given language is not available in highlight.js, fall back to plaintext
			language = (getLanguage(language) && language) || 'plaintext';

			return `<pre><code class="hljs ${language}">${highlight(language, code).value}</code></pre>`;
		};
	}

	marked.setOptions({ ...options, renderer });

	return marked;
};
