import { Theme } from '@runzipper/ui';
import { style } from '@vanilla-extract/css';

export const popoverStyle = style({
	padding: Theme.spacing[6],
	maxWidth: 800,
	width: '100%',
	maxHeight: '80vh',
	overflow: 'auto',
	borderRadius: '8px',
	border: `1px solid ${Theme.color.borderLight}`,
	boxShadow: Theme.shadow.lg,
	backgroundColor: Theme.color.white,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%,-50%)',
});

export const popoverContentStyle = style({
	lineHeight: 1.6,
	color: '#1F2937',
});

export const popoverCloseButtonStyle = style({
	position: 'absolute',
	top: Theme.spacing[3],
	right: Theme.spacing[3],
	padding: Theme.spacing[2],
	background: 'transparent',
	border: 'none',
	borderRadius: Theme.radius.md,
	cursor: 'pointer',
	fontSize: Theme.fontSize.sizeXl,
	color: Theme.color.subtleDark,
	transition: 'all 0.2s ease-in-out',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '32px',
	height: '32px',

	':hover': {
		color: Theme.color.contentDark,
		backgroundColor: Theme.color.backgroundLight,
		transform: 'scale(1.1)',
	},

	':active': {
		transform: 'scale(0.95)',
	},
});
