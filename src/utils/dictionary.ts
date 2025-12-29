export const dictionaries = {
	ko: () =>
		import('@/docs/dictionanaries/kr.json').then((module) => module.default),
	en: () =>
		import('@/docs/dictionanaries/en.json').then((module) => module.default),
	ja: () =>
		import('@/docs/dictionanaries/ja.json').then((module) => module.default),
	zh: () =>
		import('@/docs/dictionanaries/zh.json').then((module) => module.default),
	de: () =>
		import('@/docs/dictionanaries/de.json').then((module) => module.default),
	pl: () =>
		import('@/docs/dictionanaries/pl.json').then((module) => module.default),
	es: () =>
		import('@/docs/dictionanaries/es.json').then((module) => module.default),
	fr: () =>
		import('@/docs/dictionanaries/fr.json').then((module) => module.default),
	it: () =>
		import('@/docs/dictionanaries/it.json').then((module) => module.default),
} as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export const hasLocale = (locale: string): locale is Locale => {
	return Object.keys(dictionaries).includes(locale);
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
