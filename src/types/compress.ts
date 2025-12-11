import type { COMPRESSION_MODE, FILE_SELECT_MODE } from '@/constants';

export type CompressionMode =
	(typeof COMPRESSION_MODE)[keyof typeof COMPRESSION_MODE];

export type FileSelectMode = keyof typeof FILE_SELECT_MODE;
