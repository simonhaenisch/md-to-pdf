#!/usr/bin/env node

// --
// Packages
import chalk from 'chalk';
import getPort from 'get-port';
import getStdin from 'get-stdin';
import path from 'path';
import { PackageJson } from '.';
import handleListr from './cli/handleListr';
import handleStdin from './cli/handleStdin';
import { CliArgs, cliFlags, Config, defaultConfig } from './lib/config';
import { closeBrowser } from './lib/generate-output';
import { help } from './lib/help';
import { setProcessAndTermTitle } from './lib/helpers';
import { getConvertFactory } from './lib/md-to-pdf';
import { closeServer, serveDirectory } from './lib/serve-dir';
import { validateNodeVersion } from './lib/validate-node-version';

// --
// Run
main(cliFlags, defaultConfig).catch((error) => {
	console.error(error);
	process.exit(1);
});

// --
// Define Main Function
async function main(args: CliArgs, config: Config) {
	setProcessAndTermTitle('md-to-pdf');

	if (!validateNodeVersion()) {
		throw new Error('Please use a Node.js version that satisfies the version specified in the engines field.');
	}

	if (args['--version']) {
		return console.log((require('../package.json') as PackageJson).version);
	}

	if (args['--help']) {
		return help();
	}

	/**
	 * 1. Get input.
	 */

	const files = args._;

	const stdin = await getStdin();

	if (files.length === 0 && !stdin) {
		return help();
	}

	/**
	 * 2. Read config file and merge it into the config object.
	 */

	if (args['--config-file']) {
		try {
			const configFile: Partial<Config> = require(path.resolve(args['--config-file']));

			config = {
				...config,
				...configFile,
				pdf_options: { ...config.pdf_options, ...configFile.pdf_options },
			};
		} catch (error) {
			console.warn(chalk.red(`Warning: couldn't read config file: ${path.resolve(args['--config-file'])}`));
			console.warn(error instanceof SyntaxError ? error.message : error);
		}
	}

	if (args['--watch-timeout']) {
		config.watch_timeout = args['--watch-timeout'];
	}

	/**
	 * 3. Start the file server.
	 */

	if (args['--basedir']) {
		config.basedir = args['--basedir'];
	}

	config.port = args['--port'] ?? (await getPort());

	const server = await serveDirectory(config);

	/**
	 * 4. Either process stdin or create a Listr task for each file.
	 */

	const convertFactory = getConvertFactory(config, args);
	if (stdin) {
		await handleStdin(stdin, convertFactory);
	} else {
		await handleListr(files, convertFactory, args, config);
	}

	console.log('Exit.');
	closeServer(server);
	closeBrowser();
}
