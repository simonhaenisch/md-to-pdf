import hljs from 'highlight.js';
import { marked } from 'marked';

export const getMarked = (
  options: marked.MarkedOptions,
  extensions: marked.MarkedExtension[] = [],
  useHighlightJs: boolean = false
) => {
  marked.setOptions({
    ...options,
    highlight: useHighlightJs
      ? (code, languageName) => {
          const language = hljs.getLanguage(languageName) ? languageName : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      : false,
    langPrefix: useHighlightJs ? 'hljs ' : '',
  });
  if (extensions.length) marked.use(...extensions);
  return marked;
};
