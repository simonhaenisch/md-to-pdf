const marked = require('marked');
const { getLanguage, highlight } = require('highlight.js');
const config = require('./config');

const renderer = new marked.Renderer();

renderer.code = (code, language) => {
	// check whether the given language is available for highlight.js
	const isAvailableLanguage = !!(language && getLanguage(language));
	// highlight only if the language is valid
	return isAvailableLanguage
		? `<pre><code class="hljs ${language}">${highlight(language, code).value}</code></pre>`
		: `<pre><code>${code}</code></pre>`;
};

module.exports = optionsFromCliArgs => {
	marked.setOptions({ ...config.markedOptions, renderer, optionsFromCliArgs });

	return marked;
};
