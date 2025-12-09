import { Theme } from '@runzipper/ui';
import { style } from '@vanilla-extract/css';

export const containerStyle = style({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	paddingInline: 144,
	gap: Theme.spacing['2'],

	'@media': {
		'screen and (max-width:1439px)': {
			padding: 0,
		},
	},
});

export const dropboxContainerStyle = style({
	display: 'flex',
	flexDirection: 'column',
	flex: 1,
	gap: Theme.spacing[3],
});

export const toggleStyle = style({
	alignSelf: 'start',
});
