// Turn the highlighted `mermaid` code blocks into elements that Mermaid picks up.
for (const code of document.querySelectorAll('pre > code.mermaid')) {
	const div = document.createElement('div');

	div.className = 'mermaid';
	div.textContent = code.textContent;

	code.parentElement.replaceWith(div);
}

mermaid.initialize({ startOnLoad: false });

// Mermaid renders asynchronously, so signal completion for `wait_for_function`.
mermaid.run().then(() => {
	window.mermaidRendered = true;
});
