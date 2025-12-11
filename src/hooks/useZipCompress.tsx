import type { COMPRESSION_MODE } from '@/constants';
import { gzip, zip } from 'fflate';
import { packTar } from 'modern-tar';
import { useState } from 'react';

const useZipCompress = (
	mode: (typeof COMPRESSION_MODE)[keyof typeof COMPRESSION_MODE],
): [boolean, (fileList: FileList) => Promise<void>, string] => {
	const [isCompressing, setIsCompressing] = useState(false);
	const [error, setError] = useState('');

	const compress = async (fileList: FileList) => {
		setIsCompressing(true);

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

			// 압축 모드에 따라 분기
			if (mode.value === 'tar.gz') {
				// TAR.GZ 압축
				// 디렉토리 구조 추출
				const directories = new Set<string>();
				Object.keys(fileData).forEach((filePath) => {
					const parts = filePath.split('/');
					// 파일명을 제외한 디렉토리 경로들 수집
					for (let i = 1; i < parts.length; i++) {
						const dirPath = `${parts.slice(0, i).join('/')}/`;
						directories.add(dirPath);
					}
				});

				// 디렉토리 엔트리 생성
				const dirEntries = Array.from(directories)
					.sort()
					.map((dirPath) => ({
						header: {
							name: dirPath,
							size: 0,
							type: 'directory' as const,
						},
					}));

				// 파일 엔트리 생성
				const fileEntries = Object.entries(fileData).map(([name, content]) => ({
					header: {
						name,
						size: content.length,
						type: 'file' as const,
					},
					body: content,
				}));

				// 디렉토리 먼저, 파일 나중에 (표준 관례)
				const tarEntries = [...dirEntries, ...fileEntries];

				// TAR 생성 (비동기)
				const tarData = await packTar(tarEntries);

				// GZIP 압축
				gzip(tarData, { level: 6 }, (err, data) => {
					if (err) {
						setError(`압축 중 오류가 발생했습니다. ${err.message}`);
						setIsCompressing(false);
						return;
					}

					// TAR.GZ 파일 다운로드
					const blob = new Blob([data as BlobPart], {
						type: 'application/gzip',
					});
					const url = URL.createObjectURL(blob);
					const link = document.createElement('a');
					link.href = url;
					link.download = `compressed_${Date.now()}.tar.gz`;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					URL.revokeObjectURL(url);

					setIsCompressing(false);
				});
			} else {
				// ZIP 압축 (기본값)
				zip(fileData, { level: 6 }, (err, data) => {
					if (err) {
						setError(`압축 중 오류가 발생했습니다. ${err.message}`);
						setIsCompressing(false);
						return;
					}

					// ZIP 파일 다운로드
					const blob = new Blob([data as BlobPart], {
						type: 'application/zip',
					});
					const url = URL.createObjectURL(blob);
					const link = document.createElement('a');
					link.href = url;
					link.download = `compressed_${Date.now()}.zip`;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					URL.revokeObjectURL(url);

					setIsCompressing(false);
				});
			}
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

export default useZipCompress;
