import marked, { MarkedOptions } from 'marked';
import { getLanguage, highlight } from 'highlight.js';

const renderer = new marked.Renderer();

renderer.code = (code, language) => {
	// if the given language is not available in highlight.js, fall back to plaintext
	language = (getLanguage(language) && language) || 'plaintext';

	return `<pre><code class="hljs ${language}">${highlight(language, code).value}</code></pre>`;
};

export const getMarked = (options: MarkedOptions) => {
	marked.setOptions({ ...options, renderer });

	return marked;
};
