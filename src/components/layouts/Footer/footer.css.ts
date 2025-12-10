import { Theme } from '@runzipper/ui';
import { style } from '@vanilla-extract/css';

export const footerStyle = style({
	width: '100%',
	height: 85,
	display: 'flex',
	alignItems: 'center',
	alignContent: 'center',
	paddingInline: Theme.spacing[8],
	borderTop: `1px solid ${Theme.color.borderLight}`,
	color: '#6C7280',
	flexWrap: 'wrap',
});

export const navigationStyle = style({
	display: 'flex',
	gap: Theme.spacing['8'],
	flexGrow: 1,
	flexShrink: 0,

	'@media': {
		'screen and (max-width:425px)': {
			justifyContent: 'space-between',
		},
	},
});

export const textStyle = style({
	fontSize: 14,
	flexGrow: 1,
	flexShrink: 0,
});

export const copyrightNotice = style({
	flexGrow: 0,
	flexShrink: 0,
	textAlign: 'center',

	'@media': {
		'screen and (max-width:425px)': {
			textAlign: 'center',
			flexGrow: 1,
		},
	},
});
