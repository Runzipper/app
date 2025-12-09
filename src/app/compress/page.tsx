'use client';
import { extractMetaDataFromFileList } from '@/utils/format';
import { Typography, UI } from '@runzipper/ui';
import { useState } from 'react';
import {
	containerStyle,
	dropboxContainerStyle,
	dropboxContainerHalfStyle,
	tableContainerStyle,
	tableDescriptionStyle,
	toggleStyle,
} from './page.css';

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
			<div
				className={`${dropboxContainerStyle} ${selectedFileList ? dropboxContainerHalfStyle : ''}`}
			>
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
				<div className={tableContainerStyle}>
					<Typography.Heading textType="h3" size="secondary">
						파일 미리보기
					</Typography.Heading>
					<Typography.Regular textType="p" className={tableDescriptionStyle}>
						선택된 파일들이 압축됩니다.
					</Typography.Regular>
					<UI.Table
						columns={['파일 이름', '크기', '유형']}
						rows={filesMetaData}
					/>
				</div>
			)}
		</div>
	);
}
