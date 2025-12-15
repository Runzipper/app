import '@/styles/globals.css';
import '@/styles/index.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Runzipper',
	description:
		'Compress and archive your files directly in your browser with support for ZIP, TAR, and TAR.GZ formats. No server uploads, no installation required, and complete privacy protection. All compression processing happens locally on your device, ensuring your sensitive files never leave your computer.',
	manifest: '/site.webmanifest',
	appleWebApp: {
		title: 'Runzipper',
	},
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/favicon.svg', type: 'image/svg+xml' },
			{ url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
		],
		apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
		shortcut: '/favicon.ico',
	},
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
	return <>{children}</>;
}
