/** @type {import('next').NextConfig} */
module.exports = {
	async redirects() {
		return [{ source: "/", destination: "/store", permanent: false }];
	},
};
