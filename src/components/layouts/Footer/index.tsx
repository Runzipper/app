import { Typography } from '@runzipper/ui';
import clsx from 'clsx';
import Link from 'next/link';
import {
	copyrightNotice as copyrightNoticeStyle,
	footerStyle,
	navigationStyle,
	textStyle,
} from './footer.css';

const Footer = () => {
	return (
		<footer className={footerStyle}>
			<nav className={navigationStyle}>
				<Link href="/">
					<Typography.Regular textType="span" className={textStyle}>
						이용약관
					</Typography.Regular>
				</Link>
				<Link href="/">
					<Typography.Regular textType="span" className={textStyle}>
						개인정보 처리방침
					</Typography.Regular>
				</Link>
				<Link href="/">
					<Typography.Regular textType="span" className={textStyle}>
						문의하기
					</Typography.Regular>
				</Link>
			</nav>
			<Typography.Regular
				textType="small"
				className={clsx(textStyle, copyrightNoticeStyle)}
			>
				&#64;BHyeonKim. All rights reserved
			</Typography.Regular>
		</footer>
	);
};

export default Footer;
