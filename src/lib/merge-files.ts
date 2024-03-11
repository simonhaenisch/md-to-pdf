import chalk from 'chalk';
import getPort from 'get-port';
import Listr from 'listr';
import path from 'path';
import { Config, defaultConfig } from './config';
import { closeBrowser } from './generate-output';
import { convertMdToPdf } from './md-to-pdf';
import { closeServer, serveDirectory } from './serve-dir';
import { exec as execCallback } from 'child_process';
import * as fs from 'fs/promises';
import { promisify } from 'util';
const exec = promisify(execCallback);


export async function mergeFiles(args: typeof import('../cli').cliFlags, config: Config) {
    config.port = args['--port'] ?? (await getPort());
	const server = await serveDirectory(config);

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
        
        return;
    }
    
    await closeBrowser();
    await closeServer(server);
    return;
}
