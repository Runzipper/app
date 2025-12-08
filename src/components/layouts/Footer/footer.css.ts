import { Theme } from '@runzipper/ui';
import { style } from '@vanilla-extract/css';

export const footerStyle = style({
	width: '100%',
	height: 85,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	paddingInline: Theme.spacing[8],
	borderTop: `1px solid ${Theme.color.borderLight}`,
});

export const navigationStyle = style({
	display: 'flex',
	gap: Theme.spacing['8'],
});

export const textStyle = style({
	fontSize: 14,
});
