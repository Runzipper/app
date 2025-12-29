import { getDictionary, type Locale } from '@/utils/dictionary';
import { Typography, UI } from '@runzipper/ui';
import Link from 'next/link';
import {
	clearfixStyle,
	headerStyle,
	logoStyle,
} from './header.css';
import { HeaderButton } from './HeaderButton';

type HeaderProps = {
	lang: Locale;
};

const Header = async ({ lang }: HeaderProps) => {
	const dictionary = await getDictionary(lang);

	return (
		<>
			<header className={headerStyle}>
				<Link className={logoStyle} href="/">
					<UI.Logo type="primary" />
					<Typography.Bold textType="h1">Runzipper</Typography.Bold>
				</Link>
				<HeaderButton dictionary={dictionary} />
			</header>
			<div className={clearfixStyle} />
		</>
	);
};

export default Header;
