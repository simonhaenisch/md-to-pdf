import type { Config } from './config';
import { getMarked } from './get-marked-with-highlighter';

export const getHtml = async (md: string, config: Config) => {
	const marked = getMarked(config.marked_options, config.marked_extensions);
	return `<!DOCTYPE html>
	<html>
		<head><title>${config.document_title}</title><meta charset="utf-8"></head>
		<body class="${config.body_class.join(' ')}">
			${await marked.parse(md)}
		</body>
	</html>
	`;
};
