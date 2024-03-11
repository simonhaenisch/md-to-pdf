#!/usr/bin/env node

// --
// Packages

// Done
// Makes dictionary of each chapter's md files
// Have a function that turns an array of md files into a pdfs in that dir

// To do
// Have each chapter's pdfs created

// Possible appproaches
// 1: WINNER!!
// Make pdf at each file location, then go through and specify each location to pdfunite
// Generate all the chapter's pdfs
// Unite chapter pdfs
// Delete indivdual pdfs (maybe see if pdfunite can do this for us)
// Pros:
// Follows the generate-output logic
// Cons:
// Puts files everywhere

// 2
// Put all pdfs in root dir
// Pros:
// Easy to implement pdfunite
// Cons:
// Have to change generate-output logic
// 

//TO DO 
// pdfunite does not like it when there's spaces in the file name. It works for the other test cases so figure that out.

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
import { exec as execCallback } from 'child_process';
import * as fs from 'fs/promises';
import { promisify } from 'util';
const exec = promisify(execCallback);




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
	


	const mergeDirectoryPdfs = async (files: string[]) => {
		if (files.length === 0) {
			return;
		}
		const pdfFiles = files.map(file => {
			// Convert .md files to their corresponding .pdf files or use as is
			const pdfPath = file.endsWith('.md') ?
				path.join(path.dirname(file), path.basename(file, '.md') + '.pdf') : 
				file;
			// Wrap the file path in quotes to handle spaces
			return `"${pdfPath}"`;
		});
	
		const directoryPath: string = path.dirname(files[0] || "");
		const parentDirectoryName = path.basename(directoryPath);
		let mergedName = path.join(directoryPath, `${parentDirectoryName}_MERGED.pdf`);
	
		// Check if any input PDF file has the same name as the intended output merged PDF file
		const conflictingFile = pdfFiles.find(file => file.includes(mergedName));

		// If there is a conflict, change the output file name to use "_COMBINED.pdf" suffix
		if (conflictingFile) {
			mergedName = path.join(directoryPath, `${parentDirectoryName}_COMBINED.pdf`);
		}
		const command = `pdfunite ${pdfFiles.join(' ')} "${mergedName}"`;
	
		try {
			await exec(command);
			console.log(`PDFs merged successfully into ${mergedName}`);
		} catch (error) {
			console.error(`exec error: ${(error as Error).message}`);
		}

		deleteFiles(files);
	};

	interface MarkdownFilesDictionary {
		[directory: string]: string[];
	}

	// Given a list of .md files, convert them to pdfs
	const generatePdfs = async (files: string[]) => {
		for (const file of files) {
			// Create a new Listr task for each file individually and await its completion
			await new Listr([
				{
					title: `Generating ${args['--as-html'] ? 'HTML' : 'PDF'} from ${chalk.underline(file)}`,
					task: () => convertMdToPdf({ path: file }, config, { args }),
				}
			], { exitOnError: false }).run().catch(console.error);
		}
	};
	
	// Given a directory, find all .md files in it and its subdirectories
	// returns a dict in the form of { directory: string: mdFiles: string[] }
	// there is a bug where the last dir wont find the md file in there if the pdf has already been generated
	async function findMarkdownFiles(dirPath: string): Promise<MarkdownFilesDictionary> {
		let mdFilesDictionary: MarkdownFilesDictionary = {};
		const rootDirName = path.basename(dirPath);
	
		async function recurse(currentPath: string, relativeDirPath: string): Promise<void> {
			const entries = await fs.readdir(currentPath, { withFileTypes: true });
	
			for (const entry of entries) {
				const entryPath = path.join(currentPath, entry.name);
	
				if (entry.isDirectory()) {
					// Compute the new relative path or use the directory name if it's the root
					const newRelativePath = relativeDirPath ? path.join(relativeDirPath, entry.name) : entry.name;
					await recurse(entryPath, newRelativePath);
				} else if (entry.isFile() && entry.name.endsWith('.md')) {
					// Use the root directory name if the relative path is empty
					const key = relativeDirPath || rootDirName;
					if (!mdFilesDictionary[key]) {
						mdFilesDictionary[key] = [];
					}
					mdFilesDictionary[key]?.push(entryPath);
				}
			}
		}
	
		// Start the recursion with an empty string as the initial relative path
		await recurse(dirPath, '');
		return mdFilesDictionary;
	}
	
	// Given a list of .md files, find their corresponding .pdf files and delete them
	async function deleteFiles(files: string[]) {

		for (let filePath of files) {

			// We pass in an array of md files, so we need to change the file extension to pdf
			if (filePath.endsWith('.md')) {
				filePath = filePath.replace(/\.md$/, '.pdf');
			}	
			
			try {
				await fs.unlink(filePath);
			} catch (err) {
				console.error('Error deleting the file:', err);
			}
		}
	}
	
	if (args['--book']) {
		const rootDirectory: string = args['--book']; 
		const bookFilesDictionary = await findMarkdownFiles(rootDirectory);

		// Makes the pdfs for each directory aka chapter
		// Generate all PDFs before merging them
		for (const key of Object.keys(bookFilesDictionary)) {
			let directoryFiles = bookFilesDictionary[key] || [];
			await generatePdfs(directoryFiles);  // Await here to ensure each set of PDFs is generated before moving on
		}		

		for (const key of Object.keys(bookFilesDictionary)) {
			let directoryFiles = bookFilesDictionary[key] || [];
			await mergeDirectoryPdfs(directoryFiles);  // Await here to ensure each merge is completed before moving on
		}
		console.log("Finished directory merging  ----------------------\n");

		const keysWithRootDirectory = Object.keys(bookFilesDictionary).map(key => {
			const fullDirectoryPath = path.join(rootDirectory, key);
		  
			// Extract the base directory name from the key to use in the merged file name
			const baseDirectoryName = path.basename(key);
		  
			// Check if the base directory name is the same as the root directory name
			if (baseDirectoryName === path.basename(rootDirectory)) {
			  // If it is, then we're dealing with the root directory case
			  const mergedFilePath = fullDirectoryPath + '_MERGED.pdf';
			  return mergedFilePath;
			} else {
			  // Otherwise, it's a subdirectory or file case
			  const mergedFilePath = path.join(fullDirectoryPath, `${baseDirectoryName}_MERGED.pdf`);
			  return mergedFilePath;
			}
		  });
		// console.log("keys with root directory: \n" + keysWithRootDirectory);

		await mergeDirectoryPdfs(keysWithRootDirectory);
		await closeBrowser();
		await closeServer(server);

		return;
	}

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

	//should be able to get rid of this with generatePdfs()
	// TODO

	// let files: string[] = ['/Users/log/Github/md-to-pdf/src/test/nested'];
	const getListrTask = (file: string) => ({
		title: `generating ${args['--as-html'] ? 'HTML' : 'PDF'} from ${chalk.underline(file)}`,
		task: async () => convertMdToPdf({ path: file }, config, { args }),
	});

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