import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	async redirects() {
		return [{ source: '/', destination: '/compress', permanent: true }];
	},
};

export default withVanillaExtract(nextConfig);
