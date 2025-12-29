import type { CompressionMode } from '@/types/compress';
import { compressTar, compressTarGz, compressZip } from '@/utils/compress';
import { extractFileDataFromFileList } from '@/utils/decompress';
import { useState } from 'react';

const useCompress = (
	mode: CompressionMode,
): [boolean, (fileList: FileList) => Promise<void>, string] => {
	const [isCompressing, setIsCompressing] = useState(false);
	const [error, setError] = useState('');

	const compress = async (fileList: FileList) => {
		setIsCompressing(true);
		setError('');

		try {
			// FileList를 객체로 변환
			const fileData = await extractFileDataFromFileList(fileList);

			let url = '';

			// 압축 모드에 따라 분기하여 압축
			if (mode.value === 'tar') {
				url = await compressTar(fileData);
			} else if (mode.value === 'tar.gz') {
				url = await compressTarGz(fileData);
			} else {
				url = await compressZip(fileData);
			}

			const link = document.createElement('a');
			link.href = url;
			link.download = `compressed_${Date.now()}.${mode.value}`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		} catch (error) {
			if (error instanceof Error) {
				setError(`파일 읽기 중 오류가 발생했습니다. ${error.message}`);
			} else {
				setError('파일 읽기 중 오류가 발생했습니다.');
			}
		} finally {
			setIsCompressing(false);
		}
	};

	return [isCompressing, compress, error];
};

export default useCompress;
