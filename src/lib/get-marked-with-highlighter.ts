import hljs from 'highlight.js';
import { marked } from 'marked';

export const getMarked = (options: marked.MarkedOptions, extensions: marked.MarkedExtension[]) => {
	marked.setOptions({
		highlight: (code, languageName) => {
			const language = hljs.getLanguage(languageName) ? languageName : 'plaintext';

			return hljs.highlight(code, { language }).value;
		},
		langPrefix: 'hljs ',
		...options,
	});
	marked.use(...extensions);
	return marked;
};
