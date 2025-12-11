import { Theme } from '@runzipper/ui';
import { style } from '@vanilla-extract/css';

export const headerStyle = style({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
	height: 64,
	paddingInline: Theme.spacing[8],
	borderBottom: `1px solid ${Theme.color.borderLight}`,
	zIndex: Theme.z.header,
	backgroundColor: Theme.color.white,
});

export const logoStyle = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: 20,
	gap: Theme.spacing[1],
});

export const buttonStyle = style({
	height: 36,
	paddingBlock: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	letterSpacing: 1.02,
});

export const clearfixStyle = style({
	width: '100%',
	height: 64,
});
