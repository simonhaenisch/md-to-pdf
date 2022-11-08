const extensions = /\.(md|mkd|mdown|markdown)$/i;

/**
 * Check whether a path is a markdown file.
 */
export const isMdFile = (path: string) => extensions.test(path);
