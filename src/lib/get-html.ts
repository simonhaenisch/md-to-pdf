import { Config } from './config';
import { getMarked } from './get-marked-with-highlighter';

/**
 * Generates a HTML document from a markdown string and returns it as a string.
 */
export const getHtml = (md: string, config: Config) => `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body class="${config.body_class.join(' ')}">
${getMarked(config.marked_options)(md)}
</body>
</html>
`;
