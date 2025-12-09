export function formatFileSize(bytes: number): string {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${Math.round(bytes / k ** i * 100) / 100} ${sizes[i]}`;
}

export function extractMetaDataFromFileList(fileList: FileList) {
	const metaData = [];

	for (let i = 0; i < fileList.length; i++) {
		const file = fileList.item(i);
		if (!file) continue;

		metaData.push([file.name, formatFileSize(file.size), file.type]);
	}

	return metaData;
}
