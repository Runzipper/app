import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import '@/styles/globals.css';
import '@/styles/index.css';
import type { Metadata } from 'next';
import { bodyStyle } from './layout.css';

export const metadata: Metadata = {
	title: 'Runzipper',
	description: 'Compress files on browser.',
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
