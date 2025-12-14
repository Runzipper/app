import { dictionaries } from '@/utils/dictionary';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Header from '.';

const meta = {
	title: 'Layout/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		lang: {
			control: 'select',
			options: Object.keys(dictionaries),
		},
	},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		lang: 'kr',
	},
};
