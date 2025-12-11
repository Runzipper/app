import type { CompressionMode } from '@/types/compress';
import { compressTar, compressTarGz, compressZip } from '@/utils/compress';
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
			const fileData: Record<string, Uint8Array> = {};

			// 모든 파일을 비동기로 읽기
			const fileReadPromises = Array.from(fileList).map((file) => {
				return new Promise<void>((resolve, reject) => {
					const reader = new FileReader();
					reader.onload = (e) => {
						const arrayBuffer = e.target?.result as ArrayBuffer;
						// 파일의 상대 경로 유지
						const fileName = file.webkitRelativePath || file.name;
						fileData[fileName] = new Uint8Array(arrayBuffer);
						resolve();
					};
					reader.onerror = () => reject(reader.error);
					reader.readAsArrayBuffer(file);
				});
			});

			// 모든 파일 읽기 완료 대기
			await Promise.all(fileReadPromises);

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
