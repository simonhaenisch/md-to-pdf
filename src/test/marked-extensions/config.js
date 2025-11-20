/**
 * A marked extension that extends highlight-js with new language support.
 */
function magicHighlightExtension(options) {
	return {
		renderer: {
			code: (code, infostring) => {
				if (typeof code === 'object') {
					infostring = code.lang;
					code = code.text;
				}

				if (infostring !== 'magic') {
					return false;
				}

				const magicCount = options?.magicCount ?? 1;
				return `<pre><code class="hljs magic">${'Magic!\n'.repeat(magicCount)}${code}</code></pre>`;
			},
		},
	};
}

module.exports = {
	markdown_parser: 'marked',
	marked_extensions: [magicHighlightExtension({ magicCount: 5 })],
};
