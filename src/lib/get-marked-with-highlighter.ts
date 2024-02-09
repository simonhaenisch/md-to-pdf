import hljs from 'highlight.js';
import { MarkedOptions, MarkedExtension, Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

export const getMarked = (options: MarkedOptions, extensions: MarkedExtension[]) => {
	const highlightExtension = markedHighlight({
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		},
	});
	return new Marked(highlightExtension, ...extensions).setOptions({ ...options });
};
