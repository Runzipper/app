import { dictionaries } from '@/utils/dictionary';
import { type NextRequest, NextResponse } from 'next/server';

const localList = Object.keys(dictionaries);

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const pathnameHasLocale = localList.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	// 사용자의 요청이 /lang/~ 일 때
	if (pathnameHasLocale) return;

	// 사용자의 요청이 /lang/~ 형식이 아닐 때
	const locale = request.headers.get('accept-language') || 'en';

	request.nextUrl.pathname = `/${locale}${pathname}`;

	return NextResponse.redirect(request.nextUrl);
}
