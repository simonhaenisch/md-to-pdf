const http = require('http');

/**
 * Wait for localhost to be available.
 *
 * @see https://github.com/sindresorhus/wait-for-localhost/blob/master/cli.js
 *
 * @param {number} port Port that the desired server runs on
 * @param {number} [interval] Polling interval
 *
 * @returns promise that resolves once localhost:<port> is available
 */
module.exports = (port, interval = 100) =>
	new Promise(resolve => {
		const retry = () => setTimeout(main, interval);

		function main() {
			const request = http.request(
				{ method: 'HEAD', port },
				response => (response.statusCode === 200 ? resolve() : retry()),
			);

			request.on('error', retry);
			request.end();
		}

		main();
	});
