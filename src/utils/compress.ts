import { gzip, zip } from 'fflate';
import { packTar } from 'modern-tar';

export const compressZip = (
	fileData: Record<string, Uint8Array>,
): Promise<string> => {
	return new Promise((resolve, reject) => {
		zip(fileData, { level: 6 }, (err, data) => {
			if (err) {
				let errorMessage = '압축 중 오류가 발생했습니다.';
				if (err instanceof Error) {
					errorMessage += ` ${err.message}`;
				}

				reject(new Error(errorMessage));
			}

			const blob = new Blob([data as BlobPart], {
				type: 'application/zip',
			});
			const url = URL.createObjectURL(blob);
			resolve(url);
		});
	});
};

export const compressTarGz = async (
	fileData: Record<string, Uint8Array>,
): Promise<string> => {
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

	// 디렉토리 먼저, 파일 나중에
	const tarEntries = [...dirEntries, ...fileEntries];

	// TAR 생성 (비동기)
	const tarData = await packTar(tarEntries);

	// GZIP 압축
	return new Promise((resolve, reject) => {
		gzip(tarData, { level: 6 }, (err, data) => {
			if (err) {
				let errorMessage = '압축 중 오류가 발생했습니다.';
				if (err instanceof Error) {
					errorMessage += ` ${err.message}`;
				}

				reject(new Error(errorMessage));
			}

			const blob = new Blob([data as BlobPart], {
				type: 'application/gzip',
			});
			const url = URL.createObjectURL(blob);
			resolve(url);
		});
	});
};
