declare module 'highlight.js' {
	const getLanguage: (language: string) => any;
	const highlight: (language: string, code: string) => { value: string };
}
