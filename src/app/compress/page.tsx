'use client';
import { extractMetaDataFromFileList } from '@/utils/format';
import { UI } from '@runzipper/ui';
import { useState } from 'react';
import { containerStyle, dropboxContainerStyle, toggleStyle } from './page.css';

const MODE = {
	file: {
		label: '파일',
		value: 'file',
	},
	directory: {
		label: '폴더',
		value: 'directory',
	},
};

export default function CompressPage() {
	const [selectedMode, setSelectedMode] = useState<keyof typeof MODE>('file');
	const [selectedFileList, setSelectedFileList] = useState<FileList>();

	const handleMode = (mode: unknown) => {
		setSelectedMode(mode as keyof typeof MODE);
	};

	const handleFile = (files: FileList) => {
		setSelectedFileList(files);
	};

	const filesMetaData = selectedFileList
		? extractMetaDataFromFileList(selectedFileList)
		: [];

	return (
		<div className={containerStyle}>
			<div className={dropboxContainerStyle}>
				<UI.Toggle
					value={selectedMode}
					option1={MODE.file}
					option2={MODE.directory}
					onChange={handleMode}
					className={toggleStyle}
				/>
				<UI.FileDrop
					allowDirectory={selectedMode === 'directory'}
					multiple={selectedMode !== 'directory'}
					onDropFile={handleFile}
				/>
			</div>
			{selectedFileList && (
				<UI.Table
					columns={['파일 이름', '크기', '유형']}
					rows={filesMetaData}
				/>
			)}
		</div>
	);
}
