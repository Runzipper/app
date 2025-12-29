import {
	decompressTar,
	decompressTarGz,
	decompressZip,
	extractFileDataFromFileList,
} from '@/utils/decompress';
import { useState } from 'react';

const useDecompress = (): [
	boolean,
	(fileList: FileList) => Promise<void>,
	string,
] => {
	const [isDecompressing, setIsDecompressing] = useState(false);
	const [error, setError] = useState('');

	const decompress = async (fileList: FileList) => {
		setIsDecompressing(true);
		setError('');

		try {
			// FileList에서 압축 파일 데이터 추출
			const fileData = await extractFileDataFromFileList(fileList);
			const directoryName = Object.keys(fileData)[0].split('.')[0];
			const compressedData = Object.values(fileData)[0];
const fileName = Object.keys(fileData)[0];
const fileExtension = fileName.includes('.') ? fileName.split('.').pop() : '';

			let decompressedFiles: Record<string, Uint8Array>;

			if (fileExtension === 'zip') {
				decompressedFiles = await decompressZip(compressedData);
			} else if (fileExtension === 'tar') {
				decompressedFiles = await decompressTar(compressedData);
			} else if (fileExtension === 'gz') {
				decompressedFiles = await decompressTarGz(compressedData);
			} else {
				throw new Error('지원하지 않는 파일 형식입니다.');
			}

			// File System Access API 지원 여부 확인
			if (hasFileSystemAccess(window)) {
				// 방법 1: 폴더 구조 유지하면서 저장 (Chrome, Edge)
				await saveToDirectory(decompressedFiles, directoryName);
			} else {
				// 방법 2: 개별 파일 다운로드 (Safari, Firefox)
				await downloadIndividualFiles(decompressedFiles, directoryName);
			}
		} catch (error) {
			if (error instanceof Error) {
				if (error.name === 'AbortError') {
					setError('폴더 선택이 취소되었습니다.');
				} else {
					setError(`압축 해제 중 오류가 발생했습니다. ${error.message}`);
				}
			} else {
				setError('압축 해제 중 오류가 발생했습니다.');
			}
		} finally {
			setIsDecompressing(false);
		}
	};

	return [isDecompressing, decompress, error];
};

export default useDecompress;

/**
 * 폴더 구조를 유지하면서 저장하는 함수
 * @param files 압축 해제된 파일들
 * @param directoryName 압축 파일명
 */
const saveToDirectory = async (
	files: Record<string, Uint8Array>,
	directoryName: string,
) => {
	if (!hasFileSystemAccess(window)) {
		throw new Error('File System Access API not supported');
	}
	// 사용자에게 폴더 선택 요청
	const dirHandle = await window.showDirectoryPicker();

	// 루트 폴더 생성
	const rootDirHandle = await dirHandle.getDirectoryHandle(directoryName, {
		create: true,
	});

	// 각 파일을 선택한 폴더에 저장
	for (const [filepath, data] of Object.entries(files)) {
		const pathParts = filepath.split('/');
		let currentDir = rootDirHandle;

		// 폴더 구조 생성
		for (let i = 0; i < pathParts.length - 1; i++) {
			currentDir = await currentDir.getDirectoryHandle(pathParts[i], {
				create: true,
			});
		}

		// 파일 저장
		const fileName = pathParts[pathParts.length - 1];
		const fileHandle = await currentDir.getFileHandle(fileName, {
			create: true,
		});
		const writable = await fileHandle.createWritable();
		await writable.write(data as BlobPart);
		await writable.close();
	}
};

/**
 * 개별 파일로 다운로드하는 함수
 * @param files 압축 해제된 파일들
 * @param directoryName 압축 파일명
 */
const downloadIndividualFiles = async (
	files: Record<string, Uint8Array>,
	directoryName: string,
) => {
	for (const [filepath, data] of Object.entries(files)) {
		// Blob 생성
		const blob = new Blob([data as BlobPart]);
		const url = URL.createObjectURL(blob);

		// 다운로드 링크 생성 및 클릭
		const link = document.createElement('a');
		link.href = url;
		// 파일명: directoryName_filepath (슬래시를 언더스코어로 치환)
		link.download = `${directoryName}_${filepath.replace(/\//g, '_')}`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// URL 정리
		URL.revokeObjectURL(url);

		// 브라우저가 파일을 처리할 시간을 주기 위해 약간의 지연
		await new Promise((resolve) => setTimeout(resolve, 100));
	}
};

/**
 * File System Access API 지원 여부 확인
 * @param window Window 객체
 * @returns File System Access API가 지원되는 경우 true, 그렇지 않은 경우 false
 */
const hasFileSystemAccess = (
	window: Window,
): window is Window & {
	showDirectoryPicker: () => Promise<FileSystemDirectoryHandle>;
} => {
	return 'showDirectoryPicker' in window;
};
