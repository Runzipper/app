import { Theme } from '@runzipper/ui';
import { keyframes, style } from '@vanilla-extract/css';

export const containerStyle = style({
	flex: 1,
	display: 'flex',
	flexDirection: 'row',
	paddingInline: 144,
	gap: Theme.spacing['2'],
	height: '100%',

	'@media': {
		'screen and (max-width:1439px)': {
			padding: 0,
		},
		'screen and (max-width:768px)': {
			flexDirection: 'column',
		},
	},
});

export const dropboxContainerStyle = style({
	display: 'flex',
	flexDirection: 'column',
	flexGrow: 1,
	flexShrink: 1,
	flexBasis: '100%',
	gap: Theme.spacing[3],
	transition: 'flex-basis 0.5s ease-in-out',
	minHeight: 0,
});

const visible = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

export const tableContainerStyle = style({
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	flexGrow: 1,
	flexShrink: 1,
	flexBasis: '50%',
	minHeight: 0,
	opacity: 0,
	animation: `${visible} 0.5s ease-in-out`,
	animationDelay: '0.7s',
	animationFillMode: 'forwards',
});

export const filedropStyle = style({
	selectors: {
		[`${dropboxContainerStyle}:has(~ ${tableContainerStyle}) &`]: {
			flexGrow: 1,
			aspectRatio: 'auto',
		},
	},
	'@media': {
		'screen and (max-width:425px)': {
			aspectRatio: '1/1',
			flexGrow: 0,
			height: 'auto',
		},
	},
});

export const dropboxContainerHalfStyle = style({
	flexBasis: '50%',
});

export const toggleStyle = style({
	alignSelf: 'start',
});

export const tableDescriptionStyle = style({
	color: '#6C7280',
	marginTop: 8,
	marginBottom: 24,
});

export const compressButtonStyle = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	alignSelf: 'flex-end',
	gap: Theme.spacing['2'],
	marginTop: Theme.spacing['2'],
});
