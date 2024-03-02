#!/usr/bin/env node

// --
// Packages

import arg from 'arg';
import chalk from 'chalk';
import { watch, WatchOptions } from 'chokidar';
import getPort from 'get-port';
// import getStdin from 'get-stdin';
import Listr from 'listr';
import path from 'path';
import { PackageJson } from '.';
import { Config, defaultConfig } from './lib/config';
import { closeBrowser } from './lib/generate-output';
import { help } from './lib/help';
import { convertMdToPdf } from './lib/md-to-pdf';
import { closeServer, serveDirectory } from './lib/serve-dir';
import { validateNodeVersion } from './lib/validate-node-version';
const { exec } = require('child_process');
// import * as fs from 'fs/promises';


// --
// Configure CLI Arguments

export const cliFlags = arg({
	'--help': Boolean,
	'--version': Boolean,
	'--basedir': String,
	'--watch': Boolean,
	'--watch-options': String,
	'--stylesheet': [String],
	'--css': String,
	'--document-title': String,
	'--body-class': [String],
	'--page-media-type': String,
	'--highlight-style': String,
	'--marked-options': String,
	'--html-pdf-options': String,
	'--pdf-options': String,
	'--launch-options': String,
	'--gray-matter-options': String,
	'--port': Number,
	'--md-file-encoding': String,
	'--stylesheet-encoding': String,
	'--as-html': Boolean,
	'--config-file': String,
	'--devtools': Boolean,
	
	'--book': String,

	// aliases
	'-h': '--help',
	'-v': '--version',
	'-w': '--watch',
});

// --
// Run

main(cliFlags, defaultConfig).catch((error) => {
	console.error(error);
	process.exit(1);
});

// --
// Define Main Function

async function main(args: typeof cliFlags, config: Config) {
	process.title = 'md-to-pdf';
	// console.log(process.argv);

	if (!validateNodeVersion()) {
		throw new Error('Please use a Node.js version that satisfies the version specified in the engines field.');
	}

	if (args['--version']) {
		console.log("lollolll");
		return console.log((require('../package.json') as PackageJson).version);
	}

	if (args['--help']) {
		return help();
	}

	/**
	 * 1. Get input.
	 */

	const files = args._;
	// console.log(files);
	// if (args['--book']) {
	// 	console.log("book file");
	// 	async function findMarkdownFiles(dirPath: string): Promise<string[]> {
	// 		let mdFiles: string[] = [];
	
	// 		async function recurse(currentPath: string): Promise<void> {
	// 			const entries = await fs.readdir(currentPath, { withFileTypes: true });
	
	// 			for (let entry of entries) {
	// 				const entryPath = path.join(currentPath, entry.name);
	// 				if (entry.isDirectory()) {
	// 					await recurse(entryPath);
	// 				} else if (entry.isFile() && entry.name.endsWith('.md')) {
	// 					mdFiles.push(entryPath);
	// 				}
	// 			}
	// 		}
	
	// 		await recurse(dirPath);
	// 		return mdFiles;
	// 	}
	
	// 	// Example usage
	// 	const directoryPath: string = args['--book']; // Make sure 'args' is defined and has the correct type
	// 	console.log("found files:")
	// 	findMarkdownFiles(directoryPath)
	// 		.then(files => console.log(files))
	// 		.catch(error => console.error(error));
	// 	console.log("END FILES")
	// }

	// const stdin = await getStdin();
	const stdin = false;

	// if (files.length === 0 && !stdin) {
	// 	return help();
	// }

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

	if (stdin) {
		await convertMdToPdf({ content: stdin }, config, { args })
			.finally(async () => {
				await closeBrowser();
				await closeServer(server);
			})
			.catch((error: Error) => {
				throw error;
			});

		return;
	}

	const getListrTask = (file: string) => ({
		title: `generating ${args['--as-html'] ? 'HTML' : 'PDF'} from ${chalk.underline(file)}`,
		task: async () => convertMdToPdf({ path: file }, config, { args }),
	});

	const runPdfUnite = () => {
		console.log(files)
		const command = 'pdfunite one.pdf two.pdf root.pdf out2.pdf';
		let directory: string = "src/test/output/"
		// let directory: string = "/Users/log/Github/md-to-pdf/src/test/output/"
		const options = {
			cwd: directory // Specify the directory here
		};
		
		exec(command, options, (error: Error | null, stderr: string) => {
			if (error) {
				console.error(`exec error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.error(`stderr: ${stderr}`);
				return;
			}
		});
	};

	if (args['--book']) {
		console.log("entered book")
		await new Listr(files.map(getListrTask), { concurrent: true, exitOnError: false })
			.run()
			.then(async () => {
				await closeBrowser();
				await closeServer(server);
				runPdfUnite();
			})
			.catch((error: Error) => {
				/**
				 * In watch mode the error needs to be shown immediately because the `main` function's catch handler will never execute.
				*
				* @todo is this correct or does `main` actually finish and the process is just kept alive because of the file server?
				*/
				throw error;
			});
			// return;
		}

	await new Listr(files.map(getListrTask), { concurrent: true, exitOnError: false })
		.run()
		.then(async () => {
			if (args['--watch']) {
				console.log(chalk.bgBlue('\n watching for changes \n'));

				const watchOptions = args['--watch-options']
					? (JSON.parse(args['--watch-options']) as WatchOptions)
					: config.watch_options;

				watch(files, watchOptions).on('change', async (file) =>
					new Listr([getListrTask(file)], { exitOnError: false }).run().catch(console.error),
				);
			} else {
				await closeBrowser();
				await closeServer(server);
			}
		})
		.catch((error: Error) => {
			/**
			 * In watch mode the error needs to be shown immediately because the `main` function's catch handler will never execute.
			*
			* @todo is this correct or does `main` actually finish and the process is just kept alive because of the file server?
			*/
			if (args['--watch']) {
				return console.error(error);
			}
			
			throw error;
		});

	}
