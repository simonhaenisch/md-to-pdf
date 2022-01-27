import hljs from 'highlight.js';
import { marked } from 'marked';

export const getMarked = (options: marked.MarkedOptions) => {
	const highlightPatch = {
		highlight: (code, lang) => {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		},
		langPrefix: 'hljs '
		// langPrefix: 'hljs language-' // utilizes the hljs CSS class
	}

	marked.setOptions({ ...highlightPatch, ...options});

	return marked;
};
