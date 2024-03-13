// --------------------------------------------------------------------------------------
// This file allow users to find all markdown files in a directory and its subdirectories
// and convert them all to into a singular pdf file.
// --------------------------------------------------------------------------------------

// This works by adding all the markdown files into a dictionary with the directory as the key and the markdown files in the directory as the value.
// Then it converts each directory's markdown files into pdfs and then merges them together into a singular pdf file.
// Finally, each of the directory's pdfs are merged together into a singular pdf file in the root folder.


// To Do
// Make images render

// Try to have every generated pdf be created ansynchronously
// Await all pdfs being created first though 

// Make title change
//  if on page 2, make it say (continued) at the top

import chalk from 'chalk';
import Listr from 'listr';
import path from 'path';
import { Config} from './config';
import { convertMdToPdf } from './md-to-pdf';
import { exec as execCallback } from 'child_process';
import * as fs from 'fs/promises';
import { promisify } from 'util';
const exec = promisify(execCallback);

export async function mergeFiles(args: typeof import('../cli').cliFlags, config: Config) {
    const rootDirectory: string = args['--merge'] || ''; 
    const parentDirectoryName = path.basename(path.dirname(rootDirectory));
    const fileNameWithoutExtension = path.basename(rootDirectory, path.extname(rootDirectory));
    config.pdf_options.displayHeaderFooter = true;
    config.pdf_options.headerTemplate = `<b style="
        font-size: 12px; 
        width: 100%; 
        text-align: center; 
        padding: 5px;
        font-family: 'Arial', sans-serif;"
        >${parentDirectoryName} - "${fileNameWithoutExtension}"</b>`;
        config.pdf_options.footerTemplate = `<span style="font-size: 8px; width: 100%; text-align: center; padding: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span> - ${fileNameWithoutExtension}</span>`;
    
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
        let mergedName = path.join(directoryPath, `${parentDirectoryName}_COMBINED.pdf`);
    
        // Check if any input PDF file has the same name as the intended output merged PDF file
        const conflictingFile = pdfFiles.find(file => file.includes(mergedName));
    
        // If there is a conflict, change the output file name to use "_COMBINED.pdf" suffix
        if (conflictingFile) {
            // console.log("rootDirectory: " + rootDirectory);
            const rootPdfName:string = rootDirectory + "/" + path.basename(rootDirectory);
            mergedName = `${rootPdfName}_MERGED.pdf`;
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
        config.pdf_options.displayHeaderFooter = true;
    
        const pdfGenerationPromises = files.map(file => {
            // Clone config object for each file so that we can modify the header and footer
            let fileConfig = JSON.parse(JSON.stringify(config));
    
            const parentDirectoryName = path.basename(path.dirname(file));
            const fileNameWithoutExtension = path.basename(file, path.extname(file));
            fileConfig.pdf_options.headerTemplate = 
                `<b style="
                font-size: 18px; 
                width: 100%; 
                text-align: center; 
                padding: 5px;
                font-family: 'Arial', sans-serif;"
                >${parentDirectoryName} - ${fileNameWithoutExtension}</b>`;
            fileConfig.pdf_options.footerTemplate = 
                `<span style="
                font-size: 10px; 
                width: 100%; 
                text-align: center; 
                padding: 5px;
                ">Page <span class="pageNumber"></span> of 
                <span class="totalPages"></span> - ${fileNameWithoutExtension}</span>`;
    
            // Use the cloned and modified config for each PDF generation
            return new Listr([
                {
                    title: `Generating ${args['--as-html'] ? 'HTML' : 'PDF'} from ${chalk.underline(file)}`,
                    task: () => convertMdToPdf({ path: file }, fileConfig, { args }),
                }
            ], { exitOnError: false }).run().catch(console.error);
        });
    
        // Wait for all PDF generation tasks to complete
        await Promise.all(pdfGenerationPromises);
    };
    
    // Given a directory, find all .md files in it and its subdirectories
    // returns a dict in the form of { directory: string: mdFiles: string[] }
    // there is a bug where the last dir wont find the md file in there if the pdf has already been generated
    async function findMarkdownFiles(dirPath: string): Promise<MarkdownFilesDictionary> {
        let mdFilesDictionary: MarkdownFilesDictionary = {};
        const rootDirName = path.basename(dirPath);
        mdFilesDictionary[rootDirName] = [];
        console.log("rootDirName: " + rootDirName);
        async function recurse(currentPath: string, relativeDirPath: string): Promise<void> {
            const entries = await fs.readdir(currentPath, { withFileTypes: true });
    
            // Use the root directory name if the relative path is empty
            const dirKey = relativeDirPath || rootDirName;
            if (!mdFilesDictionary[dirKey]) {
                mdFilesDictionary[dirKey] = [];
            }
    
            for (const entry of entries) {
                const entryPath = path.join(currentPath, entry.name);
    
                if (entry.isDirectory() && !entry.name.startsWith('.')) {
                    const newRelativePath = relativeDirPath ? path.join(relativeDirPath, entry.name) : entry.name;
                    await recurse(entryPath, newRelativePath);
                } else if (entry.isFile() && entry.name.endsWith('.md')) {
                    mdFilesDictionary[dirKey]?.push(entryPath);
                }
            }
        }
    
        await recurse(dirPath, '');
        
        // Log the dictionary after it has been populated
        console.log("Final mdFilesDictionary:");
        Object.entries(mdFilesDictionary).forEach(([key, value]) => {
            console.log(`${key}: ${value.join(', ')}`);
        });
        
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
    
    const bookFilesDictionary = await findMarkdownFiles(rootDirectory);

    // Makes the pdfs for each md file	
    const generateAllPdfs = async (bookFilesDictionary:MarkdownFilesDictionary) => {
        const pdfGenerationTasks = Object.keys(bookFilesDictionary).map(key => {
            let directoryFiles = bookFilesDictionary[key] || [];
            return generatePdfs(directoryFiles);
        });
        await Promise.all(pdfGenerationTasks);
    };
    
    await generateAllPdfs(bookFilesDictionary);

    for (const key of Object.keys(bookFilesDictionary)) {
        console.log("\nkey: " + key);
        let directoryFiles = bookFilesDictionary[key] || [];
        if (directoryFiles.length === 0) {
            continue;
        }
        await mergeDirectoryPdfs(directoryFiles);  // Await here to ensure each merge is completed before moving on
    }
    console.log("Finished directory merging  ----------------------\n");

    const keysWithRootDirectory = Object.keys(bookFilesDictionary).filter(key => (bookFilesDictionary[key]?.length ?? 0) > 0).map(key => {
        const fullDirectoryPath = path.join(rootDirectory, key);
        
        // Extract the base directory name from the key to use in the merged file name
        const baseDirectoryName = path.basename(key);
        
        // Check if the base directory name is the same as the root directory name
        if (baseDirectoryName === path.basename(rootDirectory)) {
            // If it is, then we're dealing with the root directory case
            const mergedFilePath = fullDirectoryPath + '_COMBINED.pdf';
            return mergedFilePath;
        } else {
            // Otherwise, it's a subdirectory or file case
            const mergedFilePath = path.join(fullDirectoryPath, `${baseDirectoryName}_COMBINED.pdf`);
            return mergedFilePath;
        }
    });
    
    console.log("keys with root directory: \n" + keysWithRootDirectory);

    await mergeDirectoryPdfs(keysWithRootDirectory);
    return;
}