import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import '@/styles/globals.css';
import '@/styles/index.css';
import type { Metadata } from 'next';
import { bodyStyle } from './layout.css';

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body className={bodyStyle}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
