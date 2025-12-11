export const FILE_SELECT_MODE = {
	file: {
		label: '파일',
		value: 'file',
	},
	directory: {
		label: '폴더',
		value: 'directory',
	},
} as const;

export const COMPRESSION_MODE = {
	zip: {
		label: 'zip',
		value: 'zip',
	},
	'tar.gz': {
		label: 'tar.gz',
		value: 'tar.gz',
	},
	tar: {
		label: 'tar',
		value: 'tar',
	},
} as const;
