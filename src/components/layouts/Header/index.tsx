import { getDictionary, type Locale } from '@/utils/dictionary';
import { Typography, UI } from '@runzipper/ui';
import Link from 'next/link';
import {
	buttonStyle,
	clearfixStyle,
	headerStyle,
	logoStyle,
} from './header.css';

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
				<Link href="/unzip">
					<UI.Button className={buttonStyle}>
						<Typography.Bold textType="span" size="small">
							{dictionary.header.decompress}
						</Typography.Bold>
					</UI.Button>
				</Link>
			</header>
			<div className={clearfixStyle} />
		</>
	);
};

export default Header;
