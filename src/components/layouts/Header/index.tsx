import { Typography, UI } from '@runzipper/ui';
import Link from 'next/link';
import {
	buttonStyle,
	clearfixStyle,
	headerStyle,
	logoStyle,
} from './header.css';

const Header = () => {
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
							압축 해제 페이지로 가기
						</Typography.Bold>
					</UI.Button>
				</Link>
			</header>
			<div className={clearfixStyle} />
		</>
	);
};

export default Header;
