import { Theme } from '@runzipper/ui';
import { style } from '@vanilla-extract/css';

export const containerStyle = style({
	padding: 48,
	display: 'flex',
	flexDirection: 'column',
});

export const titleStyle = style({
	textAlign: 'center',
	marginBottom: 16,
});

export const descriptionStyle = style({
	textAlign: 'center',
	fontSize: Theme.fontSize.sizeLg,
	color: '#6C7280',
	marginBottom: Theme.spacing['12'],
	textWrap: 'pretty',
	wordBreak: 'keep-all',
});
