import LegalPopover from '@/components/legal/LegalPopover';
import privacyPolicy from '@/docs/legal/PRIVACY_POLICY.md';
import termsOfService from '@/docs/legal/TERMS_OF_SERVICE.md';
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
		<>
			<footer className={footerStyle}>
				<nav className={navigationStyle}>
					<button type="button" popoverTarget="terms-popover">
						<Typography.Regular textType="span" className={textStyle}>
							이용약관
						</Typography.Regular>
					</button>
					<button type="button" popoverTarget="privacy-popover">
						<Typography.Regular textType="span" className={textStyle}>
							개인정보 처리방침
						</Typography.Regular>
					</button>
					<Link href="mailto:rlaqhguse@gmail.com">
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
			<LegalPopover popoverId="terms-popover" markdown={termsOfService} />
			<LegalPopover popoverId="privacy-popover" markdown={privacyPolicy} />
		</>
	);
};

export default Footer;
