import { dictionaries } from '@/utils/dictionary';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Footer from '.';

const meta = {
	title: 'Layout/Footer',
	component: Footer,
	decorators: [
		(Story) => (
			<div
				style={{
					width: '100%',
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
				}}
			>
				<Story />
			</div>
		),
	],

	argTypes: {
		lang: {
			control: 'select',
			options: Object.keys(dictionaries),
		},
	},
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		lang: 'ko',
	},
};
