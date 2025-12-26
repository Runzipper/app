'use client';

import { PATH } from '@/constants';
import type { Dictionary } from '@/utils/dictionary';
import { Typography, UI } from '@runzipper/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonStyle } from './header.css';

type HeaderButtonProps = {
	dictionary: Dictionary;
};

export function HeaderButton({ dictionary }: HeaderButtonProps) {
	const pathname = usePathname();
	const isCompressPage = pathname?.includes(PATH.COMPRESS);

	const buttonHref = isCompressPage ? PATH.DECOMPRESS : PATH.COMPRESS;
	const buttonText = isCompressPage
		? dictionary.header.decompress
		: dictionary.header.compress;

	return (
		<Link href={buttonHref}>
			<UI.Button className={buttonStyle}>
				<Typography.Bold textType="span" size="small">
					{buttonText}
				</Typography.Bold>
			</UI.Button>
		</Link>
	);
}
