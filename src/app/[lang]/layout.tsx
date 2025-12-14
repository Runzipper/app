import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import { DictionaryProvider } from '@/context/dictionary';
import { dictionaries, hasLocale } from '@/utils/dictionary';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

export async function generateStaticParams() {
	return Object.keys(dictionaries).map((lang) => ({ lang }));
}

export default async function Layout({
	children,
	params,
}: LayoutProps<'/[lang]'>) {
	const locale = (await params).lang;

	if (!hasLocale(locale)) notFound();

	return (
		<html lang={(await params).lang}>
			<body className={bodyStyle}>
				<DictionaryProvider dictionary={await dictionaries[locale]()}>
					<Header lang={locale} />
					{children}
					<Footer lang={locale} />
				</DictionaryProvider>
			</body>
		</html>
	);
}
