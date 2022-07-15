import { Config } from './config';
import { getMarked } from './get-marked-with-highlighter';

/**
 * Generates a HTML document from a markdown string and returns it as a string.
 */
export const getHtml = (md: string, config: Config) => `<!DOCTYPE html>
<html>
	<head><title>${config.document_title}</title><meta charset="utf-8"></head>
	<body class="${config.body_class.join(' ')}">
		${getMarked(config.marked_options, config.marked_extensions)(md)}
	</body>
</html>
`;
