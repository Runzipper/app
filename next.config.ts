import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	async redirects() {
		return [{ source: '/', destination: '/compress', permanent: true }];
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.md$/,
			type: 'asset/source',
		});
		return config;
	},
};

export default withVanillaExtract(nextConfig);
