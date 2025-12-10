import { style } from '@vanilla-extract/css';

export const bodyStyle = style({
	display: 'grid',
	gridTemplateRows: 'auto 1fr auto',
	minHeight: '100vh',
});
