import { parse } from 'yaml';

type FrontMatterEngine = (input: string, options?: FrontMatterOptions) => unknown;

/**
 * Options for parsing front-matter blocks.
 */
export interface FrontMatterOptions {
	/**
	 * Opening and closing delimiters for the front-matter block.
	 */
	delimiters?: string | [string, string];

	/**
	 * Custom language parsers keyed by front-matter language tag.
	 */
	engines?: Record<string, FrontMatterEngine>;

	/**
	 * Default language to parse when the opening delimiter has no tag.
	 */
	language?: string;
}

interface ParsedFrontMatter {
	content: string;
	data: unknown;
}

const getDelimiters = (options?: FrontMatterOptions | null): [string, string] => {
	const delimiters = options?.delimiters;

	if (Array.isArray(delimiters)) {
		return delimiters;
	}

	if (typeof delimiters === 'string') {
		return [delimiters, delimiters];
	}

	return ['---', '---'];
};

const escapeRegExp = (input: string) => input.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);

/**
 * Evaluates JavaScript front-matter only when the caller explicitly opts out
 * of the default parser options.
 */
const parseWithJavascript = (input: string) => new Function(`"use strict"; return (${input});`)() as unknown; // eslint-disable-line no-new-func

const parseData = (input: string, language: string, options?: FrontMatterOptions | null) => {
	const engine =
		options?.engines?.[language] ??
		(language === 'js' ? options?.engines?.javascript : undefined) ??
		(language === 'javascript' ? options?.engines?.js : undefined);

	if (engine) {
		return engine(input, options ?? undefined);
	}

	if (language === 'yaml' || language === 'yml') {
		return parse(input) ?? {};
	}

	if (language === 'json') {
		return JSON.parse(input) as unknown;
	}

	if ((language === 'js' || language === 'javascript') && options === undefined) {
		return parseWithJavascript(input);
	}

	return {};
};

/**
 * Split a markdown document into parsed front-matter data and markdown content.
 */
export const parseFrontMatter = (input: string, options?: FrontMatterOptions | null): ParsedFrontMatter => {
	const [openingDelimiter, closingDelimiter] = getDelimiters(options);
	const openingPattern = new RegExp(`^${escapeRegExp(openingDelimiter)}([\\w-]+)?[ \\t]*(?:\\r?\\n)`);
	const openingMatch = openingPattern.exec(input);

	if (!openingMatch) {
		return { content: input, data: {} };
	}

	const language = openingMatch[1] ?? options?.language ?? 'yaml';
	const frontMatterStartIndex = openingMatch[0].length;
	const closingPattern = new RegExp(`(?:^|\\r?\\n)${escapeRegExp(closingDelimiter)}[ \\t]*(?:\\r?\\n|$)`, 'm');
	const closingMatch = closingPattern.exec(input.slice(frontMatterStartIndex));

	if (!closingMatch) {
		return { content: input, data: {} };
	}

	const frontMatterEndIndex = frontMatterStartIndex + closingMatch.index;
	const contentStartIndex = frontMatterStartIndex + closingMatch.index + closingMatch[0].length;
	const frontMatter = input.slice(frontMatterStartIndex, frontMatterEndIndex);
	const content = input.slice(contentStartIndex);

	try {
		const data = parseData(frontMatter, language, options);

		return { content, data: data instanceof Error ? data : data ?? {} };
	} catch (error) {
		return { content, data: error };
	}
};
