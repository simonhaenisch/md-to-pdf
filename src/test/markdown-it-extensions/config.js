/**
 * A simple markdown-it plugin that adds a # Magic! header.
 *
 * This plugin is provided to demonstrate how a plugin without options can simply be used.
 * The details of how it actually works are not important to the example.
 */
const magicHeaderPlugin = (md) => {
	// Use the `core` ruler to add a new rule
	md.core.ruler.push('magic_header', (state) => {
		// Create a token for the closing tag of the header
		const closeToken = new state.Token('heading_close', 'h1', -1);
		closeToken.markup = '#';
		closeToken.block = true;
		closeToken.map = [0, 1];
		state.tokens.unshift(closeToken);

		// Add the content for the header
		const textToken = new state.Token('inline', '', 0);
		textToken.content = 'Magic!';
		textToken.map = [0, 1];
		textToken.children = [];
		const textTokenChild = new state.Token('text', '', 0);
		textTokenChild.content = 'Magic!';
		textToken.children.push(textTokenChild);
		state.tokens.unshift(textToken);

		// Create a token for the new header
		const token = new state.Token('heading_open', 'h1', 1);
		token.markup = '#';
		state.tokens.unshift(token);
	});
};

/**
 * A markdown-it plugin that extends highlight-js with new language support.
 *
 * This plugin is provided to demonstrate how a plugin with options can be used,
 * and how markdown-it highlighting can be extended .
 * The details of how the plugin works are not important to the example.
 *
 * Note how an arrow function is used to bind this argument below
 */
function magicHighlightPlugin(md, options) {
	// Save existing highlight. This is highlight.js
	const extantHighlight = md.options.highlight;

	// Add ourselves as the highlight handler
	md.options.highlight = (code, lang, attrs) => {
		const magicCount = options?.magicCount ?? 1;
		if (lang && lang === 'magic') {
			return `<pre><code class="hljs magic">${'Magic!\n'.repeat(magicCount)}${code}</code></pre>`;
		}

		// Fallback to existing highlighting
		return extantHighlight(code, lang, attrs);
	};
}

module.exports = {
	markdown_parser: 'markdown-it',
	markdown_it_plugins: [magicHeaderPlugin, (md) => magicHighlightPlugin(md, { magicCount: 5 })],
};
