#!/usr/bin/env node

import getPort from 'get-port';

import { defaultConfig, Config } from './lib/config';
import { serveDirectory } from './lib/serve-dir';
import { getDir } from './lib/helpers';
import { convertMdToPdf } from './lib/md-to-pdf';

/**
 * Convert a markdown file to PDF.
 *
 * @returns the path that the PDF was written to
 */
export const mdToPdf = async (mdFile: string, config: Partial<Config> = {}) => {
	if (typeof mdFile !== 'string') {
		throw new TypeError(`mdFile has to be a string, received ${typeof mdFile}`);
	}

	config.port = config.port || (await getPort());
	const server = await serveDirectory(getDir(mdFile), config.port);

	const mergedConfig: Config = {
		...defaultConfig,
		...config,
		pdf_options: { ...defaultConfig.pdf_options, ...config.pdf_options },
	};

	const pdf = await convertMdToPdf(mdFile, mergedConfig);

	server.close();

	return pdf;
};

export default mdToPdf;
