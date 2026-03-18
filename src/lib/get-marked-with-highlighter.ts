import hljs from 'highlight.js';
import { marked } from 'marked';

export const getMarked = (options: marked.MarkedOptions, extensions: marked.MarkedExtension[], mermaid = false) => {
	const renderer = new marked.Renderer();

	if (mermaid) {
		const originalCodeRenderer = renderer.code.bind(renderer);

		renderer.code = (code: string, language: string | undefined, isEscaped: boolean) => {
			if (language === 'mermaid') {
				return `<div class="mermaid">${code}</div>`;
			}

			return originalCodeRenderer(code, language, isEscaped);
		};
	}

	marked.setOptions({
		highlight: (code, languageName) => {
			const language = hljs.getLanguage(languageName) ? languageName : 'plaintext';

			return hljs.highlight(code, { language }).value;
		},
		langPrefix: 'hljs ',
		renderer,
		...options,
	});
	marked.use(...extensions);
	return marked;
};
