import { Unzip, UnzipInflate, unzipSync } from 'fflate';
import { createGzipDecoder, createTarDecoder } from 'modern-tar';

export type FileMetadata = {
	name: string;
	originalSize: number;
	compressedSize?: number;
	compression?: number;
};

export const extractFileDataFromFileList = async (fileList: FileList) => {
	const fileData: Record<string, Uint8Array> = {};

	const fileDataPromises = Array.from(fileList).map((file) => {
		return new Promise<void>((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = (e) => {
				const arrayBuffer = e.target?.result as ArrayBuffer;
				const fileName = file.webkitRelativePath || file.name;
				fileData[fileName] = new Uint8Array(arrayBuffer);
				resolve();
			};
			reader.onerror = () => {
				reject(reader.error);
			};

			reader.readAsArrayBuffer(file);
		});
	});

	await Promise.all(fileDataPromises);

	return fileData;
};

/**
 * 압축파일 내부에 존재하는 파일들의 메타데이터를 추출하는 함수
 * @param fileList
 * @returns
 */
export const extractMetaDataFromFileList = async (fileList: FileList) => {
	const fileData = await extractFileDataFromFileList(fileList);

	const compressedFileExtension = Object.keys(fileData)[0].split('.').pop();

	switch (compressedFileExtension) {
		case 'zip': {
			// zip파일을 구성하는 파일들의 메타데이터 배열을 리턴
			const zipData = Object.values(fileData)[0];
			console.log(zipData);
			return extractZipMetaData(zipData);
		}

		case 'tar': {
			// tar파일을 구성하는 파일들의 메타데이터 배열을 리턴
			const tarData = Object.values(fileData)[0];
			return await extractTarMetaData(tarData);
		}

		case 'gz': {
			// tar.gz파일을 구성하는 파일들의 메타데이터 배열을 리턴
			const tarGzData = Object.values(fileData)[0];
			return await extractTarGzMetaData(tarGzData);
		}

		default:
			return [];
	}
};

/**
 * zip 파일 내부에 존재하는 파일들의 메타데이터를 추출하는 함수
 * @param data zip 파일의 데이터
 * @returns 파일 메타데이터 배열
 */
const extractZipMetaData = (data: Uint8Array): FileMetadata[] => {
	const metadata: FileMetadata[] = [];

	unzipSync(data, {
		filter(file) {
			// filter 콜백에서 파일 메타데이터 수집
			metadata.push({
				name: file.name,
				originalSize: file.originalSize,
				compressedSize: file.size,
				compression: file.compression,
			});

			// false를 반환하면 실제 압축 해제는 하지 않음
			return false;
		},
	});

	return metadata;
};

/**
 * tar 파일 내부에 존재하는 파일들의 메타데이터를 추출하는 함수 (스트리밍 방식)
 * @param data tar 파일의 데이터
 * @returns 파일 메타데이터 배열
 */
const extractTarMetaData = async (
	data: Uint8Array,
): Promise<FileMetadata[]> => {
	const metadata: FileMetadata[] = [];

	// Uint8Array를 ReadableStream으로 변환
	const stream = new ReadableStream({
		start(controller) {
			controller.enqueue(data);
			controller.close();
		},
	});

	// tar 디코더로 스트림 처리
	const decoder = createTarDecoder();
	const entriesStream = stream.pipeThrough(decoder);

	// 스트림 리더로 엔트리를 하나씩 읽으면서 메타데이터만 수집
	const reader = entriesStream.getReader();

	try {
		while (true) {
			const { done, value: entry } = await reader.read();
			if (done) break;

			metadata.push({
				name: entry.header.name,
				originalSize: entry.header.size,
				// tar 파일은 압축되지 않으므로 compressedSize는 undefined
			});

			// 본문 데이터를 건너뛰기 (메타데이터만 필요하므로)
			await entry.body.cancel();
		}
	} finally {
		reader.releaseLock();
	}

	return metadata;
};

/**
 * tar.gz 파일 내부에 존재하는 파일들의 메타데이터를 추출하는 함수 (스트리밍 방식)
 * @param data tar.gz 파일의 데이터
 * @returns 파일 메타데이터 배열
 */
const extractTarGzMetaData = async (
	data: Uint8Array,
): Promise<FileMetadata[]> => {
	const metadata: FileMetadata[] = [];

	// Uint8Array를 ReadableStream으로 변환
	const stream = new ReadableStream({
		start(controller) {
			controller.enqueue(data);
			controller.close();
		},
	});

	// gzip 압축 해제 → tar 디코더로 스트림 처리
	const gzipDecoder = createGzipDecoder();
	const tarDecoder = createTarDecoder();
	const entriesStream = stream
		.pipeThrough(gzipDecoder) // 1. gzip 압축 해제
		.pipeThrough(tarDecoder); // 2. tar 디코딩

	// 스트림 리더로 엔트리를 하나씩 읽으면서 메타데이터만 수집
	const reader = entriesStream.getReader();

	try {
		while (true) {
			const { done, value: entry } = await reader.read();
			if (done) break;

			metadata.push({
				name: entry.header.name,
				originalSize: entry.header.size,
				// tar.gz의 경우 압축 크기는 개별 파일이 아닌 전체 아카이브에 적용
			});

			// 본문 데이터를 건너뛰기 (메타데이터만 필요하므로)
			await entry.body.cancel();
		}
	} finally {
		reader.releaseLock();
	}

	return metadata;
};

