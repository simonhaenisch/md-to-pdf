import hljs from 'highlight.js';
import marked, { MarkedOptions } from 'marked';

export const getMarked = (options: MarkedOptions) => {
	const renderer = options.renderer ?? new marked.Renderer();

	// only add if the renderer has no custom `code` property yet
	if (!Object.prototype.hasOwnProperty.call(renderer, 'code')) {
		renderer.code = (code, languageName) => {
			// if the given language is not available in highlight.js, fall back to plaintext
			const language = languageName && hljs.getLanguage(languageName) ? languageName : 'plaintext';

			return `<pre><code class="hljs ${language}">${hljs.highlight(code, { language }).value}</code></pre>`;
		};
	}

	marked.setOptions({ ...options, renderer });

	return marked;
};
