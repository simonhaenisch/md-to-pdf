/**
 * Check whether the input is a url.
 *
 * @returns `true` if a URL can be constructed from `input`, `false` otherwise.
 */
export const isHttpUrl = (input: string) => {
	try {
		return new URL(input).protocol.startsWith('http');
	} catch {
		return false;
	}
};
