import { dictionaries } from '@/utils/dictionary';
import { type NextRequest, NextResponse } from 'next/server';

const DEFAULT_LANGUAGE = 'en';

const localList = Object.keys(dictionaries);

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const pathnameHasLocale = localList.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	// 사용자의 요청이 /lang/~ 일 때
	if (pathnameHasLocale) return;

	// 사용자의 요청이 /lang/~ 형식이 아닐 때
	const acceptLanguage = request.headers.get('accept-language') || '';
	const primaryLanguage = acceptLanguage
		.split(',')[0]
		.split(';')[0]
		.trim()
		.split('-')[0];

	const locale =
		localList.find((locale) => locale === primaryLanguage) || DEFAULT_LANGUAGE;

	request.nextUrl.pathname = `/${locale}${pathname}`;

	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon|apple-touch-icon|icon|opengraph-image|twitter-image|sitemap.xml|robots.txt|.*\\.(?:ico|png|svg|jpg|jpeg|gif|webp|json|xml)$).*)',
	],
};
