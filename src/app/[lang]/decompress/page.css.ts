import { Theme } from '@runzipper/ui';
import { globalStyle, keyframes, style } from '@vanilla-extract/css';

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
	minHeight: 0,
	opacity: 0,
	animation: `${visible} 0.5s ease-in-out`,
	animationDelay: '0.7s',
	animationFillMode: 'forwards',
});

globalStyle(`${tableContainerStyle} table`, {
	'@media': {
		'screen and (max-width:768px)': {
			height: '40vh',
		},
	},
});

globalStyle(`${tableContainerStyle} tbody`, {
	minHeight: 0,
	flexBasis: 0,

	'@media': {
		'screen and (max-width:768px)': {
			flexBasis: 'auto',
			maxHeight: '40vh',
		},
	},
});

export const dropboxContainerStyle = style({
	display: 'flex',
	flexDirection: 'column',
	flexGrow: 1,
	flexShrink: 0,
	gap: Theme.spacing[3],
	transition: 'flex-basis 0.5s ease-in-out',
	minHeight: 0,
	textAlign: 'center',
	textWrap: 'pretty',
	wordBreak: 'keep-all',

	'@media': {
		'screen and (max-width:768px)': {
			flexGrow: 0,
			flexShrink: 0,
		},

		'screen and (min-width:769px)': {
			flexBasis: '100%',

			selectors: {
				[`&:has(~ ${tableContainerStyle})`]: {
					flexGrow: 0,
					flexBasis: '50%',
				},
			},
		},
	},
});

export const filedropStyle = style({
	'@media': {
		'screen and (max-width:768px)': {
			aspectRatio: '1/1',
			flexGrow: 0,
			height: 'auto',
		},
	},
});

export const toggleStyle = style({
	alignSelf: 'start',
});

export const tableDescriptionStyle = style({
	color: '#6C7280',
	marginTop: 8,
	marginBottom: 24,
	textWrap: 'pretty',
	wordBreak: 'keep-all',
});

export const compressButtonStyle = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	alignSelf: 'flex-end',
	gap: Theme.spacing['2'],
});

export const buttonContainer = style({
	display: 'flex',
	justifyContent: 'flex-end',
	gap: Theme.spacing['2'],
	marginTop: Theme.spacing['2'],
});

globalStyle(`${buttonContainer} button`, {
	height: '100%',
});
