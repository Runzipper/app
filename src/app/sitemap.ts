import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://runzipper.app/compress',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
			alternates: {
				languages: {
					ko: 'https://runzipper.app/ko/compress',
					de: 'https://runzipper.app/de/compress',
					pl: 'https://runzipper.app/pl/compress',
					fr: 'https://runzipper.app/fr/compress',
					it: 'https://runzipper.app/it/compress',
					ja: 'https://runzipper.app/ja/compress',
					zh: 'https://runzipper.app/zh/compress',
					es: 'https://runzipper.app/es/compress',
					en: 'https://runzipper.app/en/compress',
				},
			},
		},
	];
}
