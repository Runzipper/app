'use client';

import { useDictionary } from '@/context/dictionary';
import { Typography } from '@runzipper/ui';
import { containerStyle, descriptionStyle, titleStyle } from './layout.css';

export default function DecompressPageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const dictionary = useDictionary();
	return (
		<div className={containerStyle}>
			<Typography.Heading textType="h2" size="primary" className={titleStyle}>
				{dictionary.compress.heading}
			</Typography.Heading>
			<Typography.Regular
				textType="p"
				className={descriptionStyle}
				size="medium"
			>
				{dictionary.compress.description}
			</Typography.Regular>
			{children}
		</div>
	);
}
