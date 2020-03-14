import { getLanguage, highlight } from 'highlight.js';
import marked, { MarkedOptions } from 'marked';

export const getMarked = (options: MarkedOptions) => {
	const renderer = options.renderer ?? new marked.Renderer();

	// only add if the renderer has no custom `code` property yet
	if (!Object.prototype.hasOwnProperty.call(renderer, 'code')) {
		renderer.code = (code, language) => {
			// if the given language is not available in highlight.js, fall back to plaintext
			const languageName = language && getLanguage(language) ? language : 'plaintext';

			return `<pre><code class="hljs ${languageName}">${highlight(languageName, code).value}</code></pre>`;
		};
	}

	marked.setOptions({ ...options, renderer });

	return marked;
};
