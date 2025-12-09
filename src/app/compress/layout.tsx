import { Typography } from '@runzipper/ui';
import { containerStyle, descriptionStyle, titleStyle } from './layout.css';

export default function DecompressPageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className={containerStyle}>
			<Typography.Heading textType="h2" size="primary" className={titleStyle}>
				Compress files on browser
			</Typography.Heading>
			<Typography.Regular
				textType="p"
				className={descriptionStyle}
				size="medium"
			>
				Easily compress and decompress your files with our free tool.
				<br /> No software installation required.
				<br /> Supports ZIP, GZIP.
			</Typography.Regular>
			{children}
		</div>
	);
}