/**
 * zip 파일을 압축 해제하는 함수 (스트리밍 방식)
 * @param data zip 파일의 데이터
 * @returns 압축 해제된 파일들 (파일명 -> 데이터)
 */
export const decompressZip = async (
	data: Uint8Array,
): Promise<Record<string, Uint8Array>> => {
	return new Promise((resolve, reject) => {
		const files: Record<string, Uint8Array> = {};
		const processingFiles = new Set<string>();
		let pushComplete = false;

		const checkComplete = () => {
			// push가 완료되고 모든 파일 처리가 끝났으면 resolve
			if (pushComplete && processingFiles.size === 0) {
				resolve(files);
			}
		};

		// Unzip 인스턴스 생성 (onfile 콜백을 constructor에 전달)
		const unzipper = new Unzip((file) => {
			// 파일 처리 시작
			processingFiles.add(file.name);
			const chunks: Uint8Array[] = [];

			// 파일 데이터를 청크 단위로 수집
			file.ondata = (err, chunk, final) => {
				if (err) {
					reject(err);
					return;
				}

				chunks.push(chunk);

				// 마지막 청크인 경우 전체 데이터 병합
				if (final) {
					const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
					const result = new Uint8Array(totalLength);
					let offset = 0;

					for (const c of chunks) {
						result.set(c, offset);
						offset += c.length;
					}

					files[file.name] = result;
					processingFiles.delete(file.name);

					// 완료 체크
					checkComplete();
				}
			};

			// 파일 스트림 시작
			file.start();
		});

		// DEFLATE 압축 알고리즘 등록
		unzipper.register(UnzipInflate);

		// 전체 데이터를 한 번에 푸시 (마지막 청크 표시: true)
		unzipper.push(data, true);
		pushComplete = true;

		// push 직후 파일이 없으면 바로 완료
		checkComplete();
	});
};

/**
 * tar 파일을 압축 해제하는 함수 (스트리밍 방식)
 * @param data tar 파일의 데이터
 * @returns 압축 해제된 파일들 (파일명 -> 데이터)
 */
export const decompressTar = async (
	data: Uint8Array,
): Promise<Record<string, Uint8Array>> => {
	const files: Record<string, Uint8Array> = {};

	// Uint8Array를 ReadableStream으로 변환
	const stream = new ReadableStream({
		start(controller) {
			controller.enqueue(data);
			controller.close();
		},
	});

	// tar 디코더로 스트림 처리
	const decoder = createTarDecoder();
	const entriesStream = stream.pipeThrough(decoder);

	// 스트림 리더로 엔트리를 하나씩 읽기
	const reader = entriesStream.getReader();

	try {
		while (true) {
			const { done, value: entry } = await reader.read();
			if (done) break;

			// 디렉토리는 건너뛰기
			if (entry.header.type === 'directory') {
				await entry.body.cancel();
				continue;
			}

			// 파일 본문 데이터 읽기
			const bodyReader = entry.body.getReader();
			const chunks: Uint8Array[] = [];

			while (true) {
				const { done: bodyDone, value: chunk } = await bodyReader.read();
				if (bodyDone) break;
				chunks.push(chunk);
			}

			// 청크들을 하나의 Uint8Array로 병합
			const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
			const result = new Uint8Array(totalLength);
			let offset = 0;

			for (const chunk of chunks) {
				result.set(chunk, offset);
				offset += chunk.length;
			}

			files[entry.header.name] = result;
		}
	} finally {
		reader.releaseLock();
	}

	return files;
};

/**
 * tar.gz 파일을 압축 해제하는 함수 (스트리밍 방식)
 * @param data tar.gz 파일의 데이터
 * @returns 압축 해제된 파일들 (파일명 -> 데이터)
 */
export const decompressTarGz = async (
	data: Uint8Array,
): Promise<Record<string, Uint8Array>> => {
	const files: Record<string, Uint8Array> = {};

	// Uint8Array를 ReadableStream으로 변환
	const stream = new ReadableStream({
		start(controller) {
			controller.enqueue(data);
			controller.close();
		},
	});

	// gzip 압축 해제 → tar 디코더로 스트림 처리
	const gzipDecoder = createGzipDecoder();
	const tarDecoder = createTarDecoder();
	const entriesStream = stream
		.pipeThrough(gzipDecoder) // 1. gzip 압축 해제
		.pipeThrough(tarDecoder); // 2. tar 디코딩

	// 스트림 리더로 엔트리를 하나씩 읽기
	const reader = entriesStream.getReader();

	try {
		while (true) {
			const { done, value: entry } = await reader.read();
			if (done) break;

			// 디렉토리는 건너뛰기
			if (entry.header.type === 'directory') {
				await entry.body.cancel();
				continue;
			}

			// 파일 본문 데이터 읽기
			const bodyReader = entry.body.getReader();
			const chunks: Uint8Array[] = [];

			while (true) {
				const { done: bodyDone, value: chunk } = await bodyReader.read();
				if (bodyDone) break;
				chunks.push(chunk);
			}

			// 청크들을 하나의 Uint8Array로 병합
			const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
			const result = new Uint8Array(totalLength);
			let offset = 0;

			for (const chunk of chunks) {
				result.set(chunk, offset);
				offset += chunk.length;
			}

			files[entry.header.name] = result;
		}
	} finally {
		reader.releaseLock();
	}

	return files;
};
