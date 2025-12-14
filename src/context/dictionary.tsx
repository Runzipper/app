'use client';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

type Dictionary = Awaited<
	ReturnType<typeof import('@/utils/dictionary').getDictionary>
>;

const DictionaryContext = createContext<Dictionary | null>(null);

type DictionaryProviderProps = {
	children: ReactNode;
	dictionary: Dictionary;
};

export function DictionaryProvider({
	children,
	dictionary,
}: DictionaryProviderProps) {
	return (
		<DictionaryContext.Provider value={dictionary}>
			{children}
		</DictionaryContext.Provider>
	);
}

export function useDictionary() {
	const context = useContext(DictionaryContext);
	if (!context) {
		throw new Error('useDictionary must be used within DictionaryProvider');
	}
	return context;
}
